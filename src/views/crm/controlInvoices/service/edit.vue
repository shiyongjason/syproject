<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">基本信息</div>
            <div class="query-cont-row">
                <el-form :model="serviceForm" :inline="true" :rules="rules" ref="serviceForm" label-width="130px" class="demo-ruleForm">
                    <el-row>
                        <el-form-item label="申请单号：" prop="invoiceNo" v-if="serviceForm.invoiceNo">
                            <el-input v-model.trim="serviceForm.invoiceNo" maxlength="30" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="项目：" prop="projectNo">
                            <el-input v-model.trim="serviceForm.projectNo" @blur="onInputBlur" maxlength="50">
                                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                            </el-input>
                            {{serviceForm.projectName}}
                        </el-form-item>
                        <el-form-item label="所属分部：" class="deptName">
                            <el-input v-model.trim="serviceForm.deptName"  disabled></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="经销商：" prop="companyName">
                            <el-input v-model.trim="serviceForm.companyName"  disabled></el-input>
                        </el-form-item>
                        <el-form-item label="收票人：" prop="receiver">
                            <el-input v-model.trim="serviceForm.receiver" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item label="发票金额：" >
                            <el-input v-model="selectMoney"  disabled></el-input>
                        </el-form-item>
                        <el-form-item label="收票人手机：" prop="receiverMobile">
                            <el-input type="tel" v-model.trim="serviceForm.receiverMobile" maxlength="11"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-form-item label="收票地址：" prop="receiverAddress">
                        <el-input v-model.trim="serviceForm.receiverAddress" maxlength="80"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息：" prop="remark">
                        <el-input type="textarea" show-word-limit v-model="serviceForm.remark" maxlength="255" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="floor-tit">发票明细</div>
            <div class="mb20 mt20">
                <h-button type="primary" @click="handleAdd" v-if="serviceForm.projectId">添加</h-button>
            </div>
            <hosJoyTable ref="multipleTable" align="center" border :column="tableLabel" :data="tableData" actionWidth='100' isAction :max-height="500" :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <el-button size="mini" type="primary" @click="handelDelete(slotProps.data)">删除</el-button>
                </template>
            </hosJoyTable>
            <el-dialog title="账单信息" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" :before-close="handleClose">
                <hosJoyTable ref="dialogTable" align="center" border stripe @selection-change="handleSelectionChange" isShowselection :column="formTableLabel" :data="tableForm"  :height='330'>
                </hosJoyTable>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" :disabled=disabled @click="handleSelect">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="项目" :visible.sync="projectVisible" width="50%" :close-on-click-modal="false" :before-close="()=>{projectVisible = false}">
                <div class="project_wrap">
                    <el-row class="mb20">
                        <el-input v-model="queryParams.queryString" placeholder="可输入项目编号或者项目名称模糊查询">
                            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                        </el-input>
                    </el-row>
                    <hosJoyTable ref="hosjoyTable2" align="center" border stripe :column="projectTableLabel" :data="tableProject" showPagination :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" :height='330'>
                        <template #code="slotProps">
                            <el-radio :label="slotProps.data.$index" v-model="radio" @change.native="getCurrentRow(slotProps.data)">{{''}}</el-radio>
                        </template>
                    </hosJoyTable>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="projectVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAddProject">确 定</el-button>
                </span>
            </el-dialog>
            <div class="mb20 mt20">
                <h-button @click="handleBack">返回</h-button>
                <h-button type="primary" @click="handleSave(1)">保存</h-button>
                <h-button type="primary" @click="handleSave(2)">保存并提交</h-button>
            </div>
        </div>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import moment from 'moment'
import { deepCopy } from '@/utils/utils'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { ServiceInvoiceSubmitRequest } from '@/interface/hbp-project'
import { Phone } from '@/utils/rules'
import { getProjectPage, getServiceFunds, updateServiceInvoice, getMostInvoice, getInvoiceDetail } from '../api'
// import { addAccount } from '@/views/wisdom/fundsData/api'
@Component({
    name: 'Serviceedit',
    components: {
        hosJoyTable
    }
})

export default class Serviceedit extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    @Action('setNewTags') setNewTags!: Function
    @State('userInfo') userInfo: any

    isDisabled: boolean = true
    dialogVisible:boolean = false
    projectVisible:boolean = false
    disabled:boolean = true

    selectRow :Record<string, any> = {}
    selectData:any[] = []
    radio = ''
    queryParams:Record<string, any>={
        pageNumber: 1,
        pageSize: 10,
        subsectionCode: '',
        queryString: '',
        projectNo: ''
    }
    serviceForm: ServiceInvoiceSubmitRequest={
        companyId: null,
        saveOrSubmit: '',
        invoiceId: '',
        projectNo: '',
        projectName: '',
        deptName: '',
        invoiceAmount: '',
        receiver: '',
        receiverMobile: '',
        receiverAddress: '',
        companyName: '',
        remark: '',
        deptCode: '',
        resourceIds: []
    }
    _serviceForm:any={}

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData: any[] = []
    tableLabel: tableLabelProps = [
        { label: '服务费流水号', prop: 'id' },
        { label: '支付单号', prop: 'paymentOrderNo' },
        { label: '期数', prop: 'feeRepaymentOrder' },
        { label: '金额', prop: 'paidAmount', displayAs: 'money' },
        { label: '支付成功时间', prop: 'paidDate', displayAs: 'YYYY-MM-DD HH:mm:ss' }
    ]

    tableForm: any[] = [
    ]

    formTableLabel: tableLabelProps = [
        { label: '服务费流水号', prop: 'id' },
        { label: '支付单号', prop: 'paymentOrderNo' },
        { label: '期数', prop: 'feeRepaymentOrder' },
        { label: '金额', prop: 'paidAmount', displayAs: 'money' },
        { label: '支付成功时间', prop: 'paidDate', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '是否全部结清', prop: 'settlement', dicData: [{ value: true, label: '是' }, { value: false, label: '否' }] }
    ]
    tableProject:any[]=[]
    projectTableLabel: tableLabelProps = [
        { label: '选择',
            prop: 'code',
            slot: 'code',
            width: '120'
        },
        { label: '项目编号', prop: 'projectNo' },
        { label: '项目名称', prop: 'projectName' }
    ]
    // 校验
    get rules () {
        let rules = {
            companyName: [
                { required: true, message: '请输入经销商', trigger: 'blur' }
            ],
            invoiceId: [
                { required: true, message: '请输入发票ID', trigger: 'blur' }
            ],
            projectId: [
                { required: true, message: '请输入选择项目', trigger: 'blur' }
            ],
            receiver: [
                { required: true, message: '请输入收票人', trigger: 'blur' }
            ],
            receiverMobile: [
                { required: true, message: '请输入收票人手机', trigger: 'blur' },
                { validator: Phone, trigger: 'blur' }
            ],
            receiverAddress: [
                { required: true, message: '请输入收票地址', trigger: 'blur' }
            ]
        }
        return rules
    }

    get selectMoney () {
        const moneny = this.tableData.reduce((sum, val) => {
            console.log(val, sum)
            return this.$plus(sum, parseFloat(val.paidAmount ?? 0) * 1)
        }, 0)
        this.serviceForm.invoiceAmount = moneny.toFixed(2)
        return moneny.toFixed(2)
    }

    @Watch('serviceForm.companyId')
    getInfo (newVal, oldVal) {
        this.getRecentInvoice()
    }

    handleSelectionChange (val) {
        this.selectData = val
        this.disabled = val.length == 0
        // console.log('val: ', val)
    }
    async handleAdd () {
        // 发票添加
        this.dialogVisible = true
        const { data } = await getServiceFunds({ projectId: this.serviceForm.projectId })
        this.tableForm = data
    }

    handleClose () {
        // 账单弹窗关闭
        console.log('this.$refs ', this.$refs['dialogTable'].clearSelection())
        this.dialogVisible = false
    }
    async handleSearch () {
        // 查询项目
        this.projectVisible = true
        this.getList()
    }
    handleAddProject () {
        // 添加查询的项目
        this.serviceForm = {
            ...this.serviceForm,
            ...this.selectRow,
            projectId: this.selectRow.id,
            deptCode: this.selectRow.subsectionCode
        }
        this.projectVisible = false
    }

    getCurrentRow (row) {
        this.selectRow = row.row
        console.log('row: ', row.row)
        this.radio = row.$index
    }

    async onInputBlur ({ target }) {
        // 失去焦点查询项目
        console.log('val: ', target.value)

        this.queryParams.projectNo = target.value
        const { data } = await getProjectPage(this.queryParams)
        if (data.records.length == 1) {
            console.log('data.records: ', data.records[0])
            this.serviceForm = {

                ...this.serviceForm,
                ...data.records[0],
                projectId: data.records[0].id,
                deptCode: data.records[0].subsectionCode
            }
            console.log('  this.serviceForm : ', this.serviceForm)
        } else {
            if (target.value) {
                this.$message.warning('项目编号有误')
                this.serviceForm.projectName = ''
                this.serviceForm.deptName = ''
                this.serviceForm.companyId = ''
                this.serviceForm.companyName = ''
                this.tableData = []
            }
        }
    }

    // 删除
    handelDelete (val) {
        // console.log('val, index: ', val)
        this.tableData.splice(val.$index, 1)
    }

    handleSelect () {
        this.selectData.map(val => {
            console.log(val, this.tableData, this.tableData.includes(val))
            let _index = this.tableData.findIndex(item => val.id == item.id)
            if (_index >= 0) {
                this.$set(this.tableData, _index, val)
            } else {
                this.tableData.push(val)
            }
        })
        this.dialogVisible = false
    }

    async getList () {
        this.queryParams.projectNo = ''
        const { data } = await getProjectPage(this.queryParams)
        this.tableProject = data.records
        this.page.total = data.total
    }

    async getRecentInvoice () {
        if (this.serviceForm.companyId) {
            const { data } = await getMostInvoice({ companyId: this.serviceForm.companyId })
            this.serviceForm.receiver = data.receiver
            this.serviceForm.receiverMobile = data.receiverMobile
            this.serviceForm.receiverAddress = data.receiverAddress
        } else {
            this.serviceForm.receiver = ''
            this.serviceForm.receiverMobile = ''
            this.serviceForm.remark = ''
            this.serviceForm.receiverAddress = ''
        }
    }

    handleSave (type) {
        this.serviceForm.saveOrSubmit = type
        this.serviceForm.resourceIds = this.tableData.map(val => val.id)
        // 保存

        this.$refs['serviceForm'].validate(async valid => {
            if (valid) {
                if (type == 2 && this.tableData.length == 0) {
                    this.$message.warning('请添加发票明细')
                    return false
                }
                await updateServiceInvoice(this.serviceForm)
                this.handleBack()
            }
        })
    }

    public async getDetail (id) {
        const { data } = await getInvoiceDetail(id)
        // @ts-ignore
        this.serviceForm = { ...data,
            invoiceId: data.id
        }
        console.log('  this.serviceForm : ', this.serviceForm)
        this.tableData = data.resourceList
    }

    handleBack () {
        // 返回
        this.$router.go(-1)
        this.setNewTags((this.$route.fullPath).split('?')[0])
    }

    async mounted () {
        // this.tableData = [{ id: 200, code: 11111, name: 2222, money: 100 }]
        // this.selectData = this.tableData
        this._serviceForm = deepCopy(this.serviceForm)
        this.queryParams.subsectionCode = this.userInfo.pkDeptDoc
        if (this.$route.query.id) {
            this.getDetail(this.$route.query.id)
        }
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>
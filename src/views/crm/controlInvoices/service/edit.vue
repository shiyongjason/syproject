<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">基本信息</div>
            <div class="query-cont-row">
                <el-form :model="serviceForm" :inline="true" :rules="rules" ref="serviceForm" label-width="130px" class="demo-ruleForm">
                    <el-row>
                        <el-form-item label="申请单号：" prop="invoiceId" v-if="serviceForm.invoiceId">
                            <el-input v-model.trim="serviceForm.invoiceId" maxlength="30"></el-input>
                        </el-form-item>
                        <el-form-item label="项目：" prop="projectId">
                            <el-input v-model.trim="serviceForm.projectId" @blur="onInputBlur" maxlength="50">
                                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                            </el-input>
                            {{serviceForm.projectName}}
                        </el-form-item>
                        <el-form-item label="所属分部：">
                            <el-input v-model.trim="serviceForm.deptName"  disabled></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="经销商：">
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
                <h-button type="primary" @click="handleAdd">添加</h-button>
            </div>
            <hosJoyTable ref="multipleTable" align="center" border :column="tableLabel" :data="tableData" actionWidth='100' isAction :max-height="500" :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <el-button size="mini" type="primary" @click="handelDelete(slotProps.data)">删除</el-button>
                </template>
            </hosJoyTable>
            <el-dialog title="信息" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" :before-close="handleClose">
                <hosJoyTable ref="dialogTable" align="center" border stripe @selection-change="handleSelectionChange" isShowselection :column="formTableLabel" :data="tableForm" actionWidth='200'>
                </hosJoyTable>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" :disabled=disabled @click="getList">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="项目" :visible.sync="projectVisible" width="50%" :close-on-click-modal="false" :before-close="()=>{projectVisible = false}">
                <div class="project_wrap">
                    <el-row class="mb20">
                        <el-input v-model="queryParams.queryString" placeholder="可输入项目编号或者项目名称模糊查询">
                            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                        </el-input>
                    </el-row>
                    <hosJoyTable ref="hosjoyTable2" align="center" border stripe :column="projectTableLabel" :data="tableForm" showPagination :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" :height='330'>
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
import filters from '@/utils/filters'
import { RespBossShopFloorDetail } from '@/interface/hbp-shop'
import moment from 'moment'
import { deepCopy } from '@/utils/utils'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { ServiceInvoiceSubmitRequest } from '@/interface/hbp-project'
import { Phone } from '@/utils/rules'
import { getProjectPage, getServiceFunds, updateServiceInvoice } from '../api'
@Component({
    name: 'Servicedetail',
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
        queryString: ''
    }
    serviceForm: ServiceInvoiceSubmitRequest={
        companyId: '',
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

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData: any[] = []
    tableLabel: tableLabelProps = [
        { label: '服务流水号', prop: 'code' },
        { label: '支付单号', prop: 'name' },
        { label: '期数', prop: 'categoryPath', width: '300px' },
        { label: '金额', prop: 'money' },
        { label: '支付成功时间', prop: 'brandName' }
    ]

    tableForm: any[] = [
    ]

    formTableLabel: tableLabelProps = [
        { label: '服务费流水号', prop: 'code' },
        { label: '支付单号', prop: 'name' },
        { label: '期数', prop: 'categoryPath' },
        { label: '金额', prop: 'money' },
        { label: '支付成功时间', prop: 'brandName' },
        { label: '是否全部结清', prop: 'brandName' }
    ]
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
        const moneny = this.selectData.reduce((sum, val) => {
            console.log(val, sum)
            return this.$plus(sum, parseFloat(val.money ?? 0) * 1)
        }, 0)
        return moneny.toFixed(2)
    }

    handleSelectionChange (val) {
        this.selectData = val
        this.disabled = val.length == 0
        console.log('val: ', val)
    }
    async handleAdd () {
        // 发票添加
        this.dialogVisible = true
        const { data } = await getServiceFunds({ projectId: this.$route.query.projectId })
    }

    handleClose () {
        // 发票弹窗关闭
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
        console.log('val: ', target.value)
    }

    // 删除
    handelDelete (val) {
        console.log('val, index: ', val)
        this.tableData.splice(val.$index, 1)
    }

    handleSelect () {
        this.selectData.map(val => {
            console.log(val, this.tableData, this.tableData.includes(val))
            let _index = this.tableData.findIndex(item => val.id == item.id)
            if (_index >= 0) {
                console.log('_index: ', _index)
                this.$set(this.tableData, _index, val)
            } else {
                this.tableData.push(val)
            }
        })
        this.dialogVisible = false
    }

    async getList () {
        const { data } = await getProjectPage(this.queryParams)
        this.tableForm = data.records
        this.page.total = data.total
    }

    handleSave (type) {
        this.serviceForm.saveOrSubmit = type
        this.serviceForm.resourceIds = this.selectData.map(val => val.id)
        // 保存
        this.$refs['serviceForm'].validate(async valid => {
            if (valid) {
                await updateServiceInvoice(this.serviceForm)
            }
        })
    }

    handleBack () {
        // 返回
        this.$router.go(-1)
        this.setNewTags((this.$route.fullPath).split('?')[0])
    }

    async mounted () {
        this.tableData = [{ id: 200, code: 11111, name: 2222, money: 100 }]
        this.selectData = this.tableData
        this.tableForm = [{ id: 201, code: 32, name: 3234, money: 101, categoryPath: 555 }, { id: 200, code: 11111, name: 2222, money: 103 }]

        this.queryParams.subsectionCode = '1050AL100000000003DM'
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>
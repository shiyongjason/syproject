<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">申请单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.invoiceNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.deptCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.companyName" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">发票号码：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.invoiceNumber" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.projectName" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态码：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.invoiceStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="(item,index) in invoiceTyps" :label=item.label :value=item.value :key="index"></el-option>
                            <!-- <el-option label="银行承兑" :value="2"></el-option> -->
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">寄送快递单号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.deliveryNo" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">发票金额（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.minInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.maxInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请人：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.createBy" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>

                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="handleReset">重置</h-button>
                    <h-button type="primary" @click="handleEdit()" v-if="hosAuthCheck(INVOICE_SERVICE_ADD)">申请</h-button>
                </div>
            </div>
            <!-- end search bar -->
            <div class="query-cont__row mb20">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span>累计金额：{{totalMoney|moneyFormat}}元</span></el-tag>
            </div>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='330' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="handleLook(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_SERVICE_LOOK)">查看</h-button>
                    <h-button table @click="handleEdit(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_SERVICE_EDIT)&&slotProps.data.row.invoiceStatus==10">编辑</h-button>
                    <h-button table @click="handleSubmit(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_SERVICE_SUBMIT)&&slotProps.data.row.invoiceStatus==10">提交</h-button>
                    <h-button table @click="handleReject(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_SERVICE_REJECT)&&slotProps.data.row.invoiceStatus==20">驳回</h-button>
                    <h-button table @click="handleInvoice(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_SERVICE_OPEN)&&slotProps.data.row.invoiceStatus!=10">开票</h-button>
                </template>
            </hosJoyTable>
            <el-dialog :close-on-click-modal='false' title="开票" :visible.sync="isShowInvoice" width="600px" class="prev-payment-dialog" :before-close="handleCancel">
                <el-form :model="IForm" :rules="IRules" ref="IForm" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="发票号码：" prop="invoiceNumber">
                        <el-input v-model="IForm.invoiceNumber" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="快递公司：" prop="deliveryCompanyName">
                        <el-select v-model="IForm.deliveryCompanyName" placeholder="请选择快递公司">
                            <el-option :label="item.companyName" :value="item.companyName" v-for="item in deliveries" :key="item.companyName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="快递单号：" prop="deliveryNo">
                        <el-input v-model="IForm.deliveryNo" maxlength="30"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <h-button type="primary" @click="handleSure">确定</h-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script lang='tsx'>
import moment from 'moment'
import { CreateElement } from 'vue'
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { measure, handleSubmit, validateForm } from '@/decorator/index'
import { ServiceInvoiceOpenRequest } from '@/interface/hbp-project'
import { updateOpen, updateReject, updateSubmit, getInvoiceList, getInvoiceTotal, getDelivery } from '../api/index'
// import { newCache } from '@/utils/index'
import { deepCopy } from '@/utils/utils'
import { INVOICE_SERVICE_LOOK, INVOICE_SERVICE_EDIT, INVOICE_SERVICE_SUBMIT, INVOICE_SERVICE_OPEN, INVOICE_SERVICE_REJECT, INVOICE_SERVICE_ADD } from '@/utils/auth_const'

// 接口 实现继承
// type Query<T> = { [P in keyof T]: T[P] }

const invoiceTyps = [{ value: 10, label: '申请中' }, { value: 20, label: '已提交' }, { value: 30, label: '已开票' }]

@Component({
    name: 'serviceinvoice',
    components: {
        hosJoyTable
    }
})
export default class ServiceList extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    INVOICE_SERVICE_LOOK = INVOICE_SERVICE_LOOK
    INVOICE_SERVICE_EDIT = INVOICE_SERVICE_EDIT
    INVOICE_SERVICE_SUBMIT = INVOICE_SERVICE_SUBMIT
    INVOICE_SERVICE_OPEN = INVOICE_SERVICE_OPEN
    INVOICE_SERVICE_REJECT = INVOICE_SERVICE_REJECT
    INVOICE_SERVICE_ADD = INVOICE_SERVICE_ADD
    deliveries:any[]=[]
    tableData:any[] = []
    totalMoney = ''
    invoiceTyps = invoiceTyps
    private isShowInvoice:boolean = false
    private _queryParams = {}
    queryParams: Record<string, any> = {
        pageNumber: 1,
        pageSize: 10,
        invoiceNo: '',
        deptCode: '',
        deptName: '',
        companyName: '',
        invoiceNumber: '',
        projectName: '',
        invoiceStatus: '',
        deliveryNo: '',
        createBy: '',
        minInvoiceAmount: '',
        maxInvoiceAmount: '',
        createTimeStart: '',
        createTimeEnd: '',
        authCode: '',
        jobNumber: ''
        // 'sort.property': null,
        // 'sort.direction': null
    }
    IForm:ServiceInvoiceOpenRequest={
        invoiceId: '',
        invoiceNumber: '',
        deliveryCompanyName: '',
        deliveryNo: ''
    }

    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function

    get options () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.createTimeStart,
            endTime: this.queryParams.createTimeEnd
        }
    }

    get IRules () {
        return {
            invoiceNumber: [{ required: true, message: '请输入发票号码', trigger: 'bulr' }]
            // deliveryCompanyName: [{ required: true, message: '请选择快递公司', trigger: 'change' }],
            // deliveryNo: [{ required: true, message: '请输入快递单号', trigger: 'bulr' }]
        }
    }

    tableLabel:tableLabelProps = [
        { label: '状态码', prop: 'invoiceStatus', width: '100', dicData: invoiceTyps },
        { label: '申请单号', prop: 'invoiceNo' },
        { label: '项目编号', prop: 'projectNo' },
        { label: '项目名称', prop: 'projectName' },
        { label: '所属分部', prop: 'deptName' },
        { label: '经销商', prop: 'companyName' },
        { label: '申请人', prop: 'createBy' },
        { label: '申请时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '发票金额', prop: 'invoiceAmount', displayAs: 'money' },
        { label: '发票号码', prop: 'invoiceNumber' },
        { label: '寄送快递单号', prop: 'deliveryNo' }
    ]

    async handleLook (row) {
        // 查看
        this.$router.push({ path: '/goodwork/manageInvoices/servicedetail', query: { id: row.id } })
    }

    handleEdit (row) {
        console.log('row: ', row)
        // 编辑 or 申请
        if (row) {
            this.$router.push({ path: '/goodwork/manageInvoices/serviceedit', query: { id: row.id, authCode: JSON.parse(sessionStorage.getItem('authCode')) || '' } })
        } else {
            this.$router.push({ path: '/goodwork/manageInvoices/serviceedit', query: { authCode: JSON.parse(sessionStorage.getItem('authCode')) || '' } })
        }
    }

    @handleSubmit()
    handleSubmit (val) {
        // 提交
        this.$confirm('确认无误，提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await updateSubmit(val.id)
            this.getList()
        }).catch(() => {

        })
    }

    handleReject (val) {
        // 驳回
        this.$prompt('请输入驳回原因', '驳回', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            inputType: 'textarea',
            // inputPlaceholder: '驳回原因',
            inputValidator: (value) => {
                if (!value) {
                    return false
                } else if (value.length > 80) {
                    return false
                }
            },
            inputErrorMessage: '驳回原因必填且长度不能超过80'
            // @ts-ignore
        }).then(async ({ value }) => {
            await updateReject({ id: val.id, rejectReason: value })
            this.getList()
        }).catch(() => {

        })
    }

    async handleInvoice (val) {
        // 开票
        this.isShowInvoice = true
        const { data } = await getDelivery()
        this.deliveries = data
        this.IForm = {
            invoiceId: val.id,
            invoiceNumber: '',
            deliveryCompanyName: '',
            deliveryNo: ''
        }
        this.$refs['IForm'].clearValidate()
        this.getList()
    }
    handleCancel () {
        this.isShowInvoice = false
    }
    handleSure () {
        // 确定
        this.$refs['IForm'].validate(async valid => {
            if (valid) {
                await updateOpen(this.IForm)
                this.isShowInvoice = false
            }
        })
    }

    handleReset () {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }

    @measure
    async getList () {
        await Promise.all([getInvoiceList(this.queryParams), getInvoiceTotal(this.queryParams)]).then(res => {
            if (res[1]) {
                this.tableData = res[0].data.records
                this.page.total = res[0].data.total as number
                this.totalMoney = res[1].data
            }
            console.log(res)
        })
    }

    public onStartChange (val): void {
        this.queryParams.createTimeStart = val
    }
    public onEndChange (val): void {
        this.queryParams.createTimeEnd = val
    }

    async mounted () {
        // this.tableData = [{ paymentOrderNo: '123132' }]
        await this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: sessionStorage.getItem('authCode')
                ? JSON.parse(sessionStorage.getItem('authCode') || '')
                : ''
        })
        this.queryParams.jobNumber = this.userInfo.jobNumber
        this.queryParams.authCode = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode') || '') : ''
        this._queryParams = deepCopy(this.queryParams)
        this.getList()
    }
}
</script>

<style lang='scss' scoped>
// @import "./css.scss";
</style>

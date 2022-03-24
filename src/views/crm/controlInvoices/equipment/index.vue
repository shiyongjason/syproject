<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
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
                        <el-input type="text" v-model="queryParams.companyName" maxlength="20" placeholder="请输入经销商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">采购发票金额（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.minPurchaseInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.maxPurchaseInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游供应商：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.supplierCompanyName" maxlength="50" placeholder="请输入上游供应商"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.projectName" maxlength="50" placeholder="请输入项目名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态码：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.invoiceStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="(item,index) in invoiceTyps" :label=item.label :value=item.value :key="index"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">销售发票金额（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.minSalesInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.maxSalesInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">mis采购订单号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.misPurchaseOrderNo" maxlength="50" placeholder="请输入mis采购订单号"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">mis销售订单号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.misSalesOrderNo" maxlength="50" placeholder="请输入mis销售订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">采购发票号码：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.misPurchaseInvoiceNo" maxlength="20" placeholder="请输入采购发票号码"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">销售发票号码：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.misSaleInvoiceNo" maxlength="20" placeholder="请输入销售发票号码"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请人：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.createBy" maxlength="20" placeholder="请输入申请人"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请单号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.invoiceNo" maxlength="20" placeholder="请输入申请单号"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="handleReset">重置</h-button>
                    <h-button @click="handleEdit()" type="primary" v-if="hosAuthCheck(INVOICE_EQUIPT_ADD)">申请</h-button>
                </div>
            </div>
            <!-- end search bar -->
            <div class="query-cont__row mb20">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span>累计采购发票金额：{{totalPurchaseInvoiceAmount|moneyFormat}}元</span>，<span>销售发票金额：{{totalSalesInvoiceAmount|moneyFormat}}元</span></el-tag>
            </div>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='330' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="handleLook(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_EQUIPT_LOOK)">查看</h-button>
                    <h-button table @click="handleEdit(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_EQUIPT_EDIT)&&slotProps.data.row.invoiceStatus==10">编辑</h-button>
                    <h-button table @click="handleSubmit(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_EQUIPT_SUBMIT)&&slotProps.data.row.invoiceStatus==10">提交</h-button>
                    <h-button table @click="handleReject(slotProps.data.row)" v-if="hosAuthCheck(INVOICE_EQUIPT_REJECT)&&slotProps.data.row.invoiceStatus==20">驳回</h-button>
                </template>
            </hosJoyTable>
        </div>
    </div>
</template>

<script lang='tsx'>
import moment from 'moment'
import { CreateElement } from 'vue'
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import elImageAddToken from '@/components/elImageAddToken/index.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { measure, handleSubmit, validateForm } from '@/decorator/index'
import { getEqpList, getEqpTotal, rejectEqp, submitEqp } from '../api/index'
import { INVOICE_EQUIPT_LOOK, INVOICE_EQUIPT_EDIT, INVOICE_EQUIPT_SUBMIT, INVOICE_EQUIPT_OPEN, INVOICE_EQUIPT_REJECT, INVOICE_EQUIPT_ADD } from '@/utils/auth_const'
import { deepCopy } from '@/utils/utils'
const invoiceTyps = [{ value: 10, label: '申请中' }, { value: 20, label: '已提交' }, { value: 30, label: '已开票' }]

@Component({
    name: 'equipmentinvoice',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload,
        elImageAddToken
    }
})
export default class UpstreamPaymentManagement extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    invoiceTyps = invoiceTyps
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    INVOICE_EQUIPT_LOOK = INVOICE_EQUIPT_LOOK
    INVOICE_EQUIPT_EDIT = INVOICE_EQUIPT_EDIT
    INVOICE_EQUIPT_SUBMIT = INVOICE_EQUIPT_SUBMIT
    INVOICE_EQUIPT_OPEN = INVOICE_EQUIPT_OPEN
    INVOICE_EQUIPT_REJECT = INVOICE_EQUIPT_REJECT
    INVOICE_EQUIPT_ADD = INVOICE_EQUIPT_ADD
    tableData:any[] = []
    editorDrawer:boolean = false
    totalSalesInvoiceAmount = null
    totalPurchaseInvoiceAmount = null
    private _queryParams = {}
    queryParams: Record<string, any> = {
        pageNumber: 1,
        pageSize: 10,
        paymentOrderNo: '',
        deptName: '',
        companyName: '',
        minPurchaseInvoiceAmount: '',
        maxPurchaseInvoiceAmount: '',
        minSalesInvoiceAmount: '',
        maxSalesInvoiceAmount: '',
        supplierCompanyName: '',
        projectName: '',
        invoiceStatus: '',
        misSalesOrderNo: '',
        misPurchaseInvoiceNo: '',
        misSaleInvoiceNo: '',
        authCode: '',
        jobNumber: '',
        createBy: '',
        createTimeStart: '',
        createTimeEnd: '',
        invoiceNo: '',
        'sort.property': null,
        'sort.direction': null
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

    get pickerOptions () {
        return {
            disabledDate (time) {
                // @ts-ignore
                return Date.now() < time.getTime()// 如果当天可选，就不用减8.64e7
            }
        }
    }

    tableLabel:tableLabelProps = [
        { label: '状态码', prop: 'invoiceStatus', dicData: invoiceTyps },
        { label: '申请单号', prop: 'invoiceNo', width: '130' },
        { label: '支付单号', prop: 'paymentOrderNo', width: '160' },
        { label: '项目名称', prop: 'projectName', width: '160' },
        { label: '经销商', prop: 'companyName', width: '160' },
        { label: '上游供应商', prop: 'supplierCompanyName', width: '160' },
        { label: 'mis采购订单号', prop: 'misPurchaseOrderNo', width: '160' },
        { label: 'mis销售订单号', prop: 'misSalesOrderNo', width: '160' },
        { label: '采购发票号码', prop: 'misPurchaseInvoiceNo', width: '160' },
        { label: '采购发票金额', prop: 'purchaseInvoiceAmount', width: '160', displayAs: 'money' },
        { label: '销售发票号码', prop: 'misSaleInvoiceNo', width: '160' },
        { label: '销售发票金额', prop: 'salesInvoiceAmount', width: '160', displayAs: 'money' },
        { label: '申请人', prop: 'createBy', width: '160' },
        { label: '申请时间', prop: 'createTime', width: '160', displayAs: 'YYYY-MM-DD HH:mm:ss' }
    ]

    async handleLook (val) {
        // 查看
        this.$router.push({ path: '/goodwork/manageInvoices/equipmentdetail', query: { id: val.id } })
    }

    handleEdit (val) {
        if (val) {
            // 编辑
            this.$router.push({ path: '/goodwork/manageInvoices/equipmentedit', query: { id: val.id, authCode: JSON.parse(sessionStorage.getItem('authCode')) || '' } })
        } else {
            this.$router.push({ path: '/goodwork/manageInvoices/equipmentedit', query: { authCode: JSON.parse(sessionStorage.getItem('authCode')) || '' } })
        }
    }
    handleReset () {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }

    @measure
    async getList () {
        await Promise.all([getEqpList(this.queryParams), getEqpTotal(this.queryParams)]).then(res => {
            if (res[1]) {
                console.log('res: ', res)
                this.tableData = res[0].data.records
                this.page.total = res[0].data.total as number
                this.totalPurchaseInvoiceAmount = res[1].data.totalPurchaseInvoiceAmount
                this.totalSalesInvoiceAmount = res[1].data.totalSalesInvoiceAmount
            }
        })
    }

    public onStartChange (val): void {
        this.queryParams.createTimeStart = val
    }
    public onEndChange (val): void {
        this.queryParams.createTimeEnd = val
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
            await rejectEqp({ id: val.id, rejectReason: value })
            this.getList()
        }).catch(() => {

        })
    }

    @handleSubmit()
    handleSubmit (val) {
        // 提交
        this.$confirm('确认无误，提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            type: 'warning'
        }).then(async () => {
            await submitEqp(val.id)
            this.getList()
        }).catch(() => {

        })
    }

    async mounted () {
        // this.tableData = [{ paymentOrderNo: '1000' }]
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

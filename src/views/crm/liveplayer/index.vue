<template>
    <div class="page-body B2b ">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">落地页面名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">直播间ID：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.companyName" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <h-button type="primary" class="ml20" @click="onAdd">新建落地页</h-button>
                </div>
            </div>
            <!-- end search bar -->
            <hosJoyTable localName="V3.5.1" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template #action="slotProps">
                    <h-button table v-if="hosAuthCheck(upstreamPayDetail)"  @click="viewDetail(slotProps.data.row.paymentOrderId)">查看详情</h-button>
                    <h-button table v-if="changeLoanTransferStatusAuthCheck(slotProps.data.row)"  @click="onShowChangeLoanTransferStatus(slotProps.data.row.loanTransferId)">变更交接状态</h-button>
                </template>
            </hosJoyTable>
        </div>

    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import elImageAddToken from '@/components/elImageAddToken/index.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件

import { ReqSupplierSubmit, ReqUpStreamPaymentQuery, RespLoanHandoverInfo, RespSupplier, RespSupplierInfo, RespUpStreamPayment, ReqLoanTransferChange, LoanTransferInfoResponse } from '@/interface/hbp-project'
import filters from '@/utils/filters'
import { UPSTREAM_PAY_DETAIL, UPSTREAM_PAY_MENT, CHANGE_LOAN_TRANSFER_STATUS, UPSTREAM_PAY_EXPORT } from '@/utils/auth_const'
import moment from 'moment'
export const PAYMENTTYPE: Map<number | null, string> = new Map([
    [null, '-'],
    [1, '银行转账'],
    [2, '银行承兑']
])
export const SUPPLIERPAYMENTMETHOD: Map<number | null, string> = new Map([
    [null, '-'],
    [1, '先款后货'],
    [2, '先货后款']
])

interface Query extends ReqUpStreamPaymentQuery{
    [key:string]:any
}

/** tab 切对应的Api请求 */
enum TabInfoApi {
    /** 获取放款交接信息API */
    loanHandoverInformation = 'getLoanHandoverInfoApi',
    /** 上游支付查询信息API */
    upstreamPaymentInformation = 'getPayConfirmApi'
}

@Component({
    name: 'UpstreamPaymentManagement',
    components: {
        hosJoyTable,

        OssFileHosjoyUpload,
        elImageAddToken
    }
})
export default class UpstreamPaymentManagement extends Vue {
    upstreamPayDetail = UPSTREAM_PAY_DETAIL
    upstreamPayment = UPSTREAM_PAY_MENT
    upstreamExport = UPSTREAM_PAY_EXPORT

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
    paymentType = PAYMENTTYPE
    supplierPaymentMethod = SUPPLIERPAYMENTMETHOD
    tableData:RespUpStreamPayment[] | [] = []
    editorDrawer:boolean = false
    isOpen:boolean = false
    isOpenChangeStatus: boolean = false
    isTabs:boolean = false
    paymentOrderId:string = ''
    private _queryParams = {}
    queryParams: Query = {
        pageNumber: 1,
        pageSize: 10,
        paymentOrderNo: '',
        deptName: '',
        companyName: '',
        supplierPaymentType: '',
        supplierCompanyName: '',
        projectName: '',
        paymentStatus: '',
        startNoPayAmount: '',
        endNoPayAmount: '',
        startInitiateTime: '',
        endInitiateTime: '',
        startExpectSupplierPaymentDate: '',
        endExpectSupplierPaymentDate: '',
        authCode: '',
        jobNumber: '',
        subsectionCode: '',
        loanTransferStatus: '',
        'sort.property': null,
        'sort.direction': null
    }
    private _dialogFormData = {}
    dialogFormData:ReqSupplierSubmit={
        id: '',
        poId: '',
        paymentOrderId: '',
        payAmount: '',
        payDate: moment().format('YYYY-MM-DD'),
        payVouchers: []
    }
    loanTransferStatusForm: ReqLoanTransferChange = {
        loanTransferId: '',
        changeType: '',
        remark: '',
        updateBy: ''
    }

    totalAmount:number = 0
    activeName:string = 'loanHandoverInformation'
    loanHandoverInformation:LoanTransferInfoResponse = '' as unknown as LoanTransferInfoResponse

    PAYMENTSTATUS: Map<number | null, string> = new Map([
        [null, '-'],
        [1, '待支付'],
        [2, '部分支付']
    ])
    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function

    tableLabel:tableLabelProps = [
        { label: '品牌视频', prop: 'paymentOrderNo', width: '100' },
        { label: '落地页名称', prop: 'deptName', width: '130' },
        { label: '品牌logo', prop: 'companyName', width: '150', resizable: true },
        { label: '直播间ID', prop: 'supplierCompanyName', width: '180' },
        { label: '创建时间', prop: 'projectName', minWidth: '300' },
        { label: '更新时间', prop: 'poAmount', width: '160', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新人', prop: 'expectSupplierPaymentDate', width: '160' },
        { label: '落地页状态', prop: 'supplierPaymentType', width: '150', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] }

    ]

    onRenderPaymentLabel (h:CreateElement, scope:TableRenderParam): JSX.Element {
        return <span> {this.PAYMENTSTATUS.get(scope.row.paymentStatus)}/{scope.row.paymentNumber}</span>
    }

    onRenderPaidAmountLabel (h:CreateElement, scope:TableRenderParam): JSX.Element {
        return <span>{filters.money(scope.row.paidAmount, 2)}/{filters.money(scope.row.totalAmount, 2)}</span>
    }

    onRenderLoanTransferStatus (h:CreateElement, scope:TableRenderParam): JSX.Element {
        return (
            <div>
                { scope.row.loanTransferStatus == 1 ? '待对接' : scope.row.loanTransferStatus == 2 ? '已对接' : '-' }
                { scope.row.loanTransferStatus == 2 && <p>({ filters.formatterDate(scope.row.loanTransferDate) })</p> }
            </div>
        )
    }

    async getList () {

    }

    async onAdd () {

    }

    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(this._queryParams))
        this.getList()
    }

    async mounted () {

    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>

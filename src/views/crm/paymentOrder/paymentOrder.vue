<template>
    <div class="page-body B2b paymentOrderLayout">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">支付单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptName" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.deptName" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.dealerCompanyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">采购单名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.purchaseOrderName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">采购单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.purchaseOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                  <div class="query-cont-col">
                    <div class="query-col__label">项目运营审核时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onApproveStart" :end-change="onApproveEnd" :options="apprvoeOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择" multiple :clearable=true>
                            <el-option :label="value" :value="key" v-for="[key, value] of paymentOrderStatusOptions" :key="key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">合作方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.dealerCooperationMethod" placeholder="请选择" :clearable=true>
                            <el-option :label="item.value" :value="item.key" v-for="item in dealerList" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">申请人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.applyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="findPaymentOrderList({...queryParamsUseQuery, pageNumber: 1})">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{ paymentOrderPagination.total }}
                项,支付单总金额：<b>{{ paymentOrderPagination.amount | fundMoneyHasTail }}</b>元;
            </el-tag>
            <basicTable :tableData="paymentOrderList" :tableLabel="tableLabel" :pagination="paymentOrderPagination" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=450 :isShowIndex='true'>
                <template slot="applyAmount" slot-scope="scope">
                    <span>{{ scope.data.row.applyAmount | fundMoneyHasTail }}</span>
                </template>
                <template slot="applyDate" slot-scope="scope">
                    <span>{{ scope.data.row.applyDate | formatDate('YYYY-MM-DD HH:mm:ss') }}</span>
                </template>
                <template slot="updateTime" slot-scope="scope">
                    <span>{{ scope.data.row.updateTime | formatDate('YYYY-MM-DD HH:mm:ss') }}</span>
                </template>
                <template slot="status" slot-scope="scope">
                    <span>{{ paymentOrderStatusOptions.get(scope.data.row.status) }}</span>
                </template>
                <template slot="applyName" slot-scope="scope">
                    <p>{{scope.data.row.applyName}}</p>
                    <p v-if="scope.data.row.applyPhone">({{scope.data.row.applyPhone}})</p>
                </template>
                <template slot="dealerCooperationMethod" slot-scope="scope">
                    <span>{{ scope.data.row.dealerCooperationMethod==1?'垫资代采':scope.data.row.dealerCooperationMethod==2?'代收代付':'-'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <!-- operateStatus 操作按钮 1.发起放款交接 2.查看放款交接  3.null不展示-->
                    <h-button v-if="scope.data.row.operateStatus&&hosAuthCheck(Auths.LENDER_HANDOVER)" table @click="()=>openLoanTransferContent(scope.data.row.id,scope.data.row.operateStatus)">
                        {{scope.data.row.operateStatus===1?'发起放款交接':'查看放款交接'}}
                    </h-button>
                    <h-button table @click="$refs.paymentOrderDrawer.tableOpenApproveDialog(scope.data.row.id)" v-if="hosAuthCheck(Auths.CRM_PAYMENT_REVIEW) && (paymentOrderStatusKey.FINANCE_AUDIT === scope.data.row.status)">审核</h-button>
                    <h-button table @click="$refs.paymentOrderDrawer.tableOpenApproveDialog(scope.data.row.id)" v-if="hosAuthCheck(Auths.CRM_PAYMENT_REVIEW_PROJECT) && (paymentOrderStatusKey.OPERATE_AUDIT === scope.data.row.status)">审核</h-button>
                    <h-button table @click="$refs.paymentOrderDrawer.tableOpenFundsDialog(scope.data.row.id, scope.data.row.status)" v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONFIRM) &&
                              (paymentOrderStatusKey.DOWN_PAYMENT_CONFIRM === scope.data.row.status || paymentOrderStatusKey.REMAINING_PAYMENT_CONFIRM === scope.data.row.status)">
                        支付确认
                    </h-button>
                    <!-- <h-button table @click="tableOpenPrevPayDialog(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_PAYMENT_PREV) && (
                                  scope.data.row.supplierPayFlag === 1
                              )">
                        上游支付
                    </h-button> -->
                    <h-button table @click="tableOpenConfirmReceiptDialog(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONFIRM_RECEIPT) && (
                                  scope.data.row.goodsConfirmFlag === 1
                              )">确认收货</h-button>
                    <h-button table @click="openDrawer(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_PAYMENT_DETAIL)">查看详情</h-button>
                    <h-button table @click="openDrawerPur(scope.data.row)">审批记录</h-button>
                    <!-- dealerCooperationMethod 1 垫资代采 2 代收代付 -->
                    <h-button table @click="onUploadPay(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_PAYMENT_UPLOADPAY)&&(scope.data.row.status == 9 ||scope.data.row.status == 1)">上传支付凭证</h-button>
                </template>
            </basicTable>
        </div>
        <PaymentOrderDrawer :drawer=drawer @backEvent='paymentOrderBackEvent' @openApproveDialog="openApproveDialog" @openPrevPayDialog="openPrevPayDialog" @openFundsDialog="openFundsDialog" @openConfirmReceiptDialog="openConfirmReceiptDialog" @openLookReceiptDetail="openLookReceiptDetail"
            @openLookPrevPaymentDialog="openLookPrevPaymentDialog" :row="paymentOrderRow" ref="paymentOrderDrawer"></PaymentOrderDrawer>
        <ApprovePaymentOrder :is-open="approvePaymentVisible" :paymentDetail="paymentDetail" @onClose="approvePaymentVisible = false" @onCloseDialogAndQuery="onCloseDialogAndQuery"></ApprovePaymentOrder>
        <PrevPaymentDialog :params="paymentParams" :is-open="prevPaymentVisible" @onClose="prevPaymentVisible = false" @onCloseDialogAndQuery="onCloseDialogAndQuery('prevPaymentVisible')" @onCloseDialogAndQueryDetail="onCloseDialogAndQueryDetail"></PrevPaymentDialog>
        <LookPrevPaymentDialog :params="paymentParams" :is-open="lookPrevPaymentVisible" @onClose="lookPrevPaymentVisible = false"></LookPrevPaymentDialog>
        <ConfirmReceiptDialog :params="paymentParams" :is-open="confirmReceiptVisible" @onClose="confirmReceiptVisible = false" @onCloseDialogAndQuery="onCloseDialogAndQuery"></ConfirmReceiptDialog>
        <LookReceiptDetail :params="paymentParams" :is-open="lookReceiptVisible" @onClose="lookReceiptVisible = false"></LookReceiptDetail>
        <FundsDialog :detail="fundsDialogDetail" :status="paymentStatus" :is-open="fundsDialogVisible" @onClose="fundsDialogClose"></FundsDialog>
       <!-- 审批记录 -->
       <h-drawer title="审核记录" :visible.sync="drawerPur" direction='rtl' size='500px' :wrapperClosable="false" :beforeClose="handleClose">
            <template #connect>
                <h4 class="purchaseName">货款支付钉钉审批流程 <div style="color:#ff7a45">{{purchaseName}}</div>
                </h4>
                <div class="seal_records" v-for="(item,index) in editHistory" :key="index">
                    <div class="seal_records-tit">
                        <div><em>{{item.operator}}</em>
                            <div>{{item.operationName}}{{item.operationContent}}</div>
                        </div>
                        <div class="seal_records-times">{{moment(item.operationTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                    </div>

                    <div class="seal_records-remark" v-if="item.approvalRemark">备注：{{item.approvalRemark}}</div>
                </div>
                <div v-if="editHistory.length==0">暂无审批记录</div>
            </template>
        </h-drawer>
        <!-- 查看放款交接 -->
        <el-drawer v-if="loanTransferContentVisible" class="editordrawerbox" :title="operateStatus==1?'发起放款交接':'查看放款交接'" :visible.sync="loanTransferContentVisible" size='650px' :modal-append-to-body="false" :wrapperClosable='false' :before-close='editorDrawerClose'>
            <div class="drawer-content">
                <el-tabs v-model="activeName" @tab-click="handleClickTabs">
                    <el-tab-pane label="放款交接内容" name="LoanTransferContent">
                        <LoanTransferContent v-if="LoanTransferContent" :LoanTransferContent='LoanTransferContent' :paymentOrderId='paymentOrderId' @getDetailAgain='getDetailAgain' @closeLoanTransferContentVisible='onCloseLoanTransferContentVisible' :operateStatus='operateStatus'>
                        </LoanTransferContent>
                    </el-tab-pane>
                    <el-tab-pane label="查看交接记录" name="ViewHandoverRecords">
                        <ViewHandoverRecords :loanTransferRecord='loanTransferRecord'></ViewHandoverRecords>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-drawer>

        <UploadPayDialog ref="uploadpaydialog" @onBackSearch="findPaymentOrderList"/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import moment from 'moment'
import PaymentOrderDrawer from './components/paymentOrderDrawer'
import ApprovePaymentOrder from './components/approvePaymentOrder'
import PrevPaymentDialog from './components/prevPaymentDialog'
import LookPrevPaymentDialog from './components/lookPrevPaymentDialog'
import ConfirmReceiptDialog from './components/confirmReceiptDialog'
import LookReceiptDetail from './components/lookReceiptDetail'
import FundsDialog from '@/views/crm/funds/components/fundsDialog'
import * as Auths from '@/utils/auth_const'
import LoanTransferContent from './components/LoanTransferContent'
import ViewHandoverRecords from './components/ViewHandoverRecords'
import { getLoanTransferContent, getLoanTransferRecord, getLoanTransferCheck, approvalHistory, getNewAdvance } from './api/index'
import UploadPayDialog from '../funds/components/uploadPayDialog.vue'
import paymentOrderConst from '@/views/crm/paymentOrder/const'
import { newCache } from '@/utils/index'
export default {
    name: 'payOrder',
    components: {
        PaymentOrderDrawer,
        ApprovePaymentOrder,
        PrevPaymentDialog,
        LookPrevPaymentDialog,
        ConfirmReceiptDialog,
        LookReceiptDetail,
        FundsDialog,
        LoanTransferContent,
        ViewHandoverRecords,
        UploadPayDialog
    },
    data () {
        return {
            operateStatus: null,
            activeName: 'LoanTransferContent',
            loanTransferContentVisible: false,
            Auths,
            dealerList: [{ key: 1, value: '垫资代采' }, { key: 2, value: '代收代付' }],
            queryParams: {
                paymentOrderNo: '',
                deptName: '',
                dealerCompanyName: '',
                purchaseOrderName: '',
                purchaseOrderNo: '',
                startApplyDate: '',
                endApplyDate: '',
                startApprovalTime: '',
                endApprovalTime: '',
                status: '',
                pageSize: 10,
                pageNumber: 1,
                'sort.property': null,
                'sort.direction': null,
                applyName: ''
            },
            tableLabel: [
                { label: '支付单编号', prop: 'paymentOrderNo', width: '150' },
                { label: '所属分部', prop: 'deptName', width: '150' },
                { label: '经销商', prop: 'dealerCompanyName', width: '150' },
                { label: '采购单名称', prop: 'purchaseOrderName', width: '200' },
                { label: '采购单编号', prop: 'purchaseOrderNo', width: '150' },
                { label: '金额', prop: 'applyAmount', width: '150', align: 'right' },
                { label: '状态', prop: 'status', width: '150' },
                { label: '合作方式', prop: 'dealerCooperationMethod', width: '150' },
                { label: '申请人', prop: 'applyName', width: '150' },
                { label: '申请时间', prop: 'applyDate', width: '150', formatters: 'dateTimes', sortable: 'applyDate' },
                {
                    label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes', sortable: 'updateTime'
                },
                { label: '项目运营时间', prop: 'approvalTime', width: '150', formatters: 'dateTimes', sortable: 'approvalTime' }
            ],
            paginationInfo: {},
            drawer: false,
            drawerPur: false,
            paymentOrderRow: {},
            paymentDetail: null,
            approvePaymentVisible: false,
            prevPaymentVisible: false,
            lookPrevPaymentVisible: false,
            confirmReceiptVisible: false,
            lookReceiptVisible: false,
            fundsDialogVisible: false,
            paymentStatus: '',
            paymentParams: {}, // 公共
            fundsDialogDetail: {},
            paymentOrderId: '',
            LoanTransferContent: '',
            loanTransferRecord: '',
            paymentOrderStatusOptions: paymentOrderConst.PAYMENT_ORDER_STATUS_OPTIONS,
            paymentOrderStatusKey: paymentOrderConst.PAYMENT_ORDER_STATUS_KEY,

            // 审批记录
            approvalList: [],
            purchaseName: '',
            editHistory: []
        }
    },
    computed: {
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.startApplyDate,
                endTime: this.queryParams.endApplyDate
            }
        },
        apprvoeOptions () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.startApprovalTime,
                endTime: this.queryParams.endApprovalTime
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            paymentOrderList: 'crmPaymentOrder/paymentOrderList',
            crmdepList: 'crmmanage/crmdepList',
            paymentOrderPagination: 'crmPaymentOrder/paymentOrderPagination'
        }),
        queryParamsUseQuery () {
            return {
                ...this.queryParams,
                status: this.queryParams.status.join(',')
                // authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '',
                // jobNumber: this.userInfo.jobNumber
            }
        }
    },
    methods: {
        moment,
        editorDrawerClose () {
            this.loanTransferContentVisible = false
            this.activeName = 'LoanTransferContent'
            this.operateStatus = null
        },
        async handleClickTabs (tab, event) {
            if (tab.name === 'ViewHandoverRecords') {
                const { data } = await getLoanTransferRecord(this.paymentOrderId)
                this.loanTransferRecord = data
            }
        },
        onCloseLoanTransferContentVisible () {
            this.findPaymentOrderList(this.queryParamsUseQuery)
            this.loanTransferContentVisible = false
            this.operateStatus = null
        },
        async getDetailAgain () {
            const { data } = await getLoanTransferContent(this.paymentOrderId)
            this.LoanTransferContent = data
        },
        async openLoanTransferContent (paymentOrderId, operateStatus) {
            if (operateStatus == 1) {
                await getLoanTransferCheck(paymentOrderId)
            }
            this.operateStatus = operateStatus
            // this.operateStatus = 1
            this.paymentOrderId = paymentOrderId
            const { data } = await getLoanTransferContent(paymentOrderId)
            this.loanTransferContentVisible = true
            this.LoanTransferContent = data
        },
        onOpenDialog (val) {
            this.openDialog = val
        },
        onStartChange (val) {
            this.queryParams.startApplyDate = val
        },
        onEndChange (val) {
            this.queryParams.endApplyDate = val
        },
        onApproveStart (val) {
            this.queryParams.startApprovalTime = val
        },
        onApproveEnd (val) {
            this.queryParams.endApprovalTime = val
        },
        fundsDialogClose () {
            this.fundsDialogVisible = false
            this.$refs.paymentOrderDrawer.getPaymentOrderDetail()
            this.findPaymentOrderList(this.queryParamsUseQuery)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findPaymentOrderList(this.queryParamsUseQuery)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findPaymentOrderList(this.queryParamsUseQuery)
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
            this.findPaymentOrderList(this.queryParamsUseQuery)
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams['sort.property'] = val.prop + ''
                this.queryParams['sort.direction'] = val.order === 'ascending' ? 'ASC' : 'DESC'
            } else {
                this.queryParams['sort.property'] = null
                this.queryParams['sort.direction'] = null
            }
            this.findPaymentOrderList(this.queryParamsUseQuery)
        },
        paymentOrderBackEvent () {
            this.drawer = false
        },
        openDrawer (row) {
            this.drawer = true
            this.paymentOrderRow = row
        },
        async openDrawerPur (row) {
            this.drawerPur = true
            this.purchaseName = row.purchaseOrderName + '申请支付' + row.applyAmount + '元'
            const { data } = await approvalHistory(row.id)
            this.editHistory = data
        },
        openApproveDialog (row) {
            this.paymentDetail = row
            this.approvePaymentVisible = true
        },
        openPrevPayDialog (params) {
            this.paymentParams = params
            this.prevPaymentVisible = true
        },
        openFundsDialog (row, status) {
            this.fundsDialogVisible = true
            this.fundsDialogDetail = row
            this.paymentStatus = status
        },
        openConfirmReceiptDialog (params) {
            this.paymentParams = params
            this.confirmReceiptVisible = true
        },
        openLookReceiptDetail (params) {
            this.paymentParams = params
            this.lookReceiptVisible = true
        },
        openLookPrevPaymentDialog (params) {
            this.paymentParams = params
            this.lookPrevPaymentVisible = true
        },
        tableOpenPrevPayDialog (row) {
            const params = {
                paymentOrderId: row.id,
                poId: row.poId
            }
            this.openPrevPayDialog(params)
        },
        tableOpenConfirmReceiptDialog (row) {
            const params = {
                paymentOrderId: row.id
            }
            this.openConfirmReceiptDialog(params)
        },
        onCloseDialogAndQuery (type) {
            this[type] = false
            this.findPaymentOrderList(this.queryParamsUseQuery)
            this.drawer = false
        },
        onCloseDialogAndQueryDetail (type) {
            this[type] = false
            if (this.drawer) {
                this.$refs.paymentOrderDrawer.getPaymentOrderDetail()
                this.findPaymentOrderList(this.queryParamsUseQuery)
            } else {
                this.findPaymentOrderList(this.queryParamsUseQuery)
            }
            // this.drawer && this.$refs.paymentOrderDrawer.getPaymentOrderDetail()
        },
        async    onUploadPay (val) {
            // 调用接口查询最新的账单信息
            const { data } = await getNewAdvance(val.id)
            this.$refs.uploadpaydialog.onDialogClick(val, 1, data.fundAmount)
        },
        handleClose () {
            this.drawerPur = false
        },
        ...mapActions({
            findPaymentOrderList: 'crmPaymentOrder/getPaymentOrderList',
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        })
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        if (this.$route.query.id) {
            this.queryParams.paymentOrderNo = this.$route.query.id
        }
        this.findPaymentOrderList(this.queryParamsUseQuery)
        this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: JSON.parse(sessionStorage.getItem('authCode'))
        })
    },
    beforeUpdate () {
        newCache('payOrder')
    }
}
</script>

<style scoped lang='scss' >
.eltagtop {
    margin-bottom: 10px;
}
.paymentOrderLayout {
    .editordrawerbox {
        /deep/ .el-drawer__header {
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
            font-size: 18px;
            margin-bottom: 10px;
        }
        .drawer-content {
            padding: 0 20px;
        }
    }
}

.purchaseName {
    margin-bottom: 20px;
}
.seal_records {
    margin-bottom: 10px;
    &-tit {
        display: flex;
        justify-content: space-between;
        em {
            font-style: normal;
            color: #2196f3;
        }
    }
    &-remark {
        color: #f00;
    }
}
</style>

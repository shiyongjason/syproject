<template>
    <div class="page-body B2b">
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
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList"
                                       :key="item.pkDeptDoc"></el-option>
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
                        <el-date-picker v-model="queryParams.startApplyDate" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endApplyDate" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择" :clearable=true>
                            <el-option :label="item.value" :value="item.key" v-for="item in PaymentOrderDict.status.list"
                                       :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="findPaymentOrderList({...queryParams, pageNumber: 1})">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{ paymentOrderPagination.total }}
                项,采购单总金额：<b>{{ paymentOrderPagination.amount | fundMoneyHasTail }}</b>元;
            </el-tag>
            <basicTable :tableData="paymentOrderList" :tableLabel="tableLabel" :pagination="paymentOrderPagination"
                        @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange"
                        @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=350
                        :isShowIndex='true'>
                <template slot="applyAmount" slot-scope="scope">
                    <span class="colblue">{{ scope.data.row.applyAmount | fundMoneyHasTail }}</span>
                </template>
                <template slot="status" slot-scope="scope">
                    <span class="colblue">{{ scope.data.row.status | attributeComputed(PaymentOrderDict.status.list) }}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table
                              @click="$refs.paymentOrderDrawer.tableOpenApproveDialog(scope.data.row.id)"
                              v-if="hosAuthCheck(Auths.CRM_PAYMENT_REVIEW) && PaymentOrderDict.status.list[0].key === scope.data.row.status">审核</h-button>
                    <h-button table
                              @click="$refs.paymentOrderDrawer.tableOpenFundsDialog(scope.data.row.id, scope.data.row.status)"
                              v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONFIRM) &&
                              (PaymentOrderDict.status.list[2].key === scope.data.row.status || PaymentOrderDict.status.list[5].key === scope.data.row.status)"
                    >
                        支付确认
                    </h-button>
                    <h-button table
                              @click="tableOpenPrevPayDialog(scope.data.row)"
                              v-if="hosAuthCheck(Auths.CRM_PAYMENT_PREV) && (
                                  PaymentOrderDict.status.list[0].key !== scope.data.row.status
                              )"
                    >
                        上游支付
                    </h-button>
                    <h-button table
                              @click="tableOpenConfirmReceiptDialog(scope.data.row)"
                              v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONFIRM_RECEIPT) && (
                                  PaymentOrderDict.status.list[3].key === scope.data.row.status
                              )"
                    >确认收货</h-button>
                    <h-button table @click="openDrawer(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_PAYMENT_DETAIL)">查看详情</h-button>
                </template>
            </basicTable>
        </div>
        <PaymentOrderDrawer :drawer=drawer @backEvent='paymentOrderBackEvent'
                            @openApproveDialog="openApproveDialog"
                            @openPrevPayDialog="openPrevPayDialog"
                            @openFundsDialog="openFundsDialog"
                            @openConfirmReceiptDialog="openConfirmReceiptDialog"
                            @openLookReceiptDetail="openLookReceiptDetail"
                            @openLookPrevPaymentDialog="openLookPrevPaymentDialog"
                            :row="paymentOrderRow"
                            ref="paymentOrderDrawer"></PaymentOrderDrawer>
        <ApprovePaymentOrder :is-open="approvePaymentVisible" :paymentDetail="paymentDetail"
                             @onClose="approvePaymentVisible = false" @onCloseDialogAndQuery="onCloseDialogAndQuery"></ApprovePaymentOrder>
        <PrevPaymentDialog :params="paymentParams" :is-open="prevPaymentVisible"
                           @onClose="prevPaymentVisible = false" @onCloseDialogAndQuery="onCloseDialogAndQuery('prevPaymentVisible')"></PrevPaymentDialog>
        <LookPrevPaymentDialog :params="paymentParams" :is-open="lookPrevPaymentVisible"
                               @onClose="lookPrevPaymentVisible = false"></LookPrevPaymentDialog>
        <ConfirmReceiptDialog :params="paymentParams" :is-open="confirmReceiptVisible"
                              @onClose="confirmReceiptVisible = false"></ConfirmReceiptDialog>
        <LookReceiptDetail :params="paymentParams" :is-open="lookReceiptVisible"
                           @onClose="lookReceiptVisible = false"></LookReceiptDetail>
        <FundsDialog :detail="fundsDialogDetail" :status="paymentStatus" :is-open="fundsDialogVisible"
                     @onClose="fundsDialogVisible = false"></FundsDialog>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import PaymentOrderDrawer from '@/views/crm/paymentOrder/components/paymentOrderDrawer'
import ApprovePaymentOrder from './components/approvePaymentOrder'
import PrevPaymentDialog from './components/prevPaymentDialog'
import LookPrevPaymentDialog from './components/lookPrevPaymentDialog'
import ConfirmReceiptDialog from './components/confirmReceiptDialog'
import LookReceiptDetail from './components/lookReceiptDetail'
import FundsDialog from '@/views/crm/funds/components/fundsDialog'
import * as Auths from '@/utils/auth_const'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'

export default {
    name: 'payOrder',
    components: {
        PaymentOrderDrawer,
        ApprovePaymentOrder,
        PrevPaymentDialog,
        LookPrevPaymentDialog,
        ConfirmReceiptDialog,
        LookReceiptDetail,
        FundsDialog
    },
    data () {
        return {
            Auths,
            queryParams: {
                paymentOrderNo: '',
                deptName: '',
                dealerCompanyName: '',
                purchaseOrderName: '',
                purchaseOrderNo: '',
                startApplyDate: '',
                endApplyDate: '',
                status: '',
                pageSize: 10,
                pageNumber: 1,
                'sort.property': null,
                'sort.direction': null
            },
            tableData: [{ no: 1 }],
            tableLabel: [
                { label: '支付单编号', prop: 'paymentOrderNo', width: '150' },
                { label: '所属分部', prop: 'deptName', width: '150' },
                { label: '经销商', prop: 'dealerCompanyName', width: '150' },
                { label: '采购单名称', prop: 'purchaseOrderName', width: '200' },
                { label: '采购单编号', prop: 'purchaseOrderNo', width: '150' },
                { label: '金额', prop: 'applyAmount', width: '150' },
                { label: '状态', prop: 'status', width: '150' },
                { label: '申请时间', prop: 'applyDate', width: '150', formatters: 'dateTimes', sortable: 'applyDate' },
                {
                    label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes', sortable: 'updateTime'
                }
            ],
            paginationInfo: {},
            drawer: false,
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
            PaymentOrderDict
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endApplyDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startApplyDate
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            paymentOrderList: 'crmPaymentOrder/paymentOrderList',
            crmdepList: 'crmmanage/crmdepList',
            paymentOrderPagination: 'crmPaymentOrder/paymentOrderPagination'
        })
    },
    methods: {
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findPaymentOrderList(this.queryParams)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findPaymentOrderList(this.queryParams)
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
            this.findPaymentOrderList(this.queryParams)
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams['sort.property'] = val.prop + ''
                this.queryParams['sort.direction'] = val.order === 'ascending' ? 'ASC' : 'DESC'
            } else {
                this.queryParams['sort.property'] = null
                this.queryParams['sort.direction'] = null
            }
            this.findPaymentOrderList(this.queryParams)
        },
        paymentOrderBackEvent () {
            this.drawer = false
        },
        openDrawer (row) {
            this.drawer = true
            this.paymentOrderRow = row
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
            this.findPaymentOrderList(this.queryParams)
            this.drawer = false
        },
        ...mapActions({
            findPaymentOrderList: 'crmPaymentOrder/getPaymentOrderList',
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        })
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        this.findPaymentOrderList(this.queryParams)
        this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: JSON.parse(sessionStorage.getItem('authCode'))
        })
    }
}
</script>

<style scoped>
.eltagtop {
    margin-bottom: 10px;
}
</style>

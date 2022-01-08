<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">{{labelName}}：</div>
                    <div class="query-col__input" v-if="queryParams.repaymentTypeArrays==4">
                        <el-input v-model="queryParams.prepaymentOrderId" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                    <div class="query-col__input" v-else>
                        <el-input v-model="queryParams.fundId" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">{{queryParams.repaymentTypeArrays==4?'预付款':''}}支付单编号：</div>
                    <div class="query-col__input" v-if="queryParams.repaymentTypeArrays==4">
                        <el-input v-model="queryParams.prepaymentNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                    <div class="query-col__input" v-else>
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmDeptList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">已支付金额：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minPaidAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">元</template></el-input>
                        -
                        <el-input v-model="queryParams.maxPaidAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">支付待确认金额：</div>
                    <div class="query-col__input">
                        <el-input v-model.trim="queryParams.minUnconfirmedAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">元</template></el-input>
                        -
                        <el-input v-model.trim="queryParams.maxUnconfirmedAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">待支付金额：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minUnpaidAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">元</template></el-input>
                        -
                        <el-input v-model="queryParams.maxUnpaidAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">项目：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.paymentFlagArrays" placeholder="请选择" :clearable=true>
                            <el-option :label="item.value" :value="item.key" v-for="item in statusOption" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">应支付日期：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">支付成功时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartPay" :end-change="onEndPay" :options="payOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="onSwtichInfo({...queryParamsUseQuery, pageNumber: 1})">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tabs v-model="queryParams.repaymentTypeArrays" @tab-click="handleClick">
                <el-tab-pane :label="item.value" :name="item.key" :key="item.key" v-for="item in FundsDict.repaymentTypeArrays.list">
                </el-tab-pane>
            </el-tabs>
            <el-tag size="medium" class="eltagtop">已筛选 {{ fundsListPagination.total }}
                项,{{ totalLabelName }}总金额：<b>{{ fundsListPagination.amount | moneyFormat }} </b>元;
            </el-tag>
            <basicTable :tableData="fundsList" :tableLabel="tableLabel" :pagination="fundsListPagination" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=290 :isShowIndex='true'>
                <template slot="paymentAmount" slot-scope="scope">
                    <span> {{ scope.data.row.paymentAmount | moneyFormat }}</span>
                </template>
                <template slot="paymentFlag" slot-scope="scope">
                    <span> {{ scope.data.row.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list) }}</span>
                </template>
                <template slot="paidTime" slot-scope="scope">
                    <span v-if="scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[2].key"> {{ scope.data.row.paidTime | momentFormat }}</span>
                    <span v-else>-</span>
                </template>
                <template slot="paymentOrderAmount" slot-scope="scope">
                    <span> {{ scope.data.row.paymentOrderAmount | moneyFormat }}</span>
                </template>
                <template slot='customerName' slot-scope='scope'>
                    <span>{{scope.data.row.customerName || '-'}} {{scope.data.row.customerMobile}}</span>
                </template>
                <template slot="threeDayEmailStatus" slot-scope="scope">
                    {{emailStatus[scope.data.row.threeDayEmailStatus]}}
                </template>
                <template slot="currDayEmailStatus" slot-scope="scope">
                    {{emailStatus[scope.data.row.currDayEmailStatus]}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="seePayEnter(scope.data.row)" v-if="hasSeePayEnterAuth(queryParams.repaymentTypeArrays)">查看凭证</h-button>
                        <!-- 待支付 支付待确认  出先支付确认 -->
                    <template v-if="scope.data.row.repaymentType =='1'">
                        <!-- 首付款(支付待确认金额大于0)才显示支付确认 -->
                        <h-button table @click="onPayDetail(scope.data.row)" v-if="(scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[0].key||scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key) &&  hasPayEnterAuth(queryParams.repaymentTypeArrays)&&!scope.data.row.payBatch">支付确认</h-button>
                        <h-button table @click="onBatchSumbit(scope.data.row)" v-if="scope.data.row.payBatch&&scope.data.row.paymentFlag==1">
                            批量确认
                        </h-button>
                        <h-button table @click="onUploadPay(scope.data.row)" v-if="(scope.data.row.paymentFlag==0||scope.data.row.paymentFlag==3)&&hosAuthCheck(Auths.CRM_FUNDS_DOWN_UPLOAD)&&scope.data.row.unpaidAmount > 0">
                            上传支付凭证
                        </h-button>
                    </template>
                    <template v-if="scope.data.row.repaymentType =='3'">
                        <h-button table @click="onBatchSumbit(scope.data.row)" v-if="scope.data.row.showPayBatchConfirm">
                            批量确认
                        </h-button>
                        <h-button table @click="onPayDetail(scope.data.row)" v-if="scope.data.row.paymentFlag==PaymentOrderDict.paymentFlag.list[0].key||(scope.data.row.showPayConfirm && scope.data.row.unconfirmedAmount > 0)">
                            支付确认
                        </h-button>
                        <h-button table @click="onUploadPay(scope.data.row)" v-if="(scope.data.row.paymentFlag==0||scope.data.row.paymentFlag==3)&&hosAuthCheck(Auths.CRM_FUNDS_DOWN_UPLOAD)&&scope.data.row.unpaidAmount > 0">
                            上传支付凭证
                        </h-button>
                    </template>
                    <template v-if="scope.data.row.repaymentType =='2'">
                        <h-button table @click="onBatchSumbit(scope.data.row)" v-if="scope.data.row.showPayBatchConfirm">
                            批量确认
                        </h-button>
                        <h-button table @click="onPayDetail(scope.data.row)" v-if="scope.data.row.paymentFlag==PaymentOrderDict.paymentFlag.list[0].key||scope.data.row.showPayConfirm">
                            支付确认
                        </h-button>
                        <h-button table @click="onUploadPay(scope.data.row)" v-if="(scope.data.row.paymentFlag==0||scope.data.row.paymentFlag==3)&&hosAuthCheck(Auths.CRM_FUNDS_DOWN_UPLOAD)&&scope.data.row.unpaidAmount > 0">
                            上传支付凭证
                        </h-button>
                    </template>
                    <template v-if="queryParams.repaymentTypeArrays =='4'">
                        <h-button table @click="onPayDetail(scope.data.row)" v-if="(scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[0].key||scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key)&&hosAuthCheck(Auths.CRM_FUNDS_CHARGE_FUND_CONFIRM)">
                            支付确认
                        </h-button>
                        <h-button table @click="onUploadPay(scope.data.row)" v-if="(scope.data.row.paymentFlag==0)&&hosAuthCheck(Auths.CRM_FUNDS_CHARGE_FUND_UPLOAD)">
                            上传支付凭证
                        </h-button>
                    </template>
                </template>
            </basicTable>
            <FundsDialog :is-open="fundsDialogVisible" :detail="fundsDialogDetail" :status="queryParams.repaymentTypeArrays" @onClose="fundsDialogClose"></FundsDialog>
            <UploadDialog ref="uploaddialog" @onBackSearch="onSwtichInfo(queryParams)"></UploadDialog>
            <ReduleDialog :is-open="reduleDialogVisible" ref="reduleDialog" @onClose="fundsDialogClose"></ReduleDialog>
            <ConfirmReceiptDialog :params="paymentParams" :is-open="confirmReceiptVisible" @onClose="confirmReceiptVisible = false" @onCloseDialogAndQuery="onCloseDialogAndQuery"></ConfirmReceiptDialog>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import FundsDialog from './components/fundsDialog'
import FundsDict from '@/views/crm/funds/fundsDict'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'
import UploadDialog from './components/uploadPayDialog.vue'
import ReduleDialog from './components/redulePayDialog.vue'
import ConfirmReceiptDialog from '../paymentOrder/components/confirmReceiptDialog.vue'
import * as Auths from '@/utils/auth_const'
import { newCache } from '@/utils/index'
import { findPrePaymentList, getFundsList, getFundsListTotal, findPrePaymentAmount } from './api/index'
export default {
    name: 'funds',
    components: {
        FundsDialog, UploadDialog, ReduleDialog, ConfirmReceiptDialog
    },
    data () {
        return {
            Auths,
            emailStatus: { 1: '待投递', 2: '已投递', 3: '投递失败' },
            queryParams: {
                minPaidAmount: '',
                maxPaidAmount: '',
                minUnconfirmedAmount: '',
                maxUnconfirmedAmount: '',
                minUnpaidAmount: '',
                maxUnpaidAmount: '',
                pageNumber: 1,
                pageSize: 10,
                fundId: '',
                paymentOrderNo: '',
                subsectionCode: '',
                companyName: '',
                projectName: '',
                paymentFlagArrays: '',
                scheduleStartTime: '',
                scheduleEndTime: '',
                paidStartTime: '',
                paidEndTime: '',
                'sort.property': null,
                'sort.direction': null,
                repaymentTypeArrays: '1' // 默认 1-首付款；2-剩余货款；3-服务费；
            },
            fundsDialogVisible: false,
            reduleDialogVisible: false,
            fundsDialogDetail: {},
            reduleDialogDetail: {},
            FundsDict,
            PaymentOrderDict,
            labelName: '',
            totalLabelName: '',
            fundsList: [],
            fundsListPagination: {},
            // 状态
            statusOption: [],
            confirmReceiptVisible: false,
            paymentParams: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            // fundsList: 'crmFunds/fundsList',
            // fundsListPagination: 'crmFunds/fundsListPagination',
            crmDeptList: 'crmmanage/crmdepList'
        }),
        options () {
            if (this.queryParams.repaymentTypeArrays == 4) {
                return {
                    type: 'date',
                    valueFormat: 'yyyy-MM-dd',
                    format: 'yyyy-MM-dd',
                    startTime: this.queryParams.scheduleStartTime,
                    endTime: this.queryParams.scheduleEndTime
                }
            } else {
                return {
                    type: 'datetime',
                    valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    startTime: this.queryParams.scheduleStartTime,
                    endTime: this.queryParams.scheduleEndTime
                }
            }
        },
        payOptions () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.paidStartTime,
                endTime: this.queryParams.paidEndTime
            }
        },
        tableLabel () {
            const label = [
                { label: '', prop: 'id', width: '155' },
                { label: '所属分部', prop: 'subsectionName', width: '150' },
                { label: '经销商', prop: 'companyName', width: '150' },
                { label: '所属项目', prop: 'projectName', width: '150' },
                { label: '预付款支付单编号', prop: 'prepaymentNo', width: '150', isHidden: this.queryParams.repaymentTypeArrays !== '4' },
                {
                    label: '客户经理',
                    prop: 'customerName',
                    width: '150'
                },
                { label: '支付单编号', prop: 'paymentOrderNo', width: '150', isHidden: this.queryParams.repaymentTypeArrays == '4' },
                { label: '支付单金额', prop: 'paymentOrderAmount', width: '150', isHidden: this.queryParams.repaymentTypeArrays == '4' },
                { label: '期数', prop: 'feeRepaymentOrder', width: '100', isHidden: this.queryParams.repaymentTypeArrays !== '3' },
                { label: '首付款总金额', prop: 'paymentAmount', width: '150', isHidden: this.queryParams.repaymentTypeArrays !== '1' },
                { label: '金额', prop: 'paymentAmount', width: '150', isHidden: this.queryParams.repaymentTypeArrays != '3' },
                { label: '剩余货款总金额', prop: 'paymentAmount', formatters: 'moneyShow', width: '150', align: 'center', isHidden: this.queryParams.repaymentTypeArrays !== '2' },
                { label: '预付款金额', prop: 'paymentAmount', formatters: 'moneyShow', width: '150', align: 'center', isHidden: this.queryParams.repaymentTypeArrays !== '4' },
                { label: '已支付金额', prop: 'paidAmount', formatters: 'moneyShow', width: '150', align: 'center' },
                { label: '支付待确认金额', prop: 'unconfirmedAmount', formatters: 'moneyShow', width: '150', align: 'center' },
                { label: '待支付金额', prop: 'unpaidAmount', formatters: 'moneyShow', width: '150', align: 'center' },

                { label: '状态', prop: 'paymentFlag', width: '150' },
                {
                    label: '应支付日期',
                    prop: 'schedulePaymentDate',
                    width: '150',
                    formatters: 'date',
                    sortable: 'custom'
                },
                { label: '支付成功时间', prop: 'paidTime', width: '150', formatters: 'dateTime' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTime', sortable: 'updateTime' },
                { label: '（应还3日前)邮件状态', prop: 'threeDayEmailStatus', width: '150', isHidden: this.queryParams.repaymentTypeArrays == '4' },
                { label: '（应还当日)邮件状态', prop: 'currDayEmailStatus', width: '150', isHidden: this.queryParams.repaymentTypeArrays == '4' }
            ]
            // FundsDict repaymentTypeArrays类型
            if (this.queryParams.repaymentTypeArrays === '1') {
                label[0].label = '首付款流水号'
            } else if (this.queryParams.repaymentTypeArrays === '3') {
                label[0].label = '服务费流水号'
            } else if (this.queryParams.repaymentTypeArrays === '2') {
                label[0].label = '剩余货款流水号'
            } else if (this.queryParams.repaymentTypeArrays === '4') {
                label[0].label = '预付款流水号'
            }
            return label
        },
        queryParamsUseQuery () {
            return {
                ...this.queryParams,
                authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '',
                jobNumber: this.userInfo.jobNumber
            }
        }
    },
    methods: {
        onStartChange (val) {
            this.queryParams.scheduleStartTime = val
        },
        onEndChange (val) {
            this.queryParams.scheduleEndTime = val
        },
        onStartPay (val) {
            this.queryParams.paidStartTime = val
        },
        onEndPay (val) {
            this.queryParams.paidEndTime = val
        },
        fundsDialogClose (isRefresh = true) {
            this.fundsDialogVisible = false
            this.reduleDialogVisible = false
            if (isRefresh) {
                this.onSwtichInfo(this.queryParamsUseQuery)
            }
        },
        hasPayEnterAuth (type) {
            // 1-首付款；2-剩余货款；3-服务费；4-预付款
            if (type === '1') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_DOWN_PAYMENT_FUND_CONFIRM)
            }
            if (type === '2') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_ARREAR_FUND_CONFIRM)
            }
            if (type === '3') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_SERVICE_FUND_CONFIRM)
            }
            // if (type === '4') {
            //     return this.hosAuthCheck(this.Auths.CRM_FUNDS_CHARGE_FUND_CONFIRM)
            // }
        },
        hasSeePayEnterAuth (type) {
            // 1-首付款；2-剩余货款；3-服务费；4-预付款
            if (type === '1') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_DOWN_PAYMENT_FUND_SEE)
            }
            if (type === '2') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_ARREAR_FUND_SEE)
            }
            if (type === '3') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_SERVICE_FUND_SEE)
            }
            if (type === '4') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_CHARGE_FUND_SEE)
            }
        },
        handleClick (val) {
            // 剩余贷款 状态去除支付失败（key == 3）状态
            if (val.name == 2) {
                this.statusOption = this.FundsDict.paymentFlagArrays.list.filter(val => val.key != 3)
            } else {
                this.statusOption = this.FundsDict.paymentFlagArrays.list
            }
            const { repaymentTypeArrays } = this.queryParams
            this.queryParams = { ...this.queryParamsTemp, repaymentTypeArrays }
            this.onSwtichInfo(this.queryParamsUseQuery)
            this.switchName()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onSwtichInfo(this.queryParamsUseQuery)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onSwtichInfo(this.queryParamsUseQuery)
        },
        onReset () {
            const repaymentTypeArrays = this.queryParams.repaymentTypeArrays
            this.queryParams = { ...this.queryParamsTemp, repaymentTypeArrays }
            this.onSwtichInfo(this.queryParamsUseQuery)
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams['sort.property'] = val.prop + ''
                this.queryParams['sort.direction'] = val.order === 'ascending' ? 'ASC' : 'DESC'
            } else {
                this.queryParams['sort.property'] = null
                this.queryParams['sort.direction'] = null
            }
            this.onSwtichInfo(this.queryParamsUseQuery)
        },
        onPayEnter (row) {
            // 服务费 首付款 支付确认
            this.fundsDialogVisible = true
            if (row.repaymentType !== 1) {
                this.fundsDialogDetail = {
                    orderId: row.orderId,
                    id: row.id,
                    type: 'downPay'
                }
            } else {
                this.fundsDialogDetail = {
                    orderId: row.orderId,
                    id: row.id
                }
            }
        },
        onPayDetail (row) {
            // if (row.repaymentType !== 1) {
            //     // 剩余货款展示新的支付确认
            //     this.reduleDialogVisible = true
            //     this.$refs.reduleDialog.findRemainConfirm(row, row.repaymentType)
            // }
            this.$refs.reduleDialog.findRemainConfirm(row, row.repaymentType)
            this.reduleDialogVisible = true
        },
        seePayEnter (row) {
            console.log(row)
            // if (row.repaymentType !== 1) {
            //     this.reduleDialogVisible = true
            //     this.$refs.reduleDialog.getFundsTicket(row, row.repaymentType)
            // } else {
            this.$refs.reduleDialog.getFundsTicket(row, row.repaymentType)
            this.reduleDialogVisible = true
            // }
        },
        switchName () {
            if (this.queryParams.repaymentTypeArrays === '1') {
                this.labelName = '首付款流水号'
                this.totalLabelName = '首付款'
            }
            if (this.queryParams.repaymentTypeArrays === '3') {
                this.labelName = '服务费流水号'
                this.totalLabelName = '服务费'
            }
            if (this.queryParams.repaymentTypeArrays === '2') {
                this.labelName = '剩余货款流水号'
                this.totalLabelName = '剩余货款'
            }
            if (this.queryParams.repaymentTypeArrays === '4') {
                this.labelName = '预付款流水号'
                this.totalLabelName = '预付款'
            }
        },
        onUploadPay (val) {
            if (val.paymentOrderStatus == 8 && this.queryParams.repaymentTypeArrays == 2) {
                // 货款先进去校验
                this.$confirm('支付单全部收货后，才可支付尾款哦～', '收货提示', {
                    confirmButtonText: '去收货',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.paymentParams = { paymentOrderId: val.orderId }
                    this.confirmReceiptVisible = true
                }).catch(() => {

                })
            } else {
                this.$refs.uploaddialog.onDialogClick(val)
            }
        },
        onBatchSumbit (val) {
            this.$router.push({ path: '/goodwork/batchpsubmit', query: { fundId: val.id } })
        },
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        }),
        onCloseDialogAndQuery () {
            this.confirmReceiptVisible = false
            this.onSwtichInfo(this.queryParamsUseQuery)
        },
        async onFindPrePaymentList (params) {
            const { data } = await findPrePaymentList(params)
            const { data: amountData } = await findPrePaymentAmount(params)
            this.fundsList = data.records
            this.fundsListPagination = {
                total: data.total,
                pageSize: data.size,
                amount: amountData,
                pageNumber: data.current
            }
        },
        async onGetFundsList (params) {
            const { data } = await getFundsList(params)
            const { data: amountData } = await getFundsListTotal(params)
            this.fundsList = data.records
            this.fundsListPagination = {
                total: data.total,
                pageSize: data.size,
                amount: amountData,
                pageNumber: data.current
            }
        },
        // 预付款单独调用接口
        onSwtichInfo (queryParamsUseQuery) {
            console.log('queryParamsUseQuery', queryParamsUseQuery)
            this.fundsListPagination = {}
            this.fundsList = []
            if (this.queryParams.repaymentTypeArrays == 4) {
                this.onFindPrePaymentList(queryParamsUseQuery)
            } else {
                this.onGetFundsList(queryParamsUseQuery)
            }
        }
    },
    mounted () {
        // 剩余贷款去除支付失败状态处理
        this.statusOption = this.FundsDict.paymentFlagArrays.list
        this.queryParamsTemp = { ...this.queryParams }
        const temp = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
        this.onSwtichInfo(this.queryParamsUseQuery)
        this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: temp
        })
        this.switchName()
    },
    beforeUpdate () {
        newCache('funds')
    },
    activated () {
        // 解决HAM-37384bug 批量确认跳转过来因为keep-alive缓存没有执行mounted
        this.statusOption = this.FundsDict.paymentFlagArrays.list
        // this.queryParamsTemp = { ...this.queryParams }
        const temp = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
        this.onSwtichInfo(this.queryParamsUseQuery)
        this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: temp
        })
        this.switchName()
    }
}
</script>

<style scoped lang='scss'>
.eltagtop {
    margin-bottom: 10px;
}
</style>

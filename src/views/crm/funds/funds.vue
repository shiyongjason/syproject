<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">{{labelName}}流水号：</div>
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
                            <el-option :label="value" :value="key" v-for="[key, value] of statusOption" :key="key"></el-option>
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
                <div class="query-cont-col" v-if="queryParams.repaymentTypeArrays === '3'">
                    <div class="query-col__label">发票状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.invoiceStatus" placeholder="请选择" :clearable=true>
                            <template v-for="[key, value] of invoiceStatus">
                                <el-option v-if="key!==null" :label="value" :value="key" :key="key"></el-option>
                            </template>
                        </el-select>
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
                <el-tab-pane :label="value.name" :name="key" :key="key" v-for="[key, value] of repaymentTypeMap">
                </el-tab-pane>
            </el-tabs>
            <el-tag size="medium" class="eltagtop">已筛选 {{ fundsListPagination.total }}
                项,{{ labelName }}总金额：<b>{{ fundsListPagination.amount | moneyFormat }} </b>元;
            </el-tag>
            <basicTable :tableData="fundsList" :tableLabel="tableLabel" :pagination="fundsListPagination" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=290 :isShowIndex='true'>
                <template slot="paymentAmount" slot-scope="scope">
                    <span> {{ scope.data.row.paymentAmount | moneyFormat }}</span>
                </template>
                <template slot="invoiceStatus" slot-scope="scope">
                    <span> {{ invoiceStatus.get(scope.data.row.invoiceStatus) }}</span>
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
                        <h-button table @click="onPayDetail(scope.data.row)"
                            v-if="(scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[0].key||(scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key&&!scope.data.row.payBatch)) &&  hasPayEnterAuth(queryParams.repaymentTypeArrays)">支付确认</h-button>
                        <h-button table @click="onUploadPay(scope.data.row)" v-if="(scope.data.row.paymentFlag==0||scope.data.row.paymentFlag==3)&&hosAuthCheck(Auths.CRM_FUNDS_DOWN_UPLOAD)&&scope.data.row.unpaidAmount > 0">
                            上传支付凭证
                        </h-button>
                    </template>
                    <template v-if="scope.data.row.repaymentType =='3'">
                        <!-- 服务费(支付待确认金额大于0)才显示支付确认 -->
                        <h-button table @click="onPayDetail(scope.data.row)" v-if="(scope.data.row.paymentFlag==PaymentOrderDict.paymentFlag.list[0].key||(scope.data.row.showPayConfirm && scope.data.row.unconfirmedAmount > 0)) && hasPayEnterAuth(queryParams.repaymentTypeArrays)">
                            支付确认
                        </h-button>
                        <h-button table @click="onUploadPay(scope.data.row)" v-if="(scope.data.row.paymentFlag==0||scope.data.row.paymentFlag==3)&&hosAuthCheck(Auths.CRM_FUNDS_DOWN_UPLOAD)&&scope.data.row.unpaidAmount > 0">
                            上传支付凭证
                        </h-button>
                    </template>
                    <template v-if="scope.data.row.repaymentType =='2'">
                        <!--剩余货款 -->
                        <h-button table @click="onPayDetail(scope.data.row)" v-if="(scope.data.row.paymentFlag==PaymentOrderDict.paymentFlag.list[0].key||scope.data.row.showPayConfirm) && hasPayEnterAuth(queryParams.repaymentTypeArrays)">
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
            <UploadDialog ref="uploaddialog" @onBackSearch="onSwtichInfo(queryParams)"></UploadDialog>
            <ReduleDialog :is-open="reduleDialogVisible" ref="reduleDialog" @onClose="fundsDialogClose"></ReduleDialog>
            <ConfirmReceiptDialog :params="paymentParams" :is-open="confirmReceiptVisible" @onClose="confirmReceiptVisible = false" @onCloseDialogAndQuery="onCloseDialogAndQuery"></ConfirmReceiptDialog>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'
import UploadDialog from './components/uploadPayDialog.vue'
import ReduleDialog from './components/redulePayDialog.vue'
import ConfirmReceiptDialog from '../paymentOrder/components/confirmReceiptDialog.vue'
import * as Auths from '@/utils/auth_const'
import { newCache } from '@/utils/index'
import { findPrePaymentList, getFundsList, getFundsListTotal, findPrePaymentAmount } from './api/index'
import fundConst from './const.js'

export default {
    name: 'funds',
    components: {
        UploadDialog, ReduleDialog, ConfirmReceiptDialog
    },
    data () {
        return {
            Auths,
            emailStatus: { 1: '待投递', 2: '已投递', 3: '投递失败' },
            invoiceStatus: new Map([
                [null, '-'],
                [10, '未开票'],
                [20, '已开票']
            ]),
            queryParams: {
                invoiceStatus: '',
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
                repaymentTypeArrays: fundConst.REPAYMENT_TYPE_KEY.DOWN_PAYMENT // 默认 1-首付款；2-剩余货款；3-服务费；
            },
            reduleDialogVisible: false,
            reduleDialogDetail: {},
            PaymentOrderDict,
            fundsList: [],
            fundsListPagination: {},
            // 状态
            statusOption: fundConst.PAYMENT_FLAG_MAP,
            confirmReceiptVisible: false,
            paymentParams: {},
            repaymentTypeMap: fundConst.REPAYMENT_TYPE_MAP
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
                { label: '剩余货款总金额', prop: 'arrearAmount', formatters: 'moneyShow', width: '150', align: 'center', isHidden: this.queryParams.repaymentTypeArrays !== '2' },
                { label: '期数', prop: 'feeRepaymentOrder', width: '100', isHidden: this.queryParams.repaymentTypeArrays !== '3' && this.queryParams.repaymentTypeArrays !== '2' },
                { label: '金额', prop: 'paymentAmount', width: '150', isHidden: this.queryParams.repaymentTypeArrays != '3' && this.queryParams.repaymentTypeArrays !== '2' },
                { label: '首付款总金额', prop: 'paymentAmount', width: '150', isHidden: this.queryParams.repaymentTypeArrays !== '1' },
                { label: '预付款金额', prop: 'paymentAmount', formatters: 'moneyShow', width: '150', align: 'center', isHidden: this.queryParams.repaymentTypeArrays !== '4' },
                { label: '已支付金额', prop: 'paidAmount', formatters: 'moneyShow', width: '150', align: 'center' },
                { label: '支付待确认金额', prop: 'unconfirmedAmount', formatters: 'moneyShow', width: '150', align: 'center' },
                { label: '待支付金额', prop: 'unpaidAmount', formatters: 'moneyShow', width: '150', align: 'center' },
                { label: '状态', prop: 'paymentFlag', width: '150' },
                { label: '发票状态', prop: 'invoiceStatus', width: '150', isHidden: this.queryParams.repaymentTypeArrays !== '3' },
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
            label[0].label = this.labelName + '流水号'
            return label
        },
        queryParamsUseQuery () {
            return {
                ...this.queryParams,
                authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '',
                jobNumber: this.userInfo.jobNumber
            }
        },
        labelName () {
            return this.repaymentTypeMap.get(this.queryParams.repaymentTypeArrays).name
        }
    },
    methods: {
        init () {
            this.queryParams.fundId = this.$route.params.pNo || ''

            this.queryParams.repaymentTypeArrays = this.$route.params.fundType?.toString() || this.queryParams.repaymentTypeArrays
            // 剩余货款去除支付失败状态处理
            this.queryParamsTemp = { ...this.queryParams }
            const temp = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
            this.onSwtichInfo(this.queryParamsUseQuery)
            this.findCrmdeplist({
                deptType: 'F',
                pkDeptDoc: this.userInfo.pkDeptDoc,
                jobNumber: this.userInfo.jobNumber,
                authCode: temp
            })
        },
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
            const { repaymentTypeArrays } = this.queryParams
            this.queryParams = { ...this.queryParamsTemp, repaymentTypeArrays }
            this.onSwtichInfo(this.queryParamsUseQuery)
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
        onPayDetail (row) {
            this.$refs.reduleDialog.findRemainConfirm(row, row.repaymentType)
            this.reduleDialogVisible = true
        },
        seePayEnter (row) {
            this.$refs.reduleDialog.getFundsTicket(row, row.repaymentType)
            this.reduleDialogVisible = true
        },
        onUploadPay (val) {
            this.$refs.uploaddialog.onDialogClick(val)
        },
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
            this.fundsListPagination = {}
            this.fundsList = []
            if (this.queryParams.repaymentTypeArrays == 4) {
                this.onFindPrePaymentList(queryParamsUseQuery)
            } else {
                this.onGetFundsList(queryParamsUseQuery)
            }
        },
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        })
    },
    mounted () {
        this.init()
    },
    beforeUpdate () {
        newCache('funds')
    },
    activated () {
        this.init()
    }
}
</script>

<style scoped lang='scss'>
.eltagtop {
    margin-bottom: 10px;
}
</style>

<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">{{labelName}}：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.fundId" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">支付单编号：</div>
                    <div class="query-col__input">
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
                            <el-option :label="item.value" :value="item.key" v-for="item in FundsDict.paymentFlagArrays.list" :key="item.key"></el-option>
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
                    <h-button type="primary" @click="findFundsList({...queryParamsUseQuery, pageNumber: 1})">
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
                项,{{ totalLabelName }}总金额：<b>{{ fundsListPagination.amount | fundMoneyHasTail }} </b>元;
            </el-tag>
            <basicTable :tableData="fundsList" :tableLabel="tableLabel" :pagination="fundsListPagination" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=290 :isShowIndex='true'>
                <template slot="paymentAmount" slot-scope="scope">
                    <span > {{ scope.data.row.paymentAmount | fundMoneyHasTail }}</span>
                </template>
                <template slot="paymentFlag" slot-scope="scope">
                    <span > {{ scope.data.row.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list) }}</span>
                </template>
                <template slot="paidTime" slot-scope="scope">
                    <span v-if="scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[2].key"> {{ scope.data.row.paidTime | formatDate('YYYY-MM-DD HH:mm:ss') }}</span>
                    <span v-else>-</span>
                </template>
                <template slot="paymentOrderAmount" slot-scope="scope">
                    <span> {{ scope.data.row.paymentOrderAmount | fundMoneyHasTail }}</span>
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
                    <h-button table @click="onPayEnter(scope.data.row)" v-if="scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key &&  hasPayEnterAuth(queryParams.repaymentTypeArrays)&&!scope.data.row.payBatch">支付确认</h-button>
                    <h-button table @click="seePayEnter(scope.data.row)" v-if="hasSeePayEnterAuth(queryParams.repaymentTypeArrays)">查看凭证</h-button>
                    <h-button table @click="onUploadPay(scope.data.row)" v-if="(scope.data.row.paymentFlag==0||scope.data.row.paymentFlag==3)&&hosAuthCheck(Auths.CRM_FUNDS_DOWN_UPLOAD)">
                        上传支付凭证
                    </h-button>
                    <h-button table @click="onBatchSumbit(scope.data.row)" v-if="scope.data.row.payBatch&&scope.data.row.paymentFlag==1">
                        批量确认
                    </h-button>
                </template>
            </basicTable>
            <FundsDialog :is-open="fundsDialogVisible" :detail="fundsDialogDetail" :status="queryParams.repaymentTypeArrays" @onClose="fundsDialogClose"></FundsDialog>
            <UploadDialog ref="uploaddialog" @onBackSearch="findFundsList(queryParams)"></UploadDialog>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import FundsDialog from './components/fundsDialog'
import FundsDict from '@/views/crm/funds/fundsDict'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'
import UploadDialog from './components/uploadPayDialog.vue'
import * as Auths from '@/utils/auth_const'

export default {
    name: 'funds',
    components: {
        FundsDialog, UploadDialog
    },
    data () {
        return {
            Auths,
            emailStatus: { 1: '待投递', 2: '已投递', 3: '投递失败' },
            queryParams: {
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
            fundsDialogDetail: {},
            FundsDict,
            PaymentOrderDict,
            labelName: '',
            totalLabelName: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            fundsList: 'crmFunds/fundsList',
            fundsListPagination: 'crmFunds/fundsListPagination',
            crmDeptList: 'crmmanage/crmdepList'
        }),
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.scheduleStartTime,
                endTime: this.queryParams.scheduleEndTime
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
                { label: '', prop: 'id', width: '150' },
                { label: '所属分部', prop: 'subsectionName', width: '150' },
                { label: '经销商', prop: 'companyName', width: '150' },
                { label: '所属项目', prop: 'projectName', width: '150' },
                {
                    label: '客户经理',
                    prop: 'customerName',
                    width: '150'
                },
                { label: '支付单编号', prop: 'paymentOrderNo', width: '150' },
                { label: '支付单金额', prop: 'paymentOrderAmount', width: '150' },
                { label: '期数', prop: 'feeRepaymentOrder', width: '100', isHidden: this.queryParams.repaymentTypeArrays !== '3' },
                { label: '金额', prop: 'paymentAmount', width: '150' },
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
                { label: '（应还3日前)邮件状态', prop: 'threeDayEmailStatus', width: '150' },
                { label: '（应还当日)邮件状态', prop: 'currDayEmailStatus', width: '150' }
            ]
            // FundsDict repaymentTypeArrays类型
            if (this.queryParams.repaymentTypeArrays === '1') {
                label[0].label = '首付款流水号'
            } else if (this.queryParams.repaymentTypeArrays === '3') {
                label[0].label = '服务费流水号'
            } else if (this.queryParams.repaymentTypeArrays === '2') {
                label[0].label = '剩余货款流水号'
            }
            return label
        },
        queryParamsUseQuery () {
            return {
                ...this.queryParams
                // authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '',
                // jobNumber: this.userInfo.jobNumber
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
        fundsDialogClose () {
            this.fundsDialogVisible = false
            this.findFundsList(this.queryParamsUseQuery)
        },
        hasPayEnterAuth (type) {
            // 1-首付款；2-剩余货款；3-服务费；
            if (type === '1') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_DOWN_PAYMENT_FUND_CONFIRM)
            }
            if (type === '2') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_ARREAR_FUND_CONFIRM)
            }
            if (type === '3') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_SERVICE_FUND_CONFIRM)
            }
        },
        hasSeePayEnterAuth (type) {
            // 1-首付款；2-剩余货款；3-服务费；
            if (type === '1') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_DOWN_PAYMENT_FUND_SEE)
            }
            if (type === '2') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_ARREAR_FUND_SEE)
            }
            if (type === '3') {
                return this.hosAuthCheck(this.Auths.CRM_FUNDS_SERVICE_FUND_SEE)
            }
        },
        handleClick () {
            const { repaymentTypeArrays } = this.queryParams
            this.queryParams = { ...this.queryParamsTemp, repaymentTypeArrays }
            this.findFundsList(this.queryParamsUseQuery)
            this.switchName()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findFundsList(this.queryParamsUseQuery)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findFundsList(this.queryParamsUseQuery)
        },
        onReset () {
            const repaymentTypeArrays = this.queryParams.repaymentTypeArrays
            this.queryParams = { ...this.queryParamsTemp, repaymentTypeArrays }
            this.findFundsList(this.queryParamsUseQuery)
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams['sort.property'] = val.prop + ''
                this.queryParams['sort.direction'] = val.order === 'ascending' ? 'ASC' : 'DESC'
            } else {
                this.queryParams['sort.property'] = null
                this.queryParams['sort.direction'] = null
            }
            this.findFundsList(this.queryParamsUseQuery)
        },
        onPayEnter (row) {
            this.fundsDialogVisible = true
            this.fundsDialogDetail = {
                orderId: row.orderId,
                id: row.id
            }
        },
        seePayEnter (row) {
            this.fundsDialogVisible = true
            this.fundsDialogDetail = {
                _seeing: true,
                id: row.id
            }
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
        },
        onUploadPay (val) {
            this.$refs.uploaddialog.onDialogClick(val)
        },
        onBatchSumbit (val) {
            this.$router.push({ path: '/goodwork/batchpsubmit', query: { fundId: val.id } })
        },
        ...mapActions({
            findFundsList: 'crmFunds/findPurchaseList',
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        })
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        const temp = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
        this.findFundsList(this.queryParamsUseQuery)
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

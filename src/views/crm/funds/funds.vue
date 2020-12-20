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
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmDeptList"
                                       :key="item.pkDeptDoc"></el-option>
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
                            <el-option :label="item.value" :value="item.key" v-for="item in FundsDict.paymentFlagArrays.list"
                                       :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">应支付日期：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.scheduleStartTime" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart('scheduleEndTime')">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.scheduleEndTime" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd('scheduleStartTime')">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">支付成功时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.paidStartTime" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart('paidEndTime')">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.paidEndTime" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd('paidStartTime')">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="findFundsList({...queryParams, pageNumber: 1})">
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
                项,采购单总金额：<b>{{ fundsListPagination.amount | fundMoneyHasTail }} </b>元;
            </el-tag>
            <basicTable :tableData="fundsList" :tableLabel="tableLabel" :pagination="fundsListPagination"
                        @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange"
                        @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true"
                        :actionMinWidth=200 :isShowIndex='true'>
                <template slot="paidAmount" slot-scope="scope">
                            <span class="colblue"> {{ scope.data.row.paidAmount | fundMoneyHasTail }}</span>
                </template>
                <template slot="paymentFlag" slot-scope="scope">
                    <span class="colblue"> {{ scope.data.row.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list) }}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onPayEnter(scope.data.row)" v-if="scope.data.row.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key">支付确认</h-button>
                    <h-button table @click="seePayEnter(scope.data.row)">查看凭证</h-button>
                </template>
            </basicTable>
            <FundsDialog :is-open="fundsDialogVisible" :detail="fundsDialogDetail" :status="queryParams.repaymentTypeArrays"
                         @onClose="fundsDialogVisible = false"
            ></FundsDialog>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import FundsDialog from './components/fundsDialog'
import FundsDict from '@/views/crm/funds/fundsDict'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'

export default {
    name: 'funds',
    components: {
        FundsDialog
    },
    data () {
        return {
            queryParams: {
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
                repaymentTypeArrays: '1' // 默认 1-首付款；2-尾款；3-服务费；
            },
            fundsDialogVisible: false,
            fundsDialogDetail: {},
            FundsDict,
            PaymentOrderDict,
            labelName: ''
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
        tableLabel () {
            const label = [
                { label: '', prop: 'id', width: '150' },
                { label: '所属分部', prop: 'subsectionName', width: '150' },
                { label: '经销商', prop: 'companyName', width: '150' },
                { label: '所属项目', prop: 'projectName', width: '150' },
                { label: '支付单编号', prop: 'paymentOrderNo', width: '150' },
                { label: '金额', prop: 'paidAmount', width: '150' },
                { label: '状态', prop: 'paymentFlag', width: '150' },
                {
                    label: '应支付日期',
                    prop: 'schedulePaymentDate',
                    width: '150',
                    formatters: 'dateTimes',
                    sortable: 'custom'
                },
                { label: '支付成功时间', prop: 'paidTime', width: '150', formatters: 'dateTimes', sortable: 'paidTime' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes', sortable: 'paidTime' }
            ]
            // FundsDict repaymentTypeArrays类型
            if (this.queryParams.repaymentTypeArrays === '1') {
                label[0].label = '首付款流水号'
            } else if (this.queryParams.repaymentTypeArrays === '3') {
                label[0].label = '服务费流水号'
                label.splice(5, 0, { label: '期数', prop: 'feeRepaymentOrder', width: '100' })
            } else if (this.queryParams.repaymentTypeArrays === '2') {
                label[0].label = '尾款流水号'
            }
            return label
        }
    },
    methods: {
        pickerOptionsStart (type) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams[type]
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd (type) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams[type]
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        handleClick () {
            const { repaymentTypeArrays } = this.queryParams
            this.queryParams = { ...this.queryParamsTemp, repaymentTypeArrays }
            this.findFundsList(this.queryParams)
            this.switchName()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findFundsList(this.queryParams)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findFundsList(this.queryParams)
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
            this.findFundsList(this.queryParams)
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams['sort.property'] = val.prop + ''
                this.queryParams['sort.direction'] = val.order === 'ascending' ? 'ASC' : 'DESC'
            } else {
                this.queryParams['sort.property'] = null
                this.queryParams['sort.direction'] = null
            }
            this.findFundsList(this.queryParams)
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
            }
            if (this.queryParams.repaymentTypeArrays === '3') {
                this.labelName = '服务费流水号'
            }
            if (this.queryParams.repaymentTypeArrays === '2') {
                this.labelName = '尾款流水号'
            }
        },
        ...mapActions({
            findFundsList: 'crmFunds/findPurchaseList',
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        })
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        const temp = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
        this.findFundsList(this.queryParams)
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

<style scoped>
.eltagtop {
    margin-bottom: 10px;
}
</style>

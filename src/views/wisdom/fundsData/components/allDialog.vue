<template>
    <div>
        <el-dialog :title="title" class="dialog-main" :visible.sync="dialogVisible" width="60%" :close-on-click-modal='false' :before-close="handleClose">
            <div class="dialog_wrap">
                <el-descriptions title="基础信息">
                    <el-descriptions-item label="台账编号">{{dialogDetail.account_standingBookNo || '-'}} <i v-if="hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getAccount(dialogDetail,`${product}-流贷基础信息维护（${dialogDetail.account_standingBookNo} ${dialogDetail.account_loanCompanyName}）`,'misDialogVisible')"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="MIS编码">{{dialogDetail.account_misCode||'-'}}</el-descriptions-item>
                    <el-descriptions-item label="借款单位">{{dialogDetail.account_loanCompanyName||'-'}}</el-descriptions-item>
                    <el-descriptions-item label="分部">{{dialogDetail.account_subsectionName||'-'}}</el-descriptions-item>
                </el-descriptions>
                <!-- 流贷 -->
                <el-descriptions v-if="first==soure" title="流贷借款账目">
                    <!-- 流贷 -->
                    <el-descriptions-item label="借款金额">{{dialogDetail.loan_loanAmount| moneyFormat}} <i class='el-icon-edit pointer' v-if="hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)"
                    @click="getLoan(dialogDetail,'supplierDialogVisible', `${product}—流贷借款信息维护（${dialogDetail.account_standingBookNo} ${dialogDetail.account_loanCompanyName}）`)"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="供货商名称">{{dialogDetail.loan_supplier||'-'}}</el-descriptions-item>
                    <el-descriptions-item label="还款方式">{{dialogDetail.loan_repaymentType == 1 ? '一次性还款' : '334还款'}}
                        <i class='el-icon-edit pointer' v-if="hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)"
                            @click="getRespAccountRepaymentPlanData(dialogDetail, `${product}-流贷还款信息维护（${dialogDetail.account_standingBookNo} ${dialogDetail.account_loanCompanyName}）`, dialogDetail.account_id, 'AnnualInterestRateDialogVisible')"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="年利率">{{dialogDetail.loan_yearRate||'-'}}%</el-descriptions-item>
                    <el-descriptions-item label="借款期限">{{dialogDetail.loan_loanDateNum ? `${dialogDetail.loan_loanDateNum}` : '-'}}
                        {{ dialogDetail.loan_loanDateType == 1 ? '个月' : dialogDetail.loan_loanDateType == 2 ? '天' : ''}}</el-descriptions-item>
                    <el-descriptions-item label="应收利息（正常+宽限）">
                        {{this.$plus(dialogDetail.paymentStatic_interestAmount, dialogDetail.paymentStatic_graceInterestAmount)|moneyFormat}}
                        {{dialogDetail.paymentStatic_normalInterestPranayamaTotal +dialogDetail.paymentStatic_graceInterestPranayamaTotal? `(${(dialogDetail.paymentStatic_normalInterestPranayamaTotal + dialogDetail.paymentStatic_graceInterestPranayamaTotal) > 0? '+' + (this.$plus(dialogDetail.paymentStatic_normalInterestPranayamaTotal, dialogDetail.paymentStatic_graceInterestPranayamaTotal)): (this.$plus(dialogDetail.paymentStatic_normalInterestPranayamaTotal, dialogDetail.paymentStatic_graceInterestPranayamaTotal))})`: ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="放款日期">{{dialogDetail.loan_loanStartTime ? moment(dialogDetail.loan_loanStartTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="到期日">{{dialogDetail.loan_loanEndTime ? moment(dialogDetail.loan_loanEndTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="登记人">{{dialogDetail.loan_registrant ? `${dialogDetail.loan_registrant}` : '-'}}</el-descriptions-item>
                </el-descriptions>
                <el-descriptions v-if="first==soure" title="流贷还款账目">
                    <!-- 流贷 -->
                    <el-descriptions-item label="最新本金还款日">{{dialogDetail.paymentStatic_capitalTime ? moment(dialogDetail.paymentStatic_capitalTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="累计实收借款本金">{{dialogDetail.planList_0_capitalPaid| moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="欠收本金">{{dialogDetail.paymentStatic_capitalOwe| moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="宽限还款日">{{dialogDetail.planList_0_graceTime ? moment(dialogDetail.planList_0_graceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="累计应收正常利息">
                        {{(dialogDetail.paymentStatic_interestAmount)|moneyFormat}}{{dialogDetail.planList_0_normalInterestPranayama ? `(${dialogDetail.planList_0_normalInterestPranayama > 0 ? '+' + dialogDetail.planList_0_normalInterestPranayama : dialogDetail.planList_0_normalInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="最新正常利息还款日">{{dialogDetail.planList_0_interestTime ? moment(dialogDetail.planList_0_interestTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="累计实收正常利息">{{dialogDetail.paymentStatic_interestPaid| moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="欠收正常利息">{{dialogDetail.paymentStatic_interestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="累计应收宽限期利息">
                        {{dialogDetail.paymentStatic_graceInterestAmount|moneyFormat}}{{dialogDetail.planList_0_graceInterestPranayama ? `(${dialogDetail.planList_0_graceInterestPranayama > 0 ? '+' + dialogDetail.planList_0_graceInterestPranayama : dialogDetail.planList_0_graceInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">{{dialogDetail.paymentStatic_graceInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="欠收宽限期利息">{{dialogDetail.paymentStatic_graceInterestOwe|moneyFormat}}</el-descriptions-item>
                </el-descriptions>
                <el-descriptions v-if="first==soure" title="流贷逾期账目">
                    <!-- 流贷 -->
                    <el-descriptions-item label="是否逾期">{{dialogDetail.planList_0_isOverDue ? '是' : '否'}}</el-descriptions-item>
                    <el-descriptions-item label="应收逾期罚息">
                        {{dialogDetail.paymentStatic_overDueInterestAmount|moneyFormat}}{{dialogDetail.planList_0_overDueInterestPranayama ? `(${dialogDetail.planList_0_overDueInterestPranayama > 0 ? '+' + dialogDetail.planList_0_overDueInterestPranayama : dialogDetail.planList_0_overDueInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收逾期罚息">{{dialogDetail.paymentStatic_overDueInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="欠收逾期罚息">{{dialogDetail.paymentStatic_overDueInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="手动调息" v-if="!hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE)">{{(dialogDetail.paymentStatic_normalInterestPranayamaTotal || dialogDetail.paymentStatic_graceInterestPranayamaTotal || dialogDetail.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}}
                        <i class='el-icon-edit pointer' v-if="hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)" @click="getRespAccountRepaymentPlanData(dialogDetail, `${product}-流贷还款信息维护（${dialogDetail.account_standingBookNo} ${dialogDetail.account_loanCompanyName}）`, dialogDetail.account_id, 'regulatingBreathingDialogVisible')"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="台账档案编号">{{dialogDetail.account_standingBookArchiveNo||'-'}}
                        <i v-if="hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getAccount(dialogDetail,`${product}-流贷档案信息维护（${dialogDetail.account_standingBookNo} ${dialogDetail.account_loanCompanyName}）`, 'fileinfoDialogVisible')"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="备注" v-if="!hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE)">{{dialogDetail.account_remark||'-'}} <i v-if="hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getAccount(dialogDetail,`${product}-流贷备注信息维护（${dialogDetail.account_standingBookNo} ${dialogDetail.account_loanCompanyName}）`, 'remarkDialogVisible')"></i>
                    </el-descriptions-item>
                </el-descriptions>
                <!-- 敞口 -->
                <el-descriptions v-if="second==soure" title="敞口借款账目">
                    <!-- 敞口 -->
                    <el-descriptions-item label="开票金额">{{dialogDetail.loan_invoiceAmount| moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="开票日期">{{dialogDetail.loan_invoiceTime ? moment(dialogDetail.loan_invoiceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="供货商名称">{{dialogDetail.loan_supplier||'-'}}</el-descriptions-item>
                    <el-descriptions-item label="保证金比例">{{dialogDetail.loan_depositProportion ? `${dialogDetail.loan_depositProportion}%` : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="保证金缴纳">{{dialogDetail.loan_depositPay|moneyFormat}}
                      </el-descriptions-item>
                    <el-descriptions-item label="敞口金额">
                        {{dialogDetail.loan_loanAmount|moneyFormat}}<i class='el-icon-edit pointer' @click="getLoan(dialogDetail, 'billingDialogVisible', `${product}-敞口借款信息维护（${dialogDetail.account_standingBookNo} ${dialogDetail.account_loanCompanyName}）`) "></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="承兑期限">
                        {{dialogDetail.loan_loanDateNum ? `${dialogDetail.loan_loanDateNum}` : '-'}}
                        {{dialogDetail.loan_loanDateType == 1 ? '个月' : dialogDetail.loan_loanDateType == 2 ? '天' : ''}}
                        </el-descriptions-item>
                    <el-descriptions-item label="到期日">{{dialogDetail.loan_loanEndTime ? moment(dialogDetail.loan_loanEndTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="还款方式">
                        {{dialogDetail.loan_repaymentType == 1 ? '一次性还款' : '334还款'}}
                        <i class="el-icon-edit pointer" v-if="hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)" @click="getGrantPaymetPlanData(dialogDetail,'repaymentDialogVisible')"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="登记人">
                        {{dialogDetail.loan_registrant||'-'}}
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions v-if="second==soure" title="敞口还款账目总计">
                    <el-descriptions-item label="最新还款时间">
                        {{dialogDetail.paymentStatic_capitalTime ? moment(dialogDetail.paymentStatic_capitalTime).format('YYYY-MM-DD') : '-'}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计已还敞口本金">
                        {{dialogDetail.paymentStatic_capitalPaid|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余敞口">
                        {{dialogDetail.paymentStatic_capitalOwe|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计应收宽限期利息">
                        {{dialogDetail.paymentStatic_graceInterestAmount|moneyFormat}}{{dialogDetail.paymentStatic_graceInterestPranayamaTotal ? `(${dialogDetail.paymentStatic_graceInterestPranayamaTotal > 0 ? '+' + dialogDetail.paymentStatic_graceInterestPranayamaTotal : dialogDetail.paymentStatic_graceInterestPranayamaTotal})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">
                        {{dialogDetail.paymentStatic_graceInterestPaid|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余宽限期利息">
                        {{dialogDetail.paymentStatic_graceInterestOwe|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计应收逾期罚息" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">
                        {{dialogDetail.paymentStatic_overDueInterestAmount|moneyFormat}}
                        {{dialogDetail.paymentStatic_overDueInterestPranayamaTotal ? `(${dialogDetail.paymentStatic_overDueInterestPranayamaTotal > 0 ? '+' + dialogDetail.paymentStatic_overDueInterestPranayamaTotal : dialogDetail.paymentStatic_overDueInterestPranayamaTotal})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收逾期罚息">
                        {{dialogDetail.paymentStatic_overDueInterestPaid|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余逾期罚息">
                        {{dialogDetail.paymentStatic_overDueInterestOwe|moneyFormat}}
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions v-if="second==soure" title="敞口还款账目明细">
                    <!-- 敞口 -->
                    <el-descriptions-item label="约定还款日期1">{{dialogDetail.planList_0_endTime ? moment(dialogDetail.planList_0_endTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="宽限到期日">{{dialogDetail.planList_0_graceTime ? moment(dialogDetail.planList_0_graceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="剩余还款金额">{{dialogDetail.planList_0_capitalOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="是否逾期">{{dialogDetail.planList_0_isOverDue ? '是' : '否'}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款金额">{{dialogDetail.planList_0_capitalAmount|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="累计实际还款本金金额">{{dialogDetail.planList_0_capitalPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应收宽限期利息" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">
                        {{dialogDetail.planList_0_graceInterestAmount|moneyFormat }}
                        {{dialogDetail.planList_0_graceInterestPranayama ? `(${dialogDetail.planList_0_graceInterestPranayama > 0 ? '+' + dialogDetail.planList_0_graceInterestPranayama : dialogDetail.planList_0_graceInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">{{dialogDetail.planList_0_graceInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余宽限期利息">{{dialogDetail.planList_0_graceInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应缴逾期罚息" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">
                        {{dialogDetail.planList_0_overDueInterestAmount|moneyFormat}}
                        {{dialogDetail.planList_0_overDueInterestPranayama ? `(${dialogDetail.planList_0_overDueInterestPranayama > 0 ? '+' + dialogDetail.planList_0_overDueInterestPranayama : dialogDetail.planList_0_overDueInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="实缴逾期罚息">{{dialogDetail.planList_0_overDueInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余逾期罚息">{{dialogDetail.planList_0_overDueInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="宽限到期日" :span="3">{{dialogDetail.planList_1_graceTime ? moment(dialogDetail.planList_1_graceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款日期2">{{dialogDetail.planList_1_endTime ? moment(dialogDetail.planList_1_endTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款金额">{{dialogDetail.planList_1_capitalAmount|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="累计实际还款本金金额">{{dialogDetail.planList_1_capitalPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余还款金额">{{dialogDetail.planList_1_capitalOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应收宽限期利息" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">
                        {{dialogDetail.planList_1_graceInterestAmount|moneyFormat}}{{dialogDetail.planList_1_graceInterestPranayama ? `(${dialogDetail.planList_1_graceInterestPranayama > 0 ? '+' + dialogDetail.planList_1_graceInterestPranayama : dialogDetail.planList_1_graceInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">{{dialogDetail.planList_1_graceInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余宽限期利息">{{dialogDetail.planList_1_graceInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="是否逾期">{{dialogDetail.planList_1_isOverDue ? '是' : '否'}}</el-descriptions-item>
                    <el-descriptions-item label="应缴逾期罚息" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">
                        {{dialogDetail.planList_1_overDueInterestAmount |moneyFormat}}
                        {{dialogDetail.planList_1_overDueInterestPranayama ? `(${dialogDetail.planList_1_overDueInterestPranayama > 0 ? '+' + dialogDetail.planList_1_overDueInterestPranayama : dialogDetail.planList_1_overDueInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="实缴逾期罚息">{{dialogDetail.planList_1_overDueInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余逾期罚息" :span="2">{{dialogDetail.planList_1_overDueInterestOwe |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款日期3">{{dialogDetail.planList_2_endTime ? moment(dialogDetail.planList_2_endTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="宽限到期日">{{dialogDetail.planList_2_graceTime ? moment(dialogDetail.planList_2_graceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款金额">{{dialogDetail.planList_2_capitalAmount |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="累计实际还款本金金额">{{dialogDetail.planList_2_capitalPaid |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余还款金额">{{dialogDetail.planList_2_capitalOwe |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="是否逾期">{{dialogDetail.planList_2_isOverDue ? '是' : '否'}}</el-descriptions-item>
                    <el-descriptions-item label="应收宽限期利息" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">
                        {{dialogDetail.planList_2_graceInterestAmount |moneyFormat}}{{dialogDetail.planList_2_graceInterestPranayama ? `(${dialogDetail.planList_2_graceInterestPranayama > 0 ? '+' + dialogDetail.planList_2_graceInterestPranayama : dialogDetail.planList_2_graceInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">{{dialogDetail.planList_2_graceInterestPaid |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余宽限期利息">{{dialogDetail.planList_2_graceInterestOwe |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应缴逾期罚息" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">{{dialogDetail.planList_2_overDueInterestAmount |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="实缴逾期罚息">{{dialogDetail.planList_2_overDueInterestPaid |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余逾期罚息">{{dialogDetail.planList_2_overDueInterestOwe |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="手动调息" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">
                        {{(dialogDetail.paymentStatic_normalInterestPranayamaTotal || dialogDetail.paymentStatic_graceInterestPranayamaTotal || dialogDetail.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}}<i v-if="hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getGrantPaymetPlanData(dialogDetail, 'regulatingBreathingDialogVisible', true)"></i></el-descriptions-item>
                    <el-descriptions-item label="台账档案编号">{{dialogDetail.account_standingBookArchiveNo||'-'}}
                        <i v-if="hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getAccount(dialogDetail,`${product}-敞口基础信息维护`, 'fileinfoDialogVisible')"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="备注" v-if="!hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE)">{{dialogDetail.account_remark||'-'}}
                        <i v-if="hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getAccount(dialogDetail,`${product}-敞口备注信息维护`, 'remarkDialogVisible')"></i>
                    </el-descriptions-item>
                </el-descriptions>
                <!-- 分授信 -->
                <el-descriptions v-if="third==soure" title="分授信借款账目">
                    <!-- 分授信 -->
                    <el-descriptions-item label="开票金额">{{dialogDetail.loan_invoiceAmount| moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="开票日期">{{dialogDetail.loan_invoiceTime ? moment(dialogDetail.loan_invoiceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="供货商名称">
                        {{dialogDetail.loan_supplier ? dialogDetail.loan_supplier : '-'}}
                    </el-descriptions-item>
                    <el-descriptions-item label="借款日期">{{dialogDetail.loan_loanStartTime ? moment(dialogDetail.loan_loanStartTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="借款金额">{{dialogDetail.loan_loanAmount|moneyFormat}}
                        <i class='el-icon-edit pointer' v-if="hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)" @click="getLoan(dialogDetail, 'pointsCreditBillingDialogVisible', `${product}-分授信借款信息维护（${dialogDetail.account_standingBookNo} ${dialogDetail.account_loanCompanyName}）`)"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="年利率">{{dialogDetail.loan_yearRate ? `${dialogDetail.loan_yearRate}%` : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="借款期限">{{dialogDetail.loan_loanDateNum ? `${dialogDetail.loan_loanDateNum}` : '-'}}{{dialogDetail.loan_loanDateType == 1 ? '个月' : dialogDetail.loan_loanDateType == 2 ? '天' : ''}}</el-descriptions-item>
                    <el-descriptions-item label="到期日">{{dialogDetail.loan_loanEndTime ? moment(dialogDetail.loan_loanEndTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                     <el-descriptions-item label="还款方式">
                        {{dialogDetail.loan_repaymentType == 1 ? '一次性还款' : '334还款'}}
                        <i class="el-icon-edit pointer" v-if="hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)" @click="getGrantPaymetPlanData(dialogDetail,'repaymentDialogVisible')"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="登记人">{{dialogDetail.loan_registrant ? `${dialogDetail.loan_registrant}` : '-'}}</el-descriptions-item>
                </el-descriptions>
                <el-descriptions v-if="third==soure" title="分授信还款账目总计">
                    <el-descriptions-item label="最新本金还款时间">{{dialogDetail.paymentStatic_capitalTime ? moment(dialogDetail.paymentStatic_capitalTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="累计已还本金">{{dialogDetail.paymentStatic_capitalPaid |moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余本金">{{dialogDetail.paymentStatic_capitalOwe |moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="应收利息（正常+宽限）" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{$plus(dialogDetail.paymentStatic_interestTotalAmount, dialogDetail.paymentStatic_graceInterestAmount)|moneyFormat}}{{dialogDetail.paymentStatic_normalInterestPranayamaTotal + dialogDetail.paymentStatic_graceInterestPranayamaTotal? `(${(dialogDetail.paymentStatic_normalInterestPranayamaTotal + dialogDetail.paymentStatic_graceInterestPranayamaTotal) > 0? '+' + ($plus(dialogDetail.paymentStatic_normalInterestPranayamaTotal,dialogDetail.paymentStatic_graceInterestPranayamaTotal)): ($plus(dialogDetail.paymentStatic_normalInterestPranayamaTotal, dialogDetail.paymentStatic_graceInterestPranayamaTotal))})`: ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计应收正常利息">
                        {{dialogDetail.paymentStatic_interestAmount|moneyFormat}}{{dialogDetail.paymentStatic_normalInterestPranayamaTotal ? `(${dialogDetail.paymentStatic_normalInterestPranayamaTotal > 0 ? '+' + dialogDetail.paymentStatic_normalInterestPranayamaTotal : dialogDetail.paymentStatic_normalInterestPranayamaTotal})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="最新正常利息还款时间">{{dialogDetail.paymentStatic_interestTime ? moment(dialogDetail.paymentStatic_interestTime).format('YYYY-MM-DD') : '-'}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收正常利息">{{dialogDetail.paymentStatic_interestPaid|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余正常利息">{{dialogDetail.paymentStatic_interestOwe|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计应收宽限期利息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.paymentStatic_graceInterestAmount|moneyFormat}}{{dialogDetail.paymentStatic_graceInterestPranayamaTotal ? `(${dialogDetail.paymentStatic_graceInterestPranayamaTotal > 0 ? '+' + dialogDetail.paymentStatic_graceInterestPranayamaTotal :dialogDetail.paymentStatic_graceInterestPranayamaTotal})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">
                        {{dialogDetail.paymentStatic_graceInterestPaid|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余宽限期利息">{{dialogDetail.paymentStatic_graceInterestOwe|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计应收逾期罚息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.paymentStatic_overDueInterestAmount|moneyFormat}}{{dialogDetail.paymentStatic_overDueInterestPranayamaTotal ? `(${dialogDetail.paymentStatic_overDueInterestPranayamaTotal > 0 ? '+' + dialogDetail.paymentStatic_overDueInterestPranayamaTotal :dialogDetail.paymentStatic_overDueInterestPranayamaTotal})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收逾期罚息">{{dialogDetail.paymentStatic_overDueInterestPaid|moneyFormat}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余逾期罚息">{{dialogDetail.paymentStatic_overDueInterestOwe|moneyFormat}}
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions v-if="third==soure" title="分授信还款账目明细">
                    <el-descriptions-item label="约定还款日期1">{{dialogDetail.planList_0_endTime ? moment(dialogDetail.planList_0_endTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="宽限到期日">{{dialogDetail.planList_0_graceTime ? moment(dialogDetail.planList_0_graceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款本金金额">{{dialogDetail.planList_0_capitalAmount|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="累计还款本金金额">{{dialogDetail.planList_0_capitalPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余还款本金金额">{{dialogDetail.planList_0_capitalOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应收正常利息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.planList_0_interestAmount|moneyFormat}}{{dialogDetail.planList_0_normalInterestPranayama ? `(${dialogDetail.planList_0_normalInterestPranayama > 0 ? '+' + dialogDetail.planList_0_normalInterestPranayama : dialogDetail.planList_0_normalInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计正常实收利息">{{dialogDetail.planList_0_interestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余正常利息">{{dialogDetail.planList_0_interestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应收宽限期利息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.planList_0_graceInterestAmount|moneyFormat }}
                        {{dialogDetail.planList_0_graceInterestPranayama ? `(${dialogDetail.planList_0_graceInterestPranayama > 0 ? '+' + dialogDetail.planList_0_graceInterestPranayama : dialogDetail.planList_0_graceInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">{{dialogDetail.planList_0_graceInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余宽限期利息">{{dialogDetail.planList_0_graceInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="是否逾期">{{dialogDetail.planList_0_isOverDue ? '是' : '否'}}</el-descriptions-item>
                    <el-descriptions-item label="应缴逾期罚息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">{{dialogDetail.planList_0_overDueInterestAmount|moneyFormat}}
                        {{dialogDetail.planList_0_overDueInterestPranayama ? `(${dialogDetail.planList_0_overDueInterestPranayama > 0 ? '+' + dialogDetail.planList_0_overDueInterestPranayama : dialogDetail.planList_0_overDueInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="实缴逾期罚息">{{dialogDetail.planList_0_overDueInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余逾期罚息">{{dialogDetail.planList_0_overDueInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款日期2">{{dialogDetail.planList_1_endTime ? moment(dialogDetail.planList_1_endTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="宽限还款日">{{dialogDetail.planList_1_graceTime ? moment(dialogDetail.planList_1_graceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款本金金额">{{dialogDetail.planList_1_capitalAmount|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="累计还款本金金额">{{dialogDetail.planList_1_capitalPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余还款本金金额">{{dialogDetail.planList_1_capitalOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应收正常利息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.planList_1_interestAmount|moneyFormat}}{{dialogDetail.planList_1_normalInterestPranayama ? `(${dialogDetail.planList_1_normalInterestPranayama > 0 ? '+' + dialogDetail.planList_1_normalInterestPranayama : dialogDetail.planList_1_normalInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计正常实收利息">{{dialogDetail.planList_1_interestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余正常利息">{{dialogDetail.planList_1_interestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应收宽限期利息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">{{dialogDetail.planList_1_graceInterestAmount |moneyFormat}}
                        {{dialogDetail.planList_1_graceInterestPranayama ? `(${dialogDetail.planList_1_graceInterestPranayama > 0 ? '+' + dialogDetail.planList_1_graceInterestPranayama : dialogDetail.planList_1_graceInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">{{dialogDetail.planList_1_graceInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余宽限期利息">{{dialogDetail.planList_1_graceInterestOwe |moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="是否逾期">{{dialogDetail.planList_1_isOverDue ? '是' : '否'}}</el-descriptions-item>
                    <el-descriptions-item label="应缴逾期罚息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.planList_1_overDueInterestAmount|moneyFormat}}
                        {{dialogDetail.planList_1_overDueInterestPranayama ? `(${dialogDetail.planList_1_overDueInterestPranayama > 0 ? '+' + dialogDetail.planList_1_overDueInterestPranayama : dialogDetail.planList_1_overDueInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="实缴逾期罚息">{{dialogDetail.planList_1_overDueInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余逾期罚息"  :span="2">{{dialogDetail.planList_1_overDueInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款日期3">{{dialogDetail.planList_2_endTime ? moment(dialogDetail.planList_2_endTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="宽限还款日">{{dialogDetail.planList_2_graceTime ? moment(dialogDetail.planList_1_graceTime).format('YYYY-MM-DD') : '-'}}</el-descriptions-item>
                    <el-descriptions-item label="约定还款本金金额">{{dialogDetail.planList_2_capitalAmount|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="累计还款本金金额">{{dialogDetail.planList_2_capitalPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余还款本金金额">{{dialogDetail.planList_2_capitalOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应收正常利息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.planList_2_interestAmount|moneyFormat}}{{dialogDetail.planList_2_normalInterestPranayama ? `(${dialogDetail.planList_2_normalInterestPranayama > 0 ? '+' + dialogDetail.planList_2_normalInterestPranayama : dialogDetail.planList_2_normalInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计正常实收利息">{{dialogDetail.planList_2_interestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余正常利息">{{dialogDetail.planList_2_interestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="应收宽限期利息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.planList_2_graceInterestAmount |moneyFormat}}{{dialogDetail.planList_2_graceInterestPranayama ? `(${dialogDetail.planList_2_graceInterestPranayama > 0 ? '+' + dialogDetail.planList_2_graceInterestPranayama : dialogDetail.planList_2_graceInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="累计实收宽限期利息">{{dialogDetail.planList_2_graceInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余宽限期利息">{{dialogDetail.planList_2_graceInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="是否逾期">{{dialogDetail.planList_2_isOverDue ? '是' : '否'}}</el-descriptions-item>
                    <el-descriptions-item label="应缴逾期罚息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{dialogDetail.planList_2_overDueInterestAmount|moneyFormat}}
                        {{dialogDetail.planList_2_overDueInterestPranayama ? `(${dialogDetail.planList_2_overDueInterestPranayama > 0 ? '+' + dialogDetail.planList_2_overDueInterestPranayama : dialogDetail.planList_2_overDueInterestPranayama})` : ''}}
                    </el-descriptions-item>
                    <el-descriptions-item label="实缴逾期罚息">{{dialogDetail.planList_2_overDueInterestPaid|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="剩余逾期罚息">{{dialogDetail.planList_2_overDueInterestOwe|moneyFormat}}</el-descriptions-item>
                    <el-descriptions-item label="手动调息" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">
                        {{(dialogDetail.paymentStatic_normalInterestPranayamaTotal || dialogDetail.paymentStatic_graceInterestPranayamaTotal || dialogDetail.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}}<i v-if="hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getGrantPaymetPlanData(dialogDetail, 'regulatingBreathingDialogVisible')"></i></el-descriptions-item>
                    <el-descriptions-item label="台账档案编号">{{dialogDetail.account_standingBookArchiveNo||'-'}}
                        <i v-if="hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getAccount(dialogDetail,`${product}-分授信档案信息维护`, 'fileinfoDialogVisible')"></i>
                    </el-descriptions-item>
                    <el-descriptions-item label="备注" v-if="!hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE)">{{dialogDetail.account_remark||'-'}}<i v-if="hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)" class='el-icon-edit pointer' @click="getAccount(dialogDetail,`${product}-分授信备注信息维护`, 'remarkDialogVisible')"></i>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA,
    WISDOM_EXPOSURE_FUNDSDATA_UPDATA,
    WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA,
    WISDOM_FLOWTOBORROW_SHOW_LINE,
    WISDOM_EXPOSURE_SHOW_LINE,
    WISDOM_POINTSCREDIT_SHOW_LINE
} from '../../../../utils/auth_const'
import moment from 'moment'
export default {
    name: '',
    props: {
        soure: {
            type: String,
            default () {
                return '1'
            }
        }
    },
    data () {
        return {
            title: '',
            first: 1,
            second: 2,
            third: 3,
            moment,
            dialogVisible: false,
            misDialogVisible: false,
            supplierDialogVisible: false,
            WISDOM_POINTSCREDIT_SHOW_LINE,
            WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA,
            WISDOM_FLOWTOBORROW_SHOW_LINE,
            WISDOM_EXPOSURE_FUNDSDATA_UPDATA,
            WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA,
            WISDOM_EXPOSURE_SHOW_LINE,
            dialogDetail: {},
            product: '好信用',
            accountData: {}, // 基本信息数据
            loanData: {}, // 借款信息数据
            rowData: null, // 敞口分授信还款信息数据
            respAccountRepaymentPlanData: null, // 流贷还款信息数据
            regulatingBreathingDialogData: [] // 手动调息数据
        }
    },
    methods: {
        handleClose () {
            this.dialogVisible = false
        },
        findDetail (val) {
            console.log('val: ', val)
            this.dialogDetail = val
            this.title = val.account_standingBookNo + val.account_loanCompanyName
            this.dialogVisible = true
        },
        // 基本信息
        getAccount (row, title, type) {
            this.$emit('backGetAccount', row, title, type)
        },
        // 借款信息
        getLoan (row, type, title) {
            this.$emit('backLoan', row, type, title)
        },
        //
        getRespAccountRepaymentPlanData (row, title, id, type) {
            this.$emit('backGetRespAccountRepaymentPlanData', row, title, id, type)
        },
        // 敞口份授信
        getGrantPaymetPlanData (row, type) {
            this.$emit('backGetGrantPaymetPlanData', row, type)
        }

    }
}
</script>
<style lang="scss" scoped>
.dialog_wrap {
    max-height: 500px;
    overflow-y: scroll;
}
</style>
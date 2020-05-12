// 分部逾期汇总表
export const branchSummarySheet = function () {
    return [
        { prop: 'misCode', label: '分部', showOverflowTooltip: true },
        { prop: 'companyName', label: '存量逾期', showOverflowTooltip: true },
        {
            label: '存量逾期-2020年度还款计划',
            children: [
                {
                    prop: 'januaryValue',
                    label: '1月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'februaryValue',
                    label: '2月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'marchValue',
                    label: '3月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'aprilValue',
                    label: '4月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'mayValue',
                    label: '5月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'juneValue',
                    label: '6月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'julyValue',
                    label: '7月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'augustValue',
                    label: '8月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'septemberValue',
                    label: '9月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'octoberValue',
                    label: '10月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'novemberValue',
                    label: '11月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'decemberValue',
                    label: '12月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'totalAnnual',
                    label: '计划率',
                    width: '150',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'totalAnnual',
                    label: '无计划金额',
                    width: '150',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        },
        { prop: 'companyName', label: '增量逾期', showOverflowTooltip: true },
        {
            label: '增量逾期-2020年度还款计划',
            children: [
                {
                    prop: 'januaryValue',
                    label: '1月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'februaryValue',
                    label: '2月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'marchValue',
                    label: '3月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'aprilValue',
                    label: '4月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'mayValue',
                    label: '5月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'juneValue',
                    label: '6月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'julyValue',
                    label: '7月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'augustValue',
                    label: '8月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'septemberValue',
                    label: '9月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'octoberValue',
                    label: '10月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'novemberValue',
                    label: '11月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'decemberValue',
                    label: '12月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'totalAnnual',
                    label: '计划率',
                    width: '150',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'totalAnnual',
                    label: '无计划金额',
                    width: '150',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        }
    ]
}
// 平台公司逾期汇总表
export const platformSummarySheet = function () {
    return [
        { prop: 'misCode', label: '公司编码', showOverflowTooltip: true, fixed: true },
        { prop: 'loanCompanyName', label: '公司名称', showOverflowTooltip: true, fixed: true },
        { prop: 'regionName', label: '大区', showOverflowTooltip: true, fixed: true },
        { prop: 'subsectionName', label: '分部', showOverflowTooltip: true, fixed: true },
        {
            label: '销售',
            children: [
                {
                    prop: 'lastYearSales',
                    label: '19年',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'currentSales',
                    label: '20年',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        },
        { prop: 'arrearsCount', label: '欠款笔数', showOverflowTooltip: true },
        { prop: 'capitalAmount', label: '剩余笔数', showOverflowTooltip: true },
        {
            label: '2020年度还款计划',
            children: [
                {
                    prop: 'januaryRepayment',
                    label: '1月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'februaryRepayment',
                    label: '2月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'marchRepayment',
                    label: '3月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'aprilRepayment',
                    label: '4月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'mayRepayment',
                    label: '5月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'juneRepayment',
                    label: '6月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'julyRepayment',
                    label: '7月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'augustRepayment',
                    label: '8月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'septemberRepayment',
                    label: '9月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'octoberRepayment',
                    label: '10月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'novemberRepayment',
                    label: '11月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'decemberRepayment',
                    label: '12月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'total',
                    label: '合计',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        },
        { prop: 'planProportion', label: '计划还款占比', showOverflowTooltip: true },
        { prop: 'noRepaymentPlanAmount', label: '无计划金额', showOverflowTooltip: true }
    ]
}
// 逾期增量明细表
export const overdueDetailTable = function () {
    return [
        { prop: 'standingBookNo', label: '借款编号', fixed: true, showOverflowTooltip: true },
        { prop: 'misCode', label: '公司编码', fixed: true, showOverflowTooltip: true },
        { prop: 'loanCompanyName', label: '公司名称', fixed: true, showOverflowTooltip: true },
        { prop: 'regionName', label: '大区', fixed: true, showOverflowTooltip: true },
        { prop: 'subsectionName', label: '分部', fixed: true, showOverflowTooltip: true },
        { prop: 'loanAmount', label: '借款金额', showOverflowTooltip: true },
        { prop: 'payTime', label: '合同到期日', showOverflowTooltip: true },
        { prop: 'capitalAmount', label: '应还本金', showOverflowTooltip: true },
        { prop: 'overdueTime', label: '宽限期到期日', showOverflowTooltip: true },
        { prop: 'actualPayTime', label: '实际还款日', showOverflowTooltip: true },
        { prop: 'amountPaid', label: '已还本金', showOverflowTooltip: true },
        { prop: 'overdueTotal', label: '当前逾期合计', showOverflowTooltip: true },
        {
            label: '2020年度还款计划',
            children: [
                {
                    prop: 'januaryRepayment',
                    label: '1月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'februaryRepayment',
                    label: '2月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'marchRepayment',
                    label: '3月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'aprilRepayment',
                    label: '4月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'mayRepayment',
                    label: '5月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'juneRepayment',
                    label: '6月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'julyRepayment',
                    label: '7月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'augustRepayment',
                    label: '8月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'septemberRepayment',
                    label: '9月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'octoberRepayment',
                    label: '10月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'novemberRepayment',
                    label: '11月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'decemberRepayment',
                    label: '12月',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'total',
                    label: '合计',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        },
        { prop: 'planProportion', label: '计划占比', showOverflowTooltip: true },
        { prop: 'noRepaymentPlanAmount', label: '无还款计划金额', showOverflowTooltip: true }
    ]
}
// 还款计划
export const annualRepaymentPlan = {
    januaryRepayment: '0',
    februaryRepayment: '0',
    marchRepayment: '0',
    aprilRepayment: '0',
    mayRepayment: '0',
    juneRepayment: '0',
    julyRepayment: '0',
    augustRepayment: '0',
    septemberRepayment: '0',
    octoberRepayment: '0',
    novemberRepayment: '0',
    decemberRepayment: '0',
    total: '0'
}
// 如果为空后台返回为null，需要多一层判断（后台规范！！！！）
export const platformSummarySheetTotal = {
    annualRepaymentPlan: null,
    arrearsCount: null,
    capitalAmount: null,
    currentSales: null,
    lastYearSales: null,
    loanCompanyName: null,
    misCode: null,
    noRepaymentPlanAmount: null,
    planProportion: null,
    regionName: null,
    subsectionName: null
}
export const overdueDetailTableTotal = {
    actualPayTime: null,
    amountPaid: null,
    aprilRepayment: null,
    augustRepayment: null,
    capitalAmount: null,
    decemberRepayment: null,
    februaryRepayment: null,
    januaryRepayment: null,
    julyRepayment: null,
    juneRepayment: null,
    loanAmount: null,
    loanCompanyName: null,
    marchRepayment: null,
    mayRepayment: null,
    misCode: null,
    noRepaymentPlanAmount: null,
    novemberRepayment: null,
    octoberRepayment: null,
    overdueTime: null,
    overdueTotal: null,
    payTime: null,
    planProportion: null,
    regionName: null,
    septemberRepayment: null,
    standingBookNo: null,
    subsectionName: null,
    total: null,
    year: 2020
}
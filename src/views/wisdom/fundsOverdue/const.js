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
        { prop: 'misCode', label: '公司编码', showOverflowTooltip: true },
        { prop: 'companyName', label: '公司名称', showOverflowTooltip: true },
        { prop: 'companyName', label: '分部', showOverflowTooltip: true },
        {
            label: '销售',
            children: [
                {
                    prop: 'januaryValue',
                    label: '19年',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                },
                {
                    prop: 'februaryValue',
                    label: '20年',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        },
        { prop: 'companyName', label: '欠款笔数', showOverflowTooltip: true },
        { prop: 'companyName', label: '剩余笔数', showOverflowTooltip: true },
        {
            label: '2020年度还款计划',
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
                }
            ]
        },
        { prop: 'companyName', label: '计划还款占比', showOverflowTooltip: true },
        { prop: 'companyName', label: '无计划金额', showOverflowTooltip: true }
    ]
}
// 逾期增量明细表
export const overdueDetailTable = function () {
    return [
        { prop: 'misCode', label: '借款单位', fixed: true, showOverflowTooltip: true },
        { prop: 'companyName', label: '公司编码', fixed: true, showOverflowTooltip: true },
        { prop: 'companyName', label: '公司名称', fixed: true, showOverflowTooltip: true },
        { prop: 'companyName', label: '大区', fixed: true, showOverflowTooltip: true },
        { prop: 'companyName', label: '分部', fixed: true, showOverflowTooltip: true },
        { prop: 'companyName', label: '借款金额', showOverflowTooltip: true },
        { prop: 'companyName', label: '合同到期日', showOverflowTooltip: true },
        { prop: 'companyName', label: '应还本金', showOverflowTooltip: true },
        { prop: 'companyName', label: '宽限期到期日', showOverflowTooltip: true },
        { prop: 'companyName', label: '实际还款日', showOverflowTooltip: true },
        { prop: 'companyName', label: '已还本金', showOverflowTooltip: true },
        { prop: 'companyName', label: '当前逾期合计', showOverflowTooltip: true },
        {
            label: '2020年度还款计划',
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
                    prop: 'decemberValue',
                    label: '合计',
                    width: '100',
                    displayAs: 'fundMoney',
                    showOverflowTooltip: true
                }
            ]
        },
        { prop: 'companyName', label: '计划占比', showOverflowTooltip: true },
        { prop: 'companyName', label: '无还款计划金额', showOverflowTooltip: true }
    ]
}
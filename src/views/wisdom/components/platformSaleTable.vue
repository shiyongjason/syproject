<template>
    <div class="wrapper">
        <div class="table_unit">
            <el-tooltip placement="top">
                <div slot="content">年度累计统计时间 2018-1-1～2019-1-31<br />其他指标统计时间 2018-3-1～2019-1-31<br />环比：（本月-上月）/上月<br />同比：（今年-去年）/去年</div>
                <el-button icon="el-icon-question" class="more_message"></el-button>
            </el-tooltip>
            单位：万
        </div>
        <div class="page-table">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250>
                <template slot-scope="scope" slot="regionName">
                    <span v-if="scope.row.regionName === null || scope.row.regionName === '-' || scope.row.regionName === ''">-</span>
                    <span v-else>{{scope.row.regionName}}</span>
                </template>
                <template slot-scope="scope" slot="saleRate">
                    <span v-if="scope.row.saleRate === null || scope.row.saleRate === '-'">-</span>
                    <span v-else>{{scope.row.saleRate}}%</span>
                </template>
                <template slot-scope="scope" slot="ranking">
                    <span v-if="scope.row.ranking === null">-</span>
                    <span v-else>{{scope.row.ranking}}</span>
                </template>
                <template slot-scope="scope" slot="overallActual">
                    <span v-if="scope.row.overallActual === null || scope.row.overallActual === '-'">-</span>
                    <span v-else>{{scope.row.overallActual | money}}</span>
                </template>
                <template slot-scope="scope" slot="overallGoal">
                    <span v-if="scope.row.overallGoal === null || scope.row.overallGoal === '-'">-</span>
                    <span v-else>{{scope.row.overallGoal | money}}</span>
                </template>
                <template slot-scope="scope" slot="overallAchievementRate">
                    <span v-if="scope.row.overallAchievementRate === null || scope.row.overallAchievementRate === '-'">-</span>
                    <span v-else>{{scope.row.overallAchievementRate}}%</span>
                </template>
                <template slot-scope="scope" slot="overallGap">
                    <span v-if="scope.row.overallGoal === null || scope.row.overallGoal === '-'">-</span>
                    <span v-else-if="scope.row.overallGap > 0" style="color: red">{{scope.row.overallGap | money}}</span>
                    <span v-else>0</span>
                </template>
                <template slot-scope="scope" slot="ringRatioUpperMoon">
                    <span v-if="scope.row.ringRatioUpperMoon === null || scope.row.ringRatioUpperMoon === '-'">-</span>
                    <span v-else>{{scope.row.ringRatioUpperMoon | money}}</span>
                </template>
                <template slot-scope="scope" slot="ringRatio">
                    <span v-if="scope.row.ringRatio === null || scope.row.ringRatio === '-'">-</span>
                    <span v-else :class="scope.row.ringRatio>0?'colGreen':'colRed'">{{scope.row.ringRatio}}%</span>
                </template>
                <template slot-scope="scope" slot="compositePeriod">
                    <span v-if="scope.row.compositePeriod === null || scope.row.compositePeriod === '-'">-</span>
                    <span v-else>{{scope.row.compositePeriod | money}}</span>
                </template>
                <template slot-scope="scope" slot="compoundYearOnYear">
                    <span v-if="scope.row.compoundYearOnYear === null || scope.row.compoundYearOnYear === '-'">-</span>
                    <span v-else :class="scope.row.compoundYearOnYear>0?'colGreen':'colRed'">{{scope.row.compoundYearOnYear}}%</span>
                </template>
                <template slot-scope="scope" slot="comparablePeriod">
                    <span v-if="scope.row.comparablePeriod === null || scope.row.comparablePeriod === '-'">-</span>
                    <span v-else>{{scope.row.comparablePeriod | money}}</span>
                </template>
                <template slot-scope="scope" slot="comparableYearOnYear">
                    <span v-if="scope.row.comparableYearOnYear === null || scope.row.comparableYearOnYear === '-'">-</span>
                    <span v-else :class="scope.row.comparableYearOnYear>0?'colGreen':'colRed'">{{scope.row.comparableYearOnYear}}%</span>
                </template>
                <template slot-scope="scope" slot="stockActual">
                    <span v-if="scope.row.stockActual === null || scope.row.stockActual === '-'">-</span>
                    <span v-else>{{scope.row.stockActual | money}}</span>
                </template>
                <template slot-scope="scope" slot="stockTarget">
                    <span v-if="scope.row.stockTarget === null || scope.row.stockTarget === '-'">-</span>
                    <span v-else>{{scope.row.stockTarget | money}}</span>
                </template>
                <template slot-scope="scope" slot="stockAchievementRate">
                    <span v-if="scope.row.stockAchievementRate === null || scope.row.stockAchievementRate === '-'">-</span>
                    <span v-else>{{scope.row.stockAchievementRate}}%</span>
                </template>
                <template slot-scope="scope" slot="stockSamePeriod">
                    <span v-if="scope.row.stockSamePeriod === null || scope.row.stockSamePeriod === '-'">-</span>
                    <span v-else>{{scope.row.stockSamePeriod | money}}</span>
                </template>
                <template slot-scope="scope" slot="stockYearOnYear">
                    <span v-if="scope.row.stockYearOnYear === null || scope.row.stockYearOnYear === '-'">-</span>
                    <span v-else>{{scope.row.stockYearOnYear}}%</span>
                </template>
                <template slot-scope="scope" slot="stockProportion">
                    <span v-if="scope.row.stockProportion === null || scope.row.stockProportion === '-'">-</span>
                    <span v-else>{{scope.row.stockProportion}}%</span>
                </template>
                <template slot-scope="scope" slot="incrementActual">
                    <span v-if="scope.row.incrementActual === null || scope.row.incrementActual === '-'">-</span>
                    <span v-else>{{scope.row.incrementActual | money}}</span>
                </template>
                <template slot-scope="scope" slot="incrementTarget">
                    <span v-if="scope.row.incrementTarget === null || scope.row.incrementTarget === '-'">-</span>
                    <span v-else>{{scope.row.incrementTarget | money}}</span>
                </template>
                <template slot-scope="scope" slot="incrementAchievingRate">
                    <span v-if="scope.row.incrementAchievingRate === null || scope.row.incrementAchievingRate === '-'">-</span>
                    <span v-else>{{scope.row.incrementAchievingRate}}%</span>
                </template>
                <template slot-scope="scope" slot="incrementProportion">
                    <span v-if="scope.row.incrementProportion === null || scope.row.incrementProportion === '-'">-</span>
                    <span v-else>{{scope.row.incrementProportion}}%</span>
                </template>
                <template slot-scope="scope" slot="annualAccumulation">
                    <span v-if="scope.row.annualAccumulation === null || scope.row.annualAccumulation === '-'">-</span>
                    <span v-else>{{scope.row.annualAccumulation | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualTarget">
                    <span v-if="scope.row.annualTarget === null || scope.row.annualTarget === '-'">-</span>
                    <span v-else>{{scope.row.annualTarget | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualAchievingRate">
                    <span v-if="scope.row.annualAchievingRate === null || scope.row.annualAchievingRate === '-'">-</span>
                    <span v-else>{{scope.row.annualAchievingRate}}%</span>
                </template>
                <template slot-scope="scope" slot="annualCumulativeGap">
                    <span v-if="scope.row.annualCumulativeGap === null || scope.row.annualCumulativeGap === '-'">-</span>
                    <span v-else-if="scope.row.annualCumulativeGap > 0" style="color: red">{{scope.row.annualCumulativeGap | money}}</span>
                    <span v-else>0</span>
                </template>
                <template slot-scope="scope" slot="annualStockReached">
                    <span v-if="scope.row.annualStockReached === null || scope.row.annualStockReached === '-'">-</span>
                    <span v-else>{{scope.row.annualStockReached | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualStockTarget">
                    <span v-if="scope.row.annualStockTarget === null || scope.row.annualStockTarget === '-'">-</span>
                    <span v-else>{{scope.row.annualStockTarget | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualStockCompletionRate">
                    <span v-if="scope.row.annualStockCompletionRate === null || scope.row.annualStockCompletionRate === '-'">-</span>
                    <span v-else>{{scope.row.annualStockCompletionRate}}%</span>
                </template>
                <template slot-scope="scope" slot="annualIncrementalAchievement">
                    <span v-if="scope.row.annualIncrementalAchievement === null || scope.row.annualIncrementalAchievement === '-'">-</span>
                    <span v-else>{{scope.row.annualIncrementalAchievement | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualIncrementalGoal">
                    <span v-if="scope.row.annualIncrementalGoal === null || scope.row.annualIncrementalGoal === '-'">-</span>
                    <span v-else>{{scope.row.annualIncrementalGoal | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualIncrementalAchievementRate">
                    <span v-if="scope.row.annualIncrementalAchievementRate === null || scope.row.annualIncrementalAchievementRate === '-'">-</span>
                    <span v-else>{{scope.row.annualIncrementalAchievementRate}}%</span>
                </template>
            </basicTable>
            <div class="page clearfix" style="text-align: right;margin-top: 20px">
                <el-pagination class="el-page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40, 50]" :total="paginationData.totalElements">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'platformSaleTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        paginationData: {},
        loading: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    data () {
        return {
            tableLabel: [
                { label: '平台公司', prop: 'companyShortName' },
                { label: 'mis编码', prop: 'misCode', choosed: false },
                { label: '所属分部', prop: 'subsectionName', choosed: false },
                { label: '城市', prop: 'cityName', choosed: false },
                { label: '上线时间', prop: 'onlineTime', choosed: false },
                { label: '签约规模', prop: 'signScale', choosed: false },
                { label: '总经理', prop: 'controllerName', choosed: true },
                { label: '增量/存量', prop: 'incremental', choosed: false },
                { label: '分部排名', prop: 'subsectionRank', choosed: false },
                { label: '全国排名', prop: 'countryRank', choosed: false },
                {
                    label: '达成',
                    tableLabel: [
                        { label: '实际', prop: 'totalOrderFee', choosed: true },
                        { label: '目标', prop: 'target', choosed: true },
                        { label: '达成率', prop: 'achievingRate', choosed: true },
                        { label: '缺口', prop: 'gap', choosed: true }
                    ]
                },
                {
                    label: '环比',
                    tableLabel: [
                        { label: '上月', prop: 'lastMonthSale', choosed: true },
                        { label: '环比', prop: 'linkRelativeRatio', choosed: true }
                    ]
                },
                {
                    label: '同比',
                    tableLabel: [
                        { label: '同期', prop: 'yearOnYear', choosed: true },
                        { label: '同比', prop: 'yearOnYearRatio', choosed: true }
                    ]
                },
                {
                    label: '年度累计',
                    tableLabel: [
                        { label: '实际', prop: 'yearSaleReal', choosed: true },
                        { label: '目标', prop: 'yearTarget', choosed: true },
                        { label: '达成率', prop: 'yearAchievingRate', choosed: true }
                    ]
                }
            ]
        }
    },
    methods: {
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        },
        onCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        },
        onSizeChange (val) {
            this.$emit('onSizeChange', val)
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
}
.table_unit {
    position: absolute;
    right: 10px;
    top: -50px;
}
.more_message {
    padding: 0;
    border: 0;
}
.collapse {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 2px;
    z-index: 1;
    cursor: pointer;
}
.collapse-content {
    position: absolute;
    width: 180px;
    top: 35px;
    right: 10px;
    background: #ffffff;
    z-index: 2;
    padding: 10px 18px;
    box-sizing: border-box;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
    float: left;
    width: 100%;
}
/deep/ td {
    padding: 12px 0;
}
/deep/ .is-group th {
    text-align: center;
}
/deep/ .el-table__row td {
    text-align: right;
}
/deep/ .el-table_1_column_1 {
    text-align: center !important;
}
</style>

<template>
    <div class="wrapper page-table">
        <div class="table_unit">
            <el-tooltip placement="top">
                <div slot="content">年度累计统计时间 2018-1-1～2019-1-31<br />其他指标统计时间 2018-3-1～2019-1-31<br />环比：（本月-上月）/上月<br />复合同比：（今年all平台-去年同期all平台）/去年同期all平台<br />可比同比：（今年A平台-去年同期A平台）/去年同期A平台</div>
                <el-button icon="el-icon-question" class="more_message"></el-button>
            </el-tooltip>
            单位：万
        </div>
        <div class="page-table">
            <basicTable :maxHeight="550" :tableData="tableData" :tableLabel="tableLabel" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250>
                <template slot-scope="scope" slot="saleRate">
                    <span v-if="scope.data.row.saleRate === null || scope.data.row.saleRate === '-'">-</span>
                    <span v-else>{{scope.data.row.saleRate}}%</span>
                </template>
                <template slot-scope="scope" slot="overallActual">
                    <span v-if="scope.data.row.overallActual === null || scope.data.row.overallActual === '-'">-</span>
                    <span v-else>{{scope.data.row.overallActual | money}}</span>
                </template>
                <template slot-scope="scope" slot="overallGoal">
                    <span v-if="scope.data.row.overallGoal === null || scope.data.row.overallGoal === '-'">-</span>
                    <span v-else>{{scope.data.row.overallGoal | money}}</span>
                </template>
                <template slot-scope="scope" slot="overallAchievementRate">
                    <span v-if="scope.data.row.overallAchievementRate === null || scope.data.row.overallAchievementRate === '-'">-</span>
                    <span v-else>{{scope.data.row.overallAchievementRate}}%</span>
                </template>
                <template slot-scope="scope" slot="overallGap">
                    <span v-if="scope.data.row.overallGoal === null || scope.data.row.overallGoal === '-'">-</span>
                    <span v-else-if="scope.data.row.overallGap > 0" style="color: red">{{scope.data.row.overallGap | money}}</span>
                    <span v-else>0</span>
                </template>
                <template slot-scope="scope" slot="ringRatioUpperMoon">
                    <span v-if="scope.data.row.ringRatioUpperMoon === null || scope.data.row.ringRatioUpperMoon === '-'">-</span>
                    <span v-else>{{scope.data.row.ringRatioUpperMoon | money}}</span>
                </template>
                <template slot-scope="scope" slot="ringRatio">
                    <span v-if="scope.data.row.ringRatio === null || scope.data.row.ringRatio === '-'">-</span>
                    <span v-else :class="scope.data.row.ringRatio>0?'colGreen':'colRed'">{{scope.data.row.ringRatio}}%</span>
                </template>
                <template slot-scope="scope" slot="compositePeriod">
                    <span v-if="scope.data.row.compositePeriod === null || scope.data.row.compositePeriod === '-'">-</span>
                    <span v-else>{{scope.data.row.compositePeriod | money}}</span>
                </template>
                <template slot-scope="scope" slot="compoundYearOnYear">
                    <span v-if="scope.data.row.compoundYearOnYear === null || scope.data.row.compoundYearOnYear === '-'">-</span>
                    <span v-else :class="scope.data.row.compoundYearOnYear>0?'colGreen':'colRed'">{{scope.data.row.compoundYearOnYear}}%</span>
                </template>
                <template slot-scope="scope" slot="comparablePeriod">
                    <span v-if="scope.data.row.comparablePeriod === null || scope.data.row.comparablePeriod === '-'">-</span>
                    <span v-else>{{scope.data.row.comparablePeriod | money}}</span>
                </template>
                <template slot-scope="scope" slot="comparableYearOnYear">
                    <span v-if="scope.data.row.comparableYearOnYear === null || scope.data.row.comparableYearOnYear === '-'">-</span>
                    <span v-else :class="scope.data.row.comparableYearOnYear>0?'colGreen':'colRed'">{{scope.data.row.comparableYearOnYear}}%</span>
                </template>
                <template slot-scope="scope" slot="stockActual">
                    <span v-if="scope.data.row.stockActual === null || scope.data.row.stockActual === '-'">-</span>
                    <span v-else>{{scope.data.row.stockActual | money}}</span>
                </template>
                <template slot-scope="scope" slot="stockTarget">
                    <span v-if="scope.data.row.stockTarget === null || scope.data.row.stockTarget === '-'">-</span>
                    <span v-else>{{scope.data.row.stockTarget | money}}</span>
                </template>
                <template slot-scope="scope" slot="stockAchievementRate">
                    <span v-if="scope.data.row.stockAchievementRate === null || scope.data.row.stockAchievementRate === '-'">-</span>
                    <span v-else>{{scope.data.row.stockAchievementRate}}%</span>
                </template>
                <template slot-scope="scope" slot="stockSamePeriod">
                    <span v-if="scope.data.row.stockSamePeriod === null || scope.data.row.stockSamePeriod === '-'">-</span>
                    <span v-else>{{scope.data.row.stockSamePeriod | money}}</span>
                </template>
                <template slot-scope="scope" slot="stockYearOnYear">
                    <span v-if="scope.data.row.stockYearOnYear === null || scope.data.row.stockYearOnYear === '-'">-</span>
                    <span v-else>{{scope.data.row.stockYearOnYear}}%</span>
                </template>
                <template slot-scope="scope" slot="stockProportion">
                    <span v-if="scope.data.row.stockProportion === null || scope.data.row.stockProportion === '-'">-</span>
                    <span v-else>{{scope.data.row.stockProportion}}%</span>
                </template>
                <template slot-scope="scope" slot="incrementActual">
                    <span v-if="scope.data.row.incrementActual === null || scope.data.row.incrementActual === '-'">-</span>
                    <span v-else>{{scope.data.row.incrementActual | money}}</span>
                </template>
                <template slot-scope="scope" slot="incrementTarget">
                    <span v-if="scope.data.row.incrementTarget === null || scope.data.row.incrementTarget === '-'">-</span>
                    <span v-else>{{scope.data.row.incrementTarget | money}}</span>
                </template>
                <template slot-scope="scope" slot="incrementAchievingRate">
                    <span v-if="scope.data.row.incrementAchievingRate === null || scope.data.row.incrementAchievingRate === '-'">-</span>
                    <span v-else>{{scope.data.row.incrementAchievingRate}}%</span>
                </template>
                <template slot-scope="scope" slot="incrementProportion">
                    <span v-if="scope.data.row.incrementProportion === null || scope.data.row.incrementProportion === '-'">-</span>
                    <span v-else>{{scope.data.row.incrementProportion}}%</span>
                </template>
                <template slot-scope="scope" slot="annualAccumulation">
                    <span v-if="scope.data.row.annualAccumulation === null || scope.data.row.annualAccumulation === '-'">-</span>
                    <span v-else>{{scope.data.row.annualAccumulation | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualTarget">
                    <span v-if="scope.data.row.annualTarget === null || scope.data.row.annualTarget === '-'">-</span>
                    <span v-else>{{scope.data.row.annualTarget | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualAchievingRate">
                    <span v-if="scope.data.row.annualAchievingRate === null || scope.data.row.annualAchievingRate === '-'">-</span>
                    <span v-else>{{scope.data.row.annualAchievingRate}}%</span>
                </template>
                <template slot-scope="scope" slot="annualCumulativeGap">
                    <span v-if="scope.data.row.annualCumulativeGap === null || scope.data.row.annualCumulativeGap === '-'">-</span>
                    <span v-else-if="scope.data.row.annualCumulativeGap > 0" style="color: red">{{scope.data.row.annualCumulativeGap | money}}</span>
                    <span v-else>0</span>
                </template>
                <template slot-scope="scope" slot="annualStockReached">
                    <span v-if="scope.data.row.annualStockReached === null || scope.data.row.annualStockReached === '-'">-</span>
                    <span v-else>{{scope.data.row.annualStockReached | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualStockTarget">
                    <span v-if="scope.data.row.annualStockTarget === null || scope.data.row.annualStockTarget === '-'">-</span>
                    <span v-else>{{scope.data.row.annualStockTarget | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualStockCompletionRate">
                    <span v-if="scope.data.row.annualStockCompletionRate === null || scope.data.row.annualStockCompletionRate === '-'">-</span>
                    <span v-else>{{scope.data.row.annualStockCompletionRate}}%</span>
                </template>
                <template slot-scope="scope" slot="annualIncrementalAchievement">
                    <span v-if="scope.data.row.annualIncrementalAchievement === null || scope.data.row.annualIncrementalAchievement === '-'">-</span>
                    <span v-else>{{scope.data.row.annualIncrementalAchievement | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualIncrementalGoal">
                    <span v-if="scope.data.row.annualIncrementalGoal === null || scope.data.row.annualIncrementalGoal === '-'">-</span>
                    <span v-else>{{scope.data.row.annualIncrementalGoal | money}}</span>
                </template>
                <template slot-scope="scope" slot="annualIncrementalAchievementRate">
                    <span v-if="scope.data.row.annualIncrementalAchievementRate === null || scope.data.row.annualIncrementalAchievementRate === '-'">-</span>
                    <span v-else>{{scope.data.row.annualIncrementalAchievementRate}}%</span>
                </template>
            </basicTable>
            <div class="page clearfix" style="text-align: center;margin-top: 20px">
                <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.totalElements">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'branchSaleTable',
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
                { label: '分部', prop: 'subsectionName' },
                { label: '所属大区', prop: 'regionName' },
                { label: '销售占比', prop: 'saleRate', choosed: false },
                { label: '排名', prop: 'ranking', choosed: false },
                {
                    label: '整体',
                    tableLabel: [
                        { label: '实际', prop: 'overallActual', choosed: true },
                        { label: '目标', prop: 'overallGoal', choosed: true },
                        { label: '达成率', prop: 'overallAchievementRate', choosed: true },
                        { label: '缺口', prop: 'overallGap', choosed: true }
                    ]
                },
                {
                    label: '环比',
                    tableLabel: [
                        { label: '上月', prop: 'ringRatioUpperMoon', choosed: true },
                        { label: '环比', prop: 'ringRatioUpperMoon', choosed: true }
                    ]
                },
                {
                    label: '复合同比',
                    tableLabel: [
                        { label: '复合同期', prop: 'compositePeriod', choosed: true },
                        { label: '复合同比', prop: 'compoundYearOnYear', choosed: true }
                    ]
                },
                {
                    label: '可比同比',
                    tableLabel: [
                        { label: '可比同期', prop: 'comparablePeriod', choosed: true },
                        { label: '可比同比', prop: 'comparableYearOnYear', choosed: true }
                    ]
                },
                {
                    label: '存量',
                    choosed: false,
                    tableLabel: [
                        { label: '实际', prop: 'stockActual', choosed: true },
                        { label: '目标', prop: 'stockTarget', choosed: true },
                        { label: '达成率', prop: 'stockAchievementRate', choosed: true },
                        { label: '同期', prop: 'stockSamePeriod', choosed: true },
                        { label: '同比', prop: 'stockYearOnYear', choosed: true },
                        { label: '销售占比', prop: 'stockProportion', choosed: true }
                    ]
                },
                {
                    label: '增量',
                    choosed: false,
                    tableLabel: [
                        { label: '实际', prop: 'incrementActual', choosed: true },
                        { label: '目标', prop: 'incrementTarget', choosed: true },
                        { label: '达成率', prop: 'incrementAchievingRate', choosed: true },
                        { label: '销售占比', prop: 'incrementProportion', choosed: true }
                    ]
                },
                {
                    label: '年度累计',
                    choosed: false,
                    tableLabel: [
                        { label: '实际', prop: 'annualAccumulation', choosed: true },
                        { label: '目标', prop: 'annualTarget', choosed: true },
                        { label: '达成率', prop: 'annualAchievingRate', choosed: true },
                        { label: '缺口', prop: 'annualCumulativeGap', choosed: true },
                        { label: '存量达成', prop: 'annualStockReached', choosed: true },
                        { label: '存量目标', prop: 'annualStockTarget', choosed: true },
                        { label: '存量达成率', prop: 'annualStockCompletionRate', choosed: true },
                        { label: '增量达成', prop: 'annualIncrementalAchievement', choosed: true },
                        { label: '增量目标', prop: 'annualIncrementalGoal', choosed: true },
                        { label: '增量达成率', prop: 'annualIncrementalAchievementRate', choosed: true }
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
.page-table {
    .el-table th,
    .el-table tr {
        // background-color: transparent;
        text-align: center;
        min-width: 400px;
    }
    .el-table {
        margin-bottom: 20px;

        .has-gutter th,
        .is-leaf {
            background: #f5f7fa;
        }

        td {
            padding: 12px 0;
            min-width: 0;
            box-sizing: border-box;
            text-overflow: ellipsis;
            vertical-align: middle;
            position: relative;
        }

        .cell {
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            // white-space: normal;
            word-break: break-all;
            line-height: 23px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    .hs-gutter {
        th {
            text-align: center;
        }
    }
    // /deep/.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    //     border-right: 1px solid #C9C9C9 !important;
    // }
    // .el-table td, .el-table th.is-leaf{
    //     border-bottom: 1px solid #C9C9C9 !important;
    // }
    // .el-table--border, .el-table--group{
    //     border: 1px solid #C9C9C9;
    // }
    // .el-table--border th, .el-table__fixed-right-patch{
    //     border-bottom: 1px solid #C9C9C9;
    // }
}
.colRed {
    color: #ee4134;
}
.colGreen {
    color: #1ab26f;
}
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
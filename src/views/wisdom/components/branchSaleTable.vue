<template>
    <div class="wrapper">
        <div class="table_unit">
            <el-tooltip placement="top">
                <div slot="content">年度累计统计时间 2018-1-1～2019-1-31<br/>其他指标统计时间 2018-3-1～2019-1-31<br/>环比：（本月-上月）/上月<br/>复合同比：（今年all平台-去年同期all平台）/去年同期all平台<br/>可比同比：（今年A平台-去年同期A平台）/去年同期A平台</div>
                <el-button icon="el-icon-question" class="more_message"></el-button>
            </el-tooltip>
            单位：万
        </div>
        <div class="collapse">
            <img src="../../../assets/typeIcon.png" alt="" class="collapse" @click="collapse = !collapse">
        </div>
        <el-collapse-transition>
            <div class="collapse-content" v-if="collapse">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="selectTh" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="item in defaultTh" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </el-collapse-transition>
        <el-table :data="tableData"
                  border
                  height="573"
                  v-loading="loading"
                  style="width: 100%">
            <el-table-column
                algin="center"
                fixed
                prop="subsectionName"
                width="100"
                label="分部" v-if="selectTh.indexOf('分部')>-1">
            </el-table-column>
            <el-table-column
                prop="regionName"
                algin="center"
                label="所属大区" v-if="selectTh.indexOf('所属大区')>-1">
                <template slot-scope="scope">
                    <span v-if="scope.row.regionName === null || scope.row.regionName === '-' || scope.row.regionName === ''">-</span>
                    <span v-else>{{scope.row.regionName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="saleRate"
                algin="center"
                label="销售占比" v-if="selectTh.indexOf('销售占比')>-1">
                <template slot-scope="scope">
                    <span v-if="scope.row.saleRate === null || scope.row.saleRate === '-'">-</span>
                    <span v-else>{{scope.row.saleRate}}%</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="ranking"
                algin="center"
                label="排名" v-if="selectTh.indexOf('排名')>-1">
                <template slot-scope="scope">
                        <span v-if="scope.row.ranking === null">-</span>
                        <span v-else>{{scope.row.ranking}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="整体" v-if="selectTh.indexOf('整体')>-1">
                <el-table-column
                    prop="overallActual"
                    width="150"
                    label="实际">
                    <template slot-scope="scope">
                        <span v-if="scope.row.overallActual === null || scope.row.overallActual === '-'">-</span>
                        <span v-else>{{scope.row.overallActual | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="overallGoal"
                    width="150"
                    label="目标">
                    <template slot-scope="scope">
                        <span v-if="scope.row.overallGoal === null || scope.row.overallGoal === '-'">-</span>
                        <span v-else>{{scope.row.overallGoal | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="overallAchievementRate"
                    width="100"
                    label="达成率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.overallAchievementRate === null || scope.row.overallAchievementRate === '-'">-</span>
                        <span v-else>{{scope.row.overallAchievementRate}}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="overallGap"
                    width="150"
                    label="缺口">
                    <template slot-scope="scope">
                        <span v-if="scope.row.overallGoal === null || scope.row.overallGoal === '-'">-</span>
                        <span v-else-if="scope.row.overallGap > 0" style="color: red">{{scope.row.overallGap | thousands}}</span>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="环比" v-if="selectTh.indexOf('环比')>-1">
                <el-table-column
                    prop="ringRatioUpperMoon"
                    width="150"
                    label="上月">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ringRatioUpperMoon === null || scope.row.ringRatioUpperMoon === '-'">-</span>
                        <span v-else>{{scope.row.ringRatioUpperMoon | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ringRatio"
                    width="100"
                    label="环比">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ringRatio === null || scope.row.ringRatio === '-'">-</span>
                        <span v-else>{{scope.row.ringRatio}}%</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="复合同比" v-if="selectTh.indexOf('复合同比')>-1">
                <el-table-column
                    prop="compositePeriod"
                    width="150"
                    label="复合同期">
                    <template slot-scope="scope">
                        <span v-if="scope.row.compositePeriod === null || scope.row.compositePeriod === '-'">-</span>
                        <span v-else>{{scope.row.compositePeriod | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="compoundYearOnYear"
                    width="100"
                    label="复合同比">
                    <template slot-scope="scope">
                        <span v-if="scope.row.compoundYearOnYear === null || scope.row.compoundYearOnYear === '-'">-</span>
                        <span v-else>{{scope.row.compoundYearOnYear}}%</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="可比同比" v-if="selectTh.indexOf('可比同比')>-1">
                <el-table-column
                    prop="comparablePeriod"
                    width="150"
                    label="可比同期">
                    <template slot-scope="scope">
                        <span v-if="scope.row.comparablePeriod === null || scope.row.comparablePeriod === '-'">-</span>
                        <span v-else>{{scope.row.comparablePeriod | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="comparableYearOnYear"
                    width="100"
                    label="可比同比">
                    <template slot-scope="scope">
                        <span v-if="scope.row.comparableYearOnYear === null || scope.row.comparableYearOnYear === '-'">-</span>
                        <span v-else>{{scope.row.comparableYearOnYear}}%</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="存量" v-if="selectTh.indexOf('存量')>-1">
                <el-table-column
                    prop="stockActual"
                    width="150"
                    label="实际">
                    <template slot-scope="scope">
                        <span v-if="scope.row.stockActual === null || scope.row.stockActual === '-'">-</span>
                        <span v-else>{{scope.row.stockActual | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stockTarget"
                    width="150"
                    label="目标">
                    <template slot-scope="scope">
                        <span v-if="scope.row.stockTarget === null || scope.row.stockTarget === '-'">-</span>
                        <span v-else>{{scope.row.stockTarget | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stockAchievementRate"
                    width="100"
                    label="达成率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.stockAchievementRate === null || scope.row.stockAchievementRate === '-'">-</span>
                        <span v-else>{{scope.row.stockAchievementRate}}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stockSamePeriod"
                    width="150"
                    label="同期">
                    <template slot-scope="scope">
                        <span v-if="scope.row.stockSamePeriod === null || scope.row.stockSamePeriod === '-'">-</span>
                        <span v-else>{{scope.row.stockSamePeriod | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stockYearOnYear"
                    width="100"
                    label="同比">
                    <template slot-scope="scope">
                        <span v-if="scope.row.stockYearOnYear === null || scope.row.stockYearOnYear === '-'">-</span>
                        <span v-else>{{scope.row.stockYearOnYear}}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stockProportion"
                    width="100"
                    label="销售占比">
                    <template slot-scope="scope">
                        <span v-if="scope.row.stockProportion === null || scope.row.stockProportion === '-'">-</span>
                        <span v-else>{{scope.row.stockProportion}}%</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="增量" v-if="selectTh.indexOf('增量')>-1">
                <el-table-column
                    prop="incrementActual"
                    width="150"
                    label="实际">
                    <template slot-scope="scope">
                        <span v-if="scope.row.incrementActual === null || scope.row.incrementActual === '-'">-</span>
                        <span v-else>{{scope.row.incrementActual | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="incrementTarget"
                    width="150"
                    label="目标">
                    <template slot-scope="scope">
                        <span v-if="scope.row.incrementTarget === null || scope.row.incrementTarget === '-'">-</span>
                        <span v-else>{{scope.row.incrementTarget | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="incrementAchievingRate"
                    width="100"
                    label="达成率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.incrementAchievingRate === null || scope.row.incrementAchievingRate === '-'">-</span>
                        <span v-else>{{scope.row.incrementAchievingRate}}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="incrementProportion"
                    width="100"
                    label="销售占比">
                    <template slot-scope="scope">
                        <span v-if="scope.row.incrementProportion === null || scope.row.incrementProportion === '-'">-</span>
                        <span v-else>{{scope.row.incrementProportion}}%</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="年度累计" v-if="selectTh.indexOf('年度累计')>-1">
                <el-table-column
                    prop="annualAccumulation"
                    width="150"
                    label="实际">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualAccumulation === null || scope.row.annualAccumulation === '-'">-</span>
                        <span v-else>{{scope.row.annualAccumulation | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualTarget"
                    width="150"
                    label="目标">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualTarget === null || scope.row.annualTarget === '-'">-</span>
                        <span v-else>{{scope.row.annualTarget | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualAchievingRate"
                    width="100"
                    label="达成率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualAchievingRate === null || scope.row.annualAchievingRate === '-'">-</span>
                        <span v-else>{{scope.row.annualAchievingRate}}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualCumulativeGap"
                    width="150"
                    label="缺口">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualCumulativeGap === null || scope.row.annualCumulativeGap === '-'">-</span>
                        <span v-else-if="scope.row.annualCumulativeGap > 0" style="color: red">{{scope.row.annualCumulativeGap | thousands}}</span>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualStockReached"
                    width="150"
                    label="存量达成">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualStockReached === null || scope.row.annualStockReached === '-'">-</span>
                        <span v-else>{{scope.row.annualStockReached | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualStockTarget"
                    width="150"
                    label="存量目标">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualStockTarget === null || scope.row.annualStockTarget === '-'">-</span>
                        <span v-else>{{scope.row.annualStockTarget | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualStockCompletionRate"
                    width="100"
                    label="存量达成率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualStockCompletionRate === null || scope.row.annualStockCompletionRate === '-'">-</span>
                        <span v-else>{{scope.row.annualStockCompletionRate}}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualIncrementalAchievement"
                    width="150"
                    label="增量达成">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualIncrementalAchievement === null || scope.row.annualIncrementalAchievement === '-'">-</span>
                        <span v-else>{{scope.row.annualIncrementalAchievement | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualIncrementalGoal"
                    width="150"
                    label="增量目标">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualIncrementalGoal === null || scope.row.annualIncrementalGoal === '-'">-</span>
                        <span v-else>{{scope.row.annualIncrementalGoal | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="annualIncrementalAchievementRate"
                    width="100"
                    label="增量达成率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.annualIncrementalAchievementRate === null || scope.row.annualIncrementalAchievementRate === '-'">-</span>
                        <span v-else>{{scope.row.annualIncrementalAchievementRate}}%</span>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination
                class="el-page"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationData.pageNumber"
                :page-sizes="[10, 20, 30, 40, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationData.totalElements">
            </el-pagination>
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
        paginationData: {
            type: Object,
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        },
        loading: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    data () {
        return {
            defaultTh: [
                '分部',
                '所属大区',
                '销售占比',
                '排名',
                '整体',
                '环比',
                '复合同比',
                '可比同比',
                '存量',
                '增量',
                '年度累计'
            ],
            selectTh: ['分部', '整体', '环比', '复合同比', '可比同比'], // 默认初始选中
            checkAll: true,
            checkedCities: [],
            isIndeterminate: true,
            collapse: false
        }
    },
    methods: {
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        },
        handleCheckAllChange (val) {
            this.selectTh = val ? this.defaultTh : []
            this.isIndeterminate = false
        },
        handleCheckedCitiesChange (value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.selectTh.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectTh.length
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    position: relative;
}
.table_unit{
    position: absolute;
    right: 10px;
    top: -30px;
}
.more_message{
    padding: 0;
    border: 0;
}
.collapse{
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 2px;
    z-index: 1;
    cursor: pointer;
}
.collapse-content{
    position: absolute;
    width: 180px;
    top: 35px;
    right: 10px;
    background: #ffffff;
    z-index: 2;
    padding: 10px 18px;
    box-sizing: border-box;
}
.el-checkbox+.el-checkbox{
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
/deep/ .el-table__row td{
    text-align: right;
}
/deep/ .el-table_1_column_1{
    text-align: center !important;
}
</style>
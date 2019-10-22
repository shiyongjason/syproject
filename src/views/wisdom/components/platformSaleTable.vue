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
                <!-- 颜色 -->
                <template slot-scope="scope" slot="gap">
                    <span v-if="scope.data.row.gap === null || scope.data.row.gap === '-' || scope.data.row.gap === ''">-</span>
                    <span v-else-if="scope.data.row.gap > 0" style="color: red">{{scope.data.row.gap | money}}</span>
                    <span v-else>0</span>
                </template>
                <template slot-scope="scope" slot="linkRelativeRatio">
                    <span v-if="scope.data.row.linkRelativeRatio === null || scope.data.row.linkRelativeRatio === '-' || scope.data.row.linkRelativeRatio === ''">-</span>
                    <span v-else :class="scope.data.row.linkRelativeRatio>=0?'colGreen':'colRed'">{{scope.data.row.linkRelativeRatio}}</span>
                </template>
                <!-- % -->
                <template slot-scope="scope" slot="achievingRate">
                    <span v-if="scope.data.row.achievingRate === null || scope.data.row.achievingRate === '-'">-</span>
                    <span v-else>{{scope.data.row.achievingRate}}%</span>
                </template>
                <template slot-scope="scope" slot="yearAchievingRate">
                    <span v-if="scope.data.row.yearAchievingRate === null || scope.data.row.yearAchievingRate === '-'">-</span>
                    <span v-else>{{scope.data.row.yearAchievingRate}}%</span>
                </template>
                <!-- 金额 -->
                <template slot-scope="scope" slot="totalOrderFee">
                    <span v-if="scope.data.row.totalOrderFee === null || scope.data.row.totalOrderFee === '-'">-</span>
                    <span v-else>{{scope.data.row.totalOrderFee | money}}</span>
                </template>
                <template slot-scope="scope" slot="target">
                    <span v-if="scope.data.row.target === null || scope.data.row.target === '-'">-</span>
                    <span v-else>{{scope.data.row.target | money}}</span>
                </template>
                <template slot-scope="scope" slot="lastMonthSale">
                    <span v-if="scope.data.row.lastMonthSale === null || scope.data.row.lastMonthSale === '-'">-</span>
                    <span v-else>{{scope.data.row.lastMonthSale | money}}</span>
                </template>
                <template slot-scope="scope" slot="yearSaleReal">
                    <span v-if="scope.data.row.yearSaleReal === null || scope.data.row.yearSaleReal === '-'">-</span>
                    <span v-else>{{scope.data.row.yearSaleReal | money}}</span>
                </template>
                <template slot-scope="scope" slot="yearTarget">
                    <span v-if="scope.data.row.yearTarget === null || scope.data.row.yearTarget === '-'">-</span>
                    <span v-else>{{scope.data.row.yearTarget | money}}</span>
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

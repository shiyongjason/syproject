<template>
    <div class="wrapper">
        <div class="table_unit">
            <el-tooltip placement="top">
                <div slot="content">年度累计统计时间 2018-1-1～2019-1-31<br/>其他指标统计时间 2018-3-1～2019-1-31<br/>环比：（本月-上月）/上月<br/>同比：（今年-去年）/去年</div>
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
                prop="companyShortName"
                width="120"
                fixed
                label="平台公司" v-if="selectTh.indexOf('平台公司')>-1">
            </el-table-column>
            <el-table-column
                prop="misCode"
                width="100"
                label="mis编码" v-if="selectTh.indexOf('mis编码')>-1">
                <template slot-scope="scope">
                    <span>{{scope.row.misCode ? scope.row.misCode : '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="subsectionName"
                width="100"
                label="所属分部" v-if="selectTh.indexOf('所属分部')>-1">
                <template slot-scope="scope">
                        <span v-if="scope.row.subsectionName === null">-</span>
                        <span v-else>{{scope.row.subsectionName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="cityName"
                label="城市" v-if="selectTh.indexOf('城市')>-1">
                <template slot-scope="scope">
                        <span v-if="scope.row.cityName === null">-</span>
                        <span v-else>{{scope.row.cityName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="onlineTime"
                width="120"
                label="上线时间" v-if="selectTh.indexOf('上线时间')>-1">
                <template slot-scope="scope">
                        <span v-if="scope.row.onlineTime === null ||scope.row.onlineTime === ''">-</span>
                        <span v-else>{{scope.row.onlineTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="signScale"
                width="100"
                label="签约规模" v-if="selectTh.indexOf('签约规模')>-1">
                <template slot-scope="scope">
                        <span v-if="scope.row.signScale === null || scope.row.signScale === '-'">-</span>
                        <span v-else>{{scope.row.signScale | thousands}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="controllerName"
                width="100"
                label="总经理" v-if="selectTh.indexOf('总经理')>-1">
                <template slot-scope="scope">
                        <span v-if="scope.row.controllerName === null">-</span>
                        <span v-else>{{scope.row.controllerName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="incremental"
                width="100"
                :formatter="incremental"
                label="增量/存量" v-if="selectTh.indexOf('增量/存量')>-1">
            </el-table-column>
            <el-table-column
                prop="subsectionRank"
                label="分部排名" v-if="selectTh.indexOf('分部排名')>-1">
                <template slot-scope="scope">
                        <span v-if="scope.row.subsectionRank === null">-</span>
                        <span v-else>{{scope.row.subsectionRank}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="countryRank"
                label="全国排名" v-if="selectTh.indexOf('全国排名')>-1">
                <template slot-scope="scope">
                        <span v-if="scope.row.countryRank === null">-</span>
                        <span v-else>{{scope.row.countryRank}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="达成" v-if="selectTh.indexOf('达成')>-1">
                <el-table-column
                    prop="totalOrderFee"
                    width="150"
                    label="实际">
                    <template slot-scope="scope">
                            <span v-if="scope.row.totalOrderFee === null">-</span>
                            <span v-else>{{scope.row.totalOrderFee | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="target"
                    width="150"
                    label="目标">
                    <template slot-scope="scope">
                            <span v-if="scope.row.target === null">-</span>
                            <span v-else>{{scope.row.target | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="achievingRate"
                    width="100"
                    label="达成率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.target === null">-</span>
                        <span v-else>{{scope.row.achievingRate}}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="gap"
                    width="150"
                    label="缺口">
                    <template slot-scope="scope">
                        <span v-if="scope.row.target === null">-</span>
                        <span v-else-if="scope.row.gap > 0" style="color: red">{{scope.row.gap | thousands}}</span>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="环比" v-if="selectTh.indexOf('环比')>-1">
                <el-table-column
                    prop="lastMonthSale"
                    width="150"
                    label="上月">
                    <template slot-scope="scope">
                            <span v-if="scope.row.lastMonthSale === null">-</span>
                            <span v-else>{{scope.row.lastMonthSale | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="linkRelativeRatio"
                    width="100"
                    label="环比">
                    <template slot-scope="scope">
                        <span v-if="scope.row.linkRelativeRatio === null || scope.row.linkRelativeRatio === '-'">-</span>
                        <span v-else>{{scope.row.linkRelativeRatio}}%</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="同比" v-if="selectTh.indexOf('同比')>-1">
                <el-table-column
                    prop="yearOnYear"
                    width="150"
                    label="同期">
                    <template slot-scope="scope">
                            <span v-if="scope.row.yearOnYear === null">-</span>
                            <span v-else>{{scope.row.yearOnYear | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yearOnYearRatio"
                    width="100"
                    label="同比">
                    <template slot-scope="scope">
                        <span v-if="scope.row.yearOnYearRatio === null || scope.row.yearOnYearRatio === '-'">-</span>
                        <span v-else>{{scope.row.yearOnYearRatio}}%</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="年度累计" v-if="selectTh.indexOf('年度累计')>-1">
                <el-table-column
                    prop="yearSaleReal"
                    width="150"
                    label="实际">
                    <template slot-scope="scope">
                            <span v-if="scope.row.yearSaleReal === null">-</span>
                            <span v-else>{{scope.row.yearSaleReal | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yearTarget"
                    width="150"
                    label="目标">
                    <template slot-scope="scope">
                            <span v-if="scope.row.yearTarget === null">-</span>
                            <span v-else>{{scope.row.yearTarget | thousands}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yearAchievingRate"
                    width="100"
                    label="达成率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.yearAchievingRate === null || scope.row.yearAchievingRate === '-'">-</span>
                        <span v-else>{{scope.row.yearAchievingRate}}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yearGap"
                    width="150"
                    label="缺口">
                    <template slot-scope="scope">
                        <span v-if="scope.row.yearTarget === null || scope.row.yearTarget === '-'">-</span>
                        <span v-else-if="scope.row.yearGap > 0" style="color: red">{{scope.row.yearGap | thousands}}</span>
                        <span v-else>0</span>
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
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 30, 40, 50]"
                :total="paginationData.totalElements">
            </el-pagination>
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
                '平台公司',
                'mis编码',
                '所属分部',
                '城市',
                '上线时间',
                '签约规模',
                '总经理',
                '增量/存量',
                '分部排名',
                '全国排名',
                '达成',
                '环比',
                '同比',
                '年度累计'
            ],
            selectTh: ['平台公司', '总经理', '达成', '环比', '同比', '年度累计'], // 默认初始选中
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
        },
        incremental (row, column) {
            let incremental = '-'
            if (row.incremental === 0) {
                incremental = '存量'
            }
            if (row.incremental === 1) {
                incremental = '增量'
            }
            return incremental
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

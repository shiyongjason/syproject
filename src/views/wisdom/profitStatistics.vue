<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <!--  v-if="userInfo.deptType==deptType[1]||userInfo.deptType==deptType[0]" -->
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="选择分部">
                            <el-option v-for="item in branchList" :key="item.crmDeptCode" :label="item.deptname" :value="item.crmDeptCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <!-- <HAutocomplete ref="HAutocomplete" :selectArr="platList" v-if="platList" @back-event="backPlatcode" :remove-value='removeValue' :placeholder="'选择平台公司'"></HAutocomplete> -->
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">mis编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.misCode" placeholder="请输入mis编码" maxlength="15"></el-input>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryParams.startTime" :editable="false" :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endTime" :editable="false" :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">业务类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.businessType" clearable placeholder="全部">
                            <el-option v-for="item in bustype" :key="item.value" :label="item.name" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20">
                        查询
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <!-- table -->
                <hosJoyTable v-if="changeTable" ref="hosjoyTable" border stripe showPagination :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList">
                    <template slot="ceshi" slot-scope="scope">
                        测试slot-{{scope.data.row.ceshi}}
                    </template>

                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
// import { BUS_TYPE, DEPT_TYPE } from './store/const'
export default {
    name: 'profitStatistics',
    data: function () {
        return {
            pickerOptionsStart: '',
            pickerOptionsEnd: '',
            branchList: [],
            bustype: [],
            //

            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            multipleSelection: [],
            tableData: [],
            column: [
                {
                    prop: 'date',
                    label: '日期',
                    width: '100',
                    renderHeader: (h, scope) => {
                        return <span><i class="el-icon-time"></i>{scope.column.label}</span>
                    }
                },
                {
                    prop: 'name',
                    label: '姓名',
                    render: (h, scope) => {
                        return (
                            <div>
                                {
                                    scope.row._edit
                                        ? <el-input size='mini' value={scope.row[scope.column.property]} onInput={(val) => { scope.row[scope.column.property] = val }}></el-input>
                                        : <span>{scope.row[scope.column.property]}</span>
                                }
                            </div>
                        )
                    }
                },
                {
                    prop: 'num',
                    label: '数值',
                    displayAs: 'money'
                },
                {
                    label: '销售收入与成本/万',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandSell, 3) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'date',
                            label: '销售收入（含税）/万',
                            displayAs: 'YYYY-MM-DD HH:mm'
                        },
                        {
                            prop: 'name',
                            label: '销售成本（含税）/万',
                            render: (h, scope) => {
                                return <el-tag>{scope.row.name}</el-tag>
                            }
                        },
                        {
                            prop: 'address',
                            label: '销售利润率/万'
                        }
                    ]
                },
                {
                    label: '毛利',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandGrossProfit, 2) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'date',
                            label: '毛利额/万',
                            displayAs: 'YYYY-MM-DD HH:mm'
                        },
                        {
                            prop: 'name',
                            label: '毛利率',
                            render: (h, scope) => {
                                return <el-tag>{scope.row.name}</el-tag>
                            }
                        }
                    ]
                },
                {
                    label: '净利润',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandNetProfit, 3) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'date',
                            label: '净利润总额/万',
                            displayAs: 'YYYY-MM-DD HH:mm'
                        },
                        {
                            prop: 'name',
                            label: '净利润额/万',
                            render: (h, scope) => {
                                return <el-tag>{scope.row.name}</el-tag>
                            }
                        },
                        { prop: 'num', label: '达成率' }
                    ]
                },
                {
                    label: '净利润率',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandNetProfitRate, 1) }}></i></span>
                        )
                    },
                    children: [
                        { prop: 'num', label: '净利润率' }
                    ]
                }

            ],
            changeTable: true,
            // 销售收入与成本的展开
            expandSell: [
                { prop: 'name', label: '销售收入（无税）/万' },
                { prop: 'date', label: '销售成本（无税）/万', displayAs: 'YYYY年MM月DD日' }
            ],
            // 毛利的展开
            expandGrossProfit: [
                { prop: 'name', label: '上月/万' },
                { prop: 'name', label: '环比' },
                { prop: 'name', label: '同期' },
                { prop: 'name', label: '同比' }
            ],
            // 净利润的展开
            expandNetProfit: [
                {
                    prop: 'num',
                    label: '目标/万',
                    render: (h, scope) => {
                        return (
                            scope.row.num
                                ? scope.row._target
                                    ? <div>
                                        <el-input size='mini' value={scope.row[scope.column.property]} onInput={(val) => { scope.row[scope.column.property] = val }} onBlur={() => { this.handleSave(scope, '_target') }}></el-input>
                                    </div>
                                    : <span>{scope.row.num}<i class="el-icon-edit-outline ml10 pointer" onClick={() => { this.handleEdit(scope, '_target') }}></i></span>
                                : scope.row._target
                                    ? <el-input size='mini' value={scope.row[scope.column.property]} onInput={(val) => { scope.row[scope.column.property] = val }} onBlur={() => { this.handleSave(scope, '_target') }}></el-input>
                                    : <span>-<i class="el-icon-edit-outline ml10 pointer" onClick={() => { this.handleEdit(scope, '_target') }}></i></span>
                        )
                    }

                },
                { prop: 'num', label: '缺口/万' },
                { prop: 'num', label: '上月/万' },
                { prop: 'num', label: '环比' },
                { prop: 'num', label: '同期' },
                { prop: 'num', label: '同比' }
            ],
            expandNetProfitRate: [
                {
                    prop: 'num',
                    label: '目标/万',
                    render: (h, scope) => {
                        return (
                            scope.row.num
                                ? scope.row._rateTarget
                                    ? <div>
                                        <el-input size='mini' value={scope.row[scope.column.property]} onInput={(val) => { scope.row[scope.column.property] = val }} onBlur={() => { this.handleSave(scope, '_rateTarget') }}></el-input>
                                    </div>
                                    : <span>{scope.row.num}<i class="el-icon-edit-outline ml10 pointer" onClick={() => { this.handleEdit(scope, '_rateTarget') }}></i></span>
                                : scope.row._rateTarget
                                    ? <el-input size='mini' value={scope.row[scope.column.property]} onInput={(val) => { scope.row[scope.column.property] = val }} onBlur={() => { this.handleSave(scope, '_rateTarget') }}></el-input>
                                    : <span>-<i class="el-icon-edit-outline ml10 pointer" onClick={() => { this.handleEdit(scope, '_rateTarget') }}></i></span>
                        )
                    }
                },
                { prop: 'num', label: '缺口/万' },
                { prop: 'num', label: '上月/万' },
                { prop: 'num', label: '环比' },
                { prop: 'num', label: '同期' },
                { prop: 'num', label: '同比' }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    components: {
        hosJoyTable
    },
    methods: {
        handleExpand (scope, expandSellrr, num) {
            this.$set(this.column[scope.$index], '_expand', !this.column[scope.$index]._expand)
            if (this.column[scope.$index]._expand) {
                this.column[scope.$index].children = this.column[scope.$index].children.concat(expandSellrr)
            } else {
                this.column[scope.$index].children = this.column[scope.$index].children.slice(0, num)
                // TODO
                this.changeTable = false
                this.$nextTick(() => { this.changeTable = true })
            }
        },
        getList () {
            console.log(this.queryParams)
            this.tableData = [
                {
                    date: '2019-09-29T05:54:15.000+0000',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ceshi: 0,
                    num: 1230,
                    dicData: 0
                },
                {
                    date: '2016-05-02',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ceshi: 1,
                    num: 4560,
                    dicData: '1'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎3',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ceshi: 0,
                    num: null,
                    dicData: 1
                }
            ]
            this.page.total = 3
        },
        filterHandler (value, row, column) {
            const property = column['property']
            return row[property] === value
        },
        handleEdit (scope, key = '_edit') {
            console.log(scope)
            this.$set(scope.row, key, true)
        },
        handleSave (scope, key = '_edit') {
            this.$set(scope.row, key, false)
        }
    },
    async mounted () {
        this.getList()
        /* // 如果 当前人大区 -1  总部 0  分部 1 organizationType
        // console.log(this.userInfo.organizationType)
        let oldDeptCode = ''
        if (this.userInfo.deptType == 1) {
            oldDeptCode = this.userInfo.oldDeptCode
        }
        if (this.userInfo.deptType == 0 || this.userInfo.deptType == 1) await this.findBranchList(oldDeptCode)
        await this.getPaltbarnd()
        await this.getPaltSys()
        if (this.userInfo.deptType == 2) {
            this.queryParams.subsectionCode = this.userInfo.oldDeptCode
        }
        await this.getPlatCategory()
        // this.platList = await this.findPaltList(this.queryParams.subsectionCode) */
    }
}
</script>

<style lang="scss" scoped>
/deep/.pointer {cursor: pointer;margin-left: 10px;font-size: 14px;}
/deep/.redcolor{color: #fff;width: 16px;height: 16px;background: #FF7A45;line-height: 16px;border-radius: 2px; margin-top:5px;font-size: 12px;}
/deep/.redcancel{color: #fff;width: 16px;height: 16px;background: #9c9a99;line-height: 16px;border-radius: 2px;margin-top:5px;font-size: 12px;}
</style>

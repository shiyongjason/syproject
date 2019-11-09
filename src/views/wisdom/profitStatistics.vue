<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">mis编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.misCode" placeholder="请输入mis编码" maxlength="15" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete  :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                    </div>
                </div>
                <!--  v-if="userInfo.deptType==deptType[1]||userInfo.deptType==deptType[0]" -->
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="选择分部">
                            <el-option v-for="item in branchList" :key="item.subsectionName" :label="item.subsectionName" :value="item.subsectionCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" format="yyyy-MM" value-format="yyyy-MM" :clearable='false'></el-date-picker>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">公司上线状态：</div>
                    <div class="query-col-input">
                        <el-checkbox-group v-model="onLineStatusTemp">
                            <el-checkbox label="1" >上线</el-checkbox>
                            <el-checkbox label="2" >未上线</el-checkbox>
                            <el-checkbox label="3">淘汰</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="getList">
                        查询
                    </el-button>
                    <el-button v-if="hosAuthCheck(AUTH_PROFIT_STATISTICS_EXPORT)" type="primary" class="ml20" @click="onExport(queryParams)">
                        导出
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <!-- table -->
                <hosJoyTable v-if="changeTable" ref="hosjoyTable" border stripe showPagination :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { getProfitList, findPaltList, findBranchListNew } from './api/index.js'
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { interfaceUrl } from '@/api/config'
import { AUTH_PROFIT_STATISTICS_EXPORT } from '@/utils/auth_const'
export default {
    name: 'profitStatistics',
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            AUTH_PROFIT_STATISTICS_EXPORT,
            queryDate: '',
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            },
            platComList: [], // 平台公司
            branchList: [],
            bustype: [],
            platList: [],
            targetObj: { selectName: '', selectCode: '' },
            //
            onLineStatusTemp: ['1'],
            queryParams: {
                companyCode: '',
                regionCode: '',
                subsectionCode: '',
                startDate: '',
                endDate: '',
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
                    prop: 'misCode',
                    label: 'MIS编码',
                    width: '100',
                    fixed: true
                },
                { prop: 'companyShortName', label: '平台公司名', fixed: true, width: '120' },
                { prop: 'subsectionName', label: '分部', fixed: true },
                {
                    label: '销售收入与成本/万',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandSell, 1) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'salesIncomeIncludingTax',
                            label: '销售收入（含税）/万',
                            width: '150',
                            displayAs: 'money'
                        }
                    ]
                },
                {
                    label: '毛利',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class='el-icon-question pointer' onClick={() => { this.onShowMessage() }}></i><i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandGrossProfit, 2) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'grossProfit',
                            label: '毛利额/万',
                            displayAs: 'money'
                        },
                        {
                            prop: 'grossProfitMargin',
                            label: '毛利率',
                            render: (h, scope) => {
                                return <span>{scope.row.grossProfitMargin ? `${scope.row.grossProfitMargin}%` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '费用及税费',
                    children: [
                        { prop: 'expense', label: '费用/万', displayAs: 'money' },
                        {
                            prop: 'expenseRate',
                            label: '费率',
                            render: (h, scope) => {
                                return <span>{scope.row.expenseRate ? `${scope.row.expenseRate}%` : '-'}</span>
                            }
                        },
                        { prop: 'incomeTax', label: '所得税/万', displayAs: 'money' }

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
                        { prop: 'totalProfit', label: '利润总额/万', displayAs: 'money' },
                        { prop: 'netProfit', label: '净利润额/万', displayAs: 'money' },
                        {
                            prop: 'netProfitAchievementRate',
                            label: '达成率',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitAchievementRate ? `${scope.row.netProfitAchievementRate}%` : '-'}</span>
                            } }
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
                        {
                            prop: 'netProfitRate',
                            label: '净利润率',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                            }
                        }
                    ]
                }

            ],
            changeTable: true,
            // 销售收入与成本的展开
            expandSell: [
                { prop: 'incomeSale', label: '销售收入（无税）/万', width: '140', displayAs: 'money' },
                { prop: 'saleCost', label: '销售成本（无税）/万', width: '140', displayAs: 'money' }
            ],
            // 毛利的展开
            expandGrossProfit: [
                { prop: 'grossProfitLastMonth', label: '上月/万' },
                {
                    prop: 'grossProfitLinkRelativeRatio',
                    label: '环比',
                    render: (h, scope) => {
                        return <span>{scope.row.grossProfitLinkRelativeRatio ? `${scope.row.grossProfitLinkRelativeRatio}%` : '-'}</span>
                    }
                },
                { prop: 'grossProfitLastYear', label: '同期/万' },
                { prop: 'grossProfitYearOnYear',
                    label: '同比',
                    render: (h, scope) => {
                        return <span>{scope.row.grossProfitYearOnYear ? `${scope.row.grossProfitYearOnYear}%` : '-'}</span>
                    }
                }
            ],
            // 净利润的展开
            expandNetProfit: [
                // 这期不做
                /* {
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

                }, */
                { prop: 'netProfitTarget', label: '目标/万', displayAs: 'money' },
                { prop: 'netProfitGap', label: '缺口/万', displayAs: 'money' },
                { prop: 'netProfitLastMonth', label: '上月/万', displayAs: 'money' },
                {
                    prop: 'netProfitLinkRelativeRatio',
                    label: '环比',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitLinkRelativeRatio ? `${scope.row.netProfitLinkRelativeRatio}%` : '-'}</span>
                    }
                },
                { prop: 'netProfitLastYear', label: '同期', displayAs: 'money' },
                { prop: 'netProfitYearOnYear',
                    label: '同比',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitYearOnYear ? `${scope.row.netProfitYearOnYear}%` : '-'}</span>
                    }
                }
            ],
            expandNetProfitRate: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '上月',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLinkRelativeRatio',
                    label: '环比',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLinkRelativeRatio ? `${scope.row.netProfitRateLinkRelativeRatio}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastYear',
                    label: '同期',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastYear ? `${scope.row.netProfitRateLastYear}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateYearOnYear',
                    label: '同比',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateYearOnYear ? `${scope.row.netProfitRateYearOnYear}%` : '-'}</span>
                    }
                }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.endDate)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.startDate)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        backPlat (val) {
            // 平台公司名称点击后事件
            if (val && val.value && val.value.companyShortName) {
                this.queryParams.companyCode = val.value.companyCode
            } else {
                this.queryParams.companyCode = ''
            }
        },
        async findPaltList () {
            // 平台公司名称
            const { data } = await findPaltList()
            for (let i of data.data.pageContent) {
                i.value = i.companyShortName
                i.selectCode = i.companyCode
            }
            this.platComList = data.data.pageContent
        },
        async findBranchListNew () {
            // 平台分部
            const { data } = await findBranchListNew()
            this.branchList = data.data
            this.branchList.unshift({ subsectionCode: '', subsectionName: '全部', id: 0 })
        },
        toPercent (point) {
            if (!point) { return '-' }
            let str = Number(point * 100).toFixed(2)
            str += '%'
            return str
        },
        onShowMessage () {
            this.$alert('毛利栏目下的上月、环比、同期、同比均为对毛利额的计算', '毛利', {
                confirmButtonText: '我知道了',
                center: true,
                callback: action => {} })
        },
        handleExpand (scope, expandSellrr, num) {
            this.$set(this.column[scope.$index], '_expand', !this.column[scope.$index]._expand)
            if (this.column[scope.$index]._expand) {
                this.column[scope.$index].children = this.column[scope.$index].children.concat(expandSellrr)
            } else {
                this.column[scope.$index].children = this.column[scope.$index].children.slice(0, num)
                this.changeTable = false
                this.$nextTick(() => { this.changeTable = true })
            }
        },
        async getList () {
            if (this.userInfo.deptType == null) return false
            this.queryParams.startDate = `${this.queryDate[0]}-01`
            this.queryParams.endDate = `${this.queryDate[1]}-01`
            // 后端只要这个格式。
            this.$set(this.queryParams, 'onLineStatus', this.onLineStatusTemp.join(','))
            let query = { ...this.queryParams }
            const { data } = await getProfitList(query)
            this.tableData = data.data.list || []
            this.page.total = data.data.total
        },
        filterHandler (value, row, column) {
            const property = column['property']
            return row[property] === value
        },
        handleEdit (scope, key = '_edit') {
            this.$set(scope.row, key, true)
        },
        handleSave (scope, key = '_edit') {
            this.$set(scope.row, key, false)
        },
        getUrlBase64 (url, fileName, ext = '') {
            let _this = this
            var canvas = document.createElement('canvas') // 创建canvas DOM元素
            var ctx = canvas.getContext('2d')
            var img = new Image()
            img.setAttribute('crossOrigin', 'anonymous')
            img.src = url + '?time=' + new Date().valueOf()
            img.onload = function () {
                canvas.height = img.height // 指定画板的高度,自定义
                canvas.width = img.width // 指定画板的宽度，自定义
                ctx.drawImage(img, 0, 0) // 参数可自定义
                var dataURL = canvas.toDataURL('image/' + ext) // 传递的自定义的参数
                canvas = null
                var downDom = document.createElement('a') // 创建DOM元素
                downDom.setAttribute('href', dataURL)
                downDom.setAttribute('download', fileName)
                console.log(downDom)
                _this.$nextTick(() => {
                    downDom.click()
                })
            }
        },
        async onExport (params) {
            location.href = interfaceUrl + `rms/platform/profit-statistics/export?regionCode=${this.queryParams.regionCode}&subsectionCode=${this.queryParams.subsectionCode}&startDate=${this.queryParams.startDate}&endDate=${this.queryParams.endDate}&startDate=${this.queryParams.startDate}&pageNumber=${this.queryParams.pageNumber}&pageSize=${this.queryParams.pageSize}&onLineStatus=${this.queryParams.onLineStatus}&companyCode=${this.queryParams.companyCode}`
        }
    },
    async mounted () {
        let start = moment().startOf('month').format('YYYY-MM')
        let end = moment().endOf('days').format('YYYY-MM')
        this.queryDate = [start, end]
        this.findPaltList()
        this.findBranchListNew()
        // 0总部 1大区 2分部
        if (this.userInfo.deptType === 1) {
            this.queryParams.regionCode = 1
        }
        if (this.userInfo.deptType === 2) {
            this.queryParams.subsectionCode = 2
        }
        if (this.userInfo.deptType === 0) {
            this.queryParams.regionCode = ''
            this.queryParams.subsectionCode = ''
        }
        this.getList()
    }
}
</script>

<style lang="scss" scoped>
/deep/.pointer {cursor: pointer;margin-left: 10px;font-size: 14px;}
/deep/.redcolor{color: #fff;width: 16px;height: 16px;background: #FF7A45;line-height: 16px;border-radius: 2px; margin-top:5px;font-size: 12px;}
/deep/.redcancel{color: #fff;width: 16px;height: 16px;background: #9c9a99;line-height: 16px;border-radius: 2px;margin-top:5px;font-size: 12px;}
</style>

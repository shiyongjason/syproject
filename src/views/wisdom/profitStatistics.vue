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
                <div class="query-cont-col" v-if="branch">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryParams.startDate" :clearable=false :editable=false :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始月份">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endDate" :editable=false :clearable=false :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束月份">
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">公司上线状态：</div>
                    <div class="query-col-input">
                        <el-checkbox-group v-model="onLineStatusTemp">
                            <el-checkbox label="1">上线</el-checkbox>
                            <el-checkbox label="2">未上线</el-checkbox>
                            <el-checkbox label="3">淘汰</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="getList(1)">
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
                <hosJoyTable v-if="changeTable" ref="hosjoyTable" border stripe showPagination :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { getProfitList, findPaltList, total } from './api/index.js'
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { interfaceUrl } from '@/api/config'
import { departmentAuth } from '@/mixins/userAuth'
import { AUTH_PROFIT_STATISTICS_EXPORT } from '@/utils/auth_const'
export default {
    name: 'profitStatistics',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            AUTH_PROFIT_STATISTICS_EXPORT,
            selectAuth: {
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
            onLineStatusTemp: ['1'],
            queryParams: {
                misCode: '',
                companyCode: '',
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
            total: {},
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
                            <span class='posr'>{scope.column.label}<i class='el-icon-question pointer' onClick={() => { this.onShowMessage() }}></i><i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandGrossProfit, 2) }}></i></span>
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
                                return <span>{scope.row.grossProfitMargin == 0 ? 0 : scope.row.grossProfitMargin ? `${scope.row.grossProfitMargin}%` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '费用及税费',
                    children: [
                        { prop: 'expense', label: '费用/万' },
                        {
                            prop: 'expenseRate',
                            label: '费率',
                            render: (h, scope) => {
                                return <span>{scope.row.expenseRate == 0 ? 0 : scope.row.expenseRate ? `${scope.row.expenseRate}%` : '-'}</span>
                            }
                        },
                        { prop: 'incomeTax', label: '所得税/万' }

                    ]
                },
                {
                    label: '净利润',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandNetProfit, 4) }}></i></span>
                        )
                    },
                    children: [
                        { prop: 'totalProfit', label: '利润总额/万' },
                        { prop: 'netProfit', label: '净利润额/万' },
                        {
                            prop: 'netProfitAchievementRate',
                            label: '达成率',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitAchievementRate == 0 ? 0 : scope.row.netProfitAchievementRate ? `${scope.row.netProfitAchievementRate}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'returnOnSales',
                            label: '销售利润率/万',
                            render: (h, scope) => {
                                return <span>{scope.row.returnOnSales == 0 ? 0 : scope.row.returnOnSales ? `${scope.row.returnOnSales}%` : '-'}</span>
                            }
                        }
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
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                            }
                        }
                    ]
                }

            ],
            changeTable: true,
            // 销售收入与成本的展开 , displayAs: 'money'
            expandSell: [
                { prop: 'incomeSale', label: '销售收入（无税）/万', width: '140' },
                { prop: 'saleCost', label: '销售成本（无税）/万', width: '140' }
            ],
            // 毛利的展开
            expandGrossProfit: [
                { prop: 'grossProfitLastMonth', label: '上月/万' },
                {
                    prop: 'grossProfitLinkRelativeRatio',
                    label: '环比',
                    render: (h, scope) => {
                        return <span>{scope.row.grossProfitLinkRelativeRatio == 0 ? 0 : scope.row.grossProfitLinkRelativeRatio ? `${scope.row.grossProfitLinkRelativeRatio}%` : '-'}</span>
                    }
                },
                { prop: 'grossProfitLastYear', label: '同期/万' },
                {
                    prop: 'grossProfitYearOnYear',
                    label: '同比',
                    render: (h, scope) => {
                        return <span>{scope.row.grossProfitYearOnYear == 0 ? 0 : scope.row.grossProfitYearOnYear ? `${scope.row.grossProfitYearOnYear}%` : '-'}</span>
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
                { prop: 'netProfitTarget', label: '目标/万' },
                { prop: 'netProfitGap', label: '缺口/万' },
                { prop: 'netProfitLastMonth', label: '上月/万' },
                {
                    prop: 'netProfitLinkRelativeRatio',
                    label: '环比',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitLinkRelativeRatio == 0 ? 0 : scope.row.netProfitLinkRelativeRatio ? `${scope.row.netProfitLinkRelativeRatio}%` : '-'}</span>
                    }
                },
                { prop: 'netProfitLastYear', label: '同期' },
                {
                    prop: 'netProfitYearOnYear',
                    label: '同比',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitYearOnYear == 0 ? 0 : scope.row.netProfitYearOnYear ? `${scope.row.netProfitYearOnYear}%` : '-'}</span>
                    }
                }
            ],
            expandNetProfitRate: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '上月',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLinkRelativeRatio',
                    label: '环比',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLinkRelativeRatio == 0 ? 0 : scope.row.netProfitRateLinkRelativeRatio ? `${scope.row.netProfitRateLinkRelativeRatio}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastYear',
                    label: '同期',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastYear == 0 ? 0 : scope.row.netProfitRateLastYear ? `${scope.row.netProfitRateLastYear}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateYearOnYear',
                    label: '同比',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateYearOnYear == 0 ? 0 : scope.row.netProfitRateYearOnYear ? `${scope.row.netProfitRateYearOnYear}%` : '-'}</span>
                    }
                }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            branchList: state => state.branchList,
            platformData: state => state.platformData
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
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'F') {
                this.queryParams.misCode = ''
                this.selectAuth.platformObj = { ...obj }
            }
        },
        async backPlat (val, dis) {
            if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'P') {
                this.queryParams.companyCode = val.value.companyCode ? val.value.companyCode : ''
            }
        },
        async getSubsectionCode (val) {
            this.platComList = []
            const { data } = await findPaltList({ subsectionCode: val }) // 根据大区获取平台公司
            for (let i of data.data.pageContent) {
                i.value = i.companyShortName
                i.selectCode = i.companyCode
            }
            this.platComList = data.data.pageContent
            this.platComList.unshift({ selectCode: '', value: '全部', id: 0 })
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
                callback: action => { }
            })
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
        async onGetList (query) {
            const { data } = await getProfitList(query)
            this.tableData = data.data.list || []
            this.page.total = data.data.total
        },
        async onGetTotal (query) {
            const totalData = await total(query)
            this.total = totalData.data.data
        },
        async getList (val) {
            this.$set(this.queryParams, 'onLineStatus', this.onLineStatusTemp.join(','))
            if (val == 1) {
                this.queryParams.pageNumber = 1
            }
            let query = { ...this.queryParams }
            let { pageNumber, pageSize, ...rest } = query
            await Promise.all([this.onGetList(query), this.onGetTotal(rest)])
            // 合计
            let obj = Object.assign({}, this.total, { misCode: '合计' })
            this.tableData.unshift(obj)
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
            location.href = interfaceUrl + `rms/platform/profit-statistics/export?subsectionCode=${this.queryParams.subsectionCode}&startDate=${this.queryParams.startDate}&endDate=${this.queryParams.endDate}&startDate=${this.queryParams.startDate}&onLineStatus=${this.queryParams.onLineStatus}&companyCode=${this.queryParams.companyCode}&misCode=${this.queryParams.misCode}`
        }
    },
    async mounted () {
        this.queryParams.startDate = moment().startOf('month').format('YYYY-MM-DD')
        this.queryParams.endDate = moment().endOf('days').format('YYYY-MM-DD')
        this.getList()
        await this.newBossAuth(['F', 'P'])
    }
}
</script>

<style lang="scss" scoped>
/deep/.pointer {
    cursor: pointer;
    margin-left: 10px;
    font-size: 14px;
}
/deep/.redcolor {
    color: #fff;
    width: 16px;
    height: 16px;
    background: #ff7a45;
    line-height: 16px;
    border-radius: 2px;
    margin-top: 5px;
    font-size: 12px;
}
/deep/.redcancel {
    color: #fff;
    width: 16px;
    height: 16px;
    background: #9c9a99;
    line-height: 16px;
    border-radius: 2px;
    margin-top: 5px;
    font-size: 12px;
}
/deep/.posr {
    position: relative;
}
/deep/.posr .el-icon-question {
    position: absolute;
    top: -3px;
}
/deep/.posr .el-icon-plus {
    position: absolute;
    left: 50px;
    top: 2px;
}
/deep/.posr .el-icon-minus {
    position: absolute;
    left: 50px;
    top: 2px;
}
</style>

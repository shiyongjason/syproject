<template>
    <div class="smart-equip">
        <div class="echart-tab">
        </div>
        <div class="smart-time">
            <div>
                <h3>总运行时长: {{totalTime ? totalTime : '0'}} 小时</h3>
            </div>
            <div class="echart-time">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="smartparams.startDate" :picker-options="pickerOptionsStart">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="smartparams.endDate" :picker-options="pickerOptionsEnd">>
                </el-date-picker>
                <el-button type="primary" class="ml20" @click="onFindRuntimeR()">
                    查询
                </el-button>
            </div>
        </div>
        <div class="tab-container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="所有设备" name="first" class="echart-wrap">
                    <div class="chart-flex2" id="firstChart" style="height:500px"></div>
                    <div class="chart-flex1" id="secondChart" style="height:500px"></div>
                </el-tab-pane>
                <el-tab-pane label="中央空调控制器（物联）" name="second">
                    <Chart :lineOption="tempLineOption" :barOption="tempBarOption"></Chart>
                </el-tab-pane>
                <el-tab-pane label="中央空调控制器（零颗米）" name="third">
                </el-tab-pane>
                <el-tab-pane label="地暖控制器" name="fourth">
                </el-tab-pane>
                <el-tab-pane label="智能温控阀" name="fifth">
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-body-cont query-cont">
            <h3 class="home-detail-title">家庭设备明细</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">手机号：</div>
                    <div class="query-col-input">
                        <el-input v-model="homeParams.phone" placeholder="输入手机号" maxlength="11"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">创建时间：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" :editable="false" :clearable="false"  v-model="homeParams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerHomeDetailStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" :editable="false" :clearable="false"  v-model="homeParams.endDate" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerHomeDetailEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">设备种类：</div>
                    <div class="query-col-input">
                        <el-select v-model="homeParams.type" clearable>
                            <el-option :label="item.name" :value="item.type" v-for="item in cloudHomeDetailDict" :key="item.type"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" @click="findCloudHomeDetailList(homeParams)">
                        查询
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudHomeDetailList" :pagination="cloudHomeDetailPagination"
                        @onSortChange="onSortChange" isShowIndex @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
            </basicTable>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import Chart from './chart'
export default {
    props: ['totalTime'],
    components: {
        Chart
    },
    data () {
        return {
            activeName: 'first',
            tabindex: 0,
            tableLabel: [
                { label: '管理员手机号', prop: 'phone' },
                { label: '家庭名称', prop: 'homeName' },
                { label: '设备种类', prop: 'typeName' },
                { label: '设备数量', prop: 'count' },
                { label: '总运行时长（小时）', prop: 'totalRunTime' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' }
            ],
            smartparams: {
                startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
                moduleName: 'smartHost'
            },
            smartList: [{ key: 'smartHost', name: '智能主机' }, { key: 'smartCont', name: '智能控制器' }, { key: 'sensor', name: '传感器' }, { key: 'smartAppliance', name: '智能家电' },
                { key: 'switchPanel', name: '开关面板' }],
            smartData: {},
            homeParams: {
                pageSize: 10,
                pageNumber: 1,
                phone: '',
                startDate: '',
                endDate: ''
            },
            tempLineOption: {},
            tempBarOption: {}
        }
    },
    computed: {
        ...mapGetters({
            cloudRuntimeReport: 'cloudRuntimeReport',
            cloudHomeDetailList: 'cloudHomeDetailList',
            cloudHomeDetailPagination: 'cloudHomeDetailPagination',
            cloudHomeDetailDict: 'cloudHomeDetailDict'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.smartparams.endDate
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.smartparams.startDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerHomeDetailStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.homeParams.endDate
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerHomeDetailEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.homeParams.startDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        tableLabelSwitch () {
            return ''
        },
        tablePaginationList () {
            return ''
        },
        tablePaginationSwitch () {
            return ''
        }
    },
    mounted () {
        this.onFindRuntimeR()
        this.findCloudHomeDetailList(this.homeParams)
        this.findCloudHomeDetailSearchDict()
    },
    methods: {
        ...mapActions({
            findRuntimeReport: 'findRuntimeReport',
            findCloudHomeDetailList: 'findCloudHomeDetailList',
            findCloudHomeDetailSearchDict: 'findCloudHomeDetailSearchDict'
        }),
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.findCloudHomeDetailList(this.homeParams)
            }
        },
        onCurrentChange (val) {
            this.homeParams.pageNumber = val.pageNumber
            this.findCloudHomeDetailList(this.homeParams)
        },
        onSizeChange (val) {
            this.homeParams.pageSize = val
            this.findCloudHomeDetailList(this.homeParams)
        },
        onTabs (val, name) {
            this.tabindex = val
            this.smartparams.moduleName = name
            this.onFindRuntimeR(this.smartparams)
        },
        async onFindRuntimeR () {
            await this.findRuntimeReport(this.smartparams)
            this.smartData = this.cloudRuntimeReport
            this.drawLine(this.smartData)
            this.drawbar(this.smartData)
        },
        drawLine (data) {
            // 绘制图表
            var charts = {
                unit: '单位',
                names: [],
                lineX: [],
                value: []
            }
            data && data.forEach((value, index) => {
                charts.names.push(value.deviceName)
                charts.value.push([])
                value.deviceStatBOs.forEach((value1) => {
                    charts.value[index].push(value1.value)
                    if (index === 0) charts.lineX.push(value1.dateTime)
                })
            })
            var color = ['rgba(23, 255, 243', 'rgba(255,100,97', 'rgba(71,100,197', 'rgba(255,158,37', 'rgba(255,135,97']
            var lineY = []
            // 根据数据条数 渲染y轴数据
            for (var i = 0; i < charts.names.length; i++) {
                var x = i
                if (x > color.length - 1) {
                    x = color.length - 1
                }
                var dataL = {
                    name: charts.names[i],
                    type: 'line',
                    color: color[x] + ')',
                    smooth: false,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: color[x] + ', 0.3)'
                            }, {
                                offset: 0.8,
                                color: color[x] + ', 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    symbol: 'circle',
                    symbolSize: 8,
                    yAxisIndex: 0,
                    data: charts.value[i]
                }
                lineY.push(dataL)
            }
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: charts.names,
                    textStyle: {
                        fontSize: 12,
                        color: '#57617B'
                    }
                    // right: '4%'
                },
                grid: {
                    top: '10%',
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: charts.lineX,
                    axisLabel: {
                        formatter: function (params) {
                            return params.split(' ')[0]
                        }
                    }
                },
                yAxis: {
                    name: charts.unit,
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: lineY
            }
            this.tempLineOption = option
            this.drawChart(option, 'firstChart')
        },
        drawbar (data) {
            var charts = {
                lineY: [],
                lineX: []
            }
            data && data.forEach((value, index) => {
                charts.lineY.push(value.deviceName)
                charts.lineX.push(value.totalTime)
            })
            var option = {
                color: ['#1c9a4c'],
                grid: {
                    left: '3%',
                    right: '3%',
                    top: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    formatter: '{b} ({c})'
                },
                yAxis: {
                    data: charts.lineY,
                    axisTick: {
                        show: false
                    }
                },
                xAxis: [{
                    axisTick: {
                        show: false
                    },
                    type: 'value',
                    // max: 100,
                    splitNumber: 5,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
                series: [{
                    name: '销量',
                    type: 'bar',
                    barWidth: '55%',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{c}',
                            textStyle: {
                                color: 'black'
                            }
                        }
                    },
                    data: charts.lineX
                }]
            }
            this.tempBarOption = option
            this.drawChart(option, 'secondChart')
        },
        handleClick () {
            console.log(1)
        },
        drawChart (option, id) {
            const chartDom = document.getElementById(id)
            echarts.init(chartDom).setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
.echart-wrap {
    display: flex;
    padding: 20px 10px;
    min-height: 500px;
    .chart-flex2 {
        flex: 2;
    }
    .chart-flex1 {
        flex: 1;
    }
}
.smart-time {
    display: flex;
    padding: 30px 12px;
    div {
        display: flex;
        flex: 1;
        align-items: center;
    }
}
.home-detail-title {
    padding-bottom: 20px;
}
/deep/ .el-tabs__item.is-active {
    color: #333;
    background: transparent;
}

/deep/ .el-tabs__header {
    margin: 0
}
</style>

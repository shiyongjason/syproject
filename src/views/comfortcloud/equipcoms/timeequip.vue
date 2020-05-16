<template>
    <div class="smart-equip">
        <div class="echart-tab">
        </div>
        <div class="smart-time">
            <div>
                <h3>总运行时长: {{totalTime ? totalTime : '0'}} 小时</h3>
            </div>
            <div class="echart-time">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="smartparams.startDate"
                                :picker-options="pickerOptionsStart" :clearable="false" :editable="false">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="smartparams.endDate"
                                :picker-options="pickerOptionsEnd" :clearable="false" :editable="false">
                </el-date-picker>
                <el-button type="primary" class="ml20" @click="onFindRuntimeR(smartparams.runTimeModuleName + 'Line',
                smartparams.runTimeModuleName + 'Bar')">
                    查询
                </el-button>
            </div>
        </div>
        <div class="tab-container">
            <el-tabs v-model="homeParams.runTimeModuleName" @tab-click="handleClick">
                <el-tab-pane label="所有设备" name="all" class="echart-wrap">
                    <div class="chart-flex2" id="allLine" style="height:500px"></div>
                    <div class="chart-flex1" id="allBar" style="height:500px"></div>
                </el-tab-pane>
                <el-tab-pane label="中央空调控制器WC-03" name="Op" class="echart-wrap">
                    <div class="chart-flex2" id="OpLine" style="height:500px"></div>
                    <div class="chart-flex1" id="OpBar" style="height:500px"></div>
                </el-tab-pane>
                <el-tab-pane label="中央空调控制器LC-305" name="Co" class="echart-wrap">
                    <div class="chart-flex2" id="CoLine" style="height:500px"></div>
                    <div class="chart-flex1" id="CoBar" style="height:500px"></div>
                </el-tab-pane>
                <el-tab-pane label="地暖智控面板WH-04" name="Ap" class="echart-wrap">
                    <div class="chart-flex2" id="ApLine" style="height:500px"></div>
                    <div class="chart-flex1" id="ApBar" style="height:500px"></div>
                </el-tab-pane>
                <el-tab-pane label="智能温控阀LR-307" name="Rt" class="echart-wrap">
                    <div class="chart-flex2" id="RtLine" style="height:500px"></div>
                    <div class="chart-flex1" id="RtBar" style="height:500px"></div>
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
                    <div class="query-col-title">注册时间：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" :editable="false" :clearable="false" v-model="homeParams.startDate"
                                        value-format="yyyy-MM-dd" placeholder="开始日期"
                                        :picker-options="pickerHomeDetailStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" :editable="false" :clearable="false" v-model="homeParams.endDate"
                                        value-format="yyyy-MM-dd" placeholder="结束日期"
                                        :picker-options="pickerHomeDetailEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col" v-if="homeParams.runTimeModuleName === 'all'">
                    <div class="query-col-title">设备种类：</div>
                    <div class="query-col-input">
                        <el-select v-model="homeParams.type" clearable>
                            <el-option :label="item.name" :value="item.type" v-for="item in cloudHomeDetailDict"
                                       :key="item.type"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" @click="onQuery">
                        查询
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
<!--            @onSortChange="onSortChange"-->
            <basicTable :tableLabel="tableLabelSwitch" :tableData="tablePaginationListSwitch"
                        :pagination="cloudHomeDetailPagination"
                        isShowIndex @onCurrentChange='onCurrentChange'
                        @onSizeChange='onSizeChange'>
            </basicTable>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import * as Const from './const'

export default {
    props: ['totalTime'],
    data () {
        return {
            activeName: 'first',
            tabindex: 0,
            smartparams: {
                startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
                runTimeModuleName: 'all'
            },
            smartList: [{ key: 'smartHost', name: '智能主机' }, { key: 'smartCont', name: '智能控制器' }, {
                key: 'sensor',
                name: '传感器'
            }, { key: 'smartAppliance', name: '智能家电' },
            { key: 'switchPanel', name: '开关面板' }],
            smartData: {},
            homeParams: {
                pageSize: 10,
                pageNumber: 1,
                phone: '',
                startDate: '',
                endDate: '',
                type: '',
                runTimeModuleName: 'all'
            }
        }
    },
    computed: {
        ...mapGetters({
            cloudRuntimeReport: 'cloudRuntimeReport',
            cloudHomeDetailList: 'cloudHomeDetailList',
            cloudHomeDetailPagination: 'cloudHomeDetailPagination',
            cloudHomeOpDetailList: 'cloudHomeOpDetailList',
            cloudHomeCoDetailList: 'cloudHomeCoDetailList',
            cloudHomeApDetailList: 'cloudHomeApDetailList',
            cloudHomeRtDetailList: 'cloudHomeRtDetailList',
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
            let temp
            switch (this.homeParams.runTimeModuleName) {
                case 'all':
                    temp = Const.totalTableLabel
                    break
                case 'Op':
                    temp = Const.wuLianTableLabel
                    break
                case 'Co':
                    temp = Const.zeroKeMiTableLabel
                    break
                case 'Ap':
                    temp = Const.floorTableLabel
                    break
                case 'Rt':
                    temp = Const.smartTableLabel
                    break
            }
            return temp
        },
        tablePaginationListSwitch () {
            let temp = []
            switch (this.homeParams.runTimeModuleName) {
                case 'all':
                    temp = this.cloudHomeDetailList
                    break
                case 'Op':
                    temp = this.cloudHomeOpDetailList
                    break
                case 'Co':
                    temp = this.cloudHomeCoDetailList
                    break
                case 'Ap':
                    temp = this.cloudHomeApDetailList
                    break
                case 'Rt':
                    temp = this.cloudHomeRtDetailList
                    break
            }
            return temp
        }
    },
    mounted () {
        this.onFindRuntimeR('allLine', 'allBar')
        this.findCloudHomeDetailList(this.homeParams)
        this.findCloudHomeDetailSearchDict()
    },
    methods: {
        ...mapActions({
            findRuntimeReport: 'findRuntimeReport',
            findCloudHomeDetailList: 'findCloudHomeDetailList',
            findCloudHomeOpDetailList: 'findCloudHomeOpDetailList',
            findCloudHomeCoDetailList: 'findCloudHomeCoDetailList',
            findCloudHomeApDetailList: 'findCloudHomeApDetailList',
            findCloudHomeRtDetailList: 'findCloudHomeRtDetailList',
            findCloudHomeDetailSearchDict: 'findCloudHomeDetailSearchDict'
        }),
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.findCloudHomeDetailList(this.homeParams)
            }
        },
        onQuery () {
            switch (this.homeParams.runTimeModuleName) {
                case 'all':
                    this.findCloudHomeDetailList(this.homeParams)
                    break
                case 'Op':
                    this.findCloudHomeOpDetailList(this.homeParams)
                    break
                case 'Co':
                    this.findCloudHomeCoDetailList(this.homeParams)
                    break
                case 'Ap':
                    this.findCloudHomeApDetailList(this.homeParams)
                    break
                case 'Rt':
                    this.findCloudHomeRtDetailList(this.homeParams)
                    break
            }
        },
        onCurrentChange (val) {
            this.homeParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.homeParams.pageSize = val
            this.onQuery()
        },
        async onFindRuntimeR (line, bar) {
            await this.findRuntimeReport(this.smartparams)
            this.smartData = this.cloudRuntimeReport
            this.drawLine(this.smartData, line)
            this.drawbar(this.smartData, bar)
            this.$emit('queryTotalTime', {
                startDate: this.smartparams.startDate,
                endDate: this.smartparams.endDate,
                type: this.homeParams.runTimeModuleName === 'all' ? '' : this.homeParams.runTimeModuleName
            })
        },
        drawLine (data, id) {
            // 绘制图表
            var charts = {
                unit: '单位/小时',
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
            var color = ['rgba(23, 255, 243', 'rgba(255,100,97', 'rgba(71,100,197', 'rgba(255,158,37', 'rgba(255,35,67', 'rgba(25,135,67']
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
                    right: '8%',
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
            this.drawChart(option, id)
        },
        drawbar (data, id) {
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
                    right: '13%',
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
                xAxis: {
                    name: '单位/小时',
                    type: 'value',
                    // max: 100,
                    splitNumber: 5,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
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
            this.drawChart(option, id)
        },
        handleClick () {
            this.smartparams.runTimeModuleName = this.homeParams.runTimeModuleName
            this.onFindRuntimeR(this.smartparams.runTimeModuleName + 'Line',
                this.smartparams.runTimeModuleName + 'Bar')
            Object.assign(this.homeParams, {
                pageSize: 10,
                pageNumber: 1,
                phone: '',
                type: '',
                startDate: '',
                endDate: ''
            })
            switch (this.homeParams.runTimeModuleName) {
                case 'all':
                    this.findCloudHomeDetailList(this.homeParams)
                    break
                case 'Op':
                    this.findCloudHomeOpDetailList(this.homeParams)
                    break
                case 'Co':
                    this.findCloudHomeCoDetailList(this.homeParams)
                    break
                case 'Ap':
                    this.findCloudHomeApDetailList(this.homeParams)
                    break
                case 'Rt':
                    this.findCloudHomeRtDetailList(this.homeParams)
                    break
            }
            this.$emit('queryTotalTime', {
                startDate: this.smartparams.startDate,
                endDate: this.smartparams.endDate,
                type: this.homeParams.runTimeModuleName === 'all' ? '' : this.homeParams.runTimeModuleName
            })
        },
        drawChart (option, id) {
            const chartDom = document.getElementById(id)
            echarts.init(chartDom).setOption(option, true)
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
            flex: 1.8;
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

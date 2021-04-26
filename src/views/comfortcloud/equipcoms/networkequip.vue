<template>
    <div class="smart-equip">
        <div class="echart-tab">
        </div>
        <div class="smart-time">
            <div>
                <h3>总配网失败率: {{totalNetworkCount | percentageShow}} </h3>
            </div>
            <div class="echart-time">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="smartparams.startDate"
                                :picker-options="pickerOptionsStart" :clearable="false" :editable="false">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="smartparams.endDate"
                                :picker-options="pickerOptionsEnd" :clearable="false" :editable="false">
                </el-date-picker>
                <el-button type="primary" class="ml20" @click="onFindNetworkStat(smartparams.modeType + 'Line',
                smartparams.modeType + 'Bar')">
                    查询
                </el-button>
            </div>
        </div>
        <div class="tab-container">
            <el-tabs v-model="homeParams.modeType" @tab-click="handleClick">
                <el-tab-pane :key="item.name" v-for="item in cloudNetworkModeTypeList" :label="item.name" :name="item.type" class="echart-wrap">
                    <div class="chart-flex2" :id="item.type + 'Line'" style="height:500px"></div>
                    <div v-if="item.type === 'all'" class="chart-flex1" :id="item.type + 'Bar'" style="height:500px"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-body-cont query-cont">
            <h3 class="home-detail-title">配网失败明细</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">手机号：</div>
                    <div class="query-col-input">
                        <el-input v-model="homeParams.phone" placeholder="输入手机号" maxlength="11"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">配网时间：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" clearable v-model="homeParams.startDate"
                                        value-format="yyyy-MM-dd" placeholder="开始日期"
                                        :picker-options="pickerHomeDetailStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" clearable v-model="homeParams.endDate"
                                        value-format="yyyy-MM-dd" placeholder="结束日期"
                                        :picker-options="pickerHomeDetailEnd">
                        </el-date-picker>
                    </div>
                </div>
<!--                <div class="query-cont-col" v-if="homeParams.modeType === 'all'">-->
<!--                    <div class="query-col-title">设备种类：</div>-->
<!--                    <div class="query-col-input">-->
<!--                        <el-select v-model="homeParams.type" clearable>-->
<!--                            <el-option :label="item.name" :value="item.type" v-for="item in cloudHomeDetailDict"-->
<!--                                       :key="item.type"></el-option>-->
<!--                        </el-select>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="query-cont-col">
                    <el-button type="primary" @click="onQuery">
                        查询
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!--            @onSortChange="onSortChange"-->
            <basicTable :tableLabel="tableLabelSwitch" :tableData="cloudNetworkDetailList"
                        :pagination="cloudNetworkDetailPagination"
                        isShowIndex @onCurrentChange='onCurrentChange'
                        @onSizeChange='onSizeChange'>
                <template slot="source" slot-scope="scope">
                    {{scope.data.row.source === 1 ? 'iOS' : 'Android'}}
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
    props: ['totalNetworkCount'],
    data () {
        return {
            smartparams: {
                startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
                modeType: 'all'
            },
            smartData: {},
            homeParams: {
                pageSize: 10,
                pageNumber: 1,
                phone: '',
                startDate: '',
                endDate: '',
                type: '',
                modeType: 'all'
            }
        }
    },
    computed: {
        ...mapGetters({
            cloudNetworkReport: 'cloudNetworkReport',
            cloudNetworkDetailList: 'cloudNetworkDetailList',
            cloudNetworkDetailPagination: 'cloudNetworkDetailPagination',
            cloudNetworkModeTypeList: 'cloudNetworkModeTypeList'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.smartparams.endDate
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.smartparams.startDate
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerHomeDetailStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.homeParams.endDate
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerHomeDetailEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.homeParams.startDate
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        tableLabelSwitch () {
            return [
                { label: '配网失败时间', prop: 'createTime' },
                { label: '设备类型', prop: 'deviceName' },
                { label: '手机平台', prop: 'source' },
                { label: '管理员手机号', prop: 'phone' }
            ]
        }
    },
    mounted () {
        this.onFindNetworkStat('allLine', 'allBar')
        this.findCloudNetworkDetailList(this.homeParams)
        // this.findCloudHomeDetailSearchDict()
        this.findCloudNetworkModeTypeList()
    },
    methods: {
        ...mapActions({
            findNetworkReport: 'findNetworkReport',
            findCloudNetworkDetailList: 'findCloudNetworkDetailList',
            // findCloudHomeDetailSearchDict: 'findCloudHomeDetailSearchDict',
            findCloudNetworkModeTypeList: 'findCloudNetworkModeTypeList'
        }),
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.findCloudNetworkDetailList(this.homeParams)
            }
        },
        onQuery () {
            this.findCloudNetworkDetailList(this.homeParams)
        },
        onCurrentChange (val) {
            this.homeParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.homeParams.pageSize = val
            this.onQuery()
        },
        async onFindNetworkStat (line, bar) {
            await this.findNetworkReport(this.smartparams)
            this.smartData = this.cloudNetworkReport
            this.drawLine(this.smartData, line)
            if (this.homeParams.modeType === 'all') {
                this.drawbar(this.smartData, bar)
            }
            this.$emit('queryTotalNetworkCount', {
                startDate: this.smartparams.startDate,
                endDate: this.smartparams.endDate,
                type: '',
                networkType: this.homeParams.modeType === 'all' ? '' : this.homeParams.modeType
            })
        },
        drawLine (data, id) {
            // 绘制图表
            var charts = {
                unit: this.homeParams.modeType === 'all' ? '单位/百分比' : '单位/次',
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
            var color = ['rgba(23, 255, 243', 'rgba(255,100,97', 'rgba(71,100,197', 'rgba(255,158,37', 'rgba(255,35,67', 'rgba(25,135,67',
                'rgba(7,128,207', 'rgba(118,80,5', 'rgba(250,109,29', 'rgba(14,44,130', 'rgba(182,181,31', 'rgba(218,31,24', 'rgba(112,24,102',
                'rgba(244,122,117', 'rgba(0,157,178', 'rgba(2,75,81', 'rgba(7,128,207', 'rgba(118,80,5']
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
                    },
                    formatter: this.homeParams.modeType === 'all' ? (params) => {
                        let str = params[0].name + '<br/>'
                        for (x in params) {
                            str = str + params[x].seriesName + ': ' + params[x].data + '% <br/>'
                        }
                        return str
                    } : null
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
                    top: '17%',
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
                    name: '单位/次',
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
            this.smartparams.modeType = this.homeParams.modeType
            this.onFindNetworkStat(this.smartparams.modeType + 'Line',
                this.smartparams.modeType + 'Bar')
            Object.assign(this.homeParams, {
                pageSize: 10,
                pageNumber: 1,
                phone: '',
                type: '',
                startDate: '',
                endDate: '',
                modeType: this.homeParams.modeType
            })
            this.findCloudNetworkDetailList(this.homeParams)
            this.$emit('queryTotalTime', {
                startDate: this.smartparams.startDate,
                endDate: this.smartparams.endDate,
                type: this.homeParams.modeType === 'all' ? '' : this.homeParams.modeType
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

<template>
    <div class="smart-equip">
        <div class="echart-tab">
        </div>
        <div class="smart-time">
            <div>
                <h3>总运行时长:242100.6小时</h3>
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
        <div class="echart-wrap">
            <div class="firstchart" id="firstchart" style="height:500px"></div>
            <div class="twochart" id="twochart" style="height:500px"></div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
    data () {
        return {
            tabindex: 0,
            tableLabel: [
                { label: '岗位名称', prop: 'positionName' },
                { label: '岗位code', prop: 'positionCode', icon: 'el-icon-question', content: 'code：实现岗位与后台数据相匹配' },
                { label: '更新时间', prop: 'updateTime' }
            ],
            smartparams: {
                startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
                moduleName: 'smartHost'
            },
            smartList: [{ key: 'smartHost', name: '智能主机' }, { key: 'smartCont', name: '智能控制器' }, { key: 'sensor', name: '传感器' }, { key: 'smartAppliance', name: '智能家电' },
                { key: 'switchPanel', name: '开关面板' }],
            smartData: {}
        }
    },
    computed: {
        ...mapGetters({
            cloudRuntimeReport: 'cloudRuntimeReport'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.smartparams.endDate
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
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
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        this.onFindRuntimeR()
    },
    methods: {
        ...mapActions({
            findRuntimeReport: 'findRuntimeReport'
        }),
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
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('firstchart'))
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
                // backgroundColor: '#cccccc',
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
                        // textStyle: {
                        //     color: 'rgb(0,253,255,0.6)'
                        // },
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
                        // textStyle: {
                        //     color: 'rgb(0,253,255,0.6)'
                        // }
                    },
                    splitLine: {
                        // x轴的颜色
                        // lineStyle: {
                        //     color: 'rgb(23,255,243,0.3)'
                        // }
                    },
                    axisLine: {
                        // y轴坐标颜色
                        // lineStyle: {
                        //     color: 'rgb(0,253,255,0.6)'
                        // }
                    }
                },
                series: lineY
            }
            this.myChart.setOption(option)
        },
        drawbar (data) {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('twochart'))
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
            this.myChart.setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
.echart-wrap {
    display: flex;
    .firstchart {
        flex: 2;
    }
    .twochart {
        flex: 1;
    }
}
.smart-time {
    display: flex;
    div {
        display: flex;
        flex: 1;
        align-items: center;
    }
}
</style>
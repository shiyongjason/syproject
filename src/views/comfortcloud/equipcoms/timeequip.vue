<template>
    <div class="smart-equip">
        <div class="echart-tab">
            <div class="echart-tab-fl">
                <span :class="index==tabindex?'active':''" @click="onTabs(index)" v-for="(item,index) in 5"> 智能主机</span>
            </div>
        </div>
        <div class="smart-time">
            <div>
              <h3>总运行时长:242100.6小时</h3>
            </div>
            <div class="echart-time">
                <el-date-picker type="datetime" format="yyyy-MM-dd" placeholder="开始日期">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="datetime" format="yyyy-MM-dd" placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" class="ml20" @click="onSearch()">
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
export default {
    data () {
        return {
            tabindex: 0,
            tableLabel: [
                { label: '岗位名称', prop: 'positionName' },
                { label: '岗位code', prop: 'positionCode', icon: 'el-icon-question', content: 'code：实现岗位与后台数据相匹配' },
                { label: '更新时间', prop: 'updateTime' }
            ],
            postList: []
        }
    },
    mounted () {
        this.drawLine()
        this.drawbar()
    },
    methods: {
        onTabs (val) {
            this.tabindex = val
        },
        drawLine (data) {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('firstchart'))
            // 绘制图表
            var charts = {
                unit: '单位',
                names: ['中央', '地暖'],
                lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
                value: [
                    [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
                    [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
                ]

            }
            var color = ['rgba(23, 255, 243', 'rgba(255,100,97']
            var lineY = []
            // 根据数据条数 渲染y轴数据
            for (var i = 0; i < charts.names.length; i++) {
                var x = i
                if (x > color.length - 1) {
                    x = color.length - 1
                }
                var data = {
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
                lineY.push(data)
            }
            console.log(lineY)
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
                            return params.split(' ')[0] + '\n' + params.split(' ')[1]
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
        drawbar () {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('twochart'))
            var option = {
                color: ['#1c9a4c'],
                grid: {
                    left: '3%',
                    right: '3%',
                    top: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    formatter: '{b} ({c})'
                },
                yAxis: {
                    data: ['用户撞车', 'SQL注入检测', '机器人登录',
                        '账号盗用', 'web高频攻击', '端口扫描', '内网连接…',
                        '邮件外发'
                    ],
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
                        formatter: '{value}%'
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
                            formatter: '{c}%',
                            textStyle: {
                                color: 'black'
                            }
                        }
                    },
                    data: [110, 20, 36, 10, 50, 80, 100, 60]
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
.smart-time{
    display: flex;
    div{
        display: flex;
        flex: 1;
        align-items: center;
    }
}
</style>
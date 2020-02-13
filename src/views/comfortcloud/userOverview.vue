<template>
    <div class="page-body">
        <div class="page-body-cont">
            <h3 style="display:flex;font-weight:400">实时统计 <div class="tooltip">
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">
                            <p><i>累计用户数（截止今日）：</i>从统计时间开始，截止到当前时间，启动过APP的所有独立用户（去重，以独立设备为判断标准）</p>
                            <p><i>新注册用户数（今日）：</i>统计时间内（当日00：00-当前时间）注册成功的新会员数</p>

                            <p><i>活跃用户（今日）：</i>统计时间内启动过APP的独立用户数【独立用户打开过程序则计为1次，无论浏览多少个页面，每天一台设备打开多次计为一个活跃用户】
                            </p>
                            <p><i>启动次数（今日）：</i>统计时间内（当日00：00-当前时间）打开应用的次数，打开即视为启动。完全退出或后台运行超过30s后再次进入应用，视为一次新启动。
                            </p>
                            <p><i>使用时长（截止今日）：</i>截止到当前时间，所有用户登录APP状态的累计时间值，APP内退出登录或应用放在后台视为非登录状态
                            </p>
                        </div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </h3>
            <div class="static-wrap">
                <div :class="['static-box',tabindex=='totalUser'?'active':'']" @click="onClickTab('totalUser')">
                    <p>累计用户数（截止今日）</p>
                    <p>{{realData.totalUser}}</p>
                </div>
                <div :class="['static-box',tabindex=='totalNewUser'?'active':'']" @click="onClickTab('totalNewUser')">
                    <p>新注册用户（今日）</p>
                    <p>{{realData.totalNewUser}}</p>
                </div>
                <div :class="['static-box',tabindex=='totalActiveUser'?'active':'']" @click="onClickTab('totalActiveUser')">
                    <p>活跃用户（今日）</p>
                    <p>{{realData.totalActiveUser}}</p>
                </div>
                <div :class="['static-box',tabindex=='totalStartUser'?'active':'']" @click="onClickTab('totalStartUser')">
                    <p>启动次数（今日）</p>
                    <p>{{realData.totalStartUser}}</p>
                </div>
                <div :class="['static-box',tabindex=='totalUsingTime'?'active':'']" @click="onClickTab('totalUsingTime')">
                    <p>使用时长（截止今日）</p>
                    <p>{{realData.totalUsingTime}}</p>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="echart-tab">
                <h3>历史统计</h3>
                <div class="echart-time">
                    <p :class="[pindex==1?'active':'']" @click="onClickTime(1)">过去7天</p>
                    <p :class="[pindex==2?'active':'']" @click="onClickTime(2)">过去31天</p>
                    <el-date-picker type="date" v-model="startDate" :clearable=false placeholder="开始日期" value-format='yyyy-MM-dd' :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker type="date" v-model="endDate" :clearable=false placeholder="结束日期" value-format='yyyy-MM-dd' :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                    <el-button type="primary" class="ml20" @click="findHostoryReports()">
                        查询
                    </el-button>
                </div>
            </div>
            <div class="echart-wrap">
                <div class="" id="firstchart" style="height:500px"></div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    data () {
        return {
            startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            moduleName: '',
            realData: {},
            tabindex: 'totalUser',
            hostoryData: {},
            pindex: 1
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            realReport: 'realReport',
            hostoryReport: 'hostoryReport'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.endDate
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
                    let beginDateVal = this.startDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        this.findHostoryReports()
        this.findReports()
    },
    methods: {
        ...mapActions({
            findRealreport: 'findRealreport',
            findHostoryreport: 'findHostoryreport'
        }),
        onClickTab (val) {
            this.tabindex = val
            this.findHostoryReports()
        },
        onClickTime (val) {
            this.pindex = val
            if (val == 1) {
                this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
                this.endDate = moment().format('YYYY-MM-DD')
            }
            if (val == 2) {
                this.startDate = moment().subtract(31, 'days').format('YYYY-MM-DD')
                this.endDate = moment().format('YYYY-MM-DD')
            }
            this.findHostoryReports()
        },
        async findReports () {
            await this.findRealreport()
            this.realData = this.realReport
        },
        async findHostoryReports () {
            let params = {
                endDate: this.endDate,
                moduleName: this.tabindex,
                startDate: this.startDate
            }
            await this.findHostoryreport(params)
            this.hostoryData = this.hostoryReport
            this.drawLine()
        },
        drawLine () {
            var m = new Map([['totalUser', '累计用户数'], ['totalNewUser', '注册用户数'], ['totalActiveUser', '活跃用户']
                , ['totalStartUser', '启动次数'], ['totalUsingTime', '使用时长']])
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('firstchart'))
            // 绘制图表
            var charts = {
                unit: '单位',
                names: [m.get(this.tabindex)],
                lineX: [],
                value: []
            }

            let newArr = []
            this.hostoryData && this.hostoryData.map(val => {
                charts.lineX.push(val.dateTime)
                newArr.push(val.value)
            })
            charts.value.push(newArr)
            var color = ['rgba(23, 255, 243', 'rgba(255,100,97']
            var lineY = []
            // 根据数据条数 渲染y轴数据
            for (var i = 0;i < charts.names.length;i++) {
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
                    top: '12%',
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
        }
    }
}
</script>
<style lang="scss" scoped>
.page-body-cont {
    h3 {
        border-bottom: 1px solid #e5e5e5;
        line-height: 36px;
    }
}
.static-wrap {
    display: flex;
    .active {
        border: 1px solid #ff7131 !important;
        border-bottom: 4px solid #ff7131 !important;
    }
    .static-box {
        // color: #ffffff;
        flex: 1;
        height: 100px;
        margin: 5px;
        align-items: center;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        padding: 10px;
        box-sizing: border-box;
        p {
            &:first-child {
                font-size: 16px;
                line-height: 36px;
                color: #000000;
            }
            &:last-child {
                font-size: 30px;
                font-weight: 700;
            }
        }
        // &:nth-child(1) {
        //     background: rgb(103, 194, 58);
        // }
        // &:nth-child(2) {
        //     background: rgb(230, 162, 60);
        // }
        // &:nth-child(3) {
        //     background: rgb(245, 108, 108);
        // }
        // &:nth-child(4) {
        //     background: rgb(19, 194, 194);
        // }
        // &:nth-child(5) {
        //     background: rgb(103, 194, 58);
        // }
    }
}
.echart-tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    h3{
        border: none;
        font-weight: 400
    }
}
.el-tooltip__popper {
    p {
        line-height: 30px;
    }
    i {
        font-style: normal;
        color: #ff7131;
    }
}
.echart-time {
    display: flex;
    align-items: center;
    p {
        margin-right: 10px;
    }
    .active {
        color: #ff7131;
    }
}
</style>

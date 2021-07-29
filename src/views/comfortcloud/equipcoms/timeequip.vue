<template>
    <div class="smart-equip">
        <div class="echart-tab">
        </div>
        <div class="smart-time">
            <div>
                <h3>总运行时长: {{totalTime ? totalTime : '0'}} 小时</h3>
            </div>
            <div class="echart-time">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="smartparams.startDate" :picker-options="pickerOptionsStart" :clearable="false" :editable="false">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="smartparams.endDate" :picker-options="pickerOptionsEnd" :clearable="false" :editable="false">
                </el-date-picker>
                <el-button type="primary" class="ml20" @click="onFindRuntimeR(smartparams.modeType + 'Line',
                smartparams.modeType + 'Bar')">
                    查询
                </el-button>
            </div>
        </div>
        <div class="tab-container">
            <el-tabs v-model="homeParams.modeType" @tab-click="handleClick">
                <el-tab-pane :key="item.name" v-for="item in cloudHomeModeTypeList" :label="item.name" :name="item.type" class="echart-wrap">
                    <div class="chart-flex2" :id="item.type + 'Line'" style="height:500px"></div>
                    <div class="chart-flex1" :id="item.type + 'Bar'" style="height:500px"></div>
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
                <div class="query-cont-col" v-if="homeParams.modeType != 'all'">
                    <div class="query-col-title">设备ID：</div>
                    <div class="query-col-input">
                        <el-input v-model="homeParams.subIotId" placeholder="输入设备ID"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" clearable v-model="homeParams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerHomeDetailStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" clearable v-model="homeParams.endDate" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerHomeDetailEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col" v-if="homeParams.modeType === 'all'">
                    <div class="query-col-title">设备种类：</div>
                    <div class="query-col-input">
                        <el-select v-model="homeParams.type" clearable>
                            <el-option :label="item.name" :value="item.type" v-for="item in cloudHomeDetailDict" :key="item.type"></el-option>
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
            <basicTable :tableLabel="tableLabelSwitch" :tableData="cloudHomeDetailList" :pagination="cloudHomeDetailPagination" isShowIndex @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
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
                modeType: 'all'
            },
            smartData: {},
            homeParams: {
                pageSize: 10,
                pageNumber: 1,
                phone: '',
                subIotId: '',
                startDate: '',
                endDate: '',
                type: '',
                modeType: 'all'
            }
        }
    },
    computed: {
        ...mapGetters({
            cloudRuntimeReport: 'cloudRuntimeReport',
            cloudHomeDetailList: 'cloudHomeDetailList',
            cloudHomeDetailPagination: 'cloudHomeDetailPagination',
            cloudHomeDetailDict: 'cloudHomeDetailDict',
            cloudHomeModeTypeList: 'cloudHomeModeTypeList'
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
            let temp
            switch (this.homeParams.modeType) {
                case 'all':
                    temp = Const.totalTableLabel
                    break
                case 'Op':
                case 'Co':
                case 'Zco':
                case 'Lco':
                    temp = Const.OpTableLabel
                    break
                case 'Ap':
                case 'Th':
                    temp = Const.ApTableLabel
                    break
                case 'Lth':
                case 'Lwh':
                case 'Lhs':
                    temp = Const.lthTableLabel
                    break
                case 'Rt':
                    temp = Const.rtTableLabel
                    break
                case 'Lct':
                case 'Lyk':
                case 'Lyg':
                case 'Lyt':
                    temp = Const.lctTableLabel
                    break
                default:
                    temp = Const.totalTableLabel
            }
            return temp
        }
    },
    mounted () {
        this.onFindRuntimeR('allLine', 'allBar')
        this.findCloudHomeDetailList(this.homeParams)
        this.findCloudHomeDetailSearchDict()
        this.getCloudHomeModeTypeList()
    },
    methods: {
        ...mapActions({
            findRuntimeReport: 'findRuntimeReport',
            findCloudHomeDetailList: 'findCloudHomeDetailList',
            findCloudHomeDetailSearchDict: 'findCloudHomeDetailSearchDict',
            getCloudHomeModeTypeList: 'getCloudHomeModeTypeList'
        }),
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.findCloudHomeDetailList(this.homeParams)
            }
        },
        onQuery () {
            this.findCloudHomeDetailList(this.homeParams)
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
                type: this.homeParams.modeType === 'all' ? '' : this.homeParams.modeType,
                networkType: ''

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
            this.smartparams.modeType = this.homeParams.modeType
            this.onFindRuntimeR(this.smartparams.modeType + 'Line',
                this.smartparams.modeType + 'Bar')
            Object.assign(this.homeParams, {
                pageSize: 10,
                pageNumber: 1,
                phone: '',
                subIotId: '',
                type: '',
                startDate: '',
                endDate: '',
                modeType: this.homeParams.modeType
            })
            this.findCloudHomeDetailList(this.homeParams)
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
    margin: 0;
}
</style>

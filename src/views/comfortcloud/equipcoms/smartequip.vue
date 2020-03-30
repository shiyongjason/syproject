<template>
    <div class="smart-equip">
        <div class="echart-tab">
            <div class="echart-tab-fl">
                <span :class="index==tabindex?'active':''" @click="onTabs(index,item.key)" v-for="(item,index) in smartList" :key=index>{{item.name}}</span>
            </div>
            <div class="echart-time">
                <el-date-picker type="date" :clearable="false" v-model="smartparams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期"  :picker-options="pickerOptionsStart">
                </el-date-picker>
                <span class="">-</span>
                <el-date-picker type="date" :clearable="false" v-model="smartparams.endDate " value-format="yyyy-MM-dd" placeholder="结束日期"  :picker-options="pickerOptionsEnd">
                </el-date-picker>
                <el-button type="primary" class="ml20" @click="onFindHistoryR()">
                    查询
                </el-button>
            </div>
        </div>
        <div class="echart-wrap">
            <div class="" id="firstchart" style="height:500px"></div>
        </div>
        <div class="page-body-cont query-cont">
            <h3>设备明细</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">手机号/网关号：</div>
                    <div class="query-col-input">
                        <el-input v-model="deviceDetailParams.phone" placeholder="输入手机号/网关号" maxlength="11"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">入网时间：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" v-model="deviceDetailParams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerDeviceStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" v-model="deviceDetailParams.endDate" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerDeviceEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" @click="findCloudDeviceDetailList(deviceDetailParams)">
                        查询
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudDeviceDetailList" :pagination="cloudDeviceDetailPagination"
                        @onSortChange="onSortChange" isShowIndex @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
            </basicTable>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
import { mapActions, mapGetters } from 'vuex'
export default {
    data () {
        return {
            tabindex: 0,
            tableLabel: [
                { label: '设备种类', prop: 'typeName' },
                { label: '设备ID', prop: 'subIotId' },
                { label: '手机号', prop: 'phone' },
                { label: '网关版本号', prop: 'firmwareVersion' },
                { label: '网关号', prop: 'iotId' },
                { label: '设备状态', prop: 'status' },
                { label: '入网时间', prop: 'createTime', formatters: 'dateTime' }
            ],
            postList: [],
            smartparams: {
                startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
                moduleName: 'smartHost'
            },
            deviceDetailParams: {
                startDate: '',
                endDate: '',
                phone: '',
                pageSize: 10,
                pageNumber: 1
            },
            smartList: [{ key: 'smartHost', name: '智能主机' }, { key: 'smartCont', name: '智能控制器' }, { key: 'sensor', name: '传感器' }, { key: 'smartAppliance', name: '智能家电' },
                { key: 'switchPanel', name: '开关面板' }],
            smartData: {}
        }
    },
    computed: {
        ...mapGetters({
            cloudHistoryReport: 'cloudHistoryReport',
            cloudDeviceDetailList: 'cloudDeviceDetailList',
            cloudDeviceDetailPagination: 'cloudDeviceDetailPagination'
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
        },
        pickerDeviceStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.deviceDetailParams.endDate
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerDeviceEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.deviceDetailParams.startDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    mounted () {
        this.onFindHistoryR()
        this.findCloudDeviceDetailList(this.deviceDetailParams)
    },
    methods: {
        ...mapActions({
            findHistoryReport: 'findHistoryReport',
            findCloudDeviceDetailList: 'findCloudDeviceDetailList'
        }),
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.findCloudDeviceDetailList(this.deviceDetailParams)
            }
        },
        onCurrentChange (val) {
            this.deviceDetailParams.pageNumber = val.pageNumber
            this.findCloudDeviceDetailList(this.deviceDetailParams)
        },
        onSizeChange (val) {
            this.deviceDetailParams.pageSize = val
            this.findCloudDeviceDetailList(this.deviceDetailParams)
        },
        onTabs (val, name) {
            this.tabindex = val
            this.smartparams.moduleName = name
            this.onFindHistoryR(this.smartparams)
        },
        async onFindHistoryR () {
            await this.findHistoryReport(this.smartparams)
            this.smartData = this.cloudHistoryReport
            this.drawLine(this.smartData)
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
                } var dataL = {
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
        }
    }
}
</script>

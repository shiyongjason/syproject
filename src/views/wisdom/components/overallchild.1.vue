<template>
    <div class="overall">
        <div class="overall-left">
            <div class="overall-l-top">
                <div class="tooltip">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        placement="left"
                    >
                        <div slot="content">
                            统计时间：<br />
                            整体销售（含税） {{params.startDate}}～{{params.endDate}}<br />
                            净利（含税） {{params.startDate}}～{{params.endDate}}<br />
                            毛利（含税） {{params.startDate}}～{{params.endDate}}<br />
                            在线平台 历史～{{nnowTay}}<br />
                            在线会员店 历史～{{nnowTay}}<br />
                            销售进度<br />

                        </div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
                <div>
                    <strong>{{summaryData.allSales?parseFloat(summaryData.allSales).toFixed(0):0}}

                    </strong>
                    <span>
                        整体销售(万)
                        <!-- <i style="font-style:normal">{{summaryData.allSalesProgress?summaryData.allSalesProgress:'-'}}%</i> -->
                        <!-- <i style="color:#FF4D4F;font-style:normal">{{summaryData.timeLag?(summaryData.timeLag>0 ? '↑'+ summaryData.timeLag : '↓'+summaryData.timeLag):''}}% -->
                    </span>
                </div>
                <div>
                    <strong>-<i></i></strong>
                    <span>毛利</span>
                </div>
                <div>
                    <strong>-<i></i></strong>
                    <span>净利</span>
                </div>
                <div>
                    <strong>{{companyData.companyNum?parseFloat(companyData.companyNum).toFixed(0):0}}</strong>
                    <span>在线平台／家</span>
                </div>
                <div>
                    <strong>{{companyData.shopNum?parseFloat(companyData.shopNum).toFixed(0):0}}</strong>
                    <span>在线会员店／家</span>
                </div>
            </div>
            <div class="overall-l-bottom">
                <div class="tooltip">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        placement="left"
                    >
                        <div slot="content">
                            统计时间：历史～{{nnowTay}}<br />
                            在线规模：已签约上线销售规模
                        </div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
                <div
                    class="mapchina"
                    ref="mapchina"
                    :style="{height: '500px',width:'80%'}"
                ></div>
                <div class="overallinfo">
                    <div><i>{{companyData.provinceNum?companyData.provinceNum:0}}</i>个省,<i>{{companyData.cityNum?companyData.cityNum:0}}</i>个城市</div>
                    <div><i>{{companyData.companyNum?companyData.companyNum:0}}</i>家平台公司,<i>{{companyData.shopNum?companyData.shopNum:0}}</i>家会员店</div>
                    <div>在线规模<i>{{companyData.onlineScale?companyData.onlineScale:0}}</i>万</div>
                    <div>平均规模<i>{{companyData.avgScale?companyData.avgScale:0}}</i>万</div>
                </div>
            </div>
        </div>
        <div class="overall-right">
            <div class="overall-r-top">
                <div class="sale-title"><span>前12个月销售趋势</span><span>统计时间：{{this.yearMonth[0]}}～{{this.yearMonth[this.yearMonth.length-1]}}
                        <br>统计区域：{{saleData.statisticalArea == 0 ? '全国' : saleData.organizationShortName}}</span>
                </div>
                <div
                    id="myChart"
                    :style="{height: '250px',}"
                ></div>
            </div>
            <div class="overall-r-bottom">
                <div class="sale-title"><span>{{saleData.statisticalArea == 0 ? '全国' : saleData.organizationShortName}}销售占比</span><span>统计时间：{{params.startDate}}～{{params.endDate}}<br>统计区域：{{saleData.statisticalArea == 0 ? '全国' : saleData.organizationShortName}}</span></div>
                <div class="piediv">
                    <div class="piediv-fl">
                        <div
                            id="pie"
                            :style="{ height: '300px',width:'99%'}"
                        ></div>

                    </div>
                    <div class="piediv-fr">
                        <div
                            id="myBar"
                            :style="{ height: '400px',width:'99%'}"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import '../../../../node_modules/echarts/map/js/china.js'
import { getStatistics, getSummary, getSales } from '../api/index'
import { mapState } from 'vuex'
export default {
    props: {
        params: {
            type: Object,
            default: () => {
                return {
                    companyCode: '',
                    endDate: '',
                    regionCode: '',
                    startDate: '',
                    subsectionCode: ''
                }
            }
        }
    },
    data () {
        return {
            mapArr: [],
            lineArr: [],
            yearMonth: [],
            statisticalData: {
                avgScale: '',
                cityNum: '',
                companyNum: '',
                onlineScale: '',
                provinceNum: '',
                provinceVos: []
            },
            companyData: {},
            summaryData: {},
            saleData: {},
            nowTay: '',
            nnowTay: '',
            myChart: '',
            pie: '',
            mapchina: '',
            myBar: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            companyCode: state => state.companyCode
        })
    },
    mounted () {
        var that = this
        // setTimeout(() => {
        window.addEventListener('resize', function () {
            that.$nextTick(() => {
                that.myChart.resize()
                that.mapchina.resize()
                that.pie.resize()
                that.myBar.resize()
            })
        })
        // }, 10)

        this.nowTay = (new Date()).getFullYear() + '-' + '01'
        this.nnowTay = (new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 10 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1)))
        this.getStatistics()
        this.getSales()
        this.getSummary()
    },
    methods: {
        async getStatistics () {
            const { data } = await getStatistics(this.params)
            this.companyData = data.data
            this.drawMap(data.data.provinceVos ? data.data.provinceVos : [])
        },
        async getSales () {
            this.lineArr = []
            this.yearMonth = []
            const { data } = await getSales(this.params)
            this.saleData = data.data
            this.pieArr = data.data.organizationRateVo
            data.data.yearOfSales && data.data.yearOfSales.map(value => {
                this.lineArr.push(value.value ? parseFloat(value.value).toFixed(0) : 0)
                this.yearMonth.push(value.date)
            })

            this.drawPieChart(this.pieArr)
            this.drawLine(this.lineArr)
        },
        async getSummary () {
            const { data } = await getSummary(this.params)
            this.summaryData = data.data
        },
        backoverAll () {
            this.getStatistics()
            this.getSales()
            this.getSummary()
        },
        drawLine (data) {
            // // 基于准备好的dom，初始化echarts实例
            // let myChart = echarts.init(document.getElementById('myChart'))
            // // 绘制图表
            // myChart.setOption({
            //     tooltip: {
            //         trigger: 'axis',
            //         formatter: function (e) {
            //             var html = ''
            //             html += e[0].name + '</br>'
            //             for (var i = 0; i < e.length; i++) {
            //                 if (e[i].seriesType === 'line') {
            //                     html += e[i].marker + e[i].seriesName + ':' + e[i].data + '万</br>'
            //                 }
            //             }
            //             return html
            //         }
            //     },
            //     grid: {
            //         left: '15%',
            //         right: '10%'
            //     },
            //     legend: { data: [{ name: '整体', icon: ' rectangle ' }] },
            //     xAxis: [{
            //         type: 'category',
            //         axisTick: {
            //             alignWithLabel: true
            //         },
            //         data: this.yearMonth
            //     }
            //     ],
            //     yAxis: {
            //         type: 'value',
            //         axisLabel: {
            //             formatter: '{value} 万'
            //         }
            //     },
            //     series: [{
            //         id: 'all',
            //         data: data,
            //         type: 'line',
            //         name: '整体',
            //         smooth: true,
            //         itemStyle: {
            //             color: '#1890FF',
            //             opacity: 0
            //         }

            //     }
            //     ]
            // })
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            let option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (e) {
                        var html = ''
                        html += e[0].name + '</br>'
                        for (var i = 0; i < e.length; i++) {
                            if (e[i].seriesType === 'line') {
                                html += e[i].marker + e[i].seriesName + ':' + e[i].data + '万</br>'
                            }
                        }
                        return html
                    }
                },
                grid: {
                    left: '15%',
                    right: '10%'
                },
                legend: { data: [{ name: '整体', icon: ' rectangle ' }] },
                xAxis: [{
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: this.yearMonth
                }],
                yAxis: [{
                    type: 'value',
                    min: 0,
                    position: 'left',
                    axisLabel: {
                        formatter: '{value} 万'
                    }
                }],
                series: [{
                    name: '整体',
                    type: 'line',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    'smooth': true,
                    lineStyle: {
                        width: 3,
                        color: '#1890FF'
                    },
                    itemStyle: {
                        width: 0,
                        color: '#1890FF'
                    },
                    data: this.lineArr
                }]
            }
            this.myChart.setOption(option)
        },
        drawPieChart (data) {
            var dataAll = []
            var yAxisData = []
            data && data.map(value => {
                dataAll.push(value.value)
                yAxisData.push(value.name)
            })
            // // 基于准备好的dom，初始化echarts实例
            this.pie = echarts.init(document.getElementById('pie'))
            // // 绘制图表
            this.pie.setOption({
                // grid: [
                //     { x: '60%', y: '10%', width: '38%', height: '80%' }
                // ],
                color: [
                    '#FF4D4F',
                    '#FF7A45',
                    '#FFA941',
                    '#FFC53D',
                    '#41A9FF',
                    '#73d13d',
                    '#bae637',
                    '#41a9ff'
                ],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}'
                },
                // xAxis: [
                //     { gridIndex: 0, axisTick: { show: false }, axisLabel: { show: false }, splitLine: { show: false }, axisLine: { show: false } }
                // ],
                // yAxis: [
                //     { gridIndex: 0,
                //         interval: 0,
                //         data: yAxisData.reverse(),
                //         axisTick: { show: false },
                //         axisLabel: { show: true },
                //         splitLine: { show: false },
                //         axisLine: { show: true, lineStyle: { color: '#00000' } }
                //     }
                // ],
                series: [
                    {
                        name: '占比',
                        type: 'pie',
                        radius: ['20%', '80%'],
                        center: ['50%', '55%'],
                        avoidLabelOverlap: true,
                        data: data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        label: {
                            // normal: {
                            //     show: true,
                            //     formatter: '{c}%',
                            //     textStyle: {
                            //         fontSize: 12

                            //     },
                            //     position: 'outside'
                            // },
                            emphasis: {
                                show: true
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                    // {
                    //     name: '占比',
                    //     type: 'bar',
                    //     xAxisIndex: 0,
                    //     yAxisIndex: 0,
                    //     barWidth: '80%',
                    //     itemStyle: { normal: { color: '#86c9f4' } },
                    //     label: { normal: { show: true, position: 'right', textStyle: { color: '#9EA7C4' } } },
                    //     data: dataAll.reverse()
                    // }
                ]
            })
            this.myBar = echarts.init(document.getElementById('myBar'))
            // // 绘制图表
            this.myBar.setOption({
                grid: [
                    { x: '21%', y: '10%', width: '38%' }
                ],
                xAxis: [
                    { gridIndex: 0, axisTick: { show: false }, axisLabel: { show: false }, splitLine: { show: false }, axisLine: { show: false } }
                ],
                yAxis: [
                    { gridIndex: 0,
                        interval: 0,
                        data: yAxisData.reverse(),
                        axisTick: { show: false },
                        axisLabel: { show: true },
                        splitLine: { show: false },
                        axisLine: { show: true, lineStyle: { color: '#00000' } }
                    }
                ],
                series: [
                    {
                        name: '占比',
                        type: 'bar',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        barMaxWidth: 20,
                        itemStyle: { normal: { color: '#86c9f4' } },
                        label: { normal: { show: true, position: 'right', textStyle: { color: '#9EA7C4' }, formatter: '{c}%' } },
                        data: dataAll.reverse()
                    }
                ]
            })
        },
        drawMap (data) {
            this.mapchina = echarts.init(this.$refs.mapchina) // 这里是为了获得容器所在位置
            var option = {
                visualMap: {
                    min: 0,
                    max: 30,
                    left: 'left',
                    top: 'bottom',
                    text: ['30', '0'],
                    calculable: false,
                    orient: 'horizontal',
                    inRange: {
                        color: ['#87E8DE', '#5CDBD3', '#08979C']
                    }
                },
                tooltip: {
                    padding: 0,
                    enterable: true,
                    transitionDuration: 1,
                    textStyle: {
                        color: '#000',
                        decoration: 'none'
                    },
                    // position: function (point, params, dom, rect, size) {
                    //     return [point[0], point[1]]
                    // },
                    formatter: function (params) {
                        if (params.data) {
                            var tipHtml = ''
                            tipHtml = '<div style="height:120px;width:200px;border-radius:5px;background:#fff;box-shadow:0 0 10px 5px #aaa">' +
                                '    <div style="height:30px;width:100%;border-radius:5px;background:#F8F9F9;border-bottom:1px solid #F0F0F0">' +
                                '        <span style="line-height:30px;margin-left:18px">' + params.name + '</span>' +
                                '    </div>' +
                                '    <div style="height:40px;width:100%;background:#fff">' +
                                '        <div style="padding-left:18px;padding-top:22px">' +
                                '            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
                                '            <span>平台公司</span>' +
                                '            <span style="float:right;margin-right:18px">' + params.value + '家</span>' +
                                '        </div>' +
                                '        <div style="padding-left:18px;padding-top:14px">' +
                                '            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
                                '            <span>会员店</span>' +
                                '            <span style="float:right;margin-right:18px">' + (params.data.shops ? params.data.shops : 0) + '家</span>' +
                                '        </div>' +
                                '    </div>' +
                                '</div>'
                            return tipHtml
                        }
                    }
                },
                series: [{
                    name: '2019全国GDP对比',
                    type: 'map',
                    mapType: 'china',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false //
                            },
                            borderColor: '#ffffff',
                            // areaColor: '#87E8DE',
                            color: '#87E8DE'
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: data
                }]
            }
            this.mapchina.setOption(option)
            // myChart.dispatchAction({
            //     type: 'showTip',
            //     seriesIndex: 0,
            //     dataIndex: 5
            // })
        }
    }
}

</script>

<style lang="scss" >
.el-tabs__header {
    margin-bottom: 0 !important;
    border-bottom: none !important;
}
.overall {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    border: 1px solid #e4e7ed;
    // overflow: scroll;
    .overall-left {
        flex: 1;
        border-right: 1px solid #e4e7ed;
        // min-width: 700px;
        .overall-l-top {
            position: relative;
            border-bottom: 1px solid #e4e7ed;
            width: 100%;
            height: 116px;
            display: inline-flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .tooltip {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 30px;
                color: #b6b7bb;
            }
            div {
                flex-grow: 1;
                text-align: center;
                strong {
                    display: block;
                    font-size: 40px;
                    font-weight: 500;
                    i {
                        font-size: 14px;
                        font-style: normal;
                    }
                }
            }
        }
    }
    .overall-right {
        // min-width: 630px;
        flex: 1;
        .overall-r-top {
            border-bottom: 1px solid #e4e7ed;
        }
        .sale-title {
            padding: 10px 10px 0 10px;
            display: flex;
            align-items: center;
            span {
                flex-grow: 1;
                font-size: 16px;
                &:last-child {
                    text-align: right;
                    color: #595959;
                    font-size: 12px;
                }
            }
        }
        .piediv {
            // overflow-y: scroll;
            // height: 300px;
            display: flex;
            flex-direction: row;
            .piediv-fl {
                flex: 1;
            }
            .piediv-fr {
                flex: 1;
                height: 300px;
                overflow-y: scroll;
            }
        }
    }
    .overall-l-bottom {
        position: relative;
        .tooltip {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 30px;
            color: #b6b7bb;
        }
        .sale-title {
            padding: 10px 10px 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                flex-grow: 1;
                font-size: 16px;
                &:last-child {
                    text-align: right;
                    color: #595959;
                    font-size: 12px;
                }
            }
        }
        .mapchina {
            float: left;
        }
        .overallinfo {
            position: absolute;
            top: 260px;
            right: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            div {
                i {
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 500;
                    color: #262626;
                }
                text-align: right;
                height: 40px;
                align-items: center;
                padding-right: 40px;
                letter-spacing: 0;
                margin-bottom: 20px;
            }
        }
    }
}
</style>

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

                        </div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
                <div>
                    <strong>{{summaryData.allSales| money(true)}}

                    </strong>
                    <span>
                        整体销售(万)
                        <!-- <i style="font-style:normal">{{summaryData.allSalesProgress?summaryData.allSalesProgress:'-'}}%</i> -->
                        <!-- <i style="color:#FF4D4F;font-style:normal">{{summaryData.timeLag?(summaryData.timeLag>0 ? '↑'+ summaryData.timeLag : '↓'+summaryData.timeLag):''}}% -->
                    </span>
                </div>
                <div>
                    <strong>-<i></i></strong>
                    <span>毛利率</span>
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
                    :style="{height: '500px',width:'85%'}"
                ></div>
                <div class="overallinfo">
                    <div><i>{{companyData.provinceNum?companyData.provinceNum:0}}</i>省,<i>{{companyData.cityNum?companyData.cityNum:0}}</i>城市</div>
                    <div><i>{{companyData.companyNum?companyData.companyNum:0}}</i>平台公司,<i>{{companyData.shopNum?companyData.shopNum:0}}</i>会员店</div>
                    <div>在线规模<i>{{companyData.onlineScale|money(true)}}</i>万</div>
                    <div>平均规模<i>{{companyData.avgScale|money(true)}}</i>万</div>
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
                    :style="{height: '250px',width:'100%'}"
                ></div>
            </div>
            <div class="overall-r-bottom">
                <div class="sale-title"><span>{{saleData.statisticalArea == 0 ? '全国' : saleData.organizationShortName}}销售占比</span><span>统计时间：{{params.startDate}}～{{params.endDate}}<br>统计区域：{{saleData.statisticalArea == 0 ? '全国' : saleData.organizationShortName}}</span></div>
                <div class="piediv">
                    <div
                        class="piediv-fl"
                        style="50%"
                    >
                        <div
                            id="pie"
                            :style="{ height: '300px'}"
                        ></div>

                    </div>
                    <div class="piediv-fr">
                        <div
                            id="myBar"
                            :style="{ height: '800px',width:'100%'}"
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
import HighCharts from 'highcharts'
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
            myBar: '',
            hCharts: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            companyCode: state => state.companyCode
        })
    },
    mounted () {
        this.init()
        this.nowTay = (new Date()).getFullYear() + '-' + '01'
        this.nnowTay = (new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 9 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1)))
        this.$nextTick(() => {
            this.getStatistics()
            this.getSales()
            this.getSummary()
        })
    },
    methods: {
        init () {
            // const self = this
            // setTimeout(() => {
            //     window.onresize = function () {
            //         // self.myChart.resize()
            //         // self.mapchina.resize()
            //         // // self.pie.resize()
            //         // self.myBar.resize()
            //         // self.hCharts.reflow()
            //     }
            // }, 20)
        },
        async getStatistics () {
            const { data } = await getStatistics(this.params)
            this.companyData = data.data
            this.drawMap(data.data.respProvinces ? data.data.respProvinces : [])
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
            this.pieArr && this.pieArr.map(value => {
                value.value = parseFloat(value.value).toFixed(1)
                return value
            })
            this.drawPieChart(this.pieArr)
            this.drawLine(this.lineArr)
        },
        async getSummary () {
            const { data } = await getSummary(this.params)
            this.summaryData = data.data
            this.summaryData.allSales = parseFloat(this.summaryData.allSales).toFixed(0)
        },
        backoverAll () {
            this.getStatistics()
            this.getSales()
            this.getSummary()
        },
        drawLine (data) {
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
            console.log(data)
            const dataAll = []
            const yAxisData = []
            const pieAll = []
            const perArr = []
            data && data.map(value => {
                if (parseFloat(value.value) > 0) {
                    perArr.push(parseFloat(value.value))
                }
                dataAll.push(parseFloat(value.value).toFixed(1))
                yAxisData.push(value.name)
                pieAll.push([value.name, parseFloat(value.value)])
            })
            const newDataall = perArr.slice(0, 7)
            const minpercentage = newDataall[newDataall.length - 1]
            // console.log(perArr, newDataall, newDataall.length, minpercentage)
            // // highcharts 3d
            this.pie = echarts.init(document.getElementById('pie'))
            let option = {
                chart: {
                    type: 'pie', // 饼图
                    options3d: {
                        enabled: true, // 使用3d功能
                        alpha: 60, // 延y轴向内的倾斜角度
                        beta: 0
                    }
                },

                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true, // 每个扇块能否选中
                        cursor: 'pointer', // 鼠标指针
                        depth: 25, // 饼图的厚度
                        dataLabels: {
                            enabled: true, // 是否显示饼图的线形tip
                            formatter: function (params) {
                                // console.log((this.percentage).toFixed(1))
                                if ((this.percentage).toFixed(1) > minpercentage) { return '<b>' + this.point.name + '</b>: ' + (this.percentage).toFixed(1) + ' %' } // 这里进行判断+ '</b>: ' + this.percentage + ' %'
                            },
                            style: {
                                color: (HighCharts.theme && HighCharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: '', // 统一的前置词,非必须
                        data: pieAll.reverse()
                    }
                ]
            }
            this.hCharts = HighCharts.chart('pie', option)

            this.myBar = echarts.init(document.getElementById('myBar'))
            // // 绘制图表
            this.myBar.setOption({
                // grid: [
                //     { x: '25%', y: '10%', width: '80%', height: '100%' }
                // ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    // { gridIndex: 0, axisTick: { show: false }, axisLabel: { show: false }, splitLine: { show: false }, axisLine: { show: false } }
                    type: 'value',
                    show: false,
                    boundaryGap: [0, 0.01]
                },
                yAxis: [
                    { gridIndex: 0,
                        interval: 0,
                        data: yAxisData.reverse()
                        // axisTick: { show: false },
                        // axisLabel: { show: true },
                        // splitLine: { show: false },
                        // axisLine: { show: true, lineStyle: { color: '#000' } }
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
                        label: {
                            normal: { show: true,
                                position: 'right',
                                color: '#00000',
                                textStyle: { color: '#000' },
                                formatter: '{c}%' }
                        },
                        data: dataAll.reverse()
                    }
                ]
            })
        },
        drawMap (data) {
            this.mapchina = echarts.init(this.$refs.mapchina) // 这里是为了获得容器所在位置
            var mapName = 'china'
            var dataMap = data.map(value => {
                return { name: value.name }
            })
            var geoCoordMap = {}
            /* 获取地图数据 */
            this.mapchina.showLoading()
            var mapFeatures = echarts.getMap(mapName).geoJson.features
            this.mapchina.hideLoading()
            mapFeatures.forEach(function (v) {
                // 地区名称
                var name = v.properties.name
                // 地区经纬度
                geoCoordMap[name] = v.properties.cp
            })

            var convertData = function (data) {
                var res = []
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name]
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        })
                    }
                }
                return res
            }
            const newData = data.sort(function (a, b) {
                return b.value - a.value
            })
            const option = {
                visualMap: {
                    min: -1,
                    max: newData.length > 0 ? newData[0].value : '',
                    left: 'left',
                    top: 'bottom',
                    text: [newData.length > 0 ? newData[0].value : '', '0'],
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
                    formatter: function (params) {
                        if (params.data && params.componentSubType === 'map') {
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
                geo: {
                    show: true,
                    map: mapName,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#7FA2DF',
                            borderColor: '#fff'
                        },
                        emphasis: {
                            areaColor: '#2C78DD'
                        }
                    }
                },
                series: [{
                    name: '散点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(dataMap),
                    symbolSize: 6,
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ffffff'
                        }
                    }
                },
                {
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
                }
                ]
            }
            this.mapchina.setOption(option)
        }
    }
}

</script>

<style lang="scss" scoped>
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
                font-size: 23px;
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
            font-size: 23px;
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
            margin-top: 30px;
        }
        .overallinfo {
            position: absolute;
            top: 320px;
            right: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: 600;
            font-size: 16px;
            div {
                i {
                    font-size: 20px;
                    font-style: normal;

                    color: #ef7407;
                }
                text-align: right;
                height: 40px;
                align-items: center;

                letter-spacing: 0;
                // margin-bottom: 20px;
            }
        }
    }
}
</style>

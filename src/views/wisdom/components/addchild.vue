<template>
    <div class="addchild">
        <div class="plat-top">

            <div><strong >{{addData.companyCount?addData.companyCount:0}}</strong>
                <span>新上线平台(家)</span>
            </div>
            <div><strong >{{(addData.onlineScale?parseFloat(addData.onlineScale).toFixed(0):0)|money}}</strong>
                <span>新增上线规模(万)</span>
            </div>
            <div><strong >{{addData.shopNum?addData.shopNum:0}}</strong>
                <span>新增会员店(家)<i style="font-style:normal">{{addData.addShopProgress}}%</i></span>
            </div>
            <!-- <div><strong >{{addData.incrementalSales ? parseFloat(addData.incrementalSales).toFixed(0):0}}</strong>
                <span>新增增量(万)</span>
            </div> -->
        </div>
        <div class="plat-bottom">
            <div
                ref="addplat"
                :style="{height: '500px',widt:'100%'}"
            ></div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import { addStatistics, addStatisticsYear } from '../api/index'
export default {
    name: 'addchild',
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
            chart: null,
            addData: {
                companyCount: '',
                companyCounts: [],
                incrementalSales: '',
                onlineScale: '',
                onlineScaleList: []
            },
            shopList: [],
            scaleList: [],
            countList: [],
            yearM: [],
            salesBOList: [],
            myChart: ''
        }
    },
    mounted () {
        this.addStatistics()
        var that = this
        window.addEventListener('resize', function () {
            that.myChart.resize()
        })
    },
    // beforeDestroy () {
    //     if (!this.chart) {
    //         return
    //     }
    //     this.chart.dispose()
    //     this.chart = null
    // },
    methods: {
        async  addStatistics () {
            this.shopList = []
            this.scaleList = []
            this.countList = []
            this.yearM = []
            this.salesBOList = []
            const { data } = await addStatistics(this.params)
            const { data: year } = await addStatisticsYear(this.params)
            this.addData = data.data
            this.yearData = year.data
            this.yearData.shops && this.yearData.shops.map(value => {
                this.shopList.push(value.shopNum)
            })
            this.yearData.companyCounts && this.yearData.companyCounts.map(value => {
                this.countList.push(value.value)
                this.yearM.push(value.date)
            })
            this.yearData.onlineScaleList && this.yearData.onlineScaleList.map(value => {
                this.scaleList.push(value.value ? parseFloat(value.value).toFixed(0) : 0)
            })
            this.addData.incrementalSalesBO && this.addData.incrementalSalesBO.map(value => {
                this.salesBOList.push(value.incrementalSales ? parseFloat(value.incrementalSales).toFixed(0) : 0)
            })
            this.drawaddPlat(this.countList, this.scaleList, this.shopList, this.salesBOList)
        },
        backadd () {
            this.addStatistics()
        },
        drawaddPlat (sr1, sr2, sr3, sr4) {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(this.$refs.addplat)
            // 绘制图表
            this.myChart.setOption({
                'title': {
                    'text': '前12个月趋势图',
                    textStyle: {
                        fontSize: '22',
                        fontWeight: '500'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (e) {
                        var html = ''
                        html += e[0].name + '</br>'
                        for (var i = 0; i < e.length; i++) {
                            if (e[i].seriesName === '新增平台') {
                                html += e[i].marker + e[i].seriesName + ':' + e[i].data + '家</br>'
                            } else if (e[i].seriesName === '新增会员店') {
                                html += e[i].marker + e[i].seriesName + ':' + e[i].data + '家</br>'
                            } else {
                                html += e[i].marker + e[i].seriesName + ':' + e[i].data + '万</br>'
                            }
                        }
                        return html
                    }
                },
                legend: { data: [{ name: '新增平台', icon: ' rectangle ' }, { name: '新增会员店', icon: ' rectangle ' }, { name: '新增上线规模', icon: ' rectangle ' }] },
                xAxis: [{
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: this.yearM
                }
                ],
                yAxis: [
                    // {
                    //     type: 'value',
                    //     min: 0,
                    //     // max: 250,
                    //     // interval: 50,
                    //     axisLabel: {
                    //         formatter: '{value} 万'
                    //     }
                    // },
                    // {
                    //     type: 'value',
                    //     position: 'right',
                    //     // name: '温度',
                    //     // min: 0,
                    //     // max: 25,
                    //     // interval: 5,
                    //     axisLabel: {
                    //         formatter: '{value}'
                    //     }
                    // }
                    {
                        type: 'value',
                        min: 0,
                        position: 'left',
                        axisLabel: {
                            formatter: '{value} 万'
                        },
                        splitLine: {
                            show: false
                        }
                    }, {
                        type: 'value',
                        min: 0,
                        position: 'right',
                        axisLabel: {
                            formatter: '{value}家'
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [{
                    id: 'palt',
                    data: sr1,
                    type: 'line',
                    name: '新增平台',
                    smooth: true,
                    itemStyle: {
                        color: '#13C2C2',
                        opacity: 1
                    },
                    yAxisIndex: 1

                },
                {
                    id: 'store',
                    data: sr3,
                    type: 'line',
                    name: '新增会员店',
                    smooth: true,
                    itemStyle: {
                        color: '#1890FF',
                        opacity: 1
                    },
                    yAxisIndex: 1
                },
                {
                    id: 'scale',
                    data: sr2,
                    type: 'line',
                    name: '新增上线规模',
                    smooth: true,
                    itemStyle: {
                        color: '#FF4D4F',
                        opacity: 1
                    }
                }
                // {
                //     id: 'increment',
                //     data: sr4,
                //     type: 'line',
                //     name: '新增增量',
                //     smooth: true,
                //     itemStyle: {
                //         color: '#e27510',
                //         opacity: 1
                //     }
                // }
                ]
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.addchild {
    border: 1px solid #efeff4;
}
.plat-top {
    display: flex;
    height: 130px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #efeff4;
    div {
        text-align: center;
        flex-grow: 1;
        strong {
            display: block;
            font-size: 40px;
            font-weight: 500;
            i {
                font-size: 14px;
                color: #ff4d4f;
                font-style: normal;
            }
        }
    }
}
.plat-bottom {
    padding-top: 10px;
}
</style>

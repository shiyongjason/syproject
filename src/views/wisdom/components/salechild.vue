<template>
    <div class="sale">
        <div class="sale-left">
            <div class="sale-l-top">
                <div class="sale-wrap-title">
                    <span style="color:#fff">标题</span>
                    <span>实际(万)</span>
                    <span>目标(万)</span>
                    <span>销售达成</span>
                    <span>缺口(万)</span>
                </div>
                <div class="sale-wrap">
                    <span>整体</span>
                    <span>{{sellData.overallReach|money}}</span>
                    <span>{{sellData.overallTarget|money}}</span>
                    <span>{{sellData.overallAchievingRate?parseFloat(sellData.overallAchievingRate).toFixed(1):0}}%<br>
                        <el-progress
                            :stroke-width="7"
                            :percentage="sellData.overallAchievingRateNew"
                            :show-text=false
                            :color='sellData.overallAchievingRateNew<50?"red":sellData.overallAchievingRateNew<80?"orange":"lightgreen"'
                        ></el-progress>
                    </span>
                    <span :class="{redspan:sellData.overallGap>0}">{{(sellData.overallGap>0?sellData.overallGap:0)|money}}</span>

                </div>
                <div class="sale-wrap">
                    <span>存量</span>
                     <span>{{(sellData.stockReach?sellData.stockReach:'-')|money}}</span>
                    <!-- <span v-if="sellData.stockReach">{{sellData.stockReach|money}}</span> <span v-if="!sellData.stockReach">-</span> -->
                    <span>{{(sellData.stockTarget?sellData.stockTarget:'-')|money}}</span>
                    <span>{{sellData.stockAchievingRate?parseFloat(sellData.stockAchievingRate).toFixed(1):0}}%<br>
                        <el-progress
                            :stroke-width="7"
                            :percentage="sellData.stockAchievingRateNew"
                            :show-text=false
                            :color='sellData.stockAchievingRateNew<50?"red":sellData.stockAchievingRateNew<80?"orange":"lightgreen"'
                        ></el-progress>
                    </span>
                    <span :class="{redspan:sellData.stockGap>0}">{{(sellData.stockGap>0?sellData.stockGap:0)|money}}</span>

                </div>
                <div class="sale-wrap">
                    <span>增量</span>
                    <span>{{sellData.incrementReach|money}}</span>
                    <span>{{(sellData.incrementTarget?sellData.incrementTarget:'-')|money}}</span>
                    <span>{{sellData.incrementAchievingRate?parseFloat(sellData.incrementAchievingRate).toFixed(1):0}}%<br>
                        <el-progress
                            :stroke-width="7"
                            :percentage="sellData.incrementAchievingRateNew"
                            :show-text=false
                            :color='sellData.incrementAchievingRateNew<50?"red":sellData.incrementAchievingRateNew<80?"orange":"lightgreen"'
                        ></el-progress>
                    </span>
                    <span :class="{redspan:sellData.incrementGap>0}">{{(sellData.incrementGap>0?sellData.incrementGap:0)|money}}</span>
                </div>
            </div>
            <div class="sale-l-bottom">
                <div
                    ref="salechart"
                    :style="{height: '393px',widt:'100%'}"
                ></div>
            </div>
        </div>
        <div class="sale-right">
            <div class="tooltip">
                <el-tooltip
                    class="item"
                    effect="dark"
                    placement="left"
                >
                    <div slot="content">统计时间:{{params.startDate}}～{{params.endDate}}<br /></div>
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </div>
            <div class="sale-hero-title">
                <img
                    src="../../../assets/images/img_herolist.png"
                >
                <strong>排行榜</strong>
                <p>全国分部销售排行榜</p>
            </div>
            <div class="sale-box">
                <div
                    class="sale-hero"
                    v-for="(item,index) in companySaleBOList"
                    :key="index"
                >
                    <!-- <img
                    :src="`${index==0?'../../../assets/images/img_first.png':index==1?'../../../assets/images/img_second.png':'../../../assets/images/img_first.png'}`"
                    alt="王者"
                > -->
                    <img
                        :src="item.imgurl"
                        alt="星耀"
                        v-show="item.imgurl"
                    >
                    <div
                        class="img-box"
                        v-show="!item.imgurl"
                    >{{index+1}}</div>
                    <div class="heroprocess">
                        <strong>{{item.companyShortName}}</strong>
                        <p>进度{{item.sale}}% <el-progress
                                :stroke-width="5"
                                :percentage="item.sale>100?100:item.sale"
                                :show-text=false
                                status="success"
                            ></el-progress>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import { sellStatistics, hexoList } from '../api/index'
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
            sellData: {
                incrementAchievingRate: 0,
                incrementGap: '',
                incrementReach: '',
                incrementTarget: '',
                overallAchievingRate: 0,
                overallGap: '',
                overallReach: '',
                overallTarget: '',
                stockAchievingRate: 0,
                stockGap: '',
                stockReach: '',
                stockTarget: ''
            },
            companySaleBOList: [

            ],
            hexoTime: '',
            realArr: [],
            targetArr: [],
            markArr: [],
            myChart: ''
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.sellStatistics()
            this.hexoList()
        })
        // var that = this
        // // setTimeout(() => {
        // window.addEventListener('resize', function () {
        //     // that.myChart.resize()
        // })
    },
    methods: {
        backsale () {
            this.sellStatistics()
            this.hexoList()
        },
        async sellStatistics () {
            const { data } = await sellStatistics(this.params)
            this.sellData = data.data
            this.sellData.overallReach = parseFloat(this.sellData.overallReach).toFixed(0)
            this.sellData.overallTarget = parseFloat(this.sellData.overallTarget).toFixed(0)
            this.sellData.overallGap = parseFloat(this.sellData.overallGap).toFixed(0)
            this.sellData.stockReach = parseFloat(this.sellData.stockReach).toFixed(0)
            this.sellData.stockTarget = parseFloat(this.sellData.stockTarget).toFixed(0)
            this.sellData.stockGap = parseFloat(this.sellData.stockGap).toFixed(0)
            this.sellData.incrementReach = parseFloat(this.sellData.incrementReach).toFixed(0)
            this.sellData.incrementTarget = parseFloat(this.sellData.incrementTarget).toFixed(0)
            this.sellData.incrementGap = parseFloat(this.sellData.incrementGap).toFixed(0)
            this.sellData.incrementAchievingRateNew = this.sellData.incrementAchievingRate ? (parseInt(this.sellData.incrementAchievingRate) > 100 ? 100 : parseInt(this.sellData.incrementAchievingRate)) : 0
            this.sellData.overallAchievingRateNew = this.sellData.overallAchievingRate ? (parseInt(this.sellData.overallAchievingRate) > 100 ? 100 : parseInt(this.sellData.overallAchievingRate)) : 0
            this.sellData.stockAchievingRateNew = this.sellData.stockAchievingRate ? (parseInt(this.sellData.stockAchievingRate) > 100 ? 100 : parseInt(this.sellData.stockAchievingRate)) : 0
            this.realArr = [parseFloat(this.sellData.overallReach).toFixed(0), parseFloat(this.sellData.stockReach).toFixed(0), parseFloat(this.sellData.incrementReach).toFixed(0)]
            this.targetArr = [parseFloat(this.sellData.overallTarget).toFixed(0), parseFloat(this.sellData.stockTarget).toFixed(0), parseFloat(this.sellData.incrementTarget).toFixed(0)]
            this.markArr = [parseFloat(this.sellData.overallAchievingRate).toFixed(0), parseFloat(this.sellData.stockAchievingRate).toFixed(0), parseFloat(this.sellData.incrementAchievingRate).toFixed(0)]
            console.log(this.markArr)
            this.drawaddPlat()
        },
        async hexoList () {
            const params = {
                companyCode: this.params.companyCode,
                regionCode: this.params.regionCode,
                subsectionCode: this.params.subsectionCode,
                startDate: this.params.startDate,
                endDate: this.params.endDate

            }
            const { data } = await hexoList(params)
            this.companySaleBOList = data.data.companySaleBOList
            this.companySaleBOList.map((value, index) => {
                if (index < 3) {
                    value.imgurl = require('../../../assets/images/img_' + index + '.png')
                }
                value.sale = parseFloat(value.sale)
                return value
            })
            this.hexoTime = (new Date()).getFullYear() + '-' +
                (((new Date()).getMonth() + 1 > 10 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1))) + '-' +
                '01' + '~' + data.data.date
        },
        drawaddPlat () {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(this.$refs.salechart)
            // 绘制图表
            let option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        var res = params[0].name
                        for (var i = 0, l = params.length; i < l; i++) {
                            if (params[i].seriesType === 'line') {
                                res += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : 0) + '%'
                            } else {
                                res += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '万'
                            }
                        }
                        return res
                    }
                },
                grid: {
                    containLabel: true
                },
                legend: {
                    data: ['实际', '目标', '达成']
                },
                xAxis: [{
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: ['整体', '存量', '增量']
                }],
                yAxis: [{
                    type: 'value',
                    min: 0,
                    position: 'right',
                    name: '单位：%',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false
                    }
                }, {
                    type: 'value',
                    min: 0,
                    position: 'left',
                    name: '单位：万',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false
                    }
                }],
                series: [{
                    name: '达成',
                    type: 'line',
                    label: {
                        // normal: {
                        //     show: true,
                        //     position: 'top'
                        // }.
                        normal: {
                            show: true,
                            formatter: '{c}%',
                            textStyle: {
                                fontSize: 12

                            },
                            position: 'right'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    'smooth': true,
                    lineStyle: {
                        width: 3,
                        color: '#13C2C2'
                    },
                    itemStyle: {
                        width: 0,
                        color: '#13C2C2'
                    },
                    data: this.markArr
                }, {
                    name: '实际',
                    type: 'bar',
                    yAxisIndex: 1,
                    barWidth: '40',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        width: 3,
                        color: '#1890FF'
                    },
                    data: this.realArr
                }, {
                    name: '目标',
                    type: 'bar',
                    yAxisIndex: 1,
                    barWidth: '40',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        width: 3,
                        color: '#FF7A45'
                    },
                    data: this.targetArr
                }]
            }
            this.myChart.setOption(option)
        }
    }
}
</script>

<style lang="scss" scoped>
.red {
    background: #ff7875;
}
.org {
    background: #ff7875;
}
.green {
    background: #5cdbd3;
}
.sale {
    border: 1px solid #efeff4;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    // overflow: scroll;
    .sale-left {
        flex: 2;
        border-right: 1px solid #efeff4;
    }
    .sale-right {
        flex: 1;
    }
}

.redspan {
    color: #ff4d4f;
}
.sale-l-top {
    .sale-wrap-title {
        height: 60px;
        display: flex;
        border-bottom: 1px solid #efeff4;
        align-items: center;
        span {
            flex-grow: 1;
            text-align: center;
        }
    }
    .sale-wrap {
        height: 60px;
        border-bottom: 1px solid #efeff4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            font-size: 25px;
            flex-grow: 1;
            flex-basis: 25%;
            text-align: center;
            line-height: 40px;
            &:first-child {
                font-size: 16px;
                color: #595959;
            }
            // &:last-child {
            //     color: #ff4d4f;
            // }
        }
    }
}
.sale-l-bottom {
    padding-top: 20px;
}
.sale-right {
    position: relative;
    .tooltip {
        top: 10px;
        right: 10px;
        font-size: 23px;
        color: #b6b7bb;
        position: absolute;
    }
    .sale-hero-title {
        height: 229px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-bottom: 1px solid #efeff4;
        strong {
            margin-top: 7px;
            font-size: 20px;
            color: #262626;
        }
        p {
            font-size: 12px;
            color: #595959;
        }
        img {
            width: 122px;
            height: 112px;
        }
    }
    .sale-box {
        height: 420px;
        overflow-y: scroll;
    }
    .sale-hero {
        .img-box {
            width: 48px;
            height: 60px;
            display: block;
            margin: 34px 28px 34px 10%;
            font-size: 24px;
            line-height: 60px;
            text-align: center;
            color: #b6b7bb;
        }
        display: flex;
        height: 100px;
        flex-direction: row;
        border-bottom: 1px solid #efeff4;
        align-items: center;
        img {
            width: 48px;
            height: 60px;
            display: block;
            margin: 34px 28px 34px 10%;
        }
        .heroprocess {
            flex-grow: 1;
            margin-right: 10%;
            strong {
                font-size: 20px;
                color: #262626;
                font-weight: 500;
            }
            p {
            }
        }
    }
}
</style>

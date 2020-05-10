<template>
    <div class="page-body">
        <div class="title">
            统计说明
            <span>?</span>
        </div>
        <div class="container page-body-cont">
            <div class="wrapper-chart">
                <div class="time">2019-09-05 - 2019-09-05</div>
                <div class="chart" ref="barChart" style="width: 580px;height: 400px"></div>
            </div>
            <div class="tips">
                <div class="sub-title">
                    消息详情
                </div>
                <div>
                    {{cloudSendMessageDetailChart.content}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import { mapActions, mapGetters } from 'vuex'
const barOption = {
    xAxis: {
        type: 'category',
        data: ['目标用户', '送达用户', '打开用户', '转化率']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#ddd'
            }
        },
        padding: [5, 10],
        textStyle: {
            color: '#ffffff'
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
    },
    series: {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: '#00ccff'
        },
        itemStyle: {
            normal: {
                color: '#00ccff'
            }
        }
    }
}
export default {
    name: 'sendMessageDetail',
    data () {
        return {
            id: ''
        }
    },
    computed: {
        ...mapGetters({
            cloudSendMessageDetailChart: 'cloudSendMessageDetailChart'
        })
    },
    methods: {
        ...mapActions({
            findCloudSendMessageDetailChart: 'findCloudSendMessageDetailChart',
            findCloudAlarmChart: 'findCloudAlarmChart'
        })
    },
    async mounted () {
        // getCloudSendMessageDetailChart
        this.id = this.$route.query.id
        await this.findCloudSendMessageDetailChart({ id: this.id })
        console.log(this.cloudSendMessageDetailChart)
        barOption.series.data = [
            this.cloudSendMessageDetailChart.pushCount,
            this.cloudSendMessageDetailChart.receivedCount,
            this.cloudSendMessageDetailChart.openedCount,
            this.cloudSendMessageDetailChart.deletedCount
        ]
        echarts.init(this.$refs.barChart).setOption(barOption)
    }
}
</script>

<style scoped lang="scss">
.title{
    padding: 20px 12px;
    span{
        border: 1px solid #666666;
        border-radius: 50%;
        color: #666666;
        width: 16px;
        height: 16px;
        display: inline-block;
        text-align: center;
        font-size: 12px;
    }
}
    .container{
        display: flex;
        .wrapper-chart {
            margin: 20px;
        }
        .sub-title{
            padding: 20px 0;
        }
    }
</style>

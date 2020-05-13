<template>
    <div class="page-body">
        <div class="title">
            统计说明
            <span>?</span>
        </div>
        <div class="container page-body-cont">
            <div class="wrapper-chart">
                <div class="time">{{Date.now() | formatDate('YYYY-MM-DD')}} - {{cloudSendMessageDetailChart.pushTime | formatDate('YYYY-MM-DD')}}</div>
                <div class="chart" ref="barChart" style="width: 580px;height: 400px"></div>
            </div>
            <div class="tips">
                <div class="sub-title">
                    消息详情
                </div>
                <div>
                    <p>
                        消息主题：{{cloudSendMessageDetailChart.theme}}
                    </p>
                    <p>
                        目标用户：
                        <span v-if="cloudSendMessageDetailChart.target == 1">所有用户</span>
                        <span v-if="cloudSendMessageDetailChart.target == 2">有效家庭的管理员</span>
                    </p>
                    <p>
                        消息通知内容：{{cloudSendMessageDetailChart.content}}
                    </p>
                    <p>
                        点击后打开：
                        <span v-if="cloudSendMessageDetailChart.redirectType == 1">应用</span>
                        <span v-if="cloudSendMessageDetailChart.redirectType == 2">应用内页面</span>
                        <span v-if="cloudSendMessageDetailChart.redirectType == 3">h5页面</span>
                    </p>
                    <p>
                        推送时间：{{cloudSendMessageDetailChart.pushTime | formatDate}}
                    </p>
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
        data: ['目标用户', '送达用户', '打开用户', '清除用户']
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

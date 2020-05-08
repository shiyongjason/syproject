<template>
    <div class="chart-wrap">
        <div class="chart-flex2" id="firstChart" ref="firstChart" style="height:500px"></div>
        <div class="chart-flex1" id="secondChart" ref="secondChart" style="height:500px"></div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'lineChart',
    props: ['lineOption', 'barOption'],
    data () {
        return {
            test: 1
        }
    },
    methods: {
        drawChart (option, id) {
            const chartDom = this.$refs[id]
            echarts.init(chartDom).setOption(option, true)
        }
    },
    watch: {
        lineOption (newVal, oldVal) {
            console.log(newVal)
            this.drawChart(newVal, 'firstChart')
        },
        barOption (newVal, oldVal) {
            this.drawChart(newVal, 'secondChart')
        }
    }
}
</script>

<style scoped lang="scss">
    .chart-wrap {
        display: flex;
        padding: 20px 10px;
        min-height: 500px;

        .chart-flex2 {
            flex: 2;
        }

        .chart-flex1 {
            flex: 1;
        }
    }
</style>

export const lineChartOption = function (source) {
    return {
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        dataset: {
            dimensions: ['comfortName', 'totalTime'],
            source: source
        },
        grid: {
            left: '0',
            right: '10%',
            bottom: '10',
            containLabel: true
        },
        xAxis: { name: '时长' },
        yAxis: { type: 'category' },
        series: [
            {
                type: 'bar',
                stack: 'chart',
                barWidth: 50,
                z: 3,
                label: {
                    normal: {
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ['#cca272', '#74608f', '#d7a02b', '#c8ba23']
                            return colorList[params.dataIndex]
                        }
                    }
                },
                encode: {
                    x: 'totalTime',
                    y: 'comfortName'
                }
            }
        ]
    }
}

export const ringChartOption = function (data) {
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: data.legend
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '10',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: data.series
    }
}

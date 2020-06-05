<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="page-tilte">好橙工台账</div>
            <div class="page-body-cont">
                <basicTable :tableData="tableData" :tableLabel="tableLabel" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 ::rowKey="rowKey" :isShowIndex='false'>
                    <template slot="type" slot-scope="scope">
                        {{onAccountType(scope.data.row.type)}}
                    </template>
                    <template slot="totalValue" slot-scope="scope">
                        {{scope.data.row.totalValue?fundMoneys(scope.data.row.totalValue):'-'}}
                    </template>
                    <template slot="retainValue" slot-scope="scope">
                        {{scope.data.row.retainValue?fundMoneys(scope.data.row.retainValue):'-'}}
                    </template>
                    <template slot="dataCollectValue" slot-scope="scope">
                        {{scope.data.row.dataCollectValue?fundMoneys(scope.data.row.dataCollectValue):'-'}}
                    </template>
                        <template slot="infoToBeImprovedValue" slot-scope="scope">
                        {{scope.data.row.infoToBeImprovedValue?fundMoneys(scope.data.row.infoToBeImprovedValue):'-'}}
                    </template>
                    <template slot="trustTrialValue" slot-scope="scope">
                        {{scope.data.row.trustTrialValue?fundMoneys(scope.data.row.trustTrialValue):'-'}}
                    </template>
                    <template slot="pendingLoanValue" slot-scope="scope">
                        {{scope.data.row.pendingLoanValue?fundMoneys(scope.data.row.pendingLoanValue):'-'}}
                    </template>
                    <template slot="toReturnLoanValue" slot-scope="scope">
                        {{scope.data.row.toReturnLoanValue?fundMoneys(scope.data.row.toReturnLoanValue):'-'}}
                    </template>
                    <template slot="cooperCloseValue" slot-scope="scope">
                        {{scope.data.row.cooperCloseValue?fundMoneys(scope.data.row.cooperCloseValue):'-'}}
                    </template>
                          <template slot="toBeSignedValue" slot-scope="scope">
                        {{scope.data.row.toBeSignedValue?fundMoneys(scope.data.row.toBeSignedValue):'-'}}
                    </template>
                    <template slot="cooperCompleteValue" slot-scope="scope">
                        {{scope.data.row.cooperCompleteValue?fundMoneys(scope.data.row.cooperCompleteValue):'-'}}
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button type="success" size="mini" plain @click="onLookproject(scope.data.row.id)">查看详情</el-button>
                    </template>
                </basicTable>
            </div>
            <div class="page-tilte">概览</div>
            <div class="page-body-cont">
                <div class="page-tabs">
                    <el-radio-group v-model="tabPosition" style="margin-bottom:20px" @change="handleClick">
                        <el-radio-button :label=1>项目数量</el-radio-button>
                        <el-radio-button :label=2>工程合同金额</el-radio-button>
                        <el-radio-button :label=3>设备总金额</el-radio-button>
                        <el-radio-button :label=4>赊销总金额</el-radio-button>
                    </el-radio-group>
                </div>
                <p>单位：{{barUnit}}</p>
                <div id="barchart" style="height:500px"></div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import { mapActions, mapGetters } from 'vuex'
import filters from '@/utils/filters.js'
export default {
    name: 'crmstatic',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 5
            },
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '按项目进度分类', prop: 'type' },
                { label: '合计', prop: 'totalValue' },
                { label: '蓄水阶段', prop: 'retainValue' },
                { label: '信息待完善', prop: 'infoToBeImprovedValue' },
                { label: '资料收集', prop: 'dataCollectValue' },
                { label: '立项阶段', prop: 'trustTrialValue' },
                { label: '待签约', prop: 'toBeSignedValue' },
                { label: '待放款', prop: 'pendingLoanValue' },
                { label: '待回款', prop: 'toReturnLoanValue' },
                { label: '合作关闭', prop: 'cooperCloseValue' },
                { label: '合作完成', prop: 'cooperCompleteValue' }
            ],
            rowKey: '',
            tabPosition: 1,
            typeAccount: ['项目数量', '工程项目总额', '设备金额', '赊销总金额'],
            barUnit: '个'
        }
    },
    components: {

    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxSubmitTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minSubmitTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        ...mapGetters('crmstatic', {
            projectData: 'projectData',
            projectStatic: 'projectStatic'
        })
    },
    async mounted () {
        this.searchList()
        this.onFindBar(1)
    },

    methods: {
        ...mapActions('crmstatic', {
            findProjetpage: 'findProjetpage',
            findProjetstatic: 'findProjetstatic'

        }),
        async  searchList () {
            const { ...params } = this.queryParams
            await this.findProjetpage(params)
            this.tableData = this.projectData
        },
        async onFindBar (val) {
            await this.findProjetstatic(val)
            this.drawBar(this.projectStatic)
        },
        handleClick (tab) {
            this.barUnit = this.tabPosition == 1 ? '个' : '元'
            this.onFindBar(this.tabPosition)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        onAccountType (type) {
            return type && this.typeAccount[type - 1]
        },
        fundMoneys (val) {
            if (val) {
                return filters.money(val)
            }
        },
        drawBar (data) {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('barchart'))
            var chartData = data
            let itemValue = []
            let bgData = []
            // 取出所有数据最大值,作为柱形图背景数据
            chartData.forEach(function (items, index) {
                itemValue.push(items.value)
            })
            let maxdata = Math.max.apply(null, itemValue)
            // // console.log("最大值为 %c"+ maxdata, "color:red");
            for (var i = 0; i < chartData.length; i++) {
                bgData.push(maxdata) // 取得最大值
            }
            // 图表
            let option = {
                title: {
                    show: false
                },
                tooltip: {
                    trigger: 'axis', // axis , item
                    axisPointer: {
                        type: '' // 'line' | 'shadow'
                    },
                    padding: 0,
                    textStyle: {
                        fontSize: 16,
                        fontFamily: 'Simsun',
                        color: '#fff'
                    },
                    formatter: (params, ticket, callback) => {
                        var res = '<table class="charts_tip">' +
                            '<thead>' +
                            '<tr><th colspan="2" style="padding:2px 5px; background:' + params[1].color + '">' + params[1].name + '</th></tr>' +
                            '</thead>' +
                            '<tbody>' +
                            '<tr><td class="cc" style="padding:2px 5px;">' + params[1].name + '</td><td>' + this.fundMoneys(params[1].value) + this.barUnit + '</td></tr>' +
                            '</tbody>' +
                            '</table>'
                        setTimeout(function () {
                            callback(ticket, res) // 仅为了模拟异步回调
                        }, 3000)
                        return res
                    }
                },
                legend: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                grid: {
                    top: '5%',
                    left: '10%',
                    right: '30%',
                    bottom: '5%',
                    containLabel: false
                },
                xAxis: [{
                    max: bgData[0],
                    type: 'value',
                    position: 'bottom',
                    boundaryGap: true, // 边界间隙
                    min: 0,
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: '#0d073d',
                            fontSize: 16
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, .5)'
                        }
                    },
                    axisTick: {
                        show: false // 坐标轴小标记
                    },
                    splitLine: {
                        show: false, // 是否显示分割线
                        lineStyle: {
                            color: '#0d073d', // 纵向向网格线颜色
                            type: 'dashed',
                            width: 1
                        }
                    }
                }],
                yAxis: [{
                    type: 'category',
                    inverse: true,
                    position: 'left',
                    axisLabel: {
                        textStyle: {
                            color: '#8aa5ab',
                            fontSize: 15
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#e5e5e5', // 纵坐标颜色
                            width: 1
                        }
                    },
                    axisTick: {
                        show: false // 坐标轴小标记
                    },
                    splitLine: {
                        show: false
                    },
                    data: (function (data) {
                        var arr = []
                        data.forEach(function (items) {
                            arr.push(items.name)
                        })
                        return arr
                    })(chartData) // 载入y轴数据
                },
                {
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        inside: false,
                        textStyle: {
                            color: '#000',
                            fontSize: '14',
                            fontFamily: 'PingFangSC-Regular',
                            zIndex: '999'
                        },
                        formatter: (params) => {
                            return this.fundMoneys(params)
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: chartData
                }
                ],
                series: [{
                    type: 'bar',
                    barGap: '-100%',
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    barWidth: 40,
                    itemStyle: {
                        normal: {
                            color: '#e5e5e5' // 背景图表颜色
                        }
                    },
                    data: bgData, // 载入背景数据
                    z: 0
                }, {
                    type: 'bar',
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#000',
                                fontSize: 16
                            },
                            formatter: '{c}'
                            // formatter: function (params) {
                            //     console.log(params)
                            //     var strVal = 0
                            //     chartData.forEach(function (v, i, array) {
                            //         if (params.name == v.name) {
                            //             strVal = v.value
                            //             params.data = v.test
                            //         }
                            //     })
                            //     return strVal + '%'
                            // }
                        }
                    },
                    barWidth: 40,
                    itemStyle: {
                        normal: {
                            // color:'#ffc938', // 图表颜色
                            color: function (params) { // 颜色定制显示（按顺序）
                                var colorList = ['#A47CB7', '#7BA1D2', '#63CBE0', '#F69573', '#F3BA5B', '#F3EB57', '#91E56E']
                                return colorList[params.dataIndex]
                            }
                            // barBorderRadius: [0, 17, 17, 0]  //圆角
                        }
                    },
                    data: chartData, // 载入数据(内含自定义参数)
                    z: 1
                }]
            }

            // 使用刚指定的配置项和数据显示图表
            this.myChart.setOption(option, true)
        }
    }
}
</script>
<style lang="scss" scoped>
.page-tilte {
    font-size: 18px;
    padding: 10px;
}
</style>
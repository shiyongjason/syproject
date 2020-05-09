<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>舒适度场景</span>
        </div>
        <div class="page-body-cont smart-time">
            <div>
                <h3>总运行时长: {{totalTime ? totalTime : '0'}} 小时</h3>
            </div>
            <div class="echart-time">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="echartsParams.startDate" :picker-options="pickerOptionsStart('echartsParams')">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="echartsParams.endDate" :picker-options="pickerOptionsEnd('echartsParams')">>
                </el-date-picker>
                <el-button type="primary" class="ml20" @click="onFindRuntimeR()">
                    查询
                </el-button>
            </div>
        </div>
        <div class="page-body-cont chart-wrapper">
            <div class="ring-chart" ref="ringChartOption" style="height: 400px;width: 500px;float: left"></div>
            <div class="line-chart" ref="lineChartOption" style="height: 400px;width: 600px;float: left"></div>
        </div>
        <div class="page-body-cont query-cont spanflex">
            <span>家庭设备明细</span>
        </div>
        <!-- 报表 -->
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input v-model="homeParams.phone" placeholder="输入手机号" maxlength="11"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">注册时间：</div>
                <div class="query-col-input">
                    <el-date-picker type="date" :editable="false" :clearable="false" v-model="homeParams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('homeParams')">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker type="date" :editable="false" :clearable="false" v-model="homeParams.endDate" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('homeParams')">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onSearch">
                    查询
                </el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="paginationData" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import echarts from 'echarts'
import { lineChartOption, ringChartOption } from './const'
import moment from 'moment'

export default {
    name: 'comfortable',
    data () {
        return {
            echartsParams: {
                startDate: '',
                endDate: ''
            },
            searchParams: {},
            homeParams: {
                startDate: '',
                endDate: '',
                phone: ''
            },
            totalTime: '',
            tableLabel: [
                { label: '统计时间', prop: 'date' },
                { label: '手机号', prop: 'phone' },
                { label: '所在房间', prop: 'roomName' },
                { label: '总运行时长（h）', prop: 'totalElapsedTime' },
                { label: '恒温恒湿时长（h）', prop: 'coldElapsedTime' },
                { label: '智能调温时长（h)', prop: 'hotElapsedTime' },
                { label: '智能除湿时长（h)', prop: 'loseWetElapsedTime' }
            ]
        }
    },
    computed: {
        ...mapState({
            tableData: state => {
                return state.cloudmanage.comfortableSceneList
            },
            paginationData: state => {
                return state.cloudmanage.comfortableSceneListPagination
            },
            shy: state => {
                return state.cloudmanage.getCloudHomeComfortStatisticsList
            }
        })
    },
    mounted () {
        this.onSearch()
        this.onFindRuntimeR()
    },
    methods: {
        ...mapActions({
            findComfortableSceneList: 'findComfortableSceneList',
            findCloudHomeComfortStatisticsList: 'findCloudHomeComfortStatisticsList'
        }),
        pickerOptionsStart (key) {
            return {
                disabledDate: time => {
                    let endDateVal = this[key].endDate
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd (key) {
            return {
                disabledDate: time => {
                    let beginDateVal = this[key].startDate
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        onCurrentChange (val) {
            this.paginationData.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.onQuery()
        },
        onSearch () {
            this.searchParams = { ...this.homeParams }
            this.onQuery()
        },
        onQuery () {
            const params = {
                ...this.searchParams,
                ...this.paginationData
            }
            this.findComfortableSceneList(params)
        },
        async onFindRuntimeR () {
            const params = {
                ...this.echartsParams
            }
            this.totalTime = await this.findCloudHomeComfortStatisticsList(params)
            echarts.init(this.$refs.ringChartOption).setOption(ringChartOption(this.handleData(this.shy)))
            echarts.init(this.$refs.lineChartOption).setOption(lineChartOption(this.shy))
        },
        handleData (data) {
            let legend = []
            let xAxis = []
            data.map((i, d) => {
                i.name = i.comfortName
                i.type = 'line'
                legend.push(i.comfortName)
                let valueArr = []
                i.comfortReports.map((v) => {
                    if (d === 0) {
                        xAxis.push(moment(v.dateTime).format('MM-DD'))
                    }
                    valueArr.push(v.value)
                })
                i.data = valueArr
            })
            return { legend, xAxis, series: data }
        }
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
    }
}
.smart-time {
    display: flex;
    padding: 30px 12px;
    div {
        display: flex;
        flex: 1;
        align-items: center;
    }
}
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.chart-wrapper {
    display: flex;
    justify-content: space-around;
}
</style>

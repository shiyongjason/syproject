<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>告警分析</span>
        </div>
        <div class="page-body-cont" style="overflow: hidden">
            <div class="ring-chart" ref="ringChartOption" style="height: 300px;width: 300px;float: left"></div>
            <div class="line-chart" ref="lineChartOption" style="height: 300px;width: 300px;float: left"></div>
        </div>
        <div class="page-body-cont query-cont spanflex">
            <span>告警明细</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">设备ID：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.subDevId" maxlength="20" placeholder="输入设备ID"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">管理员手机号码：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.managerPhone" maxlength="11" placeholder="输入管理员手机号码"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onExport">导出</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudAlarmList" :pagination="cloudAlarmPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="false">
                <template slot="downlineInterval" slot-scope="scope">
                    {{scope.data.row.downlineInterval + '分钟'}}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { downloadCloudAlarmList } from '../api/index'
import echarts from 'echarts'
const ringChartOption = {
    series: [
        {
            name: '告警离线时长分布',
            type: 'pie',
            radius: ['0', '85%'],
            label: {
                show: false,
                position: 'center'
            },
            data: []
        }
    ]
}
const lineChartOption = {}

export default {
    name: 'alarm',
    computed: {
        ...mapGetters({
            cloudAlarmList: 'cloudAlarmList',
            cloudAlarmPagination: 'cloudAlarmPagination'
        })
    },
    data () {
        return {
            queryParams: {
                subDevId: '',
                managerPhone: '',
                pageSize: 10,
                pageNumber: 1
            },
            tableLabel: [
                { label: '家庭名称', prop: 'homeName' },
                { label: '管理员手机号', prop: 'managerPhone' },
                { label: '网关号', prop: 'deviceId' },
                { label: '设备ID', prop: 'subDevId' },
                { label: '设备类型', prop: 'subType' },
                { label: '离线时间', prop: 'downlineTime' },
                // { label: '休眠时间', prop: 'homeSleepTime', formatters: 'dateTime' },
                { label: '上线时间 ', prop: 'uplineTime' },
                { label: '离线时长', prop: 'downlineInterval' }
            ]
        }
    },
    methods: {
        ...mapActions({
            findCloudAlarmList: 'findCloudAlarmList'
        }),
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        async onQuery () {
            await this.findCloudAlarmList(this.queryParams)
        },
        onExport () {
            downloadCloudAlarmList()
        }
    },
    async mounted () {
        this.onQuery()
        echarts.init(this.$refs.ringChartOption).setOption(ringChartOption)
        echarts.init(this.$refs.lineChartOption).setOption(lineChartOption)
    }
}
</script>

<style scoped>
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
</style>

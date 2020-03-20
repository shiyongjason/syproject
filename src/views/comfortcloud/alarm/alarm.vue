<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>告警监控</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">设备ID：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.queryId" maxlength="20" placeholder="输入设备ID"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">管理员手机号码：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.queryPhone" maxlength="11" placeholder="输入管理员手机号码"></el-input>
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
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudAlarmList" :pagination="cloudAlarmPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="false">
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { iotUrl } from '@/api/config'

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
                queryId: '',
                queryPhone: '',
                pageSize: 10,
                pageNumber: 1
            },
            pagination: {
                total: 11,
                pageSize: 10,
                pageNumber: 1
            },
            tableLabel: [
                { label: '家庭名称', prop: 'homeName' },
                { label: '管理员手机号', prop: 'homePhone' },
                { label: '网管号', prop: 'homeNumber1' },
                { label: '设备ID', prop: 'homeID1' },
                { label: '设备类型', prop: 'homeType' },
                { label: '离线时间', prop: 'homeUnOnlineTime', formatters: 'dateTime' },
                { label: '休眠时间', prop: 'homeSleepTime', formatters: 'dateTime' },
                { label: '上线时间 ', prop: 'homeOnlineTime', formatters: 'dateTime' },
                { label: '离线时长', prop: 'homeOnlineTimeLonger' }

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
            location.href = iotUrl + '/download?queryId=10&queryPhone=1'
        }
    },
    async mounted () {
        this.onQuery()
    }
}
</script>

<style scoped>
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
</style>

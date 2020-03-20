<template>
    <div class="page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>消息推送</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">消息主题：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.queryId" maxlength="20" placeholder="输入消息主题"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onCreate">新建</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="false">
            </basicTable>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sendMessage',
    data () {
        return {
            queryParams: {
                queryId: '',
                queryPhone: ''
            },
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '创建时间', prop: 'homeName' },
                { label: '消息主题', prop: 'phone' },
                { label: '目标用户', prop: 'memberCount' },
                { label: '推送数', prop: 'wuLianIotId' },
                { label: '送达数', prop: 'linkIotId' },
                { label: '推送状态', prop: 'deviceCount' },
                { label: '推送时间', prop: 'roomCount' }
            ]
        }
    },
    methods: {
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onQuery () {

        }
    }
}
</script>

<style scoped>
    .spanflex {
        font-size: 16px;
        padding-bottom: 10px;
    }
</style>

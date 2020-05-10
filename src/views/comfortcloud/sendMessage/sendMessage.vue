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
                              v-model="queryParams.theme" maxlength="20" placeholder="输入消息主题"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery(queryParams)">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="goEdit('add')">新建</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="cloudSendMessageList"
                        :pagination="cloudSendMessagePagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'
                        @onSortChange="onSortChange"
                        :isAction="true" :actionMinWidth='80'>
                <template slot="target" slot-scope="scope">
                    {{scope.data.row.target === 1 ? "所有用户": "有效家庭的管理员"}}
                </template>
                <template slot="redirectType" slot-scope="scope">
                    <span v-if="scope.data.row.redirectType === 1">应用</span>
                    <span v-if="scope.data.row.redirectType === 2">应用内页面</span>
                    <span v-if="scope.data.row.redirectType === 3">h5页面</span>
                </template>
                <template slot="status" slot-scope="scope">
                    {{scope.data.row.status === 1 ? "已推送": "待推送"}}
                </template>
                <template slot="action" slot-scope="scope">
                    <template v-if="scope.data.row.status !== 1">
                        <el-button class="orangeBtn" @click="goEdit('edit',scope.data.row.id)">编辑</el-button>
                        <el-button class="orangeBtn" @click="onDelete(scope.data.row.id)">删除</el-button>
                    </template>
                    <template v-else>
                        <el-button class="orangeBtn" @click="goDetail(scope.data.row.id)">效果</el-button>
                    </template>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { deleteCloudSendMessage } from '../api'

export default {
    name: 'sendMessage',
    data () {
        return {
            queryParams: {
                pushTimeSortType: '',
                createTimeSortType: '',
                theme: '',
                pageSize: 10,
                pageNumber: 1
            },
            tableLabel: [
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', sortable: true },
                { label: '消息主题', prop: 'theme' },
                { label: '目标用户', prop: 'target' },
                { label: '推送数', prop: 'pushCount' },
                { label: '送达数', prop: 'receivedCount' },
                { label: '推送状态', prop: 'status' },
                { label: '推送时间', prop: 'pushTime', formatters: 'dateTime', sortable: true }
            ]
        }
    },
    computed: {
        ...mapGetters({
            cloudDict: 'cloudDict',
            cloudSendMessageList: 'cloudSendMessageList',
            cloudSendMessagePagination: 'cloudSendMessagePagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery(this.queryParams)
        },
        goEdit (type, id) {
            if (type === 'edit') {
                this.$router.push({
                    path: '/comfortCloud/sendMessageEdit',
                    query: {
                        id: id
                    }
                })
            } else {
                this.$router.push('/comfortCloud/sendMessageEdit')
            }
        },
        async onDelete (id) {
            const params = {
                id: id,
                operateUserName: this.userInfo.employeeName
            }
            this.$confirm('该消息为待推送，是否确认要删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await deleteCloudSendMessage(params)
                    await this.onQuery(this.queryParams)
                    this.$message.success('删除成功')
                } catch (e) {
                    this.$message.error('删除失败，请稍后重试')
                }
            })
        },
        ...mapActions({
            findCloudDict: 'findCloudDict',
            onQuery: 'findCloudSendMessageList'
        }),
        onSortChange (val) {
            if (val.prop === 'pushTime') {
                if (val.order) {
                    this.queryParams.pushTimeSortType = val.order === 'descending' ? '2' : '1'
                } else {
                    this.queryParams.pushTimeSortType = ''
                }
                this.queryParams.createTimeSortType = ''
            } else {
                if (val.order) {
                    this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                } else {
                    this.queryParams.createTimeSortType = ''
                }
                this.queryParams.pushTimeSortType = ''
            }
            this.onQuery(this.queryParams)
        },
        goDetail (id) {
            this.$router.push({
                path: '/comfortCloud/sendMessageDetail',
                query: {
                    id: id
                }
            })
        }
    },
    mounted () {
        this.onQuery(this.queryParams)
    }
}
</script>

<style scoped>
    .spanflex {
        font-size: 16px;
        padding-bottom: 10px;
    }
</style>

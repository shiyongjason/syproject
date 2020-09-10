<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>广告弹窗</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">标题：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.title" maxlength="20" placeholder="输入标题"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                <el-button type="primary" class="ml20" @click="onCreate">新建</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="adPopList" :pagination="adPopPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='80'>
                <template slot="status" slot-scope="scope">
                    <el-switch v-model="scope.data.row.status" @change='onChangeForced(scope.data.row)' active-color="#13ce66">
                    </el-switch>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row.id)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { setAdPopStatus, deleteAdPop } from '../api/index'
export default {
    name: 'ad',
    data () {
        return {
            queryParams: {
                title: '',
                pageNumber: 1,
                pageSize: 10
            },
            searchParams: {},
            tableLabel: [
                { label: '标题', prop: 'title' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '是否生效', prop: 'status' }
            ]
        }
    },
    computed: {
        ...mapGetters({
            adPopList: 'adPopList'
        }),
        ...mapState({
            userInfo: state => state.userInfo,
            adPopPagination: state => state.cloudmanage.adPopPagination
        })
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            onQuery: 'getAdPopList'
        }),
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery(this.searchParams)
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        onCreate () {
            this.$router.push({ path: '/comfortCloud/operationsManagement/adPopDetail' })
        },
        onEdit (id) {
            this.$router.push({ path: '/comfortCloud/operationsManagement/adPopDetail', query: { id } })
        },
        async onChangeForced (row) {
            const params = {
                id: row.id,
                operator: this.userInfo.employeeName,
                status: row.status ? 1 : 0
            }
            await setAdPopStatus(params)
            this.onQuery(this.searchParams)
        },
        onDelete (row) {
            this.$confirm(`该广告${row.status ? '还在生效中，删除后客户端无法查询' : '还未生效'}，是否继续删除`, '删除提示').then(async () => {
                await deleteAdPop({ id: row.id, operateUserName: this.userInfo.employeeName })
                this.onQuery(this.searchParams)
            }).catch(() => {})
        }
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.upload-fault {
    margin-top: 30px;
    margin-bottom: 20px;
}
.download-template {
    margin-bottom: 30px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
.fault-code-edit {
    /deep/.el-dialog__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        min-height: 100px;
    }
}
</style>

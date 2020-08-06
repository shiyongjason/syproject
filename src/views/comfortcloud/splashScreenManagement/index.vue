<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>闪屏管理</span>
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
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="splashScreenList" :pagination="splashScreenPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='80'>
                <template slot="status" slot-scope="scope">
                    <el-switch v-model="scope.data.row.status" @change='onChangeForced(scope.data.row)' active-color="#13ce66">
                    </el-switch>
                </template>
                <template slot="statusName" slot-scope="scope">
                    <span @click="onActive(scope.data.row)" :class="scope.data.row.activityId?'colred':''">{{scope.data.row.statusName}}</span>
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
import { setSplashScreenStatus, deleteSplashScreen } from '../api/index'
export default {
    name: 'equipmentError',
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
                { label: '创建时间', prop: 'createTime' },
                { label: '关联活动', prop: 'statusName' },
                { label: '是否生效', prop: 'status' }
            ]
        }
    },
    computed: {
        ...mapGetters({
            splashScreenList: 'splashScreenList'
        }),
        ...mapState({
            userInfo: state => state.userInfo,
            splashScreenPagination: state => state.cloudmanage.splashScreenPagination
        })
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            onQuery: 'getSplashScreenList'
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
            this.$router.push({ path: '/comfortCloud/operationsManagement/splashScreenDetail' })
        },
        onEdit (id) {
            this.$router.push({ path: '/comfortCloud/operationsManagement/splashScreenDetail', query: { id } })
        },
        onActive (row) {
            row.activityId && this.$router.push({ path: '/comfortcloud/operationsManagement/cloudActedit', query: { id: row.activityId } })
        },
        async onChangeForced (row) {
            const params = {
                id: row.id,
                operator: this.userInfo.employeeName,
                status: row.status ? 1 : 0
            }
            await setSplashScreenStatus(params)
            this.onQuery(this.searchParams)
        },
        onDelete (row) {
            this.$confirm(`改活动${row.statusName}，是否继续删除`, '删除提示').then(async () => {
                await deleteSplashScreen({ id: row.id, operateUserName: this.userInfo.employeeName })
                this.onQuery(this.searchParams)
            })
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

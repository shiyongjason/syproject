<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">活动标题：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.title" placeholder="请输入活动标题" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch()">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onAddcloud()">新建活动</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="title" slot-scope="scope">
                    <p @click="onShowHome(scope.data.row)" class="colred">{{scope.data.row.title}}</p>
                </template>
                <template slot="effectived" slot-scope="scope">
                    <span :class="scope.data.row.effectived==='1'?'colred':''">{{scope.data.row.effectived==='1'?'已生效':'未生效'}}</span>
                </template>
                <template slot="showedTemp" slot-scope="scope">
<!--                    scope.data.row.showed -->
                    <el-switch
                        v-model="scope.data.row.showedTemp"
                        @change="updateCloudActive(scope.data.row)"
                        active-color="#13ce66">
                    </el-switch>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDeleteAct(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
        <H5Preview :activeUrl="H5Preview" :loading="loading"  @hideLoading="loading =false" @clearUrl="H5Preview = ''"/>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { deleteActivity, editActdetail } from '../api'
import { clearCache, newCache } from '@/utils/index'
import { iotUrl } from '@/api/config'
import H5Preview from '../../../components/h5Preview'
export default {
    name: 'cloudlist',
    components: {
        H5Preview
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                title: '',
                deleted: 1,
                source: 1
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '活动标题', prop: 'title' },
                { label: '创建时间', prop: 'createTime' },
                { label: '生效时间', prop: 'effectiveTime' },
                { label: '状态', prop: 'effectived' },
                { label: '是否展示在活动轮播', prop: 'showedTemp' }
            ],
            H5Preview: '',
            loading: true
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudActicitylist: 'cloudActicitylist'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        // this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    beforeRouteEnter (to, from, next) {
        newCache('cloudlist')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'cloudActedit') {
            clearCache('cloudlist')
        }
        next()
    },
    activated () {
        this.onQuery()
    },
    methods: {
        ...mapActions({
            findcloudActList: 'findcloudActList'
        }),
        async onQuery () {
            this.tableData = []
            await this.findcloudActList(this.searchParams)
            this.cloudActicitylist.records.forEach(value => {
                value.showedTemp = value.showed === 0
            })
            this.tableData = this.cloudActicitylist.records
            this.pagination = {
                pageNumber: this.cloudActicitylist.current,
                pageSize: this.cloudActicitylist.size,
                total: this.cloudActicitylist.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        async onDeleteAct (val) {
            if (val.effectived == 1) {
                this.$confirm('该活动还在生效中，删除后客户端无法查询，是否继续删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await deleteActivity(val.id)
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    })
                    this.onQuery()
                })
            } else {
                this.$confirm('该活动还未生效，是否继续删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await deleteActivity(val.id)
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    })
                    this.onQuery()
                })
            }
        },
        onAddcloud (val) {
            this.$router.push({ path: '/comfortcloud/cloudActedit', query: {} })
        },
        onEdit (val) {
            this.$router.push({ path: '/comfortcloud/cloudActedit', query: { id: val.id } })
        },
        onShowHome (val) {
            this.H5Preview = iotUrl + '/iot/actionDetail?articleId=' + val.id
        },
        async updateCloudActive (row) {
            const params = { ...row }
            params.showedTemp ? params.showed = 0 : params.showed = 1
            try {
                await editActdetail(params)
                this.onQuery()
                this.$message.success('操作成功')
            } catch (e) {
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
        &:first-child {
            font-size: 16px;
        }
        &:last-child {
            text-align: right;
        }
    }
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
/deep/.el-dialog__body {
    padding-top: 10px;
}
</style>

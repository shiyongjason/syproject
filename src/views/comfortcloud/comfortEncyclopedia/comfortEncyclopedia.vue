<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>舒适小百科</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">文章标题：</div>
                <div class="query-col-input">
                                        <el-input type="text"
                                                  v-model="queryParams.title" maxlength="20" placeholder="输入百科文章标题"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery(queryParams)">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="gotoCreatePlay">新建文章</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudComfortEncyclopediaList" :pagination="cloudComfortEncyclopediaListPagination" @onCurrentChange='onCurrentChange'
                        isShowIndex @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='80'>
                <template slot="title" slot-scope="scope">
                    <p @click="onShowHome(scope.data.row)" class="colred">{{scope.data.row.title}}</p>
                </template>
                <template slot="status" slot-scope="scope">
                    {{scope.data.row.status === 1 ? '已生效': '未生效'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="goEdit(scope.data.row.id)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
        <H5Preview :activeUrl="H5Preview" :loading="loading"  @hideLoading="loading =false" @clearUrl="H5Preview = ''"/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { iotUrl } from '@/api/config'
import H5Preview from '../../../components/h5Preview/index'
import { deleteCloudComfortEncyclopedia } from '../api/index'
export default {
    name: 'smartPlay',
    components: {
        H5Preview
    },
    data () {
        return {
            tableData: [],
            queryParams: {
                title: '',
                pageNumber: 1,
                pageSize: 10
            },
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '文章标题', prop: 'title' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '生效时间', prop: 'effectiveTime', formatters: 'dateTime' },
                { label: '状态', prop: 'status' }
            ],
            H5Preview: '',
            loading: true
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            cloudComfortEncyclopediaList: state => state.cloudmanage.cloudComfortEncyclopediaList,
            cloudComfortEncyclopediaListPagination: state => state.cloudmanage.cloudComfortEncyclopediaListPagination
        })
    },
    methods: {
        ...mapActions({
            onQuery: 'findCloudComfortEncyclopediaList'
        }),
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery(this.queryParams)
        },
        gotoCreatePlay () {
            this.$router.push({
                path: '/comfortCloud/comfortEncyclopediaEdit'
            })
        },
        goEdit (id) {
            this.$router.push({
                path: '/comfortCloud/comfortEncyclopediaEdit',
                query: {
                    id: id
                }
            })
        },
        async onDelete (row) {
            const params = {
                id: row.id,
                operateUserName: this.userInfo.employeeName
            }
            let tips = ''
            if (row.status == 1) {
                tips = '该文章还在生效中，删除后客户端无法查询，是否继续删除？'
            } else {
                tips = '该文章还未生效，是否继续删除？'
            }
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await deleteCloudComfortEncyclopedia(params)
                    this.$message.success('删除成功')
                    this.onQuery(this.queryParams)
                } catch (e) {
                    this.$message.error('删除失败，请稍后重试')
                }
            })
        },
        onShowHome (val) {
            this.H5Preview = iotUrl + '/iot/articledetail/?articleId=' + val.id
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
    .colred {
        color: #ff7a45;
        cursor: pointer;
    }
</style>

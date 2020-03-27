<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>智能玩法</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">玩法标题：</div>
                <div class="query-col-input">
                                        <el-input type="text"
                                                  v-model="queryParams.title" maxlength="20" placeholder="输入玩法标题"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery(queryParams)">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="gotoCreatePlay">新建玩法</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudSmartPlayList" :pagination="cloudSmartPlayPagination" @onCurrentChange='onCurrentChange'
                        isShowIndex @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='80'>
                <template slot="title" slot-scope="scope">
                    <p @click="onShowHome(scope.data.row)" class="colred">{{scope.data.row.title}}</p>
                </template>
                <template slot="status" slot-scope="scope">
                    {{scope.data.row.status === 1 ? '已生效': '未生效'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="goEdit(scope.data.row.id)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row.id)">删除</el-button>
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
import { deleteCloudSmartPlay } from '../api/index'
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
                { label: '玩法标题', prop: 'title' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '生效时间', prop: 'effectiveTime', formatters: 'dateTime' },
                { label: '状态', prop: 'status' }
            ],
            H5Preview: '',
            loading: true
        }
    },
    computed: {
        ...mapGetters({
            cloudSmartPlayList: 'cloudSmartPlayList',
            cloudSmartPlayPagination: 'cloudSmartPlayPagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            onQuery: 'findCloudSmartPlayList'
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
                path: '/comfortCloud/smartPlayEdit'
            })
        },
        goEdit (id) {
            this.$router.push({
                path: '/comfortCloud/smartPlayEdit',
                query: {
                    id: id
                }
            })
        },
        async onDelete (id) {
            const params = {
                id: id,
                operateUserName: this.userInfo.employeeName
            }
            try {
                await deleteCloudSmartPlay(params)
                this.$message.success('删除成功')
                this.onQuery(this.queryParams)
            } catch (e) {
                this.$message.error('删除失败，请稍后重试')
            }
        },
        onShowHome (val) {
            this.H5Preview = iotUrl + '/iot/smartPlayDetail/?articleId=' + val.id
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

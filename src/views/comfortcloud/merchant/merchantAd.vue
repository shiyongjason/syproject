<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>招商广告</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">广告标题：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.title" maxlength="50" placeholder="输入招商广告标题" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onCreate">新建招商</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantAdList" :pagination="cloudMerchantAdListPagination" @onCurrentChange='onCurrentChange'
                        isShowIndex @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='80'>
                <template slot="title" slot-scope="scope">
                    <p @click="onShowPreview(scope.data.row)" class="colred title">{{scope.data.row.title}}</p>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="goEdit(scope.data.row.id)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                    <el-button class="orangeBtn clipBtn" @click="onCopyLink(scope.data.row)">复制链接</el-button>
                </template>
            </basicTable>
        </div>

        <H5Preview :activeUrl="H5Preview" :loading="loading"  @hideLoading="loading =false" @clearUrl="H5Preview = ''"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Clipboard from 'clipboard'
import { iotUrl } from '@/api/config'
import H5Preview from '../../../components/h5Preview/index'
import { deleteCloudMerchantAd } from '../api/index'

export default {
    name: 'merchantAd',
    data () {
        return {
            queryParams: {
                title: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '广告标题', prop: 'title' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' }],
            H5Preview: '',
            loading: true
        }
    },
    components: {
        H5Preview
    },
    mounted () {
        this.queryList(this.queryParams)
    },
    computed: {
        ...mapGetters({
            cloudMerchantAdList: 'cloudMerchantAdList',
            cloudMerchantAdListPagination: 'cloudMerchantAdListPagination'
        })
    },
    methods: {
        ...mapActions({
            findCloudMerchantAdList: 'findCloudMerchantAdList'
        }),

        onSearch: function () {
            this.queryParams.pageNumber = 1
            this.queryList(this.queryParams)
        },
        onCreate: function () {
            this.$router.push({
                path: '/comfortCloud/merchant/merchantAdEdit'
            })
        },
        onShowPreview: function (val) {
            this.H5Preview = iotUrl + '/uc/wechat/auth?appId=wx6a4e71b7fb2b4d0e&id=' + val.id
        },
        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList(this.queryParams)
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList(this.queryParams)
        },
        queryList: function (params) {
            this.findCloudMerchantAdList(params)
        },
        goEdit (id) {
            this.$router.push({
                path: '/comfortCloud/merchant/merchantAdEdit',
                query: {
                    id: id
                }
            })
        },
        async onDelete (row) {
            this.$confirm('招商广告可能已投放到微信公众号中，请确认是否继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await deleteCloudMerchantAd(row.id)
                    this.$message.success('删除成功')
                    this.queryList(this.queryParams)
                } catch (e) {
                    console.log(e)
                    this.$message.error('删除失败，请稍后重试')
                }
            }).catch(() => {})
        },
        onCopyLink: function (row) {
            let text = iotUrl + '/uc/wechat/auth?appId=wx6a4e71b7fb2b4d0e&id=' + row.id
            let clipboard = new Clipboard('.clipBtn', {
                text: function () {
                    return text
                }
            })
            clipboard.on('success', e => {
                this.$message({ message: '复制成功', showClose: true, type: 'success' })
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                this.$message({ message: '复制失败,', showClose: true, type: 'error' })
                clipboard.destroy()
            })
        }
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

    .title {
        overflow: hidden;
        text-overflow:ellipsis;
    }
</style>

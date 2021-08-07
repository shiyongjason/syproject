<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>工程方案</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">方案名称：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.schemeTitle" placeholder="请输入方案名称" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建人：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.operator" placeholder="请输入创建人" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <h-button type="primary" class="ml20" @click="onSearch">查询</h-button>
                    <h-button type="primary" class="ml20" @click="onCreatePlan">新建方案</h-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantProjectSchemeList" :isShowIndex="true"
                        :pagination="cloudMerchantProjectSchemeListPagination" :isAction="true"
                        @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="schemeTitle" slot-scope="scope">
                    <p @click="onPreviewClick(scope.data.row)" class="colred">{{scope.data.row.schemeTitle}}</p>
                </template>
                <template slot="createBy" slot-scope="scope">
                    {{ scope.data.row.createBy + ' ' + scope.data.row.createPhone }}
                </template>
                <template slot="status" slot-scope="scope">
                    {{isEffective(scope.data.row) ? '已生效' : '未生效'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
        <H5Preview :activeUrl="H5Preview" :loading="loading"  @hideLoading="loading =false" @clearUrl="H5Preview = ''"/>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'
import { deleteProjectScheme } from '../api'
import { iotUrl } from '../../../api/config'
import H5Preview from '../../../components/h5Preview'

export default {
    name: 'merchantEnginePlan',
    components: {
        H5Preview
    },
    data () {
        return {
            queryParams: {
                schemeTitle: '',
                operator: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '工程方案标题', prop: 'schemeTitle' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '创建人', prop: 'createBy' },
                { label: '生效时间', prop: 'effectiveTime', formatters: 'dateTime' },
                { label: '状态', prop: 'status' }],
            H5Preview: '',
            loading: false
        }
    },
    mounted () {
        this.queryList(this.queryParams)
    },
    computed: {
        ...mapGetters({
            cloudMerchantProjectSchemeList: 'cloudMerchantProjectSchemeList',
            cloudMerchantProjectSchemeListPagination: 'cloudMerchantProjectSchemeListPagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })

    },
    methods: {
        ...mapActions({
            findCloudMerchanProjectSchemeList: 'findCloudMerchanProjectSchemeList'
        }),
        queryList: function () {
            this.findCloudMerchanProjectSchemeList(this.queryParams)
        },
        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList()
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList()
        },
        onSearch: function () {
            this.queryList()
        },
        onCreatePlan: function () {
            this.$router.push({ path: '/comfortCloudMerchant/merchantEngine/merchantEnginePlanEdit' })
        },
        onEdit: function (data) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantEngine/merchantEnginePlanEdit', query: { id: data.id } })
        },
        onPreviewClick (val) {
            this.H5Preview = iotUrl + '/iot/merchantEnginePlanPreview?id=' + val.id
        },
        isEffective (plan) {
            return new Date().getTime() > new Date(plan.effectiveTime).getTime()
        },
        onDelete: function (data) {
            let isEffective = this.isEffective(data)
            this.$confirm(isEffective ? '该方案在生效中，删除后小程序端无法查询，是否继续删除？' : '该方案还未生效，是否继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteProjectScheme({ id: data.id })
                this.queryList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => { })
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

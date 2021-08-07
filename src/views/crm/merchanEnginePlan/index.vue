<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="spanflex">
                <span>工程方案</span>
            </div>
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-label">方案名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.schemeTitle" placeholder="请输入方案名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-label">创建人：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.operator" placeholder="请输入创建人" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" class="ml20" @click="onSearch">查询</h-button>
                    <h-button type="primary" class="ml20" @click="onCreatePlan">新建方案</h-button>
                </div>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex="true" :pagination="paginationInfo" :isAction="true" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :actionMinWidth=120>
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
            <!-- <H5Preview :activeUrl="H5Preview" :loading="loading" @hideLoading="loading =false" @clearUrl="H5Preview = ''" /> -->
            <el-drawer title="预览" :visible.sync="drawer" direction="rtl" :before-close="()=>{this.drawer = false}">
                <H5Preview ref='previews' />
            </el-drawer>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'
import { getCrmPlanList, deleteProjectScheme } from './api/index'
import { iotUrl } from '@/api/config'
import H5Preview from './H5Preview.vue'

export default {
    name: 'crmplan',
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
            tableData: [],
            paginationInfo: {},
            H5Preview: '',
            loading: false,
            drawer: false
        }
    },
    mounted () {
        this.queryList()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })

    },
    methods: {
        async queryList () {
            // this.findCloudMerchanProjectSchemeList(this.queryParams)
            const { data } = await getCrmPlanList(this.queryParams)
            this.tableData = data.records
            this.paginationInfo = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.queryList()
        },
        onSearch () {
            this.queryList()
        },
        onCreatePlan () {
            this.$router.push({ path: '/goodwork/crmengineplan/crmengineedit' })
        },
        onEdit (data) {
            this.$router.push({ path: '/goodwork/crmengineplan/crmengineedit', query: { id: data.id } })
        },
        onPreviewClick (val) {
            // this.H5Preview = '/goodwork/crmengineplan/H5Preview?id=' + val.id
            this.drawer = true
            this.$nextTick(() => {
                this.$refs.previews.getDetail(val.id)
            })
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

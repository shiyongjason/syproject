<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>代理商查询</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">代理商名称：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.companyName" maxlength="50" placeholder="输入代理商名称" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantList" :pagination="cloudMerchantListPagination" @onCurrentChange='onCurrentChange'
                        isShowIndex @onSizeChange='onSizeChange'>
                <template slot="level" slot-scope="scope">
                    {{scope.data.row.level === 1 ? '一级': '二级'}}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'merchantSearch',
    data () {
        return {
            queryParams: {
                companyName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '维护时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '省', prop: 'provinceName' },
                { label: '市', prop: 'cityName' },
                { label: '代理商公司名称', prop: 'companyName' },
                { label: '代理商等级', prop: 'level' },
                { label: '代理商联系人', prop: 'contactUser' },
                { label: '代理商联系电话', prop: 'contactNumber' },
                { label: '代理品类', prop: 'categoryName' }]
        }
    },
    mounted () {
        this.queryList(this.queryParams)
    },
    computed: {
        ...mapGetters({
            cloudMerchantList: 'cloudMerchantList',
            cloudMerchantListPagination: 'cloudMerchantListPagination'
        })
    },
    methods: {
        ...mapActions({
            findCloudMerchantList: 'findCloudMerchantList'
        }),

        onSearch: function () {
            this.queryParams.pageNumber = 1
            this.queryList(this.queryParams)
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
            this.findCloudMerchantList(params)
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

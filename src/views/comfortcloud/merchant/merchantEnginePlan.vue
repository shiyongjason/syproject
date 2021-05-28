<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>工程方案</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">方案名称：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.planName" placeholder="请输入方案名称" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建人：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.planUser" placeholder="请输入创建人" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <h-button type="primary" class="ml20" @click="onCreatePlan">新建方案</h-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantShopList"
                        :pagination="cloudMerchantShopListPagination" :isAction="true"
                        @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    name: 'merchantEnginePlan',
    data () {
        return {
            queryParams: {
                planName: '',
                planUser: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '工程方案标题', prop: 'categoryName' },
                { label: '创建时间', prop: 'specificationName' },
                { label: '创建人', prop: 'productName' },
                { label: '生效时间', prop: 'memberSalePrice' },
                { label: '状态', prop: 'status' }]
        }
    },
    mounted () {
        this.queryList(this.queryParams)
    },
    computed: {
        ...mapGetters({
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })

    },
    methods: {
        ...mapActions({
        }),
        onCreatePlan: function () {
            this.$router.push({ path: '/comfortCloudMerchant/merchantEngine/merchantEnginePlanEdit' })
        },
        onEdit: function (data) {

        },
        onDelete: function (data) {

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

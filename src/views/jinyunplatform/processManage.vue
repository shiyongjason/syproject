<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <h3>审批流程查询</h3>
            </div>
            <div class="padd20">
                <div class="query-cont-col">
                    <div class="query-col-title">客户名称：</div>
                    <div class="query-col-input">
                        <el-input maxlength="100" v-model="queryParams.customerName" placeholder="请输入客户名称" clearable>
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">产品名称：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.productName" clearable placeholder="请选择产品名称">
                            <el-option v-for="item in productsArr" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">流程类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.processType" clearable placeholder="请选择流程类型">
                            <el-option v-for="item in flowTypes" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <br>
                <div class="query-cont-col" style="padding-top: 20px;">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onFormSearch">搜索</el-button>
                    </div>
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-col">
                <h3>审批流程展示</h3>
            </div>
            <div class="padd20">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' isShowIndex>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { getProductsArr } from './api/index'
import { tableLabelProcessManage } from './const'
export default {
    name: 'processManage',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            pagination: state => state.jinyunplatform.pagination,
            productsArr: state => state.jinyunplatform.productsArr
        }),
        ...mapGetters({
            tableData: 'jinyunplatform/tableLabelProcessManage',
        })
    },
    data () {
        return {
            tableLabel: tableLabelProcessManage,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                customerName: ''
            },
            searchParams: {},
            flowTypes: [{
                label: '预授信',
                value: 'pre_credit'
            }, {
                label: '用信',
                value: 'act_loan'
            }, {
                label: '授信',
                value: 'act_credit'
            }]
        }
    },
    async mounted () {
        this.getProductsArr()
        this.onQuery()
    },
    methods: {
        ...mapActions({
            getProcessesList: 'jinyunplatform/getProcessesList',
            getProductsArr: 'jinyunplatform/getProductsArr',
        }),
        async onQuery () {
            this.getProcessesList(this.queryParams)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'productName', '')
            this.$set(this.queryParams, 'processType', '')
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onFormSearch (formName) {
            this.$store.dispatch('tracking', {
                type: 9,
                event: 1,
                page: 4,
                page_name: '流程查询',
                page_path_name: 'processManage'
            })
            this.onSearch()
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog {
    min-width: 350px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
}
.add-tags-dialog {
    padding-top: 20px;
}
.padd20 {
    padding: 0 20px;
}
</style>

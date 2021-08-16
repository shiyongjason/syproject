<template>
<div class="page-body B2b">
    <div class="page-body-cont">
        <div class="query-cont__row">
            <div class="query-cont-col">
                <div class="query-col__label">供应商名称：</div>
                <div class="query-col__input">
                    <el-input v-model="queryParams.supplierName" placeholder="请输入" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col__label">创建时间：</div>
                <div class="query-col__input">
                    <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                    </HDatePicker>
                </div>
            </div>
            <div class="query-cont-col">
                <h-button type="primary" @click="findPurchaseList({ ...queryParams, pageNumber: 1 })">
                    查询
                </h-button>
                <h-button @click="onReset">
                    重置
                </h-button>
            </div>
        </div>
        <basicTable :tableData="supplierList" :tableLabel="tableLabel" :pagination="supplierListPagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isShowIndex='true'>
            <template slot="createTime" slot-scope="scope">
                <span class="colblue"> {{ scope.data.row.createTime | formatDate('YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
        </basicTable>
    </div>
</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'index',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                startDate: '',
                endDate: '',
                supplierName: '',
                createBy: ''
            },
            tableLabel: [
                { label: '供应商编码', prop: 'supplierCode', width: '150' },
                { label: '供应商名称', prop: 'supplierName' },
                { label: '开户行', prop: 'supplierAccountName' },
                { label: '账号', prop: 'supplierAccountNo' },
                { label: '银行联行行号', prop: 'supplierBankNo' },
                { label: '创建时间', prop: 'createTime', width: '150' }
            ]
        }
    },
    computed: {
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.startDate,
                endTime: this.queryParams.endDate
            }
        },
        ...mapGetters({
            supplierList: 'supplierSearchStore/supplierList',
            supplierListPagination: 'supplierSearchStore/supplierListPagination'
        })
    },
    methods: {
        onStartChange (val) {
            this.queryParams.startDate = val
        },
        onEndChange (val) {
            this.queryParams.endDate = val
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
            this.findPurchaseList(this.queryParams)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findPurchaseList(this.queryParams)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findPurchaseList(this.queryParams)
        },
        ...mapActions({
            findPurchaseList: 'supplierSearchStore/findPurchaseList'
        })
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        this.findPurchaseList(this.queryParams)
    }
}
</script>

<style scoped lang="scss">

</style>

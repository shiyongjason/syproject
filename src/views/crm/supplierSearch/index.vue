<template>
<div class="page-body B2b">
    <div class="page-body-cont">
        <div class="query-cont__row">
            <div class="query-cont-col">
                <div class="query-col__label">供应商名称：</div>
                <div class="query-col__input">
                    <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col__label">创建人：</div>
                <div class="query-col__input">
                    <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col__label">应支付日期：</div>
                <div class="query-col__input">
                    <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                    </HDatePicker>
                </div>
            </div>
            <div class="query-cont-col">
                <h-button type="primary" @click="findFundsList({...queryParamsTemp, pageNumber: 1})">
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
                pageSize: 10
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
                startTime: this.queryParams.scheduleStartTime,
                endTime: this.queryParams.scheduleEndTime
            }
        },
        ...mapGetters({
            supplierList: 'supplierSearchStore/supplierList',
            supplierListPagination: 'supplierSearchStore/supplierListPagination'
        })
    },
    methods: {
        onStartChange (val) {
            this.queryParams.scheduleStartTime = val
        },
        onEndChange (val) {
            this.queryParams.scheduleEndTime = val
        },
        onReset () {
            const repaymentTypeArrays = this.queryParams.repaymentTypeArrays
            this.queryParams = { ...this.queryParamsTemp, repaymentTypeArrays }
            this.findFundsList(this.queryParamsUseQuery)
        },
        findFundsList () {

        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findFundsList(this.queryParamsUseQuery)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findFundsList(this.queryParamsUseQuery)
        },
        ...mapActions({
            findFundsList: 'crmFunds/findPurchaseList'
        })
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
    }
}
</script>

<style scoped lang="scss">

</style>

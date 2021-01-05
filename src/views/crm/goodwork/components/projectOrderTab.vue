<template>
<div class="collect-wrap">
    <basicTable :tableData="purchaseOrderList" :tableLabel="tableLabel" :pagination="purchaseOrderPagination"
                @onCurrentChange="handleCurrentChange"
                @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false"
                :isShowIndex='true'>
        <template slot="poAmount" slot-scope="scope">
            <span> {{ scope.data.row.poAmount | fundMoneyHasTail }}</span>
        </template>
        <template slot="purchaseOrderNo" slot-scope="scope">
            <span class="blue" @click="goPurchaseOrderNo(scope.data.row.purchaseOrderNo)"> {{ scope.data.row.purchaseOrderNo}}</span>
        </template>
        <template slot="status" slot-scope="scope">
            <span class="colblue"> {{ scope.data.row.status | attributeComputed(PurchaseOrderDict.status.list) }}</span>
        </template>
    </basicTable>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'

export default {
    name: 'projectOrderTab',
    props: ['id'],
    data () {
        return {
            queryParams: {
                'sort.property': 'createTime',
                'sort.direction': 'DESC',
                pageNumber: 1,
                pageSize: 10
            },
            paginationInfo: {},
            tableLabel: [
                { label: '采购单编号', prop: 'purchaseOrderNo', width: '120' },
                { label: '采购单金额(元)', prop: 'poAmount', width: '120', align: 'right' },
                { label: '状态', prop: 'status', width: '100' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '更新时间', prop: 'updateTime', formatters: 'dateTime' }
            ],
            PurchaseOrderDict
        }
    },
    computed: {
        ...mapGetters({
            purchaseOrderList: 'crmPurchaseOrder/purchaseOrderList',
            purchaseOrderPagination: 'crmPurchaseOrder/purchaseOrderPagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        }),
        queryParamsUseQuery () {
            return {
                ...this.queryParams,
                projectId: this.id,
                authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '',
                jobNumber: this.userInfo.jobNumber
            }
        }
    },
    methods: {
        goPurchaseOrderNo (id) {
            this.$router.push({
                path: '/goodwork/purchaseOrder',
                query: {
                    id: id
                }
            })
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findPurchaseList(this.queryParamsUseQuery)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findPurchaseList(this.queryParamsUseQuery)
        },
        ...mapActions({
            findPurchaseList: 'crmPurchaseOrder/findPurchaseList'
        })
    },
    mounted () {
        this.findPurchaseList(this.queryParamsUseQuery)
    }
}
</script>

<style scoped lang="scss">
.collect-wrap {
    margin-top: 50px;
    padding: 20px 20px 200px;
}
.blue {
    color: #50b7f7;
    cursor: pointer;
}
</style>

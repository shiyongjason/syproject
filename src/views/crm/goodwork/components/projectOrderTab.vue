<template>
<div class="collect-wrap">
    <basicTable :tableData="purchaseOrderList" :tableLabel="tableLabel" :pagination="purchaseOrderPagination"
                @onCurrentChange="handleCurrentChange"
                @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false"
                :isShowIndex='true'>
        <template slot="status" slot-scope="scope">
            <span class="colblue"> {{ findStatusName(scope.data.row.status) }}</span>
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
                'sort.direction': 'ASC',
                pageNumber: 1,
                pageSize: 10
            },
            paginationInfo: {},
            tableLabel: [
                { label: '采购单编号', prop: 'purchaseOrderNo', width: '150' },
                { label: '采购单金额(元)', prop: 'poName', width: '120' },
                { label: '状态', prop: 'subsectionName', width: '100' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'updateTime', formatters: 'dateTimes' }
            ]
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
        }),
        findStatusName (status) {
            let name = ''
            if (status && status > -1) {
                PurchaseOrderDict.status.list.forEach(value => {
                    if (value.key == status) {
                        name = value.value
                    }
                })
                return name
            }
            return '-'
        }
    },
    mounted () {
        this.findPurchaseList(this.queryParamsUseQuery)
    }
}
</script>

<style scoped lang="scss">
.collect-wrap {
    margin-top: 50px;
    padding: 20px;
}
</style>

<template>
    <div class="collect-wrap">
        <el-button type="primary" @click="onAddPurchase" class="mb20" v-if="hosAuthCheck(Auths.CRM_WORK_FINAL_ADDPUR)">新增采购单</el-button>
        <basicTable :tableData="purchaseOrderList" :tableLabel="tableLabel" :pagination="purchaseOrderPagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 :isShowIndex='true'>
            <template slot="poAmount" slot-scope="scope">
                <span> {{ scope.data.row.poAmount | moneyFormat }}</span>
            </template>
            <template slot="purchaseOrderNo" slot-scope="scope">
                <span class="link-cell" @click="goPurchaseOrderNo(scope.data.row.purchaseOrderNo)"> {{ scope.data.row.purchaseOrderNo}}</span>
            </template>
            <template slot="status" slot-scope="scope">
                <span> {{ scope.data.row.status | attributeComputed(PurchaseOrderDict.status.list) }}</span>
            </template>
            <template slot="action" slot-scope="scope">
                <h-button table @click="onDeletePurchase(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_WORK_FINAL_DELETEPUR)">删除</h-button>
            </template>
        </basicTable>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import { addEmptyPurchase, deletePurchase } from '../api/index'
import * as Auths from '@/utils/auth_const'
export default {
    name: 'projectOrderTab',
    props: ['id'],
    data () {
        return {
            Auths,
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
            this.$parent.handleClose()
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
        }),
        onAddPurchase () {
            this.$confirm('确定对当前项目新增一条采购单吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await addEmptyPurchase({ projectId: this.id })
                this.findPurchaseList(this.queryParamsUseQuery)
            }).catch(() => {

            })
        },
        onDeletePurchase (val) {
            this.$confirm('确定删除当前采购单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deletePurchase(val.id)
                this.findPurchaseList(this.queryParamsUseQuery)
            }).catch(() => {

            })
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
    padding: 20px 20px 200px;
}
</style>

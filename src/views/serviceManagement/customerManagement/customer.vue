<template>
    <div class="customerManagement">
        <searchForm @search='onSearch' @add="onAddCustomer" v-model="queryParams" />
        <customerTable :tableData='list' :tableLabel="tableLabel" :paginationData="paginationOrderData"  @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange" />
        <add-or-updata :visible.sync="dialogCustomerEdit"/>
    </div>
</template>

<script>
import searchForm from './components/searchForm'
import customerTable from './components/customerTable'
import addOrUpdata from './components/addOrUpdata'
import { findCustomerList } from './api/index'

export default {
    name: 'customer',
    components: {
        searchForm, customerTable, addOrUpdata
    },
    data () {
        return {
            dialogCustomerEdit: false,
            list: [],
            paginationOrderData: {},
            tableLabel: [
                { label: '序号', prop: 'orderNo', width: '150' },
                { label: '渠道名称', prop: 'childOrderNo', width: '100' },
                { label: '姓名', prop: 'totalAmount' },
                { label: '手机号', prop: 'couponCode' },
                { label: '微信号', prop: 'couponSnNo' },
                { label: '客户身份', prop: 'couponType' },
                { label: '购买次数', prop: 'couponAmount' },
                { label: '维护时间', prop: 'activityCode' },
                { label: '权益卡', prop: 'activityType' }
            ],
            queryParams: {
                name: null,
                channelType: null,
                mobile: null,
                role: null,
                beginCreateTime: null,
                endCreateTime: null,
                pageSize: 10,
                pageNum: 1
            }
        }
    },
    methods: {
        onSearch () {
            this.getList()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
        },
        onCurrentChange (val) {
            this.queryParams.pageNum = val
        },
        onAddCustomer () {
            this.dialogCustomerEdit = true
        },
        async getList () {
            const { data } = await findCustomerList(this.queryParams)
            console.log('list', data)
        }
    },
    mounted () {
        this.getList()
    }
}
</script>

<style lang='scss' scoped>
.customerManagement {
    padding: 36px 10px 20px 10px;
}

/deep/ .customeredit .el-input{
    width: 100%
}
.customerForm{
    padding-top:20px
}
</style>
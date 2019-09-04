<template>
    <div class="customerManagement">
        <search-form @search='onSearch' @add="onAddCustomer" v-model="searchForm" :role='role' :channelType='channelType' />
        <customer-table :tableData='list' @edit="onEdit" :pageSize='queryParams.pageSize' :pageNumber='queryParams.pageNumber' :role='role' :channelType='channelType' />
        <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="queryParams.pageNumber" :page-sizes="page.sizes" :page-size="queryParams.pageSize" :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <add-or-updata :visible.sync="dialogCustomerEdit" :isShowDetail='showDetail' v-model="editInfo" @getList='getData' :role='role' :channelType='channelType'/>
    </div>
</template>

<script>
import searchForm from './components/searchForm'
import customerTable from './components/customerTable'
import addOrUpdata from './components/addOrUpdata'
import { findCustomerList } from './api/index'
import { pagination } from '@/utils/mixins.js'

export default {
    name: 'customer',
    components: {
        searchForm, customerTable, addOrUpdata
    },
    mixins: [pagination],
    data () {
        return {
            dialogCustomerEdit: false,
            list: [],
            searchForm: {
                role: '',
                channelType: ''
            },
            editInfo: {},
            channelType: [
                { value: '', label: '全部' }, { value: 0, label: '好享家' }, { value: 1, label: '有赞商城' }, { value: 2, label: '孩子王成长家' }
            ],
            role: [
                { value: '', label: '全部' }, { value: 0, label: '员工' }, { value: 1, label: '线下管家' }, { value: 2, label: '线上管家' }, { value: 3, label: '客户' }
            ],
            showDetail: false
        }
    },
    provide () {
        return {
            getTypes: this.getTypes,
            getData: this.getData
        }
    },
    methods: {
        onEdit (row, type) {
            this.editInfo = row
            this.dialogCustomerEdit = true
            this.showDetail = false
            type && (this.showDetail = true)
        },
        onSearch () {
            this.getData()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
        },
        onAddCustomer () {
            this.showDetail = false
            this.dialogCustomerEdit = true
        },
        async getData () {
            let params = { ...this.searchForm, ...this.queryParams }
            const { data } = await findCustomerList(params)
            this.list = data.records
            this.page.total = data.total
        }
    },
    mounted () {
        this.getData()
    }
}
</script>

<style lang='scss' scoped>
.customerManagement {
    padding: 36px 10px 20px 10px;
}
.pages{ text-align: center; padding: 15px 0; background: #fff}
/deep/ .customeredit .el-input{
    width: 100%
}
.customerForm{
    padding-top:20px
}
</style>
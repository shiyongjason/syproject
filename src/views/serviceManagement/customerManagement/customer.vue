<template>
    <div class="customerManagement">
        <search-form @search='onSearch' @add="onAddCustomer" v-model="searchForm"  />
        <customer-table :tableData='list' @edit="onEdit" />
        <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="queryParams.pageNum" :page-sizes="page.sizes" :page-size="queryParams.pageSize" :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <add-or-updata :visible.sync="dialogCustomerEdit" v-model="editInfo"/>
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
            searchForm: {},
            editInfo: {},
            channelType: {
                0: '好享家',
                1: '有赞商城',
                2: '孩子王成长家'
            },
            role: {
                0: '员工',
                1: '线下管家',
                2: '线上管家',
                3: '客户'
            }
        }
    },
    provide () {
        return {
            getTypes: this.getTypes,
            getData: this.getData
        }
    },
    methods: {
        getTypes (obj, key) {
            if (key || typeof key === 'number') {
                return this[obj][key]
            } else {
                return this[obj]
            }
        },
        onEdit (row) {
            console.log(row)
            this.editInfo = row
            this.dialogCustomerEdit = true
        },
        onSearch () {
            this.getData()
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
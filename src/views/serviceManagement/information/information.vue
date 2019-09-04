<template>
    <div class="customerManagement">
        <search-form @search='onSearch' @add="onAdd" v-model="searchForm" />
        <information-table :list="list" />
        <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="queryParams.pageNum" :page-sizes="page.sizes" :page-size="queryParams.pageSize" :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <add-or-updata :visible.sync="dialog"/>
    </div>
</template>

<script>
import searchForm from './components/searchForm'
import informationTable from './components/informationTable'
import addOrUpdata from './components/addOrUpdata'
// import { findCustomerList } from './api/index'
import { pagination } from '@/utils/mixins.js'

export default {
    name: 'customer',
    components: {
        searchForm, informationTable, addOrUpdata
    },
    mixins: [pagination],
    data () {
        return {
            list: [],
            dialog: false,
            searchForm: {}
        }
    },
    methods: {
        onAdd () {
            this.dialog = true
        },
        onSearch () {
            console.log(this.queryParams)
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
.pages{ text-align: center; padding: 15px 0; background: #fff}

</style>
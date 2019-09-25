<template>
    <div class="order page-body">
        <searchForm @search='onSearch' @onClear="onClear" v-model="searchForm"/>
        <order-table :tableData='list' @search-event="getData"/>
        <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="queryParams.pageNumber" :page-sizes="page.sizes" :page-size="queryParams.pageSize" :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
import searchForm from './components/searchForm'
import orderTable from './components/orderTable'
import { pagination } from '@/utils/mixins.js'
import { findOrderList } from './api/index'

export default {
    name: 'order',
    components: {
        searchForm,
        orderTable
    },
    mixins: [pagination],
    data () {
        return {
            list: [],
            searchForm: {
                searchKey: 'orderNo',
                mobile: ''
            }
        }
    },
    methods: {
        onClear () {
            this.searchForm = {
                searchKey: 'orderNo',
                mobile: ''
            }
        },
        onSearch () {
            this.queryParams.pageNumber = 1
            this.getData()
        },
        async getData (param) {
            const temp = { ...this.searchForm }
            temp[temp.searchKey] = temp.searchValue
            delete temp.searchKey
            delete temp.searchValue
            let params = { ...temp, ...this.queryParams }
            if (param && param.status && param.status !== '0') params.status = param.status
            const { data } = await findOrderList(params)
            this.list = data.records
            this.page.total = data.total
        }
    },
    mounted () {
        let defaultMobile = this.$route.query.mobile
        if (defaultMobile) {
            console.log(1)
            this.searchForm.searchKey = 'mobile'
            this.searchForm.searchValue = defaultMobile
        }
        this.getData()
    }
}
</script>

<style scoped>
.el-col {
    margin-bottom: 20px
}
.pages{ text-align: center; padding: 15px 0; background: #fff}
</style>

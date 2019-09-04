<template>
    <div class="order">
        <searchForm @search='onSearch' v-model="searchForm" />
        <order-table :tableData='list' @search-event="getData"/>
        <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="queryParams.pageNum" :page-sizes="page.sizes" :page-size="queryParams.pageSize" :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
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
                searchKey: ''
            }
        }
    },
    methods: {
        onSearch () {
            this.queryParams.pageNumber = 1
            this.getData()
        },
        async getData (param) {
            let params = { ...this.searchForm, ...this.queryParams }
            if (param && param.status && param.status !== '0') params.status = param.status
            const { data } = await findOrderList(params)
            this.list = data.records
            this.page.total = data.total
        }
    },
    mounted () {
        this.getData()
    }
}
</script>

<style scoped>
.order {
    padding: 36px 10px 20px 10px;
}
.el-col {
    margin-bottom: 20px
}
.pages{ text-align: center; padding: 15px 0; background: #fff}
</style>
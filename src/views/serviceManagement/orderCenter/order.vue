<template>
    <div class="order page-body">
        <searchForm @search='onSearch' @onClear="onClear" v-model="searchForm" :channelType="channelType"/>
        <order-table @search='noParamsSearch' :tableData='list' @search-event="onChangeStauts" :channelType="channelType"/>
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
import { findChannelDict } from '../common/dictApi'

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
                searchKey: 'orderNo'
            },
            channelType: []
        }
    },
    methods: {
        onChangeStauts (value) {
            if (value.status - 0 === 5) {
                this.queryParams.noWorkOrder = true
                this.queryParams.status = ''
            } else {
                this.queryParams.noWorkOrder = false
                this.queryParams.status = value.status
            }
            this.getList()
        },
        noParamsSearch () {
            this.getList()
        },
        onClear () {
            this.searchForm = {
                searchKey: 'orderNo',
                mobile: ''
            }
            this.getList()
        },
        onSearch () {
            this.queryParams.pageNumber = 1
            this.getList()
        },
        async getList () {
            const temp = { ...this.searchForm }
            temp[temp.searchKey] = temp.searchValue
            delete temp.searchKey
            delete temp.searchValue
            let params = { ...temp, ...this.queryParams }
            const { data } = await findOrderList(params)
            this.list = data.records
            this.page.total = data.total
        },
        async findChannelDict () {
            const { data } = await findChannelDict()
            this.channelType = data
        }
    },
    mounted () {
        let defaultMobile = this.$route.query.mobile
        if (defaultMobile) {
            this.searchForm.searchKey = 'mobile'
            this.searchForm.searchValue = defaultMobile
        }
        this.getList()
        this.findChannelDict()
    }
}
</script>

<style scoped>
.el-col {
    margin-bottom: 20px
}
.pages{ text-align: center; padding: 15px 0; background: #fff}
</style>

<template>
    <div class="customerManagement page-body">
        <search-form @search='onSearch' @add="onAddCustomer" v-model="searchForm" :role='role' :channelType='channelType' />
        <customer-table :tableData='list' @edit="onEdit" :pageSize='queryParams.pageSize' :pageNumber='queryParams.pageNumber' :role='role' :channelType='channelType' />
        <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="queryParams.pageNumber" :page-sizes="page.sizes" :page-size="queryParams.pageSize" :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <add-or-updata ref="addOrUpdate" :visible.sync="dialogCustomerEdit" :isShowDetail='showDetail' v-model="editInfo" @getList='getData' :role='role' :channelType='channelType' @resetRow="resetRow" @findDetails="findDetails"/>
    </div>
</template>

<script>
import searchForm from './components/searchForm'
import customerTable from './components/customerTable'
import addOrUpdata from './components/addOrUpdata'
import { findCustomerList, findUserDetailsTagList } from './api/index'
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
                channelType: '',
                mobile: ''
            },
            editInfo: {},
            channelType: [
                { value: '', label: '全部' }, { value: 0, label: '总部' }, { value: 1, label: '有赞商城' }, { value: 2, label: '孩子王成长家' }, { value: 3, label: '考拉买菜' }
            ],
            role: [
                { value: '', label: '全部' }, { value: 0, label: '客户' }, { value: 1, label: '线下管家' }, { value: 2, label: '线上管家' }
            ],
            showDetail: false,
            tempEditRow: {}
        }
    },
    provide () {
        return {
            getTypes: this.getTypes,
            getData: this.getData
        }
    },
    methods: {
        async findUserDetailsTagList (row) {
            const { data } = await findUserDetailsTagList({ channelUserId: row.id })
            if (data.length > 0) {
                const tempId = data.map(value => value.id)
                const tempName = data.map(value => value.labelName)
                await this.$refs.addOrUpdate.findTagList()
                this.$refs.addOrUpdate.updateTagList(tempId, tempName)
            }
        },
        async onEdit (row, type) {
            this.tempEditRow = { ...row }
            this.editInfo = row
            this.findUserDetailsTagList(row)
            this.dialogCustomerEdit = true
            this.showDetail = false
            type && (this.showDetail = true)
        },
        resetRow () {
            this.list.forEach((value, index) => {
                if (value.id === this.tempEditRow.id) {
                    this.$set(this.list, index + '', { ...this.tempEditRow })
                }
            })
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
            this.editInfo.channelType = 0
            this.dialogCustomerEdit = true
        },
        async getData () {
            let params = { ...this.searchForm, ...this.queryParams }
            const { data } = await findCustomerList(params)
            this.list = data.records
            this.page.total = data.total
        },
        findDetails () {
            this.$refs.addOrUpdate.findTagList()
        }
    },
    mounted () {
        let defaultMobile = this.$route.query.mobile
        if (defaultMobile) {
            this.searchForm.mobile = defaultMobile
        }
        this.getData()
    }
}
</script>

<style lang='scss' scoped>
.pages{ text-align: center; padding: 15px 0; background: #fff}
/deep/ .customeredit .el-input{
    width: 100%
}
.customerForm{
    padding-top:20px
}
</style>

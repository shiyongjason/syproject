<template>
    <div class="customerManagement page-body">
        <search-form @search='onSearch' @add="onAddCustomer" v-model="searchForm" :role='role' :channelType='channelType' />
        <customer-table :tableData='list' @edit="onEdit" :pageSize='queryParams.pageSize' :pageNumber='queryParams.pageNumber' :role='role' :channelType='channelType' />
        <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="queryParams.pageNumber" :page-sizes="page.sizes" :page-size="queryParams.pageSize" :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <add-or-updata ref="addOrUpdate" :visible.sync="dialogCustomerEdit" :isShowDetail='showDetail' v-model="editInfo" @getList='getList' :role='role' :channelType='channelType' @resetRow="resetRow" @findDetails="findDetails"/>
    </div>
</template>

<script>
import searchForm from './components/searchForm'
import customerTable from './components/customerTable'
import addOrUpdata from './components/addOrUpdata'
import { findCustomerList, findUserDetailsTagList } from './api/index'
import { pagination } from '@/utils/mixins.js'
import { findChannelDict } from '../common/dictApi'

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
            role: [
                { value: '', label: '全部' }, { value: 0, label: '客户' }, { value: 1, label: '线下管家' }, { value: 2, label: '线上管家' }
            ],
            showDetail: false,
            tempEditRow: {},
            channelData: []
        }
    },
    computed: {
        channelType () {
            const arr = this.channelData.map(value => {
                value.value = value.code
                value.label = value.name
                return value
            })
            arr.unshift({ value: '', label: '全部' })
            return arr
        }
    },
    provide () {
        return {
            getTypes: this.getTypes,
            getData: this.getList
        }
    },
    methods: {
        async findChannelDict () {
            const { data } = await findChannelDict()
            this.channelData = data
        },
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
            this.getList()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
        },
        onAddCustomer () {
            this.showDetail = false
            this.editInfo = {
                channelType: 0
            }
            this.dialogCustomerEdit = true
        },
        async getList () {
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
        this.findChannelDict()
        this.getList()
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

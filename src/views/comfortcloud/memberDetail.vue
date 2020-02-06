<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">登录时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.product" type="date" value-format='yyyy-MM-dd' placeholder="登录时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">手机号： </div>
                <div class="query-col-input">
                    <el-input v-model="queryParams" placeholder="输入用户手机号" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='280'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">登录 详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'membermanage',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                platformType: '',
                product: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '手机号', prop: 'productN' },
                { label: '登录时间', prop: 'platformTypeN', width: '120px' },
                { label: '登录地址', prop: 'versionCode' },
                { label: '登录时APP的版本号', prop: 'status' },
                { label: '手机操作系统', prop: 'forcedN' },
                { label: '登录终端操作系统版本', prop: 'forcedN' },
                { label: '登录终端品牌 ', prop: 'forcedN' },
                { label: '登录终端机型 ', prop: 'forcedN' }
            ]
        }
    },
    watch: {

    },
    mounted () {
        this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // console.log(this.searchParams)
            const { data } = await getAppVersionList(this.searchParams)
            // console.log(data)
            this.tableData = data.data.list
            this.pagination = {
                pageNumber: data.data.pageNum,
                pageSize: data.data.pageSize,
                total: data.data.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'product', '')
            this.$set(this.queryParams, 'platformType', '')
            this.$set(this.queryParams, 'beginDate', '')
            this.$set(this.queryParams, 'endDate', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onEdit (val) {
            this.$router.push({ path: '/comfortCloud/homedetail', query: {} })
        }
    }
}
</script>
<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
        &:first-child {
            font-size: 16px;
        }
        &:last-child {
            text-align: right;
        }
    }
}
</style>

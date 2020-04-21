<template>
    <div>
        <h3 class="p20">已申报资金计划</h3>
        <div class="query-cont-col">
            <div class="query-col-title">申报月份：</div>
            <div class="query-col-input">
                <el-date-picker v-model="queryParams.applyMonth" type="month" value-format="yyyyMM" placeholder="选择月">
                </el-date-picker>
            </div>
        </div>
        <div class="query-cont-col">
            <div class="query-col-title">平台公司名称：</div>
            <div class="query-col-input">
                <el-input type="text" maxlength="20" v-model="queryParams.companyName" placeholder="请输入平台公司名称" clearable>
                </el-input>
            </div>
        </div>
        <div class="query-cont-col">
            <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
            <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
        </div>
        <div class="p24">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='120'>
                <template slot="applyMonth" slot-scope="scope">
                    <span>{{`${scope.data.row.applyMonth.substring(0, 4)}-${scope.data.row.applyMonth.substring(4, 6)}`}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="shy(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { hasDeclareLabel } from '../const'
import { getFundPlanAll } from '../api/index'
export default {
    name: 'hasDeclare',
    data () {
        return {
            tableLabel: hasDeclareLabel,
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            queryParams: {
                applyMonth: '',
                companyName: '',
                pageNumber: 1,
                pageSize: 10,
                applyType: 1 // 已申报
            },
            searchParams: {}
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        shy (row) {
            this.$router.push({ path: '/fundsPlan/approveDeclare', query: { id: row.planId } })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async onQuery () {
            console.log(this.searchParams)
            const { data } = await getFundPlanAll(this.searchParams)
            console.log(data)
            this.tableData = data.records
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onReset () {
            this.$set(this.queryParams, 'applyMonth', '')
            this.$set(this.queryParams, 'companyName', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        }
    }
}
</script>

<style lang='scss' scoped>
.p24 {
    padding: 0 24px;
}
.p20 {
    padding-bottom: 20px;
}
</style>

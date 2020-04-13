<template>
    <div class="page-body-cont center">
        <h3 class="p20">已申报资金计划</h3>
        <div class="query-cont-col">
            <div class="query-col-title">申报月份：</div>
            <div class="query-col-input">
                <el-date-picker v-model="queryParams.mounth" type="month" placeholder="选择月">
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
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange'
            @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='120'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="shy(scope)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { hasDeclareLabel } from '../const'
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
                companyName: '',
                mounth: '',
                pageNumber: 1,
                pageSize: 10
            },
            searchParams: {}
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        shy () { },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            console.log(this.searchParams)
        },
        onReset () {
            // this.$set(this.queryParams, 'companyName', '')
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

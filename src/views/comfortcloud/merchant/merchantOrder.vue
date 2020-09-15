<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>订单查询</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">订单号：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.payNo" maxlength="50" placeholder="输入订单号" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">支付时间：</div>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="queryParams.payStartDate"
                                :picker-options="pickerOptionsStart" clearable :editable="false">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="queryParams.payEndDate"
                                :picker-options="pickerOptionsEnd" clearable :editable="false">
                </el-date-picker>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantOrderList" :pagination="cloudMerchantOrderListPagination" @onCurrentChange='onCurrentChange'
                        isShowIndex @onSizeChange='onSizeChange'>
                <template slot="level" slot-scope="scope">
                    {{scope.data.row.level === 1 ? '一级': '二级'}}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'merchantOrder',
    data () {
        return {
            queryParams: {
                payNo: '',
                payStartDate: '',
                payEndDate: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '支付时间', prop: 'successTime', formatters: 'dateTime' },
                { label: '订单号', prop: 'payNo' },
                { label: '微信支付订单号', prop: 'wxPayNo' },
                { label: '联系人', prop: 'contactUser' },
                { label: '客户电话', prop: 'contactNumber' },
                { label: '联系地址', prop: 'contactAddress' },
                { label: '代理级别', prop: 'level' },
                { label: '代理品类', prop: 'categoryName' },
                { label: '付款金额', prop: 'payAmount' }]
        }
    },
    mounted () {
        this.queryList(this.queryParams)
    },
    computed: {
        ...mapGetters({
            cloudMerchantOrderList: 'cloudMerchantOrderList',
            cloudMerchantOrderListPagination: 'cloudMerchantOrderListPagination'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    return time.getTime() > Date.now()
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.payStartDate
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions({
            findCloudMerchantOrderList: 'findCloudMerchantOrderList'
        }),
        onSearch: function () {
            this.queryParams.pageNumber = 1
            this.queryList(this.queryParams)
        },
        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList(this.queryParams)
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList(this.queryParams)
        },
        queryList: function (params) {
            this.findCloudMerchantOrderList(params)
        }
    }
}
</script>

<style scoped>
    .spanflex {
        font-size: 16px;
        padding-bottom: 10px;
    }
</style>

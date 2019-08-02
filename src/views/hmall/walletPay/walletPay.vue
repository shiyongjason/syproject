<template>
    <div class="wallet-pay">
        <div class="page-body">
            <div class="page-body-cont">
                <div class="page-header">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>钱包支付开通情况</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="page-wrap flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">平台公司：</div>
                            <div class="flex-wrap-cont">
                                <el-input type="text"
                                          v-model="queryParams.organizationName" maxlength="50" placeholder="请输入"></el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">会员店名称：</div>
                            <div class="flex-wrap-cont">
                                <el-input type="text" placeholder="请输入会员店"></el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">网商支付开通时间：</div>
                            <div class="flex-wrap-cont">
                                <el-date-picker
                                    v-model="queryParams.startDate"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="开始日期"
                                    :picker-options="pickerOptionsStart"
                                >
                                </el-date-picker>
                                <span class="ml10 mr10">-</span>
                                <el-date-picker
                                    v-model="queryParams.endDate"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="结束日期"
                                    :picker-options="pickerOptionsEnd"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">网商支付开通状态：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.status">
                                    <el-option label="全部" value=""></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">单分享开通状态：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.status">
                                    <el-option label="全部" value=""></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-cont">
                                <el-button type="primary" class="ml20" @click="onQuery()">
                                    搜索
                                </el-button>
                                <el-button type="primary" class="ml20" @click="onQuery()">
                                    重置
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-box page-table">
                    <walletPayTable
                        :tableData="tableData"
                        :paginationData="paginationData"
                        @onQuery="onQuery"
                        @onSizeChange="onSizeChange"
                        @onCurrentChange="onCurrentChange"></walletPayTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import walletPayTable from './components/wallerPayTable'
export default {
    name: 'walletPay',
    components: {
        walletPayTable
    },
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1
            },
            tableData: [],
            paginationData: {}
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endDate
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startDate
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.onQuery()
        },
        onQuery () {
            console.log(1)
        }
    },
    mounted () {

    }
}
</script>

<style scoped>

</style>

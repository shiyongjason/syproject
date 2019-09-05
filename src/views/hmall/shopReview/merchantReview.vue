<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">申请企业全称：</div>
                    <div class="query-col-input">
                        <el-input type="text" v-model="queryParams.businessName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商户名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" v-model="queryParams.merchantName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">申请时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">企业法人姓名：</div>
                    <div class="query-col-input">
                        <el-input type="text" v-model="queryParams.enterpriseLegalPerson" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">负责人姓名：</div>
                    <div class="query-col-input">
                        <el-input type="text" v-model="queryParams.principalPerson" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">负责人手机号：</div>
                    <div class="query-col-input">
                        <el-input type="text" v-model="queryParams.principalMobile" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">审核状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.checkStatus">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="新申请" value="0"></el-option>
                            <el-option label="审核通过" value="1"></el-option>
                            <el-option label="审核失败" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="findMerchantList">
                            搜索
                        </el-button>
                        <el-button type="primary" class="ml20" @click="reset">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <merchantReviewTable :tableData="tableData" :paginationData="paginationData" @onQuery="findMerchantList" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></merchantReviewTable>
        </div>
    </div>
</template>

<script>
import merchantReviewTable from './components/merchantReviewTable'
import { findMerchantList } from './api/index'
export default {
    name: 'merchantReview',
    components: {
        merchantReviewTable
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                businessName: '',
                enterpriseLegalPerson: '',
                startTime: '',
                endTime: '',
                principalPerson: '',
                principalMobile: '',
                merchantName: '',
                checkStatus: ''
            },
            tableData: [],
            paginationData: {},
            tempQueryParams: {}
        }
    },
    methods: {
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findMerchantList()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.findMerchantList()
        },
        async findMerchantList () {
            const { ...params } = this.queryParams
            if (params.startTime) {
                params.startTime = this.$root.$options.filters.formatDate(params.startTime, 'YYYY-MM-DD HH:mm:ss')
            }
            if (params.endTime) {
                params.endTime = this.$root.$options.filters.formatDate(params.endTime, 'YYYY-MM-DD HH:mm:ss')
            }
            const { data } = await findMerchantList(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        reset () {
            this.queryParams = { ...this.tempQueryParams }
            this.findMerchantList()
        }
    },
    mounted () {
        this.findMerchantList()
        this.tempQueryParams = { ...this.queryParams }
    }
}
</script>

<style scoped>
</style>

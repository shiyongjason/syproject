<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">活动名称：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.activityName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">活动状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.status">
                            <el-option label="全部" value=""></el-option>
                            <!-- （boss没有1.未开始） 2.进行中 3.未审核 4.已结束 5.未通过-->
                            <el-option label="进行中" :value="2"></el-option>
                            <el-option label="未审核" :value="3"></el-option>
                            <el-option label="已结束" :value="4"></el-option>
                            <el-option label="未通过" :value="5"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">创建时间：</div>
                    <div class="query-col-input">
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
                <div class="query-cont-col">
                    <div class="query-col-title">审核状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.auditStatus">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="审核通过" value="1"></el-option>
                            <el-option label="待审核" value="0"></el-option>
                            <el-option label="审核不通过" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">活动类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.activityType">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="满减" value="1"></el-option>
                            <el-option label="折扣" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司名称：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.merchantName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="findActiveList">
                            搜索
                        </el-button>
                        <el-button type="primary" class="ml20" @click="reset">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <activeReviewTable
                :tableData="tableData"
                :paginationData="paginationData"
                @onQuery="findActiveList"
                @onSizeChange="onSizeChange"
                @onCurrentChange="onCurrentChange"></activeReviewTable>
        </div>
    </div>
</template>

<script>
import activeReviewTable from './components/activeReviewTable'
import { findActiveList } from './api/index'
export default {
    name: 'activeReview',
    components: {
        activeReviewTable
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
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                activityName: '',
                status: '',
                startDate: '',
                endDate: '',
                auditStatus: '',
                activityType: '',
                merchantName: ''
            },
            tableData: [],
            paginationData: {},
            tempQueryParams: {}
        }
    },
    methods: {
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findActiveList()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.findActiveList()
        },
        async findActiveList () {
            const { ...params } = this.queryParams
            if (params.startDate) params.startDate = this.$root.$options.filters.formatterTime(params.startDate)
            if (params.endDate) params.endDate = this.$root.$options.filters.formatterTime(params.endDate)
            const { data } = await findActiveList(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        reset () {
            this.queryParams = { ...this.tempQueryParams }
            this.findActiveList()
        }
    },
    mounted () {
        this.findActiveList()
        this.tempQueryParams = { ...this.queryParams }
    }
}
</script>

<style scoped>

</style>

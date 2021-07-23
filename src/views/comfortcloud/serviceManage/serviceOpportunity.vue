<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont spanflex">
            <span>服务机会</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">经销商名称：</div>
                <div class="query-col-input">
                    <el-input
                        placeholder="请输入服务单号"
                        v-model="queryParams.serviceNo"
                        maxlength="50"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">经销商手机号：</div>
                <div class="query-col-input">
                    <el-input
                        v-model="queryParams.operator"
                        placeholder="请输入申请人账号"
                        maxlength="11"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">业主手机号：</div>
                <div class="query-col-input">
                    <el-input
                        v-model="queryParams.operator"
                        placeholder="请输入申请人账号"
                        maxlength="11"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">提醒时间：</div>
                <div class="query-col-input">
                    <el-date-picker
                        v-model="queryParams.startTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始日期"
                        :picker-options="pickerOptionsStart"
                    >
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker
                        v-model="queryParams.endTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="结束日期"
                        :picker-options="pickerOptionsEnd"
                    >
                    </el-date-picker>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch"
                    >查 询</el-button
                    >
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'serviceOpportunity',
    data () {
        return {
            queryParams: {
                serviceNo: '',
                pageNumber: 1,
                pageSize: 10,
                operator: '',
                endTime: '',
                startTime: ''
            },
            tableData: [],
            tableLabel: [
                { label: '提醒时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '业主手机号', prop: 'serviceNo' },
                { label: '服务机会', prop: 'operator', width: '120px' },
                { label: '经销商名称', prop: 'customerName' },
                { label: '经销商手机号', prop: 'customerPhone' }
            ],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        ...mapActions({
            getServiceManageHistoryList: 'getServiceManageHistoryList'
        }),
        async onQuery () {
            await this.getServiceManageHistoryList(this.searchParams)
            this.tableData = this.serviceHistory.records
            this.pagination = {
                pageNumber: this.serviceHistory.current,
                pageSize: this.serviceHistory.size,
                total: this.serviceHistory.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onDetail (val) {

        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        }
    },
    mounted () {
        this.onSearch()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            serviceHistory: 'serviceManageHistoryList'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .detailLine{
        color: black;
        margin-top: 20px;
    }
    .lastLine{
        margin-bottom: 20px;
    }
    .centerLine{
        position: absolute;
        left: 33%;
    }
    .rightLine{
        position: absolute;
        left: 66%;
    }
    .picContainer{
        display: flex;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .spanflex {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        span {
            &:first-child {
                font-size: 16px;
            }
        }
    }

</style>

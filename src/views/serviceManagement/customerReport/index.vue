<template>
    <div class="attribute">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">姓名：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入姓名">
                        </el-input>
                    </div>
                </div>
                <!-- <div class="query-cont-col">
                    <div class="query-col-title">渠道名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.parameterName" placeholder="请输入渠道名称">
                        </el-input>
                    </div>
                </div> -->
                <div class="query-cont-col">
                    <div class="query-col-title">手机：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.mobile" placeholder="请输入手机">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">创建时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker v-model="queryParams.createTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.createTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                    </div>
                </div>
            </div>
            <CustomerReportTable :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
            </CustomerReportTable>
        </div>
    </div>
</template>

<script>
import CustomerReportTable from './components/customerReportTable'
import { mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { findReportList } from '../api/index'
export default {
    name: 'customerReport',
    components: {
        CustomerReportTable
    },
    data () {
        return {
            queryParams: {
                name: '',
                mobile: '',
                createTimeStart: '',
                createTimeEnd: ''
            },
            searchParams: {},
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                totalElements: 100
            }
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.createTimeEnd)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.createTimeStart)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onReset () {
            this.$set(this.queryParams, 'name', '')
            this.$set(this.queryParams, 'mobile', '')
            this.$set(this.queryParams, 'beginCreateTime', '')
            this.$set(this.queryParams, 'endCreateTime', '')
            this.onQuery()
        },
        onQuery () {
            const { ...params } = this.queryParams
            this.searchParams = { ...params }
            this.search()
        },
        async search () {
            console.log(this.searchParams)
            this.searchParams.pageSize = this.paginationData.pageSize
            this.searchParams.pageNumber = this.paginationData.pageNumber
            console.log(this.searchParams)
            const { data } = await findReportList(this.searchParams)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            this.paginationData.pageNumber = val
            this.search()
        }
    },
    async mounted () {
        this.onQuery()
    }
}
</script>

<style scoped>
.form-add-remove {
    font-size: 22px;
    color: #ff9c31;
    cursor: pointer;
    line-height: 40px;
    vertical-align: top;
}
.flex-wrap-row {
    max-width: 1350px;
}
</style>

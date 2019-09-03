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
                        <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入渠道名称">
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
                    <div class="flex-wrap-title">维护时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker v-model="queryParams.beginCreateTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endCreateTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
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
            <CustomerRecordTable :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
            </CustomerRecordTable>
        </div>
    </div>
</template>

<script>
import CustomerRecordTable from './components/customerRecordTable'
import { findRecordList } from '../api/index'
import { mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'customerRecord',
    components: {
        CustomerRecordTable
    },
    data () {
        return {
            queryParams: {
                name: '',
                mobile: '',
                beginCreateTime: '',
                endCreateTime: ''
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
                    let beginDateVal = this.queryParams.endCreateTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.beginCreateTime
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
        onQuery () {
            const { ...params } = this.queryParams
            this.searchParams = params
            this.search()
        },
        onReset () {
            this.$set(this.queryParams, 'name', '')
            this.$set(this.queryParams, 'mobile', '')
            this.$set(this.queryParams, 'beginCreateTime', '')
            this.$set(this.queryParams, 'endCreateTime', '')
            this.onQuery()
        },
        async search () {
            const { data } = await findRecordList(this.searchParams)
            // console.log(data)
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

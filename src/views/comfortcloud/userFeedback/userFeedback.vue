<template>
    <div class="page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>用户反馈</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">反馈时间： </div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="date" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="date" value-format='yyyy-MM-dd' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">问题类型：</div>
                <div class="query-col-input">
                    <el-select>
                        <el-option label="全部" value=""></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="test">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="homeCount" slot-scope="scope">
                    <p @click="onShowHome(scope.data.row.homeIds)" class="colred">{{scope.data.row.homeCount}}</p>
                </template>
                <template slot="wx_openid" slot-scope="scope">
                    {{scope.data.row.wx_openid?'是':'否'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">登录详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userFeedback',
    data () {
        return {
            queryParams: {},
            tableLabel: [
                { label: '反馈人账号', prop: 'nick' },
                { label: '问题类型', prop: 'phone', width: '120px' },
                { label: '问题描述', prop: 'homeCount' },
                { label: '问题图片', prop: 'createTime', formatters: 'dateTime' },
                { label: '反馈时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '联系方式', prop: 'createTime', formatters: 'dateTime' }
            ],
            tableData: [],
            pagination: {}
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    methods: {
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

<style scoped lang="scss">
    .spanflex {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        span {
            flex: 1;
        }
    }
</style>

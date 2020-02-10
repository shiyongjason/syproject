<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont spanflex">
            <span>家庭概览</span>
            <span>家庭数量：377个备份 有效家庭：200个</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号/网关号：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.searchNum" maxlength="20" placeholder="手机或网关号"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="date" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="date" value-format='yyyy-MM-dd' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='280'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { findHomeGeneralSituation } from './api/index'
export default {
    name: 'homemanage',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        }
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                platformType: '',
                searchNum: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '家庭名称', prop: 'homeName' },
                { label: '管理员手机号', prop: 'phone' },
                { label: '成员数', prop: 'memberCount' },
                { label: '物联网关', prop: 'wuLianIotId' },
                { label: '零颗米网关', prop: 'linkIotId' },
                { label: '设备数', prop: 'deviceCount' },
                { label: '房间数', prop: 'roomCount' },
                { label: '创建时间 ', prop: 'createTime', formatters: 'dateTime' },
                { label: '地址', prop: 'address' }

            ]
        }
    },
    watch: {

    },
    mounted () {
        this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    methods: {
        async onQuery () {
            const { data } = await findHomeGeneralSituation(this.queryParams)
            this.tableData = data.data.pageContent
            this.pagination = {
                pageNumber: data.data.pageNumber,
                pageSize: data.data.pageSize,
                total: data.data.totalElements
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.queryParams = {
                pageNumber: 1,
                pageSize: 10,
                searchNum: ''
            }
            this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onEdit (row) {
            sessionStorage.setItem('comfortCloud', JSON.stringify(row))
            this.$router.push({ path: '/comfortCloud/homedetail', query: { homeId: row.homeId } })
        }
    }
}
</script>

<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
        &:first-child {
            font-size: 16px;
        }
        &:last-child {
            text-align: right;
        }
    }
}
</style>

<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>客服电话记录</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.phone" maxlength="20" placeholder="输入手机号"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="customerServiceList" :pagination="customerServicePagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="homes" slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                        <span :class="scope.data.row.homes.length > 0 ? 'el-dropdown-link cursor': 'el-dropdown-link'">
                            {{scope.data.row.homes.length}}个家庭<i :class="scope.data.row.homes.length > 0 ? 'el-icon-arrow-down el-icon--right': 'el-icon--right'"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <template v-for="v in scope.data.row.homes">
                                <el-dropdown-item :key="v.homeId" :command='v.homeId'>{{v.homeName}}</el-dropdown-item>
                            </template>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'equipmentError',
    data () {
        return {
            queryParams: {
                startTime: '',
                endTime: '',
                phone: '',
                pageNumber: 1,
                pageSize: 10
            },
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '呼叫时间', prop: 'callTime', formatters: 'dateTime' },
                { label: '昵称', prop: 'nick' },
                { label: '手机号', prop: 'phone' },
                { label: '号码归属地', prop: 'phoneAddress' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '平台', prop: 'phoneType' },
                { label: '设备数', prop: 'deviceCount' },
                { label: '家庭', prop: 'homes' }
            ]
        }
    },
    computed: {
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
                            time.getTime() < new Date(beginDateVal).getTime() - 86399000
                        )
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo,
            customerServiceList: state => state.cloudmanage.customerServiceList,
            customerServicePagination: state => state.cloudmanage.customerServicePagination
        })
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            onQuery: 'getCustomerService'
        }),
        handleCommand (homeId) {
            this.$router.push({ path: '/comfortCloud/homedetail', query: { homeId } })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery(this.searchParams)
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        }
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.upload-fault {
    margin-top: 30px;
    margin-bottom: 20px;
}
.download-template {
    margin-bottom: 30px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
.fault-code-edit {
    /deep/.el-dialog__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        min-height: 100px;
    }
}
.cursor {
    cursor: pointer;
}
</style>

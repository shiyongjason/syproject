<template>
<div class="B2b">
    <div class="page-body">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">注册时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endCreateTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startCreateTime')" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">会员店：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.memberName" placeholder="请输入会员店">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">会员店账号：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.username" placeholder="请输入会员店账号">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">认证时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startAuthenticationTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endAuthenticationTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endAuthenticationTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startAuthenticationTime')" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="flex-wrap-title">认证状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.authenticationStatus">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未认证" value="1"></el-option>
                            <el-option label="认证中" value="2"></el-option>
                            <el-option label="认证成功" value="3"></el-option>
                            <el-option label="认证失败" value="4"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">所属商家：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入所属商家">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">首次支付时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startPayTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endPayTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endPayTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startPayTime')" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">最近登录时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startLoginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endLoginTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endLoginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startLoginTime')" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">最近购买时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startOrderTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endOrderTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endOrderTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startOrderTime')" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onSearch">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                    <h-button @click="onExport">导出</h-button>
                </div>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
            </basicTable>
        </div>
    </div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { memberRegistrationInfoTableLabel } from './const'
import { downloadMemberDetailInfo } from './api'
export default {
    name: 'memberRegistrationInfo',
    data () {
        return {
            queryParams: {
                startCreateTime: '',
                endCreateTime: '',
                memberName: '',
                username: '',
                merchantName: '',
                startAuthenticationTime: '',
                endAuthenticationTime: '',
                authenticationStatus: '',
                startPayTime: '',
                endPayTime: '',
                startLoginTime: '',
                endLoginTime: '',
                startOrderTime: '',
                endOrderTime: ''
            },
            searchParams: {},
            tableLabel: memberRegistrationInfoTableLabel
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            tableData: state => state.hmall.dataBoard.memberDetailData,
            paginationData: state => state.hmall.dataBoard.memberDetailPaginationData
        })
    },
    methods: {
        pickerOptionsStart (end) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams[end])
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd (start) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams[start])
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapActions('dataBoard', [
            'findMemberDetailInfo'
        ]),
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.findMemberDetailInfo(this.searchParams)
        },
        onReset () {
            this.queryParams = {
                startCreateTime: '',
                endCreateTime: '',
                memberName: '',
                username: '',
                startAuthenticationTime: '',
                endAuthenticationTime: '',
                authenticationStatus: '',
                startPayTime: '',
                endPayTime: '',
                startLoginTime: '',
                endLoginTime: '',
                startOrderTime: '',
                endOrderTime: ''
            }
            this.onSearch()
        },
        onExport () {
            downloadMemberDetailInfo(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        }
    },
    mounted () {
        this.onSearch()
    }
}
</script>
<style lang="scss" scoped>
</style>

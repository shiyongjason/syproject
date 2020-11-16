<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">会员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间： </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startRegisterTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endRegisterTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                    </div>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">
                  已筛选 {{merchantmemberData.total}} 项；
                  累计注册: {{merchantmemberTotalData.registerCount}}个；
                  累计成交订单: {{merchantmemberTotalData.orderCount}}单；
                  累计成交金额:{{merchantmemberTotalData.payAmountTotal}}元；
                  累计奖励:{{merchantmemberTotalData.rewardAmountTotal}}元；
            </el-tag>
            <!-- 表格使用老毕的组件 -->
        <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="source" slot-scope="scope">
                    {{scope.data.row.source==='1'?'自主注册':'好友推荐'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">邀请详情</el-button>
                </template>
            </basicTable>
            </div>
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'comfortcloudMembermanage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: '',
                endRegisterTime: '',
                startRegisterTime: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '会员账号', prop: 'phone' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '注册来源', prop: 'source' },
                { label: '推荐人会员账号', prop: 'inviteUuid' },
                { label: '推荐人会员编号', prop: 'inviteUuid' },
                { label: '邀请会员数量', prop: 'registerCount' },
                { label: '邀请成交订单数', prop: 'orderCount' },
                { label: '邀请成交金额', prop: 'payAmountTotal' },
                { label: '奖励金额', prop: 'rewardAmountTotal' }
            ],
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantmemberData: 'iotmerchantmemberData',
            merchantmemberTotalData: 'iotmerchantmemberTotalData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endRegisterTime
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
                    let beginDateVal = this.queryParams.startRegisterTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        // this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findMerchantMembersituation: 'findMerchantMembersituation',
            iotmerchantmemberDataPagination: 'iotmerchantmemberDataPagination',
            findMerchantMemberTotalsituation: 'findMerchantMemberTotalsituation'
        }),
        async onQuery () {
            await this.findMerchantMembersituation(this.searchParams)
            await this.findMerchantMemberTotalsituation()
            this.tableData = this.merchantmemberData.records
            this.pagination = {
                pageNumber: this.merchantmemberData.current,
                pageSize: this.merchantmemberData.size,
                total: this.merchantmemberData.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onEdit (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberInvitation', query: val })
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
.topTitle{
    margin-right: 2rem;
    font-weight:bold;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}.topColred {
    color: #ff7a45;
    cursor: pointer;
}
/deep/.el-dialog__body {
    padding-top: 10px;
}
</style>

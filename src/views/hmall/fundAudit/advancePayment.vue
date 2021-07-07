<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">代采订单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.agentOrderNo" placeholder="请输入代采订单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">管理员账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.username" placeholder="请输入管理员账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">预付款状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.prepayStatus">
                            <el-option v-for="item in paymentStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__lable">操作人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.operator" placeholder="请输入管理员账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">提交时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.submitStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.submitEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">确认时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.prepayConfirmStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.prepayConfirmEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">订单状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.orderSwitch">
                            <el-option v-for="item in ordrerStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">订单同步状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.orderSyncStatus">
                            <el-option v-for="item in orderSynchronousOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">资金同步状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.fundSyncStatus">
                            <el-option v-for="item in synchronousOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isfiexd="'right'">
                <template slot="prepayStatus" slot-scope="scope">
                    {{paymentStatusMap.get(scope.data.row.prepayStatus) || '-'}}
                </template>
                <template slot="orderSwitch" slot-scope="scope">
                    <span>{{orderStatusMap.get(scope.data.row.orderSwitch)}}}</span>
                </template>
                <template slot="orderSyncStatus" slot-scope="scope">
                    {{orderSynchronousMap.get(scope.data.row.orderSyncStatus)}}
                </template>
                <template slot="fundSyncStatus" slot-scope="scope">
                    {{synchronousMap.get(scope.data.row.fundSyncStatus)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table v-if="scope.data.row.prepayStatus == 10" @click="onSure(scope.data.row)">确认</h-button>
                    <h-button table @click="onseeTask(scope.data.row)">查看</h-button>
                    <h-button table v-if="scope.data.row.orderSyncStatus == 10" @click="onAudit(scope.data.row)">订单同步</h-button>
                    <h-button table v-if="scope.data.row.fundSyncStatus == 10" @click="onFund(scope.data.row)">资金同步</h-button>
                    <h-button table v-if="scope.data.row.orderSwitch == 1" @click="onClose(scope.data.row)">关闭</h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { PAYMENT_STATUS_OPTIONS, PAYMENT_STATUS_MAP, ORDER_STATUS_OPTIONS, ORDER_STATUS_MAP, ORDER_SYNCHRONOUS_OPTIONS, ORDER_SYNCHRONOUS_MAP, SYNCHRONOUS_OPTIONS, SYNCHRONOUS_MAP } from './const'
import { sureFund, closeFund, syncFund, syncMisFund } from './api/index'
export default {
    name: 'advancePayment',
    data () {
        return {
            paymentStatusOptions: PAYMENT_STATUS_OPTIONS,
            paymentStatusMap: PAYMENT_STATUS_MAP,
            ordrerStatusOptions: ORDER_STATUS_OPTIONS,
            orderStatusMap: ORDER_STATUS_MAP,
            orderSynchronousOptions: ORDER_SYNCHRONOUS_OPTIONS,
            orderSynchronousMap: ORDER_SYNCHRONOUS_MAP,
            synchronousOptions: SYNCHRONOUS_OPTIONS,
            synchronousMap: SYNCHRONOUS_MAP,
            queryParams: {
                agentOrderNo: '',
                prepayStatus: '',
                orderSwitch: '',
                orderSyncStatus: '',
                fundSyncStatus: '',
                operator: '',
                submitStartTime: '',
                submitEndTime: '',
                pageNumber: 1,
                pageSize: 10,
                prepayConfirmStartTime: '',
                prepayConfirmEndTime: '',
                companyName: '',
                username: ''
            },
            paginationInfo: {},
            tableLabel: [
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: 'mis订单号', prop: 'misOrderNo' },
                { label: '提交时间', prop: 'createTime', formatters: 'dateTimes' },
                { label: '代采订单总金额', prop: 'totalAmount' },
                { label: '代采商品数量', prop: 'quantity' },
                { label: '预付款', prop: 'prepayAmount' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '店铺名称', prop: 'shopName' },
                { label: '预付款状态', prop: 'prepayStatus' },
                { label: '确认时间', prop: 'prepayConfirmTime' },
                { label: '订单状态', prop: 'orderSwitch' },
                { label: '订单同步状态', prop: 'orderSyncStatus' },
                { label: '资金同步状态', prop: 'fundSyncStatus' },
                { label: '操作人', prop: 'prepayConfirmOperator' }
            ],
            tableData: [],
            copyParams: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            advanceList: state => state.fundAudit.advanceList
        }),
        ...mapGetters({
            merchantData: 'merchantData',
            branchList: 'branchList'
        }),
        ...mapGetters({
            advanceList: 'fundAudit/advanceList'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.submitEndTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.submitStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.prepayConfirmEndTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.prepayConfirmStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        this.init()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        async init () {
            await this.findAdvanceList()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.findAdvanceList(this.queryParams)
        },
        onReset () {
            this.queryParams = { ...this.copyParams }
            this.findAdvanceList()
        },
        ...mapActions({
            findAdvanceList: 'fundAudit/findAdvanceList'
        }),
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findAdvanceList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findAdvanceList()
        },
        onseeTask (val) {
            this.$router.push({ path: '/fundAudit/advanceFundInfo', query: { id: val.id, seeTask: true } })
        },
        async onFund (val) {
            try {
                await syncMisFund(val.id)
                this.findAdvanceList()
            } catch (e) {
                this.findAdvanceList()
            }
        },
        async onAudit (val) {
            try {
                await syncFund(val.id)
                this.findAdvanceList()
            } catch (e) {
                this.findAdvanceList()
            }
        },
        async onSure (val) {
            try {
                await sureFund({
                    id: val.id,
                    updateBy: this.userInfo.employeeName
                })
                this.findAdvanceList()
            } catch (e) {
                this.findAdvanceList()
            }
        },
        async onClose (val) {
            try {
                await closeFund({
                    id: val.id,
                    updateBy: this.userInfo.employeeName
                })
                this.findAdvanceList()
            } catch (e) {
                this.findAdvanceList()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.eltagtop {
    margin-bottom: 10px;
}
.colorRed {
    color: #f00000;
}
.colorGreen {
    color: #67c23a;
}
/deep/.iconfl {
    position: relative;
    i {
        position: absolute;
        top: 3px;
    }
}
/deep/ .el-drawer__body {
    overflow-y: scroll;
    // position: relative;
}
.drawer-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    form {
        // flex: 1;
        margin-bottom: 60px;
        // border-bottom: 1px solid #e5e5e5;
    }
    .drawer-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px 24px;
        border-top: 1px solid #e5e5ea;
        background: #fff;
        z-index: 1000;
        button {
            flex: 1;
        }
        .drawer-button {
            text-align: right;
        }
    }
}
</style>

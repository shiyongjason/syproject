<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="table-cont-title">
                <span class="table-title-name">提现到银行卡</span>
            </div>
            <div class="query-cont-row">
                <el-form
                    :model="withdrawalForm"
                    ref="withdrawalForm"
                    label-width="80px"
                    label-position="right"
                    :rules="rules"
                >
                    <el-form-item label="提现金额" prop="money">
                        <el-input v-model="withdrawalForm.money"></el-input>
                        <span style="margin-left: 20px">可提现金额{{bankAccountInfo.totalBalance | money}}元</span>
                    </el-form-item>
                    <el-form-item label="验证码" prop="name">
                        <el-input v-model="withdrawalForm.name"></el-input>
                        <span style="margin-left: 20px">137****1919</span>
                        <el-button style="margin-left: 20px" size="mini">获取验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onCancel">取消</el-button>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="table-cont-title">提现明细</div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">提现时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.withdrawTimeStart" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.withdrawTimeEnd" type="date" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">操作人：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.operator" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">查询</el-button>
                        <!-- <el-button type="primary" class="ml20" @click="onRest()">重置</el-button> -->
                        <button type="button" class="el-button ml20 el-button--primary" @click="onExport"><span>导出</span></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- :rowKey="rowKey" -->
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" @onSortChange="onSortChange"
                :isShowIndex='true'>
                <template slot-scope="scope" slot="status">
                <!--10:待支付，20:待发货，30:待收货，40:已完成，50:已关闭-->
                <span v-if="scope.data.row.status === 20">处理中</span>
                <span v-if="scope.data.row.status === 30">成功</span>
                <span v-if="scope.data.row.status === 40">失败</span>
            </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
import { IsFixedTwoNumber } from '@/utils/rules.js'
export default {
    data () {
        return {
            withdrawalForm: {

            },
            rules: {
                money: [
                    { required: true, message: '请输入提现金额', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, message: '可以输入有两位小数的正实数', trigger: 'blur' }
                ]
            },
            queryParams: {
                operator: '',
                withdrawTimeStart: '',
                withdrawTimeEnd: '',
                pageNumber: 1,
                pageSize: 10
            },
            serviceTotalProperty: '',
            tableLabel: [
                { label: '提现时间', prop: 'withdrawTime', formatters: 'dateTime' },
                { label: '提现金额（元）', prop: 'amount', formatters: 'money', sortable: true },
                { label: '操作人', prop: 'operator' },
                { label: '状态', prop: 'status' }
            ]
        }
    },
    computed: {
        ...mapGetters('finance', {
            cashWithdrawalInfo: 'cashWithdrawalInfo',
            bankAccountInfo: 'bankAccountInfo'
        }),
        tableData () {
            return this.cashWithdrawalInfo.records
        },
        paginationInfo () {
            return {
                pageNumber: this.cashWithdrawalInfo.current,
                pageSize: this.cashWithdrawalInfo.size,
                total: this.cashWithdrawalInfo.total
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.queryParams.withdrawTimeEnd
                    if (endDateVal) {
                        return time.getTime() >= new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.withdrawTimeStart
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        this.findCashWithdrawalAction()
        this.findBankAccountInfo()
    },
    methods: {
        ...mapActions('finance', {
            findCashWithdrawal: 'findCashWithdrawal',
            findBankAccountInfo: 'findBankAccountInfo'
        }),

        onSubmit () {

        },

        onCancel () {

        },

        searchList () {
            this.queryParams.pageNumber = 1
            this.findCashWithdrawalAction()
        },

        onRest () {
            this.queryParams = {
                operator: '',
                withdrawTimeStart: '',
                withdrawTimeEnd: '',
                pageNumber: 1,
                pageSize: 10
            }
            this.findCashWithdrawalAction()
        },

        onExport () {
            let url = ''
            for (let key in this.queryParams) {
                url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
            }
            location.href = B2bUrl + 'order/api/boss/orders/finance-orders/export?' + url
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findCashWithdrawalAction()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findCashWithdrawalAction()
        },

        onSortChange (val) {
            if (val.prop === 'amount') {
                this.queryParams['sort.property'] = 'amount'
                this.queryParams['sort.direction'] = val.order === 'descending' ? 'DESC' : 'ASC'
            }
            this.findCashWithdrawalAction()
        },

        findCashWithdrawalAction () {
            this.findCashWithdrawal(this.queryParams)
        }
    }
}
</script>

<style lang="scss" scoped>
.balance-cont-row {
    display: flex;
    padding: 10px 10px 40px 10px;
}
.balance-cont-col {
    display: inline-flex;
    flex: 1;
    align-items: center;

    .balance-col-icon {
        display: inline-block;
        width: 64px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        border-radius: 50%;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);

        i {
            font-size: 30px;
            color: $whiteColor;
        }
    }

    &:nth-child(1) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }
    &:nth-child(2) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }
    &:nth-child(3) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(153, 153, 153, 1) 0%,
                rgba(102, 102, 102, 1) 100%
            );
        }
    }
    &:nth-child(4) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(105, 192, 255, 1) 0%,
                rgba(24, 144, 255, 1) 100%
            );
        }
    }

    .balance-col-money {
        margin-left: 16px;
        display: inline-block;

        p:first-child {
            line-height: 45px;
            font-size: 32px;
        }
        p:last-child {
            line-height: 20px;
            span {
                color: #666;
            }
        }
    }
}
</style>
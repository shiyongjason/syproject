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
                    <el-form-item label="银行卡号">
                        <span style="margin-left: 20px">{{bankCardInfo.bankAccountNumber}}</span>
                    </el-form-item>
                    <el-form-item label="提现金额" prop="amount">
                        <el-input v-model="withdrawalForm.amount" placeholder="请填写"></el-input>
                        <span style="margin-left: 20px">可提现金额{{bankAccountInfo.totalBalance | moneyShow}}元</span>
                    </el-form-item>
                    <el-form-item label="验证码" prop="smsCode">
                        <el-input v-model="withdrawalForm.smsCode" placeholder="请填写" maxlength="6"></el-input>
                        <span style="margin-left: 20px">{{phoneNumber}}</span>
                        <el-button
                            style="margin-left: 20px"
                            size="mini"
                            :disabled="after?false:true"
                            @click="onMobileVerifica"
                        >{{content}}</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onCancel">取消</el-button>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
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
                    {{ cashWithdrawalMap.get(scope.data.row.status) }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { CASH_WITHDRAWAL_MAP } from './const'
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
import { getSmsCode, cashWithdrawal } from './api/index'
import { VerificationCode } from '@/utils/rules.js'
export default {
    data () {
        return {
            cashWithdrawalMap: CASH_WITHDRAWAL_MAP,
            withdrawalForm: {
                amount: '',
                smsCode: ''
            },
            after: true,
            content: '获取验证码',
            time: 60,
            clock: null,
            rules: {
                amount: [
                    { required: true, message: '请输入提现金额', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            var Reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (value == 0) {
                                return callback(new Error('提现金额不能为0'))
                            } else if (Number(value) > Number(this.bankAccountInfo.totalBalance)) {
                                return callback(new Error('提现金额超限'))
                            } else if (value && !(Reg.test(value))) {
                                return callback(new Error('金额格式为小数点前十三位，小数点后两位'))
                            } else if (value < 100) {
                                return callback(new Error('提现金额最低100元'))
                            }
                            return callback()
                        }
                    }
                ],
                smsCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { validator: VerificationCode, trigger: 'blur' }
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
                { label: '提现金额（元）', prop: 'amount', formatters: 'moneyShow', sortable: true },
                { label: '操作人', prop: 'operator' },
                { label: '状态', prop: 'status' }
            ]
        }
    },
    computed: {
        ...mapGetters('finance', {
            cashWithdrawalInfo: 'cashWithdrawalInfo',
            bankAccountInfo: 'bankAccountInfo',
            bankCardInfo: 'bankCardInfo'
        }),
        phoneNumber () {
            return this.bankCardInfo.bankPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
        },
        reqWithdraw () {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            return {
                ...this.withdrawalForm,
                bankCardId: this.bankCardInfo.bankCardId,
                mobile: this.bankCardInfo.bankPhoneNumber,
                operator: `${userInfo.employeeName}(${userInfo.phoneNumber})`,
                receivedAmount: this.withdrawalForm.amount,
                serviceFee: 0
            }
        },
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
        this.findBankCardInfo()
    },
    methods: {
        ...mapActions('finance', {
            findCashWithdrawal: 'findCashWithdrawal',
            findBankAccountInfo: 'findBankAccountInfo',
            findBankCardInfo: 'findBankCardInfo'
        }),

        onMobileVerifica () {
            this.after = false
            this.content = '重新发送 ' + this.time
            getSmsCode()
            this.clock = setInterval(() => {
                this.time--
                this.content = '重新发送' + this.time
                if (this.time <= 0) {
                    clearInterval(this.clock)
                    this.content = '获取验证码'
                    this.time = 60
                    this.after = true
                }
            }, 1000)
        },

        onSubmit () {
            this.$refs['withdrawalForm'].validate(async (valid) => {
                if (valid) {
                    this.$confirm(`确认提现?`, '提现', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(async () => {
                        await cashWithdrawal(this.reqWithdraw)
                        this.withdrawalSuccess()
                    })
                }
            })
        },

        withdrawalSuccess () {
            this.$refs['withdrawalForm'].resetFields()
            this.findCashWithdrawalAction()
            this.findBankAccountInfo()
            this.findBankCardInfo()
            clearInterval(this.clock)
            this.content = '获取验证码'
            this.time = 60
            this.after = true
            this.$message({
                showClose: true,
                message: '提现成功',
                type: 'success'
            })
        },

        onCancel () {
            this.$router.push('/b2b/finance/charge')
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
            url += 'access_token=' + sessionStorage.getItem('token')
            location.href = B2bUrl + 'payment/api/boss/service-fee/withdraws/export?' + url
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
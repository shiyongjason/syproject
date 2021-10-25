<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="title-cont">
                <span class="title-cont__label">提现到银行卡</span>
            </div>
            <div class="query-cont__row mb20">
                <el-form :model="withdrawalForm" ref="withdrawalForm" label-width="80px" label-position="right" :rules="rules">
                    <el-form-item label="银行卡号">
                        <span style="margin-left: 20px">{{freightBankCardInfo.bankAccountNumber}}</span>
                    </el-form-item>
                    <el-form-item label="提现金额" prop="amount">
                        <el-input v-model="withdrawalForm.amount" placeholder="请填写"></el-input>
                        <span style="margin-left: 20px">可提现金额{{freightBankAccountInfo.totalBalance | moneyFormat}}元</span>
                    </el-form-item>
                    <el-form-item label="验证码" prop="smsCode">
                        <el-input v-model="withdrawalForm.smsCode" placeholder="请填写" maxlength="6"></el-input>
                        <span style="margin-left: 20px">{{phoneNumber}}</span>
                        <h-button table class="ml20" :disabled="after?false:true" @click="onMobileVerifica">{{content}}</h-button>
                    </el-form-item>
                    <el-form-item>
                        <h-button @click="onCancel">取消</h-button>
                        <h-button type="primary" @click="onSubmit">确定</h-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="title-cont">
                <span class="title-cont__label">提现明细</span>
            </div>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">提现时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.withdrawTimeStart" type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptionsStart"></el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.withdrawTimeEnd" type="date" placeholder="结束时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptionsEnd"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">操作人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.operator" maxlength="50" placeholder="请输入操作人"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__input">
                        <h-button type="primary" @click="searchList()">查询</h-button>
                        <!-- <h-button class="ml20" @click="onRest()">重置</h-button> -->
                        <h-button @click="onExport">导出</h-button>
                    </div>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isShowIndex='true'>
                <template slot-scope="scope" slot="status">
                    {{ cashWithdrawalMap.get(scope.data.row.status) }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { CASH_WITHDRAWAL_MAP } from '../const'
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
import { getFreightSmsCode, freightcashWithdrawal } from '../api/index'
import { VerificationCode } from '@/utils/rules.js'
export default {
    name: 'withdrawalFreight',
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
                            } else if (Number(value) > Number(this.freightBankAccountInfo.totalBalance)) {
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
            freightWithdrawalInfo: 'freightWithdrawalInfo',
            freightBankAccountInfo: 'freightBankAccountInfo',
            freightBankCardInfo: 'freightBankCardInfo'
        }),
        phoneNumber () {
            return this.freightBankCardInfo.bankPhoneNumber && this.freightBankCardInfo.bankPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
        },
        reqWithdraw () {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            return {
                ...this.withdrawalForm,
                bankCardId: this.freightBankCardInfo.bankCardId,
                mobile: this.freightBankCardInfo.bankPhoneNumber,
                operator: `${userInfo.employeeName}(${userInfo.phoneNumber})`,
                receivedAmount: this.withdrawalForm.amount,
                serviceFee: 0
            }
        },
        tableData () {
            return this.freightWithdrawalInfo.records
        },
        paginationInfo () {
            return {
                pageNumber: this.freightWithdrawalInfo.current,
                pageSize: this.freightWithdrawalInfo.size,
                total: this.freightWithdrawalInfo.total
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
        this.findFreightWithdrawalAction()
        this.findFreightBankAccountInfo()
        this.findFreightBankCardInfo()
    },
    methods: {
        ...mapActions({
            findFreightWithdrawal: 'finance/findFreightWithdrawal',
            findFreightBankAccountInfo: 'finance/findFreightBankAccountInfo',
            findFreightBankCardInfo: 'finance/findFreightBankCardInfo'
        }),

        onMobileVerifica () {
            this.after = false
            this.content = '重新发送 ' + this.time
            getFreightSmsCode()
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
                        await freightcashWithdrawal(this.reqWithdraw)
                        this.withdrawalSuccess()
                    })
                }
            })
        },

        withdrawalSuccess () {
            this.$refs['withdrawalForm'].resetFields()
            this.findFreightWithdrawalAction()
            this.findFreightBankAccountInfo()
            this.findFreightBankCardInfo()
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
        // 取消
        onCancel () {
            this.$router.push('/b2b/finance/freightDetails')
        },
        // 查询操作
        searchList () {
            this.queryParams.pageNumber = 1
            this.findFreightWithdrawalAction()
        },
        // 重置操作
        onRest () {
            this.queryParams = {
                operator: '',
                withdrawTimeStart: '',
                withdrawTimeEnd: '',
                pageNumber: 1,
                pageSize: 10
            }
            this.findFreightWithdrawalAction()
        },
        // 导出操作
        onExport () {
            let url = ''
            for (let key in this.queryParams) {
                url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
            }
            url += 'access_token=' + localStorage.getItem('token')
            location.href = B2bUrl + 'payment/boss/freight/withdraws/export?' + url
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findFreightWithdrawalAction()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findFreightWithdrawalAction()
        },
        findFreightWithdrawalAction () {
            this.findFreightWithdrawal(this.queryParams)
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

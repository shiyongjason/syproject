<template>
    <!-- 借款信息 分授信 -->
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
        <div class="form">
            <div class="dialogtitle">借款信息：</div>
            <el-form :model="detailData" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="开票金额：" prop="invoiceAmount">
                            <el-input v-model.trim="detailData.invoiceAmount" v-isNum="detailData.invoiceAmount" maxlength='20' placeholder="请输入开票金额" :disabled='detailData.isRepayment'>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="供货商名称：" prop="supplier">
                            <el-input v-model.trim="detailData.supplier" placeholder="请输入供货商名称" maxlength='30' :disabled='detailData.isRepayment'></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="借款金额：" prop="loanAmount">
                            <el-input v-model.trim="detailData.loanAmount" v-isNum:2="detailData.loanAmount" maxlength='20' placeholder="请输入借款金额" :disabled='detailData.isRepayment'>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="年利率：" prop="yearRate">
                            <el-input v-model.trim="detailData.yearRate" v-isNum="detailData.yearRate" maxlength='20' placeholder="请输入年利率" :disabled='detailData.isRepayment'>
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <!-- 1、默认状态选择为月，天的输入框置灰2、第一笔还款维护后，变为不可修改 -->
                        <el-form-item label="借款期限：">
                            <el-radio style="margin-right:5px" v-model.trim="detailData.loanDateType" :label=1 @change='loanDateNumM' :disabled='detailData.isRepayment || detailData.repaymentType == 2'>月</el-radio>
                            <el-input v-model.trim="detailData.loanDateNumM" v-isPositiveInt="detailData.loanDateNumM" maxlength='5' placeholder="请输入借款期限" :disabled='detailData.loanDateType != 1 || detailData.isRepayment || detailData.repaymentType == 2' @blur="loanDateNumM">
                                <template slot="append">月</template>
                            </el-input>
                            <el-radio style="margin:0 5px 0 10px" v-model.trim="detailData.loanDateType" :label=2 @change='loanDateNumD' :disabled='detailData.isRepayment || detailData.repaymentType == 2'>天</el-radio>
                            <el-input v-model.trim="detailData.loanDateNumD" v-isPositiveInt="detailData.loanDateNumD" maxlength='5' placeholder="请输入借款期限" :disabled='detailData.loanDateType != 2 || detailData.isRepayment' @blur="loanDateNumD">
                                <template slot="append">天</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="开票日期：" prop="invoiceTime">
                            <el-date-picker v-model="detailData.invoiceTime" type="date" :picker-options="pickerOptionsStart" value-format='yyyy-MM-dd' placeholder="请选择开票日期" :disabled='detailData.isRepayment'>
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款日期：" prop="loanStartTime">
                            <!-- 第一笔还款维护后，变为不可修改 -->
                            <el-date-picker v-model="detailData.loanStartTime" type="date" :picker-options="pickerOptionsStart" value-format='yyyy-MM-dd' placeholder="请选择出票日期" @change="datePickerChange" :disabled='detailData.isRepayment'>
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="到期日：">
                            <!-- 自动计算，到期日=借款日期+借款期限 -->
                            <span>{{detailData.loanEndTimeLoan}}</span>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button v-if='!detailData.isRepayment' type="primary" @click="onSave" :loading='loading'>保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import moment from 'moment'
import { setLoan } from '../../api'
export default {
    name: 'pointsCreditBillingDialog',
    data () {
        return {
            radio: '月',
            rules: {
                name: [
                    { required: true, message: '请输入台账编号', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detailData: {
            type: Object,
            default: () => ({
                accountId: '', // 台账id
                depositPay: '', // 保证金缴纳
                depositProportion: '', // 保证金比例
                id: '', // 主键id
                invoiceAmount: '', // 开票金额
                invoiceTime: '', // 开票时间
                loanAmount: '', // 借款金额（敞口金额）
                loanDateNum: '', // 借款期限
                loanDateType: '', // 借款期限类型 1：月 2：天
                loanEndTime: '', // 借款结束日期,格式为:yyyy-MM-dd HH:mm:ss
                loanStartTime: '', // 借款开始日期
                registrant: '', // 登记人
                repaymentType: '', // 还款类型 1：一次性还款 2：334还款
                supplier: '', // 供货商
                yearRate: ''// 年利率
            })
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    // let endDateVal = this.flowform.loanEndTime
                    // if (endDateVal) {
                    //     return time.getTime() > new Date(endDateVal).getTime() || time.getTime() <= Date.now() - 1 * 24 * 60 * 60 * 1000
                    // }
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    methods: {
        onCancle () {
            this.$emit('onClose')
        },
        async onSave () {
            this.loading = true
            this.detailData.loanEndTime = this.detailData.loanEndTimeLoan
            if (this.detailData.loanEndTime === '-') this.detailData.loanEndTime = ''
            await setLoan(this.detailData)
            this.loading = false
            this.$message({ type: 'success', message: '修改成功' })
            this.onCancle()
            this.$emit('reload')
        },
        loanDateNumM () {
            this.detailData.loanEndTimeLoan = moment(this.detailData.loanStartTime).add(this.detailData.loanDateNumM, 'M').format('YYYY-MM-DD')
            this.detailData.loanDateNum = +this.detailData.loanDateNumM
            this.$forceUpdate()
        },
        loanDateNumD () {
            this.detailData.loanEndTimeLoan = moment(this.detailData.loanStartTime).add(this.detailData.loanDateNumD, 'd').format('YYYY-MM-DD')
            this.detailData.loanDateNum = +this.detailData.loanDateNumD
            this.$forceUpdate()
        },
        datePickerChange (val) {
            if (!this.detailData.loanStartTime) {
                this.detailData.loanEndTimeLoan = '-'
                return false
            }
            // 月
            if (this.detailData.loanDateType == 1) {
                this.$set(this.detailData, 'loanEndTimeLoan', moment(val).add(this.detailData.loanDateNum, 'M').format('YYYY-MM-DD'))
            }
            // 天
            if (this.detailData.loanDateType == 2) {
                this.$set(this.detailData, 'loanEndTimeLoan', moment(val).add(this.detailData.loanDateNum, 'd').format('YYYY-MM-DD'))
            }
            this.$forceUpdate()
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding: 20px 24px;
}
.dialogtitle {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 30px;
    color: #000;
    border-bottom: none;
}
.dw {
    margin-left: 10px;
}
</style>

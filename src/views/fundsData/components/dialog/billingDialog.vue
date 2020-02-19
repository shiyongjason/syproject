<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
        <div class="form">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="开票金额：" prop="invoiceAmount">
                            <!-- 第一笔还款维护后，开票金额输入框去除，变为不可修改 -->
                            <el-input v-model.trim="form.invoiceAmount" v-isNum="form.name" maxlength='20' placeholder="请输入开票金额" @blur="setVal"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="供货商名称：" prop="supplier">
                            <el-input v-model.trim="form.supplier" placeholder="请输入供货商名称" maxlength='30'></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="保证金比例：" prop="depositProportion">
                            <!-- 第一笔还款维护后，保证金比例输入框去除，变为不可修改 -->
                            <el-input v-model.trim="form.depositProportion" v-isNum="form.depositProportion" maxlength='20' placeholder="请输入保证金比例" @blur="setDepositProportion"></el-input>
                            <span class="dw">%</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="保证金缴纳：" prop="depositPay">
                            <!-- 第一笔还款维护后，保证金缴纳金额输入框去除，变为不可修改 -->
                            <el-input v-model.trim="form.depositPay" v-isNum="form.depositPay" maxlength='20' placeholder="请输入保证金缴纳金额" @blur="doCompute"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="敞口金额：" prop="loanAmount">
                            <!-- 第一笔还款维护后，敞口金额输入框去除，变为不可修改 -->
                            <el-input v-model.trim="form.loanAmount" v-isNum="form.loanAmount" maxlength='20' placeholder="请输入敞口金额"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <!-- 第一笔还款维护后，变为不可修改 -->
                        <el-form-item label="承兑期限：" prop="loanDateNum">
                            <el-radio style="margin-right:5px" v-model.trim="form.loanDateType" :label="1"></el-radio>
                            <el-input v-model.trim="form.loanDateNum" v-isNum:0="form.loanDateNum" maxlength='5' placeholder="请输入借款期限"></el-input>
                            <span class="dw">月</span>
                            <el-radio style="margin:0 5px 0 10px" v-model.trim="form.loanDateType" :label="2"></el-radio>
                            <el-input v-model.trim="form.loanDateNum" v-isNum:0="form.loanDateNum" maxlength='5' placeholder="请输入借款期限"></el-input>
                            <span class="dw">天</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <!-- 第一笔还款维护后，变为不可修改 -->
                        <el-form-item label="开票日期：" prop="invoiceTime">
                            <el-date-picker v-model="form.invoiceTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择开票日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="到期日：" prop="name">
                            <!-- 自动计算，到期日=开票日期+借款期限 -->
                            <span>{{form.loanEndTime|formatDate('YYYY-MM-DD')}}</span>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSave">保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setLoan } from '../../api'
export default {
    name: 'billingDialog',
    data () {
        return {
            form: {
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
            },
            rules: {
                name: [
                    { required: true, message: '请输入台账编号', trigger: 'blur' }
                ]
            }
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detailData: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        setVal () {
            if (this.form.depositProportion) {
                this.form.depositPay = (this.form.invoiceAmount * (this.form.depositProportion / 100)).toFixed(2)
            }
        },
        doCompute () {
            this.form.depositProportion = (this.form.depositPay / this.form.invoiceAmount) * 100
        },
        setDepositProportion (val) {
            // this.form.depositProportion = val
            this.form.depositPay = (this.form.invoiceAmount * (this.form.depositProportion / 100)).toFixed(2)
            this.form.loanAmount = (this.form.invoiceAmount - (this.form.depositPay ? this.form.depositPay : 0)).toFixed(2)
        },
        onCancle () {
            this.$emit('onClose')
        },
        async onSave () {
            console.log(this.form)
            await setLoan(this.form)
            this.$message({
                type: 'success',
                message: '修改成功'
            })
            this.onCancle()
            this.$emit('reload')
        }
    },
    mounted () {
        this.form = {
            accountId: this.detailData.loan_accountId, // 台账id
            depositPay: this.detailData.loan_depositPay, // 保证金缴纳
            depositProportion: this.detailData.loan_depositProportion, // 保证金比例
            id: this.detailData.loan_id, // 主键id
            invoiceAmount: this.detailData.loan_invoiceAmount, // 开票金额
            invoiceTime: this.detailData.loan_invoiceTime, // 开票时间
            loanAmount: this.detailData.loan_loanAmount, // 借款金额（敞口金额）
            loanDateNum: this.detailData.loan_loanDateNum, // 借款期限
            loanDateType: this.detailData.loan_loanDateType, // 借款期限类型 1：月 2：天
            loanEndTime: this.detailData.loan_loanEndTime, // 借款结束日期,格式为:yyyy-MM-dd HH:mm:ss
            loanStartTime: this.detailData.loan_loanStartTime, // 借款开始日期
            registrant: this.detailData.loan_registrant, // 登记人
            repaymentType: this.detailData.loan_repaymentType, // 还款类型 1：一次性还款 2：334还款
            supplier: this.detailData.loan_supplier, // 供货商
            yearRate: this.detailData.loan_yearRate// 年利率
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

<template>
    <!-- <div class="page-body">
        <div class="page-body-cont query-cont"> -->
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
        <div class="form">
            <div class="dialogtitle">借款信息：</div>
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="开票金额：" prop="invoiceAmount">
                            <el-input v-model.trim="form.invoiceAmount" v-isNum="form.invoiceAmount" maxlength='20' placeholder="请输入开票金额"></el-input>
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
                        <el-form-item label="借款金额：" prop="loanAmount">
                            <el-input v-model.trim="form.loanAmount" v-isNum="form.loanAmount" maxlength='20' placeholder="请输入借款金额"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="年利率：" prop="yearRate">
                            <el-input v-model.trim="form.yearRate" v-isNum="form.yearRate" maxlength='20' placeholder="请输入年利率"></el-input>
                            <span class="dw">%</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <!-- 1、默认状态选择为月，天的输入框置灰2、第一笔还款维护后，变为不可修改 -->
                        <el-form-item label="借款期限：" prop="loanDateNum">
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
                        <el-form-item label="开票日期：" prop="invoiceTime">
                            <el-date-picker v-model="form.invoiceTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择开票日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="放款日期：" prop="loanStartTime">
                            <!-- 第一笔还款维护后，变为不可修改 -->
                            <el-date-picker v-model="form.loanStartTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择出票日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="到期日：" prop="loanEndTime">
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
    <!-- </div>
    </div> -->

</template>

<script>
import { setLoan } from '../../api'
export default {
    name: 'pointsCreditBillingDialog',
    data () {
        return {
            radio: '月',
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

<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1000px" :before-close='onCancle'>
        <!-- <div class="query-cont-col">
            <div class="query-col-title">手动调息金额：</div>
            <div class="query-col-input">
                <el-input type="text" maxlength="16" v-model="detailData.manualInterest" v-isNegative:4="detailData.manualInterest" placeholder="请输入手动调息金额">
                </el-input>
            </div>
        </div> -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
            <div v-for="(item, index) in mockArr" :key="index">
                <el-divider v-if="mockArr.length == 3" content-position="left">第{{index+1}}期还款调息：</el-divider>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应收正常利息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <div class="checkStyle">
                            <el-checkbox label="正常利息调息" v-model="ruleForm.type"></el-checkbox>
                        </div>
                        <el-input v-show="ruleForm.type" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收正常利息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余正常利息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应收宽限期利息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <div class="checkStyle">
                            <el-checkbox label="宽限期利息调息" v-model="ruleForm.type"></el-checkbox>
                        </div>
                        <el-input v-show="ruleForm.type" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收宽限期利息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余宽限期利息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应收逾期罚息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <div class="checkStyle">
                            <el-checkbox label="逾期罚息调息" v-model="ruleForm.type"></el-checkbox>
                        </div>
                        <el-input v-show="ruleForm.type" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收逾期罚息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余逾期罚息：">
                            <div class="w250">100.00</div>
                        </el-form-item>
                    </div>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSure" :loading='loading'>确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setLoan } from '../../../api'
export default {
    name: 'regulatingBreathingDialog',
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
                yearRate: '', // 年利率
                manualInterest: '' // 手动调息
            })
        }
    },
    data () {
        return {
            loading: false,
            ruleForm: {
            },
            rules: {},
            mockArr: [{}]
        }
    },
    methods: {
        async onSure () {
            console.log(this.ruleForm)
            // this.loading = true
            // await setLoan(this.detailData)
            // this.loading = false
            // this.$message({ type: 'success', message: '修改成功' })
            // this.onCancle()
            // this.$emit('reload')
        },
        onCancle () {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="scss" scoped>
.w250 {
    width: 250px;
    padding: 0 16px;
    box-sizing: border-box;
}
.checkStyle {
    width: 180px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 12px;
    box-sizing: border-box;
}
/deep/ .el-dialog__body {
    padding: 20px 24px;
}
/deep/.el-form .el-input {
    width: 250px;
}
/deep/ .el-dialog__body {
    padding: 0 24px;
    max-height: 600px;
    overflow: auto;
}
</style>

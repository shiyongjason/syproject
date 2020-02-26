<template>
    <el-dialog title="手动调息" :visible.sync="dialogVisible" :close-on-click-modal='false' width="30%" :before-close='onCancle'>
        <div class="query-cont-col">
            <div class="query-col-title">手动调息金额：</div>
            <div class="query-col-input">
                <el-input type="text" maxlength="10" v-model="detailData.manualInterest" placeholder="请输入手动调息金额">
                </el-input>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSure" :loading='loading'>确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setLoan } from '../../api'
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
            loading: false
        }
    },
    methods: {
        async onSure () {
            this.loading = true
            await setLoan(this.detailData)
            this.loading = false
            this.$message({ type: 'success', message: '修改成功' })
            this.onCancle()
            this.$emit('reload')
        },
        onCancle () {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding: 20px 24px;
}
</style>

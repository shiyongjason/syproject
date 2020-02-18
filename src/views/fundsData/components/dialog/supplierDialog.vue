<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
        <div class="form">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="dialogtitle">借款信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="供货商名称：" prop="supplier">
                            <el-input v-model.trim="form.supplier" placeholder="请输入供货商名称" maxlength='30'></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款金额：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入借款金额"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="年利率：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入年利率"></el-input>
                            <span class="dw">%</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="放款日期：" prop="name">
                            <el-date-picker v-model="form.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择放款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款期限： " prop="name">
                            <el-radio style="margin-right:5px" v-model.trim="radio" label="月"></el-radio>
                            <el-input v-model.trim="form.name" v-isNum:0='form.name' maxlength='3' placeholder="请输入借款期限"></el-input>
                            <span class="dw">月</span>
                            <el-radio style="margin:0 5px 0 10px" v-model.trim="radio" label="天"></el-radio>
                            <el-input v-model.trim="form.name" v-isNum:0='form.name' maxlength='3' placeholder="请输入借款期限"></el-input>
                            <span class="dw">天</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="到期日：" prop="name">
                            <!-- 自动计算，到期日=开票日期+借款期限 -->
                            <span>2020-11-18</span>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSure">保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'supplierDialog',
    data () {
        return {
            radio: '月',
            form: {
                name: '',
                description: '', // 台账借款表
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
        onSure () {
            //
        }
    },
    mounted () {
        console.log('detailData', this.detailData)
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

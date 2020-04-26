<template>
    <div class="districtEmployee">
        <h3>区域申报内容</h3>
        <el-form :model="fundDetail.subRegionFundPlanApply" :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
            <el-form-item :label="`${yearMonth}预计资金还款：`" prop="prePaymentCurrentMonth">
                <el-input v-model.trim="fundDetail.subRegionFundPlanApply.prePaymentCurrentMonth" v-isNum:6="fundDetail.subRegionFundPlanApply.prePaymentCurrentMonth" maxlength='20' placeholder="请输入金额" :disabled='disabled'>
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item :label="`${yearMonth}预计资金用款：`" prop="preApplyCurrentMonth">
                <el-input v-model.trim="fundDetail.subRegionFundPlanApply.preApplyCurrentMonth" v-isNum:6="fundDetail.subRegionFundPlanApply.preApplyCurrentMonth" maxlength='20' placeholder="请输入金额" :disabled='disabled'>
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="资金支持类型：" prop="fundType">
                <div class="w250">
                    <el-select v-model="fundDetail.subRegionFundPlanApply.fundType" :disabled='disabled'>
                        <el-option label="经营用款" value="001"></el-option>
                        <el-option label="注资款" value="002"></el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item :label="`${yearMonth}预计销售：`" prop="preSaleCurrentMonth">
                <el-input v-model.trim="fundDetail.subRegionFundPlanApply.preSaleCurrentMonth" v-isNum:6="fundDetail.subRegionFundPlanApply.preSaleCurrentMonth" maxlength='20' placeholder="请输入金额" :disabled='disabled'>
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="区域意见：" prop="remark">
                <div class="w250">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" maxlength="1000" show-word-limit v-model="fundDetail.subRegionFundPlanApply.remark" :disabled='disabled'></el-input>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'districtEmployee',
    props: {
        fundDetail: {
            type: Object,
            default: () => {
                return {
                    subRegionFundPlanApply: {
                        prePaymentCurrentMonth: ''
                    }
                }
            }
        },
        disabled: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        required: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    computed: {
        yearMonth () {
            if (!this.fundDetail.fundplanMain.applyMonth) {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanMain.applyMonth.substring(0, 4)}年${this.fundDetail.fundplanMain.applyMonth.substring(4, 6)}月`
        }
    },
    data () {
        return {
            rules: {
                prePaymentCurrentMonth: [
                    { required: this.required, message: '请输入预计资金还款', trigger: 'blur' }
                ],
                preApplyCurrentMonth: [
                    { required: this.required, message: '请输入预计资金用款', trigger: 'blur' }
                ],
                fundType: [
                    { required: this.required, message: '请选择资金支持类型', trigger: 'change' }
                ],
                preSaleCurrentMonth: [
                    { required: this.required, message: '请输入预计销售', trigger: 'blur' }
                ],
                remark: [
                    { required: this.required, message: '请输入区域意见', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.districtEmployee {
    padding: 0 24px;
}
</style>

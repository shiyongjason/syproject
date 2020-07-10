<template>
    <div class="branchFinancial">
        <h3>分部财务核定</h3>
        <el-form :model="fundDetail.subsectionFinanceFundPlanApprove" :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
            <el-form-item label="健康度指标：" prop="healthPercentage">
                <el-input v-model.trim="fundDetail.subsectionFinanceFundPlanApprove.healthPercentage" v-isNum:2="fundDetail.subsectionFinanceFundPlanApprove.healthPercentage" maxlength='20' placeholder="请输入健康度指标" :disabled='disabled'>
                    <template slot="append">%</template>
                </el-input>
            </el-form-item>
            <el-form-item label="分部财务意见：" prop="remark">
                <div class="w250">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" maxlength="1000" show-word-limit v-model="fundDetail.subsectionFinanceFundPlanApprove.remark" :disabled='disabled'></el-input>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'branchFinancial',
    props: {
        fundDetail: {
            type: Object,
            default: () => {
                return {}
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
    data () {
        return {
            rules: {
                healthPercentage: [
                    { required: this.required, message: '请输入健康度指标', trigger: 'blur' }
                ],
                remark: [
                    { required: this.required, message: '请输入分部财务意见', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.branchFinancial {
    padding: 0 24px;
}
</style>

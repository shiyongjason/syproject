<template>
    <div class="regionalManager">
        <h3>大区总经理审批</h3>
        <el-form :model="fundDetail.regionManagerFundPlanApprove" :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
            <el-form-item label="大区总审批金额：" prop="approveAmount">
                <el-input v-model.trim="fundDetail.regionManagerFundPlanApprove.approveAmount" v-isNum:2="fundDetail.regionManagerFundPlanApprove.approveAmount" maxlength='20' placeholder="请输入金额" :disabled='disabled'>
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="大区总意见：" prop="remark">
                <div class="w250">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" maxlength="1000" show-word-limit v-model="fundDetail.regionManagerFundPlanApprove.remark" :disabled='disabled'></el-input>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'regionalManager',
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
        }
    },
    data () {
        return {
            rules: {
                approveAmount: [
                    { required: true, message: '请输入审批金额', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '请输入大区总意见', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.regionalManager {
    padding: 0 24px;
}
</style>

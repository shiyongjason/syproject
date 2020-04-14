<template>
    <div class="branchFinancial">
        <h3>分部财务核定</h3>
        <el-form :model="districtContent" :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
            <el-form-item label="健康度指标：" prop="invoiceAmount">
                <el-input v-model.trim="districtContent.invoiceAmount" v-isNum="districtContent.invoiceAmount" maxlength='20' placeholder="请输入健康度指标">
                    <template slot="append">%</template>
                </el-input>
            </el-form-item>
            <el-form-item label="是否有逾期：">
                <el-radio-group v-model="districtContent.resource">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="区域意见：">
                <div class="w250">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" maxlength="1000" show-word-limit v-model="districtContent.remark"></el-input>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'branchFinancial',
    data () {
        return {
            rules: {},
            districtContent: {}
        }
    }
}
</script>

<style lang='scss' scoped>
.branchFinancial {
    padding: 0 24px;
}
</style>

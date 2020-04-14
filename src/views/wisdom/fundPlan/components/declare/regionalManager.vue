<template>
    <div class="regionalManager">
        <h3>大区总经理审批</h3>
        <el-form :model="districtContent" :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
            <el-form-item label="大区总审批金额：" prop="invoiceAmount">
                <el-input v-model.trim="districtContent.invoiceAmount" v-isNum="districtContent.invoiceAmount" maxlength='20' placeholder="请输入金额">
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="大区总意见：">
                <div class="w250">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" maxlength="1000" show-word-limit v-model="districtContent.remark"></el-input>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'regionalManager',
    data () {
        return {
            rules: {},
            districtContent: {}
        }
    }
}
</script>

<style lang='scss' scoped>
.regionalManager {
    padding: 0 24px;
}
</style>

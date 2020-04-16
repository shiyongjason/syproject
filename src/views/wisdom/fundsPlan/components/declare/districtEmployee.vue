<template>
    <div class="districtEmployee">
        <h3>区域申报内容</h3>
        <el-form :model="districtContent" :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
            <el-form-item label="2020年4月预计资金还款：" prop="invoiceAmount">
                <el-input v-model.trim="districtContent.invoiceAmount" v-isNum="districtContent.invoiceAmount" maxlength='20' placeholder="请输入金额">
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="2020年4月预计资金用款：" prop="invoiceAmount">
                <el-input v-model.trim="districtContent.invoiceAmount" v-isNum="districtContent.invoiceAmount" maxlength='20' placeholder="请输入金额">
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="资金支持类型：">
                <div class="w250">
                    <el-select v-model="districtContent.b">
                        <el-option label="请选择" value="1"></el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="2020年4月预计销售：" prop="invoiceAmount">
                <el-input v-model.trim="districtContent.invoiceAmount" v-isNum="districtContent.invoiceAmount" maxlength='20' placeholder="请输入金额">
                    <template slot="append">万元</template>
                </el-input>
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
    name: 'districtEmployee',
    data () {
        return {
            rules: {},
            districtContent: {}
        }
    }
}
</script>

<style lang='scss' scoped>
.districtEmployee {
    padding: 0 24px;
}
</style>

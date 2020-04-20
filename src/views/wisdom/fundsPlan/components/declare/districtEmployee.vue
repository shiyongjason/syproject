<template>
    <div class="districtEmployee">
        <h3>区域申报内容</h3>
        <el-form :model="fundDetail.subRegionFundplanApply" :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
            <el-form-item :label="`${yearMonth}预计资金还款：`" prop="invoiceAmount">
                <el-input v-model.trim="fundDetail.subRegionFundplanApply.prePaymentCurrentMonth" v-isNum="fundDetail.subRegionFundplanApply.prePaymentCurrentMonth" maxlength='20' placeholder="请输入金额">
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item :label="`${yearMonth}预计资金用款：`" prop="invoiceAmount">
                <el-input v-model.trim="fundDetail.subRegionFundplanApply.preApplyCurrentMonth" v-isNum="fundDetail.subRegionFundplanApply.preApplyCurrentMonth" maxlength='20' placeholder="请输入金额">
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="资金支持类型：">
                <div class="w250">
                    <el-select v-model="fundDetail.subRegionFundplanApply.fundType">
                        <el-option label="经验用款" value="001"></el-option>
                        <el-option label="注资款" value="002"></el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item :label="`${yearMonth}预计销售：`" prop="invoiceAmount">
                <el-input v-model.trim="fundDetail.subRegionFundplanApply.preSaleCurrentMonth" v-isNum="fundDetail.subRegionFundplanApply.preSaleCurrentMonth" maxlength='20' placeholder="请输入金额">
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="区域意见：">
                <div class="w250">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" maxlength="1000" show-word-limit v-model="fundDetail.subRegionFundplanApply.remark"></el-input>
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
                return {}
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

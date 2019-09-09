<template>
    <el-collapse-item name="3">
        <template slot="title">
            <p class="title-p">费用结构</p>
        </template>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="销售费用占比：">
                    {{form.dueFinanceBasic.salesExpensesRatio}}%
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="管理费用占比：">
                    {{form.dueFinanceBasic.managementExpensesRatio}}%
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="财务费用占比：">
                    {{form.dueFinanceBasic.financeExpensesRatio}}%
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="费用合理性：">
                    <template v-if="form.dueFinanceBasic.costRationality == 0">合理</template>
                    <template v-else-if="form.dueFinanceBasic.costRationality == 1">不合理</template>
                    <template v-else>-</template>
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="备注：">
                    <span class="remark">{{form.dueFinanceBasic.costRationalityRemark}}</span>
                </el-form-item>
            </div>
        </div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { COST_RATIONALITY_OPTIONS } from '../const'
export default {
    data () {
        return {
            costRationalityOptions: COST_RATIONALITY_OPTIONS
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    }
}
</script>

<style lang="scss" scoped>
.title-p {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
}
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
.item-wrapper {
    margin: 20px 0 20px;
}
table {
    border-collapse: collapse;
}
table,
tr,
td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
.remark {
    display: inline-block;
    word-break: break-word;
}
</style>

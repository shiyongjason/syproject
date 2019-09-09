<template>
<el-collapse-item name="3">
    <template slot="title">
        <p class="title-p">费用结构</p>
    </template>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="销售费用占比：">
                <el-input placeholder="" maxlength="25" v-model="form.dueFinanceBasic.salesExpensesRatio">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="管理费用占比：">
                <el-input placeholder="" maxlength="25" v-model="form.dueFinanceBasic.managementExpensesRatio">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="财务费用占比：">
                <el-input placeholder="" maxlength="25" v-model="form.dueFinanceBasic.financeExpensesRatio">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="费用合理性：">
                <el-select v-model="form.dueFinanceBasic.costRationality">
                    <el-option v-for="item in costRationalityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="备注：">
                <el-input type="textarea" style="width:50px" placeholder="请对合理性评估进行备注" v-model="form.dueFinanceBasic.costRationalityRemark"></el-input>
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
table, tr, td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>

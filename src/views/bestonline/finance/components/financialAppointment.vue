<template>
<el-collapse-item name="9">
    <template slot="title">
        <p class="title-p">财务外派</p>
    </template>
    <div class="item-wrapper">
        <el-form-item label="是否同意财务外派：">
            <el-select v-model="form.dueFinanceBasic.isAgreeFinancialDelegation" placeholder="请选择">
                <el-option v-for="item in yesNoStatus" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开始时间：">
            <el-date-picker v-model="form.dueFinanceBasic.startDateOfDelegation" type="date" placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="资金监管：">
            <el-select v-model="form.dueFinanceBasic.fundSupervision" placeholder="请选择">
                <el-option v-for="item in superviseoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </div>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { YES_NO_STATUS } from '../../const'
import { FUND_SUPERVISION } from '../const'
export default {
    data () {
        return {
            yesNoStatus: YES_NO_STATUS,
            superviseoptions: FUND_SUPERVISION
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

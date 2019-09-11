<template>
<el-collapse-item name="9">
    <template slot="title">
        <p class="title-p">财务外派</p>
    </template>
    <div class="item-wrapper">
        <el-form-item label="是否同意财务外派：">
            {{form.dueFinanceBasic.isAgreeFinancialDelegation === 0?'是':form.dueFinanceBasic.isAgreeFinancialDelegation == 1?'否':'-'}}
        </el-form-item>
        <el-form-item label="开始时间：">
            {{form.dueFinanceBasic.startDateOfDelegation}}
        </el-form-item>
        <el-form-item label="资金监管：">
            {{form.dueFinanceBasic.fundSupervise === 0?'财务委派':form.dueFinanceBasic.fundSupervise == 1?'财务外派':'-'}}
        </el-form-item>
    </div>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { FUND_SUPERVISION } from '../const'
export default {
    data () {
        return {
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

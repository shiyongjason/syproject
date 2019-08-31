<template>
    <div>
        <p class="small-title">对外投资信息</p>
        <div class="flex-wrap-col info-wrap" v-for="(item, index) in justiceData.investmentsOutList"
            :key="'investmentsOutList'+item.type + index">
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item label="投资公司：">
                    <p>{{item.investmentCompany}}</p>
                </el-form-item>
                <el-form-item label="投资金额：">
                    <p>{{item.investmentAmount}}</p>
                </el-form-item>
                <el-form-item label="投资比例：">
                    <p>{{item.investmentRatio}}</p>
                </el-form-item>
                <el-form-item label="投资性质：">
                    <p>{{item.investmentType?investmentTypeOptions[item.investmentType].value:''}}</p>
                </el-form-item>
                <el-form-item label="投资收益：">
                    <p>{{item.investmentIncome}}</p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { INVESTMENT_TYPE_OPTIONS } from '../../const'

export default {
    name: 'investment_out',
    props: {
        type: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            investmentTypeOptions: INVESTMENT_TYPE_OPTIONS
        }
    },
    computed: {
        ...mapState({
            justiceData: state => state.dueDiligence.justiceData
        })
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
.legal-form {
    flex-direction: row;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
}
.legal-form .el-form-item {
    display: inline-block;
    margin-bottom: 0;
}
.info-wrap {
    border: 1px solid #dcdcdc;
    position: relative;
    padding-right: 40px;
    padding-top: 10px;
    margin-bottom: 20px;

    > i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
    }
}
.small-title{
    margin-bottom: 20px;
}
</style>

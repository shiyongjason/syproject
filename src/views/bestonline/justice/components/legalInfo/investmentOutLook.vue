<template>
    <div>
        <p class="small-title">对外投资信息</p>
        <div class="flex-wrap-col info-wrap">
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item label="投资公司：">
                    <p>{{investmentsOutList[this.type].investmentCompany||'-'}}</p>
                </el-form-item>
                <el-form-item label="投资金额：">
                    <p>{{investmentsOutList[this.type].investmentAmount||'-'}}</p>
                </el-form-item>
                <el-form-item label="投资比例：">
                    <p>{{investmentsOutList[this.type].investmentRatio||'-'}}</p>
                </el-form-item>
                <el-form-item label="投资性质：">
                    <p>{{investmentsOutList[this.type].investmentType == 0?'债务性投资':investmentsOutList[this.type].investmentType == 1?'权益性投资':investmentsOutList[this.type].investmentType == 1?'混合性投资':'-'}}</p>
                </el-form-item>
                <el-form-item label="投资收益：">
                    <p>{{investmentsOutList[this.type].investmentIncome||'-'}}</p>
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
            investmentsOutList: state => state.dueDiligence.justiceData.investmentsOutList
        })
    },
    methods: {
    },
    mounted () {
        console.log(this.type)
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
.small-title {
    margin-bottom: 20px;
}
</style>

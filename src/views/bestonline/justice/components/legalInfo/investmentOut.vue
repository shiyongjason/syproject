<template>
    <div>
        <p class="small-title">对外投资信息</p>
        <div class="flex-wrap-col info-wrap" v-for="(item, index) in investmentsOutList"
            :key="'investmentsOutList'+item.type + index">
            <template>
                <i class="el-icon-circle-plus-outline pointer" v-if="index == 0"
                    @click="onAddList()"></i>
                <i class="el-icon-remove-outline pointer" v-if="index != 0"
                    @click="onRemoveList(item.id)"></i>
            </template>
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item label="投资公司：">
                    <el-input
                        v-model="item.investmentCompany"
                        placeholder="投资公司"
                        maxlength="25">
                    </el-input>
                </el-form-item>
                <el-form-item label="投资金额：">
                    <el-input
                        v-model="item.investmentAmount"
                        placeholder="请输入投资金额"
                        maxlength="25">
                    </el-input>
                </el-form-item>
                <el-form-item label="投资比例：">
                    <el-input
                        v-model="item.investmentRatio"
                        placeholder="请输入投资比例"
                        maxlength="25">
                        <template slot="suffix">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="投资性质：">
                    <el-select v-model="item.investmentType" placeholder="请选择投资性质">
                        <el-option v-for="item in investmentTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投资收益：">
                    <el-input
                        v-model="item.investmentIncome"
                        placeholder="请输入投资收益"
                        maxlength="25">
                    </el-input>
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
        }),
        defaultInvestmentOut () {
            return {
                investmentCompany: '',
                investmentAmount: '',
                investmentRatio: '',
                investmentType: '',
                investmentIncome: '',
                type: this.type,
                id: Date.now()
            }
        },
        investmentsOutList () {
            let investmentsOutList = this.justiceData.investmentsOutList
            const result = investmentsOutList.filter(item => item.type == this.type)
            if (result.length == 0) {
                const tempObj = JSON.parse(JSON.stringify(this.defaultInvestmentOut))
                investmentsOutList.push(tempObj)
            }
            return investmentsOutList.filter(item => item.type == this.type)
        }
    },
    methods: {
        onAddList () {
            const tempObj = JSON.parse(JSON.stringify(this.defaultInvestmentOut))
            tempObj.id = Date.now()
            this.justiceData.investmentsOutList.push(tempObj)
        },
        onRemoveList (id) {
            this.justiceData.investmentsOutList = this.justiceData.investmentsOutList.filter(item => item.id !== id)
        }
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
}
.info-wrap {
    border: 1px solid #dcdcdc;
    position: relative;
    padding-right: 40px;
    padding-top: 25px;
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

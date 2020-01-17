<template>
    <div>
        <p class="small-title">对外投资信息</p>
        <div class="flex-wrap-col info-wrap" v-for="(item, index) in investmentsOutList" :key="'investmentsOutList'+item.type + index">
            <template>
                <i class="el-icon-circle-plus-outline pointer" v-if="index == 0" @click="onAddList()"></i>
                <i class="el-icon-remove-outline pointer" v-if="index != 0" @click="onRemoveList(item.id)"></i>
            </template>
            <!-- <el-form label-position="right" label-width="150px" class="legal-form"> -->
            <div class="form-cont-row mt20">
                <div class="form-cont-col">
                    <el-form-item label="投资公司：" label-width="150px">
                        <el-input v-model="item.investmentCompany" placeholder="投资公司" maxlength="25">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="投资金额：" label-width="150px" :prop="`investmentsOutList[${index}].investmentAmount`" :rules="rules.investmentAmount(item, index)">
                        <el-input v-model="item.investmentAmount" placeholder="请输入投资金额" maxlength="25">
                            <template slot="suffix">万</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="投资比例：" label-width="150px" :prop="`investmentsOutList[${index}].investmentRatio`" :rules="rules.investmentRatio(item, index)">
                        <el-input v-model="item.investmentRatio" placeholder="请输入投资比例" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="form-cont-row mt20">
                <div class="form-cont-col">
                    <el-form-item label="投资性质：" label-width="150px">
                        <el-select v-model="item.investmentType" placeholder="请选择投资性质">
                            <el-option v-for="item in investmentTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投资收益：" label-width="150px" :prop="`investmentsOutList[${index}].investmentIncome`" :rules="rules.investmentIncome(item, index)">
                        <el-input v-model="item.investmentIncome" placeholder="请输入投资收益" maxlength="25">
                            <template slot="suffix">万</template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>

            <!-- </el-form> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { INVESTMENT_TYPE_OPTIONS } from '../../const'
// import { IsFixedTwoNumber } from '@/utils/rules'

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
            investmentTypeOptions: INVESTMENT_TYPE_OPTIONS,
            rules: {
                investmentAmount: (item, index) => [
                    { validator: (rule, value, callback) => {
                        var Reg = /^[0-9]+(.[0-9]{1,2})?$/
                        let model = this.investmentsOutList[index].investmentAmount
                        if (model && !Reg.test(model)) {
                            return callback(new Error('可以输入有两位小数的正实数'))
                        }
                        return callback()
                    },
                    trigger: 'blur' }
                ],
                investmentRatio: (item, index) => [
                    { validator: (rule, value, callback) => {
                        var Reg = /^[0-9]+(.[0-9]{1,2})?$/
                        let model = this.investmentsOutList[index].investmentRatio
                        if (model && !Reg.test(model)) {
                            return callback(new Error('可以输入有两位小数的正实数'))
                        }
                        return callback()
                    },
                    trigger: 'blur' }
                ],
                investmentIncome: (item, index) => [
                    { validator: (rule, value, callback) => {
                        var Reg = /^[0-9]+(.[0-9]{1,2})?$/
                        let model = this.investmentsOutList[index].investmentIncome
                        if (model && !Reg.test(model)) {
                            return callback(new Error('可以输入有两位小数的正实数'))
                        }
                        return callback()
                    },
                    trigger: 'blur' }
                ]
            }
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
.el-form-item {
    margin-bottom: 0;
}
</style>

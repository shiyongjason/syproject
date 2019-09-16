<template>
    <div class="yearTable">
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td>项目</td>
                    <td>本年度累计金额</td>
                    <td>上年末度累计金额</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceProfit.contentListB">
                <tr v-for="(item,index) in form.dueFinanceProfit.contentListB" :key="index">
                    <template v-if="index === 17">
                        <td colspan="3">{{item.typeName}}</td>
                    </template>
                    <template v-else>
                        <td>
                            <span class="red-word" v-if="index === 16">*</span>
                            {{item.typeName}}
                        </td>
                        <td>
                            <template v-if="index === 16">
                                <el-form-item label-width="0" :prop="`dueFinanceProfit.contentListB[${index}].endOrCurrent`" :rules="rules.endOrCurrent">
                                    <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item label-width="0" :prop="`dueFinanceProfit.contentListB[${index}].endOrCurrent`" :rules="rules.endOrCurrentNORequired">
                                    <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </template>
                        </td>
                        <td>
                            <template v-if="index === 16">
                                <el-form-item label-width="0" :prop="`dueFinanceProfit.contentListB[${index}].beginOrPrior`" :rules="rules.beginOrPrior">
                                    <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item label-width="0" :prop="`dueFinanceProfit.contentListB[${index}].beginOrPrior`" :rules="rules.beginOrPriorNORequired">
                                    <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </template>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { MoneyOrConnector } from '@/utils/rules'
export default {
    data () {
        return {
            rules: {
                endOrCurrent: [
                    { required: true, message: '请填写本年度累计金额', trigger: 'blur' },
                    { validator: MoneyOrConnector }
                ],
                endOrCurrentNORequired: [
                    { validator: MoneyOrConnector }
                ],
                beginOrPrior: [
                    { required: true, message: '请填写上年末度累计金额', trigger: 'blur' },
                    { validator: MoneyOrConnector }
                ],
                beginOrPriorNORequired: [
                    { validator: MoneyOrConnector }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    methods: {

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
table {
    /deep/ .el-form-item__error {
        position: relative;
        text-align: left;
        padding-left: 10px;
        padding-bottom: 5px;
    }
}
</style>

<template>
    <el-collapse-item name="4">
        <template slot="title">
            <p class="title-p">偿债能力(必填)</p>
        </template>
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td width="180">指标</td>
                    <td width="180">本年度</td>
                    <td width="180">上年度</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceYearOperatingCreateForms">
                <tr>
                    <td>流动比率</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].liquidityRatio" :rules="rules.liquidityRatio">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].liquidityRatio" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].liquidityRatio" :rules="rules.liquidityRatio">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].liquidityRatio" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>速动比率</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].quickRatio" :rules="rules.quickRatio">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].quickRatio" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].quickRatio" :rules="rules.quickRatio">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].quickRatio" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>现金比率</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].cashRatio" :rules="rules.cashRatio">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].cashRatio" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span></span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].cashRatio" :rules="rules.cashRatio">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].cashRatio" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span></span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>资产负债率</td>
                    <td>
                        <el-form-item label-width="0">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="assetListT" placeholder="自动录入" disabled>
                                <!-- <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template> -->
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="assetListL" placeholder="自动录入" disabled>
                                <!-- <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template> -->
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
            </tbody>
        </table>
        <span class="question">
            <i class="el-icon-question" @click="debtDialogVisible = true"></i>
            <el-dialog title="偿债能力标准值" width="20%" :visible.sync="debtDialogVisible" center>
                <span>满足以下条件，即判断为符合标准。</span>
                <table width="100%">
                    <tr>
                        <td>流动比率：</td>
                        <td>≥200%</td>
                    </tr>
                    <tr>
                        <td>速动比率：</td>
                        <td>≥100%</td>
                    </tr>
                    <tr>
                        <td>现金比率：</td>
                        <td>≥20%</td>
                    </tr>
                    <tr>
                        <td>资产负债率：</td>
                        <td>≥70%</td>
                    </tr>
                    <tr>
                        <td>符合标准：</td>
                        <td>
                            <font color="green">绿色字体</font>
                        </td>
                    </tr>
                    <tr>
                        <td>不符合标准：</td>
                        <td>
                            <font color="red">红色字体</font>
                        </td>
                    </tr>
                </table>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="debtDialogVisible = false">关闭</el-button>
                </div>
            </el-dialog>
        </span>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { IsFixedTwoNumber } from '@/utils/rules'
export default {
    name: 'finance_profitability',
    data () {
        return {
            debtDialogVisible: false,
            rules: {
                liquidityRatio: [
                    { required: true, message: '请填写流动比率', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                quickRatio: [
                    { required: true, message: '请填写速动比率', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                assetLiabilityRatio: [
                    { required: true, message: '请填写资产负债率', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                cashRatio: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        }),
        assetListT () {
            let totalLiabilityT = 0
            if (this.form.assetsLiabilities.liabilitiesListT) {
                if (this.form.assetsLiabilities.liabilitiesListT[23].endOrCurrent) {
                    totalLiabilityT = +this.form.assetsLiabilities.liabilitiesListT[23].endOrCurrent
                }
            }
            if (this.form.assetsLiabilities.assetListT && this.form.assetsLiabilities.assetListT[this.form.assetsLiabilities.assetListT.length - 1].endOrCurrent && this.form.assetsLiabilities.assetListT[this.form.assetsLiabilities.assetListT.length - 1].endOrCurrent != 0) {
                const result = ((totalLiabilityT + +this.form.totalLiability) / +this.form.assetsLiabilities.assetListT[this.form.assetsLiabilities.assetListT.length - 1].endOrCurrent * 100).toFixed(2)
                return result
            }
            return 0
        },
        assetListL () {
            let totalLiabilityL = 0
            if (this.form.assetsLiabilities.liabilitiesListL) {
                if (this.form.assetsLiabilities.liabilitiesListL[23].endOrCurrent) {
                    totalLiabilityL = +this.form.assetsLiabilities.liabilitiesListL[23].endOrCurrent
                }
            }
            if (this.form.assetsLiabilities.assetListL && this.form.assetsLiabilities.assetListL[this.form.assetsLiabilities.assetListL.length - 1].endOrCurrent && this.form.assetsLiabilities.assetListL[this.form.assetsLiabilities.assetListL.length - 1].endOrCurrent != 0) {
                const result = ((totalLiabilityL + +this.form.totalLiability) / +this.form.assetsLiabilities.assetListL[this.form.assetsLiabilities.assetListL.length - 1].endOrCurrent * 100).toFixed(2)
                return result
            }
            return 0
        }
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
.question .el-icon-question {
    position: absolute;
    left: 656.5px;
    bottom: 850px;
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

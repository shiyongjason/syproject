<template>
    <el-collapse-item name="5">
        <template slot="title">
            <p class="title-p">营运能力(必填)</p>
        </template>
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td width="180">-</td>
                    <td width="180">本年度</td>
                    <td width="180">上年度</td>
                    <td width="180">上上年度</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceYearOperatingCreateForms">
                <tr>
                    <td>应收账款周转天数</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].daysOfReceivable" :rules="rules.daysOfReceivable">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].daysOfReceivable" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">天</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].daysOfReceivable" :rules="rules.daysOfReceivable">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].daysOfReceivable" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">天</template>
                            </el-input>
                        </el-form-item>

                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[2].daysOfReceivable" :rules="rules.daysOfReceivableNORequired">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].daysOfReceivable" placeholder="请输入内容">
                                <template slot="suffix">天</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>库存周转天数</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].daysOfInventory" :rules="rules.daysOfInventory">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].daysOfInventory" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">天</template>
                            </el-input>
                        </el-form-item>

                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].daysOfInventory" :rules="rules.daysOfInventory">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].daysOfInventory" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">天</template>
                            </el-input>
                        </el-form-item>

                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[2].daysOfInventory" :rules="rules.daysOfInventoryNORequired">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].daysOfInventory" placeholder="请输入内容">
                                <template slot="suffix">天</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>总资产周转率</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].totalAssetsTurnover" :rules="rules.totalAssetsTurnover">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].totalAssetsTurnover" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>

                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].totalAssetsTurnover" :rules="rules.totalAssetsTurnover">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].totalAssetsTurnover" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>

                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[2].totalAssetsTurnover" :rules="rules.totalAssetsTurnoverNORequired">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].totalAssetsTurnover" placeholder="请输入内容">
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>净资产收益率</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].returnOnEquity" :rules="rules.returnOnEquity">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].returnOnEquity" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>

                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].returnOnEquity" :rules="rules.returnOnEquity">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].returnOnEquity" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>

                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[2].returnOnEquity" :rules="rules.returnOnEquityNORequired">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].returnOnEquity" placeholder="请输入内容">
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
            </tbody>
        </table>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { IsFixedTwoNumber, IsPositiveNumber } from '@/utils/rules'
export default {
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    data () {
        return {
            debtDialogVisible: false,
            rules: {
                daysOfReceivable: [
                    { required: true, message: '请填写应收账款周转天数', trigger: 'blur' },
                    { validator: IsPositiveNumber, trigger: 'blur' }
                ],
                daysOfReceivableNORequired: [
                    { validator: IsPositiveNumber, trigger: 'blur' }
                ],
                daysOfInventory: [
                    { required: true, message: '请填写库存周转天数', trigger: 'blur' },
                    { validator: IsPositiveNumber, trigger: 'blur' }
                ],
                daysOfInventoryNORequired: [
                    { validator: IsPositiveNumber, trigger: 'blur' }
                ],
                totalAssetsTurnover: [
                    { required: true, message: '请填写总资产周转率', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                totalAssetsTurnoverNORequired: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                returnOnEquity: [
                    { required: true, message: '请填写净资产收益率', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                returnOnEquityNORequired: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ]
            }
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
table {
    /deep/ .el-form-item__error {
        position: relative;
        text-align: left;
        padding-left: 10px;
        padding-bottom: 5px;
    }
}
</style>

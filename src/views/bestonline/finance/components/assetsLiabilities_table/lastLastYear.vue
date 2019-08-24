<template>
    <div class="yearTable">
        <table class="item-wrapper no_right_border">
            <thead>
                <tr>
                    <td>资产</td>
                    <td>期末余额</td>
                    <td>年初余额</td>
                </tr>
            </thead>
            <tbody v-if="form.assetsLiabilities.assetListB">
                <tr v-for="(item,index) in form.assetsLiabilities.assetListB" :key="index">
                    <template v-if="item.typeName === '流动资产' || item.typeName === '非流动资产'">
                        <td colspan="3">{{item.typeName}}</td>
                    </template>
                    <template v-else>
                        <td>
                            <template v-if="item.typeName === '应收账款' || item.typeName === '预付款项' || item.typeName === '其他应收款' || item.typeName === '存货' || item.typeName === '待摊费用' || item.typeName === '流动资产合计' || item.typeName === '非流动资产合计' || item.typeName === '资产总计'">
                                <span class="red-word">*</span>
                            </template>
                            <span>{{item.typeName}}</span>
                        </td>
                        <td>
                            <template v-if="item.typeName === '应收账款' || item.typeName === '预付款项' || item.typeName === '其他应收款' || item.typeName === '存货' || item.typeName === '待摊费用' || item.typeName === '流动资产合计' || item.typeName === '非流动资产合计' || item.typeName === '资产总计'">
                                <el-form-item label-width="0" :prop="`assetsLiabilities.assetListB[${index}].endOrCurrent`" :rules="rules.endOrCurrent">
                                    <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </template>
                        </td>
                        <td>
                            <template v-if="item.typeName === '应收账款' || item.typeName === '预付款项' || item.typeName === '其他应收款' || item.typeName === '存货' || item.typeName === '待摊费用' || item.typeName === '流动资产合计' || item.typeName === '非流动资产合计' || item.typeName === '资产总计'">
                                <el-form-item label-width="0" :prop="`assetsLiabilities.assetListB[${index}].beginOrPrior`" :rules="rules.beginOrPrior">
                                    <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </template>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td>负债和所有者权益（或股东权益）</td>
                    <td>期末余额</td>
                    <td>年初余额</td>
                </tr>
            </thead>
            <tbody v-if="form.assetsLiabilities.liabilitiesListB">
                <tr v-for="(item,index) in form.assetsLiabilities.liabilitiesListB" :key="index">
                    <template v-if="item.typeName === '流动负债' || item.typeName === '非流动负债' || item.typeName === '所有者权益（或股东权益）'">
                        <td colspan="3">{{item.typeName}}</td>
                    </template>
                    <template v-else>
                        <td><span class="red-word" v-if="item.typeName === '短期借款' || item.typeName === '流动负债合计' || item.typeName === '非流动负债合计' || item.typeName === '负债合计'">*</span>{{item.typeName}}</td>
                        <td>
                            <template v-if="item.typeName === '短期借款' || item.typeName === '流动负债合计' || item.typeName === '非流动负债合计' || item.typeName === '负债合计'">
                                <el-form-item label-width="0" :prop="`assetsLiabilities.liabilitiesListB[${index}].endOrCurrent`" :rules="rules.endOrCurrent">
                                    <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </template>
                        </td>
                        <td>
                            <template v-if="item.typeName === '短期借款' || item.typeName === '流动负债合计' || item.typeName === '非流动负债合计' || item.typeName === '负债合计'">
                                <el-form-item label-width="0" :prop="`assetsLiabilities.liabilitiesListB[${index}].beginOrPrior`" :rules="rules.beginOrPrior">
                                    <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </template>
                        </td>
                    </template>
                </tr>
                <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            rules: {
                endOrCurrent: [
                    { required: true, message: '请填写期末余额', trigger: 'blur' }
                ],
                beginOrPrior: [
                    { required: true, message: '请填写年初余额', trigger: 'blur' }
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

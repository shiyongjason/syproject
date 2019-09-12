<template>
    <div class="yearTable">
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td>项目</td>
                    <td>本期金额</td>
                    <td>上期金额</td>
                </tr>
            </thead>
            <tbody v-if="form.caseFlow.contentListT">
                <tr v-for="(item,index) in form.caseFlow.contentListT" :key="index">
                    <template v-if="index === 0 || index === 11 || index === 24">
                        <td colspan="3">{{item.typeName}}</td>
                    </template>
                    <template v-else>
                        <td>
                            {{item.typeName}}
                        </td>
                        <td>
                            <el-form-item label-width="0" :prop="`caseFlow.contentListT[${index}].endOrCurrent`" :rules="rules.endOrCurrent">
                                <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label-width="0" :prop="`caseFlow.contentListT[${index}].beginOrPrior`" :rules="rules.beginOrPrior">
                                <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Money } from '@/utils/rules'
export default {
    data () {
        return {
            rules: {
                endOrCurrent: [
                    { validator: Money, trigger: 'blur' }
                ],
                beginOrPrior: [
                    { validator: Money, trigger: 'blur' }
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

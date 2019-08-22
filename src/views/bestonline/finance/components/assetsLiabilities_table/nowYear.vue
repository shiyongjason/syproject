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
            <tbody v-if="form.assetsLiabilities.assetListT">
                <tr v-for="(item,index) in form.assetsLiabilities.assetListT" :key="index">
                    <template v-if="index === 0 || index === 13">
                        <td colspan="3">{{item.typeName}}</td>
                    </template>
                    <template v-else>
                        <td>
                            <span class="red-word"
                                v-if="index === 4 || index === 5 || index === 8 || index === 9 || index === 10 || index === 13">*</span>
                            {{item.typeName}}
                        </td>
                        <td>
                            <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                <template slot="suffix">万</template>
                            </el-input>
                        </td>
                        <td>
                            <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                <template slot="suffix">万</template>
                            </el-input>
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
            <tbody v-if="form.assetsLiabilities.liabilitiesListT">
                <tr v-for="(item,index) in form.assetsLiabilities.liabilitiesListT" :key="index">
                    <template v-if="index === 0 || index === 14 || index === 24">
                        <td colspan="3">{{item.typeName}}</td>
                    </template>
                    <template v-else>
                        <td><span class="red-word" v-if="index === 4">*</span>{{item.typeName}}</td>
                        <td>
                            <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25">
                                <template slot="suffix">万</template>
                            </el-input>
                        </td>
                        <td>
                            <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25">
                                <template slot="suffix">万</template>
                            </el-input>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {}
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
.yearTable{
    .no_right_border{
        border: none;
    }
}
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
</style>

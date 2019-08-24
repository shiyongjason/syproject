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
            <tbody v-if="form.caseFlow.contentListB">
                <tr v-for="(item,index) in form.caseFlow.contentListB" :key="index">
                    <template v-if="index === 17">
                        <td colspan="3">{{item.typeName}}</td>
                    </template>
                    <template v-else>
                        <td>
                            <span class="red-word" v-if="index === 16">*</span>
                            {{item.typeName}}
                        </td>
                        <td>
                            <span v-if="item.endOrCurrent">{{item.endOrCurrent}}万</span>
                            <span v-else>-</span>
                        </td>
                        <td>
                            <span v-if="item.beginOrPrior">{{item.beginOrPrior}}万</span>
                            <span v-else>-</span>
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

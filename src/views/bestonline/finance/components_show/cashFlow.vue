<template>
    <el-collapse-item name="12">
        <template slot="title">
            <p class="title-p">现金流量表</p>
        </template>
        <div class="table-cont-tabs">
            <el-tabs type="card" v-model="tabName" @tab-click="onChangeYear">
                <div class="form-cont-row">
                    <div class="form-cont-col">
                        <el-form-item label="编制单位：">
                            {{form.caseFlow.writer}}
                        </el-form-item>
                    </div>
                    <div class="form-cont-col">
                        <el-form-item label="时间：">
                            {{form.caseFlow.recordTime}}
                        </el-form-item>
                    </div>
                    <div class="form-cont-col">
                        <el-form-item label="单位：万">
                        </el-form-item>
                    </div>
                </div>
                <el-tab-pane label="本年度" name="nowYear"><NowYear /></el-tab-pane>
                <el-tab-pane label="上年度" name="lastYear"><LastYear /></el-tab-pane>
                <el-tab-pane label="上上年度" name="lastLastYear"><LastLastYear /></el-tab-pane>
            </el-tabs>
        </div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import NowYear from './caseFlow_table/nowYear.vue'
import LastYear from './caseFlow_table/lastYear.vue'
import LastLastYear from './caseFlow_table/lastLastYear.vue'
export default {
    data () {
        return {
            tabName: 'nowYear'
        }
    },
    components: {
        NowYear,
        LastYear,
        LastLastYear
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    methods: {
        onChangeYear () { }
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

<template>
<el-collapse-item name="11">
    <template slot="title">
        <p class="titlt-p">利润表</p>
    </template>
    <div class="table-cont-tabs">
        <el-tabs type="card" v-model="tabName" @tab-click="onChangeYear">
            <el-tab-pane label="本年度" name="nowYear"></el-tab-pane>
            <el-tab-pane label="上年度" name="lastYear"></el-tab-pane>
            <el-tab-pane label="上上年度" name="lastLastYear"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="编制单位：">
                <el-input v-model="form.dueFinanceProfit.writer" placeholder="请输入编制单位"></el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="时间：">
                <el-date-picker v-model="form.dueFinanceProfit.recordTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="单位：万">
            </el-form-item>
        </div>
    </div>
    <div class="table-flex table_left">
        <div class="table-row">
            <div class="table-col">项目</div>
            <div class="table-col">本年度累计金额</div>
            <div class="table-col">上年末度累计金额</div>
        </div>
        <div class="table-row" v-for="(item,index) in form.dueFinanceProfit.contentList" :key="index">
            <template v-if="index === 17">
                <div class="table-col">{{item.typeName}}</div>
            </template>
            <template v-else>
                <div class="table-col">{{item.typeName}}</div>
                <div class="table-col">
                    <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25" @keyup.native="oninputDueAndCase(index, 'endOrCurrent', $event, 0)">
                        <template slot="suffix">万</template>
                    </el-input>
                </div>
                <div class="table-col">
                    <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25" @keyup.native="oninputDueAndCase(index, 'beginOrPrior', $event, 0)">
                        <template slot="suffix">万</template>
                    </el-input>
                </div>
            </template>
        </div>
    </div>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            tabName: 'nowYear'
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    methods: {
        onChangeYear () {}
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
table, tr, td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>

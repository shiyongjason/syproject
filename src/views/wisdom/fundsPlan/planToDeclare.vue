<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="title">
                <!-- <span>本次可申报：<i>2020</i>年<i>X</i>月的预计销售及资金用款计划</span> -->
                <span>本次可申报：<i>{{tableData[0].applyMonth}}</i>月的预计销售及资金用款计划</span>
            </div>
            <div class="tips">
                每月20日—25日提报次月资金计划，每家平台公司每月仅可提报一次
            </div>
            <h3>申报列表</h3>
            <div class="p24">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' :isAction="true" :actionMinWidth='120'>
                    <!-- eslint-disable-next-line -->
                    <template slot="applyType" slot-scope="scope">
                        <span v-if="scope.data.row.applyType === 0">未申报</span>
                        <span v-else-if="scope.data.row.applyType === 1">已申报</span>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button class="orangeBtn" :disabled='scope.data.row.applyType === 1'>点击申报</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
        <div class="page-body-cont">
            <hasDeclare />
        </div>
    </div>
</template>

<script>
import { bankLabel } from './const'
import hasDeclare from './components/hasDeclare'
import { getPlanDeclare } from './api/index'
export default {
    name: 'fundPlanHome',
    components: { hasDeclare },
    data () {
        return {
            tableLabel: bankLabel,
            tableData: [{}],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    mounted () {
        this.getPlanDeclare()
    },
    methods: {
        async getPlanDeclare () {
            const params = {
                pageNumber: 1,
                pageSize: 5
            }
            const { data } = await getPlanDeclare(params)
            this.tableData = data.records
        }
    }
}
</script>

<style lang='scss' scoped>
.title {
    text-align: center;
    font-size: 20px;
    i {
        font-style: normal;
        color: #ff0000;
    }
}
.tips {
    padding: 20px 0;
    text-align: center;
    color: #ff0000;
}
.p24 {
    padding: 20px 24px 0 24px;
}
</style>

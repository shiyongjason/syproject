<template>
    <div class="page-body approval">
        <div>
            <el-tabs v-model="params.applyType" @tab-click="handleClick">
                <el-tab-pane label="我的待办" name="1"></el-tab-pane>
                <el-tab-pane label="我的已办" name="2"></el-tab-pane>
            </el-tabs>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title"> 申报月份：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="params.applyMonth" type="month" placeholder="选择月" value-format='yyyy-MM'></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title"> 平台公司名称：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请选择分部" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch()">
                            搜索
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                    <template slot="action" slot-scope="scope">
                        <el-button class="orangeBtn" @click="goApprovalList(scope.data.row)">审批</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { getFundPlanAll } from './api/index'
import { approvalListLabel } from './const'
export default {
    name: 'ApprovalList',
    components: {
        HAutocomplete
    },
    data () {
        return {
            tableLabel: approvalListLabel,
            params: {
                applyType: '1',
                applyMonth: '',
                companyName: '',
                subSectionCode: '',
                pageNumber: 1,
                pageSize: 10
            },
            paramsTemp: {},
            tableData: [],
            pagination: {},
            platComList: [],
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            }
        }
    },
    methods: {
        handleClick (tab, event) {
            console.log(tab, event)
        },
        onReset () {
            this.params = { ...this.paramsTemp }
        },
        onCurrentChange (val) {
            this.params.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.params.pageSize = val
            this.onQuery()
        },
        async onQuery () {
            const { data } = await getFundPlanAll(this.paramsTemp)
            console.log(data)
            this.tableData = data.records
        },
        onSearch () {
            this.paramsTemp = { ...this.params }
            this.onQuery()
        },
        goApprovalList (row) {
            this.$router.push({ path: '/fundsPlan/approveDetail', query: { id: row.planId } })
        },
        backPlat () {

        }
    },
    mounted () {
        this.onSearch()
    }
}
</script>

<style scoped lang="scss">
.approval {
    background: #ffffff;
    padding: 60px 25px 30px;
    box-sizing: border-box;
}
/deep/ .el-tabs__item.is-active {
    color: #333;
    background: transparent;
}

/deep/ .el-tabs__header {
    margin: 0;
}
</style>

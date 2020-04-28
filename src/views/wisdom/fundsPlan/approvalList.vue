<template>
    <div class="page-body approval">
        <div>
            <el-tabs v-model="params.processType" type="card" @tab-click="handleClick">
                <el-tab-pane label="我的待办" name="0"></el-tab-pane>
                <el-tab-pane label="我的已办" name="1"></el-tab-pane>
            </el-tabs>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title"> 申报月份：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="params.applyMonth" type="month" placeholder="选择月" value-format='yyyyMM'></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请选择分部" :selectObj="selectObj.branch" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title"> 平台公司名称：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platComList" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectObj.platformData" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
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
                    <template slot="applyMonth" slot-scope="scope">
                        <span>{{`${scope.data.row.applyMonth.substring(0, 4)}-${scope.data.row.applyMonth.substring(4, 6)}`}}</span>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button v-show="params.processType == 0" class="orangeBtn" @click="onApprovalList(scope.data.row)">审批</el-button>
                        <el-button v-show="params.processType == 1" class="orangeBtn" @click="onApproveDeclare(scope.data.row)">查看详情</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { getFundPlanAll } from './api/index'
import { approvalListLabel, approvalListHasDoneLabel } from './const'
import { departmentAuth } from '@/mixins/userAuth'
export default {
    name: 'ApprovalList',
    components: { HAutocomplete },
    mixins: [departmentAuth],
    data () {
        return {
            tableLabel: approvalListLabel,
            tableLabelNotToDo: approvalListLabel,
            tableLabelHasDone: approvalListHasDoneLabel,
            params: {
                processType: '0',
                applyMonth: '',
                companyName: '',
                subSectionCode: '',
                pageNumber: 1,
                pageSize: 10
            },
            paramsTemp: {},
            tableData: [],
            pagination: {},
            branchList: [], // 分部列表
            platComList: [], // 平台公司列表
            selectObj: {
                branch: {
                    selectCode: '',
                    selectName: ''
                },
                platformData: {
                    selectCode: '',
                    selectName: ''
                }
            }
        }
    },
    methods: {
        handleClick (tab, event) {
            this.tableData = []
            if (this.params.processType == 0) {
                this.tableLabel = this.tableLabelNotToDo
            } else {
                this.tableLabel = this.tableLabelHasDone
            }
            this.onReset()
        },
        onReset () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.$set(this.params, 'applyMonth', '')
            this.$set(this.params, 'companyName', '')
            this.$set(this.params, 'subSectionCode', '')
            this.selectObj.branch = { ...obj }
            this.selectObj.platformData = { ...obj }
            this.platComList = []
            this.onSearch()
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
            this.tableData = data.records
        },
        onSearch () {
            this.paramsTemp = { ...this.params }
            this.onQuery()
        },
        onApprovalList (row) {
            this.$router.push({ path: '/fundsPlan/approveDetail', query: { id: row.planId } })
        },
        onApproveDeclare (row) {
            this.$router.push({ path: '/fundsPlan/approveDeclare', query: { id: row.planId } })
        },
        async backPlat (val, dis) {
            if (dis === 'F') {
                this.params.subSectionCode = val.value.selectCode ? val.value.selectCode : ''
                this.params.companyName = ''
                this.selectObj.platformData = {
                    selectCode: '',
                    selectName: ''
                }
                if (val.value) {
                    const data = await this.findPlatformslist({ subsectionCode: val.value.crmDeptCode })
                    this.platComList = data
                } else {
                    this.platComList = []
                }
            }
            if (dis === 'P') {
                this.params.companyName = val.value.companyName ? val.value.companyName : ''
            }
        },
        async getAuth () {
            const data = await this.findAuthList({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc })
            this.branchList = data
        }
    },
    async mounted () {
        await this.getAuth()
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

/deep/ .el-tabs__header {
    margin: 0;
}
</style>

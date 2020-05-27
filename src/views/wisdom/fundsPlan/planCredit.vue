<template>
    <div class="page-body approval">
        <div>
            <el-tabs v-model="queryParams.processType" type="card" @tab-click="handleClick">
                <el-tab-pane label="平台公司资金用信情况" name="0"></el-tab-pane>
                <el-tab-pane label="分部资金用信情况" name="1"></el-tab-pane>
            </el-tabs>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col" v-if="region">
                    <div class="query-col-title">大区：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="regionList" @back-event="backPlat($event,'D')" placeholder="请输入大区名称" :selectObj="selectAuth.regionObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" v-if="branch">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" v-if="district">
                    <div class="query-col-title">区域：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="areaList" @back-event="backPlat($event,'Q')" placeholder="请输入区域名称" :selectObj="selectAuth.areaObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">年份：</div>
                    <el-date-picker v-model="queryParams.commitmentYear" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch()">
                            搜索
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">
                            重置
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">
                            导出表格
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
                        <el-button v-show="queryParams.processType == 0" class="orangeBtn" @click="onApprovalList(scope.data.row)">审批</el-button>
                        <el-button v-show="queryParams.processType == 1" class="orangeBtn" @click="onApproveDeclare(scope.data.row)">查看详情</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { departmentAuth } from '@/mixins/userAuth'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { approvalListHasDoneLabel, approvalListLabel } from './const'
import { getFundPlanAll } from './api'
import { clearCache, newCache } from '@/utils/index'
import { mapState } from 'vuex'

export default {
    name: 'planCredit',
    components: { HAutocomplete },
    mixins: [departmentAuth],
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            areaList: state => state.areaList,
            platformData: state => state.platformData
        })
    },
    data () {
        return {
            tableLabel: approvalListLabel,
            tableLabelNotToDo: approvalListLabel,
            tableLabelHasDone: approvalListHasDoneLabel,
            queryParams: {
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
            selectAuth: {
                regionObj: {
                    selectCode: '',
                    selectName: ''
                },
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                areaObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
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
            this.$set(this.queryParams, 'applyMonth', '')
            this.$set(this.queryParams, 'companyName', '')
            this.$set(this.queryParams, 'subSectionCode', '')
            this.selectObj.branch = { ...obj }
            this.selectObj.platformData = { ...obj }
            this.platComList = []
            this.onSearch()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        async onQuery () {
            const { data } = await getFundPlanAll(this.paramsTemp)
            this.tableData = data.records
        },
        onSearch () {
            this.paramsTemp = { ...this.queryParams }
            this.onQuery()
        },
        onApprovalList (row) {
            this.$router.push({ path: '/fundsPlan/approveDetail', query: { id: row.planId } })
        },
        onApproveDeclare (row) {
            this.$router.push({
                path: '/fundsPlan/approveDeclare',
                query: {
                    id: row.planId,
                    source: 'approvalList'
                }
            })
        },
        async backPlat (val, dis) {
            if (dis === 'F') {
                this.queryParams.subSectionCode = val.value.selectCode ? val.value.selectCode : ''
                this.queryParams.companyName = ''
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
                this.queryParams.companyName = val.value.companyName ? val.value.companyName : ''
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
    },
    beforeRouteEnter (to, from, next) {
        newCache('approvalList')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'approveDeclare') {
            clearCache('approvalList')
        }
        next()
    }
}
</script>

<style scoped>

</style>

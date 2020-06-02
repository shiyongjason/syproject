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
<!--                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">-->
<!--                    <template slot="applyMonth" slot-scope="scope">-->
<!--                        <span>{{`${scope.data.row.applyMonth.substring(0, 4)}-${scope.data.row.applyMonth.substring(4, 6)}`}}</span>-->
<!--                    </template>-->
<!--                    <template slot="action" slot-scope="scope">-->
<!--                        <el-button v-show="queryParams.processType == 0" class="orangeBtn" @click="onApprovalList(scope.data.row)">审批</el-button>-->
<!--                        <el-button v-show="queryParams.processType == 1" class="orangeBtn" @click="onApproveDeclare(scope.data.row)">查看详情</el-button>-->
<!--                    </template>-->
<!--                </basicTable>-->
                <hosJoyTable ref="hosjoyTable" border stripe :column="columnData" :data="platformPlanList" align="center"
                             :total="platformPlanPagination.total">
                    <template slot="organizationName" slot-scope="scope">
                        <a :class="scope.data.row.cellType === 1 && scope.data.row.planId ? 'light' : ''" @click="goDetail(scope.data.row.planId, scope.data.row.cellType === 1)" type="primary">{{scope.data.row.organizationName}}</a>
                    </template>
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { departmentAuth } from '@/mixins/userAuth'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import {approvalListHasDoneLabel, approvalListLabel, planApproval} from './const'
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
    name: 'planCredit',
    components: { HAutocomplete },
    mixins: [departmentAuth],
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        }),
        ...mapGetters({
            targetTime: 'fundsPlan/targetTime'
        })
    },
    data () {
        return {
            queryParams: {
                processType: '0',
                applyMonth: '',
                companyName: '',
                subSectionCode: '',
                pageNumber: 1,
                pageSize: 10
            },
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
        btnQuery (params) {
            this.queryParamsTemp = { ...params }
            this.onQuery(params)
        },
        getList (val) {
            this.onQuery({ ...this.queryParamsTemp, ...val })
        },
        async onQuery (params) {
            this.findPlanApprovalList(params)
            await this.findPlanApprovalTotal(params)
            // const columnData = planApproval(params.valueYear)
            // columnData.forEach((value, index) => {
            //     if (index > 3) {
            //         value.children.forEach((val) => {
            //             if (this.planApprovalTotal[val.prop]) {
            //                 val.label = String(this.planApprovalTotal[val.prop])
            //             }
            //         })
            //     }
            // })
            // this.columnData = columnData
        },
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'D') {
                this.params.subsectionCode = ''
                this.params.misCode = ''
                this.selectAuth.branchObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'F') {
                this.params.misCode = ''
                this.selectAuth.platformObj = { ...obj }
            }
        },
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
        },
        async backPlat (val, dis) {
            if (dis === 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                // 清空分部区域
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                // 查平台公司 - 分部查询时入参老code 1abc7f57-2830-11e8-ace9-000c290bec91
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'P') {
                this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
            }
        },
        ...mapActions({
            findAuthList: 'findAuthList',
            findTargetTime: 'fundsPlan/findTargetTime'
        })
    },
    async mounted () {
        await this.findTargetTime()
        this.queryParams.valueYear = this.targetTime.slice(0, 4)
        await this.btnQuery(this.queryParams)
        this.newBossAuth(['D', 'F', 'P'])
    }
}
</script>

<style scoped>

</style>

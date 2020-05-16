<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
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
                <div class="query-cont-col" v-if="false">
                    <div class="query-col-title">区域：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="areaList" @back-event="backPlat($event,'Q')" placeholder="请输入区域名称" :selectObj="selectAuth.areaObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" v-if="false">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    <el-button type="primary" class="ml20" @click="onExport" v-if="hosAuthCheck(branchOverdueSumExport)">导出表格</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table overdueTable">
                <div class="util">单位：万元</div>
                <hosJoyTable ref="hosjoyTable" border stripe :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="page.pageNumber" :pageSize.sync="page.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { branchSummarySheet } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { getBranchOverdueList, exportBranchOverdueDetailExcel } from './api/index'
import moment from 'moment'
import { BRANCH_OVERDUE_SUM_EXPORT } from '@/utils/auth_const'
export default {
    name: 'commitValue',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            branchOverdueSumExport: BRANCH_OVERDUE_SUM_EXPORT,
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
            },
            queryParams: {
                regionCode: '',
                subRegionCode: '',
                subsectionCode: '',
                subsectionOldCode: '',
                misCode: '',
                commitmentYear: moment().format('YYYY')
            },
            searchParams: {},
            page: {
                total: 0,
                pageNumber: 1,
                pageSize: 10
            },
            total: {},
            tableData: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            areaList: state => state.areaList,
            platformData: state => state.platformData
        }),
        column () {
            return branchSummarySheet()
        }
    },
    methods: {
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'D') {
                this.queryParams.subsectionCode = ''
                this.queryParams.subsectionOldCode = ''
                this.queryParams.subRegionCode = ''
                this.queryParams.misCode = ''
                this.selectAuth.branchObj = { ...obj }
                this.selectAuth.areaObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'F') {
                this.queryParams.subRegionCode = ''
                this.queryParams.misCode = ''
                this.selectAuth.areaObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'Q') {
                this.queryParams.misCode = ''
                this.selectAuth.platformObj = { ...obj }
            }
        },
        async backPlat (val, dis) {
            // console.log(val, dis)
            if (dis === 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                this.findAuthList({ deptType: 'Q', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                // 清空分部区域
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.queryParams.subsectionOldCode = val.value.crmDeptCode ? val.value.crmDeptCode : ''
                this.findAuthList({
                    deptType: 'Q',
                    pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.queryParams.regionCode ? this.queryParams.regionCode : this.userInfo.pkDeptDoc
                })
                // 查平台公司 - 分部查询时入参老code 1abc7f57-2830-11e8-ace9-000c290bec91
                if (val.value.crmDeptCode) {
                    this.findPlatformslist({ subsectionCode: val.value.crmDeptCode })
                } else {
                    this.findPlatformslist()
                }
                !val.value.crmDeptCode && this.linkage(dis)
            } else if (dis === 'Q') {
                this.queryParams.subRegionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                // 查平台公司 - 区域查询时入参新code 1050V3100000000F6HHM
                if (val.value.selectCode) {
                    this.findPlatformslist({ subregionCode: val.value.selectCode })
                } else {
                    let params = null
                    if (this.queryParams.subsectionOldCode) {
                        params = {
                            subsectionCode: this.queryParams.subsectionOldCode
                        }
                    }
                    this.findPlatformslist(params)
                }
                !val.value.selectCode && this.linkage(dis)
            } else if (dis === 'P') {
                this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
            }
        },
        onExport () {
            exportBranchOverdueDetailExcel(this.searchParams)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async onQuery () {
            // 不分页
            const { data } = await getBranchOverdueList(this.searchParams)
            // console.log(data)
            this.tableData = data
            this.tableData.map(i => {
                i.incrementProportion *= 100
                if (i.incrementProportion !== 0) i.incrementProportion = i.incrementProportion.toFixed(2)
                i.incrementProportion += '%'
                i.stockPlanProportion *= 100
                if (i.stockPlanProportion !== 0) i.stockPlanProportion = i.stockPlanProportion.toFixed(2)
                i.stockPlanProportion += '%'
            })
        },
        getList (val) {
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            this.onQuery()
        },
        async onReset () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.$set(this.queryParams, 'regionCode', '')
            this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'subsectionOldCode', '')
            this.$set(this.queryParams, 'subRegionCode', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'commitmentYear', moment().format('YYYY'))
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            this.selectAuth.areaObj = { ...obj }
            this.selectAuth.platformObj = { ...obj }
            await this.oldBossAuth()
            this.onSearch()
        }
    },
    async mounted () {
        this.onSearch()
        // await this.oldBossAuth()
    }
}
</script>

<style lang="scss" scoped>
.upload-demo {
    display: inline-block;
}
.overdueTable {
    position: relative;
    margin-top: 10px;
}
.util {
    font-size: 10px;
    position: absolute;
    top: -16px;
    right: 0;
}
/deep/.el-table__header .repaymentStyle {
    background-color: rgba($color: #c65911, $alpha: 1) !important;
    color: #fff !important;
}
/deep/.el-table__row .repaymentStyle {
    background-color: rgba($color: #c65911, $alpha: 0.5) !important;
    color: #fff !important;
}
</style>

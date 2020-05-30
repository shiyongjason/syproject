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
                <hosJoyTable ref="hosjoyTable" border stripe :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="page.pageNumber" :pageSize.sync="page.pageSize" :height="fixedHeight" @pagination="getList">
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
                }
            },
            queryParams: {
                regionCode: '',
                subsectionCode: '',
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
            branchList: state => state.branchList
        }),
        column () {
            return branchSummarySheet()
        },
        fixedHeight () {
            let oneHeight = 48
            let isHeight = 110 + (this.tableData.length < 1 ? 1 : this.tableData.length) * oneHeight
            return isHeight > 450 ? 450 : isHeight
        }
    },
    methods: {
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.queryParams.subsectionCode = ''
            this.selectAuth.branchObj = { ...obj }
        },
        async backPlat (val, dis) {
            if (dis === 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
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
            this.tableData = data
            this.tableData.map(i => {
                if (i.incrementProportion != null) {
                    i.incrementProportion *= 100
                    if (i.incrementProportion !== 0) i.incrementProportion = i.incrementProportion.toFixed(2)
                    i.incrementProportion += '%'
                }
                if (i.stockPlanProportion != null) {
                    i.stockPlanProportion *= 100
                    if (i.stockPlanProportion !== 0) i.stockPlanProportion = i.stockPlanProportion.toFixed(2)
                    i.stockPlanProportion += '%'
                }
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
            this.$set(this.queryParams, 'commitmentYear', moment().format('YYYY'))
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            await this.newBossAuth(['D', 'F'])
            this.onSearch()
        }
    },
    async mounted () {
        this.onSearch()
        await this.newBossAuth(['D', 'F'])
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

<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <el-tabs v-model="queryParams.state" type="card" @tab-click="handleClick">
                <el-tab-pane label="平台公司回款跟踪" name="1"></el-tab-pane>
                <el-tab-pane label="分部回款跟踪" name="2"></el-tab-pane>
            </el-tabs>
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
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">查询时间：</div>
                    <el-date-picker v-model="queryParams.startDate" :clearable='false' :editable="false" :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endDate" :clearable='false' :editable="false" :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    <el-button type="primary" class="ml20" @click="onExport" v-if="hosAuthCheck(platformOverdueSumExport)">导出表格</el-button>
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
import { mapState, mapActions } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { backMoneyTrack, backMoneyTrackTotal } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { getCompanyOverdueList, getCompanyOverdueListTotal, exportBackMoneyTrack } from './api/index'
import moment from 'moment'
export default {
    name: 'backMoneyTrack',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            loading: false,
            selectAuth: {
                regionObj: {
                    selectCode: '',
                    selectName: ''
                },
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
            queryParams: {
                state: '1',
                regionCode: '',
                subsectionCode: '',
                companyName: ''
            },
            searchParams: {},
            page: {
                total: 0,
                pageSize: 10,
                pageNumber: 1
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
            platformData: state => state.platformData
        }),
        column () {
            return backMoneyTrack
        },
        fixedHeight () {
            let oneHeight = 71
            let isHeight = 180 + (this.tableData.length < 1 ? 1 : this.tableData.length) * oneHeight
            return isHeight > 450 ? 450 : isHeight
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endDate
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startDate
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
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
                this.queryParams.companyName = ''
                this.selectAuth.branchObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'F') {
                this.queryParams.companyName = ''
                this.selectAuth.platformObj = { ...obj }
            }
        },
        async backPlat (val, dis) {
            if (dis === 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'P') {
                this.queryParams.companyName = val.value.companyShortName ? val.value.companyShortName : ''
            }
        },
        onExport () {
            exportBackMoneyTrack(this.searchParams)
        },
        handleClick () {
            this.tableData = []
            this.onReset()
        },
        onSearch () {
            this.searchParams = {
                ...this.queryParams,
                ...this.page
            }
            this.findBackMoneyTrackList(this.searchParams)
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
            this.$set(this.queryParams, 'subRegionCode', '')
            this.$set(this.queryParams, 'companyName', '')
            this.$set(this.queryParams, 'year', moment().format('YYYY'))
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            this.selectAuth.platformObj = { ...obj }
            await this.newBossAuth(['D', 'F', 'P'])
            this.onSearch()
        },
        ...mapActions([
            'findBackMoneyTrackList',
            'findBackMoneyTrackTotal'
        ])
    },
    async mounted () {
        this.onSearch()
        await this.newBossAuth(['D', 'F', 'P'])
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
    /deep/.overdueTable td{
        height: 20px;
    }
</style>

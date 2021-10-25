<template>
    <div class="page-body back-money-track amount">
        <div>
            <el-tabs v-model="queryParams.departmentType" type="card" @tab-click="handleClick">
                <el-tab-pane label="平台公司回款跟踪" name="1"></el-tab-pane>
                <el-tab-pane label="分部回款跟踪" name="2"></el-tab-pane>
            </el-tabs>
            <div v-show="toggle" class="page-body-cont query-cont">
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
                <div class="query-cont-col" v-if="queryParams.departmentType === '1'">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">查询时间：</div>
                    <el-date-picker v-model="queryParams.startDate" @change="restEndTime" :clearable='false' :editable="false" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endDate" :clearable='false' :editable="false" :picker-options="pickerOptions" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="default" class="ml20" @click="onReset">重置</el-button>
                    <el-button type="default" class="ml20" @click="onExport">导出表格</el-button>
                </div>
            </div>
            <searchBarOpenAndClose :status="toggle" @toggle="toggle = !toggle"></searchBarOpenAndClose>
        </div>
        <div class="page-body-cont">
            <div class="page-table overdueTable">
                <div class="util">单位：万元</div>
                <hosJoyTable
                    ref="hosjoyTable"
                    :amountResetTable="toggle"
                    isSimpleTable collapseShow :localName="'backMoneyTrackTable::v2.4.0'"
                    border
                    stripe
                    :showPagination='!!backMoneyPagination.total'
                    :column="column" :data="backMoneyList"
                    :total="backMoneyPagination.total"
                    :pageNumber.sync="backMoneyPagination.pageNumber"
                    :pageSize.sync="backMoneyPagination.pageSize"
                    @pagination="getList"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { backMoneyTrack } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { exportBackMoneyTrack } from './api/index'
import filters from '../../../utils/filters'
import moment from 'moment'
export default {
    name: 'backMoneyTrack',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            toggle: true,
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
                departmentType: '1',
                startDate: moment(new Date()).startOf('month').format('YYYY-MM-DD'),
                endDate: moment(new Date()).format('YYYY-MM-DD'),
                misCode: '',
                pageNumber: 1,
                pageSize: 10,
                regionCode: '',
                subsectionCode: ''
            },
            tableData: [],
            column: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        }),
        ...mapGetters({
            backMoneyList: 'fundsOverdue/backMoneyList',
            backMoneyTotal: 'fundsOverdue/backMoneyTotal',
            backMoneyPagination: 'fundsOverdue/backMoneyPagination'
        }),
        pickerOptions () {
            return {
                disabledDate: time => {
                    let beginDateVal = moment(this.queryParams.startDate).startOf('month').format('YYYY-MM-DD')
                    let endDateVal = moment(this.queryParams.startDate).endOf('month').add(1, 'days').format('YYYY-MM-DD')
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7 || time.getTime() > new Date(endDateVal).getTime() - 8.64e7
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
                this.queryParams.misCode = ''
                this.selectAuth.branchObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'F') {
                this.queryParams.misCode = ''
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
                this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
            }
        },
        onExport () {
            exportBackMoneyTrack(this.queryParamsTemp)
        },
        handleClick () {
            this.onReset()
        },
        async onSearch () {
            // this.$refs.hosjoyTable.toggleTableHandler()
            this.queryParamsTemp = {
                ...this.queryParams
            }
            if (this.queryParamsTemp.departmentType === '2') {
                backMoneyTrack[0].isHidden = true
                backMoneyTrack[0].coderHidden = true
                backMoneyTrack[1].isHidden = true
                backMoneyTrack[1].coderHidden = true
            } else {
                backMoneyTrack[0].isHidden = false
                backMoneyTrack[0].coderHidden = false
                backMoneyTrack[1].isHidden = false
                backMoneyTrack[1].coderHidden = false
            }
            this.findBackMoneyTrackList(this.queryParamsTemp)
            await this.findBackMoneyTrackTotal(this.queryParamsTemp)
            let noIgnore = true
            backMoneyTrack.forEach(value => {
                if (value.children && value.children.length > 0) {
                    for (let key in this.backMoneyTotal) {
                        noIgnore = String(this.backMoneyTotal[key]).indexOf('%') === -1
                        if (key === value.children[0].prop && this.backMoneyTotal[key] !== null) {
                            if (noIgnore) {
                                value.children[0].label = String(filters.moneyFormat(this.backMoneyTotal[key], 2, false))
                            } else {
                                value.children[0].label = String(this.backMoneyTotal[key])
                            }
                        }
                    }
                }
            })
            this.column = backMoneyTrack
        },
        getList (val) {
            this.queryParamsTemp = {
                ...this.queryParamsTemp,
                ...val
            }
            this.findBackMoneyTrackList(this.queryParamsTemp)
            this.findBackMoneyTrackTotal(this.queryParamsTemp)
        },
        async onReset () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.queryParams = { ...this.restQueryParams, departmentType: this.queryParams.departmentType }
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            this.selectAuth.platformObj = { ...obj }
            await this.newBossAuth(['D', 'F', 'P'])
            this.onSearch()
        },
        restEndTime () {
            this.queryParams.endDate = moment(this.queryParams.startDate).endOf('month').format('YYYY-MM-DD')
        },
        ...mapActions({
            findBackMoneyTrackList: 'fundsOverdue/findBackMoneyTrackList',
            findBackMoneyTrackTotal: 'fundsOverdue/findBackMoneyTrackTotal'
        })
    },
    async mounted () {
        this.restQueryParams = { ...this.queryParams }
        this.onSearch()
        await this.newBossAuth(['D', 'F', 'P'])
    }
}
</script>

<style lang="scss" scoped>
    .back-money-track {
        background: #ffffff;
        padding: 40px 15px 0;
        box-sizing: border-box;
    }
    .overdueTable {
        position: relative;
    }
    .util {
        font-size: 10px;
        text-align: right;
        line-height: 12px;
        margin-bottom: 8px;
    }
    /deep/.el-tabs__header{
        margin-bottom: 10px;
    }
    /deep/.el-tabs__item {
        height: 32px;
        line-height: 32px;
        font-size: 13px;
    }
</style>

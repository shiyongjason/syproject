<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">大区：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="regionList" @back-event="backPlat($event,'D')" placeholder="请输入平台公司名称" :selectObj="selectAuth.regionObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入平台公司名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">区域：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="areaList" @back-event="backPlat($event,'Q')" placeholder="请输入平台公司名称" :selectObj="selectAuth.areaObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
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
                    <el-date-picker v-model="queryParams.monthYear" type="year" placeholder="选择年">
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onSearch">重置</el-button>
                    <el-button type="primary" class="ml20" @click="onSearch">导入表格</el-button>
                    <el-button type="primary" class="ml20" @click="onSearch">导出表格</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <hosJoyTable ref="hosjoyTable" border stripe :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { tableLabel } from './const'
import { departmentAuth } from '@/mixins/userAuth'
export default {
    name: 'commitValue',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
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
                },
            },
            queryParams: {
                regionCode: '',
                subRegionCode: '',
                subsectionCode: '',
                companyCode: '',
                monthYear: '',
                pageNumber: 1,
                pageSize: 10
            },
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            total: {},
            tableData: [],
            column: tableLabel
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            areaList: state => state.areaList,
            platformData: state => state.platformData
        })
    },
    methods: {
        backPlat (val, dis) {
            console.log(val, dis)
            if (dis == 'D') {
                this.queryParams.regionCode = val.value.crmDeptCode ? val.value.crmDeptCode : ''
                val.value.pkDeptDoc && this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc })
                val.value.pkDeptDoc && this.findAuthList({ deptType: 'Q', pkDeptDoc: val.value.pkDeptDoc })
            } else if (dis == 'F') {
                this.queryParams.subSectionCode = val.value.crmDeptCode ? val.value.crmDeptCode : ''
                val.value.pkDeptDoc && this.findAuthList({ deptType: 'Q', pkDeptDoc: val.value.pkDeptDoc })
                val.value.crmDeptCode && this.findPlatformslist({ subsectionCode: val.value.crmDeptCode })
            } else if (dis == 'Q') {
                this.queryParams.subRegionCode = val.value.crmDeptCode ? val.value.crmDeptCode : ''
            } else if (dis == 'P') {
                this.queryParams.companyCode = val.value.crmDeptCode ? val.value.companyCode : ''
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            // console.log(this.column)
            // this.column[1].label = 'shy'
            this.onQuery()
        },
        onQuery () {
            console.log('搜索')
            console.log(this.queryParams)
        },
        getList (val) {
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            this.onQuery()
        }
    },
    async mounted () {
        this.onSearch()
        await this.oldAuth()
        console.log(this)
        // if (this.userInfo.deptType == 2) {
        //     this.queryParams.subsectionCode = this.branchList[0].crmDeptCode
        // }
    }
}
</script>

<style lang="scss" scoped>
</style>

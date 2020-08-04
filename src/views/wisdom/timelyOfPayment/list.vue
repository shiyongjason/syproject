<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <el-tabs v-model="queryParams.departmentType" type="card" @tab-click="handleClick">
                <el-tab-pane label="平台公司月度回款及时率" name="1"></el-tab-pane>
                <el-tab-pane label="分部公司月度回款及时率" name="2"></el-tab-pane>
            </el-tabs>
            <div class="query-cont-row">
                <hosjoyAutoCompleteRbp :regionData.sync='queryParams.regionCode' :branchData.sync='queryParams.subsectionCode' :platCompanyData.sync='queryParams.misCode' :showPlatCompany='queryParams.departmentType == 1' />
                <!-- <div class="query-cont-col" v-if="region">
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
                    <div class="query-cont-col" v-if="queryParams.departmentType == 1">
                        <div class="query-col-title">平台公司：</div>
                        <div class="query-col-input">
                            <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                        </div>
                    </div> -->
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">年份：</div>
                    <el-date-picker v-model="queryParams.selectDate" type="date" value-format='yyyy-MM-dd' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    <div v-if="queryParams.state == 1 && hosAuthCheck(platformOverdueSumImport)">
                        <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/api/company/annual-repayment-plan/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload :headers='headersData' :data='{state: 1}'>
                            <el-button type="primary" class='ml20' :loading='loading'>
                                导入表格
                            </el-button>
                        </el-upload>
                    </div>
                    <el-button type="primary" class="ml20" @click="onExport" v-if="!hosAuthCheck()">导出表格</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table overdueTable">
                <div class="util">单位：万元</div>
                <hosJoyTable ref="hosjoyTable" border stripe v-if="hosDestroyed" :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="page.pageNumber" :pageSize.sync="page.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import hosjoyAutoCompleteRbp from '@/components/HosjoyAutoCompleteRbp/hosjoyAutoCompleteRbp'
import { platformSummarySheet, overDueTotal } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { interfaceUrl } from '@/api/config'
import { getOverduepage, getOverdueTotal, exportOverdueExcel } from './api/index'
import moment from 'moment'
import filters from '@/utils/filters'
import { PLATFORM_OVERDUE_SUM_EXPORT, PLATFORM_OVERDUE_SUM_IMPORT } from '@/utils/auth_const'
export default {
    name: 'commitValue',
    mixins: [departmentAuth],
    components: { hosJoyTable, hosjoyAutoCompleteRbp },
    data: function () {
        return {
            platformOverdueSumExport: PLATFORM_OVERDUE_SUM_EXPORT,
            platformOverdueSumImport: PLATFORM_OVERDUE_SUM_IMPORT,
            headersData: {
                'refreshToken': sessionStorage.getItem('refreshToken'),
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            accept: '.xlsx,.xls',
            loading: false,
            interfaceUrl: interfaceUrl,
            // selectAuth: {
            //     regionObj: {
            //         selectCode: '',
            //         selectName: ''
            //     },
            //     branchObj: {
            //         selectCode: '',
            //         selectName: ''
            //     },
            //     platformObj: {
            //         selectCode: '',
            //         selectName: ''
            //     }
            // },
            queryParams: {
                departmentType: '1',
                regionCode: '',
                subsectionCode: '',
                misCode: '',
                selectDate: moment().format('YYYY-MM-DD')
            },
            searchParams: {},
            page: {
                total: 0,
                pageSize: 10,
                pageNumber: 1
            },
            total: {},
            tableData: [],
            dialogFormVisible: false,
            column: [],
            hosDestroyed: true,
            nowToday: moment().format('DD')

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        })
    },
    methods: {
        // linkage (dis) {
        //     let obj = {
        //         selectCode: '',
        //         selectName: ''
        //     }
        //     if (dis === 'D') {
        //         this.queryParams.subsectionCode = ''
        //         this.queryParams.companyName = ''
        //         this.selectAuth.branchObj = { ...obj }
        //         this.selectAuth.platformObj = { ...obj }
        //     } else if (dis === 'F') {
        //         this.queryParams.companyName = ''
        //         this.selectAuth.platformObj = { ...obj }
        //     }
        // },
        // async backPlat (val, dis) {
        //     if (dis === 'D') {
        //         this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
        //         this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
        //         !val.value.pkDeptDoc && this.linkage(dis)
        //     } else if (dis === 'F') {
        //         this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
        //         if (val.value.pkDeptDoc) {
        //             this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
        //         } else {
        //             !this.userInfo.deptType && this.findPlatformslist()
        //         }
        //         !val.value.pkDeptDoc && this.linkage(dis)
        //     } else if (dis === 'P') {
        //         this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
        //     }
        // },
        fundMoneys (val) {
            return filters.money(val)
        },
        onExport () {
            exportOverdueExcel(this.searchParams)
        },
        changeColumn (val) {
            const _N = moment(this.queryParams.selectDate).format('DD')
            this.newCloum = JSON.parse(JSON.stringify(platformSummarySheet(parseInt(_N))))
            if (val == 2) {
                const newChildren = {
                    prop: '',
                    fixed: true,
                    minWidth: '200',
                    children: [
                        {

                            label: '分部',
                            children: [
                                {
                                    prop: 'subsectionName',
                                    minWidth: '100',
                                    label: '合计',
                                    showOverflowTooltip: true
                                }
                            ]
                        },
                        {
                            label: '大区',
                            children: [
                                {
                                    prop: 'regionName',
                                    minWidth: '100',
                                    label: '-',
                                    showOverflowTooltip: true
                                }
                            ]
                        }
                    ]
                }
                this.$set(this.newCloum, 0, newChildren)
                this.column = JSON.parse(JSON.stringify(this.newCloum))
            } else {
                this.column = JSON.parse(JSON.stringify(platformSummarySheet(parseInt(_N))))
            }
            this.hosDestroyed = false
            this.$nextTick(() => {
                this.hosDestroyed = true
            })
            this.onReset()
        },
        handleClick () {
            this.tableData = []
            this.changeColumn(this.queryParams.departmentType)
        },
        onSearch () {
            this.searchParams = {
                ...this.queryParams,
                ...this.page
            }
            delete this.searchParams.total
            const _N = moment(this.queryParams.selectDate).format('DD')
            this.onQuery(_N)
        },
        async onQuery (_N) {
            let _column = []
            if (this.queryParams.departmentType == 1) {
                _column = platformSummarySheet(parseInt(_N))
            } else {
                _column = JSON.parse(JSON.stringify(this.newCloum))
            }
            console.log(1, _column)
            const promiseArr = [getOverduepage(this.searchParams), getOverdueTotal(this.searchParams)]
            var data = await Promise.all(promiseArr).then((res) => {
                if (!res[1].data) {
                    res[1].data = overDueTotal
                }
                const rest = res[1].data
                let temp = { ...overDueTotal, ...rest }

                for (let key in temp) {
                    _column.forEach(value => {
                        value.children.forEach(value1 => {
                            value1.children.forEach(value2 => {
                                if (value2.prop === key && temp[key] != null) {
                                    if (key == 'timelyRepaymentRateNumber') {
                                        value2.label = String(temp[key]) + '%'
                                    } else if (key == 'timelyRepaymentRateAmount') {
                                        value2.label = String(temp[key]) + '%'
                                    } else if (key == 'increaseAndDecreaseNumber') {
                                        value2.label = String(temp[key]) + '%'
                                    } else if (key == 'increaseAndDecreaseAmount') {
                                        value2.label = String(temp[key]) + '%'
                                    } else if (key == 'yesterdayTimelyRepaymentRateAmount') {
                                        value2.label = String(temp[key]) + '%'
                                    } else if (key == 'yesterdayTimelyRepaymentRateNumber') {
                                        value2.label = String(temp[key]) + '%'
                                    } else if (key == 'receivableAmount') {
                                        value2.label = this.fundMoneys(temp[key])
                                    } else if (key == 'timelyRepaymentAmount') {
                                        value2.label = this.fundMoneys(temp[key])
                                    } else if (key == 'yesterdayTimelyRepaymentAmount') {
                                        value2.label = this.fundMoneys(temp[key])
                                    } else if (key == 'yesterdayReceivableAmount') {
                                        value2.label = this.fundMoneys(temp[key])
                                    } else {
                                        value2.label = String(temp[key])
                                    }
                                }
                            })
                        })
                    })
                }
                return res[0].data
            }).catch((error) => {
                this.$message.error(`error:${error}`)
            })
            this.column = _column
            // this.hosDestroyed = false
            // this.$nextTick(() => {
            //     this.hosDestroyed = true
            // })
            // this.changeColumn()

            this.tableData = data.records
            this.page = {
                total: data.total,
                pageSize: data.size,
                pageNumber: data.current
            }
        },
        getList (val) {
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            this.onQuery()
        },
        async onReset () {
            // let obj = {
            //     selectCode: '',
            //     selectName: ''
            // }
            this.$set(this.queryParams, 'regionCode', '')
            this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'subRegionCode', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'selectDate', moment().format('YYYY-MM-DD'))
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            // this.selectAuth.regionObj = { ...obj }
            // this.selectAuth.branchObj = { ...obj }
            // this.selectAuth.platformObj = { ...obj }
            // await this.newBossAuth(['D', 'F', 'P'])
            this.onSearch()
        }
    },
    async mounted () {
        this.changeColumn(2)
        this.onSearch()
        // this.column = platformSummarySheet(parseInt(this.nowToday))
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
    top: -22px;
    right: 0;
}
/deep/.el-table__header .repaymentStyle {
    background-color: rgba($color: #e6a23c, $alpha: 0.8) !important;
    color: #fff !important;
}
/deep/.el-table__row .repaymentStyle {
    background-color: rgba($color: #e6a23c, $alpha: 0.8) !important;
    color: #fff !important;
}
/deep/.el-table__header .colorBlue {
    background-color: rgba($color: #ff7a45, $alpha: 1) !important;
    color: #fff !important;
}
/deep/.el-table__header .colorInfo {
    background-color: rgba($color: #13c2c2, $alpha: 1) !important;
    color: #fff !important;
}
/deep/.el-table__header .lightBlueStyle {
    background-color: rgba($color: #1989fa, $alpha: 1) !important;
    color: #fff !important;
}
/deep/.el-table__header .lightBlueStyle {
    background-color: rgba($color: #1989fa, $alpha: 1) !important;
    color: #fff !important;
}
</style>

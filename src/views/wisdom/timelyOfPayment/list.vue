<template>
    <div class="page-body timelyOfPayment amount">
        <div class="page-body-cont query-cont">
            <el-tabs v-model="queryParams.departmentType" type="card" @tab-click="handleClick">
                <el-tab-pane label="平台公司月度回款及时率" name="1"></el-tab-pane>
                <el-tab-pane label="分部月度回款及时率" name="2"></el-tab-pane>
            </el-tabs>
            <div v-show="toggle">
                <div class="page-body-cont query-cont">
                    <hosjoyAutoCompleteRbp :regionData.sync='queryParams.regionCode' :branchData.sync='queryParams.subsectionCode' :platCompanyData.sync='queryParams.misCode' :showPlatCompany='queryParams.departmentType == 1' />
                    <div class="query-cont-col flex-box-time">
                        <div class="query-col-title">查询时间：</div>
                        <el-date-picker v-model="queryParams.selectDate" type="date" value-format='yyyy-MM-dd' placeholder="选择年" :editable='false' :clearable='false'>
                        </el-date-picker>
                    </div>
                    <div class="query-cont-col">
                        <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                        <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                        <el-button type="primary" class="ml20" @click="onExport" >导出表格</el-button>
                    </div>
                </div>
            </div>
        </div>
        <searchBarOpenAndClose :status="toggle" @toggle="toggle = !toggle"></searchBarOpenAndClose>
        <div class="page-body-cont">
            <div class="page-table overdueTable">
                <div class="util">单位：万元</div>
                <hosJoyTable
                    :amountResetTable="toggle"
                    ref="hosjoyTable" border stripe :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="page.pageNumber" :pageSize.sync="page.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import hosjoyAutoCompleteRbp from '@/components/HosjoyAutoCompleteRbp/hosjoyAutoCompleteRbp'
import { platformSummarySheet } from './const'
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
            toggle: true,
            platformOverdueSumExport: PLATFORM_OVERDUE_SUM_EXPORT,
            platformOverdueSumImport: PLATFORM_OVERDUE_SUM_IMPORT,
            headersData: {
                'refreshToken': localStorage.getItem('refreshToken'),
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            accept: '.xlsx,.xls',
            loading: false,
            interfaceUrl: interfaceUrl,
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
        onExport () {
            exportOverdueExcel(this.searchParams, this.queryParams.departmentType == 1 ? '平台公司' : '分部')
        },
        handleClick () {
            this.page = {
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
            this.onReset()
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
            this.newCloum = platformSummarySheet(parseInt(_N))
            if (this.queryParams.departmentType == 2) {
                this.newCloum[0].minWidth = 200
                this.newCloum[0].children[0].isHidden = true
                this.newCloum[0].children[0].coderHidden = true
                this.newCloum[0].children[1].isHidden = true
                this.newCloum[0].children[1].coderHidden = true
            } else {
                this.newCloum[0].minWidth = 400
                this.newCloum[0].children[0].isHidden = false
                this.newCloum[0].children[0].coderHidden = false
                this.newCloum[0].children[1].isHidden = false
                this.newCloum[0].children[1].coderHidden = false
            }
            const promiseArr = [getOverduepage(this.searchParams), getOverdueTotal(this.searchParams)]
            var data = await Promise.all(promiseArr).then((res) => {
                let temp = res[1].data || {}
                for (let key in temp) {
                    this.newCloum.forEach(value => {
                        value.children.forEach(value1 => {
                            value1.children.forEach(value2 => {
                                if (value2.prop === key && temp[key] != null) {
                                    value2.label = temp[key]
                                }
                            })
                        })
                    })
                }
                return res[0].data
            }).catch((error) => {
                this.$message.error(`error:${error}`)
            })
            this.tableData = data.records
            this.page = {
                total: data.total,
                pageSize: data.size,
                pageNumber: data.current
            }
            this.column = this.newCloum
        },
        getList (val) {
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            const _N = moment(this.queryParams.selectDate).format('DD')
            this.onQuery(_N)
        },
        async onReset () {
            this.$set(this.queryParams, 'regionCode', '')
            this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'subRegionCode', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'selectDate', moment().format('YYYY-MM-DD'))
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            this.onSearch()
        }
    },
    async mounted () {
        this.onSearch()
    }
}
</script>

<style lang="scss" scoped>
.upload-demo {
    display: inline-block;
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
/deep/.el-tabs__header{
    margin-bottom: 10px;
}
/deep/.el-tabs__item {
    height: 32px;
    line-height: 32px;
    font-size: 13px;
}
    /deep/.page-body .page-body-cont:not(:first-child){
        margin-top: 0;
    }
</style>

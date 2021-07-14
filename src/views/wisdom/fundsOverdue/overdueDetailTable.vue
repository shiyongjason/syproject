<template>
    <div class="page-body query-cont amount">
        <div v-show="toggle"  class="page-body-cont query-cont">
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
                <div class="query-cont-col">
                    <div class="query-col-title">合同到期日：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" :editable="false" :clearable="false" v-model="queryParams.payStartTime" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('payEndTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" :editable="false" :clearable="false" v-model="queryParams.payEndTime" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('payStartTime')">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">宽限期到期日：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" :editable="false" :clearable="false" v-model="queryParams.overdueStartTime" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('overdueEndTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" :editable="false" :clearable="false" v-model="queryParams.overdueEndTime" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('overdueStartTime')">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">实际还款日：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" :editable="false" :clearable="false" v-model="queryParams.actualPayStartTime" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('actualPayEndTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" :editable="false" :clearable="false" v-model="queryParams.actualPayEndTime" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('actualPayStartTime')">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="default" class="ml20" @click="onReset">重置</el-button>
                    <el-upload v-if="hosAuthCheck(overdueDetailTableImport)" class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/api/company/annual-repayment-plan/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload :headers='headersData' :data='{state: 2}'>
                        <el-button type="default" class='ml20' :loading='loading'>
                            导入表格
                        </el-button>
                    </el-upload>
                    <el-button type="default" class="ml20" @click="onExport" v-if="hosAuthCheck(overdueDetailTableExport)">导出表格</el-button>
                </div>
            </div>
        </div>
        <searchBarOpenAndClose :status="toggle" @toggle="toggle = !toggle"></searchBarOpenAndClose>
        <div class="page-body-cont">
            <div class="page-table overdueTable">
                <div class="util">单位：万元</div>
                <hosJoyTable :amountResetTable="toggle" ref="hosjoyTable" border stripe :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="page.pageNumber" :pageSize.sync="page.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { overdueDetailTable } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { interfaceUrl } from '@/api/config'
import { getOverdueIncrementDetailList, getOverdueIncrementDetailTotal, exportCompanyOverdueDetailExcel } from './api/index'
import { OVERDUE_DETAIL_TABLE_EXPORT, OVERDUE_DETAIL_TABLE_IMPORT } from '@/utils/auth_const'
export default {
    name: 'commitValue',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data () {
        return {
            toggle: true,
            overdueDetailTableExport: OVERDUE_DETAIL_TABLE_EXPORT,
            overdueDetailTableImport: OVERDUE_DETAIL_TABLE_IMPORT,
            tableType: '0',
            uploadData: {
                commitmentYear: ''
            },
            rules: {
                commitmentYear: [
                    { required: true, message: '请选择年', trigger: 'blur' }
                ]
            },
            headersData: {
                'refreshToken': localStorage.getItem('refreshToken'),
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            accept: '.xlsx,.xls',
            loading: false,
            interfaceUrl: interfaceUrl,
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
                regionCode: '',
                subsectionCode: '',
                misCode: '',
                payStartTime: '',
                payEndTime: '',
                overdueStartTime: '',
                overdueEndTime: '',
                actualPayStartTime: '',
                actualPayEndTime: ''
            },
            page: {
                total: 0,
                pageNumber: 1,
                pageSize: 10
            },
            total: {},
            tableData: [],
            dialogFormVisible: false
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
            return overdueDetailTable
        }
    },
    methods: {
        pickerOptionsStart (val) {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams[val]
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd (val) {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams[val]
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'D') {
                this.queryParams.subsectionCode = ''
                this.queryParams.subsectionOldCode = ''
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
            exportCompanyOverdueDetailExcel(this.searchParams)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async onQuery () {
            console.log(' 🚗 🚕 🚙 🚌 🚎 onQuery')
            const promiseArr = [getOverdueIncrementDetailList(this.searchParams), getOverdueIncrementDetailTotal(this.searchParams)]
            var data = await Promise.all(promiseArr).then((res) => {
                for (let key in res[1].data) {
                    overdueDetailTable.forEach(value => {
                        if (value.prop === key && res[1].data[key] != null) {
                            value.children.forEach(value1 => {
                                if (key === 'planProportion') {
                                    let valTemp = this.$multipliedBy(res[1].data[key], 100)
                                    value1.label = String(valTemp) + '%'
                                } else {
                                    value1.label = String(res[1].data[key])
                                }
                            })
                        }
                        if (value.label === '2020年度还款计划') {
                            value.children.forEach(value1 => {
                                value1.children.forEach(value2 => {
                                    if (value2.prop === key && res[1].data[key] != null) {
                                        value2.label = String(res[1].data[key])
                                    }
                                })
                            })
                        }
                    })
                }
                return res[0].data
            }).catch((error) => {
                this.$message.error(`error:${error}`)
            })
            this.tableData = data.records
            this.tableData.map(i => {
                if (i.planProportion != null) {
                    i.planProportion *= 100
                    if (i.planProportion !== 0) i.planProportion = i.planProportion.toFixed(2)
                    i.planProportion += '%'
                }
            })
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
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.$set(this.queryParams, 'regionCode', '')
            this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'payStartTime', '')
            this.$set(this.queryParams, 'payEndTime', '')
            this.$set(this.queryParams, 'overdueStartTime', '')
            this.$set(this.queryParams, 'overdueEndTime', '')
            this.$set(this.queryParams, 'actualPayStartTime', '')
            this.$set(this.queryParams, 'actualPayEndTime', '')
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            this.selectAuth.platformObj = { ...obj }
            await this.newBossAuth(['D', 'F', 'P'])
            this.onSearch()
        },
        isSuccess (response) {
            this.$message({
                message: '批量导入成功！',
                type: 'success'
            })
            this.loading = false
            this.onSearch()
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + JSON.parse(response.message).message,
                type: 'error'
            })
            this.loading = false
        },
        handleUpload (file) {
            if (file.size / (1024 * 1024) > 100) {
                this.$message({
                    message: '附件要保持100M以内',
                    type: 'warning'
                })
                return false
            }
            const fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
            if (this.accept.lastIndexOf(fileSuffix) == -1) {
                this.$message.error('格式不正确！')
                return false
            }
            this.loading = true
        }
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
}
.util {
    font-size: 10px;
    text-align: right;
    line-height: 12px;
    margin-bottom: 8px;
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
        height: 38px;
    }
</style>

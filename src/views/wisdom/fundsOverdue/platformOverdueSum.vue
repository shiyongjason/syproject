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
                    <el-date-picker v-model="queryParams.year" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    <el-button type="primary" class="ml20" @click="onShowImport">导入表格</el-button>
                    <el-button type="primary" class="ml20" @click="onExport">导出表格</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tabs v-model="queryParams.state" type="card" @tab-click="handleClick">
                <el-tab-pane label="存量汇总表" name="1"></el-tab-pane>
                <el-tab-pane label="增量汇总表" name="2"></el-tab-pane>
            </el-tabs>
            <div class="page-table overdueTable">
                <div class="util">单位：万元</div>
                <hosJoyTable ref="hosjoyTable" border stripe :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="page.pageNumber" :pageSize.sync="page.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
        <el-dialog title="承诺值表格导入" :visible.sync="dialogFormVisible" center :close-on-click-modal='false'>
            <el-form :model="uploadData" :rules="rules" ref="form">
                <el-form-item label="导入模板下载：" label-width="200px">
                    <a class="downloadExcel" href="/excelTemplate/承诺值导入模板.xls" download="承诺值导入模板.xls">
                        承诺值导入模板导出
                    </a>
                </el-form-item>
                <el-form-item label="请选择导入年份：" label-width="200px" prop='year'>
                    <el-date-picker v-model="uploadData.year" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/api/fund-plan/commitment/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload :headers='headersData' :data='uploadData'>
                    <el-button type="primary" class='m0' :loading='loading'>
                        导入表格
                    </el-button>
                </el-upload>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { platformSummarySheet, annualRepaymentPlan } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { interfaceUrl } from '@/api/config'
import { getCompanyOverdueList, getCompanyOverdueListTotal } from './api/index'
import moment from 'moment'
export default {
    name: 'commitValue',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            uploadData: {
                year: ''
            },
            rules: {
                year: [
                    { required: true, message: '请选择年', trigger: 'blur' }
                ]
            },
            headersData: {
                'refreshToken': sessionStorage.getItem('refreshToken'),
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
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
                state: '1',
                regionCode: '',
                subRegionCode: '',
                subsectionCode: '',
                subsectionOldCode: '',
                misCode: '',
                year: moment().format('YYYY')
            },
            searchParams: {},
            page: {
                total: 0,
                pageSize: 10,
                pageNumber: 1
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
            return platformSummarySheet()
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
            // exportCommitment(this.queryParams)
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
            this.onQuery()
        },
        async onQuery () {
            console.log(this.searchParams)
            const promiseArr = [getCompanyOverdueList(this.searchParams), getCompanyOverdueListTotal(this.searchParams)]
            var data = await Promise.all(promiseArr).then((res) => {
                console.log(res)
                res[1].data.misCode = '合计'
                res[0].data.records.unshift(res[1].data)
                return res[0].data
            }).catch((error) => {
                this.$message.error(`error:${error}`)
            })
            this.tableData = this.handleData(data.records)
            this.page = {
                total: data.total,
                pageSize: data.size,
                pageNumber: data.current
            }
        },
        handleData (arr = []) {
            return arr.map(i => {
                if (!i.annualRepaymentPlan) {
                    i = {
                        ...i,
                        ...annualRepaymentPlan
                    }
                } else {
                    i = {
                        ...i,
                        ...i.annualRepaymentPlan
                    }
                }
                return i
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
            this.$set(this.queryParams, 'year', moment().format('YYYY'))
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            this.selectAuth.areaObj = { ...obj }
            this.selectAuth.platformObj = { ...obj }
            await this.oldBossAuth()
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
            this.$refs['form'].validate((valid) => { })
            if (!this.uploadData.year) {
                this.$message({
                    message: '请先选择导入年份！',
                    type: 'warning'
                })
                return false
            }
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
        },
        onShowImport () {
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        }
    },
    async mounted () {
        this.onSearch()
        await this.oldBossAuth()
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
</style>

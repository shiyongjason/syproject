<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col" v-if="region">
                    <div class="query-col-title">大区：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="regionList" @back-event="backPlat($event,'D')" placeholder="请输入平台公司名称" :selectObj="selectAuth.regionObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" v-if="branch">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入平台公司名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" v-if="district">
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
                    <el-date-picker v-model="queryParams.commitmentYear" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
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
            <div class="page-table">
                <hosJoyTable ref="hosjoyTable" border stripe :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
        <el-dialog title="承诺值表格导入" :visible.sync="dialogFormVisible" center :close-on-click-modal='false'>
            <el-form :model="uploadData" :rules="rules" ref="form">
                <el-form-item label="请选择导入年份：" label-width="200px" prop='commitmentYear'>
                    <el-date-picker v-model="uploadData.commitmentYear" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="dialogFormVisible = false">导入表格</el-button> -->
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/fund-plan/commitment/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload :headers='headersData' :data='uploadData'>
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
import { tableLabel } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { interfaceUrl } from '@/api/config'
import { getCommitmentList, getCommitmentTotal, exportCommitment } from './api/index'
import moment from 'moment'
export default {
    name: 'commitValue',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            uploadData: {
                commitmentYear: ''
            },
            rules: {
                commitmentYear: [
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
                regionCode: '',
                subRegionCode: '',
                subsectionCode: '',
                misCode: '',
                commitmentYear: moment().format('YYYY'),
                totalAreaName: '',
                pageNumber: 1,
                pageSize: 10
            },
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            total: {},
            tableData: [],
            column: tableLabel,
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
        })
    },
    methods: {
        backPlat (val, dis) {
            console.log(val, dis)
            console.log(this.userInfo)
            if (dis == 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.deptDoc })
                this.findAuthList({ deptType: 'Q', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.deptDoc })
            } else if (dis == 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'Q', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.deptDoc })
                val.value.crmDeptCode && this.findPlatformslist({ subsectionCode: val.value.crmDeptCode })
            } else if (dis == 'Q') {
                this.queryParams.subRegionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                if (val.value.selectCode) {
                    this.findPlatformslist({ subregionCode: val.value.selectCode })
                } else {
                    this.findPlatformslist()
                }
            } else if (dis == 'P') {
                this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
            }
        },
        onExport () {
            this.queryParams.totalAreaName = this.selectAuthLabelShow()
            exportCommitment(this.queryParams)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.selectAuthLabelShow()
            this.onQuery()
        },
        selectAuthLabelShow () {
            if (this.selectAuth.areaObj.selectName) {
                this.column[1].label = this.selectAuth.areaObj.selectName
            } else if (this.selectAuth.branchObj.selectName) {
                this.column[1].label = this.selectAuth.branchObj.selectName
            } else if (this.selectAuth.regionObj.selectName) {
                this.column[1].label = this.selectAuth.regionObj.selectName
            } else {
                this.column[1].label = '全部'
            }
            return this.column[1].label
        },
        async onQuery () {
            const promiseArr = [getCommitmentList(this.queryParams), getCommitmentTotal(this.queryParams)]
            var data = await Promise.all(promiseArr).then((res) => {
                res[1].data.companyName = '合计'
                res[0].data.records.unshift(res[1].data)
                return res[0].data
            }).catch((error) => {
                this.$message.error(`error:${error}`)
            })
            this.tableData = data.records
            console.log(data.records.length)


            if (data.records.length > 1) {
                this.column[2].label = `${data.records[0].commitmentYear}年度销售承诺值`
            } else {
                this.column[2].label = `${this.queryParams.commitmentYear}年度销售承诺值`
            }
        },
        getList (val) {
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            this.onQuery()
        },
        onReset () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.$set(this.queryParams, 'regionCode', '')
            this.$set(this.queryParams, 'subRegionCode', '')
            this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'companyCode', '')
            this.$set(this.queryParams, 'commitmentYear', moment().format('YYYY'))
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            this.selectAuth.regionObj = obj
            this.selectAuth.branchObj = obj
            this.selectAuth.areaObj = obj
            this.selectAuth.platformObj = obj
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
            if (!this.uploadData.commitmentYear) {
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
            console.log(file)
            const fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
            console.log(fileSuffix)
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
        // if (this.userInfo.deptType == 2) {
        //     this.queryParams.subsectionCode = this.branchList[0].crmDeptCode
        // }
    }
}
</script>

<style lang="scss" scoped>
.upload-demo {
    display: inline-block;
}
</style>

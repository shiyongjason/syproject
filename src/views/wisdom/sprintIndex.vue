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
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">年份：</div>
                    <el-date-picker v-model="queryParams.valueYear" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="btnQuery({...queryParams, pageNumber: 1, pageSize: 10})">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    <el-button type="primary" class="ml20" @click="onShowImport" v-if="showImport">导入表格</el-button>
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
        <el-dialog title="冲刺值利润指标导入" :visible.sync="dialogFormVisible" center :close-on-click-modal='false'>
            <el-form :model="uploadData" :rules="rules" ref="form">
                <el-form-item label="导入模板下载：" label-width="200px">
                    <a class="downloadExcel" href="/excelTemplate/冲刺值利润指标导入模板.xlsx" download="冲刺值利润指标.xlsx">
                        冲刺值利润指标导入模板导出
                    </a>
                </el-form-item>
                <el-form-item label="请选择导入年份：" label-width="200px" prop='valueYear'>
                    <el-date-picker v-model="uploadData.valueYear" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/api/overdue/annual/target-profit/value/import\n'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload :headers='headersData' :data='uploadData'>
                    <el-button type="primary" class='m0' :loading='loading'>
                        导入表格
                    </el-button>
                </el-upload>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { sprintTableLabel } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { interfaceUrl } from '@/api/config'
import {
    getSprintIndexList,
    getSprintIndexTotal,
    exportSprintIndex
} from './api/index'
import { SPRINT_INDEX_IMPORT } from '../../utils/auth_const'
export default {
    name: 'sprintIndex',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            uploadData: {
                valueYear: ''
            },
            rules: {
                valueYear: [
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
                }
            },
            queryParams: {
                regionCode: '',
                subsectionCode: '',
                valueYear: '',
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
            column: [],
            dialogFormVisible: false,
            dynamicNameRegion: '大区',
            dynamicNameBranch: '分部'
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
            targetTime: 'fundsPlan/targetTime'
        }),
        showImport () {
            return this.hosAuthCheck(SPRINT_INDEX_IMPORT)
        }
    },
    methods: {
        cancel () {
            this.uploadData.valueYear = ''
            this.dialogFormVisible = false
        },
        btnQuery (params) {
            this.queryParamsTemp = { ...params }
            this.onQuery(params)
        },
        async onQuery (params) {
            const promiseArr = [getSprintIndexList(params), getSprintIndexTotal(params)]
            const data = await Promise.all(promiseArr).then((res) => {
                const columnData = sprintTableLabel(this.queryParams.valueYear)
                columnData[1].label = this.dynamicNameRegion
                columnData[0].label = this.dynamicNameBranch
                columnData.forEach((value, index) => {
                    if (index > 1) {
                        value.children.forEach((val) => {
                            val.children.forEach((val1) => {
                                if (res[1].data[val.prop]) {
                                    val1.label = String(res[1].data[val.prop])
                                }
                            })
                        })
                    }
                })
                this.column = columnData
                return res[0].data
            }).catch((error) => {
                this.$message.error(`error:${error}`)
            })
            this.tableData = data.records
            this.page.total = data.total
        },
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
                this.dynamicNameRegion = val.value.deptName || '大区'
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.dynamicNameBranch = val.value.deptName || '分部'
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
            }
        },
        onExport () {
            exportSprintIndex(this.queryParams)
        },
        getList (val) {
            this.onQuery({ ...this.queryParamsTemp, ...val })
        },
        async onReset () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.$set(this.queryParams, 'regionCode', '')
            this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'valueYear', this.targetTime.slice(0, 4))
            this.$set(this.queryParams, 'pageNumber', 1)
            this.$set(this.queryParams, 'pageSize', 10)
            this.dynamicNameRegion = '大区'
            this.dynamicNameBranch = '分部'
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            this.newBossAuth(['D', 'F'])
            this.onQuery(this.queryParams)
        },
        isSuccess () {
            this.$message({
                message: '批量导入成功！',
                type: 'success'
            })
            this.loading = false
            this.onQuery(this.queryParams)
            this.dialogFormVisible = false
            this.uploadData.valueYear = ''
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
            if (!this.uploadData.valueYear) {
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
        },
        ...mapActions({
            findTargetTime: 'fundsPlan/findTargetTime'
        })
    },
    async mounted () {
        await this.findTargetTime()
        this.queryParams.valueYear = this.targetTime.slice(0, 4)
        this.column = sprintTableLabel(this.queryParams.valueYear)
        this.btnQuery(this.queryParams)
        this.newBossAuth(['D', 'F'])
    }
}
</script>

<style lang="scss" scoped>
.upload-demo {
    display: inline-block;
}
</style>

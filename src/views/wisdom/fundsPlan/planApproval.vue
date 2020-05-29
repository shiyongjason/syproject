<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
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
                <div class="query-col-title"> 查询期间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="params.valueYear" type="year"  value-format='yyyy' placeholder="请选择时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="btnQuery({...params, pageSize:10, pageNumber: 1})">
                        搜索
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onReset">
                        重置
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onShowImport">导入表格</el-button>
                    <el-button type="primary" class="ml20" @click="onExport">导出表格</el-button>
                </div>
            </div>
        </div>
        <div class="tips">
            <p><b>{{params.valueYear}}</b>年<span class="right">单位：万元</span></p>
        </div>
        <div class="page-body-cont">
            <hosJoyTable ref="hosjoyTable" border stripe :column="columnData" :data="planApprovalList" align="center"
                         :total="planApprovalPagination.total" :showPagination="true" @pagination="getList">
            </hosJoyTable>
        </div>
        <el-dialog title="资金计划审批额度导入" :visible.sync="dialogFormVisible" center :close-on-click-modal='false'>
            <el-form :model="uploadData" :rules="rules" ref="form">
                <el-form-item label="导入模板下载：" label-width="200px">
                    <a class="downloadExcel" href="/excelTemplate/资金计划审批额度.xlsx" download="资金计划审批额度.xls">
                        资金计划审批额度导入模板导出
                    </a>
                </el-form-item>
                <el-form-item label="请选择导入年份：" label-width="200px" prop='commitmentYear'>
                    <el-date-picker v-model="uploadData.valueYear" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/api/overdue/annual/funplan/approve/value/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload :headers='headersData' :data='uploadData'>
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
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { departmentAuth } from '@/mixins/userAuth'
import { mapActions, mapGetters, mapState } from 'vuex'
import { planApproval } from './const'
import { interfaceUrl } from '@/api/config'
import { exportPlanApproval } from '../api'
export default {
    name: 'planApproval',
    mixins: [departmentAuth],
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        }),
        ...mapGetters({
            planApprovalList: 'fundsPlan/planApprovalList',
            planApprovalTotal: 'fundsPlan/planApprovalTotal',
            planApprovalPagination: 'fundsPlan/planApprovalPagination',
            targetTime: 'fundsPlan/targetTime'
        })
    },
    components: {
        hosJoyTable,
        HAutocomplete
    },
    data () {
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
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
            params: {
                valueYear: '',
                regionCode: '',
                subsectionCode: '',
                misCode: '',
                pageSize: 10,
                pageNumber: 1
            },
            dialogFormVisible: false,
            uploadData: {
                valueYear: ''
            },
            rules: {
                valueYear: [
                    { required: true, message: '请选择年', trigger: 'blur' }
                ]
            },
            interfaceUrl: interfaceUrl,
            headersData: {
                'refreshToken': sessionStorage.getItem('refreshToken'),
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            loading: false,
            accept: '.xlsx,.xls',
            columnData: []
        }
    },
    async mounted () {
        await this.findTargetTime()
        this.params.valueYear = this.targetTime.slice(0, 4)
        await this.onQuery(this.params)
        this.newBossAuth(['D', 'F', 'P'])
    },
    methods: {
        btnQuery (params) {
            this.queryParamsTemp = { ...params }
            this.onQuery(params)
        },
        getList (val) {
            console.log({ ...this.queryParamsTemp, ...val })
            this.onQuery({ ...this.queryParamsTemp, ...val })
        },
        async onQuery (params) {
            this.findPlanApprovalList(params)
            await this.findPlanApprovalTotal(params)
            const columnData = planApproval(params.valueYear)
            columnData.forEach((value, index) => {
                if (index > 3) {
                    value.children.forEach((val) => {
                        if (this.planApprovalTotal[val.prop]) {
                            val.label = String(this.planApprovalTotal[val.prop])
                        }
                    })
                }
            })
            this.columnData = columnData
        },
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'D') {
                this.params.subsectionCode = ''
                this.params.misCode = ''
                this.selectAuth.branchObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'F') {
                this.params.misCode = ''
                this.selectAuth.platformObj = { ...obj }
            }
        },
        async backPlat (val, dis) {
            if (dis === 'D') {
                this.params.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                // 清空分部区域
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.params.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                // 查平台公司 - 分部查询时入参老code 1abc7f57-2830-11e8-ace9-000c290bec91
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'P') {
                this.params.misCode = val.value.misCode ? val.value.misCode : ''
            }
        },
        onExport () {
            exportPlanApproval(this.params)
        },
        onShowImport () {
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        onReset () {
            this.params = {
                valueYear: '',
                regionCode: '',
                subsectionCode: '',
                misCode: '',
                pageSize: 10,
                pageNumber: 1
            }
            this.selectAuth = {
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
            }
            this.params.valueYear = this.targetTime.slice(0, 4)
            this.onQuery({ ...this.params, pageSize: 10, pageNumber: 1 })
        },
        cancel () {
            this.uploadData.valueYear = ''
            this.dialogFormVisible = false
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
        isSuccess () {
            this.$message({
                message: '批量导入成功！',
                type: 'success'
            })
            this.loading = false
            this.onQuery(this.params)
            this.uploadData.valueYear = ''
            this.dialogFormVisible = false
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + JSON.parse(response.message).message,
                type: 'error'
            })
            this.loading = false
        },
        ...mapActions({
            findPlanApprovalList: 'fundsPlan/findPlanApprovalList',
            findPlanApprovalTotal: 'fundsPlan/findPlanApprovalTotal',
            findAuthList: 'findAuthList',
            findTargetTime: 'fundsPlan/findTargetTime'
        })
    }
}
</script>

<style scoped lang="scss">
    .tips {

        background: #ffffff;
        p {
            max-width: 1000px;
            margin: auto;
            line-height: 100px;
            text-align: center;

            b {
                color: red;
                padding: 0 5px;
            }
            .right{
                float: right;
            }
        }
    }
    .upload-demo {
        display: inline-block;
    }
</style>

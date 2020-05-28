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
                    <el-button type="primary" class="ml20" @click="findPlanApprovalList({...params, pageSize:10, pageNumber: 1})">
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
            <p><b>{{paramTargetDate.year}}</b>年<b>{{paramTargetDate.mouth}}</b>月<span class="right">单位：万元</span></p>
        </div>
        <div class="page-body-cont">
            <hosJoyTable ref="hosjoyTable" border stripe :column="columnData" :data="planTotalList" align="center"
                         :total="page.total">
                <template slot="organizationName" slot-scope="scope">
                    <a :class="scope.data.row.cellType === 1 && scope.data.row.planId ? 'light' : ''" @click="goDetail(scope.data.row.planId, scope.data.row.cellType === 1)" type="primary">{{scope.data.row.organizationName}}</a>
                </template>
            </hosJoyTable>
        </div>
        <el-dialog title="冲刺值利润指标导入" :visible.sync="dialogFormVisible" center :close-on-click-modal='false'>
            <el-form :model="uploadData" :rules="rules" ref="form">
                <el-form-item label="导入模板下载：" label-width="200px">
                    <a class="downloadExcel" href="/excelTemplate/承诺值导入模板.xls" download="承诺值导入模板.xls">
                        冲刺值利润指标导入模板导出
                    </a>
                </el-form-item>
                <el-form-item label="请选择导入年份：" label-width="200px" prop='commitmentYear'>
                    <el-date-picker v-model="uploadData.commitmentYear" type="year" value-format='yyyy' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + '/api/overdue/annual/target/profit/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload :headers='headersData' :data='uploadData'>
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
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { departmentAuth } from '@/mixins/userAuth'
import { mapActions, mapGetters, mapState } from 'vuex'
import { platformPlan } from './const'
import { interfaceUrl } from '@/api/config'
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
            planTotalList: 'fundsPlan/planTotalList',
            targetTime: 'fundsPlan/targetTime'
        }),
        columnData () {
            return platformPlan(this.paramTargetDate.year, this.paramTargetDate.mouth)
        }
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
                areaObj: {
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
            paramTargetDate: {
                year: '',
                mouth: ''
            },
            page: {
                total: 0
            },
            dialogFormVisible: false,
            uploadData: {
                commitmentYear: ''
            },
            rules: {
                commitmentYear: [
                    { required: true, message: '请选择年', trigger: 'blur' }
                ]
            },
            interfaceUrl: interfaceUrl,
            headersData: {
                'refreshToken': sessionStorage.getItem('refreshToken'),
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            loading: false,
            accept: '.xlsx,.xls'
        }
    },
    async mounted () {
        await this.findTargetTime()
        // console.log(this.targetTime)
        this.params.valueYear = this.targetTime
        this.findPlanApprovalList(this.params)
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

        },
        onShowImport () {
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        onReset () {

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
            this.onSearch()
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
</style>

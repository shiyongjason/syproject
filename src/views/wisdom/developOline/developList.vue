<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col" v-if="branch">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>

<!--                    <el-select v-model="queryParams.subsectionCode" placeholder="选择分部" @change='getSubsectionCode'>-->
<!--                        <el-option v-for="item in branchList" :key="item.pkDeptDoc" :label="item.deptName" :value="item.pkDeptDoc">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">平台公司：</div>
                <div class="query-col-input">
                    <HAutocomplete @back-event="backPlat($event,'P')" :selectArr="platformData" :placeholder="'选择平台公司'" :selectObj="selectAuth.platformObj"></HAutocomplete>

<!--                    <HAutocomplete v-if="platComList" :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj"></HAutocomplete>-->
                </div>
            </div>
            <div class="query-cont-col-double">
                <div class="query-col-title">城市：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.provinceCode" @change="onCityChange" placeholder="省" :clearable=true>
                        <el-option v-for="item in provinceDataList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                    <span class="ml10 mr10">-</span>
                    <el-select v-model="queryParams.cityCode" placeholder="市" :clearable=true>
                        <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">上线时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.onlineTime" :editable="false" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">签约规模(万)：</div>
                <div class="flex-wrap-cont">
                    <el-input type="text" v-model="queryParams.signScale" maxlength="8" placeholder="输入签约规模" v-isNum='queryParams.signScale'></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">公司上线状态：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.changeFactors" clearable placeholder="全部">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="初始" value='0'></el-option>
                        <el-option label="增资" value='1'></el-option>
                        <el-option label="降资" value='2'></el-option>
                        <el-option label="淘汰" value='3'></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="getList('onSearch')">搜索</el-button>
            </div>
        </div>
        <div class="page-body-cont ">
            <div class="query-cont-col">
                <el-button type="primary" @click="editPlatform()">添加平台公司</el-button>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'develop/developbasicinfo/import'" :data="{createUser: userInfo.employeeName}" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload>
                    <el-button type="primary" :loading='uploadLoading'>批量导入</el-button>
                </el-upload>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onExportFile()">导出</el-button>
            </div>
            <div class="query-cont-col">
                <a class="ml20 blue isLink" @click="onDownloadXlsx">
                    下载模板
                </a>
            </div>
        </div>
        <div class="page-body-cont ">
            <div class="page-table">
                <hosJoyTable ref="hosjoyTable" isShowIndex border stripe showPagination :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
            <div class="companyshortname">
                <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="1000px" v-if="dialog.visible">
                    <div class="d-dialog">
                        <el-button type="primary" @click="scaleExportFile" size='small' v-if="dialog.type==1">导出</el-button>
                        <el-button type="primary" @click="capitalExportFile" size='small' v-if="dialog.type==2">导出</el-button>
                        <el-button type="primary" @click="importoldExcel" size='small' v-if="dialog.type==3">导出</el-button>
                        <hosJoyTable size='small' ref="hosjoyTable" border stripe showPagination :column="dialog.column" :data="dialog.tableData" align="center" :total="dialog.total" :pageNumber.sync="dialog.pageNumber" :pageSize.sync="dialog.pageSize" @pagination="getDialogList"
                            style="margin-top:20px">
                        </hosJoyTable>
                        <el-form ref="dialogForm" :model="scale_formData" :rules="scale_formData_Rules" v-if="dialog.type==1">
                            <div class="query-cont-col" style="margin:20px 0">
                                <el-form-item prop="changeFactors">
                                    <div class="query-col-title" style="color: #606266;">状态变更：</div>
                                    <div class="query-col-input">
                                        <el-radio v-model="scale_formData.changeFactors" label="1">增资</el-radio>
                                        <el-radio v-model="scale_formData.changeFactors" label="2">降资</el-radio>
                                        <el-radio v-model="scale_formData.changeFactors" label="3">淘汰</el-radio>
                                    </div>
                                </el-form-item>
                            </div>
                            <div>
                                <div class="query-cont-col">
                                    <div class="flex-wrap-title" style="color: #606266;">最新签约规模/万：</div>
                                    <div class="flex-wrap-cont">
                                        <el-form-item prop="newSignScale">
                                            <el-input type="text" v-model="scale_formData.newSignScale" maxlength="10" placeholder="最新签约规模" v-isNum='queryParams.signScale' size='small'></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="query-cont-col">
                                    <div class="flex-wrap-title">变更时间：</div>
                                    <div class="flex-wrap-cont">
                                        <el-form-item prop="signChangeTime">
                                            <el-date-picker v-model="scale_formData.signChangeTime" :editable="false" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="变更时间" size='small'>
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </el-form>

                        <el-form ref="dialogForm" :model="capital_formData" :rules="capital_formData_Rules" v-if="dialog.type==2">
                            <div style="margin-top:20px">
                                <div class="query-cont-col">
                                    <div class="flex-wrap-title" style="color: #606266;">总注册资金/万：</div>
                                    <div class="flex-wrap-cont">
                                        <el-form-item prop="changeRegisterFund">
                                            <el-input type="text" v-model="capital_formData.changeRegisterFund" maxlength="10" placeholder="总注册资金" v-isNum='queryParams.signScale' size='small'></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="query-cont-col">
                                    <div class="flex-wrap-title">变更时间：</div>
                                    <div class="flex-wrap-cont">
                                        <el-form-item prop="fundChangeTime">
                                            <el-date-picker v-model="capital_formData.fundChangeTime" :editable="false" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="变更时间" size='small'>
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialog.visible = false">取 消</el-button>
                        <el-button type="primary" @click="submitDialog" v-if="dialog.type!=3">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="ws">
                <el-dialog title="网商信息" :visible.sync="wsDialogVisible" width="600px" v-if="wsDialogVisible">
                    <div class="tailers_wrap">
                        <div class="oss_tailers_title">企业信息</div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">新公司名称：</div>
                            <div class="oss_form_tr_cont">
                                {{wsDialogData.companyName||'未填写'}}
                            </div>
                        </div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">新营业执照号：</div>
                            <div class="oss_form_tr_cont">
                                {{wsDialogData.newBusinessLicenseNo?wsDialogData.newBusinessLicenseNo:'未填写'}}
                            </div>
                        </div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">新营业执照：</div>
                            <div class="oss_form_tr_cont">
                                <div class="cardInfo" v-if="wsDialogData.newBusinessLicenseUrl">
                                    <el-image :src="wsDialogData.newBusinessLicenseUrl" :preview-src-list="[wsDialogData.newBusinessLicenseUrl]" />
                                </div>
                                <p v-if="!wsDialogData.newBusinessLicenseUrl">未上传</p>
                            </div>
                        </div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">新开户许可证：</div>
                            <div class="oss_form_tr_cont">
                                <div class="cardInfo" v-if="wsDialogData.newAccountOpeningPermit">
                                    <el-image :src="wsDialogData.newAccountOpeningPermit" :preview-src-list="[wsDialogData.newAccountOpeningPermit]" />
                                </div>
                                <p v-if="!wsDialogData.newAccountOpeningPermit">未上传</p>
                            </div>
                        </div>
                        <div class="oss_tailers_title">法人信息</div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">新公司法人：</div>
                            <div class="oss_form_tr_cont">
                                {{wsDialogData.newLegalPerson||'未填写'}}
                            </div>
                        </div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">新法人身份证：</div>
                            <div class="oss_form_tr_cont">
                                {{wsDialogData.newCorporationIdcard?wsDialogData.newCorporationIdcard:"未填写"}}
                            </div>
                        </div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">新身份证照片：</div>
                            <div class="oss_form_tr_cont">
                                <div class="cardInfo" v-show="wsDialogData.newCorporateIdcardFrontUrl">
                                    <el-image :src="wsDialogData.newCorporateIdcardFrontUrl" :preview-src-list="[wsDialogData.newCorporateIdcardFrontUrl]" />
                                </div>
                                <span v-show="!wsDialogData.newCorporateIdcardFrontUrl">正面未上传</span>
                                <div class="cardInfo" v-show="wsDialogData.newCorporateIdcardBackUrl">
                                    <el-image :src="wsDialogData.newCorporateIdcardBackUrl" :preview-src-list="[wsDialogData.newCorporateIdcardBackUrl]" />
                                </div>
                                <span v-show="!wsDialogData.newCorporateIdcardBackUrl">反面未上传</span>
                            </div>
                        </div>
                        <div class="oss_tailers_title">银行信息</div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">银行卡号：</div>
                            <div class="oss_form_tr_cont">
                                {{wsDialogData.accountBank?wsDialogData.accountBank:'未填写'}}
                            </div>
                        </div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">开户行：</div>
                            <div class="oss_form_tr_cont">
                                {{wsDialogData.openBank?wsDialogData.openBank:'未填写'}}
                            </div>
                        </div>
                        <div class="oss_form_tr ">
                            <div class="oss_form_tr_title">联行号：</div>
                            <div class="oss_form_tr_cont">
                                {{wsDialogData.coupletNumber?wsDialogData.coupletNumber:'未填写'}}
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="wsDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="wsDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import filters from '@/utils/filters.js'
import { interfaceUrl } from '@/api/config'
import { mapState, mapActions } from 'vuex'
import {
    developBasicInfoList, findProvinceAndCity, developSignscaleChange, developregisteredfundchange,
    updateDevelopsginInfo, triggerApply
} from '../api/index.js'
import { departmentAuth } from '@/mixins/userAuth'
import { clearCache, newCache } from '@/utils/index'
export default {
    name: 'developlist',
    mixins: [departmentAuth],
    components: { hosJoyTable, HAutocomplete },
    data () {
        return {
            interfaceUrl: interfaceUrl,
            wsDialogData: '',
            wsDialogVisible: false,
            scale_formData_Rules: {
                changeFactors: [
                    { required: true, message: '请选择状态变更', trigger: 'change' }
                ],
                newSignScale: [
                    { required: true, message: '请输入最新签约规模', trigger: 'blur' }
                ],
                signChangeTime: [
                    { required: true, message: '请选择变更时间', trigger: 'change' }
                ]
            },
            capital_formData_Rules: {
                changeRegisterFund: [
                    { required: true, message: '请输入总注册资金', trigger: 'blur' }
                ],
                fundChangeTime: [
                    { required: true, message: '请选择变更时间', trigger: 'change' }
                ]
            },
            capital_formData: {
                companyCode: '',
                changeRegisterFund: '',
                ourRegisteredFund: '',
                fundChangeTime: '',
                deleted: 0,
                updateUser: JSON.parse(sessionStorage.getItem('userInfo')).employeeName
            },
            scale_formData: {
                companyCode: '',
                changeFactors: '',
                newSignScale: '',
                signScale: '',
                signChangeTime: '',
                deleted: 0,
                updateUser: JSON.parse(sessionStorage.getItem('userInfo')).employeeName
            },
            dialog: {
                title: '',
                visible: false,
                column: [],
                tableData: [],
                total: 0,
                pageNumber: 1,
                pageSize: 10,
                type: 1,
                companyCode: '',
                sortInfos: [{ field: 'updateTime', sort: 'desc' }]
            },
            selectAuth: {
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
            cityList: [],
            // branchList: [],
            platComList: [],
            provinceDataList: [],
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            queryParams: {
                subsectionCode: '',
                changeFactors: '',
                provinceCode: '',
                companyCodeList: [],
                companyCode: '',
                cityCode: '',
                onlineTime: '',
                signScale: '',
                pageNumber: 1, // 当前页码
                pageSize: 10, // 每页总数
                sortInfos: [{
                    field: 'updateTime',
                    sort: 'desc'
                }]
            },
            tableData: [],
            column: [
                { prop: 'misCode', label: 'mis编码', width: '80' },
                { prop: 'originaCompanyName', label: '原公司名称', minWidth: '200' },
                {
                    prop: 'companyShortName',
                    label: '公司简称',
                    minWidth: '200',
                    render: (h, scope) => {
                        return <span class='color-safe' onClick={() => { this.editPlatform(scope.row) }}>{scope.row.companyShortName ? scope.row.companyShortName : '-'}</span>
                    }
                },
                { prop: 'subsectionName', label: '分部', minWidth: '100' },
                { prop: 'provinceName', label: '省份' },
                { prop: 'cityName', label: '城市' },
                { prop: 'developSignInfoVo_changeFactors', label: '上线状态' },
                {
                    label: '最新签约规模/万',
                    width: '150',
                    render: (h, scope) => {
                        return <span class='color-safe' onClick={() => { this.handleDialog(scope.row, '签约规模变更记录') }}>{filters.fundMoney(scope.row.developSignInfoVo_signScale)}</span>
                    }
                },
                { prop: 'regCapital', label: '注册资本/万', width: '100', displayAs: 'money' },
                { prop: 'developSignInfoVo_signScaleName', label: '注册资金/万', width: '100', displayAs: 'money' },
                {
                    label: '我方注册资金/万',
                    width: '130',
                    render: (h, scope) => {
                        return <span class='color-safe' onClick={() => { this.handleDialog(scope.row, '我方注册资金变更记录') }}>{filters.fundMoney(scope.row.developSignInfoVo_ourRegisteredFund)}</span>
                    }
                },
                { prop: 'developSignInfoVo_onlineTime', label: '上线时间', minWidth: '100', displayAs: 'YYYY-MM-DD' },
                { prop: 'developSignInfoVo_oldCompanyScale', label: '老公司规模/万', width: '130', displayAs: 'money' },
                {
                    label: '销售规模增长',
                    width: '130',
                    render: (h, scope) => {
                        return <span>{scope.row.developSignInfoVo_salesVolume ? scope.row.developSignInfoVo_salesVolume * 100 + '%' : '-'}</span>
                    }
                },
                {
                    label: '利润增长',
                    render: (h, scope) => {
                        return <span>{scope.row.developSignInfoVo_profitGrowth ? scope.row.developSignInfoVo_profitGrowth * 100 + '%' : '-'}</span>
                    }
                },
                { prop: 'companyType', label: '公司类型', minWidth: '210' },
                { prop: 'mainSystem', label: '主营系统' },
                { prop: 'mainFormatName', label: '主要业态' },
                { prop: 'mainBrand', label: '主设备品牌', minWidth: '100' },
                { prop: 'developOtherInfoVo.staffNum', label: '员工数' },
                { prop: 'developOtherInfoVo.salesmanNum', label: '销售员工数', minWidth: '100' },
                { prop: 'developOtherInfoVo.constructionTeamNum', label: '施工队数' },
                { prop: 'developOtherInfoVo.supervisorNum', label: '监理数' },
                { prop: 'developOtherInfoVo.storeNum', label: '门店数' },
                { prop: 'developOtherInfoVo.storeType', label: '门店类型' },
                { prop: 'developOtherInfoVo.isInternetTools', label: '互联网工具需求', minWidth: '130' },
                { prop: 'developOtherInfoVo.isStoreRenovation', label: '门店改造需求', minWidth: '130' },
                { prop: 'address', label: '地址', minWidth: '300' },
                { prop: 'developSignInfoVo_dueDiligenceReportTime', label: '尽调报告时间', minWidth: '100', displayAs: 'YYYY-MM-DD' },
                { prop: 'developSignInfoVo_dueDiligenceInspectionTime', label: '尽调评审时间', minWidth: '100', displayAs: 'YYYY-MM-DD' },
                { prop: 'developSignInfoVo_dueDiligenceOpiniot', label: '尽调意见', minWidth: '300' },
                { prop: 'originalLegalPerson', label: '原公司法人', minWidth: '100' },
                { prop: 'originalLegalPersonPhone', label: '原公司法人电话', minWidth: '130' },
                { prop: 'developSignInfoVo_signerName', label: '签约人', minWidth: '100' },
                { prop: 'developSignInfoVo_signerPhone', label: '签约人电话', minWidth: '130' },
                { prop: 'developSignInfoVo_signerId', label: '签约人身份证号', minWidth: '160' },
                {
                    label: '签约人生日',
                    width: '100',
                    render: (h, scope) => {
                        return <span>{scope.row.developSignInfoVo_signerId ? this.cutBirthday(scope.row.developSignInfoVo_signerId) : '-'}</span>
                    }
                },
                { prop: 'controllerName', label: '实际控制人', width: '100' },
                { prop: 'controllerPhone', label: '实际控制人电话', minWidth: '130' },
                { prop: 'controllerId', label: '实际控制人身份证', minWidth: '160' },
                {
                    label: '实际控制人生日',
                    minWidth: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.controllerId ? this.cutBirthday(scope.row.controllerId) : '-'}</span>
                    }
                },
                { prop: 'developSignInfoVo_ourSigner', label: '我方签约人', minWidth: '120' },
                { prop: 'developSignInfoVo_signTime', label: '签约日期', minWidth: '120', displayAs: 'YYYY-MM-DD' },
                { prop: 'developSignInfoVo_signQuoteTime', label: '签报时间', minWidth: '120', displayAs: 'YYYY-MM-DD' },
                { prop: 'companyName', label: '新公司名称', minWidth: '200' },
                { prop: 'developSignInfoVo_licenseLssuedTime', label: '营业执照下发时间', minWidth: '150', displayAs: 'YYYY-MM-DD' },
                { prop: 'developSignInfoVo_naturalPersonShareholders', label: '股东1', minWidth: '100' },
                { prop: 'developSignInfoVo_corporateShareholders', label: '股东2', minWidth: '100' },
                { prop: 'legalPersonName', label: '新公司法人', minWidth: '100' },
                { prop: 'developSignInfoVo_director', label: '执行董事', minWidth: '100' },
                { prop: 'developSignInfoVo_generalManager', label: '新公司总经理', minWidth: '100' },
                { prop: 'developSignInfoVo_supervisor', label: '监事', minWidth: '100' },
                { prop: 'updateUser', label: '最近操作人', minWidth: '100' },
                {
                    label: '网商申请信息',
                    minWidth: '100',
                    render: (h, scope) => {
                        return <span class='color-safe' onClick={() => { this.wsDialogVisible = true; this.wsDialogData = scope.row; console.log('this.wsDialogData: ', this.wsDialogData) }}>查看</span>
                    }
                },
                { prop: 'updateTime', label: '最近操作时间', minWidth: '100', displayAs: 'YYYY-MM-DD' },
                {
                    label: '变更',
                    width: '150',
                    render: (h, scope) => {
                        if (scope.row.developChangeInfoVoList.length > 0) {
                            return <span class='color-safe' onClick={() => { this.handleDialog(scope.row, '变更') }}>变更</span>
                        } else {
                            return <el-link disabled>变更</el-link>
                        }
                    }
                }
            ],
            accept: '.xlsx,.xls',
            uploadLoading: false,
            importCompany: '' // 变更的公司
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        })
    },
    methods: {
        ...mapActions({
            findAuthList: 'findAuthList'
        }),
        isSuccess (response) {
            this.$message({
                message: '批量导入成功！',
                type: 'success'
            })
            this.uploadLoading = false
            this.getList()
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + JSON.parse(response.message).message,
                type: 'error'
            })
            this.uploadLoading = false
        },
        handleUpload (file) {
            // TODO: 目前只有一个文件,待优化
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
            this.uploadLoading = true
        },
        submitDialog () {
            console.log('scale_formData', this.scale_formData)
            this.$refs['dialogForm'].validate(async (valid) => {
                if (valid) {
                    await updateDevelopsginInfo(this.dialog.type == 1 ? this.scale_formData : this.capital_formData)
                    this.$message({
                        message: '更新成功！',
                        type: 'success'
                    })
                    this.dialog.visible = false
                    this.getList()
                }
            })
        },
        scaleExportFile () {
            window.location.href = interfaceUrl + 'develop/developsignscalechange/exportSignScaleChangeList?companyCode=' + this.scale_formData.companyCode
        },
        capitalExportFile () {
            window.location.href = interfaceUrl + 'develop/developregisteredfundchange/exportRegisteredFundList?companyCode=' + this.capital_formData.companyCode
        },
        importoldExcel () {
            window.location.href = interfaceUrl + `develop/developbasicinfo/exportChangeInfo/${this.importCompany}`
        },
        async handleDialog (row, title) {
            this.dialog.companyCode = row.companyCode
            let tdata = ''
            if (title === '签约规模变更记录') {
                this.dialog.type = 1
                const data = await this.getDialogList()
                tdata = data
                this.dialog.column = [
                    { prop: 'changeFactors', label: '变更因素', dicData: [{ label: '初始', value: '0' }, { label: '增资', value: '1' }, { label: '降资', value: '2' }, { label: '淘汰', value: '3' }] },
                    { prop: 'changeSignScale', label: '变更规模(万)', displayAs: 'money' },
                    { prop: 'newSignScale', label: '最新签约规模(万)', displayAs: 'money' },
                    { prop: 'signChangeTime', label: '变更时间', displayAs: 'YYYY-MM-DD' }
                ]
                this.scale_formData.companyCode = row.companyCode
                this.scale_formData.signScale = row.developSignInfoVo.signScale
            }
            if (title === '我方注册资金变更记录') {
                this.dialog.type = 2
                const data = await this.getDialogList()
                tdata = data
                this.dialog.column = [
                    { prop: 'changeRegisterFund', label: '变更注册资金(万)', displayAs: 'money' },
                    { prop: 'sumRegisterFund', label: '总注册资金(万)', displayAs: 'money' }
                ]
                this.capital_formData.companyCode = row.companyCode
                this.capital_formData.ourRegisteredFund = row.developSignInfoVo.ourRegisteredFund
            }
            if (title === '变更') {
                this.dialog.type = 3
                tdata = row.developChangeInfoVoList
                this.dialog.column = [
                    { prop: 'signChangeTime', label: '变更时间', displayAs: 'YYYY-MM-DD' },
                    { prop: 'changeItem', label: '变更项目' },
                    { prop: 'contentBefore', label: '变更前', showOverflowTooltip: true },
                    { prop: 'contentAfter', label: '变更后', showOverflowTooltip: true }
                ]
                this.importCompany = row.companyName
            }
            this.dialog.title = (title === '变更') ? title : row.companyShortName + title
            this.dialog.visible = true
            this.dialog.tableData = (title === '变更') ? tdata : tdata.data.pageContent
            this.dialog.total = (title === '变更') ? tdata.length : tdata.data.totalElements
        },
        async getDialogList () {
            if (this.dialog.type == 1) {
                const { data } = await developSignscaleChange(this.dialog)
                return data
            }
            if (this.dialog.type == 2) {
                const { data } = await developregisteredfundchange(this.dialog)
                return data
            }
        },
        editPlatform (row) {
            if (row) {
                this.$router.push({ path: '/developonline/addplatform', query: { type: 'edit', companyCode: row.companyCode } })
            } else {
                this.$router.push({ path: '/developonline/addplatform', query: { type: 'add' } })
            }
        },
        async findProvinceAndCity (code, subsectionCode) {
            let params = {
                pCode: code,
                subsectionCode: subsectionCode || ''
            }
            const { data } = await findProvinceAndCity(params)
            let result = data.data
            result.splice(0, 0, {
                cityId: '',
                cityName: '全部'
            })
            return result
        },
        async onCityChange () {
            if (this.queryParams.provinceCode === '') {
                this.cityList = []
                this.queryParams.cityCode = ''
                return
            }
            this.$set(this.queryParams, 'cityCode', '')
            this.cityList = await this.findProvinceAndCity(this.queryParams.provinceCode)
        },
        async findBranchListNew (val = '') {
            // 平台分部
            await this.findAuthList({ deptType: 'F', pkDeptDoc: val || this.userInfo.pkDeptDoc })
        },
        async getSubsectionCode (val) {
            this.platComList = []
            const { data } = await findPaltList({ subsectionCode: val }) // 根据大区获取平台公司
            for (let i of data.data.pageContent) {
                i.value = i.companyShortName
                i.selectCode = i.companyCode
            }
            this.platComList = data.data.pageContent
            this.platComList.unshift({ selectCode: '', value: '全部', id: 0 })
        },
        async getList (type = '') {
            if (type === 'onSearch') this.queryParams.pageNumber = 1
            const { data } = await developBasicInfoList(this.queryParams)
            data.data.pageContent.map(item => {
                if (item.developSignInfoVo) {
                    Object.keys(item.developSignInfoVo).map(jtem => {
                        item[`developSignInfoVo_${jtem}`] = item.developSignInfoVo[jtem]
                    })
                }
            })
            this.tableData = data.data.pageContent
            this.page.total = data.data.totalElements
        },
        backPlat (val, dis) {
            if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                // 查平台公司 - 分部查询时入参老code 1abc7f57-2830-11e8-ace9-000c290bec91
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage()
            } else if (dis === 'P') {
                this.queryParams.companyCode = val.value.companyCode ? val.value.companyCode : ''
            }
        },
        linkage () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.queryParams.companyCode = ''
            this.selectAuth.platformObj = obj
        },
        // 省份证截取生日
        cutBirthday (str) {
            if (str) return str.substring(6, 10) + '-' + str.substring(10, 12) + '-' + str.substring(12, 14)
            return '-'
        },
        onExportFile () {
            window.location.href = interfaceUrl + 'develop/developbasicinfo/exportCompanyList?subsectionCode=' + this.queryParams.subsectionCode +
                '&changeFactors=' + this.queryParams.changeFactors +
                '&companyCodeList=' + this.queryParams.companyCodeList +
                '&provinceCode=' + this.queryParams.provinceCode +
                '&companyCode=' + this.queryParams.companyCode +
                '&cityCode=' + this.queryParams.cityCode +
                '&onlineTime=' + this.queryParams.onlineTime +
                '&signScale=' + this.queryParams.signScale +
                '&pageNumber=' + this.queryParams.pageNumber +
                '&pageSize=' + this.queryParams.pageSize
        },
        onDownloadXlsx () {
            location.href = '/excelTemplate/importPlatform.xlsx'
        },
        onTrigger (val) {
            const params = {
                companyCode: val.companyCode,
                originaCompanyName: val.originaCompanyName,
                companyName: val.companyName,
                subsectionCode: val.subsectionCode,
                subsectionName: val.subsectionName,
                onlineTime: val.developSignInfoVo.onlineTime,
                signScale: val.developSignInfoVo.signScale,
                dueDiligenceInspectionTime: val.developSignInfoVo.dueDiligenceInspectionTime,
                dueDiligenceOpiniot: val.developSignInfoVo.dueDiligenceOpiniot,
                createUid: this.userInfo.jobNumber,
                createName: this.userInfo.employeeName
                // createTime: updateTime
            }
            this.$confirm('是否触发入驻申请流程？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await triggerApply(params)
            }).catch(() => {

            })
        }
    },
    beforeRouteEnter (to, from, next) {
        newCache('developlist')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'addplatform') {
            clearCache('developlist')
        }
        next()
    },
    activated () {
        this.getList()
    },
    mounted () {
        this.getList()
        this.newBossAuth(['F', 'P'], {
            isCancel: 'Y',
            businessType: 1
        })
        this.provinceDataList = this.findProvinceAndCity(0)
    }
}
</script>

<style scoped lang="scss">
/deep/.page-table .el-table thead th {
    background: #f5f7fa;
}
/deep/.color-safe {
    color: #639be7;
    cursor: pointer;
}
/deep/.d-dialog {
    margin-top: 20px;
}
/deep/.d-dialog .el-table thead th {
    background: #f5f7fa;
}
/deep/.companyshortname .el-dialog__footer {
    text-align: center;
}
/deep/.ws .el-dialog__footer {
    text-align: center;
}
/deep/.companyshortname .el-pagination__editor.el-input {
    width: 50px;
}
.tailers_wrap {
    margin-top: 20px;
}
.oss_tailers_title {
    border-left: 4px solid #f88825;
    color: #f88825;
    padding-left: 10px;
}
.tailers_wrap .cardInfo {
    width: 120px;
    margin-right: 10px;
    float: left;
}
.cardInfo img {
    width: 120px;
}
.tailers_wrap .oss_form_tr {
    align-items: center;
}
.oss_form_tr {
    display: flex;
    margin: 14px 0;
    width: 95%;
}
.oss_form_tr_title {
    width: 25%;
    text-align: right;
    padding-right: 12px;
    padding-top: 5px;
}
.oss_form_tr_cont {
    width: 71%;
}
</style>

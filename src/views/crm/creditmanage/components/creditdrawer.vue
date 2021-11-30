<template>
    <div class="projectRecord">
        <h-drawer title="信用详情" :visible.sync="drawer" :before-close="handleClose" :wrapperClosable=false size="50%">
            <template #connect>
                <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="fiextab">
                    <el-tab-pane label="信用详情" name="1"></el-tab-pane>
                    <el-tab-pane label="授信资料清单" name="2"></el-tab-pane>
                </el-tabs>
                <div class="fullbg" v-if="showPacking">
                    <div class="fullbg-img">
                        <img src="https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20201027/01791ef9-5a1f-4e26-8b52-d6ab69548e3b.png" width="100px">
                        <p>
                            <i class="el-icon-loading" style="font-size:23px;margin-right:3px"></i>
                            <font>文件打包中，请耐心等待，请勿关闭页面...</font>
                        </p>
                    </div>
                </div>
                <div class="drawer-wrap" v-if="activeName=='1'">
                    <div class="drawer-wrap_title">{{creditDetailObj.companyName}}
                        <!-- companyType 0无标签企业 1 主企业 2 子企业 -->
                        <el-tag :type="creditDetailObj.companyType == 1 ? 'success': ''" v-if="creditDetailObj.companyType == 1 || creditDetailObj.companyType == 2">{{ creditDetailObj.companyType == 1 ? '主企业' : '子企业' }}</el-tag>
                    </div>
                    <div class="drawer-wrap_btn">
                        <div class="drawer-wrap_btn-flex">信用详情</div>
                        <el-button type="primary" size="mini" v-if="(creditDetailObj.companyType == 1 || creditDetailObj.companyType == 0) && hosAuthCheck(auths.CRM_CREDIT_SET)" @click="onEditVip(creditDetailObj.id)">通用额度设置</el-button>
                        <el-button type="primary" size="mini" v-if="(creditDetailObj.companyType == 1 || creditDetailObj.companyType == 0) && hosAuthCheck(auths.CRM_TEMPORARY_SET)" @click="handleOpenSet()">临时额度设置</el-button>
                    </div>
                    <basicTable :tableData="tableData" :tableLabel="tableLabel" :isMultiple="false" :actionMinWidth=100 :maxHeight=500>
                        <template slot="endTime" slot-scope="scope">
                            <span :class="scope.data.row.status?'colgry':'colred'">{{scope.data.row.endTime | momentFormat('YYYY-MM-DD')}}</span>
                        </template>
                        <template slot="status" slot-scope="scope">
                            <span :class="scope.data.row.status?'colgry':'colred'">{{scope.data.row.status==true?'正常':scope.data.row.status==false?'过期':'-'}}</span>
                        </template>
                    </basicTable>
                    <!-- 子企业展示内容 -->
                    <template v-if="creditDetailObj.companyType == 2">
                        <div class="drawer-wrap_box">
                            <span>以上信用为共享<font color="#ff7a45">{{ creditDetailObj.mainCompanyName }}</font>的信用评级。</span>
                            <el-button type="primary" size="mini" @click="toViewMainBusiness">查看主企业评级</el-button>
                            <el-button type="primary" size="mini" @click="handleUnlink({ childCompanyId: companyId, mainCompanyId: creditDetailObj.mainCompanyId })">取消关联</el-button>
                        </div>
                    </template>
                    <!-- 主企业|无标签企业展示内容 -->
                    <template v-else>
                        <div class="drawer-wrap_switch">
                            <el-switch v-model="creditDetailObj.creditFreeze" disabled @click.native="handleChangeSwitch(creditDetailObj.creditFreeze)" style="display: block" active-color="#13ce66" inactive-color="#ff4949" inactive-text="是否开启风控冻结？">
                            </el-switch>
                            <span v-if="creditDetailObj.creditFreeze">冻结周期{{creditDetailObj.freezeStartTime | momentFormat}}～{{creditDetailObj.freezeEndTime | momentFormat}}</span>
                        </div>
                        <div class="drawer-wrap_header">额度共享</div>
                        <div class="drawer-wrap_box">
                            <span class="drawer-wrap_left">请选择额度共享企业：</span>
                            <div class="drawer-wrap_right">
                                <CustomAutocomplete placeholder="请选择" :suggestions="restaurants" v-if="restaurants">
                                    <template slot-scope="scope">
                                        <span style="float: left;paddingRight:10px;">{{ scope.data.companyName }}</span>
                                        <el-button v-if="scope.data.companyLabel == 0" style="float: right;" type="primary" @click="handleRelevance(scope.data)" size="mini">关联</el-button>
                                        <el-tag v-else>{{ scope.data.companyLabel | companyLabelFilter }}</el-tag>
                                    </template>
                                </CustomAutocomplete>
                            </div>
                        </div>
                        <div class="drawer-wrap_box">
                            <span class="drawer-wrap_left">额度共享企业：</span>
                            <div class="drawer-wrap_right shareScroll">
                                <template v-if="shareCompaniesList.length > 0">
                                    <div class="link-name" v-for="item in shareCompaniesList" :key="item.companyId">
                                        <span>{{ item.companyName }} <i>{{ item.shareTime }}</i></span>
                                        <el-button type="primary" size="mini" @click="handleUnlink({ childCompanyId: item.companyId, mainCompanyId: companyId, companyName: item.companyName })">取消关联</el-button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="not-empty">暂无</div>
                                </template>
                            </div>
                        </div>
                    </template>
                    <div class="drawer-wrap_header">修改记录</div>
                    <div class="drawer-wrap_records">
                        <updateRecord :list="updateRecordList"></updateRecord>
                    </div>
                </div>
                <div class="collect-wrapbox" v-if="activeName=='2'">
                    <el-form ref="approveForm" class="demo-ruleForm">
                        <div class="collect-wrapbox_btnflex">
                            <p>
                                <h-button table @click="onClickRecord">打回记录</h-button>
                            </p>
                            <p v-if="hosAuthCheck(auths.CRM_XY_DOWN)">
                                <h-button table @click="onDownzip" v-if="showPacking==null">一键下载</h-button>
                                <!-- <span v-if="isDownLoad">正在下载中，请稍后</span> -->
                                <span v-if="showPacking!=null&&showPacking">文件打包中，请稍等</span>
                                <span v-if="showPacking!=null&&!showPacking">打包完成</span>
                            </p>
                        </div>
                        <div class="collect-main" v-for="item in approveForm" :key="item.firstCatagoryId">
                            <div class="collect-title">{{item.firstCatagoryName}}
                            </div>
                            <template v-for="obj in item.respRiskCheckDocTemplateList">
                                <el-form-item label="" prop="type" :key="'item'+obj.templateId">
                                    <div class="collect-boxflex">
                                        <div v-if="documentStatus!=3&&documentStatus!=4">
                                            <el-checkbox label="" name="type" size="medium" v-model="obj.callback" :disabled=obj.refuse></el-checkbox>
                                        </div>
                                        <div class="collect-boxtxt">
                                            <h3><i v-if="obj.mondatoryFlag">*</i>{{obj.secondCatagoryName}}<span class="collect-call" v-if="obj.refuse">已打回，待分部补充</span></h3>
                                            <p>备注：{{obj.remark?obj.remark:'-'}}</p>
                                            <p>规定格式：{{obj.formatName}}</p>
                                        </div>
                                    </div>
                                    <div class="upload-file_list" v-for="(jtem,index) in obj.creditDocuments" :key="index">
                                        <p>
                                            <span class="posrtv">
                                                <template v-if="jtem&&jtem.fileUrl">
                                                    <i class="el-icon-document"></i>
                                                    <downloadFileAddToken isPreview :file-name="jtem.fileName" :file-url="jtem.fileUrl" :a-link-words="jtem.fileName" is-type="main" />
                                                </template>
                                            </span>
                                        </p>
                                        <p>{{ jtem.createTime | momentFormat }}</p>
                                        <p>
                                            <font class="fileItemDownLoad" @click="()=>{onDelete(obj,index)}" v-if="(documentStatus!=3)">删除</font>
                                            <downloadFileAddToken :file-name="jtem.fileName" :file-url="jtem.fileUrl" a-link-words="下载" is-type="btn" />
                                        </p>
                                    </div>
                                    <OssFileHosjoyUpload v-model="obj.creditDocuments" :showPreView=false :fileSize='200' :fileNum='50' :action='action' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb(obj)}" @successArg="(val)=>{handleSuccessArg(val)}" style="margin:10px 0 0 5px">
                                        <el-button type="primary">上 传</el-button>
                                    </OssFileHosjoyUpload>
                                </el-form-item>
                            </template>
                        </div>
                    </el-form>
                </div>
            </template>
            <template #btn>
                <h-button type="assist" @click="onCallback" v-if="activeName==2&&(documentStatus!=1&&documentStatus!=3&&documentStatus!=4)">打回补充</h-button>
                <h-button type="primary" @click="onOnlyCredit" v-if="activeName==2&&(documentStatus!=1&&documentStatus!=3&&documentStatus!=4)">审核通过</h-button>
                <h-button @click="handleClose">取消</h-button>
            </template>
        </h-drawer>
        <el-dialog title="通用额度设置" :visible.sync="dialogVisible" width="42%" :before-close="onCloseDrawer" :append-to-body="true" :close-on-click-modal=false>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm el-dialog__form">
                <el-form-item label="企业名称：">
                    <el-input v-model="ruleForm.companyName" disabled></el-input>
                </el-form-item>
                <el-form-item label="信用评级：" prop="creditLevel">
                    <el-select v-model="ruleForm.creditLevel" placeholder="请选择">
                        <el-option v-for="item in droplist" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务费：" prop="serviceFee">
                    <el-input-number v-model="ruleForm.serviceFee" controls-position="right" :min="0" :max="100" :precision=1></el-input-number>
                </el-form-item>
                <el-form-item label="通用额度：" prop="purchaseQuota">
                    <el-input v-model="ruleForm.purchaseQuota" v-isNum:6="ruleForm.purchaseQuota" v-inputMAX='10000' maxlength='15'><template slot="append">万元</template></el-input>
                </el-form-item>
                <el-form-item label="信用授予日期：" prop="startTime">
                    <el-date-picker v-model="ruleForm.startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="信用授予日期" :picker-options="pickerOptionsStart" type="date" @change="datePickerChange"></el-date-picker>
                </el-form-item>
                <el-form-item label="信用到期时间：" prop="endTime">
                    <el-date-picker v-model="ruleForm.endTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="信用到期时间" :picker-options="pickerOptionsEnd" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="说明" remark>
                    <el-input type="textarea" v-model="ruleForm.remark" maxlength="200" show-word-limit :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <template v-if="onlyType==1">
                    <h-button @click="onCloseDrawer">取消</h-button>
                    <h-button type='primary' @click="submitForm()" :loading=isloading>{{isloading?'保存中...':'确定'}}</h-button>
                </template>
                <template v-else>
                    <h-button @click="onSubmitDoc(2)">仅审核通过，暂不评级</h-button>
                    <h-button type='primary' @click="onSubmitDoc(3)" :loading=isloading>{{isloading?'保存中...':'审核通过并提交评级'}}</h-button>
                </template>
            </span>
        </el-dialog>
        <el-dialog title="打回记录" :visible.sync="recordsVisible" width="30%" :before-close="()=>recordsVisible = false" :append-to-body="true" :modal=false>
            <div class="project-record">
                <template v-if="refuseRecord.length>0">
                    <el-timeline>
                        <el-timeline-item :timestamp="moment(item.createTime).format('YYYY-MM-DD  HH:mm:ss')+' 打回操作人：'+(item.createBy||'-')" placement="top" v-for="item in refuseRecord" :key=item.id>
                            <el-card>
                                <p>待补充类目：{{item.secondCategoryNames}}</p>
                                <p>待补充原因：{{item.remark||'-'}}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </template>
                <template v-else>
                    <p>暂无记录</p>
                </template>
            </div>
            <span slot="footer" class="dialog-footer">
                <h-button @click="recordsVisible = false">取消</h-button>
            </span>
        </el-dialog>
        <el-dialog title="打回原因" :visible.sync="reasonVisible" width="30%" :before-close="onCloseCol" :modal=false>
            <el-form ref="refuseForm" :model="refuseForm" :rules="refuseFormRules" label-width="100px" style="margin-top:20px">
                <el-form-item label="打回原因：" prop="remark">
                    <el-input type="textarea" v-model.trim="refuseForm.remark" maxlength="500" :rows="5" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="onCloseCol">取消</h-button>
                <h-button type="primary" @click="onRefuse" :loading=resloading>{{resloading?'确定':'保存'}}</h-button>
            </span>
        </el-dialog>
        <!-- 开启风控冻结 -->
        <el-dialog title="是否开启风控冻结" :visible.sync="riskVisible" width="30%" :before-close="handleCloseFrozen" :append-to-body="true" :close-on-click-modal=false>
            <el-form ref="riskForm" :model="riskForm" :rules="riskFormRules" label-width="150px" style="margin-top:20px">
                <el-form-item prop="freezeStartTime" label="冻结开始时间：">
                    <el-date-picker type="datetime" placeholder="冻结开始时间：" v-model="riskForm.freezeStartTime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" :picker-options="startOptions" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item prop="freezeEndTime" label="冻结结束时间：">
                    <el-date-picker type="datetime" placeholder="冻结结束时间：" v-model="riskForm.freezeEndTime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" :picker-options="endOptions" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input type="textarea" v-model.trim="riskForm.freezeRemark" maxlength="500" :rows="5" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="handleCloseFrozen">取 消</h-button>
                <h-button type="primary" @click="handleSubmitFrozen">确 定</h-button>
            </span>
        </el-dialog>
        <!-- 风控设置 -->
        <setInfoDialog ref="setInfoDialog" @backEvent = 'getCompanyDetail'/>
    </div>
</template>
<script>
import moment from 'moment'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import downloadFileAddToken from '@/components/downloadFileAddToken'
import setInfoDialog from '../components/setInfoDialog.vue'
import updateRecord from './updateRecord.vue'
import { ccpBaseUrl } from '@/api/config'
import { mapGetters, mapActions, mapState } from 'vuex'
import CustomAutocomplete from './customAutocomplete.vue'
import { postCreditDetail, putCreditDocument, refuseCredit, uploadCredit, saveCreditDocument, getComcredit, downLoadZip, shareCompanyList, creditShareAdd, shareCompanies, creditShareCancel, creditUpdatRecord, companyDetail, updateCreditUnFreeze, updateCreditFreeze } from '../api'
import { CREDITLEVEL } from '../../const'
import * as auths from '@/utils/auth_const'
export default {
    name: 'creditdrawer',
    data () {
        return {
            showPacking: null,
            auths,
            moment,
            isloading: false,
            resloading: false,
            activeName: '1',
            drawer: false,
            companyId: '',
            documentStatus: '',
            droplist: CREDITLEVEL,
            tableData: [],
            tableLabel: [
                { label: '信用评级', prop: 'creditLevel', width: '' },
                { label: '服务费', prop: 'serviceFee', width: '150' },
                { label: '通用额度(万元)', prop: 'purchaseQuota', width: '150', formatters: 'money' },
                { label: '临时额度(万元)', prop: 'temporaryQuotaAmount', width: '150', formatters: 'money' },
                { label: '可代采购额度(万元)', prop: 'purchaseAmount', width: '150' },
                { label: '冻结中额度(万元)', prop: 'purchaseFreezeAmount', width: '150' },
                { label: '占用中额度(万元)', prop: 'occupyAmount', width: '150', formatters: 'money' },
                { label: '剩余代采购额度(万元)', prop: 'purchaseUsableAmount', width: '150', formatters: 'money' },
                { label: '信用到期日', prop: 'endTime', width: '180', formatters: 'date' },
                { label: '状态', prop: 'status' }
            ],
            paginationInfo: {},
            dialogVisible: false,
            recordsVisible: false,
            reasonVisible: false,
            refuseRecord: [],
            rules: {
                creditLevel: [
                    { required: true, message: '请选信用评级', trigger: 'change' }
                ],
                serviceFee: [
                    { required: true, message: '请输入服务费', trigger: 'blur' }
                ],
                purchaseQuota: [
                    { required: true, message: '请输入可代采购额度', trigger: 'blur' },
                    {
                        validator: (r, v, callback) => {
                            if (parseFloat(this.ruleForm.purchaseQuota) > 100000000) {
                                return callback(new Error('可代采购额度大于1千万'))
                            }
                            return callback()
                        }
                    }
                ],
                startTime: [
                    { required: true, message: '请选择信用授予日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择信用到期时间', trigger: 'change' }
                ]
            },
            ruleForm: {
                projectUpload: [],
                serviceFee: 0
            },
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            newRuleForm: {},
            approveForm: {},
            mondatoryFlagRes: [],
            creditDocumentList: [],
            refuseForm: {
                createBy: '',
                companyId: '',
                remark: '',
                templateIds: ''
            },
            refuseFormRules: {
                remark: [
                    { required: true, message: '请输入打回原因', trigger: 'blur' }
                ]
            },
            riskFormRules: {
                freezeStartTime: [
                    { required: true, message: '请选择信用冻结开始时间', trigger: 'blur' }
                ],
                freezeEndTime: [
                    { required: true, message: '请选择信用冻结结束时间', trigger: 'blur' }
                ]
            },
            onlyType: 1,
            isDownLoad: false,
            riskValue: '',
            riskVisible: false,
            riskForm: {
                companyId: '',
                freezeEndTime: '',
                freezeRemark: '',
                freezeStartTime: ''
            },
            restaurants: [],
            shareCompaniesList: [],
            updateRecordList: [],
            creditDetailObj: {},
            toViewMainCompany: ''
        }
    },
    components: {
        OssFileHosjoyUpload,
        downloadFileAddToken,
        setInfoDialog,
        CustomAutocomplete,
        updateRecord
    },
    watch: {
        'form.projectUpload' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['projectUpload'].clearValidate()
            })
        }
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            creditPage: 'creditManage/creditPage',
            creditDetail: 'creditManage/creditDetail',
            creditDocument: 'creditManage/creditDocument',
            creditRecords: 'creditManage/creditRecords'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    return time.getTime() > new Date().getTime()
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.newendTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        startOptions () {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.riskForm.freezeEndTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                    return time.getTime() < new Date().getTime() - 8.64e7
                }
            }
        },
        endOptions () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.riskForm.freezeStartTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    mounted () {
        this.copyRuleForm = { ...this.ruleForm }
    },
    methods: {
        ...mapActions({
            findCreditDetail: 'creditManage/findCreditDetail',
            findCreditDocument: 'creditManage/findCreditDocument',
            findCreditRecords: 'creditManage/findCreditRecords'
        }),
        handleClick (tab) {
            if (tab.index == 1) this.onShowCreditdocument()
        },
        async onShowDrawerinfn (val) {
            console.log(val)
            this.activeName = '1'
            this.companyId = val.companyId
            this.documentStatus = val.documentStatus
            this.getCompanyDetail()
            this.getShareLimitList()
            this.getShareCompaniesList()
            this.creditUpdateRecord()
            this.drawer = true
        },
        async onShowCreditdocument () {
            this.isDownLoad = false
            this.showPacking = null
            this.mondatoryFlagRes = []
            await this.findCreditDocument(this.companyId)
            this.approveForm = this.creditDocument
            this.approveForm.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    if (!jtem.creditDocuments) {
                        jtem.creditDocuments = []
                    }
                    // 筛选出需要必填
                    if (jtem.mondatoryFlag == 1) {
                        this.mondatoryFlagRes.push(jtem)
                    }
                })
            })
        },
        async handleSuccessCb (row) {
            row.creditDocuments.map(item => {
                item.companyId = this.companyId
                item.templateId = row.templateId
                item.createTime = item.createTime || moment().format('YYYY-MM-DD HH:mm:ss')
            })
        },
        async handleSuccessArg (val) {
            // const newDocuments = row.creditDocuments.filter(item => !item.creditDocumentId)
            await uploadCredit([val])
            this.$message.success('资料上传成功!')
        },
        onDelete (item, index) {
            this.$confirm('是否确认删除，删除后不可恢复，是否确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                if (item.creditDocuments[index].creditDocumentId) {
                    try {
                        await putCreditDocument(item.creditDocuments[index].creditDocumentId)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        item.creditDocuments.splice(index, 1)
                    } catch (error) {

                    }
                } else {
                    item.creditDocuments.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }
            }).catch(() => {
                // do nothing
            })
        },
        checkForm (cb) {
            let res = ''
            for (let i = 0; i < this.mondatoryFlagRes.length; i++) {
                const arr = this.creditDocumentList.filter(jtem => {
                    return jtem.templateId == this.mondatoryFlagRes[i].templateId
                })
                console.log(arr)
                if (arr.length == 0) {
                    res = this.mondatoryFlagRes[i]
                    break
                }
            }
            return res
        },
        async onOnlyCredit () {
            this.creditDocumentList = []
            this.approveForm.length > 0 && this.approveForm.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    jtem && jtem.creditDocuments && jtem.creditDocuments.length > 0 && jtem.creditDocuments.map(ktem => {
                        this.creditDocumentList.push({
                            templateId: ktem.templateId,
                            fileName: ktem.fileName,
                            fileUrl: ktem.fileUrl,
                            createTime: ktem.createTime ? ktem.createTime : null,
                            createBy: ktem.createBy ? ktem.createBy : this.userInfo.employeeName
                        })
                    })
                })
            })
            console.log(this.creditDocumentList, this.mondatoryFlagRes)
            let res = this.checkForm()
            if (res) {
                this.$message.error(`一级类目：${res.firstCatagoryName}，二级类目：${res.secondCatagoryName}，${res.formatName}必填！`)
            } else {
                // 新增 审核通过
                this.onlyType = 2
                const { data } = await getComcredit(this.companyId)
                this.ruleForm = { ...data }
                this.ruleForm.projectUpload = this.ruleForm.attachments ? JSON.parse(this.ruleForm.attachments) : []
                this.ruleForm.newendTime = this.ruleForm.endTime
                this.newRuleForm = { ...this.ruleForm }
                // 如果是子企业，则直接审核通过，无需填写信用评级，如果是主企业和无标签企业，则打开评级弹窗
                if (this.creditDetailObj.companyType != 2) {
                    this.dialogVisible = true
                    this.$nextTick(() => {
                        this.$refs.ruleForm.clearValidate()
                    })
                } else {
                    this.dialogVisible = false
                }
            }
        },
        async onSubmitDoc (val) {
            this.isloading = true
            this.ruleForm.attachments = JSON.stringify(this.ruleForm.projectUpload)
            if (val == 2) {
                try {
                    await saveCreditDocument({ companyId: this.companyId, reqCompanyCreditDetail: { ...this.ruleForm }, submitStatus: val })
                    this.$message({
                        message: `企业资料审核通过`,
                        type: 'success'
                    })
                    this.drawer = false
                    this.$emit('backEvent')
                    this.dialogVisible = false
                    this.getCompanyDetail()
                    this.$emit('backEvent')
                } catch (error) {
                    this.isloading = false
                }
            } else {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        try {
                            await saveCreditDocument({ companyId: this.companyId, reqCompanyCreditDetail: { ...this.ruleForm }, submitStatus: val })
                            this.$message({
                                message: `企业资料评级授信成功`,
                                type: 'success'
                            })
                            this.isloading = false
                            this.drawer = false
                            this.$emit('backEvent')
                            this.dialogVisible = false
                            this.getCompanyDetail()
                            this.$emit('backEvent')
                        } catch (error) {
                            this.isloading = false
                        }
                    } else {
                        this.isloading = false
                    }
                })
            }
        },
        handleClose () {
            this.drawer = false
            this.showPacking = null
            this.$emit('backEvent')
            setTimeout(() => {
                if (this.toViewMainCompany) {
                    const { companyId } = this.creditDetailObj
                    this.onShowDrawerinfn({ companyId: this.toViewMainCompany, documentStatus: this.documentStatus })
                    this.toViewMainCompany = undefined
                }
            }, 500)
        },
        datePickerChange (val) {
            // this.newendTime = moment(val).add(6, 'M').format('YYYY-MM-DD')
            this.newendTime = this.ruleForm.startTime
            this.ruleForm.endTime = moment(val).add(6, 'M').format('YYYY-MM-DD')
        },
        async onEditVip (val) {
            this.onlyType = 1
            if (val) {
                await this.findCreditDetail(val)
                this.ruleForm = { ...this.creditDetail }
                this.ruleForm.projectUpload = this.ruleForm.attachments ? JSON.parse(this.ruleForm.attachments) : []
                this.ruleForm.newendTime = this.ruleForm.endTime
                this.newRuleForm = { ...this.ruleForm }
            }
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs.ruleForm.clearValidate()
            })
        },
        submitForm () {
            this.isloading = true
            this.ruleForm.attachments = JSON.stringify(this.ruleForm.projectUpload)
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await postCreditDetail(this.ruleForm)
                        this.dialogVisible = false
                        this.isloading = false
                        this.$message({
                            message: `设置成功`,
                            type: 'success'
                        })
                        this.getCompanyDetail()
                        this.creditUpdateRecord()
                        this.$emit('backEvent')
                    } catch (error) {
                        this.isloading = false
                    }
                } else {
                    this.isloading = false
                }
            })
        },
        onCloseDrawer () {
            if (JSON.stringify(this.newRuleForm) !== JSON.stringify(this.ruleForm)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗?', '是否确认取消修改', {
                    distinguishCancelAndClose: true,
                    cancelButtonText: '确认取消',
                    confirmButtonText: '返回'
                }).catch(action => {
                    if (action === 'cancel') {
                        this.dialogVisible = false
                    }
                })
            } else {
                this.dialogVisible = false
            }
        },
        async onClickRecord () {
            await this.findCreditRecords(this.companyId)
            this.refuseRecord = this.creditRecords
            this.recordsVisible = true
        },
        onCallback () {
            const newTempid = []
            const newList = this.approveForm
            newList && newList.map(val => {
                val.respRiskCheckDocTemplateList.map(item => {
                    if (item.callback) newTempid.push(item.templateId)
                })
            })
            this.refuseForm.templateIds = newTempid.toString()
            if (newTempid.length > 0) {
                this.reasonVisible = true
                this.refuseForm.remark = ''
            } else {
                this.$message.warning('请选择打回的选项')
            }
        },
        onRefuse () {
            this.resloading = true
            this.refuseForm.createBy = this.userInfo.employeeName
            this.refuseForm.companyId = this.companyId
            this.$refs.refuseForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await refuseCredit(this.refuseForm)
                        this.$message.success('打回成功')
                        this.reasonVisible = false
                        this.drawer = false
                        this.onShowCreditdocument()
                        this.resloading = false
                        this.$emit('backEvent')
                    } catch (error) {
                        this.resloading = false
                    }
                } else {
                    this.resloading = false
                }
            })
        },
        onCloseCol () {
            this.refuseForm.remark = ''
            this.reasonVisible = false
            this.$nextTick(() => {
                this.$refs.refuseForm.clearValidate()
            })
        },
        async onDownzip () {
            this.isDownLoad = true
            this.showPacking = true
            const { data } = await downLoadZip({ companyId: this.companyId, activeName: 1 })
            this.showPacking = false
            window.location.href = data
        },
        // 开启风控冻结--取消
        handleCloseFrozen () {
            this.riskVisible = false
        },
        // 开启风控冻结--确定
        handleSubmitFrozen () {
            this.riskForm.companyId = this.companyId
            this.$refs.riskForm.validate(async valid => {
                if (valid) {
                    await updateCreditFreeze(this.riskForm)
                    this.getCompanyDetail()
                    this.creditUpdateRecord()
                    this.riskVisible = false
                }
            })
        },
        handleOpenSet () {
            this.$refs.setInfoDialog.onOpenDialog()
        },
        // 获取企业信用详情
        async getCompanyDetail () {
            const { data } = await companyDetail({ companyId: this.companyId })
            this.tableData = [data]
            this.creditDetailObj = data
        },
        // 获取共享额度企业列表
        async getShareLimitList () {
            const { data } = await shareCompanyList({ companyId: this.companyId })
            data.forEach(item => {
                item.value = item.companyName
            })
            this.restaurants = data
        },
        // 共享企业列表
        async getShareCompaniesList () {
            const { data } = await shareCompanies({ companyId: this.companyId })
            this.shareCompaniesList = data
        },
        // 修改记录
        async creditUpdateRecord () {
            const { data } = await creditUpdatRecord({ companyId: this.companyId })
            this.updateRecordList = data
        },
        // 风控冻结
        async handleChangeSwitch (val) {
            if (!val) {
                this.riskVisible = true
            } else {
                await updateCreditUnFreeze(this.companyId)
                this.getCompanyDetail()
            }
        },
        // 关联企业
        async handleRelevance (value) {
            const dataJson = {
                childCompanyId: value.id,
                mainCompanyId: this.companyId
            }
            await creditShareAdd(dataJson)
            this.getCompanyDetail()
            this.getShareCompaniesList()
            this.getShareLimitList()
            this.creditUpdateRecord()
        },
        // 取消关联企业
        handleUnlink (value) {
            let tips = ''
            if (value.companyName) {
                // 主企业取消关联
                tips = `<span style="color:red">取消关联后，${value.companyName}将不再可以共用当前企业的信用评级</span>，你还要继续吗？`
            } else {
                // 子企业取消关联
                tips = `<span style="color:red">取消关联后，当前企业将不再可以共用${this.creditDetailObj.mainCompanyName}企业的信用评级</span>，你还要继续吗？`
            }
            this.$confirm(tips, '是否确认取消关联？', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确认取消关联',
                cancelButtonText: '返回'
            }).then(async () => {
                try {
                    await creditShareCancel(value)
                    this.getCompanyDetail()
                    this.getShareCompaniesList()
                    this.getShareLimitList()
                    this.creditUpdateRecord()
                    this.$message.success('已取消关联')
                } catch (err) {
                    this.$message.error('取消关联失败，请重试')
                }
            })
        },
        // 查看主企业评级
        toViewMainBusiness () {
            this.toViewMainCompany = this.companyId
            const { mainCompanyId } = this.creditDetailObj
            this.onShowDrawerinfn({ companyId: mainCompanyId, documentStatus: this.documentStatus })
        }
    },
    filters: {
        companyLabelFilter (val) {
            let result = ''
            switch (parseInt(val)) {
                case 1:
                    result = '已关联其他主企业'
                    break
                case 2:
                    result = '已被其他企业关联'
                    break
                case 3:
                    result = '当前企业'
                    break
                case 4:
                    result = '已关联当前企业'
                    break
                default: break
            }
            return result
        }
    }
}
</script>

<style lang="scss" scoped>
.fullbg {
    background-color: #211f1f;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0.5;
    position: fixed;
    top: 0;
    z-index: 9999;
    .fullbg-img {
        width: 377px;
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        p {
            color: #fff;
            font-size: 18px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.colred {
    color: #ff7a45;
}
.colgry {
    color: #67c23a;
}
/deep/ .el-drawer__body {
    overflow-y: scroll;
    // position: relative;
}
/deep/.el-dialog__form {
    height: 500px;
    overflow-y: scroll;
}
/deep/.el-dialog .el-input {
    width: 100%;
}

/deep/.el-tabs__nav {
    margin: 0 10px;
}
/deep/.el-form-item__content {
    line-height: 24px;
}
/deep/.el-form .el-input:not(:first-child) {
    margin-left: 0;
}
.drawer-wrap {
    padding: 60px 10px 100px 10px;
    margin-left: 15px;
    &_title {
        background: #efeeee;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        padding-left: 10px;
    }
    &_header {
        font-size: 15px;
        margin: 30px 0 20px 0;
        position: relative;
        padding-left: 10px;
        &::before {
            content: '';
            position: absolute;
            bottom: 0px;
            left: 0px;
            height: 100%;
            width: 4px;
            background: #ff7a45;
        }
    }
    &_btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        &-flex {
            flex: 1;
            &:nth-child(1) {
                color: #ff7a45;
            }
            &:nth-child(2) {
                text-align: right;
            }
        }
    }
    &_switch {
        display: flex;
        margin-top: 10px;
        span {
            padding-left: 15px;
            color: gray;
        }
    }
    /deep/.el-switch.is-disabled{
        opacity:1;

    }
    /deep/.el-switch.is-disabled .el-switch__label{
        cursor: pointer;
    }
    &_box {
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-left: 20px;
        span {
            padding-right: 10px;
        }
    }
    &_records {
        display: flex;
        flex-direction: column;
        div {
            margin-top: 10px;
        }
        span {
            padding-right: 10px;
        }
        .deep {
            color: #ff7a45;
        }
    }
    .link-name {
        display: flex;
        justify-content: space-between;
        width: 500px;
        align-items: center;
        margin-bottom: 10px;
        span {
            i {
                font-style: normal;
                color: gray;
            }
        }
    }
    &_left {
        width: 150px;
    }
    &_right {
        width: 500px;
        .el-autocomplete {
            width: 500px;
        }
    }
    .not-empty {
        color: #999;
    }
    .shareScroll {
        max-height: 300px;
        overflow-y: scroll;
    }
}
.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #fff;
    z-index: 1000;
    button {
        flex: 1;
    }
    .drawer-button {
        text-align: right;
    }
}

.collect-wrapbox {
    padding: 0 10px 100px 10px;
    margin-left: 15px;
    &_btnflex {
        width: 140px;
        text-align: right;
        margin: 0 10px;
        display: flex;
        justify-content: flex-end;
        position: fixed;
        top: 130px;
        right: 0;
        z-index: 11;
        background: #fff;
        flex-direction: column;
        span {
            color: #ff7a45;
            font-size: 14px;
        }
    }
}
.collect-main {
    margin-top: 70px;
}
.collect-title {
    font-size: 20px;
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 0;
    font-weight: bold;
    /deep/ .el-button--mini {
        margin-left: 50px;
    }
    display: flex;
    justify-content: space-between;
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
.collect-boxflex {
    display: flex;
    flex-direction: row;
    padding: 30px 0 0 0;
}
.collect-boxtxt {
    h3 {
        font-size: 16px;
        margin: 0;
    }
    i {
        color: #ff0000;
        vertical-align: middle;
        padding: 0 2 0 0px;
        font-style: normal;
    }
    p {
        font-size: 14px;
        margin: 0;
        padding: 16px 0 0 0;
        line-height: auto;
    }
}
.collect-call {
    background: #ff7a45;
    color: #fff;
    font-size: 13px;
    border-radius: 6px;
    margin-left: 10px;
    padding: 1px 4px;
}
.upload-file_list {
    display: flex;
    margin: 16px 0 0 0;
    // justify-content: space-around;
    p {
        &:first-child {
            flex: 3;

            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    p {
        padding: 0 10px;
    }
}
.fileItemDownLoad {
    font-size: 12px;
    border-radius: 3px;
    padding: 8px 16px;
    color: #fff;
    background-color: #ff7a45;
    border-color: #ff7a45;
    display: block;
    line-height: 13px;
    float: left;
    height: 13px;
    cursor: pointer;
    margin-left: 10px;
}
.posrtv {
    position: relative;
    display: flex;
    color: #ff7a45;
    align-items: center;
    a {
        color: #ff7a45;
        margin-left: 10px;
        word-break: break-all;
    }
    font {
        font-size: 14px;
    }
}
.project-record {
    margin-top: 15px;
}
.fiextab {
    position: fixed;
    background: #ffffff;
    width: 100%;
    z-index: 11;
}
</style>

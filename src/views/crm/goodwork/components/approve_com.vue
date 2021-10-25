<template>
    <div class="collect-wrap">1
        <div class="fullbg" v-if="showPacking">
            <div class="fullbg-img">
                <img src="https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20201027/01791ef9-5a1f-4e26-8b52-d6ab69548e3b.png" width="100px">
                <p>
                    <i class="el-icon-loading" style="font-size:23px;margin-right:3px"></i>
                    <font>文件打包中，请耐心等待，请勿关闭页面...</font>
                </p>
            </div>
        </div>
        <div class="collect-wrap_btnflex">
            <div v-if="activeName=='3'&&hosAuthCheck(Auths.CRM_LX_DOWN)">
                <h-button table @click="onDownzip" v-if="showPacking==null">一键下载</h-button>
                <!-- <span v-if="isDownLoad" class="collect-wrap_span">正在下载中，请稍后</span> -->
                <span v-if="showPacking!=null&&showPacking">文件打包中，请稍等</span>
                <span v-if="showPacking!=null&&!showPacking">打包完成</span>
            </div>
            <div v-if="activeName=='4'&&hosAuthCheck(Auths.CRM_ZS_DOWN)">
                <h-button table @click="onDownzip" v-if="showPacking==null">一键下载</h-button>
                <!-- <span v-if="isDownLoads" class="collect-wrap_span">正在下载中，请稍后</span> -->
                <span v-if="showPacking!=null&&showPacking">文件打包中，请稍等</span>
                <span v-if="showPacking!=null&&!showPacking">打包完成</span>
            </div>
        </div>
        <el-form :model="approveForm" ref="approveForm" class="demo-ruleForm">
            <div class="collect-Info" v-if="(activeName=='3'&&status!=4)||(activeName=='4'&&status!=11)">
                <div class="collect-Info_result">{{ approveTitle + '结果：' }}

                    <i>{{ approveForm.approveResult == true ? '通过' : approveForm.approveResult == false ? '不通过' : '-' }}</i>
                </div>
                <p>说明： {{ approveForm.remark ? approveForm.remark : '-' }}</p>
                <template v-if="activeName=='4' && approveForm.approveResult == true">
                    <div class="approve_flex">
                        <p><span class="star">*</span>执行费率（银行承兑）： {{approveForm.acceptBankRate || '-'}}% <img src="../../../../assets/images/crm-edit.png" alt="" class="crm-edit" @click="openFinalConfirmDialog"></p>
                        <p><span class="star">*</span>执行费率（银行转账）：{{approveForm.transferBankRate || '-'}}% <img src="../../../../assets/images/crm-edit.png" alt="" class="crm-edit" @click="openFinalConfirmDialog"></p>
                    </div>
                    <div class="approve_flex">
                        <p><span class="star">*</span>最大采购总额：{{approveForm.maxPurchaseAmount | moneyFormat}}元 <img src="../../../../assets/images/crm-edit.png" alt="" class="crm-edit" @click="openFinalConfirmDialog"></p>
                        <p><span class="star">*</span>经销商首付款比例：{{approveForm.advancePaymentRate || '-'}}% <img src="../../../../assets/images/crm-edit.png" alt="" class="crm-edit" @click="openFinalConfirmDialog"></p>
                    </div>
                    <div class="approve_flex">
                        <p><span class="star">*</span>剩余货款支付周期：{{approveForm.remainPaymentCycle || '-'}}个月 <img src="../../../../assets/images/crm-edit.png" alt="" class="crm-edit" @click="openFinalConfirmDialog"></p>
                        <p><span class="star">*</span>评审决议编号：<span style="width:150px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{approveForm.reviewResolutionNo || '-'}}</span> <img src="../../../../assets/images/crm-edit.png" alt="" class="crm-edit" @click="openFinalConfirmDialog"></p>
                    </div>
                </template>
            </div>
            <div class="collect-wrapbox" v-for="item in approveForm.projectDocList" :key="item.firstCatagoryId">
                <div class="collect-title">{{ item.firstCatagoryName }}</div>
                <template v-for="obj in item.respRiskCheckDocTemplateList">
                    <el-form-item label="" prop="type" :key="'item'+obj.templateId">
                        <div class="collect-box">
                            <div class="collect-boxtxt">
                                <h3><i v-if="obj.mondatoryFlag">*</i>{{ obj.secondCatagoryName }}</h3>
                                <p>备注：{{ obj.remark ? obj.remark : '-' }}</p>
                                <p>规定格式：{{ obj.formatName }}</p>
                            </div>
                        </div>
                        <div class="upload-file_list" v-for="(jtem,index) in obj.riskCheckProjectDocPos" :key="index">
                            <div>
                                <span class="posrtv">
                                    <template v-if="jtem&&jtem.fileUrl">
                                        <i class="el-icon-document"></i>
                                        <downloadFileAddToken isPreview :file-name="jtem.fileName" :file-url="jtem.fileUrl" :a-link-words="jtem.fileName" is-type="main" />
                                    </template>
                                </span>
                            </div>
                            <div style="flex:3">{{ moment(jtem.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                            <div>
                                <font class="fileItemDownLoad" @click="()=>{onDelete(obj,index)}" v-if="(activeName=='3'&&status==4)||(activeName=='4'&&status==11)">删除</font>
                                <downloadFileAddToken :file-name="jtem.fileName" :file-url="jtem.fileUrl" :a-link-words="'下载'" is-type="btn" />
                            </div>
                        </div>
                        <OssFileHosjoyUpload v-if="(activeName=='3'&&status==4)||(activeName=='4'&&status==11)" v-model="obj.riskCheckProjectDocPos" :showPreView=false :fileSize=20 :fileNum=100 :limit=100 :action='action' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb(obj)}"
                            style="margin:10px 0 0 5px">
                            <el-button type="primary">上 传</el-button>
                        </OssFileHosjoyUpload>
                    </el-form-item>
                </template>
            </div>
        </el-form>
        <el-dialog :title="approveTitle" :visible.sync="approveVisible" width="30%" :before-close="onColseApprove" :modal=false :close-on-click-modal=false>
            <el-form ref="approveDailg" :model="approvedialgForm" :rules="spproveRules" label-width="100px">
                <el-form-item :label="approveTitle+'结果：'" prop="submitStatus">
                    <el-radio-group v-model="approvedialgForm.submitStatus">
                        <el-radio :label=2>通过</el-radio>
                        <el-radio :label=3>不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="说明：" prop="remark">
                    <el-input type="textarea" placeholder="请输入说明" v-model.trim="approvedialgForm.remark" maxlength="500" :rows="8" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="onColseApprove">取消</h-button>
                <h-button type="primary" @click="onSaveapproveOrfinal(2)">确定</h-button>
            </span>
        </el-dialog>
        <el-dialog title="终审" :visible.sync="projectFinaleVisible" width="50%" :before-close="onCloseProjectFinale" :modal=false :close-on-click-modal=false>
            <el-form ref="projectFinaleDialog" :model="projectFinaleForm" :rules="projectFinaleRules" label-width="180px">
                <el-form-item :label="approveTitle+'结果：'" prop="result">
                    <el-radio-group v-model="projectFinaleForm.result">
                        <el-radio :label=1>通过</el-radio>
                        <el-radio :label=0>不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="projectFinaleForm.result == 1">
                    <el-form-item label="执行费率（银行承兑）：" prop="acceptBankRate">
                        <el-input v-model="projectFinaleForm.acceptBankRate" maxlength="10" v-isNegative:2="projectFinaleForm.acceptBankRate">
                            <template slot="suffix">%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="执行费率（银行转账）：" prop="transferBankRate">
                        <el-input v-model="projectFinaleForm.transferBankRate" maxlength="10" v-isNegative:2="projectFinaleForm.transferBankRate">
                            <template slot="suffix">%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="最大采购总额：" prop="maxPurchaseAmount">
                        <el-input v-model="projectFinaleForm.maxPurchaseAmount" maxlength="18" v-isNegative:2="projectFinaleForm.maxPurchaseAmount">
                            <template slot="suffix">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="经销商首付款比例：" prop="advancePaymentRate" maxlength="10">
                        <el-input v-model="projectFinaleForm.advancePaymentRate" v-isNegative:2="projectFinaleForm.advancePaymentRate">
                            <template slot="suffix">%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="剩余货款支付周期：" prop="remainPaymentCycle">
                        <el-select v-model="projectFinaleForm.remainPaymentCycle">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            <el-option label="3" value="3"></el-option>
                            <el-option label="4" value="4"></el-option>
                            <el-option label="5" value="5"></el-option>
                            <el-option label="6" value="6"></el-option>
                        </el-select>
                        个月
                    </el-form-item>
                    <el-form-item label="评审决议编号：" prop="reviewResolutionNo">
                        <el-input v-model="projectFinaleForm.reviewResolutionNo"  maxlength="50">
                        </el-input>
                    </el-form-item>
                </template>
                <el-form-item label="说明：" prop="remark">
                    <el-input type="textarea" placeholder="请输入说明" v-model.trim="projectFinaleForm.remark" maxlength="500" :rows="8" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="onCloseProjectFinale">取消</h-button>
                <h-button type="primary" @click="updateFinalStatus">确定</h-button>
            </span>
        </el-dialog>
        <el-dialog title="终审字段修改" :visible.sync="finalConfirmVisible" :modal=false width="50%" :close-on-click-modal=false :before-close="finalConfirmDialogClose">
            <el-form :model="formData" :rules="rules" ref="finalConfirmForm" label-width="180px">
                <el-form-item label="执行费率（银行承兑）：" prop="acceptBankRate">
                    <el-input type="text" maxlength="10" v-isNegative:2="formData.acceptBankRate" v-model="formData.acceptBankRate">
                        <template slot="suffix">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="执行费率（银行转账）：" prop="transferBankRate">
                    <el-input type="text" maxlength="10" v-model="formData.transferBankRate" v-isNegative:2="formData.transferBankRate">
                        <template slot="suffix">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最大采购总额：" prop="maxPurchaseAmount">
                    <el-input type="text" maxlength="18" v-model="formData.maxPurchaseAmount" v-isNegative:2="formData.maxPurchaseAmount">
                        <template slot="suffix">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="经销商首付款比例：" prop="advancePaymentRate">
                    <el-input type="text" maxlength="10" v-model="formData.advancePaymentRate" v-isNegative:2="formData.advancePaymentRate">
                        <template slot="suffix">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="剩余货款支付周期：" prop="remainPaymentCycle">
                    <el-select v-model="formData.remainPaymentCycle">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                    </el-select>
                    个月
                </el-form-item>
                <el-form-item label="评审决议编号：" prop="reviewResolutionNo">
                    <el-input type="text" maxlength="50" v-model="formData.reviewResolutionNo">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="finalConfirmDialogClose">取消</h-button>
                <h-button type="primary" @click="updateFinalConfirmFiled">确定</h-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import * as Auths from '@/utils/auth_const'
import moment from 'moment'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import { ccpBaseUrl } from '@/api/config'
import { submitProjectdoc, saveProjectdoc, updateFinalStatus, putProjectDetail } from '../api/index'
import downloadFileAddToken from '@/components/downloadFileAddToken'
import { checkNumandEng } from '@/utils/rules'
export default {
    name: 'approvecom',
    props: {
        approveForm: {
            type: Object,
            default: () => {
            }
        },
        activeName: {
            type: String,
            default: ''
        },
        status: {
            type: Number,
            default: 0
        },
        showPacking: {
            default: null
        },
        projectForm: {
            default: function () {
                return {}
            }
        }
    },
    components: {
        OssFileHosjoyUpload,
        downloadFileAddToken
    },
    data () {
        function validateNumber (r, v, callback) {
            if (v < 0 || v > 100) {
                return callback(new Error(r.message))
            }
            return callback()
        }
        function validateThanZero (r, v, callback) {
            if (v <= 0) {
                return callback(new Error(r.message))
            }
            return callback()
        }
        return {
            Auths,
            moment,
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            approveTitle: '',
            approveVisible: false,
            projectFinaleVisible: false,
            spproveRules: {
                submitStatus: [
                    { required: true, message: '请选择审核状态', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入说明', trigger: 'blur' }
                ]
            },
            approvedialgForm: {
                submitStatus: '',
                remark: ''
            },
            projectFinaleForm: {
                submitStatus: '',
                transferBankRate: '',
                acceptBankRate: '',
                maxPurchaseAmount: '',
                advancePaymentRate: '',
                remainPaymentCycle: '',
                remark: '',
                reviewResolutionNo: ''
            },
            projectFinaleRules: {
                result: [
                    { required: true, message: '请选择审核状态', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入说明', trigger: 'blur' }
                ],
                acceptBankRate: [
                    { required: true, message: '执行费率（银行承兑）不能为空', trigger: 'blur' },
                    {
                        trigger: 'blur',
                        message: '执行费率（银行承兑）0-100',
                        validator: validateNumber
                    }
                ],
                transferBankRate: [
                    { required: true, message: '请输入执行费率（银行转账）', trigger: 'blur' },
                    { message: '执行费率（银行转账）0-100', validator: validateNumber, trigger: 'blur' }
                ],
                maxPurchaseAmount: [
                    { required: true, message: '最大采购总额不能为空', trigger: 'blur' },
                    { message: '最大采购金额必须是正数', validator: validateThanZero, trigger: 'blur' }
                ],
                advancePaymentRate: [
                    { required: true, message: '经销商首付款比例不能为空', trigger: 'blur' },
                    { message: '经销商首付款比例0-100', validator: validateNumber, trigger: 'blur' }
                ],
                remainPaymentCycle: [
                    { required: true, message: '请选择剩余货款支付周期', trigger: 'change' }
                ],
                reviewResolutionNo: [
                    { required: true, message: '请输入评审决议编号', trigger: 'blur' },
                    { message: '格式为50位以内数字或字母', validator: checkNumandEng, trigger: 'blur' }
                ]
            },
            isDownLoad: false,
            isDownLoads: false,
            finalConfirmVisible: false,
            formData: {
                acceptBankRate: '',
                transferBankRate: '',
                maxPurchaseAmount: '',
                advancePaymentRate: '',
                remainPaymentCycle: '',
                reviewResolutionNo: ''
            },
            rules: {
                acceptBankRate: [
                    { required: true, message: '执行费率（银行承兑）不能为空', trigger: 'blur' },
                    { message: '执行费率（银行承兑）0-100', validator: validateNumber, trigger: 'blur' }
                ],
                transferBankRate: [
                    { required: true, message: '执行费率（银行转账）不能为空', trigger: 'blur' },
                    { message: '执行费率（银行转账）0-100', validator: validateNumber, trigger: 'blur' }
                ],
                maxPurchaseAmount: [
                    { required: true, message: '最大采购总额不能为空', trigger: 'blur' },
                    { message: '最大采购金额必须是正数', validator: validateThanZero, trigger: 'blur' }
                ],
                advancePaymentRate: [
                    { required: true, message: '经销商首付款比例不能为空', trigger: 'blur' },
                    { message: '经销商首付款比例0-100', validator: validateNumber, trigger: 'blur' }
                ],
                remainPaymentCycle: [
                    { required: true, message: '请选择剩余货款支付周期', trigger: 'change' }
                ],
                reviewResolutionNo: [
                    { required: true, message: '请输入评审决议编号', trigger: 'blur' },
                    { message: '格式为50位以内数字或字母', validator: checkNumandEng, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        canIOpenTheWindow () {
            let flag = 0
            let name = ''
            this.approveForm.projectDocList.forEach(item => {
                item.respRiskCheckDocTemplateList && item.respRiskCheckDocTemplateList.forEach(obj => {
                    if (obj.mondatoryFlag && obj.riskCheckProjectDocPos.length === 0) {
                        flag += 1
                        if (!name) name = obj.secondCatagoryName
                    }
                })
            })
            return {
                flag: flag === 0,
                name: name
            }
        }
    },
    methods: {
        updateFinalConfirmFiled () {
            this.$refs.finalConfirmForm.validate(async (value) => {
                if (value) {
                    const params = { ...this.formData }
                    params.id = this.approveForm.projectId
                    params.deviceAmount = this.projectForm.deviceAmount
                    params.contractAmount = this.projectForm.contractAmount
                    params.predictLoanAmount = this.projectForm.predictLoanAmount
                    await putProjectDetail(params)
                    this.finalConfirmDialogClose()
                    this.$emit('refreshDetail')
                }
            })
        },
        openFinalConfirmDialog () {
            this.finalConfirmVisible = true
            // finalConfirmForm
            this.formData.acceptBankRate = this.approveForm.acceptBankRate
            this.formData.transferBankRate = this.approveForm.transferBankRate
            this.formData.maxPurchaseAmount = this.approveForm.maxPurchaseAmount
            this.formData.advancePaymentRate = this.approveForm.advancePaymentRate
            this.formData.remainPaymentCycle = this.approveForm.remainPaymentCycle
            this.formData.reviewResolutionNo = this.approveForm.reviewResolutionNo
            this.$nextTick(() => {
                this.$refs.finalConfirmForm.clearValidate()
            })
        },
        clearFormData () {
            this.formData = {
                acceptBankRate: '',
                transferBankRate: '',
                maxPurchaseAmount: '',
                advancePaymentRate: '',
                remainPaymentCycle: '',
                reviewResolutionNo: ''
            }
        },
        finalConfirmDialogClose () {
            this.clearFormData()
            this.finalConfirmVisible = false
        },
        onShowApprove () {
            this.approveVisible = this.status == 4
            let isFinal = this.status != 4
            if (isFinal) {
                if (this.canIOpenTheWindow.flag) {
                    this.projectFinaleVisible = isFinal
                    this.$nextTick(() => {
                        this.$refs.projectFinaleDialog.clearValidate()
                    })
                } else {
                    this.$message.error(`${this.canIOpenTheWindow.name}不能为空`)
                }
            } else {
                this.$nextTick(() => {
                    this.$refs.approveDailg.clearValidate()
                })
            }
            this.approveTitle = this.status == 4 ? '立项' : '终审'
        },
        validFormInfo (list) {
            const respTemp = this.approveForm.projectDocList[0].respRiskCheckDocTemplateList
            let res = ''
            for (let i = 0; i < respTemp.length; i++) {
                if (respTemp[i].mondatoryFlag == 1 && respTemp[i].riskCheckProjectDocPos.length == 0) {
                    res = respTemp[i]
                    break
                }
            }
            return res
        },
        onDownzip () {
            if (this.activeName == 3) {
                this.isDownLoad = true
            } else {
                this.isDownLoads = true
            }

            this.$emit('onBackDownzip')
        },
        async onSaveapproveOrfinal (val) {
            const projectDocList = this.approveForm.projectDocList
            let riskCheckProjectDocPoList = []
            let newriskCheckProjectDocPoList = []
            projectDocList && projectDocList.map(val => {
                val.respRiskCheckDocTemplateList.map(obj => {
                    newriskCheckProjectDocPoList = newriskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos)
                    if (obj.mondatoryFlag) {
                        riskCheckProjectDocPoList = riskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos)
                    }
                })
            })
            const params = {}
            params.bizType = this.status == 4 ? '2' : '3'
            params.projectId = this.approveForm.projectId
            params.riskCheckProjectDocPoList = newriskCheckProjectDocPoList
            let res = this.validFormInfo(riskCheckProjectDocPoList)
            if (res) {
                this.$message.error(`二级类目：${res.secondCatagoryName}，${res.formatName}必填！`)
                this.$emit('onBackLoad', false)
            } else {
                if (val == 2) {
                    params.submitStatus = this.approvedialgForm.submitStatus
                    params.remark = this.approvedialgForm.remark
                    this.$refs.approveDailg.validate(async (valid) => {
                        if (valid) {
                            try {
                                await submitProjectdoc(params)
                                this.$message.success(`${this.approveTitle}提交成功`)
                                this.$emit('onCompsback')
                                this.approveVisible = false
                                this.$emit('onBackLoad', false)
                            } catch (error) {
                                this.$emit('onBackLoad', false)
                            }
                        }
                    })
                } else {
                    try {
                        await saveProjectdoc(params)
                        this.$message.success(`${this.approveTitle}资料保存成功`)
                        this.$emit('onCompsback')
                        this.$emit('onBackLoad', false)
                    } catch (error) {
                        this.$emit('onBackLoad', false)
                    }
                }
            }
        },
        handleSuccessCb (row) {
            // console.log(row.riskCheckProjectDocPos)
            row.riskCheckProjectDocPos.map(item => {
                item.templateId = row.templateId
                item.createTime = item.createTime || moment().format('YYYY-MM-DD HH:mm:ss')
            })
        },
        onDelete (item, index) {
            console.log(item)
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                item.riskCheckProjectDocPos.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                // do nothing
            })
        },
        onColseApprove () {
            this.approvedialgForm.remark = ''
            this.approvedialgForm.submitStatus = ''
            this.approveVisible = false
        },
        onCloseProjectFinale () {
            this.projectFinaleForm = {
                submitStatus: '',
                transferBankRate: '',
                acceptBankRate: '',
                maxPurchaseAmount: '',
                advancePaymentRate: '',
                remainPaymentCycle: '',
                remark: '',
                reviewResolutionNo: ''
            }
            this.projectFinaleVisible = false
        },
        updateFinalStatus () {
            this.$refs.projectFinaleDialog.validate(async (valid) => {
                if (valid) {
                    try {
                        this.projectFinaleForm.id = this.approveForm.projectId
                        const projectDocList = this.approveForm.projectDocList
                        let riskCheckProjectDocPoList = []
                        projectDocList && projectDocList.map(val => {
                            val.respRiskCheckDocTemplateList.map(obj => {
                                obj.projectId = this.approveForm.projectId
                                riskCheckProjectDocPoList = riskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos)
                            })
                        })
                        riskCheckProjectDocPoList.forEach(value => {
                            value.projectId = this.approveForm.projectId
                        })
                        this.projectFinaleForm.riskCheckProjectDocPoList = riskCheckProjectDocPoList
                        console.log(this.projectFinaleForm)
                        await updateFinalStatus(this.projectFinaleForm)
                        this.$message.success(`项目终审提交成功`)
                        this.$emit('onCompsback')
                        this.$emit('onBackLoad', false)
                        this.onCloseProjectFinale()
                    } catch (error) {
                        this.$emit('onBackLoad', false)
                    }
                }
            })
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

// TODO: 这个导致弹出层最后一个form-item和底部之间没有空隙
// /deep/.el-form {
//     padding: 0;
// }
// TODO: 这个样式造成通过不通过按钮对齐有问题，看看删除会不会影响其他样式
// /deep/.el-form-item__content {
//     line-height: 24px;
// }
.collect-wrap {
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

        p {
            margin-bottom: 10px;
        }

        span {
            color: #ff7a45;
            font-size: 14px;
            margin-left: 10px;
        }
    }
}

.demo-ruleForm {
    margin-top: 20px;
}

.collect-title {
    font-size: 20px;
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 0;
    font-weight: bold;
}

.collect-box {
    display: flex;

    .el-checkbox {
        margin-right: 10px;
    }
}

.collect-boxtxt {
    h3 {
        padding: 30px 0 0 0;
        font-size: 16px;
        margin: 0;
    }

    i {
        color: #ff0000;
        vertical-align: middle;
        padding: 0 2px 0 0;
        font-style: normal;
    }

    p {
        font-size: 14px;
        margin: 0;
        padding: 16px 0 0 0;
        line-height: normal;
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
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 0 0;

    div {
        &:first-child {
            display: flex;
            flex: 5;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            white-space: nowrap;
        }

        &:nth-child(2) {
            display: flex;
            flex: 2;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            white-space: nowrap;
        }

        &:nth-child(3) {
            word-break: keep-all;
        }
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
    color: #ff7a45;
    display: flex;
    align-items: center;

    overflow: hidden;

    a {
        color: #ff7a45;
        margin-left: 10px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 10px;
        white-space: nowrap;
        display: flex;
    }

    font {
        font-size: 14px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 10px;
        white-space: nowrap;
        display: flex;
    }
}

.collect-Info {
    margin: 16px 0 0 0;

    &_result {
        font-size: 17px;

        i {
            font-style: normal;
            color: #ff7a45;
        }
    }

    p {
        display: flex;
        font-size: 14px;
        color: #666666;
        padding-top: 16px;
        align-items: center;
        margin-right: 30px;
    }
}
.crm-edit {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-left: 10px;
}
.approve_flex {
    display: flex;
    .star {
        color: red;
        font-size: 14px;
    }
}

.download {
    cursor: pointer;
}
</style>

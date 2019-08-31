<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form :model="formData" :rules="formRules" ref="form" label-position="right" label-width="150px">
                <el-form-item label="目标合伙人：" prop="targetPartner">
                    <el-input placeholder="请输入目标合伙人" maxlength="25" v-model="formData.targetPartner">
                    </el-input>
                </el-form-item>
                <el-form-item label="尽调公司名称：" prop="companyName">
                    <el-input placeholder="请输入尽调公司名称" maxlength="25" v-model="formData.companyName">
                    </el-input>
                </el-form-item>
                <el-form-item label="合作模式：" prop="cooperateType">
                    <el-radio-group v-model="formData.cooperateType">
                        <el-radio :label="0">现有模式</el-radio>
                        <el-radio :label="1">新合作模式</el-radio>
                        <el-tooltip effect="dark" content="新合作模式：拟合资公司操作新品类、股权结构等，和好享家规定的不同" placement="top-start">
                            <i class="el-icon-question"
                               style="padding-left: 7px;font-size: 14px;margin-left: -30px"></i>
                        </el-tooltip>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="" prop="newCooperateContent" v-if="formData.cooperateType == 1">
                    <el-input type="textarea" rows="4" placeholder="请说明新合作模式" class="remark"
                              v-model="formData.newCooperateContent">
                    </el-input>
                </el-form-item>
                <el-form-item label="主营业态：" prop="mainBusinessId">
                    <div class="flex-wrap-cont">
                        <el-select v-model="formData.mainBusinessId" placeholder="请选择" @change="selectGet">
                            <el-option v-for="item in busOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="主营品类：" prop="mainSystem">
                    <div class="flex-wrap-cont">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox :label="0">冷暖</el-checkbox>
                            <el-checkbox :label="1">新风</el-checkbox>
                            <el-checkbox :label="2">净水</el-checkbox>
                            <el-checkbox :label="3">智能</el-checkbox>
                            <el-checkbox :label="4">其他</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <el-form-item label="" prop="mainSystemOther" v-if="checkList.indexOf(4) != -1">
                    <el-input type="textarea" rows="4" placeholder="请详细说明" class="remark"
                              v-model="formData.mainSystemOther">
                    </el-input>
                </el-form-item>
                <el-form-item label="品牌：" prop="brand">
                    <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入品牌" maxlength="250"
                              v-model="formData.brand">
                    </el-input>
                </el-form-item>
                <el-form-item label="销售形式：" prop="salesType">
                    <el-radio-group v-model="formData.salesType">
                        <el-radio :label="0">线上</el-radio>
                        <el-radio :label="1">线下</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="合作目的：" prop="cooperateTarget">
                    <div class="flex-wrap-cont">
                        <div class="flex-wrap-cont">
                            <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入合作目的"
                                      v-model="formData.cooperateTarget" maxlength="250">
                            </el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="拟签约规模：" prop="signScale">
                    <div class="flex-wrap-cont">
                        <div class="flex-wrap-cont">
                            <el-input placeholder="请输入拟签约规模" maxlength="10" v-model="formData.signScale"
                                      @keyup.native="oninteger($event)">
                                <template slot="suffix">万</template>
                            </el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="备注：">
                    <div class="flex-wrap-cont">
                        <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入备注"
                                  v-model="formData.remark" width="30%">
                        </el-input>
                    </div>
                </el-form-item>
            </el-form>
            <el-form :model="formData" :rules="formRules" ref="attachmentsUrl" label-position="right"
                     label-width="150px">
                <el-form-item label="附件：" prop="attachmentsUrl">
                    <div class="flex-wrap-cont">
                        <el-upload class="upload-demo" v-bind="uploadInfo" :multiple="true" :on-success="handleSuccess"
                                   :before-remove="beforeRemove" :on-remove="handleRemove" :on-exceed="handleExceed"
                                   :file-list="fileList" :on-change="handleCheckedSize" :before-upload="handleUpload">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <p style="line-height: 16px;color: #666666;margin-top: 10px">
                                附件格式除视频类的、录音类的暂时不需支持外，其他附件格式都支持。常见的一些附件格式：jpg,jpeg,png,pdf,word,xsl,xlsx,ppt,必须支持,附件每个大小限制10M以内
                            </p>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <div class="query-cont-row">
            </div>
            <div class="flex-wrap-row">
                <el-col :span="2" :offset="6">
                    <el-button @click="onSave">暂存</el-button>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-col>
            </div>
        </div>
    </div>
</template>
<script>
import { fileUploadUrl } from '@/api/config'
import { adddueapply, getDueapplydetail, appDueapply, updateDueapply } from '../api/index'
import { mapState } from 'vuex'
import { plusOrMinus } from '@/utils/rules.js'
import { BUSINESS_OPTIONS } from './const.js'

export default {
    name: 'applyEdit',
    data () {
        return {
            formData: {
                targetPartner: '',
                companyName: '',
                cooperateType: '',
                newCooperateContent: '',
                mainBusinessName: '',
                mainBusinessId: '',
                mainSystem: '',
                mainSystemOther: '',
                brand: '',
                salesType: '',
                cooperateTarget: '',
                signScale: '',
                remark: '',
                attachmentsUrl: '',
                applyId: '',
                createUserName: '',
                organizationCode: ''
            },
            formRules: {
                targetPartner: [
                    { required: true, message: '请输入目标合伙人', trigger: 'blur' }
                ],
                companyName: [
                    { required: true, message: '请输入尽调公司名称', trigger: 'blur' }
                ],
                cooperateType: [
                    { required: true, message: '请选择合作模式', trigger: 'change' }
                ],
                newCooperateContent: [
                    { required: true, message: '请输入新合作模式说明', trigger: 'blur' }
                ],
                mainBusinessId: [
                    { required: true, message: '请选择主营业态', trigger: 'change' }
                ],
                mainSystem: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (this.checkList.length <= 0) {
                                return callback(new Error('请选择主营品类'))
                            }
                            return callback()
                        },
                        trigger: 'change'
                    }
                ],
                brand: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' }
                ],
                cooperateTarget: [
                    { required: true, message: '请输入合作目的', trigger: 'blur' }
                ],
                salesType: [
                    { required: true, message: '请选择销售形式', trigger: 'change' }
                ],
                signScale: [
                    { required: true, message: '请输入拟签约规模', trigger: 'blur' }
                ],
                mainSystemOther: [
                    { required: true, message: '请详细说明其他品类', trigger: 'blur' }
                ],
                attachmentsUrl: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (this.arrList.length <= 0) {
                                return callback(new Error('请上传附件'))
                            }
                            return callback()
                        },
                        trigger: 'change'
                    }
                ]
            },
            busOptions: BUSINESS_OPTIONS,
            fileList: [],
            arrList: [],
            applyId: '',
            approvalStatus: '',
            checkList: []
        }
    },
    mounted () {
        this.applyId = this.$route.query.id
        if (this.applyId) {
            this.getDueapplydetail(this.applyId)
        }
    },
    computed: {
        ...mapState({
            userdata: state => state.userdata,
            userInfo: state => state.userInfo
        }),
        uploadInfo () {
            return {
                action: fileUploadUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userdata.name
                },
                accept: '.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.xlsx,.xls,.ppt,.doc,.docx,.rar,.zip',
                name: 'multiFile'
            }
        },
        applyCompanyName () {
            if (this.$store.state.dueDiligence.applyCompanyName === '') {
                return localStorage.getItem('applyCompanyName')
            }
            return this.$store.state.dueDiligence.applyCompanyName
        }
    },
    methods: {
        oninteger (e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.formData.signScale = e.target.value
        },
        showWarnMsg (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            })
        },
        handleRemove (file, fileList) {
            const fileurl = file.response ? file.response.data.accessUrl : file.url
            this.arrList = this.arrList && this.arrList.filter(value =>
                value.url !== fileurl
            )
            this.$refs['attachmentsUrl'].validate(async (validate) => {
            })
        },
        handleSuccess (file) {
            if (file.code !== 200) {
                this.$confirm(file.message, '提示信息').catch(() => {
                })
            } else {
                let uploadedUrl = file.data.accessUrl
                let name = file.data.fileName
                this.arrList.push({ url: uploadedUrl, name: name })
                this.$refs.form.clearValidate('attachmentsUrl')
            }
            this.$refs['attachmentsUrl'].validate(async (validate) => {
            })
        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        beforeRemove (file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`).then(() => {

            })
        },
        handleCheckedSize (input, inputList) {
            // 判断是否符合要求
            if (input.size / (1024 * 1024) < 10) {
                this.is10M = false
            } else {
                this.is10M = true
            }
        },
        handleUpload (file) {
            // TODO: 目前只有一个文件,待优化
            if (this.is10M) {
                this.$message({
                    message: '建议不要超过10M',
                    type: 'warning'
                })
                return false
            }
        },
        async getDueapplydetail (applyId) {
            const { data } = await getDueapplydetail({ applyId: applyId })
            this.approvalStatus = data.data.approvalStatus
            if (this.approvalStatus > 0) {
                this.isdisabled = true
            }
            this.formData = data.data
            this.fileList = JSON.parse(this.formData.attachmentsUrl)
            this.arrList = JSON.parse(data.data.attachmentsUrl)
            if (this.formData.mainSystem) {
                this.formData.mainSystem.split(',').map(item => {
                    this.checkList.push(Number(item))
                })
            }
            if (this.formData.cooperateType === null) {
                this.formData.cooperateType = ''
            }
            if (this.formData.salesType === null) {
                this.formData.salesType = ''
            }
        },
        selectGet (vId) {
            let obj = {}
            obj = this.busOptions.find((item) => {
                return item.value === vId// 筛选出匹配数据
            })
            this.formData.mainBusinessName = obj.label
        },
        async onSave () {
            this.$refs['form'].clearValidate()
            this.$refs['attachmentsUrl'].clearValidate()
            this.formData.mainSystem = this.checkList.join(',')
            this.formData.attachmentsUrl = JSON.stringify(this.arrList)
            this.formData.organizationCode = this.userdata.organizationCode
            if (!this.formData.companyName) {
                this.showWarnMsg('请输入尽调公司名称')
                return false
            }
            if (this.applyId) {
                this.formData.applyId = this.applyId
                this.formData.updateUser = this.userInfo.jobNumber
                await updateDueapply(this.formData)
                this.$router.go(-1)
            } else {
                this.formData.createUser = this.userInfo.jobNumber
                await adddueapply(this.formData)
                this.$message({
                    showClose: true,
                    message: '暂存成功',
                    type: 'success'
                })
                this.$router.go(-1)
            }
        },
        async onSubmit () {
            this.$refs['attachmentsUrl'].validate(async (validate) => {
                if (validate) {
                    this.$refs['form'].validate(async (validate) => {
                        if (validate) {
                            this.formData.mainSystem = this.checkList.join(',')
                            this.formData.attachmentsUrl = JSON.stringify(this.arrList)
                            this.formData.createUserName = this.userdata.name
                            this.formData.createUser = this.userInfo.jobNumber
                            this.formData.organizationCode = this.userdata.organizationCode
                            if (this.applyId) {
                                this.formData.applyId = this.applyId
                                await appDueapply(this.formData)
                                this.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success'
                                })
                            } else {
                                await appDueapply(this.formData)
                                this.$message({
                                    showClose: true,
                                    message: '提交成功',
                                    type: 'success'
                                })
                            }
                            this.$router.go(-1)
                        }
                    })
                } else {
                    this.$refs['form'].validate()
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .remark {
        width: 598px;
    }

    .newcooperateType {
        margin-right: 10px;
    }

    .applyW {
        width: 30%;
    }

    .unit {
        margin: 0 0 0 12px;
    }

    /*主题内容*/

    /*flex  横布局*/
    .flex-wrap-row {
        display: flex;
    }
    /deep/ .el-upload{
        text-align: left;
    }
</style>

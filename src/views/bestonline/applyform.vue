<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="page-header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>尽调管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:'/bestonline/application'}">尽调申请</el-breadcrumb-item>
                    <el-breadcrumb-item>{{applyCompanyName}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="applyform">
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box applyW">
                        <div class="flex-wrap-title"><span class="red-span">*</span>目标合伙人：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                placeholder="请输入目标合伙人"
                                maxlength="25"
                                v-model="formData.targetPartner"
                                :disabled='isdisabled'
                            >
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box applyW">
                        <div class="flex-wrap-title"><span class="red-span">*</span>尽调公司名称：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                placeholder="请输入尽调公司名称"
                                maxlength="25"
                                v-model="formData.companyName"
                                :disabled='isdisabled'
                            >
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box applyW">
                        <div class="flex-wrap-title"><span class="red-span">*</span>主营业务：</div>
                        <div class="flex-wrap-cont">
                            <el-select
                                v-model="formData.mainBusinessId"
                                placeholder="请选择"
                                @change="selectGet"
                                :disabled='isdisabled'
                            >
                                <el-option
                                    v-for="item in busOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box applyW">
                        <div class="flex-wrap-title"><span class="red-span">*</span>拟签约规模：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                placeholder="请输入拟签约规模"
                                maxlength="25"
                                v-model="formData.signScale"
                                @keyup.native="oninteger($event)"
                                :disabled='isdisabled'
                            >
                                <template slot="suffix">万</template>
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box ">
                        <div class="flex-wrap-title">备注：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="4"
                                :disabled="isdisabled"
                                placeholder="请输入备注"
                                v-model="formData.remark"
                                maxlength="250"
                            >
                            </el-input>
                        </div>
                    </div>
                </div>
                <div
                    class="flex-wrap-col"
                    style="margin-bottom:110px"
                >
                    <div class="flex-wrap-box ">
                        <div class="flex-wrap-title"><span class="red-span">*</span>附件：</div>
                        <div
                            class="flex-wrap-cont"
                            v-show='!isdisabled'
                        >
                            <el-upload
                                class="upload-demo"
                                v-bind="uploadInfo"
                                :on-success="handleSuccess"
                                :before-remove="beforeRemove"
                                :on-remove="handleRemove"
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                                :on-change="handleCheckedSize"
                                :before-upload="handleUpload"
                            >
                                <el-button
                                    size="small"
                                    type="primary"
                                >点击上传</el-button>
                                <div
                                    slot="tip"
                                    class="el-upload__tip"
                                >附件格式除视频类的、录音类的暂时不需支持外，其他附件格式都支持。常见的一些附件格式：jpg,jpeg,png,pdf,word,xsl,xlsx,ppt,必须支持,附件每个大小限制10M以内</div>
                            </el-upload>
                        </div>
                        <div
                            class="cont"
                            v-show='isdisabled'
                        >
                            <div v-if="fileList.length === 0">暂无附件</div>
                            <p
                                v-else
                                class="upload"
                                v-for="(item,index) in fileList"
                                :key="index"
                            > <a
                                    :href="item.url"
                                    target="_blank"
                                >{{item.name}}</a></p>
                        </div>
                    </div>

                </div>
                <div class="page-body-bottom">
                    <div
                        class="flex-wrap-row"
                        v-show='!isdisabled'
                    >
                        <el-col
                            :span="2"
                            :offset="6"
                        >
                            <el-button @click="onSave">保存</el-button>
                        </el-col>
                        <el-col
                            :span="2"
                            :offset="1"
                        >
                            <el-button
                                type="primary"
                                @click="onSubmit"
                            >提交</el-button>
                        </el-col>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { FileUploadUrl } from '@/api/config'
import { adddueapply, getDueapplydetail, appDueapply, updateDueapply } from './api/index'
import { mapState } from 'vuex'
import { plusOrMinus } from '../../utils/rules.js'
export default {
    name: 'applyform',
    data () {
        return {
            formData: {
                attachmentsUrl: '',
                companyName: '',
                mainBusinessId: '',
                mainBusinessName: '',
                remark: '',
                signScale: '',
                targetPartner: '',
                applyId: '',
                createUserName: '',
                organizationCode: ''
            },
            busOptions: [{
                value: '',
                label: '请选择'
            }, {
                value: '0',
                label: '零售为主，批发、工程为辅'
            }, {
                value: '1',
                label: '零售为主，批发为辅'
            }, {
                value: '2',
                label: '零售为主，工程为辅'
            }, {
                value: '3',
                label: '批发为主，零售、工程为辅'
            }, {
                value: '4',
                label: '批发为主，零售为辅'
            }, {
                value: '5',
                label: '批发为主，工程为辅'
            }, {
                value: '6',
                label: '工程为主，零售、批发为辅'
            }, {
                value: '7',
                label: '工程为主，批发为辅'
            }, {
                value: '8',
                label: '工程为主，零售为辅'
            }
            ],
            fileList: [],
            arrList: [],
            applyId: '',
            is10M: false,
            approvalStatus: '',
            isdisabled: false
        }
    },
    mounted () {
        this.applyId = this.$route.query.applyId
        if (this.applyId) {
            this.getDueapplydetail(this.applyId)
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadInfo () {
            return {
                action: FileUploadUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.name
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
            // this.arrList = []
            // fileList.map(value => {
            //     let uploadedUrl = value.url
            //     let name = value.name
            //     this.arrList.push({ url: uploadedUrl, name: name })
            // })
        },
        handleSuccess (file) {
            if (file.code !== 200) {
                this.$confirm(file.message, '提示信息').catch(() => { })
            } else {
                let uploadedUrl = file.data.accessUrl
                let name = file.data.fileName
                this.arrList.push({ url: uploadedUrl, name: name })
            }
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
            this.formData.companyName = data.data.companyName
            this.formData.mainBusinessId = data.data.mainBusinessId
            this.formData.remark = data.data.remark
            this.formData.targetPartner = data.data.targetPartner
            this.formData.signScale = data.data.signScale
            this.formData.attachmentsUrl = data.data.attachmentsUrl
            this.fileList = JSON.parse(this.formData.attachmentsUrl)
            this.arrList = JSON.parse(data.data.attachmentsUrl)
        },
        selectGet (vId) {
            let obj = {}
            obj = this.busOptions.find((item) => {
                return item.value === vId// 筛选出匹配数据
            })
            this.formData.mainBusinessName = obj.label
        },
        async  onSave () {
            this.formData.attachmentsUrl = JSON.stringify(this.arrList)
            this.formData.organizationCode = this.userInfo.organizationCode
            if (!this.formData.companyName) {
                this.showWarnMsg('请输入公司名称')
                return false
            }
            if (this.applyId) {
                this.formData.applyId = this.applyId
                this.formData.updateUser = this.userInfo.name
                await updateDueapply(this.formData)
                this.$router.go(-1)
            } else {
                this.formData.createUser = this.userInfo.name
                await adddueapply(this.formData)
                this.$message({
                    showClose: true,
                    message: '保存成功',
                    type: 'success'
                })
                this.$router.go(-1)
            }
        },
        async  onSubmit () {
            this.formData.attachmentsUrl = JSON.stringify(this.arrList)
            this.formData.createUserName = this.userInfo.name
            this.formData.createUser = this.userInfo.uid
            this.formData.organizationCode = this.userInfo.organizationCode
            // this.formData.createUser = 'dce5239f-0829-487f-9903-c0a0d16380ed'
            if (!this.formData.targetPartner) {
                this.showWarnMsg('请输入目标合伙人')
                return false
            }
            if (!this.formData.companyName) {
                this.showWarnMsg('请输入公司名称')
                return false
            }
            if (this.formData.mainBusinessId === '') {
                this.showWarnMsg('请选择主营业务')
                return false
            }
            if (!this.formData.signScale) {
                this.showWarnMsg('请输入签约规模')
                return false
            }
            if (this.arrList.length === 0) {
                this.showWarnMsg('请上传附件')
                return false
            }
            if (this.applyId) {
                this.formData.applyId = this.applyId
                // this.formData.createUser = dce5239f-0829-487f-9903-c0a0d16380ed'
                await appDueapply(this.formData)
                this.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success'
                })
            } else {
                // this.formData.createUser = 'dce5239f-0829-487f-9903-c0a0d16380ed'
                await appDueapply(this.formData)
                this.$message({
                    showClose: true,
                    message: '提交成功',
                    type: 'success'
                })
            }
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" >
a {
    text-decoration: none;
    color: #333333;
}
.applyform {
    padding: 0px;
    background: #ffffff;
}
.applyW {
    width: 30%;
}
textarea {
    border: 1px solid #dcdfe6;
}
/deep/ .el-input__suffix {
    line-height: 40px;
}
.el-input.is-disabled .el-input__inner,
.el-textarea.is-disabled .el-textarea__inner {
    border: 0;
    background: transparent;
}
.el-input.is-disabled .el-input__inner:hover,
.el-textarea.is-disabled .el-textarea__inner:hover {
    cursor: default;
}
.el-input.is-disabled .el-input__icon {
    display: none;
}
.el-input.is-disabled .el-input__icon:hover {
    cursor: default;
}
.el-input.is-disabled .el-input__inner,
.el-textarea.is-disabled .el-textarea__inner {
    outline: none;
    resize: none;
    color: #353638;
}
.el-input__suffix {
    line-height: 40px;
}
.el-input--prefix .el-input__inner {
    padding-left: 15px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: auto;
}
.page-body-bottom {
    margin-top: 25px;
}
input:disabled {
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity: 1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638; // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
textarea:disabled {
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity: 1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638; // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
select:disabled {
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity: 1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638; // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
input:disabled::-webkit-input-placeholder {
    color: #cccccc;
    -webkit-text-fill-color: #ccc;
    opacity: 0.8;
    -webkit-opacity: 0.8;
}
textarea:disabled::-webkit-input-placeholder {
    color: #cccccc;
    -webkit-text-fill-color: #ccc;
    opacity: 0.8;
    -webkit-opacity: 0.8;
}
select:disabled::-webkit-input-placeholder {
    color: #cccccc;
    -webkit-text-fill-color: #ccc;
    opacity: 0.8;
    -webkit-opacity: 0.8;
}

</style>

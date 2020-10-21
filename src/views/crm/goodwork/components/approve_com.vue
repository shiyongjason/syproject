<template>
    <div class="collect-wrap">
        <el-form :model="approveForm" ref="approveForm" class="demo-ruleForm">
            <div class="collect-Info" v-if="(activeName=='3'&&status!=4)||(activeName=='4'&&status!=11)">
                <el-form-item :label="approveTitle+'结果：'">
                    {{approveForm.approveResult==true?'通过':approveForm.approveResult==false?'不通过':'-'}}
                </el-form-item>
                <el-form-item label="说明：">
                    {{approveForm.remark?approveForm.remark:'-'}}
                </el-form-item>
            </div>
            <div class="collect-wrapbox" v-for="item in approveForm.projectDocList" :key="item.firstCatagoryId">
                <div class="collect-title">{{item.firstCatagoryName}}</div>
                <template v-for="obj in item.respRiskCheckDocTemplateList">
                    <el-form-item label="" prop="type" :key="'item'+obj.templateId">
                        <div class="collect-box">
                            <div class="collect-boxtxt">
                                <h3><i v-if="obj.mondatoryFlag">*</i>{{obj.secondCatagoryName}}</h3>
                                <p>备注：{{obj.remark?obj.remark:'-'}}</p>
                                <p>规定格式：{{obj.formatName}}</p>
                            </div>
                        </div>
                        <div class="upload-file_list" v-for="(jtem,index) in obj.riskCheckProjectDocPos" :key="index">
                            <div>
                                <span class="posrtv">
                                    <template v-if="jtem&&jtem.fileUrl">
                                        <i class="el-icon-document"></i>
                                        <a :href="jtem.fileUrl" target="_blank">
                                            <font>{{jtem.fileName}}</font>
                                        </a>
                                    </template>
                                </span>
                            </div>
                            <div>{{moment(jtem.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                            <div>
                                <font class="fileItemDownLoad" @click="()=>{onDelete(obj,index)}" v-if="(activeName=='3'&&status==4)||(activeName=='4'&&status==11)">删除</font>
                                <!-- <font class="fileItemDownLoad" v-if="jtem.fileName.toLowerCase().indexOf('.png') != -1||jtem.fileName.toLowerCase().indexOf('.jpg') != -1||jtem.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(jtem.fileUrl, jtem.fileName)">下载</font> -->
                                <a class="fileItemDownLoad" :href="jtem.fileUrl+'?response-content-type=application/octet-stream'" :download="jtem.fileName"
                                    v-if="jtem.fileName.toLowerCase().indexOf('.png') != -1||jtem.fileName.toLowerCase().indexOf('.jpg') != -1||jtem.fileName.toLowerCase().indexOf('.jpeg') != -1">
                                    下载
                                </a>
                                <font v-else><a class='fileItemDownLoad' :href="jtem.fileUrl" target='_blank'>下载</a></font>
                            </div>
                        </div>
                        <hosjoyUpload v-if="(activeName=='3'&&status==4)||(activeName=='4'&&status==11)" v-model="obj.riskCheckProjectDocPos" :showPreView=false :fileSize=20 :fileNum=100 :limit=100 :action='action' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb(obj)}"
                            style="margin:10px 0 0 5px">
                            <h-button>上传</h-button>
                        </hosjoyUpload>
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
    </div>
</template>
<script>
import moment from 'moment'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { submitProjectdoc, saveProjectdoc } from '../api/index'
import { handleImgDownload } from '../../projectInformation/utils'
export default {
    name: 'approvecom',
    props: {
        approveForm: {
            type: Object,
            default: () => { }
        },
        activeName: {
            type: String,
            default: ''
        },
        status: {
            type: Number,
            default: 0
        }
    },
    components: {
        hosjoyUpload
    },
    data () {
        return {

            moment,
            handleImgDownload,
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            approveTitle: '',
            approveVisible: false,
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
            }
        }
    },
    mounted () {

    },
    methods: {
        onShowApprove () {
            this.approveVisible = true
            this.approveTitle = this.status == 4 ? '立项' : '终审'
        },
        validFormInfo (list) {
            const respTemp = this.approveForm.projectDocList[0].respRiskCheckDocTemplateList
            console.log(list, respTemp)
            let res = ''
            for (let i = 0; i < respTemp.length; i++) {
                if (respTemp[i].mondatoryFlag == 1 && respTemp[i].riskCheckProjectDocPos.length == 0) {
                    res = respTemp[i]
                    break
                }
            }
            return res
        },
        async  onSaveapproveOrfinal (val) {
            const projectDocList = this.approveForm.projectDocList
            console.log(projectDocList)
            let riskCheckProjectDocPoList = []
            let newriskCheckProjectDocPoList = []
            projectDocList && projectDocList.map(val => {
                val.respRiskCheckDocTemplateList.map(obj => {
                    newriskCheckProjectDocPoList = newriskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos)
                    if (obj.mondatoryFlag) { riskCheckProjectDocPoList = riskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos) }
                })
            })
            const params = {}
            params.bizType = this.status == 4 ? '2' : '3'
            params.projectId = this.approveForm.projectId
            params.riskCheckProjectDocPoList = newriskCheckProjectDocPoList
            let res = this.validFormInfo(riskCheckProjectDocPoList)
            console.log(1, res)
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
                                this.$message.success(`立项提交成功`)
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
                        this.$message.success(`立项资料保存成功`)
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
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/.el-form {
    padding: 0;
}
.collect-wrap {
    padding: 0 10px 100px 10px;
    margin-left: 15px;
}
.collect-title {
    font-size: 20px;
    line-height: 45px;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 10px;
    font-weight: bold;
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
.collect-boxtxt {
    i {
        color: #ff0000;
        vertical-align: middle;
        padding: 0 2 0 0px;
        font-style: normal;
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
            flex: 2;
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
</style>
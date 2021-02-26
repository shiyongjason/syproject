<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="contract-flex">
                <div>
                    <h-button type="primary">下载原始合同</h-button>
                </div>
                <p>这个合同.jpg</p>
                <p>这个合同.jpg</p>
                <div class="contract-flex_bot">
                    <h-button type="primary" @click="onResive">驳回合同</h-button>
                </div>
            </div>
            <div class="contract-flex">
                <div>
                    <hosjoyUpload :fileSize=20 :fileNum=100 :limit=100 v-model="contractList" :showPreView=false :action='action' :uploadParameters='uploadParameters' @successCb='()=>{handleSuccessCb(contractList)}'>
                        <h-button type="primary">上传合同</h-button>
                    </hosjoyUpload>
                </div>
                <div class="contract-flex_tips">（请先点击上方“下载原始合同”，下载后在本地进行编辑修订，修订完成后在此上传，上传格式为.doc/.docx/.xls/.xlsx/.pdf等格式)</div>
                <div v-for="(item,index) in contractList" :key="index" class="contract-flex_preview">
                    <div class="preview_name">合同：</div>
                    {{item.fileName}}
                    <a class="preview_btn" :href="item.fileUrl" target='_blank'>预览</a>
                    <div class="preview_btn" @click="onDelect(index)">删除</div>
                </div>

                <div class="contract-flex_bot">
                    <h-button type="primary" @click="onSubmitApprove" :disabled='contractList.length<1'>提交修订</h-button>
                </div>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <span v-if="type==1">提交后，即分财(风控/法务)审核通过，确定此操作吗？</span>
                <span v-else>驳回后，即分财(风控/法务)审核不通过，确定此操作吗？</span>
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="意见" prop="approvalRemark" ref="approval_Remark">
                        <el-input type="textarea" :rows="4" v-model="form.approvalRemark" maxlength="100"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmitMsg">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { ccpBaseUrl } from '@/api/config'
import { mapState } from 'vuex'
import { submitApprove, rejectContracts } from './api/index'
export default {
    name: 'noTemp',
    components: { hosjoyUpload },
    data () {
        return {
            action: ccpBaseUrl + 'common/files/upload-old',
            // 上传时附带的额外参数同el-upload 的 data
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            contractList: [],
            approval_Remark: '',
            form: {
                'contractId': this.$route.query.id,
                'approver': '',
                "approverRole": this.$route.query.role,
                "approvalRemark": '',
                'picUrls': [
                ]
            },
            dialogVisible: false,
            rules: {
                approvalRemark: [
                    { required: true, message: '请输入意见' }
                ]
            },
            type: 1
        }
    },
    watch: {

    },
    methods: {
        handleSuccessCb (row) {
            console.log(row)
        },
        onResive () {
            this.type = 1
            this.dialogVisible = true
        },
        handleClose () {
            this.dialogVisible = false
        },
        onDelect (index) {
            this.contractList = this.contractList.splice(1, index)
        },
        onSubmitMsg () {
            // 驳回合同
            const parms = {
                'contractId': this.$route.query.id,
                'approver': this.userInfo.employeeName,
                "approverRole": this.$route.query.role,
                "approvalRemark": this.form.approvalRemark,
            }
            // rejectContracts(parms)
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    await rejectContracts(this.form)
                    this.$message({
                        message: '当前合同已被驳回！',
                        type: 'success'
                    });
                    this.$router.push('/goodwork/contractSigningManagement')
                } else {

                }
            })
        },
        async onSubmitApprove () {
            this.type = 2
            this.dialogVisible = true
            // this.form.approver = this.userInfo.employeeName
            // this.contractList.map(item => {
            //     this.form.picUrls.push({
            //         picUrl: item.fileUrl,
            //         picName: item.fileName
            //     })
            // })
            // this.$refs.ruleForm.validate(async (valid) => {
            //     if (valid) {
            //         await submitApprove(this.form)
            //         this.$router.push('/goodwork/contractSigningManagement')
            //         console.log(this.form)
            //     } else {

            //     }
            // })

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {

    }
}
</script>
<style lang="scss" scoped>
.contract-flex {
    margin-bottom: 10px;
    display: flex;
    width: 60%;
    background: #f5f5f5;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    box-sizing: 10px 10px 5px #efefee;
    &_tips {
        color: #f00;
    }
    p {
        margin-top: 5px;
    }
    &_bot {
        display: flex;
        justify-content: flex-end;
    }
    &_preview {
        display: flex;
        margin-top: 10px;
    }
    .preview_btn {
        color: #ff7a45;
        margin-left: 20px;
        cursor: pointer;
    }
    .preview_name {
        color: #000;
    }
}
</style>

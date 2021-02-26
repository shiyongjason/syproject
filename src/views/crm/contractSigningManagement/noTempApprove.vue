<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="contract-flex">
                <div>
                    <h-button type="primary">下载合同</h-button>
                </div>
                <p>这个合同.jpg</p>
                <p>这个合同.jpg</p>
                <div class="contract-flex_bot">
                    <h-button type="primary" @click="onResive">驳回</h-button>
                </div>
            </div>
            <div class="contract-flex">
                <div>
                    <hosjoyUpload :fileSize=20 :fileNum=100 :limit=100 v-model="contractList" :showPreView=false :action='action' :uploadParameters='uploadParameters' @successCb='()=>{handleSuccessCb(contractList)}'>
                        <h-button type="primary">上传合同</h-button>
                    </hosjoyUpload>
                </div>
                {{contractList}}
                <div v-for="(item,index) in contractList" :key="index" class="contract-flex_preview">{{item.fieldName}}
                    <div>预览</div>
                    <div>下载</div>
                </div>

                <div class="contract-flex_bot">
                    <h-button type="primary" @click="onSubmitApprove">提交修订</h-button>
                </div>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <span>提交后，即分财(风控/法务)审核通过，确定此操作吗？</span>
                <span>驳回后，即分财(风控/法务)审核不通过，确定此操作吗？</span>
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="意见" prop="approval_Remark">
                        <el-input type="textarea" :rows="2" v-model="approval_Remark" maxlength="100"></el-input>
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
                reservedName: false
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
                approval_Remark: [
                    { required: true, message: '123123', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        handleSuccessCb (row) {
            console.log(row)
        },
        onResive () {
            this.dialogVisible = true
        },
        handleClose () {
            this.dialogVisible = false
        },
        onSubmitMsg () {

            const parms = {
                'contractId': this.$route.query.id,
                'approver': this.userInfo.employeeName,
                "approverRole": this.$route.query.role,
                "approvalRemark": this.approval_Remark,
            }
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    await rejectContracts(this.form)

                } else {

                }
            })
        },
        async onSubmitApprove () {
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
    p {
        margin-top: 5px;
    }
    &_bot {
        display: flex;
        justify-content: flex-end;
    }
    &_preview {
        display: flex;
        justify-content: center;
    }
}
</style>

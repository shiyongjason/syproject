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
                    <h-button type="primary">驳回</h-button>
                </div>
            </div>
            <div class="contract-flex">
                <div>
                    <hosjoyUpload :fileSize=20 :fileNum=100 :limit=100 v-model="contractList" :showPreView=false :action='action' :uploadParameters='uploadParameters' @successCb='()=>{handleSuccessCb(contractList)}'>
                        <h-button type="primary">上传合同</h-button>
                    </hosjoyUpload>
                </div>
                <div class="contract-flex_preview">这个合同.jpg</div>
                <div class="contract-flex_preview">这个合同.jpg</div>
                <div class="contract-flex_bot">
                    <h-button type="primary" @click="onSubmitApprove">提交修订</h-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { ccpBaseUrl } from '@/api/config'
import { mapState } from 'vuex'
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
            }
        }
    },
    methods: {
        handleSuccessCb (row) {
            console.log(row)
        },
        onSubmitApprove () {
            this.form.approvalRemark = this.approval_Remark
            this.form.approver = this.userInfo.employeeName
            this.contractList.map(item => {
                this.form.picUrls.push({
                    picUrl: item.fileUrl,
                    picName: item.fileName
                })
            })
            console.log(this.form)
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
}
</style>

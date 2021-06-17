<template>
    <div>
        <el-dialog title="上传支付凭证" :visible.sync="dialogVisible" width="45%" :before-close="handleClose">
            <div class="uploadpay">
                <p>应支付金额：120,000 元</p>
                <p class="uploadpay_second"><i>*</i>支付凭证：</p>
                <p class="uploadpay_third">（请上传JPG/PNG/JPEG等主流图片格式，最多上传9张，单张大小不得超过20M）</p>
                <HosJoyUpload v-model="attachDocs" :showPreView=true :fileSize=20 :action='action' :fileNum='9' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb()}" accept='.jpg,.png,jpeg' style="margin:10px 0 0 5px">
                </HosJoyUpload>
                <div class="uploadpay_bot">当前经销商还有3条待支付账单，你可能想<b @click="onAllPay">“批量支付”</b>？</div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSavePay">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { ccpBaseUrl } from '@/api/config'
import { payVoucher, getBnumber } from '../api/index'
export default {
    name: 'uploadPay',
    components: { HosJoyUpload },
    data () {
        return {
            dialogVisible: false,
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            attachDocs: [],
            fundId: '',
            companyId: ''
        }
    },
    methods: {
        async onDialogClick (val) {
            console.log(val)
            const { data } = await getBnumber({ companyId: val.companyId })
            this.dialogVisible = true
            this.fundId = val.id
            this.companyId = val.companyId
        },
        handleClose () {
            this.dialogVisible = false
            this.attachDocs = []
        },
        handleSuccessCb () {

        },
        onAllPay () {
            this.$router.push({ path: '/goodwork/batchpay', query: { companyId: this.companyId } })
        },
        async onSavePay () {
            const params = {
                fundId: this.fundId,
                attachDocs: this.attachDocs
            }
            await payVoucher(params)
        }
    }
}
</script>
<style scoped lang="scss">
.uploadpay {
    p {
        margin-bottom: 10px;
        i {
            color: red;
        }
    }
    &_second{
        font-size: 16px;
    }
    &_third{
        color: #909399;
    }
    b{
        color: skyblue;
        cursor: pointer;
    }
}
.uploadpay_bot {
    margin-top: 20px;
}
</style>
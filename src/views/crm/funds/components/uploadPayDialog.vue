<template>
    <div>
        <el-dialog title="上传支付凭证" :visible.sync="dialogVisible" width="45%" :before-close="handleClose" :modal-append-to-body="false">
            <div class="uploadpay">
                <p>应支付金额：{{payMoney|fundMoneyHasTail}} 元</p>
                <p class="uploadpay_second"><i>*</i>支付凭证：</p>
                <p class="uploadpay_third">（请上传JPG/PNG/JPEG等主流图片格式，最多上传9张，单张大小不得超过20M）</p>
                <HosJoyUpload v-model="attachDocs" :showPreView=true :fileSize=20 :action='action' :fileNum='9' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb()}" accept='.jpg,.png,jpeg' style="margin:10px 0 0 5px">
                </HosJoyUpload>
                <div v-if="batchNumber>0" class="uploadpay_bot">当前经销商还有{{batchNumber}}条待支付账单，你可能想<b @click="onAllPay">“批量支付”</b>？</div>
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
import { payVoucher, getBnumber, payOrderVoucher } from '../api/index'
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
            companyId: '',
            batchNumber: '',
            payMoney: 0,
            type: 2
        }
    },
    methods: {
        async onDialogClick (val, source, fundMoney) {
            console.log(val)
            this.attachDocs = []
            const { data } = await getBnumber({ companyId: val.companyId })
            this.batchNumber = data
            this.dialogVisible = true
            this.fundId = val.id
            this.companyId = val.companyId
            this.payMoney = source == 1 ? fundMoney : val.applyAmount ? val.applyAmount : val.paymentAmount
            this.type = source || this.type
        },
        handleClose () {
            this.dialogVisible = false
            this.attachDocs = []
        },
        handleSuccessCb () {

        },
        onAllPay () {
            this.dialogVisible = false
            this.$router.push({ path: '/goodwork/batchpay', query: { companyId: this.companyId } })
        },
        async onSavePay () {
            if (this.attachDocs.length == 0) {
                this.$message.warning('请上传支付凭证！')
                return
            }

            this.dialogVisible = false
            console.log(this.type)
            if (this.type == 2) {
                const params = {
                    fundId: this.fundId,
                    attachDocs: this.attachDocs,
                    companyId: this.companyId
                }
                await payVoucher(params)
                this.$message.success('上传成功')
                this.$emit('onBackSearch')
            } else {
                const params = {
                    paymentOrderId: this.fundId,
                    attachDocs: this.attachDocs,
                    companyId: this.companyId
                }
                await payOrderVoucher(params)
                this.$message.success('上传成功')
                this.$emit('onBackSearch')
            }
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
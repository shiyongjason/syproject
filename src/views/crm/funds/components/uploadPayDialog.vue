<template>
    <div>
        <el-dialog title="上传支付凭证" :visible.sync="dialogVisible" width="45%" :before-close="handleClose">
            <div class="uploadpay">
                <template v-if="repaymentType == 2 || repaymentType == 3">
                    <p>剩余应支付金额：{{unpaidAmount|moneyFormat}} 元</p>
                    <el-form :model="uploadpayForm" :rules="rules" ref="uploadpayForm" label-width="130px">
                        <el-form-item label="本次支付金额：" prop="paidAmount">
                            <!-- unpaidAmount-inputMAX指令金额不刷新问题 -->
                            <el-input v-if="unpaidAmount" v-model.trim="uploadpayForm.paidAmount" v-isNum:2="uploadpayForm.paidAmount" placeholder="请输入" maxlength="50" v-inputMAX='unpaidAmount'><template slot="append">元</template></el-input>
                            <span style="width:50px;height:50px;text-align:center;margin-left:10px;color:#13C2C2" @click="handleAll">全部</span>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-else>
                    <p>本次支付金额：{{unpaidAmount|moneyFormat}} 元</p>
                    <p>应支付金额：{{payMoney|moneyFormat}} 元</p>
                </template>
                <p class="uploadpay_second"><i>*</i>支付凭证：<span class="uploadpay_third">（请上传JPG/PNG/JPEG等主流图片格式，最多上传9张，单张大小不得超过20M）</span></p>
                <HosJoyUpload v-model="attachDocs" :showPreView=true :fileSize=20 :action='action' :fileNum='9' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb()}" accept='.jpg,.png,jpeg'>
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
import { payVoucher, getBnumber, payOrderVoucher, updateRemainPayment } from '../api/index'
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
            unpaidAmount: 0,
            repaymentType: '', // 账单类型  2==剩余货款
            type: 2, // 1 = 支付单 2 = 账单
            rules: {
                paidAmount: [
                    { required: true, validator: this.validatorPaidAmount, trigger: 'blur' }
                ]
            },
            uploadpayForm: { paidAmount: '' }
        }
    },
    methods: {
        async onDialogClick (val, source, fundMoney) {
            console.log(val, source, fundMoney)
            this.attachDocs = []
            this.unpaidAmount = 0
            const { data } = await getBnumber({ companyId: val.companyId })
            this.unpaidAmount = val.unpaidAmount || 0
            if (val.unpaidAmount == 0) {
                this.isZero = true
            } else {
                this.isZero = false
            }
            this.batchNumber = data
            this.dialogVisible = true
            this.fundId = val.id
            this.companyId = val.companyId
            this.payMoney = source == 1 ? fundMoney : val.applyAmount ? val.applyAmount : val.paymentAmount
            this.type = source || this.type
            this.repaymentType = val.repaymentType
            this.uploadpayForm.paidAmount = ''
            this.$nextTick(() => {
                this.$refs.uploadpayForm && this.$refs.uploadpayForm.clearValidate()
            })
        },
        // 校验本次金额不能输入0
        validatorPaidAmount (rule, value, callback) {
            if (!value) {
                return callback(new Error('请输入本次支付金额'))
            } else {
                if (value == 0) {
                    return callback(new Error('请输入本次支付金额'))
                } else {
                    callback()
                }
            }
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
        handleAll () {
            this.uploadpayForm.paidAmount = this.unpaidAmount
        },
        async onSavePay () {
            if (this.type == 2) {
                // 如果是剩余货款 先进行本次金额校验
                if (this.repaymentType == 2 || this.repaymentType == 3) {
                    this.$refs.uploadpayForm.validate(async valid => {
                        if (valid) {
                            if (this.attachDocs.length > 0) {
                                const params = {
                                    fundId: this.fundId,
                                    urlList: this.attachDocs,
                                    paidAmount: this.uploadpayForm.paidAmount,
                                    createPhone: JSON.parse(sessionStorage.getItem('userInfo')).phoneNumber,
                                    createBy: JSON.parse(sessionStorage.getItem('userInfo')).employeeName
                                }
                                await updateRemainPayment(params)
                                this.$message.success('支付凭证上传成功')
                                this.$emit('onBackSearch')
                                this.dialogVisible = false
                            } else {
                                this.$message.warning('请上传支付凭证！')
                            }
                        }
                    })
                } else {
                    const params = {
                        fundId: this.fundId,
                        attachDocs: this.attachDocs,
                        companyId: this.companyId
                    }
                    if (this.attachDocs.length == 0) {
                        this.$message.warning('请上传支付凭证！')
                        return
                    }
                    await payVoucher(params)
                    this.$message.success('上传成功')
                    this.$emit('onBackSearch')
                    this.dialogVisible = false
                }
            } else {
                if (this.attachDocs.length == 0) {
                    this.$message.warning('请上传支付凭证！')
                    return
                }
                const params = {
                    fundId: this.fundId,
                    attachDocs: this.attachDocs,
                    companyId: this.companyId
                }
                await payVoucher(params)
                this.$message.success('上传成功')
                this.$emit('onBackSearch')
                this.dialogVisible = false
            }
        }
    }
}
</script>
<style scoped lang="scss">
.uploadpay {
    p {
        margin-bottom: 5px;
        i {
            color: red;
            padding: 0 3px 0 10px;
            font-style: normal;
        }
    }
    &_second {
        font-size: 16px;
    }
    &_third {
        color: #909399;
        font-size: 14px;
    }
    b {
        color: skyblue;
        cursor: pointer;
    }
}
.uploadpay_bot {
    margin-top: 20px;
}
</style>
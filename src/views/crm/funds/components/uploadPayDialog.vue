<template>
    <div>
        <el-dialog title="上传支付凭证" :visible.sync="dialogVisible" width="45%" :before-close="handleClose">
            <div class="uploadpay">
                <el-form :model="uploadpayForm" :rules="rules" ref="uploadpayForm" label-width="140px">
                    <div v-if="repaymentType == 2 || repaymentType == 3">
                        <el-form-item label="剩余应支付金额：">
                            {{unpaidAmount|moneyFormat}} 元
                        </el-form-item>
                        <el-form-item label="本次支付金额：" prop="paidAmount" key="paidAmount">
                            <!-- unpaidAmount-inputMAX指令金额不刷新问题 -->
                            <el-input v-model="uploadpayForm.paidAmount" v-isNum:2="uploadpayForm.paidAmount" placeholder="请输入" maxlength="50" v-inputMAX='unpaidAmount'><template slot="append">元</template></el-input>
                            <span style="width:50px;height:50px;text-align:center;margin-left:10px;color:#13C2C2" @click="handleAll">全部</span>
                        </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item label="本次支付金额：">
                            {{payMoney.unPaidAmount|moneyFormat}} 元
                        </el-form-item>
                        <el-form-item label="应支付金额：">
                            {{payMoney.paymentAmount|moneyFormat}} 元
                        </el-form-item>
                    </div>
                    <!-- <p class="uploadpay_second"><i>*</i>支付凭证：<span class="uploadpay_third">（请上传JPG/PNG/JPEG等主流图片格式，最多上传9张，单张大小不得超过20M）</span></p> -->
                    <el-form-item label="支付凭证：" prop="attachDocs">
                        <HosJoyUpload v-model="uploadpayForm.attachDocs" :showPreView=true :fileSize=20 :action='action' :fileNum='9' :uploadParameters='uploadParameters' @successCb="$refs.uploadpayForm.clearValidate()" accept='.jpg,.png,.jpeg'>
                        </HosJoyUpload>
                    </el-form-item>
                    <p class="uploadpay_second">
                    <span class="uploadpay_third">（请上传JPG/PNG/JPEG等主流图片格式，最多上传9张，单张大小不得超过20M）</span>
                    </p>
                </el-form>
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
import { payVoucher, getBnumber, payOrderVoucher, updateRemainPayment, findDetailByFundId } from '../api/index'
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
            // attachDocs: [],
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
                ],
                attachDocs: [
                    { required: true, message: '支付凭证必填' }
                ]
            },
            uploadpayForm: { paidAmount: '', attachDocs: [] }
        }
    },
    methods: {
        async onDialogClick (val, source, fundMoney) {
            // 这里调整 fundID 查询详情
            console.log(val, source, fundMoney)
            this.uploadpayForm.attachDocs = []
            this.unpaidAmount = 0
            if (val.companyId) {
                const { data } = await getBnumber({ companyId: val.companyId })
                this.batchNumber = data
            }
            this.dialogVisible = true
            this.fundId = val.fundId || val.advanceId || val.id
            this.companyId = val.companyId
            const { data: fundDetail } = await findDetailByFundId(this.fundId)
            this.payMoney = fundDetail
            this.unpaidAmount = fundDetail.unPaidAmount || 0
            this.type = source || this.type
            this.repaymentType = val.repaymentType
            this.uploadpayForm.paidAmount = ''
            this.$nextTick(() => {
                this.$refs.uploadpayForm && this.$refs.uploadpayForm.clearValidate()
            })
        },
        // 校验本次金额不能输入0
        validatorPaidAmount (rule, value, callback) {
            console.log(rule, value)
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
            this.uploadpayForm.attachDocs = []
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
            if (this.repaymentType == 2 || this.repaymentType == 3) {
                // 如果是剩余货款 先进行本次金额校验
                this.$refs.uploadpayForm.validate(async valid => {
                    if (valid) {
                        if (this.uploadpayForm.attachDocs.length > 0) {
                            const params = {
                                fundId: this.fundId,
                                urlList: this.uploadpayForm.attachDocs,
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
                this.$refs.uploadpayForm.validate(async valid => {
                    if (valid) {
                        const params = {
                            fundId: this.fundId,
                            urlList: this.uploadpayForm.attachDocs,
                            paidAmount: this.payMoney.unPaidAmount,
                            createPhone: JSON.parse(sessionStorage.getItem('userInfo')).phoneNumber,
                            createBy: JSON.parse(sessionStorage.getItem('userInfo')).employeeName
                        }
                        await updateRemainPayment(params)
                        this.$message.success('上传成功')
                        this.$emit('onBackSearch')
                        this.dialogVisible = false
                    }
                })
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
        padding-left: 130px;
    }
    b {
        color: skyblue;
        cursor: pointer;
    }
}
.uploadpay_bot {
    margin-top: 20px;
}
/deep/.el-dialog .el-form .el-form-item {
    margin-bottom: 10px;
}
</style>
<template>
    <el-dialog :close-on-click-modal=false title="上游支付" :visible.sync="isOpen" width="800px" :before-close="()=> onCancel()" class="prev-payment-dialog">
        <el-form :model="formData" :rules="rules" label-width="150px" ref="form">
            <el-form-item label="经销商：">
                {{ prevPaymentDetail.companyName }}
            </el-form-item>
            <el-form-item label="项目：">
                {{ prevPaymentDetail.projectName }}
            </el-form-item>
            <el-form-item label="分部：">
                {{ prevPaymentDetail.deptName }}
            </el-form-item>
            <el-form-item label="剩余应上游支付：">
                {{ prevPaymentDetail.surplusAmount | fundMoneyHasTail }}元
            </el-form-item>
            <el-form-item label="上游供应商：">
                {{ prevPaymentDetail.supplierCompanyName }}
            </el-form-item>
            <el-form-item label="上游支付方式：">
                {{ prevPaymentDetail.supplierPaymentType | attributeComputed(PaymentOrderDict.supplierPaymentType.list) }}
            </el-form-item>
            <el-form-item label="上游货款方式：">
                {{ prevPaymentDetail.supplierPaymentMethod | attributeComputed(PaymentOrderDict.supplierPaymentMethod.list) }}
            </el-form-item>
            <el-form-item label="收货进度：">
                {{prevPaymentDetail.goodsProgress}}%
            </el-form-item>
            <el-form-item label="本次支付金额：" prop="payAmount">
                <el-input placeholder="请输入" v-model="formData.payAmount" maxlength="50" v-isNegative:2="formData.payAmount"></el-input>
            </el-form-item>
            <el-form-item label="支付日期：" prop="payDate">
                <el-date-picker v-model="formData.payDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上传上游支付凭证：" prop="payVouchers">
                <OssFileHosjoyUpload v-model="formData.payVouchers" :showPreView=true :fileSize=20 :fileNum=9 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" @successCb="$refs.form.clearValidate()" accept=".jpg,.jpeg,.png">
                    <div class="a-line">
                        <h-button>上传文件</h-button>
                    </div>
                </OssFileHosjoyUpload>
                <p class="tips">支持扩展名：jpg.png...</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <h-button @click="onCancel">取消</h-button>
            <h-button type="primary" @click="onEnterPay">确认支付</h-button>
        </div>
    </el-dialog>
</template>

<script>
import { getPrevPayDetail, updatePrevPayPass } from '@/views/crm/paymentOrder/api'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import { ccpBaseUrl } from '@/api/config'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'

export default {
    name: 'prevPaymentDialog',
    components: {
        OssFileHosjoyUpload
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        params: {
            type: Object
        }
    },
    data () {
        return {
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            prevPaymentDetail: {},
            formData: {
                payAmount: '',
                payDate: '',
                payVouchers: []
            },
            rules: {
                payAmount: [
                    { required: true, message: '请输入本次支付金额', trigger: 'blur' }
                ],
                payDate: [
                    { required: true, message: '请选择支付日期', trigger: 'blur' }
                ],
                payVouchers: [
                    { required: true, message: '请上传上游支付凭证' }
                ]
            },
            PaymentOrderDict
        }
    },
    watch: {
        async isOpen (val) {
            if (val) {
                this.clearForm()
                this.getPrevPayDetail()
                this.$nextTick(() => {
                    this.$refs.form.clearValidate()
                })
            }
        }
    },
    methods: {
        async getPrevPayDetail () {
            const { data } = await getPrevPayDetail(this.params.paymentOrderId)
            this.prevPaymentDetail = data
        },
        clearForm () {
            this.formData = {
                payAmount: '',
                payDate: '',
                payVouchers: []
            }
        },
        onCancel () {
            this.$refs.form.clearValidate()
            this.clearForm()
            this.$emit('onClose')
            this.formData.payVouchers = []
        },
        onEnterPay () {
            this.$refs.form.validate(async (value, rules) => {
                if (value) {
                    const params = {
                        ...this.formData,
                        ...this.params
                    }
                    await updatePrevPayPass(params)
                    this.formData.payVouchers = []
                    this.$emit('onCloseDialogAndQueryDetail', 'prevPaymentVisible')
                } else {
                    this.$nextTick(() => {
                        const dom = document.querySelector('.is-error')
                        const _dom = dom.querySelector('input') || dom.querySelector('textarea')
                        _dom.focus()
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-form-item__label {
    line-height: 20px;
}
/deep/.el-form-item__content {
    line-height: 20px;
}
.prev-payment-dialog {
    padding: 20px 12px;
}
.tips {
    padding: 5px;
}
</style>

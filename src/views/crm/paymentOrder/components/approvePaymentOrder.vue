<template>
    <div>
        <el-dialog title="支付单审核" :visible.sync="isOpen" width="900px" :before-close="()=> $emit('onClose')" class="payment-dialog">
            <el-form class="info-content" v-if="paymentDetail" :model="formData" :rules="rules" ref="form">
                <div class="row-filed">
                    <div class="col-filed">
                        <div class="info-title">上游支付申请信息</div>
                        <p>
                            <span class="label">申请支付金额：</span>
                            {{ paymentDetail.payOrderDetail.applyAmount | fundMoneyHasTail }}元
                        </p>
                        <p>
                            <span class="label">上游供应商：</span>
                            {{ paymentDetail.payOrderDetail.supplierCompanyName || '-'  }}
                        </p>
                        <p class="info-img-group">
                            <span class="label">采购明细表：</span>
                            <template v-if="paymentDetail.payOrderDetail && paymentDetail.payOrderDetail.paymentDetail">
                                <img :src="item.url" :key="item.url" alt="" @click="goDetail(item.url)"
                                     v-for="item in paymentDetail.payOrderDetail.paymentDetail" class="info-img">
                            </template>
                        </p>
                        <p>
                            <span>最迟发货日期：</span>
                            {{ paymentDetail.payOrderDetail.lastGoodsDate || '-' }}
                        </p>
                        <p>
                            <span>收货地址：</span>
                            {{paymentDetail.payOrderDetail.goodsAddress || '-' }}
                        </p>
                        <div class="info-title">审核信息</div>
                        <p>
                            <el-form-item prop="checkPass" label="审核结果：">
                                <el-radio-group v-model="formData.checkPass">
                                    <el-radio label="pass">通过</el-radio>
                                    <el-radio label="noPass">不通过</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </p>
                        <template v-if="formData.checkPass === 'pass'">
                            <p>
                                <el-form-item label="应收账款质押：" prop="accountReceivablePledgeType">
                                    <el-radio-group v-model="formData.accountReceivablePledgeType">
                                        <el-radio :key="item.key" :label="item.key" v-for="item in PaymentOrderDict.accountReceivablePledgeType.list">
                                            {{ item.value }}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </p>
                            <p>
                                <el-form-item label="上游支付方式：" prop="supplierPaymentType">
                                    <el-radio-group v-model="formData.supplierPaymentType">
                                        <el-radio :key="item.key" :label="item.key" v-for="item in PaymentOrderDict.supplierPaymentType.list">
                                            {{item.value}}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </p>
                            <p>
                                <el-form-item label="上游货款方式：" prop="supplierPaymentMethod">
                                    <el-radio-group v-model="formData.supplierPaymentMethod">
                                        <el-radio :key="item.key" :label="item.key" v-for="item in PaymentOrderDict.supplierPaymentMethod.list">
                                            {{item.value}}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </p>
                            <template v-if="formData.supplierPaymentType">
                                <p>
                                    <span>经销商首付款：</span>
                                    {{downPaymentAmount}}元
                                    <img src="../../../../assets/images/crm-edit.png" alt="" @click="openEdit" class="info-img-edit">
                                </p>
                                <p>
                                    <span>剩余货款：</span>
                                    {{ serviceFee.arrearAmount }}元
                                </p>
                                <p>
                                    <span>预计服务费总额：</span>
                                    {{ serviceFee.feeAmount }}元
                                </p>
                                <p>
                                    <span>预计每期服务费：</span>
                                    {{ serviceFee.feeAmountPer }}元
                                </p>
                            </template>
                        </template>
                        <template v-if="formData.checkPass === 'noPass'">
                            <el-form-item label="审核备注" prop="approvalRemark">
                                <el-input type="textarea" v-model="formData.approvalRemark"></el-input>
                            </el-form-item>
                        </template>
                    </div>
                    <div class="col-filed">
                        <div class="info-title">项目信息</div>
                        <p>
                            <span>项目：</span>
                            {{ paymentDetail.projectInfo.projectName }}
                        </p>
                        <p>
                            <span>经销商：</span>
                            {{ paymentDetail.projectInfo.companyName }}
                        </p>
                        <p>
                            <span>所属分部：</span>
                            {{ paymentDetail.projectInfo.deptName }}
                        </p>
                        <div class="rate-row">
                            <p>
                                <span>执行费率：</span>
                            </p>
                            <p>
                                <span class="label">银行承兑：</span>
                                {{paymentDetail.projectInfo.acceptBankRate}}%
                                <span class="label">银行转帐：</span>
                                {{paymentDetail.projectInfo.transferBankRate}}%
                            </p>

                        </div>
                        <div class="info-title">采购单信息</div>
                        <p>
                            <span>采购单金额：</span>
                            {{ paymentDetail.payOrderPoDetail.poAmount | fundMoneyHasTail }}元
                        </p>
                        <p class="info-img-group">
                            <span>采购明细表：</span>
                            <template v-if="paymentDetail.payOrderPoDetail && paymentDetail.payOrderPoDetail.poDetail">
                                <img :src="item.url" :key="item.url" alt="" @click="goDetail(item.url)"
                                     v-for="item in paymentDetail.payOrderPoDetail.poDetail" class="info-img">
                            </template>
                        </p>
                        <p>
                            <span>采购批次：</span>
                            {{ paymentDetail.payOrderPoDetail.poNumber | attributeComputed(PaymentOrderDict.applyType.list) }}采购
                        </p>
                        <p>
                            <span>最迟发货日期：</span>
                            {{ paymentDetail.payOrderPoDetail.lastGoodsDate }}
                        </p>
                        <p>
                            <span>收货地址：</span>
                            {{ paymentDetail.payOrderPoDetail.goodsAddress }}
                        </p>
                        <p>
                            <span>经销商预付款比例：</span>
                            {{ paymentDetail.payOrderPoDetail.prePercent }}%
                        </p>
                        <p>
                            <span>剩余货款支付周期：</span>
                            {{paymentDetail.payOrderPoDetail.restPaymentPeriod}}月
                        </p>
                        <p>
                            <span>免息方式：</span>
                            {{paymentDetail.payOrderPoDetail.freeInterestType | attributeComputed(PurchaseOrderDict.freeInterestType.list)}}
                        </p>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <p class="tips">
                    审核通过后，将会给经销商发送《订单及服务费确认函》
                </p>
                <div class="btn-group">
                    <h-button type="cancel" @click="onCancel">取消</h-button>
                    <h-button type="primary" @click="onReceived">确认审核</h-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="编辑经销商首付款" width="400px" :visible.sync="editAmountVisible" :before-close="()=> editAmountVisible= false" class="edit-amount-dialog">
            <div class="edit-amount">
                经销商首付款:<el-input v-model="formData.downPaymentAmount" v-isNegative="formData.downPaymentAmount" maxlength="20"></el-input>
            </div>
            <div slot="footer">
                <h-button type="cancel" @click="onCancelAmount">取消</h-button>
                <h-button type="primary" @click="onSaveAmount">确认</h-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { updatePaymentOrderStatusNoPass, updatePaymentOrderStatusPass, getComputedValue } from '@/views/crm/paymentOrder/api'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'

export default {
    name: 'approvePaymentOrder',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        openStatus: {
            type: Number,
            default: 1
        },
        paymentDetail: {
            required: false,
            type: Object
        }
    },
    data () {
        return {
            PurchaseOrderDict,
            formData: {
                checkPass: '',
                approvalRemark: '',
                accountReceivablePledgeType: '',
                supplierPaymentType: '',
                downPaymentAmount: '',
                supplierPaymentMethod: ''
            },
            editAmountVisible: false,
            PaymentOrderDict,
            serviceFee: {},
            serviceParams: {
                totalAmount: '',
                downpaymentAmount: '',
                serviceFeeRate: '',
                freeInterestType: '',
                terms: ''
            },
            rules: {
                checkPass: [
                    { required: true, message: '请选择审核结果' }
                ],
                approvalRemark: [
                    { required: true, message: '请填写审核备注' }
                ],
                accountReceivablePledgeType: [
                    { required: true, message: '请填写审核备注' }
                ],
                supplierPaymentType: [
                    { required: true, message: '请选择上游支付方式' }
                ],
                supplierPaymentMethod: [
                    { required: true, message: '请选择上游货款方式' }
                ]
            },
            downPaymentAmount: '-'
        }
    },
    watch: {
        isOpen (val) {
            if (val) {
                this.serviceParams = {
                    ...this.serviceParams,
                    downpaymentAmount: this.paymentDetail.payOrderDetail.downPaymentAmount,
                    totalAmount: this.paymentDetail.payOrderDetail.applyAmount,
                    freeInterestType: this.paymentDetail.payOrderPoDetail.freeInterestType,
                    terms: this.paymentDetail.payOrderPoDetail.restPaymentPeriod
                }
                this.downPaymentAmount = this.paymentDetail.payOrderDetail.downPaymentAmount
                this.formData.downPaymentAmount = this.paymentDetail.payOrderDetail.downPaymentAmount
                this.$nextTick(() => {
                    this.$refs.form.clearValidate()
                })
            }
        },
        'formData.supplierPaymentType' (val) {
            if (val) {
                let serviceFeeRate = ''
                if (this.formData.supplierPaymentType === PaymentOrderDict.supplierPaymentMethod.list[0].key) {
                    // serviceFeeRate = this.$dividedBy(this.paymentDetail.projectInfo.transferBankRate, 100) - 0
                    serviceFeeRate = this.paymentDetail.projectInfo.transferBankRate
                }
                if (this.formData.supplierPaymentType === PaymentOrderDict.supplierPaymentMethod.list[1].key) {
                    // serviceFeeRate = this.$dividedBy(this.paymentDetail.projectInfo.acceptBankRate, 100) - 0
                    serviceFeeRate = this.paymentDetail.projectInfo.acceptBankRate
                }
                this.serviceParams = {
                    ...this.serviceParams,
                    serviceFeeRate: serviceFeeRate
                }
                this.getComputedValue()
            }
        },
        'formData.checkPass' () {
            this.formData.approvalRemark = ''
            this.formData.accountReceivablePledgeType = ''
            this.formData.supplierPaymentType = ''
            this.formData.supplierPaymentMethod = ''
        }
    },
    methods: {
        openEdit () {
            this.editAmountVisible = true
        },
        onCancelAmount () {
            this.editAmountVisible = false
            this.formData.downPaymentAmount = this.paymentDetail.payOrderDetail.downPaymentAmount
        },
        async onSaveAmount () {
            if (this.formData.downPaymentAmount === '') {
                this.$message.error('经销商首付款不能为空')
                return
            }
            if (this.formData.downPaymentAmount === 0) {
                this.$message.error('经销商首付款不能为0')
                return
            }
            if (this.formData.downPaymentAmount > this.paymentDetail.payOrderDetail.applyAmount) {
                this.$message.error('经销商首付款不能大于申请支付金额')
                return
            }
            try {
                this.serviceParams.downpaymentAmount = this.formData.downPaymentAmount
                await this.getComputedValue()
                this.downPaymentAmount = this.formData.downPaymentAmount
                this.editAmountVisible = false
            } catch (e) {}
        },
        clearForm () {
            this.formData = {
                checkPass: '',
                approvalRemark: '',
                accountReceivablePledgeType: '',
                supplierPaymentType: '',
                downPaymentAmount: '',
                supplierPaymentMethod: ''
            }
        },
        onCancel () {
            this.clearForm()
            this.$emit('onClose')
        },
        onReceived () {
            this.$refs.form.validate(async (value) => {
                if (value) {
                    if (this.formData.checkPass === 'pass') {
                        await updatePaymentOrderStatusPass(this.paymentDetail.payOrderDetail.id, this.formData)
                    } else if (this.formData.checkPass === 'noPass') {
                        await updatePaymentOrderStatusNoPass(this.paymentDetail.payOrderDetail.id, this.formData)
                    }
                    this.clearForm()
                    this.$emit('onCloseDialogAndQuery', 'approvePaymentVisible')
                }
            })
        },
        goDetail (url) {
            window.open(url)
        },
        async getComputedValue () {
            const { data } = await getComputedValue(this.serviceParams)
            this.serviceFee = data
        }
    }
}
</script>

<style scoped lang="scss">
.info-content{
    padding-top: 20px;
    padding-bottom: 20px;
    .info-title {
        color: #FF7A45;
        font-weight: 600;
    }
    .row-filed {
        display: flex;
        .col-filed{
            width: 50%;
            box-sizing: border-box;
            padding-right: 20px;
        }
        p{
            padding: 10px 0;
        }
    }
}
.info-img {
    width: 80px;
    height: 80px;
    cursor: pointer;
}
.info-img-edit {
    width: 20px;
    cursor: pointer;
    vertical-align: bottom;
}
.tips {
    line-height: 20px;
}
.dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.rate-row {
    display: flex;
    span.label{
        padding-right: 5px;
        padding-left: 5px;
    }
}
.edit-amount-dialog {
    /deep/.el-dialog__body{
        min-height: 100px;
    }
}
.payment-dialog {
    /deep/.el-form-item__content{
        line-height: 20px;
    }
    /deep/.el-form-item__label{
        line-height: 20px;
    }
}
.edit-amount {
    height: 100px;
    display: flex;
    align-items: center;
    .el-input{
        margin-left: 10px;
    }
}
.info-img-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .label{
        width: 100px;
        flex: 0 0 100px;
    }
    img {
        margin-bottom: 10px;
        margin-right: 10px;
    }
}
</style>

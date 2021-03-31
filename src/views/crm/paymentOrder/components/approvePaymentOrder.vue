<template>
    <div>
        <el-dialog ref="paymentDetail" :close-on-click-modal=false title="支付单审核" :visible.sync="isOpen" width="70%" :before-close="()=> $emit('onClose')" class="payment-dialog">
            <el-form class="info-content" v-if="paymentDetail" :model="formData" :rules="rules" ref="form" label-width="140px">
                <div class="row-filed">
                    <div class="col-filed">
                        <div class="info-title">项目信息</div>
                        <el-form-item label="项目：">
                            {{ paymentDetail.projectInfo.projectName }}
                        </el-form-item>
                        <el-form-item label="经销商：">
                            {{ paymentDetail.projectInfo.companyName }}
                        </el-form-item>
                        <el-form-item label="所属分部：">
                            {{ paymentDetail.projectInfo.deptName }}
                        </el-form-item>
                        <div class="rate-row">
                            <p>
                                <span>执行费率：</span>
                            </p>
                            <p>
                                <span class="label">银行承兑：</span>
                                {{paymentDetail.projectInfo.acceptBankRate}}%
                                <span class="label">银行转账：</span>
                                {{paymentDetail.projectInfo.transferBankRate}}%
                            </p>
                        </div>
                        <div class="info-title">采购单信息</div>
                        <el-form-item label="采购单金额：">
                            {{ paymentDetail.payOrderPoDetail.poAmount | fundMoneyHasTail }}元
                        </el-form-item>
                        <el-form-item label="采购明细表：">
                            <div class="info-img-group content">
                                <template v-if="paymentDetail.payOrderPoDetail && paymentDetail.payOrderPoDetail.poDetail">
                                    <span class="img-box" :key="item.url" v-for="item in paymentDetail.payOrderPoDetail.poDetail">
                                        <imageAddToken :file-url="item.url" />
                                    </span>
                                </template>
                            </div>
                        </el-form-item>
                        <el-form-item label="采购批次：">
                            {{ paymentDetail.payOrderPoDetail.poNumber | attributeComputed(PaymentOrderDict.applyType.list) }}
                        </el-form-item>
                        <el-form-item label="所属分部：">
                            {{ paymentDetail.projectInfo.deptName }}
                        </el-form-item>
                        <el-form-item label="最迟发货日期：">
                            {{ paymentDetail.payOrderPoDetail.lastGoodsDate }}
                        </el-form-item>
                        <el-form-item label="收货地址：">
                            {{ paymentDetail.payOrderPoDetail.goodsAddress }}
                        </el-form-item>
                        <el-form-item label="经销商预付款比例：">
                            {{ paymentDetail.payOrderPoDetail.prePercent }}%
                        </el-form-item>
                        <el-form-item label="剩余货款支付周期：">
                            {{paymentDetail.payOrderPoDetail.restPaymentPeriod}}个月
                        </el-form-item>
                        <el-form-item label="免息方式：">
                            {{paymentDetail.payOrderPoDetail.freeInterestType | attributeComputed(PurchaseOrderDict.freeInterestType.list)}}
                        </el-form-item>
                    </div>
                    <div class="col-filed">
                        <div class="info-title">上游支付申请信息</div>
                        <el-form-item label="申请支付金额：">
                            {{ paymentDetail.payOrderDetail.applyAmount | fundMoneyHasTail }}元
                        </el-form-item>

                        <el-form-item label="上游供应商：">
                            {{ paymentDetail.payOrderDetail.supplierCompanyName || '-'  }}
                        </el-form-item>
                        <!-- 添加 -->
                        <el-form-item label="银行联行号：">
                            <!-- <el-input type="text" v-model="" maxlength="200"></el-input> -->
                            {{paymentDetail.payOrderDetail.supplierBankNo}}
                        </el-form-item>

                        <el-form-item label="供应商开户行名称：">
                            <!-- <el-input type="text" v-model="" maxlength="200"></el-input> -->
                            {{paymentDetail.payOrderDetail.supplierAccountName}}
                        </el-form-item>

                        <el-form-item label="供应商银行账号：">
                            <!-- <el-input type="text" v-model="" maxlength="200"></el-input> -->
                            {{paymentDetail.payOrderDetail.supplierAccountNo}}
                        </el-form-item>
                        <el-form-item label="期望上游支付日期：">
                            {{paymentDetail.payOrderDetail.expectSupplierPaymentDate?moment(paymentDetail.payOrderDetail.expectSupplierPaymentDate).format('YYYY-MM-DD'):''}}
                        </el-form-item>
                        <el-form-item label="上游支付方式：">
                            {{paymentDetail.payOrderDetail.supplierPaymentType==1?'银行转账':'银行承兑'}}
                        </el-form-item>
                        <!-- <div class="info-img-group">
                            <span class="label">采购明细表：</span>
                            <p class="content">
                                <template v-if="paymentDetail.payOrderDetail && paymentDetail.payOrderDetail.paymentDetail">
                                    <span class="img-box" :key="item.url" v-for="item in paymentDetail.payOrderDetail.paymentDetail">
                                        <imageAddToken :file-url="item.url" />
                                    </span>
                                </template>
                            </p>
                        </div> -->
                        <el-form-item label="采购明细表：">
                            <div class="info-img-group content">
                                <template v-if="paymentDetail.payOrderDetail && paymentDetail.payOrderDetail.paymentDetail">
                                    <span class="img-box" :key="item.url" v-for="item in paymentDetail.payOrderDetail.paymentDetail">
                                        <imageAddToken :file-url="item.url" />
                                    </span>
                                </template>
                            </div>
                        </el-form-item>
                        <el-form-item label="最迟发货日期：">
                            {{ paymentDetail.payOrderDetail.lastGoodsDate || '-' }}
                        </el-form-item>
                        <el-form-item label="收货地址：">
                            {{paymentDetail.payOrderDetail.goodsAddress || '-' }}
                        </el-form-item>
                        <el-form-item label="特殊说明：">
                            {{paymentDetail.payOrderDetail.specialRemark}}
                        </el-form-item>
                    </div>
                    <div class="col-filed">
                        <div class="info-title">审核信息</div>
                        <el-form-item prop="checkPass" label="审核结果：">
                            <el-radio-group v-model="formData.checkPass">
                                <el-radio label="pass">通过</el-radio>
                                <el-radio label="noPass">不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <template v-if="formData.checkPass === 'pass'">
                            <el-form-item label="应收账款质押：" prop="accountReceivablePledgeType">
                                <el-radio-group v-model="formData.accountReceivablePledgeType">
                                    <el-radio :key="item.key" :label="item.key" v-for="item in PaymentOrderDict.accountReceivablePledgeType.list">
                                        {{ item.value }}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- <el-form-item label="上游支付方式：" prop="supplierPaymentType">
                                <el-radio-group v-model="formData.supplierPaymentType">
                                    <el-radio :key="item.key" :label="item.key" v-for="item in PaymentOrderDict.supplierPaymentType.list">
                                        {{item.value}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item> -->
                            <el-form-item label="上游货款方式：" prop="supplierPaymentMethod">
                                <el-radio-group v-model="formData.supplierPaymentMethod">
                                    <el-radio :key="item.key" :label="item.key" v-for="item in PaymentOrderDict.supplierPaymentMethod.list">
                                        {{item.value}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="网银盾照片：" prop="shieldFiles">
                                <div class="info-img-group content">
                                    <!-- <template v-if="formData.shieldFiles">
                                        <span class="img-box" :key="item.url" v-for="item in formData.shieldFiles">
                                            <imageAddToken :file-url="item.url" />
                                        </span>
                                    </template> -->
                                    <hosjoyUpload v-model="formData.shieldFiles" :showPreView=true :fileSize=20 :fileNum=5 :action='action' accept='.jpg,.gif,.png' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb(formData.shieldFiles)}" style="margin:10px 0 0 5px">
                                        <el-button type="primary">上 传</el-button>
                                    </hosjoyUpload>
                                </div>
                            </el-form-item>
                            <el-form-item label="共管户截图：" prop="managedFiles">
                                <div class="info-img-group content">
                                    <!-- <template>
                                        <span class="img-box" :key="item.url" v-for="item in formData.managedFiles">
                                            <imageAddToken :file-url="item.url" />
                                        </span>
                                    </template> -->
                                    <hosjoyUpload v-model="formData.managedFiles" :showPreView=true :fileSize=20 :fileNum=5 :action='action' accept='.jpg,.gif,.png' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb(formData.shieldFiles)}" style="margin:10px 0 0 5px">
                                        <el-button type="primary">上 传</el-button>
                                    </hosjoyUpload>
                                </div>
                            </el-form-item>
                            <el-form-item label="质押信息：" prop="pledgeNo">
                                <el-input type="text" v-model="formData.pledgeNo" maxlength="50" placeholder="请输入中登网质押编号"></el-input>
                            </el-form-item>
                            <el-form-item label="OA审批编号：" prop="oaNo">
                                <el-input type="text" v-model="formData.oaNo" maxlength="50" placeholder="请输入OA流程编号"></el-input>
                            </el-form-item>
                            <el-form-item label="审核备注" prop="approvalRemark">
                                <el-input type="textarea" v-model="formData.approvalRemark" maxlength="200" placeholder="可在此处备注对资金放款的要求"></el-input>
                            </el-form-item>
                            <el-form-item label="下游合作方式：" prop="dealerCooperationMethod">
                                <el-radio-group v-model="formData.dealerCooperationMethod" @change="onChangeDealer">
                                    <el-radio :key="item.key" :label="item.key" v-for="item in dealerList">
                                        {{item.value}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <template v-if="formData.dealerCooperationMethod">
                                <el-form-item label="经销商预付款：">
                                    {{downPaymentAmount | fundMoneyHasTail}}元
                                    <img src="../../../../assets/images/crm-edit.png" alt="" @click="openEdit" class="info-img-edit" v-if="formData.dealerCooperationMethod==1">
                                </el-form-item>

                                <el-form-item label="剩余货款：" v-show="formData.dealerCooperationMethod==1">
                                    {{ serviceFee.arrearAmount | fundMoneyHasTail}}元
                                </el-form-item>
                                <el-form-item label="预计服务费总额：" v-show="formData.dealerCooperationMethod==1">
                                    {{ serviceFee.feeAmount | fundMoneyHasTail}}元
                                </el-form-item>
                                <el-form-item label="预计每期服务费：" v-show="formData.dealerCooperationMethod==1">
                                    {{ serviceFee.feeAmountPer | fundMoneyHasTail}}元
                                </el-form-item>
                            </template>
                        </template>
                        <template v-if="formData.checkPass === 'noPass'">
                            <el-form-item label="审核备注" prop="approvalRemark">
                                <el-input type="textarea" v-model="formData.approvalRemark" maxlength="200"></el-input>
                            </el-form-item>
                        </template>
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
        <el-dialog title="编辑经销商预付款" width="400px" :visible.sync="editAmountVisible" :before-close="()=> editAmountVisible= false" :close-on-click-modal=false class="edit-amount-dialog">
            <div class="edit-amount">
                经销商预付款:<el-input v-model="formData.downPaymentAmount" v-isNegative:2="formData.downPaymentAmount" maxlength="20"></el-input>
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
import imageAddToken from '@/components/imageAddToken'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { ccpBaseUrl } from '@/api/config'
import { checkNumandEng } from '@/utils/rules'
import moment from 'moment'
export default {
    name: 'approvePaymentOrder',
    components: {
        imageAddToken, hosjoyUpload
    },
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
            moment,
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            PurchaseOrderDict,
            formData: {
                checkPass: '',
                approvalRemark: '',
                accountReceivablePledgeType: '',
                // supplierPaymentType: '',
                downPaymentAmount: '',
                supplierPaymentMethod: '',
                shieldFiles: [], // 网盾图片
                managedFiles: [], // 共管账号
                pledgeNo: '',
                oaNo: ''
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
            dealerList: [{ key: 1, value: '垫资代采' }, { key: 2, value: '代收代付' }],
            rules: {
                checkPass: [
                    { required: true, message: '请选择审核结果' }
                ],
                approvalRemark: [
                    { required: true, message: '请填写审核备注' }
                ],
                accountReceivablePledgeType: [
                    { required: true, message: '请选择应收账款质押' }
                ],
                supplierPaymentMethod: [
                    { required: true, message: '请选择上游货款方式' }
                ],
                dealerCooperationMethod: [
                    { required: true, message: '请选择下游合作方式' }
                ],
                pledgeNo: [
                    { required: true, message: '请输入质押信息' },
                    {
                        validator: checkNumandEng, trigger: 'blur'
                    }
                ],
                oaNo: [
                    { required: true, message: '请输入OA审批编号' },
                    {
                        validator: checkNumandEng, trigger: 'blur'
                    }
                ],
                shieldFiles: [
                    { required: true, message: '请上传网银盾图片' }
                ],
                managedFiles: [
                    { required: true, message: '请上传共管户截图' }
                ]
            },
            downPaymentAmount: '-'
        }
    },
    watch: {
        'formData.shieldFiles' (val) {
            if (val.length > 0) {
                console.log(val)
                this.$refs.form.clearValidate(['shieldFiles'])
            }
        },
        'formData.managedFiles' (val) {
            if (val.length > 0) {
                console.log(val)
                this.$refs.form.clearValidate(['managedFiles'])
            }
        },
        isOpen (val) {
            if (val) {
                const { payOrderDetail, payOrderPoDetail, projectInfo } = this.paymentDetail
                this.serviceParams = {
                    ...this.serviceParams,
                    // 当上游支付方式选择为银行转账时，取执行费率
                    serviceFeeRate: payOrderDetail.supplierPaymentType == 1 ? projectInfo.transferBankRate : projectInfo.acceptBankRate,
                    downpaymentAmount: payOrderDetail.downPaymentAmount,
                    totalAmount: payOrderDetail.applyAmount,
                    freeInterestType: payOrderPoDetail.freeInterestType,
                    terms: payOrderPoDetail.restPaymentPeriod
                }
                this.downPaymentAmount = this.paymentDetail.payOrderDetail.downPaymentAmount
                this.formData.downPaymentAmount = this.paymentDetail.payOrderDetail.downPaymentAmount
                this.$nextTick(() => {
                    this.$refs.form.clearValidate()
                })
            }
        },
        'formData.dealerCooperationMethod' (val) {
            if (val == 1) {
                this.getComputedValue()
            }
        },
        // 'formData.supplierPaymentType' (val) {
        //     if (val) {
        //         let serviceFeeRate = ''
        //         if (this.formData.supplierPaymentType === PaymentOrderDict.supplierPaymentMethod.list[0].key) {
        //             // serviceFeeRate = this.$dividedBy(this.paymentDetail.projectInfo.transferBankRate, 100) - 0
        //             serviceFeeRate = this.paymentDetail.projectInfo.transferBankRate
        //         }
        //         if (this.formData.supplierPaymentType === PaymentOrderDict.supplierPaymentMethod.list[1].key) {
        //             // serviceFeeRate = this.$dividedBy(this.paymentDetail.projectInfo.acceptBankRate, 100) - 0
        //             serviceFeeRate = this.paymentDetail.projectInfo.acceptBankRate
        //         }
        //         this.serviceParams = {
        //             ...this.serviceParams,
        //             serviceFeeRate: serviceFeeRate
        //         }
        //         this.getComputedValue()
        //     }
        // },
        'formData.checkPass' () {
            this.formData.approvalRemark = ''
            this.formData.accountReceivablePledgeType = ''
            // this.formData.supplierPaymentType = ''
            this.formData.supplierPaymentMethod = ''
            this.formData.shieldFiles = []
            this.formData.managedFiles = []
            this.formData.pledgeNo = ''
            this.formData.oaNo = ''
        }
    },
    methods: {
        openEdit () {
            this.formData.downPaymentAmount = this.downPaymentAmount
            this.editAmountVisible = true
        },
        onChangeDealer (val) {
            if (val == 2) {
                this.downPaymentAmount = this.paymentDetail.payOrderDetail.applyAmount
            } else {
                this.downPaymentAmount = this.paymentDetail.payOrderDetail.downPaymentAmount
            }
        },
        async onCancelAmount () {
            // this.downPaymentAmount = this.paymentDetail.payOrderDetail.downPaymentAmount
            // this.serviceParams.downpaymentAmount = this.downPaymentAmount
            // await this.getComputedValue()
            this.editAmountVisible = false
        },
        async onSaveAmount () {
            if (this.formData.downPaymentAmount === '') {
                this.$message.error('经销商预付款不能为空')
                return
            }
            if (this.formData.downPaymentAmount == 0) {
                this.$message.error('经销商预付款不能为0')
                return
            }
            if (this.formData.downPaymentAmount == this.paymentDetail.payOrderDetail.applyAmount) {
                this.$message.error('首付款金额最大不可超过申请支付金额')
                return
            }
            if (this.formData.downPaymentAmount > this.paymentDetail.payOrderDetail.applyAmount) {
                this.$message.error('经销商预付款不能大于申请支付金额')
                return
            }
            try {
                this.serviceParams.downpaymentAmount = this.formData.downPaymentAmount
                await this.getComputedValue()
                this.downPaymentAmount = this.formData.downPaymentAmount
                this.editAmountVisible = false
            } catch (e) { }
        },
        clearForm () {
            this.formData = {
                checkPass: '',
                approvalRemark: '',
                accountReceivablePledgeType: '',
                // supplierPaymentType: '',
                downPaymentAmount: '',
                supplierPaymentMethod: '',
                shieldFiles: [],
                managedFiles: [] // 共管账号
            }
        },
        onCancel () {
            this.clearForm()
            this.$emit('onClose')
        },
        onReceived () {
            this.$refs.form.validate(async (value, rules) => {
                if (value) {
                    // this.formData.supplierPaymentType = 2
                    this.formData.downPaymentAmount = this.downPaymentAmount
                    this.formData.updateTime = this.paymentDetail.payOrderPoDetail.updateTime
                    if (this.formData.checkPass === 'pass') {
                        await updatePaymentOrderStatusPass(this.paymentDetail.payOrderDetail.id, this.formData)
                    } else if (this.formData.checkPass === 'noPass') {
                        await updatePaymentOrderStatusNoPass(this.paymentDetail.payOrderDetail.id, this.formData)
                    }
                    this.clearForm()
                    this.$emit('onCloseDialogAndQuery', 'approvePaymentVisible')
                } else {
                    // console.log(object)
                    // const needTip = Object.keys(rules)
                    // this.$message.error(`${rules[needTip[0]][0].message}`)
                    this.$nextTick(() => {
                        const dom = document.querySelector('.is-error')
                        const _dom = dom.querySelector('input') || dom.querySelector('textarea')
                        _dom.focus()
                    })
                }
            })
        },
        goDetail (url) {
            window.open(url)
        },
        async getComputedValue () {
            const { data } = await getComputedValue(this.serviceParams)
            this.serviceFee = data
        },
        handleSuccessCb (row) {
            console.log(row)
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.default-pre-view-image {
    width: 80px;
    height: 80px;
}
/deep/.default-pre-view-mask {
    width: 80px;
    height: 80px;
}
.payment-dialog {
    /deep/ .el-dialog__body {
        max-height: 480px;
        padding: 0 20px 20px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
}
.info-content {
    padding-top: 20px;
    padding-bottom: 20px;
    .info-title {
        color: #ff7a45;
        font-weight: 600;
    }
    .row-filed {
        display: flex;
        .col-filed {
            width: 50%;
            box-sizing: border-box;
            padding-right: 20px;
        }
        p {
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
    vertical-align: middle;
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
    span.label {
        padding-right: 5px;
        padding-left: 5px;
    }
}
.edit-amount-dialog {
    /deep/.el-dialog__body {
        min-height: 100px;
    }
}
.payment-dialog {
    /deep/.el-form-item__content {
        // line-height: 20px;
    }
    /deep/.el-form-item__label {
        // line-height: 20px;
    }
    /deep/ .el-dialog .el-form .el-form-item {
        // margin-bottom: 10px;
    }
}
.edit-amount {
    height: 100px;
    display: flex;
    align-items: center;
    .el-input {
        margin-left: 10px;
    }
}
.info-img-group {
    display: flex;
    flex-wrap: wrap;
    span {
        display: flex;
        width: 80px;
        height: 80px;
        margin-bottom: 12px;
        margin-right: 12px;
        cursor: pointer;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
    }
    img {
        display: block;
        margin: auto;
        max-height: 78px;
        max-width: 78px;
    }
    .content {
        display: flex;
        flex-wrap: wrap;

        span {
            display: flex;
            width: 80px;
            height: 80px;
            margin-bottom: 12px;
            margin-right: 12px;
            cursor: pointer;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
        }
        img {
            display: block;
            margin: auto;
            max-height: 78px;
            max-width: 78px;
        }
    }
    .label {
        flex: 0 0 100px;
    }
}
</style>

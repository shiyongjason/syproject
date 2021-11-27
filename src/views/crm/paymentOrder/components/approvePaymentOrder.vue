<template>
    <div class="payment-audit-content">
        <el-dialog v-if="isOpen" ref="paymentDetail" :close-on-click-modal=false title="支付单审核" :visible.sync="isOpen" width="70%" :before-close="onCancel" class="payment-dialog">
            <el-form class="info-content" v-if="paymentDetail" :model="formData" :rules="rules" ref="form" label-width="150px">
                <div class="row-filed">
                    <div class="col-filed">
                        <div class="info-title">项目信息</div>
                        <el-form-item label="项目：" label-width="100px">
                            {{ paymentDetail.projectInfo.projectName }}
                        </el-form-item>
                        <el-form-item label="经销商：" label-width="100px">
                            {{ paymentDetail.projectInfo.companyName }}
                        </el-form-item>
                        <el-form-item label="所属分部：" label-width="100px">
                            {{ paymentDetail.projectInfo.deptName }}
                        </el-form-item>
                        <el-form-item label="执行费率：" label-width="100px">
                            <span class="label">银行承兑：</span>
                            {{paymentDetail.projectInfo.acceptBankRate}}%
                            <span class="label">银行转账：</span>
                            {{paymentDetail.projectInfo.transferBankRate}}%
                        </el-form-item>
                        <div class="info-title">采购单信息</div>
                        <el-form-item label="采购单金额：">
                            {{ paymentDetail.payOrderPoDetail.poAmount | moneyFormat }}元
                        </el-form-item>
                        <div class="mb20"  style="max-height:250px; overflow-y: scroll;">
                            <basicTable :tableData="paymentDetail.payOrderPoDetail.paymentOrderInfos" :tableLabel="orderLabel" :isPagination='false'>
                                <template slot="status" slot-scope="scope">
                                    {{paymentOrderConst.PAYMENT_ORDER_STATUS_ALL.get(scope.data.row.status) }}
                                </template>
                            </basicTable>
                        </div>
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
                            {{ paymentOrderConst.APPLY_TYPE.get(paymentDetail.payOrderPoDetail.poNumber) }}
                        </el-form-item>
                        <el-form-item label="最迟发货日期：">
                            {{ paymentDetail.payOrderPoDetail.lastGoodsDate||'-' }}
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
                            {{ paymentDetail.payOrderDetail.applyAmount | moneyFormat }}元
                        </el-form-item>

                        <el-form-item label="上游供应商：">
                            {{ paymentDetail.payOrderDetail.supplierCompanyName || '-'  }}
                        </el-form-item>
                        <!-- 添加 -->
                        <el-form-item label="供应商开户行名称：">
                            {{paymentDetail.payOrderDetail.supplierAccountName}}
                        </el-form-item>

                        <el-form-item label="供应商银行账号：">
                            {{paymentDetail.payOrderDetail.supplierAccountNo}}
                        </el-form-item>
                        <el-form-item label="银行联行号：">
                            {{paymentDetail.payOrderDetail.supplierBankNo}}
                        </el-form-item>
                        <el-form-item label="期望上游支付日期：">
                            {{paymentDetail.payOrderDetail.expectSupplierPaymentDate | momentFormat('YYYY-MM-DD')}}
                        </el-form-item>
                        <el-form-item label="上游支付方式：">
                            {{paymentDetail.payOrderDetail.supplierPaymentType==1?'银行转账':'银行承兑'}}：{{paymentDetail.payOrderDetail.serviceFeeRate}}%
                        </el-form-item>
                        <el-form-item label="票面金额：" v-if="paymentDetail.payOrderDetail.supplierPaymentType != 1">
                            {{paymentDetail.payOrderDetail.billClaim == 1 ? '有要求' : '无要求'}}
                        </el-form-item>
                        <div class="mb20" v-if="paymentDetail.payOrderDetail.supplierPaymentType != 1">
                            <basicTable :tableData="paymentDetail.billAmountResponse.billAmountDetail" :tableLabel="tableLabel" :isPagination='false'>
                                <template slot="number" slot-scope="scope">
                                    第{{ scope.data.row.number }}张票
                                </template>
                            </basicTable>
                        </div>
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
                        <el-form-item label="备注信息：">
                            {{paymentDetail.payOrderDetail.specialRemark}}
                        </el-form-item>
                    </div>
                    <div class="col-filed">
                        <el-form-item label="下游合作方式：" label-width="165px">
                            {{ paymentOrderConst.DEALER_COOPERATION_METHOD.get(paymentDetail.payOrderDetail.dealerCooperationMethod) || '-' }}
                        </el-form-item>
                         <el-form-item label="上游货款方式：" label-width="165px">
                             {{ paymentOrderConst.SUPPLIER_PAYMENT_METHOD.get(paymentDetail.payOrderDetail.supplierPaymentMethod) || '-'}}
                        </el-form-item>
                        <el-form-item label="经销商预付款：" label-width="165px">
                            {{ paymentDetail.payOrderDetail.downPaymentAmount | moneyFormat }}元
                        </el-form-item>
                        <template v-if="paymentDetail.payOrderDetail.dealerCooperationMethod == 1">
                            <el-form-item label="预计服务费总额：" label-width="165px">
                                {{ paymentDetail.payOrderDetail.feeAmount | moneyFormat }}元
                            </el-form-item>
                            <el-form-item label="预计每期服务费：" label-width="165px">
                                {{ paymentDetail.payOrderDetail.feeAmountPer | moneyFormat }}元
                            </el-form-item>
                            <el-form-item label="剩余货款：" label-width="165px">
                                {{ paymentDetail.payOrderDetail.arrearAmount | moneyFormat }}元
                            </el-form-item>
                        </template>
                        <template v-if="paymentDetail.payOrderDetail.status === paymentOrderStatusKey.FINANCE_AUDIT">
                            <div class="info-title">分财审核信息</div>
                            <el-form-item prop="supplierAccountConfirm" label="账户信息是否已确认：" label-width="165px">
                                <el-radio-group v-model="formData.supplierAccountConfirm" @change="onRdioChange">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="coManagerSupervision" label="共管户是否已监管：" label-width="165px">
                                <el-radio-group v-model="formData.coManagerSupervision" @change="onRdioChange">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="审核备注："  label-width="165px">
                                <el-input type="textarea" v-model="formData.approvalRemark" maxlength="200"></el-input>
                            </el-form-item>
                        </template>
                        <template v-else>
                            <div class="info-title">分财审核信息</div>
                            <el-form-item label="账户信息是否已确认：" label-width="165px">
                                {{paymentDetail.paymentOrderSegmentFinanceApprovalResponse && paymentDetail.paymentOrderSegmentFinanceApprovalResponse.supplierAccountConfirm ? '是' : '否'}}
                            </el-form-item>
                            <el-form-item label="共管户是否已监管：" label-width="165px">
                                {{paymentDetail.paymentOrderSegmentFinanceApprovalResponse && paymentDetail.paymentOrderSegmentFinanceApprovalResponse.coManagerSupervision ? '是' : '否'}}
                            </el-form-item>
                            <el-form-item label="审核备注：" label-width="165px">
                                {{paymentDetail.paymentOrderSegmentFinanceApprovalResponse.approvalRemark || '-'}}
                            </el-form-item>
                            <div class="info-title">项目运营审核信息</div>
                            <el-form-item prop="checkPass" label="审核结果：">
                                <el-radio-group v-model="formData.checkPass" @change="onRdioChange">
                                    <el-radio label="pass">通过</el-radio>
                                    <el-radio label="noPass">不通过</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="审核备注：" :required="formData.checkPass=='noPass'" prop="approvalRemark">
                                <el-input type="textarea" v-model="formData.approvalRemark" maxlength="200"></el-input>
                            </el-form-item>
                        </template>
                    </div>
                </div>
            </el-form>
            <div slot="footer">
                <div class="btn-group">
                    <h-button type="cancel" @click="onCancel">取消</h-button>
                    <h-button type="primary" @click="onReceived">确认审核</h-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { updatePaymentOrderStatusNoPass, updatePaymentOrderStatusPass, updatePaymentOrderStatusFinance } from '@/views/crm/paymentOrder/api'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import imageAddToken from '@/components/imageAddToken'
import paymentOrderConst from '@/views/crm/paymentOrder/const'
export default {
    name: 'approvePaymentOrder',
    components: {
        imageAddToken
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
            PurchaseOrderDict,
            formData: {
                checkPass: '',
                approvalRemark: '',
                supplierAccountConfirm: '',
                coManagerSupervision: ''
            },
            rules: {
                checkPass: [
                    { required: true, message: '请选择审核结果' }
                ],
                approvalRemark: [
                    {
                        validator: (rule, value, callback) => {
                            // 分财审核且审核结果中有否的时候必填
                            const isFinanceRequired = this.paymentDetail.payOrderDetail.status === this.paymentOrderStatusKey.FINANCE_AUDIT && !(this.formData.supplierAccountConfirm && this.formData.coManagerSupervision)
                            // 项目运营审核结果为不通过的时候必填
                            const isOperateRequired = this.formData.checkPass === 'noPass'
                            if ((isFinanceRequired || isOperateRequired) && (!value || value.trim() == '')) {
                                return callback(new Error('请填写审核备注'))
                            }
                            callback()
                        },
                        trigger: 'blur'
                    }
                ],
                supplierAccountConfirm: [
                    { required: true, message: '请选择账户信息是否已确认' }
                ],
                coManagerSupervision: [
                    { required: true, message: '请选择共管户是否已监管' }
                ]
            },
            tableLabel: [
                { label: '出票张数', prop: 'number' },
                { label: '出票金额（元）', prop: 'amount', formatters: 'moneyShow' }
            ],
            orderLabel: [
                { label: '支付单编号', prop: 'paymentOrderNo' },
                { label: '支付单金额(元)', prop: 'applyAmount', formatters: 'moneyShow' },
                { label: '支付单状态', prop: 'status' }
            ],
            paymentOrderStatusKey: paymentOrderConst.PAYMENT_ORDER_STATUS_KEY,
            paymentOrderConst
        }
    },
    watch: {
        isOpen (val) {
            if (val) {
                const { payOrderDetail, payOrderPoDetail, projectInfo } = this.paymentDetail
                this.$nextTick(() => {
                    this.$refs.form.clearValidate()
                })
            }
        }
    },
    methods: {
        onRdioChange (val) {
            this.formData.approvalRemark = ''
            this.$refs.form.clearValidate()
        },
        clearForm () {
            this.formData = {
                checkPass: '',
                approvalRemark: '',
                supplierAccountConfirm: '',
                coManagerSupervision: ''
            }
        },
        onCancel () {
            this.clearForm()
            this.$emit('onClose')
        },
        onReceived () {
            this.$refs.form.validate((value, rules) => {
                if (value) {
                    this.formData.updateTime = this.paymentDetail.payOrderPoDetail.updateTime
                    // 分财审核逻辑
                    if (this.paymentDetail.payOrderDetail.status === this.paymentOrderStatusKey.FINANCE_AUDIT) {
                        // 二次确认 通过
                        const message = this.formData.supplierAccountConfirm && this.formData.coManagerSupervision ? '确定对当前支付单给予审核通过吗？' : '确定对当前支付单给予审核不通过吗？'
                        this.$confirm(message, '再次确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(async () => {
                            this.formData.paymentOrderId = this.paymentDetail.payOrderDetail.id
                            await updatePaymentOrderStatusFinance(this.formData)
                            this.clearForm()
                            this.$emit('onCloseDialogAndQuery', 'approvePaymentVisible')
                        }).catch(() => {
                        })
                    } else if (this.formData.checkPass === 'pass') {
                        // 二次确认 通过
                        this.$confirm('确定对当前支付单给予审核通过吗？', '再次确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(async () => {
                            await updatePaymentOrderStatusPass(this.paymentDetail.payOrderDetail.id, this.formData)
                            this.clearForm()
                            this.$emit('onCloseDialogAndQuery', 'approvePaymentVisible')
                        }).catch(() => {
                        })
                    } else if (this.formData.checkPass === 'noPass') {
                        // 二次确认 不通过
                        this.$confirm('确定对当前支付单给予审核不通过吗？', '再次确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(async () => {
                            await updatePaymentOrderStatusNoPass(this.paymentDetail.payOrderDetail.id, this.formData)
                            this.clearForm()
                            this.$emit('onCloseDialogAndQuery', 'approvePaymentVisible')
                        }).catch(() => {
                        })
                    }
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
            width: 33%;
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
/deep/ .collapse {
    display: none;
}
</style>

<template>
    <el-dialog title="支付单审核" :visible.sync="isOpen" width="800px" :before-close="()=> $emit('onClose')">
        <div class="info-content" v-if="paymentDetail">
            <div class="row-filed">
                <div class="col-filed">
                    <div class="info-title">上游支付申请信息</div>
                    <p>
                        <span class="label">申请支付金额：</span>
                        {{ paymentDetail.payOrderDetail.applyAmount }}元
                    </p>
                    <p>
                        <span class="label">上游供应商：</span>
                        {{ paymentDetail.payOrderDetail.supplierCompanyName }}
                    </p>
                    <p>
                        <span class="label">采购明细表：</span>
                        <template v-if="paymentDetail.payOrderDetail && paymentDetail.payOrderDetail.poDetail">
                            <img :src="item.url" :key="item.url" alt="" @click="goDetail(item.url)"
                                 v-for="item in JSON.parse(paymentDetail.payOrderDetail.poDetail)" class="info-img">
                        </template>
                    </p>
                    <p>
                        <span>最迟发货日期：</span>
                        {{ paymentDetail.payOrderDetail.lastGoodsDate }}
                    </p>
                    <p>
                        <span>收货地址：</span>
                        {{paymentDetail.payOrderDetail.goodsAddress}}
                    </p>
                    <div class="info-title">审核信息</div>
                    <p>
                        <span>审核结果：</span>
                        <el-radio-group v-model="formData.checkPass">
                            <el-radio label="pass">通过</el-radio>
                            <el-radio label="noPass">不通过</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>应收账款质押：</span>
                        <el-radio-group v-model="formData.accountReceivablePledgeType">
                            <el-radio :label="3">已质押</el-radio>
                            <el-radio :label="6">放款前质押</el-radio>
                            <el-radio :label="6">其他</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>上游支付方式：</span>
                        <el-radio-group v-model="formData.supplierPaymentType">
                            <el-radio :label="3">银行转帐</el-radio>
                            <el-radio :label="6">银行承兑</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>上游货款方式：</span>
                        <el-radio-group v-model="formData.supplierPaymentMethod">
                            <el-radio :label="3">先款后货</el-radio>
                            <el-radio :label="6">先货后款</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>经销商首付款：</span>
                        {{formData.downPaymentAmount}}元 <img src="../../../../assets/images/crm-edit.png" alt="" class="info-img-edit">
                    </p>
                    <p>
                        <span>剩余货款：</span>
                        200,000元
                    </p>
                    <p>
                        <span>预计服务费总额：</span>
                        10,000元
                    </p>
                    <p>
                        <span>预计每期服务费：</span>
                        10,000元
                    </p>
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
                    <p>
                        <span>执行费率：</span>
                        {{paymentDetail.projectInfo.transferBankRate}}%
                    </p>
                    <p>
                        <span>银行承兑：</span>
                        {{paymentDetail.projectInfo.acceptBankRate}}%
                    </p>
                    <p>
                        <span>银行转帐：</span>
                        {{paymentDetail.projectInfo.transferBankRate}}%
                    </p>
                    <div class="info-title">采购单信息</div>
                    <p>
                        <span>采购单金额：</span>
                        {{ paymentDetail.payOrderPoDetail.poAmount }}元
                    </p>
                    <p>
                        <span>采购明细表：</span>
                        <template v-if="paymentDetail.payOrderPoDetail && paymentDetail.payOrderPoDetail.poDetail">
                            <img :src="item.url" :key="item.url" alt="" @click="goDetail(item.url)"
                                 v-for="item in JSON.parse(paymentDetail.payOrderPoDetail.poDetail)" class="info-img">
                        </template>
                    </p>
                    <p>
                        <span>采购批次：</span>
                        {{ paymentDetail.payOrderPoDetail.poNumber }}
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
                        {{paymentDetail.payOrderPoDetail.freeInterestType}}
                    </p>
                </div>
            </div>
        </div>
        <p class="tips">
            审核通过后，将会给经销商发送《订单及服务费确认函》
        </p>
        <div slot="footer" class="dialog-footer">
            <div class="btn-group">
                <h-button type="cancel" @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onReceived">确认审核</h-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { updatePaymentOrderStatusNoPass, updatePaymentOrderStatusPass } from '@/views/crm/paymentOrder/api'

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
            formData: {
                checkPass: '',
                approvalRemark: '',
                accountReceivablePledgeType: '',
                supplierPaymentType: '',
                downPaymentAmount: '',
                supplierPaymentMethod: ''
            }
        }
    },
    methods: {
        onCancel () {
            this.$emit('onClose')
        },
        onReceived () {
            if (this.formData.checkPass === 'pass') {
                updatePaymentOrderStatusPass()
            } else if (this.formData.checkPass === 'noPass') {
                updatePaymentOrderStatusNoPass()
            }
        },
        goDetail (url) {
            window.open(url)
        }
    }
}
</script>

<style scoped lang="scss">
.info-content{
    .row-filed {
        display: flex;
        .col-filed{
            flex: 0 0 1;
        }
    }
}
.info-img {
    width: 80px;
    cursor: pointer;
}
.info-img-edit {
    width: 30px;
    cursor: pointer;
}
</style>

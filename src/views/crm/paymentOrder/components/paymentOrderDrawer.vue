<template>
    <div class="drawer-wrap">
        <el-drawer title="支付单详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%'
                   :before-close="handleClose" :wrapperClosable=false>
            <div class="drawer-content">
                <div class="info-content">
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="info-title">项目信息</span>
                        </p>
                    </div>
                    <div class="row-filed project">
                        <p class="col-filed">
                            <span class="label">项目： </span>{{ paymentOrderDetail.projectInfo.projectName }}
                        </p>
                        <p class="col-filed">
                            <span class="label">经销商：</span>{{ paymentOrderDetail.projectInfo.companyName }}
                        </p>
                        <p class="col-filed">
                            <span class="label">所属分部：</span>{{ paymentOrderDetail.projectInfo.deptName }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="info-title">采购单信息</span>
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">采购单金额：</span>
                            {{ paymentOrderDetail.payOrderPoDetail.poAmount  | fundMoneyHasTail }}元
                        </p>
                        <p class="col-filed col-50">
                            <span class="label">最迟发货日期：</span>
                            {{ paymentOrderDetail.payOrderPoDetail.lastGoodsDate || '-' }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <div class="col-filed col-50 info-img-group">
                            <span class="label">采购明细表：</span>
                            <p class="content">
                                <template
                                    v-if="paymentOrderDetail.payOrderPoDetail && paymentOrderDetail.payOrderPoDetail.poDetail">
                                    <span class="img-box" :key="item.url" v-for="item in paymentOrderDetail.payOrderPoDetail.poDetail" @click="goDetail(item.url)">
                                         <img :src="item.url"  alt="" >
                                    </span>
                                </template>
                            </p>
                        </div>
                        <p class="col-filed col-50 address-group">
                            <span class="label address">收货地址：</span>
                            {{ paymentOrderDetail.payOrderPoDetail.goodsAddress || '-' }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-25">
                            <span class="label">采购批次：</span>
                            {{
                                paymentOrderDetail.payOrderPoDetail.poNumber  | attributeComputed(PaymentOrderDict.applyType.list)
                            }}采购
                        </p>
                        <p class="col-filed col-25">
                            <span class="label">经销商首付款比例：</span> {{ paymentOrderDetail.payOrderPoDetail.prePercent }}%
                        </p>
                        <p class="col-filed col-25">
                            <span class="label">剩余货款支付周期：</span>{{
                                paymentOrderDetail.payOrderPoDetail.restPaymentPeriod
                            }}月
                        </p>
                        <p class="col-filed col-25">
                            <span class="label">免息方式：</span>{{
                                paymentOrderDetail.payOrderPoDetail.freeInterestType | attributeComputed(PurchaseOrderDict.freeInterestType.list)
                            }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="info-title">支付单信息</span>
                            <span class="info-status">
                                {{
                                    paymentOrderDetail.payOrderDetail.status | attributeComputed(PaymentOrderDict.status.list)
                                }}
                            </span>
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">申请支付金额：</span>
                            {{ paymentOrderDetail.payOrderDetail.applyAmount | fundMoneyHasTail }}元
                        </p>
                        <p class="col-filed col-50">
                            <span class="label">最迟发货日期：</span> {{ paymentOrderDetail.payOrderDetail.lastGoodsDate }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">上游供应商：</span>{{ paymentOrderDetail.payOrderDetail.supplierCompanyName }}
                        </p>
                        <p class="col-filed col-50 address-group">
                            <span class="label address">收货地址：</span>
                            {{ paymentOrderDetail.payOrderDetail.goodsAddress }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <div class="col-filed info-img-group">
                            <span class="label">采购明细表：</span>
                            <p class="content">
                                <template
                                    v-if="paymentOrderDetail.payOrderDetail && paymentOrderDetail.payOrderDetail.paymentDetail">
                                    <span class="img-box" @click="goDetail(item.url)" :key="item.url"  v-for="item in paymentOrderDetail.payOrderDetail.paymentDetail">
                                        <img :src="item.url" alt="" >
                                    </span>
                                </template>
                            </p>
                        </div>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="label">申请时间：</span>
                            {{ paymentOrderDetail.payOrderDetail.applyDate | formatDate('YYYY-MM-DD HH:mm:ss') }}
                        </p>
                        <p class="col-filed">
                            <span class="label">申请人：</span>
                            {{
                                paymentOrderDetail.payOrderDetail.createBy
                            }}（{{ paymentOrderDetail.payOrderDetail.createPhone }}）
                        </p>
                    </div>
                    <div class="row-filed" v-if="PaymentOrderDict.status.list[7].key === paymentOrderDetail.payOrderDetail.status">
                        <p class="col-filed">
                            <span class="label">关闭时间：</span>
                            {{ paymentOrderDetail.payOrderDetail.closeTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                        </p>
                        <p class="col-filed">
                            <span class="label">申请人：</span>
                            {{
                                paymentOrderDetail.payOrderDetail.createBy
                            }}（{{ paymentOrderDetail.payOrderDetail.createPhone }}）
                        </p>
                    </div>
                    <div class="row-filed" v-if="PaymentOrderDict.status.list[0].key === paymentOrderDetail.payOrderDetail.status">
                        <h-button type="assist" @click="openApproveDialog" v-if="hosAuthCheck(Auths.CRM_PAYMENT_REVIEW)">
                            支付单审核
                        </h-button>
                    </div>
                    <template v-if="PaymentOrderDict.status.list[1].key <= paymentOrderDetail.payOrderDetail.status">
                        <!--                    首付款待支付start-->
                        <div class="row-filed">
                            <p class="col-filed col-33">
                                <span class="label">审核人：</span>{{
                                    paymentOrderDetail.payOrderDetail.approvalUser
                                }}（{{ paymentOrderDetail.payOrderDetail.approvalPhone }}）
                            </p>
                            <p class="col-filed col-33">
                                <span class="label">审核时间：</span>
                                {{ paymentOrderDetail.payOrderDetail.approvalTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                            </p>
                            <p class="col-filed col-33">
                                <span class="label">审核结果：</span>{{
                                    paymentOrderDetail.payOrderDetail.approvalStatus | attributeComputed(PaymentOrderDict.approvalStatus.list)
                                }}
                            </p>
                        </div>
                        <template v-if="paymentOrderDetail.payOrderDetail.approvalStatus === PaymentOrderDict.approvalStatus.list[1].key">
                            <div class="row-filed">
                                <p class="col-filed col-33">
                                    <span class="label">审核备注：</span>{{paymentOrderDetail.payOrderDetail.approvalRemark || '-'}}
                                </p>
                            </div>
                        </template>
                        <template v-if="(!paymentOrderDetail.payOrderDetail.closeReasonCode || paymentOrderDetail.payOrderDetail.closeReasonCode >= PaymentOrderDict.closeReasonCode.list[1].key) && paymentOrderDetail.payOrderDetail.orderLetterStatus !== PaymentOrderDict.orderLetterStatus.list[2].key">
                            <div class="row-filed">
                                <p class="col-filed col-33">
                                    <span class="label">应收账款质押：</span>{{
                                        paymentOrderDetail.payOrderDetail.accountReceivablePledgeType | attributeComputed(PaymentOrderDict.accountReceivablePledgeType.list)
                                    }}
                                </p>
                                <p class="col-filed col-33">
                                    <span class="label">上游支付方式：</span>
                                    {{
                                        paymentOrderDetail.payOrderDetail.supplierPaymentType | attributeComputed(PaymentOrderDict.supplierPaymentType.list)
                                    }}
                                </p>
                                <p class="col-filed col-33">
                                    <span class="label">上游货款方式：</span>{{
                                        paymentOrderDetail.payOrderDetail.supplierPaymentMethod  | attributeComputed(PaymentOrderDict.supplierPaymentMethod.list)
                                    }}
                                </p>
                            </div>
                            <div class="row-filed">
                                <p class="col-filed col-50">
                                    <span class="label">经销商首付款：</span>{{
                                        paymentOrderDetail.payOrderDetail.downPaymentAmount | fundMoneyHasTail
                                    }}元
                                </p>
                                <p class="col-filed col-50">
                                    <span class="label">剩余货款：</span> {{ paymentOrderDetail.payOrderDetail.arrearAmount  | fundMoneyHasTail }}元
                                </p>
                            </div>
                            <div class="row-filed">
                                <p class="col-filed col-50">
                                    <span class="label">预计服务费总额：</span> {{ paymentOrderDetail.payOrderDetail.feeAmount  | fundMoneyHasTail }}元
                                </p>
                                <p class="col-filed col-50">
                                    <span class="label">预计每期服务费：</span> {{
                                        paymentOrderDetail.payOrderDetail.feeAmountPer  | fundMoneyHasTail
                                    }}元
                                </p>
                            </div>
                            <div class="row-filed confirm-server">
                                《订单及服务费确认函》： <span class="info-status-words">{{
                                    paymentOrderDetail.payOrderDetail.orderLetterStatus | attributeComputed(PaymentOrderDict.orderLetterStatus.list)
                                }}</span>
                                <!--                        首付款待签约以后-->
                                <h-button type="primary"
                                          v-if="PaymentOrderDict.status.list[2]  <= paymentOrderDetail.payOrderDetail.status && hosAuthCheck(Auths.CRM_PAYMENT_CONTRACT_SEE)">
                                    查看合同
                                </h-button>
                                <!--                        首付款待签约以后-->
                            </div>
                        </template>
                    </template>
                    <!--                    首付款待支付end-->
                    <template v-if="paymentOrderDetail.payOrderDetail.orderLetterStatus !== PaymentOrderDict.orderLetterStatus.list[0].key && paymentOrderDetail.respFundResults.downpaymentFund && (!paymentOrderDetail.payOrderDetail.closeReasonCode || paymentOrderDetail.payOrderDetail.closeReasonCode  >=PaymentOrderDict.closeReasonCode.list[2].key)">
                        <template v-if="PaymentOrderDict.status.list[1].key  <= paymentOrderDetail.payOrderDetail.status">
                            <div class="row-filed">
                                <p class="col-filed">
                                    <span class="info-title">首付款支付计划：</span>
                                </p>
                            </div>
                            <div class="row-filed need-center" v-if="paymentOrderDetail.respFundResults.downpaymentFund">
                                <p class="col-filed col-30">
                                    <span class="label">首付款：</span>
                                    {{
                                        paymentOrderDetail.respFundResults.downpaymentFund.paymentAmount | fundMoneyHasTail
                                    }}元
                                </p>
                                <p class="col-filed col-30">
                                    <span class="label">应支付时间：</span>
                                    {{
                                        paymentOrderDetail.respFundResults.downpaymentFund.schedulePaymentDate | formatDate('YYYY-MM-DD')
                                    }}
                                    <img src="../../../../assets/images/crm-edit.png" alt=""
                                         v-if="PaymentOrderDict.paymentFlag.list[0].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag"
                                         @click="updateRow('首付款', paymentOrderDetail.respFundResults.downpaymentFund, false)"
                                         class="info-img-edit">
                                </p>
                                <p class="col-filed col-40 need-center">
                                    <span class="label">{{paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[2].key ? '支付成功' : '支付'}}时间：</span>
                                    {{ paymentOrderDetail.respFundResults.downpaymentFund.paidDate | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                    <template
                                        v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key">
                                        <h-button table class="ml-20"
                                                  v-if="hosAuthCheck(Auths.CRM_DOWN_PAYMENT_FUND_CONFIRM)"
                                                  @click="openFundsDialog(paymentOrderDetail.respFundResults.downpaymentFund.id,FundsDict.repaymentTypeArrays.list[0].key)">
                                            {{
                                                paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list)
                                            }}
                                        </h-button>
                                    </template>
                                    <template v-else>
                                        <span class="info-status ml-20">
                                            {{
                                                paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list)
                                            }}
                                        </span>
                                    </template>
                                </p>
                            </div>
                            <div class="row-filed">
                                <p class="col-filed">
                                    <span class="info-title">服务费支付计划：</span>
                                </p>
                            </div>
                            <template v-if="paymentOrderDetail.respFundResults.serviceFund">
                                <div class="row-filed need-center" :key="item.id"
                                     v-for="(item,index) in paymentOrderDetail.respFundResults.serviceFund">
                                    <p class="col-filed col-30">
                                        <span class="label">第{{ index + 1 }}期服务费：</span>
                                        {{ item.paymentAmount  | fundMoneyHasTail }} 元
                                        <img src="../../../../assets/images/crm-edit.png" alt=""
                                             v-if="PaymentOrderDict.paymentFlag.list[0].key === item.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === item.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === item.paymentFlag"
                                             @click="updateRow(`第${index + 1}期服务费`, item)"
                                             class="info-img-edit">
                                    </p>
                                    <p class="col-filed col-30">
                                        <span class="label">应支付时间：</span>{{ item.schedulePaymentDate | formatDate }}
                                        <img src="../../../../assets/images/crm-edit.png" alt=""
                                             v-if="PaymentOrderDict.paymentFlag.list[0].key === item.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === item.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === item.paymentFlag"
                                             @click="updateRow(`第${index + 1}期服务费`, item)"
                                             class="info-img-edit">
                                    </p>
                                    <div class="col-filed col-40 service-pay-time need-center">
                                        <p class="mr-50">
                                            <span class="label">支付<template v-if="item.paymentFlag === PaymentOrderDict.paymentFlag.list[3].key">失败</template>
                                                <template v-else-if="item.paymentFlag === PaymentOrderDict.paymentFlag.list[2].key">成功</template>时间：</span>{{ item.paidTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                        </p>
                                        <template
                                            v-if="item.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key">
                                            <h-button table
                                                      v-if="hosAuthCheck(Auths.CRM_SERVICE_FUND_CONFIRM)"
                                                      @click="openFundsDialog(item.id, FundsDict.repaymentTypeArrays.list[1].key)">
                                                {{
                                                    item.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list)
                                                }}
                                            </h-button>
                                        </template>
                                        <template v-else>
                                        <span class="info-status">
                                            {{
                                                item.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list)
                                            }}
                                        </span>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            <div class="row-filed">
                                <p class="col-filed col-50">
                                    <span class="label">当前服务费合计：</span>
                                    {{ paymentOrderDetail.respFundResults.totalServiceAmount  | fundMoneyHasTail }}元
                                </p>
                                <p class="col-filed col-50">
                                    <span class="label">已成功支付：</span>
                                    {{ paymentOrderDetail.respFundResults.totalPaidAmount  | fundMoneyHasTail }}元
                                </p>
                            </div>
                        </template>
                        <template v-if="(PaymentOrderDict.status.list[3].key  === paymentOrderDetail.payOrderDetail.status ||
                                        PaymentOrderDict.status.list[4].key  === paymentOrderDetail.payOrderDetail.status ||
PaymentOrderDict.status.list[5].key  === paymentOrderDetail.payOrderDetail.status||
PaymentOrderDict.status.list[6].key  === paymentOrderDetail.payOrderDetail.status ) && true">
                            <div class="row-filed">
                                <p class="col-filed">
                                    <span class="info-title">上游支付：</span>
                                </p>
                            </div>
                            <div class="row-filed" v-if="paymentOrderDetail.respSupplierAmount">
                                <p class="col-filed col-33">
                                    <span class="label">应向上游支付：</span> {{ paymentOrderDetail.respSupplierAmount.totalAmount | fundMoneyHasTail}}元
                                </p>
                                <p class="col-filed col-33">
                                    <span class="label">已向上游支付：</span> {{ paymentOrderDetail.respSupplierAmount.paidAmount | fundMoneyHasTail}}元
                                </p>
                                <p class="col-filed col-33">
                                <span class="info-status-words" @click="openLookPrevPaymentDialog"
                                      v-if="hosAuthCheck(Auths.CRM_PREV_PAYMENT_DETAIL)"
                                >查看上游支付明细</span>
                                </p>
                            </div>
                            <div class="row-filed" v-if="paymentOrderDetail.respGoodsAmount">
                                <h-button type="assist" @click="openPrevPay" v-if="hosAuthCheck(Auths.CRM_PAYMENT_PREV)&& (paymentOrderDetail.supplierPayFlag === 1)">
                                    上游支付
                                </h-button>
                            </div>
                            <template>
                                <div class="row-filed">
                                    <p class="col-filed">
                                        <span class="info-title">到货信息：</span>
                                    </p>
                                </div>
                                <div class="row-filed">
                                    <p class="col-filed col-33">
                                        <span class="label">应到货金额总计：</span> {{ paymentOrderDetail.respGoodsAmount.totalAmount | fundMoneyHasTail }}元
                                    </p>
                                    <p class="col-filed col-33">
                                        <span class="label">已到货金额总计：</span> {{ paymentOrderDetail.respGoodsAmount.goodsAmount | fundMoneyHasTail }}元
                                    </p>
                                    <p class="col-filed col-33">
                                <span class="info-status-words" @click="openLookReceiptDetail"
                                      v-if="hosAuthCheck(Auths.CRM_REVIEW_RECEIPT_DETAIL)">查看收货明细</span>
                                    </p>
                                </div>
                                <div class="row-filed">
                                    <h-button type="assist" @click="openConfirmReceipt"
                                              v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONFIRM_RECEIPT) && (paymentOrderDetail.respGoodsAmount.goodsAmount !== paymentOrderDetail.respGoodsAmount.totalAmount)">确认收货
                                    </h-button>
                                </div>
                            </template>
                            <template v-if="!paymentOrderDetail.payOrderDetail.closeReasonCode">
                                <div class="row-filed">
                                    <p class="col-filed">
                                        <span class="info-title">剩余货款支付计划：</span>
                                    </p>
                                </div>
                                <div class="row-filed" v-if="paymentOrderDetail.respFundResults.arrearFund">
                                    <p class="col-filed col-25">
                                        <span class="label">剩余货款：</span>
                                        {{ paymentOrderDetail.respFundResults.arrearFund.paymentAmount }}元
                                    </p>
                                    <p class="col-filed col-25">
                                        <span class="label">应支付时间：</span>
                                        {{ paymentOrderDetail.respFundResults.arrearFund.schedulePaymentDate }}
                                        <img src="../../../../assets/images/crm-edit.png" alt=""
                                             v-if="PaymentOrderDict.paymentFlag.list[0].key === paymentOrderDetail.respFundResults.arrearFund.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === paymentOrderDetail.respFundResults.arrearFund.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === paymentOrderDetail.respFundResults.arrearFund.paymentFlag"
                                             @click="updateRow(`尾款`, paymentOrderDetail.respFundResults.arrearFund, false)"
                                             class="info-img-edit">
                                    </p>
                                    <p class="col-filed col-25">
                                        <span class="label">支付时间：</span>
                                        {{ paymentOrderDetail.respFundResults.arrearFund.paidDate | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                    </p>
                                    <p class="col-filed col-25">
                                        <template
                                            v-if="paymentOrderDetail.respFundResults.arrearFund.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key">
                                            <h-button table
                                                      v-if="hosAuthCheck(Auths.CRM_ARREAR_FUND_CONFIRM)"
                                                      @click="openFundsDialog(paymentOrderDetail.respFundResults.arrearFund.id,FundsDict.repaymentTypeArrays.list[2].key)">
                                                {{
                                                    paymentOrderDetail.respFundResults.arrearFund.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list)
                                                }}
                                            </h-button>
                                        </template>
                                        <template v-else>
                                        <span class="info-status">
                                            {{
                                                paymentOrderDetail.respFundResults.arrearFund.paymentFlag | attributeComputed(PaymentOrderDict.paymentFlag.list)
                                            }}
                                        </span>
                                        </template>
                                    </p>
                                </div>
                            </template>
                        </template>
                    </template>
                </div>
                <p v-if="PaymentOrderDict.status.list[7].key === paymentOrderDetail.payOrderDetail.status" class="tips">
                    支付单关闭原因：{{ paymentOrderDetail.payOrderDetail.closeReason }}
                </p>
                <div class="drawer-footer">
                    <div class="drawer-button">
                        <!--                        <h-button type="assist">支付单审核</h-button>-->

                        <!--                        <h-button type="primary">审核通过</h-button>-->
                        <h-button type="default" @click="handleClose">取消</h-button>
                    </div>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="修改" :visible.sync="updateRowVisible" width="450px" :before-close="()=> updateRowClose()"
                   class="update-row">
            <el-form label-width="150px" :model="updateForm" :rules="rules" ref="form">
                <el-form-item :label="updateRowLabel" prop="amount" v-if="showAmount">
                    <el-input v-model="updateForm.amount" v-isNegative="updateForm.amount" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="应支付时间：" prop="time">
                    <el-date-picker
                        v-model="updateForm.time"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <h-button type="assist" @click="updateRowClose">取消</h-button>
                        <h-button type="primary" @click="updateRowEnter">确认</h-button>
                    </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getPaymentOrderDetail, updateServiceAmountAndTime } from '@/views/crm/paymentOrder/api'
import PaymentOrderDict from '../paymentOrderDict'
import FundsDict from '@/views/crm/funds/fundsDict'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import * as Auths from '@/utils/auth_const'

export default {
    name: 'paymentOrderDrawer',
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        row: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            Auths,
            activeNames: ['1'],
            tableData: [],
            tableLabel: [
                { label: '支付单编号', prop: 'creditLevel', width: '120' },
                { label: '金额', prop: 'creditLevel', width: '100' },
                { label: '状态', prop: 'creditLevel', width: '100' },
                { label: '申请时间', prop: 'creditLevel', width: '150', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'creditLevel', width: '150', formatters: 'dateTimes' }
            ],
            paymentOrderDetail: {
                projectInfo: {},
                payOrderDetail: {},
                payOrderPoDetail: {},
                respFundResults: {
                    serviceFund: [],
                    downpaymentFund: [],
                    arrearFund: []
                },
                respGoodsAmount: {},
                respSupplierAmount: {}
            },
            PaymentOrderDict,
            PurchaseOrderDict,
            FundsDict,
            updateRowVisible: false,
            updateForm: {
                amount: '',
                time: ''
            },
            updateRowLabel: '',
            showAmount: true,
            rules: {
                amount: [
                    { required: true, message: '请输入金额' }
                ],
                time: [
                    { required: true, message: '请选择时间' }
                ]
            }

        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            nestDdata: 'nestDdata'
        })
    },
    methods: {
        updateRow (labelName, row, hideAmount) {
            this.updateRowVisible = true
            this.updateForm.amount = row.paymentAmount
            this.updateForm.time = row.schedulePaymentDate
            this.updateForm.id = row.id
            this.updateRowLabel = labelName
            if (hideAmount !== undefined) {
                this.showAmount = hideAmount
            } else {
                this.showAmount = true
            }
        },
        updateRowClose () {
            this.updateRowVisible = false
            this.updateForm.amount = ''
            this.updateForm.time = ''
            this.updateForm.id = ''
        },
        updateRowEnter () {
            this.$refs.form.validate(async (value) => {
                if (value) {
                    const params = {
                        id: this.updateForm.id,
                        paymentAmount: this.updateForm.amount,
                        schedulePaymentDate: this.updateForm.time,
                        updateBy: this.userInfo.employeeName
                    }
                    await updateServiceAmountAndTime(params)
                    this.$message.success('更新成功')
                    this.getPaymentOrderDetail()
                    this.updateRowClose()
                }
            })
        },
        onChangeCheckbox (b, key) {
            if (!b) {
                this.businessType[key] = ''
            }
        },
        serviceCapabilityChange () {
            if (this.businessDetail.serviceCapability == 2) {
                this.serviceCapabilityDetail = []
            }
        },
        handleChange (val) {
            console.log(val)
        },
        handleClose () {
            this.paymentOrderDetail = {
                projectInfo: {},
                payOrderDetail: {},
                payOrderPoDetail: {},
                respFundResults: {
                    serviceFund: [],
                    downpaymentFund: [],
                    arrearFund: []
                },
                respGoodsAmount: {},
                respSupplierAmount: {}
            }
            this.$emit('backEvent')
        },
        goDetail (url) {
            window.open(url)
        },
        openApproveDialog () {
            this.$emit('openApproveDialog', this.paymentOrderDetail)
        },
        async tableOpenApproveDialog (id) {
            const { data } = await getPaymentOrderDetail(id)
            this.$emit('openApproveDialog', data)
        },
        openPrevPay () {
            const params = {
                paymentOrderId: this.paymentOrderDetail.payOrderDetail.id,
                poId: this.paymentOrderDetail.payOrderDetail.poId
            }
            this.$emit('openPrevPayDialog', params)
        },
        openConfirmReceipt () {
            const params = {
                paymentOrderId: this.paymentOrderDetail.payOrderDetail.id
            }
            this.$emit('openConfirmReceiptDialog', params)
        },
        openFundsDialog (id, type) {
            const params = {
                id: id,
                orderId: this.paymentOrderDetail.respFundResults.downpaymentFund.orderId
            }
            this.$emit('openFundsDialog', params, type)
        },
        async tableOpenFundsDialog (id, status) {
            const { data } = await getPaymentOrderDetail(id)
            let _id = ''
            let type = ''
            if (status === PaymentOrderDict.status.list[2].key) {
                _id = data.respFundResults.downpaymentFund.id
                type = FundsDict.repaymentTypeArrays.list[0].key
            } else if (status === PaymentOrderDict.status.list[5].key) {
                _id = data.respFundResults.arrearFund.id
                type = FundsDict.repaymentTypeArrays.list[2].key
            }
            const params = {
                id: _id,
                orderId: data.respFundResults.downpaymentFund.orderId
            }
            this.$emit('openFundsDialog', params, type)
        },
        openLookPrevPaymentDialog () {
            const params = {
                paymentOrderId: this.paymentOrderDetail.payOrderDetail.id
            }
            this.$emit('openLookPrevPaymentDialog', params)
        },
        openLookReceiptDetail () {
            const params = {
                paymentOrderId: this.paymentOrderDetail.payOrderDetail.id
            }
            this.$emit('openLookReceiptDetail', params)
        },
        async getPaymentOrderDetail () {
            const { data } = await getPaymentOrderDetail(this.row.id)
            this.paymentOrderDetail = data
        }
    },
    watch: {
        drawer (val) {
            if (val) {
                this.getPaymentOrderDetail()
            }
        }
    }
}
</script>

<style scoped lang="scss">
.info-content {
    padding: 0 20px;
    .project {
        display: flex;
        justify-content: space-between;
    }
    .row-filed {
        display: flex;
        padding: 10px;

        .col-filed {
            display: flex;
            padding-right: 15px;
            font-size: 14px;
            color: #333333;
            font-weight: 400;
            cursor: default;
            line-height: 15px;
            box-sizing: border-box;

            //.address {
            //    width: 120px;
            //}
        }

        .col-50 {
            flex: 0 0 50%;
        }
        .col-30 {
            flex: 0 0 30%;
        }
        .col-33 {
            flex: 0 0 33%;
        }

        .col-25 {
            flex: 0 0 25%;
        }
        .col-45 {
             flex: 0 0 45%;
         }
        .col-40 {
            flex: 0 0 40%;
        }
    }

    .info-title {
        font-size: 15px;
        color: #000000;
        font-weight: 600;
        padding-right: 20px;
        line-height: 30px;
    }

    .info-status {
        background: #FF7A45;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 14px;
        border-radius: 4px;
        line-height: 22px;
    }

    .info-status-words {
        color: #FF7A45;
        cursor: pointer;
    }

    .info-title-main-color {
        color: #FF7A45;
        line-height: 30px;
        padding: 15px 0;
    }
}

/deep/ .el-drawer__body {
    overflow-y: scroll;
}

.drawer-content {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 100px;

    .drawer-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px 24px;
        border-top: 1px solid #e5e5ea;
        background: #fff;
        z-index: 1000;

        button {
            flex: 1;
        }

        .drawer-button {
            text-align: right;
        }
    }
}

/deep/ .el-tabs__nav-scroll {
    padding-left: 20px;
}

/deep/ .el-drawer__header {
    padding: 20px 20px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    font-size: 16px;
}

/deep/ .el-collapse-item__header {
    font-weight: 600;
    color: #000000;
    font-size: 14px;
}

.info-img {
    width: 80px;
    height: 80px;
    cursor: pointer;
}

.confirm-server {
    display: flex;
    font-size: 12px;

    .info-status-words {
        cursor: default;
    }
}

.update-row {
    /deep/ .el-dialog__body {
        min-height: 140px;
    }
}

.info-img-edit {
    width: 18px;
    height: 18px;
    margin-left: 12px;
    cursor: pointer;
}
.tips {
    color: red;
    font-size: 12px;
    padding: 30px;
}
.service-pay-time {
    display: flex;
    .mr-50 {
        margin-right: 12px;
    }
}
.info-img-group {
    display: flex;
    width: 100%;
    .content {
        display: flex;
        flex-wrap: wrap;
        span {
            display: block;
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
            margin-right: 12px;
            cursor: pointer;
        }
        img {
            display: block;
            margin: auto;
            max-height: 80px;
            max-width: 80px;
        }
    }
    .label {
        flex: 0 0 100px;
    }
}
.address-group {
    display: flex;
    align-items: flex-start;
    .address {
        flex: 0 0 80px;
    }
}
.need-center {
    align-items: center;
}
.ml-20{
    margin-left: 20px;
}
</style>

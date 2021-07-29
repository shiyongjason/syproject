<template>
    <div class="drawer-wrap">
        <!-- <el-drawer title="支付单详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='65%'
                   :before-close="handleClose" :wrapperClosable=false> -->
        <h-drawer v-if="drawer" title="支付单详情" :visible.sync="drawer" direction='rtl' size='60%' :wrapperClosable="false" :modal="false" :beforeClose="handleClose">
            <template #connect>
                <h-button type="primary" v-if="paymentOrderDetail.payOrderDetail.isShowDownloadLoan&&hosAuthCheck(Auths.CRM_PAYMENT_REVIEW_DOWN)" @click="onDownFile">下载放款交接单</h-button>
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
                                    <template v-if="paymentOrderDetail.payOrderPoDetail && paymentOrderDetail.payOrderPoDetail.poDetail">
                                        <span class="img-box" :key="item.url" v-for="item in paymentOrderDetail.payOrderPoDetail.poDetail" @click="goDetail(item.url)">
                                            <img :src="item.url" alt="">
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
                            }}
                            </p>
                            <p class="col-filed col-25">
                                <span class="label">经销商预付款比例：</span> {{ paymentOrderDetail.payOrderPoDetail.prePercent }}%
                            </p>
                            <p class="col-filed col-25">
                                <span class="label">剩余货款支付周期：</span>{{
                                paymentOrderDetail.payOrderPoDetail.restPaymentPeriod
                            }}个月
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
                                <span class="label">最迟发货日期：</span> {{ paymentOrderDetail.payOrderDetail.lastGoodsDate||'-' }}
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
                                    <template v-if="paymentOrderDetail.payOrderDetail && paymentOrderDetail.payOrderDetail.paymentDetail">
                                        <span class="img-box" :key="item.url" v-for="item in paymentOrderDetail.payOrderDetail.paymentDetail">
                                            <imageAddToken :file-url="item.url" />
                                        </span>
                                    </template>
                                </p>
                            </div>
                        </div>
                        <!-- 新增 -->
                        <div class="row-filed">
                            <p class="col-filed col-33">
                                <span class="label">银行联行号：</span>
                                {{paymentOrderDetail.payOrderDetail.supplierBankNo}}
                            </p>
                            <p class="col-filed col-33">
                                <span class="label">供应商开户行名称：</span>
                                {{paymentOrderDetail.payOrderDetail.supplierAccountName}}
                            </p>
                            <p class="col-filed col-33">
                                <span class="label">供应商银行账号：</span>
                                {{paymentOrderDetail.payOrderDetail.supplierAccountNo}}
                            </p>
                        </div>

                        <div class="row-filed">
                            <p class="col-filed col-33">
                                <span class="label">上游支付方式：</span>
                                {{paymentOrderDetail.payOrderDetail.supplierPaymentType | attributeComputed(PaymentOrderDict.supplierPaymentType.list)}}
                            </p>
                            <p class="col-filed col-33">
                                <span class="label">期望上游支付日期：</span>
                                {{paymentOrderDetail.payOrderDetail.expectSupplierPaymentDate?moment(paymentOrderDetail.payOrderDetail.expectSupplierPaymentDate).format('YYYY-MM-DD'):''}}
                            </p>
                            <p class="col-filed  col-33">
                                <span class="label">备注信息：</span>
                                {{paymentOrderDetail.payOrderDetail.specialRemark}}
                            </p>
                        </div>
                        <div class="row-filed" v-if="paymentOrderDetail.payOrderDetail.supplierPaymentType==2">
                            <div class="ticket-table">
                                <div class="tr">
                                    <div class="th">
                                        出票张数
                                    </div>
                                    <div class="th">
                                        票面金额（元）
                                    </div>
                                </div>
                                <div class="tr" v-for="(item,index) in paymentOrderDetail.billAmountResponse.billAmountDetail" :key="index">
                                    <div class="td">第 {{item.number}} 张票</div>
                                    <div class="td">{{item.amount|fundMoneyHasTail}}</div>
                                </div>
                                <div class="tr">
                                    <div class="td">合计 </div>
                                    <div class="td">{{paymentOrderDetail.billAmountResponse.totalAmount|fundMoneyHasTail}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed col-33">
                                <span class="label">申请时间：</span>
                                {{ paymentOrderDetail.payOrderDetail.applyDate | formatDate('YYYY-MM-DD HH:mm:ss') }}
                            </p>
                            <p class="col-filed col-33">
                                <span class="label">申请人：</span>
                                {{paymentOrderDetail.payOrderDetail.createBy}}（{{ paymentOrderDetail.payOrderDetail.createPhone }}）
                            </p>
                        </div>
                        <div class="row-filed" v-if="PaymentOrderDict.status.list[7].key === paymentOrderDetail.payOrderDetail.status">
                            <p class="col-filed">
                                <span class="label">关闭时间：</span>
                                {{ paymentOrderDetail.payOrderDetail.closeTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                            </p>
                            <p class="col-filed">
                                <span class="label">关闭人：</span>
                                {{
                                paymentOrderDetail.payOrderDetail.closeBy
                            }}（{{ paymentOrderDetail.payOrderDetail.closePhone }}）
                            </p>
                        </div>
                        <div class="row-filed" v-if="PaymentOrderDict.status.list[0].key === paymentOrderDetail.payOrderDetail.status">
                            <h-button type="assist" @click="openApproveDialog" v-if="hosAuthCheck(Auths.CRM_PAYMENT_REVIEW_DETAIL)">
                                支付单审核
                            </h-button>
                        </div>
                        <template v-if="paymentOrderDetail.payOrderDetail.status !== PaymentOrderDict.status.list[0].key">
                            <template v-if="PaymentOrderDict.status.list[1].key <= paymentOrderDetail.payOrderDetail.status && (paymentOrderDetail.payOrderDetail.approvalStatus >= PaymentOrderDict.approvalStatus.list[0].key)">
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
                                        <p class="col-filed approval-remark">
                                            <span class="label">审核备注：</span>{{paymentOrderDetail.payOrderDetail.approvalRemark || '-'}}
                                        </p>
                                    </div>
                                </template>
                                <!--                            && paymentOrderDetail.payOrderDetail.orderLetterStatus !== PaymentOrderDict.orderLetterStatus.list[2].key-->
                                <template v-if="(!paymentOrderDetail.payOrderDetail.closeReasonCode || paymentOrderDetail.payOrderDetail.closeReasonCode >= PaymentOrderDict.closeReasonCode.list[1].key)">
                                    <div class="row-filed">
                                        <p class="col-filed col-33">
                                            <span class="label">应收账款质押：</span>{{
                                            paymentOrderDetail.payOrderDetail.accountReceivablePledgeType | attributeComputed(PaymentOrderDict.accountReceivablePledgeType.list)
                                        }}
                                        </p>

                                        <p class="col-filed col-33">
                                            <span class="label">上游货款方式：</span>{{
                                            paymentOrderDetail.payOrderDetail.supplierPaymentMethod  | attributeComputed(PaymentOrderDict.supplierPaymentMethod.list)
                                        }}
                                        </p>
                                        <p class="col-filed col-33">
                                            <span class="label">下游合作方式：</span>{{
                                            paymentOrderDetail.payOrderDetail.dealerCooperationMethod==2?'代收代付': paymentOrderDetail.payOrderDetail.dealerCooperationMethod==1?'垫资代采':'-'
                                        }}
                                        </p>
                                    </div>
                                    <!--                                    <div class="row-filed">-->
                                    <!--                                        &lt;!&ndash; 新增 &ndash;&gt;-->
                                    <!--                                        <div class="col-filed info-img-group">-->
                                    <!--                                            <span class="label">网银盾照片：</span>-->
                                    <!--                                            <p class="content">-->
                                    <!--                                                <template v-if="paymentOrderDetail.payOrderDetail && paymentOrderDetail.payOrderDetail.shieldFiles">-->
                                    <!--                                                    <span class="img-box" :key="item.url" v-for="item in paymentOrderDetail.payOrderDetail.shieldFiles" @click="handle(item.fileUrl)">-->
                                    <!--                                                        <img :src=item.fileUrl />-->
                                    <!--                                                    </span>-->
                                    <!--                                                </template>-->
                                    <!--                                            </p>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                    <!--                                    <div class="row-filed">-->
                                    <!--                                        &lt;!&ndash; 新增 &ndash;&gt;-->
                                    <!--                                        <div class="col-filed info-img-group">-->
                                    <!--                                            <span class="label">共管户截图：</span>-->
                                    <!--                                            <p class="content">-->
                                    <!--                                                <template v-if="paymentOrderDetail.payOrderDetail && paymentOrderDetail.payOrderDetail.managedFiles">-->
                                    <!--                                                    <span class="img-box" :key="item.url" v-for="item in paymentOrderDetail.payOrderDetail.managedFiles" @click="handle(item.fileUrl)">-->
                                    <!--                                                        <img :src=item.fileUrl />-->
                                    <!--                                                    </span>-->
                                    <!--                                                </template>-->
                                    <!--                                            </p>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                    <div class="row-filed">
                                        <p class="col-filed col-33">
                                            <span class="label">质押信息：</span>{{
                                            paymentOrderDetail.payOrderDetail.pledgeNo||'-'
                                        }}
                                        </p>
                                        <p class="col-filed col-33">
                                            <span class="label" style="min-width:100px">OA货款支付编号：</span>{{paymentOrderDetail.payOrderDetail.oaNo||'-'  }}
                                        </p>
                                        <p class="col-filed">
                                            <span class="label">审核备注：</span>{{
                                            paymentOrderDetail.payOrderDetail.approvalRemark||'-'
                                        }}
                                        </p>
                                    </div>
                                    <div class="row-filed">
                                        <p class="col-filed col-50">
                                            <span class="label">经销商预付款：</span>{{
                                            paymentOrderDetail.payOrderDetail.downPaymentAmount | fundMoneyHasTail
                                        }}元
                                        </p>
                                        <p class="col-filed col-50" v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod==1">
                                            <span class="label">剩余货款：</span> {{ paymentOrderDetail.payOrderDetail.arrearAmount  | fundMoneyHasTail }}元
                                        </p>
                                    </div>
                                    <div class="row-filed" v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod==1">
                                        <p class="col-filed col-50">
                                            <span class="label">预计服务费总额：</span> {{ paymentOrderDetail.payOrderDetail.feeAmount  | fundMoneyHasTail }}元
                                        </p>
                                        <p class="col-filed col-50">
                                            <span class="label">预计每期服务费：</span> {{
                                            paymentOrderDetail.payOrderDetail.feeAmountPer  | fundMoneyHasTail
                                        }}元
                                        </p>
                                    </div>
                                    <div class="row-filed confirm-server" v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod==1">
                                        《订单及服务费确认函》： <span class="info-status-words">{{
                                        paymentOrderDetail.payOrderDetail.orderLetterStatus | attributeComputed(PaymentOrderDict.orderLetterStatus.list)
                                    }}</span>
                                        <!--                        首付款待签约以后-->
                                        <h-button table class="go-contract-detail" @click="goContractDetail" v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONTRACT_SEE) && paymentOrderDetail.payOrderDetail.orderLetterStatus === PaymentOrderDict.orderLetterStatus.list[1].key">
                                            查看合同
                                        </h-button>
                                        <!--                        首付款待签约以后-->
                                    </div>
                                </template>
                            </template>
                            <!-- 如果是代收代付就走这里面 -->
                            <template v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod==2">

                                <template>
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
                                                <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                    <img src="../../../../assets/images/crm-edit.png" alt="" v-if="PaymentOrderDict.paymentFlag.list[0].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag" @click="updateRow('首付款', paymentOrderDetail.respFundResults.downpaymentFund, false)" class="info-img-edit">
                                                </template>
                                            </p>
                                            <p class="col-filed col-40 need-center">
                                                <span class="label">
                                                    支付<template v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[3].key">失败</template><template
                                                        v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[2].key">成功</template><template
                                                        v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[4].key">取消</template>时间：</span>
                                                <template v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[4].key">
                                                    {{ paymentOrderDetail.respFundResults.downpaymentFund.updateTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                                </template>
                                                <template v-else>
                                                    {{ paymentOrderDetail.respFundResults.downpaymentFund.paidTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                                </template>
                                                <template v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key">
                                                    <h-button table class="ml-20" v-if="hosAuthCheck(Auths.CRM_DOWN_PAYMENT_FUND_CONFIRM)" @click="openFundsDialog(paymentOrderDetail.respFundResults.downpaymentFund.id,FundsDict.repaymentTypeArrays.list[0].key)">
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
                                                <span class="info-status-words" @click="openLookPrevPaymentDialog" v-if="hosAuthCheck(Auths.CRM_PREV_PAYMENT_DETAIL)">查看上游支付明细</span>
                                            </p>
                                        </div>
                                        <!-- <div class="row-filed" v-if="paymentOrderDetail.respGoodsAmount">
                                            <h-button type="assist" @click="openPrevPay" v-if="hosAuthCheck(Auths.CRM_PAYMENT_PREV)&& (paymentOrderDetail.supplierPayFlag === 1)">
                                                上游支付
                                            </h-button>
                                        </div> -->

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
                                                <span class="info-status-words" @click="openLookReceiptDetail" v-if="hosAuthCheck(Auths.CRM_REVIEW_RECEIPT_DETAIL)">查看收货明细</span>
                                            </p>
                                        </div>
                                        <div class="row-filed">
                                            <h-button type="assist" @click="openConfirmReceipt" v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONFIRM_RECEIPT) && (paymentOrderDetail.respGoodsAmount.goodsAmount !== paymentOrderDetail.respGoodsAmount.totalAmount)">确认收货
                                            </h-button>
                                        </div>
                                    </template>
                                </template>
                            </template>
                            <!-- 支付单待审核 -->
                            <!--                            订单及服务费确认函状态：orderLetterStatus 0： 未签约 1： 未签约 2： 客户已拒签-->
                            <!--                           downpaymentFund：  首付款支付-->
                            <!--                           closeReasonCode 支付单关闭原因： 1： 支付单审核不通过 2： 用户拒签订单及服务费确认函 3： 用户主动取消-->
                            <!--                            1）支付订单及服务费确认函状态不是未签约 2）首付款信息存在   3)支付单未关闭-->
                            <template v-else>
                                <template
                                    v-if="paymentOrderDetail.payOrderDetail.orderLetterStatus !== PaymentOrderDict.orderLetterStatus.list[0].key && paymentOrderDetail.respFundResults.downpaymentFund && (!paymentOrderDetail.payOrderDetail.closeReasonCode || paymentOrderDetail.payOrderDetail.closeReasonCode  >=PaymentOrderDict.closeReasonCode.list[2].key)">
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
                                                <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                    <img src="../../../../assets/images/crm-edit.png" alt="" v-if="PaymentOrderDict.paymentFlag.list[0].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag" @click="updateRow('首付款', paymentOrderDetail.respFundResults.downpaymentFund, false)" class="info-img-edit">
                                                </template>
                                            </p>
                                            <p class="col-filed col-40 need-center">
                                                <span class="label">
                                                    支付<template v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[3].key">失败</template><template
                                                        v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[2].key">成功</template><template
                                                        v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[4].key">取消</template>时间：</span>
                                                <template v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[4].key">
                                                    {{ paymentOrderDetail.respFundResults.downpaymentFund.updateTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                                </template>
                                                <template v-else>
                                                    {{ paymentOrderDetail.respFundResults.downpaymentFund.paidTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                                </template>
                                                <template v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key">
                                                    <h-button table class="ml-20" v-if="hosAuthCheck(Auths.CRM_DOWN_PAYMENT_FUND_CONFIRM)" @click="openFundsDialog(paymentOrderDetail.respFundResults.downpaymentFund.id,FundsDict.repaymentTypeArrays.list[0].key)">
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
                                            <div class="row-filed need-center" :key="item.id" v-for="(item,index) in paymentOrderDetail.respFundResults.serviceFund">
                                                <p class="col-filed col-30">
                                                    <span class="label">第{{ index + 1 }}期服务费：</span>
                                                    {{ item.paymentAmount  | fundMoneyHasTail }} 元
                                                    <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                        <img src="../../../../assets/images/crm-edit.png" alt="" v-if="PaymentOrderDict.paymentFlag.list[0].key === item.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === item.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === item.paymentFlag" @click="updateRow(`第${index + 1}期服务费`, item)" class="info-img-edit">
                                                    </template>
                                                </p>
                                                <p class="col-filed col-30">
                                                    <span class="label">应支付时间：</span>{{ item.schedulePaymentDate }}
                                                    <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                        <img src="../../../../assets/images/crm-edit.png" alt="" v-if="PaymentOrderDict.paymentFlag.list[0].key === item.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === item.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === item.paymentFlag" @click="updateRow(`第${index + 1}期服务费`, item)" class="info-img-edit">
                                                    </template>
                                                </p>
                                                <div class="col-filed col-40 service-pay-time need-center">
                                                    <p class="mr-50">
                                                        <span class="label">
                                                            <!--                                                换行有空格-->
                                                            支付<template v-if="item.paymentFlag === PaymentOrderDict.paymentFlag.list[3].key">失败</template><template v-else-if="item.paymentFlag === PaymentOrderDict.paymentFlag.list[2].key">成功</template><template
                                                                v-if="item.paymentFlag === PaymentOrderDict.paymentFlag.list[4].key">取消</template>时间：
                                                        </span><template v-if="item.paymentFlag === PaymentOrderDict.paymentFlag.list[4].key">{{ item.updateTime | formatDate('YYYY-MM-DD HH:mm:ss') }}</template>
                                                        <template v-else>
                                                            {{ item.paidTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                                        </template>
                                                    </p>
                                                    <template v-if="item.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key">
                                                        <h-button table v-if="hosAuthCheck(Auths.CRM_SERVICE_FUND_CONFIRM)" @click="openFundsDialog(item.id, FundsDict.repaymentTypeArrays.list[1].key)">
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
                                                <span class="info-status-words" @click="openLookPrevPaymentDialog" v-if="hosAuthCheck(Auths.CRM_PREV_PAYMENT_DETAIL)">查看上游支付明细</span>
                                            </p>
                                        </div>
                                        <!-- <div class="row-filed" v-if="paymentOrderDetail.respGoodsAmount">
                                            <h-button type="assist" @click="openPrevPay" v-if="hosAuthCheck(Auths.CRM_PAYMENT_PREV)&& (paymentOrderDetail.supplierPayFlag === 1)">
                                                上游支付
                                            </h-button>
                                        </div> -->
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
                                                    <span class="info-status-words" @click="openLookReceiptDetail" v-if="hosAuthCheck(Auths.CRM_REVIEW_RECEIPT_DETAIL)">查看收货明细</span>
                                                </p>
                                            </div>
                                            <div class="row-filed">
                                                <h-button type="assist" @click="openConfirmReceipt" v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONFIRM_RECEIPT) && (paymentOrderDetail.respGoodsAmount.goodsAmount !== paymentOrderDetail.respGoodsAmount.totalAmount)">确认收货
                                                </h-button>
                                            </div>
                                        </template>
                                        <template v-if="!paymentOrderDetail.payOrderDetail.closeReasonCode">
                                            <div class="row-filed">
                                                <p class="col-filed">
                                                    <span class="info-title">剩余货款支付计划：</span>
                                                </p>
                                            </div>
                                            <div class="row-filed arrear-fund" v-if="paymentOrderDetail.respFundResults.arrearFund">
                                                <p class="col-filed col-25">
                                                    <span class="label">剩余货款：</span>
                                                    {{ paymentOrderDetail.respFundResults.arrearFund.paymentAmount | fundMoneyHasTail }}元
                                                </p>
                                                <p class="col-filed col-25">
                                                    <span class="label">应支付时间：</span>
                                                    {{ paymentOrderDetail.respFundResults.arrearFund.schedulePaymentDate }}
                                                    <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                        <img src="../../../../assets/images/crm-edit.png" alt="" v-if="PaymentOrderDict.paymentFlag.list[0].key === paymentOrderDetail.respFundResults.arrearFund.paymentFlag ||
                                            PaymentOrderDict.paymentFlag.list[1].key === paymentOrderDetail.respFundResults.arrearFund.paymentFlag||
                                            PaymentOrderDict.paymentFlag.list[3].key === paymentOrderDetail.respFundResults.arrearFund.paymentFlag" @click="updateRow(`尾款`, paymentOrderDetail.respFundResults.arrearFund, false)" class="info-img-edit">
                                                    </template>
                                                </p>
                                                <p class="col-filed col-50 resp-fund-results">
                                                    <span class="label">支付<template v-if="paymentOrderDetail.respFundResults.arrearFund.paymentFlag === PaymentOrderDict.paymentFlag.list[2].key">成功</template><template
                                                            v-if="paymentOrderDetail.respFundResults.arrearFund.paymentFlag === PaymentOrderDict.paymentFlag.list[3].key">失败</template>时间：</span>
                                                    {{ paymentOrderDetail.respFundResults.arrearFund.paidTime | formatDate('YYYY-MM-DD HH:mm:ss') }}
                                                    <template v-if="paymentOrderDetail.respFundResults.arrearFund.paymentFlag === PaymentOrderDict.paymentFlag.list[1].key">
                                                        <h-button table v-if="hosAuthCheck(Auths.CRM_ARREAR_FUND_CONFIRM)" @click="openFundsDialog(paymentOrderDetail.respFundResults.arrearFund.id,FundsDict.repaymentTypeArrays.list[2].key)">
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
            </template>
        </h-drawer>
        <el-dialog title="修改" :visible.sync="updateRowVisible" width="450px" :before-close="()=> updateRowClose()" class="update-row">
            <el-form label-width="150px" :model="updateForm" :rules="rules" ref="form">
                <el-form-item :label="updateRowLabel" prop="amount" v-if="showAmount">
                    <el-input v-model="updateForm.amount" v-isNegative="updateForm.amount" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="应支付时间：" prop="time">
                    <el-date-picker v-model="updateForm.time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间">
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
import { getPaymentOrderDetail, updateServiceAmountAndTime, downFile } from '@/views/crm/paymentOrder/api'
import PaymentOrderDict from '../paymentOrderDict'
import FundsDict from '@/views/crm/funds/fundsDict'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import * as Auths from '@/utils/auth_const'
import imageAddToken from '@/components/imageAddToken'
import moment from 'moment'
import { downloadFile } from '@/utils'

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
            moment,
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
    components: { imageAddToken },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            nestDdata: 'nestDdata'
        })
    },
    methods: {
        handle (url) {
            window.open(url)
        },
        goContractDetail () {
            let routeUrl = this.$router.resolve({
                path: '/goodwork/contractSigningManagementDetail',
                query: {
                    id: this.paymentOrderDetail.payOrderDetail.paymentOrderContractId
                }
            })
            window.open(routeUrl.href, '_blank')
        },
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
            this.$refs.form.validate(async (value, rules) => {
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
                } else {
                    this.$nextTick(() => {
                        const dom = document.querySelector('.is-error')
                        const _dom = dom.querySelector('input') || dom.querySelector('textarea')
                        _dom.focus()
                    })
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
            if (this.row.id) {
                const { data } = await getPaymentOrderDetail(this.row.id)
                this.paymentOrderDetail = data
            }
            // const { data } = await getPaymentOrderDetail(this.row.id)
            // this.paymentOrderDetail = data
        },
        async onDownFile () {
            /* const { data } = await downFile(this.paymentOrderDetail.payOrderDetail.id)
            // window.location.href = data
            window.open(data) */
            let apiUrl = `project/api/loan-transfers/boss/${this.paymentOrderDetail.payOrderDetail.id}/download`
            downloadFile(apiUrl)
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
/deep/.el-drawer__wrapper {
    z-index: 1000 !important;
}
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
            .label {
                min-width: 75px;
            }
        }
        .approval-remark {
            display: flex;
            line-height: 20px;
            width: 100%;
            .label {
                flex: 0 0 80px;
                line-height: 20px;
            }
        }

        .col-50 {
            flex: 0 0 50%;
        }
        .col-100 {
            flex: 0 0 100%;
        }
        .col-30 {
            flex: 0 0 30%;
        }
        .col-33 {
            flex: 0 0 33%;
        }

        .col-25 {
            flex: 0 0 25%;
            word-break: break-all;
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
        background: #ff7a45;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 14px;
        border-radius: 4px;
        line-height: 22px;
    }

    .info-status-words {
        color: #ff7a45;
        cursor: pointer;
    }

    .info-title-main-color {
        color: #ff7a45;
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
    align-items: center;
    .go-contract-detail {
        margin-left: 12px;
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
.ml-20 {
    margin-left: 20px;
}
.arrear-fund {
    align-items: center;
}
.resp-fund-results {
    align-items: center;
    .info-status {
        margin-left: 20px;
    }
}
.ticket-table {
    display: table;
    width: 500px;
    text-align: center;
    border: 1px solid #eeeeee;
    border-collapse: collapse;
    font-size: 13px;
    color: #666666;
    font-weight: 400;
    .tr {
        display: table-row;
    }
    .th {
        display: table-cell;
        border: 1px solid #eeeeee;
        padding: 8px;
        font-size: 14px;
        color: #333333;
        font-weight: 600;
    }
    .td {
        display: table-cell;
        border: 1px solid #eeeeee;
        padding: 8px;
    }
}
</style>

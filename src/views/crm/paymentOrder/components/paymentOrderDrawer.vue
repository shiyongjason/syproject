<template>
    <div class="drawer-wrap">
        <h-drawer v-if="drawer" title="支付单详情" :visible.sync="drawer" direction='rtl' size='60%' :wrapperClosable="false" :modal="false" :beforeClose="handleClose">
            <template #connect>
                <h-button type="primary" v-if="paymentOrderDetail.payOrderDetail.isShowDownloadLoan && hosAuthCheck(Auths.CRM_PAYMENT_REVIEW_DOWN)" @click="onDownFile">下载放款交接单</h-button>
                <div class="drawer-content">
                    <div class="info-content">
                        <div class="row-filed">
                            <p class="col-filed"><span class="info-title">项目信息</span></p>
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
                            <p class="col-filed"><span class="info-title">采购单信息</span></p>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed col-50">
                                <span class="label">采购单金额：</span>
                                {{ paymentOrderDetail.payOrderPoDetail.poAmount  | moneyFormat }}元
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
                                {{ paymentOrderConst.APPLY_TYPE.get(paymentOrderDetail.payOrderPoDetail.poNumber) }}
                            </p>
                            <p class="col-filed col-25">
                                <span class="label">经销商预付款比例：</span> {{ paymentOrderDetail.payOrderPoDetail.prePercent }}%
                            </p>
                            <p class="col-filed col-25">
                                <span class="label">剩余货款支付周期：</span>{{ paymentOrderDetail.payOrderPoDetail.restPaymentPeriod }}个月
                            </p>
                            <p class="col-filed col-25">
                                <span class="label">免息方式：</span>{{ paymentOrderDetail.payOrderPoDetail.freeInterestType | attributeComputed(PurchaseOrderDict.freeInterestType.list) }}
                            </p>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed">
                                <span class="info-title">支付单信息</span>
                                <span class="info-status">
                                    {{ paymentOrderConst.PAYMENT_ORDER_STATUS_ALL.get(paymentOrderDetail.payOrderDetail.status) }}
                                </span>
                            </p>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed col-50">
                                <span class="label">申请支付金额：</span>
                                {{ paymentOrderDetail.payOrderDetail.applyAmount | moneyFormat }}元
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
                                {{ paymentOrderConst.SUPPLIER_PAYMENT_TYPE.get(paymentOrderDetail.payOrderDetail.supplierPaymentType) }}
                            </p>
                            <p class="col-filed col-33">
                                <span class="label">期望上游支付日期：</span>
                                {{ paymentOrderDetail.payOrderDetail.expectSupplierPaymentDate | momentFormat('YYYY-MM-DD') }}
                            </p>
                            <p class="col-filed  col-33">
                                <span class="label">备注信息：</span>
                                {{ paymentOrderDetail.payOrderDetail.specialRemark }}
                            </p>
                        </div>
                        <!-- 银行承兑才有票面信息 -->
                        <div class="row-filed" v-if="paymentOrderDetail.payOrderDetail.supplierPaymentType == 2">
                            <div class="ticket-table">
                                <div class="tr">
                                    <div class="th">出票张数</div>
                                    <div class="th">票面金额（元）</div>
                                </div>
                                <div class="tr" v-for="(item,index) in paymentOrderDetail.billAmountResponse.billAmountDetail" :key="index">
                                    <div class="td">第 {{item.number}} 张票</div>
                                    <div class="td">{{item.amount|moneyFormat}}</div>
                                </div>
                                <div class="tr">
                                    <div class="td">合计 </div>
                                    <div class="td">{{paymentOrderDetail.billAmountResponse.totalAmount|moneyFormat}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed col-33">
                                <span class="label">申请时间：</span>
                                {{ paymentOrderDetail.payOrderDetail.applyDate | momentFormat('YYYY-MM-DD HH:mm:ss') }}
                            </p>
                            <p class="col-filed col-33">
                                <span class="label">申请人：</span>
                                {{paymentOrderDetail.payOrderDetail.createBy}}（{{ paymentOrderDetail.payOrderDetail.createPhone }}）
                            </p>
                        </div>
                        <!-- 待分财审核 -->
                        <div class="row-filed" v-if="statusKey.FINANCE_AUDIT === paymentOrderDetail.payOrderDetail.status">
                            <h-button type="assist" @click="openApproveDialog" v-if="hosAuthCheck(Auths.CRM_PAYMENT_FINANCE_AUDIT)">
                                支付单审核
                            </h-button>
                        </div>
                        <!-- 分财审核之后，paymentOrderSegmentFinanceApprovalResponse中如果有信息，那么就展示分财审核信息 -->
                        <template v-if="paymentOrderDetail.paymentOrderSegmentFinanceApprovalResponse && checkPaymentStatus(statusKey.OPERATE_AUDIT)">
                            <div class="row-filed">
                                <p class="col-filed col-33">
                                    <span class="label">审核人：</span>
                                    {{ paymentOrderDetail.paymentOrderSegmentFinanceApprovalResponse.approvalUser }}（{{ paymentOrderDetail.paymentOrderSegmentFinanceApprovalResponse.approvalPhone }}）
                                </p>
                                <p class="col-filed col-33">
                                    <span class="label">审核时间：</span>
                                    {{ paymentOrderDetail.paymentOrderSegmentFinanceApprovalResponse.approvalTime | momentFormat('YYYY-MM-DD HH:mm:ss') }}
                                </p>
                                <p class="col-filed col-33">
                                    <span class="label">账户信息是否已确认： </span>
                                    {{ paymentOrderDetail.paymentOrderSegmentFinanceApprovalResponse.supplierAccountConfirm ? '是' : '否' }}
                                </p>
                            </div>
                            <div class="row-filed">
                                <p class="col-filed col-33">
                                    <span class="label">共管户是否已监管：</span>
                                    {{ paymentOrderDetail.paymentOrderSegmentFinanceApprovalResponse.coManagerSupervision ? '是' : '否' }}
                                </p>
                                <p class="col-filed col-66">
                                    <span class="label">审核备注：</span>
                                    {{ paymentOrderDetail.paymentOrderSegmentFinanceApprovalResponse.approvalRemark||'-' }}
                                </p>
                            </div>
                        </template>
                        <!-- 项目运营审核 -->
                        <div class="row-filed" v-if="statusKey.OPERATE_AUDIT === paymentOrderDetail.payOrderDetail.status">
                            <h-button type="assist" @click="openApproveDialog" v-if="hosAuthCheck(Auths.CRM_PAYMENT_REVIEW_DETAIL)">
                                支付单审核
                            </h-button>
                        </div>
                        <!-- 根据审核状态是否存在判定是否经过项目运营审核环节了 -->
                        <template v-if="paymentOrderDetail.payOrderDetail.approvalStatus && checkPaymentStatus(statusKey.DING_AUDIT)">
                            <!-- 首付款待支付之后的状态显示下面内容，这里的判断是非分财审核，非项目运营审核，非流程审核中的 -->
                            <div class="row-filed">
                                <p class="col-filed col-33">
                                    <span class="label">审核人：</span>
                                    {{ paymentOrderDetail.payOrderDetail.approvalUser }}（{{ paymentOrderDetail.payOrderDetail.approvalPhone }}）
                                </p>
                                <p class="col-filed col-33">
                                    <span class="label">审核时间：</span>
                                    {{ paymentOrderDetail.payOrderDetail.approvalTime | momentFormat('YYYY-MM-DD HH:mm:ss') }}
                                </p>
                                <p class="col-filed col-33">
                                    <span class="label">审核结果：</span>
                                    {{ paymentOrderConst.APPROVAL_STATUS.get(paymentOrderDetail.payOrderDetail.approvalStatus) }}
                                </p>
                            </div>
                            <!-- 审核不通过只展示审核备注，这个时候支付单应该是关闭状态 -->
                            <template v-if="paymentOrderDetail.payOrderDetail.approvalStatus === paymentOrderConst.APPROVAL_STATUS_KEY_NO_PASS">
                                <div class="row-filed">
                                    <p class="col-filed approval-remark">
                                        <span class="label">审核备注：</span>{{paymentOrderDetail.payOrderDetail.approvalRemark || '-'}}
                                    </p>
                                </div>
                            </template>
                            <!-- 审核通过展示审核通过时填写的信息 -->
                            <template v-else>
                                <div class="row-filed">
                                    <p class="col-filed col-33">
                                        <span class="label">应收账款质押：</span>
                                        {{ paymentOrderConst.ACCOUNT_RECEIVABLE_PLEDGE_TYPE.get(paymentOrderDetail.payOrderDetail.accountReceivablePledgeType) || '-' }}
                                    </p>

                                    <p class="col-filed col-33">
                                        <span class="label">上游货款方式：</span>
                                        {{ paymentOrderConst.SUPPLIER_PAYMENT_METHOD.get(paymentOrderDetail.payOrderDetail.supplierPaymentMethod) || '-'}}
                                    </p>
                                    <p class="col-filed col-33">
                                        <span class="label">下游合作方式：</span>
                                        {{ paymentOrderConst.DEALER_COOPERATION_METHOD.get(paymentOrderDetail.payOrderDetail.dealerCooperationMethod) || '-' }}
                                    </p>
                                </div>
                                <div class="row-filed">
                                    <p class="col-filed col-33">
                                        <span class="label">质押信息：</span>
                                        {{ paymentOrderDetail.payOrderDetail.pledgeNo || '-' }}
                                    </p>
                                    <p class="col-filed col-66">
                                        <span class="label" style="min-width:100px">OA货款支付编号：</span>{{ paymentOrderDetail.payOrderDetail.oaNo || '-' }}
                                    </p>
                                </div>
                                <div class="row-filed">
                                    <p class="col-filed col-50">
                                        <span class="label">经销商预付款：</span>
                                        {{ paymentOrderDetail.payOrderDetail.downPaymentAmount | moneyFormat }}元
                                    </p>
                                    <p class="col-filed col-50" v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod == 1">
                                        <span class="label">剩余货款：</span> {{ paymentOrderDetail.payOrderDetail.arrearAmount | moneyFormat }}元
                                    </p>
                                </div>
                                <!-- 剩余支付方式 -->
                                <template v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod == 1">
                                    <div class="row-filed">
                                        <p class="col-filed col-50">
                                            <span class="label">预计服务费总额：</span> {{ paymentOrderDetail.payOrderDetail.feeAmount | moneyFormat }}元
                                        </p>
                                        <p class="col-filed col-50">
                                            <span class="label">预计每期服务费：</span> {{ paymentOrderDetail.payOrderDetail.feeAmountPer | moneyFormat }}元
                                        </p>
                                    </div>
                                    <!-- 垫资代采才需要签署确认函 -->
                                    <div class="row-filed confirm-server" v-if="paymentOrderDetail.payOrderDetail.orderLetterStatus === 1">
                                        《订单及服务费确认函》： <span class="info-status-words">{{ paymentOrderConst.ORDER_LETTER_STATUS.get(paymentOrderDetail.payOrderDetail.orderLetterStatus) ||  '-' }}</span>
                                        <!-- 首付款签约以后-->
                                        <h-button table class="go-contract-detail" @click="goContractDetail" v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONTRACT_SEE)">
                                            查看合同
                                        </h-button>
                                        <!-- 首付款签约以后-->
                                    </div>
                                </template>
                            </template>
                        </template>
                        <template v-if="checkPaymentStatus(statusKey.DING_AUDIT)">
                            <!-- 首付款计划 -->
                            <template v-if="paymentOrderDetail.respFundResults.downpaymentFund && checkPaymentStatus(statusKey.DOWN_PAYMENT_WAITING_PAY)">
                                <div class="row-filed">
                                    <p class="col-filed">
                                        <span class="info-title">首付款支付计划：</span>
                                    </p>
                                </div>
                                <div class="row-filed need-center">
                                    <p class="col-filed col-30">
                                        <span class="label">首付款：</span>
                                        {{ paymentOrderDetail.respFundResults.downpaymentFund.paymentAmount | moneyFormat }}元
                                    </p>
                                    <p class="col-filed col-30">
                                        <span class="label">应支付时间：</span>
                                        {{ paymentOrderDetail.respFundResults.downpaymentFund.schedulePaymentDate | momentFormat('YYYY-MM-DD') }}
                                        <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                            <img src="../../../../assets/images/crm-edit.png" alt="" @click="updateRow('首付款', paymentOrderDetail.respFundResults.downpaymentFund, false)"
                                                v-if="canUpdatePaymentInfo(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag)" class="info-img-edit">
                                        </template>
                                    </p>
                                    <p class="col-filed col-40 need-center">
                                        <span class="label">{{ paymentLabel(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag) }}</span>
                                        <template v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === paymentFlagKey.CANCEL">
                                            {{ paymentOrderDetail.respFundResults.downpaymentFund.updateTime | momentFormat('YYYY-MM-DD HH:mm:ss') }}
                                        </template>
                                        <template v-else>
                                            {{ paymentOrderDetail.respFundResults.downpaymentFund.paidTime | momentFormat('YYYY-MM-DD HH:mm:ss') }}
                                        </template>
                                        <template v-if="paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === paymentFlagKey.CONFIRM">
                                            <h-button table class="ml-20" v-if="hosAuthCheck(Auths.CRM_DOWN_PAYMENT_FUND_CONFIRM)" @click="openFundsDialog(paymentOrderDetail.respFundResults.downpaymentFund.id,FundsDict.repaymentTypeArrays.list[0].key)">
                                                {{ paymentOrderConst.PAYMENT_FLAG.get(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag) }}
                                            </h-button>
                                        </template>
                                        <template v-else>
                                            <span class="info-status ml-20">
                                                {{ paymentOrderConst.PAYMENT_FLAG.get(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag) }}
                                            </span>
                                        </template>
                                    </p>
                                </div>
                            </template>
                            <!-- 如果是垫资代采是有服务费,服务费是在签署之后形成的，我这里不做状态判断，直接判断数据是否存在 -->
                            <template v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod == 1">
                                <template v-if="paymentOrderDetail.respFundResults.serviceFund && paymentOrderDetail.respFundResults.serviceFund.length > 0">
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            <span class="info-title">服务费支付计划：</span>
                                        </p>
                                    </div>
                                    <div class="row-filed need-center" :key="item.id" v-for="(item,index) in paymentOrderDetail.respFundResults.serviceFund">
                                        <p class="col-filed col-30">
                                            <span class="label">第{{ index + 1 }}期服务费：</span>
                                            {{ item.paymentAmount  | moneyFormat }} 元
                                            <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                <img src="../../../../assets/images/crm-edit.png" alt="" @click="updateRow(`第${index + 1}期服务费`, item)"
                                                    v-if="canUpdatePaymentInfo(item.paymentFlag)" class="info-img-edit">
                                            </template>
                                        </p>
                                        <p class="col-filed col-30">
                                            <span class="label">应支付时间：</span>{{ item.schedulePaymentDate }}
                                            <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                <img src="../../../../assets/images/crm-edit.png" alt="" @click="updateRow(`第${index + 1}期服务费`, item)"
                                                    v-if="canUpdatePaymentInfo(item.paymentFlag)" class="info-img-edit">
                                            </template>
                                        </p>
                                        <div class="col-filed col-40 service-pay-time need-center">
                                            <p class="mr-50">
                                                <span class="label">{{ paymentLabel(item.paymentFlag) }}</span>
                                                <template v-if="item.paymentFlag === paymentFlagKey.CANCEL">
                                                    {{ item.updateTime | momentFormat('YYYY-MM-DD HH:mm:ss') }}
                                                </template>
                                                <template v-else>
                                                    {{ item.paidTime | momentFormat('YYYY-MM-DD HH:mm:ss') }}
                                                </template>
                                            </p>
                                            <template v-if="item.paymentFlag === paymentFlagKey.CONFIRM">
                                                <h-button table v-if="hosAuthCheck(Auths.CRM_SERVICE_FUND_CONFIRM)" @click="openFundsDialog(item.id, FundsDict.repaymentTypeArrays.list[1].key)">
                                                    {{ paymentOrderConst.PAYMENT_FLAG.get(item.paymentFlag) }}
                                                </h-button>
                                            </template>
                                            <template v-else>
                                                <span class="info-status">
                                                    {{ paymentOrderConst.PAYMENT_FLAG.get(item.paymentFlag) }}
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="row-filed">
                                        <p class="col-filed col-50">
                                            <span class="label">当前服务费合计：</span>
                                            {{ paymentOrderDetail.respFundResults.totalServiceAmount  | moneyFormat }}元
                                        </p>
                                        <p class="col-filed col-50">
                                            <span class="label">已成功支付：</span>
                                            {{ paymentOrderDetail.respFundResults.totalPaidAmount  | moneyFormat }}元
                                        </p>
                                    </div>
                                </template>
                            </template>
                            <template v-if="checkPaymentStatus(statusKey.WAITING_RECEIVED)">
                                <template v-if="paymentOrderDetail.respSupplierAmount">
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            <span class="info-title">上游支付：</span>
                                        </p>
                                    </div>
                                    <div class="row-filed">
                                        <p class="col-filed col-33">
                                            <span class="label">应向上游支付：</span> {{ paymentOrderDetail.respSupplierAmount.totalAmount | moneyFormat}}元
                                        </p>
                                        <p class="col-filed col-33">
                                            <span class="label">已向上游支付：</span> {{ paymentOrderDetail.respSupplierAmount.paidAmount | moneyFormat}}元
                                        </p>
                                        <p class="col-filed col-33">
                                            <span class="info-status-words" @click="openLookPrevPaymentDialog" v-if="hosAuthCheck(Auths.CRM_PREV_PAYMENT_DETAIL)">查看上游支付明细</span>
                                        </p>
                                    </div>
                                </template>
                                <template v-if="paymentOrderDetail.respGoodsAmount">
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            <span class="info-title">到货信息：</span>
                                        </p>
                                    </div>
                                    <div class="row-filed">
                                        <p class="col-filed col-33">
                                            <span class="label">应到货金额总计：</span> {{ paymentOrderDetail.respGoodsAmount.totalAmount | moneyFormat }}元
                                        </p>
                                        <p class="col-filed col-33">
                                            <span class="label">已到货金额总计：</span> {{ paymentOrderDetail.respGoodsAmount.goodsAmount | moneyFormat }}元
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
                            <template v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod == 1">
                                <template v-if="paymentOrderDetail.respFundResults.arrearFund">
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            <span class="info-title">剩余货款支付计划：</span>
                                        </p>
                                    </div>
                                    <div class="row-filed arrear-fund">
                                        <p class="col-filed col-25">
                                            <span class="label">剩余货款：</span>
                                            {{ paymentOrderDetail.respFundResults.arrearFund.paymentAmount | moneyFormat }}元
                                        </p>
                                        <p class="col-filed col-25">
                                            <span class="label">应支付时间：</span>
                                            {{ paymentOrderDetail.respFundResults.arrearFund.schedulePaymentDate }}
                                            <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                <img src="../../../../assets/images/crm-edit.png" alt="" @click="updateRow(`尾款`, paymentOrderDetail.respFundResults.arrearFund, false)" class="info-img-edit"
                                                    v-if="canUpdatePaymentInfo(paymentOrderDetail.respFundResults.arrearFund.paymentFlag)">
                                            </template>
                                        </p>
                                        <p class="col-filed col-50 resp-fund-results">
                                            <span class="label">{{ paymentLabel(paymentOrderDetail.respFundResults.arrearFund.paymentFlag) }}</span>
                                            {{ paymentOrderDetail.respFundResults.arrearFund.paidTime | momentFormat }}
                                            <template v-if="paymentOrderDetail.respFundResults.arrearFund.paymentFlag === paymentFlagKey.CONFIRM">
                                                <h-button table v-if="hosAuthCheck(Auths.CRM_ARREAR_FUND_CONFIRM)" @click="openFundsDialog(paymentOrderDetail.respFundResults.arrearFund.id,FundsDict.repaymentTypeArrays.list[2].key)">
                                                    {{ paymentOrderConst.PAYMENT_FLAG.get(paymentOrderDetail.respFundResults.arrearFund.paymentFlag) }}
                                                </h-button>
                                            </template>
                                            <template v-else>
                                                <span class="info-status">
                                                    {{ paymentOrderConst.PAYMENT_FLAG.get(paymentOrderDetail.respFundResults.arrearFund.paymentFlag) }}
                                                </span>
                                            </template>
                                        </p>
                                    </div>
                                </template>
                            </template>
                        </template>
                        <!-- 异常流：支付单关闭 -->
                        <template v-if="statusKey.CLOSED === paymentOrderDetail.payOrderDetail.status">
                            <div class="row-filed">
                                <p class="col-filed col-33">
                                    <span class="label">关闭时间：</span>
                                    {{ paymentOrderDetail.payOrderDetail.closeTime | momentFormat('YYYY-MM-DD HH:mm:ss') }}
                                </p>
                                <p class="col-filed col-66">
                                    <span class="label">关闭人：</span>
                                    {{ paymentOrderDetail.payOrderDetail.closeBy }}（{{ paymentOrderDetail.payOrderDetail.closePhone ||'-'}}）
                                </p>
                            </div>
                            <p class="tips">
                                支付单关闭原因：{{ paymentOrderDetail.payOrderDetail.closeReason }}
                            </p>
                        </template>
                    </div>
                    <!-- 支付单关闭展示关闭原因
                    <p v-if="statusKey.CLOSED === paymentOrderDetail.payOrderDetail.status" class="tips">
                        支付单关闭原因：{{ paymentOrderDetail.payOrderDetail.closeReason }}
                    </p> -->
                    <div class="drawer-footer">
                        <div class="drawer-button">
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
import paymentOrderConst from '../const'
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
            },
            paymentOrderConst,
            statusKey: paymentOrderConst.PAYMENT_ORDER_STATUS_KEY,
            paymentFlagKey: paymentOrderConst.PAYMENT_FLAG_KEY
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
            if (status === this.statusKey.DOWN_PAYMENT_CONFIRM) {
                _id = data.respFundResults.downpaymentFund.id
                type = FundsDict.repaymentTypeArrays.list[0].key
            } else if (status === this.statusKey.REMAINING_PAYMENT_CONFIRM) {
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
        },
        // 是否可以更新支付信息
        canUpdatePaymentInfo (paymentFlag) {
            return this.paymentFlagKey.WAITING === paymentFlag || this.paymentFlagKey.CONFIRM === paymentFlag || this.paymentFlagKey.FAIL === paymentFlag
        },
        // 支付文案处理
        paymentLabel (paymentFlag) {
            let paymentLabel = '支付'
            if (paymentFlag === this.paymentFlagKey.FAIL) {
                paymentLabel = '支付失败'
            } else if (paymentFlag === this.paymentFlagKey.PAID) {
                paymentLabel = '支付成功'
            } else if (paymentFlag === this.paymentFlagKey.CANCEL) {
                paymentLabel = '支付取消'
            }
            return paymentLabel + '时间：'
        },
        // 支付单状态判断
        checkPaymentStatus (displayStatus) {
            // 这个是有状态顺序的，按照这个顺序来判定阶段，displayStatus的是指在什么阶段显示数据，那么displayStatus之后的状态都显示
            const statusOrderList = [this.statusKey.FINANCE_AUDIT, this.statusKey.OPERATE_AUDIT, this.statusKey.DING_AUDIT,
                this.statusKey.DOWN_PAYMENT_WAITING_PAY, this.statusKey.DOWN_PAYMENT_CONFIRM, this.statusKey.CLOSED, this.statusKey.WAITING_RECEIVED,
                this.statusKey.REMAINING_PAYMENT_WAITING_PAY, this.statusKey.REMAINING_PAYMENT_CONFIRM, this.statusKey.FINISH]
            const sIndex = statusOrderList.indexOf(displayStatus)
            const statusList = statusOrderList.filter((item, index) => index >= sIndex)
            return statusList.includes(this.paymentOrderDetail.payOrderDetail.status)
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

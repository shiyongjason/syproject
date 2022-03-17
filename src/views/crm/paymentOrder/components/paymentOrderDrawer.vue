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
                        <div class="row-filed project">
                            <p class="col-filed col-50">
                                <span class="label">上游采购金额： </span>{{ paymentOrderDetail.payOrderPoDetail.supplierPurchaseAmount | moneyFormat }}
                            </p>
                            <p class="col-filed col-30">
                                <span class="label">加价率：</span>{{ paymentOrderDetail.payOrderPoDetail.salesGrossMargin + "%" }}
                            </p>
                            <p class="col-filed col-30">
                                <span class="label">加价额：</span>{{ paymentOrderDetail.payOrderPoDetail.salesGrossAmount | moneyFormat}}
                            </p>
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
                            <p class="col-filed col-50">
                                <span class="label">付款主体：</span>
                                {{ paymentOrderDetail.payOrderPoDetail.paymentMain }}
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
                                <span class="label">采购折让：</span> {{ paymentOrderDetail.payOrderDetail.purchaseDiscountRate }}%
                            </p>
                            <p class="col-filed col-50">
                                <span class="label">采购金额(折让后)：</span> {{ paymentOrderDetail.payOrderDetail.purchaseDiscountAmount | moneyFormat }}元
                            </p>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed col-50">
                                <span class="label">加价率：</span> {{ paymentOrderDetail.payOrderDetail.salesGrossMargin }}%
                            </p>
                            <p class="col-filed col-50">
                                <span class="label">销售金额：</span> {{ paymentOrderDetail.payOrderDetail.salesTotalAmount | moneyFormat }}元
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
                                (<em v-if="paymentOrderDetail.payOrderDetail.supplierLabel" :class="paymentOrderDetail.payOrderDetail.supplierLabel&&className.get(paymentOrderDetail.payOrderDetail.supplierLabel.code)">
                                    {{paymentOrderDetail.payOrderDetail.supplierLabel.desc}}
                                </em>)
                            </p>
                        </div>

                        <div class="row-filed">
                            <p class="col-filed col-33">
                                <span class="label">上游支付方式：</span>
                                {{ paymentOrderConst.SUPPLIER_PAYMENT_TYPE.get(paymentOrderDetail.payOrderDetail.supplierPaymentType) }}:{{paymentOrderDetail.payOrderDetail.serviceFeeRate}}%
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
                        <div class="row-filed">
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
                                <span class="label">首付款金额：</span>
                                {{ paymentOrderDetail.payOrderDetail.downPaymentAmount | moneyFormat }}元
                            </p>
                            <p class="col-filed col-33" v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod == 1">
                                <span class="label">尾款金额：</span> {{ paymentOrderDetail.payOrderDetail.arrearAmount | moneyFormat }}元
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
                                <table class="pure-table pure-table-bordered">
                                    <thead>
                                        <tr>
                                            <th>首付款总金额</th>
                                            <th>待支付</th>
                                            <th>已支付</th>
                                            <th>支付待确认</th>
                                            <th>应支付时间</th>
                                            <th>状态</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ paymentOrderDetail.respFundResults.downpaymentFund.fundAmount | moneyFormat }}元</td>
                                            <td>{{ paymentOrderDetail.respFundResults.downpaymentFund.unpaidAmount | moneyFormat }}元</td>
                                            <td>{{ paymentOrderDetail.respFundResults.downpaymentFund.paidAmount | moneyFormat }}元</td>
                                            <td>{{ paymentOrderDetail.respFundResults.downpaymentFund.unconfirmedAmount | moneyFormat }}元</td>
                                            <td> {{ paymentOrderDetail.respFundResults.downpaymentFund.schedulePaymentDate | momentFormat('YYYY-MM-DD') }}
                                                <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                    <img src="../../../../assets/images/crm-edit.png" alt="" @click="updateRow('首付款', paymentOrderDetail.respFundResults.downpaymentFund, false)" v-if="canUpdatePaymentInfo(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag)"
                                                        class="info-img-edit">
                                                </template>
                                            </td>
                                            <td>{{ paymentOrderConst.PAYMENT_FLAG.get(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag) }}</td>
                                            <td>
                                                <h-button table class="ml-20"
                                                    v-if="(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === paymentFlagKey.CONFIRM||paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === paymentFlagKey.WAITING)&&hosAuthCheck(Auths.CRM_DOWN_PAYMENT_FUND_CONFIRM)"
                                                    @click="openReduleDialog(paymentOrderDetail.respFundResults.downpaymentFund.fundId,FundsDict.repaymentTypeArrays.list[0].key)">
                                                    支付确认
                                                </h-button>
                                                <h-button table class="ml-20" v-if="(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === paymentFlagKey.PAID)" @click="seePayEnter(paymentOrderDetail.respFundResults.downpaymentFund,FundsDict.repaymentTypeArrays.list[0].key)">
                                                    查看凭证
                                                </h-button>
                                                <span class="ml-20" v-if="(paymentOrderDetail.respFundResults.downpaymentFund.paymentFlag === paymentFlagKey.CANCEL)">
                                                    {{ paymentOrderDetail.respFundResults.downpaymentFund.updateTime | momentFormat('YYYY-MM-DD') }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </template>
                            <!-- 如果是垫资代采是有服务费,服务费是在签署之后形成的，我这里不做状态判断，直接判断数据是否存在 -->
                            <template v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod == 1">
                                <template v-if="paymentOrderDetail.respFundResults.serviceFund && paymentOrderDetail.respFundResults.serviceFund.length > 0">
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            <span class="info-title">服务费支付计划：</span>
                                        </p>
                                    </div>

                                    <table class="pure-table pure-table-bordered">
                                        <thead>
                                            <tr>
                                                <th>服务费期数</th>
                                                <th>预计应收</th>
                                                <th>实际应收</th>
                                                <th>待支付</th>
                                                <th>已支付</th>
                                                <th>支付待确认</th>
                                                <th>应支付时间</th>
                                                <th>状态</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :key="item.id" v-for="(item,index) in paymentOrderDetail.respFundResults.serviceFund">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{item.receivableAmount|moneyFormat}}元</td>
                                                <td>{{item.fundAmount|moneyFormat}}元
                                                    <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                        <img src="../../../../assets/images/crm-edit.png" alt="" @click="updateRow(`第${index + 1}期服务费`, item)" v-if="canUpdatePaymentInfo(item.paymentFlag)" class="info-img-edit">
                                                    </template>
                                                </td>
                                                <td>{{item.unpaidAmount|moneyFormat}}元</td>
                                                <td>{{item.paidAmount|moneyFormat}}元</td>
                                                <td>{{item.unconfirmedAmount|moneyFormat}}元</td>
                                                <td>
                                                    {{ item.schedulePaymentDate }}
                                                    <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                        <img src="../../../../assets/images/crm-edit.png" alt="" @click="updateRow(`第${index + 1}期服务费`, item)" v-if="canUpdatePaymentInfo(item.paymentFlag)" class="info-img-edit">
                                                    </template>
                                                </td>
                                                <td>{{ paymentOrderConst.PAYMENT_FLAG.get(item.paymentFlag) }}</td>
                                                <td>
                                                    <h-button table v-if="hosAuthCheck(Auths.CRM_SERVICE_FUND_CONFIRM)&&item.paymentFlag === paymentFlagKey.CONFIRM||item.paymentFlag === paymentFlagKey.WAITING" @click="openReduleDialog(item.fundId, FundsDict.repaymentTypeArrays.list[1].key,item)">
                                                        支付确认
                                                    </h-button>
                                                    <h-button table v-if="(item.paymentFlag === paymentFlagKey.PAID)" @click="seePayEnter(item,FundsDict.repaymentTypeArrays.list[1].key,item)">
                                                        查看凭证
                                                    </h-button>
                                                    <span v-if="(item.paymentFlag === paymentFlagKey.CANCEL)">
                                                        {{ item.updateTime | momentFormat('YYYY-MM-DD') }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                                        <h-button type="assist" @click="openConfirmReceipt"
                                            v-if="hosAuthCheck(Auths.CRM_PAYMENT_CONFIRM_RECEIPT) && ((paymentOrderDetail.respGoodsAmount.goodsAmount !== paymentOrderDetail.respGoodsAmount.totalAmount)&&paymentOrderDetail.payOrderDetail.status!=statusKey.CLOSED)">确认收货
                                        </h-button>
                                    </div>
                                </template>
                            </template>
                            <template v-if="paymentOrderDetail.payOrderDetail.dealerCooperationMethod == 1">
                                <template v-if="paymentOrderDetail.respFundResults.arrearsFunds && paymentOrderDetail.respFundResults.arrearsFunds.length > 0">
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            <span class="info-title">尾款支付计划：</span>
                                            <h-button table @click="openArrearFund" v-if="showArrearFundByStage()">维护分期尾款</h-button>
                                        </p>
                                    </div>
                                    <table class="pure-table pure-table-bordered">
                                        <thead>
                                            <tr>
                                                <th>尾款总金额</th>
                                                <th>待支付</th>
                                                <th>已支付</th>
                                                <th>支付待确认</th>
                                                <th>应支付时间</th>
                                                <th>状态</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in paymentOrderDetail.respFundResults.arrearsFunds" :key="item.fundId">
                                                <td>{{ item.fundAmount | moneyFormat }}元</td>
                                                <td>{{ item.unpaidAmount | moneyFormat }}元</td>
                                                <td>{{ item.paidAmount | moneyFormat }}元</td>
                                                <td>{{ item.unconfirmedAmount | moneyFormat }}元</td>
                                                <td> {{ item.schedulePaymentDate }}
                                                    <template v-if="hosAuthCheck(Auths.CRM_PAYMENT_DATA_AND_SERVICE_AMOUNT)">
                                                        <img src="../../../../assets/images/crm-edit.png" alt="" @click="updateRow(`尾款`, item, false)" class="info-img-edit" v-if="canUpdatePaymentInfo(item.paymentFlag)">
                                                    </template>
                                                </td>
                                                <td>{{ paymentOrderConst.PAYMENT_FLAG.get(item.paymentFlag) }}</td>
                                                <td>
                                                    <h-button table v-if="hosAuthCheck(Auths.CRM_ARREAR_FUND_CONFIRM)&&(item.paymentFlag === paymentFlagKey.CONFIRM||item.paymentFlag === paymentFlagKey.WAITING)" @click="openReduleDialog(item.fundId,FundsDict.repaymentTypeArrays.list[2].key)">
                                                        支付确认
                                                    </h-button>
                                                    <h-button table v-if="(item.paymentFlag === paymentFlagKey.PAID)" @click="seePayEnter(item,FundsDict.repaymentTypeArrays.list[2].key)">
                                                        查看凭证
                                                    </h-button>
                                                    <span v-if="(item.paymentFlag === paymentFlagKey.CANCEL)">
                                                        {{ item.updateTime | momentFormat('YYYY-MM-DD') }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="row-filed">
                                        <p class="col-filed col-50">
                                            <span class="label">总尾款：</span>
                                            {{ paymentOrderDetail.respFundResults.totalArrearsAmount | moneyFormat }}元
                                        </p>
                                        <p class="col-filed col-50">
                                            <span class="label">已成功支付：</span>
                                            {{ paymentOrderDetail.respFundResults.totalArrearsPaidAmount | moneyFormat }}元
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
                            <div class="close_vocher">
                                <span class="img-box" :key="item.fileUrl" v-for="item in paymentOrderDetail.payOrderDetail.closeAttachDocResponseList">
                                    <downloadFileAddToken isPreview isType='preview' :file-url="item.fileUrl" :a-link-words="item.fileName" />
                                </span>
                            </div>
                        </template>
                    </div>
                    <!-- 支付单关闭展示关闭原因 -->
                    <!-- <p v-if="statusKey.CLOSED === paymentOrderDetail.payOrderDetail.status" class="tips">
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
        <el-dialog title="修改" :visible.sync="updateRowVisible" :close-on-click-modal="false" width="450px" :before-close="()=> updateRowClose()" class="update-row">
            <el-form label-width="150px" :model="updateForm" :rules="rules" ref="form">
                <el-form-item :label="updateRowLabel" prop="amount" v-if="showAmount">
                    <el-input v-model="updateForm.amount" v-isNegative:2="updateForm.amount" maxlength="18"></el-input>
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
        <el-dialog title="维护分期尾款" :visible.sync="arrearFundVisible" :close-on-click-modal="false" width="650px" class="update-row">
            <div class="mb10">总尾款：{{paymentOrderDetail.respFundResults.totalArrearsAmount | moneyFormat}}元</div>
            <el-form :model="arrearFundsForm" ref="arrearFundsForm">
                <basicTable :tableData="arrearFundsForm.arrearFunds" :tableLabel="arrearFundTableLabel" :isPagination="false" :isMultiple="false" :isAction="true" :actionMinWidth=100>
                    <template slot-scope="scope" slot="schedulePaymentDate">
                        <el-form-item label-width='0' :prop="`arrearFunds[${scope.data.$index}].schedulePaymentDate`" :rules="rules.schedulePaymentDate">
                            <el-date-picker v-model="arrearFundsForm.arrearFunds[scope.data.$index].schedulePaymentDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </template>
                    <template slot-scope="scope" slot="fundAmount">
                        <el-form-item label-width='0' :prop="`arrearFunds[${scope.data.$index}].fundAmount`" :rules="rules.fundAmount">
                            <el-input v-model="arrearFundsForm.arrearFunds[scope.data.$index].fundAmount" v-isNegative:2="`updateForm[${scope.data.$index}].fundAmount`" maxlength="18"></el-input>
                        </el-form-item>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onDelArrearFund(scope.data.$index)" v-if="arrearFundsForm.arrearFunds.length > 1">移除</h-button>
                    </template>
                </basicTable>
            </el-form>
            <div class="mt10">
                <a href="javascript:void(0)" @click="onAddStage">+添加一期</a>
            </div>
            <span slot="footer" class="dialog-footer">
                <h-button type="assist" @click="arrearFundVisible = false">取消</h-button>
                <h-button type="primary" @click="updateArrearFund">确认</h-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getPaymentOrderDetail, updateServiceAmountAndTime, downFile, updateArrearsFundsByStages } from '@/views/crm/paymentOrder/api'
import paymentOrderConst from '../const'
import FundsDict from '@/views/crm/funds/fundsDict'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import * as Auths from '@/utils/auth_const'
import imageAddToken from '@/components/imageAddToken'
import downloadFileAddToken from '@/components/downloadFileAddToken'
import moment from 'moment'
import { downloadFile } from '@/utils'
import { deepCopy } from '@/utils/utils'

const className = new Map([[0, 'red'], [10, 'red'], [11, 'red'], [12, 'green'], [20, 'red'], [21, 'red'], [22, 'green'], [30, 'red'], [31, 'red'], [32, 'green']])
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
            className,
            moment,
            activeNames: ['1'],
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
                ],
                schedulePaymentDate: [
                    { required: true, message: '请输入应支付日期', trigger: 'change' }
                ],
                fundAmount: [
                    {
                        required: true,
                        message: '请输入分期尾款',
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value == 0) {
                                return callback(new Error('分期尾款必须大于0'))
                            }
                            return callback()
                        }
                    }
                ]
            },
            paymentOrderConst,
            statusKey: paymentOrderConst.PAYMENT_ORDER_STATUS_KEY,
            paymentFlagKey: paymentOrderConst.PAYMENT_FLAG_KEY,
            tableLabel: [
                { label: '支付单编号', prop: 'creditLevel' },
                { label: '金额', prop: 'creditLevel' },
                { label: '状态', prop: 'creditLevel' },
                { label: '申请时间', prop: 'creditLevel', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'creditLevel', formatters: 'dateTimes' }
            ],
            tableData: [],
            arrearFundVisible: false,
            arrearFundsForm: {
                arrearFunds: []
            },
            arrearFundTableLabel: [
                { label: '应支付日期', prop: 'schedulePaymentDate' },
                { label: '分期尾款', prop: 'fundAmount' }
            ]
        }
    },
    components: { imageAddToken, downloadFileAddToken },
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
        // getClass (code) {
        //     console.log('code: ', code)
        //     return className.get(code)
        // },
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
            this.updateForm.amount = row.fundAmount
            this.updateForm.time = row.schedulePaymentDate
            this.updateForm.id = row.fundId
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
        openReduleDialog (id, type) {
            console.log('id, type: ', id, type)
            if (this.paymentOrderDetail.respGoodsAmount.goodsAmount !== this.paymentOrderDetail.respGoodsAmount.totalAmount && type == 2) {
                this.$confirm('支付单全部收货后，才可支付尾款哦～', '收货提示', {
                    confirmButtonText: '去收货',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.openConfirmReceipt()
                }).catch(() => {

                })
            } else {
                const params = {
                    id: id,
                    orderId: this.paymentOrderDetail.respFundResults.downpaymentFund.orderId
                }
                this.$emit('openReduleDialog', params, type)
            }
        },
        openFundsDialog (val, type, obj) {
            if (obj) {
                const params = {
                    id: val.id,
                    orderId: this.paymentOrderDetail.respFundResults.downpaymentFund.orderId,
                    type: 'downPay'
                }
                this.$emit('openFundsDialog', params, type)
            } else {
                const params = {
                    id: val.id,
                    orderId: this.paymentOrderDetail.respFundResults.downpaymentFund.orderId
                }
                this.$emit('openFundsDialog', params, type)
            }
            return false
        },
        seePayEnter (row, type) {
            console.log(row)
            const params = {
                id: row.fundId,
                orderId: this.paymentOrderDetail.respFundResults.downpaymentFund.orderId
            }
            this.$emit('findReduleDialog', params, type)
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
                this.statusKey.DOWN_PAYMENT_WAITING_PAY, this.statusKey.DOWN_PAYMENT_CONFIRM, this.statusKey.WAITING_RECEIVED, this.statusKey.CLOSED,
                this.statusKey.REMAINING_PAYMENT_WAITING_PAY, this.statusKey.REMAINING_PAYMENT_CONFIRM, this.statusKey.FINISH]
            const sIndex = statusOrderList.indexOf(displayStatus)
            const statusList = statusOrderList.filter((item, index) => index >= sIndex)
            return statusList.includes(this.paymentOrderDetail.payOrderDetail.status)
        },
        /**
         * 是否展示维护尾款分期按钮判断方法
         * 规则：当所有期数尾款状态为‘待支付’时，显示维护分期尾款按钮
         *
         * @returns true 显示按钮  false 隐藏按钮
         * @summary HAM-40183
         */
        showArrearFundByStage () {
            return this.paymentOrderDetail.respFundResults.arrearsFunds.every(item => item.fundAmount == item.unpaidAmount)
        },
        /**
         * 显示维护尾款分期弹出层并初始化数据
         *
         * @summary HAM-40183
         */
        openArrearFund () {
            this.arrearFundVisible = true
            this.arrearFundsForm.arrearFunds = deepCopy(this.paymentOrderDetail.respFundResults.arrearsFunds)
        },
        /**
         * 添加一期尾款操作
         *
         * @summary HAM-40183
         */
        onAddStage () {
            this.arrearFundsForm.arrearFunds.push({
                schedulePaymentDate: '',
                fundAmount: ''
            })
            return false
        },
        /**
         * 删除一期尾款操作
         *
         * @summary HAM-40183
         */
        onDelArrearFund (index) {
            this.arrearFundsForm.arrearFunds.splice(index, 1)
        },
        /**
         * 维护尾款提交操作
         *
         * @summary HAM-40183
         */
        updateArrearFund () {
            // 数据校验，分期尾款金额加总要等于总尾款
            let total = 0
            this.arrearFundsForm.arrearFunds.forEach(item => {
                total += item.fundAmount * 1
            })
            if (total !== this.paymentOrderDetail.respFundResults.totalArrearsAmount) {
                this.$message.error('分期尾款金额加总必须等于总尾款！')
                return
            }
            // 参数处理，先按照应支付日期排序，再重构请求需要的参数
            this.$refs.arrearFundsForm.validate(async (valid) => {
                if (valid) {
                    let params = this.arrearFundsForm.arrearFunds.sort((a, b) => {
                        return Date.parse(new Date(a.schedulePaymentDate)) - Date.parse(new Date(b.schedulePaymentDate))
                    })
                    params = params.map((item, index) => {
                        let result = {
                            id: item.fundId || null,
                            orderId: this.paymentOrderDetail.payOrderDetail.id,
                            paymentAmount: item.fundAmount * 1,
                            feeRepaymentOrder: index * 1 + 1,
                            schedulePaymentDate: item.schedulePaymentDate
                        }
                        return result
                    })
                    await updateArrearsFundsByStages({ arrearsFundDetailList: params })
                    this.arrearFundVisible = false
                    this.getPaymentOrderDetail()
                }
            })
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
        color: #ff7a45;
        font-size: 14px;
        // color: #ffffff;
        padding: 4px 14px;

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
    padding: 10px;
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
.close_vocher {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.img-box {
    display: flex;
    margin-bottom: 12px;
    margin-right: 12px;
    cursor: pointer;
    color: #ff7a45;
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
.row-filed-wrap {
    display: flex;
    // justify-content: space-around;
    align-items: center;
    margin-top: 8px;
}
.row-filed-flex {
    margin-right: 20px;
    display: flex;
    align-items: center;
    .label {
        color: #666666;
    }
}
.row-colum {
    flex-direction: column;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}

td,
th {
    padding: 0;
}

.pure-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #cbcbcb;
    text-align: center;
}

.pure-table caption {
    padding: 1em 0;
    text-align: center;
}

.pure-table td,
.pure-table th {
    border-left: 1px solid #cbcbcb;
    border-width: 0 0 0 1px;
    margin: 0;
    overflow: visible;
    padding: 0.5em 1em;
}

.pure-table thead {
    background-color: #e5e5e5;
    vertical-align: bottom;
    text-align: center;
}

.pure-table td {
    background-color: transparent;
}

.pure-table-bordered td {
    border-bottom: 1px solid #cbcbcb;
}

.pure-table-bordered tbody > tr:last-child > td {
    border-bottom-width: 0;
}
.row-filed {
    em {
        font-style: normal;
    }
    .green {
        color: green;
    }
}
/deep/ .el-dialog .el-input {
    width: 200px;
}
/deep/ .el-form-item__error {
    text-align: left;
    position: relative;
}
</style>

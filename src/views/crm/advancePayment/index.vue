<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">上游预付款支付单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.prepaymentNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.subsectionCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.distributorName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=item.label :value=item.value v-for="(item) in preStatus" :key=item.label></el-option>
                            <!-- <el-option label="部分支付" :value="2"></el-option> -->
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.applyUser" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">支付类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.paymentType" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=item.label :value=item.value v-for="(item) in paymentTypes" :key=item.label></el-option>
                            <!-- <el-option label="部分支付" :value="2"></el-option> -->
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span>上游预付款支付单总金额：{{totalMoney|moneyFormat}}</span></el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='400' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="onApproval(slotProps.data.row)" v-if="hosAuthCheck(advanceapprove)&&(slotProps.data.row.status==-1)">审核</h-button>
                    <h-button table @click="onApproval(slotProps.data.row)" v-if="hosAuthCheck(operateapprove)&&(slotProps.data.row.status==1)">审核</h-button>
                    <h-button table @click="onWriteOff(slotProps.data.row)" v-if="slotProps.data.row.paymentType==1&&slotProps.data.row.status==5&&hosAuthCheck(advancewriteoff)">核销</h-button>
                    <h-button table @click="onLook(slotProps.data.row)" v-if="hosAuthCheck(advancelook)">查看详情</h-button>
                    <h-button table @click="onApprovalRecord(slotProps.data.row)" v-if="hosAuthCheck(advancerecords)">审批记录</h-button>
                    <h-button table @click="onUploadPrePay(slotProps.data.row)" v-if="hosAuthCheck(uploadprepay)&&slotProps.data.row.status==0&&slotProps.data.row.applyAmount > 0">上传预付凭证</h-button>
                    <h-button table v-if="slotProps.data.row.showOnlineBank&&hosAuthCheck(banklink)" @click="handleIsPay(slotProps.data.row)">确认已网银支付</h-button>
                    <h-button table v-if="hosAuthCheck(submitPay)&& (slotProps.data.row.status === 0 || slotProps.data.row.status === 8)" @click="handlePreSubmit(slotProps.data.row)">确认支付</h-button>
                    <h-button table v-if="hosAuthCheck(onlinePay)&&slotProps.data.row.status === 3&&slotProps.data.row.fundPaymentType === 1&&slotProps.data.row.syncSaasTrade === 3" @click="handlePayOnline(slotProps.data.row)">司库支付</h-button>
                </template>
            </hosJoyTable>
        </div>
        <el-dialog title="上游预付款支付单详情" :visible.sync="dialogVisible" width="850px" :close-on-click-modal=false :before-close="()=>{dialogVisible = false}">
            <div class="advance_wrap">
                <h3>项目信息</h3>
                <el-row type="flex" class="row-bg">
                    <el-col :span="7" :offset='1'>项目：{{detailForm.projectName||'-'}}</el-col>
                    <el-col :span="7" :offset='1'>经销商：{{detailForm.distributor||'-'}}</el-col>
                    <el-col :span="7" :offset='1'>所属分部：{{detailForm.subsectionName||'-'}}</el-col>
                </el-row>
                <h3>上游支付信息</h3>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>申请金额(元)：{{detailForm.applyAmount | moneyFormat}}</el-col>
                    <el-col :span="10" :offset='1'>上游支付方式：{{supplierPaymentType.get(detailForm.supplierPaymentType)}}</el-col>
                    <el-col :span="10" :offset='1'>支付类型： {{ detailForm.paymentType&&paymentTypes[detailForm.paymentType-1].label||'-' }}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg" v-if="detailForm.paymentType == 1">
                    <el-col :span="10" :offset='1'>采购折让：{{detailForm.purchaseDiscountRate}}%</el-col>
                    <el-col :span="10" :offset='1'>采购金额(折让后)(元)：{{detailForm.purchaseDiscountAmount|moneyFormat}}</el-col>
                    <el-col :span="10" :offset='1'>加价率：{{detailForm.salesGrossMargin}}%</el-col>
                </el-row>
                <el-row type="flex" class="row-bg" v-if="detailForm.paymentType == 1">
                    <el-col :span="10" :offset='1'>加价额(元)：{{detailForm.salesGrossAmount|moneyFormat}}</el-col>
                    <el-col :span="21" :offset='1' style="marginLeft:30px">销售金额(元)：{{detailForm.salesAmount|moneyFormat}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="16" :offset='1'>付款主体：{{detailForm.paymentCompanyName||'-'}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>上游供应商：{{detailForm.supplierCompanyName||'-'}}</el-col>
                    <el-col :span="10" :offset='1'>供应商开户行名称：{{detailForm.supplierAccountName||'-'}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>银行联行号：{{detailForm.supplierBankNo||'-'}}</el-col>
                    <el-col :span="10" :offset='1'>供应商银行账号：{{detailForm.supplierAccountNo||'-'}} (<em v-if="detailForm.supplierLabel" :class="detailForm.supplierLabel&&className.get(detailForm.supplierLabel.code)"> {{detailForm.supplierLabel.desc}} </em>)</el-col>

                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>期望上游支付日期：{{detailForm.expectSupplierPaymentDate||'-'}}</el-col>
                    <el-col :span="10" :offset='1'>备注：{{detailForm.applyRemark||'-'}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col class="pay_vouchers mtNone" :span="20" :offset='1'>附件：
                        <div class="advance_wrap-flex" v-if="detailForm.attachDocList &&detailForm.attachDocList.length>0">
                            <div v-for="(v,index) in detailForm.attachDocList" :key="index">
                                <downloadFileAddToken isPreview isType='preview' :file-url="v.fileUrl" :a-link-words="v.fileName" />
                            </div>
                        </div>
                        <span v-if="detailForm.attachDocList && detailForm.attachDocList.length==0">
                            -
                        </span>
                    </el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>申请时间：{{moment(detailForm.applyTime).format('yyyy-MM-DD HH:mm:ss')||'-'}}</el-col>
                    <el-col :span="10" :offset='1'>申请人：{{detailForm.applyUser||'-'}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg" v-if="detailForm.status>-1">
                    <el-col :span="10" :offset='1'>分财审核人：{{detailForm.financeApprovalUser||'-'}}{{detailForm.financeApprovalPhone?'('+detailForm.financeApprovalPhone+')':''}}</el-col>
                    <el-col :span="10" :offset='1'>审核时间：{{detailForm.financeApprovalTime?moment(detailForm.financeApprovalTime).format('yyyy-MM-DD HH:mm:ss'):'-'}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg" v-if="detailForm.status>-1">
                    <el-col :span="10" :offset='1'>审核结果：{{detailForm.financeApprovalStatus==1?'通过':detailForm.financeApprovalStatus==2?'不通过':'-'}}</el-col>
                    <el-col :span="10" :offset='1'>审核备注：{{detailForm.financeApprovalRemark||'-'}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg" v-if="detailForm.approvalUser">
                    <el-col :span="10" :offset='1'>项目运营审核人：{{detailForm.approvalUser||'-'}} {{detailForm.approvalPhone?'('+detailForm.approvalPhone+')':''}}</el-col>
                    <el-col :span="10" :offset='1'>审核时间：{{detailForm.approvalTime?moment(detailForm.approvalTime).format('yyyy-MM-DD HH:mm:ss'):'-'}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg" v-if="detailForm.approvalUser">
                    <el-col :span="10" :offset='1'>审核结果：{{detailForm.approvalStatus==1?'通过':detailForm.approvalStatus==2?'不通过':'-'}}</el-col>
                    <el-col :span="10" :offset='1'>审核备注：{{detailForm.approvalRemark||'-'}}</el-col>
                </el-row>
                <div class="pre_wrap" v-if="detailForm.fund">
                    <h4>预付款支付计划：</h4>
                    <hosJoyTable ref="hosjoyTable" align="center" border stripe :column="tableLabelDetail" :data="planData"></hosJoyTable>
                </div>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>核销人：{{detailForm.writeOffUser||'-'}}</el-col>
                    <el-col :span="10" :offset='1'>核销时间：{{detailForm.writeOffTime?moment(detailForm.writeOffTime).format('yyyy-MM-DD HH:mm:ss'):'-'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" :offset='1'>核销原因：{{detailForm.writeOffRemark||'-'}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>应向上游支付(元)：{{detailForm.totalAmount|moneyFormat}}</el-col>
                    <el-col :span="10" :offset='1'>已向上游支付(元)：{{detailForm.paidAmount|moneyFormat}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg grid-content" v-for="(item,index) in detailForm.supplierDetails" :key="item.id">
                    <el-col :span="10" :offset='1'>{{index+1}}、本次上游支付(元)：{{item.payAmount|moneyFormat}}</el-col>
                    <el-col :span="10" :offset='1'>支付日期：{{item.payDate}}</el-col>
                    <el-col :span="10" :offset='1' v-if="!detailForm.showSaasButton">操作人：{{item.createBy}}</el-col>
                    <el-col :span="10" :offset='1' v-if="!detailForm.showSaasButton">操作时间：{{ item.createTime | momentFormat }}</el-col>
                    <el-col :span="10" :offset='1' v-if="!detailForm.showSaasButton">实际收款供应商银行账号：{{item.supplierAccountNo}}</el-col>
                    <el-col :span="10" :offset='1' v-if="!detailForm.showSaasButton">实际收款供应商开户行名称：{{item.supplierAccountName}}</el-col>
                    <el-col :span="10" :offset='1' v-if="!detailForm.showSaasButton">实际收款供应商银行联行号：{{item.supplierBankNo}}</el-col>
                    <el-col :span="20" :offset='1' class="credentials">上游支付凭证：
                        <div v-if="item.payVouchers&&item.payVouchers.length>0">
                            <!-- 司库返回凭证 showSaasButton区分-->
                            <template v-if="detailForm.showSaasButton">
                                <a class="color" :href="item.payVouchers[0].fileUrl" target="_blank">查看好享家专用付款凭证</a>
                            </template>
                            <!-- 网银支付返回凭证 -->
                            <template v-else>
                                <div v-for="(v) in item.payVouchers" :key="v.id">
                                    <downloadFileAddToken isPreview :file-name="v.fileName" :file-url="v.fileUrl" :a-link-words="v.fileName" is-type="main" />
                                </div>
                            </template>
                        </div>
                        <span v-if="item.payVouchers&&item.payVouchers.length==0">
                            -
                        </span>
                    </el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="24" :offset='18'>
                        <el-button type="primary" v-if="hosAuthCheck(advancepay)&&detailForm.supplierPaymentType==2&&detailForm.status==3" @click="onConfirmUpper">确认上游支付</el-button>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 审核 -->
        <el-dialog title="上游预付款支付单审核" :visible.sync="examineVisble" width="800px" :close-on-click-modal=false :before-close="()=>{examineVisble = false}">
            <div class="advance_examine">
                <div class="advance_examine-left">
                    <h3>项目信息</h3>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="10" :offset='1'>项目：{{detailForm.projectName||'-'}}</el-col>

                        <el-col :span="10" :offset='1'>经销商：{{detailForm.distributor||'-'}}</el-col>

                        <el-col :span="10" :offset='1'>所属分部：{{detailForm.subsectionName||'-'}}</el-col>
                    </el-row>
                    <h3>上游支付信息</h3>
                    <el-row>
                        <el-col class="col-padding" :span="10" :offset='1'>申请金额(元)：{{detailForm.applyAmount|moneyFormat}}</el-col>
                        <!-- 当支付类型=货款时，才展示采购折让、采购金额(折让后)、加价率、销售金额 -->
                        <!-- 支付类型 1.货款，2.费用 -->
                        <template v-if="detailForm.paymentType == 1">
                            <el-col class="col-padding" :span="10" :offset='1'>采购折让：{{detailForm.purchaseDiscountRate}}%</el-col>
                            <el-col class="col-padding" :span="10" :offset='1'>采购金额(折让后)(元)：{{detailForm.purchaseDiscountAmount|moneyFormat}}</el-col>
                            <el-col class="col-padding" :span="10" :offset='1'>加价率：{{detailForm.salesGrossMargin}}%</el-col>
                            <el-col class="col-padding" :span="10" :offset='1'>加价额(元)：{{detailForm.salesGrossAmount|moneyFormat}}</el-col>
                            <el-col class="col-padding" :span="10" :offset='1'>销售金额(元)：{{detailForm.salesAmount|moneyFormat}}</el-col>
                        </template>
                        <el-col class="col-padding" :span="10" :offset='1'>上游支付方式：{{supplierPaymentType.get(detailForm.supplierPaymentType)}}</el-col>
                        <el-col class="col-padding" :span="10" :offset='1'>支付类型： {{detailForm.paymentType&& paymentTypes[detailForm.paymentType-1].label||'-' }}</el-col>
                        <el-col class="col-padding" :span="10" :offset='1'>上游供应商：{{detailForm.supplierCompanyName||'-'}}</el-col>
                        <el-col class="col-padding" :span="10" :offset='1'>供应商开户行名称：{{detailForm.supplierAccountName||'-'}}</el-col>
                        <el-col class="col-padding" :span="10" :offset='1'>银行联行号：{{detailForm.supplierBankNo||'-'}}</el-col>
                        <el-col class="col-padding" :span="10" :offset='1'>供应商银行账号：{{detailForm.supplierAccountNo||'-'}}(<em v-if="detailForm.supplierLabel" :class="detailForm.supplierLabel&&className.get(detailForm.supplierLabel.code)"> {{detailForm.supplierLabel.desc}} </em>)</el-col>
                        <el-col class="col-padding" :span="10" :offset='1'>期望上游支付日期：{{detailForm.expectSupplierPaymentDate||'-'}}</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>备注信息：{{detailForm.applyRemark||'-'}}</el-col>
                        <el-col class="col-padding disFlex" :span="23" :offset='1'>附件：
                            <div class="advance_wrap-flex" v-if="detailForm.attachDocList &&detailForm.attachDocList.length>0">
                                <div v-for="(v,index) in detailForm.attachDocList" :key="index">
                                    <downloadFileAddToken isPreview isType='preview' :file-url="v.fileUrl" :a-link-words="v.fileName" />
                                </div>
                            </div>
                            <div v-else>-</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="advance_examine-right">
                    <h3>分财审核信息</h3>
                    <el-row v-if="detailForm.status==1">
                        <el-col class="col-padding" :span="23" :offset='1'>审核结果：{{detailForm.financeApprovalStatus==1?'通过':detailForm.financeApprovalStatus==2?'不通过':'-'}}</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>审核备注：{{detailForm.financeApprovalRemark||'-'}}</el-col>
                    </el-row>
                    <el-form v-if="detailForm.status==-1" :model="auditForm" :rules="auditRules" ref="auditForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="审核结果：" prop="resource">
                            <el-radio-group v-model="auditForm.resource">
                                <el-radio label="通过"></el-radio>
                                <el-radio label="不通过"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="审核备注：" prop="remark" v-if="auditForm.resource=='不通过'">
                            <el-input type="textarea" v-model="auditForm.remark" maxlength="200"></el-input>
                        </el-form-item>
                    </el-form>
                    <h3 v-if="detailForm.status==1">项目运营审核信息</h3>
                    <el-form v-if="detailForm.status==1" :model="auditForm" :rules="auditRules" ref="auditForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="审核结果：" prop="resource">
                            <el-radio-group v-model="auditForm.resource">
                                <el-radio label="通过"></el-radio>
                                <el-radio label="不通过"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="审核备注：" prop="remark" v-if="auditForm.resource=='不通过'">
                            <el-input type="textarea" v-model="auditForm.remark" maxlength="200"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <p style="color: #999;">审核通过后，将会发送钉钉上游预付款支付审批流程</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="examineVisble = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitAudit(detailForm.status)">确认审核</el-button>
            </span>
        </el-dialog>

        <!-- 确认上游支付 -->
        <el-dialog title="上游预付款的上游支付" :visible.sync="comfirmVisble" width="700px" :close-on-click-modal=false :before-close="()=>{comfirmVisble = false}">
            <div class="advance_wrap">
                <el-form :model="payForm" :rules="detailRules" ref="payForm" label-width="220px" class="demo-ruleForm">
                    <el-row ype="flex" class="row-bg">
                        <el-col :span="10" :offset='1'>经销商：{{detailForm.distributor||'-'}}</el-col>
                        <el-col :span="10" :offset='1'>项目：{{detailForm.projectName||'-'}}</el-col>
                    </el-row>
                    <el-row ype="flex" class="row-bg">
                        <el-col :span="10" :offset='1'>分部：{{detailForm.subsectionName||'-'}}</el-col>
                        <el-col :span="10" :offset='1'>上游：{{detailForm.supplierCompanyName||'-'}}</el-col>
                    </el-row>
                    <el-row ype="flex" class="row-bg">
                        <el-col :span="10" :offset='1'>上游支付方式：{{supplierPaymentType.get(detailForm.supplierPaymentType)}}</el-col>
                        <el-col :span="10" :offset='1'>剩余应上游支付(元)：{{detailForm.surplusAmount|moneyFormat}}</el-col>
                    </el-row>
                    <el-form-item style="margin-top:20px" label="本次支付账号：" prop="payeeBankName">
                        <!-- <el-select v-model="payForm.id" placeholder="请选择" @change="handlePayRadio">
                            <el-option v-for="item in payeeAccountList" :key="item.id" :label="item.allName" :value="item.id">
                                <span style="float: left">{{ item.payeeBankName }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.payeeBankAccount }}</span>
                            </el-option>
                        </el-select> -->
                         <HAutocomplete :placeholder="'请选择'" :maxlength=60 @back-event="backPayparam" :selectObj="targetObj" :selectArr="payeeAccountList" v-if="payeeAccountList" :remove-value='true' :isSettimeout=false>
                        <template slot-scope="scope">
                            <div style="display:flex;flex-direction: column;">
                                <span style="">{{ scope.data.payeeBankName }}</span>
                                <span style=" color: #8492a6; font-size: 12px">{{ scope.data.payeeBankAccount }}</span>
                            </div>
                        </template>
                    </HAutocomplete>
                    </el-form-item>
                    <el-form-item style="margin-top:20px" label="本次支付金额：" prop="payAmount">
                        <el-input v-model.trim="payForm.payAmount" maxlength="50" v-isNegative:2="payForm.payAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="支付日期：" prop="payDate">
                        <el-date-picker v-model="payForm.payDate" value-format='yyyy-MM-dd' type="date" placeholder="选择日期" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传上游支付凭证：" prop="payVouchers" style="margin:20px 0">
                        <OssFileHosjoyUpload v-model="payForm.payVouchers" :showPreView='true' :fileSize=20 :fileNum=20 :uploadParameters='uploadParameters' @successArg="backUpload" :multiple=false accept=".jpg,.png,.pdf">
                            <div class="a-line">
                                <h-button>上传文件</h-button>
                            </div>
                        </OssFileHosjoyUpload>
                        <p class="tips">支持扩展名：jpg.png.pdf...</p>
                    </el-form-item>
                    <el-form-item label="实际收款供应商银行账号：" prop="supplierAccountNo">
                        <el-input v-model="payForm.supplierAccountNo" placeholder="请输入" maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item label="实际收款供应商开户行名称：" prop="supplierAccountName">
                        <el-input v-model="payForm.supplierAccountName" placeholder="请输入" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="实际收款供应商银行联行号：" prop="supplierBankNo">
                        <el-input v-model="payForm.supplierBankNo" placeholder="请输入" maxlength="12"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="comfirmVisble = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitPay">确认支付</el-button>
            </span>
        </el-dialog>
        <!-- 记录 -->
        <el-dialog title="审批记录" :visible.sync="recordVisible" width="30%" :before-close="()=>{recordVisible = false}">
            <div class="advance_wrap">
                <p>上游预付款支付钉钉审批流程</p>
                <p class="advance_wrap-msg">{{recordInfo.distributor}}申请上游预付款支付{{recordInfo.applyAmount|moneyFormat}}元</p>
                <el-timeline>
                    <el-timeline-item v-for="(item, index) in records" :key="index" color='#ff7a45' :hide-timestamp="true">
                        <p>{{item.operator}}/{{item.operationName}}</p>
                        <p>{{moment(item.operationTime).format("YYYY-MM-DD HH:mm:ss")}}</p>
                        <p style="color:#ff7a45">备注：{{item.approvalRemark||'-'}}</p>
                    </el-timeline-item>
                </el-timeline>
                <p v-if="records&&records.length==0" style="text-align:center">
                    暂无审批记录
                </p>
            </div>
        </el-dialog>
        <!-- 核销 -->
        <el-dialog title="核销" :visible.sync="writeOffVisible" width="30%" :before-close="()=>{writeOffVisible = false,this.$refs['writeOffForm'].clearValidate()}">
            <div>
                <el-form :model="writeOffForm" :rules="writeOffRules" ref="writeOffForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="核销原因" prop="writeOffRemark">
                        <el-input type="textarea" placeholder="请输入" v-model="writeOffForm.writeOffRemark" maxlength="200"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSaveWriteOff">确认核销</el-button>
                <el-button @click="()=>{writeOffVisible = false,this.$refs['writeOffForm'].clearValidate()}">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 网银支付 -->
        <el-dialog :close-on-click-modal='false' title="确认网银支付" :visible.sync="isShowLinkBank" :before-close="()=>{isShowLinkBank = false;bankForm.attachDocRequestList=[]}" width="600px" class="prev-payment-dialog">
            <el-form :model="bankForm" :rules="bankRules" ref="bankForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="本次支付账号：" prop="payeeBankName">

                    <HAutocomplete :placeholder="'请选择'" :maxlength=60 @back-event="backFindparam" :selectObj="targetObj" :selectArr="payeeAccountList" v-if="payeeAccountList" :remove-value='true' :isSettimeout=false>
                        <template slot-scope="scope">
                            <div style="display:flex;flex-direction: column;">
                                <span style="">{{ scope.data.payeeBankName }}</span>
                                <span style=" color: #8492a6; font-size: 12px">{{ scope.data.payeeBankAccount }}</span>
                            </div>
                        </template>
                    </HAutocomplete>
                </el-form-item>
                <el-form-item label="网银支付时间：" prop="paymentTime">
                    <el-date-picker v-model="bankForm.paymentTime" value-format='yyyy-MM-dd' type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="上传上游支付凭证：" prop="attachDocRequestList" style="margin:20px 0">
                    <OssFileHosjoyUpload v-model="bankForm.attachDocRequestList" :showPreView='true' :fileSize=20 :fileNum=9 :uploadParameters='uploadParameters' @successCb="$refs['bankForm'].clearValidate('attachDocRequestList')" accept=".jpg,.png,.pdf">
                        <div class="a-line">
                            <h-button>上传文件</h-button>
                        </div>
                    </OssFileHosjoyUpload>
                    <p class="tips">请上传JPG/PNG/PDF等主流格式，最多上传9张，单张大小不得超过20M</p>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <h-button @click="isShowLinkBank = false;bankForm.attachDocRequestList=[]">取消</h-button>
                <h-button type="primary" @click="handleSubBank">确定</h-button>
            </div>
        </el-dialog>
        <UploadDialog ref="uploaddialog" @onBackSearch="getList"></UploadDialog>
        <ReduleDialog :is-open="reduleDialogVisible" ref="reduleDialog" @onClose="fundsDialogClose"></ReduleDialog>
        <!-- OCR 信息确认 -->
        <el-dialog title="OCR识别信息确认" :visible.sync="ocrVisible" width="30%" :before-close="()=>{ocrVisible = false}">
            <div class="ocr-wrap">
                <h2>检测到OCR识别的实际收款供应商账号信息与界面信息存在差异</h2>
                <h3>OCR识别到信息：</h3>
                <p>实际收款供应商银行账号：{{ocrData.supplierAccountNo}}</p>
                <p>实际收款供应商开户行名称：{{ocrData.supplierAccountName}}</p>
                <p>实际收款供应商银行联行号：{{ocrData.supplierBankNo}}</p>
                <h3>界面信息：</h3>
                <p>实际收款供应商银行账号：{{payForm.supplierAccountNo}}</p>
                <p>实际收款供应商开户行名称：{{payForm.supplierAccountName}}</p>
                <p>实际收款供应商银行联行号：{{payForm.supplierBankNo}}</p>
                <strong>确定以OCR识别信息为准，覆盖现有界面信息？</strong>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=>{ocrVisible = false}">不覆盖</el-button>
                <el-button type="primary" @click="onSaveCover">确定覆盖</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="tsx">
import moment from 'moment'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter, State } from 'vuex-class'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import ImageAddToken from '@/components/imageAddToken/index.vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import downloadFileAddToken from '@/components/downloadFileAddToken/index.vue'
import { deepCopy } from '@/utils/utils'
import UploadDialog from '../funds/components/uploadPayDialog.vue'
import ReduleDialog from '../funds/components/redulePayDialog.vue'
import HAutocomplete from '@/components/autoComplete/HAutocomplete.vue'
import { PrepaymentDetailResponse, PrepaymentSupplierOnlineBankTransferConfirmRequest, PrepaymentSupplierSubmitResponse, RespContractSignHistory, SupplierOnlineBankTransferConfirmRequest } from '@/interface/hbp-project'
import { CRM_ADVACE_UPSTREAMPAY, CRM_ADVACE_APPROVE, CRM_ADVACE_LOOK, CRM_OPREATE_APPROVE, CRM_ADVACE_RECORDS, CRM_UPSTREAM_BANK, CRM_UPLOAD_PREPAY, CRM_ADVACE_WRITEOFF, CRM_SUBMIT_PAY, CRM_ONLINE_PAY } from '@/utils/auth_const'
import { newCache } from '@/utils/index'
import * as Api from './api/index'
import OssFileUtils from '@/utils/OssFileUtils'

const className = new Map([
    [0, 'red'],
    [10, 'green'],
    [11, 'green'],
    [12, 'red'],
    [20, 'red'],
    [21, 'red'],
    [22, 'red'],
    [30, 'green'],
    [31, 'green'],
    [32, 'red']
])
// 定义类型
interface Query{
    [key:string]:any
}
const paymentTypes = [{ value: 1, label: '货款' }, { value: 2, label: '费用' }]

const preStatus = [{ value: -1, label: '待分财审核' }, { value: 1, label: '待项目运营审核' }, { value: 2, label: '流程审批中' }, { value: 0, label: '预付款待支付' }, { value: 8, label: '预付款支付待确认' }, { value: 3, label: '待支付' }, { value: 4, label: '支付单完成' }, { value: 5, label: '待核销' }, { value: 6, label: '已核销' }, { value: 7, label: '支付单关闭' }]

enum SubmitApi {
    /** 分财审核通过 */
    updateFinancePass = 'updateFinancePass',
    /** 分财审核不通过通过 */
    updateFinanceFail = 'updateFinanceFail',
        /** 运营审核通过 */
    passPre = 'passPre',
    /** 运营审核不通过通过 */
    passFailPre = 'passFailPre'
}

@Component({
    name: 'Advancelist',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload,
        ImageAddToken,
        downloadFileAddToken,
        UploadDialog,
        ReduleDialog,
        HAutocomplete
    }
})
export default class Advancelist extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    preStatus = preStatus
    moment = moment
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
     supplierPaymentType : Map<number | null, string> = new Map([
         [null, '-'],
         [1, '银行转账'],
         [2, '银行承兑']
     ])
               targetObj= {
                   selectName: '',
                   selectCode: ''
               }
    className = className
    reduleDialogVisible:boolean = false
    advancewriteoff = CRM_ADVACE_WRITEOFF
    advancepay = CRM_ADVACE_UPSTREAMPAY
    advanceapprove = CRM_ADVACE_APPROVE // 分财
    operateapprove = CRM_OPREATE_APPROVE // 运营
    advancelook = CRM_ADVACE_LOOK
    advancerecords = CRM_ADVACE_RECORDS
    uploadprepay = CRM_UPLOAD_PREPAY
    banklink = CRM_UPSTREAM_BANK
    submitPay = CRM_SUBMIT_PAY
    onlinePay = CRM_ONLINE_PAY // 司库
    private writeOffVisible:boolean = false
    private dialogVisible:boolean = false
    private comfirmVisble:boolean = false
    private examineVisble:boolean = false
    private recordVisible:boolean = false
    private ocrVisible:boolean = false
    private _queryParams:Query = {}
    private totalMoney:number = 0
    private id:number|string = null
    private prePayVisble:boolean = false
    private isShowLinkBank:boolean = false
    private records:Array<RespContractSignHistory> = null
    paymentTypes=paymentTypes
    private recordInfo = {
        distributor: '',
        applyAmount: ''
    }
    num:number = 0
    @State('userInfo') userInfo: any
    payeeAccountList:any[]=[]
    queryParams:Query = {
        pageSize: 10,
        pageNumber: 1,
        prepaymentNo: '',
        projectName: '',
        distributorName: '',
        subsectionCode: '',
        status: '',
        applyUser: '',
        applyTimeStart: '',
        applyTimeEnd: '',
        jobNumber: '',
        authCode: sessionStorage.getItem('authCode')
            ? JSON.parse(sessionStorage.getItem('authCode') || '')
            : ''
    }
    writeOffForm = {
        writeOffRemark: ''
    }
    pickerOptions={
        disabledDate (time) {
            return time.getTime() > Date.now() // 如果当天可选，就不用减8.64e7
        }
    }
    detailForm:PrepaymentDetailResponse = {} as PrepaymentDetailResponse
    auditForm = {
        resource: '',
        remark: ''
    }
    operateForm = {
        resource: '',
        remark: ''
    }
    payForm:Record<any, any>={
        payVouchers: [],
        prepaymentOrderId: '',
        payAmount: '',
        payDate: '',
        payPrincipal: '',
        payeeBankName: '',
        payeeBankAccount: '',
        supplierAccountName: '',
        supplierAccountNo: '',
        supplierBankNo: ''
    }
    prePayForm:Record<string, any>={
        prepaymentOrderId: '',
        payAmount: '',
        confirmAmount: '',
        paidAmount: '',
        operator: '',
        operatorPhone: '',
        payVouchers: []
    }
    bankForm:Partial<PrepaymentSupplierOnlineBankTransferConfirmRequest>={
        prepaymentOrderId: '',
        paymentTime: '',
        attachDocRequestList: [],
        payPrincipal: '',
        payeeBankName: '',
        payeeBankAccount: ''
    }
    ocrData:Record<any, any> = {}
    page = {
        total: 0
    }
    private tableLabelDetail:tableLabelProps = [
        { label: '预付款总金额(元)', prop: 'totalAmount', displayAs: 'money' },
        { label: '待支付(元)', prop: 'unpaidAmount', displayAs: 'money' },
        { label: '已支付(元)', prop: 'paidAmount', displayAs: 'money' },
        { label: '支付待确认(元)', prop: 'unconfirmedAmount', displayAs: 'money' }

    ]
    private tableLabel:tableLabelProps = [
        { label: '上游预付款支付单编号', prop: 'prepaymentNo', width: '160px' },
        { label: '所属分部', prop: 'subsectionName' },
        { label: '经销商', prop: 'distributor' },
        { label: '项目名称', prop: 'projectName', width: '120' },
        { label: '金额', prop: 'applyAmount', displayAs: 'money', width: '130' },
        { label: '支付类型', prop: 'paymentType', dicData: paymentTypes },
        { label: '状态',
            prop: 'status',
            dicData: preStatus
        },
        { label: '核销采购单编号', prop: 'purchaseOrderNo' },
        { label: '申请人', prop: 'applyUser' },
        { label: '申请时间', prop: 'applyTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' }

    ]
    private planData = []

    private tableData = []
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function
    get options () {
        return {
            type: 'datetime',
            valueFormat: 'yyyy-MM-ddTHH:mm:ss',
            format: 'yyyy-MM-dd HH:mm:ss',
            startTime: this.queryParams.applyTimeStart,
            endTime: this.queryParams.applyTimeEnd
        }
    }

    writeOffRules = {
        writeOffRemark: [
            { required: true, message: '请填写核销原因', trigger: 'blur' }
        ]
    }
    auditRules = {
        resource: [
            { required: true, message: '请选择审核结果', trigger: 'blur' }
        ],
        remark: [
            { required: true, message: '请填写审核备注', trigger: 'blur' }
        ]
    }

    prePayRules = {
        payVouchers: [
            { required: true, message: '上游支付凭证不能为空', trigger: 'blur' }
        ]
    }

    get bankRules () {
        return {
            payeeBankName: [{ required: true, message: '请选择本次支付账号', trigger: 'change' }],
            paymentTime: [{ required: true, message: '请选择网银支付时间', trigger: 'change' }],
            attachDocRequestList: [{ required: true, message: '上游支付凭证不能为空', trigger: 'blur' }]
        }
    }

    detailRules = {
        payeeBankName: [{ required: true, message: '请选择本次支付账号', trigger: 'change' }],
        payVouchers: [
            { required: true, message: '上传上游支付凭证不能为空', trigger: 'blur' }
        ],
        payDate: [
            { required: true, message: '上游支付日期不能为空', trigger: 'blur' }
        ],
        payAmount: [
            {
                required: true,
                validator: (rule, value, callback) => {
                    console.log('value.length', value.length, this.payForm.payAmount)
                    if (!this.payForm.payAmount) {
                        return callback(new Error('上游支付金额不能为空'))
                    } else if (this.payForm.payAmount == 0) {
                        return callback(new Error('上游支付金额必须大于0'))
                    } else if (this.payForm.payAmount > this.detailForm.surplusAmount) {
                        return callback(new Error('上游支付金额必须小于等于剩余应上游支付'))
                    }
                    return callback()
                },
                trigger: 'blur'
            }
        ],
        supplierAccountName: [
            { required: true, message: '供应商开户行名称不能为空', trigger: 'blur' }
        ],
        supplierAccountNo: [
            { required: true, message: '供应商银行账号不能为空', trigger: 'blur' }
        ],
        supplierBankNo: [
            {
                required: true,
                validator: (rule, value, callback) => {
                    if (!(/^\d{12}$/.test(value))) {
                        return callback(new Error('请输入正确的12位联行号数字'))
                    }
                    return callback()
                }
            },
            { required: true, message: '银行联行号不能为空', trigger: 'blur' }
        ]
    }

    public onStartChange (val): void {
        this.queryParams.applyTimeStart = val
    }
    public onEndChange (val): void {
        this.queryParams.applyTimeEnd = val
    }
    public goDetail (url) {
        window.open(url)
    }

    public async handlePayOnline (val) {
        console.log(val.id)
        await Api.updatePayOnline(val.id)
        this.$message.success('司库支付成功')
        this.getList()
    }

    // 确认支付
    handlePreSubmit (val) {
        this.$refs['reduleDialog'].findRemainConfirm(val, val.repaymentType)
        this.reduleDialogVisible = true
    }
    fundsDialogClose () {
        this.reduleDialogVisible = false
        this.getList()
    }

    public async getList () {
        this.queryParams.jobNumber = this.userInfo.jobNumber as string
        const res:any = await Promise.all([Api.getPreTotal(this.queryParams), Api.getPrePayList(this.queryParams)])
        this.tableData = res[1].data.records
        this.page.total = res[1].data.total as number
        this.totalMoney = res[0].data
    }

    // 审核
    public async onApproval (v) {
        this.id = v.id
        const { data } = await Api.getPrePayDetail(v.id)
        this.detailForm = { ...this.detailForm, ...data }
        console.log('🚀 --- onApproval --- this.detailForm', this.detailForm)
        this.examineVisble = true
        this.auditForm = {
            resource: '',
            remark: ''
        }
    }
    handleIsPay (val) {
        this.isShowLinkBank = true
        this.bankForm.paymentTime = moment(new Date()).format('YYYY-MM-DD')
        this.bankForm.prepaymentOrderId = val.id
        this.getBankAccount()
        this.$nextTick(() => {
            this.$refs['bankForm'].clearValidate()
        })
        this.targetObj = {
            selectName: '',
            selectCode: ''
        }
        this.bankForm.payeeBankName = ''
    }

    handleSubBank () {
        console.log(this.bankForm)

        this.$refs['bankForm'].validate(async (validate) => {
            if (validate) {
                await Api.updateOnlineBank(this.bankForm)
                this.isShowLinkBank = false
                this.getList()
            }
        })
    }

    async backUpload (val) {
        this.num = this.num + 1
        console.log('  this.num: ', this.num)
        console.log('val: ', val)
        this.$refs['payForm'].clearValidate('payVouchers')
        if (this.payForm.payVouchers.length == 1) {
            // 第一张图片进行ocr 认证
            let tokenUrl = await OssFileUtils.getUrl(val.fileUrl)
            const { data } = await Api.bankOcrReceipt({ image: tokenUrl })
            console.log('data: ', data)
            this.ocrData = data
            this.ocrData = {
                ...this.ocrData,
                supplierBankNo: this.ocrData.supplierBankNo || this.detailForm.supplierBankNo
            }
            if (data.supplierAccountName) {
                if (this.ocrData.supplierAccountNo !== this.payForm.supplierAccountNo || this.ocrData.supplierBankNo != this.payForm.supplierBankNo || this.ocrData.supplierAccountName != this.payForm.supplierAccountName) {
                    this.ocrVisible = true
                }
            } else {
                this.$message.info('该图片无法进行OCR识别，请重新上传或手动修改供应商信息')
            }
        }
    }

    onSaveCover () {
        this.payForm = {
            ...this.payForm,
            supplierAccountNo: this.ocrData.supplierAccountNo,
            supplierBankNo: this.ocrData.supplierBankNo || this.detailForm.supplierBankNo,
            supplierAccountName: this.ocrData.supplierAccountName
        }
        this.ocrVisible = false
    }

    public onUploadPrePay (val) {
        this.$refs['uploaddialog'].onDialogClick(val)
    }

    public handleSubmit () {
        this.$refs['prePayForm'].validate(async value => {
            if (value) {
                await Api.updatePrePay(this.prePayForm)
                this.$message.success('上传成功')
                this.getList()
                this.prePayVisble = false
            }
        })
    }

    public onSubmitAudit (type):void {
        this.$refs['auditForm'].validate(async value => {
            if (value) {
                console.log(this.auditForm.resource)
                if (this.auditForm.resource == '通过') {
                    if (type == 1) {
                        await Api[SubmitApi['passPre']](this.id)
                    } else {
                        await Api[SubmitApi['updateFinancePass']](this.id)
                    }
                } else {
                    if (type == 1) {
                        await Api[SubmitApi['passFailPre']](this.id, { remark: this.auditForm.remark.trim() })
                    } else {
                        await Api[SubmitApi['updateFinanceFail']](this.id, { remark: this.auditForm.remark.trim() })
                    }
                }
                this.$message.success('提交成功')
                this.getList()
                this.examineVisble = false
            } else {
                this.$nextTick(() => {
                    const dom = document.querySelector('.is-error')
                        dom!.scrollIntoView()
                })
            }
        })
    }

    // 确定支付
    public onSubmitPay () {
        this.payForm.prepaymentOrderId = this.detailForm.id
        this.$refs['payForm'].validate(async value => {
            if (value) {
                await Api.submitPrePay(this.payForm)
                this.$message.success('提交成功')
                this.getList()
                this.dialogVisible = false
                this.comfirmVisble = false
            }
        })
    }

    public async onLook (v) {
        this.dialogVisible = true
        const { data } = await Api.getPrePayDetail(v.id)
        this.detailForm = { ...this.detailForm, ...data }
        console.log('🚀 --- onLook --- this.detailForm', this.detailForm)
        if (data.fund) {
            this.planData = [{ totalAmount: data.fund.fundAmount, unconfirmedAmount: data.fund.unconfirmedAmount, paidAmount: data.fund.paidAmount, unpaidAmount: data.fund.unpaidAmount }]
        }
    }

    public async onApprovalRecord (v) {
        const { data } = await Api.getApprovalHistory(v.id)
        this.recordInfo = {
            distributor: v.distributor,
            applyAmount: v.applyAmount
        }
        this.records = data
        this.recordVisible = true
    }

    public onReset (): void {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }

    public onWriteOff (val):void{
        this.writeOffForm.writeOffRemark = ''
        if (val.status != 5) {
            this.$message.warning('上游预付款支付单非待核销状态，不能手工变更为已核销状态')
        } else {
            this.writeOffVisible = true
            this.id = val.id
        }
    }

    public onSaveWriteOff () {
        this.$refs['writeOffForm'].validate(async value => {
            if (value) {
                await Api.saveWriteOff(this.id, { writeOffRemark: this.writeOffForm.writeOffRemark })
                this.$message.success('核销成功')
                this.writeOffVisible = false
                this.getList()
            }
        })
    }

    public onConfirmUpper (): void {
        // 上游支付
        this.comfirmVisble = true
        this.$nextTick(() => {
            this.$refs['payForm'].clearValidate()
        })
        this.payForm.payAmount = this.detailForm.surplusAmount
        this.payForm.supplierAccountNo = this.detailForm.supplierAccountNo
        this.payForm.supplierBankNo = this.detailForm.supplierBankNo
        this.payForm.supplierAccountName = this.detailForm.supplierAccountName
        this.payForm.payDate = moment(new Date()).format('YYYY-MM-DD')
        this.payForm.payVouchers = []
        this.getBankAccount()
        this.targetObj = {
            selectName: '',
            selectCode: ''
        }
        this.payForm.payeeBankName = ''
    }

    async getBankAccount () {
        this.payeeAccountList = []
        const { data } = await Api.findPayeeAccount()
        data.map(val => {
            this.payeeAccountList = this.payeeAccountList.concat(val.payeeAccountList)
        })
        console.log('aa: ', this.payeeAccountList)

        this.payeeAccountList.map(val => {
            // val.allName = val.payeeBankName + '(' + val.payeeBankAccount + ')'
            val.value = val.payeeBankName + '(' + val.payeeBankAccount + ')'
            val.selectCode = val.payeeBankAccount
        })
    }

    handleAccountRadio (val) {
        const bankInfo = this.payeeAccountList.filter(item => item.id == val)[0]
        this.bankForm.payPrincipal = bankInfo.payeeName
        this.bankForm.payeeBankName = bankInfo.payeeBankName
        this.bankForm.payeeBankAccount = bankInfo.payeeBankAccount
    }

    backFindparam (val) {
        console.log('val: ', val.value.id)
        if (val.value) {
            const bankInfo = this.payeeAccountList.filter(item => item.id == val.value.id)[0]
            this.bankForm.payPrincipal = bankInfo.payeeName
            this.bankForm.payeeBankName = bankInfo.payeeBankName
            this.bankForm.payeeBankAccount = bankInfo.payeeBankAccount
            this.targetObj = {
                selectName: bankInfo.payeeBankName + '(' + bankInfo.payeeBankAccount + ')',
                selectCode: bankInfo.payeeBankAccount
            }
        } else {
            this.bankForm.payPrincipal = ''
            this.bankForm.payeeBankName = ''
            this.bankForm.payeeBankAccount = ''
        }
    }

    backPayparam (val) {
        console.log('val: ', val.value.id)
        if (val.value) {
            const bankInfo = this.payeeAccountList.filter(item => item.id == val.value.id)[0]
            this.payForm.payPrincipal = bankInfo.payeeName
            this.payForm.payeeBankName = bankInfo.payeeBankName
            this.payForm.payeeBankAccount = bankInfo.payeeBankAccount
            this.targetObj = {
                selectName: bankInfo.payeeBankName,
                selectCode: bankInfo.payeeBankAccount
            }
        } else {
            this.payForm.payPrincipal = ''
            this.payForm.payeeBankName = ''
            this.payForm.payeeBankAccount = ''
        }
    }

    handlePayRadio (val) {
        const bankInfo = this.payeeAccountList.filter(item => item.id == val)[0]
        this.payForm.payPrincipal = bankInfo.payeeName
        this.payForm.payeeBankName = bankInfo.payeeBankName
        this.payForm.payeeBankAccount = bankInfo.payeeBankAccount

        this.num = 0
    }

    public async mounted () {
        this._queryParams = deepCopy(this.queryParams)
        this.getList()
        await this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: sessionStorage.getItem('authCode')
                ? JSON.parse(sessionStorage.getItem('authCode') || '')
                : ''
        })
    }
    beforeUpdate () {
        newCache('Advancelist')
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>

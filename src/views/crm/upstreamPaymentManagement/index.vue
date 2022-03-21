<template>
    <div class="page-body B2b upstreamPaymentManagement">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
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
                        <el-input type="text" v-model="queryParams.companyName" maxlength="20" placeholder="请输入经销商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游支付方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.supplierPaymentType" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="银行转账" :value="1"></el-option>
                            <el-option label="银行承兑" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游供应商：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.supplierCompanyName" maxlength="20" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.projectName" maxlength="20" placeholder="请输入项目名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">支付状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.paymentStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待支付" :value="1"></el-option>
                            <el-option label="部分支付" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">剩余待支付金额（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.startNoPayAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.endNoPayAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">期望上游支付日期：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">运营确认时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChangePaidTime" :end-change="onEndChangePaidTime" :options="optionsByPaid"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">放款交接状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.loanTransferStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待对接" :value="1"></el-option>
                            <el-option label="已对接" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">付款主体：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.paymentMain" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                    <h-button @click="onExport" v-if="hosAuthCheck(upstreamExport)">导出列表数据</h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span v-if="totalAmount">累计金额：{{totalAmount|moneyFormat}}</span></el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable localName="V3.5.1" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='330' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template #action="slotProps">
                    <h-button table v-if="hosAuthCheck(upstreamPayDetail)" @click="viewDetail(slotProps.data.row.paymentOrderId,slotProps.data.row.status)">查看详情</h-button>
                    <h-button table v-if="slotProps.data.row.showChangeButton" @click="onShowChangeLoanTransferStatus(slotProps.data.row.loanTransferId)">变更交接状态</h-button>
                    <h-button table v-if="hosAuthCheck(prevproof)&&slotProps.data.row.status==2" @click="handleShowProof(slotProps.data.row)">确认首付款到账</h-button>
                    <h-button table v-if="hosAuthCheck(banklink)&&slotProps.data.row.showOnlineBank" @click="handleIsPay(slotProps.data.row)">确认已网银支付</h-button>
                </template>
            </hosJoyTable>
        </div>
        <el-drawer class="editordrawerbox" :title="PAYMENTSTATUS.get(this.loanHandoverInformation.paymentStatus)" :visible.sync="editorDrawer" size='620px' :before-close='editorDrawerClose' :modal-append-to-body="false" :wrapperClosable='false'>
            <div class="drawer-content">
                <!-- 资金部放款操作岗确认后，顶部展示出「上游支付信息」tab页签 -->
                <el-tabs v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane label="放款交接信息" name="loanHandoverInformation">
                        <loanHandoverInformation v-if="editorDrawer" :data='loanHandoverInformation' :status='status' :userInfo='userInfo' @requestAgain='onRequest' @requestBack='getList' :paymentOrderId='paymentOrderId'></loanHandoverInformation>
                    </el-tab-pane>
                    <el-tab-pane label="上游支付信息" name="upstreamPaymentInformation" v-if="isTabs">
                        <upstreamPaymentInformation :data='upstreamPaymentInformation' :userInfo='userInfo' @requestAgain='onRequest'></upstreamPaymentInformation>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- 全部支付完隐藏按钮 -->
            <div class="drawer-content-footer" v-if="activeName == 'upstreamPaymentInformation' && upstreamPaymentInformation.showButton && hosAuthCheck(upstreamPayment)">
                <h-button style="margin-top:20px" type="primary" @click="payInfoApi">立即上游支付</h-button>
            </div>
        </el-drawer>
        <el-dialog v-if="isOpen" :close-on-click-modal='false' title="上游支付" :visible.sync="isOpen" width="850px" :before-close="()=> onCancel()" class="prev-payment-dialog">
            <div class="dialog-ctx">
                <el-form id='elform' :model="dialogFormData" :rules="formRules" label-width="220px" ref="form">
                    <div class="dialog-flex-layout">
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
                            {{ prevPaymentDetail.surplusAmount | moneyFormat }}元
                        </el-form-item>
                        <el-form-item label="上游供应商：">
                            {{ prevPaymentDetail.supplierCompanyName }}
                        </el-form-item>
                        <el-form-item label="上游支付方式：">
                            {{paymentType.get(prevPaymentDetail.supplierPaymentType)}}
                        </el-form-item>
                        <el-form-item label="上游货款方式：">
                            <font style="color:#ff7a45">{{supplierPaymentMethod.get(prevPaymentDetail.supplierPaymentMethod)}}</font>
                        </el-form-item>
                        <el-form-item label="收货进度：">
                            <font style="color:#ff7a45">{{prevPaymentDetail.goodsProgress}}%</font>
                        </el-form-item>
                    </div>

                    <el-form-item label="采购单货款明细：">
                        <elImageAddToken style="width: 100px; height: 100px;margin-right:10px; border:1px solid #dad5d5;    border-radius: 5px;" :fileUrl="pic.fileUrl" :fit="'contain'" v-for="(pic,index) in prevPaymentDetail.poDetail" :key='index'></elImageAddToken>
                    </el-form-item>
                    <el-form-item label="支付单货款明细：">
                        <elImageAddToken style="width: 100px; height: 100px;margin-right:10px; border:1px solid #dad5d5; border-radius: 5px;" :fileUrl="pic.fileUrl" :fit="'contain'" v-for="(pic,index) in prevPaymentDetail.paymentDetail" :key='index'></elImageAddToken>
                    </el-form-item>
                    <el-form-item label="本次支付金额：" prop="payAmount" style="margin-bottom:20px">
                        <el-input placeholder="请输入" v-model="dialogFormData.payAmount" maxlength="50" v-isNum:2 v-inputMAX='prevPaymentDetail.surplusAmount'></el-input>
                    </el-form-item>
                    <el-form-item label="支付日期：" prop="payDate" style="margin-bottom:20px">
                        <el-date-picker v-model="dialogFormData.payDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传上游支付凭证：" prop="payVouchers" style="margin-bottom:20px">
                        <OssFileHosjoyUpload v-model="dialogFormData.payVouchers" :showPreView='true' :fileSize=20 :fileNum=20 :uploadParameters='uploadParameters' @successArg="onBackOcrInfo" accept=".jpg,.png,.pdf">
                            <div class="a-line">
                                <h-button>上传文件</h-button>
                            </div>
                        </OssFileHosjoyUpload>
                        <p class="tips">支持扩展名：jpg.png.pdf...</p>
                    </el-form-item>
                     <el-form-item label="实际收款供应商银行账号：" prop="supplierAccountNo">
                        <el-input v-model="dialogFormData.supplierAccountNo" placeholder="请输入" maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item label="实际收款供应商开户行名称：" prop="supplierAccountName">
                        <el-input v-model="dialogFormData.supplierAccountName" placeholder="请输入" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="实际收款供应商银行联行号：" prop="supplierBankNo">
                        <el-input v-model="dialogFormData.supplierBankNo" placeholder="请输入" maxlength="12"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <h-button @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onEnterPay">确认支付</h-button>
            </div>
        </el-dialog>
        <el-dialog :close-on-click-modal='false' title="变更交接状态" :visible.sync="isOpenChangeStatus" width="850px" class="prev-payment-dialog">
            <el-form ref="statusForm" :model="loanTransferStatusForm" :rules="changeRules" label-width="150px">
                <el-form-item label="变更交接状态到：" prop="changeType" style="margin-bottom:20px">
                    <el-radio-group v-model="loanTransferStatusForm.changeType">
                        <el-radio :label=1>运营部</el-radio>
                        <el-radio :label=2>资金部</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：" prop="remark" style="margin-bottom:20px">
                    <el-input type="textarea" placeholder="请输入内容" v-model="loanTransferStatusForm.remark" maxlength="200" :autosize="{ minRows:5, maxRows: 6}" show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <h-button @click="isOpenChangeStatus = false">取消</h-button>
                <h-button type="primary" @click="onChangeLoanTransferStatus">确定</h-button>
            </div>
        </el-dialog>
        <!-- 首付款确认 -->
        <FundsDialog :is-open="isProofDialog" :detail="fundsDialogDetail" :status="'1'" @onClose="getList"></FundsDialog>
        <!-- 确认网银支付 -->
        <el-dialog :close-on-click-modal='false' title="确认网银支付" :visible.sync="isShowLinkBank" width="600px" class="prev-payment-dialog" :before-close="()=> onBankCancel()">
            <el-form :model="bankForm" :rules="bankRules" ref="bankForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="网银支付时间：" prop="paymentTime">
                    <el-date-picker v-model="bankForm.paymentTime" value-format='yyyy-MM-dd' type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="上传上游支付凭证：" prop="attachDocRequestList" style="margin-bottom:20px">
                    <OssFileHosjoyUpload v-model="bankForm.attachDocRequestList" :showPreView='true' :fileSize=20 :fileNum=9 :uploadParameters='uploadParameters' @successCb="$refs.bankForm.clearValidate()" accept=".jpg,.png,.pdf">
                        <div class="a-line">
                            <h-button>上传文件</h-button>
                        </div>
                    </OssFileHosjoyUpload>
                    <p class="tips">支持扩展名：.jpg.png.pdf...</p>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <h-button @click="onBankCancel()">取消</h-button>
                <h-button type="primary" @click="handleSubBank">确定</h-button>
            </div>
        </el-dialog>
        <!-- OCR 信息确认 -->
        <el-dialog title="OCR识别信息确认" :visible.sync="ocrVisible" width="30%" :before-close="()=>{ocrVisible = false}">
            <div class="ocr-wrap">
                <h2>检测到OCR识别的实际收款供应商账号信息与界面信息存在差异</h2>
                <h3>OCR识别到信息：</h3>
                <p>实际收款供应商银行账号：{{ocrData.supplierAccountNo}}</p>
                <p>实际收款供应商开户行名称：{{ocrData.supplierAccountName}}</p>
                <p>实际收款供应商银行联行号：{{ocrData.supplierBankNo}}</p>
                <h3>界面信息：</h3>
                <p>实际收款供应商银行账号：{{dialogFormData.supplierAccountNo}}</p>
                <p>实际收款供应商开户行名称：{{dialogFormData.supplierAccountName}}</p>
                <p>实际收款供应商银行联行号：{{dialogFormData.supplierBankNo}}</p>
                <strong>确定以OCR识别信息为准，覆盖现有界面信息？</strong>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=>{ocrVisible = false}">不覆盖</el-button>
                <el-button type="primary" @click="onSaveCover">确定覆盖</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='tsx'>
import moment from 'moment'
import { CreateElement } from 'vue'
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import elImageAddToken from '@/components/elImageAddToken/index.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import loanHandoverInformation from './drawerTabs/loanHandoverInformation.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import upstreamPaymentInformation from './drawerTabs/upstreamPaymentInformation.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { measure, handleSubmit, validateForm } from '@/decorator/index'
import * as Api from './api/index'
import { ReqSupplierSubmit, ReqUpStreamPaymentQuery, RespLoanHandoverInfo, RespSupplier, RespSupplierInfo, RespUpStreamPayment, ReqLoanTransferChange, LoanTransferInfoResponse, SupplierOnlineBankTransferConfirmRequest } from '@/interface/hbp-project'
import filters from '@/utils/filters'
import { UPSTREAM_PAY_DETAIL, UPSTREAM_PAY_MENT, CHANGE_LOAN_TRANSFER_STATUS, UPSTREAM_PAY_EXPORT, PREV_PROOF, UPSTREAM_PAY_BANKLINK } from '@/utils/auth_const'
import { LOAN_TRANSFER_STATUS_DONE, UPSTREAM_PAYMENT_STATUS_WAITING } from './const'
import FundsDialog from '../funds/components/fundsDialog.vue'
import { newCache } from '@/utils/index'
import OssFileUtils from '@/utils/OssFileUtils'
import { bankOcrReceipt } from '../advancePayment/api'
export const PAYMENTTYPE: Map<number | null, string> = new Map([
    [null, '-'],
    [1, '银行转账'],
    [2, '银行承兑']
])
export const SUPPLIERPAYMENTMETHOD: Map<number | null, string> = new Map([
    [null, '-'],
    [1, '先款后货'],
    [2, '先货后款']
])

interface Query extends ReqUpStreamPaymentQuery{
    [key:string]:any
}

/** tab 切对应的Api请求 */
enum TabInfoApi {
    /** 获取放款交接信息API */
    loanHandoverInformation = 'getLoanHandoverInfoApi',
    /** 上游支付查询信息API */
    upstreamPaymentInformation = 'getPayConfirmApi'
}

@Component({
    name: 'UpstreamPaymentManagement',
    components: {
        hosJoyTable,
        loanHandoverInformation,
        upstreamPaymentInformation,
        OssFileHosjoyUpload,
        elImageAddToken,
        FundsDialog
    }
})
export default class UpstreamPaymentManagement extends Vue {
    upstreamPayDetail = UPSTREAM_PAY_DETAIL
    upstreamPayment = UPSTREAM_PAY_MENT
    upstreamExport = UPSTREAM_PAY_EXPORT
    prevproof = PREV_PROOF
    banklink = UPSTREAM_PAY_BANKLINK
    $refs!: {
        form: HTMLFormElement
    }
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    ocrVisible:boolean = false
    ocrData:any = {}
    paymentType = PAYMENTTYPE
    supplierPaymentMethod = SUPPLIERPAYMENTMETHOD
    tableData:RespUpStreamPayment[] = []
    editorDrawer:boolean = false
    isOpen:boolean = false
    isOpenChangeStatus: boolean = false
    isTabs:boolean = false
    isShowLinkBank:boolean = false
    paymentOrderId:string = ''
    private _queryParams = {}
    isProofDialog:boolean = false
    maxTime:string = ''
    queryParams: Query = {
        pageNumber: 1,
        pageSize: 10,
        paymentMain: '', // 付款主体
        paymentOrderNo: '',
        deptName: '',
        companyName: '',
        supplierPaymentType: '',
        supplierCompanyName: '',
        projectName: '',
        paymentStatus: '',
        startNoPayAmount: '',
        endNoPayAmount: '',
        startInitiateTime: '',
        endInitiateTime: '',
        startExpectSupplierPaymentDate: '',
        endExpectSupplierPaymentDate: '',
        authCode: '',
        jobNumber: '',
        subsectionCode: '',
        loanTransferStatus: '',
        'sort.property': null,
        'sort.direction': null
    }
    private _dialogFormData = {}
    dialogFormData:ReqSupplierSubmit={
        id: '',
        poId: '',
        paymentOrderId: '',
        payAmount: '',
        payDate: moment().format('YYYY-MM-DD'),
        payVouchers: []
    }
    loanTransferStatusForm: ReqLoanTransferChange = {
        loanTransferId: '',
        changeType: '',
        remark: '',
        updateBy: ''
    }
    bankForm:any={
        paymentOrderId: '',
        paymentTime: '',
        attachDocRequestList: [],
        supplierAccountName: '',
        supplierAccountNo: '',
        supplierBankNo: ''

    }
    num:number = 0
    totalAmount:number = 0
    status:number = null
    activeName:string = 'loanHandoverInformation'
    loanHandoverInformation:LoanTransferInfoResponse = '' as unknown as LoanTransferInfoResponse
    upstreamPaymentInformation:RespSupplier = '' as unknown as RespSupplier
    prevPaymentDetail:RespSupplierInfo = '' as unknown as RespSupplierInfo
    fundsDialogDetail:Record<string, any> ={}
    PAYMENTSTATUS: Map<number | null, string> = new Map([
        [null, '-'],
        [1, '待支付'],
        [2, '部分支付']
    ])
    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function

    get formRules () {
        let rules = {
            payAmount: [
                {
                    required: true,
                    validator: (rule, value, callback) => {
                        // HAM-25441 BOSS-本次支付金额不能输入0元，但是能输入0.0和0.00元
                        if (value && value == 0) {
                            return callback(new Error('本次支付金额不能为 0'))
                        }
                        if (!value) {
                            return callback(new Error('本次支付金额不能为空'))
                        }
                        return callback()
                    },
                    trigger: 'blur'
                }
            ],
            payDate: [
                { required: true, message: '请选择支付日期' }
            ],
            payVouchers: [
                { required: true, message: '请上传上游支付凭证' }
            ],
            supplierAccountName: [
                { required: true, message: '供应商开户行名称不能为空' }
            ],
            supplierAccountNo: [
                { required: true, message: '供应商银行账号不能为空' }
            ],
            supplierBankNo: [
                { required: true, message: '供应商银行联行号不能为空' }
            ]
        }
        return rules
    }

    get bankRules () {
        return {
            paymentTime: [{ required: true, message: '请选择网银支付时间', trigger: 'change' }],
            attachDocRequestList: [{ required: true, message: '请上传上游支付凭证', trigger: 'change' }]
        }
    }

    get changeRules () {
        let rules = {
            changeType: [
                { required: true, message: '请选择变更交接状态', trigger: 'change' }
            ],
            remark: [
                { required: true, message: '请输入备注', trigger: 'blur' }
            ]
        }
        return rules
    }

    get options () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.startExpectSupplierPaymentDate,
            endTime: this.queryParams.endExpectSupplierPaymentDate
        }
    }

    get optionsByPaid () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.startInitiateTime,
            endTime: this.queryParams.endInitiateTime
        }
    }
    get pickerOptions () {
        return {
            disabledDate (time) {
                // @ts-ignore
                return Date.now() < time.getTime()// 如果当天可选，就不用减8.64e7
            }
        }
    }

    isShowTabs () {
        let temp:boolean | undefined = false
        if (this.loanHandoverInformation.loanTransferStatus == 2) {
            temp = true
        } else {
            temp = false
        }
        this.isTabs = temp
    }

    tableLabel:tableLabelProps = [
        { label: '支付单编号', prop: 'paymentOrderNo', width: '100' },
        { label: '所属分部', prop: 'deptName', width: '130' },
        { label: '经销商', prop: 'companyName', width: '150', resizable: true },
        { label: '上游供应商', prop: 'supplierCompanyName', width: '180' },
        { label: '项目名称', prop: 'projectName', minWidth: '300' },
        { label: '采购单金额', prop: 'poAmount', width: '160', displayAs: 'money' },
        {
            label: '放款交接状态',
            width: '160',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => this.onRenderLoanTransferStatus(h, scope)
        },
        {
            label: '支付状态/支付次数',
            width: '150',
            render: (h: CreateElement, scope:TableRenderParam): JSX.Element => this.onRenderPaymentLabel(h, scope)
        },
        {
            label: '已支付金额/应支付总额（元）',
            width: '210',
            render: (h: CreateElement, scope:TableRenderParam): JSX.Element => this.onRenderPaidAmountLabel(h, scope)
        },
        { label: '剩余应支付金额（元）', prop: 'noPayAmount', width: '150', displayAs: 'money' },
        { label: '运营确认时间', prop: 'initiateTime', width: '160', sortable: 'custom', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '期望上游支付日期', prop: 'expectSupplierPaymentDate', width: '160', displayAs: 'YYYY-MM-DD' },
        { label: '付款主体', prop: 'paymentMain', width: '160' },
        { label: '上游支付方式', prop: 'supplierPaymentType', width: '150', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] }

    ]

    onRenderPaymentLabel (h:CreateElement, scope:TableRenderParam): JSX.Element {
        return <span> {this.PAYMENTSTATUS.get(scope.row.paymentStatus)}/{scope.row.paymentNumber}</span>
    }

    onRenderPaidAmountLabel (h:CreateElement, scope:TableRenderParam): JSX.Element {
        return <span>{filters.money(scope.row.paidAmount, 2)}/{filters.money(scope.row.totalAmount, 2)}</span>
    }

    onRenderLoanTransferStatus (h:CreateElement, scope:TableRenderParam): JSX.Element {
        return (
            <div>
                { scope.row.loanTransferStatus == 1 ? '待对接' : scope.row.loanTransferStatus == 2 ? '已对接' : '-' }
                { scope.row.loanTransferStatus == 2 && <p>({ filters.momentFormat(scope.row.loanTransferDate, 'YYYY-MM-DD') })</p> }
            </div>
        )
    }

    async viewDetail (paymentOrderId, status) {
        // 初始化数据
        this.activeName = 'loanHandoverInformation'
        if (this.loanHandoverInformation) {
            this.loanHandoverInformation = '' as unknown as LoanTransferInfoResponse
        }
        if (this.upstreamPaymentInformation) {
            this.upstreamPaymentInformation = '' as unknown as RespSupplier
        }
        this.paymentOrderId = paymentOrderId
        const { data } = await Api.getLoanHandoverInfoApi(paymentOrderId)
        this.loanHandoverInformation = data
        this.status = status
        console.log(' 🚗 🚕 🚙 🚌 🚎 userInfo', this.userInfo)
        this.editorDrawer = true
        this.isShowTabs()
    }

    handleShowProof (row) {
        this.isProofDialog = true
        this.fundsDialogDetail = {
            orderId: row.paymentOrderId,
            id: row.downPaymentFundId,
            _prev: true
        }
    }

    handleIsPay (val) {
        this.isShowLinkBank = true
        this.maxTime = val.loanTransferDate
        this.bankForm.paymentOrderId = val.paymentOrderId
        this.bankForm.paymentTime = moment(new Date()).format('YYYY-MM-DD')
    }

    onBankCancel () {
        this.isShowLinkBank = false
        this.bankForm.attachDocRequestList = []
        this.$nextTick(() => {
            this.$refs['bankForm'].clearValidate()
        })
    }

    handleSubBank () {
        (this.$refs as any).bankForm.validate(async (validate) => {
            if (validate) {
                await Api.updateOnlineBank(this.bankForm)
                this.isShowLinkBank = false
                this.getList()
            }
        })
    }

    onStartChange (val): void {
        this.queryParams.startExpectSupplierPaymentDate = val
    }
    onEndChange (val): void {
        this.queryParams.endExpectSupplierPaymentDate = val
    }
    onStartChangePaidTime (val) {
        this.queryParams.startInitiateTime = val
    }
    onEndChangePaidTime (val) {
        this.queryParams.endInitiateTime = val
    }
    handleTabClick (tab, event): void {
        this.onRequest()
    }

    @validateForm('form')
    @handleSubmit()
    async onEnterPay () {
        this.dialogFormData = {
            ...this.dialogFormData,
            paymentOrderId: this.paymentOrderId,
            poId: this.prevPaymentDetail.purchaseOrderId
        }
        await Api.onSubmitPayments(this.dialogFormData)
        this.$message.success('提交成功！')
        await this.onRequest()
        this.onCancel()
        this.getList()
    }

    /** 对应tab切的响应请求 */
    async onRequest () {
        const { data } = await Api[TabInfoApi[this.activeName]](this.paymentOrderId)
        this[this.activeName] = data
        //
        this.isShowTabs()
    }

    @measure
    async getList () {
        const { data: tableData } = await Api.getUpStreamPaymentApi(this.queryParams)
        this.tableData = tableData.records || []
        this.page.total = tableData.total as number
        const { data: totalAmountData } = await Api.getUpStreamPaymentTotalAmountApi(this.queryParams)
        this.totalAmount = totalAmountData
        this.editorDrawer = false
        this.isProofDialog = false
    }

    sortChange (e) {
        if (e.order) {
            this.queryParams['sort.property'] = e.prop + ''
            this.queryParams['sort.direction'] = e.order === 'ascending' ? 'ASC' : 'DESC'
        } else {
            this.queryParams['sort.property'] = null
            this.queryParams['sort.direction'] = null
        }
        this.getList()
    }

    async payInfoApi () {
        const { data } = await Api.getPayInfoApi(this.paymentOrderId)
        this.prevPaymentDetail = data
        this.dialogFormData.payAmount = this.prevPaymentDetail.surplusAmount
        this.dialogFormData = {
            ...this.dialogFormData,
            supplierAccountName: data.supplierAccountName,
            supplierAccountNo: data.supplierAccountNo,
            supplierBankNo: data.supplierBankNo
        }
        this.isOpen = true
        this.num = 0
    }

    editorDrawerClose (done:Function): void {
        this.activeName = 'loanHandoverInformation'
        done()
    }

    async onBackOcrInfo (val) {
        this.num = this.num + 1
        console.log('  this.num: ', this.dialogFormData.payVouchers)
        this.$refs.form.clearValidate()
        if (this.dialogFormData.payVouchers.length == 1) {
            // 第一张图片进行ocr 认证
            let tokenUrl = await OssFileUtils.getUrl(val.fileUrl)
            const { data } = await bankOcrReceipt({ image: tokenUrl })
            console.log('data: ', data)
            if (data.supplierAccountName) {
                if (data.supplierAccountNo !== this.prevPaymentDetail.supplierBankNo || data.supplierBankNo != this.prevPaymentDetail.supplierBankNo || data.supplierAccountName != this.prevPaymentDetail.supplierAccountName) {
                    this.ocrData = data
                    this.ocrData = {
                        ...this.ocrData,
                        supplierBankNo: this.ocrData.supplierBankNo || this.prevPaymentDetail.supplierBankNo
                    }
                    this.ocrVisible = true
                }
            } else {
                this.$message.info('该图片无法进行OCR识别，请重新上传或手动修改供应商信息')
            }
        }
    }

    onSaveCover () {
        this.dialogFormData = {
            ...this.dialogFormData,
            supplierAccountNo: this.ocrData.supplierAccountNo,
            supplierBankNo: this.ocrData.supplierBankNo || this.prevPaymentDetail.supplierBankNo,
            supplierAccountName: this.ocrData.supplierAccountName
        }
        this.ocrVisible = false
    }

    onCancel (): void {
        this.isOpen = false
        this.$refs.form.clearValidate()
        this.clearForm()
    }

    clearForm () {
        this.dialogFormData = JSON.parse(JSON.stringify(this._dialogFormData))
    }

    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(this._queryParams))
        this.getList()
    }

    /**
     * 变更交接状态弹出层展示
     */
    onShowChangeLoanTransferStatus (loanTransferId) {
        let employeeName = JSON.parse(sessionStorage.getItem('userInfo') || '').employeeName
        this.loanTransferStatusForm.loanTransferId = loanTransferId
        this.loanTransferStatusForm.updateBy = employeeName
        this.loanTransferStatusForm.changeType = ''
        this.loanTransferStatusForm.remark = ''
        this.$refs['statusForm'] && this.$refs['statusForm'].clearValidate()
        this.isOpenChangeStatus = true
    }
    /**
     * 变更交接状态操作
     */
    onChangeLoanTransferStatus () {
        (this.$refs as any).statusForm.validate(async (validate) => {
            if (validate) {
                await Api.updateLoanTransferStatus(this.loanTransferStatusForm)
                this.getList()
                this.isOpenChangeStatus = false
                this.$message.success('交接状态变更成功！')
            }
        })
    }

    onExport () {
        if (this.tableData.length <= 0) {
            this.$message.warning('无数据可导出！')
        } else {
            Api.exportUpStreamPaymentApi(this.queryParams, function (response) {
                const reader = new FileReader()
                reader.readAsDataURL(response.data)
                reader.onload = function (e: any) {
                    const a: any = document.createElement('a')
                    a.download = '上游支付管理.xlsx'
                    a.href = e.target.result
                    const body: any = document.querySelector('body')
                    body.appendChild(a)
                    a.click()
                    body.removeChild(a)
                }
            })
        }
    }

    changeLoanTransferStatusAuthCheck (row) {
        // 当放款交接状态为“已对接”且为待支付状态时，展示变更交接状态按钮
        return row.loanTransferStatus == LOAN_TRANSFER_STATUS_DONE && row.paymentStatus == UPSTREAM_PAYMENT_STATUS_WAITING && (this as any).hosAuthCheck(CHANGE_LOAN_TRANSFER_STATUS)
    }

    async mounted () {
        let AUTHCODE = sessionStorage.getItem('authCode') || ''
        this.queryParams.authCode = AUTHCODE ? JSON.parse(AUTHCODE) : ''
        this.queryParams.jobNumber = this.userInfo.jobNumber
        this._queryParams = JSON.parse(JSON.stringify(this.queryParams))
        this._dialogFormData = JSON.parse(JSON.stringify(this.dialogFormData))
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
        newCache('UpstreamPaymentManagement')
    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>

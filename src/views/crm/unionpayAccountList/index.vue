<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">入账流水号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.demo1" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">入账金额：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minPaidAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">万元</template></el-input>
                        -
                        <el-input v-model="queryParams.maxPaidAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">万元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">可认领金额：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minPaidAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">万元</template></el-input>
                        -
                        <el-input v-model="queryParams.maxPaidAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">万元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">付款方：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">收款方主体：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=item.label :value=item.value v-for="(item) in preStatus" :key=item.label></el-option>
                            <!-- <el-option label="部分支付" :value="2"></el-option> -->
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">银企直联银行：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=item.label :value=item.value v-for="(item) in preStatus" :key=item.label></el-option>
                            <!-- <el-option label="部分支付" :value="2"></el-option> -->
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">入账时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartPay" :end-change="onEndPay" :options="payOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">认领状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=item.label :value=item.value v-for="(item) in preStatus" :key=item.label></el-option>
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
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span>已认领金额：{{totalMoney|moneyFormat}}</span>；<span>可认领金额：{{totalMoney|moneyFormat}}</span></el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='300' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="onLook(slotProps.data.row)" v-if="hosAuthCheck(advancelook)">查看详情</h-button>
                    <h-button table @click="onApprovalRecord(slotProps.data.row)" v-if="hosAuthCheck(advancerecords)">认领账单</h-button>
                </template>
            </hosJoyTable>
        </div>
        <el-dialog title="上游预付款支付单详情" :visible.sync="dialogVisible" width="800px" :close-on-click-modal=false :before-close="()=>{dialogVisible = false}">
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
                    <el-col :span="10" :offset='1'>支付方式： {{ detailForm.paymentType&&paymentTypes[detailForm.paymentType-1].label||'-' }}</el-col>
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
                    <el-col :span="10" :offset='1'>供应商银行账号：{{detailForm.supplierAccountNo||'-'}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>期望上游支付日期：{{detailForm.expectSupplierPaymentDate||'-'}}</el-col>
                    <el-col :span="10" :offset='1'>备注：{{detailForm.applyRemark||'-'}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg" v-for="(item,index) in detailForm.prepaymentDetails" :key="item.id+index">
                    <el-col class="pay_vouchers mtNone" :span="20" :offset='1'>附件：
                        <div class="advance_wrap-flex" v-if="item.payVouchers.length>0">
                            <div v-for="(v,index) in item.payVouchers" :key="index">
                                <downloadFileAddToken isPreview isType='preview' :file-url="v.fileUrl" :a-link-words="v.fileName" />
                            </div>
                        </div>
                        <span v-if="item.payVouchers&&item.payVouchers.length==0">
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
                    <el-col :span="10" :offset='1'>项目运营审核人：{{detailForm.approvalUser||'-'}} {{detailForm.applyUserPhone?'('+detailForm.applyUserPhone+')':''}}</el-col>
                    <el-col :span="10" :offset='1'>审核时间：{{detailForm.approvalTime?moment(detailForm.approvalTime).format('yyyy-MM-DD HH:mm:ss'):'-'}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg" v-if="detailForm.approvalUser">
                    <el-col :span="10" :offset='1'>审核结果：{{detailForm.approvalStatus==1?'通过':detailForm.approvalStatus==2?'不通过':'-'}}</el-col>
                    <el-col :span="10" :offset='1'>审核备注：{{detailForm.approvalRemark||'-'}}</el-col>
                </el-row>
                <template v-if="detailForm.prepaymentDetails&&detailForm.prepaymentDetails.length>0">
                    <el-row ype="flex" class="row-bg" v-for="(item,index) in detailForm.prepaymentDetails" :key="item.id+index">
                        <el-col :span="10" :offset='1'>预付款支付凭证提交人：{{item.createBy}}({{item.createPhone||'-'}})</el-col>
                        <el-col :span="10" :offset='1'>上传时间：{{ item.createTime | momentFormat }}</el-col>
                        <el-col class="mt10 pay_vouchers" :span="20" :offset='1'>预付款支付凭证：
                            <div class="advance_wrap-flex" v-if="item.payVouchers.length>0">
                                <div v-for="(v,index) in item.payVouchers" :key="index">
                                    <downloadFileAddToken isPreview isType='preview' :file-url="v.fileUrl" :a-link-words="v.fileName" />
                                </div>
                            </div>
                            <span v-if="item.payVouchers&&item.payVouchers.length==0">
                                -
                            </span>
                        </el-col>
                        <el-col class="mt10" :span="10" :offset='1'>支付成功时间：{{detailForm.approvalTime?moment(detailForm.approvalTime).format('yyyy-MM-DD HH:mm:ss'):'-'}}</el-col>
                    </el-row>
                </template>
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
                    <el-col :span="20" :offset='1' class="credentials">上游支付凭证123123123：
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
import * as Api from './api/index'
import { PrepaymentDetailResponse, PrepaymentSupplierOnlineBankTransferConfirmRequest, PrepaymentSupplierSubmitResponse, RespContractSignHistory, SupplierOnlineBankTransferConfirmRequest } from '@/interface/hbp-project'
import { CRM_ADVACE_UPSTREAMPAY, CRM_ADVACE_APPROVE, CRM_ADVACE_LOOK, CRM_OPREATE_APPROVE, CRM_ADVACE_RECORDS, CRM_UPSTREAM_BANK, CRM_UPLOAD_PREPAY, CRM_ADVACE_WRITEOFF, CRM_SUBMIT_PAY } from '@/utils/auth_const'
import { newCache } from '@/utils/index'
import './css/css.scss'
import { CreateElement } from 'vue'

// 定义类型
interface Query{
    [key:string]:any
}

const paymentTypes = [{ value: 1, label: '货款' }, { value: 2, label: '费用' }]

const preStatus = [{ value: -1, label: '待分财审核' }, { value: 0, label: '预付款待支付' }, { value: 8, label: '预付款支付待确认' }, { value: 1, label: '待项目运营审核' }, { value: 2, label: '流程审批中' }, { value: 3, label: '待支付' }, { value: 4, label: '支付单完成' }, { value: 5, label: '待核销' }, { value: 6, label: '已核销' }, { value: 7, label: '支付单关闭' }]

@Component({
    name: 'UnionpayAccountList',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload,
        ImageAddToken,
        downloadFileAddToken
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
    advancewriteoff = CRM_ADVACE_WRITEOFF
    advancepay = CRM_ADVACE_UPSTREAMPAY
    advanceapprove = CRM_ADVACE_APPROVE // 分财
    operateapprove = CRM_OPREATE_APPROVE // 运营
    advancelook = CRM_ADVACE_LOOK
    advancerecords = CRM_ADVACE_RECORDS
    uploadprepay = CRM_UPLOAD_PREPAY
    banklink = CRM_UPSTREAM_BANK
    submitPay = CRM_SUBMIT_PAY
    private writeOffVisible:boolean = false
    private dialogVisible:boolean = false
    private comfirmVisble:boolean = false
    private examineVisble:boolean = false
    private recordVisible:boolean = false
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
    @State('userInfo') userInfo: any
    queryParams:Query = {
        pageSize: 10,
        pageNumber: 1,
        demo1: '',
        demo2: '',
        demo3: '',
        demo4: '',
        demo5: '',
        demo6: '',
        demo7: '',
        demo8: ''
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
    payForm:PrepaymentSupplierSubmitResponse={
        payVouchers: [],
        prepaymentOrderId: '',
        payAmount: '',
        payDate: ''
    }
    prePayForm:Record<string, any>={
        prepaymentOrderId: '',
        payAmount: '',
        operator: '',
        operatorPhone: '',
        payVouchers: []
    }
    bankForm:PrepaymentSupplierOnlineBankTransferConfirmRequest={
        prepaymentOrderId: '',
        paymentTime: '',
        attachDocRequestList: []
    }
    page = {
        total: 0
    }

    private tableLabel:tableLabelProps = [
        { label: '入账流水号', prop: 'prepaymentNo', width: '160px' },
        { label: '入账金额', prop: 'subsectionName' },
        { label: '已认领金额', prop: 'distributor' },
        { label: '可认领金额', prop: 'projectName', width: '120' },
        { label: '付款方', prop: 'applyAmount', displayAs: 'money', width: '130' },
        { label: '付款方账号', prop: 'paymentType', dicData: paymentTypes },
        { label: '付款银行', prop: 'purchaseOrderNo' },
        { label: '收款方', prop: 'applyUser' },
        { label: '银企直联银行', prop: 'applyTime' },
        { label: '银企直联账户', prop: 'updateTime' },
        { label: '入账时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '认领状态', prop: 'updateTime' }
    ]
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

    public async getList () {
        this.queryParams.jobNumber = this.userInfo.jobNumber as string
        const res:any = await Promise.all([Api.getPreTotal(this.queryParams), Api.getPrePayList(this.queryParams)])
        this.tableData = res[1].data.records
        this.page.total = res[1].data.total as number
        this.totalMoney = res[0].data
    }

    public onReset (): void {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }

    public async mounted () {
        // this._queryParams = deepCopy(this.queryParams)
        // this.getList()
        // await this.findCrmdeplist({
        //     deptType: 'F',
        //     pkDeptDoc: this.userInfo.pkDeptDoc,
        //     jobNumber: this.userInfo.jobNumber,
        //     authCode: sessionStorage.getItem('authCode')
        //         ? JSON.parse(sessionStorage.getItem('authCode') || '')
        //         : ''
        // })
    }
    beforeUpdate () {
        newCache('Advancelist')
    }
}
</script>
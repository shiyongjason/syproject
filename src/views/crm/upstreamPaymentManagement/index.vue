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
                            <el-option label="银行承兑" :value="1"></el-option>
                            <el-option label="银行转账" :value="2"></el-option>
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
                        <el-input type="text" v-model="queryParams.startNoPayAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-model="queryParams.endNoPayAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">期望上游支付日期：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">首付款确认时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChangePaidTime" :end-change="onEndChangePaidTime" :options="optionsByPaid"></HDatePicker>
                    </div>
                </div>

                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span v-if="totalAmount">累计金额：{{totalAmount|fundMoneyHasTail}}</span></el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable localName="V3.3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template #action="slotProps">
                    <h-button table v-if="hosAuthCheck(upstreamPayDetail)"  @click="viewDetail(slotProps.data.row.paymentOrderId)">查看详情</h-button>
                </template>
            </hosJoyTable>

        </div>
        <el-drawer class="editordrawerbox" title="待支付" :visible.sync="editorDrawer" size='620px' :before-close='editorDrawerClose' :modal-append-to-body="false" :wrapperClosable='false'>
            <div class="drawer-content">
                <!-- 资金部放款操作岗确认后，顶部展示出「上游支付信息」tab页签 -->
                 <el-tabs v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane label="放款交接信息" name="loanHandoverInformation">
                        <loanHandoverInformation v-if="editorDrawer" :data='loanHandoverInformation' :userInfo='userInfo' @requestAgain='onRequest' :paymentOrderId='paymentOrderId'></loanHandoverInformation>
                    </el-tab-pane>
                    <el-tab-pane label="上游支付信息" name="upstreamPaymentInformation" v-if="isShowTabs">
                        <upstreamPaymentInformation :data='upstreamPaymentInformation' :userInfo='userInfo' @requestAgain='onRequest'></upstreamPaymentInformation>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- 全部支付完隐藏按钮 -->
            <div class="drawer-content-footer" v-if="activeName == 'upstreamPaymentInformation' && upstreamPaymentInformation.totalAmount != upstreamPaymentInformation.paidAmount && hosAuthCheck(upstreamPayment)">
                <h-button style="margin-top:20px" type="primary" @click="payInfoApi">立即上游支付</h-button>
            </div>
        </el-drawer>
        <el-dialog :close-on-click-modal='false' title="上游支付" :visible.sync="isOpen" width="850px" :before-close="()=> onCancel()" class="prev-payment-dialog" >
            <div class="dialog-ctx">
                <el-form id='elform' :model="dialogFormData" :rules="formRules" label-width="150px" ref="form">
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
                            {{ prevPaymentDetail.surplusAmount | fundMoneyHasTail }}元
                        </el-form-item>
                        <el-form-item label="上游供应商：">
                            {{ prevPaymentDetail.supplierCompanyName }}
                        </el-form-item>
                        <el-form-item label="上游支付形式：">
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
                    <!-- 银行承兑 才展示 支付银行-->
                    <el-form-item label="支付银行：" prop="paymentBank" v-if="prevPaymentDetail.supplierPaymentType == 2" style="margin-bottom:20px">
                        <el-input placeholder="请输入支付银行" v-model="dialogFormData.paymentBank" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="本次支付金额：" prop="payAmount" style="margin-bottom:20px">
                        <el-input placeholder="请输入" v-model="dialogFormData.payAmount" maxlength="50" v-isNum:2 v-inputMAX='prevPaymentDetail.surplusAmount'></el-input>
                    </el-form-item>
                    <el-form-item label="支付日期：" prop="payDate" style="margin-bottom:20px">
                        <el-date-picker v-model="dialogFormData.payDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传上游支付凭证：" prop="payVouchers" style="margin-bottom:20px">
                        <OssFileHosjoyUpload v-model="dialogFormData.payVouchers" :showPreView='true' :fileSize=20 :fileNum=9 :uploadParameters='uploadParameters' @successCb="$refs.form.clearValidate()" accept=".jpg,.png,.pdf">
                            <div class="a-line">
                                <h-button>上传文件</h-button>
                            </div>
                        </OssFileHosjoyUpload>
                        <p class="tips">支持扩展名：jpg.png.pdf...</p>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <h-button @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onEnterPay">确认支付</h-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import elImageAddToken from '@/components/elImageAddToken/index.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import loanHandoverInformation from './drawerTabs/loanHandoverInformation.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import upstreamPaymentInformation from './drawerTabs/upstreamPaymentInformation.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { measure, handleSubmit, validateForm } from '@/decorator/index'
import * as Api from './api/index'
import { ReqSupplierSubmit, ReqUpStreamPaymentQuery, RespLoanHandoverInfo, RespSupplier, RespSupplierInfo, RespUpStreamPayment } from '@/interface/hbp-project'
import filters from '@/utils/filters'
import { UPSTREAM_PAY_DETAIL, UPSTREAM_PAY_MENT } from '@/utils/auth_const'

export const PAYMENTTYPE: Map<number | null, string> = new Map([
    [null, '-'],
    [1, '银行转帐'],
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
/** tab切对应的Api请求 */
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
        elImageAddToken
    }
})
export default class UpstreamPaymentManagement extends Vue {
    upstreamPayDetail = UPSTREAM_PAY_DETAIL
    upstreamPayment = UPSTREAM_PAY_MENT

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
    paymentType=PAYMENTTYPE
    supplierPaymentMethod=SUPPLIERPAYMENTMETHOD
    tableData:RespUpStreamPayment[] | [] = []
    editorDrawer:boolean = false
    isOpen:boolean = false
    isReady:boolean = false
    paymentOrderId:string = ''
    private _queryParams = {}
    queryParams: Query = {
        pageNumber: 1,
        pageSize: 10,
        paymentOrderNo: '',
        deptName: '',
        companyName: '',
        supplierPaymentType: '',
        supplierCompanyName: '',
        projectName: '',
        paymentStatus: '',
        startNoPayAmount: '',
        endNoPayAmount: '',
        startDownPaymentConfirmTime: '',
        endDownPaymentConfirmTime: '',
        startExpectSupplierPaymentDate: '',
        endExpectSupplierPaymentDate: '',
        authCode: '',
        jobNumber: '',
        subsectionCode: '',
        'sort.property': null,
        'sort.direction': null
    }
    private _dialogFormData = {}
    dialogFormData:ReqSupplierSubmit={
        id: '',
        poId: '',
        paymentOrderId: '',
        payAmount: '',
        payDate: '',
        payVouchers: [],
        paymentBank: ''
    }

    totalAmount:number = 0
    activeName:string='loanHandoverInformation'
    loanHandoverInformation:RespLoanHandoverInfo = '' as unknown as RespLoanHandoverInfo
    upstreamPaymentInformation:RespSupplier = '' as unknown as RespSupplier
    prevPaymentDetail:RespSupplierInfo = '' as unknown as RespSupplierInfo

    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function

    get formRules () {
        let rules = {
            payAmount: [
                {
                    required: true,
                    validator: (rule, value, callback) => {
                        if (value == 0) return callback(new Error('本次支付金额不能为 0'))
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
            paymentBank: [
                { required: true, message: '请输入支付银行', trigger: 'blur' }
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
            startTime: this.queryParams.startDownPaymentConfirmTime,
            endTime: this.queryParams.endDownPaymentConfirmTime
        }
    }

    get isShowTabs () {
        let temp:boolean | undefined = false
        // this.loanHandoverInformation初始化为空字符串
        temp = this.loanHandoverInformation?.upPaymentLoanHandoverList?.every(item => {
            return item.status == 1
        })
        console.log('isShowTabs', temp)
        return temp
    }

    tableLabel:tableLabelProps = [
        { label: '支付单编号', prop: 'paymentOrderNo', width: '100' },
        { label: '所属分部', prop: 'deptName', width: '130' },
        { label: '经销商', prop: 'companyName', width: '150', resizable: true },
        { label: '上游供应商', prop: 'supplierCompanyName', width: '180' },
        { label: '项目名称', prop: 'projectName', minWidth: '300' },
        { label: '采购单金额', prop: 'poAmount', width: '160', displayAs: 'money' },
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
        { label: '首付款确认时间', prop: 'downPaymentConfirmTime', width: '160', sortable: 'custom', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '期望上游支付日期', prop: 'expectSupplierPaymentDate', width: '160', displayAs: 'YYYY-MM-DD' },
        { label: '上游支付方式', prop: 'supplierPaymentType', width: '150', dicData: [{ value: 1, label: '银行转帐' }, { value: 2, label: '银行承兑' }] }

    ]

    onRenderPaymentLabel (h:CreateElement, scope:TableRenderParam): JSX.Element {
        const PAYMENTSTATUS: Map<number | null, string> = new Map([
            [null, '-'],
            [1, '待支付'],
            [2, '部分支付']
        ])
        return <span> {PAYMENTSTATUS.get(scope.row.paymentStatus)}/{scope.row.paymentNumber}</span>
    }

    onRenderPaidAmountLabel (h:CreateElement, scope:TableRenderParam): JSX.Element {
        return <span>{scope.row.paidAmount}/{filters.money(scope.row.totalAmount, 2)}</span>
    }

    async viewDetail (paymentOrderId) {
        this.paymentOrderId = paymentOrderId
        const { data } = await Api.getLoanHandoverInfoApi(paymentOrderId)
        console.log('data: ', data)
        this.loanHandoverInformation = data
        this.editorDrawer = true
    }

    onStartChange (val): void {
        this.queryParams.startExpectSupplierPaymentDate = val
    }
    onEndChange (val): void {
        this.queryParams.endExpectSupplierPaymentDate = val
    }
    onStartChangePaidTime (val) {
        this.queryParams.startDownPaymentConfirmTime = val
    }
    onEndChangePaidTime (val) {
        this.queryParams.endDownPaymentConfirmTime = val
    }
    handleTabClick (tab, event): void {
        this.onRequest()
    }

    @validateForm('form')
    @handleSubmit()
    async onEnterPay () {
        //
        this.dialogFormData = {
            ...this.dialogFormData,
            paymentOrderId: this.paymentOrderId,
            poId: this.prevPaymentDetail.purchaseOrderId
        }
        console.log('this.dialogFormData: ', this.dialogFormData)
        await Api.onSubmitPayments(this.dialogFormData)
        this.$message.success('提交成功！')
        await this.onRequest()
        this.onCancel()
    }

    /** 对应tab切的响应请求 */
    async onRequest () {
        const { data } = await Api[TabInfoApi[this.activeName]](this.paymentOrderId)
        this[this.activeName] = data
    }

    @measure
    async getList () {
        const { data } = await Api.getUpStreamPaymentApi(this.queryParams)
        this.tableData = data.records || []
        this.page.total = data.total as number

        const res = await Api.getUpStreamPaymentTotalAmountApi(this.queryParams)
        this.totalAmount = res.data
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
        this.isOpen = true
    }

    editorDrawerClose (done:Function): void {
        this.isReady = false
        this.activeName = 'loanHandoverInformation'
        done()
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
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>

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
                            <el-option :label="item.crmDeptCode" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
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
                <el-tag size="medium" class="tag_top">已筛选 3 项</el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable localName="V3.3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template #action="slotProps">
                    <h-button table @click="viewDetail(slotProps.data.row)">查看详情</h-button>
                </template>
            </hosJoyTable>

        </div>
        <el-drawer class="editordrawerbox" title="待支付" :visible.sync="editorDrawer" size='620px' :before-close='editorDrawerClose' :modal-append-to-body="false" :wrapperClosable='false'>
            <div class="drawer-content">
                 <el-tabs v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane label="放款交接信息" name="loanHandoverInformation">
                        <loanHandoverInformation></loanHandoverInformation>
                    </el-tab-pane>
                    <el-tab-pane label="上游支付信息" name="second">
                        <upstreamPaymentInformation></upstreamPaymentInformation>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="drawer-content-footer">
                <h-button style="margin-top:20px" type="primary" @click="() => this.isOpen = true">立即上游支付</h-button>
            </div>
        </el-drawer>
        <el-dialog :close-on-click-modal='false' title="上游支付" :visible.sync="isOpen" width="800px" :before-close="()=> onCancel()" class="prev-payment-dialog" >
            <div class="dialog-ctx">
                <el-form :model="dialogFormData" :rules="rules" label-width="150px" ref="form">
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
                        {{ prevPaymentDetail.supplierPaymentType }}
                    </el-form-item>
                    <el-form-item label="上游货款方式：">
                        {{ prevPaymentDetail.supplierPaymentMethod }}
                    </el-form-item>
                    <el-form-item label="收货进度：">
                        {{prevPaymentDetail.goodsProgress}}%
                    </el-form-item>
                    <el-form-item label="采购单货款明细：">
                        <!-- srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg','https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'] -->
                       <el-image style="width: 100px; height: 100px;margin-right:10px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :preview-src-list="srcList"></el-image>
                    </el-form-item>
                    <el-form-item label="支付单货款明细：">
                        <!-- srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg','https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'] -->
                       <el-image style="width: 100px; height: 100px;margin-right:10px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :preview-src-list="srcList"></el-image>
                    </el-form-item>
                    <el-form-item label="本次支付金额：" prop="payAmount">
                        <el-input placeholder="请输入" v-model="dialogFormData.payAmount" maxlength="50" v-isNegative:2="dialogFormData.payAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="支付日期：" prop="payDate">
                        <el-date-picker v-model="dialogFormData.payDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传上游支付凭证：" prop="payVouchers">
                        <OssFileHosjoyUpload v-model="dialogFormData.payVouchers" :showPreView='true' :fileSize=20 :fileNum=9 :action='action' :uploadParameters='uploadParameters' @successCb="$refs.form.clearValidate()" accept=".jpg,.png,.pdf">
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
import { contractSigningList } from '../contractSigningManagement/api'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import loanHandoverInformation from './drawerTabs/loanHandoverInformation.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import upstreamPaymentInformation from './drawerTabs/upstreamPaymentInformation.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { measure, handleSubmit } from '@/decorator/index'
import { ccpBaseUrl } from '@/api/config'
import { getUpStreamPaymentApi } from './api/index'
import { ReqUpStreamPaymentQuery } from '@/interface/hbp-project'
import filters from '@/utils/filters'
enum RouteNames {
    Home = 'home',
    List = 'list',
    Detail = 'detail'
}

@Component({
    name: 'UpstreamPaymentManagement',
    components: {
        hosJoyTable,
        loanHandoverInformation,
        upstreamPaymentInformation,
        OssFileHosjoyUpload
    }
})
export default class UpstreamPaymentManagement extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    srcList:string[] = []
     action = ccpBaseUrl + 'common/files/upload-old'
     uploadParameters = {
         updateUid: '',
         reservedName: false
     }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:any[] = []
    editorDrawer:boolean = false
    isOpen:boolean = false
    _queryParams={}
    queryParams:ReqUpStreamPaymentQuery = {
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
    dialogFormData={
        payAmount: '',
        payDate: '',
        payVouchers: []
    }
    rules= {
        payAmount: [
            { required: true, message: '请输入本次支付金额', trigger: 'blur' }
        ],
        payDate: [
            { required: true, message: '请选择支付日期', trigger: 'blur' }
        ],
        payVouchers: [
            { required: true, message: '请上传上游支付凭证' }
        ]
    }
    activeName:string='loanHandoverInformation'
    prevPaymentDetail={}

    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function
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

    tableLabel:tableLabelProps = [
        { label: '支付单编号', prop: 'paymentOrderNo', width: '100' },
        { label: '所属分部', prop: 'deptName', width: '130' },
        { label: '经销商', prop: 'companyName', width: '150', resizable: true },
        { label: '上游供应商', prop: 'supplierCompanyName', width: '180' },
        { label: '项目名称', prop: 'projectName', minWidth: '200' },
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
        return <span>{scope.row.paymentStatus}/{scope.row.paymentNumber}</span>
    }
    onRenderPaidAmountLabel (h:CreateElement, scope:TableRenderParam): JSX.Element {
        return <span>{scope.row.paidAmount}/{filters.money(scope.row.totalAmount, 2)}</span>
    }
    viewDetail (id) {
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
        console.log('tab: ', tab)
    }

    @handleSubmit()
    onEnterPay () {
        console.log('onEnterPay')
    }

    @measure
    @handleSubmit()
    async getList (): Promise<void> {
        const { data } = await getUpStreamPaymentApi(this.queryParams)
        // this.tableData = data.records!
        this.tableData = data.records || []
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

    editorDrawerClose (done:Function): void {
        // if
        done()
    }
    onCancel (): void {
        this.isOpen = false
        this.$refs.form.clearValidate()
        this.clearForm()
    }
    clearForm () {
        this.dialogFormData = {
            payAmount: '',
            payDate: '',
            payVouchers: []
        }
    }
    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(this._queryParams))
        this.getList()
    }

    async mounted () {
        this._queryParams = JSON.parse(JSON.stringify(this.queryParams))
        let AUTHCODE = sessionStorage.getItem('authCode') || ''
        this.queryParams.authCode = AUTHCODE ? JSON.parse(AUTHCODE) : ''
        this.queryParams.jobNumber = this.userInfo.jobNumber

        console.log(' RouteNames.List', { name: RouteNames.List })
        this.getList()
        // data.records!.forEach(item => {
        //     console.log('item', item)
        // })
        // this.searchList(this.page)
        // console.log(this.userInfo)
        // await this.findCrmdeplist({
        //     deptType: 'F',
        //     pkDeptDoc: this.userInfo.pkDeptDoc,
        //     jobNumber: this.userInfo.jobNumber,
        //     authCode: sessionStorage.getItem('authCode')
        //         ? JSON.parse(sessionStorage.getItem('authCode') || '')
        //         : ''
        // })
    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>

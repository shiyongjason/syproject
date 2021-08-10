<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">预付款支付单编号：</div>
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
                            <el-option label="待支付" :value="1"></el-option>
                            <el-option label="部分支付" :value="2"></el-option>
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
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span>累计金额：{{'10000'|fundMoneyHasTail}}</span></el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="onApproval(slotProps.data.row)">审核</h-button>
                    <h-button table @click="onLook(slotProps.data.row)">查看详情</h-button>
                    <h-button table @click="onApprovalRecord(slotProps.data.row)">审批记录</h-button>
                </template>
            </hosJoyTable>
        </div>
        <el-dialog title="预付款支付单详情" :visible.sync="dialogVisible" width="40%" :before-close="()=>{dialogVisible = false}">
            <div class="advance_wrap">
                <h3>项目信息</h3>
                <el-row type="flex" class="row-bg">
                    <el-col :span="7" :offset='1'>项目：{{detailForm.projectName}}</el-col>
                    <el-col :span="7" :offset='1'>经销商：{{detailForm.distributor}}</el-col>
                    <el-col :span="7" :offset='1'>所属分部：{{detailForm.subsectionName}}</el-col>
                </el-row>
                <h3>上游支付信息</h3>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>申请金额(元)：{{detailForm.applyAmount | fundMoneyHasTail}}</el-col>
                    <el-col :span="10" :offset='1'>上游支付方式：{{supplierPaymentType.get(detailForm.supplierPaymentType)}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>上游供应商：{{detailForm.supplierCompanyName}}</el-col>
                    <el-col :span="10" :offset='1'>供应商开户行名称：{{detailForm.supplierAccountName}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>银行联行号：{{detailForm.supplierBankNo}}</el-col>
                    <el-col :span="10" :offset='1'>供应商银行账号：{{detailForm.supplierAccountNo}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>期望上游支付日期：{{detailForm.expectSupplierPaymentDate}}</el-col>
                    <el-col :span="10" :offset='1'>备注：{{detailForm.approvalRemark}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>申请时间：{{detailForm.applyTime}}</el-col>
                    <el-col :span="10" :offset='1'>申请人：{{detailForm.applyTime}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>审核人：{{detailForm.approvalUser}}</el-col>
                    <el-col :span="10" :offset='1'>申请时间：{{detailForm.approvalTime}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>申核结果：{{detailForm.approvalStatus==1?'通过':detailForm.approvalStatus==2?'不通过':'-'}}</el-col>
                    <el-col :span="10" :offset='1'>申核备注：{{detailForm.approvalRemark}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>应向上游支付(元)：{{detailForm.totalAmount|fundMoneyHasTail}}</el-col>
                    <el-col :span="10" :offset='1'>已向上游支付(员)：{{detailForm.paidAmount|fundMoneyHasTail}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg" v-for="(item,index) in detailForm.supplierDetails" :key="index">
                    <el-col :span="10" :offset='1'>本次上游支付(元){{item.payAmount|fundMoneyHasTail}}</el-col>
                    <el-col :span="10" :offset='1'>支付日期：{{item.payDate}}</el-col>
                    <el-col :span="10" :offset='1'>操作人：{{item.createBy}}</el-col>
                    <el-col :span="10" :offset='1'>操作时间：{{item.createTime}}</el-col>
                    <el-col :span="10" :offset='1'>上游支付凭证：
                        <div class="advance_wrap-pic" v-for="(v,index) in item.payVouchers" :key="index">
                             <ImageAddToken :fileUrl="v.fileUrl" alt="" />
                        </div>
                    </el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="24" :offset='20'>
                        <el-button type="primary" @click="onConfirmUpper">确认上游支付</el-button>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 审核 -->
        <el-dialog title="预付款支付单审核" :visible.sync="examineVisble" width="40%" :before-close="()=>{examineVisble = false}">
            <div class="advance_examine">
                <div class="advance_examine-left">
                    <h3>项目信息</h3>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="23" :offset='1'>项目：{{detailForm.projectName}}</el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="23" :offset='1'>经销商：{{detailForm.distributor}}</el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="23" :offset='1'>所属分部：{{detailForm.subsectionName}}</el-col>
                    </el-row>
                    <h3>上游支付信息</h3>
                    <el-row>
                        <el-col class="col-padding" :span="23" :offset='1'>申请金额(元)：{{detailForm.applyAmount|fundMoneyHasTail}}</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>上游支付方式：{{supplierPaymentType.get(detailForm.supplierPaymentType)}}</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>上游供应商：{{detailForm.supplierCompanyName}}</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>供应商开户行名称：{{detailForm.supplierAccountName}}</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>供应商银行账号：{{detailForm.supplierAccountNo}}</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>期望上游支付日期：{{detailForm.expectSupplierPaymentDate}}</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>备注信息：{{detailForm.applyRemark}}</el-col>
                    </el-row>
                </div>
                <div class="advance_examine-right">
                    <h3>审核信息</h3>
                    <el-form :model="auditForm" :rules="auditRules" ref="auditForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="审核结果：" prop="resource">
                            <el-radio-group v-model="auditForm.resource">
                                <el-radio label="通过"></el-radio>
                                <el-radio label="不通过"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="审核备注：" prop="remark">
                            <el-input type="textarea" v-model="auditForm.remark" maxlength="200"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <p style="color: #999;">审核通过后，将会发送钉钉预付款支付审批流程</p>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="examineVisble = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确认审核</el-button>
            </span>
        </el-dialog>

        <!-- 确认上游支付 -->
        <el-dialog title="预付款上游支付" :visible.sync="comfirmVisble" width="40%" :before-close="()=>{comfirmVisble = false}">
            <el-form :model="payForm" :rules="detailRules" ref="payForm" label-width="150px" class="demo-ruleForm">
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>经销商：{{detailForm.distributor}}</el-col>
                    <el-col :span="10" :offset='1'>项目：{{detailForm.projectName}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>分部：{{detailForm.subsectionName}}</el-col>
                    <el-col :span="10" :offset='1'>上游：{{detailForm.supplierCompanyName}}</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>上游支付方式：{{supplierPaymentType.get(detailForm.supplierPaymentType)}}</el-col>
                    <el-col :span="10" :offset='1'>剩余应上游支付(元)：{{detailForm.surplusAmount|fundMoneyHasTail}}</el-col>
                </el-row>
                <el-form-item style="margin-top:20px" label="本次支付金额" prop="payAmount">
                    <el-input v-model.trim="payForm.payAmount" maxlength="50" v-isNegative:2="payForm.payAmount"></el-input>
                </el-form-item>
                <el-form-item label="支付日期：" prop="payDate">
                    <el-date-picker v-model="payForm.payDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上传上游支付凭证：" prop="payVouchers" style="margin:20px 0">
                    <OssFileHosjoyUpload v-model="payForm.payVouchers" :showPreView='true' :fileSize=20 :fileNum=9 :uploadParameters='uploadParameters' @successCb="$refs.payForm.clearValidate('payVouchers')" accept=".jpg,.png,.pdf">
                        <div class="a-line">
                            <h-button>上传文件</h-button>
                        </div>
                    </OssFileHosjoyUpload>
                    <p class="tips">支持扩展名：jpg.png.pdf...</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="comfirmVisble = false">取 消</el-button>
                <el-button @click="onSubmitPay">确认支付</el-button>
            </span>
        </el-dialog>
        <!-- 记录 -->
         <el-dialog title="审批记录" :visible.sync="recordVisible" width="40%" :before-close="()=>{recordVisible = false}">
            <div class="advance_wrap">
            </div>
         </el-dialog>
    </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { CreateElement } from 'vue'
import { Action, Getter, State } from 'vuex-class'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import ImageAddToken from '@/components/imageAddToken/index.vue'
import { deepCopy } from '@/utils/utils'
import './css/css.scss'
import { getPrePayList, getPrePayDetail, submitPrePay, getPreTotal } from './api/index'
import { IPagePrepaymentResponse, PrepaymentDetailResponse, PrepaymentSupplierSubmitResponse } from '@/interface/hbp-project'
// 定义类型
interface Query{
    [key:string]:any
}

const preStatus = [{ value: 1, label: '待项目运营审核' }, { value: 2, label: '流程审批中' }, { value: 3, label: '预付款待支付' }, { value: 4, label: '预付款支付单完成' }, { value: 5, label: '预付款待核销' }, { value: 6, label: '预付款已核销' }, { value: 7, label: '预付款支付单关闭' }]

@Component({
    name: 'Advancelist',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload,
        ImageAddToken
    }
})
export default class Advancelist extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
     supplierPaymentType : Map<number | null, string> = new Map([
         [null, '-'],
         [1, '先款后货'],
         [2, '先货后款']
     ])
    private dialogVisible:boolean = false
    private comfirmVisble:boolean = false
    private examineVisble:boolean = false
    private recordVisible:boolean = false
    private _queryParams:Query = {}
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
        applyTimeEnd: ''
    }
    detailForm:PrepaymentDetailResponse = {} as PrepaymentDetailResponse
    auditForm:object = {
    }
    payForm:PrepaymentSupplierSubmitResponse={
        payVouchers: [],
        prepaymentOrderId: '',
        payAmount: '',
        payDate: ''
    }

    page = {
        total: 0
    }
    private tableLabel:tableLabelProps = [
        { label: '预付款支付单编号', prop: 'prepaymentNo' },
        { label: '所属分部', prop: 'subsectionName' },
        { label: '经销商', prop: 'distributor' },
        { label: '项目名称', prop: 'projectName', width: '120' },
        { label: '金额', prop: 'applyAmount', displayAs: 'money' },
        { label: '状态', prop: 'status', dicData: preStatus },
        { label: '核销采购单编号', prop: 'purchaseOrderId' },
        { label: '申请人', prop: 'applyUser' },
        { label: '申请时间', prop: 'applyTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' }

    ]
    private tableData = []
    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function
    get options () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.applyTimeStart,
            endTime: this.queryParams.applyTimeEnd
        }
    }
    // validator: (rule, value, callback) => {
    auditRules = {
        desc: [
            { required: true, message: '上传上游支付凭证', trigger: 'blur' }
        ]
    }
    detailRules = {
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
                    if (!value.length) {
                        return callback(new Error('上游支付金额不能为空'))
                    } else if (value.length && value == 0) {
                        return callback(new Error('上游支付金额必须大于0'))
                    } else if (value > this.detailForm.surplusAmount) {
                        return callback(new Error('上游支付金额必须小于等于剩余应上游支付'))
                    }
                    return callback()
                },
                trigger: 'blur'
            }
        ]
    }
    public onStartChange (val): void {
        this.queryParams.applyTimeStart = val
    }
    public onEndChange (val): void {
        this.queryParams.applyTimeEnd = val
    }

    public async getList () {
        const res = Promise.all([getPreTotal(this.queryParams), getPrePayList(this.queryParams)])
        console.log(res)
        // this.tableData = data.records
        // this.page.total = data.total as number
    }

    // 审核
    public onApproval () {
        this.examineVisble = true
    }

    //
    public onSubmitPay () {
        this.payForm.prepaymentOrderId = this.detailForm.id
        this.$refs['payForm'].validate(async value => {
            if (value) {
                await submitPrePay(this.payForm)
                this.$message.success('提交成功')
                this.getList()
                this.dialogVisible = false
            }
        })
    }

    public async onLook (v) {
        this.dialogVisible = true
        const { data } = await getPrePayDetail(v.id)
        this.detailForm = { ...this.detailForm, ...data }
    }

    public async onApprovalRecord (v) {
        const { data } = await xxxx()
    }

    public onReset (): void {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }

    public onConfirmUpper (): void {
        // 上游支付
        this.comfirmVisble = true
        this.$nextTick(() => {
            this.$refs['payForm'].clearValidate()
        })
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
}
</script>

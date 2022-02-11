<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">申请单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
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
                        <el-input type="text" v-model="queryParams.companyName" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">发票号码：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.companyName" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.companyName" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态码：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.supplierPaymentType" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="银行转账" :value="1"></el-option>
                            <el-option label="银行承兑" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">寄送快递单号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.supplierCompanyName" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">发票金额（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.startNoPayAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.endNoPayAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请人：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.supplierCompanyName" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>

                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button>重置</h-button>
                    <h-button type="primary" @click="handleEdit">申请</h-button>
                </div>
            </div>
            <!-- end search bar -->
             <div class="query-cont__row mb20">
                <el-tag size="medium" class="tag_top">已筛选 {{111}} 项 <span >累计金额：{{111|moneyFormat}}</span></el-tag>
            </div>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='330' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="handleLook(slotProps.data.row.paymentOrderId,slotProps.data.row.status)">查看</h-button>
                    <h-button table @click="handleEdit(slotProps.data.row.loanTransferId)">编辑</h-button>
                    <h-button table @click="handleSubmit(slotProps.data.row)">提交</h-button>
                    <h-button table @click="handleReject(slotProps.data.row)">驳回</h-button>
                    <h-button table @click="handleInvoice(slotProps.data.row)">开票</h-button>
                </template>
            </hosJoyTable>
            <el-dialog :close-on-click-modal='false' title="开票" :visible.sync="isShowInvoice" width="600px" class="prev-payment-dialog" :before-close="handleCancel">
                <el-form :model="IForm" :rules="IRules" ref="IForm" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="发票号码：" prop="paymentTime">
                        <el-input v-model="IForm.paymentTime"></el-input>
                    </el-form-item>
                    <el-form-item label="快递公司：" prop="attachDocRequestList">
                        <el-select v-model="IForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="快递单号：" prop="paymentTime">
                        <el-input v-model="IForm.paymentTime"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <h-button type="primary" @click="handleSure">确定</h-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script lang='tsx'>
import moment from 'moment'
import { CreateElement } from 'vue'
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { measure, handleSubmit, validateForm } from '@/decorator/index'
import { ReqUpStreamPaymentQuery, RespUpStreamPayment } from '@/interface/hbp-project'
import filters from '@/utils/filters'
import { newCache } from '@/utils/index'

// 接口 实现继承
interface Query extends ReqUpStreamPaymentQuery{
    [key:string]:any
}

@Component({
    name: 'serviceinvoice',
    components: {
        hosJoyTable
    }
})
export default class UpstreamPaymentManagement extends Vue {
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
    tableData:RespUpStreamPayment[] = []
    private isShowInvoice:boolean = false
    private _queryParams = {}
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
    IForm:Record<any, any>={

    }

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

    get IRules () {
        return {
            paymentTime: [{ required: true, message: '请输入发票号码', trigger: 'bulr' }],
            attachDocRequestList: [{ required: true, message: '请上传上游支付凭证', trigger: 'change' }]
        }
    }

    tableLabel:tableLabelProps = [
        { label: '状态码', prop: 'paymentOrderNo', width: '100' },
        { label: '申请单号', prop: 'deptName', width: '130' },
        { label: '项目编号', prop: 'poAmount', width: '160', displayAs: 'money' },
        { label: '项目名称', prop: 'poAmount', width: '160', displayAs: 'money' },
        { label: '所属分部', prop: 'poAmount', width: '160', displayAs: 'money' },
        { label: '经销商', prop: 'poAmount', width: '160', displayAs: 'money' },
        { label: '申请人', prop: 'poAmount', width: '160', displayAs: 'money' },
        { label: '申请时间', prop: 'poAmount', width: '160', displayAs: 'money' },
        { label: '发票金额', prop: 'poAmount', width: '160', displayAs: 'money' },
        { label: '发票号码', prop: 'poAmount', width: '160', displayAs: 'money' },
        { label: '寄送快递单号', prop: 'poAmount', width: '160', displayAs: 'money' }
    ]

    async handleLook (paymentOrderId, status) {
        // 查看
        this.$router.push({ path: '/goodwork/manageInvoices/servicedetail' })
    }

    handleEdit (row) {
        // 编辑 or 申请
        if (row) {
            this.$router.push({ path: '/goodwork/manageInvoices/serviceedit' })
        } else {
            this.$router.push({ path: '/goodwork/manageInvoices/serviceedit' })
        }
    }

    @handleSubmit()
    handleSubmit (val) {
        // 提交
        this.$confirm('确认无误，提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!'
            })
        }).catch(() => {

        })
    }

    handleReject (val) {
        // 驳回
        this.$prompt('请输入驳回原因', '驳回', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            inputType: 'textarea',
            // inputPlaceholder: '驳回原因',
            inputValidator: (value) => {
                if (!value) {
                    return false
                } else if (value.length > 80) {
                    return false
                }
            },
            inputErrorMessage: '驳回原因必填且长度不能超过80'
            // @ts-ignore
        }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的邮箱是: ' + value
            })
        }).catch(() => {

        })
    }

    handleInvoice (val) {
        // 开票
        this.isShowInvoice = true
    }
    handleCancel () {
        this.isShowInvoice = false
    }
    handleSure () {
        // 确定
        this.$refs['IForm'].validate(valid => {
            if (valid) {

            }
        })
    }

    @measure
    async getList () {

    }

    public onStartChange (val): void {
        this.queryParams.applyTimeStart = val
    }
    public onEndChange (val): void {
        this.queryParams.applyTimeEnd = val
    }

    async mounted () {
        this.tableData = [{ paymentOrderNo: '123132' }]
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
// @import "./css.scss";
</style>

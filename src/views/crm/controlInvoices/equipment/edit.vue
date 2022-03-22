<template>
    <div class="page-body B2b" style="minWidth:1300px">
        <div class="page-body-cont">
            <div class="floor-tit">基本信息</div>
            <div class="query-cont-row">
                <el-form :model="equipmentForm" :inline="true" :rules="rules" ref="equipmentForm" label-width="180px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="申请单号：" prop="invoiceNo" v-if="equipmentForm.invoiceNo">
                                <el-input v-model.trim="equipmentForm.invoiceNo" disabled style="width:155px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="支付单号：" prop="paymentOrderNo">
                                <el-input v-model.trim="equipmentForm.paymentOrderNo" @blur="onInputBlur" maxlength="50" style="width:210px">
                                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8"></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="项目：" style="display:flex">
                                {{equipmentForm.projectName||"-"}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="经销商：" style="display:flex">
                                {{equipmentForm.companyName||"-"}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="上游供应商：" style="display:flex">
                                <div>{{equipmentForm.supplierCompanyName||"-"}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="所属分部：">
                                {{equipmentForm.deptName||"-"}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="支付单采购金额(折让后)：">
                                {{equipmentForm.paymentOrderPurchaseAmount|moneyFormat}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="支付单销售金额：">
                                {{equipmentForm.paymentOrderSalesAmount|moneyFormat}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="支付单已开采购发票金额：">
                                {{equipmentForm.paymentOrderPurchaseInvoiceAmount|moneyFormat}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="支付单已开销售发票金额：">
                                {{equipmentForm.paymentOrderSalesInvoiceAmount|moneyFormat}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="采购发票总金额：" prop="purchaseInvoiceAmount">
                                <el-input v-isNum:2 v-model.trim="equipmentForm.purchaseInvoiceAmount" maxlength="100" v-inputMAX='100000000'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="mis采购订单号：" prop="misPurchaseOrderNo">
                                <el-input v-model.trim="equipmentForm.misPurchaseOrderNo" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="mis销售订单号：" prop="misSalesOrderNo">
                                <el-input v-model.trim="equipmentForm.misSalesOrderNo" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="销售发票申请金额：" prop="salesInvoiceAmount">
                                <el-input v-isNum:2 v-model.trim="equipmentForm.salesInvoiceAmount" maxlength="100" v-inputMAX='100000000'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="销售发票收票人：" prop="receiver">
                                <el-input v-model.trim="equipmentForm.receiver" maxlength="20"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="收票人手机：" prop="receiverMobile">
                                <el-input v-model.trim="equipmentForm.receiverMobile" maxlength="11"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="收票地址：" prop="receiverAddress">
                                <el-input type="textarea" v-model.trim="equipmentForm.receiverAddress" maxlength="80"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注信息：" prop="remark">
                                <el-input type="textarea" maxlength="255" show-word-limit v-model="equipmentForm.remark" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8"></el-col>
                    </el-row>
                    <div class="floor-tit">上传附件</div>
                    <el-form-item label="附件：" prop="annexes">
                        <HosJoyUpload v-model="equipmentForm.attachDocs" :multiple='false' :showPreView='true' :fileSize=10 :fileNum=5 :uploadParameters='uploadParameters' :action="action" @successCb="$refs['attachDocs'].clearValidate()" accept=".jpg,.png,.jpeg,.pdf">
                        </HosJoyUpload>
                    </el-form-item>
                </el-form>
            </div>
            <el-dialog title="支付单号开窗" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" :before-close="()=>{dialogVisible = false}">
                <div class="project_wrap">
                    <el-form :model="queryParams" :inline="true" label-width="100px" class="demo-ruleForm">
                        <el-row>
                            <el-form-item label="支付单编号：">
                                <el-input v-model.trim="queryParams.paymentOrderNo" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="经销商：">
                                <el-input v-model.trim="queryParams.companyName" maxlength="100">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="上游供应商：">
                                <el-input v-model.trim="queryParams.supplierCompanyName" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称：">
                                <el-input v-model.trim="queryParams.projectName" maxlength="100"></el-input>
                            </el-form-item>
                            <el-button @click="handleReset">重 置</el-button>
                            <el-button type="primary" @click="findPageList">查 询</el-button>
                        </el-row>
                    </el-form>
                    <hosJoyTable ref="hosjoyTable" align="center" border stripe :column="formTableLabel" :data="tableForm" showPagination :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="findPageList" :height='330'>
                        <template #code="slotProps">
                            <el-radio :label="slotProps.data.$index" v-model="radio" @change.native="getCurrentRow(slotProps.data)">{{''}}</el-radio>
                        </template>
                    </hosJoyTable>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAddOrder">确 定</el-button>
                </span>
            </el-dialog>
            <div class="mb20 mt20">
                <h-button @click="handleGoBack">取消</h-button>
                <h-button type="primary" @click="handleSave(1)">保存</h-button>
                <h-button type="primary" @click="handleSave(2)">保存并提交</h-button>
            </div>

        </div>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import moment from 'moment'
import { deepCopy } from '@/utils/utils'
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { ccpBaseUrl } from '@/api/config'
import { EqpInvoiceSubmitRequest } from '@/interface/hbp-project'
import { getEqpPaymentOrderPage, getEqpDetail, updateEqpInvoice, getMostInvoice } from '../api'
import { Phone } from '@/utils/rules'
@Component({
    name: 'Servicededit',
    components: {
        HosJoyUpload,
        hosJoyTable
    }
})

export default class Servicedetail extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    @Action('setNewTags') setNewTags!: Function
    @State('userInfo') userInfo: any

    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    action = ccpBaseUrl + 'common/files/upload-old'

    queryParams: Record<string, any> = {
        deptCode: '',
        paymentOrderNo: '',
        companyName: '',
        projectName: '',
        supplierCompanyName: '',
        pageSize: 10,
        pageNumber: 1,
        paymentOrderNoAccurate: '',
        jobNumber: '',
        authCode: ''
    }
    _queryParams: Record<string, any> = {}
    isDisabled: boolean = true
    dialogVisible: boolean = false
    radio: string = ''
    selectData: Record<string, any> = {}
    equipmentForm: Partial<EqpInvoiceSubmitRequest> = {
        companyId: '',
        saveOrSubmit: null,
        invoiceId: '',
        paymentOrderId: '',
        paymentOrderNo: '',
        projectNo: null,
        projectName: '',
        companyName: '',
        supplierCompanyName: '',
        purchaseInvoiceAmount: '',
        salesInvoiceAmount: '',
        misPurchaseOrderNo: '',
        misSalesOrderNo: '',
        receiver: '',
        receiverMobile: '',
        receiverAddress: '',
        deptCode: '',
        deptName: '',
        remark: '',
        attachDocs: []
    }

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableForm: any[] = [
    ]

    formTableLabel: tableLabelProps = [
        { label: 'choose', prop: 'code', slot: 'code' },
        { label: '支付单号', prop: 'paymentOrderNo' },
        { label: '项目名称', prop: 'projectName' },
        { label: '经销商', prop: 'companyName' },
        { label: '上游供应商', prop: 'supplierCompanyName' },
        { label: '申请时间', prop: 'applyDate', displayAs: 'YYYY-MM-DD HH:mm:ss' }
    ]
    // 校验
    get rules () {
        let rules = {
            paymentOrderNo: [
                { required: true, message: '请输入支付单号' }
            ],
            purchaseInvoiceAmount: [
                { required: true, message: '请输入采购金额', trigger: 'blur' }
            ],
            misPurchaseOrderNo: [
                { required: true, message: '请输入mis采购订单号', trigger: 'blur' }
            ],
            misSalesOrderNo: [
                { required: true, message: '请输入mis销售订单号', trigger: 'blur' }
            ],
            salesInvoiceAmount: [
                { required: true, message: '请输入销售发票申请金额', trigger: 'blur' }
            ],
            receiver: [
                { required: true, message: '请输入销售发票收票人' }
            ],
            receiverMobile: [
                { required: true, message: '请输入销售发票收票人手机' },
                { validator: Phone, trigger: 'blur' }
            ],
            receiverAddress: [
                { required: true, message: '请输入收票地址' }
            ]
        }
        return rules
    }

    @Watch('equipmentForm.companyId')
    getInfo (newVal, oldVal) {
        if (JSON.stringify(this.selectData) != '{}') {
            this.getRecentInvoice()
        }
    }

    async getRecentInvoice () {
        if (this.equipmentForm.companyId) {
            const { data } = await getMostInvoice({ companyId: this.equipmentForm.companyId })
            this.equipmentForm.receiver = data.receiver
            this.equipmentForm.receiverMobile = data.receiverMobile
            this.equipmentForm.receiverAddress = data.receiverAddress
        } else {
            this.equipmentForm.receiver = ''
            this.equipmentForm.receiverMobile = ''
            this.equipmentForm.remark = ''
            this.equipmentForm.receiverAddress = ''
        }
    }

    handleSearch () {
        // 开床搜索
        this.dialogVisible = true
        this.findPageList()
    }

    async findPageList () {
        this.queryParams.paymentOrderNoAccurate = ''
        const { data } = await getEqpPaymentOrderPage(this.queryParams)
        this.tableForm = data.records
        this.page.total = data.total as number
    }

    handleReset () {
        // 重置
        this.queryParams = deepCopy(this._queryParams)
        this.findPageList()
    }

    getCurrentRow (row) {
        console.log('row: ', row.row)
        this.selectData = row.row
        this.radio = row.$index
    }

    async handleSave (type) {
        this.equipmentForm.saveOrSubmit = type
        // 保存
        this.$refs['equipmentForm'].validate(async valid => {
            if (valid) {
                await updateEqpInvoice(this.equipmentForm)
                // 返回
                this.$router.go(-1)
                this.setNewTags((this.$route.fullPath).split('?')[0])
            }
        })
    }

    handleGoBack () {
        // 返回
        this.$router.go(-1)
        this.setNewTags((this.$route.fullPath).split('?')[0])
    }

    handleAddOrder () {
        // 保存订单信息
        this.dialogVisible = false
        this.equipmentForm = {
            ...this.equipmentForm,
            paymentOrderNo: this.selectData.paymentOrderNo,
            projectName: this.selectData.projectName,
            companyName: this.selectData.companyName,
            supplierCompanyName: this.selectData.supplierCompanyName,
            deptName: this.selectData.deptName,
            companyId: this.selectData.companyId,
            projectNo: this.selectData.projectNo,
            projectId: this.selectData.projectId,
            deptCode: this.selectData.deptCode,
            paymentOrderId: this.selectData.id,
            // @ts-ignore
            paymentOrderPurchaseAmount: this.selectData.paymentOrderPurchaseAmount,
            // @ts-ignore
            paymentOrderSalesAmount: this.selectData.paymentOrderSalesAmount,
            // @ts-ignore
            paymentOrderPurchaseInvoiceAmount: this.selectData.paymentOrderPurchaseInvoiceAmount,
            // @ts-ignore
            paymentOrderSalesInvoiceAmount: this.selectData.paymentOrderSalesInvoiceAmount
        }
        console.log('this.equipmentForm: ', this.equipmentForm)
    }

    async getEquipDetail (id) {
        // 详情
        const { data } = await getEqpDetail(id)
        // @ts-ignore
        this.equipmentForm = data
        this.equipmentForm.invoiceId = this.$route.query.id as string
    }

    async onInputBlur ({ target }) {
        console.log('val: ', target.value)
        this.queryParams.paymentOrderNoAccurate = target.value
        const { data } = await getEqpPaymentOrderPage(this.queryParams)
        console.log('data: ', data)
        if (data.records.length == 1) {
            this.equipmentForm = {
                ...this.equipmentForm,
                paymentOrderNo: data.records[0].paymentOrderNo,
                projectName: data.records[0].projectName,
                companyName: data.records[0].companyName,
                supplierCompanyName: data.records[0].supplierCompanyName,
                deptName: data.records[0].deptName,
                companyId: data.records[0].companyId,
                projectNo: data.records[0].projectNo,
                projectId: data.records[0].projectId,
                deptCode: data.records[0].deptCode,
                paymentOrderId: data.records[0].id,
                // @ts-ignore
                paymentOrderPurchaseAmount: data.records[0].paymentOrderPurchaseAmount,
                // @ts-ignore
                paymentOrderSalesAmount: data.records[0].paymentOrderSalesAmount,
                // @ts-ignore
                paymentOrderPurchaseInvoiceAmount: data.records[0].paymentOrderPurchaseInvoiceAmount,
                // @ts-ignore
                paymentOrderSalesInvoiceAmount: data.records[0].paymentOrderSalesInvoiceAmount
            }
        } else {
            if (target.value) {
                this.$message.warning('支付单有误')
                this.equipmentForm = {
                    ...this.equipmentForm,
                    paymentOrderNo: '',
                    projectName: '',
                    companyName: '',
                    supplierCompanyName: '',
                    deptName: '',
                    companyId: '',
                    projectNo: '',
                    projectId: '',
                    deptCode: '',
                    paymentOrderId: '',
                    purchaseInvoiceAmount: '',
                    salesInvoiceAmount: '',
                    misPurchaseOrderNo: '',
                    misSalesOrderNo: '',
                    receiver: '',
                    receiverMobile: '',
                    receiverAddress: ''
                }
            }
        }
    }

    async mounted () {
        this.queryParams.deptCode = this.userInfo.pkDeptDoc
        this.queryParams.jobNumber = this.userInfo.jobNumber
        this.queryParams.authCode = this.$route.query.authCode || ''
        this._queryParams = deepCopy(this.queryParams)
        if (this.$route.query.id) {
            this.getEquipDetail(this.$route.query.id)
        }
        // this.tableForm = [{ id: 201, code: 32, name: 3234, categoryPath: 555 }, { id: 200, code: 11111, name: 2222 }]
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>
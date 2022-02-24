<template>
    <div class="page-body B2b">
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
                        <el-select placeholder="请选择" v-model="queryParams.deptCode" :clearable='true'>
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
                    <div class="query-col__label">采购发票金额（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.minPurchaseInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.maxPurchaseInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游供应商：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.supplierCompanyName" maxlength="50" placeholder="请输入经销商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.projectName" maxlength="50" placeholder="请输入经销商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态码：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.invoiceStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="银行转账" :value="1"></el-option>
                            <el-option label="银行承兑" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">销售发票金额（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.minSalesInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.maxSalesInvoiceAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">mis采购订单号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.misPurchaseOrderNo" maxlength="50" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">mis销售订单号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.misSalesOrderNo" maxlength="50" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">采购发票号码：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.misPurchaseInvoiceNo" maxlength="20" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">销售发票号码：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.misPurchaseInvoiceNo" maxlength="20" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请人：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.createBy" maxlength="20" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请单号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.invoiceNo" maxlength="20" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button>重置</h-button>
                    <h-button @click="handleEdit">申请</h-button>
                </div>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='330' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="handleLook(slotProps.data.row)">查看</h-button>
                    <h-button table @click="handleEdit(slotProps.data.row.loanTransferId)">编辑</h-button>
                    <h-button table @click="handleShowProof(slotProps.data.row)">提交</h-button>
                    <h-button table @click="handleIsPay(slotProps.data.row)">驳回</h-button>
                </template>
            </hosJoyTable>
        </div>
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
import { measure, handleSubmit, validateForm } from '@/decorator/index'
import { getEqpList } from '../api/index'
@Component({
    name: 'equipmentinvoice',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload,
        elImageAddToken
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
    tableData:any[] = []
    editorDrawer:boolean = false

    private _queryParams = {}

    queryParams: Record<string, any> = {
        pageNumber: 1,
        pageSize: 10,
        paymentOrderNo: '',
        deptName: '',
        companyName: '',
        minPurchaseInvoiceAmount: '',
        maxPurchaseInvoiceAmount: '',
        minSalesInvoiceAmount: '',
        maxSalesInvoiceAmount: '',
        supplierCompanyName: '',
        projectName: '',
        invoiceStatus: '',
        misSalesOrderNo: '',
        misPurchaseInvoiceNo: '',
        misSaleInvoiceNo: '',
        authCode: '',
        jobNumber: '',
        createBy: '',
        createTimeStart: '',
        createTimeEnd: '',
        invoiceNo: '',
        'sort.property': null,
        'sort.direction': null
    }

    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function

    get options () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.createTimeStart,
            endTime: this.queryParams.createTimeEnd
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

    tableLabel:tableLabelProps = [
        { label: '状态码', prop: 'invoiceStatus' },
        { label: '申请单号', prop: 'invoiceNo', width: '130' },
        { label: '支付单号', prop: 'paymentOrderNo', width: '160' },
        { label: '项目名称', prop: 'projectName', width: '160' },
        { label: '经销商', prop: 'companyName', width: '160' },
        { label: '上游供应商', prop: 'supplierCompanyName', width: '160' },
        { label: 'mis采购订单号', prop: 'misPurchaseOrderNo', width: '160' },
        { label: 'mis销售订单号', prop: 'misSalesOrderNo', width: '160' },
        { label: '采购发票号码', prop: 'misPurchaseInvoiceNo', width: '160' },
        { label: '采购发票金额', prop: 'purchaseInvoiceAmount', width: '160', displayAs: 'money' },
        { label: '销售发票号码', prop: 'misSaleInvoiceNo', width: '160' },
        { label: '销售发票金额', prop: 'salesInvoiceAmount', width: '160' },
        { label: '申请人', prop: 'createBy', width: '160' },
        { label: '申请时间', prop: 'createTime', width: '160' }
    ]

    async handleLook (paymentOrderId, status) {
        // 查看
        this.$router.push({ path: '/goodwork/manageInvoices/equipmentdetail' })
    }

    handleEdit (val) {
        // 编辑
        this.$router.push({ path: '/goodwork/manageInvoices/equipmentedit' })
    }

    @measure
    async getList () {
        const { data } = await getEqpList(this.queryParams)
        this.tableData = data.records
    }

    public onStartChange (val): void {
        this.queryParams.createTimeStart = val
    }
    public onEndChange (val): void {
        this.queryParams.createTimeEnd = val
    }

    async mounted () {
        this.tableData = [{ paymentOrderNo: '1000' }]
    }
}
</script>

<style lang='scss' scoped>
// @import "./css.scss";
</style>

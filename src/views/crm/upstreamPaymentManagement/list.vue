<template>
    <div class="page-body B2b upstreamPaymentManagement">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.orderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
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
                    <div class="query-col__label">支付日期：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游支付（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.minPaidAmount" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.maxPaidAmount" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">操作人：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.createBy" maxlength="20" placeholder="请输入操作人"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">操作时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChangePaidTime" :end-change="onEndChangePaidTime" :options="optionsByPaid"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">抛转状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.ncSyncStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未抛转" :value="10"></el-option>
                            <el-option label="抛转成功" :value="20"></el-option>
                            <el-option label="抛转失败" :value="30"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">NC凭证信息：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.ncInfo" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">抛转时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChangeNcTime" :end-change="onEndChangeNcTime" :options="optionsByNc"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">付款主体：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.payPrincipal" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">付款类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.paymentType" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="货款" :value="1"></el-option>
                            <el-option label="费用" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">支付账号：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.payAccount" maxlength="30" placeholder="请输入"></el-input>
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
            <hosJoyTable localName="V3.5.1" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList"
                actionWidth='330' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template #action="slotProps">
                    <h-button table v-if="hosAuthCheck(upstreamPayDetail)" @click="viewDetail(slotProps.data.row.paymentOrderId,slotProps.data.row.status)">查看详情</h-button>

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
import { measure } from '@/decorator/index'
import * as Api from './api/index'
import { newCache } from '@/utils/index'

@Component({
    name: 'UpstreamPaymentManagement',
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

    queryParams: Record<any, any> = {
        pageNumber: 1,
        pageSize: 10,
        orderNo: '',
        deptCode: '',
        companyName: '',
        supplierPaymentType: '',
        supplierCompanyName: '',
        projectName: '',
        minPaidTime: '',
        maxPaidTime: '',
        minPaidAmount: '',
        maxPaidAmount: '',
        createBy: '',
        minCreateTime: '',
        maxCreateTime: '',
        ncInfo: '',
        ncSyncUser: '',
        minNcSyncTime: '',
        maxNcSyncTime: '',
        ncSyncStatus: '',
        payPrincipal: '',
        paymentType: '',
        payAccount: '',
        authCode: '',
        jobNumber: '',
        'sort.property': null,
        'sort.direction': null
    }
    private _queryParams = {}
    tableData:any[] = []
    totalAmount:number = 0

    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function

    get options () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.minPaidTime,
            endTime: this.queryParams.maxPaidTime
        }
    }

    get optionsByPaid () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.minCreateTime,
            endTime: this.queryParams.maxCreateTime
        }
    }
    get optionsByNc () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.minNcSyncTime,
            endTime: this.queryParams.maxNcSyncTime
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

    @measure
    async getList () {
        const { data: tableData } = await Api.getUpStreamPaymentList(this.queryParams)
        this.tableData = tableData.records || []
        this.page.total = tableData.total as number
        const { data: totalAmountData } = await Api.getUpStreamPaymentTotalAmountApi(this.queryParams)
        this.totalAmount = totalAmountData
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

    beforeUpdate () {
        newCache('UpstreamPaymentManagement')
    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>

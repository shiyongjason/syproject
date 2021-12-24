<template>
    <div class="page-body B2b unionpay">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">入账流水号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.billNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">入账金额：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minTotalAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">万元</template></el-input>
                        -
                        <el-input v-model="queryParams.maxTotalAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">万元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">可认领金额：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minNoReceiptAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">万元</template></el-input>
                        -
                        <el-input v-model="queryParams.maxNoReceiptAmount" v-isNum:2 placeholder="请输入" maxlength="20"><template slot="append">万元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">付款方：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.payeeName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">收款方主体：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.receiptName" placeholder="请选择" @change="onPayee">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=item.payeeName :value=item.payeeName v-for="(item) in accountList" :key=item.payeeName></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">银企直联银行：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.receiptBankName" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=item.payeeBankName :value=item.payeeBankName v-for="(item) in payeeBank" :key=item.payeeBankName></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">入账时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartPay" :end-change="onEndPay" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">认领状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.receiptStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=item.label :value=item.value v-for="(item) in Unionstatus" :key=item.label></el-option>
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
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span>已认领金额：{{totalMoney.receiptAmount|moneyFormat}}</span>；<span>可认领金额：{{totalMoney.noReceiptAmount|moneyFormat}}</span></el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='300' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="onLook(slotProps.data.row)">查看详情</h-button>
                    <h-button table @click="onApprovalRecord(slotProps.data.row)" v-if="slotProps.data.row.receiptStatus !== 2">认领账单</h-button>
                </template>
            </hosJoyTable>
        </div>
        <Detail ref="detailRef" :drawer='dialogVisible' :bankBillId="bankBillId" @onClamin='onClamin' @handleClose="()=>dialogVisible = false" v-if="dialogVisible" />
        <ApproveBill :isOpen="isOpen" :bankBillId="bankBillId" @submitResult='submitResult' @onCancel="()=>isOpen=false" v-if="isOpen" />
    </div>
</template>

<script lang="tsx">
import moment from 'moment'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { State } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { deepCopy } from '@/utils/utils'
import * as Api from './api/index'
import { RespContractSignHistory } from '@/interface/hbp-project'
import { newCache } from '@/utils/index'
import './css/css.scss'
import Detail from './components/detail.vue'
import ApproveBill from './components/approveBill.vue'

// 定义类型
interface Query{
    [key:string]:any
}
const Unionstatus = [{ value: 0, label: '待认领' }, { value: 1, label: '部分认领' }, { value: 2, label: '全部认领' }]

@Component({
    name: 'UnionpayAccountList',
    components: {
        hosJoyTable,
        ApproveBill,
        Detail
    }
})
export default class Advancelist extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    Unionstatus = Unionstatus
    moment = moment
    private _queryParams:Query = {}
    private dialogVisible:boolean = false
    private isOpen:boolean = false
    private totalMoney:number = 0
    private id:number|string = null
    private bankBillId:number|string = null
    private records:Array<RespContractSignHistory> = null
    private accountList:Array<RespContractSignHistory> = null
    @Ref('detailRef') readonly detailRefs!: HTMLFormElement;
    @State('userInfo') userInfo: any
    queryParams:Query = {
        pageSize: 10,
        pageNumber: 1,
        billNo: '',
        receiptName: '',
        minReceiptTime: '',
        maxReceiptTime: '',
        receiptBankName: '',
        payeeName: '',
        minTotalAmount: '',
        maxTotalAmount: '',
        receiptStatus: '',
        minNoReceiptAmount: '',
        maxNoReceiptAmount: '',
        jobNumber: '',
        authCode: sessionStorage.getItem('authCode')
            ? JSON.parse(sessionStorage.getItem('authCode') || '')
            : ''
    }
    page = {
        total: 0
    }
    payeeBank = []
    source = ''

    private tableLabel:tableLabelProps = [
        { label: '入账流水号', prop: 'billNo', width: '120px' },
        { label: '入账金额', prop: 'totalAmount', displayAs: 'money', width: '100' },
        { label: '已认领金额', prop: 'receiptAmount', displayAs: 'money', width: '100' },
        { label: '可认领金额', prop: 'noReceiptAmount', displayAs: 'money', width: '100' },
        { label: '付款方', prop: 'payeeName', width: '160' },
        { label: '付款方账号', prop: 'payeeBankAccount', width: '120' },
        { label: '付款银行', prop: 'payeeBankName', width: '120' },
        { label: '收款方', prop: 'receiptName', width: '160' },
        { label: '银企直联银行', prop: 'receiptBankName', width: '160' },
        { label: '银企直联账户', prop: 'receiptBankAccount', width: '160' },
        { label: '入账时间', prop: 'receiptTime', displayAs: 'YYYY-MM-DD HH:mm:ss', width: '160' },
        { label: '认领状态', prop: 'receiptStatus', dicData: Unionstatus }
    ]
    private tableData = []
    get options () {
        return {
            type: 'datetime',
            valueFormat: 'yyyy-MM-ddTHH:mm:ss',
            format: 'yyyy-MM-dd HH:mm:ss',
            startTime: this.queryParams.minReceiptTime,
            endTime: this.queryParams.maxReceiptTime
        }
    }
    // 详情弹窗
    public onClamin (bankBillId) {
        this.source = 'detail'
        this.bankBillId = bankBillId
        this.isOpen = true
    }
    // 银企列表
    public async getList () {
        this.queryParams.jobNumber = this.userInfo.jobNumber as string
        const res:any = await Promise.all([Api.getUnionPayTotal(this.queryParams), Api.getUnionPayList(this.queryParams)])
        this.tableData = res[1].data.records
        this.page.total = res[1].data.total as number
        this.totalMoney = res[0].data
    }
    // 重置
    public onReset (): void {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }
    // 入账开始时间
    public onStartPay (val):void {
        this.queryParams.minReceiptTime = val
    }
    // 入账结束时间
    public onEndPay (val):void {
        this.queryParams.maxReceiptTime = val
    }
    // 查看详情
    public onLook (row): void {
        this.bankBillId = row.id
        this.dialogVisible = true
    }
    // 认领账单弹窗
    public onApprovalRecord (row):void {
        this.bankBillId = row.id
        this.isOpen = true
    }

    // 认领账单提交成功
    public submitResult () {
        this.isOpen = false
        this.getList()
        if (this.source === 'detail') {
            this.detailRefs.enterAccountInfo()
        }
    }

    public onPayee (val): void {
        const payeeAccountList = this.accountList.filter(item => item.payeeName == val)
        this.payeeBank = payeeAccountList[0].payeeAccountList
    }

    public async getAccountList () {
        const res:any = await Api.getAccountList('')
        this.accountList = res.data
    }

    public async mounted () {
        this._queryParams = deepCopy(this.queryParams)
        this.getList()
        this.getAccountList()
    }
    beforeUpdate () {
        newCache('UnionpayAccountList')
    }
}
</script>
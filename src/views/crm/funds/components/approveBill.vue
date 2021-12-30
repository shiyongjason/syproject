<template>
    <el-dialog  :close-on-click-modal=false :title="dialogTitle" :visible.sync="isOpen" width="60%" :before-close="onCancel" class="payment-dialog">
        <div class="refresh" @click="bankDetailInfo"><el-button type="primary">刷 新</el-button></div>
        <div class="unionPay" v-if="bankType==2||bankType==3">
            <p><span>账单类型：{{ bankDetail.repaymentType&&fundType[bankDetail.repaymentType-1].label }}</span><span>应支付时间：{{bankDetail.schedulePaymentDate | momentFormat('YYYY-MM-DD') }}</span><span>账单总金额：{{bankDetail.fundAmount | moneyFormat }}</span></p>
            <p><span>项目名称：{{ bankDetail.projectName }}</span><span>经销商：{{bankDetail.companyName }}</span><span>本次支付金额：{{bankDetail.paymentAmount | moneyFormat }}</span></p>
        </div>
        <div class="unionPay" v-if="bankType==4">
            <p><span>本次批量支付总金额：{{ payeeMoney | moneyFormat}}元</span></p>
            <p><span>经销商：{{ payeeName }}</span><span>账单数量：{{bankDetail.list&&bankDetail.list.length}}</span></p>
        </div>
        <div class="approve">
            <hosJoyTable
                ref="hosjoyTable"
                align="center"
                border stripe
                isShowselection
                :maxHeight='500'
                @selection-change="selectChange"
                :column="formTableLabel"
                :data="bankList"
                >
            </hosJoyTable>
            <div class="selectPrice">已选金额：¥{{ selectMoeny|moneyFormat }}</div>
            <div class="btn"><h-button type="primary" @click="onSubmit" :disabled="disabled">确认认领</h-button></div>
        </div>
    </el-dialog>
</template>

<script lang='tsx'>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { isNum } from '@/utils/validate/format'
import { CreateElement } from 'vue'
import * as Api from '../api/index'

// 定义类型
interface Query{
    [key:string]:any
}

const fundType = [{ value: 1, label: '首付款' }, { value: 2, label: '尾款' }, { value: 3, label: '服务费' }, { value: 4, label: '预付款' }]
const status = [{ value: 0, label: '未认领' }, { value: 1, label: '部分认领' }, { value: 2, label: '全部认领' }]

const BankApi = { 1: 'getBankDetail', 2: 'findFundDetail', 3: 'findFundClaim', 4: 'findFundDetail' }

@Component({
    name: 'ApproveBill',
    components: {
        hosJoyTable
    }
})

export default class ApproveBill extends Vue {
    @Prop({ type: Boolean, required: true, default: false }) isOpen: boolean;
    @Prop({ type: Number, required: false, default: 0 }) payeeMoney: number;
    @Prop({ type: String, required: false, default: '' }) payeeName: string;
    @Prop({ type: String, required: false, default: '' }) bankBillId : string;
    @Prop({ type: Number, required: true, default: 1 }) bankType : number;
    @Ref('hosjoyTable') readonly hosjoyTableRef!: HTMLFormElement;
    @State('userInfo') userInfo: any
    fundType = fundType
    status = status
    disabled = true
    selectList = []
    bankList = []
    bankDetail:any = {}
    dialogTitle:string = '认领账单 |'

    get formTableLabel () {
        let formTableLabel: tableLabelProps = [
            { label: '入账流水号', prop: 'billNo' },
            // @ts-ignore
            { label: '银企直联银行', prop: 'receiptName', isHidden: this.bankType != 4 },
            { label: '入账金额', prop: 'totalAmount', displayAs: 'money' },
            { label: '已认领金额', prop: 'receiptAmount', displayAs: 'money' },
            { label: '可认领金额', prop: 'noReceiptAmount', width: '100', displayAs: 'money' },
            { label: '入账时间', prop: 'receiptTime', displayAs: 'YYYY-MM-DD HH:mm:ss', width: '150' },
            { label: '认领状态', prop: 'receiptStatus', dicData: status, width: '100' },
            {
                label: '本次认领金额',
                prop: 'currentReceiptAmount',
                className: 'form-table-header',
                showOverflowTooltip: false,
                width: '200',
                render: (h: CreateElement, scope: TableRenderParam) => {
                    return (
                        <div v-show={scope.row.checked}>
                            <el-input
                                class="mini"
                                size="mini"
                                placeholder="请输入"
                                value={scope.row[scope.column.property]}
                                onInput={(val) => {
                                    if (val < 0 || val >= scope.row.noReceiptAmount) {
                                        scope.row[scope.column.property] = scope.row.noReceiptAmount
                                    } else {
                                        scope.row[scope.column.property] = isNum(val, 2)
                                    }
                                }}
                            ></el-input>
                        </div>
                    )
                }
            }
        ]
        return formTableLabel
    }

    // 获取checked选中数组
    public selectChange (data):void {
        const selectListId = data.map(item => item.billNo)
        this.bankList.forEach(row => {
            if (selectListId.indexOf(row.billNo) >= 0) {
                row.checked = true
                row.currentReceiptAmount = row.currentReceiptAmount || row.unPaidAmount
            } else {
                row.checked = false
                row.currentReceiptAmount = null
            }
        })
        this.selectList = data
        this.disabled = !data.length
    }
    // 获取已选中的认领金额
    get selectMoeny () {
        const moneny = this.selectList.reduce((sum, val) => {
            // console.log(parseFloat(val.currentReceiptAmount))
            return sum + parseFloat(val.currentReceiptAmount || 0)
        }, 0)
        return moneny
    }
    // 关闭弹窗
    public onCancel (val):void {
        this.$emit('onCancel')
    }
    // 分页点击
    // public bankPage (val):void {
    //     this.queryParams = {
    //         ...this.queryParams,
    //         ...val
    //     }
    //     this.bankDetailInfo()
    // }

    // 获取认领银企账单列表
    // async bankListInfo () {
    // this.queryParams.bankBillId = this.bankBillId
    // const { data } = await Api.getBankList(this.queryParams)
    // this.bankList = data.records
    // this.page.total = data.total as number
    // this.$nextTick(() => {
    //     this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(this.bankList[0], true)
    // })

    // setTimeout(() => {
    //     this.selectSum()
    // }, 0)
    // }

    // 用于计算选中的列表
    public selectSum () {
        let sum = 0
        let index = 0
        for (let i = 0; i < this.bankList.length; i++) {
            if (sum <= this.bankDetail.unReceiptAmount) {
                console.log('sum', sum)

                if ((sum + this.bankList[i].noReceiptAmount) < this.bankDetail.unReceiptAmount) {
                    console.log(index, (sum + this.bankList[i].noReceiptAmount), this.bankDetail.unReceiptAmount)
                    this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(this.bankList[i])
                    sum += this.bankList[i].noReceiptAmount
                    index = i + 1
                } else {
                    if (index === i) {
                        let price = this.bankDetail.unReceiptAmount - sum
                        this.bankList[i].currentReceiptAmount = price
                        sum += this.bankList[i].currentReceiptAmount
                        this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(this.bankList[i])
                    }
                }
            }
        }
    }

    // 获取认领银企账单详情
    public async bankDetailInfo () {
        const { data: dataInfo } = await Api.findBankReceipt({ payeeName: this.payeeName })
        dataInfo.length > 0 && dataInfo.forEach(item => {
            item.currentReceiptAmount = ''
            item.checked = false
        })
        if (this.bankType != 4) {
            // 单个账单认领
            const { data } = await Api[BankApi[this.bankType]](this.bankBillId)
            this.bankDetail = { ...data, list: dataInfo, unReceiptAmount: data.fundAmount }
        } else {
            // 批量账单
            this.bankDetail = { list: dataInfo, unReceiptAmount: this.payeeMoney }
        }
        // let dataInfo = data
        this.bankList = dataInfo
        // 默认选中对应的流水
        this.$nextTick(() => {
            this.selectSum()
        })
    }

    // 确认认领
    public async onSubmit () {
        const currentReceiptAmount = this.selectList.map(item => item.currentReceiptAmount)
        if (currentReceiptAmount.indexOf('') >= 0 || currentReceiptAmount.indexOf('0') >= 0) {
            this.$message.error('输入的认领金额不得为0')
            return false
        }
        if (this.selectMoeny > this.bankDetail.unReceiptAmount) {
            this.$message.error('当前已选账单水金额不得超过待认领金额')
            return false
        }
        const claimFundRequestList = this.selectList.filter(item => item.checked)
        if (this.bankType == 4) {
            // 批量认领
            this.$emit('backonReceived', claimFundRequestList)
        } else if (this.bankType == 2) {
            // 账单明细认领
            await Api.updateReceiptDetailBank({
                fundDetailId: this.bankBillId,
                bankBillReceiptList: claimFundRequestList
            })
        } else if (this.bankType == 3) {
            // 手动认领
            await Api.updateReceiptBank({
                fundId: this.bankBillId,
                bankBillReceiptList: claimFundRequestList
            })
        }
        // await Api.setClaimFund({
        //     bankBillId: this.bankBillId,
        //     claimFundRequestList: claimFundRequestList,
        //     createBy: this.userInfo.employeeName,
        //     createPhone: this.userInfo.user_name
        // })
        // this.$emit('submitResult')
    }

    public async mounted () {
        this.bankDetailInfo()
        if (this.bankType == 3) {
            this.dialogTitle = '手动认领 |'
        }
        if (this.bankType == 2) {
            this.dialogTitle = '认领流水 |'
        }
        if (this.bankType == 4) {
            this.dialogTitle = '批量手动认领 |'
        }
        // this.bankListInfo()
    }
}
</script>
<style lang='scss' scoped>
.unionPay {
    p {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
            display: inline-block;
            flex: 1;
            padding-right: 20px;
            box-sizing: border-box;
        }
    }
}
.approve {
    .selectPrice {
        text-align: right;
        padding: 10px 0;
        font-size: 16px;
        color: #ff7a45;
    }
    .btn {
        text-align: right;
    }
}
.refresh {
    // position: absolute;
    // top: 10px;
    // left: 120px;
    margin-bottom: 10px;
}
/deep/.el-dialog .el-input {
    width: 100%;
}
/deep/.el-pagination__editor.el-input {
    width: 50px !important;
}
/deep/.el-dialog .el-select {
    width: unset;
}
/deep/.el-pagination .el-select .el-input {
    width: 100px !important;
}
</style>
<template>
    <el-dialog :close-on-click-modal=false title="认领账单 |" :visible.sync="isOpen" width="70%" :before-close="onCancel" class="payment-dialog">
        <div class="refresh" @click="bankDetailInfo">
            <el-button type="primary">刷新</el-button>
        </div>
        <div class="unionPay">
            <p><span>入账流水号：{{ bankDetail.billNo }}</span><span>入账时间：{{bankDetail.receiptTime | momentFormat }}</span><span>入账金额：{{bankDetail.totalAmount | moneyFormat }}</span></p>
            <p><span>付款方：{{ bankDetail.payeeName }}</span><span>已认领金额：{{bankDetail.receiptAmount | moneyFormat }}</span><span>待认领金额：{{bankDetail.unReceiptAmount | moneyFormat }}</span></p>
        </div>
        <div class="approve">
            <hosJoyTable ref="hosjoyTable" isShowIndex align="center" border stripe isShowselection :maxHeight='500' @select="select" :column="formTableLabel" :data="bankList" showPagination :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" isAction    @select-all="selectAll"
                :total="queryParams.total" @pagination="getList" :selectable="checkSelectable">
                  <template #action="slotProps">
                    <h-button table v-if="slotProps.data.row.unConfirmedAmount!=0"  @click="viewDetail(slotProps.data.row)">查看详情</h-button>
                  </template>
            </hosJoyTable>
        </div>
        <span slot="footer" class="dialog-footer">
            <div class="selectPrice">已选金额：¥{{ selectMoeny | moneyFormat }}</div>
            <div class="btn">
                <h-button type="primary" @click="onSubmit" :disabled="disabled">确认认领</h-button>
            </div>
        </span>
    </el-dialog>
</template>

<script lang='tsx'>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { isNum } from '@/utils/validate/format'
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CreateElement } from 'vue'
import * as Api from '../api/index'

// 定义类型
interface Query{
    [key:string]:any
}

const fundType = [{ value: 1, label: '首付款' }, { value: 2, label: '尾款' }, { value: 3, label: '服务费' }, { value: 4, label: '预付款' }]
const status = [{ value: 1, label: '待支付' }, { value: 2, label: '部分支付' }]
@Component({
    name: 'ApproveBill',
    components: {
        hosJoyTable
    }
})

export default class ApproveBill extends Vue {
    @Prop({ type: Boolean, required: true, default: false }) isOpen: boolean;
    @Prop({ type: Number, required: true, default: '' }) bankBillId : number;
    @Ref('hosjoyTable') readonly hosjoyTableRef!: HTMLFormElement;
    @State('userInfo') userInfo: any
    fundType = fundType
    status = status
    disabled = true
    selectList = []
    bankList = []
    bankDetail:any = {}
    copyTable = []
      isSelectAllPass:boolean = false

    queryParams:Record<any, any> = {
        pageSize: 10,
        pageNumber: 1,
        total: 0
    }
    get formTableLabel () {
        let formTableLabel: tableLabelProps = [
            { label: '支付单编号', prop: 'orderNo' },
            { label: '账单流水号', prop: 'fundId' },
            { label: '账单类型', prop: 'fundType', dicData: fundType },
            { label: '账单金额', prop: 'paymentAmount', displayAs: 'money' },
            { label: '已支付金额', prop: 'paidAmount', displayAs: 'money' },
            { label: '待支付金额', prop: 'unPaidAmount', displayAs: 'money' },
            { label: '支付待确认', prop: 'unConfirmedAmount', displayAs: 'money' },
            { label: '应支付时间', prop: 'schedulePaymentDate', displayAs: 'YYYY-MM-DD', width: '130' },
            { label: '支付状态', prop: 'paymentStatus', dicData: status, width: '80' },
            {
                label: '本次认领金额',
                prop: 'claimAmount',
                className: 'form-table-header',
                width: '120',
                render: (h: CreateElement, scope: TableRenderParam) => {
                    return (
                        <div v-show={this.selectList.includes(scope.row)}>
                            <el-input
                                class="mini"
                                size="mini"
                                placeholder="请输入"
                                value={scope.row[scope.column.property]}
                                onInput={(val) => {
                                    if (val < 0 || val >= scope.row.unPaidAmount) {
                                        scope.row[scope.column.property] = scope.row.unPaidAmount
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
    checkSelectable (row, index) {
        return row.unConfirmedAmount == 0
    }
    // 获取checked选中数组
    // public selectChange (data):void {
    //     console.log('data', this.bankList)
    //     this.selectList = data
    //     this.bankList.forEach(row => {
    //         if (this.selectList.includes(row)) {
    //             // row.checked = true
    //             row.claimAmount = row.claimAmount || row.unPaidAmount
    //         } else {
    //             // row.checked = false
    //             row.claimAmount = null
    //         }
    //     })
    //     this.disabled = !data.length
    // }
    // 获取已选中的认领金额
    get selectMoeny () {
        const moneny = this.selectList.reduce((sum, val) => {
            return sum + parseFloat(val.claimAmount ?? 0)
        }, 0)
        console.log('log::::::计算和', moneny.toFixed(2))
        this.isSelectAllPass = moneny == 0
        console.log('🚀 --- getselectMoeny --- this.isPass', this.isSelectAllPass)
        return moneny.toFixed(2)
    }
    get currentSum () {
        const moneny = this.selectList.reduce((sum, val) => {
            return sum + parseFloat(val.claimAmount || 0)
        }, 0)
        return moneny
    }
    // 关闭弹窗
    public onCancel (val):void {
        this.$emit('onCancel')
    }
    // 分页点击
    selectAll (list) {
        console.log('🚀 --- selectAll --- list', list)

        this.selectList = list
        let moneny = this.selectList.reduce((sum, val) => {
            return sum + parseFloat(val.claimAmount || 0)
        }, 0)
        let others = this.selectList.filter(item => item.claimAmount === '')
        if (moneny >= this.bankDetail.unReceiptAmount && !this.isSelectAllPass) {
            let temp = this.selectList.filter(item => item.claimAmount !== '')
            this.selectList = temp
            others.forEach(row => {
                this.hosjoyTableRef.toggleRowSelection(row, false)
            })
            this.$message.warning('已选金额不得超过待支付金额')
        } else {
            let index = 0
            for (let i = 0; i < others.length; i++) {
                if (moneny <= this.bankDetail.unReceiptAmount) {
                    if ((moneny + others[i].unPaidAmount) < this.bankDetail.unReceiptAmount) {
                        others[i].claimAmount = others[i].unPaidAmount
                        this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(others[i], true)
                        moneny += others[i].claimAmount
                        index = i + 1
                        let resIndex = this.selectList.findIndex(item => item.fundId == others[i].fundId)
                        if (resIndex < 0) {
                            this.selectList.push(others[i])
                        }
                    } else {
                        if (index === i) {
                            let price = this.bankDetail.unReceiptAmount - moneny
                            others[i].claimAmount = price.toFixed(2)
                            moneny += others[i].claimAmount
                            this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(others[i], true)
                            let resIndex = this.selectList.findIndex(item => item.fundId == others[i].fundId)
                            if (resIndex < 0) {
                                this.selectList.push(others[i])
                            }
                        }
                    }
                    this.disabled = this.selectList.length == 0
                }
            }
        }
        let next = this.selectList.filter(item => item.claimAmount === '')
        next.forEach(row => {
            this.hosjoyTableRef.toggleRowSelection(row, false)
        })
        console.log('🚀this.selectListxxxxxxxxxx', JSON.stringify(this.selectList))
    }

    select (selectList, row) {
        let resIndex = selectList.findIndex(item => item.fundId == row.fundId)
        if (resIndex > -1) {
            console.log('log::::::0勾选')
            const moneny = this.selectList.reduce((sum, val) => {
                return sum + parseFloat(val.claimAmount || 0)
            }, 0)
            console.log('🚀 --- moneny --- moneny', moneny)
            if (moneny >= this.bankDetail.unReceiptAmount && this.selectList.length > 0) {
                this.$message.warning('已选金额不得超过待认领金额')
                this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(row, false)
                let index = this.selectList.findIndex(item => item.fundId == row.fundId)
                row.claimAmount = ''
                if (index > -1) {
                    this.selectList.splice(index, 1)
                }
            } else {
                let index = this.selectList.findIndex(item => item.fundId == row.fundId)
                if (index < 0) {
                    this.selectList.push(row)
                }
                let curr = (this.bankDetail.unReceiptAmount - moneny).toFixed(2)
                if (curr > row.unPaidAmount) {
                    row.claimAmount = row.unPaidAmount
                } else {
                    row.claimAmount = curr
                }
            }
        } else {
            let index = this.selectList.findIndex(item => item.fundId == row.fundId)
            row.claimAmount = ''
            if (index > -1) {
                this.selectList.splice(index, 1)
            }
        }
        this.disabled = this.selectList.length == 0
    }

    getList () {
        let start = (this.queryParams.pageNumber - 1) * this.queryParams.pageSize
        let end = this.queryParams.pageNumber * this.queryParams.pageSize
        let newList = this.copyTable.slice(start, end)
        this.bankList = newList
        this.selectList.forEach(item => {
            console.log('item', item)
            this.$nextTick(() => {
                this.hosjoyTableRef.toggleRowSelection(item)
            })
        })
    }

    viewDetail (val) {
        console.log('val: ', val)
        this.$router.push({ name: 'funds', params: { fundType: val.fundType, pNo: val.fundId } })
    }

    // 用于计算选中的列表
    public selectSum () {
        let sum = 0
        let index = 0
        for (let i = 0; i < this.bankList.length; i++) {
            if (this.bankList[i].unConfirmedAmount == 0) {
                if (sum < this.bankDetail.unReceiptAmount) {
                    // console.log('this.bankDetail.unReceiptAmount: ', this.bankDetail.unReceiptAmount, (sum * 1 + this.bankList[i].unPaidAmount * 1))
                    if ((sum * 1 + this.bankList[i].unPaidAmount * 1) < this.bankDetail.unReceiptAmount) {
                        this.bankList[i].claimAmount = this.bankList[i].unPaidAmount
                        sum += this.bankList[i].claimAmount * 1
                        this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(this.bankList[i])
                        index = i + 1
                        this.selectList.push(this.bankList[i])
                    } else {
                        console.log('index: ', index)
                        if (index == i) {
                            let price = this.bankDetail.unReceiptAmount - sum
                            console.log('price: ', price)
                            this.bankList[i].claimAmount = price.toFixed(2)
                            sum += this.bankList[i].claimAmount * 1
                            this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(this.bankList[i])
                            this.selectList.push(this.bankList[i])
                        }
                    }
                    this.disabled = this.selectList.length == 0
                }
            } else {
                index = i + 1
            }
        }
    }

    // 获取认领银企账单详情
    public async bankDetailInfo () {
        this.bankList = []
        const data:any = await Api.getBankDetail(this.bankBillId)
        let dataInfo = data.data
        dataInfo.claimFundResponseList.length > 0 && dataInfo.claimFundResponseList.forEach(item => {
            item.claimAmount = ''
            // item.checked = false
        })
        this.copyTable = JSON.parse(JSON.stringify(dataInfo.claimFundResponseList))
        this.bankDetail = dataInfo
        this.bankList = this.copyTable.slice(0, this.queryParams.pageSize)
        this.queryParams.total = this.copyTable.length

        // 默认选中对应的流水
        this.$nextTick(() => {
            this.selectSum()
        })
    }

    // 确认认领
    public async onSubmit () {
        const claimPrice = this.selectList.map(item => item.claimAmount)
        console.log('this.selectMoeny: ', this.selectMoeny)

        if (Number(this.selectMoeny) == 0 || !this.selectMoeny || Number(this.selectMoeny) < 0) {
            this.$message.error('输入的认领金额不得小于等于0')
            return false
        }
        if (this.selectMoeny > this.bankDetail.unReceiptAmount) {
            this.$message.error('当前已选账单流水金额不得超过待认领金额')
            return false
        }
        const claimFundRequestList = this.selectList.filter(val => Number(val.claimAmount) > 0).map(item => {
            return {
                fundId: item.fundId,
                unPaidAmount: item.unPaidAmount,
                claimAmount: item.claimAmount
            }
        })
        await Api.setClaimFund({
            bankBillId: this.bankBillId,
            claimFundRequestList: claimFundRequestList,
            createBy: this.userInfo.employeeName,
            createPhone: this.userInfo.user_name,
            receiptName: this.bankDetail.receiptName
        })
        this.$emit('submitResult')
    }

    public async mounted () {
        this.bankDetailInfo()
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
.dialog-footer {
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
    position: absolute;
    top: 10px;
    left: 120px;
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
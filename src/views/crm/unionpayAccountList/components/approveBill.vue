<template>
    <el-dialog  :close-on-click-modal=false title="认领账单" :visible.sync="isOpen" width="60%" :before-close="onCancel" class="payment-dialog">
        <div class="unionPay">
            <p><span>入账流水号：{{ bankDetail.billNo }}</span><span>入账时间：{{bankDetail.receiptTime | momentFormat }}</span><span>入账金额：{{bankDetail.totalAmount | moneyFormat }}</span></p>
            <p><span>付款方：{{ bankDetail.payeeName }}</span><span>已认领金额：{{bankDetail.receiptAmount | moneyFormat }}</span><span>待认领金额：{{bankDetail.unReceiptAmount | moneyFormat }}</span></p>
        </div>
        <div class="approve">
            <hosJoyTable
                ref="hosjoyTable"
                align="center"
                border stripe
                isShowselection
                @selection-change="selectChange"
                :column="formTableLabel"
                :data="bankList"
                :pageNumber.sync="queryParams.pageNumber"
                :pageSize.sync="queryParams.pageSize"
                :total="page.total"
                @pagination="bankPage"
                prevLocalName="V3.*" localName="V3.*.26">
            </hosJoyTable>
            <div class="selectPrice">已选金额：¥{{ selectMoeny | moneyFormat }}</div>
            <div class="btn"><h-button type="primary" @click="onSubmit" :disabled="disabled">确认认领</h-button></div>
        </div>
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
    bankList = [
        {
            id: '111111',
            fundId: 1111111,
            fundType: 1,
            paymentAmount: 100,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 200,
            unPaidAmount: 300,
            unConfirmedAmount: 400,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            id: '2222',
            fundId: 22222,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 180,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '3333',
            fundId: 3333,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 4444,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 5555,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 6666,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 7777,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 8888,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 9999,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 11111,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 22222,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 33333,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '111111',
            fundId: 1111111,
            fundType: 1,
            paymentAmount: 100,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 200,
            unPaidAmount: 300,
            unConfirmedAmount: 400,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            id: '2222',
            fundId: 22222,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 180,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '3333',
            fundId: 3333,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 4444,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 5555,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 6666,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 7777,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 8888,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 9999,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 11111,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 22222,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 33333,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '111111',
            fundId: 1111111,
            fundType: 1,
            paymentAmount: 100,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 200,
            unPaidAmount: 300,
            unConfirmedAmount: 400,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            id: '2222',
            fundId: 22222,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 180,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '3333',
            fundId: 3333,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 4444,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 5555,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 6666,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 7777,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 8888,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 9999,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 11111,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 22222,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 33333,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '111111',
            fundId: 1111111,
            fundType: 1,
            paymentAmount: 100,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 200,
            unPaidAmount: 300,
            unConfirmedAmount: 400,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            id: '2222',
            fundId: 22222,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 180,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '3333',
            fundId: 3333,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 4444,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 5555,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 6666,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 7777,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 8888,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 9999,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 11111,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 22222,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 33333,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '111111',
            fundId: 1111111,
            fundType: 1,
            paymentAmount: 100,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 200,
            unPaidAmount: 300,
            unConfirmedAmount: 400,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            id: '2222',
            fundId: 22222,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 180,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '3333',
            fundId: 3333,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 4444,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 5555,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 6666,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 7777,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 8888,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 9999,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 11111,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 22222,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 33333,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '111111',
            fundId: 1111111,
            fundType: 1,
            paymentAmount: 100,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 200,
            unPaidAmount: 300,
            unConfirmedAmount: 400,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            id: '2222',
            fundId: 22222,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 180,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '3333',
            fundId: 3333,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 4444,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 5555,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 6666,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 7777,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 8888,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 9999,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 11111,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 22222,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 33333,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '111111',
            fundId: 1111111,
            fundType: 1,
            paymentAmount: 100,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 200,
            unPaidAmount: 300,
            unConfirmedAmount: 400,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            id: '2222',
            fundId: 22222,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 180,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            id: '3333',
            fundId: 3333,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 4444,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 5555,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 6666,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 7777,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 8888,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 9999,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 11111,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 22222,
            fundType: 2,
            paymentAmount: 50,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 30,
            unPaidAmount: 300,
            unConfirmedAmount: 70,
            paymentStatus: 1,
            claimAmount: null,
            checked: false
        },
        {
            fundId: 33333,
            fundType: 2,
            paymentAmount: 20,
            schedulePaymentDate: '2021-12-22',
            paidAmount: 60,
            unPaidAmount: 120,
            unConfirmedAmount: 140,
            paymentStatus: 2,
            claimAmount: null,
            checked: false
        }
    ]
    bankDetail = {}
    queryParams:Query = {
        pageSize: 10,
        pageNumber: 1
    }
    totalPrice = 500
    page = {
        total: 50
    }
    formTableLabel: tableLabelProps = [
        { label: '账单流水号', prop: 'fundId', width: '120' },
        { label: '账单类型', prop: 'fundType', width: '100', dicData: fundType },
        { label: '账单金额', prop: 'paymentAmount', width: '100', displayAs: 'money' },
        { label: '已支付金额', prop: 'paidAmount', width: '100', displayAs: 'money' },
        { label: '待支付金额', prop: 'unPaidAmount', width: '100', displayAs: 'money' },
        { label: '支付待确认', prop: 'unConfirmedAmount', width: '100', displayAs: 'money' },
        { label: '应支付时间', prop: 'schedulePaymentDate', displayAs: 'YYYY-MM-DD HH:mm:ss', width: '150' },
        { label: '支付状态', prop: 'paymentStatus', dicData: status, width: '100' },
        {
            label: '本次认领金额',
            prop: 'claimAmount',
            className: 'form-table-header',
            showOverflowTooltip: false,
            width: '180',
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div v-show={scope.row.checked}>
                        <el-input
                            class="mini"
                            size="mini"
                            placeholder="请输入"
                            value={scope.row[scope.column.property]}
                            v-isNum={2}
                            onInput={(val) => {
                                if (val < 0 || val >= scope.row.unPaidAmount) {
                                    scope.row[scope.column.property] = scope.row.unPaidAmount
                                } else {
                                    scope.row[scope.column.property] = val
                                }
                            }}
                        ></el-input>
                    </div>
                )
            }
        }
    ]
    // 获取checked选中数组
    public selectChange (data):void {
        const selectListId = data.map(item => item.fundId)
        this.bankList.forEach(row => {
            if (selectListId.indexOf(row.fundId) >= 0) {
                row.checked = true
                row.claimAmount = row.claimAmount || row.unPaidAmount
            } else {
                row.checked = false
                row.claimAmount = null
            }
        })
        this.selectList = data
        this.disabled = !data.length
    }
    // 获取已选中的认领金额
    get selectMoeny () {
        const moneny = this.selectList.reduce((sum, val) => {
            return sum + parseFloat(val.claimAmount)
        }, 0)
        return moneny
    }
    // 关闭弹窗
    public onCancel (val):void {
        this.$emit('onCancel')
    }
    // 分页点击
    public bankPage (val):void {
        this.queryParams = {
            ...this.queryParams,
            ...val
        }
        this.bankListInfo()
    }

    // 获取认领银企账单列表
    async bankListInfo () {
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
    }

    // 用于计算选中的列表
    public selectSum () {
        let sum = 0
        let index = 0
        for (let i = 0; i < this.bankList.length; i++) {
            if (sum <= this.totalPrice) {
                if ((sum + this.bankList[i].unPaidAmount) <= this.totalPrice) {
                    this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(this.bankList[i])
                    sum += this.bankList[i].unPaidAmount
                    index = i + 1
                } else {
                    if (index === i) {
                        let price = this.totalPrice - sum
                        this.bankList[i].claimAmount = price
                        this.hosjoyTableRef && this.hosjoyTableRef.toggleRowSelection(this.bankList[i])
                    }
                }
            }
        }
    }

    // 获取认领银企账单详情
    public async bankDetailInfo () {
        // const { data } = await Api.getBankList({ bankBillId: this.bankBillId })
        // this.bankDetail = data
    }

    // 确认认领
    public async onSubmit () {
        const claimPrice = this.selectList.map(item => item.claimAmount)
        if (claimPrice.indexOf('') >= 0 || claimPrice.indexOf('0') >= 0) {
            this.$message.error('输入的认领金额不得为0')
            return false
        }
        if (this.selectMoeny > this.bankDetail.unReceiptAmount) {
            this.$message.error('当前已选账单水金额不得超过待认领金额')
            return false
        }
        const claimFundRequestList = this.selectList.map(item => {
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
            createPhone: this.userInfo.user_name
        })
        this.$emit('submitResult')
    }

    public async mounted () {
        this.bankDetailInfo()
        this.bankListInfo()
    }
}
</script>
<style lang='scss' scoped>
.unionPay {
    p {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
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
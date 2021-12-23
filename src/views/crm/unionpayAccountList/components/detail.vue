<template>
    <el-drawer title="查看详情" :visible.sync="drawer" :before-close="handleClose" :wrapperClosable='false' :modal-append-to-body='false' :close-on-click-modal='false' size='680px'>
        <div class="unionpayDetail">
            <div class="radio-group">
                <el-radio-group v-model="radio" @change="()=>onTabRadio()">
                    <el-radio-button label="入账信息"></el-radio-button>
                    <el-radio-button label="认领记录"></el-radio-button>
                </el-radio-group>
            </div>
            <!--  -->
            <div class="unionpayDetail-ctx" :style="radio=='跟进记录'?'bottom:0':'bottom:60px'" >
                <div v-if="radio=='入账信息'">
                    <div class="info-title">认领信息：</div>
                    <div class="info-p padLeft20">认领状态：{{ receiptName }}（400000.00元/600000.00元）<h-button @click="onClaimStatus" table>{{ enterAccount.receiptResponseLis.length > 0 ? '继续认领' : '去认领' }}</h-button></div>
                    <div v-show="enterAccount && enterAccount.receiptResponseList.length > 0" class="unionpay-content" v-for="(item, index) in enterAccount.receiptResponseList" :key="index">
                        <div class="index">{{ index + 1 }}，</div>
                        <div class="content">
                            <p><span>认领金额(元)：{{ item.claimAmount | moneyFormat }}</span><span>所属项目：{{ item.projectName }}</span></p>
                            <p><span>账单类型：{{ fundType[item.fundType - 1].label }}</span><span>支付单编号：{{ item.paymentOrderNo }}</span></p>
                            <p><span>账单流水号：{{ item.fundId }}</span><span>应支付日期：{{ item.schedulePaymentDate | momentFormat }}</span></p>
                            <p><span>认领时间：{{ item.createTime | momentFormat }}</span></p>
                        </div>
                        <div class="btn"><h-button table @click="onCancelClaim(item)">取消认领</h-button></div>
                    </div>
                    <div v-show="!enterAccount.receiptResponseList.length">
                        <p class="noData">暂无认领的账单</p>
                    </div>
                </div>
                <div v-if="radio=='认领记录'" class="project-information">
                    <p v-for="(item, index) in claimFund" :key="index"><span>{{ item.operatorType ? item.receiptUser : '系统自动' }}</span> 在 <span>{{ item.receiptTime | momentFormat }}</span> 认领 <span>{{ item.receiptAmount }}</span>元到{{ fundType[item.fundType - 1].label }}账单（流水号：{{ item.receiptOrderNo }}）{{ item.type === 2 ? '取消认领' : '' }}</p>
                    <div v-show="!claimFund.length">
                        <p class="noData">暂无认领记录</p>
                    </div>
                </div>
            </div>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <h-button type="default" @click="handleClose">取消</h-button>
                </div>
            </div>
        </div>
    </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import * as Api from '../api/index'
import { Phone } from '@/utils/rules'

const unionstatus = [{ value: 0, label: '待认领' }, { value: 1, label: '部分认领' }, { value: 2, label: '全部认领' }]
const fundType = [{ value: 1, label: '首付款' }, { value: 2, label: '尾款' }, { value: 3, label: '服务费' }, { value: 4, label: '预付款' }]

@Component({
    name: 'unionPayDetail'
})
export default class unionPayDetail extends Vue {
    @Prop({ type: Boolean, required: true, default: true }) drawer: boolean;
    @Prop({ type: Number, required: true, default: '' }) bankBillId: Number;

    @State('userInfo') userInfo: any
    validatorPHONE = Phone
    radio: string = '入账信息';
    enterAccount: object = {
        receiptStatus: 0,
        receiptName: '',
        receiptResponseLis: []
    }
    claimFund: any = []
    unionstatus = unionstatus
    fundType = fundType
    handleClose () {
        this.$emit('handleClose')
    }

    onTabRadio () {
        if (this.radio === '入账信息') {
            // this.$emit('getDetail', this.projectDetail.id)
            this.enterAccountInfo()
        } else {
            this.claimFundInfo()
        }
    }
    // 取消认领
    public onCancelClaim (item):void {
        let message = `确认取消该账单${item.claimAmount}元认领？`
        let params = {
            bankBillId: item.receiptId,
            fundDetailId: item.fundDetailId,
            updateBy: this.userInfo.employeeName
        }
        this.$confirm(message, '取消确认', {
            confirmButtonText: '确认取消认领',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await Api.getCancelClaim(params)
            this.enterAccountInfo()
        }).catch(() => {

        })
    }
    // 认领弹窗
    public onClaimStatus ():void {
        if (this.enterAccount.receiptStatus < 2) {
            this.$emit('onClamin', this.bankBillId)
        } else {
            this.$message.error('该流水已认领')
        }
    }
    // 入账信息
    public async enterAccountInfo () {
        const data:any = await Api.getEnterAccount({ bankBillId: this.bankBillId })
        const dataInfo = data.data
        dataInfo.receiptName = this.unionstatus[dataInfo.receiptStatus].label
        this.enterAccount = dataInfo || []
    }

    // 认领记录
    public async claimFundInfo () {
        const { data } = await Api.getClaimFund({ bankBillId: this.bankBillId })
        this.claimFund = data || []
    }

    public async mounted () {
        this.bankBillId && this.enterAccountInfo()
    }
}
</script>
<style lang='scss' scoped>
@import "../css/detail.scss";
</style>
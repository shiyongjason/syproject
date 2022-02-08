<template>
    <el-dialog :title="title" :visible.sync="isOpen" :close-on-click-modal=false :destory-on-close=true :modal-append-to-body=false width="650px"  :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="row-filed">
                <div class="row-filed-flex">
                    <p class="tips" v-if="!detail._seeing">
                        <template v-if="status === FundsDict.repaymentTypeArrays.list[0].key">首付款</template>
                        <template v-if="status === FundsDict.repaymentTypeArrays.list[1].key">服务费</template>
                        <template v-if="status === FundsDict.repaymentTypeArrays.list[2].key">剩余货款</template>
                        金额(元)：{{dialogDetail.paymentAmount | moneyFormat}}
                    </p>
                    <p v-if="!detail._seeing">
                        支付时间：{{moment(dialogDetail.paidTime).format('YY-MM-DD HH:mm:ss')}}
                    </p>
                </div>
                <div class="label">支付凭证：</div>
                <p class="content">
                    <span class="img-box" :key="item.fileUrl" v-for="item in dialogDetail.attachDocList">
                        <imageAddToken :file-url="item.fileUrl" />
                    </span>
                </p>
            </div>
        </div>
        <span slot="footer" class="dialog-footer" v-if="!detail._seeing">
            <h-button type="assist" @click="onReceived">确认收到</h-button>
            <h-button type="primary" @click="onUnReceived">并未收到</h-button>
        </span>
    </el-dialog>
</template>

<script>
import FundsDict from '../fundsDict'
import {
    findFundDetailId,
    updateFinalPay, updateFinalUnPay,
    updateFirstPay,
    updateFirstUnPay,
    updateServicePay,
    getFundsTicket,
    updateRemainPaymentConfirm
} from '../api'
import { mapState } from 'vuex'
import imageAddToken from '@/components/imageAddToken'
import moment from 'moment'
export default {
    name: 'fundsDialog',
    components: {
        imageAddToken
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        detail: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            required: true
        }

    },
    data () {
        return {
            moment,
            dialogDetail: {},
            FundsDict
        }
    },
    computed: {
        title () {
            let title = '支付确认'
            if (this.detail._seeing) {
                title = '查看凭证'
            }
            if (this.detail._prev) {
                title = '首付款到账确认'
            }
            return title
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        async onReceived () {
            const params = {
                paymentOrderId: this.detail.orderId,
                fundId: this.detail.id
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[0].key) {
                await updateFirstPay(params)
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[1].key) {
                await updateRemainPaymentConfirm({
                    fundDetailId: this.detail.id,
                    confirmType: 1,
                    updateBy: JSON.parse(sessionStorage.getItem('userInfo')).employeeName,
                    updatePhone: JSON.parse(sessionStorage.getItem('userInfo')).phoneNumber
                })
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[2].key) {
                await updateFinalPay(params)
            }
            this.$emit('onClose')
        },
        async onUnReceived () {
            const params = {
                paymentOrderId: this.detail.orderId,
                fundId: this.detail.id
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[0].key) {
                await updateFirstUnPay(params)
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[1].key) {
                await updateRemainPaymentConfirm({
                    fundDetailId: this.detail.id,
                    confirmType: 2,
                    updateBy: JSON.parse(sessionStorage.getItem('userInfo')).employeeName,
                    updatePhone: JSON.parse(sessionStorage.getItem('userInfo')).phoneNumber
                })
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[2].key) {
                await updateFinalUnPay(params)
            }
            this.$emit('onClose')
        },
        async getFundsTicket (val) {
            // type为downPay判断是否从服务费或者剩余货款来的
            if (this.detail.type !== 'downPay') {
                const { data } = await getFundsTicket(this.detail.id)
                this.dialogDetail = data
            } else {
                const { data } = await findFundDetailId(this.detail.id)
                data.attachDocList = data.attachDocResponseList
                this.dialogDetail = data
            }
        },
        goDetail (url) {
            window.open(url)
        }
    },
    watch: {
        isOpen (value) {
            if (value) {
                this.getFundsTicket()
            }
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-dialog__body {
    min-height: 150px;
}
.info-content {
    display: flex;
    flex-direction: column;
    .img-box {
        margin: 10px 10px 0 0;
    }
}
.tips {
    color: #8d8d8d;
    margin-right: 20px;
}
.img-info {
    width: 80px;
    height: 80px;
    cursor: pointer;
    margin-right: 10px;
}
.row-filed {
    &-flex {
        display: flex;
        flex-direction: row;
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        span {
            display: flex;
            width: 80px;
            height: 80px;
            margin-bottom: 12px;
            margin-right: 12px;
            cursor: pointer;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
        }
        img {
            display: block;
            margin: auto;
            max-height: 78px;
            max-width: 78px;
        }
    }
    .label {
        flex: 0 0 100px;
        margin-top: 20px;
    }
}
</style>

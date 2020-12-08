<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="row-filed">
                <span class="label">支付凭证：</span>
                <img :src="item.fileUrl" alt="" :key="item.docId" v-for="item in imgGroup">
            </div>
            <p class="tips" v-if="detail.companyName || detail.amount">是否确认收到{{ detail.companyName }}支付的{{detail.amount}}元服务费？</p>
        </div>
        <span slot="footer" class="dialog-footer" v-if="detail.companyName || detail.amount">
                <h-button type="assist" @click="onReceived">确认收到</h-button>
                <h-button type="primary" @click="onUnReceived">并未收到</h-button>
            </span>
    </el-dialog>
</template>

<script>
import FundsDict from '../fundsDict'
import { getFundsTicket, updateCancelPay, updateFinalPay, updateFirstPay, updateServicePay } from '../api'

export default {
    name: 'fundsDialog',
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
            imgGroup: []
        }
    },
    computed: {
        title () {
            let title = '支付确认'

            if (this.detail.companyName || this.detail.amount) {
                title = '查看凭证'
            }
            return title
        }
    },
    methods: {
        async onReceived () {
            if (this.status === FundsDict.repaymentTypeArrays.list[0].key) {
                await updateFirstPay({
                    a: 1
                })
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[1].key) {
                await updateServicePay({
                    a: 1
                })
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[2].key) {
                await updateFinalPay({
                    a: 1
                })
            }
            this.$emit('onClose')
        },
        async onUnReceived () {
            await updateCancelPay({
                paymentOrderId: 1,
                fundId: 1,
                status: 1,
                attachDocList: 1,
                updateBy: 1
            })
            this.$emit('onClose')
        }
    },
    watch: {
        isOpen (value) {
            value && getFundsTicket({
                bizId: this.detail.fundsId,
                bizType: FundsDict.bizType.list[3].key
            })
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-dialog__body{
    min-height: 150px;
}
.info-content{
    height: 130px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    .row-filed{
        padding-bottom: 20px;
        display: flex;
        align-items: center;
    }
}
.tips {
    color: #8d8d8d;
}
</style>

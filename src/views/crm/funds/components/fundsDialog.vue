<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="row-filed">
                <span class="label">支付凭证：</span>
                <img @click="goDetail(item.fileUrl)" :src="item.fileUrl" alt="" :key="item.docId" v-for="item in dialogDetail.attachDocList" class="img-info">
            </div>
            <p class="tips" v-if="!detail._seeing">是否确认收到{{ dialogDetail.companyName }}支付的{{dialogDetail.paymentAmount}}元服务费？</p>
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
    getFundsTicket,
    updateFinalPay, updateFinalUnPay,
    updateFirstPay,
    updateFirstUnPay,
    updateServicePay,
    updateServiceUnPay
} from '../api'
import { mapState } from 'vuex'

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
            dialogDetail: {}
        }
    },
    computed: {
        title () {
            let title = '支付确认'

            if (this.detail.companyName || this.detail.amount) {
                title = '查看凭证'
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
                await updateServicePay(params)
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
                await updateServiceUnPay(params)
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[2].key) {
                await updateFinalUnPay(params)
            }
            this.$emit('onClose')
        },
        async getFundsTicket () {
            const { data } = await getFundsTicket(this.detail.id)
            this.dialogDetail = data
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
.img-info {
    width: 80px;
    height: 80px;
    cursor: pointer;
    margin-right: 10px;
}
</style>

<template>
    <el-dialog title="查看上游支付明细" :visible.sync="isOpen" width="600px" :before-close="()=> onClose()">
        <div class="info-content">
            <div class="tab-pane">
                <div class="row">
                    <p>
                        <span>应向上游支付：</span>
                        <span class="orange-main">{{ prevPaymentDetail.totalAmount | fundMoneyHasTail }}元</span>
                    </p>
                    <p>
                        <span>上游支付形式：</span>
                        <span class="orange-main">{{ prevPaymentDetail.supplierPaymentType | attributeComputed(PaymentOrderDict.supplierPaymentType.list) }}</span>
                    </p>
                </div>
                <div class="row">
                    <p>
                        <span>已向上游支付：</span>
                        <span class="orange-main">{{ prevPaymentDetail.paidAmount  | fundMoneyHasTail }}元</span>
                    </p>
                    <p>
                        <span>上游货款方式：</span>
                        <span class="orange-main">{{ prevPaymentDetail.supplierPaymentMethod  | attributeComputed(PaymentOrderDict.supplierPaymentMethod.list)  }}</span>
                    </p>
                </div>
            </div>
            <ul>
                <li :key="item.id + '' + index" v-for="(item,index) in prevPaymentDetail.supplierDetails">
                    <p class="head">
                        <span class="icon">{{index + 1}}</span>
                        <span class="label">本次上游支付：</span>
                        <span class="orange-main">{{ item.payAmount | fundMoneyHasTail }}元</span>
                        <span class="info">{{ item.createTime | formatDate }} {{ item.createBy }}（{{ item.createPhone }}）</span>
                    </p>
                    <p class="body">
                        <span class="label">
                            支付凭证：
                        </span>
                        <img :key="subItem.fileUrl" :src="subItem.fileUrl" alt="" v-for="subItem in item.payVouchers" @click="goDetail(subItem.fileUrl)" class="info-img">
                    </p>
                    <p>
                        <span class="label">
                            支付日期：
                        </span>
                        {{ item.payDate }}
                    </p>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>

<script>
import { getPrevPayMoreDetail } from '@/views/crm/paymentOrder/api'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'

export default {
    name: 'lookPrevPaymentDialog',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        params: {
            type: Object
        }
    },
    data () {
        return {
            prevPaymentDetail: {},
            PaymentOrderDict
        }
    },
    watch: {
        isOpen (val) {
            if (val) {
                this.getPrevPayMoreDetail()
            }
        }
    },
    methods: {
        onClose () {
            this.$emit('onClose')
        },
        async getPrevPayMoreDetail () {
            const { data } = await getPrevPayMoreDetail(this.params.paymentOrderId)
            this.prevPaymentDetail = data
        },
        goDetail (url) {
            window.open(url)
        }
    }
}
</script>

<style scoped lang="scss">
.tab-pane {
    border-bottom: 2px solid #e5e5ea;
    .row{
        display: flex;
        p{
            flex: 0 0 50%;
            line-height: 25px;
            padding: 5px 0;
        }
    }
}
ul {
    padding: 20px 0;
}
li{
    margin-bottom: 10px;

}
.body{
    display: flex;
    padding: 10px 0;
    img {
        cursor: pointer;
    }
}
.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #e5e5e5;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    color: #FFFFFF;
    margin-right: 10px;
}
.orange-main {
    color: #ff7a45;
}
.info{
    float: right;
}
.info-img {
    width: 80px;
    height: 80px;
    cursor: pointer;
}
</style>

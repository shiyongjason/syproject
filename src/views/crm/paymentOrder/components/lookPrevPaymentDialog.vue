<template>
    <el-dialog title="查看上游支付明细" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="tab-pane">
                <div class="row">
                    <p>
                        <span>应向上游支付：</span>
                        <span class="orange-main">{{ prevPaymentDetail.totalAmount }}元</span>
                    </p>
                    <p>
                        <span>上游支付形式：</span>
                        <span class="orange-main">{{ prevPaymentDetail.supplierPaymentType }}</span>
                    </p>
                </div>
                <div class="row">
                    <p>
                        <span>已向上游支付：</span>
                        <span class="orange-main">{{ prevPaymentDetail.paidAmount }}元</span>
                    </p>
                    <p>
                        <span>上游货款方式：</span>
                        <span class="orange-main">{{ prevPaymentDetail.supplierPaymentMethod }}</span>
                    </p>
                </div>
            </div>
            <ul>
                <li :key="item.id" v-for="(item,index) in prevPaymentDetail.supplierDetails">
                    <p>
                        <span class="icon">{{index}}</span>
                        <span class="label">本次上游支付：</span>
                        <span class="orange-main">{{ item.payAmount }}元</span>
                        <span class="info">{{ item.createTime }} {{ item.createBy }}（{{ item.createPhone }}）</span>
                    </p>
                    <p>
                        <span class="label">
                            支付凭证：
                        </span>
                        <img :key="subItem.fileUrl" :src="subItem.fileUrl" alt="" v-for="subItem in item.payVouchers">
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

export default {
    name: 'lookPrevPaymentDialog',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        params: {
        }
    },
    data () {
        return {
            prevPaymentDetail: {}
        }
    },
    watch: {
        async isOpen (val) {
            if (val) {
                const { data } = await getPrevPayMoreDetail(this.params.paymentOrderId)
                this.prevPaymentDetail = data
            }
        }
    }
}
</script>

<style scoped lang="scss">
.tab-pane .row{
    display: flex;
}
</style>

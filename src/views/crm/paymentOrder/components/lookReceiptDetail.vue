<template>
    <el-dialog title="查看收货明细" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="tab-pane">
                <p>
                    <span>应到货金额总计：</span>
                    <span class="orange-main">{{ receiptDetail.totalAmount }}元</span>
                </p>
                <p>
                    <span>已到货金额总计：</span>
                    <span class="orange-main">{{ receiptDetail.goodsAmount }}元</span>
                </p>
            </div>
            <ul>
                <li :key="item.id" v-for="(item,index) in receiptDetail.respGoodsDetailList">
                    <p>
                        <span class="icon">{{index}}</span>
                        <span class="label">本次到货金额：</span>
                        <span class="orange-main">{{ item.goodsAmount }}元</span>
                        <span class="info">{{ item.createTime }} {{item.createBy}}（{{ item.createPhone }}）</span>
                    </p>
                    <p>
                        <span class="label">
                            到货验收单：
                        </span>
                        <img :key="subItem.fileUrl" :src="subItem.fileUrl" alt="" v-for="subItem in item.goodsVouchers">
                    </p>
                    <p>
                        <span class="label">
                            收货备注：
                        </span>
                        {{ item.goodsRemark }}
                    </p>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>
<script>
import { getConfirmReceiptMoreDetail } from '@/views/crm/paymentOrder/api'

export default {
    name: 'lookReceiptDetail',
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
            receiptDetail: {}
        }
    },
    watch: {
        async isOpen (val) {
            if (val) {
                const { data } = await getConfirmReceiptMoreDetail(this.params.paymentOrderId)
                this.receiptDetail = data
            }
        }
    }
}
</script>

<style scoped lang="scss">
.tab-pane {
    display: flex;
}
</style>

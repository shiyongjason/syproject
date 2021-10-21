<template>
    <div class="tab-layout" :style="{'height':'calc(100vh - 210px)'}">
        <div class="upstreamPaymentInformation-info">
            <div>应向上游支付：<font style="color:#ff7a45">{{ data.totalAmount | moneyFormat}} 元</font></div>
            <div>已向上游支付：<font style="color:#ff7a45">{{ data.paidAmount | moneyFormat}} 元</font></div>
        </div>
        <div class="upstreamPaymentInformation-item" v-for="(item,index) in data.supplierDetails" :key="item.id">
            <div class="upstreamPaymentInformation-item-no">{{index+1}}</div>
            <div class="upstreamPaymentInformation-item-info">
                <div class="upstreamPaymentInformation-item-info-item">
                    <div style="width:260px"><font style="flex:0 0 125px">本次上游支付(元)：</font>
                        <i>
                            {{ item.payAmount | moneyFormat}} 元
                        </i>
                    </div>
                    <div style="width:220px"><font>支付日期：</font><i>{{item.payDate||'-'}}</i></div>
                </div>
                <div class="upstreamPaymentInformation-item-info-item">
                    <div style="width:260px"><font>操作人：</font><i>{{item.createBy?item.createBy + '(' + item.createPhone + ')':'-'}}</i></div>
                    <div style="width:220px"><font>操作时间：</font><i>{{item.createTime||'-'|momentFormat}}</i></div>
                </div>
                <!-- 支付银行：若上游支付方式为银行承兑时，展示此项；若上游支付方式为银行转账时，不展示此项。 -->
                <!-- <div class="upstreamPaymentInformation-item-info-item" v-if="data.supplierPaymentType == 2">
                    <div style="width:460px"><font>支付银行：</font><i>{{item.paymentBank||'-'}}</i></div>
                </div> -->
                <div class="upstreamPaymentInformation-item-info-item">
                    <div>
                        <font>支付凭证：</font>
                        <div class="upstreamPaymentInformation-item-info-item-img">
                            <downloadFileAddToken v-for="(jtem,jndex)  in item.payVouchers" :key="jndex" :file-name="jtem.fileName" :file-url="jtem.fileUrl" :a-link-words="jtem.fileName"  isType='main' isPreview />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RespSupplier } from '@/interface/hbp-project'
import downloadFileAddToken from '@/components/downloadFileAddToken/index.vue'

@Component({
    name: 'upstreamPaymentInformation',
    components: {
        downloadFileAddToken
    }
})
export default class LoanHandoverInformation extends Vue {
    @Prop({ default: '' }) readonly data!:RespSupplier

    mounted () {
        // console.log(this.data)
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>

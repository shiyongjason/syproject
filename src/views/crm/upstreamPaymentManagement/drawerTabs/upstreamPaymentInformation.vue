<template>
    <div class="tab-layout" :style="{'height':'calc(100vh - 210px)'}">
        <div class="upstreamPaymentInformation-info">
            <div>应向上游支付：12,000,000元</div>
            <div>已向上游支付：12,000,000元</div>
        </div>
        <div class="upstreamPaymentInformation-item">
            <div class="upstreamPaymentInformation-item-no">1</div>
            <div class="upstreamPaymentInformation-item-info">
                <div class="upstreamPaymentInformation-item-info-item">
                    <div style="width:260px"><font style="flex:0 0 125px">本次上游支付(元)：</font><i>500900000</i></div>
                    <div style="width:220px"><font>支付日期：</font><i>2021-03-15</i></div>
                </div>
                <div class="upstreamPaymentInformation-item-info-item">
                    <div style="width:260px"><font>操作人：</font><i>鲁迅(15012345678)</i></div>
                    <div style="width:220px"><font>操作时间：</font><i>2021-03-18 09:38:18</i></div>
                </div>
                <!-- 支付银行：若上游支付方式为银行承兑时，展示此项；若上游支付方式为银行转账时，不展示此项。 -->
                <div class="upstreamPaymentInformation-item-info-item">
                    <div style="width:460px"><font>支付银行：</font><i>农村商业银行232dffg5r</i></div>

                </div>
                <div class="upstreamPaymentInformation-item-info-item">
                    <div>
                        <font>支付凭证：</font>
                        <div class="upstreamPaymentInformation-item-info-item-img">
                            <em>图片001.jpg</em>
                            <em>图片001.jpg</em>
                            <em>图片001.jpg</em>
                            <em>图片001.jpg</em>
                            <em>图片001.jpg</em><em>图片001.jpg</em>
                            <em>图片001.jpg</em>
                            <em>图片001.jpg</em>
                            <em>图片001.jpg</em><em>图片001.jpg</em>
                            <em>图片001.jpg</em>
                            <em>图片001.jpg</em>
                            <em>图片001.jpg</em>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'loanHandoverInformation'
})
export default class LoanHandoverInformation extends Vue {
    @Prop({ default: '' }) readonly data:any

    mounted () {
        console.log(this.data)
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>

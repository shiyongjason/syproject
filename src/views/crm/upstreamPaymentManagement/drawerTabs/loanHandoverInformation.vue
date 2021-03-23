<template>
    <div class="tab-layout">
         <div class="tab-layout-title" style="marginTop:0"><span></span>基本信息：</div>
         <div class="info-layout">
             <div class="info-layout-item"><font>项目名称：</font><span>上海演艺城项目供暖1期上海演艺城项目供暖1期</span></div>
             <div class="info-layout-item"><font style="flex: 0 0 60px">经销商：</font><span>上海奥拓建筑安装工程有限公司上海奥拓建筑安装工程有限公司上海奥拓建筑安装工程有限公司上海奥拓建筑安装工程有限公司</span></div>
         </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">收款人名称：</font><span>上海奥拓建筑安装工程有限公司限公司</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 70px">所属分部：</font><span>南京分部</span></div>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">采购单金额：</font><span>1,234,678元</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 100px">剩余货款金额：</font><span>1,768,123元</span></div>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">支付单金额：</font><span>1,234,678元</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 100px">上游支付形式：</font><span>银行转账</span></div>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">首付款比例：</font><span>50%</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 130px">剩余货款支付周期：</font><span>6个月</span></div>
        </div>
        <!-- 货款申请信息 -->
        <div class="tab-layout-title"><span></span>货款申请信息：<font>确认人：孔明</font><font>确认时间：2021-03-11 21:06:45</font></div>
         <div class="info-layout">
             <div class="info-layout-item"><font style="flex: 0 0 130px">供应商开户行名称：</font><span>乌鲁木齐银行</span></div>
             <div class="info-layout-item"><font style="flex: 0 0 85px">银行联行号：</font><span>123475921234759212347592</span></div>
         </div>
         <div class="info-layout">
             <div class="info-layout-item"><font style="flex: 0 0 115px">供应商银行账号：</font><span>128479274283</span></div>
             <div class="info-layout-item"><font style="flex: 0 0 130px">期望上游支付日期：</font><span>2021-03-11</span></div>
         </div>
         <div class="info-layout">
             <div class="info-layout-item"><font style="flex: 0 0 70px">备注信息:</font><span>乌鲁木齐银行乌鲁木齐银行乌鲁木齐银行乌鲁木齐银行乌鲁木齐银行乌鲁木齐银行</span></div>
         </div>
         <!-- 业财风控确认信息 -->
        <div class="tab-layout-title"><span></span>业财风控确认信息：<font>确认人：孔明</font><font>确认时间：2021-03-11 21:06:45</font></div>
        <div class="info-layout">
                <span class="info-layout-span"><el-checkbox border v-model="checked">监管账户开立</el-checkbox></span>
                <span class="info-layout-span"><el-checkbox border v-model="checked">应收账款质押完成</el-checkbox></span>
                <span class="info-layout-span"><el-checkbox border v-model="checked">预付款到好享家账户</el-checkbox></span>
        </div>
        <div class="info-layout">
                <span class="info-layout-span"><el-checkbox border v-model="checked">已盖章上下游合同</el-checkbox></span>
        </div>
        <div class="info-layout">
             <div class="info-layout-item"><font style="flex: 0 0 70px">审核备注:</font><span>这是一句来自支付单审核通过时的备注。。。。。</span></div>
         </div>
        <h-button style="margin-top:20px" type="primary">确认信息</h-button>
        <!-- 资金部放款审核岗确认信息 -->
        <div class="tab-layout-title"><span></span>资金部放款审核岗确认信息：<font>确认人：孔明</font><font>确认时间：2021-03-11 21:06:45</font></div>
        <div class="info-layout">
                <span class="info-layout-span"><el-checkbox border v-model="checked">评审决议</el-checkbox></span>
                <span class="info-layout-span"><el-checkbox border v-model="checked">合同审核流程</el-checkbox></span>
                <span class="info-layout-span"><el-checkbox border v-model="checked">货款支付流程</el-checkbox></span>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 70px">审核备注:</font><span>乌鲁木齐银行乌鲁木齐银行乌鲁木齐银行乌鲁木齐银行乌鲁木齐银行乌鲁木齐</span></div>
        </div>
        <h-button style="margin-top:20px" type="primary">确认信息</h-button>
        <!-- 资金部放款操作岗 -->
        <div class="tab-layout-title"><span></span>资金部放款操作岗确认信息：<font>确认人：孔明</font><font>确认时间：2021-03-11 21:06:45</font></div>
        <div class="info-layout">
                <span class="info-layout-span"><el-checkbox border v-model="checked">开票账户信息</el-checkbox></span>
                <span class="info-layout-span"><el-checkbox border v-model="checked">合同要素</el-checkbox></span>
                <span class="info-layout-span"><el-checkbox border v-model="checked">开票凭证完整</el-checkbox></span>
        </div>
        <h-button style="margin-top:20px" type="primary">确认信息</h-button>
        <!-- 资金部放款操作岗确认后，下方展示「下载放款交接单」按钮，顶部展示出「上游支付信息」tab页签 -->
        <div><h-button style="margin-top:20px" type="primary">下载放款交接单</h-button></div>
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

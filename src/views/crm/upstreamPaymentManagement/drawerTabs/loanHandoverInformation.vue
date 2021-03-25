<template>
    <div class="tab-layout" >
         <div class="tab-layout-title" style="marginTop:0"><span></span>基本信息：</div>
         <div class="info-layout">
             <div class="info-layout-item"><font>项目名称：</font><span>{{data.projectName}}</span></div>
             <div class="info-layout-item"><font style="flex: 0 0 60px">经销商：</font><span>{{data.companyName}}</span></div>
         </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">收款人名称：</font><span>{{data.supplierCompanyName}}</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 70px">所属分部：</font><span>{{data.deptName}}</span></div>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">采购单金额：</font><span>{{ data.poAmount?filters.money(data.poAmount,2)+' 元':'-'}}</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 100px">剩余货款金额：</font><span>{{ data.noPayAmount?filters.money(data.noPayAmount,2)+' 元':'-'}}</span></div>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">支付单金额：</font><span>{{ data.applyAmount?filters.money(data.applyAmount,2)+' 元':'-'}}</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 100px">上游支付形式：</font><span>
                {{data.supplierPaymentType?'-':data.supplierPaymentType==1?'银行转帐':'银行承兑'}}
            </span></div>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">首付款比例：</font>
                <span>{{data.prePercent?data.prePercent+'%':'-'}}</span>
            </div>
            <div class="info-layout-item"><font style="flex: 0 0 130px">剩余货款支付周期：</font>
                <span>{{data.restPaymentPeriod+'个月'}}</span>
            </div>
        </div>
        <!-- 货款申请信息 -->
        <div class="tab-layout-title"><span></span>货款申请信息：<font>确认人：{{data.accountManager}}</font><font>确认时间：{{data.createTime|formatterTime}}</font></div>
         <div class="info-layout">
             <div class="info-layout-item"><font style="flex: 0 0 130px">供应商开户行名称：</font><span>{{data.supplierAccountName||'-'}}</span></div>
             <div class="info-layout-item"><font style="flex: 0 0 85px">银行联行号：</font><span>{{data.supplierBankNo||'-'}}</span></div>
         </div>
         <div class="info-layout">
             <div class="info-layout-item"><font style="flex: 0 0 115px">供应商银行账号：</font><span>{{data.supplierAccountNo||'-'}}</span></div>
             <div class="info-layout-item"><font style="flex: 0 0 130px">期望上游支付日期：</font><span>{{data.expectSupplierPaymentDate||'-'}}</span></div>
         </div>
         <div class="info-layout">
             <div class="info-layout-item"><font style="flex: 0 0 70px">备注信息:</font><span>{{data.specialRemark||'-'}}</span></div>
         </div>
         <!-- 业财风控确认信息 -->
        <div class="tab-layout-title"><span></span>业财风控确认信息：<font v-if="data.upPaymentLoanHandoverList[0].confirmBy">确认人：{{data.upPaymentLoanHandoverList[0].confirmBy}}</font><font v-if="data.upPaymentLoanHandoverList[0].confirmDate">确认时间：{{data.upPaymentLoanHandoverList[0].confirmDate|formatterTime}}</font></div>
        <div class="info-layout">
            <template v-if="data.upPaymentLoanHandoverList[0].upPaymentLoanHandoverParamList">
                <span class="info-layout-span" v-for="item in data.upPaymentLoanHandoverList[0].upPaymentLoanHandoverParamList" :key="item.id">
                    <el-checkbox border :value='true'>{{item.paramValue}}</el-checkbox>
                </span>
            </template>
        </div>
        <div class="info-layout">
             <div class="info-layout-item"><font style="flex: 0 0 70px">审核备注:</font><span>{{data.upPaymentLoanHandoverList[0].remark||'-'}}</span></div>
         </div>
        <!-- 资金部放款审核岗确认信息 -->
        <div class="tab-layout-title"><span></span>资金部放款审核岗确认信息：<font v-if="data.upPaymentLoanHandoverList[1].confirmBy">确认人：{{data.upPaymentLoanHandoverList[1].confirmBy}}</font><font v-if="data.upPaymentLoanHandoverList[1].confirmDate">确认时间：{{data.upPaymentLoanHandoverList[1].confirmDate|formatterTime}}</font></div>
        <div class="info-layout">
            <template v-if="data.upPaymentLoanHandoverList[1].upPaymentLoanHandoverParamList">
                <span class="info-layout-span" v-for="(item,index) in data.upPaymentLoanHandoverList[1].upPaymentLoanHandoverParamList" :key="item.id">
                    <el-checkbox :value='checkBox[item.paramKey]' :true-label='1' :false-label='0' border @change="(val)=>onCheckBox(item.paramKey,val,data.upPaymentLoanHandoverList[1].upPaymentLoanHandoverParamList,index)">{{item.paramValue}}</el-checkbox>
                </span>
            </template>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 70px">审核备注:</font><span>{{data.upPaymentLoanHandoverList[1].remark||'-'}}</span></div>
        </div>
        <h-button v-if="data.upPaymentLoanHandoverList[1].status==0" style="margin-top:20px" type="primary" @click="()=>onSureInfo(data.upPaymentLoanHandoverList[1].id)">确认信息</h-button>
        <!-- 资金部放款操作岗 -->
        <div class="tab-layout-title"><span></span>资金部放款操作岗确认信息：<font v-if="data.upPaymentLoanHandoverList[2].confirmBy">确认人：{{data.upPaymentLoanHandoverList[2].confirmBy}}</font><font v-if="data.upPaymentLoanHandoverList[2].confirmDate">确认时间：{{data.upPaymentLoanHandoverList[2].confirmDate|formatterTime}}</font></div>

        <div class="info-layout">
            <template v-if="data.upPaymentLoanHandoverList[2].upPaymentLoanHandoverParamList">
                <span class="info-layout-span" v-for="(item,index) in data.upPaymentLoanHandoverList[2].upPaymentLoanHandoverParamList" :key="item.id">
                    <el-checkbox :value='checkBox[data.upPaymentLoanHandoverList[2].status]' :true-label='1' :false-label='0' border @change="(val)=>onCheckBox(item.paramKey,val,data.upPaymentLoanHandoverList[2].upPaymentLoanHandoverParamList,index)">{{item.paramValue}}</el-checkbox>
                </span>
            </template>
        </div>
        <h-button v-if="data.upPaymentLoanHandoverList[2].status==0" style="margin-top:20px" type="primary" @click="()=>onSureInfo(data.upPaymentLoanHandoverList[1].id)">确认信息</h-button>
        <!-- 资金部放款操作岗确认后，下方展示「下载放款交接单」按钮，顶部展示出「上游支付信息」tab页签 -->
        <div><h-button style="margin-top:20px" type="primary">下载放款交接单</h-button></div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RespLoanHandoverInfo } from '@/interface/hbp-project'
import { onConfirmApi } from '../api/index'
import filters from '@/utils/filters'

@Component({
    name: 'loanHandoverInformation'
})
export default class LoanHandoverInformation extends Vue {
    @Prop({ default: '' }) readonly data!:RespLoanHandoverInfo
    @Prop({ default: '' }) readonly userInfo!:any
    filters=filters
    checkBox={}
    show=false

    onCheckBox (key: any, val: any, list: any[] | any, index:number) {
        if (list[index].status == 1) {
            return
        }
        // 添加每个checkBox的paramKey，没值的初始化0
        list.map(item => {
            this.checkBox[item.paramKey] = this.checkBox[item.paramKey] || 0
        })
        this.checkBox[key] = val
        console.log('checkBox', this.checkBox)
    }

    async onSureInfo (id:any) {
        console.log(this.checkBox)
        if (Object.keys(this.checkBox).length === 0) {
            this.$message.error('请先勾选确认项')
            return
        }
        let temp = true
        for (const key in this.checkBox) {
            if (!this.checkBox[key]) {
                this.$message.error('请先勾选确认项')
                temp = false
                break
            }
        }
        if (temp) {
            // await onConfirmApi({
            //     upPaymentLoanHandoverId: id,
            //     updateBy: this.userInfo.employeeName
            // })
            this.$message.success('操作成功~')
        }
    }

    mounted () {
        this.data.upPaymentLoanHandoverList.map(item => {
            item.upPaymentLoanHandoverParamList!.map(jtem => {
                jtem['status'] = item.status
                this.checkBox[jtem.paramKey!] = item.status
            })
        })
        this.$nextTick(() => {
            this.$forceUpdate()
        })
        console.log(' this.checkBox', this.checkBox)
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>

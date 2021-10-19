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
            <div class="info-layout-item"><font style="flex: 0 0 85px">采购单金额：</font><span>
                {{ data.poAmount|fundMoneyHasTail}} 元</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 100px">剩余货款金额：</font><span>
                {{ data.noPayAmount|fundMoneyHasTail}} 元</span></div>
        </div>
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 85px">支付单金额：</font><span>
                {{ data.applyAmount|fundMoneyHasTail}} 元</span></div>
            <div class="info-layout-item"><font style="flex: 0 0 100px">上游支付方式：</font><span>
                 {{paymentType.get(data.supplierPaymentType)}}
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
        <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 100px">监管账户账号：</font>
                <span>{{data.regulatorAccountNo?data.regulatorAccountNo:'-'}}</span>
            </div>
            <div class="info-layout-item"><font style="flex: 0 0 130px">监管账户名户：</font>
                <span>{{data.restPaymentPeriod+'个月'}}</span>
            </div>
        </div>
         <div class="info-layout">
            <div class="info-layout-item"><font style="flex: 0 0 120px">监管账户开户行：</font>
                <span>{{data.prePercent?data.prePercent+'%':'-'}}</span>
            </div>
        </div>
        <!-- 货款申请信息 -->
        <div class="tab-layout-title"><span></span>货款申请信息：<font>申请人：{{data.applyBy||'-'}}</font><font>申请时间：{{data.createTime|momentFormat}}</font></div>
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
         <template v-if="data.upPaymentLoanHandoverList&&data.upPaymentLoanHandoverList.length>0">
             <!-- 业财风控确认信息 -->
            <div class="tab-layout-title"><span></span>业财风控确认信息：<font v-if="data.upPaymentLoanHandoverList[0].confirmBy">确认人：{{data.upPaymentLoanHandoverList[0].confirmBy}}</font><font v-if="data.upPaymentLoanHandoverList[0].confirmTime">确认时间：{{data.upPaymentLoanHandoverList[0].confirmTime|momentFormat}}</font></div>
            <div class="info-layout">
                <template v-if="data.upPaymentLoanHandoverList[0].upPaymentLoanHandoverParamList">
                    <span class="info-layout-span" v-for="item in data.upPaymentLoanHandoverList[0].upPaymentLoanHandoverParamList" :key="item.id">
                        <el-checkbox border :value='true'>{{item.paramValue}}</el-checkbox>
                    </span>
                </template>
            </div>
            <div class="info-layout">
                <div class="info-layout-item"><font style="flex: 0 0 130px">OA货款支付编号:</font><span>{{data.oaNo||'-'}}</span></div>
                <div class="info-layout-item"><font style="flex: 0 0 70px">审核备注:</font><span>{{data.upPaymentLoanHandoverList[0].remark||'-'}}</span></div>
            </div>
            <!-- 资金部放款审核岗确认信息 -->
            <div class="tab-layout-title" v-if="hosAuthCheck(upstreamPayConfirmEx)"><span></span>资金部放款审核岗确认信息：<font v-if="data.upPaymentLoanHandoverList[1].confirmBy">确认人：{{data.upPaymentLoanHandoverList[1].confirmBy}}</font><font v-if="data.upPaymentLoanHandoverList[1].confirmTime">确认时间：{{data.upPaymentLoanHandoverList[1].confirmTime|momentFormat}}</font></div>
            <div class="info-layout" v-if="hosAuthCheck(upstreamPayConfirmEx)">
                <template v-if="data.upPaymentLoanHandoverList[1].upPaymentLoanHandoverParamList">
                    <span class="info-layout-span" v-for="(item,index) in data.upPaymentLoanHandoverList[1].upPaymentLoanHandoverParamList" :key="item.id">
                        <el-checkbox :value='checkBox[1][item.paramKey]' :true-label='1' :false-label='0' border @change="(val)=>onCheckBox(item.paramKey,val,data.upPaymentLoanHandoverList[1].upPaymentLoanHandoverParamList,index,1)">{{item.paramValue}}</el-checkbox>
                    </span>
                </template>
            </div>
            <h-button v-if="data.upPaymentLoanHandoverList[1].status==0 && hosAuthCheck(upstreamPayConfirmEx)" style="margin-top:20px" type="primary" @click="()=>onSureInfo(data.upPaymentLoanHandoverList[1].id,1)">确认信息</h-button>
            <!-- 资金部放款操作岗 -->
            <div class="tab-layout-title" v-if="hosAuthCheck(upstreamPayConfirmLoan)"><span></span>资金部放款操作岗确认信息：<font v-if="data.upPaymentLoanHandoverList[2].confirmBy">确认人：{{data.upPaymentLoanHandoverList[2].confirmBy}}</font><font v-if="data.upPaymentLoanHandoverList[2].confirmTime">确认时间：{{data.upPaymentLoanHandoverList[2].confirmTime|momentFormat}}</font></div>

            <div class="info-layout" v-if="hosAuthCheck(upstreamPayConfirmLoan)">
                <template v-if="data.upPaymentLoanHandoverList[2].upPaymentLoanHandoverParamList">
                    <span class="info-layout-span" v-for="(item,index) in data.upPaymentLoanHandoverList[2].upPaymentLoanHandoverParamList" :key="item.id">
                        <el-checkbox :value='checkBox[2][item.paramKey]' :true-label='1' :false-label='0' border @change="(val)=>onCheckBox(item.paramKey,val,data.upPaymentLoanHandoverList[2].upPaymentLoanHandoverParamList,index,2)">{{item.paramValue}}</el-checkbox>
                    </span>
                </template>
            </div>
            <!-- 前置流程（资金部放款审核岗确认信息）完成后，展示「确认信息」。 -->
            <h-button v-if="data.upPaymentLoanHandoverList[1].status==1&&data.upPaymentLoanHandoverList[2].status==0&&hosAuthCheck(upstreamPayConfirmLoan)" style="margin-top:20px" type="primary" @click="()=>onSureInfo(data.upPaymentLoanHandoverList[2].id,2)">确认信息</h-button>
            <!-- 资金部放款操作岗确认后，下方展示「下载放款交接单」按钮，顶部展示出「上游支付信息」tab页签 -->
            <div v-if="data.upPaymentLoanHandoverList[2].status==1&&hosAuthCheck(upstreamPayDown)"><h-button style="margin-top:20px" type="primary" @click="onGetSupplierDownload">下载放款交接单</h-button></div>
         </template>
    </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RespLoanHandoverInfo } from '@/interface/hbp-project'
import { onConfirmApi, getSupplierDownload } from '../api/index'
import { PAYMENTTYPE } from '../index.vue'
import { UPSTREAM_PAY_CONFIRM_EX, UPSTREAM_PAY_CONFIRM_LOAN, UPSTREAM_PAY_DOWN } from '@/utils/auth_const'

@Component({
    name: 'loanHandoverInformation'
})
export default class LoanHandoverInformation extends Vue {
    @Prop({ default: '' }) readonly data!:RespLoanHandoverInfo
    @Prop({ default: '' }) readonly userInfo!:any
    @Prop({ default: '' }) readonly paymentOrderId!:any

    upstreamPayConfirmEx = UPSTREAM_PAY_CONFIRM_EX
    upstreamPayConfirmLoan = UPSTREAM_PAY_CONFIRM_LOAN
    upstreamPayDown = UPSTREAM_PAY_DOWN

    paymentType=PAYMENTTYPE
    get checkBox () {
        let res = {}
        this.data.upPaymentLoanHandoverList.map((item, index) => {
            res[index] = {}
            item.upPaymentLoanHandoverParamList!.map(jtem => {
                jtem['status'] = item.status
                res[index][jtem.paramKey!] = item.status
            })
        })
        console.log('res: ', res)
        return res
    }

    async onGetSupplierDownload () {
        const { data } = await getSupplierDownload(this.paymentOrderId)
        window.open(data)
    }

    onCheckBox (key: string | any, val: any, list: any[] | any, index:number, checkBoxKey:number) {
        if (list[index].status == 1) {
            console.log('checkBox', this.checkBox)
            return
        }
        // 给每个checkBox添加paramKey，没值的初始化0
        list.map(item => {
            this.checkBox[checkBoxKey][item.paramKey] = this.checkBox[checkBoxKey][item.paramKey] || 0
        })
        this.checkBox[checkBoxKey][key] = val
        this.$forceUpdate()
        console.log(' this.checkBox: ', this.checkBox)
    }

    async onSureInfo (id:any, checkBoxKey:number) {
        console.log('id: ', id)

        console.log(this.checkBox[checkBoxKey])
        let temp = true
        for (const key in this.checkBox[checkBoxKey]) {
            if (!this.checkBox[checkBoxKey][key]) {
                this.$message.error('请先勾选确认项')
                temp = false
                break
            }
        }
        if (temp) {
            console.log('操作成功')
            await onConfirmApi({
                upPaymentLoanHandoverId: id,
                updateBy: this.userInfo.employeeName
            })
            this.$message.success('操作成功~')
            this.$emit('requestAgain')
        }
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>

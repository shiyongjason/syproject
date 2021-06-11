<template>
    <div class="finalApproval">
        <el-radio-group v-model="radio1">
            <el-radio-button label="评审决议内容"></el-radio-button>
            <el-radio-button label="决议修改记录"></el-radio-button>
        </el-radio-group>
        <div class="tab-layout">
            <div class="status-title">评审会决议【待提交】</div>
            <div class="status-description">（待风控完善评审决议内容后，提交钉钉审批流程）</div>
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">客户基本信息<h-button table>编辑</h-button></div>
            </div>
            <div class="item">
                <div class="item-title">企业信息：</div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;">经销商：</font>
                        <span>河南电力局设备工程公司</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 150px;">经销商客户经理：</font>
                        <span>许攸(15025572771)</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;">可代采购额度(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 150px;">剩余代采购额度(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;">经销商评级：</font>
                        <span>B</span>
                    </div>

                </div>
            </div>
            <div class="item">
                <div class="item-title">项目信息：</div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>项目名称：</font>
                        <span>山东绿地泉事业部绿地溪山境一期空气源热水器新材料科技创意谷综合楼多联机空调系统设备</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>项目合同总额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font ><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>项目评级：</font>
                        <span>B</span>
                    </div>
                </div>

            </div>
            <!--  -->
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">采购结论<h-button table>编辑</h-button></div>
            </div>
            <div class="item">
                <div class="item-title">企业信息：</div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>申请代付金额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 165px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>经销商首付款比例(%)：</font>
                        <span>100%</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>设备总额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 165px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>剩余货款支付周期：</font>
                        <span>3个月</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item" style="margin-left:10px">
                        <font style="flex:0 0 135px;">执行费率(%)：</font>
                    </div>
                </div>
                <div class="info-layout" style="margin-left:50px">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>银行承兑：</font>
                        <span>5</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>银行转账：</font>
                        <span>6</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item" style="margin-left:10px">
                        <font style="flex:0 0 135px;">采购信息：</font>
                    </div>
                </div>
                <div>
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData"
                actionWidth='375'   prevLocalName="V3.*" localName="V3.*.18">
                    </hosJoyTable>
                </div>

            </div>
        </div>

    </div>
</template>

<script lang='tsx'>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
    name: 'finalApproval',
    components: {
        hosJoyTable
    }
})
export default class FinalApproval extends Vue {
    radio1:string='评审决议内容'
    tableData:any[]=[]
    tableLabel:tableLabelProps= [
        { label: '设备品牌', prop: 'purchaseOrderNo', width: '120' },
        { label: '上游供应商', prop: 'poAmount', width: '120' },
        { label: '上游供应商类型', prop: 'status', width: '100' },
        { label: '上游支付方式', prop: 'createTime' },
        { label: '设备品类', prop: 'updateTime' }
    ]
}
</script>

<style  lang='scss' scoped>
@import "../css/finalApproval.scss";
</style>
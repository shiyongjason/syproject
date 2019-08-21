<template>
    <div class="jd-manage">
        <p v-show="isdisabled && type">已提交 {{updateTime}} {{updateUser}} </p>

        <el-collapse v-model="activeName" accordion @change="onChange">
            <el-form :model="form" :rules="rules" ref="form" label-width="160px">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="titlt-p">商业尽调评估及KPI</p>
                    </template>
                    <!--start-->
                    <p class="small-title">1、商业尽调评估</p>
                    <table class="assessmentTable">
                        <thead>
                            <tr>
                                <td class="assessmentRow">评估项</td>
                                <td class="assessmentRow">合作目标</td>
                                <td class="assessmentRow"><span class="red-word">*</span>结论</td>
                                <td class="assessmentRow">备注</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in form.dueBusinessAssessmentCreateFormList" :key=index>
                                <td>{{item.assessmentItem}}</td>
                                <td>{{item.cooperationIntention}}
                                    <i v-if="index === 1">w</i>
                                    <i v-if="index === 2">%</i>
                                    <i v-if="index === 4">%</i>
                                </td>
                                <td>
                                    <el-select v-model="item.state" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td :rowspan="form.dueBusinessAssessmentCreateFormList.length" v-if="index == 0">
                                    <el-input class="textHeight" type="textarea" row='30' placeholder="请输入内容" v-model="item.remark">
                                    </el-input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="small-title ">2、KPI(必填)</p>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="批发:零售:工程占比：" :prop="(form.wholesaleShare==''||form.wholesaleShare==null)?'wholesaleShare':(form.retailShare==''||form.retailShare==null)?'retailShare':'projectShare'">
                                <el-input class="proportionKPI" v-model="form.wholesaleShare"></el-input><span class="KPISymbol">:</span>
                                <el-input class="proportionKPI" v-model="form.retailShare"></el-input><span class="KPISymbol">:</span>
                                <el-input class="proportionKPI" v-model="form.projectShare"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="上年销售业绩：" prop="salesPerformanceLastYear">
                                <el-input v-model="form.salesPerformanceLastYear">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <p class="small-title ">3、分析报告(必填)</p>
                    <el-form-item label="风险揭示：" prop="riskDisclosure" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6" :disabled="isdisabled" placeholder="请输入内容" v-model="form.riskDisclosure"></el-input>
                    </el-form-item>
                    <el-form-item label="分析描述：" prop="analysisDescription" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6" :disabled="isdisabled" placeholder="请输入内容" v-model="form.analysisDescription"></el-input>
                    </el-form-item>
                    <!--end-->
                </el-collapse-item>
                <el-collapse-item name="2">
                    <BusinessMode />
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <p class="titlt-p">销售业绩(含税)（万元）</p>
                    </template>
                    <table class="table-title">
                        <thead>
                            <tr>
                                <td colspan="2" rowspan="2" width="120">月份</td>
                                <td colspan="2" width="120">本年度</td>
                                <td colspan="2" width="120">上年度</td>
                                <td colspan="2" width="120">上上年度</td>

                            </tr>
                            <tr>
                                <td width="120">销售</td>
                                <td width="120">占比</td>
                                <td width="120">销售</td>
                                <td width="120">占比</td>
                                <td width="120">销售</td>
                                <td width="120">占比</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in form.dueBusinessSaleCreateFormList" :key="index">
                                <td colspan="2">{{item.month}}</td>
                                <td>
                                    <template v-if="index === 0">
                                        <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="currentYearAllSales" @keyup.native="oninput('currentYearAllSales',$event)">
                                        </el-input>
                                    </template>
                                    <template v-else>
                                        <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="item.currentYearSales" @keyup.native="oninputSale(index,'currentYearSales',$event)">
                                        </el-input>
                                    </template>
                                </td>
                                <td>
                                    <template v-if="index === 0"></template>
                                    <template v-else>{{ item.currentYearSales/currentYearAllSales | keepTwoNum }}</template>
                                </td>
                                <td>
                                    <template v-if="index === 0">
                                        <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="lastYearAllSales" @keyup.native="oninput('lastYearAllSales',$event)">
                                        </el-input>
                                    </template>
                                    <template v-else>
                                        <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="item.lastYearSales" @keyup.native="oninputSale(index, 'lastYearSales', $event)">
                                        </el-input>
                                    </template>
                                </td>
                                <td>
                                    <template v-if="index === 0"></template>
                                    <template v-else>{{ item.lastYearSales/lastYearAllSales | keepTwoNum }}</template>
                                </td>
                                <td>
                                    <template v-if="index === 0">
                                        <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="lastTwoYearAllSales" @keyup.native="oninput('lastTwoYearAllSales',$event)">
                                        </el-input>
                                    </template>
                                    <template v-else>
                                        <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="item.lastTwoYearSales" @keyup.native="oninputSale(index, 'lastTwoYearSales', $event)">
                                        </el-input>
                                    </template>
                                </td>
                                <td>
                                    <template v-if="index === 0"></template>
                                    <template v-else>{{ item.lastTwoYearSales/lastTwoYearAllSales | keepTwoNum }}</template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <el-form-item label="前10个月销售是否持续下滑：" label-width="200px" class="mt20">
                        <el-select v-model="form.firstTenMonthsDown" placeholder="请选择">
                            <el-option v-for="item in firstTenMonthsDownData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template slot="title">
                        <p class="titlt-p">营销模式</p>
                    </template>
                    <el-form-item label="宣传推广渠道：" prop="checkedWays">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="form.publicityPromotionChannels" @change="handleCheckedWays">
                            <el-checkbox v-for="item in channelsList" :label="item.code" :key="item.code">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="异业合作渠道：">
                        <el-input v-model="form.interIndustryCooperation"></el-input>
                    </el-form-item>
                </el-collapse-item>
                <el-collapse-item name="5">
                    <template slot="title">
                        <p class="titlt-p">上游-供应商结构</p>
                    </template>
                    <!--start-->
                    <div class="supplier" v-for="(item,index) in form.dueBusinessSupplierCreateFormList" :key=index>
                        <i class="el-icon-circle-plus-outline pointer" v-show="!isdisabled" v-if="index==0" @click="addSupplier"></i>
                        <i class="el-icon-remove-outline pointer" @click="deleteSupplier(index)" v-show="!isdisabled" v-else></i>
                        <el-form-item label="供应商名称：" :prop="`dueBusinessSupplierCreateFormList[${index}].supplierName`" :rules="rules.supplierName">
                            <el-input v-model="item.supplierName" style="width: 90%;" :disabled="isdisabled" placeholder="供应商名称" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌:">
                            <el-input type="textarea" v-model="item.brand" style="width: 90%;" :disabled="isdisabled"></el-input>
                        </el-form-item>
                        <div class="form-cont-row mb20">
                            <div class="form-cont-col ">
                                <el-form-item label="采购金额：" :prop="`dueBusinessSupplierCreateFormList[${index}].purchaseAmount`" :rules="rules.purchaseAmount">
                                    <el-input v-model="item.purchaseAmount" :disabled="isdisabled" placeholder="采购金额"><template slot="suffix">万</template></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col ">
                                <el-form-item label="占比：" :prop="`dueBusinessSupplierCreateFormList[${index}].proportion`" :rules="rules.proportion">
                                    <el-input v-model="item.proportion" :disabled="isdisabled" placeholder="占比"><template slot="suffix">%</template></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col ">
                                <el-form-item label="是否提供合同：" :prop="`dueBusinessSupplierCreateFormList[${index}].isProvideContract`" :rules="rules.isProvideContract">
                                    <el-select v-model="item.isProvideContract" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in isProvideContractData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row mb20">
                            <div class="form-cont-col">
                                <el-form-item label="合同开始时间：">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="item.contractStartDate" :editable="false" value-format="yyyy-MM-dd" :disabled="isdisabled"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="合同结束时间：">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="item.contractEndDate" :editable="false" value-format="yyyy-MM-dd" :disabled="isdisabled"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="合同规模：">
                                    <el-input v-model="item.contractScale" :disabled="isdisabled" placeholder="请输入合同规模" maxlength="25"><template slot="suffix">万</template></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <!--end-->
                </el-collapse-item>
                <el-collapse-item name="6">
                    <template slot="title">
                        <p class="titlt-p">下游-客户结构</p>
                    </template>
                    <!--start-->
                    <div class="flex-wrap-col supplier supplierSymbol">
                        <div class="table-flex">
                            <div class="table-row">
                                <div class="table-col"><span class="red-word">*</span>客户</div>
                                <div class="table-col"><span class="red-word">*</span>品类</div>
                                <div class="table-col"><span class="red-word">*</span>品牌</div>
                                <div class="table-col"><span class="red-word">*</span>销售金额（万元）</div>
                                <div class="table-col"><span class="red-word">*</span>销售占比</div>
                                <div class="table-col">协议期开始(非必填)</div>
                                <div class="table-col">协议期结束(非必填)</div>
                                <div class="table-col">协议规模（万元）(非必填)</div>

                            </div>
                            <div class="table-row " v-for="(item,index) in form.dueBusinessCustomerCreateFormList" :key=index>
                                <div class="table-col">
                                    <el-input v-model="item.customerName" placeholder="客户" maxlength="25" :disabled="isdisabled">
                                    </el-input>
                                </div>
                                <div class="table-col">
                                    <el-select v-model="item.categoryId" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in mainCategoryData" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="table-col">
                                    <el-input v-model="item.brandName" placeholder="品牌" maxlength="25" :disabled="isdisabled">
                                    </el-input>
                                </div>
                                <div class="table-col">
                                    <el-input v-model="item.salesFee" placeholder="金额" maxlength="25" :disabled="isdisabled" @keyup.native="oninput3(index, 'salesFee', $event)">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </div>
                                <div class="table-col">
                                    <el-input v-model="item.salesProportion" placeholder="占比" maxlength="25" :disabled="isdisabled" @keyup.native="oninput3(index, 'salesProportion', $event)">
                                        <template slot="suffix">%</template>
                                    </el-input>
                                </div>
                                <div class="table-col">
                                    <el-date-picker type="date" placeholder="选择日期" :editable="false" value-format="yyyy-MM-dd" v-model="item.agreementStartDate" :disabled="isdisabled">
                                    </el-date-picker>
                                </div>
                                <div class="table-col">
                                    <el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="item.agreementEndDate" :disabled="isdisabled" value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </div>
                                <div class="table-col">
                                    <el-input v-model="item.agreementScale" placeholder="规模" maxlength="25" :disabled="isdisabled" @keyup.native="oninput3(index, 'agreementScale', $event)">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </div>
                                <i class="el-icon-circle-plus-outline pointer" v-show="!isdisabled" v-if="index==0" @click="addCustomer"></i>
                                <i class="el-icon-remove-outline pointer" v-show="!isdisabled" v-else @click="deleteCustomer(index)"></i>
                            </div>
                        </div>
                    </div>
                    <el-form-item label="是否健康:" prop="customersHealth" label-width="80px">
                        <el-select v-model="form.customersHealth" placeholder="请选择" :disabled="isdisabled">
                            <el-option v-for="item in customersHealthData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <span>（不健康：超30%的业务聚焦在1个客户上）</span>
                    <!--end-->
                </el-collapse-item>
                <el-collapse-item name="7">
                    <template slot="title">
                        <p class="titlt-p">门店/会员店</p>
                    </template>
                    <el-form-item label="自营门店数量：" placeholder="自营门店数量">
                        <el-input v-model="form.selfStoresNum"></el-input>
                    </el-form-item>
                    <el-form-item label="会员店数量：" placeholder="会员店数量">
                        <el-input v-model="form.memberShopNum"></el-input>
                    </el-form-item>
                </el-collapse-item>
                <el-collapse-item name="8">
                    <template slot="title">
                        <p class="titlt-p">竞争对手</p>
                    </template>
                    <div class="compete supplier" v-for="(item,index) in form.dueBusinessCompetitorCreateFormList" :key=index>
                        <i class="el-icon-circle-plus-outline pointer" v-show="!isdisabled" @click="addCompet" v-if="index==0"></i>
                        <i class="el-icon-remove-outline pointer" v-show="!isdisabled" v-else @click="deleteCompet(index)"></i>
                        <el-form-item label="竞争对手：" prop="competitorName " placeholder="竞争对手" maxlength="25" :disabled="isdisabled">
                            <el-input v-model="item.competitorName"></el-input>
                        </el-form-item>
                        <el-form-item label="主营业态：" prop="mainForms" placeholder="主营业态" maxlength="25" :disabled="isdisabled" class="mb20">
                            <el-input v-model="item.mainForms"></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="9">
                    <template slot="title">
                        <p class="titlt-p">新合资公司规划</p>
                    </template>
                    <el-form-item label="业务类别：" prop="dueBusinessFuturePlanCreateForm.serviceCategory">
                        <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.serviceCategory">
                            <el-checkbox v-for="item in mainCommercialData" :key="item.key" :label='item.key'>{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="经营品类：" prop="dueBusinessFuturePlanCreateForm.businessCategory">
                                <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.businessCategory">
                                    <el-checkbox label="0">冷暖</el-checkbox>
                                    <el-checkbox label="1">新风</el-checkbox>
                                    <el-checkbox label="2">净水</el-checkbox>
                                    <el-checkbox label="3">智能</el-checkbox>
                                    <el-checkbox label="4">其他</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="" prop="dueBusinessFuturePlanCreateForm.manageCategory" label-width=0>
                                <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.manageCategory" placeholder="如选择其他，请对其他进行说明" row=1 style="width: 250px;"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item label="经营品牌：" prop="dueBusinessFuturePlanCreateForm.brandManagement">
                        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.brandManagement" placeholder="请输入品牌信息" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="经营区域：" prop="dueBusinessFuturePlanCreateForm.businessProvince">
                                <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessProvince" placeholder="请选择省">
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item prop="dueBusinessFuturePlanCreateForm.businessCity">
                                <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessCity" placeholder="请选择市">
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item prop="dueBusinessFuturePlanCreateForm.businessArea">
                                <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessArea" placeholder="请选择区">
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="年销售规模：" prop="dueBusinessFuturePlanCreateForm.annualSalesScale">
                                <el-input v-model="form.dueBusinessFuturePlanCreateForm.annualSalesScale" placeholder="请输入规模">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="净利润率：" prop="dueBusinessFuturePlanCreateForm.netProfitRate">
                                <el-input v-model="form.dueBusinessFuturePlanCreateForm.netProfitRate" placeholder="请输入净利润">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item label="下游切换渠道和客户：" prop="dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers" label-width="170px">
                        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers" placeholder="请输入" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="市场推广渠道及计划：" prop="dueBusinessFuturePlanCreateForm.marketingChannelsPlans" label-width="170px">
                        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.marketingChannelsPlans" placeholder="请输入" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="资金用款需求：" prop="dueBusinessFuturePlanCreateForm.fundingRequirements">
                        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.fundingRequirements" placeholder="请输入" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="其他规划和需求：">
                        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.otherPlansNeeds" placeholder="请输入" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                </el-collapse-item>
            </el-form>
        </el-collapse>

        <div class="flex-wrap-row top20">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click="onSaveBus">保存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { getBusiness, addBusiness, putBusiness, findChannels } from '../api/index.js'
import { plusOrMinus } from '../../../utils/rules'
import { MAIN_COMMERCIAL, MAIN_CATEGORY, ISPROVIDE_CONTRACT, IS_DOWN, IS_HEALTH } from '../const'
import BusinessMode from './components/businessMode.vue'

export default {
    components: {
        BusinessMode
    },
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    },
    mounted () {
        this.applyId = this.$route.query.applyId
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.jd-manage {
    padding: 0 15px;
    table,
    tr,
    td {
        border: 1px solid #dddddd;
        text-align: center;
        line-height: 40px;
    }
    .lengthen {
        .flex-wrap-box {
            max-width: 600px;
        }
    }
}
.jd-manage {
    textarea {
        border: 1px solid #dddddd;
    }
}
table {
    border-collapse: collapse;
}

.el-checkbox {
    margin-right: 20px;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
}
.supplier {
    border: 1px solid #dcdcdc;
    position: relative;
    padding-right: 40px;
    padding-top: 25px;
    margin-bottom: 20px;
    > i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
    }
    .table-row {
        position: relative;
        &:not(:first-child) {
            border-right: none !important;
        }
        > i {
            position: absolute;
            top: 10px;
            right: -38px;
            font-size: 20px;
        }
    }
}
.flex-wrap-title {
    max-width: 200px;
    min-width: 180px;
}
.assessmentTable {
    margin: 15px;
}
.assessmentRow {
    width: 360px;
    height: 36px;
}
/deep/ .textHeight {
    textarea {
        height: 210px;
        border: 0;
    }
}
.small-title {
    margin-bottom: 10px;
}
.proportionKPI {
    width: 50px;
}
.KPISymbol {
    margin-left: 10px;
}
/deep/ .supplierSymbol .el-input {
    width: 100%;
}
</style>
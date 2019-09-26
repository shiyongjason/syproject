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
                    <template slot="title">
                        <p class="titlt-p">业务模式</p>
                    </template>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营业态1：" prop="mainBusinessFormatOneId">
                                <el-select v-model="form.mainBusinessFormatOneId" placeholder="请选择主营业态">
                                    <el-option v-for="item in mainCommercialData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="业态占比1：" prop="businessFormatOneRatio">
                                <el-input v-model="form.businessFormatOneRatio" placeholder="业态占比">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营业态2：">
                                <el-select v-model="form.mainBusinessFormatTwoId" placeholder="请选择主营业态">
                                    <el-option v-for="item in mainCommercialData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="业态占比2：">
                                <el-input v-model="form.businessFormatTwoRatio" placeholder="业态占比">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营业态3：">
                                <el-select v-model="form.mainBusinessFormatThreeId" placeholder="请选择主营业态">
                                    <el-option v-for="item in mainCommercialData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="业态占比3：">
                                <el-input v-model="form.businessFormatTwoThreeRatio" placeholder="业态占比">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品类1：" prop="mainCategoryOneId">
                                <el-select v-model="form.mainCategoryOneId" placeholder="请选择主营品类">
                                    <el-option v-for="item in mainCategoryData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重1：" prop="categoryOneSalesRatio">
                                <el-input v-model="form.categoryOneSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品类2：">
                                <el-select v-model="form.mainCategoryTwoId" placeholder="请选择主营品类">
                                    <el-option v-for="item in mainCategoryData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重2：">
                                <el-input v-model="form.categoryTwoSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品牌1：" prop="mainBrandOneName">
                                <el-input v-model="form.mainBrandOneName" placeholder="销售占比大于30%">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重1：" prop="brandOneSalesRatio">
                                <el-input v-model="form.brandOneSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品牌2：">
                                <el-input v-model="form.mainBrandTwoName" placeholder="销售占比大于30%">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重2：">
                                <el-input v-model="form.brandTwoSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品牌3：">
                                <el-input v-model="form.mainBrandThreeName" placeholder="销售占比大于30%">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重3：">
                                <el-input v-model="form.brandThreeSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
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
                                        <el-option v-for="item in cateOptions" :key="item.value" :label="item.label" :value="item.value">
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

        <div class="flex-wrap-row top20 " v-show="!isdisabled">
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
export default {
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            type: false,
            isdisabled: false,
            updateUser: '',
            updateTime: '',
            activeName: '9',
            watchTime: 0, // 监听次数
            busOptions: [{ value: '', label: '请选择' }, { value: 0, label: '零售' }, { value: 1, label: '批发' }, { value: 2, label: '工程' }],
            cateOptions: [{ value: '', label: '请选择' }, { value: 0, label: '冷暖' }, { value: 1, label: '新风' }, { value: 2, label: '智能' }, { value: 3, label: '净水' }, { value: 4, label: '冰洗' }, { value: 5, label: '黑电' }, { value: 6, label: '厨卫' }, { value: 7, label: '其他' }],
            downOptions: [{ value: -1, label: '请选择' }, { value: 0, label: '是' }, { value: 1, label: '否' }],
            options: [{ value: '', label: '请选择' }, { value: 0, label: '是' }, { value: 1, label: '否' }],
            typeOptions: [{ value: '', label: '请选择' }, { value: 0, label: '签订投资合同时切换' }, { value: 1, label: '1年内切换' }, { value: 2, label: '1年以上切换' }, { value: 3, label: '无法切换' }],
            checkAll: false,
            checkedCities: [],
            channelsList: [],
            isIndeterminate: true,
            applyId: '',
            operationNode: '', // 提交节点
            dueBusinessId: '', // 商业id
            mainBusinessFormatOneId: '',
            brandOneSalesRatio: '',
            businessFormatTwoRatio: '',
            mainBusinessFormatTwoId: '',
            mainBusinessFormatThreeId: '',
            businessFormatTwoThreeRatio: '',
            mainCategoryOneId: '',
            categoryOneSalesRatio: '',
            mainCategoryTwoId: '',
            categoryTwoSalesRatio: '',
            mainBrandOneName: '',
            mainBrandTwoName: '',
            brandTwoSalesRatio: '',
            mainBrandThreeName: '',
            brandThreeSalesRatio: '',
            businessFormatOneRatio: '',
            salesGrowthHealth: '', // 销售增长健康
            upstreamBodySwitchable: '', //
            customersHealth: '', // 是否健康
            downstreamCustomersHealth: '', // 下游客户结构健康度
            analysisDescription: '', // 分析描述
            riskDisclosure: '',
            publicityPromotionChannels: [], // 宣传推广渠道
            firstTenMonthsDown: '', // 前十个月是否下滑
            interIndustryCooperation: '', // 异业合作渠道
            dueBusinessSaleCreateFormList: [], // 12月份
            dueBusinessSupplierCreateFormList: [], // 商业尽调供应商
            dueBusinessCustomerCreateFormList: [], // 商业尽调客户结构
            memberShopNum: '',
            selfStoresNum: '',
            dueBusinessCompetitorCreateFormList: [], // 商业尽调竞争对手
            comObj: {
                competitorName: '',
                mainForms: ''
            },
            dueBusinessProxySwitchSchemeCreateFormList: [],
            proxyObj: {
                brand: '',
                expectSales: '',
                switchDate: ''
            },
            dueBusinessCustomerDemandCreateForm: {
                dueBusinessId: '', // 商业尽调id
                financialSupport: '', // 资金支持
                managementSupport: '', // 管理支持
                operationSupport: '', // 运营支持
                otherSupport: '', // 其他支持
                serviceSupport: '', // 服务支持
                supplyChainSupport: '', // 供应链支持
                trainingSupport: ''// 培训支持
            },
            dueBusinessFuturePlanCreateForm: {
                engineeringBusinessPlan: '',
                operatingPlan: '',
                other: '',
                productPlan: ''
            },
            busObj: {
                contractEndDate: '',
                contractScale: '',
                contractStartDate: '',
                dueBusinessId: '',
                isProvideContract: '',
                proportion: '',
                purchaseAmount: '',
                supplierName: ''
            },
            cusObj: {
                agreementEndDate: '',
                agreementScale: '',
                agreementStartDate: '',
                brandName: '',
                categoryId: '',
                customerName: '',
                dueBusinessId: '',
                salesFee: '',
                salesProportion: ''
            },
            nowMonth: '',
            newChannels: [],
            textarea: '',
            KPIFormData: {
                mainBusiness: ''
            },
            form: {
                analysisDescription: '',
                applyId: '',
                brandOneSalesRatio: '',
                brandThreeSalesRatio: '',
                brandTwoSalesRatio: '',
                businessFormatOneRatio: '',
                businessFormatTwoRatio: '',
                businessFormatTwoThreeRatio: '',
                categoryOneSalesRatio: '',
                categoryTwoSalesRatio: '',
                createUser: '',
                customersHealth: '',
                downstreamCustomersHealth: '',
                firstTenMonthsDown: '',
                interIndustryCooperation: '',
                mainBrandOneName: '',
                mainBrandThreeName: '',
                mainBrandTwoName: '',
                mainBusinessFormatOneId: '',
                mainBusinessFormatThreeId: '',
                mainBusinessFormatTwoId: '',
                mainCategoryOneId: '',
                mainCategoryTwoId: '',
                memberShopNum: '',
                operationNode: '',
                projectShare: '',
                publicityPromotionChannels: [],
                retailShare: '',
                riskDisclosure: '',
                salesGrowthHealth: '',
                salesPerformanceLastYear: '',
                selfStoresNum: '',
                upstreamBodySwitchable: '',
                wholesaleShare: '',
                dueBusinessAssessmentCreateFormList: [],
                dueBusinessCompetitorCreateFormList: [],
                dueBusinessCustomerCreateFormList: [],
                dueBusinessCustomerDemandCreateForm: {},
                dueBusinessFuturePlanCreateForm: {
                    serviceCategory: [],
                    businessCategory: [],
                    businessCategoryOther: '',
                    brandManagement: '',
                    businessProvince: '',
                    businessCity: '',
                    businessArea: '',
                    annualSalesScale: '',
                    netProfitRate: '',
                    downstreamSwitchChannelsCustomers: '',
                    marketingChannelsPlans: '',
                    fundingRequirements: '',
                    otherPlansNeeds: ''
                },
                dueBusinessProxySwitchSchemeCreateFormList: [],
                dueBusinessSaleCreateFormList: [],
                dueBusinessSupplierCreateFormList: []
            },
            currentYearAllSales: 0, // 今年销售总额
            lastYearAllSales: 0, // 去年销售总额
            lastTwoYearAllSales: 0, // 前年销售总额
            rules: {
                wholesaleShare: [
                    { required: true, message: '请输入批发:零售:工程占比', trigger: 'blur' }
                ],
                retailShare: [
                    { required: true, message: '请输入批发:零售:工程占比', trigger: 'blur' }
                ],
                projectShare: [
                    { required: true, message: '请输入批发:零售:工程占比', trigger: 'blur' }
                ],
                salesPerformanceLastYear: [
                    { required: true, message: '请输入上年销售业绩', trigger: 'blur' }
                ],
                riskDisclosure: [
                    { required: true, message: '请输入风险揭示', trigger: 'blur' }
                ],
                analysisDescription: [
                    { required: true, message: '请输入分析描述', trigger: 'blur' }
                ],
                mainBusinessFormatOneId: [
                    { required: true, message: '请选择主营业态', trigger: 'blur' }
                ],
                businessFormatOneRatio: [
                    { required: true, message: '请输入业态占比', trigger: 'blur' }
                ],
                mainCategoryOneId: [
                    { required: true, message: '请选择主营品类', trigger: 'blur' }
                ],
                categoryOneSalesRatio: [
                    { required: true, message: '请输入销售比重', trigger: 'blur' }
                ],
                mainBrandOneName: [
                    { required: true, message: '请输入主营品牌', trigger: 'blur' }
                ],
                brandOneSalesRatio: [
                    { required: true, message: '请输入销售比重', trigger: 'blur' }
                ],
                supplierName: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' }
                ],
                isProvideContract: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                purchaseAmount: [
                    { required: true, message: '请输入采购金额', trigger: 'blur' }
                ],
                proportion: [
                    { required: true, message: '请输入占比', trigger: 'blur' }
                ],
                health: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                switchDate: [
                    { type: 'date', required: false, message: '请选择日期', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.serviceCategory': [
                    { type: 'array', required: true, message: '请至少选择一个业务类别', trigger: 'change' }
                ],
                'dueBusinessFuturePlanCreateForm.businessCategory': [
                    { type: 'array', required: true, message: '请至少选择一个经营品类', trigger: 'change' }
                ],
                'dueBusinessFuturePlanCreateForm.manageCategory': [
                    { required: true, message: '请输入说明', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.brandManagement': [
                    { required: true, message: '请输入品牌信息', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.annualSalesScale': [
                    { required: true, message: '请输入年销售规模', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.netProfitRate': [
                    { required: true, message: '请输入净利润率', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers': [
                    { required: true, message: '请输入下游切换渠道和客户', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.marketingChannelsPlans': [
                    { required: true, message: '请输入市场推广渠道及计划', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.fundingRequirements': [
                    { required: true, message: '请输入资金用款需求', trigger: 'blur' }
                ]
            },
            mainCommercialData: MAIN_COMMERCIAL,
            mainCategoryData: MAIN_CATEGORY,
            isProvideContractData: ISPROVIDE_CONTRACT,
            firstTenMonthsDownData: IS_DOWN,
            customersHealthData: IS_HEALTH
        }
    },
    mounted () {
        this.applyId = this.$route.query.applyId
        this.getBusiness()
        this.findChannels()
        this.nowMonth = (new Date()).getMonth()
    },
    methods: {
        oninput (value, e) {
            // 通过正则过滤小数点后两位
            this[value] = plusOrMinus(e.target.value.toString())
        },
        oninput2 (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueBusinessSupplierCreateFormList[i][v] = e.target.value
        },
        oninput3 (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueBusinessCustomerCreateFormList[i][v] = e.target.value
        },
        oninput4 (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueBusinessProxySwitchSchemeCreateFormList[i][v] = e.target.value
        },
        oninputSale (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            // console.log(e.target.value)
            this.dueBusinessSaleCreateFormList[i][v] = e.target.value
            // console.log(this.dueBusinessSaleCreateFormList[i][v])
        },
        integer (v, e) {
            if (e) {
                this[v] = e.target.value.replace(/[^0-9]/g, '')
            }
        },
        // 结合change事件对失去焦点进行判断，防止输入一些无效值
        numChange (value, e) {
            e = parseFloat(e).toFixed(2)
            this[value] = e.replace(/[^0-9.-]/g, '')
        },
        onChange () {
            document.getElementsByClassName('container')[0].scrollTop = 0
        },
        vaildEmpty (value) {
            if (value !== null && value !== undefined && value !== '') {
                return true
            } else {
                return false
            }
        },
        addScheme () {
            this.dueBusinessProxySwitchSchemeCreateFormList.push({
                brand: '',
                expectSales: '',
                switchDate: ''
            })
        },
        deleteScheme (index) {
            this.dueBusinessProxySwitchSchemeCreateFormList.splice(index, 1)
        },
        addSupplier () {
            this.dueBusinessSupplierCreateFormList.push({
                contractEndDate: '',
                contractScale: '',
                contractStartDate: '',
                dueBusinessId: '',
                isProvideContract: '',
                proportion: '',
                purchaseAmount: '',
                supplierName: ''
            })
        },
        deleteSupplier (index) {
            this.dueBusinessSupplierCreateFormList.splice(index, 1)
        },
        addCustomer () {
            this.dueBusinessCustomerCreateFormList.push({
                agreementEndDate: '',
                agreementScale: '',
                agreementStartDate: '',
                brandName: '',
                categoryId: '',
                customerName: '',
                dueBusinessId: '',
                salesFee: '',
                salesProportion: ''
            })
        },
        deleteCustomer (index) {
            this.dueBusinessCustomerCreateFormList.splice(index, 1)
        },
        addCompet () {
            this.dueBusinessCompetitorCreateFormList.push({
                competitorName: '',
                mainForms: ''
            })
        },
        deleteCompet (index) {
            this.dueBusinessCompetitorCreateFormList.splice(index, 1)
        },
        async findChannels () {
            const { data } = await findChannels()
            this.channelsList = data
            this.newChannels = this.channelsList.map(val => {
                return val.code
            })
        },
        async getBusiness () {
            const { data } = await getBusiness(this.applyId)
            console.log(data.data)

            data.data.dueBusinessAssessmentCreateFormList.map((item, value) => {
                this.currentYearAllSales += +item.currentYearSales
                this.lastYearAllSales += +item.lastYearSales
                this.lastTwoYearAllSales += +item.lastTwoYearSales
            })
            this.currentYearAllSales = (this.currentYearAllSales ? this.currentYearAllSales : 0).toFixed(2)
            this.lastYearAllSales = (this.lastYearAllSales ? this.lastYearAllSales : 0).toFixed(2)
            this.lastTwoYearAllSales = (this.lastTwoYearAllSales ? this.lastTwoYearAllSales : 0).toFixed(2)

            this.id = data.data.id
            this.type = !!data.data.operationNode
            this.updateTime = data.data.updateTime
            this.updateUser = data.data.updateUser
            this.dueBusinessId = data.data.dueBusinessId
            // if (!data.data.operationNode) {
            //     this.isdisabled = (!!data.data.operationNode) || !this.roleType
            // } else {
            //     this.isdisabled = (!!data.data.operationNode)
            // }
            this.form = data.data
            this.form.dueBusinessFuturePlanCreateForm.serviceCategory = data.data.dueBusinessFuturePlanVo.serviceCategory ? data.data.dueBusinessFuturePlanVo.serviceCategory : []
            this.form.dueBusinessFuturePlanCreateForm.businessCategory = data.data.dueBusinessFuturePlanVo.businessCategory ? data.data.dueBusinessFuturePlanVo.businessCategory : []
            // this.form.dueBusinessFuturePlanCreateForm.businessCategoryOther = data.data.dueBusinessFuturePlanVo.businessCategoryOther
            // this.form.dueBusinessFuturePlanCreateForm.brandManagement = data.data.dueBusinessFuturePlanVo.brandManagement
            // this.form.dueBusinessFuturePlanCreateForm.businessProvince = data.data.dueBusinessFuturePlanVo.businessProvince
            // this.form.dueBusinessFuturePlanCreateForm.businessCity = data.data.dueBusinessFuturePlanVo.businessCity
            // this.form.dueBusinessFuturePlanCreateForm.businessArea = data.data.dueBusinessFuturePlanVo.businessArea
            // this.form.dueBusinessFuturePlanCreateForm.annualSalesScale = data.data.dueBusinessFuturePlanVo.annualSalesScale
            // this.form.dueBusinessFuturePlanCreateForm.netProfitRate = data.data.dueBusinessFuturePlanVo.netProfitRate
            // this.form.dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers = data.data.dueBusinessFuturePlanVo.downstreamSwitchChannelsCustomers
            // this.form.dueBusinessFuturePlanCreateForm.marketingChannelsPlans = data.data.dueBusinessFuturePlanVo.marketingChannelsPlans
            // this.form.dueBusinessFuturePlanCreateForm.fundingRequirements = data.data.dueBusinessFuturePlanVo.fundingRequirements
            // this.form.dueBusinessFuturePlanCreateForm.otherPlansNeeds = data.data.dueBusinessFuturePlanVo.otherPlansNeeds

            // if (data.data.publicityPromotionChannels) {
            // this.form.publicityPromotionChannels = data.data.publicityPromotionChannels.split(',')
            // }

            // this.form.publicityPromotionChannels = this.form.publicityPromotionChannels.map(Number)

            this.dueBusinessAssessmentCreateFormList = data.data.dueBusinessAssessmentVoList
            this.dueBusinessSupplierCreateFormList = data.data.dueBusinessSupplierVoList
            if (this.dueBusinessSupplierCreateFormList.length === 0) {
                this.dueBusinessSupplierCreateFormList.push(this.busObj)
            }
            this.dueBusinessCustomerCreateFormList = data.data.dueBusinessCustomerVoList
            if (this.dueBusinessCustomerCreateFormList.length === 0) {
                this.dueBusinessCustomerCreateFormList.push(this.cusObj)
            }
            this.dueBusinessCompetitorCreateFormList = data.data.dueBusinessCompetitorVoList
            if (this.dueBusinessCompetitorCreateFormList.length === 0) {
                this.dueBusinessCompetitorCreateFormList.push(this.comObj)
            }
            this.dueBusinessProxySwitchSchemeCreateFormList = data.data.dueBusinessProxySwitchSchemeVoList
            if (this.dueBusinessProxySwitchSchemeCreateFormList.length === 0) {
                this.dueBusinessProxySwitchSchemeCreateFormList.push(this.comObj)
            }
        },
        handleCheckAllChange (val) {
            this.form.publicityPromotionChannels = val ? this.newChannels : []
            this.isIndeterminate = false
        },
        handleCheckedWays (value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.newChannels.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.newChannels.length
        },
        async onSaveBus () {
            this.publicityPromotionChannels = this.checkedCities.join(',')
            this.dueBusinessSaleCreateFormList[0].currentYearSales = this.currentYearAllSales
            this.dueBusinessSaleCreateFormList[0].lastYearSales = this.lastYearAllSales
            this.dueBusinessSaleCreateFormList[0].lastTwoYearSales = this.lastTwoYearAllSales
            const formData = {
                id: this.id,
                analysisDescription: this.analysisDescription,
                applyId: this.applyId,
                brandOneSalesRatio: this.brandOneSalesRatio,
                brandThreeSalesRatio: this.brandThreeSalesRatio,
                brandTwoSalesRatio: this.brandTwoSalesRatio,
                businessFormatOneRatio: this.businessFormatOneRatio,
                businessFormatTwoRatio: this.businessFormatTwoRatio,
                businessFormatTwoThreeRatio: this.businessFormatTwoThreeRatio,
                categoryOneSalesRatio: this.categoryOneSalesRatio,
                categoryTwoSalesRatio: this.categoryTwoSalesRatio,
                createUser: this.userInfo.name,
                customersHealth: this.customersHealth,
                downstreamCustomersHealth: this.downstreamCustomersHealth,
                dueBusinessAssessmentCreateFormList: this.dueBusinessAssessmentCreateFormList,
                dueBusinessCompetitorCreateFormList: this.dueBusinessCompetitorCreateFormList,
                dueBusinessCustomerCreateFormList: this.dueBusinessCustomerCreateFormList,
                dueBusinessCustomerDemandCreateForm: this.dueBusinessCustomerDemandCreateForm,
                dueBusinessFuturePlanCreateForm: this.dueBusinessFuturePlanCreateForm,
                dueBusinessId: this.dueBusinessId,
                dueBusinessProxySwitchSchemeCreateFormList: this.dueBusinessProxySwitchSchemeCreateFormList,
                dueBusinessSaleCreateFormList: this.dueBusinessSaleCreateFormList,
                dueBusinessSupplierCreateFormList: this.dueBusinessSupplierCreateFormList,
                firstTenMonthsDown: this.firstTenMonthsDown,
                interIndustryCooperation: this.interIndustryCooperation,
                mainBrandOneName: this.mainBrandOneName,
                mainBrandThreeName: this.mainBrandThreeName,
                mainBrandTwoName: this.mainBrandTwoName,
                mainBusinessFormatOneId: this.mainBusinessFormatOneId,
                mainBusinessFormatThreeId: this.mainBusinessFormatThreeId,
                mainBusinessFormatTwoId: this.mainBusinessFormatTwoId,
                mainCategoryOneId: this.mainCategoryOneId,
                mainCategoryTwoId: this.mainCategoryTwoId,
                memberShopNum: this.memberShopNum,
                operationNode: 0,
                publicityPromotionChannels: this.publicityPromotionChannels,
                riskDisclosure: this.riskDisclosure,
                salesGrowthHealth: this.salesGrowthHealth,
                selfStoresNum: this.selfStoresNum,
                upstreamBodySwitchable: this.upstreamBodySwitchable
            }
            // console.log(formData)
            if (this.dueBusinessId) {
                await putBusiness(formData)
            } else {
                await addBusiness(formData)
            }
            this.$message({
                type: 'success',
                message: '保存成功'
            })
            this.$router.go(-1)
        },
        async onSubmit () {
            for (const i of this.form.dueBusinessAssessmentCreateFormList) {
                if (i.state === null || i.state === '') {
                    this.$message.warning('请选择尽调评估结论')
                    this.activeName = '1'
                    return false
                }
            }
            for (const i of this.form.dueBusinessCustomerCreateFormList) {
                if (i.categoryId === null || i.categoryId === '') {
                    this.$message.warning('请选择品类')
                    this.activeName = '6'
                    return false
                } else if (i.customerName === null || i.customerName === '') {
                    this.$message.warning('请输入客户名称')
                    this.activeName = '6'
                    return false
                } else if (i.brandName === null || i.brandName === '') {
                    this.$message.warning('请输入品牌')
                    this.activeName = '6'
                    return false
                } else if (i.salesFee === null || i.salesFee === '') {
                    this.$message.warning('请输入销售金额')
                    this.activeName = '6'
                    return false
                } else if (i.salesProportion === null || i.salesProportion === '') {
                    this.$message.warning('请输入销售占比')
                    this.activeName = '6'
                    return false
                }
            }
            // console.log(this.form.publicityPromotionChannels)
            // this.form.publicityPromotionChannels = this.form.publicityPromotionChannels.join(',')
            // this.form.dueBusinessFuturePlanCreateForm.businessCategory = this.form.dueBusinessFuturePlanCreateForm.businessCategory.join(',')
            // this.form.dueBusinessFuturePlanCreateForm.serviceCategory = this.form.dueBusinessFuturePlanCreateForm.serviceCategory.join(',')
            const createUser = JSON.parse(sessionStorage.getItem('user_data')).name
            const formData = {
                id: this.id,
                analysisDescription: this.form.analysisDescription,
                applyId: this.applyId,
                brandOneSalesRatio: this.form.brandOneSalesRatio,
                brandThreeSalesRatio: this.form.brandThreeSalesRatio,
                brandTwoSalesRatio: this.form.brandTwoSalesRatio,
                businessFormatOneRatio: this.form.businessFormatOneRatio,
                businessFormatTwoRatio: this.form.businessFormatTwoRatio,
                businessFormatTwoThreeRatio: this.form.businessFormatTwoThreeRatio,
                categoryOneSalesRatio: this.form.categoryOneSalesRatio,
                categoryTwoSalesRatio: this.form.categoryTwoSalesRatio,
                createUser: JSON.parse(sessionStorage.getItem('user_data')).name,
                customersHealth: this.form.customersHealth,
                downstreamCustomersHealth: this.downstreamCustomersHealth,
                dueBusinessAssessmentCreateFormList: this.form.dueBusinessAssessmentVoList,
                dueBusinessCompetitorCreateFormList: this.form.dueBusinessCompetitorVoList,
                dueBusinessCustomerCreateFormList: this.form.dueBusinessCustomerVoList,
                dueBusinessFuturePlanCreateForm: this.form.dueBusinessFuturePlanVo,
                dueBusinessId: this.dueBusinessId,
                dueBusinessSaleCreateFormList: {
                    currentYearSales: this.currentYearAllSales,
                    lastYearSales: this.lastYearAllSales,
                    lastTwoYearSales: this.lastTwoYearAllSales
                },
                dueBusinessSupplierCreateFormList: this.form.dueBusinessSupplierVoList,
                firstTenMonthsDown: this.form.firstTenMonthsDown,
                interIndustryCooperation: this.form.interIndustryCooperation,
                mainBrandOneName: this.form.mainBrandOneName,
                mainBrandThreeName: this.form.mainBrandThreeName,
                mainBrandTwoName: this.form.mainBrandTwoName,
                mainBusinessFormatOneId: this.form.mainBusinessFormatOneId,
                mainBusinessFormatThreeId: this.form.mainBusinessFormatThreeId,
                mainBusinessFormatTwoId: this.form.mainBusinessFormatTwoId,
                mainCategoryOneId: this.form.mainCategoryOneId,
                mainCategoryTwoId: this.form.mainCategoryTwoId,
                memberShopNum: this.form.memberShopNum,
                operationNode: 1,
                publicityPromotionChannels: this.form.publicityPromotionChannels,
                riskDisclosure: this.form.riskDisclosure,
                salesGrowthHealth: this.salesGrowthHealth,
                salesPerformanceLastYear: this.form.salesPerformanceLastYear,
                selfStoresNum: this.form.selfStoresNum,
                upstreamBodySwitchable: this.upstreamBodySwitchable,
                wholesaleShare: this.form.wholesaleShare,
                retailShare: this.form.retailShare,
                projectShare: this.form.projectShare
            }
            console.log(formData)
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    if (this.dueBusinessId) {
                        await putBusiness({
                            id: this.id,
                            operationNode: 1,
                            createUser: createUser,
                            ...this.form
                        })
                        this.$message.success('提交成功')
                    } else {
                        await addBusiness({
                            operationNode: 1,
                            createUser: createUser,
                            ...this.form
                        })
                        this.$message.success('提交成功')
                    }
                }
            })
            // this.publicityPromotionChannels = this.checkedCities.join(',')
            // this.dueBusinessSaleCreateFormList[0].currentYearSales = this.currentYearAllSales
            // this.dueBusinessSaleCreateFormList[0].lastYearSales = this.lastYearAllSales
            // this.dueBusinessSaleCreateFormList[0].lastTwoYearSales = this.lastTwoYearAllSales
            // this.$router.go(-1)
        }
    },
    watch: {
        'form.dueBusinessSaleCreateFormList': {
            handler (val) {
                let databaseCurrentYearAllSales
                let databaseLastYearAllSales
                let databaseLastTwoYearAllSales
                this.currentYearAllSales = 0
                this.lastYearAllSales = 0
                this.lastTwoYearAllSales = 0
                val.map((item, index) => {
                    if (index === 0) {
                        databaseCurrentYearAllSales = parseFloat(item.currentYearSales)
                        databaseLastYearAllSales = parseFloat(item.lastYearSales)
                        databaseLastTwoYearAllSales = parseFloat(item.lastTwoYearSales)
                    } else {
                        this.currentYearAllSales += parseFloat(item.currentYearSales)
                        this.lastYearAllSales += parseFloat(item.lastYearSales)
                        this.lastTwoYearAllSales += parseFloat(item.lastTwoYearSales)
                    }
                })
                this.currentYearAllSales = (this.currentYearAllSales ? this.currentYearAllSales : 0).toFixed(2)
                this.lastYearAllSales = (this.lastYearAllSales).toFixed(2)
                this.lastTwoYearAllSales = (this.lastTwoYearAllSales).toFixed(2)
                if (this.watchTime === 0) {
                    if (+this.currentYearAllSales !== databaseCurrentYearAllSales) {
                        this.currentYearAllSales = databaseCurrentYearAllSales.toFixed(2)
                    }
                    if (+this.lastYearAllSales !== databaseLastYearAllSales) {
                        this.lastYearAllSales = databaseLastYearAllSales.toFixed(2)
                    }
                    if (+this.lastTwoYearAllSales !== databaseLastTwoYearAllSales) {
                        this.lastTwoYearAllSales = databaseLastTwoYearAllSales.toFixed(2)
                    }
                }
                this.watchTime++
            },
            deep: true
        }
    },
    filters: {
        keepTwoNum: function (val) {
            if (isNaN(val)) {
                val = 0
            }
            val = val * 100
            val = Number(val)
            if (val || val === 0) {
                return val.toFixed(2) + '%'
            } else {
                return '-'
            }
        }
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
// /deep/ .el-date-editor.el-input,
// .el-date-editor.el-input__inner {
//     width: 100%;
// }
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
.KPISymbol {
    margin-left: 10px;
}
/deep/ .supplierSymbol .el-input {
    width: 100%;
}
</style>
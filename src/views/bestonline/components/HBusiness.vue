<template>
    <div class="jd-manage">
        <p v-show="isdisabled && type">已提交 {{updateTime}} {{updateUser}} </p>
        <el-collapse v-model="activeName" accordion @change="onChange">
            <el-collapse-item name="1">
                <template slot="title">
                    <p class="titlt-p">商业尽调评估及KPI</p>
                </template>
                <el-form :model="KPIForm" :rules="KPIRules" ref="KPIForm" label-width="160px">
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
                            <tr v-for="(item,index) in KPIForm.dueBusinessAssessmentCreateFormList" :key=index>
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
                                <td :rowspan="KPIForm.dueBusinessAssessmentCreateFormList.length" v-if="index == 0">
                                    <el-input class="textHeight" type="textarea" row='30' placeholder="请输入内容" v-model="textarea">
                                    </el-input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="small-title ">2、KPI(必填)</p>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="批发:零售:工程占比：" :prop="(KPIForm.wholesaleShare==''||KPIForm.wholesaleShare==null)?'wholesaleShare':(KPIForm.retailShare==''||KPIForm.retailShare==null)?'retailShare':'projectShare'">
                                <el-input class="proportionKPI" v-model="KPIForm.wholesaleShare"></el-input><span class="KPISymbol">:</span>
                                <el-input class="proportionKPI" v-model="KPIForm.retailShare"></el-input><span class="KPISymbol">:</span>
                                <el-input class="proportionKPI" v-model="KPIForm.projectShare"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="上年销售业绩：" prop="salesPerformanceLastYear">
                                <el-input v-model="KPIForm.salesPerformanceLastYear">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <p class="small-title ">3、分析报告(必填)</p>
                    <el-form-item label="风险揭示：" prop="riskDisclosure" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6" :disabled="isdisabled" placeholder="请输入内容" v-model="KPIForm.riskDisclosure"></el-input>
                    </el-form-item>
                    <el-form-item label="分析描述：" prop="analysisDescription" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6" :disabled="isdisabled" placeholder="请输入内容" v-model="KPIForm.analysisDescription"></el-input>
                    </el-form-item>
                    <!--end-->
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <p class="titlt-p">业务模式</p>
                </template>
                <el-form :model="businessmodeForm" :rules="businessmodeRules" label-width="110px">
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营业态1：" prop="mainBusinessFormatOneId">
                                <el-select v-model="businessmodeForm.mainBusinessFormatOneId" placeholder="请选择主营业态">
                                    <el-option v-for="item in mainCommercialData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="业态占比1：" prop="businessFormatOneRatio">
                                <el-input v-model="businessmodeForm.businessFormatOneRatio" placeholder="业态占比">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营业态2：">
                                <el-select v-model="businessmodeForm.mainBusinessFormatTwoId" placeholder="请选择主营业态">
                                    <el-option v-for="item in mainCommercialData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="业态占比2：">
                                <el-input v-model="businessmodeForm.businessFormatTwoRatio" placeholder="业态占比">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营业态3：">
                                <el-select v-model="businessmodeForm.mainBusinessFormatThreeId" placeholder="请选择主营业态">
                                    <el-option v-for="item in mainCommercialData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="业态占比3：">
                                <el-input v-model="businessmodeForm.businessFormatTwoThreeRatio" placeholder="业态占比">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品类1：" prop="mainCategoryOneId">
                                <el-select v-model="businessmodeForm.mainCategoryOneId" placeholder="请选择主营品类">
                                    <el-option v-for="item in mainCategoryData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重1：" prop="salesProportion">
                                <el-input v-model="businessmodeForm.categoryOneSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品类2：">
                                <el-select v-model="businessmodeForm.mainCategoryTwoId" placeholder="请选择主营品类">
                                    <el-option v-for="item in mainCategoryData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重2：">
                                <el-input v-model="businessmodeForm.categoryTwoSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品牌1：" prop="mainBrandOneName">
                                <el-input v-model="businessmodeForm.mainBrandOneName" placeholder="销售占比大于30%">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重1：" prop="brandOneSalesRatio">
                                <el-input v-model="businessmodeForm.brandOneSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品牌2：">
                                <el-input v-model="businessmodeForm.mainBrandTwoName" placeholder="销售占比大于30%">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重2：">
                                <el-input v-model="businessmodeForm.brandTwoSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="主营品牌3：">
                                <el-input v-model="businessmodeForm.mainBrandThreeName" placeholder="销售占比大于30%">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="销售比重3：">
                                <el-input v-model="businessmodeForm.brandThreeSalesRatio" placeholder="销售比重">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template slot="title">
                    <p class="titlt-p">销售业绩(含税)（万元）</p>
                </template>
                <el-form :model="salesForm" label-width="200px">
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
                            <tr v-for="(item,index) in dueBusinessSaleCreateFormList" :key="index">
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
                    <el-form-item label="前10个月销售是否持续下滑：" class="mt20">
                        <el-select v-model="salesForm.firstTenMonthsDown" placeholder="请选择">
                            <el-option v-for="item in firstTenMonthsDownData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template slot="title">
                    <p class="titlt-p">营销模式</p>
                </template>
                <el-form :model="marketForm" label-width="130px">
                    <el-form-item label="宣传推广渠道：" prop="checkedWays">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="marketForm.publicityPromotionChannels" @change="handleCheckedWays">
                            <el-checkbox v-for="item in channelsList" :label="item.code" :key="item.code">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="异业合作渠道：">
                        <el-input v-model="marketForm.interIndustryCooperation"></el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="5">
                <template slot="title">
                    <p class="titlt-p">上游-供应商结构</p>
                </template>
                <!--start-->
                <el-form :model="structureForm" :rules="structureRules" label-width="130px">
                    <div class="supplier" v-for="(item,index) in structureForm.dueBusinessSupplierCreateFormList" :key=index>
                        <i class="el-icon-circle-plus-outline pointer" v-show="!isdisabled" v-if="index==0" @click="addSupplier"></i>
                        <i class="el-icon-remove-outline pointer" @click="deleteSupplier(index)" v-show="!isdisabled" v-else></i>
                        <el-form-item label="供应商名称：" prop="supplierName" placeholder="供应商名称">
                            <el-input v-model="item.supplierName" style="width: 90%;"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌:">
                            <el-input type="textarea" v-model="item.brand" row=1 style="width: 90%;"></el-input>
                        </el-form-item>
                        <div class="form-cont-row mb20">
                            <div class="form-cont-col ">
                                <el-form-item label="采购金额：" prop="purchaseAmount" placeholder="采购金额">
                                    <el-input v-model="item.purchaseAmount"><template slot="suffix">万</template></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col ">
                                <el-form-item label="占比：" prop="proportion" placeholder="占比">
                                    <el-input v-model="item.proportion"><template slot="suffix">%</template></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col ">
                                <el-form-item label="是否提供合同：" prop="isProvideContract">
                                    <el-select v-model="item.isProvideContract" placeholder="请选择">
                                        <el-option v-for="item in isProvideContractData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row mb20">
                            <div class="form-cont-col">
                                <el-form-item label="合同开始时间：">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="structureForm.contractStartDate" style="width: 224px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="合同结束时间：">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="structureForm.endDate" style="width: 224px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="合同规模：" prop="contractScale" placeholder="请输入合同规模">
                                    <el-input v-model="structureForm.contractScale"><template slot="suffix">万</template></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </el-form>

                <!--end-->
            </el-collapse-item>
            <el-collapse-item name="6">
                <template slot="title">
                    <p class="titlt-p">下游-客户结构</p>
                </template>
                <!--start-->
                <el-form :model="customerForm" :rules="customerRules" label-width="100px" class="supplierSymbol">
                    <div class="flex-wrap-col supplier">
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
                            <div class="table-row " v-for="(item,index) in customerForm.dueBusinessCustomerCreateFormList" :key=index>
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
                    <el-form-item label="是否健康" prop="customersHealth">
                        <el-select v-model="customerForm.customersHealth" placeholder="请选择">
                            <el-option v-for="item in customersHealthData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <span>（不健康：超30%的业务聚焦在1个客户上）</span>
                </el-form>
                <!--end-->
            </el-collapse-item>
            <el-collapse-item name="7">
                <template slot="title">
                    <p class="titlt-p">门店/会员店</p>
                </template>
                <el-form :model="quantityForm" label-width="130px">
                    <el-form-item label="自营门店数量：" placeholder="自营门店数量">
                        <el-input v-model="quantityForm.selfStoresNum"></el-input>
                    </el-form-item>
                    <el-form-item label="会员店数量：" placeholder="会员店数量">
                        <el-input v-model="quantityForm.memberShopNum"></el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="8">
                <template slot="title">
                    <p class="titlt-p">竞争对手</p>
                </template>
                <el-form :model="competeForm" label-width="130px">
                    <div class="compete supplier" v-for="(item,index) in competeForm.dueBusinessCompetitorCreateFormList" :key=index>
                        <i class="el-icon-circle-plus-outline pointer" v-show="!isdisabled" @click="addCompet" v-if="index==0"></i>
                        <i class="el-icon-remove-outline pointer" v-show="!isdisabled" v-else @click="deleteCompet(index)"></i>
                        <el-form-item label="竞争对手：" prop="competitorName " placeholder="竞争对手" maxlength="25" :disabled="isdisabled">
                            <el-input v-model="item.competitorName"></el-input>
                        </el-form-item>
                        <el-form-item label="主营业态：" prop="mainForms" placeholder="主营业态" maxlength="25" :disabled="isdisabled" class="mb20">
                            <el-input v-model="item.mainForms"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="9">
                <template slot="title">
                    <p class="titlt-p">新合资公司规划</p>
                </template>
                <el-form :model="newplanForm" :rules="newplanRules" label-width="160px">
                    <el-form-item label="业务类别：" prop="serviceCategory">
                        <el-checkbox-group v-model="newplanForm.serviceCategory">
                            <el-checkbox v-for="item in mainCommercialData" :key="item.key" :label='item.key'>{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="经营品类：" prop="businessCategory">
                                <el-checkbox-group v-model="newplanForm.businessCategory">
                                    <el-checkbox label="0">冷暖</el-checkbox>
                                    <el-checkbox label="1">新风</el-checkbox>
                                    <el-checkbox label="2">净水</el-checkbox>
                                    <el-checkbox label="3">智能</el-checkbox>
                                    <el-checkbox label="4">其他</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="" prop="manageCategory" label-width=0>
                                <el-input type="textarea" v-model="newplanForm.manageCategory" placeholder="如选择其他，请对其他进行说明" row=1 style="width: 250px;"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item label="经营品牌：" prop="brandManagement">
                        <el-input type="textarea" v-model="newplanForm.brandManagement" placeholder="请输入品牌信息" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="经营区域：" prop="businessProvince">
                                <el-select v-model="newplanForm.businessProvince" placeholder="请选择省">
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item prop="businessCity" label-width="100px">
                                <el-select v-model="newplanForm.businessCity" placeholder="请选择市">
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item prop="businessArea" label-width="10px">
                                <el-select v-model="newplanForm.businessArea" placeholder="请选择区">
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="年销售规模：" prop="annualSalesScale">
                                <el-input v-model="newplanForm.annualSalesScale" placeholder="请输入规模">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="净利润率：" prop="netProfitRate">
                                <el-input v-model="newplanForm.netProfitRate" placeholder="请输入净利润">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item label="下游切换渠道和客户：">
                        <el-input type="textarea" v-model="newplanForm.downstreamSwitchChannelsCustomers" placeholder="请输入" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="市场推广渠道及计划：">
                        <el-input type="textarea" v-model="newplanForm.marketingChannelsPlans" placeholder="请输入" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="资金用款需求：">
                        <el-input type="textarea" v-model="newplanForm.fundingRequirements" placeholder="请输入" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="其他规划和需求：">
                        <el-input type="textarea" v-model="newplanForm.otherPlansNeeds" placeholder="请输入" row=1 style="width: 80%;"></el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
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
import { getBusiness, addBusiness, putBusiness, getChannels } from '../api/index.js'
import { mapState } from 'vuex'
import { plusOrMinus } from '../../../rules.js'
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
            activeName: '1',
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
            dueBusinessAssessmentCreateFormList: [], // 商业尽调评估
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
            currentYearAllSales: 0, // 今年销售总额
            lastYearAllSales: 0, // 去年销售总额
            lastTwoYearAllSales: 0, // 前年销售总额
            textarea: '',
            KPIFormData: {
                mainBusiness: ''
            },
            KPIForm: {
                salesPerformanceLastYear: '',
                riskDisclosure: '',
                analysisDescription: '',
                wholesaleShare: '',
                retailShare: '',
                projectShare: '',
                dueBusinessAssessmentCreateFormList: []
            },
            businessmodeForm: {
                businessProportion: '',
                mainBusinessFormatOneId: '',
                mainBusinessFormatTwoId: '',
                mainBusinessFormatThreeId: '',
                mainCategoryOneId: '',
                mainCategoryTwoId: '',
                businessFormatOneRatio: '',
                businessFormatTwoRatio: '',
                businessFormatTwoThreeRatio: '',
                categoryOneSalesRatio: '',
                categoryTwoSalesRatio: '',
                mainBrandOneName: '',
                mainBrandTwoName: '',
                mainBrandThreeName: '',
                brandOneSalesRatio: '',
                brandTwoSalesRatio: '',
                brandThreeSalesRatio: ''
            },
            structureForm: {
                supplierName: '',
                brand: '',
                purchaseAmount: '',
                proportion: '',
                isProvideContract: '',
                contractStartDate: '',
                contractEndDate: '',
                contractScale: '',
                dueBusinessSupplierCreateFormList: []
            },
            customerForm: {
                customersHealth: '',
                dueBusinessCustomerCreateFormList: []
            },
            quantityForm: {
                selfStoresNum: '',
                memberShopNum: ''

            },
            competeForm: {
                competitorName: '',
                mainForms: '',
                dueBusinessCompetitorCreateFormList: []
            },
            switchFrom: {
                brand: '',
                sales: '',
                switchDate: ''
            },
            requireFrom: {
                surpport: ''
            },
            newplanForm: {
                serviceCategory: [],
                businessCategory: [],
                brandManagement: '',
                businessProvince: '',
                businessCity: '',
                businessArea: '',
                annualSalesScale: '',
                netProfitRate: '',
                downstreamSwitchChannelsCustomers: '',
                marketingChannelsPlans: '',
                fundingRequirements: '',
                otherPlansNeeds: '',
                dueBusinessFuturePlanCreateForm: []
            },
            marketForm: {
                checkedWays: [],
                publicityPromotionChannels: [],
                interIndustryCooperation: ''
            },
            salesForm: {
                firstTenMonthsDown: ''
            },
            KPIRules: {
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
                ]
            },
            businessmodeRules: {
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
                ]
            },
            structureRules: {
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
                ]
            },
            customerRules: {
                health: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ]
            },
            switchRules: {
                switchDate: [
                    { type: 'date', required: false, message: '请选择日期', trigger: 'blur' }
                ]
            },
            newplanRules: {
                serviceCategory: [
                    { type: 'array', required: true, message: '请至少选择一个业务类别', trigger: 'change' }
                ],
                businessCategory: [
                    { type: 'array', required: true, message: '请至少选择一个经营品类', trigger: 'change' }
                ],
                brandManagement: [
                    { required: true, message: '请输入品牌信息', trigger: 'blur' }
                ],
                annualSalesScale: [
                    { required: true, message: '请输入年销售规模', trigger: 'blur' }
                ],
                netProfitRate: [
                    { required: true, message: '请输入净利润率', trigger: 'blur' }
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
        // console.log(this.roleType)
        this.applyId = this.$route.query.applyId
        this.getBusiness()
        this.getChannels()
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
        showWarnMsg (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            })
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
        async getChannels () {
            const { data } = await getChannels()
            this.channelsList = data
            this.newChannels = this.channelsList.map(val => {
                return val.code
            })
        },
        async getBusiness () {
            const { data } = await getBusiness(this.applyId)

            // console.log(data.data)
            // if (!data.data.operationNode) {
            //     this.isdisabled = (!!data.data.operationNode) || !this.roleType
            // } else {
            //     this.isdisabled = (!!data.data.operationNode)
            // }
            this.id = data.data.id
            this.type = !!data.data.operationNode
            this.updateTime = data.data.updateTime
            this.updateUser = data.data.updateUser
            this.dueBusinessId = data.data.dueBusinessId
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
            this.analysisDescription = data.data.analysisDescription
            this.dueBusinessFuturePlanCreateForm = data.data.dueBusinessFuturePlanVo
            this.dueBusinessCustomerDemandCreateForm = data.data.dueBusinessCustomerDemandVo
            this.memberShopNum = data.data.memberShopNum
            this.selfStoresNum = data.data.selfStoresNum
            this.firstTenMonthsDown = data.data.firstTenMonthsDown
            this.riskDisclosure = data.data.riskDisclosure
            if (data.data.publicityPromotionChannels) {
                this.marketForm.publicityPromotionChannels = data.data.publicityPromotionChannels.split(',')
            }
            this.marketForm.publicityPromotionChannels = this.marketForm.publicityPromotionChannels.map(Number)
            this.mainCategoryTwoId = data.data.mainCategoryTwoId
            this.mainCategoryOneId = data.data.mainCategoryOneId
            this.mainBusinessFormatTwoId = data.data.mainBusinessFormatTwoId
            this.mainBusinessFormatThreeId = data.data.mainBusinessFormatThreeId
            this.mainBusinessFormatOneId = data.data.mainBusinessFormatOneId
            this.mainBrandTwoName = data.data.mainBrandTwoName
            this.mainBrandThreeName = data.data.mainBrandThreeName
            this.mainBrandOneName = data.data.mainBrandOneName
            this.interIndustryCooperation = data.data.interIndustryCooperation
            this.dueBusinessSaleCreateFormList = data.data.dueBusinessSaleVoList
            this.salesGrowthHealth = data.data.salesGrowthHealth
            this.upstreamBodySwitchable = data.data.upstreamBodySwitchable
            this.downstreamCustomersHealth = data.data.downstreamCustomersHealth
            this.brandOneSalesRatio = data.data.brandOneSalesRatio
            this.brandThreeSalesRatio = data.data.brandThreeSalesRatio
            this.brandTwoSalesRatio = data.data.brandTwoSalesRatio
            this.businessFormatOneRatio = data.data.businessFormatOneRatio
            this.businessFormatTwoRatio = data.data.businessFormatTwoRatio
            this.businessFormatTwoThreeRatio = data.data.businessFormatTwoThreeRatio
            this.categoryOneSalesRatio = data.data.categoryOneSalesRatio
            this.categoryTwoSalesRatio = data.data.categoryTwoSalesRatio
            this.dueBusinessSaleCreateFormList.map((item, value) => {
                this.currentYearAllSales += +item.currentYearSales
                this.lastYearAllSales += +item.lastYearSales
                this.lastTwoYearAllSales += +item.lastTwoYearSales
            })
            this.currentYearAllSales = (this.currentYearAllSales ? this.currentYearAllSales : 0).toFixed(2)
            this.lastYearAllSales = (this.lastYearAllSales ? this.lastYearAllSales : 0).toFixed(2)
            this.lastTwoYearAllSales = (this.lastTwoYearAllSales ? this.lastTwoYearAllSales : 0).toFixed(2)

            this.KPIForm.riskDisclosure = data.data.riskDisclosure
            this.KPIForm.analysisDescription = data.data.analysisDescription
            this.KPIForm.salesPerformanceLastYear = data.data.salesPerformanceLastYear
            this.KPIForm.dueBusinessAssessmentCreateFormList = data.data.dueBusinessAssessmentVoList
            this.businessmodeForm.mainBusinessFormatOneId = data.data.mainBusinessFormatOneId
            this.businessmodeForm.mainBusinessFormatTwoId = data.data.mainBusinessFormatTwoId
            this.businessmodeForm.mainBusinessFormatThreeId = data.data.mainBusinessFormatThreeId
            this.businessmodeForm.mainCategoryOneId = data.data.mainCategoryOneId
            this.businessmodeForm.mainCategoryTwoId = data.data.mainCategoryTwoId
            this.businessmodeForm.businessFormatOneRatio = data.data.businessFormatOneRatio
            this.businessmodeForm.businessFormatTwoRatio = data.data.businessFormatTwoRatio
            this.businessmodeForm.businessFormatTwoThreeRatio = data.data.businessFormatTwoThreeRatio
            this.businessmodeForm.categoryOneSalesRatio = data.data.categoryOneSalesRatio
            this.businessmodeForm.categoryTwoSalesRatio = data.data.categoryTwoSalesRatio
            this.businessmodeForm.mainBrandOneName = data.data.mainBrandOneName
            this.businessmodeForm.mainBrandTwoName = data.data.mainBrandTwoName
            this.businessmodeForm.mainBrandThreeName = data.data.mainBrandThreeName
            this.businessmodeForm.brandOneSalesRatio = data.data.brandOneSalesRatio
            this.businessmodeForm.brandTwoSalesRatio = data.data.brandTwoSalesRatio
            this.businessmodeForm.brandThreeSalesRatio = data.data.brandThreeSalesRatio
            this.salesForm.firstTenMonthsDown = data.data.firstTenMonthsDown
            this.marketForm.interIndustryCooperation = data.data.interIndustryCooperation
            this.structureForm.supplierName = data.data.supplierName
            this.structureForm.brand = data.data.brand
            this.structureForm.purchaseAmount = data.data.purchaseAmount
            this.structureForm.proportion = data.data.proportion
            this.structureForm.isProvideContract = data.data.isProvideContract
            this.structureForm.contractStartDate = data.data.contractStartDate
            this.structureForm.contractEndDate = data.data.contractEndDate
            this.structureForm.contractScale = data.data.contractScale
            this.structureForm.dueBusinessSupplierCreateFormList = data.data.dueBusinessSupplierVoList
            this.customerForm.dueBusinessCustomerCreateFormList = data.data.dueBusinessCustomerVoList
            this.customerForm.customersHealth = data.data.customersHealth
            this.quantityForm.selfStoresNum = data.data.selfStoresNum
            this.quantityForm.memberShopNum = data.data.memberShopNum
            this.competeForm.competitorName = data.data.competitorName
            this.competeForm.mainForms = data.data.mainForms
            this.competeForm.dueBusinessCompetitorCreateFormList = data.data.dueBusinessCompetitorVoList
            this.newplanForm.serviceCategory = data.data.dueBusinessFuturePlanVo.serviceCategory ? data.data.dueBusinessFuturePlanVo.serviceCategory : []
            this.newplanForm.businessCategory = data.data.dueBusinessFuturePlanVo.businessCategory ? data.data.dueBusinessFuturePlanVo.businessCategory : []
            this.newplanForm.brandManagement = data.data.dueBusinessFuturePlanVo.brandManagement
            this.newplanForm.businessProvince = data.data.dueBusinessFuturePlanVo.businessProvince
            this.newplanForm.businessCity = data.data.dueBusinessFuturePlanVo.businessCity
            this.newplanForm.businessArea = data.data.dueBusinessFuturePlanVo.businessArea
            this.newplanForm.annualSalesScale = data.data.dueBusinessFuturePlanVo.annualSalesScale
            this.newplanForm.netProfitRate = data.data.dueBusinessFuturePlanVo.netProfitRate
            this.newplanForm.downstreamSwitchChannelsCustomers = data.data.dueBusinessFuturePlanVo.downstreamSwitchChannelsCustomers
            this.newplanForm.marketingChannelsPlans = data.data.dueBusinessFuturePlanVo.marketingChannelsPlans
            this.newplanForm.fundingRequirements = data.data.dueBusinessFuturePlanVo.fundingRequirements
            this.newplanForm.otherPlansNeeds = data.data.dueBusinessFuturePlanVo.otherPlansNeeds
            this.newplanForm.dueBusinessFuturePlanCreateForm = data.data.dueBusinessFuturePlanVo.dueBusinessFuturePlanVo
        },
        handleCheckAllChange (val) {
            // console.log(this.newChannels)
            // console.log(val)
            // console.log(this.marketForm.publicityPromotionChannels)
            this.marketForm.publicityPromotionChannels = val ? this.newChannels : []
            this.isIndeterminate = false
        },
        handleCheckedWays (value) {
            // console.log(value)
            // let checkedCount = value.length
            // this.checkAll = checkedCount === this.channelsList.length
            // this.isIndeterminate = checkedCount > 0 && checkedCount < this.channelsList.length
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
            this.KPIForm.dueBusinessAssessmentCreateFormList.map(i => {
                if (i.state === null || i.state === '') {
                    this.$message.warning('请选择尽调评估结论')
                    this.activeName = '1'
                    return false
                }
            })
            this.customerForm.dueBusinessCustomerCreateFormList.map(i => {
                if (i.categoryId === null || i.categoryId === '') {
                    this.$message.warning('请选择品类')
                    this.activeName = '6'
                    return false
                }
                if (i.customerName === null || i.customerName === '') {
                    this.$message.warning('请输入客户名称')
                    this.activeName = '6'
                    return false
                }
                if (i.brandName === null || i.brandName === '') {
                    this.$message.warning('请输入品牌')
                    this.activeName = '6'
                    return false
                }
                if (i.salesFee === null || i.salesFee === '') {
                    this.$message.warning('请输入销售金额')
                    this.activeName = '6'
                    return false
                }
                if (i.salesProportion === null || i.salesProportion === '') {
                    this.$message.warning('请输入销售占比')
                    this.activeName = '6'
                    return false
                }
            })
            this.$refs['KPIForm'].validate((valid) => {
                if (valid) {
                    this.$refs['']
                }
            })

            this.publicityPromotionChannels = this.checkedCities.join(',')
            this.dueBusinessSaleCreateFormList[0].currentYearSales = this.currentYearAllSales
            this.dueBusinessSaleCreateFormList[0].lastYearSales = this.lastYearAllSales
            this.dueBusinessSaleCreateFormList[0].lastTwoYearSales = this.lastTwoYearAllSales
            const formData = {
                id: this.id,
                analysisDescription: this.KPIForm.analysisDescription,
                applyId: this.applyId,
                brandOneSalesRatio: this.businessmodeForm.brandOneSalesRatio,
                brandThreeSalesRatio: this.businessmodeForm.brandThreeSalesRatio,
                brandTwoSalesRatio: this.businessmodeForm.brandTwoSalesRatio,
                businessFormatOneRatio: this.businessmodeForm.businessFormatOneRatio,
                businessFormatTwoRatio: this.businessmodeForm.businessFormatTwoRatio,
                businessFormatTwoThreeRatio: this.businessmodeForm.businessFormatTwoThreeRatio,
                categoryOneSalesRatio: this.businessmodeForm.categoryOneSalesRatio,
                categoryTwoSalesRatio: this.businessmodeForm.categoryTwoSalesRatio,
                createUser: this.userInfo.name,
                customersHealth: this.customerForm.customersHealth,
                downstreamCustomersHealth: this.downstreamCustomersHealth,
                dueBusinessAssessmentCreateFormList: this.KPIForm.dueBusinessAssessmentCreateFormList,
                dueBusinessCompetitorCreateFormList: this.competeForm.dueBusinessCompetitorCreateFormList,
                dueBusinessCustomerCreateFormList: this.customerForm.dueBusinessCustomerCreateFormList,
                dueBusinessFuturePlanCreateForm: this.newplanForm,
                dueBusinessId: this.dueBusinessId,
                dueBusinessSaleCreateFormList: this.dueBusinessSaleCreateFormList,
                dueBusinessSupplierCreateFormList: this.structureForm.dueBusinessSupplierCreateFormList,
                firstTenMonthsDown: this.salesForm.firstTenMonthsDown,
                interIndustryCooperation: this.marketForm.interIndustryCooperation,
                mainBrandOneName: this.businessmodeForm.mainBrandOneName,
                mainBrandThreeName: this.businessmodeForm.mainBrandThreeName,
                mainBrandTwoName: this.businessmodeForm.mainBrandTwoName,
                mainBusinessFormatOneId: this.businessmodeForm.mainBusinessFormatOneId,
                mainBusinessFormatThreeId: this.businessmodeForm.mainBusinessFormatThreeId,
                mainBusinessFormatTwoId: this.businessmodeForm.mainBusinessFormatTwoId,
                mainCategoryOneId: this.businessmodeForm.mainCategoryOneId,
                mainCategoryTwoId: this.businessmodeForm.mainCategoryTwoId,
                memberShopNum: this.quantityForm.memberShopNum,
                operationNode: 1,
                publicityPromotionChannels: this.marketForm.publicityPromotionChannels,
                riskDisclosure: this.KPIForm.riskDisclosure,
                salesGrowthHealth: this.salesGrowthHealth,
                salesPerformanceLastYear: this.KPIForm.salesPerformanceLastYear,
                selfStoresNum: this.quantityForm.selfStoresNum,
                upstreamBodySwitchable: this.upstreamBodySwitchable
            }
            console.log(formData)
            // console.log(formData)
            if (this.dueBusinessId) {
                // await putBusiness(formData)
            } else {
                // await addBusiness(formData)
            }
            // this.$message({
            //     type: 'success',
            //     message: '提交成功'
            // })
            // this.$router.go(-1)
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    watch: {
        dueBusinessSaleCreateFormList: {
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
.proportionKPI {
    width: 50px;
}
.KPISymbol {
    margin-left: 10px;
}
/deep/ .supplierSymbol.el-form .el-input {
    width: 100%;
}
</style>
<template>
    <div class="jd-manage">
        <p v-show="isdisabled && type">已提交 {{updateTime}} {{updateUser}} </p>
        <el-collapse
            v-model="activeName"
            accordion
            @change="onChange"
        >
            <el-collapse-item name="1">
                <template slot="title">
                    <p class="titlt-p">商业尽调评估及KPI</p>
                </template>
                <!--start-->
                <p class="small-title">1、商业尽调评估</p>
                <div class="table-flex">
                    <div class="table-row">
                        <div class="table-col">评估项</div>
                        <div class="table-col">合作目标</div>
                        <div class="table-col"><span class="red-span">*</span>结论(必填)</div>
                        <div class="table-col">备注</div>
                    </div>
                    <div
                        class="table-row"
                        v-for="(item,index) in dueBusinessAssessmentCreateFormList"
                        :key=index
                    >
                        <div class="table-col">{{item.assessmentItem}}</div>
                        <div class="table-col">
                            {{item.cooperationIntention}}
                            <i v-if="index === 1">w</i>
                            <i v-if="index === 2">%</i>
                            <i v-if="index === 4">%</i>
                        </div>
                        <div class="table-col">
                            <el-select
                                v-model="item.state"
                                placeholder="请选择"
                                :disabled="isdisabled"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="table-col">
                            <el-input
                                v-model="item.remark"
                                placeholder="请输入内容"
                                :disabled="isdisabled"
                                maxlength="25"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <p class="small-title ">2、KPI(必填)</p>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>销售增长健康度：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="salesGrowthHealth"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>上游主体可否切换：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="upstreamBodySwitchable"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>下游客户结构健康度：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="downstreamCustomersHealth"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="small-title ">2、分析报告(必填)</p>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box ">
                        <div class="flex-wrap-title"><span class="red-span">*</span>风险揭示：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="6"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="riskDisclosure"
                            >
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box ">
                        <div class="flex-wrap-title"><span class="red-span">*</span>分析描述：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="6"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="analysisDescription"
                            >
                            </el-input>
                        </div>
                    </div>
                </div>
                <!--end-->
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <p class="titlt-p">业务模式</p>
                </template>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>主营业态：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="mainBusinessFormatOneId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in busOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>业态占比：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="业态占比"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    @keyup.native="oninput('businessFormatOneRatio',$event)"
                                    @change="numChange('businessFormatOneRatio',$event)"
                                    v-model="businessFormatOneRatio"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">主营业态2：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="mainBusinessFormatTwoId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in busOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">业态占比2：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="业态占比"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="businessFormatTwoRatio"
                                    @keyup.native="oninput('businessFormatTwoRatio',$event)"
                                    @change="numChange('businessFormatTwoRatio',$event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">主营业态3：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="mainBusinessFormatThreeId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in busOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">业态占比3：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="业态占比"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="businessFormatTwoThreeRatio"
                                    @keyup.native="oninput('businessFormatTwoThreeRatio',$event)"
                                    @change="numChange('businessFormatTwoThreeRatio',$event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>主营品类1：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="mainCategoryOneId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in cateOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>销售比重1：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="销售比重"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="categoryOneSalesRatio"
                                    @keyup.native="oninput('categoryOneSalesRatio',$event)"
                                    @change="numChange('categoryOneSalesRatio',$event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">主营品类2：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="mainCategoryTwoId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in cateOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">销售比重2：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="销售比重"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="categoryTwoSalesRatio"
                                    @keyup.native="oninput('categoryTwoSalesRatio',$event)"
                                    @change="numChange('categoryTwoSalesRatio',$event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>主营品牌1：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="销售占比大于30%"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="mainBrandOneName"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>销售比重1：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="销售比重"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="brandOneSalesRatio"
                                    @keyup.native="oninput('brandOneSalesRatio',$event)"
                                    @change="numChange('brandOneSalesRatio',$event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">主营品牌2：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="销售占比大于30%"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="mainBrandTwoName"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">销售比重2：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="销售比重"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="brandTwoSalesRatio"
                                    @keyup.native="oninput('brandTwoSalesRatio',$event)"
                                    @change="numChange('brandTwoSalesRatio',$event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">主营品牌3：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="销售占比大于30%"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="mainBrandThreeName"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">销售比重3：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="销售比重"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="brandThreeSalesRatio"
                                    @keyup.native="oninput('brandThreeSalesRatio',$event)"
                                    @change="numChange('brandThreeSalesRatio',$event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
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
                            <td
                                colspan="2"
                                rowspan="2"
                                width="120"
                            >月份</td>
                            <td
                                colspan="2"
                                width="120"
                            >本年度</td>
                            <td
                                colspan="2"
                                width="120"
                            >上年度</td>
                            <td
                                colspan="2"
                                width="120"
                            >上上年度</td>

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
                        <!-- <tr>
                            <td colspan="2">年度合计</td>
                            <td>
                                <el-input
                                    placeholder=""
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="currentYearAllSales"
                                    @keyup.native="oninput('currentYearAllSales',$event)"
                                >
                                </el-input>
                            </td>
                            <td></td>
                            <td>
                                <el-input
                                    placeholder=""
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="lastYearAllSales"
                                    @keyup.native="oninput('lastYearAllSales',$event)"
                                >
                                </el-input>
                            </td>
                            <td></td>
                            <td>
                                <el-input
                                    placeholder=""
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="lastTwoYearAllSales"
                                    @keyup.native="oninput('lastTwoYearAllSales',$event)"
                                >
                                </el-input>
                            </td>
                            <td></td>
                        </tr> -->
                        <tr
                            v-for="(item,index) in dueBusinessSaleCreateFormList"
                            :key="index"
                        >
                            <td colspan="2">{{item.month}}</td>
                            <td>
                                <template v-if="index === 0">
                                    <el-input
                                        placeholder=""
                                        maxlength="25"
                                        :disabled="isdisabled"
                                        v-model="currentYearAllSales"
                                        @keyup.native="oninput('currentYearAllSales',$event)"
                                    >
                                    </el-input>
                                </template>
                                <template v-else>
                                    <el-input
                                        placeholder=""
                                        maxlength="25"
                                        :disabled="isdisabled"
                                        v-model="item.currentYearSales"
                                        @keyup.native="oninputSale(index,'currentYearSales',$event)"
                                    >
                                    </el-input>
                                </template>
                            </td>
                            <td>
                                <template v-if="index === 0"></template>
                                <template v-else>{{ item.currentYearSales/currentYearAllSales | keepTwoNum }}</template>
                            </td>
                            <td>
                                <template v-if="index === 0">
                                    <el-input
                                        placeholder=""
                                        maxlength="25"
                                        :disabled="isdisabled"
                                        v-model="lastYearAllSales"
                                        @keyup.native="oninput('lastYearAllSales',$event)"
                                    >
                                    </el-input>
                                </template>
                                <template v-else>
                                    <el-input
                                        placeholder=""
                                        maxlength="25"
                                        :disabled="isdisabled"
                                        v-model="item.lastYearSales"
                                        @keyup.native="oninputSale(index, 'lastYearSales', $event)"
                                    >
                                    </el-input>
                                </template>
                            </td>
                            <td>
                                <template v-if="index === 0"></template>
                                <template v-else>{{ item.lastYearSales/lastYearAllSales | keepTwoNum }}</template>
                            </td>
                            <td>
                                <template v-if="index === 0">
                                    <el-input
                                        placeholder=""
                                        maxlength="25"
                                        :disabled="isdisabled"
                                        v-model="lastTwoYearAllSales"
                                        @keyup.native="oninput('lastTwoYearAllSales',$event)"
                                    >
                                    </el-input>
                                </template>
                                <template v-else>
                                    <el-input
                                        placeholder=""
                                        maxlength="25"
                                        :disabled="isdisabled"
                                        v-model="item.lastTwoYearSales"
                                        @keyup.native="oninputSale(index, 'lastTwoYearSales', $event)"
                                    >
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
                <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box top20">
                            <div class="flex-wrap-title">
                                <!-- <span class="red-span">*</span> -->
                                前10个月销售是否持续下滑：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="firstTenMonthsDown"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in downOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template slot="title">
                    <p class="titlt-p">营销模式</p>
                </template>
                <div class="flex-wrap-col lengthen">
                    <div class="flex-wrap-row ">
                        <div
                            class="flex-wrap"
                            style="display:flex"
                        >
                            <div class="flex-wrap-title">宣传推广渠道：</div>
                            <div class="flex-wrap-cont">
                                <el-checkbox
                                    :indeterminate="isIndeterminate"
                                    v-model="checkAll"
                                    @change="handleCheckAllChange"
                                    :disabled="isdisabled"
                                >全选</el-checkbox>
                                <el-checkbox-group
                                    v-model="checkedCities"
                                    @change="handleCheckedCitiesChange"
                                >
                                    <el-checkbox
                                        v-for="item in channelsList"
                                        :label="item.code"
                                        :key="item.code"
                                        :disabled="isdisabled"
                                    >{{item.value}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">异业合作渠道：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="异业合作渠道"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="interIndustryCooperation"
                                >
                                </el-input>
                            </div>
                        </div>
                        <!-- <div class="flex-wrap-box">
                            <div class="flex-wrap-title">本年度营销投入费用：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder=""
                                    maxlength="11"
                                    :disabled="isdisabled"
                                >
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                        </div> -->
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="5">
                <template slot="title">
                    <p class="titlt-p">上游-供应商结构</p>
                </template>
                <!--start-->
                <div
                    class="flex-wrap-col supplier"
                    v-for="(item,index) in dueBusinessSupplierCreateFormList"
                    :key=index
                >
                    <i
                        class="el-icon-circle-plus-outline pointer"
                        v-show="!isdisabled"
                        v-if="index==0"
                        @click="addSupplier"
                    ></i>
                    <i
                        class="el-icon-remove-outline pointer"
                        @click="deleteSupplier(index)"
                        v-show="!isdisabled"
                        v-else
                    ></i>
                    <div class="flex-wrap-row lengthen">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>供应商名称：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="供应商名称"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.supplierName"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>采购金额：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="采购金额"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.purchaseAmount"
                                    @keyup.native="oninput2(index, 'purchaseAmount', $event)"
                                >
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>占比：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="占比"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.proportion"
                                    @keyup.native="oninput2(index, 'proportion', $event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>是否提供合同：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="item.isProvideContract"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合同开始时间：</div>
                            <div class="flex-wrap-cont">
                                <!-- <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    :editable="false"
                                    v-model="item.contractStartDate"
                                    :disabled="isdisabled"
                                >
                                </el-date-picker> -->
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    :editable="false"
                                    value-format="yyyy-MM-dd"
                                    v-model="item.contractStartDate"
                                    :disabled="isdisabled"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合同结束时间：</div>
                            <div class="flex-wrap-cont">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    :editable="false"
                                    value-format="yyyy-MM-dd"
                                    v-model="item.contractEndDate"
                                    :disabled="isdisabled"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合同规模：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合同规模"
                                    maxlength="25"
                                    v-model="item.contractScale"
                                    :disabled="isdisabled"
                                    @keyup.native="oninput2(index, 'contractScale', $event)"
                                >
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
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
                <div class="flex-wrap-col supplier">
                    <div class="table-flex">
                        <div class="table-row">
                            <div class="table-col"><span class="red-span">*</span>客户</div>
                            <div class="table-col"><span class="red-span">*</span>品类</div>
                            <div class="table-col"><span class="red-span">*</span>品牌</div>
                            <div class="table-col"><span class="red-span">*</span>销售金额（万元）</div>
                            <div class="table-col"><span class="red-span">*</span>销售占比</div>
                            <div class="table-col">协议期开始(非必填)</div>
                            <div class="table-col">协议期结束(非必填)</div>
                            <div class="table-col">协议规模（万元）(非必填)</div>

                        </div>
                        <div
                            class="table-row"
                            v-for="(item,index) in dueBusinessCustomerCreateFormList"
                            :key=index
                        >
                            <div class="table-col">
                                <el-input
                                    v-model="item.customerName"
                                    placeholder="客户"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                >
                                </el-input>
                            </div>
                            <div class="table-col">
                                <el-select
                                    v-model="item.categoryId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in cateOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="table-col">
                                <el-input
                                    v-model="item.brandName"
                                    placeholder="品牌"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                >
                                </el-input>
                            </div>
                            <div class="table-col">
                                <el-input
                                    v-model="item.salesFee"
                                    placeholder="金额"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    @keyup.native="oninput3(index, 'salesFee', $event)"
                                >
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                            <div class="table-col">
                                <el-input
                                    v-model="item.salesProportion"
                                    placeholder="占比"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    @keyup.native="oninput3(index, 'salesProportion', $event)"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                            <div class="table-col">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    :editable="false"
                                    value-format="yyyy-MM-dd"
                                    v-model="item.agreementStartDate"
                                    :disabled="isdisabled"
                                >
                                </el-date-picker>
                            </div>
                            <div class="table-col">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    :editable="false"
                                    v-model="item.agreementEndDate"
                                    :disabled="isdisabled"
                                    value-format="yyyy-MM-dd"
                                >
                                </el-date-picker>
                            </div>
                            <div class="table-col">
                                <el-input
                                    v-model="item.agreementScale"
                                    placeholder="规模"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    @keyup.native="oninput3(index, 'agreementScale', $event)"
                                >
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                            <i
                                class="el-icon-circle-plus-outline pointer"
                                v-show="!isdisabled"
                                v-if="index==0"
                                @click="addCustomer"
                            ></i>
                            <i
                                class="el-icon-remove-outline pointer"
                                v-show="!isdisabled"
                                v-else
                                @click="deleteCustomer(index)"
                            ></i>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box top20">
                            <div class="flex-wrap-title"><span class="red-span">*</span>是否健康：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="customersHealth"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end-->
            </el-collapse-item>
            <el-collapse-item name="7">
                <template slot="title">
                    <p class="titlt-p">门店/会员店</p>
                </template>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">自营门店数量：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="自营门店数量"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="selfStoresNum"
                                    @keyup.native="integer('selfStoresNum',$event)"
                                >
                                </el-input>
                            </div>
                        </div>

                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">会员店数量：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="会员店数量"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="memberShopNum"
                                    @keyup.native="integer('memberShopNum',$event)"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="8">
                <template slot="title">
                    <p class="titlt-p">竞争对手</p>
                </template>
                <div
                    class="compete supplier"
                    v-for="(item,index) in dueBusinessCompetitorCreateFormList"
                    :key=index
                >
                    <i
                        class="el-icon-circle-plus-outline pointer"
                        v-show="!isdisabled"
                        @click="addCompet"
                        v-if="index==0"
                    ></i>
                    <i
                        class="el-icon-remove-outline pointer"
                        v-show="!isdisabled"
                        v-else
                        @click="deleteCompet(index)"
                    ></i>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">竞争对手：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    v-model="item.competitorName"
                                    placeholder="竞争对手"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">主营业态：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    v-model="item.mainForms"
                                    placeholder="主营业态"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="9">
                <template slot="title">
                    <p class="titlt-p">业务主体切换计划</p>
                </template>
                <div
                    class="compete supplier"
                    v-for="(item,index) in dueBusinessProxySwitchSchemeCreateFormList"
                    :key=index
                >
                    <i
                        class="el-icon-circle-plus-outline pointer"
                        v-show="!isdisabled"
                        v-if="index==0"
                        @click="addScheme"
                        alt="新增"
                    ></i>
                    <i
                        class="el-icon-remove-outline pointer"
                        v-show="!isdisabled"
                        v-else
                        @click="deleteScheme(index)"
                        alt="新增"
                    ></i>
                    <div class="flex-wrap-col">
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">品牌：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        :disabled="isdisabled"
                                        placeholder="品牌"
                                        maxlength="25"
                                        v-model="item.brand"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">本年度预计销售：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="本年度预计销售"
                                        maxlength="25"
                                        :disabled="isdisabled"
                                        v-model="item.expectSales"
                                        @keyup.native="oninput4(index, 'expectSales', $event)"
                                    >
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">切换时间：</div>
                                <div class="flex-wrap-cont">
                                    <el-date-picker
                                        v-model="item.switchDate"
                                        type="date"
                                        :editable="false"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        :disabled="isdisabled"
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="10">
                <template slot="title">
                    <p class="titlt-p">客户需求</p>
                </template>
                <div class="flex-wrap-col lengthen">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">资金支持：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                :disabled="isdisabled"
                                placeholder=""
                                maxlength="25"
                                v-model="dueBusinessCustomerDemandCreateForm.financialSupport"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">供应链支持：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                :disabled="isdisabled"
                                placeholder=""
                                maxlength="25"
                                v-model="dueBusinessCustomerDemandCreateForm.supplyChainSupport"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">运营支持：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                :disabled="isdisabled"
                                placeholder=""
                                maxlength="25"
                                v-model="dueBusinessCustomerDemandCreateForm.operationSupport"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">服务支持：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                :disabled="isdisabled"
                                placeholder=""
                                maxlength="25"
                                v-model="dueBusinessCustomerDemandCreateForm.serviceSupport"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">培训支持：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                :disabled="isdisabled"
                                placeholder=""
                                maxlength="25"
                                v-model="dueBusinessCustomerDemandCreateForm.trainingSupport"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">管理支持：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                :disabled="isdisabled"
                                placeholder=""
                                maxlength="25"
                                v-model="dueBusinessCustomerDemandCreateForm.managementSupport"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">其他支持：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                :disabled="isdisabled"
                                placeholder=""
                                maxlength="25"
                                v-model="dueBusinessCustomerDemandCreateForm.otherSupport"
                            >
                            </el-input>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="11">
                <template slot="title">
                    <p class="titlt-p">新合资公司规划</p>
                </template>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">业务模式：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    :disabled="isdisabled"
                                    placeholder="业务模式"
                                    maxlength="25"
                                    v-model="dueBusinessFuturePlanCreateForm.productPlan"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">运作规划：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    :disabled="isdisabled"
                                    placeholder="运作规划"
                                    maxlength="25"
                                    v-model="dueBusinessFuturePlanCreateForm.engineeringBusinessPlan"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">上下游切换：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    :disabled="isdisabled"
                                    placeholder="上下游切换"
                                    maxlength="25"
                                    v-model="dueBusinessFuturePlanCreateForm.operatingPlan"
                                >
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">销售趋势：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    :disabled="isdisabled"
                                    v-model="dueBusinessFuturePlanCreateForm.other"
                                    placeholder="销售趋势"
                                    maxlength="25"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div
            class="flex-wrap-row top20 "
            v-show="!isdisabled"
        >
            <el-col
                :span="2"
                :offset="6"
            >
                <el-button
                    type="info"
                    @click="onSaveBus"
                >保存</el-button>
            </el-col>
            <el-col
                :span="2"
                :offset="1"
            >
                <el-button
                    type="primary"
                    @click="onSubmit"
                >提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { getBusiness, addBusiness, putBusiness, getChannels } from '../api/index.js'
import { mapState } from 'vuex'
import { plusOrMinus } from '../../../rules.js'
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
            cateOptions: [{ value: '', label: '请选择' }, { value: 0, label: '冷暖' }, { value: 1, label: '新风' }, { value: 2, label: '智能' }, { value: 3, label: '净水' },
                { value: 4, label: '冰洗' }, { value: 5, label: '黑电' }, { value: 6, label: '厨卫' }, { value: 7, label: '其他' }],
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
            publicityPromotionChannels: '', // 宣传推广渠道
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
            newChannels: '',
            currentYearAllSales: 0, // 今年销售总额
            lastYearAllSales: 0, // 去年销售总额
            lastTwoYearAllSales: 0 // 前年销售总额
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
            // console.log(data)
            if (!data.data.operationNode) {
                this.isdisabled = (!!data.data.operationNode) || !this.roleType
            } else {
                this.isdisabled = (!!data.data.operationNode)
            }
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
                this.checkedCities = data.data.publicityPromotionChannels.split(',')
            }
            this.checkedCities = this.checkedCities.map(Number)
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
        },
        handleCheckAllChange (val) {
            this.checkedCities = val ? this.newChannels : []
            this.isIndeterminate = false
        },
        handleCheckedCitiesChange (value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.channelsList.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.channelsList.length
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
            for (let i = 0; i < this.dueBusinessAssessmentCreateFormList.length; i++) {
                if (this.dueBusinessAssessmentCreateFormList[i].state === null || this.dueBusinessAssessmentCreateFormList[i].state === '') {
                    this.showWarnMsg('请选择尽调评估结论')
                    this.activeName = '1'
                    return false
                }
            }
            if (!this.vaildEmpty(this.salesGrowthHealth)) {
                this.showWarnMsg('请选择销售增长健康度')
                this.activeName = '1'
                return false
            }
            if (!this.vaildEmpty(this.upstreamBodySwitchable)) {
                this.showWarnMsg('请选择上游主体切换')
                this.activeName = '1'
                return false
            }
            if (!this.vaildEmpty(this.downstreamCustomersHealth)) {
                this.showWarnMsg('请选择下游客户结构健康度')
                this.activeName = '1'
                return false
            }
            if (!this.riskDisclosure) {
                this.showWarnMsg('请输入风险揭示')
                this.activeName = '1'
                return false
            }
            if (!this.analysisDescription) {
                this.showWarnMsg('请输入分析描述')
                this.activeName = '1'
                return false
            }

            if (!this.vaildEmpty(this.mainBusinessFormatOneId)) {
                this.showWarnMsg('请输入主要业态')
                this.activeName = '2'
                return false
            }
            if (!this.vaildEmpty(this.businessFormatOneRatio)) {
                this.showWarnMsg('请输入主要业态 业态占比')
                this.activeName = '2'
                return false
            }
            if (!this.vaildEmpty(this.mainCategoryOneId)) {
                this.showWarnMsg('请输入主营品类一')
                this.activeName = '2'
                return false
            }
            if (!this.vaildEmpty(this.categoryOneSalesRatio)) {
                this.showWarnMsg('请输入主营品类一销售占比')
                this.activeName = '2'
                return false
            }
            if (!this.vaildEmpty(this.mainBrandOneName)) {
                this.showWarnMsg('请输入主营品牌一名称')
                this.activeName = '2'
                return false
            }
            if (!this.vaildEmpty(this.brandOneSalesRatio)) {
                this.showWarnMsg('请输入主营品牌一销售比重1')
                this.activeName = '2'
                return false
            }

            // for (var i = 0; i < this.dueBusinessSaleCreateFormList.length; i++) {
            //     // if (!this.vaildEmpty(this.dueBusinessSaleCreateFormList[i].lastTwoYearSales)) {
            //     //     this.showWarnMsg(`请输入${this.dueBusinessSaleCreateFormList[i].month}上上年度销售额`)
            //     //     this.activeName = '3'
            //     //     return false
            //     // }
            //     if (!this.vaildEmpty(this.dueBusinessSaleCreateFormList[i].lastYearSales)) {
            //         this.showWarnMsg(`请输入${this.dueBusinessSaleCreateFormList[i].month}上年度销售额`)
            //         this.activeName = '3'
            //         return false
            //     }
            //     if (i < 4) {
            //         if (!this.vaildEmpty(this.dueBusinessSaleCreateFormList[i].currentYearSales)) {
            //             this.showWarnMsg(`请输入${this.dueBusinessSaleCreateFormList[i].month}本年度销售额`)
            //             this.activeName = '3'
            //             return false
            //         }
            //     }
            // }
            // if (!this.vaildEmpty(this.firstTenMonthsDown)) {
            //     this.showWarnMsg('请选择前十个月是否下滑')
            //     this.activeName = '3'
            //     return false
            // }
            for (let i = 0; i < this.dueBusinessSupplierCreateFormList.length; i++) {
                if (!(this.dueBusinessSupplierCreateFormList[i].supplierName && this.dueBusinessSupplierCreateFormList[i].purchaseAmount && this.dueBusinessSupplierCreateFormList[i].proportion && this.vaildEmpty(this.dueBusinessSupplierCreateFormList[i].isProvideContract))) {
                    this.showWarnMsg('请输入商业尽调供应商必填项')
                    this.activeName = '5'
                    return false
                }
                if (this.dueBusinessSupplierCreateFormList[i].contractStartDate && this.dueBusinessSupplierCreateFormList[i].contractEndDate) {
                    if (this.dueBusinessSupplierCreateFormList[i].contractStartDate >= this.dueBusinessSupplierCreateFormList[i].contractEndDate) {
                        this.showWarnMsg('合同开始时间大于合同结束时间')
                        this.activeName = '5'
                        return false
                    }
                }
            }

            for (let i = 0; i < this.dueBusinessCustomerCreateFormList.length; i++) {
                if (!(this.dueBusinessCustomerCreateFormList[i].customerName && this.vaildEmpty(this.dueBusinessCustomerCreateFormList[i].categoryId) && this.dueBusinessCustomerCreateFormList[i].brandName && this.dueBusinessCustomerCreateFormList[i].salesFee && this.dueBusinessCustomerCreateFormList[i].salesProportion)) {
                    this.showWarnMsg('请输入商业尽调客户结构必填项')
                    this.activeName = '6'
                    return false
                }
                if (this.dueBusinessCustomerCreateFormList[i].agreementStartDate && this.dueBusinessCustomerCreateFormList[i].agreementEndDate) {
                    if (this.dueBusinessCustomerCreateFormList[i].agreementStartDate >= this.dueBusinessCustomerCreateFormList[i].agreementEndDate) {
                        this.showWarnMsg('协议期开始大于协议期结束')
                        this.activeName = '6'
                        return false
                    }
                }
            }
            if (!this.vaildEmpty(this.customersHealth)) {
                this.showWarnMsg('请选择商业尽调客户健康度')
                this.activeName = '6'
                return false
            }
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
                operationNode: 1,
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
                message: '提交成功'
            })
            this.$router.go(-1)
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
                        databaseCurrentYearAllSales = item.currentYearSales
                        databaseLastYearAllSales = item.lastYearSales
                        databaseLastTwoYearAllSales = item.lastTwoYearSales
                    } else {
                        this.currentYearAllSales += +item.currentYearSales
                        this.lastYearAllSales += +item.lastYearSales
                        this.lastTwoYearAllSales += +item.lastTwoYearSales
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
    .lengthen{
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
/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%
}
</style>
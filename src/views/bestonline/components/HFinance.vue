<template>
    <div class="jd-manage">
        <p v-show="isdisabled && type">已提交 {{updateTime}} {{updateUser}} </p>
        <el-form>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="titlt-p">财务尽调评估及KPI</p>
                    </template>
                    <!--start-->
                    <el-form :model="KPIForm" :rules="KPIRules" label-width="100px">
                        <p class="small-title">1、财务尽调评估</p>
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
                                <tr v-for="(item,index) in KPIForm.assessmentList" :key=index>
                                    <td>{{item.assessmentItem}}</td>
                                    <td>{{item.cooperationTarget}}
                                        <i v-if="index === 1">w</i>
                                        <i v-if="index === 2">%</i>
                                        <i v-if="index === 4">%</i>
                                    </td>
                                    <td>
                                        <el-select v-model="item.state" placeholder="请选择" :disabled="isdisabled">
                                            <el-option v-for="i in yesNoStatus" :key="i.value" :label="i.label" :value="i.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td :rowspan="KPIForm.assessmentList.length" v-if="index == 0">
                                        <el-input class="textHeight" type="textarea" row='30' placeholder="请输入内容" v-model="textarea">
                                        </el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="small-title ">2、KPI（必填）</p>
                        <table class="assessmentTable">
                            <thead>
                                <tr>
                                    <td class="assessmentRow">-</td>
                                    <td class="assessmentRow">本年度</td>
                                    <td class="assessmentRow">上年度</td>
                                </tr>
                            </thead>
                            <tbody v-if="KPIForm.dueFinanceYearOperatingPos">
                                <tr>
                                    <td class="assessmentRow">资产负债率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="KPIForm.dueFinanceYearOperatingPos[0].assetLiabilityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="KPIForm.dueFinanceYearOperatingPos[1].assetLiabilityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">净利率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="KPIForm.dueFinanceYearOperatingPos[0].profitRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="KPIForm.dueFinanceYearOperatingPos[1].profitRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="small-title mb15">3、分析报告(必填)</p>
                        <el-form-item label="风险揭示：" prop="riskDisclosure">
                            <el-input type="textarea" style="width:600px" rows="6" :disabled="isdisabled" placeholder="请输入内容" v-model="KPIForm.riskDisclosure"></el-input>
                        </el-form-item>
                        <el-form-item label="分析描述：" prop="analysisDescription">
                            <el-input type="textarea" style="width:600px" rows="6" :disabled="isdisabled" placeholder="请输入内容" v-model="KPIForm.analysisDescription"></el-input>
                        </el-form-item>
                    </el-form>
                    <!--end-->
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <p class="titlt-p">盈利能力(必填)</p>
                    </template>

                    <el-form :model="profitForm">
                        <table class="assessmentTable">
                            <thead>
                                <tr>
                                    <td class="assessmentRow">-</td>
                                    <td class="assessmentRow">本年度</td>
                                    <td class="assessmentRow">上年度</td>
                                    <td class="assessmentRow">上上年度</td>
                                </tr>
                            </thead>
                            <tbody v-if="profitForm.dueFinanceYearOperatingPos">
                                <tr>
                                    <td class="assessmentRow">销售毛利率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[0].grossMargin">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[1].grossMargin">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[2].grossMargin">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">费率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[0].rate">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[1].rate">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[2].rate">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">净利率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[0].profitRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[1].profitRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="profitForm.dueFinanceYearOperatingPos[2].profitRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-form>
                    <!-- <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>销售毛利率：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="营业利润/营业收入" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.grossMargin" @keyup.native="oninput('grossMargin',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>费率：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.rate" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('rate',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>净利率：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.profitRatio" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('profitRatio',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div> -->
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <p class="titlt-p">费用结构</p>
                    </template>
                    <el-form :model="costForm" :rules="costRules" label-width="120px">
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="销售费用占比：">
                                    <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="costForm.salesExpensesRatio" @keyup.native="oninput('salesExpensesRatio',$event)">
                                        <template slot="suffix">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="管理费用占比：">
                                    <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="costForm.managementExpensesRatio" @keyup.native="oninput('managementExpensesRatio',$event)">
                                        <template slot="suffix">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="财务费用占比：">
                                    <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="costForm.financeExpensesRatio" @keyup.native="oninput('financeExpensesRatio',$event)">
                                        <template slot="suffix">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="费用合理性：">
                                    <el-select v-model="costForm.costRationality">
                                        <el-option v-for="item in costRationalityData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="备注：">
                                    <el-input type="textarea" style="width:600px" rows="6" :disabled="isdisabled" placeholder="请对合理性评估进行备注" v-model="costForm.costRationalityRemark"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template slot="title">
                        <p class="titlt-p">偿债能力(必填)</p>
                    </template>
                    <el-form :model="debtForm">
                        <table class="assessmentTable">
                            <thead>
                                <tr>
                                    <td class="assessmentRow">-</td>
                                    <td class="assessmentRow">本年度</td>
                                    <td class="assessmentRow">上年度</td>
                                </tr>
                            </thead>
                            <tbody v-if="debtForm.dueFinanceYearOperatingPos">
                                <tr>
                                    <td class="assessmentRow">流动比率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="debtForm.dueFinanceYearOperatingPos[0].liquidityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="debtForm.dueFinanceYearOperatingPos[1].liquidityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">速动比率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="debtForm.dueFinanceYearOperatingPos[0].quickRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="debtForm.dueFinanceYearOperatingPos[1].quickRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">现金比率</td>
                                    <td class="assessmentRow">
                                        <el-input v-model="debtForm.dueFinanceYearOperatingPos[0].cashRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="debtForm.dueFinanceYearOperatingPos[1].cashRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">资产负债率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="debtForm.dueFinanceYearOperatingPos[0].assetLiabilityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="debtForm.dueFinanceYearOperatingPos[1].assetLiabilityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <span>
                            <i class="el-icon-question" @click="onDebtDialog"></i>
                        </span>
                    </el-form>
                    <!-- <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>流动比率：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.liquidityRatio" @keyup.native="oninput('liquidityRatio',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>速动比率：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.quickRatio" @keyup.native="oninput('quickRatio',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>资产负债率：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.assetLiabilityRatio" @keyup.native="oninput('assetLiabilityRatio',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>现金比率：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.cashRatio" @keyup.native="oninput('cashRatio',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div> -->
                </el-collapse-item>
                <el-collapse-item name="5">
                    <template slot="title">
                        <p class="titlt-p">营运能力(必填)</p>
                    </template>
                    <!--start-->
                    <el-form :model="serviceForm">
                        <table class="assessmentTable">
                            <thead>
                                <tr>
                                    <td class="assessmentRow">-</td>
                                    <td class="assessmentRow">本年度</td>
                                    <td class="assessmentRow">上年度</td>
                                    <td class="assessmentRow">上上年度</td>
                                </tr>
                            </thead>
                            <tbody v-if="serviceForm.dueFinanceYearOperatingPos">
                                <tr>
                                    <td class="assessmentRow">流动比率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[0].liquidityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[1].liquidityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[2].liquidityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">速动比率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[0].quickRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[1].quickRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[2].liquidityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">现金比率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[0].cashRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[1].cashRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[2].liquidityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">资产负债率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[0].assetLiabilityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[1].assetLiabilityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="serviceForm.dueFinanceYearOperatingPos[2].liquidityRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-form>
                    <!-- <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>应收账款周转天数：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.daysOfReceivable" @keyup.native="oninput('daysOfReceivable',$event)">
                                    <template slot="suffix">天</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>库存周转天数：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.daysOfInventory" @keyup.native="oninput('daysOfInventory',$event)">
                                    <template slot="suffix">天</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>总资产周转率：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.totalAssetsTurnover" @keyup.native="oninput('totalAssetsTurnover',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>净资产收益率：</div>
                            <div class="flex-wrap-cont">
                                <el-input placeholder="" maxlength="25" :disabled="isdisabled" v-model="dueFinanceBasic.returnOnEquity" @keyup.native="oninput('returnOnEquity',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div> -->
                    <!--end-->
                </el-collapse-item>
                <el-collapse-item name="6">
                    <template slot="title">
                        <p class="titlt-p">资金风险评估(必填)</p>
                    </template>
                    <!--start-->
                    <el-form :model="capitalForm" :rules="capitalRules" label-width="220px">
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="公司借款：">
                                    <el-input v-model="dueFinanceBasic.companyDebt" placeholder="请输入金额" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('companyDebt',$event)">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="股东借款：" prop="shareholdersDebt">
                                    <el-input v-model="dueFinanceBasic.shareholdersDebt" placeholder="请输入金额" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('shareholdersDebt',$event)">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="公司向股东借款：" prop="companyBorrowsShareholders">
                                    <el-input v-model="dueFinanceBasic.companyBorrowsShareholders" placeholder="请输入金额" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('companyBorrowsShareholders',$event)">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="公司向股东借款：" prop="shareholdersBorrowsCompany">
                                    <el-input v-model="dueFinanceBasic.shareholdersBorrowsCompany" placeholder="请输入金额" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('shareholdersBorrowsCompany',$event)">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="现金流量比率：">
                                    <el-input v-model="dueFinanceBasic.cashFlowRatio" placeholder="请输入现金流量比率" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('cashFlowRatio',$event)">
                                        <template slot="suffix">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="资金风险评估：" prop="capitalRiskAssessment">
                                    <el-select v-model="dueFinanceBasic.capitalRiskAssessment" placeholder="请选择资金风险评估" :disabled="isdisabled">
                                        <el-option v-for="item in riskoptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="实际控制人及配偶经营性借款：" label-width="220px">
                                    <el-input v-model="dueFinanceBasic.shareholdersBorrowsCompany" placeholder="请输入金额" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('shareholdersBorrowsCompany',$event)">
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="个人及公司担保：">
                                    <el-input v-model="dueFinanceBasic.cashFlowRatio" placeholder="请输入比例" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('cashFlowRatio',$event)">
                                        <template slot="suffix">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                    <!-- <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>公司借款：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.companyDebt" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('companyDebt',$event)">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>股东借款：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.shareholdersDebt" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('shareholdersDebt',$event)">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>公司向股东借款：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.companyBorrowsShareholders" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('companyBorrowsShareholders',$event)">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>股东向公司借款：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.shareholdersBorrowsCompany" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('shareholdersBorrowsCompany',$event)">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">现金流量比率：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.cashFlowRatio" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('cashFlowRatio',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>资金风险评估：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="dueFinanceBasic.capitalRiskAssessment" placeholder="请选择" :disabled="isdisabled">
                                    <el-option v-for="item in riskoptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div> -->
                    <!--end-->
                </el-collapse-item>
                <el-collapse-item name="7">
                    <template slot="title">
                        <p class="titlt-p">税务合规(必填)</p>
                    </template>
                    <el-form :model="taxationForm">
                        <table class="assessmentTable">
                            <thead>
                                <tr>
                                    <td class="assessmentRow">-</td>
                                    <td class="assessmentRow">本年度</td>
                                    <td class="assessmentRow">上年度</td>
                                    <td class="assessmentRow">上上年度</td>
                                </tr>
                            </thead>
                            <tbody v-if="taxationForm.dueFinanceYearOperatingPos">
                                <tr>
                                    <td class="assessmentRow">年度纳税营业收入</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[0].annualTaxableBusinessIncome">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[1].annualTaxableBusinessIncome">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[2].annualTaxableBusinessIncome">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">纳税收入占比</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[0].taxableIncomeRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[1].taxableIncomeRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[2].taxableIncomeRatio">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="assessmentRow">税负率</td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[0].taxBearingRate">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <span class="red-word">*</span>
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[1].taxBearingRate">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                    <td class="assessmentRow">
                                        <el-input v-model="taxationForm.dueFinanceYearOperatingPos[2].taxBearingRate">
                                            <template slot="suffix">%</template>
                                        </el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-form>
                    <!-- <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>年度纳税营业收入:</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.annualTaxableBusinessIncome" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('annualTaxableBusinessIncome',$event)">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>纳税收入占比：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.taxableIncomeRatio" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('taxableIncomeRatio',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title"><span class="red-span">*</span>税负率：</div>
                            <div class="flex-wrap-cont">
                                <el-input v-model="dueFinanceBasic.taxBearingRate" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('taxBearingRate',$event)">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div> -->
                </el-collapse-item>
                <el-collapse-item name="8">
                    <template slot="title">
                        <p class="titlt-p">仓储</p>
                    </template>
                    <el-form :model="storageForm" :rules="storageRules" label-width="180px">
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="仓库地址">
                                    <el-select v-model="dueFinanceBasic.storeProvince" placeholder="省" :disabled="isdisabled" @change="onProvince">
                                        <el-option v-for="item in storeProvince" :key="item.id" :label="item.cityName" :value="item.cityId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item>
                                    <el-select v-model="dueFinanceBasic.storeCity" placeholder="市" :disabled="isdisabled" @change="onCity">
                                        <el-option v-for="item in storeCity" :key="item.id" :label="item.cityName" :value="item.cityId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item>
                                    <el-select v-model="dueFinanceBasic.storeArea" placeholder="区" :disabled="isdisabled">
                                        <el-option v-for="item in storeArea" :key="item.id" :label="item.cityName" :value="item.cityId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="详细地址：">
                                    <el-input type="textarea" style="width:1030px" rows="2" :disabled="isdisabled" placeholder="请输入详细地址" maxlength="250" v-model="dueFinanceBasic.storeAddress">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="仓库面积（㎡）：">
                                    <el-input v-model="dueFinanceBasic.storeSize" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('storeSize',$event)">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="仓库形式：">
                                    <el-select v-model="dueFinanceBasic.storeForm" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in storeOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="仓库摆放有序程度：">
                                    <el-select v-model="dueFinanceBasic.degreeOfStorageOrder" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in riskoptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="接受好享家仓库监管方式：">
                                    <el-select v-model="dueFinanceBasic.isAgreeCustody" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in yesNoStatus" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="具体监管时间：">
                                    <el-date-picker v-model="dueFinanceBasic.dateOfCustody" type="date" placeholder="选择日期" :disabled="isdisabled">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                    <!-- <div>
                    <div class="flex-wrap-col">
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">仓库地址：</div>
                                <div class="flex-wrap-cont">
                                    <el-select v-model="dueFinanceBasic.storeProvince" placeholder="省" :disabled="isdisabled" @change="onProvince">
                                        <el-option v-for="item in storeProvince" :key="item.id" :label="item.cityName" :value="item.cityId">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title"></div>
                                <div class="flex-wrap-cont">
                                    <el-select v-model="dueFinanceBasic.storeCity" placeholder="市" :disabled="isdisabled" @change="onCity">
                                        <el-option v-for="item in storeCity" :key="item.id" :label="item.cityName" :value="item.cityId">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title"></div>
                                <div class="flex-wrap-cont">
                                    <el-select v-model="dueFinanceBasic.storeArea" placeholder="区" :disabled="isdisabled">
                                        <el-option v-for="item in storeArea" :key="item.id" :label="item.cityName" :value="item.cityId">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">详细地址：</div>
                                <div class="flex-wrap-cont">
                                    <el-input type="textarea" style="width:900px" rows="2" :disabled="isdisabled" placeholder="请输入详细地址" maxlength="250" v-model="dueFinanceBasic.storeAddress">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">仓库面积（㎡）：</div>
                                <div class="flex-wrap-cont">
                                    <el-input v-model="dueFinanceBasic.storeSize" placeholder="" maxlength="25" :disabled="isdisabled" @keyup.native="oninput('storeSize',$event)">
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">仓库形式：</div>
                                <div class="flex-wrap-cont">
                                    <el-select v-model="dueFinanceBasic.storeForm" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in storeOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">仓库摆放有序程度：</div>
                                <div class="flex-wrap-cont">
                                    <el-select v-model="dueFinanceBasic.degreeOfStorageOrder" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in riskoptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">是否接受好享家托管：</div>
                                <div class="flex-wrap-cont">
                                    <el-select v-model="dueFinanceBasic.isAgreeCustody" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>

                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">具体托管时间：</div>
                                <div class="flex-wrap-cont">
                                    <el-date-picker v-model="dueFinanceBasic.dateOfCustody" type="date" placeholder="选择日期" :disabled="isdisabled">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
                </el-collapse-item>
                <el-collapse-item name="9">
                    <template slot="title">
                        <p class="titlt-p">财务委派</p>
                    </template>
                    <el-form :model="financeForm" :rules="financeRules" label-width="140px">
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="是否同意财务委派：">
                                    <el-select v-model="dueFinanceBasic.isAgreeFinancialDelegation" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in yesNoStatus" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="开始时间：">
                                    <el-date-picker v-model="dueFinanceBasic.startDateOfDelegation" type="date" placeholder="选择日期" :disabled="isdisabled">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="资金监管：">
                                    <el-select v-model="dueFinanceBasic.isAgreeFinancialDelegation" placeholder="请选择" :disabled="isdisabled">
                                        <el-option v-for="item in yesNoStatus" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="10">
                    <template slot="title">
                        <p class="titlt-p">资产负债表（必填一项）</p>
                    </template>
                    <!-- <el-button
                    type="primary"
                >批量导入</el-button>
                <el-button
                    type="primary"
                >下载模板</el-button> -->
                    <el-form :model="assetsForm" :rules="assetsRules" label-width="100px">
                        <div class="table-cont-tabs">
                            <el-tabs type="card" v-model="tabName" @tab-click="initTable">
                                <el-tab-pane label="本年度" name="nowYear"></el-tab-pane>
                                <el-tab-pane label="上年度" name="lastYear"></el-tab-pane>
                                <el-tab-pane label="上上年度" name="lastLastYear"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="编制单位：">
                                    <el-input v-model="assetsLiabilities.writer" placeholder="请输入编制单位" :disabled="isdisabled"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="时间：">
                                    <el-date-picker v-model="assetsLiabilities.recordTime" type="date" placeholder="选择日期" :disabled="isdisabled">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="单位：万">
                                </el-form-item>
                            </div>
                        </div>
                        <div class="double-table">
                            <div class="table-flex">
                                <div class="table-row">
                                    <div class="table-col table_h">资产</div>
                                    <div class="table-col table_h">期末余额</div>
                                    <div class="table-col table_h">年初余额</div>
                                </div>
                                <div class="table-row" v-for="(item,index) in assetsLiabilities.assetList" :key="index">
                                    <template v-if="index === 0 || index === 13">
                                        <div class="table-col subtitle">{{item.typeName}}</div>
                                    </template>
                                    <template v-else>
                                        <div class="table-col">{{item.typeName}}</div>
                                        <div class="table-col">
                                            <el-input v-model="item.endOrCurrent" placeholder="请输入内容" :disabled="isdisabled" maxlength="25" @keyup.native="oninputAssets('assetList', index, 'endOrCurrent', $event)">
                                                <template slot="suffix">万</template>
                                            </el-input>
                                        </div>
                                        <div class="table-col">
                                            <el-input v-model="item.beginOrPrior" placeholder="请输入内容" :disabled="isdisabled" maxlength="25" @keyup.native="oninputAssets('assetList', index, 'beginOrPrior', $event)">
                                                <template slot="suffix">万</template>
                                            </el-input>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="table-flex">
                                <div class="table-row">
                                    <div class="table-col table_h">负债和所有者权益（或股东权益）</div>
                                    <div class="table-col table_h">期末余额</div>
                                    <div class="table-col table_h">年初余额</div>
                                </div>
                                <div class="table-row" v-for="(item,index) in assetsLiabilities.liabilitiesList" :key="index">
                                    <template v-if="index === 0 || index === 14 || index === 24">
                                        <div class="table-col subtitle">{{item.typeName}}</div>
                                    </template>
                                    <template v-else>
                                        <div class="table-col">{{item.typeName}}</div>
                                        <div class="table-col">
                                            <el-input v-model="item.endOrCurrent" placeholder="请输入内容" :disabled="isdisabled" maxlength="25" @keyup.native="oninputAssets('liabilitiesList', index, 'endOrCurrent', $event)">
                                                <template slot="suffix">万</template>
                                            </el-input>
                                        </div>
                                        <div class="table-col">
                                            <el-input v-model="item.beginOrPrior" placeholder="请输入内容" :disabled="isdisabled" maxlength="25" @keyup.native="oninputAssets('liabilitiesList', index, 'beginOrPrior', $event)">
                                                <template slot="suffix">万</template>
                                            </el-input>
                                        </div>
                                    </template>
                                </div>
                                <div class="table-row"></div>
                            </div>
                        </div>
                    </el-form>

                </el-collapse-item>
                <el-collapse-item name="11">
                    <template slot="title">
                        <p class="titlt-p">利润表</p>
                    </template>
                    <!-- <el-button
                    type="primary"
                >批量导入</el-button>
                <el-button
                    type="primary"
                >下载模板</el-button> -->
                    <el-form :model="superprofitForm" :rules="superprofitRules" label-width="100px">
                        <div class="table-cont-tabs">
                            <el-tabs type="card" v-model="tabName" @tab-click="initTable">
                                <el-tab-pane label="本年度" name="nowYear"></el-tab-pane>
                                <el-tab-pane label="上年度" name="lastYear"></el-tab-pane>
                                <el-tab-pane label="上上年度" name="lastLastYear"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="编制单位：">
                                    <el-input v-model="dueFinanceProfit.writer" placeholder="请输入编制单位" :disabled="isdisabled"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="时间：">
                                    <el-date-picker v-model="dueFinanceProfit.recordTime" type="date" placeholder="选择日期" :disabled="isdisabled">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="单位：万">
                                </el-form-item>
                            </div>
                        </div>
                        <div class="table-flex table_left">
                            <div class="table-row">
                                <div class="table-col">项目</div>
                                <div class="table-col">本年度累计金额</div>
                                <div class="table-col">上年末度累计金额</div>
                            </div>
                            <div class="table-row" v-for="(item,index) in dueFinanceProfit.contentList" :key="index">
                                <template v-if="index === 17">
                                    <div class="table-col">{{item.typeName}}</div>
                                </template>
                                <template v-else>
                                    <div class="table-col">{{item.typeName}}</div>
                                    <div class="table-col">
                                        <el-input v-model="item.endOrCurrent" placeholder="请输入内容" :disabled="isdisabled" maxlength="25" @keyup.native="oninputDueAndCase(index, 'endOrCurrent', $event, 0)">
                                            <template slot="suffix">万</template>
                                        </el-input>
                                    </div>
                                    <div class="table-col">
                                        <el-input v-model="item.beginOrPrior" placeholder="请输入内容" :disabled="isdisabled" maxlength="25" @keyup.native="oninputDueAndCase(index, 'beginOrPrior', $event, 0)">
                                            <template slot="suffix">万</template>
                                        </el-input>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="12">
                    <template slot="title">
                        <p class="titlt-p">现金流量表</p>
                    </template>
                    <!-- <el-button
                    type="primary"
                >批量导入</el-button>
                <el-button
                    type="primary"
                >下载模板</el-button> -->
                    <el-form :model="cashForm" :rules="cashRules" label-width="100px">
                        <div class="table-cont-tabs">
                            <el-tabs type="card" v-model="tabName" @tab-click="initTable">
                                <el-tab-pane label="本年度" name="nowYear"></el-tab-pane>
                                <el-tab-pane label="上年度" name="lastYear"></el-tab-pane>
                                <el-tab-pane label="上上年度" name="lastLastYear"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="编制单位：">
                                    <el-input v-model="caseFlow.writer" placeholder="请输入编制单位" :disabled="isdisabled"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="时间：">
                                    <el-date-picker v-model="caseFlow.recordTime" type="date" placeholder="选择日期" :disabled="isdisabled">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="单位：万">
                                </el-form-item>
                            </div>
                        </div>
                        <div class="table-flex table_left">
                            <div class="table-row">
                                <div class="table-col">项目</div>
                                <div class="table-col">本期金额</div>
                                <div class="table-col">上期金额</div>
                            </div>
                            <div class="table-row" v-for="(item,index) in caseFlow.contentList" :key="index">
                                <template v-if="index === 0 || index === 11 || index === 24">
                                    <div class="table-col">{{item.typeName}}</div>
                                </template>
                                <template v-else>
                                    <div class="table-col">{{item.typeName}}</div>
                                    <div class="table-col">
                                        <el-input v-model="item.endOrCurrent" placeholder="请输入内容" :disabled="isdisabled" maxlength="25" @keyup.native="oninputDueAndCase(index, 'endOrCurrent', $event, 1)">
                                            <template slot="suffix">万</template>
                                        </el-input>
                                    </div>
                                    <div class="table-col">
                                        <el-input v-model="item.beginOrPrior" placeholder="请输入内容" :disabled="isdisabled" maxlength="25" @keyup.native="oninputDueAndCase(index, 'beginOrPrior', $event, 1)">
                                            <template slot="suffix">万</template>
                                        </el-input>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </el-form>
        <div class="flex-wrap-row top20 " v-show="!isdisabled">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click="onSureHandle(0)">保存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="onSureHandle(1)">提交</el-button>
            </el-col>
        </div>
        <!-- <dialog title="偿债能力标准值" :visible.sync="debtDialog" width="200px" center :close-on-click-modal=false>
            <span slot="footer" class="dialog-footer">
                <el-button @click="debtDialog = false">取 消</el-button>
                <el-button type="primary" @click="onAddscorerule">确 定</el-button>
            </span>
        </dialog> -->
    </div>
</template>
<script>
import { getFinance, saveFinance, provinces } from '../api/index.js'
import { plusOrMinus } from '../../../utils/rules'
import { mapState } from 'vuex'
import { YES_NO_STATUS, COST_RATIONALITY } from '../const'
export default {
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            activeName: '7',
            updateTime: '',
            updateUser: '',
            assessmentList: [], // 财务尽调评估
            dueFinanceBasic: {}, // 尽调数据
            assetsLiabilities: { recordTime: '' }, // 资产负债表
            dueFinanceProfit: { recordTime: '' }, // 利润表
            caseFlow: { recordTime: '' }, // 现金流量表
            isdisabled: false,
            riskoptions: [{
                value: '',
                label: '请选择'
            }, {
                value: 0,
                label: '高'
            }, {
                value: 1,
                label: '中'
            }, {
                value: 2,
                label: '低'
            }],
            storeOptions: [{
                value: '',
                label: '请选择'
            }, {
                value: 0,
                label: '自有'
            }, {
                value: 1,
                label: '租赁'
            }, {
                value: 2,
                label: '第三方监督'
            }],
            superviseoptions: [{
                value: '',
                label: '请选择'
            }, {
                value: 0,
                label: '资金和货物双重监管'
            }, {
                value: 1,
                label: '资金监管-高'
            }, {
                value: 2,
                label: '资金监管-低'
            }, {
                value: 3,
                label: '不接受'
            }],
            costRationalityData: COST_RATIONALITY,
            yesNoStatus: YES_NO_STATUS,
            storeProvince: [], // 省
            storeCity: [], // 市
            storeArea: [], // 区
            applyId: '',
            type: false,
            textarea: '',
            KPIForm: {
                assessmentList: [],
                assessmentItem: '',
                cooperationTarget: '',
                state: '',
                remark: '',
                riskDisclosure: '',
                analysisDescription: '',
                dueFinanceYearOperatingPos: []
            },
            KPIRules: {
                riskDisclosure: [
                    { required: true, message: '请输入风险揭示', trigger: 'blur' }
                ],
                analysisDescription: [
                    { required: true, message: '请输入分析描述', trigger: 'blur' }
                ]
            },
            profitForm: {
                dueFinanceYearOperatingPos: []
            },
            costForm: {},
            costRules: {},
            debtForm: {
                dueFinanceYearOperatingPos: []
            },
            serviceForm: {
                dueFinanceYearOperatingPos: []
            },
            capitalForm: {
                companyDebt: '',
                shareholdersDebt: '',
                companyBorrowsShareholders: '',
                shareholdersBorrowsCompany: '',
                cashFlowRatio: '',
                capitalRiskAssessment: '',
                actualControllerAndMateOperatingLoan: '',
                personalAndCompanyGuarantee: ''
            },
            capitalRules: {
                shareholdersDebt: [
                    { required: true, message: '请输入股东借款金额', trigger: 'blur' }
                ],
                companyBorrowsShareholders: [
                    { required: true, message: '请输入公司向股东借款金额', trigger: 'blur' }
                ],
                shareholdersBorrowsCompany: [
                    { required: true, message: '请输入公司向股东借款金额', trigger: 'blur' }
                ],
                capitalRiskAssessment: [
                    { required: true, message: '请选择资金风险评估', trigger: 'change' }
                ]
            },
            taxationForm: {
                // dueFinanceYearOperatingPos: [],
                // annualTaxableBusinessIncome: '',
                taxableIncomeRatio: '',
                taxBearingRate: ''
            },
            storageForm: {
                dueFinanceBasic: []
            },
            financeForm: {
                dueFinanceBasic: []
            },
            assetsForm: {
                assetsLiabilities: []
            },
            assetsRules: {},
            superprofitForm: {
                dueFinanceProfit: []
            },
            superprofitRules: {},
            cashForm: {
                caseFlow: []
            },
            cashRules: {},
            a: '',
            debtDialog: false,
            tabName: 'nowYear'
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {
        // this.provinces({ parentId: 0 }, 0)
        this.getFinance()
        this.applyId = this.$route.query.applyId
    },
    methods: {
        oninput (value, e) {
            // 通过正则过滤小数点后两位
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueFinanceBasic[value] = e.target.value
        },
        oninputAssets (list, index, value, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.assetsLiabilities[list][index][value] = e.target.value
        },
        oninputDueAndCase (index, value, e, n) {
            e.target.value = plusOrMinus(e.target.value.toString())
            if (n === 0) {
                this.dueFinanceProfit.contentList[index][value] = e.target.value
                return
            }
            if (n === 1) {
                this.caseFlow.contentList[index][value] = e.target.value
            }
        },
        // 整数验证
        // oninputInt (value, e) {
        //     e.target.value = e.target.value.replace(/[^\d]/g, '')
        //     this.dueFinanceBasic[value] = e.target.value
        // },
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
        async getFinance () {
            const { data } = await getFinance(this.$route.query.applyId)
            console.log(data.data)

            this.KPIForm.assessmentList = data.data.assessmentList
            this.KPIForm.riskDisclosure = data.data.dueFinanceBasic.riskDisclosure
            this.KPIForm.analysisDescription = data.data.dueFinanceBasic.analysisDescription

            this.debtForm.dueFinanceYearOperatingPos = this.serviceForm.dueFinanceYearOperatingPos = this.profitForm.dueFinanceYearOperatingPos = this.KPIForm.dueFinanceYearOperatingPos = data.data.dueFinanceYearOperatingPos

            this.costForm.salesExpensesRatio = data.data.dueFinanceBasic.salesExpensesRatio
            this.costForm.managementExpensesRatio = data.data.dueFinanceBasic.managementExpensesRatio
            this.costForm.financeExpensesRatio = data.data.dueFinanceBasic.financeExpensesRatio
            this.costForm.costRationality = data.data.dueFinanceBasic.costRationality
            this.costForm.costRationalityRemark = data.data.dueFinanceBasic.costRationalityRemark

            // this.
            // if (!data.data.dueFinanceBasic.type) {
            //     this.isdisabled = (!!data.data.dueFinanceBasic.type) || !this.roleType
            // } else {
            //     this.isdisabled = (!!data.data.dueFinanceBasic.type)
            // }
            this.type = !!data.data.dueFinanceBasic.type
            this.updateUser = data.data.dueFinanceBasic.updateUser
            this.updateTime = data.data.dueFinanceBasic.updateTime
            this.assessmentList = data.data.assessmentList
            this.dueFinanceBasic = data.data.dueFinanceBasic
            this.assetsLiabilities = data.data.assetsLiabilities
            this.dueFinanceProfit = data.data.dueFinanceProfit
            this.caseFlow = data.data.caseFlow
            // 获取省市区数据
            if (this.dueFinanceBasic.storeProvince) {
                this.dueFinanceBasic.storeProvince = +this.dueFinanceBasic.storeProvince
                this.provinces({ parentId: this.dueFinanceBasic.storeProvince }, 1)
                if (this.dueFinanceBasic.storeCity) {
                    this.dueFinanceBasic.storeCity = +this.dueFinanceBasic.storeCity
                    this.provinces({ parentId: this.dueFinanceBasic.storeCity }, 2)
                    if (this.dueFinanceBasic.storeArea) {
                        this.dueFinanceBasic.storeArea = +this.dueFinanceBasic.storeArea
                    }
                }
            }
            this.dueFinanceBasic.applyId = this.applyId
            if (this.dueFinanceBasic.id) {
                this.dueFinanceBasic.updateUser = this.userInfo.name
            } else {
                this.dueFinanceBasic.createUser = this.userInfo.name
            }
        },
        async provinces (params, city) {
            // return false
            const { data } = await provinces(params)
            switch (city) {
                case 0:
                    this.storeProvince = data.citys
                    this.storeProvince.unshift({ cityId: '', cityName: '请选择省', id: 0 })
                    break
                case 1:
                    this.storeCity = data.citys
                    this.storeCity.unshift({ cityId: '', cityName: '请选择市', id: 0 })
                    break
                case 2:
                    this.storeArea = data.citys
                    this.storeArea.unshift({ cityId: '', cityName: '请选择区', id: 0 })
                    break
            }
        },
        onProvince (parentId) {
            this.dueFinanceBasic.storeCity = ''
            this.dueFinanceBasic.storeArea = ''
            this.storeCity = []
            this.storeArea = []
            if (parentId) {
                this.provinces({ parentId }, 1)
            }
        },
        onCity (parentId) {
            this.dueFinanceBasic.storeArea = ''
            this.storeArea = []
            if (parentId) {
                this.provinces({ parentId }, 2)
            }
        },
        onSureHandle (i) {
            // const type = i === 0 ? '保存' : '提交'
            // this.$confirm(`确定${type}?`, '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'info'
            // }).then(() => {
            if (i === 0) return this.onSaveGood(i)
            if (i === 1) return this.onSubmit(i)
            // }).catch(() => {})
        },
        format (type) {
            if (this.dueFinanceBasic.dateOfCustody) this.dueFinanceBasic.dateOfCustody = this.$options.filters.formatDate(this.dueFinanceBasic.dateOfCustody, 'YYYY-MM-DD')
            if (this.dueFinanceBasic.startDateOfDelegation) this.dueFinanceBasic.startDateOfDelegation = this.$options.filters.formatDate(this.dueFinanceBasic.startDateOfDelegation, 'YYYY-MM-DD')
            if (this.assetsLiabilities.recordTime) this.assetsLiabilities.recordTime = this.$options.filters.formatDate(this.assetsLiabilities.recordTime, 'YYYY-MM-DD')
            if (this.dueFinanceProfit.recordTime) this.dueFinanceProfit.recordTime = this.$options.filters.formatDate(this.dueFinanceProfit.recordTime, 'YYYY-MM-DD')
            if (this.caseFlow.recordTime) this.caseFlow.recordTime = this.$options.filters.formatDate(this.caseFlow.recordTime, 'YYYY-MM-DD')
            const formData = {
                assessmentList: this.assessmentList,
                assetsLiabilities: this.assetsLiabilities,
                caseFlow: this.caseFlow,
                dueFinanceBasic: this.dueFinanceBasic,
                dueFinanceProfit: this.dueFinanceProfit,
                type
            }
            return formData
        },
        async onSaveGood (type) {
            const formData = this.format(type)
            // console.log(formData)
            await saveFinance(formData)
            // this.getFinance()
            this.$message({
                type: 'success',
                message: '保存成功!'
            })
            this.$router.go(-1)
        },
        async onSubmit (type) {
            this.KPIForm.assessmentList.map(i => {
                if (i.state === null || i.state === '') {
                    this.$message.warning('请选择尽调评估结论')
                    this.activeName = '1'
                    return false
                }
            })
            this.KPIForm.dueFinanceYearOperatingPos.map(i => {
                if (i.assetLiabilityRatio === null || i.assetLiabilityRatio === '') {
                    this.$message.warning('请输入资产负债率')
                    this.activeName = '1'
                    return false
                }
                if (i.netProfitRate === null || i.netProfitRate === '') {
                    this.$message.warning('请输入净利润率')
                    this.activeName = '1'
                    return false
                }
            })
            const formData = this.format(type)
            // for (let i = 0;i < this.assessmentList.length;i++) {
            //     if (this.assessmentList[i].state === null || this.assessmentList[i].state === '') {
            //         this.showWarnMsg('请选择尽调评估结论')
            //         this.activeName = '1'
            //         return false
            //     }
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.fundingRisks)) {
            //     this.showWarnMsg('请选择资金风险')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.fundSupervision)) {
            //     this.showWarnMsg('请选择资金监管')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.warehouseManaged)) {
            //     this.showWarnMsg('请选择仓库托管')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.financialExpatriates)) {
            //     this.showWarnMsg('请选择财务外派')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.dueFinanceBasic.riskDisclosure) {
            //     this.showWarnMsg('请输入风险揭示')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.dueFinanceBasic.analysisDescription) {
            //     this.showWarnMsg('请输入分析描述')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.grossMargin)) {
            //     this.showWarnMsg('请输入销售毛利率')
            //     this.activeName = '2'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.rate)) {
            //     this.showWarnMsg('请输入费率')
            //     this.activeName = '2'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.profitRatio)) {
            //     this.showWarnMsg('请输入净利率')
            //     this.activeName = '2'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.liquidityRatio)) {
            //     this.showWarnMsg('请输入流动比率')
            //     this.activeName = '4'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.quickRatio)) {
            //     this.showWarnMsg('请输入速动比率')
            //     this.activeName = '4'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.assetLiabilityRatio)) {
            //     this.showWarnMsg('请输入资产负债率')
            //     this.activeName = '4'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.cashRatio)) {
            //     this.showWarnMsg('请输入现金比率')
            //     this.activeName = '4'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.daysOfReceivable)) {
            //     this.showWarnMsg('请输入应收账款周转天数')
            //     this.activeName = '5'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.daysOfInventory)) {
            //     this.showWarnMsg('请输入库存周转天数')
            //     this.activeName = '5'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.totalAssetsTurnover)) {
            //     this.showWarnMsg('请输入总资产周转率')
            //     this.activeName = '5'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.returnOnEquity)) {
            //     this.showWarnMsg('请输入净资产收益率')
            //     this.activeName = '5'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.companyDebt)) {
            //     this.showWarnMsg('请输入公司借款')
            //     this.activeName = '6'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.shareholdersDebt)) {
            //     this.showWarnMsg('请输入股东借款')
            //     this.activeName = '6'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.companyBorrowsShareholders)) {
            //     this.showWarnMsg('请输入公司向股东借款')
            //     this.activeName = '6'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.shareholdersBorrowsCompany)) {
            //     this.showWarnMsg('请输入股东向公司借款')
            //     this.activeName = '6'
            //     return false
            // }
            // // if (!this.dueFinanceBasic.cashFlowRatio) {
            // //     this.showWarnMsg('请输入现金流量比率')
            // //     this.activeName = '6'
            // //     return false
            // // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.capitalRiskAssessment)) {
            //     this.showWarnMsg('请选择资金风险评估')
            //     this.activeName = '6'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.annualTaxableBusinessIncome)) {
            //     this.showWarnMsg('请输入年度纳税营业收入')
            //     this.activeName = '7'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.taxableIncomeRatio)) {
            //     this.showWarnMsg('请输入纳税收入占比')
            //     this.activeName = '7'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.taxBearingRate)) {
            //     this.showWarnMsg('请输入税负率')
            //     this.activeName = '7'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.isAgreeFinancialDelegation)) {
            //     this.showWarnMsg('请选择是否同意财务委派')
            //     this.activeName = '9'
            //     return false
            // }

            // var result1 = this.assetsLiabilities.assetList.some((v, i) => {
            //     return v.beginOrPrior || v.endOrCurrent
            // })
            // var result2 = this.assetsLiabilities.liabilitiesList.some((v, i) => {
            //     return v.beginOrPrior || v.endOrCurrent
            // })
            // if (!result1 && !result2) {
            //     this.showWarnMsg('请输入资产负债表')
            //     this.activeName = '10'
            //     return false
            // }
            await saveFinance(formData)
            this.isdisabled = true
            this.$message({
                type: 'success',
                message: `提交成功`
            })
            this.$router.go(-1)
        },
        onDebtDialog () {
            console.log(1)
            this.debtDialog = true
        },
        initTable () {

        }
    }
}
</script>
<style lang="scss" scoped>
.jd-manage {
    padding: 0 15px;
}
.jd-manage {
    textarea {
        border: 1px solid #dddddd;
    }
}
table {
    border-collapse: collapse;
}
table,
tr,
td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
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
            right: -50px;
            font-size: 20px;
        }
    }
}
.double-table {
    display: flex;
    margin: 15px;
    .table-flex {
        width: 50%;
        margin: 0;
    }
    .table-flex:nth-child(1) {
        .table-row {
            border-right: none;
        }
    }
    .table-flex:nth-child(2) {
        .table-row {
            border-left: none;
        }
    }
}
.table_left {
    .table-col {
        text-align: left !important;
    }
}
.subtitle {
    font-weight: 700;
    height: 40px;
}
.table_h {
    height: 80px;
    // line-height: 80px;
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
</style>

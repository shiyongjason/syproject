<template>
    <div class="jd-manage">
        <p v-show="disabled && !!type">已提交 {{updateTime}} {{updateUser}} </p>
        <el-form ref="form" :model="justiceData">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="titlt-p">法务尽调评估及KPI</p>
                    </template>
                    <!--start-->
                    <p class="small-title">法务尽调评估</p>
                    <div class="page-box">
                        <table class="table-example">
                            <thead>
                            <tr class="tableTitle">
                                <td width="180">评估项</td>
                                <td width="180">合作目标</td>
                                <td width="180"><span class="red-span">*</span>结论(必填)</td>
                                <td width="180">备注</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in justiceData.assessmentList" :key="item.index">
                                <td>{{item.assessmentItem}}</td>
                                <td>{{item.cooperationTarget}}</td>
                                <td>
                                    <el-select v-model="item.state" placeholder="请选择结论" :disabled="disabled" class="selectconclusion">
                                        <el-option label="是" :value="0"></el-option>
                                        <el-option label="否" :value="1"></el-option>
                                    </el-select>
                                </td>
                                <td>1</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table-flex">
                        <div class="table-row">
                            <div class="table-col">评估项</div>
                            <div class="table-col">合作目标</div>
                            <div class="table-col"><span class="red-span">*</span>结论(必填)</div>
                            <div class="table-col">备注</div>
                        </div>
                        <div>
                            <div class="table-row" v-for="(item,index) in justiceData.assessmentList"
                                 :key="'assessmentList'+index">
                                <div class="table-col" v-text="item.assessmentItem">
                                    <!--<el-input v-model="" placeholder="评估项" :disabled="disabled"-->
                                    <!--&gt;</el-input>-->
                                </div>
                                <div class="table-col" v-text="item.cooperationTarget">
                                    <!--<el-input v-model="item.cooperationTarget" placeholder="合作目标" :disabled="disabled"-->
                                    <!--&gt;</el-input>-->
                                </div>
                                <div class="table-col">
                                    <el-select v-model="item.state" placeholder="请选择结论" :disabled="disabled">
                                        <el-option label="是" :value="0"></el-option>
                                        <el-option label="否" :value="1"></el-option>
                                    </el-select>
                                </div>
                                <div class="table-col">
                                    <el-input v-model="item.remark" placeholder="请输入备注" :disabled="disabled"
                                    ></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="small-title ">KPI(必填)</p>
                        <el-form :model="justiceData.affairs" :rules="justiceData.affairsRules" label-position="right"
                                 label-width="250px" class="fawuForm">
                            <el-form-item label="尽调公司法律风险：" prop="legalRisksOfCompany">
                                <el-select v-model="justiceData.affairs.legalRisksOfCompany" placeholder="请选择结论">
                                    <el-option label="高" :value="0"></el-option>
                                    <el-option label="中" :value="1"></el-option>
                                    <el-option label="低" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="实际控制人法律风险：" prop="legalRisksOfController">
                                <el-select v-model="justiceData.affairs.legalRisksOfController" placeholder="请选择结论"
                                           :disabled="disabled">
                                    <el-option label="高" :value="0"></el-option>
                                    <el-option label="中" :value="1"></el-option>
                                    <el-option label="低" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="实际控制人配偶法律风险：" prop="legalRisksOfControllerMate">
                                <el-select v-model="justiceData.affairs.legalRisksOfControllerMate" placeholder="请选择结论"
                                           :disabled="disabled">
                                    <el-option label="高" :value="0"></el-option>
                                    <el-option label="中" :value="1"></el-option>
                                    <el-option label="低" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="个人经营性借款及担保总额：" prop="personalOperatingloansTotalGuarantees">
                                <el-input v-model="personalOperatingloansTotalGuarantees" placeholder="请输入借款及担保总额">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="公司借款及担保总额：" prop="companyLoanTotalGuarantee">
                                <el-input v-model="companyLoanTotalGuarantee" placeholder="请输入借款及担保总额">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    <p class="small-title ">分析报告</p>
                    <div class="flex-wrap-col">
                        <div class="flex-wrap-box ">
                            <div class="flex-wrap-title"><span class="red-span">*</span>风险揭示：</div>
                            <div class="flex-wrap-cont">
                                <el-form-item :rules="{required: true ,message: '风险揭示不能为空',trigger: 'blur'}"
                                              :prop="'affairs.riskDisclosure'">
                                    <el-input
                                        type="textarea"
                                        style="width:600px"
                                        rows="6"
                                        :disabled="disabled"
                                        placeholder="请输入内容"
                                        v-model="justiceData.affairs.riskDisclosure"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="flex-wrap-box ">
                            <div class="flex-wrap-title"><span class="red-span">*</span>分析描述：</div>
                            <div class="flex-wrap-cont">
                                <el-form-item :rules="{required: true ,message: '分析描述不能为空',trigger: 'blur'}"
                                              :prop="'affairs.analysisDescription'">
                                    <el-input
                                        type="textarea"
                                        style="width:600px"
                                        rows="6"
                                        :disabled="disabled"
                                        placeholder="请输入内容"
                                        v-model="justiceData.affairs.analysisDescription"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <!--end-->
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <p class="titlt-p">合伙人信息</p>
                    </template>
                    <template v-if="justiceData.copartnerInfoList.length>0">
                        <div v-for="(item,index) in justiceData.copartnerInfoList" :key="index">
                            <div v-if="item.type==0">
                                <p class="small-title">实际控制人</p>
                                <el-form label-position="right" label-width="200px" class="fawuForm">
                                    <el-form-item
                                        label="姓名："
                                        :rules="{required: true,message: '姓名不能为空',trigger: 'blur'}"
                                        :prop="'copartnerInfoList.'+ index + '.name'"
                                    >
                                        <el-input
                                            placeholder="实际控制人"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.name"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系方式"
                                        :rules="{required: true,message: '联系方式不能为空',trigger: 'blur'}"
                                        :prop="'copartnerInfoList.'+ index + '.tel'"
                                    >
                                        <el-input
                                            placeholder="联系方式"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.tel"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="性别："
                                        :rules="{required: true,message: '性别不能为空',trigger: 'change'}"
                                        :prop="'copartnerInfoList.'+ index + '.sex'"
                                    >
                                        <el-select v-model="item.sex" :disabled="disabled">
                                            <el-option label="男" :value="0"></el-option>
                                            <el-option label="女" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="婚姻："
                                        :rules="{required: true,message: '婚姻不能为空',trigger: 'change'}"
                                        :prop="'copartnerInfoList.'+ index + '.marriage'"
                                    >
                                        <el-select v-model="item.marriage" :disabled="disabled">
                                            <el-option label="已婚" :value="0"></el-option>
                                            <el-option label="未婚" :value="1"></el-option>
                                            <el-option label="离异" :value="2"></el-option>
                                            <el-option label="丧偶" :value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="身份证号："
                                        :rules="{required: true,message: '身份证号不能为空',trigger: 'blur'}"
                                        :prop="'copartnerInfoList.'+ index + '.idNumber'"
                                    >
                                        <el-input
                                            placeholder="身份证号"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.idNumber"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="学历：">
                                        <el-select v-model="item.education" :disabled="disabled">
                                            <el-option label="大专" :value="0"></el-option>
                                            <el-option label="本科" :value="1"></el-option>
                                            <el-option label="硕士" :value="2"></el-option>
                                            <el-option label="博士" :value="3"></el-option>
                                            <el-option label="其他" :value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="持股比例：">
                                        <el-input
                                            placeholder="持股比例"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.shareholdingRatio"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="是否在外兼职：">
                                        <el-select v-model="item.partTimeJob" :disabled="disabled">
                                            <el-option label="是" :value="0"></el-option>
                                            <el-option label="否" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="行业身份：">
                                        <el-input
                                            placeholder="行业身份"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.industryStatus"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="个人经营能力：">
                                        <el-input
                                            placeholder="个人经营能力"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.managementAbility"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="行业口碑：">
                                        <el-input
                                            placeholder="行业口碑"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.industryReputation"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="社会资源：">
                                        <el-input
                                            placeholder="社会资源"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.socialResources"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div v-if="item.type==5">
                                <p class="small-title">实际控制人配偶信息</p>
                                <el-form label-position="right" label-width="200px" class="fawuForm">
                                    <el-form-item label="姓名：">
                                        <el-input
                                            placeholder="实际控制人配偶"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.name"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="联系方式：">
                                        <el-input
                                            placeholder="联系方式"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.tel"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="性别：">
                                        <el-select v-model="item.sex" :disabled="disabled">
                                            <el-option label="男" :value="0"></el-option>
                                            <el-option label="女" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="婚姻：">
                                        <el-select v-model="item.marriage" :disabled="disabled">
                                            <el-option label="已婚" :value="0"></el-option>
                                            <el-option label="未婚" :value="1"></el-option>
                                            <el-option label="离异" :value="2"></el-option>
                                            <el-option label="丧偶" :value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="身份证号：">
                                        <el-input
                                            placeholder="身份证号"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.idNumber"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="学历：">
                                        <el-select v-model="item.education" :disabled="disabled">
                                            <el-option label="大专" :value="0"></el-option>
                                            <el-option label="本科" :value="1"></el-option>
                                            <el-option label="硕士" :value="2"></el-option>
                                            <el-option label="博士" :value="3"></el-option>
                                            <el-option label="其他" :value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="持股比例：">
                                        <el-input
                                            placeholder="持股比例"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.shareholdingRatio"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="是否在外兼职：">
                                        <el-select v-model="item.partTimeJob" :disabled="disabled">
                                            <el-option label="是" :value="0"></el-option>
                                            <el-option label="否" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="行业身份：">
                                        <el-input
                                            placeholder="行业身份"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.industryStatus"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="个人经营能力：">
                                        <el-input
                                            placeholder="个人经营能力"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.managementAbility"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="社会资源：">
                                        <el-input
                                            placeholder="社会资源"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.socialResources"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div v-else-if="item.type==1">
                                <p class="small-title">法人</p>
                                <el-form label-position="right" label-width="200px" class="fawuForm">
                                    <el-form-item label="姓名：">
                                        <el-input
                                            placeholder="姓名"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.name"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="联系方式：">
                                        <el-input
                                            placeholder="联系方式"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.tel"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="性别：">
                                        <el-select v-model="item.sex" :disabled="disabled">
                                            <el-option label="男" :value="0"></el-option>
                                            <el-option label="女" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="婚姻：">
                                        <el-select v-model="item.marriage" :disabled="disabled">
                                            <el-option label="已婚" :value="0"></el-option>
                                            <el-option label="未婚" :value="1"></el-option>
                                            <el-option label="离异" :value="2"></el-option>
                                            <el-option label="丧偶" :value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="身份证号：">
                                        <el-input
                                            placeholder="身份证号"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.idNumber"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="学历：">
                                        <el-select v-model="item.education" :disabled="disabled">
                                            <el-option label="大专" :value="0"></el-option>
                                            <el-option label="本科" :value="1"></el-option>
                                            <el-option label="硕士" :value="2"></el-option>
                                            <el-option label="博士" :value="3"></el-option>
                                            <el-option label="其他" :value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="持股比例：">
                                        <el-input
                                            placeholder="持股比例"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.shareholdingRatio"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="是否在外兼职：">
                                        <el-select v-model="item.partTimeJob" :disabled="disabled">
                                            <el-option label="是" :value="0"></el-option>
                                            <el-option label="否" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="行业身份：">
                                        <el-input
                                            placeholder="行业身份"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.industryStatus">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="社会资源：">
                                        <el-input
                                            placeholder="社会资源"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.socialResources"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div v-else-if="item.type==2">
                                <p class="small-title">大股东1</p>
                                <el-form label-position="right" label-width="200px" class="fawuForm">
                                    <el-form-item label="姓名：">
                                        <el-input
                                            placeholder="姓名"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.name"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="联系方式：">
                                        <el-input
                                            placeholder="联系方式"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.tel"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="性别：">
                                        <el-select v-model="item.sex" :disabled="disabled">
                                            <el-option label="男" :value="0"></el-option>
                                            <el-option label="女" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="婚姻：">
                                        <el-select v-model="item.marriage" :disabled="disabled">
                                            <el-option label="已婚" :value="0"></el-option>
                                            <el-option label="未婚" :value="1"></el-option>
                                            <el-option label="离异" :value="2"></el-option>
                                            <el-option label="丧偶" :value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="身份证号：">
                                        <el-input
                                            placeholder="身份证号"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.idNumber"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="学历：">
                                        <el-select v-model="item.education" :disabled="disabled">
                                            <el-option label="大专" :value="0"></el-option>
                                            <el-option label="本科" :value="1"></el-option>
                                            <el-option label="硕士" :value="2"></el-option>
                                            <el-option label="博士" :value="3"></el-option>
                                            <el-option label="其他" :value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="持股比例：">
                                        <el-input
                                            placeholder="持股比例"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.shareholdingRatio"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="是否在外兼职：">
                                        <el-select v-model="item.partTimeJob" :disabled="disabled">
                                            <el-option label="是" :value="0"></el-option>
                                            <el-option label="否" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="行业身份：">
                                        <el-input
                                            placeholder="行业身份"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.industryStatus">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="社会资源：">
                                        <el-input
                                            placeholder="社会资源"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.socialResources"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div v-else-if="item.type==3">
                                <p class="small-title">大股东2</p>
                                <el-form label-position="right" label-width="200px" class="fawuForm">
                                    <el-form-item label="姓名：">
                                        <el-input
                                            placeholder="姓名"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.name"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="联系方式：">
                                        <el-input
                                            placeholder="联系方式"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.tel"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="性别：">
                                        <el-select v-model="item.sex" :disabled="disabled">
                                            <el-option label="男" :value="0"></el-option>
                                            <el-option label="女" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="婚姻：">
                                        <el-select v-model="item.marriage" :disabled="disabled">
                                            <el-option label="已婚" :value="0"></el-option>
                                            <el-option label="未婚" :value="1"></el-option>
                                            <el-option label="离异" :value="2"></el-option>
                                            <el-option label="丧偶" :value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="身份证号：">
                                        <el-input
                                            placeholder="身份证号"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.idNumber"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="学历：">
                                        <el-select v-model="item.education" :disabled="disabled">
                                            <el-option label="大专" :value="0"></el-option>
                                            <el-option label="本科" :value="1"></el-option>
                                            <el-option label="硕士" :value="2"></el-option>
                                            <el-option label="博士" :value="3"></el-option>
                                            <el-option label="其他" :value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="持股比例：">
                                        <el-input
                                            placeholder="持股比例"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.shareholdingRatio"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="是否在外兼职：">
                                        <el-select v-model="item.partTimeJob" :disabled="disabled">
                                            <el-option label="是" :value="0"></el-option>
                                            <el-option label="否" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="行业身份：">
                                        <el-input
                                            placeholder="行业身份"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.industryStatus">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="社会资源：">
                                        <el-input
                                            placeholder="社会资源"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.socialResources"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div v-else-if="item.type==4">
                                <p class="small-title">拟选签约人</p>
                                <el-form>
                                    <el-form-item label="姓名：">
                                        <el-input
                                            placeholder="姓名"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.name"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="联系方式：">
                                        <el-input
                                            placeholder="联系方式"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.tel"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="性别：">
                                        <el-select v-model="item.sex" :disabled="disabled">
                                            <el-option label="男" :value="0"></el-option>
                                            <el-option label="女" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="婚姻：">
                                        <el-select v-model="item.marriage" :disabled="disabled">
                                            <el-option label="已婚" :value="0"></el-option>
                                            <el-option label="未婚" :value="1"></el-option>
                                            <el-option label="离异" :value="2"></el-option>
                                            <el-option label="丧偶" :value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="身份证号：">
                                        <el-input
                                            placeholder="身份证号"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.idNumber"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="学历：">
                                        <el-select v-model="item.education" :disabled="disabled">
                                            <el-option label="大专" :value="0"></el-option>
                                            <el-option label="本科" :value="1"></el-option>
                                            <el-option label="硕士" :value="2"></el-option>
                                            <el-option label="博士" :value="3"></el-option>
                                            <el-option label="其他" :value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="是否在外兼职：">
                                        <el-select v-model="item.partTimeJob" :disabled="disabled">
                                            <el-option label="是" :value="0"></el-option>
                                            <el-option label="否" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="行业身份：">
                                        <el-input
                                            placeholder="行业身份"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.industryStatus"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="社会资源：">
                                        <el-input
                                            placeholder="社会资源"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.socialResources"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </template>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <p class="titlt-p">实际控制人法务信息</p>
                    </template>
                    <p class="small-title">对外投资信息</p>
                    <!--justiceData.investmentsOutList-->
                    <div class="flex-wrap-col supplier" v-for="(item,index) in investmentsOutListType0"
                         :key="'investmentsOutList'+item.type+index">
                        <template v-if="!disabled">
                            <i class="el-icon-circle-plus-outline pointer" v-if="index==0"
                               @click="addList('investmentsOutList',0)"></i>
                            <i class="el-icon-remove-outline pointer" v-else
                               @click="removeList('investmentsOutList', item.id)"></i>
                        </template>
                        <el-form label-position="right" label-width="200px" class="fawuForm">
                            <el-form-item label="投资公司：">
                                <el-input
                                    placeholder="投资公司"
                                    maxlength="25"
                                    :disabled="disabled"
                                    v-model="item.investmentCompany">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="投资金额：">
                                <el-input
                                    placeholder="请输入投资金额"
                                    maxlength="25"
                                    :disabled="disabled"
                                    v-model="item.investmentAmount">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="投资比例：">
                                <el-input
                                    placeholder="请输入投资比例"
                                    maxlength="25"
                                    :disabled="disabled"
                                    v-model="item.investmentRatio"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="投资性质：">
                                <!--0：债务性投资 1：权益性投资 2：混合性投资-->
                                <el-select placeholder="请选择投资性质" :disabled="disabled"
                                           v-model="item.investmentType">
                                    <el-option label="债务性投资" :value="0"></el-option>
                                    <el-option label="权益性投资" :value="1"></el-option>
                                    <el-option label="混合性投资" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="投资收益：">
                                <el-input
                                    placeholder="请输入投资收益"
                                    maxlength="25"
                                    :disabled="disabled"
                                    v-model="item.investmentIncome"
                                >
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <p class="small-title">资产信息</p>
                    <!--justiceData.assetList-->
                    <div v-for="(item,index) in assetListType0"
                         :key="'assetList'+item.type+index">
                        <el-form label-position="right" label-width="200px" class="fawuForm">
                            <el-form-item label="不动产：">
                                <el-input type="textarea" placeholder="请输入不动产" rows="3"
                                          :disabled="disabled" v-model="item.realEstate"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item label="准不动产：">
                                <el-input type="textarea" placeholder="请输入准不动产"
                                          :disabled="disabled" rows="3"
                                          v-model="item.chattelReal">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="动产：">
                                <el-input type="textarea" placeholder="请输入动产"
                                          :disabled="disabled" rows="3"
                                          v-model="item.movableProperty">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="无形资产-专利：">
                                <el-input type="textarea"
                                          placeholder="专利"
                                          :disabled="disabled"
                                          v-model="item.patent" rows="3"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item label="无形资产-商标：">
                                <el-input type="textarea"
                                          placeholder="商标"
                                          :disabled="disabled" rows="3"
                                          v-model="item.brand"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item label="无形资产-其他：">
                                <el-input type="textarea"
                                          placeholder="其他"
                                          :disabled="disabled" rows="3"
                                          v-model="item.other"
                                >
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div class="upload">
                            <div class="flex-wrap-box ">
                                <div class="flex-wrap-title">附件：</div>
                                <div
                                    class="flex-wrap-cont"
                                    v-show='!disabled'
                                >
                                    <el-upload
                                        class="upload-demo"
                                        v-bind="uploadInfo"
                                        :on-success="handleSuccess"
                                        :before-remove="beforeRemove"
                                        :on-exceed="handleExceed"
                                        :file-list="item.attachInfo"
                                        :before-upload="handleUpload"
                                    >
                                        <el-button
                                            size="small"
                                            type="primary"
                                            @click="uploadId(item)"
                                        >点击上传
                                        </el-button>
                                    </el-upload>
                                </div>
                                <div class="cont" v-show='disabled' v-if="item.attachInfo">
                                    <div v-if="item.attachInfo.length === 0">暂无附件</div>
                                    <p
                                        v-else
                                        class="upload"
                                        v-for="(sub,index) in item.attachInfo"
                                        :key="index"
                                        @click="uploadId(item)"
                                    ><a :href="sub.url" target="_blank">{{sub.name}}</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="small-title">负债信息（万）</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                                <el-form label-position="left" label-width="100px" class="fawuForm">
                                    <el-form-item label="合计：">
                                        <el-input placeholder="" maxlength="25" :disabled="true" v-model="debtListType0Total">
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <el-button type="primary" style="margin-left: 8px" @click="total('debtListType0')">合计
                                </el-button>
                        </div>
                    </div>
                    <div v-for="(item,index) in debtListType0"
                         :key="'debtList'+item.type+index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index===0"
                                   @click="addList('debtList',0)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('debtList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">借款：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="借款"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.debt"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">用途：</div>
                                    <div class="flex-wrap-cont">
                                        <!--<el-input-->
                                        <!--placeholder="用途"-->
                                        <!--maxlength="25"-->
                                        <!--:disabled="disabled"-->
                                        <!--v-model="item.purpose"-->
                                        <!--&gt;-->
                                        <!--</el-input>-->
                                        <el-select :disabled="disabled" v-model="item.purpose" placeholder="请选择用途">
                                            <el-option label="经营借款" value="0"></el-option>
                                            <el-option label="消费贷" value="1"></el-option>
                                            <el-option label="房贷" value="2"></el-option>
                                            <el-option label="车贷" value="3"></el-option>
                                            <el-option label="借记贷" value="4"></el-option>
                                            <el-option label="其他" value="5"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form label-position="top" label-width="200px">
                        <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                rows="4"
                                maxlength="25"
                                :disabled="disabled"
                                v-model="dueLegalRemarkCreateForm.companyDebtRemark"
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class="small-title">担保信息（万）</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="assureListType0Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('assureListType0')">
                                    合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in assureListType0"
                         :key="'assureList'+item.type+index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index==0"
                                   @click="addList('assureList',0)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('assureList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">担保：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="担保"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.assure"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">对应金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="对应金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.money"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form label-position="top" label-width="200px">
                        <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                rows="4"
                                maxlength="25"
                                :disabled="disabled"
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class="small-title">诉讼、仲裁及行政处罚事件</p>
                    <div v-for="(item,index) in punishmentListType0"
                         :key="'punishmentList'+item.type+index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index==0"
                                   @click="addList('punishmentList',0)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('punishmentList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">事件类型：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select placeholder="诉讼、仲裁" :disabled="disabled"
                                                   v-model="item.punishmentType">
                                            <el-option label="诉讼、仲裁事件" :value="0">
                                            </el-option>
                                            <el-option label="被执行案件" :value="1">
                                            </el-option>
                                            <el-option label="行政处罚" :value="2">
                                            </el-option>
                                            <el-option label="其他" :value="3">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">事件名称：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="请输入"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.caseInfo"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">涉及金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="涉及金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.moneyInvolved"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">严重性：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select placeholder="诉讼、仲裁" :disabled="disabled" v-model="item.ponderance">
                                            <el-option label="高" :value="0">
                                            </el-option>
                                            <el-option label="中" :value="1">
                                            </el-option>
                                            <el-option label="低" :value="2">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template slot="title">
                        <p class="titlt-p">实际控制人配偶法务信息</p>
                    </template>
                    <p class="small-title">对外投资信息</p>
                    <div
                        class="flex-wrap-col supplier"
                        v-for="(item,index) in investmentsOutListType1"
                        :key="'investmentsOutList'+item.type+index">
                        <template v-if="!disabled">
                            <i class="el-icon-circle-plus-outline pointer" v-if="index==0"
                               @click="addList('investmentsOutList',1)"></i>
                            <i class="el-icon-remove-outline pointer" v-else
                               @click="removeList('investmentsOutList', item.id)"></i>
                        </template>
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资公司：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="投资公司"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.investmentCompany">
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资金额：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入投资金额"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.investmentAmount"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资比例：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入投资比例"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.investmentRatio"
                                    >
                                        <template slot="suffix">%</template>
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资性质：</div>
                                <div class="flex-wrap-cont">
                                    <!--0：债务性投资 1：权益性投资 2：混合性投资-->
                                    <el-select placeholder="请选择投资性质" :disabled="disabled"
                                               v-model="item.investmentType">
                                        <el-option label="债务性投资" :value="0"></el-option>
                                        <el-option label="权益性投资" :value="1"></el-option>
                                        <el-option label="混合性投资" :value="2"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资收益：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入投资收益"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.investmentIncome"
                                    >
                                    </el-input>
                                </div>
                            </div>
                        </div>

                    </div>
                    <p class="small-title">资产信息</p>
                    <div v-for="(item,index) in assetListType1" :key="'assetList'+item.type+index">
                        <div class="flex-wrap-col">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">不动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入不动产"

                                        :disabled="disabled"
                                        v-model="item.realEstate" :rows="3" style="width: 600px">
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">准不动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入准不动产"

                                        :disabled="disabled"
                                        v-model="item.chattelReal"
                                        :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入动产"

                                        :disabled="disabled"
                                        v-model="item.movableProperty"
                                        :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-专利：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        type="textarea"
                                        placeholder="专利"

                                        :disabled="disabled"
                                        v-model="item.patent"
                                        :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-商标：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        type="textarea"
                                        placeholder="商标"

                                        :disabled="disabled"
                                        v-model="item.brand"
                                        :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-其他：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        type="textarea"
                                        placeholder="其他"

                                        :disabled="disabled"
                                        v-model="item.other"
                                        :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-col">
                                <div class="flex-wrap-box ">
                                    <div class="flex-wrap-title">附件：</div>
                                    <div
                                        class="flex-wrap-cont"
                                        v-show='!disabled'
                                    >
                                        <el-upload
                                            class="upload-demo"
                                            v-bind="uploadInfo"
                                            :on-success="handleSuccess"
                                            :before-remove="beforeRemove"
                                            :on-exceed="handleExceed"
                                            :file-list="item.attachInfo"
                                            :before-upload="handleUpload"
                                        >
                                            <el-button
                                                size="small"
                                                type="primary"
                                                @click="uploadId(item)"
                                            >点击上传
                                            </el-button>
                                        </el-upload>
                                    </div>
                                    <div class="cont" v-show='disabled' v-if="item.attachInfo">
                                        <div v-if="item.attachInfo.length === 0">暂无附件</div>
                                        <p
                                            v-else
                                            class="upload"
                                            v-for="(sub,index) in item.attachInfo"
                                            :key="index"
                                        ><a :href="sub.url" target="_blank">{{sub.name}}</a></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <p class="small-title">负债信息（万）</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="debtListType1Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('debtListType1')">合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in debtListType1"
                         :key="'debtList'+item.type+index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('debtList',1)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('debtList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">借款：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="借款"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.debt"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">用途：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select :disabled="disabled" v-model="item.purpose" placeholder="请选择用途">
                                            <el-option label="经营借款" value="0"></el-option>
                                            <el-option label="消费贷" value="1"></el-option>
                                            <el-option label="房贷" value="2"></el-option>
                                            <el-option label="车贷" value="3"></el-option>
                                            <el-option label="借记贷" value="4"></el-option>
                                            <el-option label="其他" value="5"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form label-position="top" label-width="200px">
                        <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                rows="4"
                                maxlength="25"
                                :disabled="disabled"
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class="small-title">担保信息（万）</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="assureListType1Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('assureListType1')">
                                    合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in assureListType1" :key="'assureList'+item.type+index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index==0"
                                   @click="addList('assureList',1)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('assureList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">担保：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="担保"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.assure"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">对应金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="对应金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.money"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form label-position="top" label-width="200px">
                        <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                rows="4"
                                maxlength="25"
                                :disabled="disabled"
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class="small-title">诉讼、仲裁及行政处罚事件</p>
                    <div v-for="(item,index) in punishmentListType1" :key="'punishmentList'+item.type+index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('punishmentList',1)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('punishmentList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">事件类型：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select placeholder="诉讼、仲裁" :disabled="disabled"
                                                   v-model="item.punishmentType">
                                            <el-option label="诉讼、仲裁事件" :value="0">
                                            </el-option>
                                            <el-option label="被执行案件" :value="1">
                                            </el-option>
                                            <el-option label="行政处罚" :value="2">
                                            </el-option>
                                            <el-option label="其他" :value="3">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">事件名称：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="请输入"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.caseInfo"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">涉及金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="涉及金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.moneyInvolved"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">严重性：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select placeholder="诉讼、仲裁" :disabled="disabled" v-model="item.ponderance">
                                            <el-option label="高" :value="0">
                                            </el-option>
                                            <el-option label="中" :value="1">
                                            </el-option>
                                            <el-option label="低" :value="2">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="5">
                    <template slot="title">
                        <p class="titlt-p">拟选合伙人法务信息</p>
                    </template>
                    <!--start-->
                    <p class="small-title">对外投资信息</p>
                    <div class="flex-wrap-col supplier" v-for="(item,index) in investmentsOutListType2"
                         :key="'investmentsOutList'+item.type+index">
                        <template v-if="!disabled">
                            <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                               @click="addList('investmentsOutList',2)"></i>
                            <i class="el-icon-remove-outline pointer" v-else
                               @click="removeList('investmentsOutList', item.id)"></i>
                        </template>
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资公司：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="投资公司"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.investmentCompany">
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资金额：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入投资金额"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.investmentAmount"
                                    >
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资比例：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入投资比例"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.investmentRatio"
                                    >
                                        <template slot="suffix">%</template>
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资性质：</div>
                                <div class="flex-wrap-cont">
                                    <!--0：债务性投资 1：权益性投资 2：混合性投资-->
                                    <el-select placeholder="请选择投资性质" :disabled="disabled"
                                               v-model="item.investmentType">
                                        <el-option label="债务性投资" :value="0"></el-option>
                                        <el-option label="权益性投资" :value="1"></el-option>
                                        <el-option label="混合性投资" :value="2"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">投资收益：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入投资收益"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.investmentIncome"
                                    >
                                        <template slot="suffix">万</template>
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="small-title">资产信息</p>
                    <div
                        v-for="(item,index) in assetListType2"
                        :key="'assetList'+item.type+index">
                        <div class="flex-wrap-col">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">不动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入不动产"

                                        :disabled="disabled"
                                        v-model="item.realEstate"
                                        type="textarea" :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">准不动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入准不动产"

                                        :disabled="disabled"
                                        v-model="item.chattelReal"
                                        type="textarea" :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入动产"

                                        :disabled="disabled"
                                        v-model="item.movableProperty"
                                        type="textarea" :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-专利：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="专利"

                                        :disabled="disabled"
                                        v-model="item.patent"
                                        type="textarea" :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-商标：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="商标"

                                        :disabled="disabled"
                                        v-model="item.brand"
                                        type="textarea" :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-其他：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="其他"

                                        :disabled="disabled"
                                        v-model="item.other"
                                        type="textarea" :rows="3" style="width: 600px"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-col">
                                <div class="flex-wrap-box ">
                                    <div class="flex-wrap-title">附件：</div>
                                    <div
                                        class="flex-wrap-cont"
                                        v-show='!disabled'
                                    >
                                        <el-upload
                                            class="upload-demo"
                                            v-bind="uploadInfo"
                                            :on-success="handleSuccess"
                                            :before-remove="beforeRemove"
                                            :on-exceed="handleExceed"
                                            :file-list="item.attachInfo"
                                            :before-upload="handleUpload"
                                        >
                                            <el-button
                                                size="small"
                                                type="primary"
                                                @click="uploadId(item)"
                                            >点击上传
                                            </el-button>
                                        </el-upload>
                                    </div>
                                    <div class="cont" v-show='disabled' v-if="item.attachInfo">
                                        <div v-if="item.attachInfo.length === 0">暂无附件</div>
                                        <p
                                            v-else
                                            class="upload"
                                            v-for="(sub,index) in item.attachInfo"
                                            :key="index"
                                        ><a :href="sub.url" target="_blank">{{sub.name}}</a></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <p class="small-title">负债信息（万）</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="debtListType2Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('debtListType2')">合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in debtListType2"
                         :key="'debtList'+item.type+index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('debtList',2)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('debtList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">借款：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="借款"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.debt"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">用途：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select :disabled="disabled" v-model="item.purpose" placeholder="请选择用途">
                                            <el-option label="经营借款" value="0"></el-option>
                                            <el-option label="消费贷" value="1"></el-option>
                                            <el-option label="房贷" value="2"></el-option>
                                            <el-option label="车贷" value="3"></el-option>
                                            <el-option label="借记贷" value="4"></el-option>
                                            <el-option label="其他" value="5"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form label-position="top" label-width="200px">
                        <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                rows="4"
                                maxlength="25"
                                :disabled="disabled"
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class="small-title">担保信息（万）</p>
                    <p class="small-small-title">经营性担保</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="assureListType2Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('assureListType2')">
                                    合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in assureListType2" :key="'assureList'+item.type+ index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('assureList',2)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('assureList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">担保：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="担保"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.assure"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">对应金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="对应金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.money"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form label-position="top" label-width="200px">
                        <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                rows="4"
                                maxlength="25"
                                :disabled="disabled"
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class="small-small-title">非经营性担保</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="assureListType3Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('assureListType3')">
                                    合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in assureListType3" :key="'assureList'+item.type+ index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('assureList',3)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('assureList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">担保：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="担保"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.assure"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">对应金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="对应金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.money"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="small-title">诉讼、仲裁及行政处罚事件</p>
                    <div v-for="(item,index) in punishmentListType2"
                         :key="'punishmentList'+item.type+index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('punishmentList',2)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('punishmentList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">事件类型：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select placeholder="诉讼、仲裁" :disabled="disabled"
                                                   v-model="item.punishmentType">
                                            <el-option label="诉讼、仲裁事件" :value="0">
                                            </el-option>
                                            <el-option label="被执行案件" :value="1">
                                            </el-option>
                                            <el-option label="行政处罚" :value="2">
                                            </el-option>
                                            <el-option label="其他" :value="3">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">事件名称：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="请输入"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.caseInfo"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">严重性：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select placeholder="诉讼、仲裁" :disabled="disabled" v-model="item.ponderance">
                                            <el-option label="高" :value="0">
                                            </el-option>
                                            <el-option label="中" :value="1">
                                            </el-option>
                                            <el-option label="低" :value="2">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">涉及金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="涉及金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.moneyInvolved"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end-->
                </el-collapse-item>
                <el-collapse-item name="6">
                    <template slot="title">
                        <p class="titlt-p">尽调公司法务信息</p>
                    </template>
                    <!--start-->
                    <p class="small-title">主体资格</p>
                    <div class="flex-wrap-col">
                        <div class="flex-wrap-box ">
                            <div class="flex-wrap-title"><span class="red-span">*</span>工商年报：</div>
                            <div class="flex-wrap-cont">
                                <el-form-item :rules="{required: true ,message: '工商年报不能为空',trigger: 'blur'}"
                                              :prop="'affairs.annualReport'">
                                    <el-input
                                        type="textarea"
                                        style="width:600px"
                                        rows="3"
                                        :disabled="disabled"
                                        placeholder="工商年报"
                                        v-model="justiceData.affairs.annualReport"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="flex-wrap-box ">
                            <div class="flex-wrap-title"><span class="red-span">*</span>营业执照：</div>
                            <div class="flex-wrap-cont">
                                <el-form-item :rules="{required: true ,message: '工商年报不能为空',trigger: 'blur'}"
                                              :prop="'affairs.annualReport'">
                                    <el-input
                                        type="textarea"
                                        style="width:600px"
                                        rows="3"
                                        :disabled="disabled"
                                        placeholder="营业执照"
                                        v-model="justiceData.affairs.businessLicense"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="flex-wrap-box ">
                            <div class="flex-wrap-title"><span class="red-span">*</span>公司章程：</div>
                            <div class="flex-wrap-cont">
                                <el-form-item :rules="{required: true ,message: '公司章程不能为空',trigger: 'blur'}"
                                              :prop="'affairs.articlesOfAssociation'">
                                    <el-input
                                        type="textarea"
                                        style="width:600px"
                                        rows="3"
                                        :disabled="disabled"
                                        placeholder="公司章程"
                                        v-model="justiceData.affairs.articlesOfAssociation"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="flex-wrap-box ">
                            <div class="flex-wrap-title"><span class="red-span">*</span>股权质押：</div>
                            <div class="flex-wrap-cont">
                                <el-form-item :rules="{required: true ,message: '公司章程不能为空',trigger: 'blur'}"
                                              :prop="'affairs.pledgeOfStockRight'">
                                    <el-input
                                        type="textarea"
                                        style="width:600px"
                                        rows="3"
                                        :disabled="disabled"
                                        placeholder="股权质押"
                                        v-model="justiceData.affairs.pledgeOfStockRight"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <p class="small-title">经营资质</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box ">
                            <div class="flex-wrap-title"><span class="red-span">*</span>经营资质：</div>
                            <div class="flex-wrap-cont">
                                <el-form-item :rules="{required: true ,message: '公司章程不能为空',trigger: 'blur'}"
                                              :prop="'affairs.businessQualification'">
                                    <el-input
                                        type="textarea"
                                        style="width:600px"
                                        rows="3"
                                        :disabled="disabled"
                                        placeholder="经营资质"
                                        v-model="justiceData.affairs.businessQualification"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <p class="small-title">分支机构</p>
                    <div class="compete supplier" v-for="(item,index) in justiceData.branchAgencyList"
                         :key="'branchAgencyList'+item.type+index">
                        <template v-if="!disabled">
                            <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                               @click="addList('branchAgencyList',3)"></i>
                            <i class="el-icon-remove-outline pointer" v-else
                               @click="removeList('branchAgencyList', item.id)"></i>
                        </template>
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title"><span class="red-span">*</span>分支机构：</div>
                                <div class="flex-wrap-cont">
                                    <el-form-item :rules="{required: true ,message: '分支机构不能为空',trigger: 'blur'}"
                                                  :prop="'branchAgencyList.'+ index + '.branch'">
                                        <el-input
                                            placeholder="分支机构"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.branch"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="small-title">关联公司</p>

                    <div class="compete supplier" v-for="(item,index) in justiceData.relatedCompanyList"
                         :key="'relatedCompanyList'+ item.type+index">
                        <template v-if="!disabled">
                            <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                               @click="addList('relatedCompanyList',3)"></i>
                            <i class="el-icon-remove-outline pointer" v-else
                               @click="removeList('relatedCompanyList', item.id)"></i>
                        </template>
                        <div class="flex-wrap-row">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">关联公司：</div>
                                <div class="flex-wrap-cont">

                                    <el-input
                                        placeholder="关联公司"
                                        maxlength="25"
                                        :disabled="disabled"
                                        v-model="item.relatedCompany"
                                    >
                                    </el-input>
                                </div>
                            </div>

                        </div>
                    </div>
                    <p class="small-title">资产信息</p>
                    <div v-for="(item,index) in assetListType3" :key="'assetList'+item.type + index">
                        <div class="flex-wrap-col">
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">不动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入不动产"

                                        :disabled="disabled"
                                        v-model="item.realEstate"
                                        type="textarea" :rows="3" style="width: 600px;"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">准不动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入准不动产"

                                        :disabled="disabled"
                                        v-model="item.chattelReal"
                                        type="textarea" :rows="3" style="width: 600px;"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">动产：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="请输入动产"

                                        :disabled="disabled"
                                        v-model="item.movableProperty"
                                        type="textarea" :rows="3" style="width: 600px;"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-专利：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="专利"

                                        :disabled="disabled"
                                        v-model="item.patent"
                                        type="textarea" :rows="3" style="width: 600px;"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-商标：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="商标"

                                        :disabled="disabled"
                                        v-model="item.brand"
                                        type="textarea" :rows="3" style="width: 600px;"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-box">
                                <div class="flex-wrap-title">无形资产-其他：</div>
                                <div class="flex-wrap-cont">
                                    <el-input
                                        placeholder="其他"

                                        :disabled="disabled"
                                        v-model="item.other"
                                        type="textarea" :rows="3" style="width: 600px;"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="flex-wrap-col">
                                <div class="flex-wrap-box ">
                                    <div class="flex-wrap-title">附件：</div>
                                    <div
                                        class="flex-wrap-cont"
                                        v-show='!disabled'
                                    >
                                        <el-upload
                                            class="upload-demo"
                                            v-bind="uploadInfo"
                                            :on-success="handleSuccess"
                                            :before-remove="beforeRemove"
                                            :on-exceed="handleExceed"
                                            :file-list="item.attachInfo"
                                            :before-upload="handleUpload"
                                        >
                                            <el-button
                                                size="small"
                                                type="primary"
                                                @click="uploadId(item)"
                                            >点击上传
                                            </el-button>
                                        </el-upload>
                                    </div>
                                    <div class="cont" v-show='disabled' v-if="item.attachInfo">
                                        <div v-if="item.attachInfo.length === 0">暂无附件</div>
                                        <p
                                            v-else
                                            class="upload"
                                            v-for="(sub,index) in item.attachInfo"
                                            :key="index"
                                        ><a :href="sub.url" target="_blank">{{sub.name}}</a></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <p class="small-title">负债信息（万）</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="debtListType3Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('debtListType3')">合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in debtListType3" :key="'debtList'+ item.type + index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('debtList',3)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('debtList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">借款：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="借款"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.debt"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">用途：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select :disabled="disabled" v-model="item.purpose" placeholder="请选择用途">
                                            <el-option label="经营借款" value="0"></el-option>
                                            <el-option label="消费贷" value="1"></el-option>
                                            <el-option label="房贷" value="2"></el-option>
                                            <el-option label="车贷" value="3"></el-option>
                                            <el-option label="借记贷" value="4"></el-option>
                                            <el-option label="其他" value="5"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form label-position="top" label-width="200px">
                        <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                rows="4"
                                maxlength="25"
                                :disabled="disabled"
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class="small-title">担保信息（万）</p>
                    <p class="small-small-title">经营性担保</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="assureListType4Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('assureListType4')">
                                    合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in assureListType4" :key="'assureList'+item.type+ index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('assureList',4)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('assureList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">担保：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="担保"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.assure"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">对应金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="对应金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.money"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-form label-position="top" label-width="200px">
                        <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                rows="4"
                                maxlength="25"
                                :disabled="disabled"
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class="small-small-title">非经营性担保</p>
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">合计：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    placeholder="合计"
                                    maxlength="25"
                                    :disabled="true"
                                    v-model="assureListType5Total"
                                >
                                </el-input>
                                <el-button type="primary" style="margin-left: 8px" @click="total('assureListType5')">
                                    合计
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in assureListType5" :key="'assureList'+item.type+ index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('assureList',5)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('assureList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">担保：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="担保"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.assure"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">对应金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="对应金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.money"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="small-title">诉讼、仲裁及行政处罚事件</p>
                    <div v-for="(item,index) in punishmentListType3" :key="'punishmentList'+ item.type + index">
                        <div class="flex-wrap-col supplier">
                            <template v-if="!disabled">
                                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                                   @click="addList('punishmentList',3)"></i>
                                <i class="el-icon-remove-outline pointer" v-else
                                   @click="removeList('punishmentList', item.id)"></i>
                            </template>
                            <div class="flex-wrap-row">
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">事件类型：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select placeholder="诉讼、仲裁" :disabled="disabled"
                                                   v-model="item.punishmentType">
                                            <el-option label="诉讼、仲裁事件" :value="0">
                                            </el-option>
                                            <el-option label="被执行案件" :value="1">
                                            </el-option>
                                            <el-option label="行政处罚" :value="2">
                                            </el-option>
                                            <el-option label="其他" :value="3">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">事件名称：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="请输入"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.caseInfo">
                                        </el-input>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">严重性：</div>
                                    <div class="flex-wrap-cont">
                                        <el-select placeholder="严重性" :disabled="disabled" v-model="item.ponderance">
                                            <el-option label="高" :value="0">
                                            </el-option>
                                            <el-option label="中" :value="1">
                                            </el-option>
                                            <el-option label="低" :value="2">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="flex-wrap-box">
                                    <div class="flex-wrap-title">涉及金额：</div>
                                    <div class="flex-wrap-cont">
                                        <el-input
                                            placeholder="涉及金额"
                                            maxlength="25"
                                            :disabled="disabled"
                                            v-model="item.moneyInvolved"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end-->
                </el-collapse-item>
            </el-collapse>
            <div class="flex-wrap-row top20 " v-if="!disabled">
                <!--<div class="flex-wrap-row top20 ">-->
                <el-col :span="2" :offset="6">
                    <el-button type="info" @click="saveJusticeData(true)">暂存</el-button>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary" @click="saveJusticeData(false)">提交</el-button>
                </el-col>
            </div>
        </el-form>
    </div>
</template>
<script>
import { FileUploadUrl } from '@/api/config'
import { findJusticeData, createJusticeDoFirst, createJusticeDo } from './../api/index.js'
import { mapState } from 'vuex'

export default {
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            activeName: '1',
            justiceData: {
                assessmentList: [
                    { assessmentItem: '可否合作', cooperationTarget: '', remark: '', state: 0 },
                    { assessmentItem: '尽调规模', cooperationTarget: '', remark: '', state: 0 },
                    { assessmentItem: '年度递增率', cooperationTarget: '', remark: '', state: 0 },
                    { assessmentItem: '股权比例', cooperationTarget: '', remark: '', state: 0 },
                    { assessmentItem: '净利润率', cooperationTarget: '', remark: '', state: 0 }
                ],
                affairs: {
                    analysisDescription: '',
                    annualReport: '',
                    articlesOfAssociation: '',
                    businessLicense: '',
                    businessQualification: '',
                    legalRisksOfCompany: 0,
                    legalRisksOfController: 0,
                    legalRisksOfControllerMate: 0,
                    personalOperatingloansTotalGuarantees: '',
                    companyLoanTotalGuarantee: ''
                },
                affairsRules: {
                    legalRisksOfCompany: [
                        { required: true, message: '尽调公司法律风险不能为空', trigger: 'change' }
                    ],
                    legalRisksOfController: [
                        { required: true, message: '实际控制人法律风险不能为空', trigger: 'change' }
                    ],
                    legalRisksOfControllerMate: [
                        { required: true, message: '实际控制人配偶法律风险不能为空', trigger: 'change' }
                    ],
                    personalOperatingloansTotalGuarantees: [
                        { required: true, message: '请输入个人经营性借款及担保总额', trigger: 'blur' }
                    ],
                    companyLoanTotalGuarantee: [
                        { required: true, message: '请输入公司借款及担保总额 ', trigger: 'blur' }
                    ]
                },
                copartnerInfoList: [ // 实际合伙人信息
                    {
                        education: 0,
                        idNumber: '',
                        industryReputation: '',
                        industryStatus: '',
                        managementAbility: '',
                        marriage: 0,
                        name: '',
                        partTimeJob: '',
                        sex: 1,
                        shareholdingRatio: '',
                        socialResources: '',
                        type: 0
                    },
                    {
                        education: 0,
                        idNumber: '',
                        industryReputation: '',
                        industryStatus: '',
                        managementAbility: '',
                        marriage: 0,
                        name: '',
                        partTimeJob: '',
                        sex: 0,
                        shareholdingRatio: '',
                        socialResources: '',
                        type: 1
                    },
                    {
                        education: 0,
                        idNumber: '',
                        industryReputation: '',
                        industryStatus: '',
                        managementAbility: '',
                        marriage: 0,
                        name: '',
                        partTimeJob: '',
                        sex: 0,
                        shareholdingRatio: '',
                        socialResources: '',
                        type: 2
                    },
                    {
                        education: 0,
                        idNumber: '',
                        industryReputation: '',
                        industryStatus: '',
                        managementAbility: '',
                        marriage: 0,
                        name: '',
                        partTimeJob: '',
                        sex: 0,
                        shareholdingRatio: '',
                        socialResources: '',
                        type: 3
                    }
                ],
                investmentsOutList: [
                    {
                        investmentAmount: '',
                        investmentIncome: '',
                        investmentRatio: '',
                        investmentType: '',
                        type: 0,
                        id: 4
                    },
                    {
                        investmentAmount: '',
                        investmentIncome: '',
                        investmentRatio: '',
                        investmentType: '',
                        type: 1,
                        id: 5
                    },
                    {
                        investmentAmount: '',
                        investmentIncome: '',
                        investmentRatio: '',
                        investmentType: '',
                        type: 2,
                        id: 6
                    }
                ],
                assetList: [
                    {
                        realEstate: '',
                        chattelReal: '',
                        movableProperty: '',
                        intangibleAssets: '',
                        patent: '',
                        brand: '',
                        other: '',
                        type: 0,
                        id: 7
                    },
                    {
                        realEstate: '',
                        chattelReal: '',
                        movableProperty: '',
                        intangibleAssets: '',
                        patent: '',
                        brand: '',
                        other: '',
                        type: 1,
                        id: 8
                    },
                    {
                        realEstate: '',
                        chattelReal: '',
                        movableProperty: '',
                        intangibleAssets: '',
                        patent: '',
                        brand: '',
                        other: '',
                        type: 2,
                        id: 9
                    },
                    {
                        realEstate: '',
                        chattelReal: '',
                        movableProperty: '',
                        intangibleAssets: '',
                        patent: '',
                        brand: '',
                        other: '',
                        type: 3,
                        id: 10
                    }
                ],
                debtList: [
                    {
                        debt: '',
                        type: 0
                    },
                    {
                        debt: '',
                        type: 1
                    },
                    {
                        debt: '',
                        type: 2
                    },
                    {
                        debt: '',
                        type: 3
                    }
                ],
                assureList: [
                    {
                        assure: '',
                        money: '',
                        type: 0,
                        id: 11
                    },
                    {
                        assure: '',
                        money: '',
                        type: 1,
                        id: 11
                    },
                    {
                        assure: '',
                        money: '',
                        type: 2,
                        id: 12
                    },
                    {
                        assure: '',
                        money: '',
                        type: 3,
                        id: 13
                    },
                    {
                        assure: '',
                        money: '',
                        type: 4,
                        id: 14
                    },
                    {
                        assure: '',
                        money: '',
                        type: 5,
                        id: 15
                    },
                    {
                        assure: '',
                        money: '',
                        type: 6,
                        id: 16
                    }
                ],
                punishmentList: [
                    {
                        punishmentType: 0,
                        ponderance: 0,
                        moneyInvolved: '',
                        type: 0,
                        id: 177
                    },
                    {
                        punishmentType: 0,
                        ponderance: 0,
                        moneyInvolved: '',
                        type: 1,
                        id: 17
                    },
                    {
                        punishmentType: 1,
                        ponderance: 0,
                        moneyInvolved: '',
                        type: 2,
                        id: 18
                    },
                    {
                        punishmentType: 0,
                        ponderance: 0,
                        moneyInvolved: '',
                        type: 3,
                        id: 19
                    },
                    {
                        punishmentType: 2,
                        ponderance: 0,
                        moneyInvolved: '',
                        type: 4,
                        id: 20
                    },
                    {
                        punishmentType: 0,
                        ponderance: 0,
                        moneyInvolved: '',
                        type: 1,
                        id: 21
                    },
                    {
                        punishmentType: 3,
                        ponderance: 0,
                        moneyInvolved: '',
                        type: 2,
                        id: 22
                    }
                ],
                branchAgencyList: [
                    {
                        branch: '',
                        id: 23
                    },
                    {
                        branch: '',
                        id: 24
                    },
                    {
                        branch: '',
                        id: 25
                    }
                ],
                relatedCompanyList: [
                    {
                        relatedCompany: '',
                        id: 26
                    },
                    {
                        relatedCompany: '',
                        id: 27
                    },
                    {
                        relatedCompany: '',
                        id: 28
                    }
                ]
            },
            disabled: false,
            applyId: '',
            type: 1,
            debtListType0Total: '',
            debtListType1Total: '',
            debtListType2Total: '',
            debtListType3Total: '',
            assureListType5Total: '',
            assureListType4Total: '',
            assureListType3Total: '',
            assureListType2Total: '',
            assureListType1Total: '',
            assureListType0Total: '',
            updateTime: '',
            updateUser: '',
            tempFileId: null,
            dueLegalRemarkCreateForm: {
                companyDebtRemark: '',
                companyNotOperatingAssureRemark: '',
                companyOperatingAssureRemark: '',
                controllerAssureRemark: '',
                controllerDebtRemark: '',
                controllerMateAssureRemark: '',
                controllerMateDebtRemark: '',
                id: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadInfo () {
            return {
                action: FileUploadUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.name
                },
                accept: '.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.xlsx,.xls,.ppt,.doc,.docx',
                name: 'multiFile'
            }
        },
        // 0：实际控制人 1：实际控制人配偶 2：拟选合伙人
        investmentsOutListType0 () {
            return this.justiceData.investmentsOutList.filter(value => {
                if (value.type === 0) return value
            })
        },
        investmentsOutListType1 () {
            return this.justiceData.investmentsOutList.filter(value => {
                if (value.type === 1) return value
            })
        },
        investmentsOutListType2 () {
            return this.justiceData.investmentsOutList.filter(value => {
                if (value.type === 2) return value
            })
        },
        // 0：实际控制人 1：实际控制人配偶 2：拟选合伙人 3：尽调公司
        assetListType0 () {
            return this.justiceData.assetList.filter(value => {
                if (value.type === 0) return value
            })
        },
        assetListType1 () {
            return this.justiceData.assetList.filter(value => {
                if (value.type === 1) return value
            })
        },
        assetListType2 () {
            return this.justiceData.assetList.filter(value => {
                if (value.type === 2) return value
            })
        },
        assetListType3 () {
            return this.justiceData.assetList.filter(value => {
                if (value.type === 3) return value
            })
        },
        // 0：实际控制人 1：实际控制人配偶 2：拟选合伙人 3：尽调公司
        debtListType0 () {
            return this.justiceData.debtList.filter(value => {
                if (value.type === 0) return value
            })
        },
        debtListType1 () {
            return this.justiceData.debtList.filter(value => {
                if (value.type === 1) return value
            })
        },
        debtListType2 () {
            return this.justiceData.debtList.filter(value => {
                if (value.type === 2) return value
            })
        },
        debtListType3 () {
            return this.justiceData.debtList.filter(value => {
                if (value.type === 3) return value
            })
        },
        // 0：实际控制人 1：实际控制人配偶 2：拟选合伙人（经营性担保）3：拟选合伙人（非经营性担保）4：尽调公司（经营性担保）5：尽调公司（非经营性担保）
        assureListType0 () {
            return this.justiceData.assureList.filter(value => {
                if (value.type === 0) return value
            })
        },
        assureListType1 () {
            return this.justiceData.assureList.filter(value => {
                if (value.type === 1) return value
            })
        },
        assureListType2 () {
            return this.justiceData.assureList.filter(value => {
                if (value.type === 2) return value
            })
        },
        assureListType3 () {
            return this.justiceData.assureList.filter(value => {
                if (value.type === 3) return value
            })
        },
        assureListType4 () {
            return this.justiceData.assureList.filter(value => {
                if (value.type === 4) return value
            })
        },
        assureListType5 () {
            return this.justiceData.assureList.filter(value => {
                if (value.type === 5) return value
            })
        },
        // 0：实际控制人 1：实际控制人配偶 2：拟选合伙人 3：尽调公司
        punishmentListType0 () {
            return this.justiceData.punishmentList.filter(value => {
                if (value.type === 0) return value
            })
        },
        punishmentListType1 () {
            return this.justiceData.punishmentList.filter(value => {
                if (value.type === 1) return value
            })
        },
        punishmentListType2 () {
            return this.justiceData.punishmentList.filter(value => {
                if (value.type === 2) return value
            })
        },
        punishmentListType3 () {
            return this.justiceData.punishmentList.filter((value, index) => {
                if (value.type === 3) {
                    value.index = index
                    return value
                }
            })
        }
    },
    methods: {
        uploadId (item) {
            this.tempFileId = item.id
        },
        handleSuccess (response, file, fileList) {
            if (response.code !== 200) {
                this.$confirm(response.message, '提示信息').catch(() => {
                })
            } else {
                let uploadedUrl = response.data.accessUrl
                let name = response.data.fileName
                this.justiceData.assetList.forEach(value => {
                    if (value.id === this.tempFileId) {
                        const val = { url: uploadedUrl, name: name }
                        value.attachInfo.push(val)
                    }
                })
            }
        },
        beforeRemove (file, attachInfo) {
            return this.$confirm(`确定移除 ${file.name}？`).then(() => {
                this.justiceData.assetList.forEach(value => {
                    if (value.attachInfo) {
                        let temp = -1
                        value.attachInfo.forEach((value1, index) => {
                            if (value1.url === file.url) {
                                temp = index
                            }
                        })
                        if (temp > -1) value.attachInfo.splice(temp, 1)
                    }
                })
            })
        },
        handleExceed (files, attachInfo) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + attachInfo.length} 个文件`)
        },
        handleUpload (file) {
            if (file.size / (1024 * 1024) > 10) {
                this.$message({
                    message: '建议不要超过10M',
                    type: 'warning'
                })
                return false
            }
        },
        total (name) {
            let total = 0
            let falg = false
            let key = ''
            if (name.indexOf('assureListType') > -1) {
                key = 'money'
            } else {
                key = 'debt'
            }
            this[name].forEach((value) => {
                try {
                    let temp = value[key] - 0
                    total += temp
                } catch (e) {
                    falg = true
                }
            })
            if (falg || isNaN(total)) {
                this.$message({
                    type: 'warning',
                    message: '计算格式不正确！'
                })
                return
            }
            this[name + 'Total'] = total
        },
        onFilterUnNumber (id, fromTo, model, event) {
            let tempIndex = 0
            this['justiceData'][fromTo].forEach((value, index) => {
                if (value.id === id) tempIndex = index
            })
            this['justiceData'][fromTo][tempIndex][model] = event.target.value.replace(/[^\d]/g, '')
        },
        async findJusticeData () {
            const { data } = await findJusticeData({ applyId: this.applyId })
            this.updateTime = data.data.affairs.updateTime
            this.updateUser = data.data.affairs.updateUser
            this.type = data.data.affairs.type
            if (!data.data.affairs.type) {
                this.disabled = (!!data.data.affairs.type) || !this.roleType
            } else {
                this.disabled = (!!data.data.affairs.type)
            }
            let selfId = Date.now()
            let investmentsOutList = []
            let investmentsOutObj = {
                investmentCompany: '',
                investmentAmount: '',
                investmentIncome: '',
                investmentRatio: '',
                investmentType: null,
                type: 0,
                id: selfId
            }
            data.data.investmentsOutList.forEach((value) => {
                switch (value.type) {
                    case 0:
                        investmentsOutList.push(0)
                        break
                    case 1:
                        investmentsOutList.push(1)
                        break
                    case 2:
                        investmentsOutList.push(2)
                        break
                    default:
                        break
                }
            })
            for (let i = 0; i < 3; i++) {
                selfId++
                if (investmentsOutList.indexOf(i) < 0) {
                    let { ...temp } = investmentsOutObj
                    temp.type = i
                    temp.id = selfId
                    data.data.investmentsOutList.push(temp)
                }
            }
            let assetList = []
            let assetObj = {
                attachInfo: '',
                realEstate: '',
                chattelReal: '',
                movableProperty: '',
                intangibleAssets: '',
                patent: '',
                brand: '',
                other: '',
                type: 0,
                id: selfId
            }
            data.data.assetList.forEach((value) => {
                switch (value.type) {
                    case 0:
                        assetList.push(0)
                        break
                    case 1:
                        assetList.push(1)
                        break
                    case 2:
                        assetList.push(2)
                        break
                    case 3:
                        assetList.push(3)
                        break
                    default:
                        break
                }
            })
            for (let i = 0; i < 4; i++) {
                selfId++
                if (assetList.indexOf(i) < 0) {
                    let { ...temp } = assetObj
                    temp.type = i
                    temp.id = selfId
                    data.data.assetList.push(temp)
                }
            }
            data.data.assetList.forEach((value) => {
                if (!value.attachInfo) {
                    value.attachInfo = []
                } else {
                    value.attachInfo = JSON.parse(value.attachInfo)
                }
            })
            let debtList = []
            let debtObj = {
                debt: '',
                purpose: '',
                type: 0,
                id: selfId
            }
            data.data.debtList.forEach((value) => {
                switch (value.type) {
                    case 0:
                        debtList.push(0)
                        break
                    case 1:
                        debtList.push(1)
                        break
                    case 2:
                        debtList.push(2)
                        break
                    case 3:
                        debtList.push(3)
                        break
                    default:
                        break
                }
            })
            for (let i = 0; i < 4; i++) {
                selfId++
                if (debtList.indexOf(i) < 0) {
                    let { ...temp } = debtObj
                    temp.type = i
                    temp.id = selfId
                    data.data.debtList.push(temp)
                }
            }
            let assureList = []
            let assureObj = {
                assure: '',
                money: '',
                type: 0,
                id: selfId
            }
            data.data.assureList.forEach((value) => {
                switch (value.type) {
                    case 0:
                        assureList.push(0)
                        break
                    case 1:
                        assureList.push(1)
                        break
                    case 2:
                        assureList.push(2)
                        break
                    case 3:
                        assureList.push(3)
                        break
                    case 4:
                        assureList.push(4)
                        break
                    case 5:
                        assureList.push(5)
                        break
                    default:
                        break
                }
            })
            for (let i = 0; i < 6; i++) {
                selfId++
                if (assureList.indexOf(i) < 0) {
                    let { ...temp } = assureObj
                    temp.type = i
                    temp.id = selfId
                    data.data.assureList.push(temp)
                }
            }
            let punishmentList = []
            let punishmentObj = {
                punishmentType: '',
                ponderance: '',
                moneyInvolved: '',
                type: 0,
                id: selfId
            }
            data.data.punishmentList.forEach((value) => {
                if (value.type || value.type == 0) {
                    punishmentList.push(value.type)
                }
            })
            for (let i = 0; i < 4; i++) {
                if (punishmentList.indexOf(i) < 0) {
                    selfId++
                    let { ...temp } = punishmentObj
                    temp.type = i
                    temp.id = selfId
                    data.data.punishmentList.push(temp)
                }
            }
            selfId++
            if (data.data.branchAgencyList.length < 1) {
                data.data.branchAgencyList.push({
                    branch: '',
                    id: selfId
                })
            }
            selfId++
            if (data.data.relatedCompanyList.length < 1) {
                data.data.relatedCompanyList.push({
                    relatedCompany: '',
                    id: selfId
                })
            }
            if (!data.data.assureTotal) {
                for (let i = 0; i < 5; i++) {
                    this[`assureListType${i}Total`] = 0
                }
            } else {
                for (let i = 0; i < 6; i++) {
                    this[`assureListType${i}Total`] = data.data.assureTotal[i]
                }
            }
            if (!data.data.debtTotal) {
                for (let i = 0; i < 4; i++) {
                    this[`debtListType${i}Total`] = 0
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    this[`debtListType${i}Total`] = data.data.debtTotal[i]
                }
            }
            this.justiceData = data.data
            this.$refs['form'].resetFields()
        },
        showWarnMsg (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            })
        },
        async doSave (params, message) {
            if (!params.affairs.id) {
                await createJusticeDoFirst(params)
            } else {
                await createJusticeDo(params)
            }
            this.$message({
                type: 'success',
                message: message
            })
            this.$router.go(-1)
        },
        saveJusticeData (isSave) {
            if (this.disabled) {
                this.$message({
                    type: 'warning',
                    message: '已提交数据！'
                })
                return
            }
            const params = JSON.parse(JSON.stringify(this.justiceData))
            params.applyId = this.applyId
            params.createUser = this.userInfo.name
            params.updateUser = this.userInfo.name
            params.assetList.forEach(value => {
                value.attachInfo = JSON.stringify(value.attachInfo)
            })
            let messageTip = ''
            if (isSave) {
                params.affairs.type = 0
                this.type = 0
                messageTip = '暂存成功'
            } else {
                params.affairs.type = 1
                messageTip = '提交成功'
                this.type = 1
            }
            params.applyId = this.applyId
            if (this.type === 1) {
                this.$refs['form'].validate(async (validate) => {
                    if (validate) {
                        this.doSave(params, messageTip)
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '有必填项未填写，请重新检查！'
                        })
                    }
                })
            } else {
                this.doSave(params, messageTip)
            }
        },
        addList (key, type) {
            const { ...obj } = this.justiceData[key][0]
            for (let key1 in obj) {
                switch (typeof obj[key1]) {
                    case 'string':
                        obj[key1] = ''
                        break
                    case 'boolean':
                        obj[key1] = ''
                        break
                    case 'number':
                        obj[key1] = 0
                        break
                    case 'obj':
                        obj[key1] = {}
                        break
                    case Array.isArray(obj[key1]):
                        obj[key1] = []
                        break
                    default:
                        obj[key1] = ''
                }
            }
            obj.type = type
            obj.id = Date.now()
            this.justiceData[key].push(obj)
        },
        removeList (key, id) {
            this.justiceData[key].forEach((value, index) => {
                if (value.id === id) this.justiceData[key].splice(index, 1)
            })
        }
    },
    mounted () {
        this.applyId = this.$route.query.applyId
        this.findJusticeData()
    }
}
</script>
<style lang="scss" scoped>
    .jd-manage {
        padding: 0 15px;

        .lengthen {
            .flex-wrap-box {
                max-width: 150px;
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

    .reviewform .flex-wrap-title {
        line-height: 40px;
    }

    .flex-wrap-box-justice {
        width: 400px;
        display: flex;
    }

    .reviewform .flex-wrap-box-justice .flex-wrap-title {
        min-width: 180px;
    }

    .margin-b {
        margin: 0;
    }

    .red-span {
        color: red;
    }
    .selectconclusion{
        border-radius: 0;
    }
    .fawuForm{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .upload{
        margin-top: -10px;
        margin-bottom: 40px;
    }
</style>

<template>
    <div class="finalApproval" v-if="finalFormID">
        <el-radio-group v-model="radio1" @change="changeGroup">
            <el-radio-button label="评审决议内容"></el-radio-button>
            <el-radio-button label="决议修改记录"></el-radio-button>
        </el-radio-group>
        <div class="tab-layout" v-if="radio1=='评审决议内容'">
            <template v-if="resolutionDetail.status!=14">
                <div class="status-title">评审会决议【{{resStatus[resolutionDetail.resolutionStatus]&&resStatus[resolutionDetail.resolutionStatus].tit}}】</div>
                <div class="status-description">（{{resStatus[resolutionDetail.resolutionStatus]&&resStatus[resolutionDetail.resolutionStatus].txt}}）</div>
                <div class="tab-layout-title">
                    <span></span>
                    <div class="tab-layout-title-box">客户基本信息<h-button table @click="onEditCustomer" v-if="(resolutionDetail.resolutionStatus==1||resolutionDetail.resolutionStatus==3)&&hosAuthCheck(Auths.CRM_WORK_FINAL_EDITCUS)">编辑</h-button>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">企业信息：</div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px">经销商：</font>
                            <span>{{resolutionDetail.companyName}}</span>
                        </div>
                        <div class="info-layout-item">
                            <font style="flex:0 0 150px">经销商客户经理：</font>
                            <span>{{resolutionDetail.userManager}}({{resolutionDetail.userManagerPhone||'-'}})</span>
                        </div>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px">可代采购额度(元)：</font>
                            <span>{{resolutionDetail.purchaseQuota|moneyFormat}}</span>
                        </div>
                        <div class="info-layout-item">
                            <font style="flex:0 0 150px">可用额度(元)：</font>
                            <span>{{resolutionDetail.purchaseBalance|moneyFormat}}</span>
                        </div>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px">经销商评级：</font>
                            <span>{{resolutionDetail.companyLevel||'-'}}</span>
                        </div>

                    </div>
                </div>
                <div class="item">
                    <div class="item-title">项目信息：</div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>项目名称：</font>
                            <span>{{resolutionDetail.projectName}}</span>
                        </div>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>项目合同总额(元)：</font>
                            <span>{{resolutionDetail.contractAmount|moneyFormat}}</span>
                        </div>
                        <div class="info-layout-item">
                            <font><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>项目评级：</font>
                            <span>{{resolutionDetail.levels}}</span>
                        </div>
                    </div>

                </div>
                <!--  -->
                <div class="tab-layout-title">
                    <span></span>
                    <div class="tab-layout-title-box">采购结论<h-button table @click="onEditPur" v-if="(resolutionDetail.resolutionStatus==1||resolutionDetail.resolutionStatus==3)&&hosAuthCheck(Auths.CRM_WORK_FINAL_EDITPUR)">编辑</h-button>
                    </div>
                </div>
                <div class="item">
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>申请代付金额(元)：</font>
                            <span>{{resolutionDetail.predictLoanAmount|moneyFormat}}</span>
                        </div>
                        <div class="info-layout-item">
                            <font style="flex:0 0 165px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>经销商首付款比例(%)：</font>
                            <span>{{resolutionDetail.advancePaymentRate>=0?resolutionDetail.advancePaymentRate:'-'}}%</span>
                        </div>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>采购总额(元)：</font>
                            <span>{{resolutionDetail.deviceAmount|moneyFormat}}</span>
                        </div>
                        <div class="info-layout-item">
                            <font style="flex:0 0 165px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>销售毛利率(%)：</font>
                            <span>{{resolutionDetail.salesGrossMargin >=0?resolutionDetail.salesGrossMargin :'0'}}%</span>
                        </div>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>销售总额(元)：</font>
                            <span>{{(resolutionDetail.salesTotalAmount ? resolutionDetail.salesTotalAmount : resolutionDetail.deviceAmount)|moneyFormat}}</span>
                        </div>
                        <div class="info-layout-item">
                            <font style="flex:0 0 165px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>剩余货款支付周期：</font>
                            <span>{{resolutionDetail.remainPaymentCycle||'-'}}个月</span>
                        </div>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>专项额度(元)：</font>
                            <span>{{resolutionDetail.projectQuotaAmount | moneyFormat}}</span>
                        </div>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item" style="margin-left:10px">
                            <font style="flex:0 0 135px">执行费率(%)：</font>
                        </div>
                    </div>
                    <div class="info-layout" style="margin-left:50px">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>银行承兑：</font>
                            <span>{{onCheckZero(resolutionDetail.acceptBankRate)}}%</span>
                        </div>
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>银行转账：</font>
                            <span>{{onCheckZero(resolutionDetail.transferBankRate)}}%</span>
                        </div>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item" style="margin-left:10pxmargin-top:20px">
                            <font style="flex:0 0 135px">采购信息：</font>
                        </div>
                    </div>
                    <div class="table">
                        <hosJoyTable ref="hosjoyTable" align="center" border stripe :column="tableLabel" :data="tableData" actionWidth='375' prevLocalName="V3.*" localName="V3.*.18">
                             <template #upstreamPayTypeName="slotProps">
                                <template v-for="(value, index) in slotProps.data.row.upstreamPayTypeResponseList">
                                    <div :key="index" v-if="value.upstreamPayType == 1">{{ value.upstreamPayTypeName }}
                                        <span v-if="slotProps.data.row.transferRateType == 2">：{{ slotProps.data.row.transferRate }}%</span>
                                        <span v-else>：{{ value.rate }}%</span>
                                    </div>
                                    <div :key="index" v-if="value.upstreamPayType == 2">{{ value.upstreamPayTypeName }}
                                        <span v-if="slotProps.data.row.acceptanceRateType == 2">：{{ slotProps.data.row.acceptanceRate }}%</span>
                                        <span v-else>：{{ value.rate }}%</span>
                                    </div>
                                </template>
                            </template>
                            <template #upstreamLoanType="slotProps">
                                <span>{{ slotProps.data.row.upstreamLoanType == 1 ? '先款后货' : slotProps.data.row.upstreamLoanType == 2 ? '先货后款' : '-' }}</span>
                            </template>
                        </hosJoyTable>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>评审要求：</font>
                        </div>
                    </div>
                    <div class="tab-textarea" style="margin:15px 0 0 15px;word-break: break-all">
                        <!-- <el-input  type="textarea" placeholder="可在此填写放款交接中的注意事项等" v-model="loanTransfersConfirm.remark" maxlength="500" rows="5" show-word-limit>
                    </el-input> -->
                        <p>{{resolutionDetail.remark}}</p>
                    </div>
                </div>
            </template>
            <template v-if="resolutionDetail.status==14">
                <div class="info-finallNo">
                    <h3>终审结果：不通过</h3>
                    <p>备注信息：{{resolutionDetail.remark||'-'}}</p>
                </div>
            </template>
        </div>
        <el-dialog v-if="editBaseInfoVisible" title="客户基本信息" :close-on-click-modal='false' :visible.sync="editBaseInfoVisible" width="750px" :before-close="handleHidden" :modal='false'>
            <div class="dialog-ctx reviewResolution">
                <div class="reviewResolutionForm-title" style="marginTop:0px">
                    企业信息：
                </div>
                <div class="dialogbaseinfo">
                    <div class="dialogbaseinfo-item">经销商：{{resolutionDetail.companyName}}</div>
                    <div class="dialogbaseinfo-item">经销商客户经理：{{resolutionDetail.userManager}}({{resolutionDetail.userManagerPhone||'-'}})</div>
                </div>
                <div class="dialogbaseinfo">
                    <div class="dialogbaseinfo-item">可代采购额度(元)：{{resolutionDetail.purchaseQuota|moneyFormat}}</div>
                    <div class="dialogbaseinfo-item">可用额度(元)：{{resolutionDetail.purchaseBalance|moneyFormat}}</div>
                </div>
                <div class="dialogbaseinfo">
                    <div class="dialogbaseinfo-item">经销商评级：{{resolutionDetail.companyLevel||'-'}}</div>
                </div>
                <el-form id='elform' :model="baseInfoForm" :rules="formRules" label-width="180px" label-position='right' ref="reviewResolutionForm">
                    <div class="reviewResolutionForm-title" style="marginTop:0px">
                        项目信息：
                    </div>
                    <el-form-item label="项目名称：" prop='projectName' style="marginLeft:-8px">
                        <el-input placeholder="请输入" v-model="baseInfoForm.projectName" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="项目评级：" prop='levels' style="marginLeft:-9px;marginTop:10px">
                        <el-select v-model="baseInfoForm.levels" placeholder="请选择">
                            <el-option label="A+" value="A+"></el-option>
                            <el-option label="A" value="A"></el-option>
                            <el-option label="B+" value="B+"></el-option>
                            <el-option label="B" value="B"></el-option>
                            <el-option label="C+" value="C+"></el-option>
                            <el-option label="C" value="C"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目合同总额(元)：" prop='contractAmount' style="marginLeft:-9px;marginTop:10px">
                        <el-input placeholder="请输入" v-isNum:2 maxlength="50" @input="(val)=>inputChage(val,baseInfoForm,'contractAmount')" :value="money(baseInfoForm.contractAmount)">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="handleHidden">取消</h-button>
                <h-button type="primary" @click="onSaveCustomer">确定</h-button>
            </div>
        </el-dialog>
        <!-- 弹窗 -->
        <el-dialog v-if="purchaseConclusionVisible" title="采购结论" :close-on-click-modal='false' :visible.sync="purchaseConclusionVisible" width="70%" :before-close="handleClose" :modal='false'>
            <div class="dialog-ctx reviewResolution">
                <el-form id='elform' :model="purForm" :rules="purFormRules" label-width="180px" label-position='right' ref="purchaseConclusionForm" class="purchaseConclusion">
                    <div class="form-item">
                        <!-- 仅可输入数字，区间为（0，100000000），最多保留2位小数。 -->
                        <el-form-item label="申请代付金额：" prop='predictLoanAmount'>
                            <el-input v-isNum:2 v-inputMAX='100000000' placeholder="请输入" v-model="purForm.predictLoanAmount" maxlength="50">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <!-- 0-100,最多保留2位小数 -->
                        <el-form-item label="经销商首付款比例" prop='advancePaymentRate'>
                            <el-input placeholder="请输入" v-isNum:2 v-inputMAX='100' v-model="purForm.advancePaymentRate" maxlength="50">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item">
                        <!-- 仅可输入数字，区间为（0，100000000），最多保留2位小数。 -->
                        <!-- @input="(val)=>inputChage(val,baseInfoForm.name)" :value="money(baseInfoForm.name)" -->
                        <el-form-item label="采购总额：" prop='deviceAmount'>
                            <el-input placeholder="请输入" v-isNum:2 v-inputMAX='100000000' v-model="purForm.deviceAmount" maxlength="50">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <!-- 0-100,最多保留2位小数 -->
                        <el-form-item label="销售毛利率" prop='salesGrossMargin'>
                            <el-input placeholder="请输入" v-isNum:6 v-inputMAX='1000' v-model="purForm.salesGrossMargin" maxlength="50">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item">
                        <!-- 仅可输入数字，区间为（0，100000000），最多保留2位小数。 -->
                        <!-- @input="(val)=>inputChage(val,baseInfoForm.name)" :value="money(baseInfoForm.name)" -->
                        <el-form-item label="销售总额：" prop='salesTotalAmount'>
                            <el-input placeholder="请输入" v-model="purForm.salesTotalAmount" disabled>
                                <template slot="append">{{ salesTotalAmount }}元</template>
                            </el-input>
                        </el-form-item>
                        <!--  -->
                        <el-form-item label="剩余货款支付周期：" prop='remainPaymentCycle' style="marginLeft:-9px;">
                            <el-select v-model="purForm.remainPaymentCycle" placeholder="请选择">
                                <el-option label="1个月" :value="1"></el-option>
                                <el-option label="2个月" :value="2"></el-option>
                                <el-option label="3个月" :value="3"></el-option>
                                <el-option label="4个月" :value="4"></el-option>
                                <el-option label="5个月" :value="5"></el-option>
                                <el-option label="6个月" :value="6"></el-option>
                                <el-option label="7个月" :value="7"></el-option>
                                <el-option label="8个月" :value="8"></el-option>
                                <el-option label="9个月" :value="9"></el-option>
                                <el-option label="10个月" :value="10"></el-option>
                                <el-option label="11个月" :value="11"></el-option>
                                <el-option label="12个月" :value="12"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form-item">
                        <el-form-item label="专项额度：" prop='projectQuotaAmount'>
                            <el-input v-isNum:2 v-inputMAX='100000000' placeholder="请输入" v-model="purForm.projectQuotaAmount" maxlength="50">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="reviewResolutionForm-title" style="marginTop:0px">
                        执行费率(%)：
                    </div>
                    <div class="form-item">
                        <!-- 仅可输入数字，区间为（0，100），最多保留2位小数 -->
                        <el-form-item label="银行转账：" prop='transferBankRate'>
                            <el-input v-isNum:2 v-inputMAX='100' placeholder="请输入" v-model="purForm.transferBankRate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                        <!-- 仅可输入数字，区间为（0，100），最多保留2位小数 -->
                        <el-form-item label="银行承兑：" prop='acceptBankRate' style="marginLeft:-9px">
                            <el-input v-isNum:2 v-inputMAX='100' placeholder="请输入" v-model="purForm.acceptBankRate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="reviewResolutionForm-title" style="marginTop:0px">
                        采购信息：
                    </div>
                    <div class="form-table">
                        <hosJoyTable ref="hosjoyTable" align="center" border stripe :showPagination='false' :column="formTableLabel" :data="tableForm" actionWidth='100' prevLocalName="V3.*" localName="V3.*.26" isAction>
                            <template #upstreamPayType="slotProps">
                                <el-checkbox-group v-model="slotProps.data.row.upstreamPayType" @change="handleCheckbox($event, slotProps.data.$index)" class="upstream-pay-type">
                                    <el-checkbox :label="1">银行转账</el-checkbox>
                                    <el-radio-group :disabled="slotProps.data.row.upstreamPayType.indexOf(1) === -1" v-model="slotProps.data.row.transferRateType" @change="handleRadio($event, slotProps.data.$index, 1)">
                                        <el-radio :label='1'>执行费率</el-radio>
                                        <el-radio :label='2'>自定义费率
                                            <el-input style="width:120px !important;" :disabled="slotProps.data.row.transferRateType != 2" v-isNum:2 v-inputMAX='100' placeholder="请输入" v-model="slotProps.data.row.transferRate">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-radio>
                                    </el-radio-group>
                                    <el-checkbox :label="2">银行承兑</el-checkbox>
                                    <el-radio-group :disabled="slotProps.data.row.upstreamPayType.indexOf(2) === -1" v-model="slotProps.data.row.acceptanceRateType" @change="handleRadio($event, slotProps.data.$index, 2)">
                                        <el-radio :label='1'>执行费率</el-radio>
                                        <el-radio :label='2'>自定义费率
                                            <el-input style="width:120px !important;" :disabled="slotProps.data.row.acceptanceRateType != 2" v-isNum:2 v-inputMAX='100' placeholder="请输入" v-model="slotProps.data.row.acceptanceRate">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-radio>
                                    </el-radio-group>
                                </el-checkbox-group>
                            </template>
                            <template #upstreamLoanType="slotProps">
                                <el-select v-model="slotProps.data.row.upstreamLoanType" clearable>
                                    <el-option :value="1" label="先款后货"></el-option>
                                    <el-option :value="2" label="先货后款"></el-option>
                                </el-select>
                            </template>
                            <template #action="slotProps">
                                <h-button table @click="del(slotProps.data)" v-if="tableForm.length>1">删除</h-button>
                            </template>
                        </hosJoyTable>
                        <span style='color: #1890FF;text-decoration: underline;marginTop:-10px;cursor: pointer;' @click="onAddItem"> + 添加采购信息</span>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="handleClose">取消</h-button>
                <h-button type="primary" @click="submit">确定</h-button>
            </div>
        </el-dialog>
        <!-- 1  -->
        <div class="tab-layout" v-if="radio1=='决议修改记录'">
            <div class="tab-layout-flex" v-for="(item,index) in Lists" :key="index">
                <div class="flex-top" v-if="item.recordType!=4&&item.recordType!=7">
                    <span><i>{{item.createBy}}</i>{{item.recordTitle}}</span>
                    <span>{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>

                <div class="flex-cont">
                    <div class="flex-operate" v-if="item.recordType==2||item.recordType==5">
                        <p>钉钉审批流程ID：{{item.dingId}}</p>
                        <p v-if="item.recordType==2&&item.remark">评审要求：{{item.remark}}</p>
                    </div>
                    <!-- 采购单 -->
                    <div v-if="item.projectPurchaseList" class="mt10">
                        <hosJoyTable ref="hosjoyTable" align="center" border stripe :column="tableLabel" :data="item.projectPurchaseList" actionWidth='375' prevLocalName="V3.*" localName="V3.*.18">
                            <template #upstreamPayTypeName="slotProps">
                                <template v-for="(value, index) in slotProps.data.row.upstreamPayTypeResponseList">
                                    <div :key="index" v-if="value.upstreamPayType == 1">{{ value.upstreamPayTypeName }}
                                        <span v-if="slotProps.data.row.transferRateType == 2">：{{ slotProps.data.row.transferRate }}%</span>
                                        <span v-else>：{{ value.rate }}%</span>
                                    </div>
                                    <div :key="index" v-if="value.upstreamPayType == 2">{{ value.upstreamPayTypeName }}
                                        <span v-if="slotProps.data.row.acceptanceRateType == 2">：{{ slotProps.data.row.acceptanceRate }}%</span>
                                        <span v-else>：{{ value.rate }}%</span>
                                    </div>
                                </template>
                            </template>
                            <template #upstreamLoanType="slotProps">
                                <span>{{ slotProps.data.row.upstreamLoanType == 1 ? '先款后货' : slotProps.data.row.upstreamLoanType == 2 ?'先货后款':'-' }}</span>
                            </template>
                        </hosJoyTable>
                    </div>
                    <!-- 操作 -->
                    <div v-if="item.projectResolutionRecordDetailList&&item.projectResolutionRecordDetailList.length>0" class="flex-operate">
                        <p v-for="(jtem,jndex) in item.projectResolutionRecordDetailList" :key="jndex">
                            <span>{{jtem.changeName}}</span>由“<i v-if="jtem.contentBeforeChange">{{jtem.contentBeforeChange}}</i>”变更为“<i>{{jtem.contentAfterChange}}</i>”
                        </p>
                    </div>
                    <!-- <div v-if="item.recordType==2||item.recordType==5"  class="mt20">
                        <span ><i>{{item.createBy}}</i></span>
                    </div> -->
                    <div class="dingBg mt20" v-if="item.recordType==4||item.recordType==7">
                        {{dingStatus[item.recordType]}}:{{item.recordTitle}}
                    </div>
                </div>
            </div>
        </div>

        <el-dialog title="终审" :close-on-click-modal='false' :visible.sync="lastDialog" width="25%" :before-close="handleCloseLast" :modal='false'>
            <el-form :model="lastForm" :rules="lastFormRules" ref="lastForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="评审要求：" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="lastForm.remark" maxlength="500"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseLast">取 消</el-button>
                <el-button type="primary" @click="onSubmitLast">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='tsx'>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { isNum } from '@/utils/validate/format'
import utils from '@/utils/filters'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { getTYCList, getResolutions, resCustomer, resPurchase, getRecordList, initiateDing, finalApproveNo, getProjectLevels } from '../api/index'
import { useDebounce } from '@/decorator'
import * as Auths from '@/utils/auth_const'
import moment from 'moment'
import { deepCopy, isRepeat } from '@/utils/utils'

@Component({
    name: 'finalApproval',
    components: {
        hosJoyTable
    }
})
export default class FinalApproval extends Vue {
    @Prop({ default: '' }) readonly finalFormID!:any
    moment:Function= moment;
    Auths = Auths;
    radio1: string = '评审决议内容';
    tableData: any[] = [];
    Lists:any[] = [];
    lastDialog:boolean = false;
    type:number = 1;
    baseInfoForm: any = {
        projectName: '',
        contractAmount: '',
        levels: '',
        updateBy: '',
        projectId: ''
    };
    lastForm:any={
        remark: ''
    };
    purForm:any = {
        'acceptBankRate': '',
        'advancePaymentRate': '',
        'deviceAmount': '', // 采购总额
        'predictLoanAmount': '',
        'salesGrossMargin': '', // 销售毛利率
        'salesTotalAmount': '', // 销售总额
        'projectQuatoAmount': 0,
        'projectId': '',
        'projectPurchaseList': [
            {
                'ascriptionId': '',
                'deviceBrand': '',
                'deviceCategory': '',
                'id': '',
                'upstreamPayType': '',
                'upstreamSupplierName': '',
                'upstreamSupplierType': '',
                'purchaseDiscountRate': '' // 采购折让
            }
        ],
        'remainPaymentCycle': '',
        'transferBankRate': '',
        'updateBy': ''
    }
    editBaseInfoVisible: boolean = false;
    purchaseConclusionVisible: boolean = false;
    disabled: boolean = true;
    TYCList:any[]=[]
    tableForm: any[] = [

    ];
    dingStatus:Object={
        1: '编辑',
        2: '发起评审决议流程',
        3: '评审决议钉钉流程节点审批',
        4: '评审决议钉钉审批结果',
        5: '发起评审决议变更流程',
        6: '评审决议变更钉钉流程节点审批',
        7: '评审决议变更钉钉审批结果'
    }

    category: any[] = [
        { value: 1, name: '空调' },
        { value: 2, name: '采暖' },
        { value: 3, name: '新风' },
        { value: 4, name: '净水' },
        { value: 5, name: '智能化' },
        { value: 6, name: '辅材' },
        { value: 7, name: '电梯' },
        { value: 8, name: '其他' },
        { value: 9, name: '电器' },
        { value: 10, name: '热水器' }
    ];

    resStatus:Object={
        1: { tit: '待提交', txt: '待风控完善评审决议内容后，提交钉钉审批流程' },
        2: { tit: '审批中', txt: '评审决议审批中，可通过流程ID查询审批进度' },
        3: { tit: '审批未通过', txt: '评审决议审批未通过，可重新发起审批流程' },
        4: { tit: '审批通过', txt: '评审决议审批通过，可通过流程ID查询审批意见' },
        5: { tit: '变更决议待发起', txt: '客户经理发起评审决议内容变更，但尚未发起钉钉审批流' },
        6: { tit: '变更决议审批中', txt: '变更评审决议审批中，可通过流程ID查询审批进度' },
        7: { tit: '变更决议审批未通过', txt: '变更评审决议审批未通过，可通过流程ID查询审批意见，当前页面信息展示为上一次评审决议审批通过时数据' },
        8: { tit: '变更决议审批通过', txt: '变更评审决议审批通过' }
    }

    otherCategory: any = {
        value: ''
    }

    resolutionDetail :any={

    }

    $refs!: {
        form: HTMLFormElement
    }
    get formRules () {
        let rules = {
            projectName: [{ required: true, message: '项目名称必填', trigger: 'blur' }],
            levels: [{ required: true, message: '项目评级必选' }],
            contractAmount: [{ required: true, message: '项目合同总额必填', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value <= 0 || value >= 100000000) {
                            return callback(new Error('项目合同总额(元)区间为（0，100000000）'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ]
        }
        return rules
    }

    get salesTotalAmount () {
        this.purForm.salesTotalAmount = utils.moneyFormat(this.purForm.deviceAmount * (1 + parseFloat(this.purForm.salesGrossMargin) / 100))
        return ''
    }

    get purFormRules () {
        let rules = {
            predictLoanAmount: [
                { required: true, message: '申请代付金额(元)必填', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value <= 0 || value >= 100000000) {
                            return callback(new Error('申请代付金额(元)区间为（0，100000000）'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ],
            advancePaymentRate: [{ required: true, message: '首付款比例必选', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value < 0 || value > 100) {
                            return callback(new Error('首付款比例区间为 [0，100]'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ],
            deviceAmount: [{ required: true, message: '采购总额必填', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value <= 0 || value >= 100000000) {
                            return callback(new Error('采购总额区间为（0，100000000）'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ],
            salesGrossMargin: [{ required: true, message: '销售毛利率必填', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value < 0 || value >= 1000) {
                            return callback(new Error('销售毛利率比例区间为 [0，1000)'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ],
            salesTotalAmount: [{ required: true, message: '销售总额必填', trigger: 'blur' }],
            remainPaymentCycle: [{ required: true, message: '剩余货款支付周期', trigger: 'blur' }],
            acceptBankRate: [{ required: true, message: '银行承兑执行费率必填', trigger: 'blur' }
                // {
                //     validator: (rule, value, callback) => {
                //         if (value <= 0 || value >= 100) {
                //             return callback(new Error('银行承兑执行费率区间为（0，100）'))
                //         } else {
                //             callback()
                //         }
                //     },
                //     trigger: 'blur'
                // }
            ],
            transferBankRate: [{ required: true, message: '银行转账执行费率必填', trigger: 'blur' }
                // {
                //     validator: (rule, value, callback) => {
                //         if (value <= 0 || value >= 100) {
                //             return callback(new Error('银行转账执行费率区间为（0，100）'))
                //         } else {
                //             callback()
                //         }
                //     },
                //     trigger: 'blur'
                // }
            ],
            projectQuotaAmount: [
                { required: true, message: '专项额度(元)必填', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value < 0 || value >= 100000000) {
                            return callback(new Error('专项额度(元)区间为[0，100000000)'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ]
        }
        return rules
    }
    get lastFormRules () {
        let rules = {
            remark: [{ required: true, message: '评审要求必填', trigger: 'blur' }]
        }
        return rules
    }
    tableLabel: tableLabelProps = [
        { label: '上游供应商', prop: 'upstreamSupplierName', width: '120' },
        { label: '设备品牌', prop: 'deviceBrand', width: '120' },
        { label: '上游供应商类型', prop: 'upstreamSupplierType', width: '150', dicData: [{ value: 1, label: '厂商' }, { value: 2, label: '代理商' }, { value: 3, label: '经销商' }] },
        { label: '上游支付方式', prop: 'upstreamPayTypeName', slot: 'upstreamPayTypeName', width: '140' },
        { label: '设备品类', prop: 'deviceCategory' },
        { label: '上游货款方式', prop: 'upstreamLoanType', slot: 'upstreamLoanType', width: '100' },
        { label: '采购折让(%)', prop: 'purchaseDiscountRate', width: '90' }
    ];

    formTableLabel: tableLabelProps = [
        {
            label: '上游供应商',
            prop: 'upstreamSupplierName',
            width: '240',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-autocomplete
                            class="miniSelectCompany"
                            size="mini"
                            placeholder="请输入"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                scope.row[scope.column.property] = val
                            }}
                            fetch-suggestions={this.querySearch}
                            hide-loading
                            maxlength={50}
                        >
                        </el-autocomplete>
                    </div>
                )
            }
        },
        {
            label: '设备品牌',
            prop: 'deviceBrand',
            className: 'form-table-header',
            showOverflowTooltip: false,
            width: '200',
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-input
                            class="mini"
                            size="mini"
                            placeholder="请输入"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                scope.row[scope.column.property] = val
                            }}
                            maxlength={20}
                        ></el-input>
                    </div>
                )
            }
        },
        {
            label: '上游供应商类型',
            prop: 'upstreamSupplierType',
            width: '135',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-select
                            class="miniSelect"
                            size="mini"
                            placeholder="请选择"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                scope.row[scope.column.property] = val
                            }}
                        >
                            <el-option key="1" value={1} label="厂商">厂商</el-option>
                            <el-option key="2" value={2} label="代理商">代理商</el-option>
                            <el-option key="3" value={3} label="经销商">经销商</el-option>
                        </el-select>
                    </div>
                )
            }
        },
        {
            label: '上游支付方式',
            prop: 'upstreamPayType',
            width: '400',
            className: 'form-table-header',
            showOverflowTooltip: false,
            slot: 'upstreamPayType'
        },
        {
            label: '设备品类',
            prop: 'deviceCategoryType',
            width: '360',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-select
                            class="miniSelect"
                            size="mini"
                            multiple
                            placeholder="请选择"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                if (val.includes(8)) {
                                    scope.row.otherDeviceCategory = ''
                                }
                                scope.row[scope.column.property] = val
                            }}
                            style={{ 'width': scope.row[scope.column.property].includes(8) ? '' : '240px' }}
                        >
                            {this.category.map((item, index) => {
                                return (
                                    <el-option
                                        key={index + 'option'}
                                        value={item.value}
                                        label={item.name}
                                    >
                                        {item.name}
                                    </el-option>
                                )
                            })}
                        </el-select>
                        {
                            scope.row[scope.column.property].includes(8) &&
                           <el-input
                               class="categorymini"
                               size="mini"
                               placeholder="请输入"
                               value={scope.row.otherDeviceCategory}
                               onInput={(val) => {
                                   scope.row.otherDeviceCategory = val
                               }}
                               maxlength={15}
                               style="width:100px"
                           ></el-input>
                        }

                    </div>
                )
            }
        },
        {
            label: '上游货款方式',
            prop: 'upstreamLoanType',
            width: '300',
            className: 'form-table-header',
            slot: 'upstreamLoanType'
        },
        {
            label: '采购折让(%)',
            prop: 'purchaseDiscountRate',
            className: 'form-table-header',
            showOverflowTooltip: false,
            width: '200',
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-input
                            class="mini"
                            size="mini"
                            placeholder="请输入"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                if (val < 0 || val >= 100) {
                                } else {
                                    let value = isNum(val, 2)
                                    scope.row[scope.column.property] = value
                                }
                            }}
                            maxlength={5}
                        ></el-input>
                    </div>
                )
            }
        }
        // {
        //     label: '设备品类',
        //     prop: 'deviceCategory',
        //     width: '200',
        //     className: 'form-table-header',
        //     showOverflowTooltip: false,
        //     render: (h: CreateElement, scope: TableRenderParam) => {
        //         let create = this.$createElement // 或者不写箭头函数
        //         return (
        //             create('el-select', {
        //                 class: 'miniSelectSupplier',
        //                 // 组件 prop
        //                 props: {
        //                     size: 'mini',
        //                     placeholder: '请选择',
        //                     value: scope.row[scope.column.property]
        //                 },
        //                 on: {
        //                     input: (val) => { console.log(' 🚗 🚕 🚙 🚌 🚎 ', val); scope.row[scope.column.property] = val },
        //                     focus: () => { console.log(' 🚗 🚕 🚙 🚌 🚎 focus'); this.otherCategory.value = '' }
        //                 },
        //                 scopedSlots: {
        //                     default: props => this.onRenderChild(create, scope)
        //                 },
        //                 // Vue jsx 的 ref需要借助createElement的语法生成
        //                 ref: 'categoryRef'
        //             })
        //         )
        //     }
        // }
    ];

    onRenderChild (h: CreateElement, scope: TableRenderParam) {
        return (
            <div>
                {this.category.map((item, index) => {
                    return (
                        <el-option disabled={this.disabled} key="其它" value={this.otherCategory.value} label={this.otherCategory.value} class="categoryminioption">
                            <span style="float: left;color:#606266;margin-right:5px">其它：</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">
                                <el-input
                                    class="categorymini"
                                    size="mini"
                                    placeholder="请输入"
                                    value={this.otherCategory.value}
                                    onInput={(val) => {
                                        this.otherCategory.value = val
                                    }}
                                    maxlength={15}
                                    style="width:150px"
                                ></el-input>
                                <span class="colorypointer">
                                    <i class="el-icon-check" style="cursor: pointer;color:#FF7A45;padding:0 5px;font-size: 18px;" onClick={() => this.onAddOption(scope)}></i>
                                </span>
                            </span>
                        </el-option>
                    )
                })}

            </div>
        )
    }

    @useDebounce(1000)
    async querySearch (queryString: string, callback: (arg: any) => void) {
        // console.log('queryString', queryString)
        // if (!queryString) return
        // 天眼查查询
        const { data } = await getTYCList({ word: queryString })
        if (data) {
            this.TYCList = data.items
        }
        for (let item in this.TYCList) {
            this.TYCList[item].value = this.TYCList[item].name
        }
        callback(this.TYCList)
    }

    // onRenderHeader () {
    //     return '22'
    // }

    money (val) {
        return utils.money(val)
    }

    inputChage (val, item, propName) {
        let num = isNum(val, 2)
        if (num == '.' || !num) {
            num = ''
        }
        item[propName] = num
    }

    // 删除添加采购信息一行
    del (v) {
        this.tableForm.splice(v.$index, 1)
    }

    // 添加采购信息
    onAddItem () {
        const newArr = this.tableForm.map(val => val.upstreamSupplierName)
        if (isRepeat(newArr)) {
            this.$message.warning('供应商不可重复')
            return
        }
        let _temp = {
            'deviceBrand': '',
            'deviceCategory': '',
            'deviceCategoryType': '',
            'otherDeviceCategory': '',
            'upstreamPayType': [],
            'upstreamSupplierName': '',
            'upstreamSupplierType': '',
            'purchaseDiscountRate': 0,
            'transferRateType': '',
            'transferRate': '',
            'acceptanceRateType': '',
            'acceptanceRate': ''
        }
        this.tableForm.push(_temp)
    }

    // 添加设备品类
    onAddOption (scope) {
        if (!this.otherCategory.value) {
            return
        }
        let one = this.category.find(i => this.otherCategory.value == i.value)
        if (one) {
            return
        }
        this.disabled = false
        scope.row[scope.column.property] = JSON.parse(JSON.stringify(this.otherCategory.value))
        this.category.push({
            value: JSON.parse(JSON.stringify(this.otherCategory.value))
        })
        // let categoryRef:any = this.$refs['categoryRef']
        setTimeout(() => {
            this.disabled = true
        }, 0)
    }
    // 校验表格
    onValidTable (tables) {
        const newArr = tables.map(val => val.upstreamSupplierName)
        if (isRepeat(newArr)) {
            this.$message.warning('供应商不可重复')
            return
        }

        let flag = true
        tables.forEach(element => {
            console.log('element', element)
            delete element.deviceCategory
            delete element.upstreamPayTypeName

            // 银行转账 选中执行费率 则不校验Input
            if (element.transferRateType === 1) {
                delete element.transferRate
            }
            // 银行承兑 选中执行费率 则不校验Input
            if (element.acceptanceRateType === 1) {
                delete element.acceptanceRate
            }
            if (!element.upstreamPayType) {
                flag = false
            }
            if (element.upstreamPayType && element.upstreamPayType.indexOf(1) === -1) {
                delete element.transferRateType
                delete element.transferRate
            }
            if (element.upstreamPayType && element.upstreamPayType.indexOf(2) === -1) {
                delete element.acceptanceRateType
                delete element.acceptanceRate
            }
            if (element['deviceCategoryType'].includes(8)) {
                for (var key in element) {
                    if (element[key] != '0' && !element[key]) {
                        flag = false // 终止程序
                        return
                    }
                }
            } else {
                delete element.otherDeviceCategory
                element['deviceCategory'] = '其他'
                for (var keys in element) {
                    if (element[keys] != '0' && !element[keys]) {
                        flag = false // 终止程序
                        return
                    }
                }
            }
        })
        if (!flag) {
            this.$message.warning('请完善表格的必填项数据!')
        }
        return flag
    }
    // 保存采购结论
    submit () {
        let tableFormList = deepCopy(this.tableForm)
        tableFormList = tableFormList?.map((item:any) => {
            return Object.assign(item, {
                purchaseDiscountRate: parseFloat(item.purchaseDiscountRate)
            })
        })
        this.purForm.updateBy = JSON.parse(sessionStorage.getItem('userInfo') || '').employeeName
        this.purForm.salesGrossMargin = parseFloat(this.purForm.salesGrossMargin)
        this.$refs['purchaseConclusionForm'].validate(async (valid) => {
            if (valid) {
                if (this.onValidTable(tableFormList)) {
                    this.purForm.projectPurchaseList = tableFormList
                    console.log(this.purForm)
                    await resPurchase(this.purForm)
                    this.onFindRes()
                    this.purchaseConclusionVisible = false
                }
            }
        })
    }

    //
    changeGroup (value) {
        this.$forceUpdate()
        if (value == '决议修改记录') {
            this.$emit('onHideFoot', false)
            this.onFindRecords()
        } else {
            this.$emit('onHideFoot', true)
            this.onFindRes()
        }
    }

    // 编辑客户信息
    async onEditCustomer () {
        this.editBaseInfoVisible = true
        const { data } = await getResolutions(this.finalFormID)
        this.resolutionDetail = data
        this.baseInfoForm = {
            contractAmount: data.contractAmount,
            levels: data.levels,
            projectId: this.finalFormID,
            projectName: data.projectName
        }
    }

    // 查询详情
    async onFindRes () {
        const { data } = await getResolutions(this.finalFormID)
        data.salesGrossMargin = data.salesGrossMargin ? data.salesGrossMargin : 0
        this.resolutionDetail = data
        this.tableData = data.resolutionPurchaseList
        this.$emit('onBackLoad', false, this.resolutionDetail.resolutionStatus)
    }

    // 记录
    async onFindRecords () {
        const { data } = await getRecordList(this.finalFormID)
        data.forEach(item => {
            if (item.projectPurchaseList) {
                item.projectPurchaseList.forEach(it => {
                    it.purchaseDiscountRate = it.purchaseDiscountRate || 0
                })
            }
        })
        this.Lists = data
    }

    // 编辑采购单弹窗
    async onEditPur () {
        this.purchaseConclusionVisible = true
        const { data } = await getResolutions(this.finalFormID)
        data.resolutionPurchaseList.forEach(val => {
            val.deviceCategoryType = val.deviceCategoryType ? val.deviceCategoryType.split(',').map(val => Number(val)) : []
            val.purchaseDiscountRate = val.purchaseDiscountRate ? val.purchaseDiscountRate : 0
        })
        data.salesGrossMargin = data.salesGrossMargin ? data.salesGrossMargin : 0
        this.purForm = { ...this.purForm, ...data }
        this.tableForm = data.resolutionPurchaseList || []
    }

    handleClose () {
        this.purchaseConclusionVisible = false
    }
    handleHidden () {
        this.editBaseInfoVisible = false
    }
    async onSaveCustomer () {
        this.$refs['reviewResolutionForm'].validate(async (valid) => {
            if (valid) {
                this.baseInfoForm.updateBy = JSON.parse(sessionStorage.getItem('userInfo') || '').employeeName
                await resCustomer(this.baseInfoForm)

                this.editBaseInfoVisible = false
                this.onFindRes()
            }
        })
    }

    async _finalApprove (val) {
        this.lastDialog = true
        this.lastForm.remark = this.baseInfoForm.remark
        this.type = val
        this.$nextTick(() => {
            this.$refs['lastForm'].clearValidate()
        })
    }
    // 保存结果
    async onSubmitLast () {
        this.$refs['lastForm'].validate(async (valid) => {
            if (valid) {
                if (this.type == 1) {
                    await finalApproveNo({ projectId: this.finalFormID,
                        remark: this.lastForm.remark,
                        updateBy: JSON.parse(sessionStorage.getItem('userInfo') || '').employeeName,
                        updateByMobile: JSON.parse(sessionStorage.getItem('userInfo') || '').phoneNumber
                    })
                    this.$emit('onCompsback')
                    this.$emit('onBackLoad', false)
                } else {
                    await initiateDing({ projectId: this.finalFormID,
                        remark: this.lastForm.remark,
                        updateBy: JSON.parse(sessionStorage.getItem('userInfo') || '').employeeName,
                        updateByMobile: JSON.parse(sessionStorage.getItem('userInfo') || '').phoneNumber
                    })
                    this.$emit('onCompsback')
                    this.$emit('onBackLoad', false)
                }
            }
        })
    }

    handleCloseLast () {
        this.lastDialog = false
        this.lastForm.remark = ''
    }

    handleCheckbox (value, index) {
        if (value?.indexOf(1) === -1) {
            this.tableForm[index].transferRateType = ''
            this.tableForm[index].transferRate = ''
        }
        if (value?.indexOf(2) === -1) {
            this.tableForm[index].acceptanceRateType = ''
            this.tableForm[index].acceptanceRate = ''
        }
    }

    handleRadio (value, index, type) {
        // type 1 银行转账 2 银行承兑
        if (type === 1) {
            this.tableForm[index].transferRate = ''
        } else {
            this.tableForm[index].acceptanceRate = ''
        }
    }

    onCheckZero (val) {
        return val ?? '-'
    }

    mounted () {
        this.onFindRes()
    }
}
</script>

<style  lang='scss' scoped>
@import "../css/finalApproval.scss";
</style>

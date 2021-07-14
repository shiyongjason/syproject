<template>
    <div class="drawer-wrap" v-if="drawer">
        <h-drawer v-if="drawer" title="企业详情" :visible.sync="drawer" :beforeClose="handleClose" direction='rtl' size='50%' :wrapperClosable="false">
            <template #connect>
                <el-tabs v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane label="功能管理" name="first">
                        <div class="drawer-content">
                            <el-form :model="businessDetail" :rules="rules" ref="ruleForm">
                                <el-form-item label="企业名称：" :label-width="formLabelWidth" class="nameall">
                                    <p> {{businessDetail.companyName}} &emsp;<span :class="['authTag',businessDetail.isAuthentication?'tagGreen':'tagOrg']">{{businessDetail.isAuthentication?'已认证':'未认证'}}</span>
                                         <span class="authTag tagInfo">{{businessDetail.memberTag?memberTagArr[businessDetail.memberTag-1].value:'-'}}</span>
                                        <span class="authTag tagInfo">{{chengLabel[businessDetail.chengGongCaiLable]}}</span>
                                        <span class="authTag tagBlue" @click="onTianyan(businessDetail.companyName)">一键天眼</span>
                                    </p>
                                </el-form-item>
                                <el-form-item label="管理员账号：" :label-width="formLabelWidth">
                                    {{businessDetail.userAccount||'-'}}
                                </el-form-item>
                                <el-form-item label="管理员姓名：" :label-width="formLabelWidth">
                                    {{businessDetail.userName||'-'}}
                                </el-form-item>
                                <el-form-item label="客户经理：" :label-width="formLabelWidth">
                                    {{businessDetail.customerManager||'-'}}
                                    <el-button type="primary" size="mini" @click="onEditInfo" v-if="hosAuthCheck(Auths.CRM_AUTHEN_EDITNAME)">修改客户经理</el-button>
                                </el-form-item>
                                <el-form-item label="所属分部：" :label-width="formLabelWidth" prop="pkDeptDoc">
                                    <el-select v-model="businessDetail.pkDeptDoc" placeholder="请选择" :clearable=true>
                                        <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="经营区域：" :label-width="formLabelWidth" required>
                                    <el-col :span="6">
                                        <el-form-item prop="provinceId">
                                            <el-select v-model="businessDetail.provinceId" placeholder="请选择省" @change="onChangeList(1)" class="selectInput">
                                                <el-option label="请选择" value=""></el-option>
                                                <template v-for="item in proviceList">
                                                    <el-option :key="item.provinceId" :label="item.name" :value="item.provinceId">
                                                    </el-option>
                                                </template>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="line" :span="1">-</el-col>
                                    <el-col :span="6">
                                        <el-form-item prop="cityId">
                                            <el-select v-model="businessDetail.cityId" placeholder="请选择市" @change="onChangeList(2)" class="selectInput">
                                                <el-option label="请选择" value=""></el-option>
                                                <el-option v-for="(item) in cityList" :key="item.cityId" :label="item.name" :value="item.cityId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="line" :span="1">-</el-col>
                                    <el-col :span="6">
                                        <el-form-item prop="countryId">
                                            <el-select v-model="businessDetail.countryId" placeholder="请选择区" @change="onChangeList(3)" class="selectInput">
                                                <el-option label="请选择" value=""></el-option>
                                                <el-option v-for="(item) in areaList" :key="item.countryId" :label="item.name" :value="item.countryId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="企业类型：" prop="companyType" :label-width="formLabelWidth">
                                    <el-radio-group v-model="businessDetail.companyType" @change="onClearType">
                                        <el-radio :label=1>体系内</el-radio>
                                        <el-radio :label=2>体系外</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="平台公司：" :label-width="formLabelWidth" class="autoInput" v-if="businessDetail.companyType===1" prop="developOnlineCompanyCode" ref="developOnlineCompany">
                                    <HAutocomplete :placeholder="'请选择平台公司'" :maxlength=30 @back-event="backFindbrand($event,1)" :selectArr="merchantArr" v-if="merchantArr" :selectObj="targetObj" :remove-value='removeValue' />
                                </el-form-item>
                                <template v-if="businessDetail.companyType==2">
                                    <el-form-item label="是否关联平台公司：" prop="isRelated" :label-width="formLabelWidth" ref="isRelated">
                                        <el-radio-group v-model="businessDetail.isRelated" @change="onClearRelated">
                                            <el-radio :label=true>是</el-radio>
                                            <el-radio :label=false>否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="关联平台公司：" :label-width="formLabelWidth" class="autoInput" v-if="businessDetail.isRelated" prop="relationCompanyCode" ref="relationCompany">
                                        <HAutocomplete :placeholder="'请选择关联平台公司'" :maxlength=30 @back-event="backFindbrand($event,2)" :selectArr="merchantArr" v-if="merchantArr" :selectObj="targetObj" :remove-value='removeValue' />
                                    </el-form-item>
                                </template>
                                <el-form-item label="客户分类：" :label-width="formLabelWidth">
                                    {{businessDetail.customerType==1?'黑名单':businessDetail.customerType==2?'白名单':businessDetail.customerType==3?'待审核':'-'}}
                                </el-form-item>
                                <!-- #################### -->
                                <el-form-item label="注册时间：" :label-width="formLabelWidth">
                                    {{businessDetail.estiblishTime|momentFormat('YYYY-MM-DD')}}
                                </el-form-item>
                                <el-form-item label="主营品牌：" :label-width="formLabelWidth">
                                    <el-input v-model.trim="businessDetail.deviceBrand" placeholder='请输入' maxlength="20" class="lageinput"></el-input>
                                </el-form-item>
                                <el-form-item label="主营品类：" :label-width="formLabelWidth">
                                    <el-select v-model="businessDetail.deviceCategory" placeholder="请选择" :clearable=true>
                                        <el-option :label="item.value" :value="item.key" v-for="item in deviceList" :key="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="业务类型：" :label-width="formLabelWidth" prop="note">
                                    <div class="sinput">
                                        <!-- `checked` 为 true 或 false -->
                                        <el-checkbox v-model="businessType.isEngineering" @change="()=>onChangeCheckbox(businessType.isEngineering,'engineering')">
                                            <font class="labelname">工程:</font>
                                        </el-checkbox>
                                        <el-input v-model.trim="businessType.engineering" :disabled='!businessType.isEngineering' v-isNum:0 v-inputMAX='100' class="smallinput">
                                            <template slot="append">%</template>
                                        </el-input>
                                        <font class="errortxt" v-if="businessType.isEngineering&&businessType.engineering==''">请填写工程比例</font>
                                    </div>
                                    <div class="sinput">
                                        <el-checkbox v-model="businessType.isWholesale" @change="()=>onChangeCheckbox(businessType.isWholesale,'wholesale')">
                                            <font class="labelname">批发:</font>
                                        </el-checkbox>
                                        <el-input v-model.trim="businessType.wholesale" :disabled='!businessType.isWholesale' v-isNum:0 v-inputMAX='100' class="smallinput">
                                            <template slot="append">%</template>
                                        </el-input>
                                        <font class="errortxt" v-if="businessType.isWholesale&&businessType.wholesale==''">请填写批发比例</font>
                                    </div>
                                    <div class="sinput">
                                        <el-checkbox v-model="businessType.isRetail" @change="()=>onChangeCheckbox(businessType.isRetail,'retail')">
                                            <font class="labelname">零售:</font>
                                        </el-checkbox>
                                        <el-input v-model.trim="businessType.retail" :disabled='!businessType.isRetail' v-isNum:0 v-inputMAX='100' class="smallinput">
                                            <template slot="append">%</template>
                                        </el-input>
                                        <font class="errortxt" v-if="businessType.isRetail&&businessType.retail==''">请填写零售比例</font>
                                    </div>
                                </el-form-item>
                                <el-form-item label="代理级别：" :label-width="formLabelWidth">
                                    <el-select v-model="businessDetail.agentLevel" placeholder="请选择" :clearable=true>
                                        <el-option :label="item.value" :value="item.key" v-for="item in agentLevel" :key="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="近3年年度工程规模：" :label-width="formLabelWidth">
                                    <el-select v-model="businessDetail.threeYearProjectScale" placeholder="请选择" :clearable=true>
                                        <el-option :label="item.value" :value="item.key" v-for="item in threeYearProjectScale" :key="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="主营项目类别：" :label-width="formLabelWidth">
                                    <el-select v-model="businessDetail.type" placeholder="请选择" :clearable=true>
                                        <el-option :label="item.value" :value="item.key" v-for="item in type_list" :key="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="主辅材品牌：" :label-width="formLabelWidth">
                                    <el-input v-model.trim="businessDetail.materialsBrand" placeholder='备注主辅材品牌' maxlength="20" class="lageinput"></el-input>
                                </el-form-item>
                                <el-form-item label="主辅材采购渠道：" :label-width="formLabelWidth">
                                    <el-select multiple v-model="materialsChannelArr" placeholder="请选择" :clearable=true>
                                        <el-option :label="item.value" :value="item.key" v-for="item in materialsChannel" :key="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="服务能力：" :label-width="formLabelWidth">
                                    <el-radio-group v-model="businessDetail.serviceCapability" @change="serviceCapabilityChange()">
                                        <el-radio :label=1>有</el-radio>
                                        <el-radio :label=2>无</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="哪些专业管理人员：" :label-width="formLabelWidth" class="autoInput" v-if="businessDetail.serviceCapability===1">
                                    <el-checkbox-group v-model="serviceCapabilityDetail">
                                        <el-checkbox label="1">项目经理</el-checkbox>
                                        <el-checkbox label="2">预算</el-checkbox>
                                        <el-checkbox label="3">设计</el-checkbox>
                                        <el-checkbox label="4">售维专员</el-checkbox>
                                        <el-checkbox label="5">技术</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="建筑资质-资质资格：" :label-width="formLabelWidth">
                                    <div v-if="!businessDetail.qualification||businessDetail.qualification.length==0">-</div>
                                    <template v-else>
                                        <div v-for='(item,index) in businessDetail.qualification' :key="index">
                                            <p class="qualification" @click="()=>{qualificationDialogVisible=true;qualificationDialogData=item}">
                                                {{item.qualificationName}}
                                            </p>
                                        </div>
                                    </template>

                                </el-form-item>
                                <el-form-item label="创建时间：" :label-width="formLabelWidth">
                                    {{businessDetail.createTime | formatterTime}}
                                </el-form-item>
                                <el-form-item label="创建人：" :label-width="formLabelWidth">
                                    {{businessDetail.createBy}} {{businessDetail.createPhone}}
                                </el-form-item>
                                <!-- <el-form-item label="关联/认证时间：" :label-width="formLabelWidth">
                                {{businessDetail.authenticationTime | formatterTime}}
                            </el-form-item>
                            <el-form-item label="关联/认证人：" :label-width="formLabelWidth">
                                {{businessDetail.authenticationBy||'-'}} {{businessDetail.authenticationPhone}}
                            </el-form-item> -->
                                <el-form-item label="最近维护时间：" :label-width="formLabelWidth">
                                    {{businessDetail.updateTime| formatterTime}}
                                </el-form-item>
                                <el-form-item label="最近维护人：" :label-width="formLabelWidth">
                                    {{businessDetail.updateBy?businessDetail.updateBy:'-'}} ({{businessDetail.updatePhone}})
                                    <span class="delcompany" @click="onRemove" v-if="hosAuthCheck(Auths.CRM_AUTHEN_DELETE)">删除该企业</span>
                                </el-form-item>
                            </el-form>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="认证信息" name="second">
                        <div class="drawer-content">
                            <el-form :label-width="'150px'" :label-position="'right'">
                                <el-form-item label="企业名称：">
                                    <p> {{authenticationDetail.corporationName ? authenticationDetail.corporationName : '-'}}</p>
                                </el-form-item>
                                <el-form-item label="统一社会信用代码：">
                                    <p> {{authenticationDetail.unifiedSocialCreditCode ? authenticationDetail.unifiedSocialCreditCode : '-'}}</p>
                                </el-form-item>
                                <el-form-item label="法人姓名：">
                                    <p> {{authenticationDetail.legalPersonName ? authenticationDetail.legalPersonName : '-'}}</p>
                                </el-form-item>
                                <el-form-item label="法人身份证号：">
                                    <p> {{authenticationDetail.legalCredentialNumber ? authenticationDetail.legalCredentialNumber : '-'}}</p>
                                </el-form-item>
                                <el-form-item label="营业执照：">
                                    <div class="people-id" v-if="authenticationDetail.businessLicensePhoto">
                                        <elImageAddToken v-if="authenticationDetail.businessLicensePhoto" :file-url="authenticationDetail.businessLicensePhoto" />
                                    </div>
                                    <span v-else>-</span>
                                </el-form-item>
                                <el-form-item label="法人身份证：">
                                    <div class="people-id" v-if="authenticationDetail.certPhotoA && authenticationDetail.certPhotoB">
                                        <elImageAddToken v-if="authenticationDetail.certPhotoA" :file-url="authenticationDetail.certPhotoA" />
                                        <elImageAddToken v-if="authenticationDetail.certPhotoB" :file-url="authenticationDetail.certPhotoB" />
                                    </div>
                                    <span v-else>-</span>
                                </el-form-item>
                                <el-form-item label="认证结果：">
                                    <p v-if="authenticationDetail.authenticationStatus == 1">未认证</p>
                                    <p v-else-if="authenticationDetail.authenticationStatus == 2">认证中</p>
                                    <p v-else-if="authenticationDetail.authenticationStatus == 3">认证成功</p>
                                    <p v-else-if="authenticationDetail.authenticationStatus == 4">认证失败</p>
                                    <p v-else>-</p>
                                </el-form-item>
                                <el-form-item label="认证方式：">
                                    <p v-if="authenticationDetail.authenticationType === 1">中金-开户</p>
                                    <p v-else-if="authenticationDetail.authenticationType === 2">e签宝-工商四要素</p>
                                    <p v-else>-</p>
                                </el-form-item>
                                <el-form-item label="关联/认证时间：">
                                    <p v-if="authenticationDetail.authenticationTime"> {{authenticationDetail.authenticationTime | formatDate('YYYY-MM-DD HH:mm:ss')}}</p>
                                    <p v-else>-</p>
                                </el-form-item>
                                <el-form-item label="关联/认证人：">

                                    <span v-if="authenticationDetail.authenticationBy">
                                        {{authenticationDetail.authenticationBy}}
                                    </span>
                                    <span v-else>-</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="联系方式" name="third">
                        <div class="drawer-content">
                            <el-form :label-width="'150px'" :label-position="'right'" ref="contactForm" :model="companyContact.request" :rules="contactFormRules" @submit.native.prevent>
                                <div class="companyContactlayout">
                                    <el-form-item label="电子邮箱：" :label-width="formLabelWidth" prop="email">
                                        <span v-if="!editorShow.email">
                                            {{companyContact.response.email}}
                                            <i style="font-size:21px;color:#FF7A45;  margin-left: 10px;cursor: pointer;" class="el-icon-edit-outline" @click="()=>onEdit('email')"></i>
                                        </span>
                                        <span v-if="editorShow.email">
                                            <inputAutocomplete v-model="companyContact.request.email" @onMousedown='onMousedown' @onBlur='onBlur' class="lageinput"></inputAutocomplete>
                                            <!-- <el-input  v-model="companyContact.request.email" placeholder='请输入' class="lageinput"></el-input> -->
                                        </span>
                                    </el-form-item>
                                    <span v-if="editorShow.email">
                                        <i style="font-size:21px;color:#FF7A45;  margin-left: 10px;cursor: pointer;" class="el-icon-check" @click="()=>onSure('email')"></i>
                                        <i style="font-size:21px;color:#FF7A45;  margin-left: 10px;cursor: pointer;" class="el-icon-close" @click="()=>onCancel('email')"></i>
                                    </span>
                                </div>

                                <div class="companyContactlayout">
                                    <el-form-item label="联系地址：" :label-width="formLabelWidth" prop="contactAddress">
                                        <span v-if="!editorShow.address">
                                            {{companyContact.response.contactAddress}}
                                            <i style="font-size:21px;color:#FF7A45;  margin-left: 10px;cursor: pointer;" class="el-icon-edit-outline" @click="()=>onEdit('address')"></i>
                                        </span>
                                        <el-input v-else type='textarea' :rows="3" v-model="companyContact.request.contactAddress" placeholder='请输入' class="lageinput" maxlength="200" show-word-limit></el-input>
                                    </el-form-item>
                                    <span v-if="editorShow.address">
                                        <i style="font-size:21px;color:#FF7A45;  margin-left: 10px;cursor: pointer;" class="el-icon-check" @click="()=>onSure('address')"></i>
                                        <i style="font-size:21px;color:#FF7A45;  margin-left: 10px;cursor: pointer;" class="el-icon-close" @click="()=>onCancel('address')"></i>
                                    </span>
                                </div>

                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="员工信息" name="four">
                        <div class="drawer-content employee-content">
                            <div class="employee-bar">
                                <h2>{{ businessDetail.companyName }}</h2>
                                <h-button type="primary" @click="openTransferAdminDialog" v-if="hosAuthCheck(auth_transfer_admin)">转让管理员</h-button>
                            </div>
                            <!--                            goodwork/authenlist  show-check-all-->
                            <basicTable :tableData="employeeTableData" :tableLabel="employeeTableLabel" :show-check-all="false" :is-pagination="false" :isMultiple="false" :actionMinWidth=120>
                                <template slot="selfAction" slot-scope="scope">
                                    <img src="../../../../assets/images/edit.png" alt="" class="employee-edit" @click="openEmployeeRoleDialog(scope.data.row)">
                                </template>
                            </basicTable>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </template>
            <template #btn>
                <div class="drawer-footer" v-if="activeName=='first'">
                    <div class="drawer-button">
                        <el-button type="info" @click="onSetWhite()" v-if="hosAuthCheck(authen_operate)">设置白名单</el-button>
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button type="primary" v-if="hosAuthCheck(authen_baocun)" @click="onSaveDetail()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
                    </div>
                </div>
                <div class="drawer-footer" v-else>
                    <div class="drawer-button">
                        <h-button @click="cancelForm">好 的</h-button>
                    </div>
                </div>
            </template>
        </h-drawer>

        <el-dialog title="设置白名单" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false" :close-on-click-modal=false>
            <el-form ref="statusForm" :model="statusForm" :rules="statusRules" label-width="100px">
                <el-form-item label="客户分类：" prop="customerType">
                    <el-radio-group v-model="statusForm.customerType">
                        <el-radio :label=item.key v-for="item in statusType" :key="item.key">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="说明：" prop="note">
                    <el-input type="textarea" v-model.trim="statusForm.note" maxlength="200" :rows="5" show-word-limit></el-input>
                </el-form-item>
                <p class="page-title">记录</p>
                <div class="page-wrap">
                    <div v-for="(i) in whiteRecordsList" :key=i.id>
                        <i class="el-icon-edit"></i><b>{{i.operator}} {{i.operatorPhone}}</b> 在 <b>{{i.operateTime| formatterTime}}</b> 将 客户分类 设置为了
                        <b> {{i.customerType==1?'黑名单':i.customerType==2?'白名单':i.customerType==3?'待审核':'-'}}</b> 说明：<b>{{i.note}}</b>；
                        <!-- <p v-if="i.customerType==2">白名单失效时间为：<b>{{i.failureTime| formatterTime}}</b></p> -->
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="dialogVisible = false">取消</h-button>
                <h-button type="primary" @click="onPutwhite" :loading="statusLoading">{{ statusLoading ? '提交中 ...' : '确定' }}</h-button>
            </span>
        </el-dialog>
        <el-dialog title="建筑资质-资质资格" :visible.sync="qualificationDialogVisible" width="500px" :before-close="()=>{qualificationDialogVisible = false;qualificationDialogData=''}" :close-on-click-modal=false>
            <div class="qualificationlist">
                <p>
                    <b>资质名称：</b>
                    <font>{{qualificationDialogData.qualificationName}}</font>
                </p>
                <p>
                    <b>发证机关：</b>
                    <font>{{qualificationDialogData.organ}}</font>
                </p>
                <p>
                    <b>证书有效期：</b>
                    <font>{{qualificationDialogData.effectiveTime}}</font>
                </p>
                <p>
                    <b>发证日期：</b>
                    <font>{{qualificationDialogData.certDate}}</font>
                </p>
                <p>
                    <b>资质类别：</b>
                    <font>{{qualificationDialogData.type}}</font>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="qualificationDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="qualificationDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <EditTargetEmployeeRoleDialog :editEmployeeDialogVisible.sync="editEmployeeDialogVisible" :target-val="targetEmployeeData" :roleList="roleList" @updateTableList="getEmployeeList" />
        <TransferAdmin :transferAdminDialogVisible.sync="transferAdminDialogVisible" :adminData="adminData" :employeeTableData="employeeTableData" :companyCode="businessDetail.companyCode" @updateTableList="getEmployeeList" />
        <Searchdialog ref="searchdialog" @onEditCustomerInfo=onEditCustomerInfo></Searchdialog>
    </div>
</template>
<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import EditTargetEmployeeRoleDialog from './editTargetEmployeeRoleDialog'
import TransferAdmin from './transferAdminDialog'
import { mapState, mapGetters, mapActions } from 'vuex'
import Searchdialog from './searchDialog.vue'
import {
    getBusinessAuthen,
    updateCrmauthen,
    putWhiterecord,
    getAuthenticationMessage,
    delCompany,
    findCompanyContact,
    updateContact,
    findEmployeeList, findRoleList
} from '../api/index'
import { deepCopy } from '@/utils/utils'
import * as Auths from '@/utils/auth_const'
import { DEVICE_LIST, AGENTLEVEL, THREEYEARPROJECTSCALE, TYPE_LIST, MATERIALSCHANNEL } from '../../const'
import OssFileUtils from '@/utils/OssFileUtils'
import elImageAddToken from '@/components/elImageAddToken'
import { Email } from '@/utils/rules'
import inputAutocomplete from '../../approveContract/components/inputAutocomplete'

// 1：老板 2：操盘手 3：业务 4：财务 5：仓管 6：普通员工

export default {
    name: 'businessdrawer',
    props: {
        drawer: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            Auths,
            memberTagArr: [{ key: 1, value: '一般会员' }, { key: 2, value: '认证会员' }, { key: 3, value: '评级会员' }, { key: 4, value: '签约会员' }, { key: 5, value: '交易会员' }],
            chengLabel: {
                0: '橙工采会员(未激活)',
                1: '橙工采初级会员',
                2: '橙工采橙级会员'
            },
            editorShow: {
                email: false,
                address: false
            },
            companyContactEditEmail: false,
            companyContactEditAddress: false,
            options: {
                direction: 'rtl',
                size: '50%',
                wrapperClosable: false
            },
            qualificationDialogData: '',
            qualificationDialogVisible: false,
            editEmployeeDialogVisible: false,
            transferAdminDialogVisible: false,
            serviceCapabilityDetail: [],
            businessType: {
                retail: '',
                isRetail: false,
                wholesale: '',
                isWholesale: false,
                engineering: '',
                isEngineering: false
            },
            materialsChannelArr: [],
            materialsChannel: MATERIALSCHANNEL,
            type_list: TYPE_LIST,
            threeYearProjectScale: THREEYEARPROJECTSCALE,
            deviceList: DEVICE_LIST,
            agentLevel: AGENTLEVEL,
            authen_operate: Auths.CRM_WHITE_OPERATE,
            authen_baocun: Auths.CRM_WHITE_BAOCUN,
            auth_transfer_admin: Auths.CRM_TRANSFER_ADMIN,
            removeValue: true,
            branchArr: [],
            formLabelWidth: '150px',
            loading: false,
            statusLoading: false,
            businessDetail: {
            },
            copyDetail: {},
            companyContact: {
                request: {
                    companyId: '',
                    email: '',
                    contactAddress: ''
                },
                response: ''
            },
            rules: {
                pkDeptDoc: [
                    { required: true, message: '请选择分部', trigger: 'change' }
                ],
                // companyType: [
                //     { required: true, message: '请选择企业类型', trigger: 'change' }
                // ],
                countryId: [
                    { required: true, message: '请选择区', trigger: 'change' }
                ],
                cityId: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                provinceId: [
                    { required: true, message: '请选择省', trigger: 'change' }
                ]
            },
            targetObj: {
                selectName: '',
                selectCode: ''
            },
            statusType: [{ value: '黑名单', key: 1 }, { value: '白名单', key: 2 }, { value: '待审核', key: 3 }],
            dialogVisible: false,
            proviceList: [],
            merchantArr: [],
            statusForm: {
                companyCode: '',
                companyName: '',
                customerType: '',
                note: '',
                operator: '',
                operatorPhone: ''
            },
            copyStatusForm: {},
            statusRules: {
                customerType: [
                    { required: true, message: '请选择客户分类', trigger: 'change' }
                ],
                note: [
                    { required: true, message: '请输入说明' }
                ]
            },
            contactFormRules: {
                email: [
                    // { message: '请输入电子邮箱', trigger: 'blur' },
                    { validator: Email }
                ],
                contactAddress: [
                    { message: '请输入联系地址', trigger: 'blur' }
                ]
            },
            whiteRecordsList: [],
            activeName: 'first',
            authenticationDetail: {},
            employeeTableData: [],
            adminData: {},
            employeeTableLabel: [
                { label: '昵称', prop: 'nickName', width: '150' },
                { label: '手机号', prop: 'phoneNumber', width: '150' },
                { label: '角色', prop: 'roleName', width: '150' },
                { label: '加入时间', prop: 'joinTime', width: '200', formatters: 'date' },
                { label: '', hidden: true, prop: 'selfAction' }
            ],
            roleList: [],
            targetEmployeeData: {}
        }
    },
    components: {
        HAutocomplete,
        elImageAddToken,
        inputAutocomplete,
        EditTargetEmployeeRoleDialog,
        TransferAdmin,
        Searchdialog
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            nestDdata: 'nestDdata',
            branchList: 'crmmanage/crmdepList',
            crmauthDetail: 'crmauthen/crmauthDetail',
            platlist: 'crmauthen/platlist',
            whiteRecords: 'crmauthen/whiteRecords'
        }),
        cityList () {
            const province = this.proviceList.filter(item => item.provinceId == this.businessDetail.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        areaList () {
            const city = this.cityList.filter(item => item.cityId == this.businessDetail.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        }
    },
    methods: {
        ...mapActions({
            findNest: 'findNest',
            findBusinessDetail: 'crmauthen/findBusinessDetail',
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findPlatlist: 'crmauthen/findPlatlist',
            findWhiterecords: 'crmauthen/findWhiterecords'

        }),
        onTianyan (name) {
            this.$router.push({ path: '/goodwork/tianyan', query: { name } })
        },
        async openTransferAdminDialog () {
            await this.getEmployeeList()
            this.transferAdminDialogVisible = true
        },
        openEmployeeRoleDialog (val) {
            this.targetEmployeeData = val
            this.editEmployeeDialogVisible = true
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        onMousedown (val) {
            console.log('onMousedown ', val)
        },
        onBlur () {
            console.log('onBlur')
        },
        onEdit (prop) {
            if (this.editorShow.email) {
                this.editorShow.email = false
            }
            if (this.editorShow.address) {
                this.editorShow.address = false
            }
            this.companyContact.request = JSON.parse(JSON.stringify(this.companyContact.response))
            this.editorShow[prop] = true
        },
        // 提交
        onSure (prop) {
            console.log('OnSureEmail')
            this.editorShow[prop] = true
            this.$refs.contactForm.validate(async value => {
                console.log('value: ', value)
                if (value) {
                    await updateContact(this.companyContact.request)
                    await this.handleTabClick()
                    this.editorShow[prop] = false
                } else {

                }
            })
        },
        // 取消
        onCancel (prop) {
            console.log('prop: ', prop)
            this.editorShow[prop] = false
            this.companyContact.request.companyId = this.businessDetail.companyId
            this.$refs.contactForm.clearValidate()
        },
        srcList (collect) {
            async function temp () {
                for (let collectElement of collect) {
                    collectElement = await OssFileUtils.getUrl(collectElement)
                }
            }
            temp()
            return collect
        },
        onChangeCheckbox (b, key) {
            if (!b) {
                this.businessType[key] = ''
            }
        },
        serviceCapabilityChange () {
            if (this.businessDetail.serviceCapability == 2) {
                this.serviceCapabilityDetail = []
            }
        },
        onRemove () {
            let num = this.businessDetail.projects ? this.businessDetail.projects.length : 0
            this.$confirm(num > 0 ? '删除后企业下的项目也将被删除，是否确认删除该企业？' : '是否确认删除该企业，删除后不可恢复', '是否确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await delCompany(this.businessDetail.companyId)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.$emit('backEvent')
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // })
            })
        },
        onClearV () {
            // this.$refs['ruleForm'].clearValidate()
        },
        onClearType () {
            this.targetObj.selectCode = ''
            this.targetObj.selectName = ''
            if (this.businessDetail.companyType == 1) {
                this.$refs['developOnlineCompany'].clearValidate()
            } else {
                // this.$refs['relationCompany'].clearValidate()
                this.$refs['isRelated'].clearValidate()
            }
        },
        onClearRelated () {
            this.targetObj.selectCode = ''
            this.targetObj.selectName = ''
            this.businessDetail.relationCompanyCode = ''
            this.businessDetail.relationCompanyName = ''
            if (this.businessDetail.isRelated) {
                this.$refs['relationCompany'].clearValidate()
            }
        },
        onAutenSatus (val) {
            if (val == 1) {
                return '未认证'
            } else if (val == 2) {
                return '认证中'
            } else if (val == 3) {
                return '认证成功'
            } else if (val == 4) {
                return '认证失败'
            }
        },
        handleClose () {
            if (this.$refs.contactForm) {
                this.$refs.contactForm.clearValidate()
            }
            this.editorShow.email = false
            this.editorShow.address = false
            if (JSON.stringify(this.businessDetail) != JSON.stringify(this.copyDetail)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    this.$emit('backEvent')
                })
            } else {
                this.$emit('backEvent')
            }
            this.activeName = 'first'
        },
        cancelForm () {
            if (JSON.stringify(this.businessDetail) != JSON.stringify(this.copyDetail)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    this.$emit('backEvent')
                })
            } else {
                this.$emit('backEvent')
            }
            this.activeName = 'first'
        },
        async getMerchtMemberDetail (val) {
            const { data } = await getBusinessAuthen(val)
            await this.findBusinessDetail({ companyCode: val })
            this.businessDetail = this.crmauthDetail
            this.businessDetail.authenticationStatus = data.authenticationStatus
            this.copyDetail = deepCopy(this.businessDetail)
            // this.targetObj.selectCode = this.businessDetail.companyType == 1 ? this.businessDetail.developOnlineCompanyCode : this.businessDetail.isRelated ? this.businessDetail.relationCompanyCode : ''
            // this.targetObj.selectName = this.businessDetail.companyType == 1 ? this.businessDetail.developOnlineCompanyName : this.businessDetail.isRelated ? this.businessDetail.relationCompanyName : ''
            this.targetObj.selectCode = this.businessDetail.developOnlineCompanyCode || ''
            this.targetObj.selectName = this.businessDetail.developOnlineCompanyName || ''
            this.statusForm.customerType = ''
            this.statusForm.note = ''
            this.copyStatusForm = deepCopy(this.statusForm)
            this.materialsChannelArr = this.businessDetail.materialsChannel ? this.businessDetail.materialsChannel.toString().split(',') : []
            if (this.businessDetail.businessType) {
                this.businessType = JSON.parse(this.businessDetail.businessType)
            } else {
                this.businessType = {
                    retail: '',
                    isRetail: false,
                    wholesale: '',
                    isWholesale: false,
                    engineering: '',
                    isEngineering: false
                }
            }
            if (this.businessDetail.serviceCapability == 1 && this.businessDetail.serviceCapabilityDetail) {
                this.serviceCapabilityDetail = this.businessDetail.serviceCapabilityDetail.toString().split(',')
            }
        },
        async getAuthenticationDetail (val) {
            const { data } = await getAuthenticationMessage(val)
            this.authenticationDetail = { ...data }
        },
        onSaveDetail () {
            if (this.businessType.isEngineering && this.businessType.engineering == '') {
                this.$message({
                    message: '请填写工程比例',
                    type: 'error'
                })
                return
            }
            if (this.businessType.isWholesale && this.businessType.wholesale == '') {
                this.$message({
                    message: '请填写批发比例',
                    type: 'error'
                })
                return
            }
            if (this.businessType.isRetail && this.businessType.retail == '') {
                this.$message({
                    message: '请填写零售比例',
                    type: 'error'
                })
                return
            }
            this.businessDetail.materialsChannel = this.materialsChannelArr.toString()
            this.businessDetail.serviceCapabilityDetail = this.serviceCapabilityDetail.toString()
            this.businessDetail.businessType = JSON.stringify(this.businessType)
            this.businessDetail.provinceName = this.businessDetail.provinceId && this.proviceList.filter(item => item.provinceId == this.businessDetail.provinceId)[0].name
            this.businessDetail.cityName = this.businessDetail.cityId && this.cityList.filter(item => item.cityId == this.businessDetail.cityId)[0].name
            this.businessDetail.countryName = this.businessDetail.countryId && this.areaList.filter(item => item.countryId == this.businessDetail.countryId)[0].name
            const params = { ...this.businessDetail }
            params.updateBy = this.userInfo.employeeName
            params.updatePhone = this.userInfo.phoneNumber
            if (params.pkDeptDoc) {
                params.subsectionName = this.branchArr.find(v => v.pkDeptDoc == params.pkDeptDoc).deptName || ''
            }
            this.$refs['ruleForm'].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    try {
                        await updateCrmauthen(params)
                        this.$message({
                            message: '数据保存成功',
                            type: 'success'
                        })
                        this.$emit('backEvent')
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }
                }
            })
        },
        async onSetWhite () {
            this.dialogVisible = true
            await this.findWhiterecords({ companyCode: this.businessDetail.companyCode })
            this.whiteRecordsList = this.whiteRecords
            this.statusForm = deepCopy(this.copyStatusForm)
            // 设置白名单
            this.statusForm.customerType = this.businessDetail.customerType
            this.statusForm.companyCode = this.businessDetail.companyCode
            this.statusForm.companyName = this.businessDetail.companyName
            this.$nextTick(() => {
                this.$refs['statusForm'].clearValidate()
            })
        },
        onPutwhite () {
            const params = { ...this.statusForm }
            params.operator = this.userInfo.employeeName
            params.operatorPhone = this.userInfo.phoneNumber
            this.$refs['statusForm'].validate(async (valid) => {
                if (valid) {
                    this.statusLoading = true
                    try {
                        await putWhiterecord(params)
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.$set(this.businessDetail, 'customerType', this.statusForm.customerType)
                        this.statusLoading = false
                    } catch (error) {
                        this.statusLoading = false
                    }
                }
            })
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: JSON.parse(sessionStorage.getItem('authCode')) })
            this.branchArr = this.branchList
        },
        onChangeList (val) {
            if (val === 1) {
                this.businessDetail.countryId = ''
                this.businessDetail.cityId = ''
                // 获取中文
                // this.businessDetail.provinceName = this.businessDetail.provinceId && this.proviceList.filter(item => item.provinceId == this.businessDetail.provinceId).name
            } else if (val === 2) {
                this.businessDetail.countryId = ''
                // this.businessDetail.cityName = this.businessDetail.cityId && this.cityList.filter(item => item.cityId == this.businessDetail.cityId).name
            } else if (val === 3) {
                // this.businessDetail.countryName = this.businessDetail.countryId && this.areaList.filter(item => item.countryId == this.businessDetail.countryId).name
            }
        },
        async getPlatlist () {
            await this.findPlatlist()
            this.merchantArr = this.platlist
        },
        async getFindNest () {
            await this.findNest()
            this.proviceList = this.nestDdata
        },

        backFindbrand (val, type) {
            if (type == 1) {
                this.businessDetail.developOnlineCompanyCode = val.value ? val.value.selectCode : ''
                this.businessDetail.developOnlineCompanyName = val.value ? val.value.companyShortName : ''
            } else {
                this.businessDetail.relationCompanyCode = val.value ? val.value.selectCode : ''
                this.businessDetail.relationCompanyName = val.value ? val.value.companyShortName : ''
            }
        },
        async getEmployeeList () {
            const params = {
                companyCode: this.businessDetail.companyCode
            }
            const { data } = await findEmployeeList(params)
            const { data: roleList } = await findRoleList()
            this.employeeTableData = data
            if (data && data.length > 0) {
                data.forEach(val => {
                    if (val.admin) this.adminData = val
                })
            } else {
                this.adminData = {}
            }
            this.roleList = roleList
        },
        async handleTabClick () {
            if (this.activeName == 'four') {
                this.getEmployeeList()
            } else {
                if (this.editorShow.email) {
                    this.editorShow.email = false
                }
                if (this.editorShow.address) {
                    this.editorShow.address = false
                }
                const { data } = await findCompanyContact(this.businessDetail.companyId)
                this.companyContact.request.companyId = this.businessDetail.companyId
                this.companyContact.response = data
            }
        },
        onEditInfo () {
            this.$refs.searchdialog.onShowSearch({ companyId: this.businessDetail.companyId, deptDoc: this.businessDetail.subsectionCode, deptName: this.businessDetail.subsectionName })
        },
        onEditCustomerInfo (val) {
            console.log(val)
            this.$set(this.businessDetail, 'customerManager', val)
        }
    },
    mounted () {
        this.getFindNest()
        this.onGetbranch()
        this.getPlatlist()
    }
}
</script>
<style  lang="scss" scoped>
/deep/ .el-drawer__body {
    overflow-y: scroll;
}
.drawer-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    form {
        // flex: 1;
        margin-bottom: 60px;
        // border-bottom: 1px solid #e5e5e5;
    }
    .drawer-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px 24px;
        border-top: 1px solid #e5e5ea;
        background: #fff;
        z-index: 1000;
        button {
            flex: 1;
        }
        .drawer-button {
            text-align: right;
        }
    }
}
.employee-content {
    padding-bottom: 200px;
}
.employee-edit {
    width: 20px;
    height: 20px;
}
/deep/.el-tabs__nav-scroll {
    padding-left: 20px;
}
.page-title {
    font-size: 16px;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 0;
}
.page-wrap {
    max-height: 250px;
    overflow-y: scroll;
    div {
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        overflow: hidden;
        color: #303133;
        transition: 0.3s;
        .el-icon-edit {
            color: #ff7a45;
            margin-right: 10px;
        }
        b {
            color: #ff7a45;
            font-weight: 500;
        }
    }
}
/deep/ .el-tabs__item.is-active {
    background: transparent;
    color: #000;
}

/deep/.el-autocomplete {
    width: 100%;
    .el-input {
        width: 100% !important;
    }
}
/deep/.el-drawer__header {
    padding: 20px 20px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
}
.el-form-item__content .el-input {
    width: 200px !important;
}
/deep/.el-autocomplete {
    width: 100% !important;
}
/deep/ .el-form .el-input {
    width: 215px;
}
/deep/ .selectInput {
    width: 100%;
}
/deep/ .selectInput {
    .el-input {
        width: 90%;
    }
}
.authTag {
    border-radius: 8px;
    padding: 0px 8px;
    color: #fff;
    opacity: 0.8;
    display: inline-block;
    height: 23px;
    line-height: 23px;
}
.tagGreen {
    background: #52c41a;
}
.tagOrg {
    background: #ff7a45;
}
.tagInfo {
    background: #13c2c2;
    margin-left: 15px;
}
.tagBlue {
    background: #50b7f7;
    margin-left: 15px;
    cursor: pointer;
}
.nameall {
    /deep/ .el-form-item__content {
        word-break: keep-all;
    }
}
.people-id {
    display: flex;
    p {
        margin-right: 10px;
    }
    img {
        width: 158px;
        height: 100px;
        margin-right: 20px;
    }
}
.companyContactlayout {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    /deep/ .lageinput .el-input__inner {
        width: 100%;
    }
    /deep/.el-form-item {
        margin-bottom: 0;
    }
    /deep/.el-form-item__content .el-input {
        width: 250px !important;
    }
    /deep/.el-form-item__content .el-textarea {
        width: 350px !important;
    }
    /deep/.el-form-item {
        word-break: break-word;
    }
}
/deep/ .lageinput .el-input__inner {
    width: 300px;
}
.sinput {
    margin-right: 2%;
    margin-bottom: 2%;
}
/deep/ .sinput .el-input {
    width: 100px !important;
}
/deep/.sinput .smallinput .el-input-group__append,
.el-input-group__prepend {
    padding: 0 15px !important;
}
/deep/.el-select__tags {
    // margin-left: 10px !important;
}
/deep/.el-form .el-input:not(:first-child) {
    margin-left: 0px;
}
.input-name {
    margin-left: 10px;
}
.qualification {
    line-height: 21px;
    margin-top: 10px;
    color: #ff7a45;
    cursor: pointer;
}
.qualification:hover {
    color: #f55f23;
}
.qualification:first {
    margin-top: 0px;
}
.qualificationlist p {
    display: flex;
    margin: 13px 0;
}
.qualificationlist p b {
    flex: 0 0 90px;
    text-align: right;
}
.delcompany {
    font-size: 14px;
    padding: 8px 18px;
    border: 1px solid #d4d3d3;
    color: #b6b5b5;
    cursor: pointer;
    float: right;
    line-height: 20px;
}
.errortxt {
    color: #f56c6c;
    margin-left: 10px;
}
.labelname {
    margin-right: 10px;
}
.employee-bar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
}
</style>

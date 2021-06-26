<template>
    <div class="page-body B2b ProjectList2">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">管理员手机：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.adminPhoneNumber" placeholder="请输入管理员手机号" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">管理员姓名：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.adminUserName" placeholder="请输入管理员姓名" maxlength="200" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="200" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="请选择" clearable>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">客户经理：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.customer" placeholder="请输入姓名/手机号" maxlength="200" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">主营品类：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deviceCategories" multiple placeholder="请选择" clearable>
                            <el-option v-for="item in maincategory" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">主营品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.deviceBrand" placeholder="请输入主营品牌" maxlength="200" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" maxlength="200" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">销售阶段：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.flowUpProcess" placeholder="请选择" clearable>
                            <el-option :label="item.value" :value="item.key" :key='item.value' v-for="item in [{key: '',value: '全部'},...flowUpProcess]"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="()=>getList()">
                        查询
                    </h-button>
                    <h-button @click="onExport">
                        导出
                    </h-button>
                    <h-button @click="onAddProject">
                        新增
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{statistics.totalProjectNum}} 项, 项目数 {{statistics.totalProjectNum}} 个；已签约 {{statistics.totalSignedNum}} 个；已回款 {{statistics.totalRefundNum}} 个， 已回款金额 {{fundMoneys(statistics.totalRefundAmount)}} 元 </el-tag>
            <hosJoyTable ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList"
                actionWidth='200' isAction :isActionFixed='tableData&&tableData.length>0' >
                <template #action="slotProps">
                    <h-button table  @click="viewDetail(slotProps.data.row.projectId)">查看详情</h-button>
                    <!-- // 0不展示 ，1签约，2回款 -->
                    <h-button table v-if="slotProps.data.row.buttonShowType==1"  @click="signAContract(slotProps.data.row.projectId)">签约</h-button>
                    <h-button table v-if="slotProps.data.row.buttonShowType==2"  @click="onShowPayback(slotProps.data.row.projectId)">回款</h-button>
                </template>
            </hosJoyTable>
        </div>
        <!-- 签约确认 -->
        <el-dialog title="签约确认" :close-on-click-modal='false' v-if="showSign" :visible.sync="showSign" width="720px" :before-close="() => closereqProjectSupply()" >
            <div class="list2_0 itemflex">
                <el-form id='elform' :model="reqBossProjectRefund" :rules="formRulesReqBossProjectRefund"  label-position='left' ref="reqProjectSupply" class="purchaseConclusion" :validate-on-rule-change='false'>
                    <div class="form-item">
                        <el-form-item  prop='contractNo' label="合同编号：">
                            <el-input  placeholder="请输入工程合同编号" v-model="reqBossProjectRefund.contractNo" maxlength="50"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item noctx">
                        <el-form-item  prop='contractAttachments' label="请上传签约合同附件：">
                            <span class="txt">（上传合同附件，支持PDF格式，单个文件最大允许20M）</span>
                        </el-form-item>
                        <div>
                            <div>
                                <div class="file_box" v-for="(item,index) in reqBossProjectRefund.contractAttachments" :key="item.fileUrl">
                                    <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                                    <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                                    <em @click="()=>handleDelFile(index,reqBossProjectRefund.contractAttachments)">删除</em>
                                </div>
                            </div>
                            <OssFileHosjoyUpload :showPreView='false' v-model="reqBossProjectRefund.contractAttachments" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:0 0 0 5px" accept=".pdf" @successCb='onSuccessCbSign'>
                            <div class="a-line">
                                <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                            </div>
                            </OssFileHosjoyUpload>
                        </div>
                    </div>
                    <div class="form-item">
                        <el-checkbox v-model="reqBossProjectRefund.hasRefunded" :true-label='1' :false-label='0' >
                            <span>已回款：</span>
                            <span class="txt" style="font-size:15px;">如已收到签约回款额，请输入回款信息</span>
                        </el-checkbox>
                    </div>
                    <div class="form-item" v-if="!!reqBossProjectRefund.hasRefunded">
                        <el-form-item  prop='refundAmount' label="签约回款额：">
                            <el-input  placeholder="请输入签约回款额" @input="(val)=>inputChage(val,reqBossProjectRefund,'refundAmount')" :value="fundMoneys(reqBossProjectRefund.refundAmount)" >
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item" v-if="!!reqBossProjectRefund.hasRefunded">
                        <el-form-item  prop='refundPayType' label="支付方式：">
                            <el-select v-model="reqBossProjectRefund.refundPayType" placeholder="请选择">
                                <el-option :label="item.value" :value="item.key" :key='item.value' v-for="item in refundPayType"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form-item noctx" v-if="!!reqBossProjectRefund.hasRefunded">
                        <el-form-item  prop='refundPics' label="请上传支付凭证：">
                            <span class="txt">（上传1-2张经销商的付款截图或银行到账截图，支持jpeg,png和jpg格式）</span>
                        </el-form-item>
                        <div>
                            <div>
                                <div class="file_box" v-for="(item,index) in reqBossProjectRefund.refundPics" :key="item.fileUrl">
                                    <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                                    <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                                    <em @click="()=>handleDelFile(index,reqBossProjectRefund.refundPics)">删除</em>
                                </div>
                            </div>
                            <OssFileHosjoyUpload :showPreView='false' v-model="reqBossProjectRefund.refundPics" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:0 0 0 5px" accept=".jpg,.jpeg,.png" @successCb='onSuccessCbSign'>
                            <div class="a-line">
                                <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                            </div>
                            </OssFileHosjoyUpload>
                        </div>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="() => closereqProjectSupply()">取消</h-button>
                <h-button type="primary" @click="submitreqProjectSupply">确定</h-button>
            </div>
        </el-dialog>
        <!-- 回款确认 -->
        <el-dialog title="回款确认" :close-on-click-modal='false' v-if="showPayback" :visible.sync="showPayback" width="720px" :before-close="()=>closePayback()" >
            <div class="list2_0 itemflex">
                <el-form id='elform' :model="reqBossProjectRefund" :rules="formRulesReqBossProjectRefund"  label-position='left' ref="paybackForm" class="purchaseConclusion" :validate-on-rule-change='false'>
                    <div class="form-item">
                        <el-form-item  prop='refundAmount' label="签约回款额：">
                            <el-input  placeholder="请输入签约回款额" @input="(val)=>inputChage(val,reqBossProjectRefund,'refundAmount')" :value="fundMoneys(reqBossProjectRefund.refundAmount)">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item">
                        <el-form-item  prop='refundPayType' label="支付方式：">
                            <el-select v-model="reqBossProjectRefund.refundPayType" placeholder="请选择">
                                <el-option :label="item.value" :value="item.key" :key='item.value' v-for="item in refundPayType"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form-item noctx">
                        <el-form-item  prop='refundPics' label="请上传支付凭证：">
                            <span class="txt">（上传1-2张经销商的付款截图或银行到账截图，支持jpeg,png和jpg格式）</span>
                        </el-form-item>
                        <div>
                            <div>
                                <div class="file_box" v-for="(item,index) in reqBossProjectRefund.refundPics" :key="item.fileUrl">
                                    <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                                    <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                                    <em @click="()=>handleDelFile(index,reqBossProjectRefund.refundPics)">删除</em>
                                </div>
                            </div>
                            <OssFileHosjoyUpload :showPreView='false' v-model="reqBossProjectRefund.refundPics" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:0 0 0 5px" accept=".jpg,.jpeg,.png" @successCb='onSuccessCb'>
                            <div class="a-line">
                                <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                            </div>
                            </OssFileHosjoyUpload>
                        </div>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="()=>closePayback()">取消</h-button>
                <h-button type="primary" @click="submitPaybackForm">确定</h-button>
            </div>
        </el-dialog>
        <!-- 新增2.0项目 -->
        <el-dialog title="新增2.0项目" :close-on-click-modal='false' :visible.sync="showAddProject" width="1080px" :before-close="()=>closeAddProject()" >
            <div class="list2_0">
                <el-form id='elform' :model="reqProjectSupply" :rules="formRules"  label-width="150px"  label-position='right' ref="addForm" class="list2">
                    <div class="flex-item">
                        <div class="form-item">
                            <el-form-item  prop='companyId' label="企业名称：">
                                <el-select v-model="reqProjectSupply.companyId" @change='selectItem' placeholder="请输入企业名称查询" filterable remote :remote-method="remoteMethod" >
                                    <el-option v-for="items in optionsCompany" :key="items.companyId" :label="items.companyName" :value="items.companyId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="管理员手机号：">{{reqProjectSupply.adminUserPhone||'-'}}</el-form-item>
                        </div>
                    </div>
                    <div class="flex-item">
                        <div class="form-item">
                            <el-form-item  label="管理员姓名：">{{reqProjectSupply.adminUserName||'-'}}</el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="所属分部：">
                                <el-select v-model="reqProjectSupply.deptName" placeholder="请选择" clearable>
                                    <el-option :label="item.deptName" :value="item.deptName" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item">
                        <div class="form-item">
                            <el-form-item  label="客户经理：">
                                <!-- <el-input  placeholder="请输入客户经理" v-model='reqProjectSupply.customerName' maxlength="200"></el-input> -->
                                {{reqProjectSupply.customerName||'-'}}
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="客户经理手机号：">{{reqProjectSupply.customerMobile||'-'}}</el-form-item>
                        </div>
                    </div>
                    <!-- 项目信息 -->
                    <div class="flex-item">
                        <div class="form-item">
                            <el-form-item  prop='firstPartName' label="甲方名称：">
                                <el-input  placeholder="请输入甲方名称" v-model='reqProjectSupply.firstPartName' maxlength="25"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  prop='projectName' label="项目名称：">
                                <el-input  placeholder="请输入项目名称" v-model='reqProjectSupply.projectName' maxlength="25"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item">
                        <el-form-item  label="项目地址：">
                            <div class="query-cont-col-area">
                                <el-select v-model="reqProjectSupply.provinceId" @change="onProvince" placeholder="省" clearable>
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select v-model="reqProjectSupply.cityId" @change="onCity" placeholder="市" clearable>
                                    <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select v-model="reqProjectSupply.countryId" placeholder="区"  @change="onArea" clearable>
                                    <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item  label="详细地址：">
                                <el-input :rows="2" type="textarea" show-word-limit maxlength="200" placeholder="请输入详细地址" v-model='reqProjectSupply.address'></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item prop='projectBuildingTypeList' label="">
                                <div slot="label" style="line-height: 20px;">项目建筑类型<br/>（可多选）：</div>
                                <el-select v-model="reqProjectSupply.projectBuildingTypeList" multiple placeholder="请选择">
                                    <el-option v-for="item in projectBuildingType" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item prop='projectRoleList' label="">
                                <div slot="label" style="line-height: 20px;"><font style="padding-right:10px">项目角色</font><br/>（可多选）：</div>
                                <el-select v-model="reqProjectSupply.projectRoleList" multiple placeholder="请选择">
                                    <el-option v-for="item in projectRole" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item prop='projectStep' label="">
                                <div slot="label">项目所处的阶段：</div>
                                <el-select v-model="reqProjectSupply.projectStep" placeholder="请选择">
                                    <el-option v-for="item in projectStep" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item prop='generalGoodsList' label="">
                                <div slot="label" style="line-height: 20px;"><font>可从总部采购产品</font><br/>（可多选）：</div>
                                <el-select v-model="reqProjectSupply.generalGoodsList" multiple placeholder="请选择">
                                    <el-option v-for="item in generalGoods" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font>工程项目智能化需求</font><br/>（可多选）：</div>
                                <el-select v-model="reqProjectSupply.projectIntelligentNeedsList" multiple placeholder="请选择">
                                    <el-option v-for="item in projectIntelligentNeeds" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item prop="estimatedSignAmount"  label="项目预估签约额：">
                                <el-input  placeholder="请输入项目预估签约额" @input="(val)=>inputChage(val,reqProjectSupply,'estimatedSignAmount')" :value="fundMoneys(reqProjectSupply.estimatedSignAmount)">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item  label="项目预计交付时间：">
                                <el-date-picker v-model="reqProjectSupply.estimatedDeliverTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="()=>closeAddProject()">取消</h-button>
                <h-button type="primary" @click="submitAddForm">确定</h-button>
            </div>
        </el-dialog>
        <detail :drawer='drawer' :projectDetail = 'projectDetail' :formRules='formRules' :projectId='projectId' @getDetail = 'viewDetail' @getList='getList' @handleClose="()=>drawer = false" v-if="drawer" />
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import filters from '@/utils/filters'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { ccpBaseUrl, interfaceUrl, ossAliyun, ossOldBucket } from '@/api/config'
import OssFileUtils from '@/utils/OssFileUtils'
import { isNum } from '@/utils/validate/format'
import { MAINCATEGORY } from './const/index'
import { DictionaryList, getChiness, SearchByItem, getProjectList, addProject, getcompanyByName, getCompanyUserById, getProjectDetail, projectSign, projectRefund, getFlowUp } from './api/index'
import detail from './detail.vue'
import { handleSubmit, validateForm } from '@/decorator'
import { ReqProjectSupply, RespBossProjectSupply } from '@/interface/hbp-member'
import { ReqBossProjectRefund } from './interface'
import { CreateElement } from 'vue'

interface companyObj {
        adminUserName: string,
        adminUserPhone: string,
        companyCode: string,
        companyId: string,
        companyName: string,
        customerName: string,
        customerPhone: string,
        subsectionCode: string,
        subsectionName: string,
    }
@Component({
    name: 'ProjectList2',
    components: {
        hosJoyTable, OssFileHosjoyUpload, detail
    }
})
export default class ProjectList2 extends Vue {
    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList: Array<HCGCommonInterface.Branch>
    @Getter('projectStore/projectIntelligentNeeds') projectIntelligentNeeds: DictionaryList
    @Getter('projectStore/projectBuildingType') projectBuildingType: DictionaryList
    @Getter('projectStore/projectStep') projectStep: DictionaryList
    @Getter('projectStore/projectRole') projectRole: DictionaryList
    @Getter('projectStore/generalGoods') generalGoods: DictionaryList
    @Getter('projectStore/refundPayType') refundPayType: DictionaryList
    @Getter('projectStore/flowUpProcess') flowUpProcess: DictionaryList
    @Action('crmmanage/findCrmdeplist') findCrmdeplist: Function
    @Action('projectStore/findDictionaryList') findDictionaryList:(p:SearchByItem) => Promise<any>
    projectId:any = ''
    showAddProject:boolean = false
    showSign:boolean = false
    showPayback:boolean = false
    checkboxChecked:boolean = false
    drawer:boolean = false
    provinceList:any[] = []
    cityList:any[] = []
    // 表格上放统计
    statistics:any = ''
    optionsCompany:any[] = []
    projectDetail:ReqProjectSupply = {}

    maincategory = MAINCATEGORY

    action = ccpBaseUrl + 'common/files/upload-old'

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:RespBossProjectSupply[] = []
    reqBossProjectRefund:ReqBossProjectRefund = {
        contractAttachments: [],
        contractNo: '',
        hasRefunded: 0,
        operatorName: '',
        operatorPhone: '',
        projectId: '',
        refundAmount: '',
        refundPayType: '',
        refundPics: []
    }
    queryParams: any = {
        adminPhoneNumber: '',
        adminUserName: '',
        companyName: '',
        customer: '',
        deviceBrand: '',
        deviceCategories: '',
        flowUpProcess: '',
        projectName: '',
        subsectionCode: '',
        pageNumber: 1,
        pageSize: 10
    }
    reqProjectSupply:ReqProjectSupply & companyObj = {
        adminUserName: '',
        adminUserPhone: '',
        companyCode: '',
        companyId: '',
        companyName: '',
        customerName: '',
        customerPhone: '',
        subsectionCode: '',
        subsectionName: '',
        provinceId: '',
        cityId: '',
        countryId: '',
        estimatedSignAmount: ''
    }
     uploadParameters = {
         updateUid: '',
         reservedName: false
     }

    tableLabel:tableLabelProps = [
        // 点击公司跳转到好橙工——【企业管理】已输入该企业名称的查询结果
        { label: '公司全称',
            prop: 'companyName',
            width: '200',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return (
                    <span onClick={() => this.onClickLink(scope)} style="color:skyBlue;cursor: pointer;">{scope.row.companyName}</span>
                )
            }
        },
        { label: '管理员姓名', prop: 'adminUserName', width: '120' },
        { label: '管理员手机号', prop: 'adminPhoneNumber', width: '120' },
        { label: '主营品类', prop: 'deviceCategoryName', width: '120' },
        { label: '主营品牌', prop: 'deviceBrand', width: '120' },
        { label: '所属分部', prop: 'subsectionName', width: '120' },
        { label: '客户经理', prop: 'customerName', width: '140' },
        { label: '甲方名称', prop: 'firstPartName', width: '200' },
        { label: '项目名称', prop: 'projectName', width: '230' },
        { label: '项目地址', prop: 'address', width: '300' },
        { label: '项目建筑类型', prop: 'projectBuildingTypeNames', width: '120' },
        { label: '项目角色', prop: 'projectRoleNames', width: '120' },
        { label: '项目所处的阶段', prop: 'projectStepString', width: '130' },
        { label: '可从总部采购产品', prop: 'generalGoodsNames', width: '120' },
        { label: '工程项目智能化需求', prop: 'projectIntelligentNeedsNames', width: '150' },
        { label: '项目预计交付时间', prop: 'estimatedDeliverTimeString', width: '120', displayAs: 'YYYY-MM-DD' },
        { label: '项目预估签约额', prop: 'estimatedSignAmount', width: '120', displayAs: 'money' },
        { label: '销售阶段', prop: 'flowUpProcessString', width: '120' },
        { label: '签约回款额', prop: 'refundAmont', width: '120', displayAs: 'money' }

    ]

    get formRules () {
        let rules = {
            companyId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            firstPartName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            projectName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            projectBuildingTypeList: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            projectRoleList: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            projectStep: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            generalGoodsList: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            estimatedSignAmount: [
                {
                    required: false,
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        console.log('🚀 --- getformRulesReqBossProjectRefund --- value', value)
                        if (value && value == 0) {
                            return callback(new Error('项目预估签约额不能为0'))
                        }
                        if (value > 10000000000000) {
                            return callback(new Error('最大不能超过10万亿'))
                        }
                        return callback()
                    }
                }
            ]
        }
        return rules
    }

    get formRulesReqBossProjectRefund () {
        let rules = {
            contractNo: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            contractAttachments: [{ required: true, message: '必填项不能为空' }],
            refundPayType: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
            refundPics: [{ required: true, message: '必填项不能为空' }],
            refundAmount: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        console.log('🚀 --- getformRulesReqBossProjectRefund --- value', value)
                        if (value && value == 0) {
                            return callback(new Error('签约回款额不能为0'))
                        }
                        if (value > 10000000000000) {
                            return callback(new Error('最大不能超过10万亿'))
                        }
                        if (!value) {
                            return callback(new Error('必填项不能为空.'))
                        }
                        return callback()
                    }
                }
            ]
        }
        return rules
    }

    get getCity () {
        const province = this.provinceList.filter(item => item.provinceId === this.reqProjectSupply.provinceId)
        if (province.length > 0) {
            return province[0].cities
        }
        return []
    }
    get getCountry () {
        const city = this.cityList.filter(item => item.cityId === this.reqProjectSupply.cityId)
        if (city.length > 0) {
            return city[0].countries
        }
        return []
    }

    @Watch('getCity', { immediate: true })
    onValueChange (newVal) {
        this.cityList = newVal
    }

    async getAreacode () {
        const { data } = await getChiness()
        this.provinceList = data
    }

    // 预览文件
    async handleLink (fileUrl) {
        let tokenUrl = await OssFileUtils.getUrl(fileUrl)
        if (tokenUrl.indexOf(ossOldBucket + '.') === -1) {
            tokenUrl = ossAliyun + tokenUrl.replace(OssFileUtils.hostReg, '')
        }
        window.open(tokenUrl)
    }

    // 点击跳转企业详情
    onClickLink (val) {
        this.$router.push({ path: '/goodwork/authenlist', query: { name: val.row.companyName } })
    }

    handleDelFile (index, fileList) {
        fileList.splice(index, 1)
    }

    fundMoneys (val) {
        return filters.money(val)
    }

    // 显示签约
    signAContract (projectId) {
        this.projectId = projectId
        this.showSign = true
    }

    // 显示回款
    onShowPayback (projectId) {
        this.projectId = projectId
        this.showPayback = true
    }

    onAddProject () {
        this.showAddProject = true
    }

    async getList () {
        let q = ''
        for (const key in this.queryParams) {
            if (this.queryParams[key] !== '') {
                if (key !== 'deviceCategories') {
                    q += (`${key}=${this.queryParams[key]}&`)
                } else {
                    this.queryParams[key].map(item => {
                        q += (`${key}=${item}&`)
                    })
                }
            }
        }
        q = q.substring(0, q.length - 1)

        const { data: { projectPage, ...restStatistics } } = await getProjectList(q)
        this.tableData = projectPage.records
        this.statistics = {
            /** 已筛选&项目数 */
            totalProjectNum: restStatistics.totalProjectNum,
            /** 已回款金额 */
            totalRefundAmount: restStatistics.totalRefundAmount,
            /** 已回款 */
            totalRefundNum: restStatistics.totalRefundNum,
            /** 已签约 */
            totalSignedNum: restStatistics.totalSignedNum
        }
        this.page.total = projectPage.total
        this.reqBossProjectRefund.operatorName = this.userInfo.employeeName
        this.reqBossProjectRefund.operatorPhone = this.userInfo.phoneNumber
        this.reqBossProjectRefund.projectId = this.projectId
    }

    async selectItem (item) {
        const { data } = await getCompanyUserById(
            {
                companyId: this.reqProjectSupply.companyId
            }
        )
        this.reqProjectSupply = { ...this.reqProjectSupply, ...data }
        this.reqProjectSupply.deptName = this.reqProjectSupply.subsectionName
        this.reqProjectSupply.customerMobile = this.reqProjectSupply.customerPhone
    }

    async remoteMethod (query) {
        if (query !== '') {
            const merchantList = await getcompanyByName({ companyName: query })
            this.optionsCompany = merchantList.data
        } else {
            this.optionsCompany = []
        }
    }

    onProvince (key) {
        this.reqProjectSupply.provinceId = key || ''
        this.reqProjectSupply.cityId = ''
        this.reqProjectSupply.countryId = ''
        if (!key) {
            this.reqProjectSupply.provinceName = ''
            return
        }
        const res = this.provinceList.filter(item => {
            return item.provinceId === key
        })
        this.reqProjectSupply.provinceName = res[0].name
    }

    onCity (key) {
        this.reqProjectSupply.cityId = key || ''
        this.reqProjectSupply.countryId = ''
        if (!key) {
            this.reqProjectSupply.cityName = ''
            return
        }
        const res = this.getCity.filter(item => {
            return item.cityId === key
        })
        this.reqProjectSupply.cityName = res[0].name
    }

    onArea (key) {
        this.reqProjectSupply.countryId = key || ''
        if (!key) {
            this.reqProjectSupply.cityName = ''
            return
        }
        const res = this.getCountry.filter(item => {
            return item.countryId === key
        })
        this.reqProjectSupply.countryName = res[0].name
    }

    inputChage (val, item, key) {
        let num = isNum(val, 2)
        if (num == '.' || !num) {
            num = ''
        }

        item[key] = num
    }

    onExport () {
        if (this.tableData.length <= 0) {
            this.$message.warning('无数据可导出！')
            return
        }
        let url = ''
        for (const key in this.queryParams) {
            if (this.queryParams[key] !== '') {
                if (key !== 'deviceCategories') {
                    url += (`${key}=${this.queryParams[key]}&`)
                } else {
                    this.queryParams[key].map(item => {
                        url += (`${key}=${item}&`)
                    })
                }
            }
        }
        window.open(interfaceUrl + 'memeber/api/project-supply/export?' + url)
    }

    async viewDetail (projectId) {
        this.projectId = projectId
        const { data: detail } = await getProjectDetail({ projectId })
        this.projectDetail = detail
        this.drawer = true
    }

    @validateForm('addForm')
    async submitAddForm () {
        this.reqProjectSupply.operateUserName = this.userInfo.employeeName
        this.reqProjectSupply.operateUserPhone = this.userInfo.phoneNumber
        await addProject(this.reqProjectSupply)
        this.closeAddProject()
        this.getList()
    }

    // 签约
    @validateForm('reqProjectSupply')
    @handleSubmit()
    async submitreqProjectSupply () {
        let refundPics = []
        let contractAttachments = []
        this.reqBossProjectRefund.contractAttachments.map(item => {
            contractAttachments.push(item.fileUrl)
        })
        this.reqBossProjectRefund.refundPics.map(item => {
            refundPics.push(item.fileUrl)
        })
        let query = JSON.parse(JSON.stringify(this.reqBossProjectRefund))
        query.refundPics = refundPics
        query.contractAttachments = contractAttachments
        query.projectId = this.projectId
        await projectSign(query)
        this.getList()
        this.$message.success('签约成功')
        this.closereqProjectSupply()
    }

    onSuccessCb () {
        // @ts-ignore
        this.$refs['paybackForm'].fields.map(i => {
            if (i.prop === 'refundPics') {
                i.clearValidate()
            }
        })
        console.log(' 🚗 🚕 🚙 🚌 🚎 ', 111)
    }

    onSuccessCbSign () {
        let key = ''
        if (this.reqBossProjectRefund.contractAttachments && this.reqBossProjectRefund.contractAttachments.length > 0) {
            key = 'contractAttachments'
        }
        if (this.reqBossProjectRefund.refundPics && this.reqBossProjectRefund.refundPics.length > 0) {
            key = 'refundPics'
        }
        // @ts-ignore
        this.$refs['reqProjectSupply'].fields.map(i => {
            if (i.prop === key) {
                i.clearValidate()
            }
        })
        console.log(' 🚗 🚕 🚙 🚌 🚎 ', 111)
    }

    // 回款
    @validateForm('paybackForm')
    @handleSubmit()
    async submitPaybackForm () {
        let refundPics = []
        let contractAttachments = []
        this.reqBossProjectRefund.contractAttachments.map(item => {
            contractAttachments.push(item.fileUrl)
        })
        this.reqBossProjectRefund.refundPics.map(item => {
            refundPics.push(item.fileUrl)
        })
        let query = JSON.parse(JSON.stringify(this.reqBossProjectRefund))
        query.refundPics = refundPics
        query.contractAttachments = contractAttachments
        query.projectId = this.projectId
        await projectRefund(query)
        this.getList()
        this.$message.success('回款成功')
        this.closePayback()
    }
    // 关闭新增2.0项目
    closeAddProject () {
        let addForm:any = this.$refs['addForm']
        addForm.resetFields()
        this.reqProjectSupply = {
            adminUserName: '',
            adminUserPhone: '',
            companyCode: '',
            companyId: '',
            companyName: '',
            customerName: '',
            customerPhone: '',
            subsectionCode: '',
            subsectionName: '',
            provinceId: '',
            cityId: '',
            countryId: '',
            estimatedSignAmount: ''
        }
        this.showAddProject = false
    }
    // 关闭确认签约
    closereqProjectSupply () {
        const reqProjectSupply:any = this.$refs['reqProjectSupply']
        reqProjectSupply.resetFields()
        this.showSign = false

        if (this.reqBossProjectRefund.hasRefunded == 1) {
            this.reqBossProjectRefund.hasRefunded = 0
        }
    }
    // 关闭回款
    closePayback () {
        this.showPayback = false
        this.reqBossProjectRefund = {
            contractAttachments: [],
            contractNo: '',
            hasRefunded: 0,
            operatorName: '',
            operatorPhone: '',
            projectId: '',
            refundAmount: '',
            refundPayType: '',
            refundPics: []
        }
        const reqProjectSupply:any = this.$refs['paybackForm']
        reqProjectSupply.resetFields()
    }

    async mounted () {
        this.getAreacode()
        this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: JSON.parse(sessionStorage.getItem('authCode')) })

        let p = []
        const api = ['project_intelligent_needs', 'project_building_type', 'project_step', 'project_role', 'general_goods', 'refund_pay_type', 'flow_up_process']
        api.map((i:any) => {
            p.push(
                this.findDictionaryList({ item: i })
            )
        })
        await Promise.all([p, this.getList()])

        // this.findDictionaryList({
        //     item: 'project_intelligent_needs'
        // })
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>
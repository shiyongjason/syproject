<template>
    <div class="page-body B2b ProjectList2">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">客户手机号：</div>
                    <div class="query-col__input">
                        <el-input v-model="signForm.name" placeholder="请输入客户手机号" maxlength="13"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">客户姓名：</div>
                    <div class="query-col__input">
                        <el-input v-model="signForm.name" placeholder="请输入客户姓名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="signForm.name" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="signForm.countryId" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">客户经理：</div>
                    <div class="query-col__input">
                        <el-input v-model="signForm.name" placeholder="请输入姓名/手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">主营品类：</div>
                    <div class="query-col__input">
                        <el-input v-model="signForm.name" placeholder="请输入主营品类" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">主营品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="signForm.name" placeholder="请输入主营品牌" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="signForm.name" placeholder="请输入项目名称" maxlength="200"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">销售阶段：</div>
                    <div class="query-col__input">
                        <el-select v-model="signForm.name" placeholder="请选择">
                            <el-option :label="item.label" :value="item.value" :key='item.value' v-for="item in salesPhase"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary">
                        查询
                    </h-button>
                    <h-button>
                        导出
                    </h-button>
                    <h-button @click="onAddProject">
                        新增
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 1 项, 项目数 25 个；已签约 25 个；已回款 25 个， 已回款金额 {{fundMoneys(223333)}} 元 </el-tag>
            <hosJoyTable ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList"
                actionWidth='200' isAction :isActionFixed='tableData&&tableData.length>0' >
                <template #action="slotProps">
                    <h-button table  @click="viewDetail(slotProps.data.row.id)">查看详情</h-button>
                    <h-button table  @click="signAContract">签约</h-button>
                </template>
            </hosJoyTable>
        </div>
        <!-- 签约确认 -->
        <el-dialog title="签约确认" :close-on-click-modal='false' :visible.sync="showSign" width="720px" :before-close="() => closeSignForm()" :modal='false'>
            <div class="list2_0 itemflex">
                <el-form id='elform' :model="signForm" :rules="formRules"  label-position='left' ref="signForm" class="purchaseConclusion" :validate-on-rule-change=false>
                    <div class="form-item">
                        <el-form-item  prop='name' label="合同编号：">
                            <el-input  placeholder="请输入工程合同编号" v-model="signForm.name" maxlength="50"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item noctx">
                        <el-form-item  prop='name' label="请上传签约合同附件：">
                            <span class="txt">（上传合同附件，支持PDF格式，单个文件最大允许20M）</span>
                        </el-form-item>
                        <div>
                            <div>
                                <div class="file_box" v-for="(item,index) in signForm.upload" :key="item.fileUrl">
                                    <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                                    <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                                    <em @click="()=>handleDelFile(index,signForm.upload)">删除</em>
                                </div>
                            </div>
                            <OssFileHosjoyUpload :showPreView=false v-model="signForm.upload" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:0 0 0 5px" accept=".pdf">
                            <div class="a-line">
                                <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                            </div>
                            </OssFileHosjoyUpload>
                        </div>
                    </div>
                    <div class="form-item">
                        <el-checkbox v-model="checkboxChecked">
                            <span>已回款：</span>
                            <span class="txt" style="font-size:15px;">如已收到签约回款额，请输入回款信息</span>
                        </el-checkbox>
                    </div>
                    <div class="form-item" v-if="checkboxChecked">
                        <el-form-item  prop='fundMoneys' label="签约回款额：">
                            <el-input  placeholder="请输入签约回款额" @input="(val)=>inputChage(val,signForm)" :value="fundMoneys(signForm.fundMoneys)">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item" v-if="checkboxChecked">
                        <el-form-item  prop='select' label="支付方式：">
                            <el-select v-model="signForm.select" placeholder="请选择">
                                <el-option :label="item.label" :value="item.value" :key='item.value' v-for="item in paymentMethod"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form-item noctx" v-if="checkboxChecked">
                        <el-form-item  prop='name' label="请上传支付凭证：">
                            <span class="txt">（上传1-2张经销商的付款截图或银行到账截图，支持jpeg,png和jpg格式）</span>
                        </el-form-item>
                        <div>
                            <div>
                                <div class="file_box" v-for="(item,index) in signForm.upload" :key="item.fileUrl">
                                    <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                                    <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                                    <em @click="()=>handleDelFile(index,signForm.upload)">删除</em>
                                </div>
                            </div>
                            <OssFileHosjoyUpload :showPreView=false v-model="signForm.upload" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:0 0 0 5px" accept=".jpg,.jpeg,.png">
                            <div class="a-line">
                                <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                            </div>
                            </OssFileHosjoyUpload>
                        </div>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="() => closeSignForm()">取消</h-button>
                <h-button type="primary" @click="submitSignForm">确定</h-button>
            </div>
        </el-dialog>
        <!-- 回款确认 -->
        <el-dialog title="回款确认" :close-on-click-modal='false' :visible.sync="showPayback" width="720px" :before-close="()=>closePayback()" :modal='false'>
            <div class="list2_0 itemflex">
                <el-form id='elform' :model="signForm" :rules="formRules"  label-width="115px"  label-position='left' ref="paybackForm" class="purchaseConclusion">
                    <div class="form-item">
                        <el-form-item  prop='fundMoneys' label="签约回款额：">
                            <el-input  placeholder="请输入签约回款额" @input="(val)=>inputChage(val,signForm)" :value="fundMoneys(signForm.fundMoneys)">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item">
                        <el-form-item  prop='select' label="支付方式：">
                            <el-select v-model="signForm.select" placeholder="请选择">
                                <el-option :label="item.label" :value="item.value" :key='item.value' v-for="item in paymentMethod"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form-item noctx">
                        <el-form-item  prop='name' label="请上传支付凭证：">
                            <span class="txt">（上传1-2张经销商的付款截图或银行到账截图，支持jpeg,png和jpg格式）</span>
                        </el-form-item>
                        <div>
                            <div>
                                <div class="file_box" v-for="(item,index) in signForm.upload" :key="item.fileUrl">
                                    <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                                    <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                                    <em @click="()=>handleDelFile(index,signForm.upload)">删除</em>
                                </div>
                            </div>
                            <OssFileHosjoyUpload :showPreView=false v-model="signForm.upload" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:0 0 0 5px" accept=".jpg,.jpeg,.png">
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
        <el-dialog title="新增2.0项目" :close-on-click-modal='false' :visible.sync="showAddProject" width="1080px" :before-close="()=>closeAddProject()" :modal='false'>
            <div class="list2_0">
                <el-form id='elform' :model="signForm" :rules="formRules"  label-width="150px"  label-position='right' ref="addForm" class="list2">
                    <div class="flex-item">
                        <div class="form-item">
                            <el-form-item  prop='fundMoneys' label="企业名称：">
                                <el-input  placeholder="请输入企业名称查询" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="管理员手机号：">1323434324234</el-form-item>
                        </div>
                    </div>
                    <div class="flex-item">
                        <div class="form-item">
                            <el-form-item  label="管理员姓名：">王小二</el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  prop='select' label="所属分部：">
                                <el-select v-model="signForm.countryId" placeholder="请选择" :clearable=true>
                                    <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item">
                        <div class="form-item">
                            <el-form-item  prop='select' label="客户经理：">
                                <el-input  placeholder="请输入客户经理" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="客户经理手机号：">1323434324234</el-form-item>
                        </div>
                    </div>
                    <!-- 项目信息 -->
                    <div class="flex-item">
                        <div class="form-item">
                            <el-form-item  prop='select' label="甲方名称：">
                                <el-input  placeholder="请输入甲方名称" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="项目名称：">
                                <el-input  placeholder="请输入项目名称" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item">
                        <el-form-item  label="项目地址：">
                            <div class="query-cont-col-area">
                                <el-select v-model="signForm.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select v-model="signForm.cityId" @change="onCity" placeholder="市" :clearable=true>
                                    <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select v-model="signForm.countryId" placeholder="区"  @change="onArea" :clearable=true>
                                    <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item  label="详细地址：">
                                <el-input :rows="2" type="textarea" show-word-limit maxlength="200" placeholder="请输入详细地址" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;">项目建筑类型<br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in buildingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font style="padding-right:10px">项目角色</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item  label="">
                                <div slot="label">项目所处的阶段：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in atthestage" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font>可从总部采购产品</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in purchaseproducts" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font>工程项目智能化需求</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in intelligentdemand" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  prop='fundMoneys' label="项目预估签约额：">
                                <el-input  placeholder="请输入项目预估签约额" @input="(val)=>inputChage(val,signForm)" :value="fundMoneys(signForm.fundMoneys)">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-item" style="margin-top:15px">
                        <div class="form-item">
                            <el-form-item  prop='name' label="项目预计交付时间：">
                                <el-date-picker v-model="signForm.name" type="date" placeholder="选择日期"></el-date-picker>
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
        <detail :drawer='drawer' />
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import filters from '@/utils/filters'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { ccpBaseUrl, ossAliyun, ossOldBucket } from '@/api/config'
import OssFileUtils from '@/utils/OssFileUtils'
import { isNum } from '@/utils/validate/format'
import { PAYMENTMETHOD, SALESPHASE, BUILDINGTYPE, PROJECTROLE, ATTHESTAGE, PURCHASEPRODUCTS, INTELLIGENTDEMAND } from './const/index'
import { getChiness } from './api/index'
import detail from './detail.vue'
import { handleSubmit, validateForm } from '@/decorator'
@Component({
    name: 'ProjectList2',
    components: {
        hosJoyTable, OssFileHosjoyUpload, detail
    }
})
export default class ProjectList2 extends Vue {
    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist: Function

    showAddProject:boolean = false
    showSign:boolean = false
    showPayback:boolean = false
    checkboxChecked:boolean = false
    drawer:boolean = false
    provinceList:any[] = []
    cityList:any[] = []

    paymentMethod = PAYMENTMETHOD
    salesPhase = SALESPHASE
    buildingType = BUILDINGTYPE
    role = PROJECTROLE
    atthestage = ATTHESTAGE
    purchaseproducts = PURCHASEPRODUCTS
    intelligentdemand = INTELLIGENTDEMAND

    action = ccpBaseUrl + 'common/files/upload-old'

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:any[] | [] = [
        {
            paymentOrderNo: 'xxxx'
        }
    ]
    queryParams: any = {
        pageNumber: 1,
        pageSize: 10
    }
    signForm:any = {
        name: '',
        upload: [],
        fundMoneys: '',
        select: '',
        provinceId: '',
        cityId: '',
        countryId: ''
    }
     uploadParameters = {
         updateUid: '',
         reservedName: false
     }

    tableLabel:tableLabelProps = [
        // 点击公司跳转到好橙工——【企业管理】已输入该企业名称的查询结果
        { label: '公司全称', prop: 'paymentOrderNo', width: '200' },
        { label: '管理员姓名', prop: 'paymentOrderNo', width: '120' },
        { label: '管理员手机号', prop: 'paymentOrderNo', width: '120' },
        { label: '主营品类', prop: 'paymentOrderNo', width: '120' },
        { label: '主营品牌', prop: 'paymentOrderNo', width: '120' },
        { label: '所属分部', prop: 'paymentOrderNo', width: '120' },
        { label: '客户经理', prop: 'paymentOrderNo', width: '120' },
        { label: '甲方名称', prop: 'paymentOrderNo', width: '200' },
        { label: '项目名称', prop: 'paymentOrderNo', width: '230' },
        { label: '项目地址', prop: 'paymentOrderNo', width: '300' },
        { label: '项目建筑类型', prop: 'paymentOrderNo', width: '120' },
        { label: '项目角色', prop: 'paymentOrderNo', width: '120' },
        { label: '项目所处的阶段', prop: 'paymentOrderNo', width: '120' },
        { label: '可从总部采购产品', prop: 'paymentOrderNo', width: '120' },
        { label: '工程项目智能化需求', prop: 'paymentOrderNo', width: '150' },
        { label: '项目预计交付时间', prop: 'paymentOrderNo', width: '120', displayAs: 'YYYY-MM-DD' },
        { label: '项目预估签约额', prop: 'paymentOrderNo', width: '120', displayAs: 'money' },
        { label: '销售阶段', prop: 'paymentOrderNo', width: '120' },
        { label: '签约回款额', prop: 'paymentOrderNo', width: '120', displayAs: 'money' }

    ]

    get formRules () {
        let rules = {
            name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            oaStatus: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
            fundMoneys: [{ required: this.checkboxChecked, message: '必填项不能为空', trigger: 'blur' }],
            select: [{ required: this.checkboxChecked, message: '必填项不能为空' }]
        }
        return rules
    }

    get getCity () {
        const province = this.provinceList.filter(item => item.provinceId === this.signForm.provinceId)
        if (province.length > 0) {
            return province[0].cities
        }
        return []
    }
    get getCountry () {
        const city = this.cityList.filter(item => item.cityId === this.signForm.cityId)
        if (city.length > 0) {
            return city[0].countries
        }
        return []
    }

    @Watch('getCity', { immediate: true })
    onValueChange (newVal) {
        console.log('🚀 --- onValueChange --- newVal', newVal)
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

    handleDelFile (index, fileList) {
        fileList.splice(index, 1)
    }

    fundMoneys (val) {
        return filters.money(val)
    }

    signAContract () {
        this.showSign = true
    }

    onAddProject () {
        this.showAddProject = true
    }

    async getList () {
        // const { data: tableData } = await Api.getUpStreamPaymentApi(this.signForm)
        // this.tableData = tableData.records || []
        // this.page.total = tableData.total as number
        // const { data: totalAmountData } = await Api.getUpStreamPaymentTotalAmountApi(this.signForm)

    }

    onProvince (key) {
        this.signForm.provinceId = key
        this.signForm.cityId = ''
        this.signForm.countryId = ''
    }

    onCity (key) {
        this.signForm.cityId = key
        this.signForm.countryId = ''
    }

    onArea (key) {
        this.signForm.countryId = key
    }

    inputChage (val, item) {
        console.log('🚀 --- inputChage --- item', item)
        let num = isNum(val, 2)
        if (num == '.' || !num) {
            num = ''
        }

        item.fundMoneys = num
    }

    viewDetail (id) {
        this.drawer = true
    }

    @validateForm('signForm')
    submitAddForm () {

    }

    @validateForm('signForm')
    @handleSubmit()
    submitSignForm () {
        console.log(' 🚗 🚕 🚙 🚌 🚎 submitSignForm')
    }

    @validateForm('signForm')
    @handleSubmit()
    submitPaybackForm () {

    }
    // 关闭新增2.0项目
    closeAddProject () {
        const addForm:any = this.$refs['addForm']
        addForm.resetFields()
        this.showAddProject = false
    }
    // 关闭确认签约
    closeSignForm () {
        const signForm:any = this.$refs['signForm']
        signForm.resetFields()
        this.showSign = false
        if (this.checkboxChecked) {
            this.checkboxChecked = false
        }
    }
    // 关闭回款
    closePayback () {
        const signForm:any = this.$refs['paybackForm']
        signForm.resetFields()
    }

    async mounted () {
        this.getAreacode()
    // await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: JSON.parse(sessionStorage.getItem('authCode')) })
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>
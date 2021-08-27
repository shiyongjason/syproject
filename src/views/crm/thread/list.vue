<template>
    <div class="page-body B2b thread">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">客户手机号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userMobile" placeholder="请输入客户手机号" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">客户姓名：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userName" placeholder="请输入客户姓名" maxlength="50" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">线索来源：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.origin" placeholder="请选择" clearable>
                            <el-option v-for="item in origins" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">经营区域：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.provinceId" @change="onProvince" placeholder="省" clearable>
                            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                            </el-option>
                        </el-select>
                    </div>
                    <span class="ml10 mr10">-</span>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.cityId" @change="onCity" placeholder="市" clearable>
                            <el-option v-for="item in cityList" :key="item.cityId" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">主营品类：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deviceCategory" placeholder="请选择" clearable>
                            <el-option v-for="item in devieCategorys" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">主营品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.deviceBrand" placeholder="请输入主营品牌" maxlength="50" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">创建时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="authOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">更新时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onUpdateStartChange" :end-change="onUpdateEndChange" :options="updateAuthOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">是否有客户经理：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.customer" placeholder="请选择" clearable>
                            <el-option label="是" value='1'></el-option>
                            <el-option label="否" value='2'></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <el-checkbox class="query-col__label" v-model="queryParams.removeDuplicate">去重合并</el-checkbox>
                </div>

                <div class="query-cont__col">
                    <h-button type="primary" @click="queryList">
                        查询
                    </h-button>
                    <h-button type="primary" @click="addThread">
                        新增客户线索
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop" style="margin-right:10px">
                已经筛选{{page.total}}个，累计线索数{{page.currentTotal}}个
            </el-tag>
            <el-tag size="medium" class="eltagtop">
                已经选中{{selectThread.length}}个，可进行批量操作
                <h-button table :disabled='selectThread.length === 0' style="margin-left:10px" @click="distributor()">批量分配销售</h-button>
            </el-tag>
            <hosJoyTable localName="V3.*" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="pagination" @selection-change="dialogCheckChange" actionWidth='220' isShowselection isAction :isActionFixed='tableData&&tableData.length>0'>
                <template #deviceCategory="slotProps">
                    {{deviceCategoryString(slotProps.data.row.deviceCategory)}}
                </template>
                <template #customerName="slotProps">

                    <div>{{slotProps.data.row.customerName&&slotProps.data.row.customerName.length > 0 ? slotProps.data.row.customerName :'-'}}</div>
                    <div>{{slotProps.data.row.customerMobile}}</div>
                </template>
                <template #cityName="slotProps">
                    {{getCityString(slotProps.data.row)}}
                </template>
                <template #action="slotProps">
                    <h-button table @click="distributor(slotProps.data.row)">分配客户经理</h-button>
                    <h-button table @click="viewDetail(slotProps.data.row)">查看详情</h-button>
                </template>
            </hosJoyTable>

            <el-dialog title="分配销售" :visible.sync="distributorVisible" width="30%" :before-close="clearDispatchFormData">
                <span>分配后，该线索将分配给该客户经理</span>
                <el-form :model="distributorForm" :rules="rules" ref="distributorForm" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="分配给客户经理" prop="customerMobile" ref='customerMobile'>
                        <el-autocomplete v-model="stateN" :fetch-suggestions="querySearchAsync" placeholder="请输入员工" @blur="onBlurItem" :trigger-on-focus="false" @select="handleSelect">
                            <template slot-scope="{ item }">
                                <div class="autoflex">
                                    <div class="name">{{ item.psnname }}</div>
                                    <span class="addr">{{ item.mobile }}</span>
                                </div>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="所属部门" prop="customerDeptName">
                        <el-input placeholder="所属部门" disabled v-model='distributorForm.customerDeptName'></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <h-button @click="clearDispatchFormData">取消</h-button>
                    <h-button type="primary" @click="distributorSubmit">确定</h-button>
                </span>
            </el-dialog>
            <el-dialog title="新增客户线索" :close-on-click-modal='false' :visible.sync="threadVisible" width="50%" :before-close="clearthreadFormData">
                <el-form :model="threadForm" :rules="rules" ref="threadForm" label-width="136px">
                    <div class="add-cont__row">
                        <el-form-item prop='userMobile' label="客户手机号：">
                            <el-input placeholder="请输入客户手机号" @blur='phoneBlur' maxlength="11" v-model='threadForm.userMobile'></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item prop='userName' label="客户姓名：">
                            <el-input placeholder="请输入客户姓名" maxlength="20" v-model='threadForm.userName'></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="婚姻状况：" prop="maritalStatus">
                            <el-select v-model="threadForm.maritalStatus" placeholder="请选择">
                                <el-option v-for="item in maritalStatusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="从业年限：" prop="workingYears">
                            <el-select v-model="threadForm.workingYears" placeholder="请选择">
                                <el-option v-for="item in workingYearsOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row flex">
                        <el-form-item label="客户来源：" prop="userSource">
                            <el-select v-model="threadForm.userSource" placeholder="请选择" @change="userSourceChange">
                                <el-option v-for="item in userSourceOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="threadForm.userSource == 3" class="flex_item" prop="manufacturer">
                            <span class="ml10 mr10">-</span>
                            <el-select v-model="threadForm.manufacturer" placeholder="请添加厂商信息" filterable clearable>
                                <el-option v-for="item in manufacturerOption" :key="item.companyCode" :label="item.companyName" :value="item.companyName"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="threadForm.userSource == 4" class="flex_item" prop="oldCompanyName">
                            <span class="ml10 mr10">-</span>
                            <el-select v-model="threadForm.oldCompanyName" placeholder="请添加老客户信息" :remote-method="tianyanchaSearchesList" filterable clearable remote reserve-keyword>
                                <el-option v-for="item in oldCompanyNameOption" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="企业名称：" prop="companyName">
                            <el-input placeholder="请输入企业名称" maxlength="50" v-model='threadForm.companyName'></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="主营品类：" prop="deviceCategory">
                            <el-select v-model="threadForm.deviceCategory" placeholder="请选择" clearable>
                                <el-option v-for="item in devieCategorys" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="主营品牌：" prop="deviceBrand">
                            <el-input placeholder="请输入主营品牌" v-model='threadForm.deviceBrand'></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row city-select">
                        <el-form-item label="客户地址：" prop="provinceId">
                            <el-select v-model="threadForm.provinceId" @change="onProvinceAdd" placeholder="省" clearable>
                                <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                </el-option>
                            </el-select>
                            <span class="ml10 mr10">-</span>
                            <el-select v-model="threadForm.cityId" @change="onCityAdd" placeholder="市" clearable>
                                <el-option v-for="item in cityList" :key="item.cityId" :label="item.name" :value="item.cityId">
                                </el-option>
                            </el-select>
                            <span class="ml10 mr10">-</span>
                            <el-select v-model="threadForm.countryId" @change="onAreaAdd" placeholder="区" clearable>
                                <el-option v-for="item in countryList" :key="item.countryId" :label="item.name" :value="item.countryId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="" prop="address">
                            <el-input v-model="threadForm.address" maxlength="100" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="已合作甲方" prop="cooperatedFirstParty">
                            <el-input type="textarea" :rows="2" v-model="threadForm.cooperatedFirstParty" maxlength="200" placeholder="请输入甲方名称，多个用逗号隔开"></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="常做项目类型" prop="usualProjectType">
                            <el-select v-model="threadForm.usualProjectType" placeholder="请选择" clearable>
                                <el-option v-for="item in projectTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="合作伙伴" prop="partner">
                            <el-input type="textarea" :rows="2" v-model="threadForm.partner" maxlength="200" placeholder="请输入合作伙伴"></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="常用区域品牌名称">
                            <el-input type="textarea" :rows="2" v-model="threadForm.usualRegionBrand" maxlength="200" placeholder="请输入区域品牌名称，多个用逗号隔开"></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <div class="query-cont__col">
                            <el-form-item label="客户经理：">
                                <el-autocomplete v-model="stateN" :fetch-suggestions="querySearchAsync" placeholder="请选择客户经理" @blur="onBlurItem" :trigger-on-focus="false" @select="handleThreadSelect">
                                    <template slot-scope="{ item }">
                                        <div class="autoflex">
                                            <div class="name">{{ item.psnname }}</div>
                                        </div>
                                    </template>
                                </el-autocomplete>
                            </el-form-item>
                        </div>

                        <div class="query-cont__col">
                            <el-form-item label="客户经理手机号：">
                                <el-input placeholder="请输入客户经理手机号" disabled v-model='threadForm.customerMobile'></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="add-cont__row">
                        <div class="query-cont__col">
                            <el-form-item label="所属部门：">
                                <el-input placeholder="请输入客户经理所属部门" disabled v-model='threadForm.customerDeptName'></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <h-button @click="clearthreadFormData">取消</h-button>
                    <h-button type="primary" @click="addThreadSubmit">确定</h-button>
                </span>
            </el-dialog>
            <detail :drawer='drawer' :threadDetail='threadDetail' :formRules='rules' @getDetail='getDetail' @handleClose="()=>drawer = false" v-if="drawer" />
        </div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { getChiness, getThreadList, assignmentCustomer, getThreadDetail, createThread, getThreadListCount, checkThreadIsRight, companyList, tianyanchaSearches } from './api/index'
import detail from './detail.vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { ThreadQeuryModel } from './const/model'
import { THREAD_ORIGIN, DEVICE_CATEGORY, MARITAL_STATUS, EMPLOYED_AGE, CUSTOM_SOURCE, PROJECT_TYPE } from './const/index'
import { Clue, RespBossCluePage } from '@/interface/hbp-member'
import { Phone } from '@/utils/rules'

@Component({
    name: 'Thread',
    components: {
        hosJoyTable, detail
    }
})
export default class Thread extends Vue {
    @State('userInfo') userInfo: any
    @Action('crmmanage/findCrmdeplist') findCrmdeplist: Function
    @Action('vipApply/findContract') findContract: Function
    @Getter('vipApply/contracts') contracts: any
    // @Getter('crmmanage/crmdepList') branchArr: any
    @Ref('distributorForm') readonly distributorRef!: HTMLFormElement;
    @Ref('customerMobile') readonly customerMobileRef!: HTMLFormElement;
    @Ref('threadForm') readonly threadFormRef!: HTMLFormElement;
    @Ref('hosjoyTable') readonly hosjoyTableRef!: HTMLFormElement;
    @Watch('distributorForm.customerMobile')
    onFormChanged (newValue: string, oldValue: string) {
        this.$nextTick(() => {
            if (newValue) this.customerMobileRef.clearValidate()
        })
    }

    @Watch('queryParams.provinceId')
    onCityChange (newVal) {
        this.cityList = this.getCity(newVal)
    }

    @Watch('threadForm.provinceId')
    onThreadCityChange (newVal, oldVal) {
        if (newVal && newVal.length > 0) {
            this.cityList = this.getCity(newVal)
        }
    }

    @Watch('threadForm.cityId')
    onThreadCountryChange (newVal, oldVal) {
        if (newVal && newVal.length > 0) {
            this.countryList = this.getCountry(newVal)
        }
    }

    queryParams: ThreadQeuryModel = {
        provinceId: '',
        cityId: '',
        companyName: '',
        customer: null,
        deviceBrand: '',
        deviceCategory: null,
        startTime: '',
        endTime: '',
        maxUpdateTime: '',
        minUpdateTime: '',
        origin: null,
        pageNumber: 1,
        pageSize: 10,
        userMobile: '',
        userName: '',
        removeDuplicate: true
    }
    tableLabel: tableLabelProps = [
        { label: '客户手机号', prop: 'userMobile', width: '120' },
        { label: '客户姓名', prop: 'userName', width: '120' },
        { label: '企业名称', prop: 'companyName', width: '200' },
        { label: '创建人', prop: 'createBy', width: '120' },
        { label: '创建时间', prop: 'createTime', width: '130', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新时间', prop: 'updateTime', width: '130', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '所在城市', prop: 'cityName', slot: 'cityName', width: '120' },
        { label: '所属分部', prop: 'customerDeptName', width: '120' },
        { label: '主营品牌', prop: 'deviceBrand', width: '120' },
        { label: '主营品类', prop: 'deviceCategory', slot: 'deviceCategory', width: '120' },
        { label: '客户经理', prop: 'customerName', slot: 'customerName', width: '120' }
    ]
    rules = {
        customerMobile: [
            { required: true, message: '请选择分配员工', trigger: 'blur' }
        ],
        customerDeptName: [
            { required: true, message: '请选择分部', trigger: 'change' }
        ],
        userMobile: [
            { required: true, message: '请输入客户手机', trigger: 'blur' },
            { validator: Phone, message: '请输入正确手机号', trigger: 'blur' }
        ],
        userName: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ],
        companyName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        maritalStatus: [
            { required: true, message: '请选择婚姻状况', trigger: 'change' }
        ],
        workingYears: [
            { required: true, message: '请选择从业年限', trigger: 'change' }
        ],
        userSource: [
            { required: true, message: '请选择客户来源', trigger: 'change' }
        ],
        manufacturer: [
            { required: true, message: '请添加厂商信息', trigger: 'change' }
        ],
        oldCompanyName: [
            { required: true, message: '请添加老客户信息', trigger: 'change' }
        ],
        deviceCategory: [
            { required: true, message: '请选择主营品类', trigger: 'change' }
        ],
        deviceBrand: [
            { required: true, message: '请输入主营品牌', trigger: 'blur' }
        ],
        provinceId: [
            { required: true, message: '请选择省、市、区', trigger: 'change' },
            { validator: (rule, value, callback) => {
                if (this.threadForm.provinceId == '' || this.threadForm.cityId == '' || this.threadForm.countryId == '') {
                    return callback(new Error('请选择省、市、区'))
                }
                return callback()
            },
            trigger: 'change'
            }
        ],
        address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        cooperatedFirstParty: [
            { required: true, message: '请输入已合作甲方', trigger: 'blur' }
        ],
        usualProjectType: [
            { required: true, message: '请选择常做项目类型', trigger: 'change' }
        ]
    }
    page = {
        sizes: [10, 20, 50, 100],
        currentTotal: 0,
        total: 0
    }
    origins = THREAD_ORIGIN
    devieCategorys = DEVICE_CATEGORY
    maritalStatusOption = MARITAL_STATUS
    workingYearsOption = EMPLOYED_AGE
    userSourceOption = CUSTOM_SOURCE
    projectTypeOption = PROJECT_TYPE
    oldCompanyNameOption:any[] = []
    manufacturerOption: any = []
    provinceList: any[] = []
    cityList: any[] = []
    countryList: any[] = []
    tableData: RespBossCluePage[] = []
    currentThread: RespBossCluePage = null
    canDispatchList: string[] = []
    threadDetail: Clue = {}
    distributorVisible: boolean = false
    threadVisible: boolean = false
    isloading: boolean = false
    drawer: boolean = false
    isPatgaion: boolean = false
    distributorForm: { customerMobile: string, customerName: string, clueId: string[], customerDeptName: string } = {
        customerName: '',
        customerMobile: '',
        clueId: [],
        customerDeptName: ''
    }
    threadForm: Clue = {
        provinceId: '',
        cityId: '',
        countryId: ''
    }
    selectThread: Clue[] = []
    numberSelectThread: { [name: number]: Clue[] } = {}
    timeout = null
    stateN: string = ''
    get authOptions () {
        return {
            valueFormat: 'yyyy-MM-ddTHH:mm',
            format: 'yyyy-MM-dd HH:mm',
            type: 'datetime',
            startTime: this.queryParams.startTime,
            endTime: this.queryParams.endTime
        }
    }

    get updateAuthOptions () {
        return {
            valueFormat: 'yyyy-MM-ddTHH:mm',
            format: 'yyyy-MM-dd HH:mm',
            type: 'datetime',
            startTime: this.queryParams.minUpdateTime,
            endTime: this.queryParams.maxUpdateTime
        }
    }

    get deviceCategoryString () {
        return deviceCategory => {
            const filters = this.devieCategorys.filter((item: { value: string, label: string }) => {
                return item.value === deviceCategory
            })
            if (filters.length > 0) {
                return filters[0].label
            }
            return '-'
        }
    }

    get getCityString () {
        return (row: Clue) => {
            if (row.provinceName && row.cityName) {
                return row.provinceName + row.cityName
            }
            return '-'
        }
    }
    get getCity () {
        return id => {
            const province = this.provinceList.filter(item => item.provinceId === id)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        }
    }
    get getCountry () {
        return id => {
            const city = this.cityList.filter(item => item.cityId == id)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        }
    }
    onStartChange (val) {
        this.queryParams.startTime = val
    }
    onEndChange (val) {
        this.queryParams.endTime = val
    }
    onUpdateStartChange (val) {
        this.queryParams.minUpdateTime = val
    }
    onUpdateEndChange (val) {
        this.queryParams.maxUpdateTime = val
    }
    onProvince (key) {
        this.queryParams.provinceId = key || ''
        this.queryParams.cityId = ''
    }

    onCity (key) {
        this.queryParams.cityId = key || ''
    }

    onProvinceAdd (key) {
        this.threadForm.provinceId = key || ''
        this.threadForm.cityId = null
        this.threadForm.countryId = ''
        if (key.length > 0) {
            const province = this.provinceList.filter(item => {
                return item.provinceId === this.threadForm.provinceId
            })
            this.threadForm.provinceName = province.length > 0 ? province[0].name : ''
        }
    }

    onCityAdd (key) {
        if (key.length > 0) {
            const city = this.cityList.filter(item => {
                return item.cityId === this.threadForm.cityId
            })
            this.threadForm.cityName = city.length > 0 ? city[0].name : ''
            this.threadForm.cityId = key || ''
            this.threadForm.countryId = ''
        }
        console.log(this.threadForm)
    }

    onAreaAdd (key) {
        this.threadForm.countryId = key
        if (key.length > 0) {
            const country = this.countryList.filter(item => {
                return item.countryId === this.threadForm.countryId
            })
            this.threadForm.countryName = country.length > 0 ? country[0].name : ''
        }
    }

    async getAreacode () {
        const { data } = await getChiness()
        this.provinceList = data || []
    }

    onBlurItem () {

    }

    phoneBlur (e) {
        console.log(this.threadForm.userMobile)
        Phone('', this.threadForm.userMobile, async e => {
            if (!e) {
                const { data } = await checkThreadIsRight(this.threadForm.userMobile)
                if (data) {
                    // 表示已经注册过
                    this.threadForm.userMobile = ''
                    this.$message.error('CRM中已有该客户，无需重复添加')
                }
            }
        })
    }

    // async onGetbranch () {
    //     await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
    // }

    async querySearchAsync (queryString, cb) {
        if (queryString) {
            await this.findContract(queryString)
            var restaurants = this.contracts
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                cb(results)
            }, 3000 * Math.random())
        }
    }
    createStateFilter (queryString) {
        return (state) => {
            return (state.psnname.indexOf(queryString) === 0)
        }
    }

    handleSelect (item) {
        this.stateN = item.psnname
        this.distributorForm.customerMobile = item.mobile
        this.distributorForm.customerName = item.psnname
        this.distributorForm.customerDeptName = item.deptName
    }

    handleThreadSelect (item) {
        this.stateN = item.psnname
        this.threadForm.customerMobile = item.mobile
        this.threadForm.customerName = item.psnname
        this.threadForm.customerDeptName = item.deptName
    }

    dialogCheckChange (item: Clue[]) {
        const number = this.queryParams.pageNumber
        if (!this.isPatgaion || this.selectThread.length === 0) {
            this.numberSelectThread = {
                ...this.numberSelectThread,
                [number]: item
            }
        }
        this.isPatgaion = false
        this.selectThread = []
        for (const key in this.numberSelectThread) {
            this.selectThread = this.selectThread.concat(this.numberSelectThread[key])
        }
        console.log(this.selectThread, '????')
    }

    async findThreadList () {
        const { data } = await getThreadList(this.queryParams)
        this.tableData = data.records
        this.page.total = data.total
        const { data: count } = await getThreadListCount({})
        this.page.currentTotal = count
        if (this.selectThread && this.selectThread.length > 0) {
            this.selectThread.forEach(row => {
                this.tableData.forEach(rowData => {
                    if (row.id === rowData.id) {
                        this.hosjoyTableRef.toggleRowSelection(rowData)
                    }
                })
            })
        } else {
            this.hosjoyTableRef.clearSelection()
        }
    }

    pagination () {
        this.isPatgaion = true
        this.findThreadList()
    }

    addThread () {
        this.threadVisible = true
    }

    distributor (val: RespBossCluePage) {
        this.currentThread = val
        if (val) {
            this.canDispatchList = [this.currentThread.id.toString()]
        } else {
            this.canDispatchList = this.selectThread.map(item => {
                return item.id.toString()
            })
        }
        this.distributorVisible = true
    }

    async distributorSubmit () {
        this.distributorForm.clueId = this.canDispatchList
        this.isloading = true
        this.distributorRef.validate(async (valid) => {
            if (valid) {
                try {
                    await assignmentCustomer(this.distributorForm)
                    this.clearDispatchFormData()
                    this.isloading = false
                    this.$message({
                        message: `销售分配成功`,
                        type: 'success'
                    })
                    this.distributorForm = {
                        customerName: '',
                        customerMobile: '',
                        clueId: [],
                        customerDeptName: ''
                    }
                    this.numberSelectThread = {}
                    this.selectThread = []
                    this.findThreadList()
                } catch (error) {
                    this.isloading = false
                }
            } else {
                this.isloading = false
            }
        })
    }

    async addThreadSubmit () {
        this.threadForm.createBy = this.userInfo.employeeName
        this.threadForm.createPhone = this.userInfo.phoneNumber
        this.threadForm.origin = 5
        this.threadFormRef.validate(async (valid) => {
            if (valid) {
                try {
                    await createThread(this.threadForm)
                    this.clearthreadFormData()
                    this.isloading = false
                    this.$message({
                        message: `保存线索成功`,
                        type: 'success'
                    })
                    this.queryList()
                } catch (error) {
                    this.isloading = false
                }
            } else {
                this.isloading = false
            }
        })
    }

    clearthreadFormData () {
        this.threadForm = {
            provinceId: '',
            cityId: '',
            countryId: ''
        }
        this.$nextTick(() => {
            this.threadFormRef.clearValidate()
        })
        this.threadVisible = false
    }

    clearDispatchFormData () {
        this.stateN = ''
        this.distributorForm = {
            customerName: '',
            customerMobile: '',
            clueId: [],
            customerDeptName: ''
        }
        this.$nextTick(() => {
            this.distributorRef.clearValidate()
        })
        this.distributorVisible = false
    }

    getDetail () {
        this.findThreadList()
        this.drawer = false
    }

    queryList () {
        this.queryParams = {
            ...this.queryParams,
            pageNumber: 1
        }
        this.findThreadList()
    }

    // 客户来源选择
    userSourceChange (value) {
        value == 3 && this.getCompanyList()
    }

    // 获取公司列表
    async getCompanyList () {
        const res = await companyList({})
        this.manufacturerOption = res.data
    }
    // 天眼查
    async tianyanchaSearchesList (query) {
        if (query !== '') {
            const res = await tianyanchaSearches({ word: query })
            this.oldCompanyNameOption = res.data.items
        } else {
            this.oldCompanyNameOption = []
        }
    }

    async viewDetail (val: RespBossCluePage) {
        this.currentThread = val
        const { data } = await getThreadDetail(val.id)
        this.threadDetail = data
        this.drawer = true
        console.log(data)
    }

    async mounted () {
        this.getAreacode()
        // this.onGetbranch()
        this.findThreadList()
    }
}
</script>
<style lang='scss' scoped>
@import './css/list.scss';
</style>

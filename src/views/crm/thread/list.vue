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
                        <el-date-picker v-model="queryParams.startTime" type="date" placeholder="开始时间" value-format="yyyy-MM-dd"></el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="date" placeholder="结束时间" value-format="yyyy-MM-dd"></el-date-picker>
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
                    <h-button type="primary" @click="findThreadList">
                        查询
                    </h-button>
                    <h-button type="primary" @click="addThread">
                        新增客户线索
                    </h-button>
                </div>
            </div>
            <hosJoyTable ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="findThreadList" actionWidth='220' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <!-- <template #deviceCategory="slotProps">
                    {{deviceCategoryString(slotProps.data.row.deviceCategory)}}
                </template> -->

                <template slot="deviceCategory" slot-scope="scope">
                    <h-button table @click="viewDetail(scope.data.row)">查看详情</h-button>
                </template>

                <template #action="slotProps">
                    <h-button table @click="distributor(slotProps.data.row)">分配客户经理</h-button>
                    <h-button table @click="viewDetail(slotProps.data.row)">查看详情</h-button>
                </template>
            </hosJoyTable>

            <el-dialog title="分配销售" :visible.sync="distributorVisible" width="30%" :before-close="()=>distributorVisible = false">
                <el-form :model="distributorForm" :rules="rules" ref="distributorForm" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="分配给（员工）" prop="customerMobile" ref="customerMobile">
                        <el-autocomplete v-model="stateN" :fetch-suggestions="querySearchAsync" placeholder="请输入员工" @blur="onBlurItem" :trigger-on-focus="false" @select="handleSelect">
                            <template slot-scope="{ item }">
                                <div class="autoflex">
                                    <div class="name">{{ item.psnname }}</div>
                                    <span class="addr">{{ item.mobile }}</span>
                                </div>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="所属分部" prop="customerDeptName">
                        <el-select v-model="distributorForm.customerDeptName" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.deptName" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <h-button @click="distributorVisible = false">取消</h-button>
                    <h-button type="primary" @click="distributorSubmit">确定</h-button>
                </span>
            </el-dialog>
            <el-dialog title="新增线索" :visible.sync="threadVisible" width="50%" :before-close="()=>threadVisible = false">
                <el-form :model="threadForm" :rules="rules" ref="threadForm" label-width="130px">
                    <div class="add-cont__row">
                        <el-form-item prop='userMobile' label="客户手机号：">
                            <el-input placeholder="请输入客户手机号" v-model='threadForm.userMobile'></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item prop='userName' label="客户姓名：">
                            <el-input placeholder="请输入客户姓名" v-model='threadForm.userName'></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="企业名称：">
                            <el-input placeholder="请输入企业名称" v-model='threadForm.companyName'></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row city-select">
                        <el-form-item label="">
                            <div slot="label" style="line-height: 20px;"> 客户地址：</div>
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
                        <el-form-item label="">
                            <el-input v-model="threadForm.address" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="">
                            <div slot="label">主营品类：</div>
                            <el-select v-model="threadForm.deviceCategory" placeholder="请选择">
                                <el-option v-for="item in devieCategorys" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="主营品牌：">
                            <el-input placeholder="请输入企业名称" v-model='threadForm.deviceBrand'></el-input>
                        </el-form-item>
                    </div>
                    <div class="add-cont__row">
                        <el-form-item label="">
                            <div slot="label">所属分部：</div>
                            <el-select v-model="threadForm.customerDeptName" placeholder="请选择">
                                <el-option v-for="item in branchArr" :key="item.crmDeptCode" :label="item.deptName" :value="item.deptName"></el-option>
                            </el-select>
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
                                <el-input placeholder="请输入客户经理手机号" v-model='threadForm.customerMobile'></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <h-button @click="threadVisible = false">取消</h-button>
                    <h-button type="primary" @click="addThreadSubmit">确定</h-button>
                </span>
            </el-dialog>
            <detail :drawer='drawer' :threadDetail='threadDetail' :formRules='rules' @getDetail='viewDetail' @handleClose="()=>drawer = false" v-if="drawer" />
        </div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { getChiness, getThreadList, assignmentCustomer, getThreadDetail, createThread } from './api/index'
import detail from './detail.vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { ThreadQeuryModel } from './const/model'
import { THREAD_ORIGIN, DEVICE_CATEGORY } from './const/index'
import { Clue, RespBossCluePage } from '@/interface/hbp-member'

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
    @Getter('crmmanage/crmdepList') branchArr: any
    @Ref('distributorForm') readonly distributorRef!: HTMLFormElement;
    @Ref('customerMobile') readonly customerMobileRef!: HTMLFormElement;
    @Ref('threadForm') readonly threadFormRef!: HTMLFormElement;
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
        origin: null,
        pageNumber: 1,
        pageSize: 10,
        userMobile: '',
        userName: ''
    }
    tableLabel: tableLabelProps = [
        { label: '客户手机号', prop: 'userMobile', width: '120' },
        { label: '客户姓名', prop: 'userName', width: '120' },
        { label: '企业名称', prop: 'companyName', width: '200' },
        { label: '创建人', prop: 'createBy', width: '120' },
        { label: '创建时间', prop: 'createTime', width: '120', displayAs: 'YYYY-MM-DD' },
        { label: '所在城市', prop: 'cityName', width: '120' },
        { label: '所属分部', prop: 'customerDeptName', width: '120' },
        { label: '主营品牌', prop: 'deviceBrand', width: '120' },
        { label: '主营品类', prop: 'deviceCategory', width: '120' },
        { label: '客户经理', prop: 'customerName', width: '120' }
    ]
    rules = {
        customerMobile: [
            { required: true, message: '请选择分配员工', trigger: 'blur' }
        ],
        customerDeptName: [
            { required: true, message: '请选择分部', trigger: 'change' }
        ],
        userMobile: [
            { required: true, message: '请输入客户手机', trigger: 'blur' }
        ],
        userName: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ]
    }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    origins = THREAD_ORIGIN
    devieCategorys = DEVICE_CATEGORY
    provinceList: any[] = []
    cityList: any[] = []
    countryList: any[] = []
    tableData: RespBossCluePage[] = []
    currentThread: RespBossCluePage = null
    threadDetail: Clue = {}
    distributorVisible: boolean = false
    threadVisible: boolean = false
    isloading: boolean = false
    drawer: boolean = false
    distributorForm: { customerMobile: string, customerName: string, clueId: number | string, customerDeptName: string } = {
        customerName: '',
        customerMobile: '',
        clueId: 0,
        customerDeptName: ''
    }
    threadForm: Clue = {
        provinceId: '',
        cityId: '',
        countryId: ''
    }
    timeout = null
    stateN: string = ''

    get deviceCategoryString () {
        console.log(222222)
        return deviceCategory => {
            console.log(deviceCategory, 'deviceCategory')
            const filters = this.devieCategorys.filter((item: { value: string, label: string }) => {
                return item.value === deviceCategory
            })
            console.log(filters, 'filters')
            if (filters.length > 0) {
                return filters[0].label
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

    async onGetbranch () {
        await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
    }

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
    }

    handleThreadSelect (item) {
        this.stateN = item.psnname
        this.threadForm.customerMobile = item.mobile
        this.threadForm.customerName = item.psnname
    }

    async findThreadList () {
        const { data } = await getThreadList(this.queryParams)
        this.tableData = data.records
        this.page.total = data.total
    }

    addThread () {
        this.threadVisible = true
    }

    distributor (val: RespBossCluePage) {
        this.currentThread = val
        this.distributorVisible = true
        // await assignmentCustomer({
        //     clueId: val.id,
        //     customerMobile: val.userMobile
        // })
    }

    async distributorSubmit () {
        this.distributorForm.clueId = this.currentThread.id
        console.log(this.distributorForm)
        this.isloading = true
        this.distributorRef.validate(async (valid) => {
            if (valid) {
                try {
                    await assignmentCustomer(this.distributorForm)
                    this.distributorVisible = false
                    this.isloading = false
                    this.$message({
                        message: `销售分配成功`,
                        type: 'success'
                    })
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
                    this.threadVisible = false
                    this.isloading = false
                    this.$message({
                        message: `销售分配成功`,
                        type: 'success'
                    })
                    this.findThreadList()
                } catch (error) {
                    this.isloading = false
                }
            } else {
                this.isloading = false
            }
        })
    }

    async viewDetail (val: RespBossCluePage) {
        console.log(val)
        this.currentThread = val
        const { data } = await getThreadDetail(val.id)
        this.threadDetail = data
        this.drawer = true
    }

    async mounted () {
        this.getAreacode()
        this.onGetbranch()
        this.findThreadList()
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>

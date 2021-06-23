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
                            <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
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
                    <h-button type="primary">
                        新增客户线索
                    </h-button>
                </div>
            </div>
            <hosJoyTable ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="findThreadList" actionWidth='200' isAction
                :isActionFixed='tableData&&tableData.length>0'>
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
            <detail :drawer='drawer' :threadDetail='threadDetail' :formRules='rules' @getDetail='viewDetail' @handleClose="()=>drawer = false" v-if="drawer" />
        </div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { getChiness, getThreadList, assignmentCustomer, getThreadDetail } from './api/index'
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
    @Watch('distributorForm.customerMobile')
    onFormChanged (newValue: string, oldValue: string) {
        console.log(newValue, 'newValue')
        console.log(oldValue, 'oldValue')
        this.$nextTick(() => {
            if (newValue) this.customerMobileRef.clearValidate()
        })
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
    tableData: RespBossCluePage[] = []
    currentThread: RespBossCluePage = null
    threadDetail: Clue = {}
    distributorVisible: boolean = false
    isloading: boolean = false
    drawer: boolean = false
    distributorForm: { customerMobile: string, customerName: string, clueId: number | string, customerDeptName: string } = {
        customerName: '',
        customerMobile: '',
        clueId: 0,
        customerDeptName: ''
    }
    timeout = null
    stateN: string = ''
    get getCity () {
        const province = this.provinceList.filter(item => item.provinceId === this.queryParams.provinceId)
        if (province.length > 0) {
            return province[0].cities
        }
        return []
    }
    onProvince (key) {
        this.queryParams.provinceId = key || ''
        this.queryParams.cityId = ''
        if (!key) {
            return
        }
        const res = this.provinceList.filter(item => {
            return item.provinceId === key
        })
    }

    onCity (key) {
        this.queryParams.cityId = key || ''
        if (!key) {
            return
        }
        const res = this.getCity.filter(item => {
            return item.cityId === key
        })
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
        console.log(item)
        this.distributorForm.customerMobile = item.mobile
        this.distributorForm.customerName = item.psnname
    }

    async findThreadList () {
        const { data } = await getThreadList(this.queryParams)
        this.tableData = data.records
        this.page.total = data.total
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

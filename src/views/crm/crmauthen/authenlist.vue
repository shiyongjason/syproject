<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">管理员账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userAccount" placeholder="请输入管理员账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">管理员姓名：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userName" placeholder="请输入管理员姓名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true @change="onChooseDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">经营区域：</div>
                    <div class="query-col__input">
                        <el-cascader placeholder="试试搜索： 南京" :options="options" v-model="optarr" ref="myCascader" :clearable=true :collapse-tags=true :show-all-levels="true" @change="cityChange" :props="{ multiple: true ,value:'countryId',label:'name',children:'cities'}" filterable>
                        </el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">企业类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.companyType">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in businessTypelist" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">客户分类：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.customerType">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in riskTypelist" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">认证状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.authenticationStatus">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in authenList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                  <div class="query-cont-col">
                    <div class="query-col__label">会员标签：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.memberTag">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in memberTagArr" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">关联/认证时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="authOptions">
                        </HDatePicker>
                    </div>
                </div>
                 <div class="query-cont-col">
                    <div class="query-col__label">橙工采会员：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.chengGongCaiLable">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in chengArr" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">客户经理：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.customerManager" placeholder="请输入客户经理" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="()=>searchList(1)">
                        查询
                    </h-button>
                    <h-button @click="onRest">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{businessData.total}} 项,体系内 <b>{{crmauthLoan.inSystemNum||0}}</b>; 体系外 <b>{{crmauthLoan.outSystemNum||0}}
                </b>; 白名单 <b>{{crmauthLoan.whiteListNum||0}}</b>; 黑名单 <b>{{crmauthLoan.blackListNum||0}}</b>; 待审核 <b>{{crmauthLoan.waitToAuditNum||0}}</b></el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="userAccount" slot-scope="scope">
                    <span class="link-cell" @click="onLinkship(scope.data.row.userAccount)"> {{scope.data.row.userAccount}}</span>
                </template>
                 <template slot="memberTag" slot-scope="scope">
                     {{memberTagArr[scope.data.row.memberTag-1].value}}
                </template>
                 <template slot="chengGongCaiLable" slot-scope="scope">
                     {{chengLabel[scope.data.row.chengGongCaiLable]}}
                </template>
                <template slot="customerManager" slot-scope="scope">
                     <p>{{scope.data.row.customerManager||'-'}}</p>
                     <p>{{scope.data.row.customerManagerPhone||'-'}}</p>
                </template>
                <template slot="userName" slot-scope="scope">
                    <span class="link-cell" @click="onLinkship(scope.data.row.userName)"> {{scope.data.row.userName||'-'}}</span>
                </template>
                <template slot="areaname" slot-scope="scope">
                    {{scope.data.row.provinceName+scope.data.row.cityName+scope.data.row.countryName}}
                </template>
                <template slot="companyType" slot-scope="scope">
                    {{scope.data.row.companyType==1?'体系内':scope.data.row.companyType==2?'体系外':'-'}}
                </template>
                <template slot="customerType" slot-scope="scope">
                    {{scope.data.row.customerType==1?'黑名单':scope.data.row.customerType==2?'白名单':scope.data.row.customerType==3?'待审核':'-'}}
                </template>
                <template slot="isAuthentication" slot-scope="scope">
                    <span :class="scope.data.row.isAuthentication==1?'colgry':'colred'"> {{scope.data.row.isAuthentication==1?'已认证':'未认证'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onLookauthen(scope.data.row.companyCode)" v-if="hosAuthCheck(authen_detail)">查看详情</h-button>
                </template>
            </basicTable>
        </div>
        <businessDrawer  :drawer=drawer @backEvent='restDrawer' ref="drawercom"></businessDrawer>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import businessDrawer from './components/businessDrawer'
import { BUS_TYPE_LIST, RISK_TYPE_LIST, AUTEHEN_LIST } from '../const'
import * as Auths from '@/utils/auth_const'
import { newCache } from '@/utils/index'
export default {
    name: 'authenlist',
    data () {
        return {
            authen_detail: Auths.CRM_AUTHEN_DETAIL,
            chengLabel: {
                0: '橙工采会员(未激活)',
                1: '橙工采初级会员',
                2: '橙工采橙级会员'
            },
            chengArr: [{ key: 0, value: '橙工采会员(未激活)' }, { key: 1, value: '橙工采初级会员' }, { key: 2, value: '橙工采橙级会员' }],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                authenticationEndTime: '',
                authenticationStartTime: '',
                authenticationTimeOrder: '',
                customerType: '',
                customerTypeOrder: '',
                companyName: this.$route.query.name || '',
                companyType: '',
                userAccount: '',
                userName: '',
                authenticationStatus: '',
                createTimeOrder: 'desc',
                areaIds: '',
                deptDoc: '',
                jobNumber: '',
                authCode: '',
                memberTag: '',
                customerManager: ''
            },
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '200' },
                { label: '管理员账号', prop: 'userAccount', width: '120' },
                { label: '管理员姓名', prop: 'userName', width: '120' },
                { label: '所属分部', prop: 'subsectionName', width: '150' },
                { label: '经营区域', prop: 'areaname', width: '150' },
                { label: '企业类型', prop: 'companyType', width: '100' },
                { label: '客户分类', prop: 'customerType', width: '100', sortable: 'custom' },
                { label: '橙工采会员', prop: 'chengGongCaiLable' },
                { label: '认证状态', prop: 'isAuthentication' },
                { label: '客户经理', prop: 'customerManager', width: '100' },
                { label: '会员标签', prop: 'memberTag' },
                { label: '创建时间', prop: 'createTime', width: '150', formatters: 'dateTimes', sortable: 'custom' },
                { label: '关联认证时间', prop: 'authenticationTime', width: '150', formatters: 'dateTimes' }
            ],
            rowKey: '',
            multiSelection: [],
            options: [],
            optarr: '',
            businessTypelist: BUS_TYPE_LIST,
            riskTypelist: RISK_TYPE_LIST,
            authenList: AUTEHEN_LIST,
            drawer: false,
            branchArr: [],
            memberTagArr: [ { key: 1, value: '一般会员' }, { key: 2, value: '认证会员' }, { key: 3, value: '评级会员' }, { key: 4, value: '签约会员' }, { key: 5, value: '交易会员' } ]
        }
    },
    components: {
        businessDrawer
    },
    computed: {
        authOptions () {
            return {
                valueFormat: 'yyyy-MM-dd HH:mm',
                format: 'yyyy-MM-dd HH:mm',
                type: 'datetime',
                startTime: this.queryParams.authenticationStartTime,
                endTime: this.queryParams.authenticationEndTime
            }
        },
        ...mapGetters({
            businessData: 'crmauthen/businessData',
            crmauthLoan: 'crmauthen/crmauthLoan',
            crmdepList: 'crmmanage/crmdepList',
            nestDdata: 'nestDdata'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    async mounted () {
        this.queryParams.jobNumber = this.userInfo.jobNumber
        this.queryParams.authCode = JSON.parse(sessionStorage.getItem('authCode'))
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
        this.getFindNest()
        this.getFindbranch()
        if (this.$route.query.name) {
            this.searchList()
        }
    },
    methods: {
        ...mapActions({
            findBusinesspage: 'crmauthen/findBusinesspage',
            findCrmauthenStatic: 'crmauthen/findCrmauthenStatic',
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        }),
        ...mapActions({
            findNest: 'findNest'
        }),
        onStartChange (val) {
            this.queryParams.authenticationStartTime = val
        },
        onEndChange (val) {
            this.queryParams.authenticationEndTime = val
        },
        onChooseDep () {

        },
        async getFindNest () {
            await this.findNest()
            this.options = this.nestDdata && this.nestDdata.map(item => {
                item.countryId = item.provinceId
                item.cities.map(value => {
                    value.cities = value.countries
                    value.countryId = value.cityId
                })
                return item
            })
        },
        async getFindbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: JSON.parse(sessionStorage.getItem('authCode')) })
            this.branchArr = this.crmdepList
        },
        onRest () {
            this.queryParams = deepCopy(this.copyParams)
            this.queryParams.companyName = ''
            this.optarr = ''
            this.searchList(1)
        },
        cityChange (val) {
            const cityarr = []
            val && val.map(item => {
                cityarr.push(item[2])
            })
            this.queryParams.areaIds = cityarr.join(',')
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val
        },
        async searchList (val) {
            if (val) this.queryParams.pageNumber = val
            const { ...params } = this.queryParams
            await this.findBusinesspage(params)
            this.tableData = this.businessData.records
            this.paginationInfo = {
                pageNumber: this.businessData.current,
                pageSize: this.businessData.size,
                total: this.businessData.total
            }
            await this.findCrmauthenStatic(params)
        },
        onSortChange (val) {
            if (val.prop == 'customerType') {
                this.queryParams.customerTypeOrder = val.order == 'ascending' ? 'asc' : 'desc'
                this.queryParams.authenticationTimeOrder = ''
                this.queryParams.createTimeOrder = ''
            } else if (val.prop == 'authenticationTime') {
                this.queryParams.authenticationTimeOrder = val.order == 'ascending' ? 'asc' : 'desc'
                this.queryParams.customerTypeOrder = ''
                this.queryParams.createTimeOrder = ''
            } else if (val.prop == 'createTime') {
                this.queryParams.createTimeOrder = val.order == 'ascending' ? 'asc' : 'desc'
                this.queryParams.authenticationTimeOrder = ''
                this.queryParams.customerTypeOrder = ' '
            }
            this.searchList()
        },
        async onLookauthen (val) {
            this.drawer = true
            this.$refs.drawercom.getAuthenticationDetail(val)
            await this.$refs.drawercom.getMerchtMemberDetail(val)
            this.$nextTick(() => {
                this.$refs.drawercom.onClearV()
            })
        },
        restDrawer () {
            this.drawer = false
            this.searchList()
            this.$refs.drawercom.onClearV()
        },
        onLinkship (val) {
            this.$router.push({ path: '/b2b/account/accountManage', query: { account: val } })
        }
    },
    beforeUpdate () {
        newCache('authenlist')
    }
}
</script>
<style lang="scss" scoped>
.colred {
    color: $redColor;
}
.colgry {
    color: #06c306;
}
.eltagtop {
    margin-bottom: 10px;
}
</style>

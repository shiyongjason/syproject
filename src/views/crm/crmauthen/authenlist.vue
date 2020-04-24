<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">管理员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.userAccount" placeholder="请输入管理员账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">管理员姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.userName" placeholder="请输入管理员姓名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-col-input">
                        <el-cascader placeholder="试试搜索： 南京" :options="options" v-model="optarr"  ref="myCascader" :clearable=true :collapse-tags=true
                        :show-all-levels="true" @change="cityChange" :props="{ multiple: true ,value:'countryId',label:'name',children:'cities'}" filterable>
                        </el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">企业类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.companyType">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in businessTypelist" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">客户分类：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.customerType">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in riskTypelist" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">认证状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.authenticationStatus">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in authenList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">关联/认证时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop">已筛选 {{businessData.total}} 项,体系内 <b>{{crmauthLoan.inSystemNum||0}}</b>; 体系外 <b>{{crmauthLoan.outSystemNum||0}}
                </b>; 白名单 <b>{{crmauthLoan.whiteListNum||0}}</b>; 黑名单 <b>{{crmauthLoan.blackListNum||0}}</b>; 待审核 <b>{{crmauthLoan.waitToAuditNum||0}}</b></el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="userAccount" slot-scope="scope">
                   <span class="colblue" @click="onLinkship(scope.data.row.userAccount)"> {{scope.data.row.userAccount}}</span>
                </template>
                <template slot="userName" slot-scope="scope">
                   <span class="colblue" @click="onLinkship(scope.data.row.userName)"> {{scope.data.row.userName||'-'}}</span>
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
                    <el-button type="success" size="mini" plain @click="onLookauthen(scope.data.row.companyCode)" v-if="!hosAuthCheck(authen_detail)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
        <businessDrawer :drawer=drawer @backEvent='restDrawer' ref="drawercom"></businessDrawer>
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import businessDrawer from './components/businessDrawer'
import { BUS_TYPE_LIST, RISK_TYPE_LIST, AUTEHEN_LIST } from '../const'
import * as Auths from '@/utils/auth_const'
export default {
    name: 'projectlist',
    data () {
        return {
            authen_detail: Auths.CRM_AUTHEN_DETAIL,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                authenticationEndTime: '',
                authenticationStartTime: '',
                authenticationTimeOrder: '',
                customerType: '',
                customerTypeOrder: '',
                companyName: '',
                companyType: '',
                subsectionCode: '',
                userAccount: '',
                userName: '',
                authenticationStatus: '',
                createTimeOrder: '',
                areaIds: ''
            },
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'userAccount' },
                { label: '管理员姓名', prop: 'userName' },
                { label: '所属分部', prop: 'subsectionName', width: '180' },
                { label: '经营区域', prop: 'areaname' },
                { label: '企业类型', prop: 'companyType', width: '120' },
                { label: '客户分类', prop: 'customerType', width: '120', sortable: true },
                { label: '认证状态', prop: 'isAuthentication', width: '120' },
                { label: '创建时间', prop: 'createTime', width: '150', formatters: 'dateTimes', sortable: true },
                { label: '关联认证时间', prop: 'authenticationTime', width: '150', formatters: 'dateTimes', sortable: true }
            ],
            rowKey: '',
            multiSelection: [],
            options: [],
            optarr: '',
            businessTypelist: BUS_TYPE_LIST,
            riskTypelist: RISK_TYPE_LIST,
            authenList: AUTEHEN_LIST,
            drawer: false,
            branchArr: []
        }
    },
    components: {
        businessDrawer
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.authenticationEndTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.authenticationStartTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        ...mapGetters('crmauthen', {
            businessData: 'businessData',
            crmauthLoan: 'crmauthLoan'
        }),
        ...mapGetters({
            nestDdata: 'nestDdata',
            branchList: 'branchList'
        })
    },
    async mounted () {
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
        this.getFindNest()
        this.getFindbranch()
    },
    methods: {
        ...mapActions('crmauthen', {
            findBusinesspage: 'findBusinesspage',
            findCrmauthenStatic: 'findCrmauthenStatic'
        }),
        ...mapActions({
            findNest: 'findNest',
            findBranch: 'findBranch'
        }),
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
            await this.findBranch()
            this.branchArr = this.branchList
        },
        onRest () {
            this.queryParams = deepCopy(this.copyParams)
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
        async  searchList (val) {
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
            } else if (val.prop == 'authenticationTime') {
                this.queryParams.authenticationTimeOrder = val.order == 'ascending' ? 'asc' : 'desc'
            } else if (val.prop == 'createTime') {
                this.queryParams.createTimeOrder = val.order == 'ascending' ? 'asc' : 'desc'
            }
            this.searchList()
        },
        onLookauthen (val) {
            this.drawer = true
            this.$refs.drawercom.getMerchtMemberDetail(val)
        },
        restDrawer () {
            this.drawer = false
            this.searchList()
            this.$refs.drawercom.onClearV()
        },
        onLinkship (val) {
            this.$router.push({ path: '/hmall/accountManage', query: { account: val } })
        }
    }
}
</script>
<style lang="scss" scoped>
.colred {
    color: #ff0000;
}
.colgry {
    color:#06c306;
}
.colblue {
    color: #50b7f7;
    cursor: pointer;
}
.eltagtop {
    margin-bottom: 10px;
}
</style>
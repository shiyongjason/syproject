<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">商家账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantAccount" placeholder="请输入商家账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="全部" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
                    </div>
                </div>
                <!-- <div class="query-cont__col">
                    <el-checkbox v-model="queryParams.isEnabled" :true-label=1 :false-label=0>只看启用</el-checkbox>
                </div> -->
                <div class="query-cont__col">
                    <div class="query-col__lable">商家角色：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.businessRole">
                            <el-option v-for="item in businessRoleOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商家类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.merchantType">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="体系内" value="1"></el-option>
                            <el-option label="体系外" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">创建时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.registrationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.registrationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">认证状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.isAuthentication">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option label="已认证" value="1">
                            </el-option>
                            <el-option label="未认证" value="0">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">认证时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">店铺名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.shopName" placeholder="请输入店铺名称" maxlength="60"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">资金业务开通状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.fundAuthorization">
                            <el-option v-for="item in openingStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">品牌自动审核：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.fundAuthorization">
                            <el-option v-for="item in autoInductionOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onFindMlist(1)">
                        查询
                    </h-button>
                    <h-button @click="onRest()">
                        重置
                    </h-button>
                </div>
            </div>
            <!-- <el-tag size="medium" class="eltagtop">已筛选{{bossStatic.screenOut}} 项 | 未认证：{{bossStatic.unAuthenticationNum?bossStatic.unAuthenticationNum:0}}；已认证：{{bossStatic.authenticationNum?bossStatic.authenticationNum:0}}；启用状态：{{bossStatic.enabledNum?bossStatic.enabledNum:0}}；禁用状态：{{bossStatic.forbiddenNum?bossStatic.forbiddenNum:0}}；上架商品总数：{{bossStatic.onMarketTotalNum?bossStatic.onMarketTotalNum:0}}；
                店铺商品总数：{{bossStatic.omMerchantTotalNum?bossStatic.omMerchantTotalNum:0}}；会员总数：{{bossStatic.memberTotalNum?bossStatic.memberTotalNum:0}}</el-tag> -->
            <el-tag size="medium" class="eltagtop">已筛选{{bossStatic.screenOut}} 项 | 未认证：{{bossStatic.unAuthenticationNum?bossStatic.unAuthenticationNum:0}}；已认证：{{bossStatic.authenticationNum?bossStatic.authenticationNum:0}}；上架商品总数：{{bossStatic.onMarketTotalNum?bossStatic.onMarketTotalNum:0}}；
                店铺商品总数：{{bossStatic.omMerchantTotalNum?bossStatic.omMerchantTotalNum:0}}；会员总数：{{bossStatic.memberTotalNum?bossStatic.memberTotalNum:0}}</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" @onSortChange="onSortChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true' :isfiexd="'right'">
                <template slot="subsectionName" slot-scope="scope">
                    {{scope.data.row.subsectionName || '无'}}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    {{scope.data.row.merchantType==1?'体系内':'体系外'}}
                </template>
                <template slot="merchantRolePermission" slot-scope="scope">
                    {{ businessRoleMAP.get(scope.data.row.merchantRolePermission) || '-' }}
                </template>
                <template slot="isAutoDispatch" slot-scope="scope">
                    {{scope.data.row.isAutoDispatch==0?'已关闭':'已开启'}}
                </template>
                <template slot="isAuthentication" slot-scope="scope">
                    <span :class="scope.data.row.isAuthentication==0?'colorRed':'colorGreen'">{{scope.data.row.isAuthentication==0?'未认证':'已认证'}}</span>
                </template>
                <template slot="isEnabled" slot-scope="scope">
                    {{scope.data.row.isEnabled==0?'禁用':'启用'}}
                </template>
                <template slot="authenticationTime" slot-scope="scope">
                    {{scope.data.row.authenticationTime | formatDate}}
                </template>
                <template slot="fundAuthorization" slot-scope="scope">
                    {{openingStatusMap.get(scope.data.row.fundAuthorization)}}
                </template>
                <template slot="fundAuthorization" slot-scope="scope">
                    {{autoInductionMap.get(scope.data.row.fundAuthorization)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onOperate(scope.data.row)">{{scope.data.row.isEnabled==1?'禁用':'启用'}}</h-button>
                    <h-button table @click="onFindInfo(scope.data.row.companyCode,'merchant')">查看详情</h-button>
                </template>
            </basicTable>
        </div>
        <drawerCom :drawer=drawer @backEvent='restDrawer' :merchantCode='companyCode' ref="drawercom"></drawerCom>
    </div>
</template>
<script>
import drawerCom from './drawerComs'
import { mapState, mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { changeState } from './api/index'
import { BUSINESS_ROLE_OPTIONS, BUSINESS_ROLE_MAP, OPENING_STATUS_OPTIONS, OPENING_STATUS_MAP, AUTO_INDUCTION_OPTIONS, AUTO_INDUCTION_MAP } from './const'
export default {
    name: 'membershipBussinessmanage',
    data () {
        return {
            openingStatusOptions: OPENING_STATUS_OPTIONS,
            openingStatusMap: OPENING_STATUS_MAP,
            businessRoleOptions: BUSINESS_ROLE_OPTIONS,
            businessRoleMAP: BUSINESS_ROLE_MAP,
            autoInductionOptions: AUTO_INDUCTION_OPTIONS,
            autoInductionMap: AUTO_INDUCTION_MAP,
            queryParams: {
                authenticationEndTime: '',
                authenticationStartTime: '',
                companyName: '',
                isAuthentication: '',
                isEnabled: '',
                merchantAccount: '',
                merchantType: '',
                pageNumber: 1,
                pageSize: 10,
                registrationEndTime: '',
                registrationStartTime: '',
                subsectionCode: '',
                authenticationTime: '',
                fundAuthorization: '',
                createTime: 'desc',
                shopName: ''
            },
            paginationInfo: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '180' },
                { label: '管理员账号', prop: 'adminAccount', width: '120px' },
                { label: '所属分部', prop: 'subsectionName' },
                { label: '店铺名称', prop: 'shopName', width: '180px' },
                { label: '商家类型', prop: 'merchantType' },
                { label: '上架商品数', prop: 'omMarketNum', width: '100px' },
                { label: '店铺商品数', prop: 'omMerchantNum', width: '100px' },
                { label: '会员数', prop: 'memberNum' },
                { label: '创建时间', prop: 'registrationTime', formatters: 'dateTimes', width: '150px', sortable: true },
                {
                    label: '认证状态',
                    prop: 'isAuthentication',
                    renderHeader: (h, scope) => {
                        return (
                            <span class="iconfl">
                                <font>{scope.column.label}</font>
                                <el-tooltip class="item" effect="dark" content="开通钱包即为已认证" placement="top-start">
                                    <i class='el-icon-question'></i>
                                </el-tooltip>
                            </span>
                        )
                    }
                },
                { label: '认证时间', prop: 'authenticationTime', sortable: true, width: '150px' },
                { label: '商家角色权限', prop: 'merchantRolePermission', width: '120px' },
                { label: '自动推送至店铺', prop: 'isAutoDispatch', width: '120px' },
                { label: '资金业务', prop: 'fundAuthorization' },
                { label: '品牌自动审核', prop: 'fundAuthorization' },
                { label: '状态', prop: 'isEnabled' }
            ],
            tableData: [],
            drawer: false,
            checked: false,
            bossStatic: {},
            copyParams: {},
            branchArr: [],
            companyCode: ''
        }
    },
    components: {
        drawerCom
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantData: 'merchantData',
            merchantStatic: 'merchantStatic',
            branchList: 'branchList'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.registrationEndTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.registrationStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.authenticationEndTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.authenticationStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        this.onFindMlist()
        this.onGetbranch()
        this.copyParams = deepCopy(this.queryParams)
    },
    methods: {
        ...mapActions({
            findMerchantList: 'findMerchantList',
            findMerchantStatic: 'findMerchantStatic',
            findBranch: 'findBranch'
        }),
        onRest () {
            this.queryParams = deepCopy(this.copyParams)
            this.onFindMlist(1)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onFindMlist()
        },
        onSortChange (val) {
            if (val.prop === 'registrationTime') {
                this.queryParams.createTime = val.order === 'descending' ? 'desc' : 'asc'
                this.queryParams.authenticationTime = ''
            } else {
                this.queryParams.authenticationTime = val.order === 'descending' ? 'desc' : 'asc'
                this.queryParams.createTime = ''
            }

            this.onFindMlist()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onFindMlist()
        },
        async onFindMlist (val) {
            if (val) this.queryParams.pageNumber = val
            await this.findMerchantList(this.queryParams)
            this.tableData = this.merchantData.records
            this.paginationInfo = {
                total: this.merchantData.total,
                pageNumber: this.merchantData.current,
                pageSize: this.merchantData.size
            }
            this.onStatic()
        },
        async onStatic () {
            await this.findMerchantStatic(this.queryParams)
            this.bossStatic = this.merchantStatic
        },
        async onGetbranch () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        onOperate (val) {
            this.$confirm(val.isEnabled == 0 ? '是否确认启用该商家的账号?' : '是否确认禁用该商家的账号？禁用后商家将无法使用相关功能，你还要继续吗？', '提示', {
                confirmButtonText: val.isEnabled == 0 ? '确认启用' : '确认禁用',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await changeState({ merchantCode: val.companyCode, status: val.isEnabled == 0 ? 1 : 0, phone: this.userInfo.phoneNumber, updateBy: this.userInfo.employeeName })
                this.$message({
                    message: val.isEnabled == 0 ? '商家账号启用成功' : '商家账号禁用成功',
                    type: 'success'
                })
                this.onFindMlist()
            })
        },
        onFindInfo (val, type) {
            this.companyCode = val
            this.drawer = true
            this.$refs.drawercom.getMerchtMemberDetail(val, type)
        },
        restDrawer () {
            this.drawer = false
            this.onFindMlist()
        }
    }
}
</script>
<style lang="scss" scoped>
.eltagtop {
    margin-bottom: 10px;
}
.colorRed {
    color: #f00000;
}
.colorGreen {
    color: #67c23a;
}
/deep/.iconfl {
    position: relative;
    i {
        position: absolute;
        top: 3px;
    }
}
</style>

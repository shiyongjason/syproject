<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">会员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.adminAccount" placeholder="请输入账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">所属商家：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.merchantName" placeholder="请输入商家" maxlength="50"></el-input>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-col-title">
                        <el-cascader placeholder="试试搜索： 南京" :options="options" v-model="optarr" :clearable=true :collapse-tags=true :show-all-levels="true" @change="cityChange" :props="{ multiple: true ,value:'countryId',label:'name',children:'cities'}" filterable>
                        </el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">创建时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.registrationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.registrationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>

            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">认证状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.isAuthentication">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option label="已认证" :value=true>
                            </el-option>
                            <el-option label="未认证" :value=false>
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">认证时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-checkbox v-model="queryParams.isEnabled" :true-label=1 :false-label=0>只看启用</el-checkbox>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="onFindMlist(1)">
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
            <el-tag size="medium" class="eltagtop">
                已筛选 {{memberData.total}} 项 | 未认证：{{bossStatic.unAuthenticationNum?bossStatic.unAuthenticationNum:0}}；已认证：{{bossStatic.authenticationNum?bossStatic.authenticationNum:0}}；启用：{{bossStatic.enabledNum?bossStatic.enabledNum:0}}；禁用：{{bossStatic.forbiddenNum?bossStatic.forbiddenNum:0}}；
            </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" @onSortChange="onSortChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true'>
                <template slot="source" slot-scope="scope">
                    {{memberSource[scope.data.row.source-1]}}
                </template>
                <template slot="addressName" slot-scope="scope">
                    {{scope.data.row.provinceName?scope.data.row.provinceName:'-'}}{{scope.data.row.cityName?scope.data.row.cityName:''}}{{scope.data.row.countryName?scope.data.row.countryName:''}}
                </template>
                <template slot="isAutoDispatch" slot-scope="scope">
                    {{scope.data.row.isAutoDispatch==0?'否':'是'}}
                </template>
                <template slot="isAuthentication" slot-scope="scope">
                    <span :class="scope.data.row.isAuthentication==0?'colorRed':'colorGreen'">{{scope.data.row.isAuthentication==0?'未认证':'已认证'}}</span>
                </template>
                <template slot="isEnabled" slot-scope="scope">
                    {{scope.data.row.isEnabled==0?'禁用':'启用'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button size="mini" :type="scope.data.row.isEnabled==0?'success':'danger'" plain @click="onOperate(scope.data.row)">{{scope.data.row.isEnabled==1?'禁用':'启用'}}</el-button>
                    <el-button type="primary" size="mini" plain @click="onFindInfo(scope.data.row.companyCode,'member')">查看详情</el-button>
                </template>
            </basicTable>
        </div>
        <drawerCom :drawer=drawer @backEvent='restDrawer' ref="drawercom" :merchantCode='companyCode'></drawerCom>
    </div>
</template>
<script>
import drawerCom from './drawerCom'
import { mapActions, mapGetters, mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { changeMemberState } from './api/index'
export default {
    name: 'membermanage',
    data () {
        return {
            queryParams: {
                authenticationEndTime: '',
                authenticationStartTime: '',
                companyName: '',
                isAuthentication: '',
                isEnabled: '',
                adminAccount: '',
                pageNumber: 1,
                pageSize: 10,
                registrationEndTime: '',
                registrationStartTime: '',
                merchantName: '',
                areaIds: '',
                authenticationTime: '',
                createTime: 'desc'
            },
            paginationInfo: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '180px' },
                { label: '管理员账号', prop: 'adminAccount', width: '150px' },
                { label: '所属商家', prop: 'merchantName', width: '150px' },
                { label: '省市区', prop: 'addressName', width: '150px' },
                // { label: '会员来源', prop: 'source' },
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
                { label: '认证时间', prop: 'authenticationTime', formatters: 'dateTimes', width: '150px', sortable: true },
                { label: '状态', prop: 'isEnabled' }
            ],
            tableData: [],
            drawer: false,
            checked: false,
            memberSource: ['存量会员店', '存量平台公司', 'app注册', '商家注册', '好友推荐', '商家邀请'],
            bossStatic: {},
            copyParams: {},
            branchArr: [],
            companyCode: '',
            options: [],
            optarr: ''
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
            memberData: 'memberData',
            memberStatic: 'memberStatic',
            branchList: 'branchList',
            nestDdata: 'nestDdata'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    mounted () {
        this.onFindMlist()
        this.onGetbranch()
        this.copyParams = deepCopy(this.queryParams)
        this.getFindNest()
    },
    methods: {
        ...mapActions({
            findMemberList: 'findMemberList',
            findMemberStatic: 'findMemberStatic',
            findBranch: 'findBranch',
            findNest: 'findNest'
        }),
        onRest () {
            this.queryParams = deepCopy(this.copyParams)
            this.queryParams.adminAccount = ''
            this.optarr = ''
            // this.options = []
            this.getFindNest()
            this.onFindMlist(1)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onFindMlist()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onFindMlist()
        },
        onSortChange (val) {
            console.log(val)
            if (val.prop === 'registrationTime') {
                this.queryParams.createTime = val.order === 'descending' ? 'desc' : 'asc'
                this.queryParams.authenticationTime = ''
            } else {
                this.queryParams.authenticationTime = val.order === 'descending' ? 'desc' : 'asc'
                this.queryParams.createTime = ''
            }
            this.onFindMlist()
        },
        async onFindMlist (val) {
            if (val) this.queryParams.pageNumber = val
            await this.findMemberList(this.queryParams)
            this.tableData = this.memberData.records
            this.paginationInfo = {
                total: this.memberData.total,
                pageNumber: this.memberData.current,
                pageSize: this.memberData.size
            }
            this.onStatic()
        },
        async onStatic () {
            await this.findMemberStatic(this.queryParams)
            this.bossStatic = this.memberStatic
        },
        async onGetbranch () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        onOperate (val) {
            this.$confirm(val.isEnabled == 0 ? '是否确认启用该会员的账号？' : '是否确认禁用该会员的账号？禁用后会员将无法使用相关功能，你还要继续吗？', '提示', {
                confirmButtonText: val.isEnabled == 0 ? '确认启用' : '确认禁用',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await changeMemberState({ companyCode: val.companyCode, status: val.isEnabled == 0 ? 1 : 0, phone: this.userInfo.phoneNumber, updateBy: this.userInfo.employeeName })
                this.$message({
                    message: val.isEnabled == 0 ? '会员账号启用成功' : '会员账号禁用成功',
                    type: 'success'
                })
                this.onFindMlist()
            })
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
        cityChange (val) {
            const cityarr = []
            val && val.map(item => {
                cityarr.push(item[2])
            })
            this.queryParams.areaIds = cityarr.join(',')
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

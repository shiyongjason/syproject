<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">经营区域：</div>
                    <div class="query-col__input">
                        <el-cascader placeholder="试试搜索： 南京" :options="options" v-model="optarr" :clearable=true :collapse-tags=true :show-all-levels="true" @change="cityChange" :props="{ multiple: true ,value:'countryId',label:'name',children:'cities'}" filterable>
                        </el-cascader>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.pkDeptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">联系人/手机号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.contract" placeholder="请输入联系人/手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">是否分配：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.assigned" placeholder="请选择" :clearable=true>
                            <el-option v-for="item in droplist" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">是否接收：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.received" placeholder="请选择" :clearable=true>
                            <el-option v-for="item in droplist" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">分配员工：</div>
                    <div class="query-col__input">
                        <!-- <el-input v-model="queryParams.assignedUserId" placeholder="请输入分配员工" maxlength="50"></el-input> -->
                        <el-autocomplete v-model="stateUser" :fetch-suggestions="querySearchAsync" placeholder="请输入员工" @blur="onBlurItem" :trigger-on-focus="false" @select="handleSelect">
                            <template slot-scope="{ item }">
                                <div class="autoflex">
                                    <div class="name">{{ item.psnname }}</div>
                                    <span class="addr">{{ item.mobile }}</span>
                                </div>
                            </template>
                        </el-autocomplete>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <!-- <el-date-picker v-model="queryParams.minApplyTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxApplyTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker> -->
                        <HDatePicker :start-change="onStartApply" :end-change="onEndApply" :options="applyOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="searchList()">
                        查询
                    </h-button>
                    <h-button @click="onRest">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{vipApply.total||0}} 项</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=200 :isShowIndex='true'>
                <template slot="companyName" slot-scope="scope">
                    <span @click="onLinkCom(scope.data.row)" class="link-cell">{{scope.data.row.companyName}}</span>
                </template>
                <template slot="assignedUserId" slot-scope="scope">
                    {{scope.data.row.assignedUserId?'是':'否'}}
                </template>
                <template slot="received" slot-scope="scope">
                    {{scope.data.row.received?'是':'否'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onDistribution(scope.data.row)" v-if="hosAuthCheck(auths.CRM_APPLY_ASSIGN)">分配</h-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="分配" :visible.sync="dialogVisible" width="35%" :before-close="()=>dialogVisible = false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="分配给（员工）" prop="assignedUserId" ref="assignedUserId">
                    <el-autocomplete v-model="stateN" :fetch-suggestions="querySearchAsync" placeholder="请输入员工" @blur="onBlurItem" :trigger-on-focus="false" @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div class="autoflex">
                                <div class="name">{{ item.psnname }}</div>
                                <span class="addr">{{ item.mobile }}</span>
                            </div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="所属分部" prop="pkDeptDoc">
                    <el-select v-model="ruleForm.pkDeptDoc" placeholder="请选择" :clearable=true>
                        <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="说明" prop="">
                    <el-input type="textarea" v-model="ruleForm.remark" maxlength="200" show-word-limit :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="dialogVisible = false">取消</h-button>
                <h-button type="primary" @click="submitForm" :loading=isloading>{{isloading?'提交中...':'分配'}}</h-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { postVipsigner } from './api'
import * as auths from '@/utils/auth_const'
import { newCache } from '@/utils/index'
export default {
    name: 'vipapplication',
    data () {
        return {
            auths,
            restaurants: [],
            stateN: '',
            stateUser: '',
            timeout: null,
            isloading: false,
            queryParams: {
                assigned: '',
                assignedUserId: '',
                companyName: '',
                contract: '', // 联系人 手机号
                maxApplyTime: '',
                minApplyTime: '',
                pageNumber: 1,
                pageSize: 10,
                pkDeptDoc: '',
                received: '',
                cityIds: [],
                authCode: '', // 菜单路由
                jobNumber: '' // 工号
            },
            copyParams: {},
            droplist: [{
                value: 1,
                label: '是'
            }, {
                value: 0,
                label: '否'
            }],
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '' },
                { label: '经营区域', prop: 'businessArea', width: '' },
                { label: '联系人', prop: 'contract', width: '' },
                { label: '联系人手机号', prop: 'contractMobile', width: '' },
                { label: '是否分配', prop: 'assignedUserId', width: '' },
                { label: '所属分部', prop: 'deptName' },
                { label: '分配员工', prop: 'assignedUserName', width: '' },
                { label: '是否接收', prop: 'received', width: '' },
                { label: '申请时间', prop: 'applyTime', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'updateTime', formatters: 'dateTimes' }
            ],
            tableData: [],
            branchArr: [],
            paginationInfo: {},
            dialogVisible: false,
            rules: {
                assignedUserId: [
                    { required: true, message: '请选择分配员工', trigger: 'blur' }
                ],
                pkDeptDoc: [
                    { required: true, message: '请选择分部', trigger: 'change' }
                ]
            },
            ruleForm: {
                remark: '',
                updateBy: '',
                assignedUserId: '',
                companyVipId: ''
            },
            copyRuleForm: {

            },
            options: [],
            optarr: '',
            stateItem: {}
        }
    },
    watch: {
        'stateN' (val) {
            if (JSON.stringify(this.stateItem) == '{}') {
                return false
            } else if (this.stateItem.psnname !== val) {
                console.log(3, val, this.stateItem)
                this.ruleForm.assignedUserId = ''
            }
        },
        'stateUser' (val) {
            if (JSON.stringify(this.stateItem) == '{}') {
                return false
            } else if (this.stateItem.psnname !== val) {
                this.queryParams.assignedUserId = ''
            }
        },
        'ruleForm.assignedUserId' (val) {
            console.log(val)
            this.$nextTick(() => {
                if (val) this.$refs['assignedUserId'].clearValidate()
            })
        }
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            crmdepList: 'crmmanage/crmdepList',
            vipApply: 'vipApply/vipApply',
            contracts: 'vipApply/contracts',
            nestDdata: 'nestDdata'
        }),
        applyOptions () {
            return {
                valueFormat: 'yyyy-MM-dd HH:mm',
                format: 'yyyy-MM-dd HH:mm',
                type: 'datetime',
                startTime: this.queryParams.minApplyTime,
                endTime: this.queryParams.maxApplyTime
            }
        }
    },
    async mounted () {
        this.copyParams = { ...this.queryParams }
        this.onGetbranch()
        this.searchList()
        this.onGetnest()
        this.copyRuleForm = { ...this.ruleForm }
    },
    methods: {
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findNest: 'findNest',
            findApplyvip: 'vipApply/findApplyvip',
            findContract: 'vipApply/findContract'
        }),
        onStartApply (val) {
            this.queryParams.minApplyTime = val
        },
        onEndApply (val) {
            this.queryParams.maxApplyTime = val
        },
        onRest () {
            this.queryParams = { ...this.copyParams }
            this.stateUser = ''
            this.optarr = ''
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        async searchList () {
            this.queryParams.jobNumber = this.userInfo.jobNumber
            this.queryParams.authCode = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
            const { ...params } = this.queryParams
            await this.findApplyvip(params)
            this.tableData = this.vipApply.records || []
            this.paginationInfo = {
                pageNumber: this.vipApply.current,
                pageSize: this.vipApply.size,
                total: this.vipApply.total
            }
            // await this.findProjectLoan(params)
            // this.loanData = this.projectLoan ? this.projectLoan : ''
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
            this.branchArr = this.crmdepList
        },
        async onGetnest () {
            await this.findNest()
            this.options = this.nestDdata && this.nestDdata.map(item => {
                item.countryId = item.provinceId
                item.cities.map(value => {
                    value.cities = value.countries
                    value.countryId = value.cityId
                })
                return item
            })
            console.log(this.options)
        },
        cityChange (val) {
            const cityarr = []
            val && val.map(item => {
                cityarr.push(item[2])
            })
            this.queryParams.cityIds = cityarr.join(',')
        },
        onDistribution (val) {
            this.stateN = ''
            // console.log(val, this.copyRuleForm)
            this.ruleForm = { ...this.copyRuleForm, companyVipId: val.id, pkDeptDoc: val.pkDeptDoc }
            // this.ruleForm.companyVipId = val.id
            // this.ruleForm.pkDeptDoc = val.pkDeptDoc
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs.ruleForm.clearValidate()
            })
        },
        async querySearchAsync (queryString, cb) {
            this.queryString = queryString
            if (queryString) {
                await this.findContract(queryString)
                var restaurants = this.contracts
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    cb(results)
                }, 3000 * Math.random())
            }
        },
        createStateFilter (queryString) {
            return (state) => {
                return (state.psnname.indexOf(queryString) === 0)
            }
        },
        handleSelect (item) {
            if (this.dialogVisible) {
                this.stateN = item.psnname
                this.stateItem = item
                this.ruleForm.assignedUserId = item.psncode
            } else {
                this.stateUser = item.psnname
                this.stateItem = item
                this.queryParams.assignedUserId = item.psncode
            }
        },
        onBlurItem (item) {
        },
        submitForm () {
            this.ruleForm.updateBy = this.userInfo.employeeName
            this.isloading = true
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await postVipsigner(this.ruleForm)
                        this.dialogVisible = false
                        this.isloading = false
                        this.$message({
                            message: `会员分配成功`,
                            type: 'success'
                        })
                        this.searchList()
                    } catch (error) {
                        this.isloading = false
                    }
                } else {
                    this.isloading = false
                }
            })
        },
        onLinkCom (val) {
            this.$router.push({ path: '/goodwork/authenlist', query: { name: val.companyName } })
        }
    },
    beforeUpdate () {
        newCache('vipapplication')
    }
}
</script>
<style lang="scss" scoped>
.eltagtop {
    margin-bottom: 10px;
}
.autoflex {
    display: flex;
    justify-content: space-between;
}
</style>
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
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-col-input">
                        <el-cascader placeholder="试试搜索： 南京" :options="options" v-model="optarr" :clearable=true :collapse-tags=true :show-all-levels="true" @change="cityChange" :props="{ multiple: true ,value:'cityId',label:'name',children:'cities'}" filterable>
                        </el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.pkDeptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">联系人/手机号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.contract" placeholder="请输入联系人/手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">是否分配：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.assigned" placeholder="请选择" :clearable=true>
                            <el-option v-for="item in droplist" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">是否接收：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.received" placeholder="请选择" :clearable=true>
                            <el-option v-for="item in droplist" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">分配员工：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.assignedUserId" placeholder="请输入分配员工" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">申请时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minApplyTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxApplyTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop">已筛选 {{vipApply.total||0}} 项</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=300 :isShowIndex='true'>
                <template slot="assignedUserId" slot-scope="scope">
                    {{scope.data.row.assignedUserId?'是':'否'}}
                </template>assignedUserId
                <template slot="received" slot-scope="scope">
                    {{scope.data.row.received?'是':'否'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onDistribution(scope.data.row)">分配</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="分配" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="分配给（员工）" prop="assignedUserId" ref="assignedUserId">
                    <el-autocomplete v-model="stateN"  :fetch-suggestions="querySearchAsync" placeholder="请输入员工"  @blur="onBlurItem"  :trigger-on-focus="false" @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.psnname }}</div>
                            <span class="addr">{{ item.mobile }}</span>
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm" :loading=isloading>{{isloading?'提交中...':'分配'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { postVipsigner } from './api'
export default {
    name: 'vipapplication',
    data () {
        return {
            restaurants: [],
            stateN: '',
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
                cityIds: []
            },
            copyParams: {},
            droplist: [{
                value: 1,
                label: '是'
            }, {
                value: 2,
                label: '否'
            }],
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '' },
                { label: '经营区域', prop: 'businessArea', width: '' },
                { label: '联系人', prop: 'contract', width: '' },
                { label: '联系人手机号', prop: 'assignedUserMobile', width: '' },
                { label: '是否分配', prop: 'assignedUserId', width: '' },
                { label: '所属分部', prop: 'firstPartName' },
                { label: '分配员工', prop: 'assignedUserName', width: '' },
                { label: '是否接收', prop: 'received', width: '' },
                { label: '申请时间', prop: 'applyTime', width: '150', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes' }
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
        pickerOptionsMax () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxApplyTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsMin () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minApplyTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
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
        onRest () {
            this.queryParams = { ...this.copyParams }
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
        async  searchList () {
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
            this.nestDdata && this.nestDdata.map(val => {
                val.cityId = val.provinceId
            })
            this.options = this.nestDdata
        },
        cityChange (val) {
            const cityarr = []
            val && val.map(item => {
                cityarr.push(item[1])
            })
            this.queryParams.cityIds = cityarr.join(',')
        },
        onDistribution (val) {
            this.stateN = ''
            console.log(val, this.copyRuleForm)
            this.ruleForm = { ...this.copyRuleForm, companyVipId: val.companyId, pkDeptDoc: val.pkDeptDoc }
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
            this.stateN = item.psnname
            this.stateItem = item
            this.ruleForm.assignedUserId = item.psncode
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
                    } catch (error) {
                        this.isloading = false
                    }
                } else {
                    this.isloading = false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.colred {

    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
.eltagtop {
    margin-bottom: 10px;
}
.colblue {
    color: #50b7f7;
    cursor: pointer;
}
.project-record {
    padding: 10px 0;
    height: 400px;
    overflow-y: scroll;
    /deep/ .el-card__body {
        padding: 5px;
        span {
            color: grey;
        }
    }
}
.project-plant {
    display: flex;
    flex-wrap: wrap;
    .plantimg {
        margin: 5px;
        width: 95px;
        height: 95px;
        overflow: hidden;
        img {
            width: 95px;
            height: 100%;
        }
    }
}
.previewimg {
    text-align: center;
    img {
        width: 500px;
        padding: 10px;
    }
}
</style>
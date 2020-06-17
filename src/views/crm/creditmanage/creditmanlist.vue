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
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.pkDeptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">信用评级 ：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.creditLevel" placeholder="请选择">
                            <el-option v-for="item in droplist" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">服务费：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.minServiceFee" v-isNum:1 placeholder="请输入最小服务费" maxlength="50"></el-input>
                        ~
                        <el-input v-model="queryParams.maxServiceFee" v-isNum:1 placeholder="请输入最大服务费" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">可代采购额度：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.minPurchaseQuota" v-isNum:6 placeholder="请输入最小可代采购额度" maxlength="50"></el-input>万元
                        ~
                        <el-input v-model="queryParams.maxPurchaseQuota" v-isNum:6 placeholder="请输入最大可代采购额度" maxlength="50"></el-input>万元
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">剩余代采购额度：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.minRemainPurchaseQuota" v-isNum:6 placeholder="请输入最小剩余代采购额度" maxlength="50"></el-input>万元
                        ~
                        <el-input v-model="queryParams.maxRemainPurchaseQuota" v-isNum:6 placeholder="请输入最大剩余代采购额度" maxlength="50"></el-input>万元
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">信用到期时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minEndTime" type="datet" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxEndTime" type="datet" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">资料状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.documentStatus" placeholder="请选择">
                            <el-option v-for="item in matelist" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
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
            <el-tag size="medium" class="eltagtop">已筛选 {{creditdata.total||0}} 项</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :isShowIndex='true'>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status?'colred':'colgry'">{{scope.data.row.status?'正常':'过期'}}</span>
                </template>
                <template slot="documentStatus" slot-scope="scope">
                    {{matelist[scope.data.row.documentStatus-1].value}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onDrawerinfo(scope.data.row.companyId)">分配</el-button>
                </template>
            </basicTable>
        </div>
        <creditdrawer ref="creditdrawer"></creditdrawer>
        <el-dialog title="分配" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="分配给（员工）" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所属分部" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="name">
                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="300" show-word-limit :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import creditdrawer from './components/creditdrawer'
import { CREDITLEVEL, MATELIST } from '../const'
export default {
    name: 'creditManage',
    data () {
        return {
            queryParams: {
                companyName: '',
                creditLevel: '',
                maxEndTime: '',
                maxPurchaseQuota: '',
                maxRemainPurchaseQuota: '',
                maxServiceFee: '',
                minEndTime: '',
                minPurchaseQuota: '',
                minRemainPurchaseQuota: '',
                minServiceFee: '',
                pageNumber: 1,
                pageSize: 10,
                pkDeptDoc: '',
                documentStatus: ''
            },
            copyParms: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '' },
                { label: '所属分部', prop: 'deptName' },
                { label: '信用评级', prop: 'creditLevel' },
                { label: '服务费', prop: 'serviceFee' },
                { label: '可代采购额度（万元）', prop: 'purchaseQuota', formatters: 'money' },
                { label: '剩余代采购金额（万元）', prop: 'remainPurchaseQuota', formatters: 'money' },
                { label: '信用到期时间', prop: 'endTime', width: '150', formatters: 'date' },
                { label: '状态', prop: 'status', width: '120' },
                { label: '资料状态', prop: 'documentStatus' },
                { label: '资料更新时间', prop: 'documentUpdateTime', width: '150', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes' }

            ],
            tableData: [],
            branchArr: [],
            paginationInfo: {},
            droplist: CREDITLEVEL,
            matelist: MATELIST,
            dialogVisible: false,
            rules: {
                name: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                des: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            },
            ruleForm: {}
        }
    },
    components: {
        creditdrawer
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            crmdepList: 'crmmanage/crmdepList',
            creditdata: 'creditManage/creditdata'

        }),
        pickerOptionsMax () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxEndTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsMin () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minEndTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    async mounted () {
        this.onGetbranch()
        this.searchList()
        this.copyParms = { ...this.queryParams }
    },
    methods: {
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findCreditManager: 'creditManage/findCreditManager',
            findCreditPage: 'creditManage/findCreditPage'
        }),
        onRest () {
            this.queryParams = { ...this.copyParms }
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
            await this.findCreditManager(params)
            this.tableData = this.creditdata.records || []
            this.paginationInfo = {
                pageNumber: this.creditdata.current,
                pageSize: this.creditdata.size,
                total: this.creditdata.total
            }
            // await this.findProjectLoan(params)
            // this.loanData = this.projectLoan ? this.projectLoan : ''
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
            this.branchArr = this.crmdepList
        },
        onDrawerinfo (val) {
            this.$refs.creditdrawer.onShowDrawerinfn(val)
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
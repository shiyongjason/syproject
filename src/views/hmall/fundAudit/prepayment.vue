<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">代采订单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.agentOrderNo" placeholder="请输入代采订单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">管理员账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.username" placeholder="请输入管理员账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">平台确认状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.repayStatus">
                            <el-option v-for="item in platformStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">打款账户名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.accountName" placeholder="请输入打款账户名称" maxlength="60"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">打款银行账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.bankCardNo" placeholder="请输入打款银行账号" maxlength="60"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">提交时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.submitTimeFrom" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.submitTimeTo" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerOptionsEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">确认时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.platformConfirmTimeFrom" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.platformConfirmTimeTo" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">资金同步状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.fundSyncStatus">
                            <el-option v-for="item in fundSyncStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset()">重置</h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=150 :isShowIndex='true' :isfiexd="'right'">
                <template slot="agentOrderNo" slot-scope="scope">
                    <a class="isLink" @click="onInfo(scope.data.row)">{{scope.data.row.agentOrderNo}}</a>
                </template>
                <template slot="repayStatus" slot-scope="scope">
                    {{platformStatusMap.get(scope.data.row.repayStatus) || '-'}}
                </template>
                <template slot="fundSyncStatus" slot-scope="scope">
                    {{fundSyncStatus.get(scope.data.row.fundSyncStatus) || '-'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table v-if="scope.data.row.repayStatus == 10" @click="onSure(scope.data.row)">确认</h-button>
                    <h-button table v-if="scope.data.row.repayStatus == 20 &&scope.data.row.fundSyncStatus == 30" @click="onFund(scope.data.row)">资金同步</h-button>
                </template>
            </basicTable>
            <el-dialog title="确认" width="500px" :visible.sync="closeOrderDialog" :close-on-click-modal=false @close='closeDialog'>
                <el-form :model="form" ref="form" :rules='rules' class="pt40">
                    <el-form-item prop="repayStatus">
                        <el-radio-group v-model="form.repayStatus" @change="formChange">
                            <el-radio :label="20">通过</el-radio>
                            <el-radio :label="30">不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="creatRemark" v-if="form.repayStatus == 30" prop="rejectReason">
                        <el-input type="textarea" maxlength="200" :rows="3" placeholder="理由说明" v-model="form.rejectReason">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <h-button type="primary" @click="onEdit">确定</h-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { PLATFORM_STATUS_OPTIONS, PLATFORM_STATUS_MAP, FUND_SYNC_STATUS_OPTIONS, FUND_SYNC_STATUS_MAP } from './const'
import { prepaymentRepay } from './api/index'
import { syncFundMis } from '../finance/api/index'
export default {
    name: 'auditFundList',
    data () {
        return {
            platformStatusOptions: PLATFORM_STATUS_OPTIONS,
            platformStatusMap: PLATFORM_STATUS_MAP,
            fundSyncStatusOptions: FUND_SYNC_STATUS_OPTIONS,
            fundSyncStatus: FUND_SYNC_STATUS_MAP,
            queryParams: {
                agentOrderNo: '',
                companyName: '',
                username: '',
                repayStatus: '',
                accountName: '',
                bankCardNo: '',
                submitTimeFrom: '',
                submitTimeTo: '',
                platformConfirmTimeFrom: '',
                platformConfirmTimeTo: '',
                fundSyncStatus: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: 'mis订单号', prop: 'misOrderNo' },
                { label: '提交时间', prop: 'submitTime', formatters: 'dateTime' },
                { label: '代采订单总金额', prop: 'totalAmount' },
                { label: '待回尾款', prop: 'leftRepayAmount' },
                { label: '提前还款金额', prop: 'repayAmount' },
                { label: '超额回款金额', prop: 'overRepayAmount' },
                { label: '打款账户名称', prop: 'accountName' },
                { label: '打款银行账号', prop: 'bankCardNo' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '平台确认状态', prop: 'repayStatus' },
                { label: '资金同步状态', prop: 'fundSyncStatus' },
                { label: '确认时间', prop: 'platformConfirmTime', formatters: 'dateTime' },
                { label: '备注', prop: 'rejectReason' }
            ],
            copyParams: {},
            closeOrderDialog: false,
            form: {},
            sureId: '',
            rules: {
                repayStatus: [
                    { required: true, message: '请选择确认结果', trigger: 'change' }
                ],
                rejectReason: [
                    { required: true, message: '请填写理由说明', trigger: 'blur' },
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value && value.replace(/\s/g, '').length < 1) {
                                return callback(new Error('请填写理由说明'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            prepaymentList: state => state.hmall.fundAudit.prepaymentList
        }),
        paginationInfo () {
            return {
                total: this.prepaymentList.total,
                pageNumber: this.prepaymentList.current,
                pageSize: this.prepaymentList.size
            }
        },
        tableData () {
            return this.prepaymentList.records
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.submitTimeTo
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.submitTimeFrom
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.platformConfirmTimeTo
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.platformConfirmTimeFrom
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        this.init()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        init () {
            this.getPrepaymentList()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getPrepaymentList()
        },
        onReset () {
            this.queryParams = { ...this.copyParams }
            this.getPrepaymentList()
        },
        ...mapActions({
            findPrepayment: 'fundAudit/findPrepayment'
        }),
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getPrepaymentList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getPrepaymentList()
        },
        async getPrepaymentList () {
            await this.findPrepayment(this.queryParams)
        },
        onSure (val) {
            this.sureId = val.id
            this.closeOrderDialog = true
        },
        // 跳转boss代采订单详情
        onInfo (val) {
            this.$router.push({ path: '/b2b/fundAudit/statusFundInfo', query: { id: val.agentOrderId, pageType: 'auditFundStatus' } })
        },
        async onEdit () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        const form = {
                            repayStatus: this.form.repayStatus,
                            rejectReason: this.form.rejectReason,
                            operator: this.userInfo.employeeName
                        }
                        await prepaymentRepay(this.sureId, form)
                        this.closeOrderDialog = false
                        this.getPrepaymentList()
                    } catch (error) {
                        this.closeOrderDialog = false
                        this.getPrepaymentList()
                    }
                }
            })
        },
        // 资金同步
        async onFund (val) {
            try {
                await syncFundMis(val.id)
                this.getPrepaymentList()
            } catch (e) {
                this.getPrepaymentList()
            }
        },
        formChange (val) {
            this.createChange = val
        },
        closeDialog () {
            this.form.repayStatus = ''
            this.form.rejectReason = ''
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
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
/deep/ .el-drawer__body {
    overflow-y: scroll;
    // position: relative;
}
.drawer-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    form {
        // flex: 1;
        margin-bottom: 60px;
        // border-bottom: 1px solid #e5e5e5;
    }
    .drawer-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px 24px;
        border-top: 1px solid #e5e5ea;
        background: #fff;
        z-index: 1000;
        button {
            flex: 1;
        }
        .drawer-button {
            text-align: right;
        }
    }
}
/deep/.el-radio-group {
    font-size: 0;
    display: flex;
    width: 100%;
    justify-content: space-around;
}
.creatRemark {
    padding-top: 20px;
    border-top: 1px solid #ccc;
    margin-top: 20px;
}
</style>

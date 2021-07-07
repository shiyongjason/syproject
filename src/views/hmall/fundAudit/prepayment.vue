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
                        <el-input v-model="queryParams.adminAccount" placeholder="请输入管理员账号" maxlength="50"></el-input>
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
                        <el-date-picker v-model="queryParams.submitTimeFrom" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.submitTimeTo" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">确认时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.platformConfirmTimeFrom" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.platformConfirmTimeTo" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset()">重置</h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true' :isfiexd="'right'">
                <template slot="repayStatus" slot-scope="scope">
                    {{platformStatusMap.get(scope.data.row.repayStatus) || '-'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table v-if="scope.data.row.repayStatus == 10" @click="onSure(scope.data.row)">确认</h-button>
                </template>
            </basicTable>
            <el-dialog title="确认" width="500px" :visible.sync="closeOrderDialog" :close-on-click-modal=false>
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
import { PLATFORM_STATUS_OPTIONS, PLATFORM_STATUS_MAP } from './const'
import { prepaymentRepay } from './api/index'
export default {
    name: 'auditFundList',
    data () {
        return {
            platformStatusOptions: PLATFORM_STATUS_OPTIONS,
            platformStatusMap: PLATFORM_STATUS_MAP,
            queryParams: {
                agentOrderNo: '',
                companyName: '',
                adminAccount: '',
                repayStatus: '',
                accountName: '',
                bankCardNo: '',
                submitTimeFrom: '',
                submitTimeTo: '',
                platformConfirmTimeFrom: '',
                platformConfirmTimeTo: '',
                pageNumber: 1,
                pageSize: 10
            },
            paginationInfo: {},
            tableLabel: [
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: 'mis订单号', prop: 'misOrderNo' },
                { label: '提交时间', prop: 'submitTime', formatters: 'dateTimes' },
                { label: '代采订单总金额', prop: 'totalAmount' },
                { label: '待回尾款', prop: 'leftRepayAmount' },
                { label: '提前还款金额', prop: 'repayAmount' },
                { label: '打款银行名称', prop: 'accountName' },
                { label: '打款银行账号', prop: 'bankCardNo' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '平台确认状态', prop: 'repayStatus' },
                { label: '确认时间', prop: 'platformConfirmTime' },
                { label: '备注', prop: 'rejectReason' }
            ],
            copyParams: {},
            closeOrderDialog: true,
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
                    } catch (error) {
                        this.closeOrderDialog = false
                    }
                }
            })
        },
        formChange (val) {
            // this.createChange = val
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

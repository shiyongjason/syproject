<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">管理员账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.username" placeholder="请输入管理员账号" maxlength="50"></el-input>
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
                        <el-select v-model="queryParams.subsectionCode" placeholder="全部" clearable>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商家类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.merchantType">
                            <el-option v-for="item in businessTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">店铺名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.shopName" placeholder="请输入店铺名称" maxlength="60"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">申请时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.applyStartTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.applyEndTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerOptionsEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">审核状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.auditStatus">
                            <el-option v-for="item in auditStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">审核时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.auditStartTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.auditEndTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="true" :isShowIndex='true' isfiexd="right">
                <template slot="subsectionName" slot-scope="scope">
                    {{scope.data.row.subsectionName || '无'}}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    {{businessTypeMap.get(scope.data.row.merchantType) || '-'}}
                </template>
                <template slot="limitStatus" slot-scope="scope">
                    <span>{{limitStatusMap.get(scope.data.row.limitStatus) || '-'}}</span>
                </template>
                <template slot="auditStatus" slot-scope="scope">
                    <span>{{auditStatusMap.get(scope.data.row.auditStatus) || '-'}}</span>
                </template>
                <template slot="prepayPercentage" slot-scope="scope">
                    <span>{{scope.data.row.prepayPercentage|percenShow}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button v-if="scope.data.row.auditStatus==10" table @click="onCheck(scope.data.row)">审核</h-button>
                </template>
            </basicTable>
        </div>
        <h-drawer title="资金审核" :visible.sync="drawer" :wrapperClosable="false" size="640px" @opened="handleOpen" @close="handleClose">
            <template #connect>
                <el-form ref="form" :model="form" :rules="form.auditStatus == 30?falseRules:rules" label-width="140px">
                    <el-form-item label="企业名称：">
                        {{form.companyName?form.companyName:'-'}}
                    </el-form-item>
                    <el-form-item label="商家账号：">
                        {{form.username?form.username:'-'}}
                    </el-form-item>
                    <el-form-item label="所属分部：">
                        {{form.subsectionName||'-'}}
                    </el-form-item>
                    <el-form-item label="店铺名称：">
                        {{form.shopName||'-'}}
                    </el-form-item>
                    <el-form-item label="商家类型：">
                        {{businessTypeMap.get(form.merchantType) || '-'}}
                    </el-form-item>
                    <el-form-item label="额度：" prop="creditLimit">
                        <el-input v-model="form.creditLimit" maxLength="10" placeholder="请输入额度"></el-input>
                    </el-form-item>
                    <el-form-item label="比例：" prop="prepayPercentage">
                        <el-input v-model="form.prepayPercentage" maxLength="10" placeholder="请输入比例">
                            <template slot="suffix">%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="额度有效时间：" prop="expireTime">
                        <el-date-picker v-model="form.expireTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-ddT23:59:59" placeholder="额度有效时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="审核：" prop="auditStatus">
                        <el-radio-group v-model="form.auditStatus" @change="onChange">
                            <el-radio :label="20">通过</el-radio>
                            <el-radio :label="30">不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="form.auditStatus == 30">
                        <el-form-item label="原因：" prop='note'>
                            <el-input type="textarea" rows="6" v-model="form.note" maxLength="60" placeholder="请输入原因"></el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </template>
            <template #btn>
                <h-button @click="drawer = false">取消</h-button>
                <h-button type='primary' @click="onSave">确定</h-button>
            </template>
        </h-drawer>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { BUSINESS_TYPE_OPTIONS, BUSINESS_TYPE_MAP, AUDIT_STATUS_OPTIONS, AUDIT_STATUS_MAP, DEADLINE_OPTIONS, DEADLINE_MAP, LIMIT_STATUS_MAP } from './const'
import { checkFund } from './api/index.js'
export default {
    name: 'fundAuditList',
    data () {
        return {
            businessTypeOptions: BUSINESS_TYPE_OPTIONS,
            businessTypeMap: BUSINESS_TYPE_MAP,
            auditStatusOptions: AUDIT_STATUS_OPTIONS,
            auditStatusMap: AUDIT_STATUS_MAP,
            deadlineOptions: DEADLINE_OPTIONS,
            deadlineMap: DEADLINE_MAP,
            limitStatusMap: LIMIT_STATUS_MAP,
            // 所属分部
            branchArr: [],
            queryParams: {
                username: '',
                companyName: '',
                subsectionCode: '',
                merchantType: '',
                shopName: '',
                applyEndTime: '',
                auditStatus: '',
                auditStartTime: '',
                auditEndTime: '',
                pageSize: 10,
                pageNumber: 1
            },
            resetParams: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '所属分部', prop: 'subsectionName' },
                { label: '店铺名称', prop: 'shopName' },
                { label: '商家类型', prop: 'merchantType' },
                { label: '申请时间', prop: 'applyTime', formatters: 'date' },
                { label: '额度', prop: 'creditLimit' },
                { label: '比例', prop: 'prepayPercentage' },
                { label: '额度状态', prop: 'limitStatus' },
                { label: '额度有效期', prop: 'expireTime', formatters: 'date' },
                { label: '审核状态', prop: 'auditStatus' },
                { label: '审核时间', prop: 'auditTime', formatters: 'dateTime' }
            ],
            drawer: false,
            fundId: '',
            form: {},
            rules: {
                creditLimit: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const reg = /^(([1-9])|([1-9][0-9]{1,7})|100000000)$/
                            if (!value || value == '') {
                                return callback(new Error('请输入额度'))
                            }
                            if (value && !reg.test(value)) {
                                return callback(new Error('额度格式为0-100000000的整数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                prepayPercentage: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const reg = /^(([1-9])|([1-9][0-9]{1})|100)$/
                            if (!value || value == '') {
                                return callback(new Error('请输入比例'))
                            }
                            if (value && !reg.test(value)) {
                                return callback(new Error('比例格式为0-100的整数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                expireTime: [
                    { required: true, message: '请输入额度有效时间', trigger: 'change' }
                ],
                auditStatus: [
                    { required: true, message: '请选择审核结果', trigger: 'change' }
                ],
                note: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                return callback(new Error('请输入原因'))
                            }
                            if (value && value.replace(/\s/g, '').length < 1) {
                                console.log('111')
                                return callback(new Error('请输入原因'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            falseRules: {
                creditLimit: [
                    {
                        required: false,
                        validator: (rule, value, callback) => {
                            const reg = /^(([1-9])|([1-9][0-9]{1,7})|100000000)$/
                            if (value && !reg.test(value)) {
                                return callback(new Error('额度格式为0-100000000的整数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                prepayPercentage: [
                    {
                        required: false,
                        validator: (rule, value, callback) => {
                            const reg = /^(([0-9])|([1-9][0-9]{1})|100)$/
                            if (value && !reg.test(value)) {
                                return callback(new Error('比例格式为0-100的整数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                expireTime: [
                    { required: false, message: '请输入额度有效时间' }
                ],
                auditStatus: [
                    { required: true, message: '请选择审核结果', trigger: 'change' }
                ],
                note: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value || value == '') {
                                return callback(new Error('请输入原因'))
                            }
                            if (value && value.replace(/\s/g, '').length < 1) {
                                console.log('111')
                                return callback(new Error('请输入原因'))
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
            fundList: state => state.hmall.fundAudit.fundList,
            fundInfo: state => state.hmall.fundAudit.fundInfo
        }),
        ...mapGetters({
            branchList: 'branchList'
        }),
        tableData () {
            return this.fundList.records
        },
        paginationInfo () {
            return {
                total: this.fundList.total,
                pageNumber: this.fundList.current,
                pageSize: this.fundList.size
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.applyEndTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.applyStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.auditEndTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.auditStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.getBranch()
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getFundList()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getFundList()
        },
        onCheck (val) {
            this.drawer = true
            this.fundId = val.id
        },
        handleClose () {
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        async handleOpen () {
            await this.getFindInfo(this.fundId)
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        onChange () {
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        async onSave () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const form = {
                        id: this.fundId,
                        creditLimit: this.form.creditLimit,
                        prepayPercentage: this.form.prepayPercentage,
                        expireTime: this.form.expireTime,
                        auditStatus: this.form.auditStatus,
                        note: this.form.note,
                        auditBy: this.userInfo.employeeName
                    }
                    await checkFund(form)
                    this.$message.success('审核成功')
                    this.drawer = false
                    this.getFundList()
                }
            })
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.getFundList()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getFundList()
        },
        ...mapActions({
            findBranch: 'findBranch',
            findFundList: 'fundAudit/findFundList',
            findFundInfo: 'fundAudit/findFundInfo'
        }),
        async getBranch () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        async getFundList () {
            await this.findFundList(this.queryParams)
        },
        async getFindInfo (id) {
            await this.findFundInfo({ id: id })
            this.form = { ...this.fundInfo, expireTime: '' }
        }
    },
    mounted () {
        this.init()
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
</style>

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
                        <el-select v-model="queryParams.subsectionCode" placeholder="全部" :clearable=true>
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
                        <el-date-picker v-model="queryParams.applyStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.applyEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
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
                        <el-date-picker v-model="queryParams.auditStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.auditEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">
                        查询
                    </h-button>
                    <h-button @click="onRest()">
                        重置
                    </h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true' :isfiexd="'right'">
                <template slot="subsectionName" slot-scope="scope">
                    {{scope.data.row.subsectionName || '无'}}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    {{businessTypeMap.get(scope.data.row.merchantType) || '-'}}
                </template>
                <template slot="limitStatus" slot-scope="scope">
                    <span>{{limitStatusMap.get(scope.data.row.limitStatus)}}}</span>
                </template>
                <template slot="auditStatus" slot-scope="scope">
                    <span>{{auditStatusMap.get(scope.data.row.auditStatus)}}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button v-if="scope.data.row.auditStatus==10" table @click="onFindInfo(scope.data.row.id)">审核</h-button>
                </template>
            </basicTable>
        </div>
        <el-drawer title="资金审核" :visible.sync="brandDrawer" :wrapperClosable="false" size="640px" @close="handleClose">
            <div class="drawer-content">
                <el-form ref="form" :model="bossDetail" :rules="rules" label-width="100px">
                    <el-form-item label="企业名称：" :label-width="formLabelWidth">
                        {{bossDetail.companyName?bossDetail.companyName:'-'}}
                    </el-form-item>
                    <el-form-item label="商家账号：" :label-width="formLabelWidth">
                        {{bossDetail.username?bossDetail.username:'-'}}
                    </el-form-item>
                    <el-form-item label="所属分部：" :label-width="formLabelWidth">
                        {{bossDetail.subsectionName||'-'}}
                    </el-form-item>
                    <el-form-item label="店铺名称：" :label-width="formLabelWidth">
                        {{bossDetail.shopName||'-'}}
                    </el-form-item>
                    <el-form-item label="额度：" :label-width="formLabelWidth" :rules="rules.creditLimit">
                        <el-input v-model="creditLimit" maxLength="10" prop='' placeholder="请输入额度"></el-input>
                    </el-form-item>
                    <el-form-item label="比例：" :label-width="formLabelWidth">
                        <el-input v-model="prepayPercentage" maxLength="60" prop='' placeholder="请输入比例">
                            <template slot="suffix">%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="额度有效时间：" :label-width="formLabelWidth">
                        <el-date-picker v-model="expireTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="额度有效时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="审核：" prop="type" :label-width="formLabelWidth">
                        <el-radio-group v-model="auditStatus">
                            <el-radio :label="20">通过</el-radio>
                            <el-radio :label="30">不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="原因：" v-if="auditStatus == 30" :label-width="formLabelWidth">
                        <el-input v-model="note" maxLength="60" prop='' placeholder="请输入原因"></el-input>
                    </el-form-item>
                </el-form>
                <div class="drawer-footer">
                    <div class="drawer-footer-btn flr">
                        <h-button type='primary' @click="onSave">确定</h-button>
                        <h-button @click="brandDrawer = false">取消</h-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { BUSINESS_TYPE_OPTIONS, BUSINESS_TYPE_MAP, AUDIT_STATUS_OPTIONS, AUDIT_STATUS_MAP, DEADLINE_OPTIONS, DEADLINE_MAP, LIMIT_STATUS_MAP } from './const'
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
            paginationInfo: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '所属分部', prop: 'subsectionName' },
                { label: '店铺名称', prop: 'shopName' },
                { label: '商家类型', prop: 'merchantType' },
                { label: '申请时间', prop: 'applyTime', formatters: 'dateTimes' },
                { label: '额度', prop: 'creditLimit' },
                { label: '比例', prop: 'prepayPercentage' },
                { label: '额度状态', prop: 'limitStatus' },
                { label: '额度有效期', prop: 'expireTime', formatters: 'dateTimes' },
                { label: '审核状态', prop: 'auditStatus' },
                { label: '审核时间', prop: 'auditTime', formatters: 'dateTimes' }
            ],
            tableData: [],
            copyParams: {},
            // 所属分部
            branchArr: [],
            companyCode: '',
            bossDetail: {},
            brandDrawer: true,
            formLabelWidth: '140px',
            rules: {
                creditLimit: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const reg = /^(([0-9])|([1-9][0-9]{1,7})|100000000)$/
                            if (!value && !reg.test(value)) {
                                return callback(new Error('额度格式为0-100000000的整数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            creditLimit: '',
            prepayPercentage: '',
            expireTime: '',
            auditStatus: '',
            note: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            fundList: state => state.fundAudit.fundList,
            fundInfo: state => state.fundAudit.fundInfo
        }),
        ...mapGetters({
            merchantData: 'merchantData',
            branchList: 'branchList'
        }),
        ...mapGetters({
            fundList: 'fundAudit/fundList',
            fundInfo: 'fundAudit/fundInfo'
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
        // this.onFindMlist()
        this.init()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        async init () {
            this.onGetbranch()
            this.findFundList()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.findFundList(this.queryParams)
        },
        onReset () {
            this.queryParams = { ...this.copyParams }
            this.findFundList()
        },
        handleClose () {
            if (JSON.stringify(this.bossDetail) != JSON.stringify(this.copyDetail)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    this.$emit('backEvent')
                })
            } else {
                // this.activeName = 'first'
                this.$emit('backEvent')
            }
        },
        onSave () {
            this.brandDrawer = false
        },
        ...mapActions({
            // findMerchantList: 'findMerchantList',
            findBranch: 'findBranch',
            findFundList: 'fundAudit/findFundList',
            findFundInfo: 'fundAudit/findFundInfo'
        }),
        onRest () {
            this.queryParams = { ...this.copyParams }
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
        },
        async onGetbranch () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        async onFindInfo (val, type) {
            await this.findFundInfo({ id: val })
            this.bossDetail = this.fundInfo
            console.log(this.bossDetail)
            this.brandDrawer = true
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

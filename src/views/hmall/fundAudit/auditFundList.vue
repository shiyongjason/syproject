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
                <div class="query-cont__col" v-if="tabName=='0'">
                    <div class="query-col__lable">审核状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.orderStatus">
                            <el-option v-for="item in auditStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
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
                    <div class="query-col__lable">提交时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.submitStartTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.submitEndTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerOptionsEnd" default-time="23:59:59"></el-date-picker>
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
                    <div class="query-col__lable">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="全部" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
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
                    <div class="query-col__lable">审核时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.auditStartTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.auditEndTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset()">重置</h-button>
                </div>
            </div>
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane v-for="item in auditTabOptions" :label="item.label" :value="item.value" :key="item.value" :name="item.value"></el-tab-pane>
                </el-tabs>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isfiexd="'right'">
                <template slot="subsectionName" slot-scope="scope">
                    {{scope.data.row.subsectionName || '无'}}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    <span>{{businessTypeMap.get(scope.data.row.merchantType) || '-'}}</span>
                </template>
                <template slot="orderStatus" slot-scope="scope">
                    <span>{{auditStatusMap.get(scope.data.row.orderStatus)}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onseeTask(scope.data.row)">查看</h-button>
                    <h-button table v-if="scope.data.row.orderStatus=='10'" @click="onCheck(scope.data.row)">审核</h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { BUSINESS_TYPE_OPTIONS, BUSINESS_TYPE_MAP, AUDIT_OPTIONS, AUDIT_MAP, DEADLINE_OPTIONS, DEADLINE_MAP, AUDIT_TAB_OPTIONS } from './const'
import { clearCache, newCache } from '@/utils/index'
export default {
    name: 'auditFundList',
    data () {
        return {
            businessTypeOptions: BUSINESS_TYPE_OPTIONS,
            businessTypeMap: BUSINESS_TYPE_MAP,
            auditStatusOptions: AUDIT_OPTIONS,
            auditStatusMap: AUDIT_MAP,
            deadlineOptions: DEADLINE_OPTIONS,
            deadlineMap: DEADLINE_MAP,
            auditTabOptions: AUDIT_TAB_OPTIONS,
            queryParams: {
                agentOrderNo: '',
                orderStatus: '',
                submitStartTime: '',
                submitEndTime: '',
                auditStartTime: '',
                auditEndTime: '',
                companyName: '',
                pageNumber: 1,
                pageSize: 10,
                username: '',
                merchantType: '',
                subsectionCode: '',
                shopName: ''
            },
            tableLabel: [
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: '提交时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '代采订单总金额', prop: 'totalAmount' },
                { label: '代采商品数量', prop: 'quantity' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '商家类型', prop: 'merchantType' },
                { label: '所属分部', prop: 'subsectionName' },
                { label: '店铺名称', prop: 'shopName' },
                { label: '审核状态', prop: 'orderStatus' },
                { label: '审核时间', prop: 'auditTime', formatters: 'dateTime' },
                { label: '回款期限', prop: 'period' }
            ],
            drawer: false,
            copyParams: {},
            // 所属分部
            branchArr: [],
            tabName: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            auditFundList: state => state.hmall.fundAudit.auditFundList
        }),
        ...mapGetters({
            branchList: 'branchList'
        }),
        tableData () {
            return this.auditFundList.records
        },
        paginationInfo () {
            return {
                total: this.auditFundList.total,
                pageNumber: this.auditFundList.current,
                pageSize: this.auditFundList.size
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.submitEndTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.submitStartTime
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
    mounted () {
        this.init()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        init () {
            this.onGetbranch()
            this.getAuditFundList()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.getAuditFundList()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getAuditFundList()
        },
        ...mapActions({
            findBranch: 'findBranch',
            findAuditFundList: 'fundAudit/findAuditFundList'
        }),
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getAuditFundList()
        },
        onReset () {
            this.queryParams = { ...this.copyParams }
            if (this.tabName == '20') {
                this.queryParams.orderStatus = '20'
            } else if (this.tabName == '60') {
                this.queryParams.orderStatus = '60'
            } else if (this.tabName == '0') {
                this.queryParams.orderStatus = ''
            }
            this.onQuery()
        },
        onTab (value) {
            if (this.tabName == '20') {
                this.queryParams.orderStatus = '20'
            } else if (this.tabName == '60') {
                this.queryParams.orderStatus = '60'
            } else if (this.tabName == '0') {
                this.queryParams.orderStatus = ''
            }
            this.onQuery()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getAuditFundList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getAuditFundList()
        },
        async onGetbranch () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        async getAuditFundList () {
            await this.findAuditFundList(this.queryParams)
        },
        onseeTask (val) {
            this.$router.push({ path: '/b2b/fundAudit/listFundInfo', query: { id: val.id } })
        },
        onCheck (val) {
            this.$router.push({ path: '/b2b/fundAudit/aduitFundInfo', query: { id: val.id, check: true } })
        }
    },
    beforeRouteEnter (to, from, next) {
        newCache('auditFundList')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (!(to.name == 'fundInfo')) {
            clearCache('auditFundList')
        }
        next()
    },
    activated () {
        this.getAuditFundList()
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
</style>

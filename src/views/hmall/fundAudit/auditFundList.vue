<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">代采订单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantAccount" placeholder="请输入代采订单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">审核状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.isAuthentication">
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
                        <el-input v-model="queryParams.companyName" placeholder="请输入管理员账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">提交时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.registrationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.registrationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
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
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
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
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane v-for="item in auditTabOptions" :label="item.label" :value="item.value" :key="item.value" :name="item.value"></el-tab-pane>
                </el-tabs>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true' :isfiexd="'right'">
                <template slot="subsectionName" slot-scope="scope">
                    {{scope.data.row.subsectionName || '无'}}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    {{businessTypeMap.get(scope.data.row.merchantType) || '-'}}
                </template>
                <template slot="isAuthentication" slot-scope="scope">
                    <span>{{auditStatusMap.get(scope.data.row.isAuthentication)}}}</span>
                </template>
                <template slot="openingStatus" slot-scope="scope">
                    {{deadlineMap.get(scope.data.row.openingStatus)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onseeTask(scope.data.row)">查看</h-button>
                    <h-button table v-if="scope.data.row.isAuthentication==1" @click="onAudit(scope.data.row)">审核</h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { BUSINESS_TYPE_OPTIONS, BUSINESS_TYPE_MAP, AUDITLIST_STATUS_OPTIONS, AUDITLIST_STATUS_MAP, DEADLINE_OPTIONS, DEADLINE_MAP, AUDIT_TAB_OPTIONS } from './const'
export default {
    name: 'auditFundList',
    data () {
        return {
            businessTypeOptions: BUSINESS_TYPE_OPTIONS,
            businessTypeMap: BUSINESS_TYPE_MAP,
            auditStatusOptions: AUDITLIST_STATUS_OPTIONS,
            auditStatusMap: AUDITLIST_STATUS_MAP,
            deadlineOptions: DEADLINE_OPTIONS,
            deadlineMap: DEADLINE_MAP,
            auditTabOptions: AUDIT_TAB_OPTIONS,
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
                createTime: 'desc',
                shopName: ''
            },
            paginationInfo: {},
            tableLabel: [
                { label: '代采订单号', prop: 'openingStatus' },
                { label: '提交时间', prop: 'registrationTime', formatters: 'dateTimes' },
                { label: '代采订单总金额', prop: 'openingStatus' },
                { label: '代采商品数量', prop: 'openingStatus' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'adminAccount' },
                { label: '商家类型', prop: 'merchantType' },
                { label: '所属分部', prop: 'subsectionName' },
                { label: '店铺名称', prop: 'shopName' },
                { label: '审核状态', prop: 'isAuthentication' },
                { label: '审核时间', prop: 'authenticationTime', sortable: true }, { label: '额度', prop: 'openingStatus' },
                { label: '回款期限', prop: 'openingStatus' }
            ],
            tableData: [],
            drawer: false,
            copyParams: {},
            // 所属分部
            branchArr: [],
            tabName: 0
        }
    },
    computed: {
        ...mapState({
            // userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantData: 'merchantData',
            branchList: 'branchList'
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
        // this.onGetbranch()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        onQuery () {
            this.queryParams.pageNumber = 1
            // this.findOrders(this.queryParams)
        },
        onReset () {
            this.queryParams = { ...this.copyParams }
            // this.findOrders()
        },

        onSave () { },
        onTab (value) {
            this.queryParams.pageNumber = 1
            // this.orderStatusOptions.map(item => {
            //     if (value.name == item.value) {
            //         this.queryParams.status = item.value
            //     }
            // })
            // this.findFreightOrders(this.queryParams)
        },
        ...mapActions({
            // findMerchantList: 'findMerchantList',
            // findBranch: 'findBranch'
        }),
        onRest () {
            this.queryParams = { ...this.copyParams }
            // this.onFindMlist(1)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            // this.onFindMlist()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            // this.onFindMlist()
        },
        async onFindMlist (val) {
            // if (val) this.queryParams.pageNumber = val
            // await this.findMerchantList(this.queryParams)
            // this.tableData = this.merchantData.records
            // this.paginationInfo = {
            //     total: this.merchantData.total,
            //     pageNumber: this.merchantData.current,
            //     pageSize: this.merchantData.size
            // }
        },
        async onGetbranch () {
            // await this.findBranch()
            // this.branchArr = this.branchList
        },
        onseeTask (val) {
            this.$router.push({ path: '/fundAudit/fundInfo', query: { id: val, audit: false, pageType: auditFundList } })
        },
        onAudit (val) {
            this.$router.push({ path: '/fundAudit/fundInfo', query: { id: val, audit: true, pageType: auditFundList } })
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
</style>

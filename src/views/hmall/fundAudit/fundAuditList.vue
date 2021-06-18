<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">管理员账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantAccount" placeholder="请输入管理员账号" maxlength="50"></el-input>
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
                        <el-date-picker v-model="queryParams.registrationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.registrationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
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
                    <div class="query-col__lable">期限：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.openingStatus">
                            <el-option v-for="item in deadlineOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
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
                <template slot="isAuthentication" slot-scope="scope">
                    <span>{{auditStatusMap.get(scope.data.row.isAuthentication)}}}</span>
                </template>
                <template slot="openingStatus" slot-scope="scope">
                    {{deadlineMap.get(scope.data.row.openingStatus)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button v-if="scope.data.row.isAuthentication==1" table @click="onFindInfo(scope.data.row.companyCode,'merchant')">审核</h-button>
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
                        {{bossDetail.companyName?bossDetail.companyName:'-'}}
                    </el-form-item>
                    <el-form-item label="所属分部：" :label-width="formLabelWidth">
                        {{bossDetail.subsectionCode||'-'}}
                    </el-form-item>
                    <el-form-item label="店铺名称：" :label-width="formLabelWidth">
                        {{bossDetail.shopName||'-'}}
                    </el-form-item>
                    <el-form-item label="额度：" :label-width="formLabelWidth">
                        <el-input v-model="bossDetail.shopName" maxLength="60" prop='' placeholder="请输入额度"></el-input>
                        <span class="ml20">0-100000000的整数</span>
                    </el-form-item>
                    <el-form-item label="比例：" :label-width="formLabelWidth">
                        <el-input v-model="bossDetail.shopName" maxLength="60" prop='' placeholder="请输入比例"></el-input>
                        <span class="ml20">%</span>
                        <span class="ml20">0-100的整数</span>
                    </el-form-item>
                    <el-form-item label="额度有效时间：" :label-width="formLabelWidth">
                        <el-date-picker v-model="queryParams.registrationStartTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="额度有效时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="审核：" prop="type" :label-width="formLabelWidth">
                        <el-radio-group v-model="bossDetail.merchantType">
                            <el-radio :label="1">通过</el-radio>
                            <el-radio :label="2">不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="原因：" :label-width="formLabelWidth">
                        <el-input v-model="bossDetail.shopName" maxLength="60" prop='' placeholder="请输入原因"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="drawer-footer">
                <div class="drawer-footer-btn flr">
                    <h-button type='primary' @click="onSave">确定</h-button>
                    <h-button @click="brandDrawer = false">取消</h-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { BUSINESS_TYPE_OPTIONS, BUSINESS_TYPE_MAP, AUDIT_STATUS_OPTIONS, AUDIT_STATUS_MAP, DEADLINE_OPTIONS, DEADLINE_MAP } from './const'
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
                { label: '企业名称', prop: 'companyName', width: '180' },
                { label: '管理员账号', prop: 'adminAccount', width: '120px' },
                { label: '所属分部', prop: 'subsectionName' },
                { label: '店铺名称', prop: 'shopName', width: '180px' },
                { label: '商家类型', prop: 'merchantType' },
                { label: '申请时间', prop: 'registrationTime', formatters: 'dateTimes', width: '150px' },
                { label: '额度', prop: 'openingStatus' },
                { label: '比例', prop: 'openingStatus' },
                { label: '期限', prop: 'openingStatus' },
                { label: '额度状态', prop: 'openingStatus' },
                { label: '额度有效期', prop: 'registrationTime', formatters: 'dateTimes', width: '150px' },
                { label: '审核状态', prop: 'isAuthentication' },
                { label: '审核时间', prop: 'authenticationTime', sortable: true, width: '150px' }
            ],
            tableData: [],
            copyParams: {},
            // 所属分部
            branchArr: [],
            companyCode: '',
            bossDetail: {},
            brandDrawer: false,
            formLabelWidth: '140px',
            rules: {}
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
        handleClose () {
            // if (JSON.stringify(this.bossDetail) != JSON.stringify(this.copyDetail)) {
            //     this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
            //         confirmButtonText: '确认取消',
            //         cancelButtonText: '返回',
            //         type: 'warning'
            //     }).then(async () => {
            //         this.$emit('backEvent')
            //     })
            // } else {
            //     // this.activeName = 'first'
            //     this.$emit('backEvent')
            // }
        },
        onSave () { },
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
        onFindInfo (val, type) {
            this.companyCode = val
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

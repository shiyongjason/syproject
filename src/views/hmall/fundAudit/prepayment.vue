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
                    <div class="query-col__lable">平台确认状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.isAuthentication">
                            <el-option v-for="item in platformStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">打款账户名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.shopName" placeholder="请输入打款账户名称" maxlength="60"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">打款银行账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.shopName" placeholder="请输入打款银行账号" maxlength="60"></el-input>
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
                    <div class="query-col__lable">确认时间：</div>
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
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true' :isfiexd="'right'">
                <template slot="merchantType" slot-scope="scope">
                    {{platformStatusMap.get(scope.data.row.merchantType) || '-'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onSure(scope.data.row)">确认</h-button>
                </template>
            </basicTable>
            <el-dialog title="确认" width="500px" :visible.sync="closeOrderDialog" :close-on-click-modal=false>
                <el-radio-group v-model="createform.merchantType" @change="createformChange" class="mt30">
                    <el-radio :label="1">通过</el-radio>
                    <el-radio :label="2">不通过</el-radio>
                </el-radio-group>
                <div class="creatRemark" v-if="createChange == 2">
                    <el-input type="textarea" maxlength="200" :rows="3" placeholder="理由说明" v-model="createform.auditOpinion">
                    </el-input>
                </div>
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
export default {
    name: 'auditFundList',
    data () {
        return {
            platformStatusOptions: PLATFORM_STATUS_OPTIONS,
            platformStatusMap: PLATFORM_STATUS_MAP,
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
                { label: 'mis订单号', prop: 'openingStatus' },
                { label: '提交时间', prop: 'registrationTime', formatters: 'dateTimes' },
                { label: '代采订单总金额', prop: 'openingStatus' },
                { label: '待回尾款', prop: 'openingStatus' },
                { label: '提前还款金额', prop: 'openingStatus' },
                { label: '打款银行名称', prop: 'openingStatus' },
                { label: '打款银行账号', prop: 'shopName' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'adminAccount' },
                { label: '平台确认状态', prop: 'isAuthentication' },
                { label: '确认时间', prop: 'openingStatus' },
                { label: '备注', prop: 'openingStatus' }
            ],
            tableData: [],
            copyParams: {},
            closeOrderDialog: true,
            createform: {
                id: '',
                merchantType: '',
                auditOpinion: ''
            },
            createChange: ''
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
        onSure (val) {
            this.closeOrderDialog = false
        },
        onEdit () {
            this.closeOrderDialog = false
        },
        createformChange (val) {
            this.createChange = val
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

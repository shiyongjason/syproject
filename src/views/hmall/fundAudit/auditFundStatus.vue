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
                    <div class="query-col__lable">出款状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.allocateStatus">
                            <el-option v-for="item in paragraphStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
                        <el-date-picker v-model="queryParams.submitStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.submitEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">资金状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.fundStatus">
                            <el-option v-for="item in fundStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">货物状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.merchantType">
                            <el-option v-for="item in goodsStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true' :isfiexd="'right'">
                <template slot="merchantType" slot-scope="scope">
                    {{paragraphStatusMap.get(scope.data.row.merchantType) || '-'}}
                </template>
                <template slot="isAuthentication" slot-scope="scope">
                    {{fundStatusMap.get(scope.data.row.isAuthentication)}}}
                </template>
                <template slot="openingStatus" slot-scope="scope">
                    {{goodsStatusMap.get(scope.data.row.openingStatus)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onseeTask(scope.data.row)">查看</h-button>
                    <h-button table @click="onParagraph">出款确认</h-button>
                    <h-button table @click="onGodown">货物到仓确认</h-button>
                </template>
            </basicTable>
            <el-dialog title="货物出仓确认" width="500px" :visible.sync="closeOrderDialog" :close-on-click-modal=false>
                <el-form :model="createform" ref="createform" label-width="180px" class="pt80">
                    <el-form-item label="请选择货物到仓情况：">
                        <el-radio-group v-model="createform.merchantType">
                            <el-radio :label="1">全部到仓</el-radio>
                            <el-radio :label="2">部分到仓</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <h-button @click="onCancel">取消</h-button>
                    <h-button type="primary" @click="onEdit">确定</h-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { PARAGRAPH_STATUS_OPTIONS, PARAGRAPH_STATUS_MAP, FUND_STATUS_OPTIONS, FUND_STATUS_MAP, GOODS_STATUS_OPTIONS, GOODS_STATUS_MAP } from './const'
export default {
    name: 'auditFundStatus',
    data () {
        return {
            paragraphStatusOptions: PARAGRAPH_STATUS_OPTIONS,
            paragraphStatusMap: PARAGRAPH_STATUS_MAP,
            fundStatusOptions: FUND_STATUS_OPTIONS,
            fundStatusMap: FUND_STATUS_MAP,
            goodsStatusOptions: GOODS_STATUS_OPTIONS,
            goodsStatusMap: GOODS_STATUS_MAP,
            queryParams: {
                authenticationEndTime: '',
                authenticationStartTime: '',
                companyName: '',
                isAuthentication: '',
                isEnabled: '',
                merchantAccount: '',
                merchantType: '',
                merchantTypes: '',
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
                { label: '代付款金额', prop: 'openingStatus' },
                { label: '首付款', prop: 'openingStatus' },
                { label: '尾款', prop: 'openingStatus' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'adminAccount' },
                { label: '店铺名称', prop: 'shopName' },
                { label: '出款状态', prop: 'isAuthentication' },
                { label: '资金状态', prop: 'openingStatus' },
                { label: '货物状态', prop: 'openingStatus' }
            ],
            copyParams: {},
            closeOrderDialog: false,
            createform: {
                id: '',
                price: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            statusFundList: state => state.hmall.fundAudit.statusFundList
        }),
        tableData () {
            return this.statusFundList.records
        },
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
        this.init()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        init () {
            this.getStatusFundList()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getStatusFundList()
        },
        onReset () {
            this.queryParams = { ...this.copyParams }
            this.getStatusFundList()
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
            findStatusFund: 'fundAudit/findStatusFund'
        }),
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getStatusFundList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getStatusFundList()
        },
        onseeTask (val) {
            this.$router.push({ path: '/fundAudit/statusFundInfo', query: { id: val.id, pageType: auditFundStatus } })
        },
        onParagraph () {
            this.$confirm(`是否确认出款`, '出款确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                // await cashWithdrawal(this.reqWithdraw)
                // this.withdrawalSuccess()
            })
        },
        async getStatusFundList () {
            await this.findStatusFund(this.queryParams)
        },
        onGodown () {
            this.closeOrderDialog = true
        },
        onCancel () {
            this.closeOrderDialog = false
        },
        onEdit () {
            this.closeOrderDialog = false
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

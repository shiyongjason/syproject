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
                        <el-select v-model="queryParams.goodsStatus">
                            <el-option v-for="item in goodsStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true' :isfiexd="'right'">
                <template slot="allocateStatus" slot-scope="scope">
                    {{paragraphStatusMap.get(scope.data.row.allocateStatus) || '-'}}
                </template>
                <template slot="fundStatus" slot-scope="scope">
                    {{fundStatusMap.get(scope.data.row.fundStatus)}}
                </template>
                <template slot="goodsStatus" slot-scope="scope">
                    {{goodsStatusMap.get(scope.data.row.goodsStatus)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onseeTask(scope.data.row ,'auditFundStatus')">查看</h-button>
                    <h-button table v-if="scope.data.row.allocateStatus == 10" @click="onParagraph(scope.data.row)">出款确认</h-button>
                    <h-button table v-if="scope.data.row.allocateStatus == 20 &&scope.data.row.goodsStatus != 40" @click="onGodown(scope.data.row)">货物到仓确认</h-button>
                </template>
            </basicTable>
            <el-dialog title="货物出仓确认" width="500px" :visible.sync="closeOrderDialog" :close-on-click-modal=false @close='closeDialog'>
                <el-form :model="form" ref="form" :rules='rules' label-width="180px" class="pt80">
                    <el-form-item label="请选择货物到仓情况：" prop="goodsStatus">
                        <el-radio-group v-model="form.goodsStatus">
                            <el-radio :label="40">全部到仓</el-radio>
                            <el-radio :label="30">部分到仓</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <h-button @click="closeOrderDialog = false">取消</h-button>
                    <h-button type="primary" @click="onSure">确定</h-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { PARAGRAPH_STATUS_OPTIONS, PARAGRAPH_STATUS_MAP, FUND_STATUS_OPTIONS, FUND_STATUS_MAP, GOODS_STATUS_OPTIONS, GOODS_STATUS_MAP } from './const'
import { allocateFund, warehouseFund } from './api/index'
import { clearCache, newCache } from '@/utils/index'
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
                agentOrderNo: '',
                allocateStatus: '',
                companyName: '',
                username: '',
                submitStartTime: '',
                submitEndTime: '',
                fundStatus: '',
                goodsStatus: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: 'mis订单号', prop: 'misOrderNo' },
                { label: '提交时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '代采订单总金额', prop: 'totalAmount' },
                { label: '预付款', prop: 'prepayAmount' },
                { label: '代付款金额', prop: 'retainageAmount' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '店铺名称', prop: 'shopName' },
                { label: '出款状态', prop: 'allocateStatus' },
                { label: '资金状态', prop: 'fundStatus' },
                { label: '货物状态', prop: 'goodsStatus' }
            ],
            copyParams: {},
            closeOrderDialog: false,
            form: {
                id: '',
                goodsStatus: '',
                updateBy: ''
            },
            rules: {
                goodsStatus: [
                    { required: true, message: '请选择货物到仓情况', trigger: 'change' }
                ]
            },
            statusId: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            statusFundList: state => state.hmall.fundAudit.statusFundList
        }),
        paginationInfo () {
            return {
                total: this.statusFundList.total,
                pageNumber: this.statusFundList.current,
                pageSize: this.statusFundList.size
            }
        },
        tableData () {
            return this.statusFundList.records
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
        onseeTask (val, page) {
            this.$router.push({ path: '/b2b/fundAudit/statusFundInfo', query: { id: val.id, pageType: page } })
        },
        onParagraph (val) {
            this.$confirm(`是否确认出款`, '出款确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await allocateFund({
                    id: val.id,
                    updateBy: this.userInfo.employeeName
                })
                this.getStatusFundList()
            })
        },
        async getStatusFundList () {
            await this.findStatusFund(this.queryParams)
        },
        onGodown (val) {
            this.statusId = val.id
            this.closeOrderDialog = true
        },
        onSure () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        const form = {
                            goodsStatus: this.form.goodsStatus,
                            id: this.statusId,
                            updateBy: this.userInfo.employeeName
                        }
                        await warehouseFund(form)
                        this.closeOrderDialog = false
                        this.getStatusFundList()
                    } catch (error) {
                        this.closeOrderDialog = false
                        this.getStatusFundList()
                    }
                }
            })
        },
        closeDialog () {
            this.form.goodsStatus = ''
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        newCache('auditFundStatus')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (!(to.name == 'fundInfo')) {
            clearCache('auditFundStatus')
        }
        next()
    },
    activated () {
        this.getStatusFundList()
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

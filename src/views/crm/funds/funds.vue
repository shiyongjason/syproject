<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">首付款流水号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">支付单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userAccount" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true
                                   @change="onChooseDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr"
                                       :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">项目：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true
                                   @change="onChooseDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr"
                                       :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">应支付日期：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">支付成功时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="onQuery">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="首付款" name="first">
                    <el-tag size="medium" class="eltagtop">已筛选 {{ paginationInfo.total }} 项,采购单总金额：<b>88,888,888</b>元;
                    </el-tag>
                    <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo"
                                @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange"
                                @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true"
                                :actionMinWidth=200 :isShowIndex='true'>
                        <template slot="no" slot-scope="scope">
                            <span class="colblue"
                                  @click="jumpPurchaseOrderDetail(scope.data.row.no)"> {{ scope.data.row.no }}</span>
                        </template>
                        <template slot="action" slot-scope="scope">
                            <h-button table @click="onPayEnter">支付确认</h-button>
                            <h-button table @click="seePayEnter">查看凭证</h-button>
                        </template>
                    </basicTable>
                </el-tab-pane>
                <el-tab-pane label="服务费" name="second">
                    <el-tag size="medium" class="eltagtop">已筛选 {{ paginationInfo.total }} 项,采购单总金额：<b>88,888,888</b>元;
                    </el-tag>
                </el-tab-pane>
                <el-tab-pane label="尾款" name="third">
                    <el-tag size="medium" class="eltagtop">已筛选 {{ paginationInfo.total }} 项,采购单总金额：<b>88,888,888</b>元;
                    </el-tag>
                </el-tab-pane>
            </el-tabs>
            <FundsDialog :is-open="fundsDialogVisible" :open-status="fundsDialogStatus"
                         @onClose="fundsDialogVisible = false"
            ></FundsDialog>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FundsDialog from './components/fundsDialog'

export default {
    name: 'funds',
    components: {
        FundsDialog
    },
    data () {
        return {
            queryParams: {},
            activeName: 'first',
            tableLabel: [
                { label: '首付款流水号', prop: 'no', width: '150' },
                { label: '所属分部', prop: 'no', width: '150' },
                { label: '经销商', prop: 'no', width: '150' },
                { label: '所属项目', prop: 'no', width: '150' },
                { label: '支付单编号', prop: 'no', width: '150' },
                { label: '金额', prop: 'no', width: '150' },
                { label: '状态', prop: 'no', width: '150' },
                { label: '应支付日期', prop: 'no', width: '150', formatters: 'dateTimes', sortable: 'custom' },
                { label: '支付成功时间', prop: 'no', width: '150', formatters: 'dateTimes', sortable: 'custom' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes', sortable: 'updateTime' }
            ],
            tableData: [
                {
                    no: 1
                }
            ],
            branchArr: [],
            paginationInfo: {},
            fundsDialogVisible: false,
            fundsDialogStatus: 1
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.authenticationEndTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.authenticationStartTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onChooseDep () {
        },
        handleClick () {
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onQuery () {
            this.findFundsList()
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
        },
        onSortChange (val) {
            if (val.prop == 'createTime') {
                this.queryParams.customerTypeOrder = val.order == 'ascending' ? 'asc' : 'desc'
                this.queryParams.authenticationTimeOrder = ''
                this.queryParams.createTimeOrder = ''
            } else if (val.prop == 'authenticationTime') {
                this.queryParams.authenticationTimeOrder = val.order == 'ascending' ? 'asc' : 'desc'
                this.queryParams.customerTypeOrder = ''
                this.queryParams.createTimeOrder = ''
            }
            this.onQuery()
        },
        onPayEnter () {
            this.fundsDialogVisible = true
        },
        seePayEnter () {
            this.fundsDialogVisible = true
        },
        ...mapActions({
            findFundsList: 'crmFunds/findPurchaseList'
        })
    }
}
</script>

<style scoped>
.eltagtop {
    margin-bottom: 10px;
}
</style>

<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">支付单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.deptName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.dealerCompanyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">采购单名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.purchaseOrderName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">采购单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.purchaseOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startApplyDate" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endApplyDate" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择" :clearable=true
                                   @change="onChooseDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in []"
                                       :key="item.pkDeptDoc"></el-option>
                        </el-select>
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
            <el-tag size="medium" class="eltagtop">已筛选 {{ paginationInfo.total }} 项,采购单总金额：<b>88,888,888</b>元;</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo"
                        @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange"
                        @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120
                        :isShowIndex='true'>
                <template slot="no" slot-scope="scope">
                    <span class="colblue"> {{ scope.data.row.no }}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="openDrawer">查看详情</h-button>
                </template>
            </basicTable>
        </div>
        <PaymentOrderDrawer :drawer=drawer @backEvent='paymentOrderBackEvent' ref="paymentOrderDrawer"></PaymentOrderDrawer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PaymentOrderDrawer from '@/views/crm/paymentOrder/components/paymentOrderDrawer'

export default {
    name: 'payOrder',
    components: { PaymentOrderDrawer },
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1
            },
            tableData: [{ no: 1 }],
            tableLabel: [
                { label: '支付单编号', prop: 'paymentOrderNo', width: '150' },
                { label: '所属分部', prop: 'deptName', width: '150' },
                { label: '经销商', prop: 'dealerCompanyName', width: '150' },
                { label: '采购单名称', prop: 'purchaseOrderName', width: '150' },
                { label: '采购单编号', prop: 'purchaseOrderNo', width: '150' },
                { label: '金额', prop: 'applyAmount', width: '150' },
                { label: '状态', prop: 'status', width: '150' },
                { label: '申请时间', prop: 'applyDate', width: '150', formatters: 'dateTimes', sortable: 'applyDate' },
                {
                    label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes', sortable: 'updateTime'
                }
            ],
            paginationInfo: {},
            drawer: false
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
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onQuery () {

        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
        },
        onChooseDep () {
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
        paymentOrderBackEvent () {
            this.drawer = false
        },
        openDrawer () {
            this.drawer = true
        }
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
    }
}
</script>

<style scoped>
.eltagtop {
    margin-bottom: 10px;
}
</style>

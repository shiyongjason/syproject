<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>订单查询</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">订单号：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.agentCode" maxlength="50" placeholder="输入订单号" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">联系人姓名：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.contactUser" maxlength="50" placeholder="联系人姓名" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.contactNumber" maxlength="50" placeholder="输入手机号" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">支付时间：</div>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="queryParams.payStartDate" :picker-options="pickerOptionsStart" clearable :editable="false">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="queryParams.payEndDate" :picker-options="pickerOptionsEnd" clearable :editable="false">
                </el-date-picker>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">订单状态：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.status" style="width: 100%">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已支付" value="10"></el-option>
                        <el-option label="未支付" value="0"></el-option>
                        <el-option label="已取消" value="15"></el-option>
                        <el-option label="已退款" value="30"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onAdd">新增代理订单</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantOrderList" :pagination="cloudMerchantOrderListPagination" @onCurrentChange='onCurrentChange' is-action="true" isShowIndex @onSizeChange='onSizeChange'>
                <template slot="level" slot-scope="scope">
                    {{ scope.data.row.level === 1 ? '一级': (scope.data.row.level === 2 ? '二级' : '一级(独家)') }}
                </template>
                <template slot="contactUser" slot-scope="scope">
                    <p>{{scope.data.row.contactUser}}</p>
                </template>
                <template slot="payAmount" slot-scope="scope">
                    {{ scope.data.row.payAmount ? scope.data.row.payAmount + '元' : '-' }}
                </template>
                <template slot="status" slot-scope="scope">
                    {{payStatus(scope.data.row.status)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="agentDetail(scope.data.row)">查看代理信息</el-button>
                    <el-button class="orangeBtn" v-if="scope.data.row.source===3" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" v-if="scope.data.row.source===3" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="查看代理信息" :modal-append-to-body=false :append-to-body=false :visible.sync="agentDetailVisible" width="50%">
            <p style="line-height: 25px">代理等级 {{this.agentDetailLevel}} <br></p>
            <basicTable :tableLabel="tableLabelDetail" :tableData="cloudMerchantOrderDetail">

            </basicTable>
        </el-dialog>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'
import { deleteCloudMerchantAgentOrderDetail } from '../api'

export default {
    name: 'merchantOrder',
    data () {
        return {
            queryParams: {
                agentCode: '',
                contactUser: '',
                contactNumber: '',
                status: '',
                payStartDate: '',
                payEndDate: '',
                pageNumber: 1,
                pageSize: 10
            },
            agentDetailVisible: false,
            agentDetailLevel: '',
            tableLabel: [
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '支付时间', prop: 'successTime', formatters: 'dateTime' },
                { label: '订单号', prop: 'agentCode' },
                { label: '微信支付订单号', prop: 'wxPayNo' },
                { label: '联系人', prop: 'contactUser' },
                { label: '客户电话', prop: 'contactNumber' },
                { label: '联系地址', prop: 'contactAddress' },
                // { label: '代理级别', prop: 'level' },
                // { label: '代理品类', prop: 'categoryName' },
                { label: '订单金额', prop: 'agentAmount' },
                { label: '提货预付款', prop: 'prepayAmount', formatters: 'price' },
                { label: '订单状态', prop: 'status' }],
            tableLabelDetail: [
                { label: '代理品类', prop: 'categoryName' },
                { label: '代理型号', prop: 'specificationName' }
            ]
        }
    },
    mounted () {
        this.queryList(this.queryParams)
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantOrderList: 'cloudMerchantOrderList',
            cloudMerchantOrderDetail: 'cloudMerchantOrderDetail',
            cloudMerchantOrderListPagination: 'cloudMerchantOrderListPagination'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.payEndDate
                    if (beginDateVal) {
                        return (time.getTime() > new Date(beginDateVal).getTime()) || (time.getTime() > Date.now())
                    }
                    return time.getTime() > Date.now()
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.payStartDate
                    if (beginDateVal) {
                        return (
                            (time.getTime() < new Date(beginDateVal).getTime()) || (time.getTime() > Date.now())
                        )
                    }
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    methods: {
        ...mapActions({
            findCloudMerchantOrderList: 'findCloudMerchantOrderList',
            findCloudMerchantOrderDetail: 'findCloudMerchantOrderDetail'
        }),
        onSearch: function () {
            this.queryParams.pageNumber = 1
            this.queryList(this.queryParams)
        },
        onAdd: function () {
            this.$router.push({ path: '/comfortCloudMerchant/merchantManage/merchantAgencyOrderEdit' })
        },
        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList(this.queryParams)
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList(this.queryParams)
        },
        queryList: function (params) {
            this.findCloudMerchantOrderList(params)
        },
        agentDetail: function (val) {
            this.findCloudMerchantOrderDetail({ agentCode: val.agentCode })
            this.agentDetailLevel = val.level === 1 ? '一级' : val.level === 2 ? '二级' : val.level === 3 ? '独家代理' : ''
            this.agentDetailVisible = true
        },
        onEdit: function (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantManage/merchantAgencyOrderEdit', query: val })
        },
        async onDelete (value) {
            this.$confirm(`删除该订单后，该经销商的代理信息也将被删除，请确认是否继续删除？`, '删除代理订单', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消'
            }).then(async () => {
                await deleteCloudMerchantAgentOrderDetail({ agentCode: value.agentCode, operator: this.userInfo.employeeName })
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                })
                this.onSearch()
            })
        },
        payStatus: function (status) {
            if (status === 0) {
                // 已支付
                return '未支付'
            } else if (status === 10) {
                // 未支付
                return '已支付'
            } else if (status === 15) {
                // 已取消
                return '已取消'
            } else if (status === 30) {
                // 已退款
                return '已退款'
            }
        }
    }
}
</script>

<style scoped>
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}

.address {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

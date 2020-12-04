<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">采购单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">采购单名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.poName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="请选择" :clearable=true
                                   @change="onSelectDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in []"
                                       :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">项目：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">项目编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">创建时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.createTimeOrder" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.updateTimeOrder" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.statusList" placeholder="请选择" :clearable=true
                                   @change="onSelectStatus">
                            <el-option :label="1" :value="1" v-for="item in []" :key="1"></el-option>
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
            <el-tag size="medium" class="eltagtop">已筛选 {{ purchaseOrderData.total }} 项,采购单总金额：<b>88,888,888</b>元;
            </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo"
                        @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange"
                        @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=300
                        :isShowIndex='true'>
                <template slot="no" slot-scope="scope">
                    <span class="colblue"
                          @click="jumpPurchaseOrderDetail(scope.data.row.no)"> {{ scope.data.row.no }}</span>
                </template>
                <template slot="userName" slot-scope="scope">
                    <span class="colblue"
                          @click="onLinkship(scope.data.row.userName)"> {{ scope.data.row.userName || '-' }}</span>
                </template>
                <template slot="areaname" slot-scope="scope">
                    {{ scope.data.row.provinceName + scope.data.row.cityName + scope.data.row.countryName }}
                </template>
                <template slot="companyType" slot-scope="scope">
                    {{ scope.data.row.companyType == 1 ? '体系内' : scope.data.row.companyType == 2 ? '体系外' : '-' }}
                </template>
                <template slot="customerType" slot-scope="scope">
                    {{ scope.data.row.customerType == 1 ? '黑名单' : scope.data.row.customerType == 2 ? '白名单' : scope.data.row.customerType == 3 ? '待审核' : '-' }}
                </template>
                <template slot="isAuthentication" slot-scope="scope">
                    <span
                        :class="scope.data.row.isAuthentication==1?'colgry':'colred'"> {{ scope.data.row.isAuthentication == 1 ? '已认证' : '未认证' }}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="openDialog(dialogStatus.enter.status)">确认采购单</h-button>
                    <h-button @click="openDialog(dialogStatus.changeEnter.status)" table>确认变更</h-button>
                    <h-button table @click="openDetail">查看详情</h-button>
                </template>
            </basicTable>
        </div>
        <purchaseOrderDrawer :drawer=drawer @backEvent='drawerBackEvent' ref="drawerDetail"></purchaseOrderDrawer>
        <purchaseOrderChangeDialog :isOpen=isOpen :openStatus="openStatus" @backEvent='dialogBackEvent' ref="dialog"></purchaseOrderChangeDialog>
    </div>
</template>

<script>
import purchaseOrderDrawer from '@/views/crm/purchaseOrder/components/purchaseOrderDrawer'
import purchaseOrderChangeDialog from '@/views/crm/purchaseOrder/components/purchaseOrderChangeDialog'
import { mapActions, mapGetters, mapState } from 'vuex'
import PurchaseOrderDialogStatus from './dialogStatus'

export default {
    name: 'purchaseOrder',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [
                {
                    purchaseOrderNo: 'purchaseOrderNo'
                }
            ],
            paginationInfo: {},
            tableLabel: [
                { label: '采购单编号', prop: 'purchaseOrderNo', width: '150' },
                { label: '采购单名称', prop: 'poName', width: '120' },
                { label: '所属分部', prop: 'subsectionName', width: '120' },
                { label: '经销商', prop: 'companyName', width: '150' },
                { label: '所属项目', prop: 'projectName', width: '150' },
                { label: '项目编号', prop: 'projectNo', width: '150' },
                { label: '采购购单金额', prop: 'poAmount', width: '100' },
                { label: '状态', prop: 'status', width: '120' },
                { label: '创建时间', prop: 'createTime', width: '150', formatters: 'dateTimes', sortable: 'createTime' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes', sortable: 'updateTime' }
            ],
            purchaseOrderData: [],
            drawer: false,
            dialogStatus: PurchaseOrderDialogStatus,
            isOpen: false,
            openStatus: PurchaseOrderDialogStatus.enter.status
        }
    },
    components: {
        purchaseOrderDrawer,
        purchaseOrderChangeDialog
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
    async mounted () {
        this.queryParamsTemp = { ...this.queryParams }
    },
    methods: {
        onSelectDep () {
        },
        onSelectStatus () {
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        async onQuery (val) {
            if (val) this.queryParams.pageNumber = val
            const { ...params } = this.queryParams
            await this.findPurchaseList(params)
            this.tableData = this.businessData.records
            this.paginationInfo = {
                pageNumber: this.businessData.current,
                pageSize: this.businessData.size,
                total: this.businessData.total
            }
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
        jumpPurchaseOrderDetail (id) {
            this.$router.push({ path: '/goodwork/purchaseOrderDetail', query: { orderNo: id } })
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
        },
        openDetail () {
            this.drawer = true
        },
        drawerBackEvent () {
            this.drawer = false
        },
        openDialog (status) {
            this.isOpen = true
            this.openStatus = status
        },
        dialogBackEvent () {
            this.isOpen = false
        },
        ...mapActions({
            findPurchaseList: 'crmPurchaseOrder/findPurchaseList'
        })
    }
}
</script>

<style scoped>
.eltagtop {
    margin-bottom: 10px;
}
</style>

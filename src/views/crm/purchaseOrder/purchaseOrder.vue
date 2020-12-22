<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">采购单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.purchaseOrderNo" placeholder="请输入" maxlength="50"></el-input>
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
                        <el-select v-model="queryParams.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList"
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
                        <el-date-picker v-model="queryParams.startTime" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择" multiple :clearable=true>
                            <el-option :label="item.value" :value="item.key"
                                       v-for="item in PurchaseOrderDict.status.list" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="findPurchaseList({...queryParamsUseQuery, pageNumber: 1})">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{ purchaseOrderPagination.total }}
                项,采购单总金额：<b>{{ purchaseOrderPagination.amount | fundMoney }}</b>元;
            </el-tag>
            <basicTable :tableData="purchaseOrderList" :tableLabel="tableLabel" :pagination="purchaseOrderPagination"
                        @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange"
                        @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=200
                        :isShowIndex='true'>
                <template slot="projectNo" slot-scope="scope">
                    <span class="colblue" @click="goProjectDetail(scope.data.row)"> {{ scope.data.row.projectNo }}</span>
                </template>
                <template slot="poAmount" slot-scope="scope">
                    <span> {{ scope.data.row.poAmount | fundMoney }}</span>
                </template>
                <template slot="status" slot-scope="scope">
                    <span> {{ scope.data.row.status| attributeComputed(PurchaseOrderDict.status.list)}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="openDialog(dialogStatus.enter.status, scope.data.row)"
                              v-if="PurchaseOrderDict.status.list[1].key === scope.data.row.status &&
                              hosAuthCheck(Auths.CRM_PURCHASE_ORDER_CONFIRM)">
                        确认采购单
                    </h-button>
                    <h-button @click="openDialog(dialogStatus.changeEnter.status, scope.data.row)"
                              v-if="PurchaseOrderDict.status.list[2].key === scope.data.row.status &&
                              hosAuthCheck(Auths.CRM_PURCHASE_ORDER_CONFIRM_CHANGE)" table>确认变更
                    </h-button>
                    <h-button table @click="openDetail(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_PURCHASE_ORDER_SEE_DETAIL)">查看详情
                    </h-button>
                </template>
            </basicTable>
        </div>
        <purchaseOrderDrawer :drawer=drawer @backEvent='drawerBackEvent'
                             @openDialog="openDialog" ref="drawerDetail"
                             :row="purchaseOrderRow"></purchaseOrderDrawer>
        <purchaseOrderDialog :isOpen=isOpen :openStatus="openStatus"
                             @backEvent='dialogBackEvent' :row="purchaseOrderRow"
                             ref="dialog"></purchaseOrderDialog>
    </div>
</template>

<script>
import purchaseOrderDrawer from '@/views/crm/purchaseOrder/components/purchaseOrderDrawer'
import purchaseOrderDialog from '@/views/crm/purchaseOrder/components/purchaseOrderDialog'
import { mapActions, mapGetters, mapState } from 'vuex'
import PurchaseOrderDialogStatus from './dialogStatus'
import PurchaseOrderDict from './purchaseOrderDict'
import * as Auths from '@/utils/auth_const'

export default {
    name: 'purchaseOrder',
    data () {
        return {
            Auths,
            queryParams: {
                purchaseOrderNo: '',
                poName: '',
                subsectionCode: '',
                companyName: '',
                projectName: '',
                projectNo: '',
                status: '',
                pageNumber: 1,
                pageSize: 10,
                'sort.property': null,
                'sort.direction': null
            },
            paginationInfo: {},
            tableLabel: [
                { label: '采购单编号', prop: 'purchaseOrderNo', width: '150' },
                { label: '采购单名称', prop: 'poName', width: '200' },
                { label: '所属分部', prop: 'subsectionName', width: '120' },
                { label: '经销商', prop: 'companyName', width: '150' },
                { label: '所属项目', prop: 'projectName', width: '150' },
                { label: '项目编号', prop: 'projectNo', width: '150' },
                { label: '采购单金额', prop: 'poAmount', width: '100' },
                { label: '状态', prop: 'status', width: '120' },
                { label: '创建时间', prop: 'createTime', width: '150', formatters: 'dateTimes', sortable: 'createTimeOrder' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes', sortable: 'updateTimeOrder' }
            ],
            purchaseOrderData: [],
            drawer: false,
            dialogStatus: PurchaseOrderDialogStatus,
            PurchaseOrderDict,
            isOpen: false,
            openStatus: PurchaseOrderDialogStatus.enter.status,
            purchaseOrderRow: {}
        }
    },
    components: {
        purchaseOrderDrawer,
        purchaseOrderDialog
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            purchaseOrderList: 'crmPurchaseOrder/purchaseOrderList',
            crmdepList: 'crmmanage/crmdepList',
            purchaseOrderPagination: 'crmPurchaseOrder/purchaseOrderPagination'
        }),
        queryParamsUseQuery () {
            return {
                ...this.queryParams,
                status: this.queryParams.status.join(','),
                authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '',
                jobNumber: this.userInfo.jobNumber
            }
        }
    },
    methods: {
        goProjectDetail (row) {
            this.$router.push({
                path: '/goodwork/projectlist',
                query: {
                    detail: true,
                    projectNo: row.projectNo
                }
            })
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findPurchaseList(this.queryParamsUseQuery)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findPurchaseList(this.queryParamsUseQuery)
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams['sort.property'] = val.prop + ''
                this.queryParams['sort.direction'] = val.order === 'ascending' ? 'ASC' : 'DESC'
            } else {
                this.queryParams['sort.property'] = null
                this.queryParams['sort.direction'] = null
            }

            this.findPurchaseList(this.queryParamsUseQuery)
        },
        jumpPurchaseOrderDetail (id) {
            this.$router.push({ path: '/goodwork/purchaseOrderDetail', query: { orderNo: id } })
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
            this.findPurchaseList(this.queryParamsUseQuery)
        },
        openDetail (row) {
            this.purchaseOrderRow = row
            this.drawer = true
        },
        drawerBackEvent () {
            this.drawer = false
            this.findPurchaseList(this.queryParamsUseQuery)
        },
        openDialog (status, row) {
            this.isOpen = true
            this.openStatus = status
            this.purchaseOrderRow = row
        },
        dialogBackEvent () {
            this.isOpen = false
            this.findPurchaseList(this.queryParamsUseQuery)
        },
        ...mapActions({
            findPurchaseList: 'crmPurchaseOrder/findPurchaseList',
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        })
    },
    async mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        this.findPurchaseList(this.queryParamsUseQuery)
        this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: JSON.parse(sessionStorage.getItem('authCode'))
        })
    }
}
</script>

<style scoped>
.eltagtop {
    margin-bottom: 10px;
}
.colblue {
    color: #50b7f7;
    cursor: pointer;
}
</style>

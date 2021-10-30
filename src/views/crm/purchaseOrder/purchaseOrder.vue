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
                            <el-option label="全部" value=""></el-option>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
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
                        <!-- <el-date-picker v-model="queryParams.startTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker> -->
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择" multiple :clearable=true>
                            <el-option :label="item.value" :value="item.key" v-for="item in PurchaseOrderDict.status.list" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">共管户信息：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.coManager" placeholder="请选择" :clearable=true>
                            <el-option label="全部" value=""></el-option>
                            <el-option :label="item.value" :value="item.key" v-for="item in PurchaseOrderDict.coManager.list" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">提交人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.submitBy" placeholder="请输入" maxlength="50"></el-input>
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
                项， 采购单总金额：<b>{{ purchaseOrderPagination.amount | moneyFormat }}</b>元
            </el-tag>
            <basicTable :tableData="purchaseOrderList" :tableLabel="tableLabel" :pagination="purchaseOrderPagination" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=350 :isShowIndex='true'>
                <template slot="projectNo" slot-scope="scope">
                    <span v-if="hosAuthCheck(Auths.PURCHASEORDER_LINK_PROJECTLIST)" class="link-cell" @click="goProjectDetail(scope.data.row)"> {{ scope.data.row.projectNo }}</span>
                    <span v-else>{{ scope.data.row.projectNo }}</span>
                </template>
                <template slot="poAmount" slot-scope="scope">
                    <span> {{ scope.data.row.poAmount | moneyFormat }}</span>
                </template>
                <template slot="coManager" slot-scope="scope">
                    <span>{{ scope.data.row.coManager| attributeComputed(PurchaseOrderDict.coManager.list)}}</span>
                </template>
                <template slot="status" slot-scope="scope">
                    <span> {{ scope.data.row.status| attributeComputed(PurchaseOrderDict.status.list)}}</span>
                </template>
                <template slot="submitBy" slot-scope="scope">
                    <div v-if="scope.data.row.submitBy">
                        <p>{{ scope.data.row.submitBy }}</p>
                        <p>({{ scope.data.row.submitPhone }})</p>
                    </div>
                    <div v-else>-</div>
                </template>
                <template slot="action" slot-scope="scope">
                    <!-- <h-button table @click="openDialog(dialogStatus.enter.status, scope.data.row)" v-if="PurchaseOrderDict.status.list[1].key === scope.data.row.status &&
                              hosAuthCheck(Auths.CRM_PURCHASE_ORDER_CONFIRM)">
                        确认采购单
                    </h-button>
                    <h-button @click="openDialog(dialogStatus.changeEnter.status, scope.data.row)" v-if="PurchaseOrderDict.status.list[2].key === scope.data.row.status &&
                              hosAuthCheck(Auths.CRM_PURCHASE_ORDER_CONFIRM_CHANGE)" table>确认变更
                    </h-button> -->
                    <h-button table @click="openDetail(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_PURCHASE_ORDER_SEE_DETAIL)">查看详情
                    </h-button>
                    <h-button table @click="onApproveRecords(scope.data.row)">审批记录
                    </h-button>
<!--                    1-待提交;2-采购单待确认;3-变更待确认;4-采购中;5-采购单完成;6-采购单关闭  -->
<!--                    当共管户信息为已确认或采购单状态为“采购单关闭”时，不展示此按钮 权限按钮-->
                    <h-button table @click="openCoManagerDialog(scope.data.row)" v-if="(!scope.data.row.coManager && scope.data.row.status != PurchaseOrderDict.status.list[5].key) && hosAuthCheck(Auths.CRM_PURCHASE_CO_MANAGER)">上传共管户信息
                    </h-button>
                </template>
            </basicTable>
        </div>
        <uploadCoManagerPhotos :isOpen.sync=coManagerIsOpen :id="coManagerId" @backEvent='drawerBackEvent'/>
        <purchaseOrderDrawer :drawer=drawer @backEvent='drawerBackEvent' @openDialog="openDialog" ref="drawerDetail" :row="purchaseOrderRow"></purchaseOrderDrawer>
        <purchaseOrderDialog :isOpen=isOpen :openStatus="openStatus" @backEvent='dialogBackEvent' @closeDrawer="drawer = false" :dialogParams="purchaseOrderDialogParams" ref="dialog"></purchaseOrderDialog>
        <h-drawer title="审核记录" :visible.sync="drawerPur" direction='rtl' size='500px' :wrapperClosable="false" :beforeClose="handleClose">
            <template #connect>
                <h4 class="purchaseName">采购单钉钉审批流程 <div style="color:#ff7a45">{{purchaseName}}</div>
                </h4>
                <div class="seal_records" v-for="(item,index) in editHistory" :key="index">
                    <div class="seal_records-tit">
                        <div><em>{{item.operator}}</em>
                            <div>{{item.operationName}}{{item.operationContent}}</div>
                        </div>
                        <div class="seal_records-times">{{moment(item.operationTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                    </div>

                    <div class="seal_records-remark" v-if="item.approvalRemark">备注：{{item.approvalRemark}}</div>
                </div>
                <div v-if="editHistory.length==0">暂无审批记录</div>
            </template>
        </h-drawer>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import moment from 'moment'
import purchaseOrderDrawer from '@/views/crm/purchaseOrder/components/purchaseOrderDrawer'
import purchaseOrderDialog from '@/views/crm/purchaseOrder/components/purchaseOrderDialog'
import uploadCoManagerPhotos from '@/views/crm/purchaseOrder/components/uploadCoManagerPhotos'
import PurchaseOrderDialogStatus from './dialogStatus'
import PurchaseOrderDict from './purchaseOrderDict'
import * as Auths from '@/utils/auth_const'
import { getSeals } from './api/index'
import { newCache } from '@/utils/index'
export default {
    name: 'purchaseOrder',
    data () {
        return {
            drawerPur: false,
            Auths,
            moment,
            queryParams: {
                purchaseOrderNo: '',
                poName: '',
                subsectionCode: '',
                companyName: '',
                projectName: '',
                projectNo: '',
                status: '',
                coManager: '',
                pageNumber: 1,
                startTime: '',
                endTime: '',
                submitBy: '',
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
                { label: '采购单金额', prop: 'poAmount', width: '100', align: 'right' },
                { label: '状态', prop: 'status', width: '120' },
                { label: '提交人', prop: 'submitBy', width: '120' },
                { label: '共管户信息', prop: 'coManager', width: '150' },
                { label: '创建时间', prop: 'createTime', width: '150', formatters: 'dateTime', sortable: 'createTimeOrder' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTime', sortable: 'updateTimeOrder' }
            ],
            purchaseOrderData: [],
            drawer: false,
            dialogStatus: PurchaseOrderDialogStatus,
            PurchaseOrderDict,
            isOpen: false,
            openStatus: PurchaseOrderDialogStatus.enter.status,
            purchaseOrderRow: {},
            purchaseOrderDialogParams: {},
            editHistory: [],
            purchaseName: '',
            coManagerIsOpen: false,
            coManagerId: ''
        }
    },
    components: {
        purchaseOrderDrawer,
        purchaseOrderDialog,
        uploadCoManagerPhotos
    },
    computed: {
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.startTime,
                endTime: this.queryParams.endTime
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
        async onApproveRecords (val) {
            this.drawerPur = true
            this.purchaseName = val.poName
            const { data } = await getSeals(val.id)
            console.log(data)
            this.editHistory = data
        },
        onStartChange (val) {
            this.queryParams.startTime = val
        },
        onEndChange (val) {
            this.queryParams.endTime = val
        },
        goProjectDetail (row) {
            let routeUrl = this.$router.resolve({
                path: '/goodwork/projectlist',
                query: {
                    detail: true,
                    projectNo: row.projectNo
                }
            })
            window.open(routeUrl.href, '_blank')
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
        openDialog (status, dialogParams) {
            this.openStatus = status
            this.purchaseOrderDialogParams = dialogParams
            this.isOpen = true
        },
        openCoManagerDialog (row) {
            this.coManagerIsOpen = true
            this.coManagerId = row.id
        },
        dialogBackEvent () {
            this.isOpen = false
            this.findPurchaseList(this.queryParamsUseQuery)
        },
        ...mapActions({
            findPurchaseList: 'crmPurchaseOrder/findPurchaseList',
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        }),
        handleClose () {
            this.drawerPur = false
        }
    },
    async mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        if (this.$route.query.id) {
            this.queryParams.purchaseOrderNo = this.$route.query.id
        }
        this.findPurchaseList(this.queryParamsUseQuery)
        this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: JSON.parse(sessionStorage.getItem('authCode'))
        })
    },
    beforeUpdate () {
        newCache('purchaseOrder')
    }
}
</script>

<style scoped lang='scss'>
.purchaseName {
    margin-bottom: 20px;
}
.eltagtop {
    margin-bottom: 10px;
}
.seal_records {
    margin-bottom: 10px;
    &-tit {
        display: flex;
        justify-content: space-between;
        em {
            font-style: normal;
            color: #2196f3;
        }
    }
    &-remark {
        color: #f00;
    }
}
</style>

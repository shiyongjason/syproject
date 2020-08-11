<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">类型：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">是否注册：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                     <div class="query-cont-col">
                    <div class="query-col-title">注册账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                   <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                            <div class="query-cont-col">
                    <div class="query-col-title">添加人：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">添加时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minSubmitTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxSubmitTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onExport">
                            导出
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop"></el-tag>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" @pagination="searchList"
                actionWidth='300' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template slot="type" slot-scope="scope">
                    {{scope.data.row.type&&typeList[scope.data.row.type-1]['value']}}
                </template>
                <template slot="progress" slot-scope="scope">
                    {{onFiterStates(scope.data.row.status).length>0?onFiterStates(scope.data.row.status)[0].value:'-'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onLookproject(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_GOODWORK_DETAIL)">查看详情</el-button>
                    <el-button type="warning" size="mini" plain @click="onLookrecord(scope.data.row,1)">审批记录</el-button>
                    <el-button v-if="scope.data.row.pushRecord" type="info" size="mini" plain @click="onLookrecord(scope.data.row,2)">打卡记录</el-button>
                </template>
            </hosJoyTable>
        </div>
        <!-- <projectDrawer :drawer=drawer :status=projectstatus @backEvent='restDrawer' ref="drawercom"></projectDrawer> -->
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters, mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import filters from '@/utils/filters.js'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import * as Auths from '@/utils/auth_const'
export default {
    name: 'projectlist',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: ''
            },
            tableLabel: [
                { label: '项目名称', prop: 'projectName', width: '150', showOverflowTooltip: true },
                { label: '项目地址', prop: 'address', width: '150', showOverflowTooltip: true },
                { label: '项目编号', prop: 'projectNo', width: '150', showOverflowTooltip: true },
                { label: '所属分部', prop: 'deptName', width: '150', showOverflowTooltip: true },

                { label: '经销商', prop: 'companyName', width: '180', showOverflowTooltip: true },
                { label: '甲方名称', prop: 'firstPartName', width: '180', showOverflowTooltip: true },
                { label: '项目类别', prop: 'type', width: '120', slot: 'type', showOverflowTooltip: true },
                // { label: '工程项目进度', prop: 'progress', width: '120', slot: 'progress' },
                { label: '工程项目进度', prop: 'progress', width: '120', dicData: [{ value: 1, label: '项目跟踪阶段' }, { value: 2, label: '招投标' }, { value: 3, label: '合同已签订' }, { value: 4, label: '项目已开工' }] },
                { label: '项目合同总额', prop: 'contractAmount', width: '150', displayAs: 'money', sortable: 'custom' },
                { label: '设备总额', prop: 'deviceAmount', width: '150', displayAs: 'money', sortable: 'custom' },
                { label: '赊销总额', prop: 'predictLoanAmount', width: '150', displayAs: 'money', sortable: 'custom' },
                { label: '设备品类', prop: 'deviceCategory', showOverflowTooltip: true, width: '100', dicData: [{ value: 1, label: '空调' }, { value: 2, label: '采暖' }, { value: 3, label: '新风' }, { value: 4, label: '净水' }, { value: 5, label: '智能化' }, { value: 6, label: '辅材' }, { value: 7, label: '电梯' }, { value: 8, label: '其他' }, { value: 9, label: '电器' }, { value: 10, label: '热水器' }] },
                { label: '设备品牌', prop: 'deviceBrand', showOverflowTooltip: true, width: '150' },
                { label: '上游供应商类型', prop: 'upstreamSupplierType', showOverflowTooltip: true, width: '180', dicData: [{ value: 1, label: '厂商' }, { value: 2, label: '代理商' }, { value: 3, label: '经销商' }] },
                { label: '上游供应商名称', prop: 'upstreamSupplierName', showOverflowTooltip: true, width: '180' },
                { label: '上游接受付款方式', prop: 'upstreamPayType', showOverflowTooltip: true, width: '180', dicData: [{ value: 1, label: '现金' }, { value: 2, label: '承兑' }, { value: '1,2', label: '现金+承兑' }] },
                {
                    label: '上游接受付款周期',
                    prop: 'upstreamPromiseMonth',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.upstreamPromiseMonth ? `${scope.row.upstreamPromiseMonth}个月` : '-'}</span>
                    },
                    showOverflowTooltip: true
                },
                { label: '预估借款时间', prop: 'estimatedLoanTime', width: '150', displayAs: 'YYYY-MM-DD', sortable: 'custom', showOverflowTooltip: true },
                { label: '预估赊销周期', prop: 'loanMonth', width: '150', unit: '个月' },
                {
                    label: '工程项目回款方式',
                    children: [
                        { label: '预付款比例', prop: 'advancePaymentProportion', width: '100', unit: '%' },
                        { label: '货到付款比例', prop: 'deliveryPaymentProportion', width: '100', unit: '%' },
                        { label: '安装进度款比例', prop: 'installProgressPaymentProportion', width: '130', unit: '%' },
                        { label: '验收款比例', prop: 'acceptancePaymentProportion', width: '100', unit: '%' },
                        { label: '交付款比例', prop: 'realPaymentProportion', width: '100', unit: '%' },
                        { label: '审计结算款比例', prop: 'auditCalculationPaymentProportion', width: '150', unit: '%' },
                        { label: '其他', prop: 'payOtherText', width: '150', showOverflowTooltip: true }
                    ],
                    showOverflowTooltip: true
                },
                {
                    label: '合作进度',
                    prop: 'status',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.status ? this.getStatusList(scope.row.status, scope.row.docProgress).value : '-'}</span>
                    },
                    showOverflowTooltip: true
                },
                { label: '项目提交时间', prop: 'submitTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm:ss', sortable: 'custom', showOverflowTooltip: true },
                { label: '更新时间', prop: 'updateTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm:ss', sortable: 'custom', showOverflowTooltip: true }
            ],
            rowKey: '',
            multiSelection: []
        }
    },
    components: {
        hosJoyTable
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxSubmitTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minSubmitTime
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
            projectData: 'crmmanage/projectData'
        })
    },
    async mounted () {

    },
    methods: {
        ...mapActions({
            findProjetpage: 'crmmanage/findProjetpage',
            findProjectLoan: 'crmmanage/findProjectLoan',
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findProjectrecord: 'crmmanage/findProjectrecord',
            findPunchlist: 'crmmanage/findPunchlist'

        })

    }
}
</script>
<style lang="scss" scoped>
</style>

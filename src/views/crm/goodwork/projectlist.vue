<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">项目名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" maxlength="50"></el-input>
                    </div>
                </div>
                <!-- <div class="query-cont-col">
                    <div class="query-col-title">项目编号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入项目编号" maxlength="50"></el-input>
                    </div>
                </div> -->
                <div class="query-cont-col">
                    <div class="query-col-title">项目提交时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minSubmitTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxSubmitTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经销商：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入经销商" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">甲方名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.firstPartName" placeholder="请输入甲方名称" maxlength="50"></el-input>
                    </div>
                </div>
                <!-- <div class="query-cont-col">
                    <div class="query-col-title">更新时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minUpdateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsMax(queryParams.maxUpdateTime)">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxUpdateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsMin(queryParams.minUpdateTime)">
                        </el-date-picker>
                    </div>
                </div> -->
                <!-- <div class="query-cont-col">
                    <div class="query-col-title">项目类别：</div>
                    <div class="query-col-input">
                        <el-select v-model="typeArr" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div> -->
                <div class="query-cont-col">
                    <div class="query-col-title">合作进度：</div>
                    <div class="query-col-input">
                        <el-select v-model="status" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
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
                    <div class="query-col-title">设备品类：</div>
                    <div class="query-col-input">
                        <el-select v-model="deviceCategoryChange" multiple collapse-tags placeholder="请选择" :clearable=true>
                            <el-option v-for="item in deviceList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">上游供应商类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="upstreamSupplierTypeChange" multiple collapse-tags placeholder="请选择" :clearable=true>
                            <el-option v-for="item in upstreamList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">预估借款时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minEstimatedLoanTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsMax(queryParams.maxEstimatedLoanTime)">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxEstimatedLoanTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsMin(queryParams.minEstimatedLoanTime)">
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
                        <el-button type="primary" class="ml20" @click="onExport" v-if="hosAuthCheck(Auths.CRM_GOODWORK_IMPORT)">
                            导出
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop">已筛选 {{projectData.total}} 项, 赊销总金额 {{loanData.totalLoanAmount?fundMoneys(loanData.totalLoanAmount):0}}, 设备款总额 {{loanData.totalDeviceAmount?fundMoneys(loanData.totalDeviceAmount):0}} 元 </el-tag>
            <!-- <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="false" :isAction="true" :actionMinWidth=300 ::rowKey="rowKey"
                :isShowIndex='true'>

                <template slot="predictLoanAmount" slot-scope="scope">
                    {{scope.data.row.predictLoanAmount?fundMoneys(scope.data.row.predictLoanAmount):0}}
                </template>
                <template slot="type" slot-scope="scope">
                    {{scope.data.row.type&&typeList[scope.data.row.type-1]['value']}}
                </template>
                <template slot="progress" slot-scope="scope">
                    {{onFiterStates(scope.data.row.status).length>0?onFiterStates(scope.data.row.status)[0].value:''}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onLookproject(scope.data.row)" v-if="hosAuthCheck(crm_goodwork_detail)">查看详情</el-button>
                    <el-button type="warning" size="mini" plain @click="onLookrecord(scope.data.row,1)">审批记录</el-button>
                    <el-button v-if="scope.data.row.pushRecord" type="info" size="mini" plain @click="onLookrecord(scope.data.row,2)">打卡记录</el-button>
                </template>
            </basicTable> -->
            <!-- table -->
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
        <projectDrawer :drawer=drawer :status=projectstatus @backEvent='restDrawer' ref="drawercom"></projectDrawer>
        <el-dialog :title="title" ref='recordDialog' :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false" v-if="dialogVisible">
            <div class="project-record" v-if="title=='项目审批记录'">
                <el-timeline>
                    <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in dialogRecord" :key=item.id>
                        <el-card>
                            <p><span>操作人：</span> {{item.createBy}}{{item.createByMobile?'('+item.createByMobile+')':''}}</p>
                            <p><span>说明内容：</span> {{item.remark}}</p>
                            <p><span>附件：</span>{{getAttachment(item.attachment).length>0?'':'-'}}</p>
                            <span v-for="(item,index) in getAttachment(item.attachment)" :key="index" class="posrtv">
                                <template v-if="item&&item.fileUrl">
                                    <i class="el-icon-document"></i>
                                    <a :href="item.fileUrl" target="_blank">
                                        <font>{{item.fileName}}</font>
                                    </a>
                                </template>
                            </span>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div class="project-plant" v-if="title=='工地打卡记录'">
                <div class="plantimg" @click="onHandlePictureCardPreview(item)" v-for="(item,index) in plantList" :key="index">
                    <img :src="item.punchImageUrl" alt="">
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="预览" :visible.sync="imgVisible">
            <div class="previewimg">
                <img :src="dialogImageUrl" alt="">
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters, mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import filters from '@/utils/filters.js'
import projectDrawer from './components/projectDrawer'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { TYPE_LIST, PROCESS_LIST, STATUS_LIST, DEVICE_LIST, UPSTREAM_LIST } from '../const'
import * as Auths from '@/utils/auth_const'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'projectlist',
    data () {
        return {
            Auths,
            projectstatus: 0, // 项目状态字段
            categoryIdArr: [],
            branchArr: [],
            deviceCategoryChange: [],
            upstreamSupplierTypeChange: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                firstPartName: '',
                maxSubmitTime: '',
                maxUpdateTime: '',
                minSubmitTime: '',
                minUpdateTime: '',
                upstreamSupplierType: '', // 供应商类型
                deviceCategory: '', // 设备品类
                minEstimatedLoanTime: '', // 最小预估借款时间
                maxEstimatedLoanTime: '', // 最小预估借款时间
                statusList: '',
                projectName: '',
                projectNo: '',
                typeList: '',
                originType: 1,
                deptDoc: '',
                jobNumber: '',
                authCode: '',
                field: '', // 排序字段 赊销总额：predict_loan_amount 项目合同总额：contract_amount 设备总额：device_amount 预估借款时间：estimated_loan_time 提交时间：submit_time 更新时间：update_time
                isAsc: ''// 排序方式 是否升序 true：是 false：否
            },
            status: [],
            typeArr: [],
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            middleStatus: 0, // 0无文件 1有文件已提交 2有文件未提交
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
            multiSelection: [],
            drawer: false,
            typeList: TYPE_LIST,
            processList: PROCESS_LIST,
            statusList: STATUS_LIST,
            deviceList: DEVICE_LIST,
            upstreamList: UPSTREAM_LIST,
            loanData: {},
            dialogVisible: false,
            dialogRecord: [],
            title: '',
            imgVisible: false,
            dialogImageUrl: '',
            plantList: []
        }
    },
    components: {
        projectDrawer, hosJoyTable
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
            projectData: 'crmmanage/projectData',
            projectLoan: 'crmmanage/projectLoan',
            crmdepList: 'crmmanage/crmdepList',
            punchList: 'crmmanage/punchList',
            projectRecord: 'crmmanage/projectRecord'
        })
    },
    async mounted () {
        this.queryParams.jobNumber = this.userInfo.jobNumber
        this.queryParams.authCode = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
        this.onGetbranch()
    },
    methods: {
        ...mapActions({
            findProjetpage: 'crmmanage/findProjetpage',
            findProjectLoan: 'crmmanage/findProjectLoan',
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findProjectrecord: 'crmmanage/findProjectrecord',
            findPunchlist: 'crmmanage/findPunchlist'

        }),
        getAttachment (item) {
            if (item) {
                let arr = JSON.parse(item)
                return arr
            } else {
                return []
            }
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无数据可导出！')
            } else {
                this.queryParams.statusList = this.status.toString()
                this.queryParams.typeList = this.typeArr.toString()
                this.queryParams.deviceCategoryList = this.deviceCategoryChange.toString()
                this.queryParams.upstreamSupplierTypeList = this.upstreamSupplierTypeChange.toString()
                let url = ''
                for (const key in this.queryParams) {
                    if (this.queryParams[key] !== '') {
                        url += (`${key}=${this.queryParams[key]}&`)
                    }
                }
                window.location = interfaceUrl + 'memeber/openapi/project/export?' + url
            }
        },
        pickerOptionsMax (val) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = val
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsMin (val) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = val
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        getStatusList (key, docProgress) {
            const map = STATUS_LIST.reduce((res, item) => {
                res[item.key] = item
                return res
            }, {})
            if (key == 3) {
                // let label = docProgress == null ? map[key].value : `${map[key].value}进度：${docProgress * 100}%`
                let label = docProgress == null ? map[key].value : `${map[key].value}进度：${this.$multipliedBy(docProgress, 100)}%`
                return { value: label }
            } else {
                return map[key]
            }
        },
        sortChange (e) {
            console.log('e: ', e)
            if (e.order == null) {
                this.queryParams.field = ''
                this.queryParams.isAsc = null
                console.log('this.queryParams: ', this.queryParams)
            } else if (e.prop == 'predictLoanAmount') {
                this.queryParams.field = 'predict_loan_amount'
                this.queryParams.isAsc = e.order === 'ascending'
            } else if (e.prop == 'contractAmount') {
                this.queryParams.field = 'contract_amount'
                this.queryParams.isAsc = e.order === 'ascending'
            } else if (e.prop == 'deviceAmount') {
                this.queryParams.field = 'device_amount'
                this.queryParams.isAsc = e.order === 'ascending'
            } else if (e.prop == 'estimatedLoanTime') {
                this.queryParams.field = 'estimated_loan_time'
                this.queryParams.isAsc = e.order === 'ascending'
            } else if (e.prop == 'submitTime') {
                this.queryParams.field = 'submit_time'
                this.queryParams.isAsc = e.order === 'ascending'
            } else if (e.prop == 'updateTime') {
                this.queryParams.field = 'update_time'
                this.queryParams.isAsc = e.order === 'ascending'
            }
            this.searchList()
        },
        fundMoneys (val) {
            if (val) {
                return filters.money(val)
            }
        },
        onFiterStates (val) {
            return this.statusList.filter((v) => {
                return v.key == val
            })
        },
        onRest () {
            this.categoryIdArr = []
            this.queryParams = deepCopy(this.copyParams)
            this.status = []
            this.typeArr = []
            this.deviceCategoryChange = []
            this.upstreamSupplierTypeChange = []
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val
        },
        async  searchList () {
            this.queryParams.statusList = this.status.toString()
            this.queryParams.typeList = this.typeArr.toString()
            this.queryParams.deviceCategoryList = this.deviceCategoryChange.toString()
            this.queryParams.upstreamSupplierTypeList = this.upstreamSupplierTypeChange.toString()
            const { ...params } = this.queryParams
            await this.findProjetpage(params)
            this.tableData = this.projectData.records || []
            this.paginationInfo = {
                pageNumber: this.projectData.current,
                pageSize: this.projectData.size,
                total: this.projectData.total
            }
            await this.findProjectLoan(params)
            this.loanData = this.projectLoan ? this.projectLoan : ''
        },
        onLookproject (val) {
            this.drawer = true
            this.projectstatus = val.status
            this.$refs.drawercom.onFindProjectCom(val.id)
        },
        restDrawer () {
            this.drawer = false
            this.searchList()
        },
        async onLookrecord (val, type) {
            if (type == 1) {
                this.title = '项目审批记录'
                await this.findProjectrecord(val.id)
                this.dialogRecord = this.projectRecord
            } else {
                this.title = '工地打卡记录'
                await this.findPunchlist({ projectId: val.id })
                this.plantList = this.punchList
            }

            this.dialogVisible = true
            console.log('recordDialog', this.$refs.recordDialog)
        },
        onHandlePictureCardPreview (val) {
            this.dialogImageUrl = val.punchImageUrl
            this.imgVisible = true
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: JSON.parse(sessionStorage.getItem('authCode')) })
            this.branchArr = this.crmdepList
        }
    }
}
</script>
<style lang="scss" scoped>
.posrtv {
    position: relative;
    margin-right: 15px;
    color: #ff7a45;
}
.posrtv a {
    color: #ff7a45;
    margin-left: 10px;
}
.abs {
    position: absolute;
    right: -11px;
    top: -7px;
    display: none;
    i {
        font-size: 18px;
        color: #5d5d5d;
        cursor: pointer;
    }
}
.posrtv:hover .abs {
    display: block;
}
.colred {
    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
.eltagtop {
    margin-bottom: 10px;
}
.colblue {
    color: #50b7f7;
    cursor: pointer;
}
.project-record {
    padding: 10px 0;
    height: 400px;
    overflow-y: scroll;
    /deep/ .el-card__body {
        padding: 5px;
        span {
            color: grey;
        }
    }
}
.project-plant {
    display: flex;
    flex-wrap: wrap;
    .plantimg {
        margin: 5px;
        width: 95px;
        height: 95px;
        overflow: hidden;
        img {
            width: 95px;
            height: 100%;
        }
    }
}
.previewimg {
    text-align: center;
    img {
        width: 500px;
        padding: 10px;
    }
}
/deep/.query-cont-col .query-col-input .el-input {
    width: 150px;
}
/deep/.el-table__row >span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
}
</style>

<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">合同名称/编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.contractNoOrName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.subsectionCode" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">合同类型：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.contractTypeIdArrays" :clearable=true>
                            <el-option :label="item.name" :value="item.id" v-for="item in contractTypes" :key="item.id"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.contractStatus" multiple :clearable=true >
                            <el-option :label="item.label" :value="item.value" v-for="item in contractStatus" :key="item.value" ></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">是否已归档：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.archive" :clearable=true>
                            <el-option :label="item.label" :value="item.value" v-for="item in fileStatus" :key="item.label"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">发起人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.createBy" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">发起时间：</div>
                    <div class="query-col-input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">更新时间：</div>
                    <div class="query-col-input">
                        <HDatePicker :start-change="onStartUpdate" :end-change="onEndUpdate" :options="updateOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="()=>getList(1)">
                        查询
                    </h-button>
                    <h-button @click="reset">
                        重置
                    </h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <el-badge :value="financeManagerWaitingNum" class="item">
                    <div class="table-tab">待分财修订</div>
                </el-badge>
                <el-badge :value="riskManagerWaitingNum" class="item" style="margin:0 30px">
                    <div class="table-tab">待运营修订</div>
                </el-badge>
                <el-badge :value="lawManagerWaitingNum" class="item">
                    <div class="table-tab">待法务修订</div>
                </el-badge>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项</el-tag>
            </div>
            <hosJoyTable localName="V3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="searchList"
                actionWidth='420' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template slot="action" slot-scope="scope">
                    <h-button v-if="scope.data.row.contractStatus===2&&hosAuthCheck(Auths.CRM_CONTRACT_FIN)" table @click="approveContract(scope.data.row,1)">分财审核</h-button>
                    <h-button v-if="scope.data.row.contractStatus===4&&hosAuthCheck(Auths.CRM_CONTRACT_RISK)" table @click="approveContract(scope.data.row,2)">运营审核</h-button>
                    <h-button v-if="scope.data.row.contractStatus===6&&hosAuthCheck(Auths.CRM_CONTRACT_LEGAL)" table @click="approveContract(scope.data.row,3)">法务审核</h-button>
                    <h-button table @click="openDetail(scope.data.row)">查看合同</h-button>
                    <h-button table @click="getHistory(scope.data.row)">审核记录</h-button>
                    <h-button table @click="onAbolished(scope.data.row)" v-if="scope.data.row.contractStatus!=17 && hosAuthCheck(Auths.CRM_CONTRACT_ABOLISH)">废止</h-button>
                    <h-button table @click="onWithdraw(scope.data.row)" v-if="showWithdrawBtn(scope.data.row)">撤回</h-button>
                    <h-button table @click="onGetfile(scope.data.row)" v-if="hosAuthCheck(Auths.CONTRACT_PLACE)&&scope.data.row.contractSignType==2&&scope.data.row.contractStatus==12&&!scope.data.row.archive">归档</h-button>
                </template>
            </hosJoyTable>
        </div>

        <el-drawer title="查看信息" v-if="drawerVisible" :visible.sync="drawerVisible" :wrapperClosable="false" size='580px' :beforeClose="() => drawerVisible=false" class="contentdrawerbox">
            <div slot="title">审核记录</div>
            <!-- 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回 -->
            <div v-if="drawerVisible" style="text-align: center;font-size: 18px;">{{getContractStatusTxt(detailRes.contractStatus)}}</div>
            <div class="history-css">
                <div v-if="historyList&&historyList.length==0">暂无数据</div>
                <div v-else class="history-css-flex" v-for="(item,index) in historyList" :key="index">
                    <div class="history-css-left">
                        <span class="name">{{item.operator}} </span>
                        <span>{{item.operationName}}</span>
                        <template v-if="item.operationName == '编辑了'">
                            <span class="imgcss" v-if="item.operationContent.indexOf('purchase_details') != -1||item.operationContent.indexOf('purch_service_fee_form') != -1">
                                <font style="color:#ff7a45">{{JSON.parse(item.operationContent).fieldDesc}}</font>
                                从<font>
                                    <el-image style="width: 80px; height: 80px;margin:10px 5px 0;border-radius: 7px;border: 1px solid #d9d9d9" :src="JSON.parse(item.operationContent).fieldOriginalContent||emptyImg"
                                        :preview-src-list="[JSON.parse(item.operationContent).fieldOriginalContent||emptyImg]"></el-image>
                                </font>
                                变为<font>
                                    <span v-if="JSON.parse(item.operationContent).fieldContent==''">“”</span>
                                    <template v-else-if="JSON.parse(item.operationContent).fieldContent.indexOf('[{')!=-1">
                                        <el-image v-for="(imgItem,imgIndex) in JSON.parse(JSON.parse(item.operationContent).fieldContent)" :key="imgIndex" style="width: 80px; height: 80px;margin:10px 5px 0;border-radius: 7px;border: 1px solid #d9d9d9" :src="imgItem.fileUrl"
                                            :preview-src-list="[imgItem.fileUrl]"></el-image>
                                    </template>
                                    <template v-else>
                                        <el-image style="width: 80px; height: 80px;margin:10px 5px 0;border-radius: 7px;border: 1px solid #d9d9d9" :src="JSON.parse(item.operationContent).fieldContent" :preview-src-list="[JSON.parse(item.operationContent).fieldContent]"></el-image>
                                    </template>
                                </font>
                            </span>
                            <span v-else class="operationcontent-css" v-html="getOperationContent(item)"></span>
                        </template>
                        <template v-else-if="item.operationName == '修订了'">
                            <font style="margin: 0 4px;">合同</font>
                            <font style="color: #ff7a45;margin-left:4px;cursor: pointer;" @click="getDiff(item.operationContent)">查看 >></font>
                        </template>
                        <template v-else>
                            <span class="operationcontent-css">
                                <font>{{item.operationContent}}</font>
                            </span>
                        </template>
                        <div v-if="item.approvalRemark" style="color: #ff7a45;">备注：{{item.approvalRemark}}</div>
                        <template v-if="item.attachDocs&&item.attachDocs.length>0">
                            <div v-for="(obj,oindex) in item.attachDocs" :key="oindex" style="margin-top:6px;margin-left:10px">
                                <a style="color:#1068bf;" :href="obj.fileUrl" target='_blank'>{{obj.fileName}}</a>
                            </div>
                        </template>
                    </div>
                    <div class="history-css-right">{{item.operationTime | momentFormat('YYYY年MM月DD日 HH时mm分ss秒')}}</div>
                </div>
            </div>
            <div class="history-bttom">
                <h-button type="primary" @click="drawerVisible=false">好的</h-button>
            </div>
        </el-drawer>
        <diffDialog ref="diffDialog" v-if="currentContent&&lastContent" :currentContent=currentContent :lastContent=lastContent></diffDialog>
        <fileDialog ref='fileDialog' @callBackFun=getList></fileDialog>
    </div>
</template>
<script>
import diffDialog from './diffDialog'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import fileDialog from './fileDialog'
import {
    contractSigningList,
    contractStatic,
    getCheckHistory,
    getDiffApi,
    contractTypesNotConfirm,
    getAbolish,
    contractRecall
} from './api/index'
import { mapActions, mapGetters, mapState } from 'vuex'
import { newCache } from '@/utils/index'
import * as Auths from '@/utils/auth_const'
import { CONTRACT_STATUS_KEY } from './const'

const _queryParams = {
    pageSize: 10,
    pageNumber: 1,
    contractTypeIdArrays: '',
    contractStatusArrays: '',
    projectName: '',
    createStartTime: '',
    createEndTime: '',
    updateStartTime: '',
    updateEndTime: '',
    createBy: '',
    subsectionCode: '',
    contractNoOrName: '',
    authCode: '',
    jobNumber: '',
    companyName: '',
    archive: '',
    createTimeOrder: null, // asc 或 desc
    updateTimeOrder: null// asc 或 desc
}
const _dicData = [{ value: 1, label: '草稿' }, { value: 2, label: '待分财审核' }, { value: 3, label: '分财审核未通过' }, { value: 4, label: '待运营审核' }, { value: 5, label: '运营审核未通过' }, { value: 6, label: '待法务审核' }, { value: 7, label: '法务审核未通过' }, { value: 8, label: '待客户签署' }, { value: 9, label: '客户拒签' }, { value: 10, label: '待平台签署' }, { value: 11, label: '平台签署未通过' }, { value: 12, label: '合同已签署' }, { value: 13, label: '异常关闭' }, { value: 14, label: '超时关闭' }, { value: 15, label: '用印发起失败' }, { value: 16, label: '发起线上待客户签署' }, { value: 17, label: '合同废止' }]

export default {
    name: 'contractSigningManagement',
    components: { hosJoyTable, diffDialog, fileDialog },
    data () {
        return {
            Auths,
            emptyImg: 'https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/files/20210105/193158915/275fc2ef-5d7c-4056-b89f-bead48b3e90f.png',
            detailRes: {},
            historyList: '',
            drawerVisible: false,
            financeManagerWaitingNum: '',
            lawManagerWaitingNum: '',
            riskManagerWaitingNum: '',
            branchArr: [],
            contractTypes: [],
            dicData: JSON.parse(JSON.stringify(_dicData)),
            contractStatus: [{ value: '', label: '全部' }, ..._dicData],
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            queryParams: JSON.parse(JSON.stringify(_queryParams)),
            tableLabel: [
                { label: '合同编号', prop: 'contractNo', width: '150' },
                { label: '企业名称', prop: 'supplierCompanyName', width: '150' },
                { label: '合同名称', prop: 'contractName', width: '280' },
                { label: '所属分部', prop: 'subsectionName', width: '120' },
                { label: '项目', prop: 'projectName', width: '120' },
                {
                    label: '合同模板编号',
                    prop: 'templateId',
                    width: '180',
                    render: (h, scope) => {
                        return <span>{!scope.row.templateId ? '-' : scope.row.templateId}</span>
                    }
                },
                { label: '合同模板版本', prop: 'versionNo', width: '120' },
                { label: '合同类型', prop: 'contractTemplateTypeName', width: '150' },
                { label: '状态', prop: 'contractStatus', width: '120', dicData: _dicData },
                {
                    label: '是否已归档',
                    prop: 'archive',
                    width: '120',
                    render: (h, scope) => {
                        return <span>{scope.row.archive ? '是' : '否'}</span>
                    }
                },
                { label: '发起人', prop: 'createBy', width: '120' },
                { label: '发起时间', prop: 'createTime', width: '160', sortable: 'custom', displayAs: 'YYYY-MM-DD HH:mm:ss' },
                { label: '更新时间', prop: 'updateTime', width: '160', sortable: 'custom', displayAs: 'YYYY-MM-DD HH:mm:ss' }
            ],
            tableData: [],
            currentContent: '',
            lastContent: '',
            fileDialog: false,
            archive: '',
            fileStatus: [{ value: '', label: '全部' }, { value: true, label: '是' }, { value: false, label: '否' }],
            contractStatusKey: CONTRACT_STATUS_KEY
        }
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            crmdepList: 'crmmanage/crmdepList'
        }),
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.createStartTime,
                endTime: this.queryParams.createEndTime
            }
        },
        updateOptions () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.updateStartTime,
                endTime: this.queryParams.updateEndTime
            }
        }
    },
    methods: {
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findCreditManager: 'creditManage/findCreditManager',
            findCreditPage: 'creditManage/findCreditPage'
        }),
        onAbolished (val) {
            this.$confirm('确定废止该合同吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await getAbolish({
                    'contractId': val.id,
                    'phone': this.userInfo.phoneNumber,
                    'createBy': this.userInfo.employeeName
                })
                this.searchList()
            }).catch(() => {
            })
        },
        /**
         * 撤回按钮展示条件
         * 当合同状态为：待客户签署、发起线上待客户签署、待平台签署状态时才显示
         *
         * @param row 合同签署管理列表行信息
         * @returns true 展示撤回按钮  false 不展示撤回按钮
         * @summary HAM-39306
         */
        showWithdrawBtn (row) {
            return (row.contractStatus == this.contractStatusKey.CUSTOMER_SIGN || row.contractStatus == this.contractStatusKey.ONLINE_CUSTOMER_SIGN || row.contractStatus == this.contractStatusKey.PLATFORM_SIGN) && this.hosAuthCheck(this.Auths.CRM_CONTRACT_WITHDRAW)
        },
        /**
         * 合同撤回操作
         * @param val 合同签署管理列表行信息
         * @summary HAM-39306
         */
        onWithdraw (val) {
            this.$confirm('确定撤回该合同吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await contractRecall({
                    'contractId': val.id
                })
                this.searchList()
            }).catch(() => {
            })
        },
        onStartChange (val) {
            this.queryParams.createStartTime = val
        },
        onEndChange (val) {
            this.queryParams.createEndTime = val
        },
        onStartUpdate (val) {
            this.queryParams.updateStartTime = val
        },
        onEndUpdate (val) {
            this.queryParams.updateEndTime = val
        },
        async getDiff (item) {
            const { lastContentId, currentContentId } = JSON.parse(item)
            const { data } = await getDiffApi({
                currentId: currentContentId,
                lastId: lastContentId
            })
            let reg = /\sdata-mce-style=".*?"/g
            this.currentContent = data.contractContent.replace(reg, '').replace(/ contenteditable="true"/g, ' contenteditable="false"')
            this.lastContent = data.lastContractContent.replace(reg, '').replace(/ contenteditable="true"/g, ' contenteditable="false"')
            this.currentContent = this.currentContent.replace(/\sdata-mce-src=".*?"/g, '')
            this.lastContent = this.lastContent.replace(/\sdata-mce-src=".*?"/g, '')
            this.currentContent = this.currentContent.replace(/<table(.*?)style="[\s\S]*?"/gi, '<table$1style="border-collapse: collapse"')
            this.lastContent = this.lastContent.replace(/<table(.*?)style="[\s\S]*?"/gi, '<table$1style="border-collapse: collapse"')
            this.currentContent = this.currentContent.replace(/<tr(.*?)style=".*?"/g, '<tr$1style="border: 1px solid #666"')
            this.lastContent = this.lastContent.replace(/<tr(.*?)style=".*?"/g, '<tr$1style="border: 1px solid #666"')
            this.currentContent = this.currentContent.replace(/<td(.*?)style=".*?"/g, '<td$1style="border: 1px solid #666"')
            this.lastContent = this.lastContent.replace(/<td(.*?)style=".*?"/g, '<td$1style="border: 1px solid #666"')
            if (this.currentContent === null) {
                this.$message({
                    message: `获取新版合同失败`,
                    type: 'error'
                })
                return
            }
            if (this.lastContent === null) {
                this.$message({
                    message: `获取上一版合同失败`,
                    type: 'error'
                })
                return
            }
            this.$nextTick(() => {
                this.$refs.diffDialog.onShowDiff()
            })
        },
        getContractStatusTxt (val) {
            let res = this.dicData.filter(item => item.value == val)
            if (res && res.length > 0) {
                return res[0].label
            }
            return ''
        },
        formatTxt (txt) {
            if (txt) {
                let newString = txt.replace(/\n/g, '_@').replace(/\r/g, '_#')
                newString = newString.replace(/_#_@/g, '<br/>')
                newString = newString.replace(/_@/g, '<br/>')
                newString = newString.replace(/\s/g, '&nbsp;')
                return newString
            }
            return ''
        },
        getOperationContent (item) {
            const obj = JSON.parse(item.operationContent)
            return `<font>${obj.fieldDesc}</font>从<font>${this.formatTxt(obj.fieldOriginalContent)}</font>变为<font>${this.formatTxt(obj.fieldContent)}</font>`
        },
        async getHistory (row) {
            this.detailRes.contractStatus = row.contractStatus
            const { data } = await getCheckHistory({
                contractId: row.id
            })
            this.historyList = data.signHistory
            this.drawerVisible = true
        },
        reset () {
            this.queryParams = JSON.parse(JSON.stringify(_queryParams))
            this.archive = ''
            this.getList()
        },
        openDetail (item) {
            this.$router.push({ path: '/goodwork/contractSigningManagementDetail', query: { id: item.id } })
        },
        searchList () {
            this.getList()
        },
        pickerOptionsStart (date) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams[date]
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd (date) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams[date]
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        sortChange (e) {
            if (e.prop == 'createTime' && e.order == null) {
                this.queryParams.createTimeOrder = null
            } else if (e.prop == 'createTime' && e.order === 'descending') {
                this.queryParams.createTimeOrder = 'desc'
                this.queryParams.updateTimeOrder = null
            } else if (e.prop == 'createTime' && e.order === 'ascending') {
                this.queryParams.createTimeOrder = 'asc'
                this.queryParams.updateTimeOrder = null
            } else if (e.prop == 'updateTime' && e.order === null) {
                this.queryParams.updateTimeOrder = null
            } else if (e.prop == 'updateTime' && e.order === 'descending') {
                this.queryParams.updateTimeOrder = 'desc'
                this.queryParams.createTimeOrder = null
            } else if (e.prop == 'updateTime' && e.order === 'ascending') {
                this.queryParams.updateTimeOrder = 'asc'
                this.queryParams.createTimeOrder = null
            }
            this.searchList()
        },
        async getList (val = '') {
            // this.queryParams.archive = this.archive
            this.queryParams.jobNumber = this.userInfo.jobNumber
            this.queryParams.authCode = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
            if (val) {
                this.queryParams.pageNumber = 1
            }
            let dataJson = JSON.parse(JSON.stringify(this.queryParams))
            console.log('🚀 --- getList --- dataJson', dataJson)
            // 字段修改 原本使用contractStatus 后续改成contractStatusArrays字段
            if (dataJson.contractStatus) {
                dataJson.contractStatusArrays = dataJson.contractStatus.join(',')
            }
            const { data } = await contractSigningList(dataJson)
            if (data) {
                this.tableData = data.records
                this.page.total = data.total
            }
            this.getContractStatic()
        },
        approveContract (item, val) {
            // 这里根据 是否为 模板合同 来进入上传页面
            // 1：有模板 2：无模板
            if (!item.contractTemplateVersionId) {
                this.$router.push({ path: '/goodwork/noTempApprove', query: { id: item.id, role: val } })
            } else {
                this.$router.push({ path: '/goodwork/approveContract', query: { id: item.id, contractTypeId: item.contractTypeId, role: val, projectId: item.projectId } })
            }
        },
        async getcontractTypes () {
            const { data } = await contractTypesNotConfirm()
            this.contractTypes = data
            this.contractTypes.unshift({
                id: '',
                name: '全部'
            })
        },
        async getContractStatic () {
            const { pageSize, pageNumber, ...rest } = this.queryParams
            const { data } = await contractStatic(rest)
            this.financeManagerWaitingNum = data.financeManagerWaitingNum
            this.lawManagerWaitingNum = data.lawManagerWaitingNum
            this.riskManagerWaitingNum = data.riskManagerWaitingNum
        },
        onGetfile (val) {
            this.$nextTick(() => {
                this.$refs.fileDialog.onGetfile(val.id, 1)
            })
        }
    },
    async mounted () {
        // tableData
        this.getList()
        this.getcontractTypes()
        await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
        this.branchArr = this.crmdepList
    },
    async activated () {
        this.getList()
        this.getcontractTypes()
        await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
        this.branchArr = this.crmdepList
    },
    beforeUpdate () {
        newCache('contractSigningManagement')
    }
    // beforeRouteEnter (to, from, next) {
    //     newCache('contractSigningManagement')
    //     next()
    // },
    // beforeRouteLeave (to, from, next) {
    //     console.log('to: ', to)
    //     if (to.name == 'contractSigningManagementDetail' || to.name == 'approveContract' || to.name == 'noTempApprove') {
    //         //
    //     } else {
    //         clearCache('contractSigningManagement')
    //     }
    //     next()
    // }
}
</script>
<style scoped lang="scss">
.tag_top {
    margin: 10px 0;
}
.table-tab {
    background: #f2f2f2b8;
    color: #ff6600;
    width: 110px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    border-radius: 6px;
}
.history-css-flex {
    margin-bottom: 10px;
}
.name {
    color: #169bd5;
}
.operationcontent-css {
    font {
        color: #ff7a45;
        margin: 0 4px;
    }
}
.history-css-right {
    flex: 0 0 198px;
    font-size: 13px;
    color: #a7a5a5;
    margin-left: 10px;
    text-align: right;
}
.contentdrawerbox {
    /deep/ .el-drawer__header {
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        font-size: 18px;
    }
    /deep/.history-css {
        box-sizing: border-box;
        height: calc(100vh - 190px);
        overflow-y: scroll;
        .history-css-flex {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            align-items: baseline;
            margin-bottom: 8px;
            .history-css-left {
                font-size: 14px;
                flex: 0 0 300px;
                word-break: break-all;
                max-width: 300px;
                // word-break: break-all;
                .name {
                    color: #169bd5;
                }
            }
            .history-css-right {
                flex: 0 0 198px;
                font-size: 13px;
                color: #a7a5a5;
                margin-left: 10px;
                text-align: right;
            }
        }
        .operationcontent-css {
            font {
                color: #ff7a45;
                margin: 0 4px;
            }
        }
    }
    /deep/.history-css {
        padding: 0 20px;
        box-sizing: border-box;
        height: calc(100vh - 190px);
        overflow-y: scroll;
        .history-css-flex {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            align-items: baseline;
            .history-css-left {
                font-size: 14px;
                flex: 0 0 300px;
                word-break: break-all;
                max-width: 300px;
                // word-break: break-all;
                .name {
                    color: #169bd5;
                }
            }
            .history-css-right {
                flex: 0 0 198px;
                font-size: 13px;
                color: #a7a5a5;
                margin-left: 10px;
                text-align: right;
            }
        }
        .operationcontent-css {
            font {
                color: #ff7a45;
                margin: 0 4px;
            }
        }
    }
    /deep/.history-bttom {
        border-top: 1px solid #eee;
        padding-top: 10px;
        text-align: right;
        padding-right: 20px;
        box-sizing: border-box;
    }
}
</style>

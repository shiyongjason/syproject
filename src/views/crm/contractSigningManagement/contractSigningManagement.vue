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
                        <el-select placeholder="请选择" v-model="queryParams.contractTypeId" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>

            </div>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.contractStatus" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
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
                        <el-date-picker type="datetime" :editable="false"  v-model="queryParams.createStartTime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('createEndTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="datetime" :editable="false"  v-model="queryParams.createEndTime"  value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('createStartTime')">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="query-cont__row">
               <div class="query-cont-col">
                    <div class="query-col-title">更新时间：</div>
                    <div class="query-col-input">
                        <el-date-picker type="datetime" :editable="false"  v-model="queryParams.updateStartTime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('updateEndTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="datetime" :editable="false"  v-model="queryParams.updateEndTime"  value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('updateStartTime')">
                        </el-date-picker>
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
                    <el-badge :value="12" class="item"><div class="table-tab">待分财修订</div></el-badge>
                    <el-badge :value="12" class="item" style="margin:0 30px"><div class="table-tab">待风控修订</div></el-badge>
                    <el-badge :value="12" class="item"><div class="table-tab">待法务修订</div></el-badge>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{total}} 项</el-tag>
            </div>
            <hosJoyTable localName="V3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total"
                @pagination="searchList" actionWidth='260' isAction :isActionFixed='tableData&&tableData.length>0'  @sort-change='sortChange'>
                <template slot="action" slot-scope="scope">
                    <h-button v-if="scope.data.row.contractStatus===2" table @click="approveContract(scope.data.row)">分财审核</h-button>
                    <h-button v-if="scope.data.row.contractStatus===4" table @click="approveContract(scope.data.row)">风控审核</h-button>
                    <h-button v-if="scope.data.row.contractStatus===6" table @click="approveContract(scope.data.row)">法务审核</h-button>
                    <h-button table @click="openDetail(scope.data.row)">查看合同</h-button>
                </template>
            </hosJoyTable>
        </div>
        <!---->

    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { contractSigningList } from './api/index'
import { mapActions, mapGetters, mapState } from 'vuex'
import { clearCache, newCache } from '@/utils/index'
const _queryParams = {
    pageSize: 10,
    pageNumber: 1,
    contractTypeId: '',
    contractStatus: '',
    projectName: '',
    createStartTime: '',
    createEndTime: '',
    updateStartTime: '',
    updateEndTime: '',
    createBy: '',
    subsectionCode: '',
    contractNoOrName: '',
    createTimeOrder: null, // asc 或 desc
    updateTimeOrder: null// asc 或 desc
}
export default {
    name: 'contractSigningManagement',
    components: { hosJoyTable },
    data () {
        return {
            branchArr: [],
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            queryParams: JSON.parse(JSON.stringify(_queryParams)),
            tableLabel: [
                { label: '合同编号', prop: 'contractNo', width: '120' },
                { label: '合同名称', prop: 'contractName', width: '120' },
                { label: '所属分部', prop: 'subsectionName', width: '120' },
                { label: '项目', prop: 'projectName', width: '120' },
                { label: '合同模版编号', prop: 'contractTemplateVersionId', width: '120' },
                { label: '合同模版版本', prop: 'versionNo', width: '120' },
                { label: '合同类型', prop: 'contractTemplateTypeName', width: '120' },
                { label: '状态', prop: 'contractStatus', width: '120', dicData: [{ value: 1, label: '草稿' }, { value: 2, label: '待分财审核' }, { value: 3, label: '分财审核未通过' }, { value: 4, label: '待风控审核' }, { value: 5, label: '风控审核未通过' }, { value: 6, label: '待法务审核' }, { value: 7, label: '法务审核未通过' }, { value: 8, label: '待客户签署' }, { value: 9, label: '客户拒签' }, { value: 10, label: '待平台签署' }, { value: 11, label: '平台签署未通过' }, { value: 12, label: '合同已签署' }, { value: 13, label: '异常关闭' }, { value: 14, label: '超时关闭' }] },
                { label: '发起人', prop: 'createBy', width: '120' },
                { label: '发起时间', prop: 'createTime', width: '160', sortable: 'custom', displayAs: 'YYYY-MM-DD HH:mm:ss' },
                { label: '更新时间', prop: 'updateTime', width: '160', sortable: 'custom', displayAs: 'YYYY-MM-DD HH:mm:ss' }
            ],
            tableData: [{ contractNo: 1 }],
            total: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            crmdepList: 'crmmanage/crmdepList'
        })
    },
    methods: {
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findCreditManager: 'creditManage/findCreditManager',
            findCreditPage: 'creditManage/findCreditPage'
        }),
        reset () {
            this.queryParams = JSON.parse(JSON.stringify(_queryParams))
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
                        return time.getTime() < new Date(beginDateVal).getTime()
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
            if (val) {
                this.queryParams.pageNumber = 1
            }
            const { data } = await contractSigningList(this.queryParams)
            if (data) {
                this.tableData = data.records
                this.page.total = data.total
            }
        },
        approveContract (item) {
            this.$router.push({ path: '/goodwork/approveContract', query: { id: item.id, contractTypeId: item.contractTypeId } })
        }
    },
    async activated () {
        this.getList()
        await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
        this.branchArr = this.crmdepList
    },
    async mounted () {
        // tableData
        this.getList()
        await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
        this.branchArr = this.crmdepList
    },
    beforeRouteEnter (to, from, next) {
        newCache('contractSigningManagement')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name == 'contractSigningManagementDetail' || to.name == 'approveContract') {
            //
        } else {
            clearCache('contractSigningManagement')
        }
        next()
    }
}
</script>
<style scoped lang="scss">
.tag_top {
    margin: 10px 0;
}
.table-tab{
    background: #f2f2f2;
    color: #FF6600;
    width: 110px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    border-radius: 6px;
}
</style>
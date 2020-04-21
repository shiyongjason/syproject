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
                <div class="query-cont-col">
                    <div class="query-col-title">项目编号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入项目编号" maxlength="50"></el-input>
                    </div>
                </div>
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
                <div class="query-cont-col">
                    <div class="query-col-title">更新时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minUpdateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxUpdateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">项目类别：</div>
                    <div class="query-col-input">
                        <el-select v-model="typeArr" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
                            <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">合作进度：</div>
                    <div class="query-col-input">
                        <el-select v-model="status" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                   <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                         <el-select v-model="queryParams.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
             <el-tag size="medium" class="eltagtop">已筛选 {{projectData.total}} 项, 赊销总金额 {{loanData?fundMoneys(loanData):0}} 元 </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey"
                :isShowIndex='true'>
                 <template slot="predictLoanAmount" slot-scope="scope">
                    {{fundMoneys(scope.data.row.predictLoanAmount)}}
                </template>
                <template slot="type" slot-scope="scope">
                    {{scope.data.row.type&&typeList[scope.data.row.type-1]['value']}}
                </template>
                <template slot="progress" slot-scope="scope">
                    {{scope.data.row.type&&statusList[scope.data.row.status-2]['value']}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onLookproject(scope.data.row.id)" v-if="hosAuthCheck(crm_goodwork_detail)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
        <projectDrawer :drawer=drawer @backEvent='restDrawer' ref="drawercom"></projectDrawer>
        <!-- <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable> -->
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import filters from '@/utils/filters.js'
import projectDrawer from './components/projectDrawer'
import { TYPE_LIST, PROCESS_LIST, STATUS_LIST } from '../const'
import * as Auths from '@/utils/auth_const'
export default {
    name: 'projectlist',
    data () {
        return {
            crm_goodwork_detail: Auths.CRM_GOODWORK_DETAIL,
            categoryIdArr: [],
            branchArr: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                firstPartName: '',
                maxSubmitTime: '',
                maxUpdateTime: '',
                minSubmitTime: '',
                minUpdateTime: '',
                statusList: '',
                projectName: '',
                projectNo: '',
                typeList: '',
                originType: 1
            },
            status: [],
            typeArr: [],
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            middleStatus: 0, // 0无文件 1有文件已提交 2有文件未提交
            tableLabel: [
                { label: '项目名称', prop: 'projectName', width: '180' },
                { label: '项目编号', prop: 'projectNo', width: '180' },
                { label: '赊销总额', prop: 'predictLoanAmount' },
                { label: '经销商', prop: 'companyName', width: '180' },
                { label: '甲方名', prop: 'firstPartName' },
                { label: '项目类别', prop: 'type', width: '120' },
                { label: '合作进度', prop: 'progress', width: '120' },
                { label: '项目提交时间', prop: 'submitTime', width: '150', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes' }
            ],
            rowKey: '',
            multiSelection: [],
            drawer: false,
            typeList: TYPE_LIST,
            processList: PROCESS_LIST,
            statusList: STATUS_LIST,
            loanData: {}
        }
    },
    components: {
        projectDrawer
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
        pickerOptionsMax () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxUpdateTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsMin () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minUpdateTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        ...mapGetters({
            projectData: 'crmmanage/projectData',
            projectLoan: 'crmmanage/projectLoan',
            branchList: 'branchList'
        })
    },
    async mounted () {
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
        this.onGetbranch()
    },

    methods: {
        ...mapActions({
            findProjetpage: 'crmmanage/findProjetpage',
            findProjectLoan: 'crmmanage/findProjectLoan',
            findBranch: 'findBranch'
        }),
        fundMoneys (val) {
            if (val) {
                return filters.money(val)
            }
        },
        onRest () {
            this.categoryIdArr = []
            this.queryParams = deepCopy(this.copyParams)
            this.status = []
            this.typeArr = []
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
            const { ...params } = this.queryParams
            await this.findProjetpage(params)
            this.tableData = this.projectData.records
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
            this.$refs.drawercom.onFindProjectDetail(val)
        },
        restDrawer () {
            this.drawer = false
            this.searchList()
        },
        async onGetbranch () {
            await this.findBranch()
            this.branchArr = this.branchList
        }
    }
}
</script>
<style lang="scss" scoped>
.colred {
    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
.eltagtop {
    margin-bottom: 10px;
}
</style>
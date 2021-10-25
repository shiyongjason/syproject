<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入项目编号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入经销商" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">甲方名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.firstPartName" placeholder="请输入甲方名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目类别：</div>
                    <div class="query-col__input">
                        <el-select v-model="typeArr" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="(item,index) in typeList" :key="index" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">合作进度：</div>
                    <div class="query-col__input">
                        <el-select v-model="status" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="(item,index) in coopreation" :key="index" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">初审通过时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.minFirstApproveTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart(queryParams.maxFirstApproveTime)">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxFirstApproveTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd(queryParams.minFirstApproveTime)">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">材料审核通过时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.minFinalApproveTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart(queryParams.maxFinalApproveTime)">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxFinalApproveTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd(queryParams.minFinalApproveTime)">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                        <h-button type="primary" @click="searchList()">
                            查询
                        </h-button>
                        <h-button @click="onRest()">
                            重置
                        </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{projectData.total}} 项, 赊销总金额 {{loanData.totalLoanAmount?fundMoneys(loanData.totalLoanAmount):'0.00'}}, 设备款总额 {{loanData.totalDeviceAmount?fundMoneys(loanData.totalDeviceAmount):'0.00'}} 元 </el-tag>
            <!-- <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="false" :isAction="true" :actionMinWidth=300 ::rowKey="rowKey"
                :isShowIndex='true'>
                <template slot="contractAmount" slot-scope="scope">
                    {{scope.data.row.contractAmount?fundMoneys(scope.data.row.contractAmount):0}}
                </template>
                <template slot="type" slot-scope="scope">
                    {{scope.data.row.type&&typeList[scope.data.row.type-1]['value']||'-'}}
                </template>
                <template slot="status" slot-scope="scope">
                    {{onFiterStates(scope.data.row.status).length>0?onFiterStates(scope.data.row.status)[0].value:''}}

                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onLookproject(scope.data.row)">查看详情</el-button>
                    <el-button type="warning" size="mini" plain @click="onEditproject(scope.data.row)" v-if="scope.data.row.docAfterStatus!=3&&scope.data.row.status==3">修改</el-button>
                </template>
            </basicTable> -->
            <!--  -->
            <div class="page-table">
                <hosJoyTable localName="V3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total"
                    @pagination="searchList" actionWidth='260' isAction :isActionFixed='tableData&&tableData.length>0'>
                    <template slot="contractAmount" slot-scope="scope">
                        {{scope.data.row.contractAmount?fundMoneys(scope.data.row.contractAmount):'0.00'}}
                    </template>
                    <template slot="type" slot-scope="scope">
                        {{scope.data.row.type&&typeList[scope.data.row.type-1]['value']||'-'}}
                    </template>
                    <template slot="status" slot-scope="scope">
                        {{onFiterStates(scope.data.row.status).length>0?onFiterStates(scope.data.row.status)[0].value:''}}

                    </template>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onLookproject(scope.data.row)">查看详情</h-button>
                        <!--资料状态 1：待提交 2：已提交 3：审核通过 4：审核驳回 2的时候点进去能看到，但不能修改-->
                        <h-button table @click="onEditproject(scope.data.row)" v-if="scope.data.row.docAfterStatus!=3&&scope.data.row.status==3">修改</h-button>
                    </template>
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters, mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import filters from '@/utils/filters.js'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { TYPE_LIST, PROCESS_LIST, STATUS_LIST, COOPERATION_PROGRESS_LIST } from '../const'
import * as Auths from '@/utils/auth_const'
export default {
    name: 'projectlist',
    components: {
        hosJoyTable
    },
    data () {
        return {
            sums: [],
            crm_goodwork_detail: Auths.CRM_GOODWORK_DETAIL,
            categoryIdArr: [],
            branchArr: [],
            queryParams: {
                authCode: '', // 菜单路由
                jobNumber: '', // 工号
                pageNumber: 1,
                pageSize: 10,
                companyName: '', // 经销商
                firstPartName: '', // 甲方名称
                minFirstApproveTime: '', // 最小初审时间
                maxFirstApproveTime: '', // 最大初审时间
                minFinalApproveTime: '', // 最小料审核通过时间,
                maxFinalApproveTime: '', // 最大料审核通过时间
                pkDeptDoc: '', // 分部编码
                statusList: '', // 合作进度 1：待提交2：审核中 3：资料收集中 4：待立项 5：合作关闭 11：待终审 6：待签约 7：待放款 8：贷中 9：合作完成 10：信息待完善
                projectName: '', // 项目名称
                projectNo: '', // 项目编号
                // projectIds: [], // 工程id列表
                typeList: ''// 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
            },
            status: [],
            typeArr: [],
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            middleStatus: 0, // 0无文件 1有文件已提交 2有文件未提交
            tableLabel: [
                { label: '项目名称', prop: 'projectName', width: '150' },
                { label: '项目编号', prop: 'projectNo', width: '150' },
                { label: '所属分部', prop: 'deptName', width: '150' },
                { label: '赊销总额', prop: 'contractAmount', width: '150', displayAs: 'money' },
                { label: '经销商', prop: 'companyName', width: '180' },
                { label: '甲方名', prop: 'firstPartName', width: '180' },
                { label: '项目类别', prop: 'type', width: '120', slot: 'type' },
                {
                    label: '合作进度',
                    prop: 'status',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.status ? this.getStatusList(scope.row.status, scope.row.docProgress).value : '-'}</span>
                    }
                },
                { label: '初审通过时间', prop: 'firstApproveTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm' },
                { label: '数据更新时间', prop: 'updateTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm' },
                { label: '材料提交审核时间', prop: 'submitTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm' },
                { label: '材料审核通过时间', prop: 'checkTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm' }
            ],
            rowKey: '',
            multiSelection: [],
            typeList: TYPE_LIST,
            processList: PROCESS_LIST,
            statusList: STATUS_LIST,
            coopreation: COOPERATION_PROGRESS_LIST,
            loanData: {},
            title: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            projectData: 'projectInformation/projectData',
            projectLoan: 'projectInformation/projectLoan',
            crmdepList: 'crmmanage/crmdepList'
            // punchList: 'projectInformation/punchList',
            // projectRecord: 'projectInformation/projectRecord'
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
            findProjetpage: 'projectInformation/findProjetpage',
            findProjectLoan: 'projectInformation/findProjectLoan',
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findProjectrecord: 'projectInformation/findProjectrecord',
            findPunchlist: 'projectInformation/findPunchlist'

        }),
        pickerOptionsStart (date) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = date
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd (date) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = date
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        onLookproject (row) {
            this.$router.push({ path: '/goodwork/approvalDetails', query: { projectId: row.projectId, status: row.status, docAfterStatus: row.docAfterStatus } })
        },
        onEditproject (row) {
            this.$router.push({ path: '/goodwork/informationDetail', query: { projectId: row.projectId, status: row.status, docAfterStatus: row.docAfterStatus } })
        },
        fundMoneys (val) {
            if (val) {
                return filters.moneyFormat(val)
            }
        },
        onFiterStates (val) {
            return this.coopreation.filter((v) => {
                return v.key == val
            })
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
        async searchList () {
            this.queryParams.statusList = this.status.toString()
            this.queryParams.typeList = this.typeArr.toString()
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
        async onGetbranch () {
            // 分部下拉接口
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: JSON.parse(sessionStorage.getItem('authCode')) })
            this.branchArr = this.crmdepList
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
</style>

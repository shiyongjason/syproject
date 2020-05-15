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
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=300 ::rowKey="rowKey"
                :isShowIndex='true'>

                <template slot="predictLoanAmount" slot-scope="scope">
                    {{fundMoneys(scope.data.row.predictLoanAmount)}}
                </template>
                <template slot="type" slot-scope="scope">
                    {{scope.data.row.type&&typeList[scope.data.row.type-1]['value']}}
                </template>
                <template slot="progress" slot-scope="scope">
                    {{onFiterStates(scope.data.row.status).length>0?onFiterStates(scope.data.row.status)[0].value:''}}
                    <!-- {{scope.data.row.status&&statusList[scope.data.row.status-2]['value']}} -->
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onLookproject(scope.data.row.id)" v-if="hosAuthCheck(crm_goodwork_detail)">查看详情</el-button>
                    <el-button type="warning" size="mini" plain @click="onLookrecord(scope.data.row,1)">审批记录</el-button>
                    <el-button v-if="scope.data.row.pushRecord" type="info" size="mini" plain @click="onLookrecord(scope.data.row,2)">打卡记录</el-button>
                </template>
            </basicTable>
        </div>
        <projectDrawer :drawer=drawer @backEvent='restDrawer' ref="drawercom"></projectDrawer>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
            <div class="project-record" v-if="title=='项目审批记录'">
                <el-timeline>
                    <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in dialogRecord" :key=item.id>
                        <el-card>
                            <p><span>操作人：</span> {{item.createBy}}{{item.createByMobile?'('+item.createByMobile+')':''}}</p>
                            <p><span>操作内容：</span> {{item.remark}}</p>
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
    <img :src="dialogImageUrl" alt="" >
            </div>

        </el-dialog>
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
                { label: '项目名称', prop: 'projectName', width: '' },
                { label: '项目编号', prop: 'projectNo', width: '150' },
                { label: '所属分部', prop: 'deptName', width: '150' },
                { label: '赊销总额', prop: 'predictLoanAmount', width: '150' },
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
            projectRecord: 'crmmanage/projectRecord',
            punchList: 'crmmanage/punchList',
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
            findProjectrecord: 'crmmanage/findProjectrecord',
            findPunchlist: 'crmmanage/findPunchlist',
            findBranch: 'findBranch'
        }),
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
            this.$refs.drawercom.onFindProjectDetail(val)
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
        },
        onHandlePictureCardPreview (val) {
            this.dialogImageUrl = val.punchImageUrl
            this.imgVisible = true
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
        width:95px;
        height: 95px;
        overflow: hidden;
        img {
            width: 95px;
            height: 100%;
        }
    }
}
.previewimg{
    text-align: center;
    img{
        width: 500px;
        padding: 10px;
    }
}
</style>
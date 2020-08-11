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
                        <el-select v-model="queryParams.projectName" placeholder="请选择" :clearable=true>
                            <el-option :label="item.value" :value="item.key" v-for="item in registeor" :key="item.key"></el-option>
                        </el-select>
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
                        <h-button type='primary'>查询</h-button>
                        <h-button type='primary'>重置</h-button>
                        <h-button type='assist'>数据分析</h-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop"></el-tag>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" @pagination="searchList"
                actionWidth='300' isAction :isActionFixed='tableData&&tableData.length>0'>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onLookDetail()">查看详情</h-button>
                </template>
            </hosJoyTable>
        </div>
        <detailDrawer ref="detailDrawer"></detailDrawer>
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters, mapState } from 'vuex'
import { REGISTEROR } from '../const'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import * as Auths from '@/utils/auth_const'
import detailDrawer from './components/detailDrawer'
export default {
    name: 'projectlist',
    data () {
        return {
            registeor: REGISTEROR,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: ''
            },
            tableLabel: [
                { label: '姓名', prop: 'projectName', width: '150', showOverflowTooltip: true },
                { label: '类型', prop: 'address', width: '150', showOverflowTooltip: true },
                { label: '性别', prop: 'projectNo', width: '150', showOverflowTooltip: true },
                { label: '是否注册', prop: 'deptName', width: '150', showOverflowTooltip: true },
                { label: '注册账号', prop: 'companyName', width: '180', showOverflowTooltip: true },
                { label: '所属分部', prop: 'firstPartName', width: '180', showOverflowTooltip: true },
                { label: '添加人', prop: 'type', width: '120', slot: 'type', showOverflowTooltip: true },
                { label: '添加时间', prop: 'updateTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm:ss', sortable: 'custom', showOverflowTooltip: true }
            ],
            rowKey: '',
            tableData: [{ projectName: '123' }],
            branchArr: [],
            paginationInfo: {},
            drawer: false
        }
    },
    components: {
        hosJoyTable, detailDrawer
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
            crmdepList: 'crmmanage/crmdepList'
        })
    },
    async mounted () {
        this.onGetbranch()
        this.searchList()
    },
    methods: {
        ...mapActions({
            findProjetpage: 'crmmanage/findProjetpage',
            findProjectLoan: 'crmmanage/findProjectLoan',
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findProjectrecord: 'crmmanage/findProjectrecord',
            findPunchlist: 'crmmanage/findPunchlist'
        }),
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
            this.branchArr = this.crmdepList
        },
        searchList () {

        },
        onLookDetail (val) {
            this.$refs.detailDrawer.onFindCustomer(val)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>

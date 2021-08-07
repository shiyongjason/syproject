<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">姓名：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.name" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.type" placeholder="请选择" :clearable=true>
                            <el-option :label="item.value" :value="item.key" v-for="item in wxTypeList" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">是否注册：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.register" placeholder="请选择" :clearable=true>
                            <el-option :label="item.value" :value="item.key" v-for="item in registeor" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">注册账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.mobile" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.pkDeptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">添加人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.psnname" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">添加时间：</div>
                    <div class="query-col__input">
                        <!-- <el-date-picker v-model="queryParams.minCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker> -->
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type='primary' @click="searchList(1)">查询</h-button>
                    <h-button @click="onRest">重置</h-button>
                    <h-button type='assist' @click="onLookDetail(2)">数据分析</h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{tableLoan.totalNum||0}},已注册：{{tableLoan.registerUserNum||0}},未注册:{{tableLoan.waitRegisterUserNum||0}}</el-tag>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" @pagination="searchList"
                actionWidth='300' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange' isSimpleTable :localName="'v3.5.0'">
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onLookDetail(1,scope.data.row)">查看详情</h-button>
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
import detailDrawer from './components/detailDrawer'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'projectlist',
    data () {
        return {
            registeor: REGISTEROR,
            wxTypeList: [{ key: '', value: '全部' }, { key: 1, value: '微信' }, { key: 2, value: '企业微信' }],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                externalUserid: '',
                gender: '',
                maxCreateTime: '',
                minCreateTime: '',
                mobile: '',
                name: '',
                pkDeptDoc: '',
                psnCodes: '',
                psnMobile: '',
                psncode: '',
                psnname: '',
                register: '',
                type: '',
                field: 'create_time',
                sort: 'desc'
            },
            tableLabel: [
                { label: '姓名', prop: 'name', width: '150', showOverflowTooltip: true },
                { label: '类型', prop: 'type', width: '150', showOverflowTooltip: true, dicData: [{ value: 1, label: '微信' }, { value: 2, label: '企业微信' }] },
                { label: '性别', prop: 'gender', width: '150', showOverflowTooltip: true, dicData: [{ value: 1, label: '男' }, { value: 2, label: '女' }] },
                { label: '是否注册', prop: 'register', width: '150', showOverflowTooltip: true, dicData: [{ value: true, label: '是' }, { value: false, label: '否' }] },
                { label: '注册账号', prop: 'mobile', width: '180', showOverflowTooltip: true },
                { label: '所属分部', prop: 'deptName', width: '180', showOverflowTooltip: true },
                { label: '添加人', prop: 'psnname', width: '120', showOverflowTooltip: true },
                { label: '添加时间', prop: 'createTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm:ss', sortable: 'custom', showOverflowTooltip: true }
            ],
            rowKey: '',
            tableData: [],
            tableLoan: {},
            branchArr: [],
            paginationInfo: {},
            drawer: false,
            copyParams: {}
        }
    },
    components: {
        hosJoyTable, detailDrawer
    },
    computed: {
        // pickerOptionsStart () {
        //     return {
        //         disabledDate: (time) => {
        //             let beginDateVal = this.queryParams.maxCreateTime
        //             if (beginDateVal) {
        //                 return time.getTime() > new Date(beginDateVal).getTime()
        //             }
        //         }
        //     }
        // },
        // pickerOptionsEnd () {
        //     return {
        //         disabledDate: (time) => {
        //             let beginDateVal = this.queryParams.minCreateTime
        //             if (beginDateVal) {
        //                 return time.getTime() < new Date(beginDateVal).getTime()
        //             }
        //         }
        //     }
        // },
        options () {
            return {
                type: 'datetime',
                placeholder: '选择日期',
                valueFormat: 'yyyy-MM-dd HH:mm',
                format: 'yyyy-MM-dd HH:mm',
                startTime: this.queryParams.minCreateTime,
                endTime: this.queryParams.maxCreateTime
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            wxMemberpage: 'wxMember/wxMemberpage',
            wxCustomerstaic: 'wxMember/wxCustomerstaic',
            crmdepList: 'crmmanage/crmdepList'
        })
    },
    async mounted () {
        this.copyParams = deepCopy(this.queryParams)
        this.onGetbranch()
        this.searchList()
    },
    methods: {
        ...mapActions({
            findwxMemberpage: 'wxMember/findwxMemberpage',
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findCustomerstatic: 'wxMember/findCustomerstatic'
        }),
        onStartChange (val) {
            this.queryParams.minCreateTime = val
        },
        onEndChange (val) {
            this.queryParams.maxCreateTime = val
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
            this.branchArr = this.crmdepList
        },
        onRest () {
            this.queryParams = deepCopy(this.copyParams)
            this.searchList(1)
        },
        async searchList (val) {
            if (val == 1) { this.queryParams.pageNumber = val }
            await this.findwxMemberpage(this.queryParams)
            this.tableData = this.wxMemberpage.records
            this.paginationInfo = {
                pageNumber: this.wxMemberpage.current,
                pageSize: this.wxMemberpage.size,
                total: this.wxMemberpage.total
            }
            await this.findCustomerstatic(this.queryParams)
            this.tableLoan = this.wxCustomerstaic
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        onLookDetail (type, val) {
            this.$refs.detailDrawer.onFindCustomer(type, val)
        },
        sortChange (e) {
            console.log('e: ', e)
            if (e.prop == 'createTime') {
                // this.queryParams.field = 'predict_loan_amount'
                this.queryParams.sort = e.order === 'ascending' ? 'asc' : 'desc '
            }
            this.searchList()
        }
    }
}
</script>
<style lang="scss" scoped>
.eltagtop {
    margin-bottom: 10px;
}
</style>

<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">合同名称/编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.companyName" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">合同类型：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.companyName" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>

            </div>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.companyName" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">发起人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">发起时间：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" :editable="false"  v-model="queryParams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('queryParams')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" :editable="false"  v-model="queryParams.endDate"  value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('queryParams')">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="query-cont__row">
               <div class="query-cont-col">
                    <div class="query-col-title">更新时间：</div>
                    <div class="query-col-input">
                        <el-date-picker type="date" :editable="false"  v-model="queryParams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('queryParams')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="date" :editable="false"  v-model="queryParams.endDate"  value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('queryParams')">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary">
                        查询
                    </h-button>
                    <h-button>
                        重置
                    </h-button>
                </div>
            </div>
            <div class="query-cont__row">
                    <el-badge :value="12" class="item"><h-button type="primary">待分财修订</h-button></el-badge>
                    <el-badge :value="12" class="item" style="margin:0 30px"><h-button type="">待分财修订</h-button></el-badge>
                    <el-badge :value="12" class="item"><h-button type="">待分财修订</h-button></el-badge>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 项</el-tag>
            </div>
            <hosJoyTable localName="V3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total"
                @pagination="searchList" actionWidth='260' isAction :isActionFixed='tableData&&tableData.length>0'  @sort-change='sortChange'>
                <template slot="action" slot-scope="scope">
                    <h-button table>分财审核</h-button>
                    <h-button table>查看合同</h-button>
                </template>
            </hosJoyTable>
        </div>
        <!---->

    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { mapActions, mapGetters, mapState } from 'vuex'
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
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                companyName: '',
                startDate: '',
                endDate: ''
            },
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '200' },
                { label: '合同编号', prop: 'userAccount', width: '120' },
                { label: '合同名称', prop: 'userAccount', width: '120' },
                { label: '所属分部', prop: 'userAccount', width: '120' },
                { label: '项目', prop: 'userAccount', width: '120' },
                { label: '合同模版编号', prop: 'userAccount', width: '120' },
                { label: '合同模版版本', prop: 'userAccount', width: '120' },
                { label: '合同类型', prop: 'userAccount', width: '120' },
                { label: '状态', prop: 'userAccount', width: '120', dicData: [{ value: 1, label: '项目跟踪阶段' }, { value: 2, label: '招投标' }, { value: 3, label: '合同已签订' }, { value: 4, label: '项目已开工' }] },
                { label: '发起人', prop: 'userAccount', width: '120' },
                { label: '发起时间', prop: 'userAccount', width: '120', sortable: 'custom', displayAs: 'YYYY-MM-DD HH:mm:ss' },
                { label: '更新时间', prop: 'userAccount', width: '120', sortable: 'custom', displayAs: 'YYYY-MM-DD HH:mm:ss' }
            ],
            tableData: [{ companyName: '勇哥', userAccount: '123' }, { companyName: '勇哥', userAccount: '123' }],
            ver_drawer: false
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
        searchList () {
            console.log('searchList')
        },
        pickerOptionsStart (key) {
            return {
                disabledDate: time => {
                    let endDateVal = this[key].endDate
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd (key) {
            return {
                disabledDate: time => {
                    let beginDateVal = this[key].startDate
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
        onShowVer () {
            this.ver_drawer = true
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
            }
            this.searchList()
        }
    },
    async beforeMount () {
        await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
        this.branchArr = this.crmdepList
    }
}
</script>
<style scoped lang="scss">
.tag_top {
    margin: 10px 0;
}
</style>
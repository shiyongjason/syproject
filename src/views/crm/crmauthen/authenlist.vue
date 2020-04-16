<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">管理员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入管理员账号" maxlength="50"></el-input>
                    </div>
                </div>
                   <div class="query-cont-col">
                    <div class="query-col-title">管理员姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入管理员姓名" maxlength="50"></el-input>
                    </div>
                </div>
                     <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入管理员姓名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-col-input">
                          <el-cascader placeholder="试试搜索： 南京" :options="options" v-model="optarr" :clearable=true
                          :collapse-tags=true :show-all-levels="true" @change="cityChange"
                          :props="{ multiple: true ,value:'countryId',label:'name',children:'cities'}" filterable>
                        </el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">企业类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.status">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in businessTypelist" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                 <div class="query-cont-col">
                    <div class="query-col-title">金融风险：</div>
                    <div class="query-col-input">
                       <el-select v-model="queryParams.status">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in riskTypelist" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">关联/认证时间：</div>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
             <el-tag size="medium" class="eltagtop">已筛选 {{projectData.total}} 项,体系内 <b>1</b>;体系外 <b>1</b>;白名单 <b>1</b>;黑名单 <b>1</b></el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange"  @onSortChange="onSortChange"
             @onSizeChange="handleSizeChange"  :isMultiple="false" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey"
                :isShowIndex='true'>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onLookauthen(scope.data.row.id)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
        <businessDrawer :drawer=drawer @backEvent='restDrawer' ref="drawercom"></businessDrawer>
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import businessDrawer from './components/businessDrawer'
import { BUS_TYPE_LIST, RISK_TYPE_LIST } from '../const'

export default {
    name: 'projectlist',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                firstPartName: '',
                maxSubmitTime: '',
                maxUpdateTime: '',
                minSubmitTime: '',
                minUpdateTime: ''
            },
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '企业名称', prop: 'projectName', width: '180' },
                { label: '管理员账号', prop: 'projectNo', width: '180' },
                { label: '管理员姓名', prop: 'predictLoanAmount' },
                { label: '所属分部', prop: 'companyName', width: '180' },
                { label: '经营区域', prop: 'firstPartName' },
                { label: '企业类型', prop: 'type', width: '120' },
                { label: '金融风险', prop: 'progress', width: '120' },
                { label: '关联认证时间', prop: 'submitTime', width: '150', formatters: 'dateTimes', sortable: true }
            ],
            rowKey: '',
            multiSelection: [],
            options: [],
            optarr: '',
            businessTypelist: BUS_TYPE_LIST,
            riskTypelist: RISK_TYPE_LIST,
            drawer: false
        }
    },
    components: {
        businessDrawer
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
        ...mapGetters('crmmanage', {
            projectData: 'projectData',
            projectLoan: 'projectLoan'
        }),
        ...mapGetters({
            nestDdata: 'nestDdata'
        })
    },
    async mounted () {
        // this.searchList()
        this.copyParams = deepCopy(this.queryParams)
        this.getFindNest()
        this.tableData = [
            { projectName: '11' }
        ]
    },
    methods: {
        ...mapActions('crmmanage', {
            findProjetpage: 'findProjetpage',
            findProjectLoan: 'findProjectLoan'
        }),
        ...mapActions({
            findNest: 'findNest'
        }),
        async getFindNest () {
            await this.findNest()
            this.options = this.nestDdata && this.nestDdata.map(item => {
                item.countryId = item.provinceId
                item.cities.map(value => {
                    value.cities = value.countries
                    value.countryId = value.cityId
                })
                return item
            })
        },
        onRest () {
            this.categoryIdArr = []
            this.queryParams = deepCopy(this.copyParams)
            this.status = []
            this.typeArr = []
            this.searchList()
        },
        cityChange () {

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
            const { ...params } = this.queryParams
            await this.findProjetpage(params)
            this.tableData = this.projectData.records
            this.paginationInfo = {
                pageNumber: this.projectData.current,
                pageSize: this.projectData.size,
                total: this.projectData.total
            }
            await this.findProjectLoan(params)
            this.loanData = this.projectLoan
        },
        onSortChange (val) {
            console.log(val)
        },
        onLookauthen (val) {
            this.drawer = true
            // this.$refs.drawercom.onFindProjectDetail(val)
        },
        restDrawer () {
            this.drawer = false
            this.searchList()
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
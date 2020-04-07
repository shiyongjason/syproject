<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="flex-wrap-title">mis编码：</div>
                    <div class="flex-wrap-cont">
                        <el-input v-model="searchParams.misCode" placeholder="请输入mis编码"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司名：</div>
                    <div class="query-col-input">
                        <HAutocomplete ref="HAutocomplete" :selectArr="platformData" v-if="platformData" @back-event="backPlat" :placeholder="'请输入平台公司名'" :remove-value='removeValue'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-cont-title">分部：</div>
                    <div class="query-cont-input">
                        <el-select v-model="searchParams.subsectionCode" placeholder="选择" :clearable=true>
                            <el-option v-for="item in branchList" :key="item.subsectionCode" :label="item.subsectionName" :value="item.subsectionCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="searchParams.startTime" :editable="false" :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="searchParams.endTime" :editable="false" :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">上线状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="searchParams.incremental" placeholder="请选择选择" :clearable=true>
                            <el-option v-for="item in incrementalList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">好享家注资：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="searchParams.incremental" placeholder="请选择选择" :clearable=true>
                            <el-option v-for="item in incrementalList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">资金支持
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">1、无支持：资金敞口占用+资金借款占用+资金分授信=0<br />2、有支持：资金敞口占用+资金借款占用+资金分授信≠0</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>：
                    </div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="searchParams.incremental" placeholder="请选择选择" :clearable=true>
                            <el-option v-for="item in incrementalList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" @click="onSearch()">搜索
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250>
                    <template slot="updateTime" slot-scope="scope">
                        {{scope.data.row.updateTime | formatDate('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>
<script>
// import { findSubsectionList, findTableList, getCompany, getCityList } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapState } from 'vuex'
import { CAPITAL_EFFICIENCY_TABLE } from './const'
export default {
    data () {
        return {
            platformData: [],
            removeValue: false,
            tableLabel: CAPITAL_EFFICIENCY_TABLE,
            incrementalList: [{ key: '', value: '全部' }, { key: 1, value: '增量' }, { key: 0, value: '存量' }],
            searchParams: {
                subsectionCode: '',
                misCode: '',
                incremental: '',
                pageNumber: 1,
                pageSize: 10,
                startTime: '',
                endTime: ''
            },
            branchList: [],
            tableData: [],
            paginationData: {},
            companyList: []
        }
    },
    components: {
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.searchParams.endTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.searchParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        // if (this.userInfo.oldDeptCode !== 'top') {
        //     this.searchParams.subsectionCode = this.userInfo.oldDeptCode
        // }
        // this.companyData.params.companyCode = this.userInfo.oldDeptCode
        // this.cityData.params.companyCode = this.userInfo.oldDeptCode
        // this.onFindBranchList(this.userInfo.oldDeptCode)
        // this.getCompanyList()
    },
    methods: {
        async onSearch () {
            // const { data } = await findTableList(this.searchParams)
            // console.log(data)
            // this.tableData = data.data.list
            // this.paginationData = {
            //     pageSize: data.data.pageSize,
            //     pageNumber: data.data.pageNum,
            //     total: data.data.total
            // }
        },
        async onFindBranchList (value) {
            // const { data } = await findSubsectionList({ companyCode: value })
            // this.branchList = data.data
        },
        onCurrentChange (val) {
            console.log(222)
            this.searchParams.pageNumber = val.pageNumber
            this.onSearch()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onSearch()
        },
        backPlat (value) {
            // this.queryParams.loanCompanyCode = value.value.companyCode ? value.value.companyCode : ''
            // this.queryParams.loanCompanyName = value.value.companyShortName ? value.value.companyShortName : ''
        },
        async getCompanyList () {
            // this.companyData.params.companyCode = this.userInfo.companyCode
            // const { data } = await getCompany({ companyCode: this.userInfo.oldDeptCode })
            // this.companyList = data.data
            // this.companyList && this.companyList.map(item => {
            //     item.value = item.companyShortName
            //     item.selectCode = item.misCode
            // })
        }
    }
}
</script>
<style lang="scss" >
.red {
    color: red !important;
}
.download {
    text-decoration: none;
    color: #ffffff;
    background: #f88825;
    line-height: 38px;
    border-radius: 4px;
    padding: 0 12px;
}
</style>

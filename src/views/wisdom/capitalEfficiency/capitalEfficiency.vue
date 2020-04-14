<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="flex-wrap-title">mis编码：</div>
                    <div class="flex-wrap-cont">
                        <el-input :disabled='disabled' v-model="queryParams.misCode" placeholder="请输入mis编码"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-cont-title">分部：</div>
                    <div class="query-cont-input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="选择" :clearable=true @change="onChange">
                            <el-option v-for="item in branchList" :key="item.deptCode" :label="item.deptName" :value="item.crmDeptCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司名：</div>
                    <div class="query-col-input">
                        <HAutocomplete :disabled='disabled' ref="HAutocomplete" :selectArr="platformData" v-if="platformData" @back-event="backPlat" :placeholder="'请输入平台公司名'" :remove-value='removeValue'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryParams.startDate" :clearable='false' :editable="false" :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endDate" :clearable='false' :editable="false" :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">上线状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.onlineStatus" placeholder="请选择选择" :clearable=true>
                            <el-option v-for="item in onlineStatus" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">好享家注资：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.capital" placeholder="请选择选择" :clearable=true>
                            <el-option v-for="item in  hosjoyInjection" :key="item.key" :label="item.value" :value="item.key">
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
                        <el-select v-model="queryParams.financialSupport" placeholder="请选择选择" :clearable=true>
                            <el-option v-for="item in financialSupport" :key="item.key" :label="item.value" :value="item.key">
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
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 @field-change="onFieldChange">
                    <template slot="remark" slot-scope="scope">
                        <span>{{scope.data.row.remark ? scope.data.row.remark.substring(0, 6) + '...' : '-'}}<i class="el-icon-edit cursor" @click="shy(scope.data.row)"></i></span>
                    </template>
                </basicTable>
            </div>
        </div>
        <el-dialog title="备注" :visible.sync="dialogVisible" :close-on-click-modal='false' width="450px" :before-close='onCancle'>
            <h3 style="margin-bottom: 10px;">备注：</h3>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" maxlength="1000" v-model="rowData.remark" show-word-limit></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancle">取 消</el-button>
                <el-button type="primary" @click="onSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import { getEfficiencyList, updataRemark } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapState } from 'vuex'
import { CAPITAL_EFFICIENCY_TABLE, ONLINESTATUS, HOSJOYINJECTION, FINANCIALSUPPORT } from './const'
import { departmentAuth } from '@/mixins/userAuth'
export default {
    name: 'capitalEfficiency',
    mixins: [departmentAuth],
    data () {
        return {
            removeValue: false,
            tableLabel: CAPITAL_EFFICIENCY_TABLE,
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            onlineStatus: ONLINESTATUS,
            hosjoyInjection: HOSJOYINJECTION,
            financialSupport: FINANCIALSUPPORT,
            searchParams: {},
            queryParams: {
                misCode: '',
                subsectionCode: '',
                loanCompanyCode: '',
                loanCompanyName: '',
                startDate: moment().format('YYYY-MM-') + '01',
                endDate: moment().format('YYYY-MM-DD'),
                capital: '', // 好享家注资
                companyType: 1, // 查询维度
                financialSupport: '', // 资金支持
                onlineStatus: '', // 上线状态
                pageNumber: 1,
                pageSize: 10
            },
            dialogVisible: false,
            rowData: {},
            disabled: false
        }
    },
    components: {
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            branchList: (state) => state.branchList,
            platformData: (state) => {
                for (let i of state.platformData) {
                    i.value = i.companyShortName
                    i.selectCode = i.companyCode
                }
                return state.platformData
            }
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endDate
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startDate
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    async mounted () {
        this.onSearch()
        await this.oldAuth()
        if (this.userInfo.deptType == 2) {
            this.queryParams.subsectionCode = this.branchList[0].crmDeptCode
        }
    },
    methods: {
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async onQuery () {
            console.log(this.searchParams)
            const { data } = await getEfficiencyList(this.searchParams)
            console.log(data)
            this.tableData = data.records
            this.paginationData = {
                pageSize: data.size,
                pageNumber: data.current,
                total: data.total
            }
        },
        onFieldChange (val) {
            if (!val.includes('平台公司')) {
                this.disabled = true
                this.queryParams.companyType = 2
                this.queryParams.companyCode = ''
                this.queryParams.companyName = ''
                this.queryParams.misCode = ''
                this.removeValue = !this.removeValue
            } else {
                this.disabled = false
                this.queryParams.companyType = 1
            }
            this.onQuery()
            if (!val.includes('分部')) {
                val.push('分部')
            }
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        backPlat (value) {
            this.queryParams.loanCompanyCode = value.value.companyCode ? value.value.companyCode : ''
            this.queryParams.loanCompanyName = value.value.companyShortName ? value.value.companyShortName : ''
        },
        onChange (subsectionCode) {
            this.removeValue = !this.removeValue
            this.onFindPlatformslist(subsectionCode)
        },
        shy (row) {
            console.log(row)
            this.rowData = row
            this.dialogVisible = true
        },
        onCancle () {
            this.dialogVisible = false
        },
        async onSure () {
            let params = { ...this.rowData }
            if (this.queryParams.companyType == 1) {
                params = {
                    ...params,
                    code: this.rowData.loanCompanyCode,
                    id: this.rowData.efficiencyRemarkId
                }
            } else {
                params = {
                    ...params,
                    code: this.rowData.subsectionCode,
                    id: this.rowData.efficiencyRemarkId
                }
            }
            await updataRemark(params)
            this.onCancle()
            this.onQuery()
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
.cursor {
    cursor: pointer;
}
</style>

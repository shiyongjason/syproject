<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-cont-title">分部：</div>
                    <div class="query-cont-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司名：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">MIS编码：</div>
                    <div class="flex-wrap-cont">
                        <el-input :disabled='disabled' v-model="queryParams.misCode" placeholder="请输入MIS编码"></el-input>
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
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 @field-change="onFieldChange" :showCheckAll='false'>
                    <template slot="remark" slot-scope="scope">
                        <span v-if="scope.data.row.misCode == '合计'">-</span>
                        <span v-else>{{scope.data.row.remark ? scope.data.row.remark.substring(0, 6) + '...' : '-'}}<i class="el-icon-edit cursor" @click="onRemark(scope.data.row)"></i></span>
                    </template>
                </basicTable>
            </div>
        </div>
        <el-dialog title="备注" :visible.sync="dialogVisible" :close-on-click-modal='false' width="450px" :before-close='onCancle'>
            <br>
            <el-input type="textarea" :rows="8" placeholder="请输入内容" maxlength="1000" v-model="rowData.remark" show-word-limit></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancle">取 消</el-button>
                <el-button type="primary" @click="onSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import { getEfficiencyList, updataRemark, getEfficiencyTotal } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapState } from 'vuex'
import { CAPITAL_EFFICIENCY_TABLE, ONLINESTATUS, HOSJOYINJECTION, FINANCIALSUPPORT } from './const'
import { departmentAuth } from '@/mixins/userAuth'
export default {
    name: 'capitalEfficiency',
    mixins: [departmentAuth],
    data () {
        return {
            selectAuth: {
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
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
                companyType: 1, // 查询维度 1：平台公司维度 2：分部维度
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
            platformData: state => state.platformData
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
        await this.newBossAuth()
        if (this.userInfo.deptType == 2) {
            this.queryParams.subsectionCode = this.branchList[0].pkDeptDoc
        }
    },
    methods: {
        async onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async onQuery () {
            const promiseArr = [getEfficiencyList(this.searchParams), getEfficiencyTotal(this.searchParams)]
            var data = await Promise.all(promiseArr).then((res) => {
                res[1].data.misCode = '合计'
                res[0].data.records.unshift(res[1].data)
                return res[0].data
            }).catch((error) => {
                this.$message.error(`error:${error}`)
            })
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
                this.queryParams.loanCompanyCode = ''
                this.queryParams.loanCompanyName = ''
                this.queryParams.misCode = ''
            } else {
                this.disabled = false
                this.queryParams.companyType = 1
            }
            this.tableData = []
            this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        backPlat (val, dis) {
            if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage()
            } else if (dis === 'P') {
                this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
                this.queryParams.loanCompanyCode = val.value.companyCode ? val.value.companyCode : ''
                this.queryParams.loanCompanyName = val.value.companyShortName ? val.value.companyShortName : ''
            }
        },
        linkage () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.queryParams.misCode = ''
            this.queryParams.loanCompanyCode = ''
            this.queryParams.loanCompanyName = ''
            this.selectAuth.platformObj = obj
        },
        onRemark (row) {
            this.rowData = { ...row }
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
<style lang="scss" scoped>
// 台账专属表格样式
/deep/.el-table td,
/deep/ .el-table th {
    padding: 7px 0;
}
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

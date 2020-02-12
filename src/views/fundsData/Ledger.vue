<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">MIS编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.misCode" placeholder="请输入MIS编码">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">平台公司名：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.customerName" placeholder="请输入平台公司名">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.branch" clearable>
                        <el-option v-for="(item,index) in statusIdType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">台账编号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.ledger" placeholder="请输入台账编号">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <!-- 按钮权限 -->
            <div class="query-cont-col" v-if="hosAuthCheck(reCheckAuth)">
                <el-button type="primary" class="ml20" @click="dialogVisible = true">新增台账</el-button>
                <el-button type="primary" class="ml20" @click="onExportTemplate">导入模板导出</el-button>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/amount/rate/import'" :on-success="isSuccess" :on-error="isError" auto-upload>
                    <el-button type="primary" class="ml20">
                        台账导入
                    </el-button>
                </el-upload>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onExportLedger">台账导出</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="流贷" name="流贷"></el-tab-pane>
                <el-tab-pane label="分授信" name="分授信"></el-tab-pane>
                <el-tab-pane label="敞口" name="敞口"></el-tab-pane>
            </el-tabs>
            <el-tabs v-model="produce" type="card" @tab-click="handleClick">
                <el-tab-pane label="好信用" name="好信用"></el-tab-pane>
                <el-tab-pane label="供应链" name="供应链"></el-tab-pane>
                <el-tab-pane label="好橙工" name="好橙工"></el-tab-pane>
            </el-tabs>   
            {{activeName}}
            {{produce}}         
            <complexTable :tableData='tableData' :pagination='pagination' :source='activeName' @getList='getList'/>
        </div>
        <newLedger :dialogVisible='dialogVisible' @onClose='onClose'/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { interfaceUrl } from '@/api/config'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import complexTable from './components/complexTable.vue'
import newLedger from './components/dialog/newLedger.vue'
import { JINYUN_AMOUNT_IMPORT_IMPORT, JINYUN_AMOUNT_IMPORT_RE_CHECK } from '@/utils/auth_const'
export default {
    name: 'amountImport',
    components: { complexTable, newLedger },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeEnd
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeStart
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        isMultiple () {
            return this.hosAuthCheck(this.reCheckAuth)
        }
    },
    watch: {
        activeName (val) {
            if (val == '流贷') {
                this.isTab = true
            } else {
                this.isTab = false
            }
        }
    },
    data () {
        return {
            activeName: '流贷',
            produce: '好信用',
            importAuth: JINYUN_AMOUNT_IMPORT_IMPORT,
            reCheckAuth: JINYUN_AMOUNT_IMPORT_RE_CHECK,
            interfaceUrl: interfaceUrl,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                misCode: '',
                customerName: '',
                branch: '',
                ledger: '',
                activeName: '流贷',
                produce: '好信用'
            },
            searchParams: {},
            tableData: [
                {}, {}
            ],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            addTags: {
                labelName: '',
                labelType: '1'
            },
            multipleSelection: [],
            tableLabel: [
                { label: '客户名称', prop: 'customerName' },
                { label: 'MIS编码', prop: 'misCode' },
                { label: '年度最高额（元）', prop: 'yearlyQuota', formatters: 'money' },
                { label: '月度滚动额（元）', prop: 'monthlyQuota', formatters: 'money' },
                { label: '应收账款扣减额（元）', prop: 'accountReceivableQuota', formatters: 'money' },
                { label: '初始实时用信额（元）', prop: 'dailyQuota', formatters: 'money' },
                { label: '实际实时用信额（元）', prop: 'realDailyQuota', formatters: 'money' },
                { label: '本月利率(年化）', prop: 'dailyInterestRate' },
                { label: '创建日期', prop: 'importDate' },
                { label: '当前状态', prop: 'statusId' }
            ],
            statusIdType: [
                { value: '', label: '请选择分部' },
                { value: '001', label: '南京' },
                { value: '000', label: '上海' },
                { value: '002', label: '北京' }
            ],
            dialogVisible: false,
            content: '',
            status: '',
            // 控制权限
            isTab: true,
            multiSelect: [],
            changeTable: true,
            column: [
                {
                    prop: 'misCode',
                    label: 'MIS编码',
                    width: '100',
                    fixed: true
                },
                { prop: 'companyShortName', label: '平台公司名', fixed: true, width: '120' },
                { prop: 'subsectionName', label: '分部', fixed: true },
                {
                    label: '销售收入与成本/万',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.expandSell, 1) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'salesIncomeIncludingTax',
                            label: '销售收入（含税）/万',
                            width: '150',
                            displayAs: 'money'
                        }
                    ]
                }
            ]
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        handleExpand (scope, expandSellrr, num) {
            this.$set(this.column[scope.$index], '_expand', !this.column[scope.$index]._expand)
            if (this.column[scope.$index]._expand) {
                this.column[scope.$index].children = this.column[scope.$index].children.concat(expandSellrr)
            } else {
                this.column[scope.$index].children = this.column[scope.$index].children.slice(0, num)
                this.changeTable = false
                this.$nextTick(() => { this.changeTable = true })
            }
        },
        getList () {

        },
        onClose () {
            this.dialogVisible = false
        },
        // 埋点
        tracking (event) {
            this.$store.dispatch('tracking', {
                type: 9,
                event,
                page: 2,
                page_name: '额度导入',
                page_path_name: 'amountImport'
            })
        },
        onExportTemplate () { // 模板导出
            // var url = ''
            // for (var key in this.queryParams) {
            //     url += (key + '=' + this.queryParams[key] + '&')
            // }
            // location.href = interfaceUrl + 'ets/api/b2b/activity/export?' + url
        },
        onExportLedger () { }, // 台账导出
        handleClick () {
            this.onSearch()
        },
        multiSelection (val) {
            this.multiSelect = val
        },
        isSuccess (response) {
            this.$message({
                message: '批量导入成功！',
                type: 'success'
            })
            this.onSearch()
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + JSON.parse(response.message).message,
                type: 'error'
            })
        },
        async onQuery () {
            // console.log(this.activeName + ' '  + this.produce)
            this.searchParams.activeName = this.activeName
            this.searchParams.produce = this.produce
            // console.log(this.searchParams)
            // const { data } = await getRateList(this.queryParams)
            // this.tableData = data.records
            // this.pagination = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     total: data.total
            // }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'branch', '')
            this.$set(this.queryParams, 'ledger', '')
            this.onSearch()
        },
        getList (val) {
            console.log(val)
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            console.log(this.searchParams)
            this.onQuery()
        }
    }
}
</script>

<style lang='scss' scoped>
.add-tags-dialog {
    padding-top: 20px;
}
/deep/ .el-dialog__body {
    min-height: 0 !important;
}
/deep/ .el-tabs--card>.el-tabs__header{
    border-bottom: 0;
}
/deep/ .el-tabs--card .el-tabs__nav{
    border-bottom: 1px solid #E4E7ED;
}
</style>

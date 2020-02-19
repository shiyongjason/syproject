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
                    <HAutocomplete ref="HAutocomplete" :selectArr="platformData" v-if="platformData" @back-event="backPlat" :placeholder="'全部'" :remove-value='removeValue'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.subsectionCode" clearable>
                        <el-option v-for="(item,index) in branchList" :key="index" :label="item.subsectionName" :value="item.subsectionCode">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">台账编号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.standingBookArchiveNo" placeholder="请输入台账编号">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <!-- <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div> -->
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <!-- 按钮权限 v-if="hosAuthCheck(reCheckAuth)"-->
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onLinddialog">新增台账</el-button>
                <el-button type="primary" class="ml20" @click="onExportTemplate">导入模板导出</el-button>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/account/import'" :on-success="isSuccess" :on-error="isError" auto-upload>
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
            <el-tabs v-model="accountType" type="card" @tab-click="handleClick">
                <el-tab-pane label="流贷" name="1"></el-tab-pane>
                <el-tab-pane label="敞口" name="2"></el-tab-pane>
                <el-tab-pane label="分授信" name="3"></el-tab-pane>
                <el-tab-pane label="还款明细表" name="4"></el-tab-pane>
            </el-tabs>
            <el-tabs v-if="accountType != '4'" v-model="produce" type="card" @tab-click="handleClick">
                <el-tab-pane label="好信用" name="好信用"></el-tab-pane>
                <el-tab-pane label="供应链" name="供应链"></el-tab-pane>
                <el-tab-pane label="好橙工" name="好橙工"></el-tab-pane>
            </el-tabs>
            {{accountType}} {{produce}}
            <complexTable :tableData='tableData' :pagination='pagination' :source='accountType' @getList='getList' />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { interfaceUrl } from '@/api/config'
import complexTable from './components/complexTable.vue'
import { getAccountList, findBranchListNew, findPaltList } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
export default {
    name: 'ledger',
    components: { complexTable, HAutocomplete },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            platformData: (state) => {
                return state.fundsData.platformData
            }
        })
    },
    data () {
        return {
            accountType: '1',
            produce: '好信用',
            interfaceUrl: interfaceUrl,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                misCode: '',
                customerName: '',
                subsectionCode: '',
                standingBookArchiveNo: '',
                accountType: '1',
                loanCompanyCode: '',
                loanCompanyName: '',
                produce: '好信用'
            },
            searchParams: {},
            tableData: [{ shy: 1 }, { shy: 2 }],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            branchList: [], // 分部
            removeValue: false
        }
    },
    mounted () {
        this.onSearch()
        this.findBranchList()
        // this.onFindPaltList()
        this.findPlatformslist()
    },
    methods: {
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
        backPlat (value) {
            this.queryParams.loanCompanyCode = value.value.companyCode ? value.value.companyCode : ''
            this.queryParams.loanCompanyName = value.value.companyShortName ? value.value.companyShortName : ''
        },
        ...mapActions({
            findPlatformslist: 'findPlatformslist'
        }),
        // 查询分部（不用做权限，现在是总部在使用）
        async findBranchList () {
            const { data } = await findBranchListNew()
            // console.log(data)
            this.branchList = data.data
            this.branchList.unshift(
                { subsectionCode: '', subsectionName: '请选择分部' }
            )
        },
        onExportTemplate () {
            // 模板导出
            // var url = ''
            // for (var key in this.queryParams) {
            //     url += (key + '=' + this.queryParams[key] + '&')
            // }
            // location.href = interfaceUrl + 'ets/api/b2b/activity/export?' + url
        },
        // 台账导出
        onExportLedger () {
            location.href = interfaceUrl + '/backend/account/export'
        },
        handleClick () {
            this.onReset()
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
            this.searchParams.accountType = this.accountType
            this.searchParams.produce = this.produce
            // console.log(this.searchParams)
            const { data } = await getAccountList(this.searchParams)
            // console.log(data)
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
            // this.tableData = data.records
            this.tableData = []
            data.records.map((i) => {
                let obj = {}
                // console.log(i)
                if (i.account) Object.keys(i.account).forEach(key => obj['account_' + key] = i.account[key])
                if (i.loan) Object.keys(i.loan).forEach(key => obj['loan_' + key] = i.loan[key])
                if (i.overdue) Object.keys(i.overdue).forEach(key => obj['overdue_' + key] = i.overdue[key])
                if (i.plan) Object.keys(i.plan).forEach((key) => obj['plan_' + key] = i.plan[key])
                // console.log(obj)
                this.tableData.push(obj)
            })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.removeValue = !this.removeValue
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'standingBookArchiveNo', '')
            this.$set(this.queryParams, 'loanCompanyCode', '')
            this.$set(this.queryParams, 'loanCompanyName', '')
            this.onSearch()
        },
        getList (val) {
            // console.log(val)
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            // console.log(this.searchParams)
            this.onQuery()
        },
        onLinddialog () {
            // 1：好信用 2：供应链 3：好橙工
            let produce = this.produce == '好信用' ? 1 : this.produce == '供应链' ? 2 : 3
            this.$router.push({ path: '/fundsData/newFlowdialog', query: { accountType: this.accountType, productType: produce } })
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

/deep/ .el-tabs--card > .el-tabs__header {
    border-bottom: 0;
}

/deep/ .el-tabs--card .el-tabs__nav {
    border-bottom: 1px solid #e4e7ed;
}
</style>
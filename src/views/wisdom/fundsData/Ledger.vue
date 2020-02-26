<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">MIS编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.misCode" placeholder="请输入MIS编码" clearable>
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
                        <el-option v-for="(item,index) in branchList" :key="index" :label="item.organizationName" :value="item.organizationCode">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">台账编号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.standingBookArchiveNo" placeholder="请输入台账编号" clearable>
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
            </div><br>
            <!-- 按钮权限 v-if="hosAuthCheck(reCheckAuth)"-->
            <div class="query-cont-col">
                <a class="downloadExcel" href="/excelTemplate/资金台账-还款信息导入模板.xls" download="资金台账-还款信息导入模板.xls">
                    还款明细表模板导出
                </a>
            </div>
            <div class="query-cont-col">
                <a class="downloadExcel" href="/excelTemplate/资金台账-借款信息导入模板.xlsx" download="资金台账-借款信息导入模板.xlsx">
                    借款模板导出
                </a>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/account/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload>
                    <el-button type="primary" class='m0' :loading='loading'>
                        借款信息导入
                    </el-button>
                </el-upload>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/account/repay/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload>
                    <el-button type="primary" class="m0" :loading='loading'>
                        还款明细表信息导入
                    </el-button>
                </el-upload>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tabs v-model="accountType" type="card" @tab-click="handleClick(1)">
                <el-tab-pane label="流贷" name="1"></el-tab-pane>
                <el-tab-pane label="敞口" v-if="productType == '1'" name="2"></el-tab-pane>
                <el-tab-pane label="分授信" v-if="productType == '1'" name="3"></el-tab-pane>
                <el-tab-pane label="还款明细表" name="4"></el-tab-pane>
            </el-tabs>
            <template v-if="accountType != '4'">
                <el-tabs v-model="productType" type="card" @tab-click="handleClick(2)">
                    <el-tab-pane label="好信用" name="1"></el-tab-pane>
                    <el-tab-pane label="供应链" v-if="accountType == 1" name="2"></el-tab-pane>
                    <!-- <el-tab-pane label="好橙工" name="好橙工"></el-tab-pane> -->
                </el-tabs>
                <el-button type="primary" @click="onLinddialog">
                    {{productType == 1 ? '新增好信用-' : productType == 2 ? '新增供应链-' : ''}}
                    {{accountType == 1 ? '流贷台账' : accountType == 2 ? '敞口台账' : accountType == 3 ? '分授信台账' : '待开发'}}
                </el-button>
            </template>
            <complexTable :tableData='tableData' :pagination='pagination' :source='accountType' @getList='getList' />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { interfaceUrl } from '@/api/config'
import { clearCache, newCache } from '@/utils/index'
import complexTable from './components/complexTable.vue'
import { getAccountList, getRepaymentList, findDepList } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
export default {
    name: 'standingBook',
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
            accountType: '1', // 1：流贷 2：敞口 3：分授信 4：还款明细表
            productType: '1', // 1：好信用 2：供应链 3：好橙工
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
                productType: '1'
            },
            searchParams: {},
            tableData: [{ shy: 1 }, { shy: 2 }],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            branchList: [], // 分部
            removeValue: false,
            accept: '.xlsx,.xls',
            loading: false
        }
    },
    mounted () {
        this.onSearch()
        this.findBranchList()
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
            const { data } = await findDepList({ organizationType: 1 })
            this.branchList = data.data
            this.branchList.unshift(
                { organizationCode: '', organizationName: '请选择分部' }
            )
        },
        handleClick (i) {
            if (i == 1) this.productType = '1'
            this.onReset()
        },
        isSuccess (response) {
            this.$message({
                message: '批量导入成功！',
                type: 'success'
            })
            this.loading = false
            this.onSearch()
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + JSON.parse(response.message).message,
                type: 'error'
            })
            this.loading = false
        },
        handleUpload (file) {
            // TODO: 目前只有一个文件,待优化
            if (file.size / (1024 * 1024) > 100) {
                this.$message({
                    message: '附件要保持100M以内',
                    type: 'warning'
                })
                return false
            }
            const fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
            if (this.accept.lastIndexOf(fileSuffix) == -1) {
                this.$message.error('格式不正确！')
                return false
            }
            this.loading = true
        },
        async onQuery () {
            this.searchParams.accountType = this.accountType
            this.searchParams.productType = this.productType
            if (this.accountType == 4) {
                const { data } = await getRepaymentList({
                    ...this.searchParams,
                    standingBookNo: this.searchParams.standingBookArchiveNo
                })
                this.pagination = {
                    pageNumber: data.current,
                    pageSize: data.size,
                    total: data.total
                }
                this.tableData = data.records
                return
            }
            const { data } = await getAccountList(this.searchParams)
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
            this.tableData = []
            data && data.records.map((i) => {
                let obj = {}
                // eslint-disable-next-line
                if (i.account) Object.keys(i.account).forEach(key => obj['account_' + key] = i.account[key])
                // eslint-disable-next-line
                if (i.loan) Object.keys(i.loan).forEach(key => obj['loan_' + key] = i.loan[key])
                // eslint-disable-next-line
                if (i.paymentStatic) Object.keys(i.paymentStatic).forEach(key => obj['paymentStatic_' + key] = i.paymentStatic[key])
                if (i.planList) {
                    i.planList.map((item, index) => {
                        // eslint-disable-next-line
                        Object.keys(item).forEach((key) => obj[`planList_${index}_${key}`] = item[key])
                    })
                }
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
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            this.onQuery()
        },
        onLinddialog () {
            this.$router.push({ path: '/fundsData/newFlowdialog', query: { accountType: this.accountType, productType: this.productType } })
        }
    },
    activated () {
        this.onQuery()
    },
    beforeRouteEnter (to, from, next) {
        newCache('standingBook')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'newFlowdialog') {
            clearCache('standingBook')
        }
        next()
    }
}
</script>

<style lang='scss' scoped>
.add-tags-dialog {
    padding-top: 20px;
}
.downloadExcel{
    padding: 12px 20px;
    border-radius: 4px;
    background-color: #FF7A45;
    color: #fff;
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
.m0 {
    margin: 0;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #ff7a45;
}
</style>
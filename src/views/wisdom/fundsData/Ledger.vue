<template>
    <div class="tags-wrapper page-body amountImport" v-watermark="$store.state.userInfo.employeeName">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">MIS编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="5" v-model="queryParams.misCode" placeholder="请输入MIS编码" clearable>
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.subsectionCode" :disabled='!this.branch' clearable @change="findPlatformslistByBranchList">
                        <el-option v-for="item in branchList" :key="item.crmDeptCode" :label="item.deptName" :value="item.crmDeptCode">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">平台公司名：</div>
                <div class="query-col-input">
                    <HAutocomplete ref="HAutocomplete" :selectArr="platformData" v-if="platformData" @back-event="backPlat" :placeholder="'请输入平台公司名'" :remove-value='removeValue'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">台账编号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.standingBookNo" placeholder="请输入台账编号" clearable>
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title" v-if="hosAuthCheck(account_export)">
                    <el-button type="primary" class="ml20" @click="onExport">导出</el-button>
                </div>
                <!-- <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div> -->
            </div><br>
        </div>
        <div class="page-body-cont">
            <el-tabs v-model="accountType" type="card" @tab-click="handleClick(1)">
                <el-tab-pane v-if="tabAuth('台账汇总表')" label="台账汇总表" name="0"></el-tab-pane>
                <el-tab-pane v-if="tabAuth('流贷台账')" label="流贷" name="1"></el-tab-pane>
                <el-tab-pane v-if="tabAuth('敞口台账')" label="敞口" name="2"></el-tab-pane>
                <el-tab-pane v-if="tabAuth('分授信台账')" label="分授信" name="3"></el-tab-pane>
                <el-tab-pane v-if="tabAuth('还款明细表')" label="还款明细表" name="4"></el-tab-pane>
            </el-tabs>
            <el-tabs v-model="productType" v-if="accountType == 1" type="card" @tab-click="handleClick(2)">
                <el-tab-pane v-if="hosAuthCheck(flowtoborrow_good_credit)" label="好信用" name="1"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(flowtoborrow_supply_chain)" label="供应链" name="2"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(flowtoborrow_orange)" label="好橙工" name="3"></el-tab-pane>
            </el-tabs>
            <el-tabs v-model="productType" v-if="accountType == 2" type="card" @tab-click="handleClick(2)">
                <el-tab-pane v-if="hosAuthCheck(exposure_good_credit)" label="好信用" key="好信用" name="1"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(exposure_orange)" label="好橙工" key="好橙工" name="3"></el-tab-pane>
            </el-tabs>
            <el-tabs v-model="productType" v-if="accountType == 3" type="card" @tab-click="handleClick(2)">
                <el-tab-pane v-if="hosAuthCheck(pointscredit_good_credit)" label="好信用" name="1"></el-tab-pane>
            </el-tabs>
            <div class="fundBtn">
                <el-button v-if="accountType == '1' && hosAuthCheck(addFundsData)" type="primary" @click="onLinddialog">{{accountName}}</el-button>
                <el-button v-if="accountType == '2' && hosAuthCheck(addExposureData)" type="primary" @click="onLinddialog">{{accountName}}</el-button>
                <el-button v-if="accountType == '3' && hosAuthCheck(addPointscreditData)" type="primary" @click="onLinddialog">{{accountName}}</el-button>
            </div>
            <complexTable v-show="!hasNoneAuth" :tableData='tableData' :pagination='pagination' :productType='productType' :source='accountType' @getList='getList' />
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { clearCache, newCache } from '@/utils/index'
import complexTable from './components/complexTable.vue'
import { WISDOM_FLOWTOBORROW_FUNDSDATA_ADD, WISDOM_FLOWTOBORROW_GOOD_CREDIT, WISDOM_FLOWTOBORROW_SUPPLY_CHAIN, WISDOM_FLOWTOBORROW_ORANGE, WISDOM_EXPOSURE_GOOD_CREDIT, WISDOM_EXPOSURE_ORANGE, WISDOM_POINTSCREDIT_GOOD_CREDIT, WISDOM_POINTSCREDIT_FUNDSDATA_ADD, WISDOM_EXPOSURE_FUNDSDATA_ADD, WISDOM_ACCOUNT_EXPORT } from '@/utils/auth_const'
import { downloadCloudAlarmList } from './api/index'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import * as type from './const'
import { departmentAuth } from './mixins/userAuth'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('fundsData')
export default {
    name: 'standingBook',
    mixins: [departmentAuth],
    components: { complexTable, HAutocomplete },
    computed: {
        ...mapState({
            pagination: state => state.pagination,
            branchList: state => state.branchList
        }),
        ...mapGetters(['platformData', 'tableData']),
        accountName () {
            return `新增${type.productName[this.productType - 1]}-${type.accountName[this.accountType - 1]}台账`
        }
    },
    data () {
        return {
            accountType: '0', // 1：流贷 2：敞口 3：分授信 4：还款明细表，0:汇总表
            productType: '1', // 1：好信用 2：供应链 3：好橙工
            interfaceUrl: interfaceUrl,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                misCode: '',
                customerName: '',
                subsectionCode: '',
                standingBookNo: '',
                accountType: '1',
                loanCompanyCode: '',
                loanCompanyName: '',
                productType: '1'
            },
            searchParams: {},
            removeValue: false,
            accept: '.xlsx,.xls',
            loading: false,
            addFundsData: WISDOM_FLOWTOBORROW_FUNDSDATA_ADD,
            addExposureData: WISDOM_EXPOSURE_FUNDSDATA_ADD,
            addPointscreditData: WISDOM_POINTSCREDIT_FUNDSDATA_ADD,
            flowtoborrow_good_credit: WISDOM_FLOWTOBORROW_GOOD_CREDIT,
            flowtoborrow_supply_chain: WISDOM_FLOWTOBORROW_SUPPLY_CHAIN,
            flowtoborrow_orange: WISDOM_FLOWTOBORROW_ORANGE,
            exposure_good_credit: WISDOM_EXPOSURE_GOOD_CREDIT,
            exposure_orange: WISDOM_EXPOSURE_ORANGE,
            pointscredit_good_credit: WISDOM_POINTSCREDIT_GOOD_CREDIT,
            account_export: WISDOM_ACCOUNT_EXPORT,
            hasNoneAuth: false
        }
    },
    async mounted () {
        this.getUserTabAuth()
        this.onSearch()
        await this.oldBossAuth()
        if (this.userInfo.deptType == 2) {
            this.queryParams.subsectionCode = this.branchList[0].crmDeptCode
        }
    },
    methods: {
        ...mapActions([
            'findPlatformslist',
            'getAccountList',
            'getRepaymentList',
            'findBranchList',
            'findSummaryList'
        ]),
        // 埋点
        // tracking (event) {
        //     this.$store.dispatch('tracking', {
        //         type: 9,
        //         event,
        //         page: 2,
        //         page_name: '额度导入',
        //         page_path_name: 'amountImport'
        //     })
        // },
        findPlatformslistByBranchList () {
            let subsectionCode = this.queryParams.subsectionCode
            this.findPlatformslist({ subsectionCode })
        },
        backPlat (value) {
            this.queryParams.loanCompanyCode = value.value.companyCode ? value.value.companyCode : ''
            this.queryParams.loanCompanyName = value.value.companyShortName ? value.value.companyShortName : ''
        },
        handleClick (i) {
            if (i == 1) {
                this.hasNoneAuth = false
                this.productType = '1'
                this.$store.commit('fundsData/cleartableData')
                if (this.accountType == '1') this.flowtoborrowAuth()
                if (this.accountType == '2') this.exposureAuth()
                if (this.accountType == '3') this.pointscredit()
            }
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
                this.getRepaymentList(this.searchParams)
                return
            }
            if (this.accountType == 0) {
                this.findSummaryList(this.searchParams)
                return
            }
            this.getAccountList(this.searchParams)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.removeValue = !this.removeValue
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'misCode', '')
            if (this.userInfo.deptType != 2) this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'standingBookNo', '')
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
        },
        getUserTabAuth () {
            let menuList = JSON.parse(sessionStorage.getItem('menuList'))
            this.router = menuList.filter(i => {
                return i.path == '/fundsData'
            })[0].children
            this.stairTab()
        },
        stairTab () {
            if (this.tabAuth('台账汇总表')) {
                this.accountType = '0'
            } else if (this.tabAuth('流贷台账')) {
                this.accountType = '1'
                this.flowtoborrowAuth()
            } else if (this.tabAuth('敞口台账')) {
                this.accountType = '2'
                this.exposureAuth()
            } else if (this.tabAuth('分授信台账')) {
                this.accountType = '3'
                this.pointscredit()
            } else if (this.tabAuth('还款明细表')) {
                this.accountType = '4'
            } else {
                this.hasNoneAuth = true
            }
        },
        // 1：好信用 2：供应链 3：好橙工
        flowtoborrowAuth () {
            if (this.hosAuthCheck(this.flowtoborrow_good_credit)) {
                this.productType = '1'
            } else if (this.hosAuthCheck(this.flowtoborrow_supply_chain)) {
                this.productType = '2'
            } else if (this.hosAuthCheck(this.flowtoborrow_orange)) {
                this.productType = '3'
            } else {
                this.hasNoneAuth = true
            }
        },
        exposureAuth () {
            if (this.hosAuthCheck(this.exposure_good_credit)) {
                this.productType = '1'
            } else if (this.hosAuthCheck(this.exposure_orange)) {
                this.productType = '3'
            } else {
                this.hasNoneAuth = true
            }
        },
        pointscredit () {
            if (this.hosAuthCheck(this.pointscredit_good_credit)) {
                this.productType = '1'
            } else {
                this.hasNoneAuth = true
            }
        },
        tabAuth (param) {
            let router = this.router
            return router && router.some(i => {
                return i.path == param
            })
        },
        onExport () {
            const params = {
                misCode: this.queryParams.misCode,
                loanCompanyName: this.queryParams.loanCompanyName,
                subsectionCode: this.queryParams.subsectionCode,
                standingBookNo: this.queryParams.standingBookNo
            }
            downloadCloudAlarmList(params)
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
.amountImport {
    .add-tags-dialog {
        padding-top: 20px;
    }
    .downloadExcel {
        padding: 12px 20px;
        border-radius: 4px;
        background-color: #ff7a45;
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
    .page-body {
        padding: 8px 0 20px 0;
    }
    /deep/.el-tabs__header {
        margin: 0 0 10px;
    }
    /deep/.el-tabs__item {
        height: 30px;
        line-height: 30px;
    }
    .fundBtn .el-button {
        padding: 7px 15px;
    }
}
</style>
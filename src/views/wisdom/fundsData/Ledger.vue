<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">MIS编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="5" v-model="queryParams.misCode" placeholder="请输入MIS编码" clearable>
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">平台公司名：</div>
                <div class="query-col-input">
                    <HAutocomplete ref="HAutocomplete" :selectArr="platformData" v-if="platformData" @back-event="backPlat" :placeholder="'请输入平台公司名'" :remove-value='removeValue'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.subsectionCode" :disabled='!this.branch' clearable @change="findPlatformslistByBranchList">
                        <el-option v-for="(item,index) in branchList" :key="index" :label="item.deptname" :value="item.crmDeptCode">
                        </el-option>
                    </el-select>
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
                <el-tab-pane v-if="hosAuthCheck(TotalColumn)" label="台账汇总表" name="0"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(FlowToBorrow)" label="流贷" name="1"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(Exposure)" label="敞口" name="2"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(PointsCredit)" label="分授信" name="3"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(ReimbursementDetail)" label="还款明细表" name="4"></el-tab-pane>
            </el-tabs>
            <template v-if="accountType == '1'||accountType == '2'||accountType == '3'">
                <el-tabs v-model="productType" type="card" @tab-click="handleClick(2)">
                    <el-tab-pane label="好信用" name="1"></el-tab-pane>
                    <el-tab-pane label="供应链" v-if="accountType == 1" name="2"></el-tab-pane>
                    <el-tab-pane label="好橙工" v-if="accountType !=3" name="3"></el-tab-pane>
                </el-tabs>
                <el-button v-if="hosAuthCheck(addFundsData)" type="primary" @click="onLinddialog">{{accountName}}</el-button>
            </template>
            <complexTable :tableData='tableData' :pagination='pagination' :productType='productType' :source='accountType' @getList='getList' />
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { clearCache, newCache } from '@/utils/index'
import complexTable from './components/complexTable.vue'
import { WISDOM_FUNDSDATA_ADD, WISDOM_TOTALCOLUMN, WISDOM_FLOWTOBORROW, WISDOM_EXPOSURE, WISDOM_POINTSCREDIT, WISDOM_REIMBURSEMENTDETAIL } from '@/utils/auth_const'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import * as type from './const'
import { shy } from './mixins/userAuth'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('fundsData')
export default {
    name: 'standingBook',
    mixins: [shy],
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
            addFundsData: WISDOM_FUNDSDATA_ADD,
            TotalColumn: WISDOM_TOTALCOLUMN,
            FlowToBorrow: WISDOM_FLOWTOBORROW,
            Exposure: WISDOM_EXPOSURE,
            PointsCredit: WISDOM_POINTSCREDIT,
            ReimbursementDetail: WISDOM_REIMBURSEMENTDETAIL,
            shy: type.accountType
        }
    },
    mounted () {
        this.onSearch()
        // this.findBranchList()
        // this.findPlatformslist()
        console.log(this.shy)
        this.oldAuth()
        if (this.userInfo.deptType == 2) {
            this.queryParams.subsectionCode = this.userInfo.oldDeptCode ? this.userInfo.oldDeptCode : '无权限'
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
            console.log(this.$store.state.userInfo)
            let subsectionCode = this.queryParams.subsectionCode
            this.findPlatformslist({ subsectionCode })
        },
        backPlat (value) {
            this.queryParams.loanCompanyCode = value.value.companyCode ? value.value.companyCode : ''
            this.queryParams.loanCompanyName = value.value.companyShortName ? value.value.companyShortName : ''
        },
        handleClick (i) {
            if (i == 1) {
                this.productType = '1'
                // console.log(this.$store.state.userInfo)
                this.$store.commit('fundsData/cleartableData')
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
            if (this.hosAuthCheck(this.TotalColumn)) {
                this.accountType = '0'
            } else if (this.hosAuthCheck(this.FlowToBorrow)) {
                this.accountType = '1'
            } else if (this.hosAuthCheck(this.Exposure)) {
                this.accountType = '2'
            } else if (this.hosAuthCheck(this.PointsCredit)) {
                this.accountType = '3'
            } else if (this.hosAuthCheck(this.ReimbursementDetail)) {
                this.accountType = '4'
            }
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
            this.$set(this.queryParams, 'subsectionCode', '')
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
</style>
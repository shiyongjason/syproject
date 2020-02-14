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
                        <el-option v-for="(item,index) in branchList" :key="index" :label="item.subsectionName" :value="item.subsectionCode">
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
                <el-tab-pane label="还款明细表" name="还款明细表"></el-tab-pane>
            </el-tabs>
            <el-tabs v-if="activeName != '还款明细表'" v-model="produce" type="card" @tab-click="handleClick">
                <el-tab-pane label="好信用" name="好信用"></el-tab-pane>
                <el-tab-pane label="供应链" name="供应链"></el-tab-pane>
                <el-tab-pane label="好橙工" name="好橙工"></el-tab-pane>
            </el-tabs>
            {{activeName}} {{produce}}
            <complexTable :tableData='tableData' :pagination='pagination' :source='activeName' @getList='getList' />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { interfaceUrl } from "@/api/config"
import complexTable from "./components/complexTable.vue"
import { findBranchListNew } from './api/index.js'
export default {
    name: "ledger",
    components: { complexTable },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            activeName: "流贷",
            produce: "好信用",
            interfaceUrl: interfaceUrl,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                misCode: "",
                customerName: "",
                branch: "",
                ledger: "",
                activeName: "流贷",
                produce: "好信用"
            },
            searchParams: {},
            tableData: [{ shy: 1 }, { shy: 2 }],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            branchList: []
        }
    },
    mounted () {
        this.onSearch()
        this.findBranchList()
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
        // 查询分部（不用做权限，现在是总部在使用）
        async findBranchList () {
            const {data} = await findBranchListNew()
            // console.log(data)
            this.branchList = data.data
            this.branchList.unshift(
                { subsectionCode: "", subsectionName: "请选择分部" }
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
        onExportLedger () { }, // 台账导出
        handleClick () {
            this.onSearch()
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
            this.tableData = []
            this.tableData = [{ newShy: 11 }, { newShy: 22 }, { newShy: 33 }]
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
        },
        onLinddialog () {
            this.$router.push({ path: '/fundsData/newFlowdialog' })
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

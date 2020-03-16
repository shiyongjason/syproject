<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">客户名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.customerName" placeholder="请输入客户名称">
                    </el-input>
                </div>
            </div>
            <!-- <div class="query-cont-col">
                <div class="query-col-title">当前状态：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.statusId" clearable>
                        <el-option v-for="(item,index) in statusIdType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div> -->
            <div class="query-cont-col">
                <div class="query-col-title">MIS编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.misCode" placeholder="请输入MIS编码">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择时间" :picker-options="pickerOptionsStart">
                    </el-date-picker>
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
                <el-button type="primary" class="ml20" @click="toDo(1)">同意</el-button>
                <el-button type="primary" class="ml20" @click="toDo(2)">拒绝</el-button>
            </div>
            <div class="query-cont-col" v-if="hosAuthCheck(importAuth)">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'backend/amount/rate/import'" :on-success="isSuccess" :on-error="isError" auto-upload>
                    <el-button type="primary" class="ml20">
                        导入
                    </el-button>
                </el-upload>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="待生效" name="001"></el-tab-pane>
                <el-tab-pane label="生效" name="000"></el-tab-pane>
                <el-tab-pane label="失效" name="002"></el-tab-pane>
            </el-tabs>
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isMultiple='isMultiple && isTab' @update:multiSelection='multiSelection'>
            </basicTable>
        </div>
        <el-dialog title="提示" :visible.sync="resultDialogVisible" :close-on-click-modal='false' width="30%" center>
            <span>{{content}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resultDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getRateList, rateStatus } from './api/index'
import { interfaceUrl } from '@/api/config'
import { JINYUN_AMOUNT_IMPORT_IMPORT, JINYUN_AMOUNT_IMPORT_RE_CHECK } from '@/utils/auth_const'
import { tableLabelAmountImport } from './const.js'
export default {
    name: 'amountImport',
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
            if (val == '001') {
                this.isTab = true
            } else {
                this.isTab = false
            }
        }
    },
    data () {
        return {
            activeName: '001',
            importAuth: JINYUN_AMOUNT_IMPORT_IMPORT,
            reCheckAuth: JINYUN_AMOUNT_IMPORT_RE_CHECK,
            interfaceUrl: interfaceUrl,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                statusId: '001'
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: tableLabelAmountImport,
            // statusIdType: [
            //     { value: '', label: '请选择' },
            //     { value: '001', label: '待生效' },
            //     { value: '000', label: '生效' },
            //     { value: '002', label: '失效' }
            // ],
            resultDialogVisible: false,
            content: '',
            status: '',
            // 控制权限
            isTab: true,
            multiSelect: []
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        tracking (event) {
            this.$store.dispatch('tracking', {
                type: 9,
                event,
                page: 2,
                page_name: '额度导入',
                page_path_name: 'amountImport'
            })
        },
        handleClick () {
            this.queryParams.statusId = this.activeName
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
            this.tracking(9)
            this.onSearch()
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + JSON.parse(response.message).message,
                type: 'error'
            })
        },
        async onQuery () {
            const { data } = await getRateList(this.queryParams)
            this.tableData = data.records
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
            this.tableData.map(i => {
                if (i.statusId == '000') i.statusId = '生效'
                if (i.statusId == '001') i.statusId = '待生效'
                if (i.statusId == '002') i.statusId = '失效'
                if (i.dailyInterestRate != null) {
                    i.dailyInterestRate = i.dailyInterestRate.toFixed(4) + '%'
                }
                if (i.accountReceivableQuota != null) {
                    i.accountReceivableQuota = i.accountReceivableQuota.toFixed(2)
                }
                if (i.dailyQuota != null) {
                    i.dailyQuota = i.dailyQuota.toFixed(2)
                }
                if (i.realDailyQuota != null) {
                    i.realDailyQuota = i.realDailyQuota.toFixed(2)
                }
                if (i.monthlyQuota != null) {
                    i.monthlyQuota = i.monthlyQuota.toFixed(2)
                }
                if (i.yearlyQuota != null) {
                    i.yearlyQuota = i.yearlyQuota.toFixed(2)
                }
            })
        },
        onSearch () {
            this.tracking(2)
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'createTime', '')
            this.onSearch()
        },
        async createTags () { },
        toDo (i) {
            if (this.multiSelect.length == 0) {
                this.$alert('请勾选需要审批的条目！', '勾选提示', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (i == 2) {
                this.content = '是否确认拒绝本次导入操作？'
            } else {
                this.content = '是否确认同意本次导入操作？'
            }
            this.status = i
            this.resultDialogVisible = true
        },
        async onSure () {
            const params = {
                reqCustomerDailyImports: this.multiSelect,
                status: this.status
            }
            this.tracking(8)
            await rateStatus(params)
            this.resultDialogVisible = false
            this.onSearch()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
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
</style>

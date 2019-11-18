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
            <div class="query-cont-col">
                <div class="query-col-title">当前状态：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.statusId" clearable>
                        <el-option v-for="(item,index) in statusIdType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">MIS编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.misCode" placeholder="请输入客户名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createTime" type="date" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
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
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="toDo(1)">同意</el-button>
                <el-button type="primary" class="ml20" @click="toDo(2)">拒绝</el-button>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :action="jinyunTemporary + '/amount/rate/import'" :on-success="isSuccess" :on-error="isError" auto-upload>
                    <el-button type="primary" class="ml20">
                        导入
                    </el-button>
                </el-upload>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isMultiple='isMultiple' @update:multiSelection='multiSelection'>
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
import { jinyunTemporary } from '@/api/config'
export default {
    name: 'enterpriseCA',
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
        }
    },
    data () {
        return {
            jinyunTemporary: jinyunTemporary,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                statusId: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 100
            },
            addTags: {
                labelName: '',
                labelType: '1'
            },
            multipleSelection: [],
            tableLabel: [
                { label: '客户名称', prop: 'customerName' },
                { label: 'MIS编码', prop: 'misCode' },
                { label: '年度最高额（元）', prop: 'yearlyQuota' },
                { label: '月度滚动额（元）', prop: 'monthlyQuota' },
                { label: '应收账款扣减额（元）', prop: 'accountReceivableQuota' },
                { label: '今日用信额（元）', prop: 'dailyQuota' },
                { label: '本月利率(年化）', prop: 'dailyInterestRate' },
                { label: '创建日期', prop: 'importDate' },
                { label: '当前状态', prop: 'statusId' }
            ],
            statusIdType: [
                { value: '', label: '请选择' },
                { value: '001', label: '待生效' },
                { value: '000', label: '正常' },
                { value: '002', label: '失效' }
            ],
            resultDialogVisible: false,
            content: '',
            status: '',
            // 控制权限
            isMultiple: true,
            multiSelect: []
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        multiSelection (val) {
            this.multiSelect = val
        },
        isSuccess (response) {
            if (response.code !== 200) {
                this.$message({
                    message: '批量导入失败，' + response.message,
                    type: 'error'
                })
            } else {
                this.$message({
                    message: '批量导入成功！',
                    type: 'success'
                })
                this.onSearch()
            }
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + response.message,
                type: 'error'
            })
        },
        async onQuery () {
            console.log(this.queryParams)
            const { data } = await getRateList(this.queryParams)
            console.log(data)
            this.tableData = data.records
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
            this.tableData.map(i => {
                if (i.statusId == '000') i.statusId = '正常'
                if (i.statusId == '001') i.statusId = '待生效'
                if (i.statusId == '002') i.statusId = '失效'
            })
            // console.log(this.searchParams)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'statusId', '')
            this.$set(this.queryParams, 'createTime', '')
            this.onSearch()
        },
        async createTags () { },
        toDo (i) {
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

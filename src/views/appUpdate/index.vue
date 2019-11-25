<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">产品：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.produet" clearable>
                        <el-option v-for="(item,index) in produetType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">平台：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.statusId" clearable>
                        <el-option v-for="(item,index) in statusIdType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createTime" type="date" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择时间" :picker-options="pickerOptionsEnd">
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
                <el-button type="primary" class="ml20" @click="onNewVersion">新建版本</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
            </basicTable>
        </div>
        <el-dialog title="新建版本" :visible.sync="resultDialogVisible" :close-on-click-modal='false' width="30%" center>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resultDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'enterpriseCA',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.endTime
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
                    let beginDateVal = this.queryParams.createTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime() - 3600 * 1000 * 24
                        )
                    }
                }
            }
        }
    },
    data () {
        return {
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
            tableLabel: [
                { label: '产品', prop: 'customerName' },
                { label: '平台', prop: 'customerName' },
                { label: '版本号', prop: 'customerName' },
                { label: '版本状态', prop: 'customerName' },
                { label: '强制更新', prop: 'customerName' },
                { label: '更新描述', prop: 'customerName' },
                { label: '下载地址', prop: 'customerName' },
                { label: '创建者', prop: 'customerName' },
                { label: '更新时间', prop: 'customerName' },
                { label: '操作', prop: 'customerName' }
            ],
            statusIdType: [
                { value: '', label: '全部' },
                { value: 'ios', label: '苹果' },
                { value: 'android', label: '安卓' }
            ],
            produetType: [
                { value: '', label: '全部' },
                { value: 'dfx', label: '单分享' },
                { value: 'iot', label: 'IOT' }
            ],
            resultDialogVisible: true
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // const { data } = await getRateList(this.queryParams)
            // this.tableData = data.records
            // this.pagination = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     total: data.total
            // }
            // this.tableData.map(i => {
            //     if (i.statusId == '000') i.statusId = '生效'
            //     if (i.statusId == '001') i.statusId = '待生效'
            //     if (i.statusId == '002') i.statusId = '失效'
            //     if (i.dailyInterestRate != null) {
            //         i.dailyInterestRate = i.dailyInterestRate.toFixed(4) + '%'
            //     }
            // })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'createTime', '')
            this.onSearch()
        },
        onNewVersion () {
            this.resultDialogVisible = true
        },
        async onSure () {
            // const params = {
            //     reqCustomerDailyImports: this.multiSelect
            // }
            // await rateStatus(params)
            // this.resultDialogVisible = false
            // this.onSearch()
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

<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">客户名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.keywords" placeholder="请输入客户名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">当前状态：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.channelType" clearable>
                        <el-option v-for="(item,index) in channelType" :key="index" :label="item.label" :value="item.value">
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
                    <el-date-picker v-model="queryParams.createTimeStart" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10"> --</span>
                    <el-date-picker v-model="queryParams.createTimeEnd" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
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
                <el-button type="primary" class="ml20" @click="toDo(0)">拒绝</el-button>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="dialogVisible = true">
                    导入
                </el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isMultiple='isMultiple'>
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
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                keywords: '',
                channelType: '',
                createTimeStart: '',
                createTimeEnd: ''
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
                { label: '客户名称', prop: 'updateTime' },
                { label: 'MIS编码', prop: 'updateTime' },
                { label: '年度最高额（元）', prop: 'updateTime' },
                { label: '月度滚动额（元）', prop: 'updateTime' },
                { label: '应收账款扣减额（元）', prop: 'updateTime' },
                { label: '今日用信额（元）', prop: 'updateTime' },
                { label: '本月利率(年化）', prop: 'updateTime' },
                { label: '创建日期', prop: 'updateTime' },
                { label: '当前状态', prop: 'updateTime' }
            ],
            channelType: [
                { value: '', label: '请选择' },
                { value: 0, label: '正常' },
                { value: 1, label: '失效' }
            ],
            resultDialogVisible: false,
            content: '',
            state: '',
            // 控制权限
            isMultiple: true
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // const { data } = await findTagsList(this.queryParams)
            // this.tableData = data.records
            // this.pagination = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     total: data.total
            // }
            console.log(this.searchParams)
            this.tableData = [
                {
                    updateTime: '111'
                }
            ]
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'keywords', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'channelType', '')
            this.$set(this.queryParams, 'createTimeStart', '')
            this.$set(this.queryParams, 'createTimeEnd', '')
            this.onSearch()
        },
        async createTags () { },
        toDo (i) {
            if (i == 0) {
                this.content = '是否确认拒绝本次导入操作？'
            } else {
                this.content = '是否确认同意本次导入操作？'
            }
            this.state = i
            this.resultDialogVisible = true
        },
        onSure () {
            if (this.state == 0) {
                console.log('拒绝')
            } else if (this.state == 1) {
                console.log('同意')
            }
            this.resultDialogVisible = false
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

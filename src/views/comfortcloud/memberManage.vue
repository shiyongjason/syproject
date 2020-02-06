<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont spanflex">
            <span>会员概况 </span>
            <span>会员数量：{{membernewData.totalElements}}个</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">注册时间： </div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="date" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择时间" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='280'>
                <template slot="homeCount" slot-scope="scope">
                    <p @click="onShowHome(scope.data.row)">{{scope.data.row.homeCount}}</p>
                </template>
                <template slot="wx_openid" slot-scope="scope">
                    {{scope.data.row.wx_openid?'是':'否'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">登录详情</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'membermanage',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            memberData: 'memberData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime() || time.getTime() <= Date.now() - 1 * 24 * 60 * 60 * 1000
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: '',
                endTime: '',
                startTime: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            membernewData: [],
            tableLabel: [
                { label: '昵称', prop: 'nick' },
                { label: '手机号', prop: 'phone', width: '120px' },
                { label: '家庭数', prop: 'homeCount' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '是否已绑定微信', prop: 'wx_openid' }
            ],
            dialogVisible: false
        }
    },
    watch: {

    },
    mounted () {
        // this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findMembersituation: 'findMembersituation'
        }),
        async onQuery () {
            await this.findMembersituation(this.searchParams)
            this.membernewData = this.memberData
            console.log(this.membernewData)
            this.tableData = this.membernewData.pageContent
            this.pagination = {
                pageNumber: this.membernewData.pageNumber,
                pageSize: this.membernewData.pageSize,
                total: this.membernewData.totalElements
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onCurrentChange (val) {
            console.log(val)
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onEdit (val) {
            this.$router.push({ path: '/comfortcloud/memberDetail', query: {} })
        },
        onShowHome () {
            this.dialogVisible = true
        }
    }
}
</script>

<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
        &:first-child {
            font-size: 16px;
        }
        &:last-child {
            text-align: right;
        }
    }
}
</style>

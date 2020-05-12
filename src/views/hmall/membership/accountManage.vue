<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">账号/姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.username" placeholder="请输入账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.createTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.createTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">账号来源：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.source">
                            <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="onFindAccountList(1)">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop">已筛选 {{accountData.total}} 项 </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange"
            @onSizeChange="handleSizeChange" @onSortChange="onSortChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true'>
                <template slot="action" slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="onFindInfo(scope.data.row.username)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
        <accountCp :drawer=drawer @backEvent='restDrawer' ref="account"></accountCp>
    </div>
</template>
<script>
import accountCp from './accountCp'
import { mapState, mapGetters, mapActions } from 'vuex'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'spumange',
    data () {
        return {
            queryParams: {
                username: this.$route.query.account || '',
                pageSize: 10,
                pageNumber: 1,
                createTimeStart: '',
                createTimeEnd: '',
                source: '',
                registerTimeOrderBy: 'desc'
            },
            copyParams: {},
            paginationInfo: {},
            tableLabel: [
                { label: '账号', prop: 'username', width: '180' },
                { label: '姓名', prop: 'name' },
                { label: '注册时间', prop: 'createTime', width: '150', sortable: true },
                { label: '最近登录时间', prop: 'lastLoginTime', width: '150' },
                { label: '账号来源', prop: 'source' },
                { label: '最近登录设备', prop: 'lastLoginDevice' },
                { label: '最近登录平台', prop: 'lastLoginFrom' },
                { label: '最近登录版本', prop: 'lastLoginVersion' }
            ],
            tableData: [],
            drawer: false,
            options: [{ key: '', value: '全部' }, { key: 1, value: '存量会员店' }, { key: 2, value: '存量平台公司' }, { key: 3, value: 'app注册' },
                { key: 4, value: '商家注册' }, { key: 5, value: '好友推荐' }, { key: 6, value: '商家邀请' }, { key: 7, value: '单分享小程序' }, { key: 8, value: '好享家会员小程序' }, { key: 9, value: '代注册' }]
        }
    },
    components: {
        accountCp
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            accountData: 'accountData'
        })
    },
    mounted () {
        this.onFindAccountList()
        this.copyParams = deepCopy(this.queryParams)
    },
    methods: {
        ...mapActions({
            findAccountList: 'findAccountList'
        }),
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onFindAccountList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onFindAccountList()
        },
        onSortChange (val) {
            if (val.prop === 'createTime') {
                this.queryParams.registerTimeOrderBy = val.order === 'ascending' ? 'asc' : 'desc'
            }
            this.onFindAccountList()
        },
        onFindInfo (val) {
            this.$refs.account.onFindAccountDetail(val)
            this.drawer = true
        },
        restDrawer () {
            this.drawer = false
        },
        onRest () {
            this.queryParams = deepCopy(this.copyParams)
            this.queryParams.username = ''
            this.onFindAccountList(1)
        },
        async onFindAccountList (val) {
            if (val) this.queryParams.pageNumber = val
            await this.findAccountList(this.queryParams)
            this.tableData = this.accountData.records
            this.paginationInfo = {
                total: this.accountData.total,
                pageNumber: this.accountData.current,
                pageSize: this.accountData.size
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.colred {
    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
.eltagtop{
    margin-bottom: 10px;
}
</style>
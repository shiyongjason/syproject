<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">账号/姓名：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.username" placeholder="请输入账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">注册时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.createTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.createTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">账号来源：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.sources" multiple collapse-tags clearable>
                            <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onFindAccountList(1)">
                        查询
                    </h-button>
                    <h-button @click="onRest()">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{accountData.total}} 项 </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange"
            @onSizeChange="handleSizeChange" @onSortChange="onSortChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true'>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onFindInfo(scope.data.row.username)">查看详情</h-button>
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
    name: 'membershipSpumange',
    data () {
        return {
            queryParams: {
                username: this.$route.query.account || '',
                pageSize: 10,
                pageNumber: 1,
                createTimeStart: '',
                createTimeEnd: '',
                sources: [],
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
            options: [{ key: 1, value: '存量会员店' }, { key: 2, value: '存量平台公司' }, { key: 3, value: 'app注册' },
                { key: 4, value: '商家注册' }, { key: 5, value: '好友推荐' }, { key: 6, value: '商家邀请' }, { key: 7, value: '单分享小程序' }, { key: 8, value: '好享家会员小程序' }, { key: 9, value: '代注册' }, { key: 12, value: '好橙工推荐官' }, { key: 13, value: '推荐官推荐' }]
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
            let queryParams = { ...this.queryParams }
            queryParams.sources = this.queryParams.sources.join(',')
            await this.findAccountList(queryParams)
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

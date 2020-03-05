<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">活动标题：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.phone" placeholder="请输入活动标题" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch()">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onAddcloud()">新建活动</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="homeCount" slot-scope="scope">
                    <p @click="onShowHome(scope.data.row.homeIds)" class="colred">{{scope.data.row.homeCount}}</p>
                </template>
                <template slot="wx_openid" slot-scope="scope">
                    {{scope.data.row.wx_openid?'是':'否'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">登录详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'membermanage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone,
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
            tableLabel: [
                { label: '活动标题', prop: 'nick' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '生效时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '状态', prop: 'homeCount' }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            memberData: 'iotmemberData',
            familyData: 'familyData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
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
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        // this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findMembersituation: 'findMembersituation',
            findFamilyDetail: 'findFamilyDetail'
        }),
        async onQuery () {
            await this.findMembersituation(this.searchParams)
            this.tableData = this.memberData.pageContent
            this.pagination = {
                pageNumber: this.memberData.pageNumber,
                pageSize: this.memberData.pageSize,
                total: this.memberData.totalElements
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onAddcloud (val) {
            this.$router.push({ path: '/comfortcloud/cloudActedit', query: { } })
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
.colred {
    color: #ff7a45;
    cursor: pointer;
}
/deep/.el-dialog__body {
    padding-top: 10px;
}
</style>

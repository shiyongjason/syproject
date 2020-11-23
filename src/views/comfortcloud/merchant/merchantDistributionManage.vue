<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">会员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">审核状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.status" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="审核通过" value="0"></el-option>
                            <el-option label="待审核" value="10"></el-option>
                            <el-option label="审核不通过" value="15"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                    </div>
                </div>
            </div>
            <!-- 表格使用老毕的组件 -->
        <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">{{scope.data.row.source==='1'?'查看奖励':'审核通过'}}</el-button>
                </template>
            </basicTable>
            </div>
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'comfortcloudMembermanage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: '',
                endRegisterTime: '',
                startRegisterTime: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '申请时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '分销员昵称', prop: 'nickName' },
                { label: '分销员会员账号', prop: 'phone' },
                { label: '分销员姓名', prop: 'source' },
                { label: '审核通过时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '状态', prop: 'inviteUuid' }
            ],
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantmemberData: 'iotmerchantmemberData',
            merchantmemberTotalData: 'iotmerchantmemberTotalData'
        })
    },
    mounted () {
        // this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findMerchantMembersituation: 'findMerchantMembersituation',
            iotmerchantmemberDataPagination: 'iotmerchantmemberDataPagination',
            findMerchantMemberTotalsituation: 'findMerchantMemberTotalsituation'
        }),
        async onQuery () {
            await this.findMerchantMembersituation(this.searchParams)
            await this.findMerchantMemberTotalsituation()
            this.tableData = this.merchantmemberData.records
            this.pagination = {
                pageNumber: this.merchantmemberData.current,
                pageSize: this.merchantmemberData.size,
                total: this.merchantmemberData.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onEdit (val) {},
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
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
.topTitle{
    margin-right: 2rem;
    font-weight:bold;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}.topColred {
    color: #ff7a45;
    cursor: pointer;
}
/deep/.el-dialog__body {
    padding-top: 10px;
}
</style>

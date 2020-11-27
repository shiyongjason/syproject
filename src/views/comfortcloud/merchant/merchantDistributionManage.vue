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
                            <el-option label="审核通过" value=1></el-option>
                            <el-option label="待审核" value=0></el-option>
                            <el-option label="审核不通过" value=2></el-option>
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
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false'
                        :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'
                        :isAction="true">
                <template slot="status" slot-scope="scope">
                    {{scope.data.row.status===0?'待审核':scope.data.row.status===1?'审核通过':'审核不通过'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <p class="colred title" @click="onEdit(scope.data.row)">
                        {{scope.data.row.status===0?'审核':scope.data.row.status===1?'查看奖励':'--'}}
                    </p>
                </template>
            </basicTable>
            <el-dialog title="审核分销员" :modal-append-to-body=false :append-to-body=false
                       :visible.sync="rightsDialogVisible" width="30%">
                <div class="right-items">
                    <p>姓名：{{checkData.nickName}}</p>
                    <p>会员账号：{{checkData.phone}}</p>
                    <p>请确认该分销员信息后进行审核。</p>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="onChangeCheckStatus(2)">审核不通过</el-button>
                <el-button type="primary" @click="onChangeCheckStatus(1)">审核通过</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
import { updateDistribution } from '../api'

export default {
    name: 'merchantDistributionManage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: '',
                status: ''
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
                { label: '分销员姓名', prop: 'name' },
                { label: '审核通过时间', prop: 'updateTime', formatters: 'dateTime' },
                { label: '状态', prop: 'status' }
            ],
            rightsDialogVisible: false,
            checkData: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantDistributorData: 'iotmerchantDistributorData'
        })
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findMemberDistributor: 'findMemberDistributor',
            iotmerchantDistributorPagination: 'iotmerchantDistributorPagination'
        }),
        async onQuery () {
            await this.findMemberDistributor(this.searchParams)
            console.log(this.merchantDistributorData)
            this.tableData = this.merchantDistributorData.records
            this.pagination = {
                pageNumber: this.merchantDistributorData.current,
                pageSize: this.merchantDistributorData.size,
                total: this.merchantDistributorData.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onEdit (val) {
            if (val.status === 1) {
                this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberManage', query: val })
            } else if (val.status === 0) {
                this.checkData = val
                this.rightsDialogVisible = true
            }
        },
        async onChangeCheckStatus (val) {
            this.rightsDialogVisible = false
            await updateDistribution({ id: this.checkData.id, status: val, phone: this.checkData.phone })
            this.onQuery()
        },
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

    .topTitle {
        margin-right: 2rem;
        font-weight: bold;
    }

    .colred {
        color: #ff7a45;
        cursor: pointer;
    }

    .topColred {
        color: #ff7a45;
        cursor: pointer;
    }

    /deep/ .el-dialog__body {
        padding-top: 10px;
    }
</style>

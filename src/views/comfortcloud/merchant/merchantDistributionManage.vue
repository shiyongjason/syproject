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
                    <div class="query-col-title">分销员姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.name" placeholder="请输入分销员姓名" maxlength="50"></el-input>
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
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="status" slot-scope="scope">
                    {{scope.data.row.status===0?'待审核':scope.data.row.status===1?'审核通过':'审核不通过'}}
                </template>
                <template slot="name" slot-scope="scope">
                    <p class="coloedit title" @click="onNameEdit(scope.data.row)" v-if="scope.data.row.status===1">
                        {{scope.data.row.name}}
                    </p>
                    <p class="title" v-else>
                        {{scope.data.row.name}}
                    </p>
                </template>
                <template slot="updateTime" slot-scope="scope">
                    {{scope.data.row.status===0?'--':scope.data.row.status===1?parseUpdateTime(scope.data.row):'--'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <p class="colred title" @click="onEdit(scope.data.row)">
                        {{scope.data.row.status===0?'审核':scope.data.row.status===1?'查看奖励':'--'}}
                    </p>
                </template>
            </basicTable>
            <el-dialog title="审核分销员" :modal-append-to-body=false :append-to-body=false :visible.sync="rightsDialogVisible" width="30%" center>
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
            <el-dialog title="修改分销员姓名" :modal-append-to-body=false :append-to-body=false :visible.sync="editDialogVisible" width="550px" center>

                <div class="query-cont__row edit-center">
                    <div class="query-cont-col">
                        <div class="query-col-title">分销员姓名：</div>
                        <div class="query-col-input">
                            <el-input v-model="editName" placeholder="输入已认证的分销员名称" maxlength="50"></el-input>
                        </div>
                    </div>
                </div>
                <p class="query-cont__row">修改要求</p>
                <p class="query-cont__row">1、分销员需在微信中实名认证后才可获得奖励，仅可修改<span style="color:red;">1</span>次，请谨慎修改</p>
                <p class="query-cont__row">2、是否为实名认证可在“微信APP-我的-右上角点击...—实名认证”中查看</p>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="editCancel()">取消</el-button>
                    <el-button type="primary" @click="editConform()">确认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
import { updateDistribution, editDistributorName } from '../api'
import moment from 'moment'

export default {
    name: 'merchantDistributionManage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: '',
                name: '',
                status: ''
            },
            searchParams: {},
            editName: '',
            editId: 0,
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
            editDialogVisible: false,
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
                this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberReward', query: val })
            } else if (val.status === 0) {
                this.checkData = val
                this.rightsDialogVisible = true
            }
        },
        onNameEdit (val) {
            if (val.status === 1) {
                this.editName = ''
                this.editId = val.id
                this.editDialogVisible = true
            }
        },
        editCancel () {
            this.editDialogVisible = false
        },
        async editConform () {
            if (this.editName.length === 0) {
                this.$message({
                    message: '请输入修改名称！',
                    type: 'error'
                })
                return
            }
            this.editDialogVisible = false
            const data = await editDistributorName({ 'id': this.editId, 'name': this.editName })
            this.onSearch()
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
        },
        parseUpdateTime (val) {
            return moment(val.updateTime).format('YYYY-MM-DD HH:mm')
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

.edit-center {
    margin-top: 30px;
}

.topTitle {
    margin-right: 2rem;
    font-weight: bold;
}

.colred {
    color: #ff7a45;
    cursor: pointer;
}

.coloedit {
    color: red;
    cursor: pointer;
}

.topColred {
    color: #ff7a45;
    cursor: pointer;
}
.right-items {
    margin: 10px 0 30px 0;
    line-height: 25px;
}
/deep/ .el-dialog__body {
    padding-top: 10px;
}
</style>

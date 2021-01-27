<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">创建人手机号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">活动名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.activityName" placeholder="" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">审核状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.status" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待审核" value=1></el-option>
                            <el-option label="审核不通过" value=4></el-option>
                            <el-option label="推广中" value=2></el-option>
                            <el-option label="已失效" value=3></el-option>
                            <el-option label="已删除" value=5></el-option>
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
                        :isAction="true" :action-min-width="200">
                <template slot="status" slot-scope="scope">
                    {{scope.data.row.status===1?'待审核':scope.data.row.status===2?'推广中':scope.data.row.status===3?'已失效':scope.data.row.status===4?'审核不通过':'已删除'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <template class="action-active">
                        <el-button class="orangeBtn" @click="onPreviewActive(scope.data.row)">活动预览</el-button>
                        <span class="colred" @click="onOperate(scope.data.row)">
                            {{operationStatus(scope.data.row)}}
                        </span>
                    </template>
                </template>
            </basicTable>
        </div>
        <el-dialog title="审核门店活动" :visible.sync="checkActiveDialogShow" class="upload-show" width="400px"
                   :close-on-click-modal="false" :before-close="onCloseEditMonthDialog">
            <p>活动内容要求：</p>
            <p>1、露出的活动需实际业务匹配；</p>
            <p>2、活动内容需确保不涉及任何违法广告法等、违法信息。</p>
            <p>请确认活动信息无需后进行审核。</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkActive(0)">审核不通过</el-button>
                <el-button type="primary" @click="checkActive(1)">审核通过</el-button>
            </span>
        </el-dialog>
        <el-dialog title="活动预览" :visible.sync="activePreviewDialogShow" class="upload-show" width="400px"
                   :close-on-click-modal="false" :before-close="onCloseEditMonthDialog">
            <el-image :src="activePreviewUrl"></el-image>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { checkActiveStatus, operationActiveStatus } from '../api'
import { iotUrl } from '@/api/config'

export default {
    name: 'comfortcloudMemberActive',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                status: '',
                activityName: '',
                phone: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            CheckActiveData: {},
            errMessage: '',
            checkActiveDialogShow: false,
            activePreviewDialogShow: false,
            activePreviewUrl: '',
            updateIndexData: {},
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/mall/boss/wx/reward/import`,
                limit: 1,
                autoUpload: false,
                headers: {
                    refreshToken: sessionStorage.getItem('refreshToken'),
                    token: `Bearer ` + sessionStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                },
                data: {
                    operateUserName: ''
                }
            },
            tableLabel: [
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', width: 100 },
                { label: '创建手机号', prop: 'phone', width: 100 },
                { label: '创建人微信昵称', prop: 'nickName', width: 100 },
                { label: '活动城市', prop: 'cityName', width: 100 },
                { label: '活动名称', prop: 'activityName', width: 100 },
                { label: '活动地址', prop: 'countryName', width: 100 },
                { label: '活动开始时间', prop: 'startTime', formatters: 'dateTime', width: 100 },
                { label: '活动结束时间', prop: 'endTime', formatters: 'dateTime', width: 100 },
                { label: '活动状态', prop: 'status', width: 100 },
                { label: '备注', prop: 'remark', width: 100 }
            ],
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantActiveData: 'iotmerchantActiveData'
        })
    },
    mounted () {
        if (this.$route.query.phone && this.$route.query !== undefined) {
            this.queryParams.phone = this.$route.query.phone
            this.queryParams.distributorName = this.$route.query.name
        }
        this.onSearch()
    },
    activated () {
        this.onQuery()
    },
    // beforeRouteEnter (to, from, next) {
    //     newCache('merchantRewardData')
    //     next()
    // },
    // beforeRouteLeave (to, from, next) {
    //     console.log(to.name)
    //     if (to.name != 'merchantMemberInvitation') {
    //         clearCache('merchantRewardData')
    //     }
    //     next()
    // },
    methods: {
        ...mapActions({
            getmerchantActiveData: 'getmerchantActiveData'
        }),
        async onQuery () {
            await this.getmerchantActiveData(this.searchParams)
            this.tableData = this.merchantActiveData.records
            this.pagination = {
                pageNumber: this.merchantActiveData.current,
                pageSize: this.merchantActiveData.size,
                total: this.merchantActiveData.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onPreviewActive (val) {
            this.activePreviewDialogShow = true
            this.activePreviewUrl = val.poster
            console.log(this.activePreviewUrl)
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        operationStatus (val) {
            if (val.status === 1) {
                return ' 审核'
            } else if (val.status === 2) {
                return ' 失效'
            } else if (val.status === 3) {
                return ' 生效'
            } else if (val.status === 4) {
                return '----'
            } else if (val.status === 5) {
                return '----'
            }
        },
        onCloseEditMonthDialog () {
            this.checkActiveDialogShow = false
            this.activePreviewDialogShow = false
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        async checkActive (val) {
            this.checkActiveDialogShow = false
            if (val === 1) {
                await checkActiveStatus({
                    id: this.CheckActiveData.id,
                    remark: '',
                    auditResult: 2,
                    operator: this.userInfo.employeeName
                })
                this.onQuery()
            } else {
                this.$prompt('审核不通过的原因备注', '审核不通过的原因备注', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputErrorMessage: '备注不能为空',
                    inputPattern: /\S/
                }).then(async ({ value }) => {
                    console.log(value)
                    if (value) {
                        await checkActiveStatus({
                            'id': this.CheckActiveData.id,
                            'remark': value,
                            'auditResult': 4,
                            'operator': this.userInfo.employeeName
                        })
                        this.onQuery()
                    }
                }).catch(() => {
                })
            }
        },
        onOperate (val) {
            if (val.status === 2) {
                this.$confirm('该获得已在舒适云APP中推广，失效后，将不再展示，请确认是否继续操作？', '门店活动推广失效', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await operationActiveStatus({ 'id': val.id, 'operator': this.userInfo.employeeName, 'status': 3 })
                    this.$message({
                        message: '失效成功！',
                        type: 'success'
                    })
                    this.onQuery()
                })
            } else if (val.status === 3) {
                this.$confirm('该活动已失效，再次生效后该将重新展示在舒适云APP，是否继续生效？', '活动再次生效确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await operationActiveStatus({ 'id': val.id, 'operator': this.userInfo.employeeName, 'status': 2 })
                    this.$message({
                        message: '生效成功！',
                        type: 'success'
                    })
                    this.onQuery()
                })
            } else if (val.status === 1) {
                this.checkActiveDialogShow = true
                this.CheckActiveData = val
            }
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
        width: 40px;
        display: inline-block;
    }

    .colred-default {
        cursor: pointer;
        width: 40px;
        display: inline-block;
    }

    .redcolred {
        color: red;
        cursor: pointer;
    }

    .action-active {
        display: flex;
        flex-direction: column;
    }

    .topColred {
        color: #ff7a45;
        cursor: pointer;
    }

    /deep/ .el-dialog__body {
        padding-top: 10px;
    }
</style>

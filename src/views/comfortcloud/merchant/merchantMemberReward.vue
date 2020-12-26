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
                    <div class="flex-wrap-title">分销员姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.distributorName" placeholder="" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">奖励状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.settled" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未结算" value=0></el-option>
                            <el-option label="已结算" value=1></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">奖励月份：</div>
                    <div class="query-col-input">

                        <el-date-picker v-model="queryParams.startMonth" type="month" value-format='yyyy-MM'
                                        placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endMonth" type="month" value-format='yyyy-MM'
                                        placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                        <el-button type="primary" class="ml20" @click="onInput">导入订单</el-button>
                    </div>
                </div>
            </div>
            <!-- 表格使用老毕的组件 -->
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false'
                        :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'
                        :isAction="true"
                        :action-min-width="200">
                <template slot="source" slot-scope="scope">
                    {{scope.data.row.source==='1'?'微信小店':'好友推荐'}}
                </template>
                <template slot="rewardAmount" slot-scope="scope">
                    <p @click="onEditMoney(scope.data.row)" class="colred">
                        {{scope.data.row.rewardAmount}}</p>
                </template>
                <template slot="settled" slot-scope="scope">
                    {{scope.data.row.settled===0?'未结算':'已结算'}}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    {{setMerchantType(scope.data.row)}}
                </template>
                <template slot="rewardMonth" slot-scope="scope">
                    <p @click="onEditMonth(scope.data.row)" class="colred">
                        {{scope.data.row.rewardMonth}}</p>
                </template>
                <template slot="action" slot-scope="scope">
                    <template v-if="(scope.data.row.settled===1) ">
                        <p class="colred">--</p>
                    </template>
                    <template v-else>
                        <el-button class="orangeBtn" @click="onEdit(scope.data.row)">发放奖励</el-button>
                        <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                    </template>
                </template>
            </basicTable>
        </div>
        <el-dialog title="导入奖励明细" :visible.sync="uploadShow" class="upload-show" width="800px"
                   :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload
                class="upload-fault"
                ref="upload"
                :file-list="fileList"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary" slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照奖励明细模板内容导入数据，否则可能会出现导入异常</p>
            </el-upload>
            <div class="downloadExcel">
                <a href="/excelTemplate/订单明细模板.xlsx" download="订单明细模板.xls">下载奖励明细模板</a>
            </div>
            <div style="color: red">{{errMessage}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
            <el-dialog width="800px" title="上传结果" :visible.sync="errorShow" append-to-body>
                <div>
                    <span class="uploadTips">上传成功</span>
                </div>
            </el-dialog>
        </el-dialog>
        <el-dialog title="奖励归属月份编辑" :visible.sync="updateMonthShow" class="upload-show" width="400px"
                   :close-on-click-modal="false" :before-close="onCloseEditMonthDialog">
            <el-date-picker style="width: 200px" v-model="updateIndexData.rewardMonth"
                            clear-icon=""
                            type="month" value-format='yyyy-MM'
                            placeholder="" :picker-options="pickerOptionsStart">
            </el-date-picker>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editMonth(0)">取消</el-button>
                    <el-button type="primary" @click="editMonth(1)">确认</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { clearCache, newCache } from '../../../utils'
import { delInvitationOrder, downloadQuestionTemp, updateInvitationDetail } from '../api'
import { iotUrl } from '@/api/config'

export default {
    name: 'comfortcloudMemberReward',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                settled: '',
                phone: '',
                distributorName: '',
                endMonth: '',
                startMonth: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            uploadShow: false,
            updateMonthShow: false,
            updateIndexData: {},
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/api/outbound/import`,
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
                { label: '导入时间', prop: 'insertTime', formatters: 'dateTime', width: 100 },
                { label: '订单来源', prop: 'source', width: 100 },
                { label: '订单编号', prop: 'orderId', width: 100 },
                { label: '收货人', prop: 'consignee', width: 100 },
                { label: '手机号', prop: 'phone', width: 100 },
                { label: '收货人地址', prop: 'consigneeAddress', width: 100 },
                { label: '成交时间', prop: 'orderTime', width: 100 },
                { label: '商品名称', prop: 'productName', width: 100 },
                { label: '购买数量', prop: 'count', width: 100 },
                { label: '支付金额', prop: 'payAmount', width: 100 },
                { label: '推荐人会员编号', prop: 'inviteUuid', width: 100 },
                { label: '奖励金额（元）', prop: 'rewardAmount', width: 100 },
                { label: '分销员姓名', prop: 'distributorName', width: 100 },
                { label: '分销员手机号', prop: 'distributorPhone', width: 100 },
                { label: '奖励归属月份', prop: 'rewardMonth', width: 200 },
                { label: '奖励状态', prop: 'settled', width: 100 },
                { label: '结算说明', prop: 'settledExplain', width: 100 }
            ],
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantRewardData: 'iotmerchantRewardData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endRegisterTime
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
                    let beginDateVal = this.queryParams.startRegisterTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    activated () {
        this.onQuery()
    },
    beforeRouteEnter (to, from, next) {
        newCache('merchantRewardData')
        next()
    },
    beforeRouteLeave (to, from, next) {
        console.log(to.name)
        if (to.name != 'merchantMemberInvitation') {
            clearCache('merchantRewardData')
        }
        next()
    },
    methods: {
        ...mapActions({
            getmerchantRewardData: 'getmerchantRewardData'
        }),
        async onQuery () {
            await this.getmerchantRewardData(this.searchParams)
            this.tableData = this.merchantRewardData.records
            this.pagination = {
                pageNumber: this.merchantRewardData.current,
                pageSize: this.merchantRewardData.size,
                total: this.merchantRewardData.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onEdit (val) {
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        setMerchantType (val) {
            let type = ''
            if (val.role === 1) {
                type += '新人'
            } else if (val.role === 2) {
                type += '普通会员'
            }
            if (val.distributorStatus === 1) {
                type += '、分销员'
            }
            if (val.agentStatus === 10) {
                type += '、经销商'
            }

            return type
        },
        onInput () {
            this.uploadShow = true
        },
        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                try {
                    await this.$refs.upload.submit()
                } catch (e) {
                }
            } else {
                this.$message.error('请选择上传的文件')
                this.loading = false
            }
        },
        onDownload () {
            downloadQuestionTemp()
        },
        beforeAvatarUpload (file) {
            const isLt10M = file.size / (1024 * 1024 * 10) < 1
            // const isCsv = file.type === 'application/vnd.ms-excel'
            const isCsv = file.name.lastIndexOf('.') > 0 ? ['.xlsx', '.xls'].indexOf(file.name.slice(file.name.lastIndexOf('.'), file.name.length)) > -1 : false
            if (!isCsv) {
                // this.$message.error('上传文件只能是 excel 格式!')
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件只能是 excel 格式!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            if (!isLt10M) {
                // this.$message.error('上传文件大小不能超过 10MB!')
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件大小不能超过 10MB!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            return isCsv && isLt10M
        },
        uploadError (response) {
            const res = response
            console.log(JSON.parse(res.message).detail)
            this.$refs.upload.clearFiles()
            this.$message.error(JSON.parse(res.message).detail)
            this.loading = false
        },
        uploadSuccess (response) {
            this.$refs.upload.clearFiles()
            this.onQuery(this.searchParams)
            this.errorData = response.data
            this.uploadShow = false
            this.$message.success('文件上传成功')
            this.loading = false
        },
        onCloseDialog () {
            if (this.hasFile()) {
                this.$confirm('是否确定取消选中的文件', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.upload.clearFiles()
                    this.uploadShow = false
                    this.$message({
                        type: 'success',
                        message: '已取消选中的文件!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消删除'
                    })
                })
            } else {
                this.$refs.upload.clearFiles()
                this.uploadShow = false
            }
        },
        onCloseEditMonthDialog () {
            this.updateMonthShow = false
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        onEditMoney (val) {
            this.$prompt('奖励金额', '奖励金额编辑', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
                inputErrorMessage: '金额格式不正确',
                inputValue: val.rewardAmount
            }).then(({ value }) => {
                if (value.length > 6) {
                    this.$message({
                        message: '奖励金额不符',
                        type: 'error'
                    })
                    return
                }
                this.update({
                    id: val.id,
                    rewardAmount: value,
                    operateUserName: this.userInfo.employeeName
                })
            }).catch(() => {
            })
        },
        onEditMonth (val) {
            this.updateMonthShow = true
            this.updateIndexData = val
        },
        editMonth (val) {
            this.updateMonthShow = false
            if (val === 1) {
                this.update({
                    id: this.updateIndexData.id,
                    rewardMonth: this.updateIndexData.rewardMonth,
                    operateUserName: this.userInfo.employeeName
                })
            }
        },
        async update (val) {
            await updateInvitationDetail(val)
            this.onQuery()
        },
        onDelete (val) {
            this.$confirm('是否删除此条记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await delInvitationOrder({ id: val.id, operateUserName: this.userInfo.employeeName })
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                })
                this.onQuery()
            })
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

<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont ">
            <span>会员信息</span>
        </div>
        <div class="page-body-cont-top ">
            <img style="height: 4rem " :src="this.$route.query.avatarUrl" >
            <div class="top-box">
                <span>{{this.$route.query.nickName}}  </span>
                <span>手机号 ：{{this.$route.query.phone}}  </span>
            </div>
            <div class="top-box-right" >
                <span>注册时间： {{new Date(this.$route.query.createTime).toLocaleString()}}  </span>
                <span style="margin-left: 1rem">注册来源： {{this.$route.query.source==='1'?'  自主注册':'  好友推荐'}}</span>
                <span style="margin-left: 1rem">会员编号： {{this.$route.query.source}}</span>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <el-tabs v-model="tabIndex" type="card" @tab-click="handleClick">
                <el-tab-pane label="已注册" name="0">
                    <div class="page-body-cont">
                        <!-- 表格使用老毕的组件 -->
                        <basicTable :tableLabel="tableRegisterLabel" :tableData="tableRegisterData" :isShowIndex='true'
                                    :pagination="paginationRegister"
                                    @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="false">
                        </basicTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已成交" name="1">
                    <div class="page-body-cont">
                        <!-- 表格使用老毕的组件 -->
                        <basicTable :tableLabel="tableDoneLabel" :tableData="tableDoneData" :isShowIndex='true'
                                    :pagination="paginationDone"
                                    @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                            <template slot="rewardAmount" slot-scope="scope">

                                <p @click="onEditMoney(scope.data.row)" class="colred">{{scope.data.row.rewardAmount}}</p>
                            </template>
                            <template slot="rewardMonth" slot-scope="scope">
<!--                                <p @click="onEditMonth(scope.data.row)" class="colred">{{scope.data.row.rewardMonth}}</p>-->
                                <el-select v-model="scope.data.row.rewardMonth" placeholder="请选择" @change="onEditMonth(scope.data.row)">
                                    <el-option
                                        v-for=" item in monthOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                            <template slot="source" slot-scope="scope">
                                {{scope.data.row.source===1?'注册':'推荐'}}
                            </template>
                            <template slot="action" slot-scope="scope">
                                <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                            </template>
                        </basicTable>
                        <el-button type="primary" class="ml20" @click="onExport()">导入订单</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="上传订单明细" :visible.sync="uploadShow" class="upload-show" width="800px"
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
                <p slot="tip" class="el-upload__tip">2.批量导入的知识库仅支持文字描述，不支持图片和视频等格式</p>
                <p slot="tip" class="el-upload__tip">3.请按照知识库模板内容导入问题和答案，否则可能会出现导入异常</p>
            </el-upload>
            <div class="downloadExcel">
                <a href="/excelTemplate/订单明细模板.xlsx" download="订单明细模板.xls">下载订单明细模板</a>
            </div>
<!--            <el-button type="primary" @click="onDownload" class="download-template">下载订单明细模板</el-button>-->
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
<!--        <el-select v-model="inputMonth" placeholder="请选择" >-->
<!--            <el-option-->
<!--                v-for=" item in monthOptions"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--            </el-option>-->
<!--        </el-select>-->
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
import { delInvitationOrder, downloadQuestionTemp, updateInvitationDetail } from '../api'
import { iotUrl } from '@/api/config'

export default {
    name: 'merchantMemberInvitation',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                uuid: this.$route.query.uuid
            },
            searchParams: {},
            tableRegisterData: [],
            tableDoneData: [],
            inputMoney: '',
            inputMonth: '',
            paginationDone: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            paginationRegister: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableRegisterLabel: [
                { label: '邀请人手机号', prop: 'phone' },
                { label: '被邀请人昵称', prop: 'nick', width: '120px' },
                { label: '被邀请人手机号', prop: 'invitePhone' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime' }
            ],
            tableDoneLabel: [
                { label: '导入时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '订单来源', prop: 'source' },
                { label: '订单编号', prop: 'orderId' },
                { label: '收货人', prop: 'consignee' },
                { label: '手机号', prop: 'phone' },
                { label: '收件人地址', prop: 'consigneeAddress' },
                { label: '成交时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '商品名称', prop: 'productName' },
                { label: '购买数量', prop: 'count' },
                { label: '支付金额', prop: 'payAmount' },
                { label: '奖励金额', prop: 'rewardAmount' },
                { label: '奖励归属月份', prop: 'rewardMonth' }
            ],
            tabIndex: 0,
            uploadShow: false,
            loading: false,
            errorShow: false,
            editMoneyDialogVisible: false,
            editMonthDialogVisible: false,
            errMessage: '',
            fileList: [],
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/mall/wx/order/boss/import`,
                limit: 1,
                autoUpload: false,
                headers: { // todo I'm need a config file
                    refreshToken: sessionStorage.getItem('refreshToken'),
                    token: `Bearer ` + sessionStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                },
                data: {
                    operateUserName: ''
                }
            },
            monthOptions: [{
                value: '1月',
                label: '1月'
            }, {
                value: '2月',
                label: '2月'
            }, {
                value: '3月',
                label: '3月'
            }, {
                value: '4月',
                label: '4月'
            }, {
                value: '5月',
                label: '5月'
            }, {
                value: '6月',
                label: '6月'
            }, {
                value: '7月',
                label: '7月'
            }, {
                value: '8月',
                label: '8月'
            }, {
                value: '9月',
                label: '9月'
            }, {
                value: '10月',
                label: '10月'
            }, {
                value: '11月',
                label: '11月'
            }, {
                value: '12月',
                label: '12月'
            }]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantmemberInvitationRegisterData: 'iotmerchantmemberInvitationRegisterData',
            merchantmemberInvitationOrderData: 'iotmerchantmemberInvitationOrderData'
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
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findMerchantMemberInvitationRegistersituation: 'findMerchantMemberInvitationRegistersituation',
            findMerchantMemberInvitationOrdersituation: 'findMerchantMemberInvitationOrdersituation'
        }),
        async onQuery () {
            await this.findMerchantMemberInvitationRegistersituation(this.searchParams)
            await this.findMerchantMemberInvitationOrdersituation(this.searchParams)
            this.tableRegisterData = this.merchantmemberInvitationRegisterData.records
            this.tableDoneData = this.merchantmemberInvitationOrderData.records
            this.paginationRegister = {
                pageNumber: this.merchantmemberInvitationRegisterData.pages,
                pageSize: this.merchantmemberInvitationRegisterData.size,
                total: this.merchantmemberInvitationRegisterData.total
            }
            this.paginationDone = {
                pageNumber: this.merchantmemberInvitationOrderData.pages,
                pageSize: this.merchantmemberInvitationOrderData.size,
                total: this.merchantmemberInvitationOrderData.total
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
        onDelete (val) {
            this.$confirm('是否删除此条记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await delInvitationOrder({ id: val.id, operateUserName: this.$route.query.nickName })
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                })
                this.onQuery()
            })
        },
        onEditMoney (val) {
            this.$prompt('奖励金额', '奖励金额编辑', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[0-9]*$/,
                inputErrorMessage: '金额格式不正确',
                inputValue: val.rewardAmount
            }).then(({ value }) => {
                this.updataInvitation({ id: val.id, rewardAmount: value, operateUserName: this.$route.query.nickName })
            }).catch(() => {
            })
        },
        onEditMonth (val) {
            this.updataInvitation({ id: val.id, rewardMonth: val.rewardMonth, operateUserName: this.$route.query.nickName })
        },
        async updataInvitation (val) {
            await updateInvitationDetail(val)
            this.onQuery()
        },
        handleClick (tab, event) {
            this.tabIndex = tab.index
        },
        onExport () {
            this.uploadShow = true
        },
        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                try {
                    await this.$refs.upload.submit()
                    this.uploadShow = false
                    this.onQuery()
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
        uploadError () {
            this.$refs.upload.clearFiles()
            this.$message.error('文件上传失败，请重试！')
            this.loading = false
        },
        uploadSuccess (response) {
            this.$refs.upload.clearFiles()
            this.loading = false
            if (response.code === 200) {
                this.errorData = response.data
                this.errorShow = true
                this.uploadShow = false
                this.onQuery(this.searchParams)
            } else {
                this.$message.error(response.message)
            }
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
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
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

    /deep/ .el-dialog__body {
        padding-top: 10px;
    }

    .uploadTips {
        font-size: 16px;
        display: inline-block;
        margin: 5px;
    }

    .top-box {
        width: auto;
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        height: 4rem;
        justify-content: space-between;
        background: #ffffff;
    }
    .top-box-right {
        width: auto;
        margin-left: 3rem;
        display: flex;
        flex-direction: row;
        justify-content:flex-end;
        background: #ffffff;
    }
    .page-body-cont-top {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-content: flex-start;
        padding: 20px 24px;
        background: $whiteColor;

    }

</style>

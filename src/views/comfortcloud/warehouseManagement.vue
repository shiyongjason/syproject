<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>出库管理</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">设备ID：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.iotId" maxlength="20" placeholder="输入设备ID"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">出库时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startOutboundTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endOutboundTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                <el-button type="primary" class="ml20" @click="onOpenModel">导入数据</el-button>
                <el-button type="primary" class="ml20" @click="onExport">导出</el-button>
            </div>
        </div>
        <el-dialog title="上传出仓数据" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload class="upload-fault" ref="upload" :file-list="fileList" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary" slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照故障库模板内容导入故障数据，否则可能会出现导入异常</p>
            </el-upload>
            <el-button class="errorBtn" v-if="errorData.containsList.length > 0" @click="errorShow = true">上传失败数据</el-button>
            <div class="downloadExcel">
                <a href="/excelTemplate/出库管理导入模板.xls" download="出库管理导入模板.xls">下载出库管理导入模板</a>
            </div>
            <div style="color: red">{{errMessage}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
            <el-dialog width="800px" title="上传结果" :visible.sync="errorShow" append-to-body>
                <div>
                    <span class="uploadTips">上传数据：{{errorData.count}}条</span>
                </div>
                <div>
                    <span class="uploadTips">上传成功：{{errorData.successCount}}条</span>
                    <span class="uploadTips uploadErr">上传重复：{{errorData.containsCount}}条</span>
                </div>
                <div class="basic-table">
                    <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="errorData.containsList" :maxHeight='350'>
                    </basicTable>
                </div>
            </el-dialog>
        </el-dialog>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="outBoundList" :pagination="outBoundListPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='80'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row.id)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapState } from 'vuex'
import { downloadOutboundList, deleteOutboundList } from './api/index'
export default {
    name: 'equipmentError',
    data () {
        return {
            queryParams: {
                iotId: '',
                startOutboundTime: '',
                endOutboundTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            searchParams: {},
            tableData: [],
            errorData: {
                containsList: []
            },
            tableLabel: [
                { label: '出库时间', prop: 'outboundTime' },
                { label: '设备类型', prop: 'deviceType' },
                { label: '设备ID', prop: 'iotId' },
                { label: '经销商', prop: 'dealer' },
                { label: '经销商电话', prop: 'dealerPhone' }
            ],
            uploadShow: false,
            errorShow: false,
            errMessage: '',
            fileList: [],
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
            loading: false
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.endOutboundTime
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startOutboundTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime() - 86399000
                        )
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo,
            outBoundList: state => state.cloudmanage.outBoundList,
            outBoundListPagination: state => state.cloudmanage.outBoundListPagination
        })
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            onQuery: 'getOutboundList'
        }),
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery(this.searchParams)
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        uploadError () {
            console.log(1)
            this.$refs.upload.clearFiles()
            this.$message.error('文件上传失败，请重试！')
            this.loading = false
        },
        uploadSuccess (response) {
            console.log(response)
            this.$refs.upload.clearFiles()
            this.loading = false
            if (response.code === 200) {
                this.errorData = response.data
                this.errorShow = true
                this.onQuery(this.searchParams)
            } else {
                this.$message.error(response.message)
            }
        },
        onExport () {
            downloadOutboundList(this.queryParams)
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                try {
                    await this.$refs.upload.submit()
                } catch (e) { }
            } else {
                this.$message.error('请选择上传的文件')
                this.loading = false
            }
        },
        onOpenModel () {
            this.uploadShow = true
            this.errorData.containsList = []
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
                }).catch(() => { })
            } else {
                this.$refs.upload.clearFiles()
                this.uploadShow = false
            }
        },
        beforeAvatarUpload (file) {
            const isLt10M = file.size / (1024 * 1024 * 10) < 1
            const isCsv = file.name.lastIndexOf('.') > 0 ? ['.xlsx', '.xls'].indexOf(file.name.slice(file.name.lastIndexOf('.'), file.name.length)) > -1 : false
            if (!isCsv) {
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
        onDelete (id) {
            this.$confirm('确认要删除该条记录吗', '删除提示').then(async () => {
                await deleteOutboundList({ id: id, operateUserName: this.userInfo.employeeName })
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                })
                this.onQuery(this.searchParams)
            }).catch(() => { })
        }
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.upload-fault {
    margin-top: 30px;
}
.errorBtn {
    margin: 10px 0;
}
.download-template {
    margin-bottom: 30px;
}
.downloadExcel{
    margin-top: 10px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
.fault-code-edit {
    /deep/.el-dialog__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        min-height: 100px;
    }
}
.uploadTips {
    font-size: 16px;
    display: inline-block;
    margin: 5px;
}
.uploadErr {
    color: red;
}
.basic-table {
    margin: 10px 0;
}
</style>

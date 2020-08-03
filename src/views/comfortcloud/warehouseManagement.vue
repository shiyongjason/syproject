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
                    <el-date-picker v-model="queryParams.endOutboundTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onQuery(queryParams)">搜索</el-button>
                <el-button type="primary" class="ml20" @click="onOpenModel">导入新故障库</el-button>
                <el-button type="primary" class="ml20" @click="onExport">导出</el-button>
            </div>
        </div>
        <el-dialog title="上传故障库" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload class="upload-fault" ref="upload" :file-list="fileList" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary" slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照故障库模板内容导入故障数据，否则可能会出现导入异常</p>
            </el-upload>
            <!-- <el-button type="primary" @click="onDownload" class="download-template">下载故障模板库</el-button> -->
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
        </el-dialog>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="cloudEquipmentErrorList" :pagination="cloudEquipmentErrorPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' @onSortChange="onSortChange" :isAction="true" :actionMinWidth='80'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row.id)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { downloadOutboundList, updateCloudEquipment, deleteCloudEquipment } from './api/index'
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
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '出库时间', prop: 'outboundTime' },
                { label: '设备类型', prop: 'deviceType' },
                { label: '设备ID', prop: 'iotId' },
                { label: '经销商', prop: 'dealer' },
                { label: '经销商电话', prop: 'dealerPhone' }
            ],
            uploadShow: false,
            fileList: [],
            faultEdit: false,
            faultCodeEdit: {
                code: '',
                content: '',
                id: '',
                operateUserName: ''
            },
            rules: {
                code: [
                    { required: true, message: '请输入故障代码', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入故障内容', trigger: 'blur' }
                ]
            },
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
            loading: false,
            isCode: true
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
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        ...mapGetters({
            cloudEquipmentErrorList: 'cloudEquipmentErrorList',
            cloudEquipmentErrorPagination: 'cloudEquipmentErrorPagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            onQuery: 'getOutboundList'
        }),
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery(this.queryParams)
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
                this.$message.success('文件上传成功')
                this.uploadShow = false
                this.onQuery()
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
        onDownload () {
            downloadEquipmentErrorList()
        },
        onOpenModel () {
            this.uploadShow = true
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
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            } else {
                this.$refs.upload.clearFiles()
                this.uploadShow = false
            }
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.onQuery(this.queryParams)
            }
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
        onDelete (id) {
            this.$confirm('确认要删除该条记录吗', '删除提示').then(() => {
                deleteCloudEquipment({ id: id, operateUserName: this.userInfo.employeeName })
                this.onQuery(this.queryParams)
            })
        }
    },
    mounted () {
        this.onQuery(this.queryParams)
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
    margin-bottom: 20px;
}
.download-template {
    margin-bottom: 30px;
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
</style>

<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>设备ID入库</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">设备ID：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.iotId" maxlength="20" placeholder="输入设备ID"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">批次查询：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.batchNo">
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item.dataValue" :value="item" v-for="item in cloudImportDict" :key="item"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">产品渠道：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.deviceChannel" clearable>
                        <el-option label="工程端" value="1"></el-option>
                        <el-option label="零售端" value="0"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <el-checkbox :checked="false" :true-label="1" :false-label="2" v-model="queryParams.noVersion">无版本号
                </el-checkbox>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery(queryParams)">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onOpenModel">导入数据</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="设备ID导入" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload class="upload-fault" ref="upload" :file-list="fileList" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary" slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照设备id导入模板导入设备数据，否则可能会出现导入异常</p>
            </el-upload>
            <el-button type="primary" @click="onDownload" class="download-template">下载设备ID导入模板</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
        </el-dialog>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="cloudDeviceIDImportData.records" :pagination="deviceIDImportPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' @onSortChange="onSortChange" :isAction="true" :actionMinWidth='80'>
                <template slot="source" slot-scope="scope">
                    {{scope.data.row.source === 1 ? '人工导入': '设备上报'}}
                </template>
                <template slot="deviceChannel" slot-scope="scope">
                    {{scope.data.row.deviceChannel === 1 ? '工程端': '零售端'}}
                </template>
                <template slot="code" slot-scope="scope">
                    <p class="colred" @click="openFaultEdit(scope.data.row, 'code')">{{scope.data.row.code}}</p>
                </template>
                <template slot="content" slot-scope="scope">
                    <p class="colred" @click="openFaultEdit(scope.data.row,'content')">{{scope.data.row.content}}</p>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="deviceDetail(scope.data.row)">详情</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="上传结果" :visible.sync="importResultVisible" class="upload-show" width="60%" :close-on-click-modal="false">
            <div v-if="tableImportResultData">上传数据：{{tableImportResultData?tableImportResultData.allCount:0}} 条</div>
            <div v-if="tableImportResultData">上传成功：{{tableImportResultData?tableImportResultData.successCount:0}} 条
            </div>
            <div v-if="tableImportResultData">
                上传失败：{{tableImportResultData.failDevices?tableImportResultData.failDevices.length:0}} 条
            </div>
            <basicTable :isShowIndex="true" :tableLabel="tableImportResultLabel" :tableData="tableImportResultData.failDevices" :isAction="false" :actionMinWidth='80'>

            </basicTable>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onDownloadImpoort(tableImportResultData.failDevices)" :loading="loading">下 载</el-button>
                <el-button @click="importResultVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { downloadEquipmentIDImportList, downloadImportDeviceErrorList } from '../api/index'
import moment from 'moment'

export default {
    name: 'equipmentError',
    data () {
        return {
            queryParams: {
                batchNo: '',
                iotId: '',
                deviceChannel: '',
                pageNumber: 1,
                noVersion: 2,
                pageSize: 10
            },
            tableData: [],
            tableImportResultData: {},
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '批次', prop: 'batchNo' },
                { label: '设备型号', prop: 'productKey' },
                { label: '设备ID', prop: 'iotId' },
                { label: '秘钥', prop: 'deviceSecret' },
                { label: '入库时间', prop: 'storeDate', formatters: 'dateTime', sortable: true },
                { label: '入网时间', prop: 'netDate', formatters: 'dateTime', sortable: true },
                { label: '产品渠道', prop: 'deviceChannel' },
                { label: '版本号', prop: 'version' }
            ],
            tableImportResultLabel: [
                { label: '批次', prop: 'batchNo' },
                { label: '设备型号', prop: 'productKey' },
                { label: '设备名称', prop: 'deviceName' },
                { label: '设备ID', prop: 'iotId' },
                { label: '秘钥', prop: 'deviceSecret' },
                { label: '版本号', prop: 'version' }
            ],
            uploadShow: false,
            fileList: [],
            faultEdit: false,
            importResultVisible: false,
            faultCodeEdit: {
                code: '',
                content: '',
                id: '',
                noVersion: '',
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
                action: `${iotUrl}/api/user/device/import`,
                limit: 1,
                autoUpload: false,
                headers: { // todo I'm need a config file
                    refreshToken: localStorage.getItem('refreshToken'),
                    token: `Bearer ` + localStorage.getItem('token'),
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
        // pickerOptionsStart () {
        //     return {
        //         disabledDate: time => {
        //             let beginDateVal = this.queryParams.createEndTime
        //             if (beginDateVal) {
        //                 return (
        //                     time.getTime() > new Date(beginDateVal).getTime()
        //                 )
        //             }
        //         }
        //     }
        // },
        // pickerOptionsEnd () {
        //     return {
        //         disabledDate: time => {
        //             let beginDateVal = this.queryParams.createStartTime
        //             if (beginDateVal) {
        //                 return (
        //                     time.getTime() < new Date(beginDateVal).getTime()
        //                 )
        //             }
        //         }
        //     }
        // },
        ...mapGetters({
            cloudDeviceIDImportData: 'cloudDeviceIDImportData',
            deviceIDImportPagination: 'deviceIDImportPagination',
            cloudImportDict: 'cloudImportDict'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            onQuery: 'findCloudDeviceIDImportData',
            findCloudBrandNo: 'findCloudBrandNo'
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
            this.uploadShow = false
            if (response.code === 200) {
                this.$message.success('文件上传成功')
                if (response.data.failDevices) {
                    this.importResultVisible = true
                    this.tableImportResultData = response.data
                } else {
                    this.importResultVisible = false
                }
                this.onQuery()
                this.findCloudBrandNo()
            } else {
                this.$message.error(response.message)
            }
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
                } catch (e) {
                }
            } else {
                this.$message.error('请选择上传的文件')
                this.loading = false
            }
        },
        onDownload () {
            downloadEquipmentIDImportList()
        },
        async onDownloadImpoort (params) {
            await downloadImportDeviceErrorList(params)
            this.loading = false
            this.importResultVisible = false
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
        openFaultEdit (row, type) {
            if (type === 'code') {
                this.isCode = true
            } else if (type === 'content') {
                this.isCode = false
            }
            this.faultCodeEdit = {
                code: row.code,
                content: row.content,
                id: row.id
            }
            this.faultEdit = true
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
        onSaveFaultCode (formName) {
            if (this.loading) {
                return
            }
            this.loading = true
        },
        deviceDetail (val) {
            let date = new Date(val.netDate) // 传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
            console.log(date)
            this.$router.push({
                path: '/comfortcloud/equipmentOverview/deviceDetail',
                query: {
                    iotId: val.iotId,
                    subIotId: val.iotId,
                    deviceClass: '1',
                    createTime: Date.parse(date)
                }
            })
        }
    },
    mounted () {
        this.onQuery(this.queryParams)
        this.findCloudBrandNo()
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
    /deep/ .el-dialog__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        min-height: 100px;
    }
}
</style>

<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>设备故障</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">品类：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.categoryId">
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item.dataValue" :value="item.dataKey" v-for="item in cloudDict" :key="item.dataKey"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">品牌：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.brandName" maxlength="20" placeholder="输入品牌名称"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">故障代码：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.code" maxlength="20" placeholder="输入故障代码"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createStartTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.createEndTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery(queryParams)">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onOpenModel">导入新故障库</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="上传故障库" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload
                class="upload-fault"
                ref="upload"
                :file-list="fileList"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary"  slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持csv格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照故障库模板内容导入故障数据，否则可能会出现导入异常</p>
            </el-upload>
            <el-button type="primary" @click="onDownload" class="download-template">下载故障模板库</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑故障代码" :visible.sync="faultEdit" class="fault-code-edit" width="395px" :close-on-click-modal="false">
            <el-form ref="faultCodeEdit" :model="faultCodeEdit" :rules="rules" label-width="120px">
                <el-form-item label="故障代码:" label-width='100px' prop='code'>
                    <el-input type="text" v-model="faultCodeEdit.code" placeholder="请输入故障代码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="faultEdit = false">取 消</el-button>
                <el-button type="primary" @click="onSaveFaultCode('faultCodeEdit')" :loading="loading">确 定</el-button>
            </span>
        </el-dialog>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="cloudEquipmentErrorList" :pagination="cloudEquipmentErrorPagination"
                        @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'
                        @onSortChange="onSortChange"
                        :isAction="true" :actionMinWidth='80'>
                <template slot="source" slot-scope="scope">
                    {{scope.data.row.source === 1 ? '人工导入': '设备上报'}}
                </template>
                <template slot="code" slot-scope="scope">
                    <p class="colred" @click="openFaultEdit(scope.data.row)">{{scope.data.row.code}}</p>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="deleteFault(scope.data.row.id)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { downloadEquipmentErrorList, updateCloudEquipment, deleteCloudEquipment } from '../api/index'
export default {
    name: 'equipmentError',
    data () {
        return {
            queryParams: {
                createStartTime: '',
                createEndTime: '',
                createTimeSortType: '',
                categoryId: '',
                code: '',
                brandName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '来源', prop: 'source' },
                { label: '品类', prop: 'categoryName' },
                { label: '品牌', prop: 'brandName' },
                { label: '故障代码', prop: 'code' },
                { label: '故障内容', prop: 'content' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', sortable: true }
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
                ]
            },
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/api/device/breakdown/import`,
                limit: 1,
                autoUpload: false,
                headers: { // todo I'am need a config file
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
                    let beginDateVal = this.queryParams.createEndTime
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
                    let beginDateVal = this.queryParams.createStartTime
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
            cloudEquipmentErrorPagination: 'cloudEquipmentErrorPagination',
            cloudDict: 'cloudDict'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            onQuery: 'findCloudEquipmentErrorList',
            findCloudDict: 'findCloudDict'
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
        },
        uploadSuccess () {
            this.$refs.upload.clearFiles()
            this.loading = false
            this.$message.success('文件上传成功')
            this.uploadShow = false
            this.onQuery()
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        async onImport () {
            if (this.hasFile()) {
                this.loading = true
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                this.$refs.upload.submit()
            } else {
                this.$message.error('请选择上传的文件')
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
        openFaultEdit (row) {
            this.faultCodeEdit = {
                code: row.code,
                content: row.content,
                id: row.id
            }
            this.faultEdit = true
        },
        beforeAvatarUpload (file) {
            const isLt10M = file.size / (1024 * 10) < 10
            // const isCsv = file.type === 'application/vnd.ms-excel'
            const isCsv = file.name.lastIndexOf('.') > 0 ? ['.xlsx', '.xls'].indexOf(file.name.slice(file.name.lastIndexOf('.'), file.name.length)) > -1 : false
            if (!isCsv) {
                this.$message.error('上传文件只能是 excel 格式!')
                this.loading = false
            }
            if (!isLt10M) {
                this.$message.error('上传文件大小不能超过 10MB!')
                this.loading = false
            }
            return isCsv && isLt10M
        },
        onSaveFaultCode (formName) {
            if (this.loading) {
                return
            }
            this.loading = true
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        this.faultCodeEdit.operateUserName = this.userInfo.employeeName
                        await updateCloudEquipment(this.faultCodeEdit)
                        this.loading = false
                        this.faultEdit = false
                        this.$message.success('故障代码修改成功')
                        this.onQuery(this.queryParams)
                    } catch (e) {
                        this.$message.error('故障代码失败')
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        deleteFault (id) {
            this.$confirm('确认要删除该条故障码', '删除提示').then(() => {
                deleteCloudEquipment({ id: id, operateUserName: this.userInfo.employeeName })
                this.onQuery(this.queryParams)
            })
        }
    },
    mounted () {
        this.onQuery(this.queryParams)
        this.findCloudDict({ item: 'category' })
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
        /deep/.el-dialog__body{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
</style>

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
                    <el-date-picker v-model="queryParams.startOutboundTime" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endOutboundTime" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">客户姓名：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="输入客户姓名"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">客户电话：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.dealerPhone" maxlength="20" placeholder="输入客户电话"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title search-title">出库类型：</div>
                <el-select v-model="queryParams.outboundType">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in outboundTypeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                <el-button type="primary" class="ml20" @click="onShowRecordDialog">新增出库</el-button>
                <el-button type="primary" class="ml20" @click="onOpenModel">导入数据</el-button>
                <el-button type="primary" class="ml20" @click="onExport">导出</el-button>
            </div>
        </div>
        <el-dialog title="上传出库数据" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload class="upload-fault" ref="upload" :file-list="fileList" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary" slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照设备出库模板内容导入数据，否则可能会出现导入异常</p>
                <p slot="tip" class="el-upload__tip">3.在模版中完成内容填写后，请将表格内已输入的内容复制到新的Excel中再进行导入</p>
            </el-upload>
            <el-button class="errorBtn" v-if="errorData.failList.length > 0" @click="errorShow = true">上传失败数据</el-button>
            <div class="downloadExcel">
                <a href="/excelTemplate/出库管理导入模板.xls" download="出库管理导入模板.xls">下载出库管理导入模板</a>
            </div>
            <div style="color: red">{{errMessage}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
            <el-dialog width="1000px" title="上传结果" :visible.sync="errorShow" append-to-body>
                <div>
                    <span class="uploadTips">上传数据：{{errorData.count}}条</span>
                </div>
                <div>
                    <span class="uploadTips">上传成功：{{errorData.successCount}}条</span>
                </div>
                <div>
                    <span class="uploadTips uploadErr">上传失败：{{errorData.failCount}}条</span>
                </div>
                <div class="basic-table">
                    <basicTable :isShowIndex="true" :tableLabel="errTableLabel" :tableData="errorData.failList" :maxHeight='350'>
                    </basicTable>
                </div>
            </el-dialog>
        </el-dialog>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="outBoundList" :pagination="outBoundListPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='90'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row.id)">删除</el-button>
                </template>
                <template slot="outboundType" slot-scope="scope">
                    <p v-bind:class="{ 'red-content' : scope.data.row.outboundType === '出库类型错误' }">{{ scope.data.row.outboundType }}</p>
                </template>
                <template slot="deviceStatus" slot-scope="scope">
                    <p>{{ scope.data.row.deviceStatus === 1 ? '在线' : (scope.data.row.deviceStatus === 2 ? '--' : '离线') }}</p>
                </template>
            </basicTable>
        </div>
        <el-dialog :title="isEditRecord ? '修改出库' : '新增出库'" :modal-append-to-body=false :append-to-body=false :close-on-click-modal="false" :visible.sync="addRecordDialogVisible" width="50%">
            <el-form class="add-record-form" ref="addRecord" :model="addRecord" :rules="rules" label-width="120px">
                <el-form-item label-width="0">
                    <el-col :span="8">
                        <el-form-item label="归属品类：" prop="deviceCategory">
                            <el-select v-model="addRecord.deviceCategory" @change="deviceCategorySelectChanged" :disabled="isEditRecord">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.name" :value="item.name" v-for="item in cloudOutboundCategoryList" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="3">
                        <el-form-item label="商品型号：" prop="deviceType">
                            <el-select v-model="addRecord.deviceType" @change="deviceTypeSelectChanged" :disabled="isEditRecord">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.name" :value="item.name" v-for="(item,index) in cloudOutboundDeviceList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="设备数量：" prop="amount">
                    <el-input v-isNum:0 style="width: 200px" placeholder="请输入设备数量" v-model="addRecord.amount" :disabled="!canInputDeviceAmount || isEditRecord"></el-input>
                </el-form-item>
                <el-form-item label="设备ID：" prop="iotId">
                    <el-input v-model.trim="addRecord.iotId" show-word-limit placeholder="请输入设备ID" :disabled="canInputDeviceAmount || isEditRecord"></el-input>
                </el-form-item>
                <el-form-item label="出库类型：" prop="outboundType">
                    <el-select v-model="addRecord.outboundType">
                        <el-option v-for="item in outboundTypeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-col :span="8">
                        <el-form-item label="客户姓名：" prop="dealer">
                            <el-autocomplete class="inline-input" v-model="addRecord.dealer" :fetch-suggestions="dealerRequest" placeholder="请输入客户姓名" :trigger-on-focus="false" @select="dealerChanged" :disabled="isEditRecord" :maxlength="20"></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="3">
                        <el-form-item label="客户电话：" prop="dealerPhone">
                            <el-input v-model.trim="addRecord.dealerPhone" show-word-limit placeholder="输入客户电话" :disabled="isEditRecord" :maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button name="white-color" class="ml20" @click="onAddRecordCancel">取消</el-button>
                    <el-button type="primary" @click="onAddRecord" :loading="loading">{{ loading ? '提交中 ...' : '确认出库' }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapState, mapGetters } from 'vuex'
import { downloadOutboundList, deleteOutboundList, addCloudOutbound, changeCloudOutbound } from './api/index'
export default {
    name: 'equipmentError',
    data () {
        return {
            outboundTypeOptions: [
                { label: '样品', value: '样品' },
                { label: '合同履约提货', value: '合同履约提货' },
                { label: '工程端', value: '工程端' }
            ],
            queryParams: {
                iotId: '',
                startOutboundTime: '',
                endOutboundTime: '',
                pageNumber: 1,
                pageSize: 10,
                outboundType: '',
                dealer: this.$route.query.dealer ? this.$route.query.dealer : '',
                dealerPhone: this.$route.query.phone ? this.$route.query.phone : ''
            },
            searchParams: {},
            tableData: [],
            errorData: {
                failList: []
            },
            tableLabel: [
                { label: '出库时间', prop: 'outboundTime', formatters: 'date' },
                { label: '品类', prop: 'deviceCategory' },
                { label: '设备型号', prop: 'deviceType' },
                { label: '设备ID', prop: 'iotId' },
                { label: '数量', prop: 'amount' },
                { label: '出库类型', prop: 'outboundType' },
                { label: '客户姓名', prop: 'dealer' },
                { label: '客户电话', prop: 'dealerPhone' },
                { label: '设备状态', prop: 'deviceStatus' }
            ],
            errTableLabel: [
                { label: '出库时间', prop: 'outboundTime', formatters: 'date' },
                { label: '品类', prop: 'deviceCategory' },
                { label: '设备型号', prop: 'deviceType' },
                { label: '设备ID', prop: 'iotId' },
                { label: '数量', prop: 'amount' },
                { label: '出库类型', prop: 'outboundType' },
                { label: '客户姓名', prop: 'dealer' },
                { label: '客户电话', prop: 'dealerPhone' },
                { label: '失败原因', prop: 'reason' }
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
                    refreshToken: localStorage.getItem('refreshToken'),
                    token: `Bearer ` + localStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                },
                data: {
                    operateUserName: ''
                }
            },
            loading: false,
            isEditRecord: false,
            addRecordDialogVisible: false,
            addRecord: {
                deviceCategory: '',
                deviceType: '',
                amount: '',
                iotId: '',
                outboundType: '',
                dealer: '',
                dealerPhone: ''
            },
            canInputDeviceAmount: true, // 是否可以填写设备数量
            rules: {
                iotId: [
                    { required: true, message: '请填写设备ID', trigger: 'blur' }
                ],
                outboundType: [
                    { required: true, message: '请选择出库类型', trigger: 'change' }
                ],
                dealer: [
                    { required: true, message: '请填写客户姓名', trigger: 'blur' }
                ],
                dealerPhone: [
                    { required: true, message: '请填写客户电话', trigger: 'blur' }
                ],
                deviceCategory: [{
                    validator: (rule, value, callback) => {
                        if (this.isEditRecord) {
                            return callback()
                        }
                        if (value == null || value.length === 0) {
                            return callback(new Error('请选择品类'))
                        }

                        callback()
                    },
                    trigger: 'change'
                }],
                deviceType: [{
                    validator: (rule, value, callback) => {
                        if (this.isEditRecord) {
                            return callback()
                        }
                        if (value == null || value.length === 0) {
                            return callback(new Error('请选择设备类型'))
                        }

                        callback()
                    },
                    trigger: 'change'
                }],
                amount: [{
                    validator: (rule, value, callback) => {
                        if (this.isEditRecord) {
                            return callback()
                        }
                        if (value == null || value.length === 0) {
                            return callback(new Error('请填写数量'))
                        }

                        callback()
                    },
                    trigger: 'blur'
                }]
            }
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
        }),
        ...mapGetters({
            cloudOutboundDeviceList: 'cloudOutboundDeviceList',
            cloudOutboundMerchantList: 'cloudOutboundMerchantList',
            cloudOutboundCategoryList: 'cloudOutboundCategoryList'
        })
    },
    mounted () {
        // if (this.$route.params.dealer && this.$route.params.dealer !== undefined) {
        //     this.queryParams.dealer = decodeURIComponent(this.$route.params.dealer)
        // }
        // if (this.$route.params.phone && this.$route.params.phone !== undefined) {
        //     this.queryParams.phone = decodeURIComponent(this.$route.params.phone)
        // }
        this.onSearch()
        this.findCloudOutboundCategoryList()
    },
    methods: {
        ...mapActions({
            onQuery: 'getOutboundList',
            findCloudOutboundDeviceList: 'findCloudOutboundDeviceList',
            findCloudOutboundMerchantList: 'findCloudOutboundMerchantList',
            findCloudOutboundCategoryList: 'findCloudOutboundCategoryList',
            clearCloudOutboundDeviceList: 'clearCloudOutboundDeviceList'
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
            this.errorData.failList = []
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
        },
        async onEdit (data) {
            this.isEditRecord = true
            this.addRecord = data
            this.addRecordDialogVisible = true
            if (this.$refs['addRecord']) {
                this.$refs['addRecord'].clearValidate()
            }
        },
        onShowRecordDialog () {
            this.isEditRecord = false
            this.addRecord = {
                deviceCategory: '',
                deviceType: '',
                amount: '',
                iotId: '',
                outboundType: '',
                dealer: '',
                dealerPhone: ''
            }
            this.clearCloudOutboundDeviceList()
            this.addRecordDialogVisible = true
            setTimeout(() => {
                if (this.$refs['addRecord']) {
                    this.$refs['addRecord'].clearValidate()
                }
            }, 50)
        },
        onAddRecordCancel () {
            this.addRecordDialogVisible = false
        },
        onAddRecord () {
            this.$refs['addRecord'].validate((valid) => {
                if (valid) {
                    this.uploadOutbound()
                } else {
                    return false
                }
            })
        },
        async uploadOutbound () {
            if (this.isEditRecord) {
                await changeCloudOutbound({ id: this.addRecord.id, outboundType: this.addRecord.outboundType })
                this.$message.success('修改成功')
            } else {
                await addCloudOutbound(this.addRecord)
                this.$message.success('新增成功')
            }
            this.addRecordDialogVisible = false

            this.onSearch()
        },
        async dealerRequest (query, cb) {
            if (query.length >= 2) {
                await this.findCloudOutboundMerchantList({ name: query })

                const dealerOptions = this.cloudOutboundMerchantList.map((e) => { return { 'value': e.companyName } })
                cb(dealerOptions)
            } else {
                // eslint-disable-next-line standard/no-callback-literal
                cb([])
            }
        },
        dealerChanged (val) {
            for (let i = 0; i < this.cloudOutboundMerchantList.length; i++) {
                let company = this.cloudOutboundMerchantList[i]
                if (company.companyName === val.value) {
                    this.addRecord.dealerPhone = company.contactNumber
                    this.$refs['addRecord'].clearValidate(['dealerPhone'])
                    return
                }
            }
        },
        async deviceCategorySelectChanged () {
            this.addRecord.deviceType = ''

            for (let i = 0; i < this.cloudOutboundCategoryList.length; i++) {
                let category = this.cloudOutboundCategoryList[i]
                if (category.name === this.addRecord.deviceCategory) {
                    await this.findCloudOutboundDeviceList({ categoryId: category.id })
                    return
                }
            }
        },
        deviceTypeSelectChanged (e) {
            for (let i = 0; i < this.cloudOutboundDeviceList.length; i++) {
                let device = this.cloudOutboundDeviceList[i]
                if (device.name === this.addRecord.deviceType) {
                    if (device.deviceClass === 1) {
                        this.addRecord.amount = 1
                        this.$refs['addRecord'].clearValidate(['amount'])
                        this.canInputDeviceAmount = false
                        this.addRecord.iotId = ''
                    } else {
                        this.canInputDeviceAmount = true
                        this.addRecord.iotId = this.randomString(16)
                        this.$refs['addRecord'].clearValidate(['iotId'])
                    }
                    break
                }
            }
        },
        randomString (e) {
            e = e || 32
            let t = 'ABCDEFGHJKMNPQRSTWXYZ1234567890'
            let a = t.length
            let n = ''
            for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
            return n
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
.downloadExcel {
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
.red-content {
    color: red;
}

.search-title {
    white-space: nowrap;
}

.add-record-form {
    margin: 30px 0;
}
</style>

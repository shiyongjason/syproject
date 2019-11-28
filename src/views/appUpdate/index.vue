<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">产品：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.product" clearable>
                        <el-option v-for="(item,index) in productType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">平台：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.platformType" clearable>
                        <el-option v-for="(item,index) in platType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.beginDate" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.endDate" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="请选择时间" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <!-- 按钮权限 -->
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onNewVersion">新建版本</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='280'>
                <template slot="status" slot-scope="scope">
                    <el-switch v-model="scope.data.row.status" @change='onChangeForced(scope.data.row)' active-color="#13ce66">
                    </el-switch>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" v-if="scope.data.row.platformType == 1" @click="showQR(scope.data.row)">二维码</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog :title="title" :visible.sync="resultDialogVisible" :close-on-click-modal='false' width="30%" center>
            <el-form ref="dueform" :model="dueForm" :rules="rules" label-width="120px">
                <el-form-item label="平台:" label-width='120px' prop='platformType'>
                    <el-select v-model="dueForm.platformType" clearable>
                        <el-option v-for="(item,index) in platType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show='uploadAPK' label="上传apk：" label-width='120px'>
                    <div>
                        <el-upload ref="upload" class="upload-demo" v-bind="uploadInfo" :on-remove="handleRemove" :before-upload='befUpload' :on-exceed='onExceed' :on-success='onSuccess'>
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="产品：" label-width='120px' prop='product'>
                    <el-select v-model="dueForm.product" clearable>
                        <el-option v-for="(item,index) in productType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号:" label-width='120px' prop='versionCode'>
                    <el-input v-model="dueForm.versionCode" :placeholder="placeholder" maxlength="25" :disabled='disabled'></el-input>
                </el-form-item>
                <el-form-item label="是否强制更新:" label-width='120px' prop='forced'>
                    <el-switch v-model="dueForm.forced"></el-switch>
                </el-form-item>
                <el-form-item label="版本更新描述:" label-width='120px'>
                    <el-input type="textarea" placeholder="请输入内容" v-model="dueForm.remark" maxlength="50">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resultDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSure('dueform')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="二维码" :visible.sync="qrcodeDialogVisible" width="30%" center>
            <div style="text-align: center">
                <canvas id="canvas" width='200' height="200"></canvas>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="qrcodeDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
const AppInfoParser = require('app-info-parser')
import QRCode from 'qrcode'
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
import { getAppVersionList, addAppVersion, updateAppVersionState, getAppVersionDetail, editAppVersionDetail, deleteAppVersion } from './api/index'
export default {
    name: 'enterpriseCA',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.endDate
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
                    let beginDateVal = this.queryParams.beginDate
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime() - 3600 * 1000 * 24
                        )
                    }
                }
            }
        },
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    reservedName: true
                },
                accept: '.apk',
                name: 'multiFile',
                limit: 1
            }
        }
    },
    data () {
        return {
            rules: {
                platformType: [
                    { required: true, message: '请选择平台', trigger: 'change' }
                ],
                product: [
                    { required: true, message: '请选择产品', trigger: 'change' }
                ],
                versionCode: [
                    { required: true, message: '请输入版本号', trigger: 'blur' }
                ],
                forced: [
                    { required: true, message: '请确定是否强制更新', trigger: 'change' }
                ]
            },
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                platformType: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '产品', prop: 'productN' },
                { label: '平台', prop: 'platformTypeN' },
                { label: '版本号', prop: 'versionCode' },
                { label: '版本状态', prop: 'status' },
                { label: '强制更新', prop: 'forcedN' },
                { label: '更新描述', prop: 'remark' },
                { label: '下载地址', prop: 'versionAddress' },
                { label: '创建者', prop: 'createUid' },
                { label: '更新时间', prop: 'updateTime', formatters: 'dateTime' }
            ],
            platType: [
                { value: '', label: '全部' },
                { value: 1, label: '安卓' },
                { value: 2, label: '苹果' }
            ],
            productType: [
                { value: '', label: '全部' },
                { value: 1, label: '单分享' },
                { value: 2, label: 'IOT' }
            ],
            resultDialogVisible: false,
            qrcodeDialogVisible: false,
            dueForm: {
                platformType: ''
            },
            disabled: true,
            placeholder: '请上传apk',
            uploadAPK: true,
            title: '新建版本'
        }
    },
    watch: {
        'dueForm.platformType': function (val) {
            if (val == '2') {
                this.disabled = false
                this.placeholder = '请输入版本号'
                this.uploadAPK = false
            } else {
                this.disabled = true
                this.placeholder = '请上传apk'
                this.uploadAPK = true
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // console.log(this.searchParams)
            const { data } = await getAppVersionList(this.searchParams)
            // console.log(data)
            this.tableData = data.data.records
            this.pagination = {
                pageNumber: data.data.current,
                pageSize: data.data.size,
                total: data.data.total
            }
            this.tableData.map(i => {
                i.productN = i.product == 1 ? '单分享' : i.product == 2 ? 'IOT' : i.product
                i.platformTypeN = i.platformType == 1 ? '安卓' : i.platformType == 2 ? '苹果' : i.platformType
                i.forcedN = i.forced ? '是' : '否'
            })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'product', '')
            this.$set(this.queryParams, 'platformType', '')
            this.$set(this.queryParams, 'beginDate', '')
            this.$set(this.queryParams, 'endDate', '')
            this.onSearch()
        },
        onNewVersion () {
            this.title = '新建版本'
            this.dueForm = {}
            this.$nextTick(() => {
                this.$refs.dueform.clearValidate()
                this.$refs.upload.clearFiles()
            })
            this.resultDialogVisible = true
        },
        onSure (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const params = {
                        status: false,
                        versionAddress: '-',
                        ...this.dueForm
                    }
                    console.log(params)
                    if (params.id) {
                        params.status = false
                        params.updateUid = this.userInfo.jobNumber
                        await editAppVersionDetail(params)
                    } else {
                        params.createUid = this.userInfo.jobNumber
                        await addAppVersion(params)
                    }
                    this.resultDialogVisible = false
                    this.onSearch()
                } else {
                    return false
                }
            })
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        handleRemove () {
            console.log(1)
        },
        onExceed () {
            this.$message.error(`请删除apk后重新上传`)
        },
        befUpload (file) {
            // console.log(file)
            const parser = new AppInfoParser(file)
            parser.parse().then(async result => {
                // console.log('app info ----> ', result)
                this.$set(this.dueForm, 'versionCode', result.versionName)
            }).catch(err => {
                console.log('err ----> ', err)
            })
        },
        onSuccess (res) {
            this.dueForm.versionAddress = res.data.accessUrl
        },
        async onEdit (row) {
            console.log(row)
            const { data } = await getAppVersionDetail(row.id)
            console.log(data.data)
            this.dueForm = data.data
            this.title = '编辑版本'
            this.resultDialogVisible = true
            this.$nextTick(() => {
                this.$refs.upload.clearFiles()
            })
        },
        async showQR (row) {
            if (!row.versionAddress || row.platformType == 2) {
                this.$message.error('无下载地址')
                return
            }
            console.log(row)
            const { data } = await getAppVersionDetail(row.id)
            this.dueForm = data.data
            this.qrcodeDialogVisible = true
            if (!this.dueForm.versionAddress) return
            this.$nextTick(() => {
                var canvas = document.getElementById('canvas')
                QRCode.toCanvas(canvas, this.dueForm.versionAddress, function (error) {
                    if (error) console.error(error)
                    // console.log('QRCode success!')
                })
            })
        },
        async onDelete (row) {
            this.$confirm(`是否确认删除该产品?`, '确认删除', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消'
            }).then(async () => {
                await deleteAppVersion(row.id)
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                })
                this.onQuery()
            })
        },
        async onChangeForced (row) {
            row.product = +row.product
            try {
                await updateAppVersionState(row)
            } catch {
                this.onQuery()
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.add-tags-dialog {
    padding-top: 20px;
}
/deep/ .el-dialog {
    min-width: 520px;
}
/deep/ .el-dialog__body {
    min-height: 0 !important;
}
/deep/ .el-textarea__inner {
    height: 100px;
}
</style>

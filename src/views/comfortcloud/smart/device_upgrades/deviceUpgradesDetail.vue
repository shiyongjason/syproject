<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="title-cont"><span class="title-cont__label">{{`设备${isCommon ? '通用' : '定向'}升级`}}</span></div>
            <div class="upgrade-content">
                <div class="upgrade-content__row">
                    <div class="upgrade-content__col">
                        <h2>设备型号：</h2>
                        <div>{{ detailInfo.typeName }}</div>
                    </div>
                    <div class="upgrade-content__col">
                        <h2>升级完成：</h2>
                        <div>{{ detailInfo.completeUpgrade }}个</div>
                    </div>
                </div>
                <div class="upgrade-content__row">
                    <div class="upgrade-content__col">
                        <h2>{{`${isCommon ? '通用' : '定向'}升级固件版本`}}：</h2>
                        <div>{{ detailInfo.version }}</div>
                    </div>
                    <div class="upgrade-content__col">
                        <h2>未升级完成：</h2>
                        <div>{{ detailInfo.incompleteUpgrade }}个</div>
                    </div>
                </div>
                <div class="upgrade-content__row">
                    <div class="upgrade-content__col">
                        <h2>备注：</h2>
                        <div>{{ detailInfo.remark || '-' }}</div>
                    </div>
                </div>
            </div>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">设备ID：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.iotId" placeholder="请输入设备ID" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery()">查询</h-button>
                    <h-button @click="onReset()">重置</h-button>
                </div>
            </div>
            <div class="button-cont" v-if="!isCommon">
                <h-button type='create' @click="onShowAddDevice">新建数据</h-button>
                <h-button type='create' @click="onShowImportDevice">导入数据</h-button>
            </div>
            <div class="page-table">
                <basicTable :isShowIndex="false" :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="!isCommon">
                    <template slot="createTime" slot-scope="scope">
                        {{ moment(scope.data.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onDeleteDevice(scope.data.row.id)">删除</h-button>
                    </template>
                </basicTable>
            </div>
        </div>
        <el-dialog title="新增数据" :visible.sync="showAddDialog" width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="设备ID：" prop="iotId">
                    <el-input v-model.trim="form.iotId" placeholder="请输入设备ID"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="showAddDialog = false">取消</h-button>
                <h-button type="primary" @click="onSave">确定</h-button>
            </span>
        </el-dialog>
        <el-dialog title="定向升级设备ID导入" :visible.sync="showImportDialog" class="upload-show" width="800px" :close-on-click-modal="false">
            <el-upload class="upload-fault" ref="upload" :file-list="fileList" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload" v-bind="uploadData">
                <el-button type="primary" slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照设备定向升级导入模板内容导入数据，否则可能会出现导入异常</p>
            </el-upload>
            <div class="download-excel">
                <a href="/excelTemplate/设备定向升级导入模板.xlsx" download="设备定向升级导入模板.xlsx"><i class="icon el-icon-download"></i>下载设备定向升级导入模板</a>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
        </el-dialog>
        <el-dialog title="定向升级设备导入结果" :visible.sync="showErrorDialog" class="upload-show" width="800px" :close-on-click-modal="false">
            <div class="mb10">导入成功：{{ errorInfo.successNumber }}条</div>
            <div class="mb10">导入失败：{{ errorInfo.failNumber }}条</div>
            <basicTable :isShowIndex="false" :tableLabel="errorTableLabel" :tableData="errorTableData" :isPagination="false" :isAction="false" :maxHeight="300">
            </basicTable>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showErrorDialog = false">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import moment from 'moment'
import { findDeviceUpgradesInfo, findDeviceUpgradesInfoList, createDeviceUpgradesDirectional, deleteDeviceUpgradesDirectional } from '../api/index'
import * as Api from '@/interface/iot-api'
import { iotUrl } from '@/api/config'
import { DEVICE_UPGRADE_IS_COMMON_KEY } from '../const'

interface Query {
    [key: string]: any
}

@Component({
    name: 'deviceUpgradeDetail'
})
export default class EquipmentUpgrade extends Vue {
    moment = moment
    // 搜索条件
    queryParams: Query = {
        id: this.$route.query.id,
        iotId: '',
        pageNumber: 1,
        pageSize: 10
    }
    tableData: any[] = []
    tableLabel: any = [
        { label: '导入时间', prop: 'createTime' },
        { label: '设备ID', prop: 'iotId' },
        { label: '当前固件版本', prop: 'version' }
    ]
    pagination: any = {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    }

    fileList: any = []
    detailInfo: Api.UpgradeDetailResponse = {}
    showAddDialog: boolean = false
    showImportDialog: boolean = false
    form: any = {
        id: this.$route.query.id,
        iotId: '',
        operator: ''
    }
    rules: any = {
        iotId: [
            { required: true, message: '请输入设备ID' }
        ]
    }
    loading: boolean = false
    showErrorDialog: boolean = false
    errorTableData: any[] = []
    errorTableLabel: any = [
        { label: '设备ID', prop: 'iotId' }
    ]
    errorInfo: any = {
        successNumber: '',
        failNumber: ''
    }

    get isCommon () {
        // TODO: 这里有个坑，这里只能用 == 不可用 ===
        return this.detailInfo.isCommon == DEVICE_UPGRADE_IS_COMMON_KEY.YES
    }

    get uploadData () {
        return {
            accept: '.xlsx,.xls',
            action: `${iotUrl}/api/boss/device-upgrades/upload`,
            limit: 1,
            autoUpload: false,
            headers: {
                refreshToken: localStorage.getItem('refreshToken'),
                token: `Bearer ` + localStorage.getItem('token'),
                AccessKeyId: '5ksbfewexbfc'
            },
            data: {
                id: this.$route.query.id,
                phone: this.userInfo.user_name
            }
        }
    }

    @State('userInfo') userInfo: any

    mounted () {
        this.onFindDetailInfo()
        this.onQuery()
    }

    /**
     * 查询设备升级详情信息
     */
    async onFindDetailInfo () {
        const { data } = await findDeviceUpgradesInfo({ id: this.$route.query.id })
        this.detailInfo = data.data
    }
    /**
     * 查询设备类型对应的设备列表
     */
    async onQuery () {
        const { data } = await findDeviceUpgradesInfoList(this.queryParams)
        this.tableData = data.data.records
        this.pagination = {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        }
    }
    onReset () {
        this.queryParams.iotId = ''
        this.queryParams.pageNumber = 1
        this.queryParams.pageSize = 10
        this.onQuery()
    }
    onDeleteDevice (id) {
        this.$confirm('删除数据后设备会默认升级到通用版本，请确认是否继续删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await deleteDeviceUpgradesDirectional({ id, phone: this.userInfo.user_name })
            this.$message.success('设备删除成功！')
            this.onQuery()
        }).catch(() => {

        })
    }

    onShowAddDevice () {
        this.showAddDialog = true
        this.form.iotId = ''
        this.$nextTick(() => {
            (this.$refs.form as any).clearValidate()
        })
    }

    onShowImportDevice () {
        this.showImportDialog = true
    }

    onSave () {
        (this.$refs.form as any).validate(async (valid) => {
            if (valid) {
                this.form.operator = this.userInfo.employeeName
                this.form.phone = this.userInfo.user_name
                await createDeviceUpgradesDirectional(this.form)
                this.$message.success('设备新增成功！')
                this.showAddDialog = false
                this.onQuery()
            }
        })
    }

    /**
     * 上传文件之前进行格式大小等校验
     * 上传文件必须是excel且小于10M
     *
     * @param file 上传的文件
     * @returns 是否校验通过
     */
    beforeUpload (file) {
        const isLt10M = file.size / (1024 * 1024 * 10) < 1
        const lastDotIndex = file.name.lastIndexOf('.')
        const fileSuffix = file.name.slice(lastDotIndex).toLowerCase()
        const isExcel = lastDotIndex > 0 ? ['.xlsx', '.xls'].indexOf(fileSuffix) > -1 : false
        if (!isExcel) {
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
        return isExcel && isLt10M
    }
    async onImport () {
        if (this.loading) return
        this.loading = true
        if (this.hasFile()) {
            try {
                await (this.$refs.upload as any).submit()
            } catch (e) { }
        } else {
            this.$message.error('请选择上传的文件')
            this.loading = false
        }
    }

    hasFile () {
        return (this.$refs.upload as any).uploadFiles.length > 0
    }

    /**
     * 上传成功返回的处理
     * 返回的code非200报校验错误
     */
    uploadSuccess (response) {
        (this.$refs.upload as any).clearFiles()
        this.loading = false
        this.showImportDialog = false
        if (response.code === 200) {
            // 如果失败弹出失败对话框
            if (response.data.listNotValid.length > 0) {
                this.showErrorDialog = true
                this.errorTableData = response.data.listNotValid
                this.errorInfo = {
                    successNumber: response.data.alreadyInSize,
                    failNumber: response.data.listNotValid.length
                }
            }
            this.onQuery()
        } else {
            this.$message.error(response.message)
        }
    }
    /**
     * 文件上传失败处理
     */
    uploadError () {
        (this.$refs.upload as any).clearFiles()
        this.$message.error('文件上传失败，请重试！')
        this.loading = false
    }
    onCurrentChange (val) {
        this.queryParams.pageNumber = val.pageNumber
        this.onQuery()
    }
    onSizeChange (val) {
        this.queryParams.pageSize = val
        this.onQuery()
    }
}
</script>

<style lang="scss" scoped>
.upgrade-content {
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 20px;
    &__row {
        display: flex;
        margin-bottom: 20px;
    }
    &__col {
        display: flex;
        width: 400px;
        margin-right: 20px;
    }
    h2 {
        min-width: 50px;
        font-size: 14px;
        line-height: 20px;
        color: #606266;
        font-weight: 400;
    }
}
.download-excel {
    margin-top: 10px;
}
</style>
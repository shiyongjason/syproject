<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-tabs v-model="queryParams.isCommon" type="card">
                <el-tab-pane label="通用升级" name="1"></el-tab-pane>
                <el-tab-pane label="定向升级" name="0"></el-tab-pane>
            </el-tabs>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">设备ID：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.iotId" placeholder="请输入设备ID" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="button-cont">
                <h-button type='create' @click="onShowAddDevice">新增</h-button>
            </div>
            <div class="page-table">
                <basicTable :isShowIndex="false" :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                    <template slot="createTime" slot-scope="scope">
                        {{ moment(scope.data.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onShowEditDevice(scope.data.row)">编辑</h-button>
                        <h-button table @click="gotoDetail(scope.data.row.id)">详情</h-button>
                        <h-button table @click="onDeleteDevice(scope.data.row.id)" v-if="!isCommon">删除</h-button>
                    </template>
                </basicTable>
            </div>
        </div>
        <h-drawer :title="title" :visible.sync="showDrawer" :wrapperClosable="false" size="640px">
            <template #connect>
                <el-form ref="form" :model="form" :rules="rules" label-width="140px">
                    <el-form-item label="定向升级ID：" v-if="!isCommon && isEdit">
                        {{ form.id }}
                    </el-form-item>
                    <el-form-item label="设备型号：" prop="type">
                        <el-select v-model="form.type" :disabled="isEdit" no-data-text="无设备型号">
                            <el-option v-for="item in deviceTypeOptions" :key="item.typeCode" :label="item.typeName" :value="item.typeCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备固件：" prop="version">
                        <el-upload class="upload-fault" ref="upload" :show-file-list="false" :on-change="onChangeFile" :on-success="onUploadSuccess" :on-error="onUploadError" v-bind="uploadData" :disabled="!form.type || !!form.version">
                            <div v-if="form.version">{{form.version}}<i class="el-icon-delete ml10"  @click="onRemoveFile"></i></div>
                            <el-button type="primary" slot="trigger" :disabled="!form.type || !!form.version">上传固件</el-button>
                        </el-upload>
                        <el-input type="hidden" class="hidden-input" v-model="form.version" />
                    </el-form-item>
                    <el-form-item label="备注：" prop='remark'>
                        <el-input type="textarea" rows="6" v-model="form.remark" maxLength="200" placeholder="请填写备注内容"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <template #btn>
                <h-button @click="showDrawer = false">取消</h-button>
                <h-button type='primary' @click="onSave" :loading="loading">确定</h-button>
            </template>
        </h-drawer>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import moment from 'moment'
import { findDeviceUpgrades, findDeviceUpgradesInfo, findDeviceTypes, createDeviceUpgrades, updateDeviceUpgrades, deleteDeviceUpgrades } from '../api/index'
import * as Api from '@/interface/iot-api'
import { DEVICE_UPGRADE_IS_COMMON_KEY } from '../const'
import { ccpBaseUrl } from '@/api/config'
import { newCache } from '@/utils/index'

interface Query {
    [key: string]: any
}

@Component({
    name: 'deviceUpgrade'
})
export default class EquipmentUpgrade extends Vue {
    moment = moment
    // 搜索条件
    queryParams: Query = {
        iotId: '',
        isCommon: DEVICE_UPGRADE_IS_COMMON_KEY.YES,
        pageNumber: 1,
        pageSize: 10
    }
    pagination: any = {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    }
    // 展示新增/修改升级抽屉
    showDrawer: boolean = false
    isEdit: boolean = false
    form: Api.UpgradeRequest & { id?: number } = {
        type: '',
        version: '',
        remark: '',
        operator: ''
    }
    rules: any = {
        type: [
            { required: true, message: '请选择设备型号', trigger: 'change' }
        ],
        version: [
            { required: true, message: '请填写设备固件', trigger: 'change' }
        ]
    }
    // 设备类型可选项
    deviceTypeOptions: any = []
    loading: boolean = false

    tableData: any[] = []

    get tableLabel (): any {
        if (this.queryParams.isCommon === DEVICE_UPGRADE_IS_COMMON_KEY.YES) {
            return [
                { label: '设备型号', prop: 'type' },
                { label: '固件版本', prop: 'version' },
                { label: '备注', prop: 'remark' }
            ]
        }
        return [
            { label: '定向升级编号', prop: 'id', width: '150' },
            { label: '创建时间', prop: 'createTime', width: '150', formatters: 'datetimes' },
            { label: '设备型号', prop: 'type' },
            { label: '固件版本', prop: 'version', width: '150' },
            { label: '备注', prop: 'remark' }
        ]
    }

    get isCommon () {
        return this.queryParams.isCommon === DEVICE_UPGRADE_IS_COMMON_KEY.YES
    }

    get title () {
        return `${this.isEdit ? '编辑' : '新增'}${this.isCommon ? '通用' : '定向'}升级`
    }

    get uploadData () {
        return {
            name: 'multiFile',
            action: `${ccpBaseUrl}common/files/iot-upload`,
            limit: 1,
            autoUpload: false,
            headers: {
                refreshToken: localStorage.getItem('refreshToken'),
                token: `Bearer ` + localStorage.getItem('token'),
                AccessKeyId: '5ksbfewexbfc'
            },
            data: {
                type: this.form.type,
                factorySecretId: this.factorySecretId
            }
        }
    }

    get factorySecretId () {
        const arr = this.deviceTypeOptions.filter(item => item.typeCode === this.form.type)
        return arr.length > 0 ? arr[0].factorySecretId : ''
    }

    @State('userInfo') userInfo: any

    @Watch('queryParams.isCommon')
    onTabChange (val) {
        this.findDeviceTypes(val)
        this.tableData = []
        this.onQuery()
    }

    @Watch('form.type')
    onFormTypeChange (val) {
        this.onRemoveFile()
    }

    mounted () {
        this.onQuery()
        this.findDeviceTypes(this.queryParams.isCommon)
    }

    beforeUpdate () {
        newCache('deviceUpgrade')
    }

    onChangeFile (file) {
        const fileName = file.name
        const arr = fileName.match(/((\d)+\.)+/)
        if (arr.length > 0) {
            this.$set(this.form, 'version', arr[0].substr(0, arr[0].length - 1))
            // this.form.version = arr[0].substr(0, arr[0].length - 1)
        } else {
            // 这里做了一个兼容处理，如果这个文件名没有数字+.这样的模式，就取前面的名称作为版本
            const index = fileName.lastIndexOf('.')
            // this.form.version = fileName.substr(0, index)
            this.$set(this.form, 'version', fileName.substr(0, index))
        }
    }

    onRemoveFile () {
        (this.$refs.upload as any).clearFiles()
        this.form.version = ''
    }

    /**
     * 列表搜索处理
     */
    async onQuery () {
        const { data } = await findDeviceUpgrades(this.queryParams)
        this.tableData = data.data.records
        this.pagination = {
            pageNumber: data.data.current,
            pageSize: data.data.size,
            total: data.data.total
        }
    }
    /**
     * 列表重置按钮处理
     */
    onReset () {
        this.queryParams.iotId = ''
        this.queryParams.pageNumber = 1
        this.queryParams.pageSize = 10
        this.onQuery()
    }
    /**
     * 新增按钮弹出新增弹出层
     */
    onShowAddDevice () {
        this.showDrawer = true
        this.isEdit = false
        this.form = {
            type: '',
            version: '',
            remark: '',
            operator: ''
        }
        this.$nextTick(() => {
            (this.$refs.form as any).clearValidate();
            (this.$refs.upload as any).clearFiles()
        })
    }
    /**
     * 编辑按钮弹出编辑弹出层
     */
    async onShowEditDevice (params) {
        this.showDrawer = true
        this.isEdit = true
        const { data } = await findDeviceUpgradesInfo({ id: params.id })
        this.form = data.data
        this.form.id = params.id
    }

    onSave () {
        this.loading = true;
        (this.$refs.form as any).validate(async (valid) => {
            if (valid) {
                try {
                    if ((this.$refs.upload as any).uploadFiles.length > 0 && (this.$refs.upload as any).uploadFiles[0].percentage != 100) {
                        (this.$refs.upload as any).submit()
                    } else {
                        this.onFormSubmit()
                    }
                } catch (e) {
                    this.loading = false
                }
            } else {
                this.loading = false
            }
        })
    }

    async onFormSubmit () {
        try {
            this.form.operator = this.userInfo.employeeName
            this.form.phone = this.userInfo.user_name
            this.form.isCommon = this.queryParams.isCommon * 1
            this.form.id ? await updateDeviceUpgrades(this.form) : await createDeviceUpgrades(this.form)
            this.$message.success(this.form.id ? '设备升级信息修改成功！' : '设备升级信息新增成功！')
            this.onQuery()
            this.findDeviceTypes(this.queryParams.isCommon)
            this.showDrawer = false
            this.loading = false
        } catch (e) {
            this.loading = false
        }
    }

    onUploadSuccess () {
        this.onFormSubmit()
    }

    onUploadError () {
        this.loading = false
    }

    onDeleteDevice (id) {
        this.$confirm('删除数据后设备会默认升级到通用版本，请确认是否继续删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await deleteDeviceUpgrades({ id, phone: this.userInfo.user_name })
            this.$message.success('设备升级信息删除成功！')
            this.onQuery()
        }).catch(() => {

        })
    }
    gotoDetail (id) {
        this.$router.push({ path: '/comfortSmart/deviceUpgradesDetail', query: { id } })
    }
    onCurrentChange (val) {
        this.queryParams.pageNumber = val.pageNumber
        this.onQuery()
    }
    onSizeChange (val) {
        this.queryParams.pageSize = val
        this.onQuery()
    }
    async findDeviceTypes (isCommon) {
        const { data } = await findDeviceTypes({ isCommon })
        this.deviceTypeOptions = data.data
    }
}
</script>
<style lang="scss" scoped>
.hidden-input {
    display: none;
}
</style>
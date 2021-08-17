<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>项目列表</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">项目名称：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.projectName" maxlength="50" placeholder="请输入项目名称"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">企业名称：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.companyName" maxlength="50" placeholder="请输入企业名称"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">管理员姓名：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.adminName" maxlength="20" placeholder="请输入管理员名称"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">管理员手机号：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.username" maxlength="11" placeholder="请输入管理员手机号"></el-input>
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
                    <el-button type="primary" class="ml20" @click="onQuery(queryParams)">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="addNewProject">+新增项目</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="新建项目" :visible.sync="addProject" width="750px" :close-on-click-modal="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="left">
                <el-form-item label="项目名称：" prop="projectName">
                    <el-input v-model.trim="form.projectName" show-word-limit placeholder="请输入项目全称" maxlength='50' style="width:356px" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目简称：" prop="projectSimpleName">
                    <el-input v-model.trim="form.projectSimpleName" show-word-limit placeholder="请输入项目简称" maxlength='50' style="width:356px" clearable></el-input>
                </el-form-item>
                <el-form-item label-width="0px">
                    <div class="city-select">
                        <el-form-item label="收货人地址：" prop="provinceId">
                            <el-select v-model="form.provinceId" @change="onProvince" placeholder="省" clearable>
                                <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <span class="ml10 mr10">-</span>
                        <el-form-item label-width="0px" prop="cityId">
                            <el-select v-model="form.cityId" @change="onCity" placeholder="市" clearable>
                                <el-option v-for="item in getCity" :key="item.cityId" :label="item.name" :value="item.cityId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <span class="ml10 mr10">-</span>
                        <el-form-item label-width="0px" prop="countryId">
                            <el-select v-model="form.countryId" @change="onArea" placeholder="区" clearable>
                                <el-option v-for="item in getCountry" :key="item.countryId" :label="item.name" :value="item.countryId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="详细地址：" prop="address">
                    <el-input v-model.trim="form.address" show-word-limit type="textarea" :rows="2" placeholder="请输入详细地址" maxlength='200' style="width:356px"></el-input>
                </el-form-item>
                <el-form-item label="公司名称：" prop="companyName">
                    <el-input v-model.trim="form.companyName" show-word-limit placeholder="请输入公司名称" maxlength='50' style="width:356px" clearable></el-input>
                </el-form-item>
                <el-form-item label="管理员姓名：" prop="adminName">
                    <el-input v-model.trim="form.adminName" show-word-limit placeholder="请输入管理员姓名" maxlength='20' clearable></el-input>
                </el-form-item>
                <el-form-item label="管理员手机号：" prop="username">
                    <el-input v-model.trim="form.username" show-word-limit placeholder="请输入管理员手机号" maxlength='11' clearable></el-input>
                </el-form-item>
                <el-form-item label="项目类型：" prop="projectType">
                    <el-checkbox-group v-model="form.projectType">
                        <el-checkbox label="1">氟机空调集控系统</el-checkbox>
                        <el-checkbox label="2">水机空调集控系统</el-checkbox>
                        <el-checkbox label="3">计费系统</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="项目包含设备：" prop="deviceTypes">
                    <el-button type="primary" @click="addDeviceTypes">新增</el-button>
                </el-form-item>
                <el-form-item label-width="0px" v-for="(item,index) in form.deviceTypes" :key="index">
                    <el-col :span="10">
                        <el-form-item label="设备TYPE号：" :prop="'deviceTypes.'+index+'.deviceTypeCode'" :rules="rules.deviceTypeCode">
                            <el-input style="width:150px" v-model="item.deviceTypeCode" placeholder="请输入设备TYPE号" @change="deviceTypeChange" @focus="deviceTypeFocus(index)" maxlength='10'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="设备名称：" :prop="'deviceTypes.'+index+'.deviceTypeName'" :rules="rules.deviceTypeName">
                            <el-input style="width:150px" v-model="item.deviceTypeName" placeholder="--" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="danger" @click="deleteDeviceTypes(index)">删除</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDialog">取 消</el-button>
                <el-button type="primary" @click="saveProject()" :loading="loading">确 定</el-button>
            </span>
        </el-dialog>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="tableData" :pagination="recordPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='90'>
                <!-- <template slot="code" slot-scope="scope">
                    <p class="colred" @click="openFaultEdit(scope.data.row, 'code')">{{scope.data.row.code}}</p>
                </template> -->
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="editProject(scope.data.row.id)">编辑</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { createControlProject, editControlProject } from '../api/index'
import { getChiness } from '../../hmall/membership/api'

const _form = {
    projectName: '',
    projectSimpleName: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    countryId: '',
    countryName: '',
    address: '',
    companyName: '',
    adminName: '',
    username: '',
    projectType: [],
    deviceTypes: []
}

const _queryParams = {
    createStartTime: null,
    createEndTime: null,
    companyName: null,
    projectName: null,
    adminName: null,
    username: null,
    pageNumber: 1,
    pageSize: 10
}
export default {
    name: 'projectManager',
    data () {
        const checkDeviceTypeRule = (rule, value, callback) => {
            let isHas = false
            for (let i = 0; i < this.deviceTypes.length; i++) {
                const type = this.deviceTypes[i]
                if (type.type === value) {
                    isHas = true
                    break
                }
            }
            if (isHas) {
                callback()
            } else {
                callback(new Error('type号不存在'))
            }
        }
        return {
            queryParams: JSON.parse(JSON.stringify(_queryParams)),
            form: JSON.parse(JSON.stringify(_form)),
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '项目全称', prop: 'projectName' },
                { label: '项目简称', prop: 'projectSimpleName' },
                { label: '企业名称', prop: 'companyName' },
                { label: '项目地址', prop: 'address' },
                { label: '管理员姓名', prop: 'adminName' },
                { label: '管理员手机号', prop: 'username' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', sortable: true }
            ],
            recordPagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            currentDeviceType: null,
            addProject: false,
            provinceList: [],
            rules: {
                projectName: [
                    { required: true, message: '请输入项目全称', trigger: 'blur' }
                ],
                projectSimpleName: [
                    { required: true, message: '请输入项目简称', trigger: 'blur' }
                ],
                companyName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                provinceId: [
                    { required: true, message: '选择省份', trigger: 'change' }
                ],
                cityId: [
                    { required: true, message: '选择城市', trigger: 'change' }
                ],
                countryId: [
                    { required: true, message: '选择区', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入项目地址', trigger: 'blur' }
                ],
                adminName: [
                    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入管理员手机号', trigger: 'blur' }
                ],
                deviceTypes: [
                    { required: true, message: '请添加项目包含的设备', trigger: 'blur' }
                ],
                deviceTypeCode: [
                    { required: true, message: '请输入设备TYPE号', trigger: 'blur' },
                    { validator: checkDeviceTypeRule, trigger: 'blur' }
                ],
                deviceTypeName: [
                    { required: true, message: '设备TYPE号无法匹配到数据', trigger: 'blur' }
                ],
                projectType: [
                    { required: true, message: '请选择项目类型', trigger: 'blur' }
                ]
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
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId === this.form.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        getCountry () {
            const city = this.getCity.filter(item => item.cityId === this.form.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        },
        ...mapGetters({
            clouldControlProjectList: 'clouldControlProjectList',
            clouldControlProjectDetail: 'clouldControlProjectDetail',
            deviceTypes: 'clouldControlProjectDevicesTypes'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            getClouldControlProjectList: 'getClouldControlProjectList',
            getClouldControlProjectDetail: 'getClouldControlProjectDetail',
            getDeviceTypes: 'getClouldControlProjectDevicesTypes'
        }),
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery(this.queryParams)
        },
        onProvince (key) {
            this.form.provinceId = key || ''
            this.form.cityId = null
            this.form.countryId = ''
            if (key.length > 0) {
                const province = this.provinceList.filter(item => {
                    return item.provinceId === this.form.provinceId
                })
                this.form.provinceName = province.length > 0 ? province[0].name : ''
            }
        },
        onCity (key) {
            this.form.cityId = key || ''
            this.form.countryId = ''
            if (key.length > 0) {
                const city = this.getCity.filter(item => {
                    return item.cityId === this.form.cityId
                })
                this.form.cityName = city.length > 0 ? city[0].name : ''
            }
        },
        onArea (key) {
            this.form.countryId = key
            if (key.length > 0) {
                const country = this.getCountry.filter(item => {
                    return item.countryId === this.form.countryId
                })
                this.form.countryName = country.length > 0 ? country[0].name : ''
            }
        },
        onSearch () {
            this.queryParams = JSON.parse(JSON.stringify(_queryParams))
            this.onQuery(this.queryParams)
        },
        async onQuery (queryParams) {
            await this.getClouldControlProjectList(queryParams)
            this.tableData = this.clouldControlProjectList.records
            this.recordPagination = {
                pageNumber: this.clouldControlProjectList.current,
                pageSize: this.clouldControlProjectList.size,
                total: this.clouldControlProjectList.total
            }
        },
        addNewProject () {
            this.addProject = true
        },
        async editProject (id) {
            await this.getClouldControlProjectDetail({ id: id })
            this.form = this.clouldControlProjectDetail
            this.addProject = true
            // this.$confirm('确认要删除该条故障码', '删除提示').then(() => {
            //     deleteCloudEquipment({ id: id, operateUserName: this.userInfo.employeeName })
            //     this.onQuery(this.queryParams)
            // })
        },
        async saveProject () {
            console.log(this.form)
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    if (this.form.id) {
                        console.log(JSON.stringify({ ...this.form, updateBy: this.userInfo.employeeName }), '参数')
                        await editControlProject({ ...this.form, updateBy: this.userInfo.employeeName })
                    } else {
                        await createControlProject({ ...this.form, createBy: this.userInfo.employeeName })
                    }
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                    this.cancelDialog()
                    this.onSearch()
                } else {
                    return false
                }
            })
        },
        cancelDialog () {
            this.currentDeviceType = null
            this.form = JSON.parse(JSON.stringify(_form))
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
            this.addProject = false
        },
        deviceTypeChange (val) {
            this.currentDeviceType.deviceTypeCode = val
            this.currentDeviceType.deviceTypeName = ''
            for (let i = 0; i < this.deviceTypes.length; i++) {
                const type = this.deviceTypes[i]
                if (type.type === val) {
                    this.currentDeviceType.deviceTypeName = type.deviceName
                    break
                }
            }
        },
        deviceTypeFocus (val) {
            this.currentDeviceType = this.form.deviceTypes[val]
        },
        addDeviceTypes () {
            this.form.deviceTypes.push({ deviceTypeCode: '', deviceTypeName: '' })
        },
        deleteDeviceTypes (index) {
            this.form.deviceTypes.splice(index, 1)
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        }
    },
    mounted () {
        this.onSearch()
        this.getAreacode()
        this.getDeviceTypes()
        console.log(this.deviceTypes, 'xxxxx')
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

.city-select {
    display: flex;
    // align-items: center;
    flex-direction: row;
}

/deep/ .city-select .el-input {
    width: 164px !important;
}

/deep/ .city-select .el-select {
    width: 164px !important;
}

/deep/ .el-dialog .address .el-form-item {
    margin: 0;
}

/deep/ .el-dialog__body {
    padding-top: 10px;
    max-height: 650px; // 最大高度
    overflow: auto;
}
</style>

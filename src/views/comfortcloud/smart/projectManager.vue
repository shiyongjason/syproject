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
                    <el-date-picker v-model="queryParams.createTimeStart" type="date" format="yyyy-MM-dd" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.createTimeEnd" type="date" format="yyyy-MM-dd" value-format='yyyy-MM-dd' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onConditonQuery()">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="addNewProject">+新增项目</el-button>
                </div>
            </div>
        </div>
        <el-dialog id='el-dialog' :title="form.id?'项目编辑':'新建项目'" :visible.sync="addProject" :before-close="cancelDialog" width="1000px" :close-on-click-modal="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="right">
                <el-form-item label="项目名称：" prop="projectName">
                    <el-input v-model.trim="form.projectName" show-word-limit placeholder="请输入项目全称" maxlength='50' style="width:356px"></el-input>
                </el-form-item>
                <el-form-item label="项目简称：" prop="projectSimpleName">
                    <el-input v-model.trim="form.projectSimpleName" show-word-limit placeholder="请输入项目简称" maxlength='6' style="width:356px"></el-input>
                </el-form-item>
                <el-form-item label="公司LOGO：">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="form.companyLogo" ref="uploadImg" @back-event="uploadSuccess" :imgW="60" :imgH="60" />
                    <div class="upload-tips">
                        建议尺寸：36*36，图片大小1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item label-width="0px">
                    <div class="city-select">
                        <el-form-item label="项目地址：" prop="provinceId">
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
                        <el-form-item label-width="0px">
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
                    <el-input v-model.trim="form.companyName" show-word-limit placeholder="请输入公司名称" maxlength='50' style="width:356px"></el-input>
                </el-form-item>
                <el-form-item label="管理员姓名：" prop="adminName">
                    <el-input v-model.trim="form.adminName" show-word-limit placeholder="请输入管理员姓名" maxlength='20'></el-input>
                </el-form-item>
                <el-form-item label="管理员手机号：" prop="username">
                    <el-input v-model.trim="form.username" show-word-limit placeholder="请输入管理员手机号" :disabled="form.id&&form.id.length>0" maxlength='11'></el-input>
                </el-form-item>
                <el-form-item label="项目类型：" prop="projectType">
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox label="空调集控系统" @change="onChangeShowAirConditioning"></el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowAirConditioning">
                            <el-checkbox-group v-model="airConditioningOption">
                                <el-col :span="4">
                                    <el-checkbox value="氟机空调" :label="1">氟机空调</el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <el-checkbox value="水机空调" :label="2">水机空调</el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <el-checkbox value="分体空调" :label="12">分体空调</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox label="照明集控系统" @change="onChangeShowLighting"></el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowLighting">
                            <el-checkbox-group v-model="lightingOption">
                                <el-col :span="4">
                                    <el-checkbox value="调光面板" :label="14">调光面板</el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <el-checkbox value="普通开关" :label="13">普通开关</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-checkbox-group v-model="socketOption">
                        <el-checkbox value="插座集控系统" :label="16">插座集控系统</el-checkbox>
                    </el-checkbox-group>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox label="窗帘集控系统" @change="onChangeShowCurtain"></el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowCurtain">
                            <el-radio-group v-model="curtainRadioOption">
                                <el-col :span="4">
                                    <el-radio :label="15" value="电机">电机</el-radio>
                                    <el-radio :label="19" value="面板">面板</el-radio>
                                </el-col>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-checkbox-group v-model="environmentOption">
                        <el-checkbox value="环境监测系统" :label="17">环境监测系统</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="doorlockOption">
                        <el-checkbox value="门禁系统" :label="18">门禁系统</el-checkbox>
                    </el-checkbox-group>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox label="能耗分析系统" @change="onChangeShowEnergy"></el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowEnergy">
                            <el-row>
                                <el-checkbox label="空调计费" @change="onChangeShowAirEnergy"></el-checkbox>
                                <el-row v-if="isShowAirEnergy">
                                    <el-col :span="5" class="pl30">
                                        <el-checkbox label="水机" @change="onChangeShowWaterAir"></el-checkbox>
                                    </el-col>
                                    <el-col :span="19" v-if="isShowWaterAir">
                                        <el-radio-group v-model="waterAirRadioOption">
                                            <el-col :span="5">
                                                <el-radio :label="101" value="热量表">热量表</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio :label="102" value="时间型">时间型</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio :label="103" value="智能电表">智能电表</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio :label="104" value="智能空开">智能空开</el-radio>
                                            </el-col>
                                        </el-radio-group>
                                    </el-col>
                                </el-row>
                                <el-row v-if="isShowAirEnergy">
                                    <el-col :span="5" class="pl30">
                                        <el-checkbox label="氟机" @change="onChangeShowFluorineAir"></el-checkbox>
                                    </el-col>
                                    <el-col :span="19" v-if="isShowFluorineAir">
                                        <el-radio-group v-model="fluorineAirRadioOption">
                                            <el-col :span="5">
                                                <el-radio :label="112" value="时间型">时间型</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio :label="113" value="智能电表">智能电表</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio :label="114" value="智能空开">智能空开</el-radio>
                                            </el-col>
                                        </el-radio-group>
                                    </el-col>
                                </el-row>
                                <el-row v-if="isShowAirEnergy">
                                    <el-col :span="5" class="pl30">
                                        <el-checkbox label="分体空调" @change="onChangeShowFtAir"></el-checkbox>
                                    </el-col>
                                    <el-col :span="19" v-if="isShowFtAir">
                                        <el-radio-group v-model="ftAirRadioOption">
                                            <el-col :span="5">
                                                <el-radio :label="120" value="分体空调计费">分体空调计费</el-radio>
                                            </el-col>
                                        </el-radio-group>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-row>
                                <el-checkbox label="能耗" @change="onChangeShowOtherEnergy"></el-checkbox>
                                <el-row v-if="isShowOtherEnergy">
                                    <el-col :span="24" class="pl30">
                                        <el-checkbox-group v-model="energyOption">
                                            <el-col :span="4">
                                                <el-checkbox :label="4" value="智能电表">智能电表</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox :label="3" value="智能空开">智能空开</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox :label="5" value="热量表">热量表</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox :label="6" value="时间型">时间型</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox :label="7" value="分体空调">分体空调</el-checkbox>
                                            </el-col>
                                        </el-checkbox-group>
                                    </el-col>
                                </el-row>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox label="安防系统" @change="onChangeShowSecurity"></el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowSecurity">
                            <el-checkbox-group v-model="securityOption">
                                <el-col :span="6">
                                    <el-checkbox :label="20" value="人体存在传感器">人体存在传感器</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox :label="21" value="人体移动传感器">人体移动传感器</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox :label="22" value="水浸监测">水浸监测</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox :label="23" value="烟雾监测">烟雾监测</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox :label="24" value="可燃气体监测">可燃气体监测</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox label="场景管理" @change="onChangeShowScene"></el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowScene">
                            <el-radio-group v-model="scenePanelRadioOption" @change="onChaneShowScenePanel">
                                <el-row>
                                    <el-radio :label="30" value="场景列表">场景列表</el-radio>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-radio label="场景面板(含列表)">场景面板(含列表)</el-radio>
                                    </el-col>
                                    <el-col :span="18" v-if="isShowScenePanel">
                                        <el-checkbox-group v-model="scenePanelOption">
                                            <el-col :span="4">
                                                <el-checkbox :label="31" value="四键">四键</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox :label="32" value="六键">六键</el-checkbox>
                                            </el-col>
                                        </el-checkbox-group>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <!-- <el-checkbox v-for="[key, value] of projectTypeOptions" :key="key" :label="key">
                            {{value}}
                            <el-form-item prop="feeType" v-if="showFeeType && key === projectTypeKey.BILLING_SYSTEM" class="inline-form-item">
                                <el-radio-group v-model="form.feeType">
                                    <el-radio v-for="[key, value] of feeTypeOptions" :key="key" :label="key" @click="onRadioClick">{{value}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-checkbox> -->
                </el-form-item>
                <el-form-item label="项目包含设备：" prop="deviceTypes">
                    <el-button type="primary" @click="addDeviceTypes">新增</el-button>
                </el-form-item>
                <el-form-item label-width="0px" v-for="(item,index) in form.deviceTypes" :key="index">
                    <el-col :span="10">
                        <el-form-item label="设备TYPE号：" :prop="'deviceTypes.'+index+'.deviceTypeCode'" :rules="rules.deviceTypeCode">
                            <el-input v-model="item.deviceTypeCode" placeholder="请输入设备TYPE号" @change="deviceTypeChange" @focus="deviceTypeFocus(index)" maxlength='10'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="设备名称：" label-width="95px" :prop="'deviceTypes.'+index+'.deviceTypeName'" :rules="rules.deviceTypeName">
                            <el-input v-model="item.deviceTypeName" placeholder="--" disabled></el-input>
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
                <template slot="address" slot-scope="scope">
                    {{scope.data.row.provinceName+scope.data.row.cityName+scope.data.row.countryName+scope.data.row.address}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="editProject(scope.data.row.id)">编辑</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>

import { iotUrl, interfaceUrl } from '@/api/config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { createControlProject, editControlProject } from '../api/index'
import { getChiness } from '../../hmall/membership/api'
import * as consts from './const.js'
import { isNumber } from 'highcharts'

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
    companyLogo: '',
    projectType: [],
    deviceTypes: [],
    feeType: ''
}

const _queryParams = {
    createTimeStart: null,
    createTimeEnd: null,
    companyName: null,
    projectName: '许',
    adminName: null,
    username: null,
    pageNumber: 1,
    pageSize: 10
}
export default {
    name: 'projectManager',
    watch: {
        // 'form.projectType' (val) {
        //     if (!val.includes(consts.PROJECT_TYPE_KEY.BILLING_SYSTEM)) {
        //         this.form.feeType = ''
        //     }
        // }
    },
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
                { label: '项目名称', prop: 'projectName' },
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
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
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
                    { required: true, message: '请输入管理员手机号', trigger: 'blur' },
                    { message: '请输入正确手机号码', trigger: 'blur', pattern: /^[1][0-9]{10}$/ }
                ],
                deviceTypes: [
                    { required: true, message: '请添加项目包含的设备', trigger: 'blur' }
                ],
                deviceTypeCode: [
                    { required: true, message: '请输入设备TYPE号', trigger: 'blur' },
                    { validator: checkDeviceTypeRule, trigger: 'blur' }
                ],
                deviceTypeName: [
                    { required: true, message: '设备TYPE号无法匹配到数据', trigger: 'change' }
                ],
                projectType: [
                    { required: true, message: '请选择项目类型', trigger: 'blur' }
                ],
                feeType: [
                    { required: true, message: '请选择计费方式', trigger: 'change' }
                ]
            },
            loading: false,
            projectTypeOptions: consts.PROJECT_TYPE_OPTIONS,
            isShowAirConditioning: false,
            airConditioningOption: [],
            isShowLighting: false,
            lightingOption: [],
            socketOption: [],
            isShowCurtain: false,
            curtainRadioOption: '',
            environmentOption: [],
            doorlockOption: [],
            isShowEnergy: false,
            isShowAirEnergy: false,
            isShowWaterAir: false,
            isShowFluorineAir: false,
            isShowFtAir: false,
            waterAirRadioOption: '',
            fluorineAirRadioOption: '',
            ftAirRadioOption: '',
            isShowOtherEnergy: false,
            energyOption: [],
            isShowSecurity: false,
            securityOption: [],
            isShowScene: false,
            isShowScenePanel: false,
            scenePanelRadioOption: '',
            scenePanelOption: []
        }
    },
    computed: {
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'image/jpeg, image/jpg, image/png',
                name: 'multiFile'
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeEnd
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    } else {
                        return time.getTime() > Date.now()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeStart
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
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
        // showFeeType () {
        //     return this.form.projectType.includes(PROJECT_TYPE_KEY.BILLING_SYSTEM)
        // },
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
        uploadSuccess (val) {
            this.form.companyLogo = val.imageUrl
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onProvince (key) {
            this.form.provinceId = key || ''
            this.form.cityId = ''
            this.form.cityName = ''
            this.form.countryId = ''
            this.form.countryName = ''
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
            this.form.countryName = ''
            if (key.length > 0) {
                const city = this.getCity.filter(item => {
                    return item.cityId === this.form.cityId
                })
                this.form.cityName = city.length > 0 ? city[0].name : ''
            }
        },
        onArea (key) {
            this.form.countryId = key
            this.form.countryName = ''
            if (key.length > 0) {
                const country = this.getCountry.filter(item => {
                    return item.countryId === this.form.countryId
                })
                this.form.countryName = country.length > 0 ? country[0].name : ''
            }
        },
        onConditonQuery () {
            this.queryParams.pageNumber = 1
            this.onQuery()
        },
        onSearch () {
            this.queryParams = JSON.parse(JSON.stringify(_queryParams))
            this.onQuery()
        },
        async onQuery () {
            await this.getClouldControlProjectList(this.queryParams)
            this.tableData = this.clouldControlProjectList.records
            this.recordPagination = {
                pageNumber: this.clouldControlProjectList.current,
                pageSize: this.clouldControlProjectList.size,
                total: this.clouldControlProjectList.total
            }
        },
        onChangeShowAirConditioning (value) {
            this.isShowAirConditioning = value
            if (!value) {

            }
        },
        onChangeShowLighting (value) {
            this.isShowLighting = value
        },
        onChangeShowCurtain (value) {
            this.isShowCurtain = value
        },
        onChangeShowSecurity (value) {
            this.isShowSecurity = value
        },
        onChangeShowScene (value) {
            this.isShowScene = value
        },
        onChangeShowEnergy (value) {
            this.isShowEnergy = value
        },
        onChangeShowWaterAir (value) {
            this.isShowWaterAir = value
        },
        onChangeShowFluorineAir (value) {
            this.isShowFluorineAir = value
        },
        onChangeShowFtAir (value) {
            this.isShowFtAir = value
        },
        onChangeShowAirEnergy (value) {
            this.isShowAirEnergy = value
        },
        onChangeShowOtherEnergy (value) {
            this.isShowOtherEnergy = value
        },
        onChaneShowScenePanel (value) {
            if (value == 30) {
                this.isShowScenePanel = false
            } else {
                this.isShowScenePanel = true
            }
        },
        addNewProject () {
            this.addProject = true
        },
        async editProject (id) {
            await this.getClouldControlProjectDetail({ id: id })
            this.form = this.clouldControlProjectDetail
            // 编辑页面拆分projectType为两个变量
            // let index = this.form.projectType.indexOf(PROJECT_TYPE_KEY.BILLING_SYSTEM) + 1 ||
            //     this.form.projectType.indexOf(PROJECT_TYPE_KEY.BILLING_SYSTEM_ELECTRICITY_METER) + 1 ||
            //     this.form.projectType.indexOf(PROJECT_TYPE_KEY.BILLING_SYSTEM_HEAT_METER) + 1 ||
            //     this.form.projectType.indexOf(PROJECT_TYPE_KEY.BILLING_SYSTEM_FT_AIR) + 1 ||
            //     this.form.projectType.indexOf(PROJECT_TYPE_KEY.BILLING_SYSTEM_TIME) + 1 ||
            //     this.form.projectType.indexOf(PROJECT_TYPE_KEY.BILLING_SYSTEM_SOCKET) + 1
            // if (index > 0) {
            //     this.$set(this.form, 'feeType', `${this.form.projectType[index - 1] - PROJECT_TYPE_KEY.BILLING_SYSTEM}`)
            //     this.form.projectType[index - 1] = PROJECT_TYPE_KEY.BILLING_SYSTEM
            // } else {
            //     this.$set(this.form, 'feeType', '')
            // }
            this.addProject = true
        },
        async saveProject () {
            this.form.projectType = [
                ...this.airConditioningOption,
                ...this.lightingOption,
                ...this.socketOption,
                this.curtainRadioOption,
                ...this.environmentOption,
                ...this.doorlockOption,
                this.waterAirRadioOption,
                this.fluorineAirRadioOption,
                this.ftAirRadioOption,
                ...this.energyOption,
                ...this.securityOption,
                this.scenePanelRadioOption,
                ...this.scenePanelOption
            ].filter(item => !(item == '' || !isNumber(item))).map(item => item.toString())

            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    if (this.form.id) {
                        await editControlProject({ ...this.form, updateBy: this.userInfo.employeeName })
                    } else {
                        await createControlProject({ ...this.form, createBy: this.userInfo.employeeName })
                    }
                    if (this.$refs.form) {
                        console.log('新增', this.form.id)
                        this.$refs.form.clearValidate()
                    }
                    this.cancelDialog()
                    this.onSearch()
                } else {
                    return false
                }
            })
        },
        /**
         * 处理form表单
         * 后端是将计费系统设置成3个projectType类型，当时在页面上用一个独立字段更加合理一些
         * 所以这里在提交之前，将feeType和projectType进行合并处理
         * projectType包含计费系统的时候   projectType对应的值 = projectType的值 + feeType的值
         *
         * @returns 返回处理后的Form
         */
        _resolveForm () {
            let resultForm = JSON.parse(JSON.stringify(this.form))
            // 说明Form中的projectType包含计费系统
            if (this.showFeeType) {
                let index = resultForm.projectType.indexOf(PROJECT_TYPE_KEY.BILLING_SYSTEM)
                if (index >= 0 && resultForm.feeType) {
                    resultForm.projectType[index] = `${resultForm.projectType[index] * 1 + resultForm.feeType * 1}`
                }
            }
            return resultForm
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
            let dialog = document.getElementsByClassName('el-dialog__body')[0]
            if (dialog) {
                setTimeout(() => {
                    dialog.scrollTop = dialog.scrollHeight
                }, 100)
            }
        },
        deleteDeviceTypes (index) {
            this.form.deviceTypes.splice(index, 1)
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        },
        onRadioClick (e) {
            e.stopPropagation()
        }
    },
    mounted () {
        this.onSearch()
        this.getAreacode()
        this.getDeviceTypes()
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}

.upload-tips {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 10px;
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
.inline-form-item {
    display: inline-block;
    margin-left: 30px;
}
/deep/ .el-checkbox {
    // display: flex;
    // align-items: center;
    // height: 40px;
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
/deep/ .el-radio {
    display: flex;
    align-items: center;
    height: 40px;
    padding-right: 30px;
}

.el-radio-group {
    display: block;
}
</style>

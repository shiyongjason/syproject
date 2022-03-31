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
        <el-dialog id='el-dialog' :title="form.id?'项目编辑':'新建项目'" :visible.sync="addProject" :before-close="cancelDialog" width="1280px" :close-on-click-modal="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="140px" label-position="right">
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
                            <el-checkbox v-model="isShowAirConditioning" @change="onChangeShowAirConditioning">空调集控系统</el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowAirConditioning">
                            <el-checkbox-group v-model="airConditioningOption">
                                <el-col :span="4">
                                    <el-checkbox value="氟机空调" label="1">氟机空调</el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <el-checkbox value="水机空调" label="2">水机空调</el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <el-checkbox value="分体空调" label="12">分体空调</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox v-model="isShowLighting" @change="onChangeShowLighting">照明集控系统</el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowLighting">
                            <el-checkbox-group v-model="lightingOption">
                                <el-col :span="4">
                                    <el-checkbox value="调光面板" label="14">调光面板</el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <el-checkbox value="普通开关" label="13">普通开关</el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <el-checkbox value="普通开关(DO)" label="33">普通开关(DO)</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-checkbox-group v-model="socketOption">
                        <el-checkbox label="16">插座集控系统</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="powerOption">
                        <el-checkbox label="39">时序电源集控系统</el-checkbox>
                    </el-checkbox-group>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox v-model="isShowCurtain" @change="onChangeShowCurtain">窗帘集控系统</el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowCurtain">
                            <el-checkbox-group v-model="curtainRadioOption">
                                <el-col :span="4">
                                    <el-checkbox label="15" value="电机">电机</el-checkbox>
                                    <el-checkbox label="19" value="面板">面板</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-checkbox-group v-model="environmentOption">
                        <el-checkbox label="17">环境监测系统</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="doorlockOption">
                        <el-checkbox label="18">门禁系统</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="blackboardOption">
                        <el-checkbox label="34">智能黑板</el-checkbox>
                    </el-checkbox-group>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox v-model="isShowEnergy" @change="onChangeShowEnergy">能耗分析系统</el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowEnergy">
                            <el-row>
                                <el-checkbox v-model="isShowAirEnergy" @change="onChangeShowAirEnergy">空调计费</el-checkbox>
                                <el-row v-if="isShowAirEnergy">
                                    <el-col :span="5" class="pl30">
                                        <el-checkbox v-model="isShowWaterAir" @change="onChangeShowWaterAir">水机</el-checkbox>
                                    </el-col>
                                    <el-col :span="19" v-if="isShowWaterAir">
                                        <el-radio-group v-model="waterAirRadioOption">
                                            <el-col :span="5">
                                                <el-radio label="101" value="热量表">热量表</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio label="102" value="时间型">时间型</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio label="103" value="智能电表">智能电表</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio label="104" value="智能空开">智能空开</el-radio>
                                            </el-col>
                                        </el-radio-group>
                                    </el-col>
                                </el-row>
                                <el-row v-if="isShowAirEnergy">
                                    <el-col :span="5" class="pl30">
                                        <el-checkbox v-model="isShowFluorineAir" @change="onChangeShowFluorineAir">氟机</el-checkbox>
                                    </el-col>
                                    <el-col :span="19" v-if="isShowFluorineAir">
                                        <el-radio-group v-model="fluorineAirRadioOption">
                                            <el-col :span="5">
                                                <el-radio label="112" value="时间型">时间型</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio label="113" value="智能电表">智能电表</el-radio>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-radio label="114" value="智能空开">智能空开</el-radio>
                                            </el-col>
                                        </el-radio-group>
                                    </el-col>
                                </el-row>
                                <el-row v-if="isShowAirEnergy">
                                    <el-col :span="5" class="pl30">
                                        <el-checkbox v-model="isShowFtAir" @change="onChangeShowFtAir">分体空调</el-checkbox>
                                    </el-col>
                                    <el-col :span="19" v-if="isShowFtAir">
                                        <el-radio-group v-model="ftAirRadioOption">
                                            <el-col :span="5">
                                                <el-radio label="120" value="分体空调计费">分体空调计费</el-radio>
                                            </el-col>
                                        </el-radio-group>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-row>
                                <el-checkbox v-model="isShowOtherEnergy" @change="onChangeShowOtherEnergy">能耗</el-checkbox>
                                <el-row v-if="isShowOtherEnergy">
                                    <el-col :span="24" class="pl30">
                                        <el-checkbox-group v-model="energyOption">
                                            <el-col :span="4">
                                                <el-checkbox label="4" value="智能电表">智能电表</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox label="3" value="智能空开">智能空开</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox label="5" value="热量表">热量表</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox label="6" value="时间型">时间型</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox label="7" value="分体空调">分体空调</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox label="9" value="水表">水表</el-checkbox>
                                            </el-col>
                                        </el-checkbox-group>
                                    </el-col>
                                </el-row>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox v-model="isShowSecurity" @change="onChangeShowSecurity">安防系统</el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowSecurity">
                            <el-checkbox-group v-model="securityOption">
                                <el-col :span="6">
                                    <el-checkbox label="20" value="人体存在传感器">人体存在传感器</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="21" value="人体移动传感器">人体移动传感器</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="22" value="水浸监测">水浸监测</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="35" value="水浸监测(DI)">水浸监测(DI)</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="23" value="烟雾监测">烟雾监测</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="36" value="烟雾监测(DI)">烟雾监测(DI)</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="24" value="可燃气体监测">可燃气体监测</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="38" value="可燃气体监测(DI)">可燃气体监测(DI)</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="25" value="火焰监测">火焰监测</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="37" value="火焰监测(DI)">火焰监测(DI)</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="26" value="有毒有害气体监测">有毒有害气体监测</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox label="27" value="视频监控">视频监控</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox v-model="isShowScene" @change="onChangeShowScene">场景管理</el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowScene">
                            <el-radio-group v-model="scenePanelRadioOption" @change="onChaneShowScenePanel">
                                <el-row>
                                    <el-radio label="30">场景列表</el-radio>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-radio label="true">场景面板(含列表)</el-radio>
                                    </el-col>
                                    <el-col :span="18" style="height:40px; line-height:40px;" v-if="isShowScenePanel">
                                        <el-checkbox-group v-model="scenePanelOption">
                                            <el-col :span="4">
                                                <el-checkbox label="31" value="四键">四键</el-checkbox>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-checkbox label="32" value="六键">六键</el-checkbox>
                                            </el-col>
                                        </el-checkbox-group>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-checkbox-group v-model="energyConservationOption">
                        <el-checkbox label="11">节能系统</el-checkbox>
                    </el-checkbox-group>
                    <el-row>
                        <el-col :span="4">
                            <el-checkbox v-model="isShowZTPlatform" @change="onChangeShowZTPlatform">正泰管理平台</el-checkbox>
                        </el-col>
                        <el-col :span="20" v-if="isShowZTPlatform">
                            <el-checkbox-group v-model="ZTPlatformOption">
                                <el-col :span="6">
                                    <el-checkbox label="130" value="综合能源管理">综合能源管理</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-checkbox-group v-model="centralVentilationOption">
                        <el-checkbox label="65">新风系统</el-checkbox>
                    </el-checkbox-group>
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
                <el-row class="mb20" v-for="(item,index) in form.deviceTypes" :key="index">
                    <el-col :span="7">
                        <el-form-item label="设备TYPE号：" label-width="120px" :prop="'deviceTypes.'+index+'.deviceTypeCode'" :rules="rules.deviceTypeCode">
                            <el-input v-model="item.deviceTypeCode" placeholder="请输入设备TYPE号" @change="deviceTypeChange" @focus="deviceTypeFocus(index)" maxlength='10'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="设备名称：" label-width="120px" :prop="'deviceTypes.'+index+'.deviceTypeName'" :rules="rules.deviceTypeName">
                            <el-input v-model="item.deviceTypeName" placeholder="--" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="danger" @click="deleteDeviceTypes(index)">删除</el-button>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-form-item label="第三方系统接入配置：" label-width="180px">
                    <el-button type="primary" @click="addThirdSystemConfig">新增</el-button>
                </el-form-item>
                <el-row v-for="(item,index) of form.thirdSystemConfigs" :key="'key' + index">
                    <el-row :gutter="5" class="mb20">
                        <el-col :span="7">
                            <el-form-item label="品牌名称：" :prop="`thirdSystemConfigs[${index}].brandName`" :rules="rules.brandName" label-width="120px">
                                <el-select v-model="item.brandName" placeholder="输入品牌名称" @change="onChangeBrand(item,index)" clearable>
                                    <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="子系统类型：" :prop="`thirdSystemConfigs[${index}].subSystemType`" :rules="rules.subSystemType(item)" label-width="120px">
                                <el-select v-model="item.subSystemType" placeholder="输入子系统类型" clearable>
                                    <el-option v-for="item in subSystemTypeOptions.get(item.brandName)" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="12" class="mb20">
                        <el-col :span="14">
                            <el-form-item label="IP地址/域名：" :prop="`thirdSystemConfigs[${index}].config`" :rules="rules.config(item)" label-width="120px">
                                <el-input type="textarea" rows="5" v-model="item.config" placeholder="输入json配置信息" maxlength="500" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="danger" @click="deleteThirdSystemConfig(index)">删除</el-button>
                        </el-col>
                    </el-row>
                </el-row>
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
import { newCache } from '@/utils/index'
import { deepCopy } from '@/utils/utils'

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
    feeType: '',
    thirdSystemConfigs: []
}

const _queryParams = {
    createTimeStart: null,
    createTimeEnd: null,
    companyName: null,
    projectName: '',
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
                ],
                brandName: [
                    { required: true, message: '请选择品牌名称', trigger: 'change' }
                ],
                subSystemType: (item) => [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!item.subSystemType) {
                                return callback(new Error('请选择子系统类型'))
                            }
                            return callback()
                        },
                        trigger: 'change'
                    }
                ],
                config: (item) => [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const isJson = (str) => {
                                if (typeof str == 'string') {
                                    try {
                                        const obj = JSON.parse(str)
                                        if (obj && typeof obj == 'object') {
                                            return true
                                        } else {
                                            return false
                                        }
                                    } catch (e) {
                                        return false
                                    }
                                }
                            }
                            if (!item.config) {
                                return callback(new Error('请输入IP地址/域名'))
                            }
                            if (item.config && !isJson(item.config)) {
                                return callback(new Error('IP地址/域名JSON配置格式不正确'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            loading: false,
            // projectTypeOptions: consts.PROJECT_TYPE_OPTIONS,
            isShowAirConditioning: false,
            airConditioningOption: [],
            isShowLighting: false,
            lightingOption: [],
            socketOption: [],
            powerOption: [],
            isShowCurtain: false,
            curtainRadioOption: [],
            environmentOption: [],
            doorlockOption: [],
            blackboardOption: [],
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
            scenePanelOption: [],
            energyConservationOption: [],
            isShowZTPlatform: false,
            ZTPlatformOption: [],
            centralVentilationOption: [],
            brandOptions: consts.BRAND_OPTIONS,
            subSystemTypeOptions: consts.SUB_SYSTEM_TYPE_OPTIONS
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
        onChangeBrand (row, index) {
            this.$set(this.form.thirdSystemConfigs[index], 'subSystemType', '')
            if (row.brandName) {
                consts.BRAND_OPTIONS.forEach((item) => {
                    if (item.value == row.brandName) {
                        this.$set(this.form.thirdSystemConfigs[index], 'config', item.config)
                    }
                })
            } else {
                this.$set(this.form.thirdSystemConfigs[index], 'config', '')
            }
        },
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
                this.airConditioningOption = []
            }
        },
        onChangeShowLighting (value) {
            this.isShowLighting = value
            if (!value) {
                this.lightingOption = []
            }
        },
        onChangeShowCurtain (value) {
            this.isShowCurtain = value
            if (!value) {
                this.curtainRadioOption = []
            }
        },
        onChangeShowEnergy (value) {
            this.isShowEnergy = value
            if (!value) {
                this.isShowEnergy = false
                this.isShowAirEnergy = false
                this.isShowWaterAir = false
                this.isShowFluorineAir = false
                this.isShowFtAir = false
                this.isShowOtherEnergy = false
                this.waterAirRadioOption = ''
                this.fluorineAirRadioOption = ''
                this.ftAirRadioOption = ''
                this.energyOption = []
            }
        },
        onChangeShowWaterAir (value) {
            this.isShowWaterAir = value
            if (!value) {
                this.waterAirRadioOption = ''
            }
        },
        onChangeShowFluorineAir (value) {
            this.isShowFluorineAir = value
            if (!value) {
                this.fluorineAirRadioOption = ''
            }
        },
        onChangeShowFtAir (value) {
            this.isShowFtAir = value
            if (!value) {
                this.ftAirRadioOption = ''
            }
        },
        onChangeShowAirEnergy (value) {
            this.isShowAirEnergy = value
            if (!value) {
                // this.isShowEnergy = false
                this.isShowAirEnergy = false
                this.isShowWaterAir = false
                this.isShowFluorineAir = false
                this.isShowFtAir = false
                this.waterAirRadioOption = ''
                this.fluorineAirRadioOption = ''
                this.ftAirRadioOption = ''
                if (!this.isShowOtherEnergy) {
                    this.isShowEnergy = false
                }
            }
        },
        onChangeShowOtherEnergy (value) {
            this.isShowOtherEnergy = value
            if (!value) {
                this.isShowOtherEnergy = false
                this.energyOption = []
                if (!this.isShowAirEnergy) {
                    this.isShowEnergy = false
                }
            }
        },
        onChangeShowSecurity (value) {
            this.isShowSecurity = value
            if (!value) {
                this.securityOption = []
            }
        },
        onChangeShowScene (value) {
            this.isShowScene = value
            if (!value) {
                this.isShowScenePanel = false
                this.scenePanelOption = []
            } else {
            }
            this.scenePanelRadioOption = 'false'
        },
        onChaneShowScenePanel (value) {
            if (value == 30) {
                this.isShowScenePanel = false
                this.scenePanelOption = []
            } else {
                this.isShowScenePanel = true
            }
        },
        onChangeShowZTPlatform (value) {
            this.isShowZTPlatform = value
            if (!value) {
                this.ZTPlatformOption = []
            }
        },
        addNewProject () {
            this.addProject = true
            this.isShowAirConditioning = false
            this.airConditioningOption = []
            this.isShowLighting = false
            this.lightingOption = []
            this.socketOption = []
            this.powerOption = []
            this.isShowCurtain = false
            this.curtainRadioOption = []
            this.environmentOption = []
            this.doorlockOption = []
            this.blackboardOption = []
            this.isShowEnergy = false
            this.isShowAirEnergy = false
            this.isShowWaterAir = false
            this.isShowFluorineAir = false
            this.isShowFtAir = false
            this.waterAirRadioOption = ''
            this.fluorineAirRadioOption = ''
            this.ftAirRadioOption = ''
            this.isShowOtherEnergy = false
            this.energyOption = []
            this.isShowSecurity = false
            this.securityOption = []
            this.isShowScene = false
            this.isShowScenePanel = false
            this.scenePanelRadioOption = ''
            this.scenePanelOption = []
            this.energyConservationOption = []
            this.isShowZTPlatform = false
            this.ZTPlatformOption = []
            this.centralVentilationOption = []
        },
        async editProject (id) {
            await this.getClouldControlProjectDetail({ id: id })
            this.form = {
                ...this.clouldControlProjectDetail,
                thirdSystemConfigs: this.clouldControlProjectDetail.thirdSystemConfigs ? deepCopy(this.clouldControlProjectDetail.thirdSystemConfigs).map(item => {
                    item.brandName = item.key.split('-')[0]
                    item.subSystemType = item.key.split('-')[1]
                    return item
                }) : []
            }
            // this.clouldControlProjectDetail.thirdSystemConfigs.forEach((item, index) => {
            //     this.onChangeBrand(item.key.split('-')[0], index)
            //     this.onChangeSubSystem(item.key.split('-')[1])
            // })
            //
            // console.log(this.form.projectType)
            this.airConditioningOption = this.form.projectType.filter(item => item == 1 || item == 2 || item == 12)
            this.isShowAirConditioning = this.airConditioningOption.length > 0

            this.lightingOption = this.form.projectType.filter(item => item == 13 || item == 14 || item == 33)
            this.isShowLighting = this.lightingOption.length > 0

            this.socketOption = this.form.projectType.filter(item => item == 16)

            this.powerOption = this.form.projectType.filter(item => item == 39)

            this.curtainRadioOption = this.form.projectType.filter(item => item == 15 || item == 19)
            this.isShowCurtain = this.curtainRadioOption.length > 0

            this.environmentOption = this.form.projectType.filter(item => item == 17)

            this.doorlockOption = this.form.projectType.filter(item => item == 18)

            this.blackboardOption = this.form.projectType.filter(item => item == 34)

            this.isShowEnergy = this.form.projectType.filter(item => item == 101 || item == 102 || item == 103 || item == 104 || item == 112 || item == 113 || item == 114 || item == 120 || item == 4 || item == 3 || item == 5 || item == 6 || item == 7 || item == 9).length > 0
            this.isShowAirEnergy = this.form.projectType.filter(item => item == 101 || item == 102 || item == 103 || item == 104 || item == 112 || item == 113 || item == 114 || item == 120).length > 0

            this.waterAirRadioOption = this.form.projectType.filter(item => item == 101 || item == 102 || item == 103 || item == 104)[0]
            this.isShowWaterAir = !!this.waterAirRadioOption

            this.fluorineAirRadioOption = this.form.projectType.filter(item => item == 112 || item == 113 || item == 114)[0]
            this.isShowFluorineAir = !!this.fluorineAirRadioOption

            this.ftAirRadioOption = this.form.projectType.filter(item => item == 120)[0]
            this.isShowFtAir = !!this.ftAirRadioOption

            this.energyOption = this.form.projectType.filter(item => item == 4 || item == 3 || item == 5 || item == 6 || item == 7 || item == 9)
            this.isShowOtherEnergy = this.energyOption.length > 0

            this.securityOption = this.form.projectType.filter(item => item == 20 || item == 21 || item == 22 || item == 23 || item == 24 || item == 25 || item == 26 || item == 27 || item == 35 || item == 36 || item == 37 || item == 38)
            this.isShowSecurity = this.securityOption.length > 0

            this.isShowScene = this.form.projectType.filter(item => item == 30 || item == 31 || item == 32).length > 0

            this.scenePanelRadioOption = this.form.projectType.filter(item => item == 30)[0] || 'true'

            this.scenePanelOption = this.form.projectType.filter(item => item == 31 || item == 32)
            this.isShowScenePanel = this.scenePanelOption.length > 0

            this.energyConservationOption = this.form.projectType.filter(item => item == 11)

            this.ZTPlatformOption = this.form.projectType.filter(item => item == 130)
            this.isShowZTPlatform = this.ZTPlatformOption > 0

            this.centralVentilationOption = this.form.projectType.filter(item => item == 65)

            this.addProject = true
        },
        addThirdSystemConfig () {
            this.form.thirdSystemConfigs.push({})
        },
        deleteThirdSystemConfig (index) {
            this.form.thirdSystemConfigs.splice(index, 1)
        },
        async saveProject () {
            this.form.projectType = [
                ...this.airConditioningOption,
                ...this.lightingOption,
                ...this.socketOption,
                ...this.powerOption,
                ...this.curtainRadioOption,
                ...this.environmentOption,
                ...this.doorlockOption,
                ...this.blackboardOption,
                this.waterAirRadioOption,
                this.fluorineAirRadioOption,
                this.ftAirRadioOption,
                ...this.energyOption,
                ...this.securityOption,
                this.scenePanelRadioOption,
                ...this.scenePanelOption,
                ...this.energyConservationOption,
                ...this.ZTPlatformOption,
                ...this.centralVentilationOption
            ].filter(item => !(item == '' || !isNumber(Number(item))))
            console.log(this.form.thirdSystemConfigs)
            this.form.thirdSystemConfigs = this.form.thirdSystemConfigs.map(item => {
                item.key = item.brandName + '-' + item.subSystemType
                return item
            })
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
                    this.onQuery()
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
        // _resolveForm () {
        //     let resultForm = JSON.parse(JSON.stringify(this.form))
        //     // 说明Form中的projectType包含计费系统
        //     if (this.showFeeType) {
        //         let index = resultForm.projectType.indexOf(PROJECT_TYPE_KEY.BILLING_SYSTEM)
        //         if (index >= 0 && resultForm.feeType) {
        //             resultForm.projectType[index] = `${resultForm.projectType[index] * 1 + resultForm.feeType * 1}`
        //         }
        //     }
        //     return resultForm
        // },
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
    },
    beforeRouteEnter (to, from, next) {
        newCache('projectManager')
        next()
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

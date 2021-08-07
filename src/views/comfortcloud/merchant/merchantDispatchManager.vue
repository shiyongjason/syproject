<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">收货人手机号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.receiverPhone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">收件人地址：</div>
                    <div class="query-cont-col-area">
                        <el-select v-model="queryParams.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.cityId" @change="onCity" placeholder="市" :clearable=true>
                            <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.countryId" @change="onArea" placeholder="区" :clearable=true>
                            <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">收货人姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.receiverName" placeholder="请输入收货人姓名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">发货状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.status" style="width: 100%" clearable>
                            <el-option label="待发货" value=0></el-option>
                            <el-option label="已发货" value=1></el-option>
                            <el-option label="已回收" value=2></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">创建日期：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                        <el-button type="primary" class="ml20" @click="addNewMetarial">新增营销物料需求</el-button>
                    </div>
                </div>
            </div>

            <basicTable ref="tableRef" :spanMethod="objectSpanMethod" :stripe="false" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='150'>
                <template slot="action" slot-scope="scope">
                    <el-button v-if="scope.data.row.status === 1" class="orangeBtn" @click="onCecycle(scope.data.row)">回收入库</el-button>
                    <el-button v-if="scope.data.row.status === 0 && hosAuthCheck(deliverOperateAuth)" class="orangeBtn" @click="onDispatch(scope.data.row)">发货</el-button>
                    <el-button v-if="scope.data.row.status === 0" class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
                <template slot="materialId" slot-scope="scope">
                    <span class="topColred" @click="onDetail(scope.data.row)">
                        {{scope.data.row.materialId}}
                    </span>
                </template>
                <template slot="remark" slot-scope="scope">
                    <div class="remark">
                        {{scope.data.row.remark}}
                    </div>
                </template>
                <template slot="status" slot-scope="scope">
                    {{statusString(scope.data.row.status)}}
                </template>
                <template slot="address" slot-scope="scope">
                    {{scope.data.row.provinceName+scope.data.row.cityName+scope.data.row.countryName+scope.data.row.address}}
                </template>
                <template slot="proofPictures" slot-scope="scope">
                    <div v-if="scope.data.row.proofPictures&&scope.data.row.proofPictures.length>0">
                        <el-image style="width:3rem;height:3rem;" ref="img" class="default-pre-view-image" fit="cover" :src="getProofPictures(scope.data.row.proofPictures)[0]" :preview-src-list="getProofPictures(scope.data.row.proofPictures)"></el-image>
                    </div>
                </template>
            </basicTable>
            <el-dialog :title="isDetail ? '营销物料需求详情':'新增营销物料需求'" :modal-append-to-body=false :append-to-body=false :visible.sync="addDialogVisible" width="1000px">
                <el-form :model="materialForm" :rules="rules" ref="materialForm" label-width="130px">
                    <div class="form-detail" v-if="isDetail">
                        <div>
                            <span class="header-title">需求编号</span>
                            <span>{{materialForm.id}}</span>
                        </div>
                        <div class="header-title">需求详情</div>
                        <div style="margin-left:20px">
                            <span>创建人：</span>
                            <span>{{materialForm.createBy}}</span>
                        </div>
                        <div style="margin-left:20px">
                            <span>创建时间：</span>
                            <span>{{materialForm.createTime | formatterTime}}</span>
                        </div>
                    </div>
                    <el-form-item label-width="0" class="address">
                        <el-col :span="7">
                            <el-form-item label="收货人手机号：" prop="receiverPhone">
                                <el-input v-model="materialForm.receiverPhone" :disabled="isCanEdit" maxlength="11" placeholder="请输入收货人手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="收货人姓名：" prop="receiverName">
                                <el-input v-model="materialForm.receiverName" :disabled="isCanEdit" maxlength="50" placeholder="请输入收货人姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="所属分部：" prop="departmentId">
                                <el-select v-model="materialForm.departmentId" :disabled="isCanEdit">
                                    <el-option :label="item.deptName" :value="item.crmDeptCode" v-for="item in departmentList" :key="item.crmDeptCode"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item class="address" label-width="0px">
                        <div class="city-area">
                            <el-form-item label="收货人地址：" prop="provinceId">
                                <el-select v-model="materialForm.provinceId" :disabled="isCanEdit" @change="onProvinceAddress" placeholder="省" :clearable=true>
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <span class="ml10 mr10">-</span>
                            <el-form-item label-width="0px" prop="cityId">
                                <el-select v-model="materialForm.cityId" :disabled="isCanEdit" @change="onCityAddress" placeholder="市" :clearable=true>
                                    <el-option v-for="item in getCityAddress" :key="item.id" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <span class="ml10 mr10">-</span>
                            <el-form-item label-width="0px" prop="countryId">
                                <el-select v-model="materialForm.countryId" :disabled="isCanEdit" @change="onCountryAddress" placeholder="区" :clearable=true>
                                    <el-option v-for="item in getCountryAddress" :key="item.id" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                    </el-form-item>
                    <el-form-item label="详细地址：" prop="address">
                        <el-input v-model="materialForm.address" :disabled="isCanEdit" style='width:400px' maxlength="100" placeholder="请输入具体地址"></el-input>
                    </el-form-item>
                    <el-form-item label="物料明细：" v-if="noDispatchCount > 0">
                        <el-button type="primary" @click="addMaterial">+ 添加物料</el-button>
                        <p class="tip">如是样品箱，请将样品箱和样品箱内的产品分行添加</p>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <div v-for="(mera,index) in materialForm.details" :key="mera.key" style="height:60px">
                            <el-col :span="10">
                                <el-form-item label="物料/商品名称：" :prop="'details.'+index+'.materialName'" :rules="rules.materialName">
                                    <el-autocomplete class="inline-input" :disabled="!isCanDelelte(mera.status)" placeholder="输入物料名称" v-model="mera.materialName" :trigger-on-focus="false" @select="handleSelect" :fetch-suggestions="querySuggestions">
                                    </el-autocomplete>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="物料件数：" :prop="'details.'+index+'.materialCount'" :rules="rules.materialCount">
                                    <el-input placeholder="输入件数" :disabled="!isCanDelelte(mera.status)" v-model="mera.materialCount"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" v-if="isDetail">
                                <p>{{statusString(mera.status)}}</p>
                            </el-col>
                            <el-col :span="2">
                                <el-button v-if="isCanDelelte(mera.status)" type="danger" @click="deleteMaterial(mera)">删除</el-button>
                            </el-col>
                        </div>

                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="materialForm.remark" maxlength="500" :rows="3" type="textarea" placeholder="如有其它特殊要求，可在此处备注" />
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelDialog">取消</el-button>
                    <el-button type="primary" @click="submitForm('materialForm')">确认</el-button>
                </span>
            </el-dialog>
            <el-dialog title="填写发货信息" :modal-append-to-body=false :append-to-body=false :visible.sync="dispatchDialogVisible" width="700px">
                <el-form :model="dispatchForm" :rules="dispatchRules" ref="dispatchForm">
                    <el-form-item class="wlname" label="请选择发货方式" v-if="canDispatchType !== 1" required>
                    </el-form-item>
                    <div style="margin-left:30px" v-if="canDispatchType !== 1">
                        <div v-if="canDispatchType !== 2">该订单中含有多款商品，建议按订单合并发货</div>
                        <el-form-item label-width="0">
                            <el-radio v-if="canDispatchType !== 2" v-model="dispatchForm.deliveryType" :label="1">按订单合并发货：订单中的商品只需维护一次发货信息</el-radio>
                            <el-radio v-model="dispatchForm.deliveryType" :label="2">按商品分开发货：订单中部分产品发货，需按实际发货的商品维护发货信息</el-radio>
                        </el-form-item>
                        <div v-if="dispatchForm.deliveryType === 2" style="margin-bottom:30px">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="dispatchForm.productList" @change="handleCheckedMaterialChange">
                                <el-checkbox style="display:block" v-for="material in materials" :label="material" :key="material.productId">{{material.productName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>

                    <el-form-item class="wlname" label="物流公司：" prop="logisticsCompany">
                        <el-input style='width:400px' v-model="dispatchForm.logisticsCompany" maxlength="50" placeholder="输入物流公司名称"></el-input>
                    </el-form-item>
                    <el-form-item class="wlcode" label="快递单号：" prop="courierNo">
                        <el-input style='width:400px' v-model="dispatchForm.courierNo" maxlength="50" placeholder="输入快递单号"></el-input>
                    </el-form-item>
                    <div class="form-title">发货凭证<span>(请上传发货凭证图，最多2张，支持jpeg,png和jpg格式)</span></div>
                    <el-form-item label-width="0">
                        <el-upload list-type="picture-card" v-bind="uploadInfo" :file-list="uploadImages" :multiple='false' accept=".jpg,.jpeg,.png" :on-success="handleSuccess" :limit="2" :on-exceed="pictureMessage" :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelDialog">取消</el-button>
                    <el-button type="primary" @click="submitForm('dispatchForm')">确认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { interfaceUrl, iotUrl } from '@/api/config'
import { deepCopy } from '@/utils/utils'
import axios from 'axios'
import {
    addMarktingMaterial,
    getLikeMerchantList,
    getMarktingMaterialDetail,
    deleteMarktingMaterial,
    addDispatchOrder,
    getToDispatchList,
    recycleMaterial
} from '../api'
import { getChiness } from '../../hmall/membership/api'
import { AUTH_CLOUD_DISPATCH_DELIVER_OPERATE } from '@/utils/auth_const'

const materialsParams = {
    id: '',
    department: '',
    departmentId: '',
    receiverName: '',
    receiverPhone: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    countryId: '',
    countryName: '',
    address: '',
    remark: '',
    operator: '',
    details: []
}

const dispatchParams = {
    type: '2',
    orderId: '',
    source: 'material',
    deliveryType: 1,
    deliverer: '',
    logisticsCompany: '',
    courierNo: '',
    creator: '',
    creatorPhone: '',
    proofPictureList: [],
    productList: []
}

export default {
    name: 'merchantDispatchManager',
    data () {
        return {
            deliverOperateAuth: AUTH_CLOUD_DISPATCH_DELIVER_OPERATE,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                receiverPhone: this.$route.query.receiverPhone ? this.$route.query.receiverPhone : '',
                status: null,
                receiverName: '',
                provinceId: '',
                cityId: '',
                countryId: '',
                startTime: '',
                endTime: ''
            },
            searchParams: {},
            tableData: [],
            spanArr: [],
            isSaving: false,
            isIndeterminate: false,
            checkAll: false,
            materials: [], // 过滤的数据
            allMaterials: [], // 没有过滤的数据
            currentMaterial: null,
            detailsKey: 0,
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            materialForm: deepCopy(materialsParams),
            dispatchForm: deepCopy(dispatchParams),
            uploadImages: [],
            rules: {
                receiverName: [
                    { required: true, message: '请输入收货人名称', trigger: 'blur' }
                ],
                receiverPhone: [
                    { required: true, message: '请输入收货人手机号', trigger: 'blur' },
                    { message: '请输入正确手机号码', trigger: 'blur', pattern: /^[1][0-9]{10}$/ }
                ],
                departmentId: [
                    { required: true, message: '请输入收货人所在分部', trigger: 'change' }
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
                    { required: true, message: '请输入收货人详细地址', trigger: 'blur' }
                ],
                materialName: [
                    { required: true, message: '请输入物料名称', trigger: 'blur' }
                ],
                materialCount: [
                    { required: true, message: '请输入物料件数', trigger: 'blur' },
                    { message: '请设置正确的数量', trigger: 'blur', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ]
            },
            dispatchRules: {
                logisticsCompany: [
                    { required: true, message: '请输入物流公司名称', trigger: 'blur' }
                ],
                courierNo: [
                    { required: true, message: '请输入快递单号', trigger: 'blur' }
                ]
            },
            provinceList: [],
            cityList: [],
            tableLabel: [
                { label: '需求单号', prop: 'materialId' },
                { label: '所属分部', prop: 'department' },
                { label: '收件人姓名', prop: 'receiverName' },
                { label: '收件人电话', prop: 'receiverPhone' },
                { label: '收件人地址', prop: 'address' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', width: '140' },
                { label: '物料名称', prop: 'materialName' },
                { label: '物料件数', prop: 'materialCount' },
                { label: '发货状态', prop: 'status' },
                { label: '发货时间', prop: 'courierTime', formatters: 'dateTime', width: '140' },
                { label: '发货人', prop: 'deliverer' },
                { label: '物流公司', prop: 'logisticsCompany' },
                { label: '快递单号', prop: 'courierNo' },
                { label: '发货凭证', prop: 'proofPictures' },
                { label: '备注', prop: 'remark', width: '200' }
            ],
            addDialogVisible: false,
            dispatchDialogVisible: false,
            recommendData: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            departmentList: 'cloudMerchantMemberDepartmentList',
            materialList: 'cloudMerchantMaterialList'
        }),
        statusString () {
            return status => {
                if (status === 0) {
                    return '待发货'
                } else if (status === 1) {
                    return '已发货'
                } else if (status === 2) {
                    return '已回收'
                } else {
                    return ''
                }
            }
        },
        isDetail () {
            if (this.materialForm.id > 0) {
                return true
            }
            return false
        },
        isCanDelelte () {
            return status => {
                if (this.isDetail) {
                    if (status === undefined || status === 0) {
                        return true
                    }
                    return false
                }
                return true
            }
        },
        isCanEdit () {
            let canEdit = false
            this.materialForm.details.forEach(item => {
                if (item.status === 1 || item.status === 2) {
                    canEdit = true
                }
            })
            return canEdit
        },
        noDispatchCount () {
            if (this.materialForm.details.length === 0) {
                return 1
            }
            let count = 0
            this.materialForm.details.forEach(item => {
                if (item.status === undefined || item.status === 0) {
                    count++
                }
            })
            return count
        },
        canDispatchType () {
            console.log(this.allMaterials, '全部商品')
            console.log(this.materials, '待发货商品')
            let type = 1 // 1 表示不用选择 默认全部发货 2 表示不能选择全部，只能选择分批发 3表示正常的
            let count = 0
            let hasDispatch = false
            this.allMaterials.forEach(item => {
                if (item.status === undefined || item.status === 0) {
                    count++
                } else {
                    hasDispatch = true
                }
            })
            if (this.allMaterials.length === 1 && count === 1) {
                type = 1
            } else if (this.allMaterials.length > 1 && count > 0 && hasDispatch) {
                type = 2
            } else if (this.allMaterials.length > 1 && count > 0 && !hasDispatch) {
                type = 3
            } else {
                type = 2
            }
            console.log(type, '应该选择的发货方式')
            return type
        },
        getProofPictures () {
            return pics => {
                return pics.split(',')
            }
        },
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId === this.queryParams.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        getCountry () {
            const city = this.cityList.filter(item => item.cityId === this.queryParams.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        },
        getCityAddress () {
            const province = this.provinceList.filter(item => item.provinceId === this.materialForm.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        getCountryAddress () {
            const city = this.cityList.filter(item => item.cityId === this.materialForm.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        },
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
                    let endDateVal = this.queryParams.endRegisterTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startRegisterTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    watch: {
        getCity: {
            deep: true,
            handler: function (newVal) {
                this.cityList = newVal
            }
        },
        getCityAddress: {
            deep: true,
            handler: function (newVal) {
                this.cityList = newVal
            }
        }
    },
    mounted () {
        this.onSearch()
        this.getAreacode()
        this.getDepartment()
    },
    activated () {
        this.onQuery()
    },
    methods: {
        ...mapActions({
            findCloudMerchantMemberDepartmentList: 'findCloudMerchantMemberDepartmentList',
            findCloudMerchantMaterialList: 'findCloudMerchantMaterialList'
        }),
        async onQuery () {
            await this.findCloudMerchantMaterialList(this.searchParams)
            this.tableData = this.materialList.records
            this.pagination = {
                pageNumber: this.materialList.current,
                pageSize: this.materialList.size,
                total: this.materialList.total
            }
            let contactDot = 0
            this.spanArr = []
            this.tableData.forEach((item, index) => {
                // materialId
                if (index === 0) {
                    this.spanArr.push(1)
                } else {
                    if (item.materialId === this.tableData[index - 1].materialId) {
                        this.spanArr[contactDot] += 1
                        this.spanArr.push(0)
                    } else {
                        this.spanArr.push(1)
                        contactDot = index
                    }
                }
            })
        },
        async querySuggestions (queryString, cb) {
            if (queryString.length > 0) {
                const { data } = await getLikeMerchantList({ productName: queryString })
                const filterData = data.filter(item => {
                    let same = false
                    this.materialForm.details.forEach(entity => {
                        if (item.productName === entity.materialName) {
                            same = true
                        }
                    })
                    return !same
                })
                const options = filterData.map(item => ({
                    value: item.productName
                }))
                cb(options)
            }
        },
        submitForm (formName) {
            if (this.isSaving) {
                return
            }
            this.isSaving = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    try {
                        if (formName === 'dispatchForm') {
                            this.saveDispatch()
                        } else {
                            this.saveMetarial()
                        }
                        this.isSaving = false
                    } catch (e) {
                        console.log(e, '报错信息')
                        this.isSaving = false
                    }
                } else {
                    console.log(this.$refs[formName], valid, '校验失败')
                    this.isSaving = false
                }
            })
        },

        async saveMetarial () {
            let { ...params } = this.materialForm
            if (params.details.length === 0) {
                this.$message({
                    message: '请添加物料明细',
                    type: 'error'
                })
                return
            }
            params.operator = this.userInfo.employeeName
            if (params.id.length === 0) {
                params.id = null
            }
            if (params.departmentId.length > 0) {
                const dep = this.departmentList.filter(item => {
                    return item.crmDeptCode === params.departmentId
                })
                params.department = dep.length > 0 ? dep[0].deptName : ''
            }
            if (params.provinceId.length > 0) {
                const province = this.provinceList.filter(item => {
                    return item.provinceId === params.provinceId
                })
                params.provinceName = province.length > 0 ? province[0].name : ''
            }
            if (params.cityId.length > 0) {
                const city = this.getCityAddress.filter(item => {
                    return item.cityId === params.cityId
                })
                params.cityName = city.length > 0 ? city[0].name : ''
            }
            if (params.countryId.length > 0) {
                const country = this.getCountryAddress.filter(item => {
                    return item.countryId === params.countryId
                })
                params.countryName = country.length > 0 ? country[0].name : ''
            }
            console.log(params)
            await addMarktingMaterial(params)
            this.addDialogVisible = false
            this.onQuery()
        },

        async saveDispatch () {
            let { ...params } = this.dispatchForm
            params.deliverer = this.userInfo.employeeName
            params.orderId = this.currentMaterial.materialId
            if (params.deliveryType === 1) {
                params.productList = null
            }
            params.creator = this.userInfo.employeeName
            params.creatorPhone = this.userInfo.phoneNumber
            console.log(params, '发货参数')
            await addDispatchOrder(params)
            this.dispatchDialogVisible = false
            this.onQuery()
        },
        // 查看数据详情
        async onDetail (val) {
            const { data } = await getMarktingMaterialDetail(val)
            this.materialForm = data
            this.addDialogVisible = true
            this.$nextTick(() => {
                if (this.$refs['dispatchForm']) {
                    this.$refs['dispatchForm'].clearValidate()
                }
                if (this.$refs['materialForm']) {
                    this.$refs['materialForm'].clearValidate()
                }
            })
            this.materialForm.details = data.details.map(item => {
                this.detailsKey++
                return {
                    materialName: item.materialName,
                    materialCount: item.materialCount,
                    materialProductId: item.materialProductId,
                    key: this.detailsKey,
                    status: item.status
                }
            })
            console.log(this.materialForm, '数据详情')
        },
        // 删除营销物料
        onDelete (val) {
            console.log(val)
            this.$confirm('删除后，该需求单将全部删除。如您想修改部分，请在详情中修改', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await deleteMarktingMaterial(val)
                this.onQuery()
            })
        },
        // 物料回收
        onCecycle (val) {
            this.$confirm('请确认前期发货的营销物料是否已全部回收入库？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await recycleMaterial({
                    materialId: val.materialId,
                    materialProductId: val.id
                })
                this.onQuery()
            })
        },
        // 营销物料发货
        async onDispatch (val) {
            this.clearData()
            const params = {
                orderId: val.materialId,
                source: 'material'
            }
            this.currentMaterial = val
            const { data } = await getToDispatchList(params)
            this.allMaterials = data
            const type = this.canDispatchType
            if (type === 2) {
                this.dispatchForm.deliveryType = 2
            }
            console.log(data)
            this.materials = data.filter(item => item.status === 0)
            this.dispatchDialogVisible = true
            this.$nextTick(() => {
                if (this.$refs['dispatchForm']) {
                    this.$refs['dispatchForm'].clearValidate()
                }
                if (this.$refs['materialForm']) {
                    this.$refs['materialForm'].clearValidate()
                }
            })
        },
        handleSelect (item) {
            console.log(item, '数据选择')
        },
        handleCheckAllChange (val) {
            this.dispatchForm.productList = val ? this.materials : []
            this.isIndeterminate = false
        },
        handleCheckedMaterialChange (value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.materials.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.materials.length
        },
        handleSuccess (response, file, fileList) {
            if (response.code === 200) {
                this.uploadImages.push(file)
                this.dispatchForm.proofPictureList.push(response.data.accessUrl)
            }
        },
        handleRemove (file, fileList) {
            let index = this.dispatchForm.proofPictureList.indexOf(file.response.data.accessUrl)
            this.dispatchForm.proofPictureList.splice(index, 1)
            this.uploadImages.splice(index, 1)
        },
        pictureMessage (files, fileList) {
            this.$message({
                type: 'warning',
                message: '最多上传2张'
            })
        },
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpg'
            const isJPEG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            if (!(isJPG || isJPEG || isPNG)) {
                this.$message({
                    type: 'error',
                    message: '文件格式不正确'
                })
            }
            return isJPG || isJPEG || isPNG
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        addMaterial () {
            this.detailsKey++
            this.materialForm.details.push({ materialName: '', materialCount: null, key: this.detailsKey })
        },
        deleteMaterial (val) {
            const index = this.materialForm.details.indexOf(val)
            this.materialForm.details.splice(index, 1)
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        },
        async getDepartment () {
            await this.findCloudMerchantMemberDepartmentList({
                deptType: 'F',
                pkDeptDoc: this.userInfo.pkDeptDoc,
                jobNumber: this.userInfo.jobNumber,
                authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
            })
        },
        onProvince (key) {
            this.queryParams.provinceId = key
            this.queryParams.cityId = ''
            this.queryParams.countryId = ''
        },
        onCity (key) {
            this.queryParams.cityId = key
            this.queryParams.countryId = ''
        },
        onArea (key) {
            this.queryParams.countryId = key
        },
        onProvinceAddress (key) {
            this.materialForm.provinceId = key
            this.materialForm.cityId = ''
            this.materialForm.countryId = ''
        },
        onCityAddress (key) {
            this.materialForm.cityId = key
            this.materialForm.countryId = ''
        },
        onCountryAddress (key) {
            this.materialForm.countryId = key
        },
        addNewMetarial () {
            this.addDialogVisible = true
            this.clearData()
            this.$nextTick(() => {
                if (this.$refs['dispatchForm']) {
                    this.$refs['dispatchForm'].clearValidate()
                }
                if (this.$refs['materialForm']) {
                    this.$refs['materialForm'].clearValidate()
                }
            })
        },
        cancelDialog () {
            this.clearData()
            this.addDialogVisible = false
            this.dispatchDialogVisible = false
        },
        clearData () {
            this.currentMaterial = null
            this.isIndeterminate = false
            this.checkAll = false
            this.uploadImages = []
            this.dispatchForm = {
                type: '2',
                orderId: '',
                source: 'material',
                deliveryType: 1,
                deliverer: '',
                logisticsCompany: '',
                courierNo: '',
                creator: '',
                creatorPhone: '',
                proofPictureList: [],
                productList: []
            }
            this.materialForm = {
                id: '',
                department: '',
                departmentId: '',
                receiverName: '',
                receiverPhone: '',
                provinceId: '',
                provinceName: '',
                cityId: '',
                cityName: '',
                countryId: '',
                countryName: '',
                address: '',
                remark: '',
                operator: '',
                details: []
            }
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        objectSpanMethod (val) {
            // console.log(val, '数据格式')
            const { columnIndex, rowIndex } = val
            const spanColumn = columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 14
            if (spanColumn) {
                const _row = this.spanArr[rowIndex]
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        checkImage (val) {
            window.open(val)
        }
    }
}
</script>

<style lang='scss' scoped>
.city-area {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.form-title {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    padding-bottom: 20px;
    span {
        padding-left: 5px;
        font-size: 14px;
        font-weight: 400;
        color: #666;
    }
}

.form-detail {
    margin: 0 0 20px 20px;
    line-height: 30px;
}

.header-title {
    font-size: 16px;
    font-weight: 500;
    margin-right: 20px;
}

.orangeBtn {
    margin: 5px 0;
}

.topColred {
    color: #ff7a45;
    cursor: pointer;
}

.remark {
    display: -webkit-box;
    white-space: normal;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5 !important;
    overflow: hidden;
    text-overflow: ellipsis;
}

.query-cont-col-area {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 24px;
}

.tip {
    font-size: 12px;
    color: #666;
}

/deep/ .el-dialog__body {
    padding-top: 10px;
}

/deep/ .el-dialog .address .el-select {
    width: 164px;
}

/deep/ .el-dialog .address .el-input {
    width: 164px;
    margin: 0;
}

/deep/ .el-dialog .wlname .el-form-item__label {
    font-size: 18px;
    font-weight: 500;
    color: #333;
}

/deep/ .el-dialog .address .el-form-item {
    margin: 0;
}

/deep/ .el-dialog .wlcode .el-form-item__label {
    font-size: 18px;
    font-weight: 500;
    color: #333;
}
/deep/ .el-upload--picture-card {
    width: 100px;
    height: 100px;
}
/deep/ .el-upload {
    width: 100px;
    height: 100px;
    line-height: 100px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
    line-height: 100px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 100px;
    height: 100px;
    line-height: 100px;
}
</style>

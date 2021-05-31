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
                    <div class="query-col-title">经营区域：</div>
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
                        <el-select v-model="queryParams.countryId" placeholder="区" :clearable=true>
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

            <basicTable :spanMethod="objectSpanMethod" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="action" slot-scope="scope">
                    <el-button v-if="scope.data.row.status === 1" class="orangeBtn" @click="onEdit(scope.data.row)">回收入库</el-button>
                    <el-button v-if="scope.data.row.status === 0" class="orangeBtn" @click="onDispatch(scope.data.row)">发货</el-button>
                    <el-button v-if="scope.data.row.status === 0" class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">查看详情</el-button>
                </template>
                <template slot="remark" slot-scope="scope">
                    <p class="remark">
                        {{scope.data.row.remark}}
                    </p>
                </template>
                <template slot="status" slot-scope="scope">
                    {{statusString(scope.data.row.status)}}
                </template>
            </basicTable>
            <el-dialog :title="materialForm.id.length > 0 ? '营销物料需求详情':'新增营销物料需求'" :modal-append-to-body=false :append-to-body=false :visible.sync="addDialogVisible" width="1000px">
                <el-form :model="materialForm" :rules="rules" ref="materialForm" label-width="130px">
                    <div v-if="materialForm.id.length > 0">
                        <div>
                            <span>需求编号</span>
                            <span>10001</span>
                        </div>
                        <div>需求详情</div>
                        <div>
                            <span>创建人</span>
                            <span>姚稳</span>
                        </div>
                        <div>
                            <span>创建时间</span>
                            <span>20202020</span>
                        </div>
                    </div>
                    <el-form-item label="收货人手机号：" prop="receiverPhone">
                        <el-input v-model="materialForm.receiverPhone" maxlength="11" placeholder="请输入收货人手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人姓名：" prop="receiverName">
                        <el-input v-model="materialForm.receiverName" maxlength="50" placeholder="请输入收货人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分部：" prop="departmentId">
                        <el-select v-model="materialForm.departmentId">
                            <el-option :label="item.deptName" :value="item.crmDeptCode" v-for="item in departmentList" :key="item.crmDeptCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="address" label="收货人地址：" required>
                        <div class="city-area">
                            <el-form-item label-width="0px" prop="provinceId">
                                <el-select v-model="materialForm.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <span class="ml10 mr10">-</span>
                            <el-form-item label-width="0px" prop="cityId">
                                <el-select v-model="materialForm.cityId" @change="onCity" placeholder="市" :clearable=true>
                                    <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <span class="ml10 mr10">-</span>
                            <el-form-item label-width="0px" prop="countryId">
                                <el-select v-model="materialForm.countryId" placeholder="区" :clearable=true>
                                    <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                    </el-form-item>
                    <el-form-item label="详细地址：" prop="address">
                        <el-input v-model="materialForm.address" style='width:400px' maxlength="100" placeholder="请输入具体地址"></el-input>
                    </el-form-item>
                    <el-form-item label="物料明细：" required>
                        <el-button type="primary" @click="addMaterial">+ 添加物料</el-button>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <div v-for="(mera,index) in materialForm.details" :key="mera.key">
                            <el-col :span="10">
                                <el-form-item label="物料/商品名称：" :prop="'details.'+index+'.materialName'" :rules="rules.materialName">
                                    <el-autocomplete class="inline-input" placeholder="输入物料名称" v-model="mera.materialName" :trigger-on-focus="false" @select="handleSelect" :fetch-suggestions="querySuggestions">
                                    </el-autocomplete>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="物料件数：" :prop="'details.'+index+'.materialCount'" :rules="rules.materialCount">
                                    <el-input placeholder="输入件数" v-model="mera.materialCount"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" v-if="materialForm.id.length > 0">
                                <p>已发货</p>
                            </el-col>
                            <el-col :span="2">
                                <el-button v-if="mera.status === undefined || mera.status === 0" type="danger" @click="deleteMaterial(mera)">删除</el-button>
                            </el-col>
                        </div>

                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="materialForm.remark" maxlength="500" :rows="3" type="textarea" placeholder="输入推荐话术，将展示在推广商品列表中，不超过500字符" />
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelDialog">取消</el-button>
                    <el-button type="primary" @click="submitForm('materialForm')">确认</el-button>
                </span>
            </el-dialog>
            <el-dialog title="填写发货信息" :modal-append-to-body=false :append-to-body=false :visible.sync="dispatchDialogVisible" width="50%">
                <el-form :model="dispatchForm" :rules="dispatchRules" ref="dispatchForm">
                    <el-form-item class="wlname" label="请选择发货方式" required>
                    </el-form-item>
                    <div style="margin-left:30px">
                        <div>该订单中含有多款商品，建议按订单合并发货</div>
                        <el-form-item label-width="0">
                            <el-radio v-model="dispatchForm.deliveryType" :label="1">按订单合并发货：订单中的商品只需维护一次发货信息</el-radio>
                            <el-radio v-model="dispatchForm.deliveryType" :label="2">按商品分开发货：订单中部分产品发货，需按实际发货的商品维护发货信息</el-radio>
                        </el-form-item>
                        <div v-if="dispatchForm.deliveryType === 2" style="margin-bottom:30px">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="dispatchForm.productList" @change="handleCheckedMaterialChange">
                                <el-checkbox v-for="material in materials" :label="material" :key="material.productId">{{material.productName}}</el-checkbox>
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
                        <el-upload list-type="picture-card" v-bind="uploadInfo" :file-list="uploadImages" :multiple='true' accept=".jpg,.jpeg,.png" :on-success="handleSuccess" :limit="2" :on-exceed="pictureMessage" :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
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
import axios from 'axios'
import {
    addMarktingMaterial,
    getLikeMerchantList,
    getMarktingMaterialDetail,
    deleteMarktingMaterial,
    addDispatchOrder,
    getToDispatchList
} from '../api'
import { getChiness } from '../../hmall/membership/api'

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
    proofPictureList: [],
    productList: []
}

export default {
    name: 'merchantDispatchManager',
    data () {
        return {
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
            materials: [],
            currentMaterial: null,
            detailsKey: 0,
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            materialForm: JSON.parse(JSON.stringify(materialsParams)),
            dispatchForm: JSON.parse(JSON.stringify(dispatchParams)),
            uploadImages: [],
            rules: {
                receiverName: [
                    { required: true, message: '请输入收货人名称', trigger: 'blur' }
                ],
                receiverPhone: [
                    { required: true, message: '请输入收货人手机号', trigger: 'blur' }
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
                    { required: true, message: '请输入物料件数', trigger: 'blur' }
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
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', width: '140' },
                { label: '物料名称', prop: 'materialName' },
                { label: '物料件数', prop: 'materialCount' },
                { label: '所属分部', prop: 'department' },
                { label: '收件人姓名', prop: 'receiverName' },
                { label: '收件人电话', prop: 'receiverPhone' },
                { label: '收件人地址', prop: 'address' },
                { label: '发货状态', prop: 'status' },
                { label: '发货时间', prop: 'courierTime', formatters: 'dateTime', width: '140' },
                { label: '发货人', prop: 'deliverer' },
                { label: '物流公司', prop: 'logisticsCompany' },
                { label: '快递单号', prop: 'courierNo' },
                { label: '发货凭证', prop: 'proofPictures' },
                { label: '备注', prop: 'remark' }
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
                }
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
                const options = data.map(item => ({
                    value: item.productName
                }))
                console.log(options, '处理过的数据')
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
                        this.isSaving = false
                    }
                } else {
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
                const city = this.getCity.filter(item => {
                    return item.cityId === params.cityId
                })
                params.cityName = city.length > 0 ? city[0].name : ''
            }
            if (params.countryId.length > 0) {
                const country = this.getCountry.filter(item => {
                    return item.countryId === params.countryId
                })
                params.countryName = country.length > 0 ? country[0].name : ''
            }
            await addMarktingMaterial(params)
            this.addDialogVisible = false
            this.onQuery()
        },

        async saveDispatch () {
            let { ...params } = this.dispatchForm
            params.deliverer = this.userInfo.employeeName
            params.orderId = this.currentMaterial.materialId
            console.log(params)
            await addDispatchOrder(params)
            this.dispatchDialogVisible = false
            this.onQuery()
        },
        // 查看数据详情
        async onDetail (val) {
            const { data } = await getMarktingMaterialDetail(val)
            this.materialForm = data
            this.addDialogVisible = true
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
        // 营销物料发货
        async onDispatch (val) {
            const params = {
                orderId: val.materialId,
                source: 'material'
            }
            this.currentMaterial = val
            const { data } = await getToDispatchList(params)
            console.log(data, '待发货列表')
            this.materials = data
            this.clearData()
            this.dispatchDialogVisible = true
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
            let index = this.uploadImages.indexOf(file.url)
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
        addNewMetarial () {
            this.clearData()
            this.addDialogVisible = true
        },
        cancelDialog () {
            this.addDialogVisible = false
            this.dispatchDialogVisible = false
            this.clearData()
        },
        clearData () {
            this.currentMaterial = null
            this.dispatchForm = dispatchParams
            this.materialForm = materialsParams
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
            // const { columnIndex, rowIndex } = val
            // const spanColumn = columnIndex === 0 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 14
            // if (spanColumn) {
            //     const _row = this.spanArr[rowIndex]
            //     const _col = _row > 0 ? 1 : 0
            //     return {
            //         rowspan: _row,
            //         colspan: _col
            //     }
            // }
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

.orangeBtn {
    margin: 5px 0;
}

.remark {
    word-break: break-word;
}

.query-cont-col-area {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 24px;
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

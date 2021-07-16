<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont spanflex">
            <span>投诉工单</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">投诉工单号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入投诉工单号" v-model="queryParams.workOrderNo" maxlength="50" clearable></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">投诉时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-ddTHH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-ddTHH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">解决状态：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.status" clearable>
                        <el-option label="待处理" value="0"></el-option>
                        <el-option label="处理中" value="10"></el-option>
                        <el-option label="已处理" value="20"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">投诉产品：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入产品名称" v-model="queryParams.productName" maxlength="50" clearable></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">客户手机号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入客户手机号" v-model="queryParams.customerMobile" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">经销商手机号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入经销商手机号" v-model="queryParams.agencyMobile" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">经销商：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入经销商名称" v-model="queryParams.agencyCompanyName" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="createComplaintOrder">新建投诉工单</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="status" slot-scope="scope">
                    {{orderStatus(scope.data.row.status)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>
        </div>

        <el-dialog :title="detailData.id > 0 ?'投诉详情':'新增投诉工单'" :visible.sync="addOrderDialogVisible" class="upload-show" width="1200px" :close-on-click-modal="false" :before-close="cancelAddOrderClick">
            <div class="el-dialog-div">
                <div class="radio-container" v-if="detailData.id > 0">
                    <el-radio-group v-model="radio" @change="onTabRadio">
                        <el-radio-button label="投诉信息"></el-radio-button>
                        <el-radio-button label="解决记录"></el-radio-button>
                    </el-radio-group>
                </div>
                <el-form :model="detailData" :rules="addOrderRules" ref="addOrderForm" label-width="140px" v-if="showDetailForm">
                    <el-form-item label="投诉时间" prop="time">
                        <el-date-picker v-model="detailData.time" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-ddTHH:mm:ss" type="datetime" placeholder="选择日期" :picker-options="complatintPickerOptionsStart">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="0">
                        <el-col :span="8">
                            <el-form-item label="客户手机号：" prop="customerMobile">
                                <el-input v-model="detailData.customerMobile" maxlength="11" placeholder="请填写客户手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户姓名：" prop="customerName">
                                <el-input v-model="detailData.customerName" maxlength="16" placeholder="请填写客户姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户微信号：" prop="customerWxId">
                                <el-input v-model="detailData.customerWxId" maxlength="50" placeholder="请填写客户微信号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="客户地址：">
                        <el-col :span="6">
                            <el-form-item label-width="0" prop="provinceId">
                                <el-select v-model="detailData.provinceId" placeholder="请选择省" @change="onProvince">
                                    <template v-for="item in provinceList">
                                        <el-option :key="item.provinceId" :label="item.name" :value="item.provinceId">
                                        </el-option>
                                    </template>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="6">
                            <el-form-item label-width="0" prop="cityId">
                                <el-select v-model="detailData.cityId" placeholder="请选择市" @change="onCity">
                                    <el-option v-for="(item) in getCity" :key="item.cityId" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="6">
                            <el-form-item label-width="0" prop="countryId">
                                <el-select v-model="detailData.countryId" placeholder="请选择区" @change="onArea">
                                    <el-option v-for="(item) in getCountry" :key="item.countryId" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="address">
                        <el-input style="width: 500px" v-model="detailData.address" maxlength="100" :rows="1" placeholder="请输入详细地址" />
                    </el-form-item>

                    <el-form-item label="选择投诉产品：" prop="deviceInfoList">
                        <el-button type="primary" @click="onAddProduct">+添加设备</el-button>
                    </el-form-item>

                    <div class="query-cont-row" v-for="(productItem,index) in detailData.deviceInfoList" :key="index">
                        <el-form-item label="归属品类：" :prop="'deviceInfoList.' + index + '.categoryId'" :rules="addOrderRules.categoryId">
                            <el-select v-model="productItem.categoryId" @change="()=> { selectChanged(index) }">
                                <el-option :label="item.name" :value="item.id" v-for="item in allCategorys" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品型号：" label-width="100px" :prop="'deviceInfoList.' + index + '.specificationId'" :rules="addOrderRules.specificationId">
                            <el-select v-model="productItem.specificationId" @change="()=>{selectSpecificationIdChanged(index)}">
                                <el-option :label="item.name" :value="item.type" v-for="item in categoryTypes[index]" :key="item.type"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备ID" label-width="100px" :prop="'deviceInfoList.' + index + '.deviceId'" :rules="addOrderRules.deviceId">
                            <el-input style="width: 150px" v-model="productItem.deviceId" maxlength="45" :rows="1" @blur='()=>{deviceIDonBlur(index)}' placeholder="请输入设备ID" />
                        </el-form-item>
                        <el-button style="align-self: flex-start;margin-left: 20px;" type="primary" @click="()=> { onRemoveProduct(index) }">删除</el-button>
                    </div>
                    <el-form-item label="问题描述：" prop="description">
                        <el-input style="width: 500px" type="textarea" v-model="detailData.description" maxlength="500" show-word-limit :rows="2" placeholder="请输入问题描述" />
                    </el-form-item>
                    <el-form-item label="问题图片：" ref="payImgs">
                        <el-upload :action="imageUploadAction" :data="imageUploadData" name='multiFile' :on-preview="handlePreview" :file-list="imgs" :multiple='true' :on-success="handleUploadImageSuccess" :limit="8" :on-exceed="uploadImageExceptMessage" :before-upload="beforeImageUpload"
                            :on-remove="handleImageRemove">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">不超过8张（支持JPEG、PNG、MP4格式）</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="经销商手机号：" prop="agencyMobile">
                        <el-input v-model="detailData.agencyMobile" maxlength="11" :rows="1" placeholder="请输入经销商手机号" />
                    </el-form-item>
                    <el-form-item label="经销商姓名：" prop="agencyName">
                        <el-input v-model="detailData.agencyName" maxlength="16" :rows="1" placeholder="请输入经销商姓名" />
                    </el-form-item>
                    <el-form-item label="经销商企业名称：" prop="agencyCompanyName">
                        <el-input v-model="detailData.agencyCompanyName" maxlength="50" :rows="1" placeholder="请输入经销商企业名称" />
                    </el-form-item>
                </el-form>
                <div v-else>
                    <div class="query-cont-col">
                        <div class="query-col-title" v-if="currentData.status !== 20">
                            <el-button type="primary" plain class="ml20" @click="addResloveRecord">+新增解决记录</el-button>
                        </div>
                    </div>
                    <basicTable :tableLabel="recordTableLabel" :tableData="recordTableData" :isShowIndex='true' :pagination="recordPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                        <template slot="status" slot-scope="scope">
                            {{orderStatus(scope.data.row.status)}}
                        </template>
                        <template slot="action" slot-scope="scope">
                            <el-button class="orangeBtn" @click="onEdit(scope.data.row.id)">编辑</el-button>
                            <el-button class="orangeBtn" @click="onDelete(scope.data.row.id)">删除</el-button>
                        </template>
                    </basicTable>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="cancelAddOrderClick">取 消</h-button>
                <h-button type="primary" @click="submitAddOrderForm" :loading="loading">确 定</h-button>
            </div>
        </el-dialog>
        <el-dialog title="新增解决记录" :visible.sync="addRecordDialogVisible" class="upload-show" width="600px" :close-on-click-modal="false" :before-close="createRecordCancel">
            <div class="el-dialog-div">
                <el-form :model="recordData" :rules="addRecordRules" ref="addRecordForm" label-width="140px">
                    <el-form-item label="沟通时间" prop="processTime">
                        <el-date-picker v-model="recordData.processTime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-ddTHH:mm:ss" type="datetime" placeholder="选择日期" :picker-options="complatintPickerOptionsStart">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="解决结果：" prop="status">
                        <el-select v-model="recordData.status">
                            <el-option label="处理中" :value='10'></el-option>
                            <el-option label="已处理" :value='20'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="解决内容：" prop="content">
                        <el-input style="width: 400px" v-model="recordData.content" type="textarea" maxlength="100" :rows="3" placeholder="请输入沟通内容" />
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="createRecordCancel">取 消</h-button>
                <h-button type="primary" @click="createRecordConform" :loading="loading">确 定</h-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { getChiness } from '../../hmall/membership/api'
import {
    createComplaintOrder,
    editComplaintOrder,
    editComplaintProcessOrder,
    createComplaintProcessOrder,
    deleteComplaintProcessOrder,
    getOutboundList
} from '../api/index'
import { iotUrl, interfaceUrl } from '@/api/config'
import Vue from 'vue'

const _dataForm = {
    id: 0,
    time: '',
    customerMobile: '',
    customerName: '',
    customerWxId: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    countryId: '',
    countryName: '',
    address: '',
    deviceInfoList: [],
    description: '',
    pictures: [],
    agencyMobile: '',
    agencyName: '',
    agencyCompanyName: '',
    operator: '',
    operatorPhone: ''
}

const _recordData = {
    id: 0,
    workOrderId: '',
    processTime: '',
    status: null,
    content: '',
    operator: ''
}

export default {
    name: 'complaintOrder',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                workOrderNo: '',
                status: null,
                productName: '',
                customerMobile: this.$route.query.phone ? this.$route.query.phone : '',
                agencyMobile: '',
                agencyCompanyName: '',
                endTime: '',
                startTime: ''
            },
            recordQueryParams: {
                pageNumber: 1,
                pageSize: 10,
                workOrderId: ''
            },
            radio: '投诉信息',
            imgs: [],
            currentData: null,
            loading: false,
            searchParams: {},
            categoryTypes: [],
            allCategorys: [],
            provinceList: [],
            tableData: [],
            recordTableData: [],
            tableLabel: [
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '投诉时间', prop: 'time', displayAs: 'yyyy-MM-DD HH:mm' },
                { label: '工单号', prop: 'workOrderNo' },
                { label: '创建人', prop: 'creator' },
                { label: '客户姓名', prop: 'customerName' },
                { label: '客户电话', prop: 'customerMobile' },
                { label: '客户地址', prop: 'address' },
                { label: '经销商手机号', prop: 'agencyMobile' },
                { label: '经销商名称', prop: 'agencyCompanyName' },
                { label: '投诉产品', prop: 'productName' },
                { label: '问题描述', prop: 'description' },
                { label: '解决状态', prop: 'status' }
            ],
            recordTableLabel: [
                { label: '沟通时间', prop: 'processTimeString' },
                { label: '解决结果', prop: 'status' },
                { label: '解决内容', prop: 'content' }
            ],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            recordPagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            detailData: JSON.parse(JSON.stringify(_dataForm)),
            recordData: JSON.parse(JSON.stringify(_recordData)),
            addOrderRules: {
                time: [
                    { required: true, message: '请选择投诉时间', trigger: 'blur' }
                ],
                customerMobile: [
                    { required: true, message: '请输入正确客户手机号', trigger: 'blur', pattern: /^[1][0-9]{10}$/ }
                ],
                consigneeName: [
                    { required: true, message: '请输入客户姓名', trigger: 'blur' }
                ],
                deviceInfoList: [
                    { required: true, message: '请添加设备', trigger: 'change' }
                ],
                categoryId: [
                    { required: true, message: '请选择商品品类', trigger: 'change' }
                ],
                specificationId: [
                    { required: true, message: '请选择商品型号', trigger: 'change' }
                ],
                deviceId: [
                    { required: true, message: '请输入设备ID', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入问题描述', trigger: 'blur' }
                ],
                agencyMobile: [
                    { required: true, message: '请输入正确经销商手机号', trigger: 'blur', pattern: /^[1][0-9]{10}$/ }
                ]
            },
            addRecordRules: {
                processTime: [
                    { required: true, message: '请选择沟通日期', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择解决结果', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入解决内容', trigger: 'change' }
                ]
            },
            addOrderDialogVisible: false,
            addRecordDialogVisible: false
        }
    },
    methods: {
        ...mapActions({
            getComplaintOrderList: 'getComplaintOrderList',
            getComplaintOrderDetail: 'getComplaintOrderDetail',
            getComplaintProcessOrderList: 'getComplaintProcessOrderList',
            getComplaintProcessOrderDetail: 'getComplaintProcessOrderDetail',
            findCloudMerchantShopCategoryList: 'findCloudOutboundCategoryList',
            findCloudMerchantShopCategoryTypeList: 'findCloudOutboundDeviceList'
        }),
        addResloveRecord () {
            this.addRecordDialogVisible = true
        },
        onTabRadio (val) {
            if (val === '解决记录') {
                this.onQueryComplaintRecord()
            }
        },
        async onQueryComplaintRecord () {
            this.recordQueryParams.pageNumber = 1
            let parmas = { ...this.recordQueryParams }
            parmas.workOrderId = this.detailData.id
            await this.getComplaintProcessOrderList(parmas)
            this.recordTableData = this.complaintProcessOrderList.records
            this.recordPagination = {
                pageNumber: this.complaintProcessOrderList.current,
                pageSize: this.complaintProcessOrderList.size,
                total: this.complaintProcessOrderList.total
            }
        },
        createRecordConform () {
            this.recordData.operator = this.userInfo.employeeName
            this.recordData.workOrderId = this.detailData.id
            this.loading = true
            this.$refs['addRecordForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        if (this.recordData.id > 0) {
                            await editComplaintProcessOrder(this.recordData)
                        } else {
                            this.recordData.id = undefined
                            await createComplaintProcessOrder(this.recordData)
                        }
                        this.loading = false
                        this.createRecordCancel()
                        this.cancelAddOrderClick()
                        this.onQuery()
                        this.$message({
                            message: `操作成功`,
                            type: 'success'
                        })
                    } catch (e) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        async onEdit (val) {
            await this.getComplaintProcessOrderDetail({ id: val })
            this.recordData = { ...this.complaintProcessOrderDetail }
            this.recordData.id = val
            this.recordData.workOrderId = this.detailData.id
            this.recordData.operator = this.userInfo.employeeName
            this.addRecordDialogVisible = true
        },
        async onDelete (val) {
            this.$confirm('删除后将无法恢复，请确认继续删除。', '解决记录删除确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteComplaintProcessOrder({ id: val, operateUserName: this.userInfo.employeeName })
                this.createRecordCancel()
                this.cancelAddOrderClick()
                this.onQuery()
                this.$message.success('删除成功')
            })
        },
        createRecordCancel () {
            this.recordData = JSON.parse(JSON.stringify(_recordData))
            if (this.$refs['addRecordForm']) {
                this.$nextTick(() => {
                    this.$refs['addRecordForm'].clearValidate()
                })
            }
            this.addRecordDialogVisible = false
        },
        onAddProduct () {
            this.detailData.deviceInfoList.push({ categoryId: '', specificationId: '', deviceId: '' })
            this.categoryTypes.push([])
            this.$refs['addOrderForm'].clearValidate(['deviceInfoList'])
        },
        async selectChanged (index) {
            const categoryId = this.detailData.deviceInfoList[index].categoryId
            this.allCategorys.forEach(item => {
                if (item.id === categoryId) {
                    this.detailData.deviceInfoList[index].categoryName = item.name
                }
            })
            this.detailData.deviceInfoList[index].specificationId = ''
            this.detailData.deviceInfoList[index].deviceId = ''
            this.categoryTypes.splice(index, 1, [])
            await this.findCloudMerchantShopCategoryTypeList({ categoryId: categoryId })
            this.categoryTypes.splice(index, 1, this.cloudMerchantShopCategoryTypeList)
        },
        selectSpecificationIdChanged (index) {
            const specificationId = this.detailData.deviceInfoList[index].specificationId
            this.cloudMerchantShopCategoryTypeList.forEach(item => {
                if (item.type === specificationId) {
                    this.detailData.deviceInfoList[index].specificationName = item.name
                }
            })
            for (let i = 0; i < this.detailData.deviceInfoList.length; i++) {
                this.$refs['addOrderForm'].validateField('deviceInfoList.' + i + '.specificationId')
            }
        },
        onRemoveProduct (index) {
            this.detailData.deviceInfoList.splice(index, 1)
            this.categoryTypes.splice(index, 1)
            this.deviceIDonBlur(0)
        },
        handleUploadImageSuccess (response, file, fileList) {
            console.log(file)
            if (response.code === 200) {
                console.log(response.data.accessUrl)
                if (this.detailData.pictures === null) {
                    this.detailData.pictures = []
                }
                this.detailData.pictures.push(response.data.accessUrl)
            }
        },
        uploadImageExceptMessage (files, fileList) {
            this.$message({
                type: 'warning',
                message: '最多上传8张'
            })
        },
        beforeImageUpload (file) {
            const isJPG = file.type === 'image/jpg'
            const isJPEG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            const isMP4 = file.type === 'audio/mp4' || file.type === 'video/mp4'
            if (!(isJPG || isJPEG || isPNG || isMP4)) {
                this.$message({
                    type: 'error',
                    message: '文件格式不正确'
                })
            }
            return isJPG || isJPEG || isPNG || isMP4
        },
        handlePreview (file) {
            console.log(file)
            let url = ''
            if (file.response && file.response.data) {
                url = file.response.data.accessUrl
            } else {
                url = file.url
            }
            window.open(url)
        },
        handleImageRemove (file, fileList) {
            let url = ''
            if (file.response && file.response.data) {
                url = file.response.data.accessUrl
            } else {
                url = file.url
            }
            let index = this.detailData.pictures.indexOf(url)
            this.detailData.pictures.splice(index, 1)
        },
        async onDetail (val) {
            this.categoryTypes = []
            this.currentData = val
            await this.getComplaintOrderDetail({ id: val.id })
            this.detailData = this.complaintOrderDetail
            for (let i = 0; i < this.detailData.deviceInfoList.length; i++) {
                const device = this.detailData.deviceInfoList[i]
                await this.findCloudMerchantShopCategoryTypeList({ categoryId: device.categoryId })
                this.categoryTypes.push(this.cloudMerchantShopCategoryTypeList)
            }
            if (this.detailData.pictures) {
                this.imgs = this.detailData.pictures.map(item => {
                    const arr = item.split('/')
                    let name = ''
                    if (arr.length > 0) {
                        name = arr[arr.length - 1]
                    }
                    return {
                        uid: item,
                        name,
                        url: item
                    }
                })
            }
            this.addOrderDialogVisible = true
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        async deviceIDonBlur (index) {
            const iotId = this.detailData.deviceInfoList[index].deviceId
            if (index === 0 && iotId && iotId.length > 0) {
                const { data } = await getOutboundList({ iotId })
                const records = data.data.records
                if (records.length > 0) {
                    const info = records[0]
                    this.detailData.agencyMobile = info.dealerPhone
                    this.detailData.agencyName = info.dealer
                } else {
                    this.detailData.agencyMobile = ''
                    this.detailData.agencyName = ''
                }
            }
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        },
        onProvince (key) {
            this.detailData.provinceId = key
            this.provinceList.forEach(item => {
                if (item.provinceId === key) {
                    this.detailData.provinceName = item.name
                }
            })
            this.detailData.cityName = ''
            this.detailData.cityId = ''
            this.detailData.countryName = ''
            this.detailData.countryId = ''
        },
        onCity (key) {
            this.detailData.cityId = key
            this.getCity.forEach(item => {
                if (item.cityId === key) {
                    this.detailData.cityName = item.name
                }
            })
            this.detailData.countryName = ''
            this.detailData.countryId = ''
        },
        onArea (key) {
            this.detailData.countryId = key
            this.getCountry.forEach(item => {
                if (item.countryId === key) {
                    this.detailData.countryName = item.name
                }
            })
        },
        async onQuery () {
            await this.getComplaintOrderList(this.searchParams)
            this.tableData = this.complaintOrderList.records
            this.pagination = {
                pageNumber: this.complaintOrderList.current,
                pageSize: this.complaintOrderList.size,
                total: this.complaintOrderList.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.searchParams.pageNumber = 1
            this.onQuery()
        },
        createComplaintOrder () {
            this.detailData = JSON.parse(JSON.stringify(_dataForm))
            this.addOrderDialogVisible = true
        },
        cancelAddOrderClick () {
            this.imgs = []
            this.currentData = null
            if (this.$refs['addOrderForm']) {
                this.$nextTick(() => {
                    this.$refs['addOrderForm'].clearValidate()
                })
            }
            this.radio = '投诉信息'
            this.addOrderDialogVisible = false
        },
        submitAddOrderForm () {
            if (!this.showDetailForm) {
                this.cancelAddOrderClick()
                return
            }
            this.detailData.operator = this.userInfo.employeeName
            this.detailData.operatorPhone = this.userInfo.phoneNumber
            this.loading = true
            this.$refs['addOrderForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        if (this.detailData.id > 0) {
                            await editComplaintOrder(this.detailData)
                        } else {
                            this.detailData.id = undefined
                            await createComplaintOrder(this.detailData)
                        }
                        this.loading = false
                        this.cancelAddOrderClick()
                        this.onSearch()
                        this.$message({
                            message: `操作成功`,
                            type: 'success'
                        })
                    } catch (e) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        }
    },
    async mounted () {
        this.onSearch()
        this.getAreacode()
        await this.findCloudMerchantShopCategoryList()
        this.allCategorys = this.cloudMerchantShopCategoryList
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            complaintOrderList: 'complaintOrderList',
            complaintOrderDetail: 'complaintOrderDetail',
            complaintProcessOrderList: 'complaintProcessOrderList',
            complaintProcessOrderDetail: 'complaintProcessOrderDetail',
            cloudMerchantShopCategoryList: 'cloudOutboundCategoryList',
            cloudMerchantShopCategoryTypeList: 'cloudOutboundDeviceList' // 商品类型
        }),
        showDetailForm () {
            if (this.detailData.id > 0 && this.radio === '解决记录') {
                return false
            }
            return true
        },
        imageUploadAction () {
            return interfaceUrl + 'tms/files/upload'
        },
        imageUploadData () {
            return { updateUid: this.userInfo.employeeName }
        },
        orderStatus () {
            return status => {
                if (status === 0) {
                    return '待处理'
                } else if (status === 10) {
                    return '处理中'
                } else if (status === 20) {
                    return '已处理'
                }
                return ''
            }
        },
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId === this.detailData.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        getCountry () {
            const city = this.getCity.filter(item => item.cityId === this.detailData.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        },
        complatintPickerOptionsStart () {
            return {
                disabledDate: time => time.getTime() > new Date().getTime()
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding-top: 10px;
    max-height: 600px; // 最大高度
    overflow: auto;
}
.radio-container {
    padding: 10px;
    margin-left: 10px;
}
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        &:first-child {
            font-size: 16px;
        }
    }
}
</style>

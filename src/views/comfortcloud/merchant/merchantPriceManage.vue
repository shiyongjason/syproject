<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>价格管理</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">
                    <h-button type="primary" class="ml20" @click="addShop">新增商品</h-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantShopList" :pagination="cloudMerchantShopListPagination" :isAction="true" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="status" slot-scope="scope">
                    {{ shopStatus(scope.data.row.status) }}
                </template>
                <template slot="commissionRate" slot-scope="scope">
                    {{scope.data.row.commissionRate + '%'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onOpration(scope.data.row)">
                        {{btnStatus(scope.data.row.status)}}
                    </el-button>
                </template>
            </basicTable>
        </div>

        <el-dialog width="1200px" title="新增商品" :visible.sync="dialogShopEdit" :close-on-click-modal="false" :before-close="onCloseDialog">
            <div class="el-dialog-div">
                <el-form :model="form" :rules="rules" ref="form" label-width="140px">
                    <el-form-item label-width="0px">
                        <el-col :span="8">
                            <el-form-item label="归属品类：" prop="categoryId">
                                <el-select v-model="form.categoryId" @change="selectChanged">
                                    <el-option label="选择" value=""></el-option>
                                    <el-option :label="item.categoryName" :value="item.categoryId" v-for="item in cloudMerchantShopCategoryList" :key="item.categoryId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="商品型号：" prop="specificationId">
                                <el-select v-model="form.specificationId">
                                    <el-option label="选择" value=""></el-option>
                                    <el-option :label="item.specificationName" :value="item.specificationId" v-for="item in cloudMerchantShopCategoryTypeList" :key="item.specificationId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="商品名称：" prop="productName">
                                <el-input style="width: 200px" placeholder="请输入商品名称" v-model="form.productName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="商品列表图：" prop="productIcon" ref='productIcon'>
                        <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="productIconUrl" ref="uploadImg" @back-event="productIcon" :imgW="100" :imgH="100" />
                        <div class="upload-tips">
                            建议尺寸：172*172，图片大小1M以内，支持jpeg,png和jpg格式
                        </div>
                    </el-form-item>
                    <el-form-item label="商品主图：" prop="productImgs" ref="productImgs">
                        <el-row :span="8">
                            <el-upload list-type="picture-card" v-bind="uploadInfo" :file-list="imgs" :multiple='true' accept=".jpg,.jpeg,.png" :on-success="handleSuccess" :limit="5" :on-exceed="pictureMessage" :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <div class="upload-tips">
                                建议尺寸：375*375，图片大小1M以内，支持jpeg,png和jpg格式
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品视频：" prop="video">
                        <el-row>
                            <!--                            <el-upload-->
                            <!--                                list-type="picture-card"-->
                            <!--                                v-bind="videoUpload"-->
                            <!--                                :file-list="imgs.splice(1)"-->
                            <!--                                :multiple='true'-->
                            <!--                                accept=".mp4,.avi,.mov,.rmvb"-->
                            <!--                                :on-success="handleVideoSuccess"-->
                            <!--                                :limit="1"-->
                            <!--                                :on-exceed="pictureVideoMessage"-->
                            <!--                                :before-upload="beforeVideoUpload"-->
                            <!--                                :on-remove="handleVideoRemove">-->
                            <!--                                <i class="el-icon-plus"></i>-->
                            <!--                            </el-upload>-->
                            <SingleUpload sizeLimit='100M' :upload="videoUpload" :imageUrl="productVideoUrl" @back-event="videoUrl" :imgW="100" :imgH="100">
                            </SingleUpload>
                            <h-button v-if="form.video" type="primary" @click="palyVideo">视频预览</h-button>
                            <div class="upload-tips">
                                建议尺寸：支持 MP4格式, 大小不超过20MB
                                主图视频尺寸1:1，视频长度建议不超过60秒
                            </div>
                        </el-row>

                    </el-form-item>
                    <el-form-item label="商品详情：" prop="productDetailImg" ref="productDetailImg">
                        <SingleUpload sizeLimit='2M' :upload="uploadInfo" :imageUrl="productDetailImgUrl" ref="uploadImg" @back-event="productDetailImg" :imgW="100" :imgH="100" />
                        <div class="upload-tips">
                            建议尺寸：宽度不低于750px，图片大小2M以内，支持jpeg,png和jpg格式
                        </div>
                    </el-form-item>
                    <h3>价格设置：</h3>
                    <el-form-item label-width="0px">
                        <el-col :span="6">
                            <el-form-item label="零售价：" prop="retailPrice">
                                <el-input v-model="form.retailPrice" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input>
                                元
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="成本价：" prop="retailPrice">
                                <el-input v-model="form.costPrice" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input>
                                元
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-col :span="6">
                            <el-form-item label="销售价：" prop="priceList[0].price">
                                <el-input v-model="form.priceList[0].price" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input>
                                元
                            </el-form-item>
                        </el-col>

                        <el-col :span="9">
                            <el-form-item label="商品ID：" prop="priceList[0].wxProductId">
                                <el-input v-model.number="form.priceList[0].wxProductId" style="width: 230px" placeholder="输入和微信小店一致的商品ID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="商品链接：" prop="priceList[0].wxProductUrl">
                                <el-input v-model="form.priceList[0].wxProductUrl" style="width: 230px" placeholder="输入和微信小店一致的商品链接"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-form-item>
                    <el-form-item label-width="0px">

                        <el-col :span="6">
                            <el-form-item label="二级经销商价格：" prop="priceList[2].price">
                                <el-input v-model="form.priceList[2].price" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input>
                                元
                            </el-form-item>
                        </el-col>

                        <el-col :span="9">
                            <el-form-item label="商品ID：" prop="priceList[2].wxProductId">
                                <el-input v-model.number="form.priceList[2].wxProductId" style="width: 230px" placeholder="输入和微信小店一致的商品ID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="商品链接：" prop="priceList[2].wxProductUrl">
                                <el-input v-model="form.priceList[2].wxProductUrl" style="width: 230px" placeholder="输入和微信小店一致的商品链接"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-col :span="6">
                            <el-form-item label="一级经销商价格：" prop="priceList[1].price">
                                <el-input v-model="form.priceList[1].price" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input>
                                元
                            </el-form-item>
                        </el-col>

                        <el-col :span="9">
                            <el-form-item label="商品ID：" prop="priceList[1].wxProductId">
                                <el-input v-model.number="form.priceList[1].wxProductId" style="width: 230px" placeholder="输入和微信小店一致的商品ID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="商品链接：" prop="priceList[1].wxProductUrl">
                                <el-input v-model="form.priceList[1].wxProductUrl" style="width: 230px" placeholder="输入和微信小店一致的商品链接"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="佣金设置：" prop="commissionRate">
                        <el-input v-model="form.commissionRate" maxlength="10" style="width: 100px" placeholder="填写佣金比例">
                            10
                        </el-input>
                        %
                    </el-form-item>
                    <el-form-item label="推广话术：" prop="promotedTagline">
                        <el-input v-model="form.promotedTagline" maxlength="100" :rows="2" type="textarea" placeholder="输入推荐话术，将展示在推广商品列表中，不超过100字符" />
                    </el-form-item>
                    <el-form-item label="分享话术：" prop="shareTagline">
                        <el-input v-model="form.shareTagline" maxlength="100" :rows="2" type="textarea" placeholder="输入分享话术，不超过100字符" />
                    </el-form-item>

                    <el-form-item label="虚拟体验链接：" prop="virtualExperienceUrl">
                        <el-input v-model="form.virtualExperienceUrl" maxlength="300" :rows="2" type="textarea" placeholder="输入完整的虚拟体验H5链接地址" />
                    </el-form-item>
                    <div style="height : 20px"></div>
                </el-form>

            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="cancelClick">取 消</h-button>
                <h-button type="primary" @click="submitForm('form')" :loading="isSaving">保 存</h-button>
            </div>
            <el-dialog width="600px" title="视频播放" @close="closePlayDialog" :visible.sync="innerVisible" append-to-body>
                <Video ref="videoPlay" :src="this.form.video" class="avatarVideo" controls="controls">您的浏览器不支持视频播放
                </Video>
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script>

import { interfaceUrl } from '@/api/config'
import { mapGetters, mapActions, mapState } from 'vuex'
import { createShop, updateShop, getCloudMerchantShopDetail, updateStatusShop } from '../api/index'

export default {
    name: 'merchantPriceManage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            innerVisible: false,
            imgs: [],
            videos: [],
            form: {
                categoryId: '',
                categoryName: '',
                id: '',
                specificationId: '',
                specificationName: '',
                productName: '',
                productIcon: '',
                productImg: '',
                productImgs: [],
                productDetailImg: '',
                retailPrice: '',
                shareTagline: '',
                virtualExperienceUrl: '',
                costPrice: '',
                video: '',
                commissionRate: '',
                priceList: [{
                    id: '',
                    userType: 1,
                    wxProductId: '',
                    wxProductUrl: '',
                    price: ''
                }, {
                    id: '',
                    userType: 10,
                    wxProductId: '',
                    wxProductUrl: '',
                    price: ''
                }, {
                    id: '',
                    userType: 20,
                    wxProductId: '',
                    wxProductUrl: '',
                    price: ''
                }],
                promotedTagline: '',
                operator: ''
            },
            tableLabel: [
                { label: '品类', prop: 'categoryName' },
                { label: '商品型号', prop: 'specificationName' },
                { label: '商品名称', prop: 'productName' },
                { label: '会员销售价', prop: 'memberSalePrice' },
                { label: '一级代理商价格', prop: 'oneLevelAgentPrice' },
                { label: '二级代理商价格', prop: 'twoLevelAgentPrice' },
                { label: '佣金比例', prop: 'commissionRate' },
                { label: '建议零售价', prop: 'retailPrice' },
                { label: '状态', prop: 'status' }],
            dialogShopEdit: false,
            isSaving: false,
            status: 'add', // add 新增 modify 更新
            rules: {
                productName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                categoryId: [
                    { required: true, message: '请选择归属品类', trigger: 'change' }
                ],
                specificationId: [
                    { required: true, message: '请选择商品型号', trigger: 'change' }
                ],
                retailPrice: [
                    { required: true, message: '请设置零售价', trigger: 'blur' },
                    { message: '请设置正确的价格', trigger: 'change', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ],
                'priceList[1].wxProductId': [
                    { required: true, message: '请设置商品ID', trigger: 'blur' },
                    { type: 'number', message: '商品ID必须为数字值' }
                ],
                'priceList[1].price': [
                    { required: true, message: '请设置价格', trigger: 'blur' },
                    { message: '请设置正确的价格', trigger: 'change', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ],
                'priceList[1].wxProductUrl': [
                    { required: true, message: '请设置商品链接', trigger: 'blur' }
                ],
                'priceList[2].wxProductId': [
                    { required: true, message: '请设置商品ID', trigger: 'blur' },
                    { type: 'number', message: '商品ID必须为数字值' }
                ],
                'priceList[2].price': [
                    { required: true, message: '请设置价格', trigger: 'blur' },
                    { message: '请设置正确的价格', trigger: 'change', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ],
                'priceList[2].wxProductUrl': [
                    { required: true, message: '请设置商品链接', trigger: 'blur' }
                ],
                'priceList[0].wxProductId': [
                    { required: true, message: '请设置商品ID', trigger: 'blur' },
                    { type: 'number', message: '商品ID必须为数字值' }
                ],
                'priceList[0].price': [
                    { required: true, message: '请设置价格', trigger: 'blur' },
                    { message: '请设置正确的价格', trigger: 'change', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ],
                'priceList[0].wxProductUrl': [
                    { required: true, message: '请设置商品链接', trigger: 'blur' }
                ],
                commissionRate: [
                    { required: true, message: '请设置佣金', trigger: 'blur' },
                    { message: '请设置正确的佣金', trigger: 'change', pattern: /^(([1-9]\d{0,1})|0)(\.\d{0,2})?$/ }
                ],
                productIcon: [
                    { required: true, message: '请设置商品列表图' }
                ],
                productImg: [
                    { required: false, message: '请设置商品主图' }
                ],
                productImgs: [
                    {
                        required: true,
                        message: '请设置商品主图',
                        trigger: 'blur'
                    }
                ],
                productDetailImg: [
                    { required: true, message: '请设置商品详情图片' }
                ],
                promotedTagline: [
                    { required: false, message: '请输入推广话术' }
                ],
                shareTagline: [
                    { required: false, message: '请输入分享话术' }
                ],
                virtualExperienceUrl: [
                    {
                        required: false,
                        type: 'url',
                        message: '请输入正确的链接',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    mounted () {
        this.queryList(this.queryParams)
        this.queryCetagory()
    },
    watch: {
        'form.productIcon' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['productIcon'].clearValidate()
            })
        },
        'form.productImgs' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['productImgs'].clearValidate()
            })
        },
        'form.productDetailImg' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['productDetailImg'].clearValidate()
            })
        }
    },
    computed: {
        ...mapGetters({
            cloudMerchantShopList: 'cloudMerchantShopList',
            cloudMerchantShopListPagination: 'cloudMerchantShopListPagination',
            cloudMerchantShopCategoryList: 'cloudMerchantShopCategoryList',
            cloudMerchantShopCategoryTypeList: 'cloudMerchantShopCategoryTypeList' // 商品类型
        }),
        ...mapState({
            userInfo: state => state.userInfo
        }),
        action () {
            return interfaceUrl + 'tms/files/upload'
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
        videoUpload () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'audio/mp4, video/mp4',
                name: 'multiFile'
            }
        },
        productIconUrl () {
            return this.form.productIcon
        },
        productVideoUrl () {
            if (this.form.video) {
                return this.form.productImgs[0] ? this.form.productImgs[0] : this.form.productImg
            } else {
                return ''
            }
        },
        productDetailImgUrl () {
            return this.form.productDetailImg
        }
    },
    methods: {
        ...mapActions({
            findCloudMerchantShopList: 'findCloudMerchantShopList', // 商品列表
            findCloudMerchantShopCategoryList: 'findCloudMerchantShopCategoryList',
            findCloudMerchantShopCategoryTypeList: 'findCloudMerchantShopCategoryTypeList'
        }),
        clearData () {
            this.imgs = []
            this.videos = []
            if (this.$refs.form) {
                this.$refs['form'].clearValidate()
                this.form = {
                    categoryId: '',
                    categoryName: '',
                    id: '',
                    specificationId: '',
                    specificationName: '',
                    productName: '',
                    productIcon: '',
                    productImg: '',
                    video: '',
                    productImgs: [],
                    productDetailImg: '',
                    retailPrice: '',
                    costPrice: '',
                    commissionRate: '',
                    priceList: [{
                        id: '',
                        userType: 1,
                        wxProductId: '',
                        wxProductUrl: '',
                        price: ''
                    }, {
                        id: '',
                        userType: 10,
                        wxProductId: '',
                        wxProductUrl: '',
                        price: ''
                    }, {
                        id: '',
                        userType: 20,
                        wxProductId: '',
                        wxProductUrl: '',
                        price: ''
                    }],
                    promotedTagline: '',
                    operator: ''
                }
            }
        },
        onCloseDialog () {
            this.clearData()
            this.dialogShopEdit = false
        },
        addShop: function () {
            // 新增商品
            this.clearData()
            this.status = 'add'
            this.dialogShopEdit = true
        },
        onEdit (shop) {
            this.findShopDetailAsync(shop.id)
        },
        onOpration (shop) {
            const isDown = shop.status === 20
            const descStr = isDown ? '下架后小程序端将无法查看到商品，请确认是否继续下架？' : '提交后信息将同步到小程序端，请确保商品信息维护准确后，是否确认上架？'
            const pamras = { id: shop.id, status: isDown ? 30 : 20, operator: this.userInfo.employeeName }
            this.$confirm(descStr, isDown ? '操作下架' : '提交上架', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await updateStatusShop(pamras)
                this.queryList(this.queryParams)
            })
        },
        selectChanged (value) {
            console.log(value)
            this.form.specificationId = ''
            this.findCloudMerchantShopCategoryTypeList({ categoryId: value })
        },
        cancelClick () {
            this.imgs = []
            this.videos = []
            this.clearData()
            this.dialogShopEdit = false
        },
        submitForm (formName) {
            if (this.isSaving) {
                return
            }
            this.isSaving = true
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.saveShop()
                        this.isSaving = false
                    } catch (e) {
                        this.isSaving = false
                    }
                } else {
                    this.isSaving = false
                }
            })
        },
        async saveShop () {
            for (let index = 0; index < this.cloudMerchantShopCategoryList.length; index++) {
                const element = this.cloudMerchantShopCategoryList[index]
                if (element.categoryId === this.form.categoryId) {
                    this.form.categoryName = element.categoryName
                }
            }
            for (let index = 0; index < this.cloudMerchantShopCategoryTypeList.length; index++) {
                const element = this.cloudMerchantShopCategoryTypeList[index]
                if (element.specificationId === this.form.specificationId) {
                    this.form.specificationName = element.specificationName
                }
            }
            let { ...params } = this.form
            params.operator = this.userInfo.employeeName
            console.log(params)
            if (this.status === 'add') {
                await createShop(params)
            } else if (this.status === 'modify') {
                await updateShop(params)
            }
            this.$message({
                message: this.status === 'add' ? '商品添加成功！' : '商品修改成功！',
                type: 'success'
            })
            this.queryList(this.queryParams)
            this.clearData()
            this.dialogShopEdit = false
        },
        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList(this.queryParams)
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList(this.queryParams)
        },
        queryList: function (params) {
            this.findCloudMerchantShopList(params)
        },
        queryCetagory: function (params) {
            this.findCloudMerchantShopCategoryList(params)
        },
        shopStatus: function (status) {
            if (status === 10) {
                return '待上架'
            } else if (status === 20) {
                return '销售中'
            } else if (status === 30) {
                return '已下架'
            }
        },
        btnStatus: function (status) {
            if (status === 20) {
                return '下架'
            } else {
                return '上架'
            }
        },
        // 图片上传成功回调
        productIcon (val) {
            this.form.productIcon = val.imageUrl
        },
        productImg (val) {
            this.form.productImg = val.imageUrl
        },
        videoUrl (val) {
            console.log(val)
            this.$message.success(val.imageUrl ? '视频上传成功' : '视频删除成功')
            this.form.video = val.imageUrl

            this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'
        },

        pictureMessage (files, fileList) {
            this.$message({
                type: 'warning',
                message: '最多上传5张'
            })
        },
        pictureVideoMessage (files, fileList) {
            this.$message({
                type: 'warning',
                message: '最多上传一个视频'
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
        beforeVideoUpload (file) {
            const mp4 = file.name.endsWith('.mp4')
            const avi = file.name.endsWith('.avi')
            const mov = file.name.endsWith('.mov')
            const rmvb = file.name.endsWith('.rmvb')
            if (!(mp4 || avi || mov || rmvb)) {
                this.$message({
                    type: 'error',
                    message: '文件格式不正确'
                })
            }
            return mp4 || avi || mov || rmvb
        },
        productDetailImg (val) {
            this.form.productDetailImg = val.imageUrl
        },
        async findShopDetailAsync (modifyId) {
            const { data } = await getCloudMerchantShopDetail({ productId: modifyId })

            console.log(data)
            this.imgs = []
            this.videos = []
            data.productImgs.map((item) => {
                this.imgs.push({ url: item })
            })
            this.videos.push(data.productImgs[0])
            this.form = {
                categoryId: data.categoryId,
                categoryName: data.categoryName,
                id: data.id,
                specificationId: data.specificationId,
                specificationName: data.specificationName,
                productName: data.productName,
                productIcon: data.productIcon,
                productImg: data.productImg,
                video: data.video,
                productImgs: data.productImgs,
                productDetailImg: data.productDetailImg,
                retailPrice: data.retailPrice,
                costPrice: data.costPrice,
                commissionRate: data.commissionRate,
                priceList: data.priceList,
                shareTagline: data.shareTagline,
                virtualExperienceUrl: data.virtualExperienceUrl,
                promotedTagline: data.promotedTagline,
                operator: data.operator
            }

            this.status = 'modify'
            this.dialogShopEdit = true
            this.findCloudMerchantShopCategoryTypeList({ categoryId: data.categoryId })
        },
        handleRemove (file, fileList) {
            console.log(file)
            let index = this.form.productImgs.indexOf(file.url)
            this.form.productImgs.splice(index, 1)
        },
        handleSuccess (response, file, fileList) {
            if (response.code === 200) {
                console.log(response.data.accessUrl)
                this.form.productImgs.push(response.data.accessUrl)
            }

            this.form.productImg = this.form.productImgs[0]
        },
        handleVideoSuccess (response, file, fileList) {
            if (response.code === 200) {
                console.log(response.data.accessUrl)
                this.form.video = response.data.accessUrl
            }
        },
        handleVideoRemove (file, fileList) {
            this.form.video = ''
        },
        palyVideo () {
            this.innerVisible = true
        },
        closePlayDialog () {
            console.log('closePlayDialog')
            this.$refs['videoPlay'].pause()
        }
    }
}
</script>

<style scoped>
.upload-tips {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    height: 100px;
    padding-left: 10px;
}

.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.avatarVideo {
    width: 500px;
    display: block;
}
.address {
    overflow: hidden;
    text-overflow: ellipsis;
}
.el-dialog-div {
    height: 80vh;
    overflow: auto;
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
/deep/ .avatar {
    width: 100px;
    height: 100px;
}
</style>

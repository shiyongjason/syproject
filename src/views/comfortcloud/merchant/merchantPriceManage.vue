<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>价格管理</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">
                    <h-button type="create" class="ml20" @click="addShop">新增商品</h-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantShopList" :pagination="cloudMerchantShopListPagination" :isAction="true" @onCurrentChange='onCurrentChange' isShowIndex @onSizeChange='onSizeChange'>
                <template slot="status" slot-scope="scope">
                    {{ shopStatus(scope.data.row.status) }}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">{{btnStatus(scope.data.row.status)}}</el-button>
                </template>
            </basicTable>
        </div>

        <el-dialog width="1200px" title="新增商品" :visible.sync="dialogShopEdit" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" label-width="130px">
                <el-form-item label="归属品类：">
                    <el-col :span="6">
                        <el-form-item prop="categoryId">
                            <el-select v-model="form.categoryId" @change="selectChanged">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.categoryName" :value="item.categoryId" v-for="item in cloudMerchantShopCategoryList" :key="item.categoryId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="商品型号：" prop="specificationId">
                            <el-select v-model="form.specificationId">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.specificationName" :value="item.specificationId" v-for="item in cloudMerchantShopCategoryTypeList" :key="item.specificationId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="商品名称：" prop="productName">
                            <el-input style="width: 200px" placeholder="请输入商品名称" v-model="form.productName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品列表图：">
                    <SingleUpload :upload="uploadInfo" :imageUrl="productIconUrl" ref="uploadImg" @back-event="productIcon" :imgW="80" :imgH="80" />
                    <div class="upload-tips">
                        建议尺寸：172*1728图片，1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item label="商品主图：">
                    <SingleUpload :upload="uploadInfo" :imageUrl="productImgUrl" ref="uploadImg" @back-event="productImg" :imgW="80" :imgH="80" />
                    <div class="upload-tips">
                        建议尺寸：375*375，图片大小1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item label="商品详情：">
                    <SingleUpload :upload="uploadInfo" :imageUrl="productDetailImgUrl" ref="uploadImg" @back-event="productDetailImg" :imgW="80" :imgH="80" />
                    <div class="upload-tips">
                        建议尺寸：宽度不低于750px，图片大小2M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <h3>价格设置：</h3>
                <el-form-item label="零售价：">
                    <el-col>
                        <el-form-item prop="retailPrice">
                            <el-input v-model="form.retailPrice" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input> 元
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="销售价：">
                    <el-col :span="4">
                        <el-form-item>
                            <el-input v-model="priceParam.price" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input> 元
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="商品ID：">
                            <el-input v-model="priceParam.wxProductId" style="width: 230px" placeholder="输入和微信小店一致的商品ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品链接：">
                            <el-input v-model="priceParam.wxProductUrl" style="width: 230px" placeholder="输入和微信小店一致的商品链接"></el-input>
                        </el-form-item>
                    </el-col>

                </el-form-item>
                <el-form-item label="二级经销商价格：">

                    <el-col :span="4">
                        <el-form-item>
                            <el-input v-model="priceParamOne.price" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input> 元
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="商品ID：">
                            <el-input v-model="priceParamOne.wxProductId" style="width: 230px" placeholder="输入和微信小店一致的商品ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品链接：">
                            <el-input v-model="priceParamOne.wxProductUrl" style="width: 230px" placeholder="输入和微信小店一致的商品链接"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="一级经销商价格：">
                    <el-col :span="4">
                        <el-form-item>
                            <el-input v-model="priceParamTwo.price" style="width: 100px" maxlength="10" placeholder="填写价格"></el-input> 元
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="商品ID：">
                            <el-input v-model="priceParamTwo.wxProductId" style="width: 230px" placeholder="输入和微信小店一致的商品ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品链接：">
                            <el-input v-model="priceParamTwo.wxProductUrl" style="width: 230px" placeholder="输入和微信小店一致的商品链接"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="佣金设置：" prop="commissionRate">
                    <el-input v-model="form.commissionRate" maxlength="10" style="width: 100px" placeholder="填写佣金比例">10</el-input> %
                </el-form-item>
                <!-- <el-form-item label="零售价">

                </el-form-item>
                <el-form-item label="销售价">
                </el-form-item> -->
                <!-- <el-form-item label="品牌编号" v-if="this.status === 'modify'">
                    {{form.code}}
                </el-form-item>
                <el-form-item prop="name" label="品牌名称">
                    <el-input v-model="form.name" maxlength="10" style="width: 300px" placeholder="请输入品牌中文名称"></el-input>
                </el-form-item>
                <el-form-item prop="englishName" label="英文名称">
                    <el-input v-model="form.englishName" placeholder="请输入英文名称" maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="logoUrl" label="品牌logo">
                    <SingleUpload :upload="uploadInfo" :imageUrl="imageUrl" ref="uploadImg" @back-event="readUrl" />
                    <div class="upload-tips">
                        尺寸300x300,2m以内，支持jpg、jpeg、png
                    </div>
                </el-form-item>
                <el-form-item prop="description" label="品牌描述">
                    <el-input type="textarea" maxlength="100" placeholder="100字以内" v-model="form.description" style="width: 300px;" :rows="5"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <h-button @click="dialogShopEdit = false">取 消</h-button>
                <h-button type="primary" @click="submitForm('form')" :loading="isSaving">保 存</h-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { interfaceUrl } from '@/api/config'
import { mapGetters, mapActions, mapState } from 'vuex'
import { createShop, updateShop, getCloudMerchantShopDetail } from '../api/index'

export default {
    name: 'merchantPriceManage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            priceParam: {
                id: '',
                userType: 1,
                wxProductId: '',
                wxProductUrl: '',
                price: ''
            },
            priceParamOne: {
                id: '',
                userType: 10,
                wxProductId: '',
                wxProductUrl: '',
                price: ''
            },
            priceParamTwo: {
                id: '',
                userType: 20,
                wxProductId: '',
                wxProductUrl: '',
                price: ''
            },
            form: {
                categoryId: '',
                categoryName: '',
                id: '',
                specificationId: '',
                specificationName: '',
                productName: '',
                productIcon: '',
                productImg: '',
                productDetailImg: '',
                retailPrice: '',
                commissionRate: '',
                priceList: [],
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
                    { required: true, whitespace: true, message: '请输入品牌中文名称', trigger: 'blur' }
                ],
                agentUrl: [
                    { required: true, message: '请上传品牌logo' }
                ]
            }
        }
    },
    mounted () {
        this.queryList(this.queryParams)
        this.queryCetagory()
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
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
        productIconUrl () {
            return this.form.productIcon
        },
        productImgUrl () {
            return this.form.productImg
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
        addShop: function () {
            // 新增商品
            this.status = 'add'
            this.dialogShopEdit = true
            this.$refs.form.clearValidate()
        },
        onEdit (shop) {
            this.findShopDetailAsync(shop.id)
        },
        selectChanged (value) {
            console.log(value)
            this.findCloudMerchantShopCategoryTypeList(value)
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
            this.form.priceList = [this.priceParam, this.priceParamOne, this.priceParamTwo]
            let { ...params } = this.form
            params.operator = this.userInfo.employeeName
            console.log(params)
            if (this.status === 'add') {
                await createShop(params)
            } else if (this.status === 'modify') {
                params.id = this.modifyId
                await updateShop(params)
            }
            this.dialogShopEdit = false
            this.$message({
                message: this.status === 'add' ? '品牌添加成功！' : '品牌修改成功！',
                type: 'success'
            })
            this.onQuery()
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
        productDetailImg (val) {
            this.form.productDetailImg = val.imageUrl
        },
        async findShopDetailAsync (modifyId) {
            const { data } = await getCloudMerchantShopDetail({ productId: modifyId })
            this.form = {
                categoryId: data.categoryId,
                categoryName: data.categoryName,
                id: data.id,
                specificationId: data.specificationId,
                specificationName: data.specificationName,
                productName: data.productName,
                productIcon: data.productIcon,
                productImg: data.productImg,
                productDetailImg: data.productDetailImg,
                retailPrice: data.retailPrice,
                commissionRate: data.commissionRate,
                priceList: data.priceList,
                operator: data.operator
            }
            this.status = 'modify'
            this.dialogShopEdit = true
            // this.$nextTick(() => {
            //     this.$refs.form.clearValidate()
            // })
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
    height: 80px;
    padding-left: 10px;
}
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}

.address {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

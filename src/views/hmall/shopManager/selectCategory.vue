<template>
    <div>
        <div class="select-category page-body" v-if="!isNext">
            <div class="page-body-cont">
                <div class="table-cont-title clearfix">
                    <span class="table-title-name fll">选择商品类目</span>
                    <span class="current-select">
                        当前的选择是：
                        {{categorySelect.join(' > ')}}
                    </span>
                </div>
                <div class="category">
                    <div class="column">
                        <div class="item">
                            <ul>
                                <li v-for="item in categoryFirst"
                                    :key="item.id"
                                    :class="item.isOn ? 'on' : ''"
                                    @click="onShowNext(item.id, 'categorySecond', item)">
                                    {{ item.categoryName }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="column">
                        <div class="item">
                            <ul>
                                <li v-for="item in categorySecond"
                                    :key="item.id"
                                    :class="item.isOn ? 'on' : ''"
                                    @click="onShowNext(item.id, 'categoryThird', item)">
                                    {{ item.categoryName }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="column">
                        <div class="item">
                            <ul>
                                <li v-for="item in categoryThird" :key="item.id"
                                    :class="item.isOn ? 'on' : ''"
                                    @click="onShowNext(null, null, item)">
                                    {{ item.categoryName }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="next">
                    <el-button type="primary" class="next-btn" @click="next()">下一步</el-button>
                </div>
            </div>
        </div>
        <div class="modify-add" v-if="isNext">
            <div class="page-body">
                <div class="page-body-cont">
                    <el-form ref="form" :model="form" :rules="rules" :disabled="isDisabled" label-width="100px">
                        <el-form-item label="类目">
                            {{categorySelect.join(' > ')}}
                            <el-button type="primary" style="margin-left: 12px" @click="toggle()">切换目录</el-button>
                        </el-form-item>
                        <el-form-item label="商品编码" v-if="!isAdd">
                            {{form.productCode}}
                        </el-form-item>
                        <div class="table-cont-title clearfix">
                            <span class="table-title-name fll">商品信息（spu）</span>
                        </div>
                        <div class="form-cont-row">
                            <div class="form-cont-col">
                                <el-form-item label="商品品牌" prop="brandId" ref="brandId">
                                    <el-select v-model="form.brandId" clearable placeholder="请选择" style="width: 100%" @change="brandNameChange()">
                                        <el-option
                                            :label="item.brandName+item.brandNameEn"
                                            :value="item.brandId" :key="item.id" v-for="item in relationBrand">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="form-cont-col">
                                <el-form-item label="规格/型号" prop="specification">
                                    <el-input type="text" style="width: 100%" placeholder="请输入规格／型号"
                                              maxlength="30" v-model="form.specification"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <el-form-item label="商品名称"  prop="productName">
                            <el-input placeholder="" :maxlength="50 - length" style="width: 500px"
                                      v-model="form.productShortName">
                                <template slot="prepend">{{(brandName ? brandName : '') + categorySelect[2]+ (form.specification ? form.specification : '')}}</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="商品主图" prop="reqPictures" ref="reqPictures">
                            <ul class="picture-container">
                                <template v-if="pictureContainer.length>0">
                                    <li v-for="(item,index) in pictureContainer" :key="item.url">
                                        <span class="picture-delete" @click="pictureDelete(index)"><i class="el-icon-delete"></i></span>

                                        <img :src="item.url" :alt="item.url">
                                        <span class="picture-setting" @click="pictureSetting(index)">
                                                    设为主图
                                                </span>
                                    </li>
                                </template>
                                <el-upload
                                    v-bind="uploadInfo"
                                    v-if="pictureContainer.length<5"
                                    :on-exceed="pictureMessage"
                                    :on-error="pictureError"
                                    :on-success="pictureSuccess"
                                    :show-file-list="false"
                                    :before-upload="beforeAvatarUpload"
                                    style="float: left"
                                    list-type="picture-card">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </ul>
                        </el-form-item>
                        <el-form-item>
                            <div class="upload-tips">
                                最多上传5张，500x500，不超过2m，仅支持jpg、jpeg、png
                            </div>
                        </el-form-item>
                        <!-- v-if="$route.query.sourceType === 0" -->
                        <el-form-item label="销售价：" prop="sellingPrice" v-if="isShowSellingPrice">
                            <el-input placeholder="请输入销售价" v-model="form.sellingPrice" maxlength="16" :disabled="$route.query.checkStatus == 2 || $route.query.type == 'see'"></el-input>
                        </el-form-item>
                        <div v-if="form.attributeList.length>0" style="position: relative;z-index: 2">
                            <div class="table-cont-title clearfix">
                                <span class="table-title-name fll">属性信息</span>
                            </div>
                            <div class="form-cont-row">
                                <div :key="item.parameterCode" v-for="(item,index) in form.attributeList" class="form-cont-col">
                                    <el-form-item :label="item.parameterName" :prop="'attributeList.'+ index + '.model'"
                                                  :class="item.type === 1? 'isW100' : ''"
                                                  :rules="{
                                                 required: item.isRequired === 1 ? true : false ,
                                                 whitespace: true,
                                                 message: '请输入'+ item.parameterName,
                                                 trigger: item.type === 2 ? 'blur' : ''
                                             }"
                                    >
                                        <el-select style="width: 100%;"
                                                   v-model="item.model"
                                                   v-if="item.type === 2">
                                            <template v-if="item.parameterValueList">
                                                <el-option
                                                    :label="subItem"
                                                    :value="subItem" :key="subItem"
                                                    v-for="subItem in item.parameterValueList">
                                                </el-option>
                                            </template>
                                        </el-select>
                                        <template v-else-if="item.type === 1">
                                            <el-input placeholder="" maxlength="25"
                                                      style="width: 50%;margin-right: 12px"
                                                      v-model="item.model">
                                            </el-input>{{item.unit}}
                                        </template>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                        <el-row style="position: relative;z-index: 1">
                            <el-form-item>
                                <RichEditor v-model="form.details" :menus="menus" :uploadImgServer="uploadImgServer" :uploadFileName="uploadImgName"
                                            :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;"></RichEditor>
                            </el-form-item>
                            <el-form-item v-if="isStatus === 'details' && causeFailure" label="驳回原因">
                                {{causeFailure}}
                            </el-form-item>
                            <div :span="13" v-if="isStatus === 'add' || isStatus === 'back'|| isReview === 'yes'">
                                <el-form-item style="text-align: center">
                                    <el-button @click="cancel">取消</el-button>
                                    <el-button type="primary" @click="save('form')" :disabled="saveDisabled">保存</el-button>
                                </el-form-item>
                            </div>
                        </el-row>
                    </el-form>
                </div>
                <div class="page-body-cont btn-cont">
                    <el-form>
                        <el-row v-if="isStatus === 'checked'">
                            <el-form-item style="text-align: center">
                                <el-button  name="white-color"  @click="dialogRejectEdit = true">驳回商品</el-button>
                                <el-button name="hosjoy-color" type="primary" @click="pass('form')">审核通过</el-button>
                            </el-form-item>
                        </el-row>
                        <el-row v-if="isStatus === 'details'">
                            <el-form-item style="text-align: center">
                                <el-button name="white-color" @click="close">关闭</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </div>
        <el-dialog
            title="驳回商品"
            width="500px"
            :visible.sync="dialogRejectEdit"
            :close-on-click-modal="false" >
            <el-input
                type="textarea"
                maxlength="100"
                placeholder="请输入驳回原因（100字以内）"
                v-model="rejectContainer"
                style="width: 90%;outline: none;margin: auto;display: block"
                :rows="5"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRejectEdit = false">取 消</el-button>
                <el-button type="primary" @click="reject">确认驳回</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { IsChinese } from '@/rules'
import { findCategoryByParent } from '@/views/hmall/category/api/index'
import { findCategoryAttribute, findRelationBrand, createProduct, findProductDetails, updateProduct, reviewPass, reviewReject } from './api/index'
import { fileUploadUrl } from '@/api/config'
import { mapState, mapActions, mapMutations } from 'vuex'
import { Money } from '@/utils/rules.js'
export default {
    name: 'selectCategory',
    data () {
        return {
            categoryFirst: [],
            categorySecond: [],
            categoryThird: [],
            categoryArr: [],
            isNext: false,
            isAdd: false,
            isSetup: false,
            queryParams: {},
            relationBrand: [], // 关联品牌列表
            form: {
                isHeadquarters: true, // boss端必填（true）默认false
                attributeList: [],
                reqPictures: []
            },
            menus: [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'undo', // 撤销
                'redo' // 重复
            ],
            rules: {
                brandId: [
                    { required: true, whitespace: true, message: '请选择商品品牌' }
                ],
                specification: [
                    { required: true, whitespace: true, message: '请填写规格/型号' },
                    { validator: IsChinese, trigger: 'blur' }
                ],
                reqPictures: [
                    { required: true, message: '请选择商品主图' }
                ],
                sellingPrice: [
                    { required: true, message: '请输入销售价', trigger: 'blur' },
                    { validator: Money, trigger: 'blur' }
                ]
            },
            pictureContainer: [],
            modify: false,
            categorySelect: [],
            brandName: '',
            isStatus: '',
            dialogRejectEdit: false,
            rejectContainer: '',
            causeFailure: '',
            isReview: false,
            saveDisabled: false,
            isShowSellingPrice: true
        }
    },
    computed: {
        categorySelectId () {
            return this.categoryArr.map((value) => {
                return value.id
            })
        },
        uploadInfo () {
            return {
                action: fileUploadUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                name: 'multiFile'
            }
        },
        uploadImgServer () {
            return fileUploadUrl + 'tms/files/upload'
        },
        uploadImgParams () {
            return {
                updateUid: this.userInfo.employeeName
            }
        },
        uploadImgName () {
            return 'multiFile'
        },
        imageUrl () {
            return this.form.logoUrl
        },
        ...mapState({
            userInfo: state => state.userInfo,
            userInfoMore: state => state.hmall.userInfo,
            tagsList: state => state.layout.tagsList
        }),
        length () {
            return ((this.brandName ? this.brandName : '') + this.categorySelect[2] + (this.form.specification ? this.form.specification : '')).length
        },
        isDisabled () {
            return this.isStatus === 'details'
        }
    },
    watch: {
        categoryArr () {
            this.categorySelect = []
            this.categoryArr.forEach((value, index) => {
                this.categorySelect.push(value.categoryName)
                // this.$set(this.categorySelect, index, value.categoryName)
            })
        },
        isNext (val) {
            if (val) {
                if (this.isAdd) {
                    this.findAttributeDetails()
                } else {
                    this.findProductDetails(this.modify)
                }
            }
        },
        pictureContainer (val) {
            this.$nextTick(() => {
                if (val.length > 0) this.$refs['reqPictures'].clearValidate()
            })
        }
    },
    methods: {
        ...mapMutations({
            tagUpdate: 'TAG_UPDATE'
        }),
        closeTags () {
            this.tagsList.some((item, index) => {
                if (item.path === (this.$route.fullPath).split('?')[0]) {
                    this.tagsList.splice(index, 1)
                    return true
                }
            })
            this.tagUpdate(this.tagsList)
        },
        beforeAvatarUpload (file) {
            const isImage = ['image/jpeg', 'image/jpg', 'image/png']
            const isJPG = file.type
            if (!isImage.includes(isJPG)) {
                this.$message.error('上传图片仅支持jpg、jpeg、png！')
                return false
            }
            return true
        },
        brandNameChange () {
            this.brandName = ''
            this.relationBrand.forEach(value => {
                if (this.form.brandId === value.brandId) {
                    // 删除 value.brandNameEn 3期迭代
                    this.brandName = value.brandName
                }
            })
        },
        next () {
            if (this.categorySelect.length > 2) {
                this.isNext = true
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择商品类目',
                    type: 'warning'
                })
            }
        },
        async onShowNext (parentId, name, setVal) {
            if (parentId) {
                const { data } = await findCategoryByParent({
                    parentId
                })
                data.forEach((value) => {
                    value.isOn = false
                })
                this[name] = data
            }
            switch (name) {
                case 'categorySecond':
                    this.$set(this.categoryArr, 0, setVal)
                    this.$delete(this.categoryArr, 1)
                    this.$delete(this.categoryArr, 1)
                    this.categoryThird = []
                    this.categoryFirst.forEach(value => {
                        if (value.id === setVal.id) {
                            value.isOn = true
                        } else {
                            value.isOn = false
                        }
                    })
                    break
                case 'categoryThird':
                    this.$set(this.categoryArr, 1, setVal)
                    this.$delete(this.categoryArr, 2)
                    this.categorySecond.forEach(value => {
                        if (value.id === setVal.id) {
                            value.isOn = true
                        } else {
                            value.isOn = false
                        }
                    })
                    break
                default:
                    this.$set(this.categoryArr, 2, setVal)
                    this.categoryThird.forEach(value => {
                        if (value.id === setVal.id) {
                            value.isOn = true
                        } else {
                            value.isOn = false
                        }
                    })
            }
        },
        async createProduct (params) {
            try {
                await createProduct(params)
                if (this.$route.query.isReview === 'yes' || this.isStatus === 'back') {
                    this.closeTags()
                    this.$router.push('/hmall/shopReviewList')
                } else {
                    this.closeTags()
                    this.$router.push({
                        path: '/hmall/shopManager'
                    })
                }
            } catch (e) {
                this.saveDisabled = false
            }
        },
        async updateProduct (params) {
            try {
                await updateProduct(params)
                this.closeTags()
                this.$router.push({
                    path: '/hmall/shopManager'
                })
            } catch (e) {
                this.saveDisabled = false
            }
        },
        pictureMessage (files, fileList) {
            this.$message({
                type: 'warning',
                message: '最多上传5张'
            })
        },
        pictureError () {
            this.$message({
                type: 'error',
                message: '文件上传失败'
            })
        },
        pictureSuccess (files, fileList) {
            this.pictureContainer.push({ url: files.data.accessUrl })
        },
        pictureDelete (i) {
            this.pictureContainer.splice(i, 1)
        },
        pictureSetting (i) {
            this.pictureContainer.unshift((this.pictureContainer.splice(i, 1))[0])
        },
        save (formName) {
            this.saveDisabled = true
            this.form.reqPictures = []
            this.form.reqParameterList = []
            this.pictureContainer.forEach((value, index) => {
                this.form.reqPictures.push({
                    isDefault: index === 0 ? 1 : 0,
                    pictureUrl: value.url,
                    sort: index
                })
            })
            this.form.attributeList.forEach(value => {
                if (value.model) {
                    this.form.reqParameterList.push({
                        parameterId: value.parameterId,
                        value: value.model
                    })
                }
            })
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const { ...params } = this.form
                    params.createBy = this.userInfo.employeeName
                    params.categoryId = this.categorySelectId[2]
                    params.merchantCode = this.userInfoMore.organizationCode

                    if (this.form.productShortName) {
                        params.productName = this.brandName + this.categorySelect[2] + this.form.specification + this.form.productShortName
                    } else {
                        params.productName = this.brandName + this.categorySelect[2] + this.form.specification
                    }
                    if (params.productName.length > 50) {
                        this.$message({
                            type: 'warning',
                            message: '商品名称长度为50字以内'
                        })
                        this.saveDisabled = false
                        return
                    }
                    delete params.attributeList
                    /**
                     * 修复保存按钮多次提交bug 2019-05-16
                     */
                    try {
                        if (this.isAdd) {
                            params.sourceCode = this.userInfoMore.organizationCode
                            params.sourceName = this.userInfoMore.organizationName
                            this.createProduct(params)
                        } else {
                            params.id = this.modify
                            if (this.$route.query.isReview === 'yes') {
                                this.createProduct(params)
                            } else {
                                this.updateProduct(params)
                            }
                        }
                    } catch (e) {
                        this.saveDisabled = false
                    }
                } else {
                    this.saveDisabled = false
                }
            })
        },
        async findProductDetails (id) {
            const { data } = await findProductDetails({ id: id })
            this.$set(this.form, 'brandId', data.product.brandId)
            this.$set(this.form, 'specification', data.product.specification)
            this.$set(this.form, 'productName', data.product.productName)
            this.$set(this.form, 'productShortName', data.product.productShortName)
            this.$set(this.form, 'productCode', data.product.productCode)
            this.$set(this.form, 'sourceCode', data.product.sourceCode)
            this.$set(this.form, 'sourceName', data.product.sourceName)
            this.$set(this.form, 'sellingPrice', data.sellingPrice)
            if (data.product.merchantCode === 'top') {
                this.isShowSellingPrice = false
                this.form.sellingPrice = 0
            }
            this.causeFailure = data.causeFailure
            this.pictureContainer = []
            data.productPictures.forEach((value, index) => {
                this.pictureContainer.push({
                    url: value.pictureUrl
                })
            })
            data.productParameters.forEach(value => {
                value.model = value.value
                this.form.attributeList.push(value)
            })
            if (this.categorySelect.length < 1) {
                this.categorySelect = data.categoryName.split('>')
            }
            // this.categorySelect = data.categoryName.split('>')
            let arr = data.categoryList.sort((value1, value2) => {
                return value1.level - value2.level
            })
            arr.forEach(value => {
                this.categorySelectId.push(value.id)
            })
            if (data.productDetails) {
                this.form.details = data.productDetails.details
            }
            this.findAttributeDetails(true)
        },
        async findAttributeDetails (isMofify) {
            const params = {
                categoryId: this.categorySelectId[1],
                isSetupthe: 1
            }
            const { data } = await findCategoryAttribute(params)
            if (isMofify) {
                data.forEach((value) => {
                    value.model = ''
                    this.form.attributeList.forEach(value1 => {
                        if (value.parameterId === value1.id) {
                            value.model = value1.value
                        }
                    })
                })
                this.form.attributeList = data
            } else {
                data.forEach((value) => {
                    value.model = ''
                })
                this.form.attributeList = data
            }
            this.findRelationBrand()
        },
        async findRelationBrand () {
            const params = {
                categoryId: this.categorySelectId[1],
                isRelation: 1 // 0：未关联 1：已关联
            }
            const { data } = await findRelationBrand(params)
            this.relationBrand = data
            let isNull = true
            this.relationBrand.forEach(value => {
                if (value.brandId === this.form.brandId) {
                    isNull = false
                    //  + value.brandNameEn bug v1.7删除
                    this.brandName = value.brandName
                }
            })
            if (isNull) {
                this.$set(this.form, 'brandId', '')
                this.$nextTick(() => {
                    this.$refs['brandId'].clearValidate()
                })
            }
        },
        cancel () {
            if (this.isAdd) {
                this.isNext = false
            } else {
                if (this.$route.query.isReview === 'yes' || this.isStatus === 'back') {
                    this.closeTags()
                    this.$router.push('/hmall/shopReviewList')
                } else {
                    this.closeTags()
                    this.$router.push('/hmall/shopManager')
                }
            }
        },
        toggle () {
            this.isNext = false
        },
        async pass (formName) {
            this.form.reqPictures = []
            this.form.reqParameterList = []
            this.pictureContainer.forEach((value, index) => {
                this.form.reqPictures.push({
                    isDefault: index === 0 ? 1 : 0,
                    pictureUrl: value.url,
                    sort: index
                })
            })
            this.form.attributeList.forEach(value => {
                if (value.model) {
                    this.form.reqParameterList.push({
                        parameterId: value.parameterId,
                        value: value.model
                    })
                }
            })
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const { ...params } = this.form
                    params.createBy = this.userInfo.employeeName
                    params.updateBy = this.userInfo.employeeName
                    params.categoryId = this.categorySelectId[2]
                    params.merchantCode = this.userInfoMore.organizationCode
                    if (this.form.productShortName) {
                        params.productName = this.brandName + this.categorySelect[2] + this.form.specification + this.form.productShortName
                    } else {
                        params.productName = this.brandName + this.categorySelect[2] + this.form.specification
                    }
                    if (params.productName.length > 50) {
                        this.$message({
                            type: 'warning',
                            message: '商品名称长度为50字以内'
                        })
                        this.saveDisabled = false
                        return
                    }
                    delete params.attributeList
                    params.id = this.modify
                    try {
                        await reviewPass(params)
                    } catch (e) {
                        this.saveDisabled = false
                    }
                    this.closeTags()
                    this.$router.push('/hmall/shopReviewList')
                }
            })
        },
        async reject () {
            if (this.rejectContainer.length < 1) {
                this.$message('请输入驳回原因')
            } else {
                const params = {
                    id: this.modify,
                    causeFailure: this.rejectContainer,
                    checkBy: this.userInfo.employeeName
                }
                await reviewReject(params)
                this.closeTags()
                this.$router.push('/hmall/shopReviewList')
            }
        },
        close () {
            this.closeTags()
            this.$router.push('/hmall/shopReviewList')
        },
        ...mapActions({
            getUserInfoMore: 'getUserInfoMore'
        })
    },
    async mounted () {
        this.getUserInfoMore()
        const { data } = await findCategoryByParent({
            parentId: 0
        })
        data.forEach((value) => {
            value.isOn = false
        })
        const query = this.$route.query
        this.categoryFirst = data
        this.modify = query.id || false
        this.isStatus = query.status
        this.isReview = this.$route.query.isReview
        if (query.type === 'add') {
            this.isShowSellingPrice = false
        }
        if (this.modify) {
            this.isAdd = false
            this.isNext = true
        } else {
            this.isAdd = true
        }
    }
}
</script>

<style scoped>

    .category {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
    }

    .column {
        background: #ffffff;
        border: 1px solid #737373;
        line-height: 30px;
        width: 32%;
        min-height: 400px;
        box-sizing: border-box;
        text-indent: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
        margin-right: -30px;
    }

    .tips {
        background: #ffffff;
        font-size: 13px;
        padding: 12px;
        box-sizing: border-box;
    }

    .next {
        text-align: center;
        padding-top: 20px;
    }

    .next-btn {
        width: 200px;
    }
    .category {
        width: 90%;
        margin: auto;
    }
    .category ul {
        width: 100%;
    }
    .category li {
        cursor: pointer;
        height: 30px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .category li.on {
        background: #f88825;
        color: #ffffff;
    }
    .isW100{
        width: 100%;
    }
    .picture-container{
        float: left;
    }
    .picture-container li{
        width: 102px;
        height: 102px;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        margin-right: 12px;
        float: left;
        margin-bottom: 12px;
        cursor: pointer;
    }
    .picture-container li img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 90%;
        z-index: 1;
    }
    .picture-container li:hover .picture-delete{
        bottom: 0;
    }
    .picture-container li:hover .picture-setting{
        top: 0;
    }
    .picture-delete{
        position: absolute;
        bottom: -30px;
        height: 30px;
        background: rgba(0,0,0,.3);
        color: #ffffff;
        font-size: 18px;
        left: 0;
        width: 100%;
        text-align: center;
        line-height: 30px;
        transition: all 0.2s;
        z-index: 2;
    }
    .picture-setting{
        position: absolute;
        top: -30px;
        left: 0;
        width: 100%;
        line-height: 30px;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        height: 30px;
        background: rgba(0,0,0,.3);
        transition: all 0.2s;
        z-index: 2;
    }
    .upload-tips{
        font-size: 12px;
        color: #999;
    }
    .form-cont-col{
        margin-bottom: 20px;
    }
</style>

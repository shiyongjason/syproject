<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <div class="page-body-title">
                    <h3>商品信息（spu）</h3>
                </div>
                <el-form-item label="商品编码：">
                    {{form.productCode}}
                </el-form-item>
                <el-form-item label="商品类目：" prop="categoryId">
                    <el-cascader :options="categoryList" v-model="form.categoryId"  clearable @change="productCategoryChange"></el-cascader>
                </el-form-item>
                <el-form-item label="商品品牌：" prop="brandId">
                    <el-select v-model="form.brandId" clearable placeholder="请选择"  @change="brandNameChange">
                        <el-option :label="item.brandName+item.brandNameEn" :value="item.brandId" :key="item.id" v-for="item in relationBrand">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品型号：" prop="specification">
                    <el-input v-model="form.specification"></el-input>
                </el-form-item>
                <el-form-item label="商品名称：" prop="spuName">
                    <el-input placeholder=""  maxlength="15"  v-model="form.spuName">
                        <template slot="prepend">{{(brandName ? brandName : '')}}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品主图：" prop="reqPictures" ref="reqPictures">
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
                        <el-upload v-bind="uploadInfo" v-if="pictureContainer.length<5" :on-exceed="pictureMessage" :on-error="pictureError" :on-success="pictureSuccess" :show-file-list="false" :before-upload="beforeAvatarUpload" style="float: left" list-type="picture-card">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </ul>
                </el-form-item>
                <el-form-item>
                    <div class="upload-tips">
                        最多支持上传5张750*750，大小不超过2M，仅支持jpeg，jpg，png格式
                    </div>
                </el-form-item>
                <div class="page-body-title">
                    <h3>商品参数信息</h3>
                </div>
                <el-form-item label="参数信息1：" prop="productName">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="参数信息2：" prop="productName">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="参数信息3：" prop="productName">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="参数信息4：" prop="productName">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <div class="page-body-title">
                    <h3>商品详情</h3>
                </div>
                <el-form-item>
                    <RichEditor v-model="form.reqDetailList[0].content" :menus="menus" :uploadImgServer="uploadImgServer"
                    :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                </el-form-item>
                <el-row>
                    <el-form-item style="text-align: center">
                        <el-button type="primary" >保存且启用</el-button>
                        <el-button @click="save('form')" >保存且禁用</el-button>
                        <el-button @click="save('form')" >保存</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import { fileUploadUrl } from '@/api/config'
import { mapState, mapActions } from 'vuex'
import { findRelationBrand } from './api/index'

export default {
    name: 'modifyoraddoraudit',
    data () {
        return {
            form: {
                brandId: '',
                categoryId: '',
                categoryIdList: '',
                createBy: '',
                merchantCode: 0,
                merchantName: '',
                specification: '',
                spuCode: '',
                spuName: '',
                status: '',
                updateBy: '',
                reqDetailList: [{
                    content: '',
                    spuDetailTabId: '',
                    spuCode: ''
                }]
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
                categoryId: [
                    { required: true, whitespace: true, message: '请选择商品类目' }
                ],
                specification: [
                    { required: true, whitespace: true, message: '请填写规格/型号', trigger: 'blur' }
                ],
                productName: [
                    { required: true, whitespace: true, message: '请填写商品名称', trigger: 'blur' }
                ],
                brandId: [
                    { required: true, whitespace: true, message: '请选择商品品牌' }
                ],
                spuName: [
                    { required: true, whitespace: true, message: '请填写商品名称' }
                ],
                reqPictures: [
                    { required: true, message: '请选择商品主图' }
                ]
            },
            pictureContainer: [],
            modify: false,
            categorySelect: [],
            brandName: '',
            relationBrand: []
        }
    },
    computed: {
        uploadInfo () {
            return {
                action: fileUploadUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                name: 'multiFile'
            }
        },
        /* TODO 富文本编辑器 */
        uploadImgServer () {
            return fileUploadUrl + 'tms/files/upload-list'
        },
        uploadImgParams () {
            return {
                updateUid: this.userInfo.employeeName
            }
        },
        uploadImgName () {
            return 'multiFile'
        },
        ...mapState({
            userInfo: state => state.userInfo,
            categoryList: state => {
                const cateList = JSON.parse(JSON.stringify(state.hmall.categoryList))
                cateList && cateList.shift()
                return cateList
            }
        })
    },
    methods: {
        ...mapActions({
            findCategoryList: 'findCategoryList'
        }),
        productCategoryChange (val) {
            console.log(val)
            this.findRelationBrand(val[1])
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
        async findRelationBrand (val) {
            const params = {
                categoryId: val,
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
                // this.$set(this.form, 'brandId', '')
                // this.$nextTick(() => {
                //     this.$refs['brandId'].clearValidate()
                // })
            }
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
        save () {
            console.log(this.form)
        }
    },
    async mounted () {
        this.findCategoryList()
    }
}
</script>

<style lang="scss" scoped>
.page-body-title {
    background: #f5f7fa;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    margin-bottom: 10px;
    h3 {
        font-size: 20px;
    }
}
.picture-container {
    float: left;
}
.picture-container li {
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
.picture-container li img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    z-index: 1;
}
.picture-container li:hover .picture-delete {
    bottom: 0;
}
.picture-container li:hover .picture-setting {
    top: 0;
}
.picture-delete {
    position: absolute;
    bottom: -30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    font-size: 18px;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 30px;
    transition: all 0.2s;
    z-index: 2;
}
.picture-setting {
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    line-height: 30px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.2s;
    z-index: 2;
}
.upload-tips {
    font-size: 12px;
    color: #999;
}
</style>

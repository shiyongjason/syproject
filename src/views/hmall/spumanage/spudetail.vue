<template>

    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <div class="page-body-title">
                    <h3>商品信息（spu）</h3>
                </div>
                <el-form-item label="商品编码：">
                    {{form.productCode}}
                </el-form-item>
                <el-form-item label="商品类目：">
                    <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="商品品牌：" prop="productName">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="商品型号：" prop="productName">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="商品名称：" prop="productName">
                    <el-input placeholder="" :maxlength="50 - length" style="width: 500px" v-model="form.productShortName">
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
                    <RichEditor v-model="form.details" :menus="menus" :uploadImgServer="uploadImgServer" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                </el-form-item>
                <el-row>
                    <el-form-item style="text-align: center">
                        <el-button @click="cancel">保存且启用</el-button>
                        <el-button type="primary" @click="save('form')" :disabled="saveDisabled">保存且禁用</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
import { findCategoryAttribute } from './api/index'

export default {
    name: 'modifyAdd',
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
                    { required: true, whitespace: true, message: '请填写规格/型号' }

                ],
                reqPictures: [
                    { required: true, message: '请选择商品主图' }
                ],
                sellingPrice: [
                    { required: true, message: '请输入销售价', trigger: 'blur' }

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
        uploadInfo () {
            return {
                // TODO: 这个是老接口，不知道要不要更新
                action: interfaceUrl + 'api/httpH5/upload/6999',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onSubmit () {
            console.log(1)
        }
    },
    async mounted () {
        const params = {
            categoryId: 1,
            isSetupthe: 1
        }
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
</style>

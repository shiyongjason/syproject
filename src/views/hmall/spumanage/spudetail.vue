<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="formmain" :model="form" :rules="rules" label-width="110px">
                <div class="page-body-title">
                    <h3> {{ operate=='modify'||operate=='add' ? '模板信息' : '商品信息（spu）'}}</h3>
                </div>
                <!-- 更新或者审核 start  -->
                <template v-if="operate=='modify'||operate=='audit'">
                    <el-form-item label="商品类目：" style="width: 460px;">
                        {{form.categoryPathName}}
                    </el-form-item>
                    <el-form-item label="商品品牌：" style="width: 460px;">
                        {{form.name}}
                    </el-form-item>
                    <el-form-item label="商品型号：" style="width: 460px;">
                        <el-input v-model="form.model" disabled></el-input>
                    </el-form-item>
                </template>
                <!-- 更新或者审核 end  -->

                <!-- 新增 start -->
                    <template v-if="operate=='add'">
                        <el-form-item label="商品类目：" prop="categoryId" style="width: 460px;" v-if="operate=='add'">
                            <el-cascader :options="categoryOptions" v-model="categoryIdArr" @change="productCategoryChange" ></el-cascader>
                        </el-form-item>
                        <el-form-item label="商品品牌：" prop="brandId" style="width: 460px;" v-if="operate=='add'" ref="brandId">
                            <el-select v-model="form.brandId" filterable placeholder="请选择">
                                <el-option
                                v-for="item in brandOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品型号：" prop="model" style="width: 460px;">
                            <el-input placeholder="" maxlength="50" v-model="form.model">
                            </el-input>
                        </el-form-item>
                    </template>
                <!-- 新增 end -->

                <el-form-item label="商品名称：" style="width: 460px;">
                    <el-input placeholder="" maxlength="100" v-model="form.name" :disabled="operate=='audit'">
                        <template slot="prepend">{{brandName}}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品主图：" prop="imgUrls">
                    <ul class="picture-container">
                        <template v-if="pictureContainer.length>0">
                            <li v-for="(item,index) in pictureContainer" :key="index">
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

                <div class="page-body-title" v-if="form.specifications.length>0">
                    <h3>商品参数信息</h3>
                </div>
                <div :key="index" v-for="(item,index) in form.specifications" class="el-form-item" style="width: 460px;">
                    <!--  -->
                    <el-form-item
                        :label="item.k"
                        :prop="'specifications.'+ index + '.v'"
                        :rules="{
                            required: item.isRequired === 1 ? true : false ,
                            whitespace: true,
                            message: '请输入'+ item.k,
                            trigger: item.isCombobox === 1 ? 'blur' : ''
                    }">
                        <el-select v-model="item.v" v-if="item.isCombobox === 1">
                            <el-option :label="subItem" :value="subItem" :key="subItem" v-for="subItem in item.options">
                            </el-option>
                        </el-select>
                        <template v-else-if="item.isCombobox === 0">
                            <el-input placeholder="" maxlength="25" v-model="item.v">
                                <template slot="append" v-if="item.unit">{{item.unit}}</template>
                            </el-input>
                        </template>
                    </el-form-item>
                </div>

                <div class="page-body-title">
                    <h3>商品详情</h3>
                </div>
                <el-form-item>
                    <RichEditor v-model="form.reqDetailList[0].content" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                </el-form-item>
                <el-row v-if="operate=='modify'||operate=='add'">
                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="onSave(1)" v-if="operate=='add'">保存</el-button>
                        <el-button type="primary" @click="onSave(2)" v-if="operate=='modify'">保存</el-button>
                        <el-button @click="onBack()">返回</el-button>
                    </el-form-item>
                </el-row>
                <el-form ref="auditForm" :model="auditForm" :rules="auditrules" label-width="110px">
                    <el-row v-if="operate=='audit'">
                        <el-form-item prop="approveStatus">
                            <el-radio v-model="auditForm.approveStatus" label="1">审核通过</el-radio>
                            <el-radio v-model="auditForm.approveStatus" label="2">审核不通过</el-radio>
                        </el-form-item>
                        <el-form-item style="width: 460px;" v-if="auditForm.approveStatus==2" prop="approveDesc">
                            <el-input type="textarea" maxlength="200" :rows="3" placeholder="理由说明" v-model="auditForm.approveDesc">
                            </el-input>
                        </el-form-item>
                        <el-form-item style="text-align: center">
                            <el-button type="primary" @click="onAudit(1)">确定</el-button>
                            <el-button @click="onBack()">返回</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </el-form>
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { mapState, mapActions, mapGetters } from 'vuex'
import { findSpuAttr, saveSpuTemplate, findSpudetail, putSpuTemplate, auditSpu } from './api/index'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'spudetail',
    data () {
        return {
            form: {
                brandId: '',
                categoryId: '',
                model: '',
                name: '',
                isEnable: '',
                reqDetailList: [{
                    content: '',
                    spuDetailTabId: 1
                }],
                specifications: [],
                imgUrls: ''
            },
            categoryIdArr: [],
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
                model: [
                    { required: true, whitespace: true, message: '请填写规格/型号', trigger: 'blur' }
                ],
                productName: [
                    { required: true, whitespace: true, message: '请填写商品名称', trigger: 'blur' }
                ],
                brandId: [
                    { type: 'number', required: true, whitespace: true, message: '请选择商品品牌' }
                ],
                imgUrls: [
                    { required: true, message: '请选择商品主图' }
                ]
            },
            pictureContainer: [], // 图片列表
            operate: '',
            categorySelect: [],
            relationBrand: [],
            deepForm: {},
            categoryIdName: '',
            auditForm: {
                approveStatus: '',
                approveDesc: '',
                operator: '',
                spuCode: this.$route.query.spuCode
            },
            auditStatus: this.$route.query.auditStatus,
            auditrules: {
                approveStatus: [
                    { required: true, whitespace: true, message: '请选择审核状态' }
                ],
                approveDesc: [
                    { required: true, whitespace: true, message: '请填写理由说明' }
                ]
            },
            specList: []
        }
    },
    watch: {
        // 图片数组变化，更新form中的字段
        pictureContainer (val) {
            this.form.imgUrls = val.map(v => v.url).join()
        }
    },
    computed: {
        ...mapGetters('category', {
            categoryOptions: 'categoryOptions'
        }),
        ...mapGetters('brand', {
            brandOptions: 'brandOptions'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        }),

        brandName () {
            return this.brandOptions.find(v => v.value === this.form.brandId) ? this.brandOptions.find(v => v.value === this.form.brandId).label : ''
        },
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                name: 'multiFile'
            }
        },
        /* TODO 富文本编辑器 */
        uploadImgServer () {
            return interfaceUrl + 'tms/files/upload-list'
        },
        uploadImgParams () {
            return {
                updateUid: this.userInfo.employeeName
            }
        },
        uploadImgName () {
            return 'multiFile'
        },
        spuTemplateBo () {
            return {
                brandId: this.form.brandId || '',
                categoryId: this.form.categoryId || '',
                detail: this.form.reqDetailList[0].content || '',
                id: this.$route.query.spuTemplateId || '',
                imgUrls: this.form.imgUrls || '',
                isEnable: this.form.isEnable || '',
                model: this.form.model || '',
                name: this.form.name || '',
                specifications: this.form.specifications || [],
                operator: this.userInfo.employeeName
            }
        }

    },
    async mounted () {
        this.findAllCategory()
        this.findAllBrands()
    },

    // 因为keepAlive的原因，需要做很多重置工作
    activated () {
        this.operate = this.$route.query.type
        if (this.$route.query.type === 'modify' && this.$route.query.spuTemplateId) {
            this.findSpuDetailAsync(this.$route.query.spuTemplateId)
        } else {
            this.form = {
                brandId: '',
                categoryId: '',
                model: '',
                name: '',
                isEnable: '',
                reqDetailList: [{
                    content: '',
                    spuDetailTabId: 1
                }],
                specifications: [],
                imgUrls: ''
            }
            this.pictureContainer = []
        }
        // this.deepForm = deepCopy(this.form)
    },
    methods: {
        ...mapActions('category', [
            'findAllCategory'
        ]),
        ...mapActions('brand', [
            'findAllBrands'
        ]),
        ...mapActions({
            findCategoryList: 'findCategoryList',
            setNewTags: 'setNewTags'
        }),

        // 类目改变的方法
        productCategoryChange (val) {
            this.form.categoryId = val[2]
            this.findSpuAttr(val[1])
        },
        // 根据2级类目 查询 所有属性
        async findSpuAttr (categoryId) {
            const { data: { specifications } } = await findSpuAttr({ categoryId })
            // 这里必须把对象的v字段添上，不然编辑的表单验证过不去
            this.form.specifications = deepCopy(specifications || []).map(v => {
                return {
                    ...v,
                    v: ''
                }
            })
        },

        /* 上传图片开始 */
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
        // 数组第一位默认为主图
        pictureSetting (i) {
            this.pictureContainer.unshift((this.pictureContainer.splice(i, 1))[0])
        },
        /* 图片上传结束 */

        onSave (val) {
            this.$refs['formmain'].validate(async (valid) => {
                if (valid) {
                    if (this.operate == 'add') {
                        await saveSpuTemplate(this.spuTemplateBo)
                        this.$message({
                            type: 'success',
                            message: '商品新建成功！'
                        })
                        this.$router.push({ path: '/hmall/spumange' })
                    } else if (this.operate == 'modify') {
                        await putSpuTemplate(this.spuTemplateBo)
                        this.$message({
                            type: 'success',
                            message: '商品更新成功！'
                        })
                        // this.$router.push({ path: '/hmall/spumange' })
                    } else {
                        if (this.auditForm.approveStatus == 1) {
                            this.auditForm.approveDesc = ''
                        }
                        await putSpu({ ...this.form, status: val, updateBy: this.userInfo.employeeName, updateUser: this.userInfo.employeeName })
                        await auditSpu(this.auditForm)
                        this.$message({
                            type: 'success',
                            message: this.auditForm.approveStatus == 1 ? '商品审核成功！' : '商品审核不成功'
                        })
                        this.$router.go(-1)
                    }
                }
            })
        },
        onAudit (val) {
            this.auditForm.operator = this.userInfo.employeeName
            this.$refs['auditForm'].validate(async (valid) => {
                if (valid) {
                    if (val == 1) {
                        await this.onSave(this.auditStatus)
                    } else {

                    }
                }
            })
        },
        onBack () {
            if (JSON.stringify(this.form) != JSON.stringify(this.deepForm)) {
                this.$confirm('确认不保存当前操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.setNewTags((this.$route.fullPath).split('?')[0])
                    this.$router.go(-1)
                }).catch(() => {

                })
            } else {
                this.setNewTags((this.$route.fullPath).split('?')[0])
                this.$router.go(-1)
            }
        },

        // 查询spu的详情
        async findSpuDetailAsync (spuTemplateId) {
            const { data } = await findSpudetail({ spuTemplateId })
            this.form = {
                brandId: data.brandId,
                categoryId: data.categoryId,
                categoryPathName: data.categoryPathName,
                model: data.model,
                name: data.name,
                isEnable: data.isEnable,
                reqDetailList: [
                    {
                        content: data.detail,
                        spuDetailTabId: 1
                    }
                ],
                specifications: [],
                // 处理图片的信息
                imgUrls: ''
            }
            // 处理图片的信息，设置pictureContainer，watch函数自动更新imgUrls字段
            this.pictureContainer = data.imgUrls.split(',').map(v => {
                return {
                    url: v
                }
            })

            // 额外处理参数信息，而且需要强制更新视图
            await this.findSpuAttr(data.twoCategoryId)
            this.form.specifications.forEach(v1 => {
                data.specifications.forEach(v2 => {
                    if (v2.k === v1.k) {
                        v1.v = v2.v
                    }
                })
            })
            this.$forceUpdate()
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
/deep/.el-input {
    width: 100%;
}
/deep/.el-select {
    width: 100%;
}
/deep/.el-cascader {
    width: 100%;
}
</style>
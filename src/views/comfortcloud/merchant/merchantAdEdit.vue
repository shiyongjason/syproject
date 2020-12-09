<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <div class="page-body-title">
                    <h3>招商广告编辑</h3>
                </div>
                <el-form-item label="招商广告标题：" prop="title">
                    <el-input v-model.trim="form.title" show-word-limit placeholder="请输入广告标题" maxlength='50' class="newTitle"></el-input>
                </el-form-item>

                <el-form-item label="招商品类和型号：" prop="categorys">
                    <el-button type="primary" icon="el-icon-video-camera-solid" @click="onAddCategory">+添加招商品类</el-button>
                </el-form-item>

                <el-row v-for="(categoryItem,index) in form.categorys" :key="index">
                    <el-col :span="6">
                        <el-form-item label="品类：" :prop="'categorys.' + index + '.categoryId'" :rules="rules.category">
                            <el-select v-model="categoryItem.categoryId" @change="()=> { selectChanged(index) }" >
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.categoryName" :value="item.categoryId" v-for="item in cloudMerchantShopCategoryList" :key="item.categoryId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-bottom: 20px;">
                        <el-form-item label="商品型号：" :prop="'categorys.' + index + '.specificationId'" :rules="rules.type">
                            <el-select v-model="categoryItem.specificationId" @change="selectSpecificationIdChanged">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.specificationName" :value="item.specificationId" v-for="item in categoryTypes[index]" :key="item.specificationId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-button type="primary" @click="()=> { onRemoveCategory(index) }">删除</el-button>
                </el-row>

                <div class="page-body-title">
                    <h3>广告内容</h3>
                </div>
                <el-form-item label="详情：" prop="content">
                    <el-button type="primary" icon="el-icon-video-camera-solid" @click="onAddvideo">插入视频</el-button>
                    <RichEditor :height="500" :menus="menus" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" :uploadImgServer="uploadImgServer" @blur="$refs['form'].validateField('content')" hidefocus="true" ref="editors" style="outline: 0;margin-bottom: 12px;width:100%" tabindex="0" v-model="form.content"></RichEditor>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSaveAd()" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="上传视频" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal=false>
            <div style="display:flex;margin:20px auto;height:100px;justify-content: center;">
                <SingleUpload sizeLimit='10M' :upload="videoUpload" :imageUrl="videoimageUrl" ref="video" @back-event="videoUrl" :imgW="200" :imgH="100" />
            </div>
            <p style="text-align:center">仅支持 MP4 格式, 大小不超过10 MB</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onInsertVideo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { saveCloudMerchantAd, getCloudMerchantCategory } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'merchantAdEdit',
    data () {
        return {
            form: {
                title: '',
                categorys: [],
                content: ''
            },
            categoryTypes: [],
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
                title: [
                    { required: true, message: '请输入广告标题', trigger: 'blur' }
                ],
                categorys: [
                    { required: true, message: '请添加招商品类和类型' }
                ],
                category: [{ required: true, message: '品类不能为空', trigger: 'blur' }],
                type: [{
                    required: true,
                    validator: (rule, value, callback) => {
                        if (!value) {
                            return callback(new Error('商品类型不能为空'))
                        }

                        const index = parseInt(rule.field.split('.')[1])
                        const categoryId = this.form.categorys[index].categoryId
                        const specificationId = value

                        for (let i = 0; i < this.form.categorys.length; i++) {
                            if (i === index) {
                                continue
                            }
                            let item = this.form.categorys[i]
                            if (item.categoryId === categoryId && item.specificationId === specificationId) {
                                return callback(new Error('商品类型不能重复'))
                            }
                        }
                        callback()
                    },
                    trigger: 'change' }],
                content: [
                    {
                        validator: (rule, value, callback) => {
                            if (value.length <= 0 || value === '<p><br></p>') {
                                return callback(new Error('请输入广告内容'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            loading: false,
            dialogVisible: false,
            uploadedUrl: '',
            videoimageUrl: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantAdDetail: 'cloudMerchantAdDetail',
            cloudMerchantShopCategoryList: 'cloudMerchantShopCategoryList',
            cloudMerchantShopCategoryTypeList: 'cloudMerchantShopCategoryTypeList' // 商品类型
        }),
        videoUpload () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'audio/mp4, video/mp4'
            }
        },
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
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
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    return time.getTime() < Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        if (this.$route.query.id) {
            this.getAdDetail(this.$route.query.id)
        }
        this.getCategory()

        this.findCloudMerchantShopCategoryList()
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags',
            getCloudMerchantAdDetail: 'getCloudMerchantAdDetail',
            findCloudMerchantShopCategoryList: 'findCloudMerchantShopCategoryList',
            findCloudMerchantShopCategoryTypeList: 'findCloudMerchantShopCategoryTypeList'
        }),

        async getCategory () {
            let { data } = await getCloudMerchantCategory()
            this.categorys = data
        },

        async getAdDetail (id) {
            await this.getCloudMerchantAdDetail(id)
            this.form = {
                title: this.cloudMerchantAdDetail.title,
                category: this.cloudMerchantAdDetail.merchantsCategory.split(',').map(function (value) {
                    return parseInt(value)
                }),
                content: this.cloudMerchantAdDetail.content
            }
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.go(-1)
        },

        onSaveAd () {
            this.loading = true
            console.log(this.form)
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try {
                        let dic = {}
                        this.form.categorys.map((item) => {
                            if (dic[item.categoryId] == null) {
                                dic[item.categoryId] = [item.specificationId]
                            } else {
                                dic[item.categoryId].push(item.specificationId)
                            }
                        })

                        let params = {
                            title: this.form.title,
                            content: this.form.content,
                            merchantsCategory: dic
                        }
                        console.log(params)

                        if (this.$route.query.id) {
                            params['id'] = this.$route.query.id
                            await saveCloudMerchantAd(params)
                            this.$message.success('广告修改成功')
                        } else {
                            await saveCloudMerchantAd(params)
                            this.$message.success('广告保存成功')
                        }
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/comfortCloudMerchant/merchantManage/merchantAd')
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        videoUrl (val) {
            this.$message.success('视频上传成功')
            this.uploadedUrl = val.imageUrl
            this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'
        },
        onAddvideo () {
            this.uploadedUrl = ''
            this.videoimageUrl = ''
            this.dialogVisible = true
        },
        handleClose () {
            // console.log(this.$refs.editors.editor)
            this.dialogVisible = false
        },
        onInsertVideo () {
            this.$refs.editors.onInsertUrl(`</br><video src="${this.uploadedUrl}"  poster="" controls controlsList="nofullscreen nodownload noremote footbar" width="450" height="300" style="border:1px solid #f5f5f5;"></video></br>`)
            this.dialogVisible = false
        },
        onAddCategory () {
            this.form.categorys.push({ categoryId: '', specificationId: '' })
            this.categoryTypes.push([])
        },
        async selectChanged (index) {
            this.form.categorys[index].specificationId = ''
            this.categoryTypes.splice(index, 1, [])
            await this.findCloudMerchantShopCategoryTypeList({ categoryId: this.form.categorys[index].categoryId })
            this.categoryTypes.splice(index, 1, this.cloudMerchantShopCategoryTypeList)
        },
        selectSpecificationIdChanged () {
            for (let i = 0; i < this.form.categorys.length; i++) {
                this.$refs['form'].validateField('categorys.' + i + '.specificationId')
            }
        },
        onRemoveCategory (index) {
            this.form.categorys.splice(index, 1)
            this.categoryTypes.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-body-title {
        margin-bottom: 20px;
    }
    .upload-tips {
        font-size: 12px;
        color: #999;
        display: flex;
        align-items: center;
        height: 100px;
        margin-left: 10px;
    }
    /deep/.avatar-uploader {
        margin-right: 10px;
    }
    .editor-wrap {
        margin-top: 20px;
    }
    /deep/.el-dialog__wrapper {
    // z-index: 99999 !important;
    }
    /deep/.newTitle {
        width: 500px!important;
    }
    .el-picker-panel {
        z-index: 99999 !important;
    }
    /deep/.w-e-text-container {
        z-index: 40 !important;
    }
    /deep/.w-e-menu {
        z-index: 99 !important;
    }
    /deep/.editor-wrap{
        margin-bottom: 23px  !important;
    }
    /deep/.w-e-toolbar {
        z-index: 99 !important;
    }
</style>

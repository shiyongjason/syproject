<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <div class="page-body-title">
                    <h3>工程方案编辑</h3>
                </div>
                <el-form-item label="工程方案标题：" prop="schemeTitle">
                    <el-input v-model.trim="form.schemeTitle" show-word-limit placeholder="请输入工程方案标题" maxlength='50' class="newTitle"></el-input>
                </el-form-item>

                <el-form-item label="方案列表缩略图：" prop="schemeImage" ref="schemeImage">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="form.schemeImage" ref="uploadImg" @back-event="readUrl" :imgW="100" :imgH="100" />
                    <div class="upload-tips">建议尺寸：4:3比例图片，1M以内，支持jpeg,png和jpg格式</div>
                </el-form-item>
                <el-form-item label="生效时间：" prop="effectiveTime">
                    <el-date-picker type="datetime" v-model="form.effectiveTime" :clearable=false placeholder="生效时间" value-format='yyyy-MM-ddTHH:mm:ss' :picker-options="pickerOptionsStart">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="商品视频：" prop="schemeVideo">
                    <el-row>
                        <SingleUpload sizeLimit='100M' :upload="videoUpload" :imageUrl="videoimageUrl" @back-event="videoUrl" :imgW="100" :imgH="100">
                        </SingleUpload>
                        <h-button v-if="form.schemeVideo" type="primary" @click="palyVideo">视频预览</h-button>
                        <div class="upload-tips">
                            建议尺寸：支持 MP4格式, 大小不超过100MB
                            视频尺寸16:9，视频长度建议不超过60秒
                        </div>
                    </el-row>
                </el-form-item>

                <div class="page-body-title">
                    <h3>方案详细内容</h3>
                </div>
                <el-form-item label="详情：" prop="schemeDetail">
                    <RichEditor :height="500" :menus="menus" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" :uploadImgServer="uploadImgServer" @change="$refs['form'].validateField('schemeDetail')" @blur="$refs['form'].validateField('schemeDetail')" hidefocus="true" ref="editors"
                        style="outline: 0;margin-bottom: 12px;width:100%" tabindex="0" v-model="form.schemeDetail"></RichEditor>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSave" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog width="600px" title="视频播放" @close="closePlayDialog" :visible.sync="innerVisible" append-to-body>
            <Video ref="videoPlay" :src="this.form.schemeVideo" class="avatarVideo" controls="controls">您的浏览器不支持视频播放
            </Video>
        </el-dialog>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { addCloudMerchantProjectScheme } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'merchantEnginePlanEdit',
    data () {
        return {
            form: {
                schemeTitle: '',
                schemeImage: '',
                effectiveTime: '',
                schemeDetail: '',
                schemeVideo: ''
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
                schemeTitle: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                schemeImage: [
                    { required: true, message: '请上传方案列表缩略图', trigger: 'change' }
                ],
                effectiveTime: [
                    { required: true, message: '请选择生效时间', trigger: 'change' }
                ],
                schemeVideo: [
                    { required: false, message: '请上传商品视频', trigger: 'change' }
                ],
                schemeDetail: [
                    {
                        validator: (rule, value, callback) => {
                            if (value.length <= 0 || value === '<p><br></p>') {
                                return callback(new Error('请输入方案详细内容'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            loading: false,
            videoimageUrl: '',
            innerVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantProjectSchemeDetail: 'cloudMerchantProjectSchemeDetail'
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
    async mounted () {
        if (this.$route.query.id) {
            this.getDetail(this.$route.query.id)
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags',
            findCloudMerchanProjectSchemeDetail: 'findCloudMerchanProjectSchemeDetail'
        }),

        async getDetail (id) {
            await this.findCloudMerchanProjectSchemeDetail({ id })
            this.form = { ...this.cloudMerchantProjectSchemeDetail }
            if (this.form.schemeVideo) {
                this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'
            } else {
                this.videoimageUrl = ''
            }
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/comfortCloudMerchant/merchantEngine/merchantEnginePlan')
        },

        onSave () {
            this.loading = true
            this.form.operator = this.userInfo.employeeName
            if (!this.$route.query.id) {
                this.form.createPhone = this.userInfo.phoneNumber
            }
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try {
                        await addCloudMerchantProjectScheme(this.form)
                        if (this.$route.query.id) {
                            this.$message.success('修改成功')
                        } else {
                            this.$message.success('创建成功')
                        }

                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/comfortCloudMerchant/merchantEngine/merchantEnginePlan')
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        readUrl (val) {
            this.form.schemeImage = val.imageUrl
        },
        videoUrl (val) {
            if (val.imageUrl) {
                this.$message.success('视频上传成功')
                this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'
            } else {
                this.$message.success('视频删除成功')
                this.videoimageUrl = ''
            }
            this.form.schemeVideo = val.imageUrl
            // this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'
        },
        palyVideo () {
            this.innerVisible = true
        },
        closePlayDialog () {
            this.$refs['videoPlay'].pause()
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
    width: 500px !important;
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
/deep/.editor-wrap {
    margin-bottom: 23px !important;
}
/deep/.w-e-toolbar {
    z-index: 99 !important;
}
.avatarVideo {
    width: 95%;
    margin: 0 auto;
    display: block;
}
</style>

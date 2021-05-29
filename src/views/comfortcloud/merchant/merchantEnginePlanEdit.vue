<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <div class="page-body-title">
                    <h3>工程方案编辑</h3>
                </div>
                <el-form-item label="工程方案标题：" prop="title">
                    <el-input v-model.trim="form.schemeTitle" show-word-limit placeholder="请输入广告标题" maxlength='50' class="newTitle"></el-input>
                </el-form-item>

                <el-form-item label="方案列表缩略图：" prop="iconUrl" ref="iconUrl">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="form.schemeImage" ref="uploadImg" @back-event="readUrl" :imgW="100" :imgH="100" />
                    <div class="upload-tips">建议尺寸：993*993或1:1比例图片，1M以内，支持jpeg,png和jpg格式</div>
                </el-form-item>
                <el-form-item label="生效时间：" prop="effectiveTime">
                    <el-date-picker type="datetime" v-model="form.effectiveTime" :clearable=false placeholder="生效时间" value-format='yyyy-MM-dd HH:mm:ss' :picker-options="pickerOptionsStart">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="商品视频：" prop="video" >
                    <el-row>
                        <SingleUpload  sizeLimit='100M' :upload="videoUpload" :imageUrl="videoimageUrl"
                                       @back-event="videoUrl" :imgW="100" :imgH="100">
                        </SingleUpload>
                        <h-button v-if="form.schemeVideo"   type="primary" @click="palyVideo">视频预览</h-button>
                        <div class="upload-tips">
                            建议尺寸：支持 MP4格式, 大小不超过20MB
                            主图视频尺寸1:1，视频长度建议不超过60秒
                        </div>
                    </el-row>
                </el-form-item>

                <div class="page-body-title">
                    <h3>方案详细内容</h3>
                </div>
                <el-form-item label="详情：" prop="schemeDetail">
                    <RichEditor :height="500" :menus="menus" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" :uploadImgServer="uploadImgServer" @blur="$refs['form'].validateField('schemeDetail')" hidefocus="true" ref="editors" style="outline: 0;margin-bottom: 12px;width:100%" tabindex="0" v-model="form.schemeDetail"></RichEditor>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSaveAd()" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
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
import { saveCloudMerchantAd } from '../api'
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
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
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
            videoimageUrl: '',
            innerVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
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
        }),

        async getDetail (id) {
            await this.getCloudMerchantAdDetail(id)
            this.form = {
                title: this.cloudMerchantAdDetail.title,
                categorys: categorys,
                content: this.cloudMerchantAdDetail.content
            }
            this.categoryTypes = categoryTypes
            console.log(this.form)
        },
        onBack () {
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
                            merchantsCategory: JSON.stringify(dic)
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
        readUrl (val) {
            this.form.schemeImage = val.imageUrl
        },
        videoUrl (val) {
            this.$message.success('视频上传成功')
            this.form.schemeVideo = val.imageUrl
            this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'
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

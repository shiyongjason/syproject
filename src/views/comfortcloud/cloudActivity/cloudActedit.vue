<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="cloudForm" :model="cloudForm" :rules="rules" label-width="110px">
                <div class="page-body-title">
                    <h3>活动管理</h3>
                </div>
                <el-form-item label="活动标题：" prop="title">
                    <el-input v-model.trim="cloudForm.title" show-word-limit placeholder="请输入活动标题" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="列表图片：" prop="picture" ref="picture">
                    <!--logoUrl-->
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="cloudForm.picture" ref="uploadImg" @back-event="readUrl" :imgW="300" :imgH="100" />
                    <div class="upload-tips">
                        <!-- 尺寸300x100,仅支持 gif、 jpeg、 png、 bmp 4种格式, 大小不超过3MB -->
                        建议尺寸：993*426，1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item label="生效时间：" prop="effectiveTime">
                    <el-date-picker type="datetime" v-model="cloudForm.effectiveTime" :clearable=false placeholder="生效时间" value-format='yyyy-MM-dd HH:mm:ss' :picker-options="pickerOptionsStart">
                    </el-date-picker>
                </el-form-item>
                <div class="page-body-title">
                    <h3>活动详情</h3>
                </div>
                <el-form-item label="详情：" prop="detail">
                    <el-button type="primary" icon="el-icon-video-camera-solid" @click="onAddvideo">插入视频</el-button>
                    <RichEditor @blur="$refs['cloudForm'].validateField('detail')" tabindex="0" hidefocus="true" ref="editors" v-model="cloudForm.detail" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="outline: 0;margin-bottom: 12px;width:100%"></RichEditor>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSaveact()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
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
import { saveActdetail, editActdetail } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'cloudActedit',
    data () {
        return {
            cloudForm: {
                detail: '',
                effectiveTime: '',
                picture: '',
                title: ''
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
            dialogVisible: false,
            uploadedUrl: '',
            videoimageUrl: '',
            rules: {
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                picture: [
                    { required: true, message: '请选择列表图片' }
                ],
                effectiveTime: [
                    { required: true, message: '请选择生效时间', trigger: 'blur' }
                ],
                detail: [
                    {
                        validator: (rule, value, callback) => {
                            if (value.length <= 0 || value === '<p><br></p>') {
                                return callback(new Error('请输入活动详情'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            loading: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudActivitydetail: 'cloudActivitydetail'
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
        imageUrl () {
            return this.cloudForm.logoUrl
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
    watch: {
        'cloudForm.picture' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['picture'].clearValidate()
            })
        }
    },
    mounted () {
        if (this.$route.query.id) {
            this.getActivityDetail(this.$route.query.id)
        }
    },
    methods: {
        ...mapActions(
            {
                setNewTags: 'setNewTags',
                findcloudActDetail: 'findcloudActDetail'
            }
        ),
        readUrl (val) {
            this.cloudForm.picture = val.imageUrl
        },
        videoUrl (val) {
            this.$message.success('视频上传成功')
            this.uploadedUrl = val.imageUrl
            this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/share_icon.png'
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
            this.$refs.editors.onInsertUrl(`</br><video src="${this.uploadedUrl}"  poster="" controls="controls" controlsList="nodownload" width="450" height="300" style="border:1px solid #f5f5f5;"></video></br>`)
            this.dialogVisible = false
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/comfortCloud/cloudList')
        },
        async getActivityDetail (id) {
            await this.findcloudActDetail(id)
            this.cloudForm = { ...this.cloudActivitydetail }
        },
        onSaveact () {
            this.loading = true
            this.$refs['cloudForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        if (this.$route.query.id) {
                            await editActdetail(this.cloudForm)
                            this.$message.success('活动修改成功')
                        } else {
                            await saveActdetail(this.cloudForm)
                            this.$message.success('活动保存成功')
                        }
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/comfortCloud/cloudList')
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
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
</style>

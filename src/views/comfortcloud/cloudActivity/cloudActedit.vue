<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="cloudForm" label-width="110px">
                <div class="page-body-title">
                    <h3>活动管理</h3>
                </div>
                <el-form-item label="活动标题：">
                    <el-input v-model="cloudForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="logoUrl" label="列表图片：">
                    <!--logoUrl-->
                    <SingleUpload :upload="uploadInfo" :imageUrl="imageUrl" ref="uploadImg" @back-event="readUrl" :imgW="300" :imgH="100" />
                    <div class="upload-tips">
                        尺寸300x100,2m以内，支持jpg、jpeg、png`
                    </div>
                </el-form-item>
                <el-form-item label="生效时间：">
                    <el-date-picker type="datetime" v-model="cloudForm.endDate" :clearable=false placeholder="生效时间" value-format='yyyy-MM-dd HH:mm:ss' :picker-options="pickerOptionsStart">
                    </el-date-picker>
                </el-form-item>
                <div class="page-body-title">
                    <h3>活动详情</h3>
                </div>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-video-camera-solid" @click="onAddvideo">插入视频</el-button>
                    <RichEditor ref="editors" v-model="cloudForm.content" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onAudit(1)">确定</el-button>
                    <!-- <el-button type="primary" @click="onAudit(2)">确定且下一个</el-button> -->
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="上传视频" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal=false>
            <div style="text-align:center;margin-top:20px">
                <el-upload class="upload-demo" drag :on-success="handleSuccess" :on-error="handleError" :before-upload="handleUpload" v-bind="videoUpload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'cloudEdit',
    data () {
        return {
            cloudForm: {
                name: ''
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
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
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
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    return time.getTime() < Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
    },
    methods: {
        readUrl (val) {
            this.cloudForm.imageUrl = val.imageUrl
        },
        onAddvideo () {
            this.dialogVisible = true
        },
        handleClose () {
            // console.log(this.$refs.editors.editor)
            this.$refs.editors.onInsertUrl('<p>123</p>')
            this.dialogVisible = false
        },
        handleSuccess (file) {
            this.fileprogress = false
            // TODO：由于后端业务错误返回200，通过code判断异常
            if (file.code !== 200) {
                this.$confirm(file.message, '提示信息').catch(() => { })
            } else {
                this.uploadedUrl = file.data.accessUrl
            }
        },
        handleError () {
            this.$confirm('服务端异常', '提示信息').catch(() => { })
        },
        handleUpload () {

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
    z-index: 999999 !important;
}
</style>
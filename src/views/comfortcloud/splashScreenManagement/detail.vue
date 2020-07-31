<template>
    <div class="page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>APP闪屏管理</span>
        </div>
        <div class="page-body-cont">
            <el-form ref="smartPlayForm" :model="smartPlayForm" :rules="rules" label-width="110px">
                <el-form-item label="标题：" prop="title">
                    <el-input v-model.trim="smartPlayForm.title" show-word-limit placeholder="输入标题" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="闪屏图片：" prop="iconUrl" ref="iconUrl">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="smartPlayForm.iconUrl" ref="uploadImg" @back-event="readUrl" :imgW="300" :imgH="100" />
                    <div class="upload-tips">
                        建议尺寸：993*993或1:1比例图片，1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item label="跳转活动：" prop="title">
                    <el-input v-model.trim="smartPlayForm.title" show-word-limit placeholder="输入跳转活动" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSaveSmartPlay" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { createCloudSmartPlay, updateCloudSmartPlay } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'smartPlayEdit',
    data () {
        return {
            smartPlayForm: {
                content: '',
                effectiveTime: '',
                iconUrl: '',
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
                    { required: true, message: '请输入玩法标题', trigger: 'blur' }
                ],
                iconUrl: [
                    { required: true, message: '请选择列表图片' }
                ],
                effectiveTime: [
                    { required: true, message: '请选择生效时间', trigger: 'blur' }
                ],
                content: [
                    {
                        validator: (rule, value, callback) => {
                            if (value.length <= 0 || value === '<p><br></p>') {
                                return callback(new Error('请输入玩法'))
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
            cloudSmartPlayPostDetail: 'cloudSmartPlayPostDetail'
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
            return this.smartPlayForm.logoUrl
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
        'smartPlayForm.iconUrl' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['iconUrl'].clearValidate()
            })
        }
    },
    mounted () {
        if (this.$route.query.id) {
            this.getActivityDetail(this.$route.query.id)
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags',
            findCloudSmartPlayPostDetail: 'findCloudSmartPlayPostDetail'
        }),
        readUrl (val) {
            this.smartPlayForm.iconUrl = val.imageUrl
        },

        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/comfortCloud/operationsManagement/smartPlay')
        },
        async getActivityDetail (id) {
            await this.findCloudSmartPlayPostDetail(id)
            this.cloudSmartPlayPostDetail.effectiveTime = this.$root.$options.filters.formatDate(this.cloudSmartPlayPostDetail.effectiveTime, 'YYYY-MM-DD HH:mm:ss')
            this.smartPlayForm = { ...this.cloudSmartPlayPostDetail }
        },
        onSaveSmartPlay () {
            this.loading = true
            this.$refs['smartPlayForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        console.log('success')
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
</style>

<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="cloudForm" :model="cloudForm" :rules="rules" label-width="110px">
                <div class="page-body-title">
                    <h3>问题管理</h3>
                </div>
                <el-form-item label="问题标题：" prop="title">
                    <el-input v-model.trim="cloudForm.title" show-word-limit placeholder="请输入问题标题" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <!--<el-form-item label="列表图片：" prop="picture" ref="picture">
                    &lt;!&ndash;logoUrl&ndash;&gt;
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="cloudForm.picture" ref="uploadImg" @back-event="readUrl" :imgW="300" :imgH="100" />
                    <div class="upload-tips">
                        &lt;!&ndash; 尺寸300x100,仅支持 gif、 jpeg、 png、 bmp 4种格式, 大小不超过3MB &ndash;&gt;
                        建议尺寸：993*426，1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>-->
                <!--<el-form-item label="生效时间：" prop="effectiveTime">
                    <el-date-picker type="datetime" v-model="cloudForm.effectiveTime" :clearable=false placeholder="生效时间" value-format='yyyy-MM-dd HH:mm:ss' :picker-options="pickerOptionsStart">
                    </el-date-picker>
                </el-form-item>-->
                <el-form-item label="目录选择：" prop="listSelect">
                    <el-cascader
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <!--<div class="page-body-title">
                    <h3>活动详情</h3>
                </div>-->
                <el-form-item label="详情：" prop="detail">
                    <!--<el-button type="primary" icon="el-icon-video-camera-solid" @click="onAddvideo">插入视频</el-button>-->
                    <RichEditor @blur="$refs['cloudForm'].validateField('detail')" tabindex="0" hidefocus="true" ref="editors" v-model="cloudForm.detail" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="outline: 0;margin-bottom: 12px;width:100%"></RichEditor>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSaveact()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--<el-dialog title="上传视频" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal=false>
            <div style="display:flex;margin:20px auto;height:100px;justify-content: center;">
                <SingleUpload sizeLimit='10M' :upload="videoUpload" :imageUrl="videoimageUrl" ref="video" @back-event="videoUrl" :imgW="200" :imgH="100" />
            </div>
            <p style="text-align:center">仅支持 MP4 格式, 大小不超过10 MB</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onInsertVideo">确 定</el-button>
            </span>
        </el-dialog>-->
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
            selectedOptions:[],
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }],
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
                listSelect:[
                    { required: true, message: '请选择目录', trigger: 'blur' }
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
            this.$refs.editors.onInsertUrl(`</br><video src="${this.uploadedUrl}"  poster="" controls controlsList="nofullscreen nodownload noremote footbar" width="450" height="300" style="border:1px solid #f5f5f5;"></video></br>`)
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
        },
        handleChange(){

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

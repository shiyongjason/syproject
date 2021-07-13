<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item label="落地页名称：" prop="roomName">
                    <el-input v-model.trim="form.roomName" show-word-limit placeholder="请输入" maxlength='20' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="直播间ID：" prop="roomId">
                    <el-select clearable v-model="form.roomId" placeholder="请选择">
                        <el-option v-for="item in options" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌logo：" prop="brandLogoUrl" ref="brandLogoUrl">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="form.brandLogoUrl" ref="uploadImg" @back-event="readUrl" :imgW="100" :imgH="100" />
                    <div class="upload-tips">建议尺寸：4:3比例图片，1M以内，支持jpeg,png和jpg格式</div>
                </el-form-item>
                <el-form-item label="品牌视频：" prop="brandVideoUrl" ref="brandVideoUrl">
                    <el-row>
                        <SingleUpload sizeLimit='100M' :upload="videoUpload" :imageUrl="videoimageUrl" @back-event="videoUrl" :imgW="100" :imgH="100">
                        </SingleUpload>
                        <h-button v-if="form.brandVideoUrl" type="primary" @click="palyVideo">视频预览</h-button>
                        <div class="upload-tips">
                            建议尺寸：支持 MP4格式, 大小不超过100M
                            视频尺寸16:9，视频长度建议不超过60秒
                        </div>
                    </el-row>
                </el-form-item>

                <div class="page-body-title">
                    <h3>产品介绍图：</h3>
                </div>
                <el-form-item label="详情：" prop="productIntroduc">
                    <RichEditor :height="500" :menus="menus" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" :uploadImgServer="uploadImgServer" @change="$refs['form'].validateField('productIntroduc')" @blur="$refs['form'].validateField('productIntroduc')" hidefocus="true"
                        ref="editors" style="outline: 0;margin-bottom: 12px;width:100%" tabindex="0" v-model="form.productIntroduc"></RichEditor>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="onSaveTemp()">保存模板</el-button>
                    <el-button @click="onPreview()">预览</el-button>
                    <el-button type="primary" @click="onSave" :loading="loading">{{ loading ? '提交中 ...' : '保存并启用' }}</el-button>
                    <el-button @click="onBack()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog width="600px" title="视频播放" @close="closePlayDialog" :visible.sync="innerVisible" append-to-body>
            <Video ref="videoPlay" :src="form.brandVideoUrl" class="avatarVideo" controls="controls">您的浏览器不支持视频播放
            </Video>
        </el-dialog>
        <el-drawer title="预览" :visible.sync="drawer" direction="rtl" :before-close="()=>{this.drawer = false}">
            <div class="player_wrap">
                <div class="player_wrap-box">

                    <div class="player_wrap-tit">{{form.roomName}}</div>
                    <div class="playr_videos">
                        <Video ref="videoPlay" :src="form.brandVideoUrl" class="player_video" muted=true loop=true autoplay=true controls="controls" controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true">您的浏览器不支持视频播放
                        </Video>
                    </div>
                    <div class='live'>
                        <div class='live-pic'>
                            <img class='live-pic-img' src='https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png' />
                            <div class='live-pic-status'>
                                <span class='status-container-title status-container-orange'>直播状态</span>
                            </div>
                        </div>
                        <div class='live-detail'>
                            <div class='live-detail-title'>直播间介绍</div>
                            <div class='live-detail-goods'>
                                <div class="live-detail-goods-item">
                                    <img class='live-detail-goods-item-img' src='https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png' />
                                    <div class='live-detail-goods-item-count'>
                                        +1
                                    </div>
                                </div>
                                <div class="live-detail-goods-item">
                                    <img class='live-detail-goods-item-img' src='https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20210706/356a3aec-5c8e-47df-941a-91a222fe9e07.png' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="player_wrap-main" v-html="form.productIntroduc">
                    </div>
                </div>
            </div>
        </el-drawer>

    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import * as Api from './api'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'playeredit',
    data () {
        return {
            drawer: false,
            options: [],
            form: {
                brandLogoUrl: '',
                brandVideoUrl: '',
                productIntroduc: '',
                roomId: '',
                roomName: ''
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
                roomName: [
                    { required: true, message: '请输入落地页名称', trigger: 'blur' }
                ],
                roomId: [
                    { required: true, message: '请选择直播房间ID', trigger: 'change' }
                ],
                brandLogoUrl: [
                    { required: true, message: '请上传品牌logo', trigger: 'change' }
                ],
                brandVideoUrl: [
                    { required: true, message: '请上传品牌视频', trigger: 'change' }
                ],
                productIntroduc: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            console.log(value)
                            if (value.length <= 0 || value === '<p><br></p>') {
                                return callback(new Error('请输入产品介绍图'))
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
    watch: {
        'form.brandLogoUrl' (val) {
            if (val) {
                this.$nextTick(() => {
                    this.$refs['brandLogoUrl'].clearValidate()
                })
            }
        },
        'form.brandVideoUrl' (val) {
            if (val) {
                this.$nextTick(() => {
                    this.$refs['brandVideoUrl'].clearValidate()
                })
            }
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
        }
    },
    async mounted () {
        if (this.$route.query.id) {
            this.getDetail(this.$route.query.id)
        }
        const { data } = await Api.getRooms()
        this.options = data
        this.$refs['form'].clearValidate()
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        async getDetail (id) {
            const { data } = await Api.findLiveInfo(this.$route.query.id)
            this.form = { ...data }
            if (this.form.brandVideoUrl) {
                this.videoimageUrl = 'https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20210706/356a3aec-5c8e-47df-941a-91a222fe9e07.png'
            }
        },
        onPreview () {
            this.drawer = true
            this.$nextTick(() => {
                // 调整音量为0
                this.$refs.videoPlay.volume = 0
            })
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/goodwork/liveplayer')
        },

        onSave () {
            // 保存启用
            this.loading = true
            this.form.operator = this.userInfo.employeeName
            if (this.$route.query.id) {
                this.form.id = this.$route.query.id
            }
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try {
                        if (this.$route.query.id) {
                            await Api.enableLiveInfoPut(this.form)
                            this.$message.success('修改成功')
                        } else {
                            await Api.enableLiveInfo(this.form)
                            this.$message.success('创建成功')
                        }
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/goodwork/liveplayer')

                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        async onSaveTemp () {
            // if (!this.form.roomName) {
            //     this.$message.warning('落地页名称必填')
            //     return
            // }
            try {
                if (this.$route.query.id) {
                    await Api.addLiveInfoPut(this.form)
                    this.$message.success('修改成功')
                } else {
                    await Api.addLiveInfo(this.form)
                    this.$message.success('创建成功')
                }
                this.setNewTags((this.$route.fullPath).split('?')[0])
                this.$router.push('/goodwork/liveplayer')
                this.loading = false
            } catch (error) {
                this.loading = false
            }
        },
        readUrl (val) {
            this.form.brandLogoUrl = val.imageUrl
        },
        videoUrl (val) {
            if (val.imageUrl) {
                this.$message.success('视频上传成功')
                this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'
            } else {
                this.$message.success('视频删除成功')
                this.videoimageUrl = ''
            }
            this.form.brandVideoUrl = val.imageUrl
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
.player_wrap {
    width: 350px;
    margin: 0 auto;
    width: 350px;
    height: 700px;
    background: transparent url("../../../assets/images/iPhoneX_model.png")
        no-repeat scroll center center;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px 10px 0px 20px;
    &-box {
        height: 610px;
        overflow-y: scroll;
    }
    &-tit {
        font-size: 16px;
        text-align: center;
    }
    &-main {
        background: #ffffff;
        border-radius: 2px;
        width: 310px;
        margin: 10px auto;
        box-sizing: border-box;
        /deep/ img {
            max-width: 100% !important;
        }
    }
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
    width: 400px;
    height: 300px;
    display: block;
    margin: 0 auto;
}
.player_video {
    width: 310px;
    height: 200px;
    display: block;
    margin: 10px auto;
}
.live {
    border-radius: 4px;
    overflow: hidden;
    background: white;
    display: flex;
    flex-direction: row;
    width: 310px;
    margin: 0 auto;
    height: 140px;
    &-pic {
        width: 150px;
        height: 100%;
        position: relative;
        &-img {
            width: 100%;
            height: 100%;
            border-radius: 4px 0 0 4px;
        }
        &-status {
            position: absolute;
            left: 6px;
            top: 6px;
        }
    }

    &-detail {
        flex: 1;
        margin: 6px 8px 4px 12px;
        display: flex;
        flex-direction: column;
        &-title {
            font-size: 15px;
            font-weight: 500;
            color: #333333;
        }

        &-goods {
            margin-top: 45px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            &-item {
                position: relative;
                margin-right: 12px;
                width: 50px;
                height: 50px;
                &-img {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                }

                &-count {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    background: #00000044;
                    font-size: 18px;
                    color: white;
                    line-height: 50px;
                    text-align: center;
                }
            }
        }
    }
    .status-container {
        height: 18px;
        border-radius: 9px;
        padding: 0 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-dot {
            width: 4px;
            height: 4px;
            background: #ffffff;
            border-radius: 4px;
            margin-right: 4px;
        }

        &-gray {
            background: #00000080;
        }

        &-orange {
            background: #fd9212;
        }

        &-title {
            font-size: 10px;
            font-weight: 400;
            color: #ffffff;
            line-height: 18px;
            text-align: center;
            white-space: nowrap;
            padding: 0 10px;
            z-index: 100;
            border-radius: 10px;
        }
    }
}
</style>

<template>
    <div class="default-upload-warp">
        <template v-if="showPreView&&!showAsFileName">
            <template v-for="(item,index) in fileList" >
                <div class="default-pre-view" :key="index">
                    <div class="default-pre-view-warp" >
                    <div class="default-pre-view-mask" >
                        <i class="el-icon-zoom-in" style="color:#fff" @click="open(index)"></i>
                        <i class="el-icon-delete-solid" style="color:#fff" @click="remove(index)"></i>
                    </div>
                    </div>
                    <!-- TODO:在tab切换存在一开始有数据，图片渲染不出来情况 暂时父组件用v-if控制-->
                    <el-image :ref="`preview_${index}`" :lazy="true" class="default-pre-view-image" fit="contain" :src="item.fileUrl" :preview-src-list="previewSrcList"></el-image>
                </div>
            </template>
        </template>
        <template v-if="showAsFileName">
            <span v-for="(item,index) in fileList" :key="index" class="posrtv">
                <template v-if="item&&item.fileUrl">
                    <i class="el-icon-document"></i>
                    <a :href="item.fileUrl" target="_blank">
                        <font >{{item.fileName}}</font>
                    </a>
                    <div class="abs">
                        <i class="el-icon-circle-close" @click="remove(index)"></i>
                    </div>
                </template>
            </span>
        </template>
        <div class="elupload" v-loading='loading' :class="haveslot?'haveslot':''">
            <el-upload v-if="fileList.length<fileNum" v-bind="$attrs" v-on="$listeners" drag ref="elUpload" :multiple='multiple' name='multiFile' :data='uploadParameters' :showFileList='showFileList' :disabled='disabled' :action='action' :limit='limit' :on-exceed="onExceed" :on-remove="handleRemove" :on-success="handleSuccess" :on-change="handleCheckedSize" :before-upload="beforeAvatarUpload" :on-progress="uploadProcess" :accept='accept' :on-error='handleError'>
                <!-- 默认插槽 -->
                <slot>
                    <div class="default-upload">
                        <div class="default-upload-icon">
                            <i class="el-icon-upload"></i>
                            <span>点击或拖拽到这上传</span>
                            <span v-if="multiple" style="margin-top:3px">（支持多图）</span>
                        </div>
                    </div>
                </slot>
                <!-- 提示说明文字 -->
                <slot name="tip"></slot>
                <!-- 上传进度 -->
                <!-- <el-progress v-if="progressFlag&&showProgress" type="dashboard" :percentage="uploadPercent" :width='110' :stroke-width="5" color="#FF7A45" class="uploadprogress"></el-progress> -->
            </el-upload>

        </div>
        <el-dialog title="提示" :visible.sync="deleteVisible" width="500px" class="deldialog">
            <span>您确定删除这一条数据吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="doRemove">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HosJoyUpload',
    props: {
        value: Array, // 双向绑定的list
        limit: { type: Number, default: 1000 }, // 最大允许上传个数
        disabled: { type: Boolean, default: false }, // 是否禁用
        multiple: { type: Boolean, default: true }, // 是否支持多图上传
        uploadParameters: { type: Object, default () { return {} } }, // 上传时附带的额外参数同el-upload 的 data
        showPreView: { type: Boolean, default: true }, // 是否展示上传的图片
        showFileList: { type: Boolean, default: false }, // 是否显示已上传文件列表
        action: { type: String, default: '' }, // 上传的地址
        fileSize: { type: Number, default: 100 }, // 限制文件大小
        showAsFileName: { type: Boolean, default: false }, // 文件名形式显示
        showProgress: { type: Boolean, default: false },
        fileNum: { type: Number, default: 100 }, // 限制文件总数
        accept: { type: String, default: '.jpg,.jpeg,.png,.pdf,.word,.xsl,.xlsx,.ppt,.zip,.rar' } // 上传的类型

    },
    // components: { hosjoyListPreView },
    data () {
        return {
            isBeyond: true,
            haveslot: false,
            deleteVisible: false,
            index: '',
            progressFlag: false,
            uploadPercent: null,
            loading: false,
            activeIndex: -1,
            previewSrcList: []
        }
    },
    computed: {
        fileList: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        handleError (err) {
            // console.log(JSON.parse(err.message))
            let errMessage = (JSON.parse(err.message)).message || ''
            this.$message.error(`上传失败：` + errMessage)
            this.progressFlag = false
            this.loading = false
        },
        uploadProcess (event, file, fileList) {
            this.loading = true
            this.progressFlag = true
            this.uploadPercent = Math.floor(event.percent)
        },
        handleSuccess (response, file, fileList) {
            let obj = {
                fileName: response.data.fileName,
                fileUrl: response.data.accessUrl
            }
            if (typeof obj === 'object') {
                setTimeout(() => {
                    let temp = []
                    temp.push(obj)
                    // fix add 'empty'
                    temp.filter(item => {
                        return (typeof item === 'object')
                    })
                    temp.map(item => {
                        if (this.fileList.length < this.fileNum) {
                            this.fileList.push(item)
                        } else {
                            this.$message.error(`上传数量超出限制！最大个数：${this.fileNum}`)
                        }
                    })
                    this.uploadPercent = 100
                    this.progressFlag = false
                    this.loading = false
                    this.$emit('successCb')
                }, 500)
            }
        },
        doRemove () {
            this.fileList.splice(this.index, 1)
            this.$set(this, 'fileList', this.fileList)
            this.deleteVisible = false
        },
        remove (index) {
            this.deleteVisible = true
            this.index = index
        },
        handleRemove (file, fileList) {
            if (file.response && file.response.data) {
                let index = this.fileList.indexOf(file.response.data.accessUrl)
                this.doRemove(index)
            }
        },
        onExceed (files, fileList) {
            this.$message.error(`一次性上传数量超出限制！最大允许上传个数：${this.limit}`)
        },
        handleCheckedSize (files, fileList) {
            this.isBeyond = true
            // 判断是否符合要求
            if (files.size / (1024 * 1024) < this.fileSize) {
                this.isBeyond = false
            } else {
                this.isBeyond = true
            }
        },
        getFileType (file) {
            let startIndex = file.lastIndexOf('.')
            if (startIndex != -1) {
                return file.substring(startIndex + 1, file.length).toLowerCase()
            } else {
                return ''
            }
        },
        beforeAvatarUpload (file) {
            let arr = this.accept.split(',')
            let flag = false
            arr.map(item => {
                if (item === `.${this.getFileType(file.name)}`)flag = true
            })
            if (!flag) {
                this.$message.error(`上传错误，暂不支持${file.name.split('.')[1]}格式上传`)
                return false
            }
            if (this.isBeyond) {
                this.$message.error(`上传错误，文件不要超过${this.fileSize}M`)
                return false
            }
        },
        open (index) {
            let temp = this.fileList[index]
            let tempArr = JSON.parse(JSON.stringify(this.fileList))
            tempArr.splice(index, 1)
            tempArr.unshift(temp)
            this.previewSrcList = tempArr.map(item => {
                return item.fileUrl
            })
            const pre = this.$refs[`preview_${index}`]
            if (pre && pre[0]) {
                pre[0].clickHandler()
            }
        }
    },
    mounted () {
        if (this.$slots.default) {
            this.haveslot = true// 此块为了去掉自定义的默认全局样式
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/.el-loading-spinner .circular{width:33px;height:33px}
/deep/.uploadprogress{ position: absolute;top:5px;left:10px}
/deep/.deldialog .el-dialog__body {
    min-height: 100px;
    font-size: 16px;
    padding-top: 20px;
}
.haveslot{line-height: normal !important;height: auto !important;margin-top:0 !important}
/deep/.haveslot .el-upload-dragger {
    background: none !important;
    border-radius: 0 !important;
    border: none !important;
    text-align: left !important;
    width: auto !important;
    height: auto !important;
}
/deep/.el-upload-dragger {
    width: 130px;
    height: 120px;
    border-radius: 6px;
    background: rgba(250, 250, 250, 1);
    border: 1px dashed #c0ccda;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    overflow: hidden;
}
/deep/.el-upload-dragger .el-icon-upload {
    margin: -10px 0 0 0;
}
/deep/.default-upload-warp .el-upload-dragger {
    width: 130px;
    height: 120px;
    border-radius: 6px;
    background: rgba(250, 250, 250, 1);
    border: 1px dashed #c0ccda;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    overflow: hidden;
}
/deep/.default-upload-warp .el-upload-dragger .el-icon-upload {
    margin: -10px 0 0 0;
}
.default-upload-warp {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.default-upload {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    &-icon {
        i {
            font-size: 30px;
        }
        span {
            font-size: 12px;
            display: block;
            line-height: 1;
            color: #b1b2b5;
            margin-top: -6px;
        }
    }
    &-word {
        margin: 15px;
        h3 {
            font-family: HiraginoSansGB;
            font-weight: normal;
            color: rgba(48, 49, 51, 1);
            line-height: 24px;
        }
        span {
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 24px;
        }
    }
}

.posrtv{ position: relative;margin-right: 15px;color: #FF7A45;}
.posrtv a{ color: #FF7A45;margin-left: 10px}
.abs{
        position: absolute; right: -11px;top:-7px;display: none;
        i{font-size: 18px;color: #5d5d5d;cursor: pointer;}
    }
.posrtv:hover .abs{display:block}
.default-pre-view {
    display: flex;
    flex-wrap: wrap;
    margin-right: 8px;
    margin-top: 13px;
    &-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
        width: 120px;
        height: 120px;
        border-radius: 6px;
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;
        i {
            font-size: 21px;
            padding: 9px;
        }
        opacity: 0;
    }
    &-mask:hover {
        cursor: pointer;
        opacity: 1;
    }
    &-image {
        width: 120px;
        height: 120px;
        background-color: #fafafa;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
    }
}
.elupload{overflow: hidden;height: 120px;margin-top: 13px;}
</style>
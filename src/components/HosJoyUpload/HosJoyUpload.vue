<template>
    <div class="default-upload-warp">
        <template v-if="showPreView&&!showAsFileName">
            <template v-for="(item,index) in fileList" >
                <div class="default-pre-view" :key="index">
                    <div class="default-pre-view-warp" >
                    <div class="default-pre-view-mask" >
                        <i class="el-icon-zoom-in" style="color:#fff" @click="open(index,item)"></i>
                        <i class="el-icon-delete-solid" style="color:#fff" @click="remove(index)"></i>
                    </div>
                    </div>
                    <!-- TODO:在tab切换存在一开始有数据，图片渲染不出来情况 暂时父组件用v-if控制-->
                    <div class="pdfimg"  v-if="(item.fileUrl).indexOf('.pdf') != -1">
                        <img :src="pdfbase">
                    </div>
                    <el-image v-else :ref="`preview_${index}`" :lazy="true" class="default-pre-view-image" fit="contain" :src="item.fileUrl" :preview-src-list="previewSrcList"></el-image>
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
        <el-dialog title="提示" :visible.sync="deleteVisible" width="500px" class="deldialog"  :modal=false>
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
        accept: { type: String, default: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.zip,.rar' } // 上传的类型

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
            previewSrcList: [],
            pdfbase: 'data:image/png;base64,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'
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
        open (index, item = null) {
            if ((item.fileName).indexOf('.pdf') != -1) {
                window.open(item.fileUrl)
                return
            }
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
.pdfimg{width: 130px;height: 120px;text-align: center;display: flex;align-items: center;justify-content: center;}
.pdfimg img{width: 76%}
.el-dialog__wrapper{
    z-index: 12000 !important;
}
</style>
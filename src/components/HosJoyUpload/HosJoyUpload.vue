<template>
    <div class="default-upload-warp">
        <div class="default-pre-view" v-if="showPreView&&!showAsFileName">
            <hosjoy-list-pre-view :fileList="fileList" v-if="fileList.length>0" @remove="remove" />
        </div>
        <div class="filename" v-if="showAsFileName">
            <span v-for="(item,index) in fileNameList" :key="index" class="posrtv">
                <template v-if="item&&item.url">
                    <i class="el-icon-document"></i>
                    <a :href="item.url" target="_blank">
                        <font >{{item.name}}</font>
                    </a>
                    <div class="abs">
                        <i class="el-icon-circle-close" @click="remove(index)"></i>
                    </div>
                </template>
            </span>
        </div>
        <div class="elupload" :class="haveslot?'haveslot':''">
            <el-upload v-bind="$attrs" v-on="$listeners" drag ref="elUpload" :multiple='multiple' name='multiFile' :data='uploadParameters' :showFileList='showFileList' :disabled='disabled' :action='action' :limit='limit' :on-exceed="onExceed" :on-remove="handleRemove" :on-success="handleSuccess" :on-change="handleCheckedSize" :before-upload="beforeAvatarUpload" :on-progress="uploadProcess">
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
                <el-progress v-if="progressFlag" type="dashboard" :percentage="uploadPercent" :width='110' :stroke-width="5" color="#FF7A45" class="uploadprogress"></el-progress>
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
import hosjoyListPreView from './hosjoyListPreView'

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
        showAsFileName: { type: Boolean, default: false } // 是否支持多图上传
    },
    components: { hosjoyListPreView },
    data () {
        return {
            isBeyond: true,
            haveslot: false,
            deleteVisible: false,
            index: '',
            progressFlag: false,
            uploadPercent: null
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
        },
        fileNameList: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        uploadProcess (event, file, fileList) {
            this.progressFlag = true
            this.uploadPercent = Math.floor(event.percent)
        },
        handleSuccess (response, file, fileList) {
            let obj = {
                name: response.data.fileName,
                url: response.data.accessUrl
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
                        this.fileNameList.push(item)
                    })
                    this.uploadPercent = 100
                    this.progressFlag = false
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
            this.$message.error('上传数量超出限制！')
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
        beforeAvatarUpload (file) {
            if (this.isBeyond) {
                this.$message.error(`建议不要超过${this.fileSize}M`)
                return false
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
/deep/.uploadprogress{ position: absolute;top:5px;left:10px}
/deep/.deldialog .el-dialog__body {
    min-height: 100px;
    font-size: 16px;
    padding-top: 20px;
}
.haveslot{line-height: normal !important;}
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
.filename{
    color: #6e6f73;
    display: flex;
    span{
            display: flex;
            align-items: center;
            margin-right: 15px;
        i {
            font-size: 21px;
            font-weight: bold;
        }
        a {color: #6e6f73; margin-left: 10px}
    }
    .posrtv{ position: relative;}
    .abs{
        position: absolute; right: -11px;top:-7px;display: none;
        i{font-size: 18px;color: #5d5d5d;cursor: pointer;}
    }
    .posrtv:hover .abs{display:block}

}
</style>
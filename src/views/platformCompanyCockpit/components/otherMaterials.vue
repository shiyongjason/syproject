<template>
    <div class="otherFiles">
        <!-- 投资履约担保函归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">其他材料归档：</span>
            </template>
            <hosjoyUpload v-if="isEdit" v-model="otherFiles.fileList" showAsFileName :fileSize='100' :fileNum='100' :action='action' :uploadParameters='uploadParameters' @successCb="onSuccessCb('fileList','d-other')">
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
            <div class="filename" v-else>
                    <span v-if="otherFiles.fileList.length===0">-</span>
                    <template v-else>
                        <div class="fileItem" v-for="(item,index) in otherFiles.fileList" :key="index" >
                            <span class="posrtv">
                                <template v-if="item&&item.fileUrl">
                                    <i class="el-icon-document"></i>
                                    <a :href="item.fileUrl" target="_blank">
                                        <font>{{item.fileName}}</font>
                                    </a>
                                </template>
                            </span>
                            <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="getUrlBase64(item.fileUrl, item.fileName)">下载</font>
                            <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                        </div>
                    </template>
                </div>
        </el-form-item>
    </div>
</template>

<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'

export default {
    name: 'otherFiles',
    props: ['value', 'isEdit'],
    components: { hosjoyUpload },
    data () {
        return {
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        otherFiles () {
            return this.value
        }
    },
    methods: {
        getUrlBase64 (url, fileName, ext = '') {
            let _this = this
            var canvas = document.createElement('canvas') // 创建canvas DOM元素
            var ctx = canvas.getContext('2d')
            var img = new Image()
            img.setAttribute('crossOrigin', 'anonymous')
            img.src = url + '?time=' + new Date().valueOf()
            img.onload = function () {
                canvas.height = img.height // 指定画板的高度,自定义
                canvas.width = img.width // 指定画板的宽度，自定义
                ctx.drawImage(img, 0, 0) // 参数可自定义
                var dataURL = canvas.toDataURL('image/' + ext) // 传递的自定义的参数
                canvas = null
                var downDom = document.createElement('a') // 创建DOM元素
                downDom.setAttribute('href', dataURL)
                downDom.setAttribute('download', fileName)
                console.log(downDom)
                _this.$nextTick(() => {
                    downDom.click()
                })
            }
        },
        onSuccessCb (key, str) {
            this.otherFiles[key].map(item => {
                this.$set(item, 'docType', str)
            })
        }
    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
    }
}
</script>

<style scoped lang='scss'>
/deep/.el-input-group__append{ color:#909399}
.otherFiles {
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
.labeldiy{ color: #000; font-weight:bold;}
.filename{
    color: #6e6f73;
    span{
            display: flex;
            align-items: center;
            margin-right: 15px;
        i {
            font-size: 21px;
            font-weight: bold;
        }
        a {color: #FF7A45; margin-left: 10px}
    }
    .posrtv{ position: relative;color: #FF7A45;}
}
.fileItem{ display: flex;justify-content: space-between;align-items: center;}
.fileItemDownLoad{font-size: 12px;border-radius: 3px;padding: 8px 16px;color: #fff;background-color: #ff7a45;border-color: #ff7a45;display:block;line-height: 13px;float: right;height: 13px; cursor: pointer;}
</style>
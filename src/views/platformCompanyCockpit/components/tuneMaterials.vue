<template>
    <div class="tunematerials">
        <el-form-item>
            <template #label>
                <span class="labeldiy">尽调材料归档：</span>
            </template>
            <el-radio v-if="isEdit" v-model="platformBasicInfoPO.ddDocFlag" label="1">是</el-radio>
            <el-radio v-if="isEdit" v-model="platformBasicInfoPO.ddDocFlag" label="0">否</el-radio>
            <span v-else>{{platformBasicInfoPO.ddDocFlag==='1'?'是':platformBasicInfoPO.ddDocFlag==='0'?'否':'-'}}</span>
        </el-form-item>
        <el-form-item v-if="platformBasicInfoPO.ddDocFlag==='1'" label="尽调材料：">
            <hosjoyUpload :fileSize='100' :fileNum='100' v-if="isEdit" v-model="platformBasicInfoPO.dd" showAsFileName :action='action' :uploadParameters='uploadParameters'>
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
            <div class="filename" v-else>
                <span v-if="platformBasicInfoPO.dd.length===0">-</span>
                <template v-else>
                    <div class="fileItem" v-for="(item,index) in platformBasicInfoPO.dd" :key="index" >
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
    name: 'tuneMaterials',
    props: ['value', 'commonDocPOs', 'isEdit'],
    components: { hosjoyUpload },
    data () {
        return {
            loading: false,
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
        platformBasicInfoPO () {
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
        }
    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
    }
}
</script>

<style scoped lang='scss'>
.tunematerials{
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
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
.labeldiy{ color: #000; font-weight:bold;}
</style>
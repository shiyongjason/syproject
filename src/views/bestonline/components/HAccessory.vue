<template>
    <div class="jd-manage">
        <el-collapse
            v-model="activeName"
            accordion
        >
            <el-collapse-item name="1">
                <template slot="title">
                    <p class="titlt-p">附件上传</p>
                </template>
                <!--start-->
                <p class="small-title">已上传附件</p>
                <div v-if="tableList.length === 0">暂无附件</div>
                <div
                    v-else
                    class="upload"
                    v-for="(item,index) in tableList"
                    :key="index"
                >
                    <span>{{item.fileName}}</span> <span>{{item.createUser}} {{item.createTime}}</span> <span> <a :href="item.fileUrl" target="_blank">下载</a></span>
                </div>
                <p class="small-title ">附件上传</p>
                <div>
                    <el-upload
                        class="upload-demo"
                        v-bind="uploadInfo"
                        :on-success="handleSuccess"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        :on-change = "handleCheckedSize"
                         :before-upload= "handleUpload"
                    >
                        <el-button
                            size="small"
                            type="primary"
                        >点击上传</el-button>
                        <div
                            slot="tip"
                            class="el-upload__tip"
                        >附件格式除视频类的、录音类的暂时不需支持外，其他附件格式都支持。常见的一些附件格式：jpg,jpeg,png,pdf,word,xsl,xlsx,ppt,zip,rar,必须支持,附件每个大小限制10M以内</div>
                    </el-upload>
                </div>
                <!--end-->
            </el-collapse-item>
        </el-collapse>
        <div class="flex-wrap-row top20 ">
            <el-col
                :span="2"
                :offset="8"
            >
                <el-button
                    type="primary"
                    @click="onSvaeattach"
                >提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { FileUploadUrl } from '@/api/config'
import { addAttach, getAttach } from '../api/index'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            activeName: '1',
            fileList: [],
            arrList: [],
            applyId: '',
            createUser: '',
            dueAttachCreateFormList: [],
            tableList: [],
            type: 0,
            is10M: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadInfo () {
            return {
                action: FileUploadUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.name
                },
                accept: '.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.xlsx,.xls,.ppt,.doc,.docx,.rar,.zip',
                name: 'multiFile'
            }
        }
    },
    mounted () {
        this.applyId = this.$route.query.applyId
        this.getAttach(this.applyId)
    },
    methods: {
        // handleRemove (file, fileList) {
        //     console.log(file, fileList)
        // },
        handleSuccess (file) {
            // console.log(file)
            if (file.code !== 200) {
                this.$confirm(file.message, '提示信息').catch(() => { })
            } else {
                let uploadedUrl = file.data.accessUrl
                let name = file.data.fileName
                let fileId = file.data.fileCode
                this.arrList.push({ fileUrl: uploadedUrl, fileName: name, fileId })
            }
        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        beforeRemove (file, fileList) {
            if (this.type === 1) {
                return true
            }
            return this.$confirm(`确定移除 ${file.name}？`).then(() => {
                this.arrList.map((item, index) => {
                    if (item.fileId === file.response.data.fileCode) {
                        this.arrList.splice(index, 1)
                    }
                })
            }).catch(() => {})
        },
        handleCheckedSize (input, inputList) {
            // 判断是否符合要求
            if (input.size / (1024 * 1024) < 10) {
                this.is10M = false
            } else {
                this.is10M = true
            }
        },
        handleUpload (file) {
            // TODO: 目前只有一个文件,待优化
            if (this.is10M) {
                this.$message({
                    message: '建议不要超过10M',
                    type: 'warning'
                })
                return false
            }
        },
        async   getAttach () {
            const { data } = await getAttach(this.applyId)
            this.tableList = data.data.pageContent
        },
        async onSvaeattach () {
            const formData = {
                applyId: this.applyId,
                createUser: this.userInfo.name,
                dueAttachCreateFormList: this.arrList
            }
            if (this.arrList.length !== 0) {
                await addAttach(formData)
                this.getAttach(this.applyId)
                this.type = 1
                var e = document.createEvent('MouseEvents')
                e.initEvent('click', true, true) // 这里的click可以换成你想触发的行为
                for (let i = 0; i < this.arrList.length; i++) {
                    document.getElementsByClassName('el-icon-close')[i].dispatchEvent(e) // 这里的clickME可以换成你想触发行为的DOM结点
                }
                this.arrList = []
                this.type = 0
                this.$message({
                    showClose: true,
                    message: '提交成功',
                    type: 'success'
                })
                return
            }
            this.$message({
                showClose: true,
                message: '附件为空',
                type: 'warring'
            })
        },
        linkurl (url) {
            this.downloadIamge(url, 'pic')
        },
        downloadIamge (imgsrc, name) { // 下载图片地址和图片名
            var image = new Image()
            // 解决跨域 Canvas 污染问题
            image.setAttribute('crossOrigin', 'anonymous')
            image.onload = function () {
                var canvas = document.createElement('canvas')
                canvas.width = image.width
                canvas.height = image.height
                var context = canvas.getContext('2d')
                context.drawImage(image, 0, 0, image.width, image.height)
                var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据

                var a = document.createElement('a') // 生成一个a元素
                var event = new MouseEvent('click') // 创建一个单击事件
                a.download = name || 'photo' // 设置图片名称
                a.href = url // 将生成的URL设置为a.href属性
                a.dispatchEvent(event) // 触发a的单击事件
            }
            image.src = imgsrc
        }
    }
}
</script>
<style lang="scss" scoped>
.upload {
    display: flex;
    margin-bottom: 10px;
    span {
        flex: 1;
        &:last-child {
            color: #c31313;
        }
    }
}
</style>

<template>
    <div class="jd-manage">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <p class="titlt-p">附件上传</p>
                </template>
                <!--start-->
                <p class="small-title">已上传附件</p>
                <div v-if="tableList.length === 0" class="noannex">暂无附件</div>
                <div v-else class="upload" v-for="(item,index) in tableList" :key="index">
                    <span>{{item.fileName}}</span>
                    <span>{{item.createUser}} {{item.createTime}}</span>
                    <span>
                        <span class="upload-delete" @click="onDeleteattach(item)">删除</span>
                        <a :href="item.fileUrl" target="_blank">下载</a>
                    </span>
                </div>
                <p class="small-title " v-if="roleType">附件上传</p>
                <div class="upload" v-if="roleType">
                    <el-upload class="upload-demo" v-bind="uploadInfo"
                    :multiple="true"
                    :on-success="handleSuccess" :before-remove="beforeRemove" :on-exceed="handleExceed" :file-list="fileList" :before-upload="handleUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">附件格式除视频类的、录音类的暂时不需支持外，其他附件格式都支持。常见的一些附件格式：jpg,jpeg,png,pdf,word,xsl,xlsx,ppt,zip,rar,必须支持,附件每个大小限制100M以内</div>
                    </el-upload>
                </div>
                <!--end-->
            </el-collapse-item>
        </el-collapse>
        <div class="flex-wrap-row" v-if="roleType">
            <el-col :span="2" :offset="8">
                <el-button type="primary" @click="onSvaeattach" v-if="hosAuthCheck(commitAuthCode)">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { addAttach, getAttach, deleteAttach } from '../api/index'
import { mapState } from 'vuex'
import { AUTH_BESTONLINE_REVIEW_UPLOAD_COMMIT } from '@/utils/auth_const'
export default {
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
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
            is10M: false,
            commitAuthCode: AUTH_BESTONLINE_REVIEW_UPLOAD_COMMIT
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
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
                this.type = 0
                return true
            }
            return this.$confirm(`确定移除 ${file.name}？`).then(() => {
                this.arrList.map((item, index) => {
                    if (item.fileId === file.response.data.fileCode) {
                        this.arrList.splice(index, 1)
                    }
                })
            }).catch(() => { })
        },
        handleUpload (file) {
            // TODO: 目前只有一个文件,待优化
            if (file.size / (1024 * 1024) > 100) {
                this.$message({
                    message: '附件要保持100M以内',
                    type: 'warning'
                })
                this.type = 1
                return false
            }
            const fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
            if (this.uploadInfo.accept.lastIndexOf(fileSuffix) == -1) {
                this.$message.error('格式不正确！')
                this.type = 1
                return false
            }
        },
        async getAttach () {
            const { data } = await getAttach(this.applyId)
            this.tableList = data.data.pageContent
        },
        async onDeleteattach (item) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteAttach(item.id)
                this.getAttach(this.applyId)
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                })
            }).catch(() => { })
        },
        async onSvaeattach () {
            const formData = {
                applyId: this.applyId,
                createUser: this.userInfo.employeeName,
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
                this.fileList = []
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
    margin-top: 10px;
    margin-bottom: 10px;
    span {
        flex: 1;
        &:last-child {
            color: #c31313;
        }
    }
    .upload-delete {
        margin-right: 20px;
        color: #F8B35A;
        cursor: pointer;
    }
}
.noannex {
    margin-top: 10px;
}
.small-title {
    padding: 10px 0;
}
.flex-wrap-row {
    margin-top: 20px;
}
</style>

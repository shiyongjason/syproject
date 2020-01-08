<template>
    <div class="flex-wrap-cont">
        <el-upload class="upload-demo"
        v-bind="uploadInfo"
        :show-file-list="false"
        :multiple="true"
        :limit="limit"
        :on-success="handleSuccess"
        :before-remove="beforeRemove"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-change="handleCheckedSize"
        :before-upload="handleUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <p style="line-height: 16px;color: #666666;margin-top: 10px">
                附件格式除视频类的、录音类的暂时不需支持外，其他附件格式都支持。常见的一些附件格式：jpg,jpeg,png,pdf,word,xsl,xlsx,ppt,必须支持,附件每个大小限制10M以内
            </p>
        </el-upload>
        <div>
            <div v-for="(v) in arrList" :key="v.url">
                <i class="el-icon-document upload-list-icon"></i>
                <span>{{v.name}}</span>
                <span class="clearfix fr">
                    <span class="upload-delete" @click.stop="customRemove(v)">删除</span>
                    <a :href="v.url" target="_blank">下载</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'applyUpload',
    props: {
        fileList: {
            type: Array,
            default: () => {
                return []
            }
        },
        arrList: {
            type: Array,
            default: () => {
                return []
            }
        },
        limit: {
            type: Number,
            default: 15
        }
    },
    data () {
        return {
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
                    updateUid: this.userInfo.name
                },
                accept: '.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.xlsx,.xls,.ppt,.doc,.docx,.rar,.zip',
                name: 'multiFile'
            }
        }
    },
    methods: {
        handleRemove (file, fileList) {
            const fileurl = file.response ? file.response.data.accessUrl : file.url
            let newarr = this.arrList && this.arrList.filter(value =>
                value.url !== fileurl
            )
            this.$emit('update:arrList', newarr)
            this.$emit('validate')
        },
        handleSuccess (file) {
            if (file.code !== 200) {
                this.$confirm(file.message, '提示信息').catch(() => {
                })
            } else {
                let uploadedUrl = file.data.accessUrl
                let name = file.data.fileName
                let newarr = this.arrList
                newarr.push({ url: uploadedUrl, name: name })
                this.$emit('update:arrList', newarr)
            }
            this.$emit('validate')
        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },

        // 自定义删除, 与beforeupload不符合条件删除做区别
        customRemove (file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`).then(() => {
                const fileurl = file.response ? file.response.data.accessUrl : file.url
                let newarr = this.arrList && this.arrList.filter(value =>
                    value.url !== fileurl
                )
                this.$emit('update:arrList', newarr)
                this.$emit('validate')
            })
        },

        beforeRemove (file, fileList) {

        },

        handleCheckedSize (input, inputList) {
            // 判断是否符合要求
            // if (input.size / (1024 * 1024) < 10) {
            //     this.is10M = false
            // } else {
            //     this.is10M = true
            // }
        },
        handleUpload (file) {
            const isLt20M = file.size / 1024 / 1024 < 10
            // TODO: 目前只有一个文件,待优化
            if (!isLt20M) {
                this.$message({
                    message: `${file.name}大小超过10M,建议不要超过10M`,
                    type: 'warning'
                })
                return false
            }
            return isLt20M
        }
    }
}
</script>
<style lang="scss" scoped>
    .upload-list-icon {
        margin: 0 7px 0 4px;
    }
    .upload-delete {
        margin-right: 20px;
        color: #F8B35A;
    }
    .upload-delete:hover {
        cursor: pointer;
    }
    .fr {
        float: right;
    }

</style>

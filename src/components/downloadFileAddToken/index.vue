<template>
    <a @click="handle" class="download-btn" target="_blank" v-if="isType === 'btn'">{{aLinkWords}}</a>
    <a @click="handle" class="download-main" target="_blank" v-else-if="isType === 'main'">{{aLinkWords}}</a>
    <a @click="handle" class="download-default" target="_blank" v-else-if="isType === 'default'">{{aLinkWords}}</a>
</template>

<script>
import OssFileUtils from '@/utils/OssFileUtils'
import { ossDownload } from '@/utils/utils'
import { ossAliyun, ossOldBucket } from '@/api/config'
// <downloadFileAddToken :file-name="item.fileName" :file-url="item.fileUrl" :a-link-words="item.fileName"></downloadFileAddToken>
export default {
    name: 'downloadFileAddToken',
    props: {
        fileUrl: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: false,
            default: '未知'
        },
        aLinkWords: {
            type: String,
            required: true,
            default: '下载'
        },
        isType: {
            type: String,
            required: false,
            default: 'btn'
        },
        // 是否新窗口标签页打开预览
        isPreview: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        async handle () {
            let tokenUrl = await OssFileUtils.getUrl(this.fileUrl)
            if (this.isPreview) {
                if (tokenUrl.indexOf(ossOldBucket + '.') === -1) {
                    tokenUrl = ossAliyun + tokenUrl.replace(OssFileUtils.hostReg, '')
                }
                window.open(tokenUrl)
            } else {
                ossDownload(tokenUrl, this.fileName)
            }
        }
    }
}
</script>

<style scoped>
.download-btn {
    cursor: pointer;
    font-size: 12px;
    border-radius: 3px;
    padding: 8px 16px;
    color: #fff;
    background-color: #ff7a45;
    border-color: #ff7a45;
    display: block;
    line-height: 13px;
    float: left;
    height: 13px;
    margin-left: 10px;
}
.download-main {
    cursor: pointer;
    font-size: 14px;
    color: #ff7a45;
    margin-left: 10px;
}
.download-default {
    cursor: pointer;
    font-size: 12px;
    color: #333333;
    margin-left: 10px;
}
</style>

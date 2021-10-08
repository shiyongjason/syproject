<template>
    <img :src="fileUrlAddToken" alt="img" @click="handle">
</template>

<script>
import OssFileUtils from '@/utils/OssFileUtils'
import { ossAliyun, ossOldBucket } from '@/api/config'

export default {
    name: 'imageAddToken',
    props: {
        fileUrl: {
            type: String,
            required: false,
            default: ''
        },
        isNeedClick: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            fileUrlAddToken: ''
        }
    },
    methods: {
        async handle () {
            // 在好橙工项目下打卡记录是弹窗预览
            if (this.isNeedClick) {
                return
            }
            this.fileUrlAddToken = await OssFileUtils.getUrl(this.fileUrl)
            console.log(this.fileUrl)
            console.log(this.fileUrlAddToken)
            if (this.fileUrlAddToken.indexOf(ossOldBucket + '.') === -1) {
                this.fileUrlAddToken = ossAliyun + this.fileUrlAddToken.replace(OssFileUtils.hostReg, '')
            }
            window.open(this.fileUrlAddToken)
        }
    },
    async mounted () {
        this.fileUrlAddToken = await OssFileUtils.getImageSelfStyle(this.fileUrl, 'image/resize,m_fixed,w_100,h_100')
    }
}
</script>

<style scoped>
</style>

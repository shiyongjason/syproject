<template>
    <el-image ref="img" v-if="tokenUrl" class="default-pre-view-image" :fit="fit" :src="tokenUrl" :preview-src-list="previewSrcList" :z-index="3000"></el-image>
</template>

<script>
import OssFileUtils from '@/utils/OssFileUtils'
import Image403 from '@/assets/images/img_403@2x.png'

export default {
    name: 'index',
    props: {
        previewSrcList: Array,
        fileUrl: {
            type: String
            // required: true
        },
        fit: {
            type: String,
            required: false,
            default: 'contain'
        }
    },
    data () {
        return {
            tokenUrl: Image403
        }
    },
    async mounted () {
        // this.tokenUrl = await OssFileUtils.getUrl(this.fileUrl)
    },
    watch: {
        fileUrl: {
            async  handler () {
                this.tokenUrl = await OssFileUtils.getUrl(this.fileUrl)
            },
            immediate: true
        }
        // async fileUrl () {
        //     this.tokenUrl = await OssFileUtils.getUrl(this.fileUrl)
        // }
    },
    methods: {
        clickHandler () {
            this.$refs.img.clickHandler()
        }
    }
}
</script>

<style scoped>

</style>

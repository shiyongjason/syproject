<template>
    <el-image ref="img" v-if="tokenUrl" class="default-pre-view-image" :fit="fit" :src="tokenUrl" :preview-src-list="[tokenUrl]" :z-index="3000"></el-image>
</template>

<script>
import OssFileUtils from '@/utils/OssFileUtils'
import Image403 from '@/assets/images/img_403@2x.png'

export default {
    name: 'index',
    props: {
        fileUrl: {
            type: String,
            required: true
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
        this.tokenUrl = await OssFileUtils.getUrl(this.fileUrl)
    },
    watch: {
        async fileUrl () {
            this.tokenUrl = await OssFileUtils.getUrl(this.fileUrl)
            console.log(this.tokenUrl)
        }
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

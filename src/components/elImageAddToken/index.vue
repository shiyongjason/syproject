<template>
    <el-image ref="img" v-if="tokenUrl" class="default-pre-view-image" :fit="fit" :src="tokenUrl" :preview-src-list="[tokenUrl]"></el-image>
</template>

<script>
import OssFileUtils from '@/utils/OssFileUtils'

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
            tokenUrl: ''
        }
    },
    async mounted () {
        this.tokenUrl = await OssFileUtils.getUrl(this.fileUrl)
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

<template>
    <img :src="fileUrlAddToken" alt="img">
</template>

<script>
import OssFileUtils from '@/utils/OssFileUtils'

export default {
    name: 'imageAddToken',
    props: {
        fileUrl: {
            type: String,
            required: false,
            default: ''
        }
    },
    data () {
        return {
            fileUrlAddToken: ''
        }
    },
    methods: {},
    async mounted () {
        this.fileUrlAddToken = await OssFileUtils.getImageSelfStyle(this.fileUrl)
    }
}
</script>

<style scoped>
</style>

<template>
    <img :src="fileUrlAddToken" alt="img" @click="handle">
</template>

<script>
import OssFileUtils from '@/utils/OssFileUtils'

export default {
    name: 'imageAddToken',
    props: {
        fileUrl: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            fileUrlAddToken: ''
        }
    },
    methods: {
        async handle () {
            this.fileUrlAddToken = await OssFileUtils.getUrl(this.fileUrl)
            window.open(this.fileUrlAddToken)
        }
    },
    async mounted () {
        this.fileUrlAddToken = await OssFileUtils.getUrl(this.fileUrl)
    }
}
</script>

<style scoped>

</style>

<template>
    <el-image class="image-wrap" v-if="fileUrlAddToken" :src="fileUrlAddToken" alt="img" lazy>
        <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
        </div>
    </el-image>
</template>

<script>
import OssFileUtils from '@/utils/OssFileUtils'

export default {
    name: 'imageToken',
    props: {
        fileUrl: {
            type: String,
            required: true
        },
        // 缩放-节省加载时间
        isResize: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            fileUrlAddToken: ''
        }
    },
    watch: {
        fileUrl: {
            async handler (o) {
                if (this.isResize) {
                    this.fileUrlAddToken = await OssFileUtils.getImageSelfStyle(o, 'image/resize,m_fixed,w_100,h_100')
                } else {
                    this.fileUrlAddToken = await OssFileUtils.getUrl(o)
                }
            },
            immediate: true
        }
    },
    methods: {}
}
</script>

<style scoped>
.image-wrap {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.image-slot {
    color: #eee;
}
</style>

<template>
    <div class="default-pre-view">
        <template v-if="fileList&&fileList.length>0">
            <div v-for="(item,index) in fileList" :key="index" class="default-pre-view-warp">
                <div class="default-pre-view-mask">
                    <i class="el-icon-zoom-in" style="color:#fff" @click="open(index,item)"></i>
                </div>
                <div class="pdfimg" v-if="(item.fileUrl).indexOf('.pdf') != -1">
                    <img :src="pdfbase">
                </div>
                <el-image v-else :ref="`preview_${index}`" class="default-pre-view-image" fit="contain" :src="item.fileUrl" :preview-src-list="previewSrcList"></el-image>
            </div>
        </template>
        <template v-else>
            <span>-</span>
        </template>
    </div>
</template>

<script>
export default {
    name: 'hosjoyListPreView',
    props: {
        fileList: Array
    },
    data () {
        return {
            activeIndex: -1,
            previewSrcList: [],
            pdfbase: 'data:image/png;base64,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'
        }
    },
    methods: {
        open (index, item = null) {
            if ((item.fileName).indexOf('.pdf') != -1) {
                window.open(item.fileUrl)
                return
            }
            let temp = this.fileList[index]
            let tempArr = JSON.parse(JSON.stringify(this.fileList))
            tempArr.splice(index, 1)
            tempArr.unshift(temp)
            this.previewSrcList = tempArr.map(item => {
                return item.fileUrl
            })
            const pre = this.$refs[`preview_${index}`]
            if (pre && pre[0]) {
                pre[0].clickHandler()
            }
        },
        remove (index) {
            this.$emit('remove', index)
        }
    }
}
</script>
<style lang='scss' scoped>
.default-pre-view {
    display: flex;
    flex-wrap: wrap;
    &-warp {
        margin-right: 8px;
    }
    &-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
        width: 120px;
        height: 120px;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        i {
            font-size: 21px;
            padding: 9px;
        }
        opacity: 0;
    }
    &-mask:hover {
        cursor: pointer;
        opacity: 1;
    }
    &-image {
        width: 120px;
        height: 120px;
        background-color: #fafafa;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
    }
}
.pdfimg {
    width: 130px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pdfimg img {
    width: 76%;
}
</style>
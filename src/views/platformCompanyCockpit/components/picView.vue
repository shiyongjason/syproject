<template>
    <div class="default-pre-view">
        <template v-if="fileList&&fileList.length>0">
            <div v-for="(item,index) in fileList" :key="index" class="default-pre-view-warp">
                <div class="default-pre-view-mask">
                    <i class="el-icon-zoom-in" style="color:#fff" @click="open(index)"></i>
                </div>
                <el-image :ref="`preview_${index}`" :lazy="true" class="default-pre-view-image" fit="contain" :src="item.fileUrl" :preview-src-list="previewSrcList"></el-image>
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
            previewSrcList: []
        }
    },
    methods: {
        open (index) {
            let temp = this.fileList[index]
            let tempArr = JSON.parse(JSON.stringify(this.fileList))
            tempArr.splice(index, 1)
            tempArr.unshift(temp)
            this.previewSrcList = tempArr.map(item => {
                // return item.accessUrl
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
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;
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
</style>
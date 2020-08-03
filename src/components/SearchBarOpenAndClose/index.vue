<template>
    <div class="bar">
        <el-button type="primary" @click="$emit('toggle')" class="drag" v-drag>
            {{statusName}}搜索区
            <i :class="status ? 'el-icon-arrow-up': 'el-icon-arrow-down'" class="icon"></i>
        </el-button>
    </div>
</template>

<script>
export default {
    name: 'searchBarOpenAndClose',
    computed: {
        statusName () {
            return this.status ? '收起' : '打开'
        }
    },
    props: ['status']
}
</script>

<style scoped lang="scss">
.bar {
    position: relative;
    padding-bottom: 10px;
    .icon {
        font-size: 16px;
    }
    .drag {
        position: fixed;
        top: 60px;
        right: 150px;
        z-index: 1000;
    }
}
</style>

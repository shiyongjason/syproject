<template>
    <div>
        <!-- 只能数字,账号 -->
        <el-input v-model.trim="inputModelComputed" v-isAllNum:0 v-bind="$attrs"></el-input>
    </div>
</template>

<script>
export default {
    props: ['value', 'innerHtml', 'format', 'paramKey'],
    computed: {
        inputModelComputed: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    }
}
</script>
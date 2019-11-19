<template>
        <el-button v-bind="$attrs" @click="onClick" :loading="loading">
            <slot>提 交</slot>
        </el-button>
</template>

<script>
export default {
    name: 'hosJoyButton',
    data () {
        return {
            loading: false
        }
    },
    methods: {
        onClick () {
            if (this.loading) {
                return false
            }
            this.loading = true
            this.$emit('click', this.done)
        },
        done () {
            this.loading = false
        }
    },
    mounted () {

    }
}
</script>

<style scoped></style>
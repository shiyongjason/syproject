<template>
    <div>
        <!-- 3位数正整数 v-isPositiveInt maxlength="3"-->
        <el-input v-model.trim="inputModelComputed" v-isPositiveInt maxlength="3" v-bind="$attrs">
            <template slot="append" v-if="innerHtml">{{innerHtml}}</template>
        </el-input>
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
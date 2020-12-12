<template>
    <el-select v-model="selectModelComputed" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
    </el-option>
  </el-select>
</template>

<script>
export default {
    props: ['selectVModel', 'options'],
    computed: {
        selectModelComputed: {
            get () {
                return this.selectVModel
            },
            set (val) {
                this.$emit('updateSelectModel', val)
            }
        }
    }
}
</script>
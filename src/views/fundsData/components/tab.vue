<template>
    <div>
         <el-tabs v-model="produce" type="card" @tab-click="handleClick">
            <el-tab-pane label="好信用" name="好信用"></el-tab-pane>
            <el-tab-pane label="供应链" name="供应链"></el-tab-pane>
            <el-tab-pane label="好橙工" name="好橙工"></el-tab-pane>
        </el-tabs>
        {{source}}
        {{produce}}
    </div>
</template>

<script>
export default {
    props: {
        source: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            produce: '好信用'
        }
    },
    methods: {
        handleClick () {
            this.$emit('onClickProduce', this.produce)
        }
    }
}
</script>


<style scoped>

</style>

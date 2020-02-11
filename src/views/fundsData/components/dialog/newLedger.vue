<template>
    <el-dialog title="提示" :visible.sync="dialogVisible"  width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSure">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'newLedger',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onSure () {
            // 操作
            this.onCancle ()
        },
        onCancle () {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="sass" scoped>

</style>


<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="30%" :before-close='onCancle'>
        <h3 style="margin-bottom: 10px;">备注：</h3>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="detailData.remark"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSure">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'remarkDialog',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detailData: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            remark: ''
        }
    },
    methods: {
        onSure () {
            console.log(this.detailData)
            // 操作
            // this.onCancle ()
        },
        onCancle () {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding: 20px 24px;
}
</style>

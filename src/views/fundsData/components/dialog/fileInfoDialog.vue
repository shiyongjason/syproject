<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="50%" :before-close='onCancle'>
        <h3 style="margin-bottom: 10px;">档案信息：</h3>
        <div class="query-cont-col">
            <div class="query-col-title">台账档案编号：</div>
            <div class="query-col-input">
                <el-input type="text" maxlength="20" v-model="detailData.remark" placeholder="请输入台账档案编号">
                </el-input>
            </div>
        </div>
        <div class="query-cont-col">
            <div class="query-col-title">金云档案编号：</div>
            <div class="query-col-input">
                <el-input type="text" maxlength="20" v-model="detailData.remark" placeholder="请输入金云档案编号">
                </el-input>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSave">确 定</el-button>
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
        onSave () {
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

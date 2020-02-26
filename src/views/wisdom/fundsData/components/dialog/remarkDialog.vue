<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="30%" :before-close='onCancle'>
        <h3 style="margin-bottom: 10px;">备注：</h3>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="detailData.remark"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSure" :loading='loading'>确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setAccountBasic } from '../../api/index'
export default {
    name: 'remarkDialog',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detailData: {
            type: Object,
            default: () => ({
                id: '',
                accountType: '', // 台账类型 1：流贷2：敞口 3：分授信
                jinyunArchiveNo: '', // 金云档案编号
                loanCompanyCode: '', // 借款单位编号
                loanCompanyName: '', // 借款单位名称
                subsectionCode: '', // 分部编码
                subsectionName: '', // 分部名称
                misCode: '', // mis编码
                productType: '', // 产品类型 1：好信用 2：供应链 3：好橙工
                remark: '', // 备注
                standingBookArchiveNo: '', // 台账档案编号
                standingBookNo: '', // 台账编号
                selectName: '',
                selectCode: ''
            })
        }
    },
    data () {
        return {
            loading: false
        }
    },
    methods: {
        async onSure () {
            this.loading = true
            await setAccountBasic(this.detailData)
            this.loading = false
            this.$message({ type: 'success', message: '修改成功' })
            this.onCancle()
            this.$emit('reload')
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

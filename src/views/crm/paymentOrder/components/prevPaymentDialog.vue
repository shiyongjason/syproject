<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <el-form label-width="150px">
            <el-form-item label="经销商：">
                经销商的企业名称
            </el-form-item>
            <el-form-item label="项目：">
                这里自动带出项目名称
            </el-form-item>
            <el-form-item label="分部：">
                这里自动带出上游供应商的企业名称
            </el-form-item>
            <el-form-item label="剩余应上游支付：">
                12,000,000元
            </el-form-item>
            <el-form-item label="上游供应商：">
                重庆新日日顺家电有限公司
            </el-form-item>
            <el-form-item label="上游支付形式：">
                银行转帐
            </el-form-item>
            <el-form-item label="上游货款方式：">
                先货后款
            </el-form-item>
            <el-form-item label="收货进度：">
                50%
            </el-form-item>
            <el-form-item label="本次支付金额：">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="支付日期：">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="上传上游支付凭证：">
                <el-upload></el-upload>
                <p>支持扩展名：jpg.png...</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
                <h-button @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onEnterPay">确认支付</h-button>
            </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'prevPaymentDialog',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        openStatus: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {

        }
    },
    methods: {
        onCancel () {

        },
        onEnterPay () {

        }
    }
}
</script>

<style scoped>

</style>

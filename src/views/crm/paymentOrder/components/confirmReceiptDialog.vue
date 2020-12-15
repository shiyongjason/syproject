<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <el-form label-width="150px">
            <el-form-item label="经销商：">
                这里自动带出的经销商的企业名称
            </el-form-item>
            <el-form-item label="项目名称：">
                这里自动带出项目名称
            </el-form-item>
            <el-form-item label="上游供应商：">
                这里自动带出上游供应商的企业名称
            </el-form-item>
            <el-form-item label="剩余应到货金额：">
                12,000,000元
            </el-form-item>
            <el-form-item label="采购明细表：">
                <img src="" alt="">
            </el-form-item>
            <el-form-item label="本次到货金额：">
               <el-input></el-input>
            </el-form-item>
            <el-form-item label="到货验收单：">
               <el-upload></el-upload>
            </el-form-item>
            <el-form-item label="收货备注：">
               <el-textarea></el-textarea>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" v-if="dialogStatus.seePayEnter.status !== openStatus">
                <h-button type="assist" @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onEnter">确认</h-button>
            </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'enterReceiptDialog',
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
        onEnter () {

        }
    }
}
</script>

<style scoped>

</style>

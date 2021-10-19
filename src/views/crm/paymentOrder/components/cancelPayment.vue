<template>
    <el-dialog v-bind="$attrs" title="取消支付单确认" :before-close="onClose" :close-on-click-modal=false>
        <el-form :model="ruleForm" ref="ruleForm" label-width="90px">
            <el-form-item label="取消原因:" prop="closeReason" :rules="[{required: true, message: '请输入取消原因', trigger: 'blur'}]">
                <el-input type="textarea" v-model="ruleForm.closeReason" maxlength="200" show-word-limit :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="其他说明：">
                <p>(可上传补充材料作为取消凭证，上传格式为PDF/JPG/JPEG/PNG)</p>
                <OssFileHosjoyUpload v-model="ruleForm.attachDocRequestList" :showPreView=true :fileSize=20 :action='action' :fileNum='9' :uploadParameters='uploadParameters' accept='.jpg,.png,jpeg,.pdf'></OssFileHosjoyUpload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <h-button @click="onClose">暂不取消</h-button>
            <h-button type="primary" @click="submitForm">确认</h-button>
        </span>
    </el-dialog>
</template>

<script>
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { ccpBaseUrl } from '@/api/config'
import { cancelPayment } from '../api/index'
export default {
    data () {
        return {
            ruleForm: {
                closeReason: '',
                attachDocRequestList: []
            },
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            }
        }
    },
    components: { OssFileHosjoyUpload },
    methods: {
        // 支付单取消
        submitForm () {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let dataJson = { ...this.ruleForm, paymentOrderId: this.$parent.paramsPaymentId }
                    try {
                        await cancelPayment(dataJson)
                        this.$emit('confirm')
                        this.$message({
                            message: `取消成功`,
                            type: 'success'
                        })
                        this.ruleForm.attachDocRequestList = []
                        this.ruleForm.closeReason = ''
                    } catch (error) { }
                }
            })
        },
        onClose () {
            this.$refs.ruleForm.clearValidate()
            this.$refs.ruleForm.resetFields()
            this.ruleForm.attachDocRequestList = []
            this.ruleForm.closeReason = ''
            this.$emit('close')
        }
    }
}
</script>

<style>
</style>
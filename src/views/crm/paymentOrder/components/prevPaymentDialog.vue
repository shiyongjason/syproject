<template>
    <el-dialog title="上游支付" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <el-form label-width="150px">
            <el-form-item label="经销商：">
                {{ prevPaymentDetail.companyName }}
            </el-form-item>
            <el-form-item label="项目：">
                {{ prevPaymentDetail.projectName }}
            </el-form-item>
            <el-form-item label="分部：">
                {{ prevPaymentDetail.deptName }}
            </el-form-item>
            <el-form-item label="剩余应上游支付：">
                {{ prevPaymentDetail.surplusAmount }}元
            </el-form-item>
            <el-form-item label="上游供应商：">
                {{ prevPaymentDetail.supplierCompanyName }}
            </el-form-item>
            <el-form-item label="上游支付形式：">
                {{ prevPaymentDetail.supplierPaymentType }}
            </el-form-item>
            <el-form-item label="上游货款方式：">
                {{ prevPaymentDetail.supplierPaymentMethod }}
            </el-form-item>
            <el-form-item label="收货进度：">
                {{prevPaymentDetail.goodsProgress}}%
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
import { getPrevPayDetail, updatePrevPayPass } from '@/views/crm/paymentOrder/api'

export default {
    name: 'prevPaymentDialog',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number
        }
    },
    data () {
        return {
            prevPaymentDetail: {}
        }
    },
    watch: {
        async isOpen (val) {
            if (val) {
                const { data } = await getPrevPayDetail(id)
                this.prevPaymentDetail = data
            }
        }
    },
    methods: {
        onCancel () {
            this.$emit('onClose')
        },
        onEnterPay () {
            updatePrevPayPass()
        }
    }
}
</script>

<style scoped>

</style>

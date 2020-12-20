<template>
    <el-dialog title="确认收货" :visible.sync="isOpen" width="800px" :before-close="()=> $emit('onClose')">
        <el-form label-width="150px">
            <el-form-item label="经销商：">
                {{ enterReceiptDetail.companyName }}
            </el-form-item>
            <el-form-item label="项目名称：">
                {{ enterReceiptDetail.projectName }}
            </el-form-item>
            <el-form-item label="上游供应商：">
                {{ enterReceiptDetail.supplierCompanyName }}
            </el-form-item>
            <el-form-item label="剩余应到货金额：">
                {{ enterReceiptDetail.surplusAmount }}元
            </el-form-item>
            <el-form-item label="采购明细表：">
                <img :key="item.key"  :src="item.fileUrl" :alt="item.fileName" v-for="item in enterReceiptDetail.detailed" @click="goDetail(item.fileUrl)" class="info-img">
            </el-form-item>
            <el-form-item label="本次到货金额：">
               <el-input type="text" v-model="formData.goodsAmount"></el-input>
            </el-form-item>
            <el-form-item label="到货验收单：">
                <hosjoyUpload
                    v-model="formData.reqAttachDocs" :showPreView=true :fileSize=20 :fileNum=100
                    :limit=100 :action='action' :uploadParameters='uploadParameters'
                    style="margin:10px 0 0 5px">
                    <div class="a-line">
                        <h-button>上传文件</h-button>
                    </div>
                </hosjoyUpload>
            </el-form-item>
            <el-form-item label="收货备注：">
                <el-input type="textarea" v-model="formData.goodsRemark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <h-button type="assist" @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onEnter">确认</h-button>
            </span>
    </el-dialog>
</template>

<script>
import { getConfirmReceiptDetail, updateConfirmReceiptPass } from '@/views/crm/paymentOrder/api'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'

export default {
    name: 'enterReceiptDialog',
    components: {
        hosjoyUpload
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        params: { }
    },
    data () {
        return {
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            enterReceiptDetail: {},
            formData: {
                goodsAmount: '',
                reqAttachDocs: [],
                goodsRemark: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    watch: {
        async isOpen (val) {
            if (val) {
                const { data } = await getConfirmReceiptDetail(this.params.paymentOrderId)
                this.enterReceiptDetail = data
            }
        }
    },
    methods: {
        onCancel () {
            this.$emit('onClose')
        },
        async onEnter () {
            const params = {
                ...this.formData,
                orderId: this.params.paymentOrderId,
                createBy: this.userInfo.employeeName,
                createPhone: this.userInfo.phoneNumber
            }
            await updateConfirmReceiptPass(params)
            this.$emit('onClose')
        },
        goDetail (url) {
            window.open(url)
        }
    }
}
</script>

<style scoped>
.info-img {
    width: 80px;
}
</style>

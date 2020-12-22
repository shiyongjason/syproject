<template>
    <el-dialog title="确认收货" :visible.sync="isOpen" width="800px" :before-close="()=> $emit('onClose')" :close-on-click-modal=false>
        <el-form label-width="150px" :model="formData" :rules="rules" ref="form">
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
                {{ enterReceiptDetail.surplusAmount | fundMoneyHasTail }}元
            </el-form-item>
            <el-form-item label="采购明细表：">
                <img :key="item.key"  :src="item.fileUrl" :alt="item.fileName" v-for="item in enterReceiptDetail.detailed" @click="goDetail(item.fileUrl)" class="info-img">
            </el-form-item>
            <el-form-item label="本次到货金额：" prop="goodsAmount">
               <el-input type="text" v-model="formData.goodsAmount" maxlength="50" v-isNegative="formData.goodsAmount"></el-input>
            </el-form-item>
            <el-form-item label="到货验收单：" prop="reqAttachDocs">
                <hosjoyUpload
                    v-model="formData.reqAttachDocs" :showPreView=true :fileSize=20 :fileNum=100
                    :limit=100 :action='action' :uploadParameters='uploadParameters'
                    style="margin:10px 0 0 5px" @successCb="$refs.form.clearValidate()">
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
            },
            rules: {
                goodsAmount: [
                    { required: true, message: '请填写本次到货金额', trigger: 'blur' }
                ],
                reqAttachDocs: [
                    { required: true, message: '请上传到货验收单', trigger: 'blur' }
                ]
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
                this.clearForm()
                this.$nextTick(() => {
                    this.$refs.form.clearValidate()
                })
                this.getConfirmReceiptDetail()
            }
        }
    },
    methods: {
        async getConfirmReceiptDetail () {
            const { data } = await getConfirmReceiptDetail(this.params.paymentOrderId)
            this.enterReceiptDetail = data
        },
        clearForm () {
            this.formData = {
                goodsAmount: '',
                reqAttachDocs: [],
                goodsRemark: ''
            }
        },
        onCancel () {
            this.clearForm()
            this.$refs.form.clearValidate()
            this.$emit('onClose')
        },
        async onEnter () {
            this.$refs.form.validate(async (value) => {
                if (value) {
                    const params = {
                        ...this.formData,
                        orderId: this.params.paymentOrderId,
                        createBy: this.userInfo.employeeName,
                        createPhone: this.userInfo.phoneNumber
                    }
                    await updateConfirmReceiptPass(params)
                    this.onCancel()
                }
            })
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
    height: 80px;
    cursor: pointer;
}
</style>

<template>
    <el-dialog title="确认收货" :visible.sync="isOpen" width="800px" :before-close="()=> $emit('onClose')" :close-on-click-modal=false :destroy-on-close="true">
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
                {{ enterReceiptDetail.surplusAmount | moneyFormat }}元
            </el-form-item>
            <el-form-item label="采购明细表：">
                <div class="info-img-group">
                    <span :key="item.key" class="img-box" v-for="item in enterReceiptDetail.detailed">
                        <imageAddToken :file-url="item.fileUrl" />
                    </span>
                </div>
            </el-form-item>
            <el-form-item label="本次到货金额：" prop="goodsAmount">
                <el-input type="text" placeholder="请输入" v-model.trim="formData.goodsAmount" maxlength="50" v-isNegative:2="formData.goodsAmount"></el-input>
            </el-form-item>
            <el-form-item label="到货验收单：" prop="reqAttachDocs">
                <OssFileHosjoyUpload v-model="formData.reqAttachDocs" :showPreView=true :fileSize=20 :fileNum=9 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" @successCb="$refs.form.clearValidate()" accept=".jpg,.jpeg,.png,.pdf">
                    <div class="a-line">
                        <h-button>上传文件</h-button>
                    </div>
                </OssFileHosjoyUpload>
                <p class="tips">上游发货凭证，经销商收货凭证、项目甲方收货凭证 （凭证包括不限于发货单、收货单、物流单、出库单、签收单等），最多可上传9个文件，单个文件限制20M</p>
            </el-form-item>
            <el-form-item label="收货备注：">
                <el-input type="textarea" v-model="formData.goodsRemark" maxlength="200"></el-input>
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
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import { ccpBaseUrl } from '@/api/config'
import { mapState } from 'vuex'
import imageAddToken from '@/components/imageAddToken'

export default {
    name: 'enterReceiptDialog',
    components: {
        OssFileHosjoyUpload,
        imageAddToken
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        params: {}
    },
    data () {
        return {
            action: ccpBaseUrl + 'common/files/upload-old',
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
                    // {
                    //     validator: (r, v, callback) => {
                    //         if (+this.formData.goodsAmount == 0) {
                    //             return callback(new Error('本次到货金额不能等于0'))
                    //         }
                    //         return callback()
                    //     }
                    // }
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
            this.$refs.form.validate(async (value, rules) => {
                if (value) {
                    const params = {
                        ...this.formData,
                        orderId: this.params.paymentOrderId,
                        createBy: this.userInfo.employeeName,
                        createPhone: this.userInfo.phoneNumber
                    }
                    await updateConfirmReceiptPass(params)
                    this.$message.success('到货信息已更新')
                    this.onCancel()
                    this.$emit('onCloseDialogAndQuery', 'confirmReceiptVisible')
                } else {
                    this.$nextTick(() => {
                        const dom = document.querySelector('.is-error')
                        const _dom = dom.querySelector('input') || dom.querySelector('textarea')
                        _dom.focus()
                    })
                }
            })
        },
        goDetail (url) {
            window.open(url)
        }
    }
}
</script>

<style scoped lang="scss">
.info-img-group {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    span {
        display: flex;
        width: 80px;
        height: 80px;
        margin-bottom: 12px;
        margin-right: 12px;
        cursor: pointer;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
    }
    .img-box {
        width: 80px;
    }
    img {
        display: block;
        margin: auto;
        max-height: 78px;
        max-width: 78px;
    }
    .label {
        flex: 0 0 100px;
    }
}
.info-img {
    width: 80px;
    height: 80px;
    cursor: pointer;
}
.tips {
    color: #8d8d8d;
}
/deep/ .el-dialog__body {
    max-height: 480px;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>

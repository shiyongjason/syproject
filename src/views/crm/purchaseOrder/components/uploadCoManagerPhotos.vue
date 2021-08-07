<template>
    <el-dialog title="共管户信息" class="dialog" :visible.sync="isOpen" width="650px" :before-close="()=> onCancel()" :close-on-click-modal=false :destroy-on-close="true">
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="网银盾照片：" prop="onlineBankingShields">
                <OssFileHosjoyUpload v-model="formData.onlineBankingShields" :showPreView=true :fileSize=20 :fileNum=9 style="margin:10px 0 0 5px" @successCb="$refs.form.clearValidate()" accept=".jpg,.jpeg,.png">
                    <div class="a-line">
                        <h-button>上传文件</h-button>
                    </div>
                </OssFileHosjoyUpload>
            </el-form-item>
            <el-form-item label="共管户截图：" prop="screenshots">
                <OssFileHosjoyUpload v-model="formData.screenshots" :showPreView=true :fileSize=20 :fileNum=9  style="margin:10px 0 0 5px" @successCb="$refs.form.clearValidate()" accept=".jpg,.jpeg,.png">
                    <div class="a-line">
                        <h-button>上传文件</h-button>
                    </div>
                </OssFileHosjoyUpload>
            </el-form-item>
            <p class="tips">格式为jpg、jpeg、png等主流图片，最多上传9张，单张最大20M</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <h-button type="assist" @click="onCancel">取消</h-button>
            <h-button type="primary" @click="onEnter">确认</h-button>
        </span>
    </el-dialog>

</template>

<script>
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import { uploadCoManagerPhotos } from '@/views/crm/purchaseOrder/api'
export default {
    name: 'uploadCoManagerPhotos',
    components: {
        OssFileHosjoyUpload
    },
    props: ['isOpen', 'id'],
    data () {
        // const checkOnlineBankingShields = (rule, value, callback) => {
        //     if (value && value.length < 1) {
        //         return callback(new Error(rule.message))
        //     }
        //     return callback()
        // }
        // const checkScreenshots = (rule, value, callback) => {
        //     if (value && value.length < 1) {
        //         return callback(new Error(rule.message))
        //     }
        //     return callback()
        // }
        // 目前判断比较简单，公用一个方法
        const validatorIsNull = (rule, value, callback) => {
            if (value && value.length < 1) {
                return callback(new Error(rule.message))
            }
            return callback()
        }
        return {
            formData: {
                onlineBankingShields: [],
                screenshots: []
            },
            rules: {
                onlineBankingShields: [
                    { required: true, message: '请上传网银盾照片', validator: validatorIsNull }
                ],
                screenshots: [
                    { required: true, message: '请上传共管户截图', validator: validatorIsNull }
                ]
            }
        }
    },
    methods: {
        onCancel () {
            this.clearFormData()
            this.$refs.form.clearValidate()
            this.$emit('update:isOpen', false)
        },
        onEnter () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    const params = {
                        ...this.formData,
                        id: this.id
                    }
                    await uploadCoManagerPhotos(params)
                    this.onCancel()
                    this.$emit('backEvent')
                }
            })
        },
        clearFormData () {
            this.formData = {
                onlineBankingShields: [],
                screenshots: []
            }
        }
    }
}
</script>

<style scoped>
.dialog {
    /*position: relative;*/
    /*z-index: 1;*/
}
</style>

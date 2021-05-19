<template>
    <el-dialog title="共管户信息" :visible.sync="isOpen" width="650px" :before-close="()=> $emit('onClose')" :close-on-click-modal=false :destroy-on-close="true">
        <el-form ref="form" :model="formData" v-if="true" :rules="rules" label-width="120px">
            <el-form-item label="网银盾照片：" prop="reqAttachDocs">
                <OssFileHosjoyUpload v-model="formData.onlineBankingShields" :showPreView=true :fileSize=20 :fileNum=9 style="margin:10px 0 0 5px" @successCb="$refs.form.clearValidate()" accept=".jpg,.jpeg,.png,.pdf">
                    <div class="a-line">
                        <h-button>上传文件</h-button>
                    </div>
                </OssFileHosjoyUpload>
            </el-form-item>
            <el-form-item label="共管户截图：" prop="reqAttachDocs">
                <OssFileHosjoyUpload v-model="formData.screenshots" :showPreView=true :fileSize=20 :fileNum=9  style="margin:10px 0 0 5px" @successCb="$refs.form.clearValidate()" accept=".jpg,.jpeg,.png,.pdf">
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
export default {
    name: 'uploadPublicUserPhotos',
    components: {
        OssFileHosjoyUpload
    },
    props: ['isOpen'],
    data () {
        const checkOnlineBankingShields = () => {

        }
        const checkScreenshots = () => {

        }
        return {
            formData: {
                onlineBankingShields: [],
                screenshots: []
            },
            rules: {
                onlineBankingShields: [
                    { required: true, message: '请上传网银盾照片', validator: checkOnlineBankingShields }
                ],
                screenshots: [
                    { required: true, message: '请上传共管户截图', validator: checkScreenshots }
                ]
            }
        }
    },
    methods: {
        onCancel () {
            this.$refs.form.clearValidate()
            this.$emit('onClose')
        },
        onEnter () {
            console.log(1)
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <el-dialog title="上传印章图片" :visible.sync="dialog" :close-on-click-modal="false" width='25%'>
        <div class="query-cont-col">
            <div class="flex-wrap-title">印章：</div>
        </div>
        <div>
            <SingleUpload :upload="uploadInfo" :imageUrl="uploadImg.imageUrl" ref="uploadImg" @back-event="readUrl" />
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSure">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { signImage } from '../../../api/index'
export default {
    name: 'CAdialog',
    computed: {
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {},
                accept: 'image/jpeg, image/jpg, image/png'
            }
        }
    },
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        customerForm: {
            type: Object
            // default: {}
        },
        uploadImg: {
            type: Object
        }
    },
    methods: {
        onCancel () {
            this.$emit('onCancel')
        },
        async onSure () {
            if (!this.uploadImg.imageUrl) {
                this.$message.warning('请上传图片')
                return
            }
            await signImage(this.uploadImg)
            this.onCancel()
            this.$emit('onSearch')
        },
        readUrl (val) {
            this.uploadImg.imageUrl = val.imageUrl
        },
    }
}
</script>

<style scoped lang="scss">
</style>

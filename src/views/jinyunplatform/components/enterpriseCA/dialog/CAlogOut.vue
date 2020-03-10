<template>
    <el-dialog :title="activeName == 'enterprise' ?'企业' :'个人' + 'CA认证注销'" :visible.sync="dialog" :close-on-click-modal="false" width="30%">
        <div v-show="activeName == 'personage'">
            <p style="margin: 20px 0;text-indent: 1em;">该个人用户CA认证账户联动以下已CA认证的企业，若注销该个人用户CA认证，对应的企业CA认证也将删除:</p>
            <el-table :data="CAlogOutData.personRelevenceData" border style="width: 100%">
                <el-table-column prop="companyName" label="企业名称" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="companySignatureId" label="企业账号ID" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
        </div>
        <p style="text-align: center;margin-top: 10px;">是否确认注销{{CAlogOutData.logoutName}}的CA认证？</p>
        <p style="margin: 20px 0;text-indent: 1em;color:red">{{CAlogOutData.htmltext}}</p>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loading" @click="onSureLogOut" :disabled="!!CAlogOutData.htmltext">确认注销</el-button>
            <el-button @click="onCancel">取 消</el-button>
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
        activeName: {
            type: String
        },
        CAlogOutData: {
            type: Object
        }
    },
    data () {
        return {
            loading: false
        }
    },
    methods: {
        onCancel () {
            this.$emit('onCancel')
        },
        async onSureLogOut () {
            this.loading = true
            if (this.activeName == 'enterprise') {
                await logoutConmanyCA(this.row.companySignatureId)
            } else {
                await logoutPersonCA(this.row.signatureSupplierSignerId)
            }
            this.$emit('onSearch')
            this.onCancel()
            this.loading = false
        }
    }
}
</script>

<style scoped lang="scss">
</style>

<template>
    <el-dialog title="转让管理员" :visible.sync="transferAdminDialogVisible" width="500px" :before-close="()=>{cancel()}" :destroy-on-close="true" :close-on-click-modal=false>
        <div class="edit-employee-role">
            <el-form ref="transferAdminForm" :model="transferAdminForm" :rules="transferAdminRules" label-width="100px">
                <el-form-item label="当前管理员：">
                    {{adminData.nickName || '-'}}
                </el-form-item>
                <el-form-item label="新管理员：" prop="userId">
                    <el-select v-model="transferAdminForm.userId" placeholder="请选择员工" :clearable=true>
                        <el-option :label="item.nickName + `(${item.phoneNumber})`" :value="item.userId" v-for="item in employeeTableData.filter(val=> !val.admin)" :key="item.userId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="updateAdmin">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import { updateAdmin } from '../api/index'
import { mapState } from 'vuex'
export default {
    name: 'transferAdmin',
    props: ['transferAdminDialogVisible', 'adminData', 'employeeTableData', 'companyCode'],
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            transferAdminForm: {
                userId: ''
            },
            transferAdminRules: {
                userId: [
                    { required: true, message: '请选择员工' }
                ]
            },
            admin: {}
        }
    },
    watch: {
        transferAdminDialogVisible (val) {
            if (val) {
                this.$nextTick(() => {
                    this.$refs['transferAdminForm'].clearValidate()
                })
                this.transferAdminForm.userId = ''
            }
        }
    },
    methods: {
        async updateAdmin () {
            this.$refs['transferAdminForm'].validate(async (valid) => {
                if (valid) {
                    const params = {
                        companyCode: this.companyCode,
                        updateBy: this.userInfo.user_name,
                        updateName: this.userInfo.employeeName,
                        userId: this.transferAdminForm.userId
                    }
                    await updateAdmin(params)
                    this.cancel()
                    this.$emit('updateTableList')
                }
            })
        },
        cancel () {
            this.$emit('update:transferAdminDialogVisible', false)
            this.transferAdminForm.userId = ''
            this.$nextTick(() => {
                this.$refs['transferAdminForm'].clearValidate()
            })
        }
    }
}
</script>

<style scoped>

</style>

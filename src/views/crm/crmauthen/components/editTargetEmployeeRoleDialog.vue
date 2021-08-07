<template>
    <el-dialog v-if="editEmployeeDialogVisible" :title="targetVal.admin ? '编辑管理员信息': '编辑员工信息'" :destroy-on-close="true" :visible.sync="editEmployeeDialogVisible" width="500px" :before-close="()=>{$emit('update:editEmployeeDialogVisible', false)}" :close-on-click-modal=false>
        <div class="edit-employee-role">
            <el-form ref="employeeForm" :model="employeeForm" :rules="employeeRules" label-width="100px">
                <el-form-item label="昵称：" prop="nickName">
                    <el-input type="text" v-model="employeeForm.nickName" maxlength="24" :rows="5" placeholder="请填写员工昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    {{targetVal.phoneNumber}}
                </el-form-item>
                <el-form-item label="角色：" prop="roleCodes">
                    <template v-if="targetVal.admin">管理员</template>
                    <el-select v-model="employeeForm.roleCodes" multiple placeholder="请选择角色" @change="updateDisabled" v-else>
                        <el-option
                            v-for="item in selfRoleList"
                            :key="item.roleCode"
                            :label="item.roleName"
                            :value="item.roleCode" :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="updateEmployeeInfo">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import { updateEmployeeInfo } from '@/views/crm/crmauthen/api'
import { mapState } from 'vuex'

export default {
    name: 'employeeForm',
    props: ['editEmployeeDialogVisible', 'targetVal', 'roleList'],
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        const validator = (rule, value, callback) => {
            const Reg = /^[1-9]\d*$/
            if (value && value.length === 0) {
                return callback(new Error(rule.message))
            }
            return callback()
        }
        const validatorIsChinese = (rule, value, callback) => {
            const Reg = /[^\u4e00-\u9fa5]/
            if (value?.length < 2 || Reg.test(value)) {
                return callback(new Error(rule.message))
            }
            return callback()
        }
        return {
            employeeForm: {
                nickName: '',
                roleCodes: []
            },
            employeeRules: {
                nickName: [
                    { required: true, message: '昵称不得为空！', trigger: 'blur' },
                    { required: true, validator: validatorIsChinese, message: '昵称只能为2-24个汉字！', trigger: 'blur' }
                ],
                roleCodes: [
                    { required: true, validator: validator, message: '角色不得为空！', trigger: 'blur' }
                ]
            },
            editTargetEmployeeRoleIsAdmin: true,
            selfRoleList: []
        }
    },
    watch: {
        editEmployeeDialogVisible (val) {
            if (val) {
                this.employeeForm.nickName = this.targetVal.nickName
                this.employeeForm.roleCodes = this.targetVal.roleCode
                this.employeeRules.roleCodes[0].required = !this.targetVal.admin
                this.$nextTick(val => {
                    this.$refs['employeeForm'].clearValidate()
                })
            }
        },
        roleList (val) {
            if (val && val.length > 0) {
                this.roleList.map(val => {
                    val.disabled = false
                })
                this.selfRoleList = this.roleList
            }
        },
        'employeeForm.roleCodes' (val) {
            this.updateDisabled(val)
        }
    },
    methods: {
        async updateEmployeeInfo () {
            this.$refs['employeeForm'].validate(async (valid) => {
                if (valid) {
                    const params = {
                        companyUserId: this.targetVal.id,
                        nickName: this.employeeForm.nickName,
                        roleCodes: this.employeeForm.roleCodes,
                        updateBy: this.userInfo.user_name,
                        updateName: this.userInfo.employeeName
                    }
                    await updateEmployeeInfo(params)
                    this.cancel()
                    this.$emit('updateTableList')
                }
            })
        },
        cancel () {
            this.$emit('update:editEmployeeDialogVisible', false)
            this.$nextTick(val => {
                this.$refs['employeeForm'].clearValidate()
            })
        },
        updateDisabled (val) {
            // role 6 是普通员工，目前是写死的
            if (val.includes('6')) {
                this.selfRoleList.forEach(val => {
                    if (val.roleCode != '6') {
                        val.disabled = true
                    }
                })
            } else if (val && val.length == 0) {
                this.selfRoleList.forEach(val => {
                    val.disabled = false
                })
            } else {
                this.selfRoleList.forEach(val => {
                    if (val.roleCode == '6') {
                        val.disabled = true
                    }
                })
            }
        }
    }
}
</script>

<style scoped>

</style>

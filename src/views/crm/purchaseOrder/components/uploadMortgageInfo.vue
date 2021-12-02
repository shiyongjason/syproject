<template>
    <el-dialog title="质押信息" class="dialog" :visible.sync="isOpen" width="650px" :before-close="()=> onCancel()" :close-on-click-modal=false :destroy-on-close="true">
        <el-form ref="form" :model="formData" :rules="formRules" label-width="140px">
            <el-form-item label="中登网质押编号：" prop="pledgeNo">
                <el-input placeholder="请输入中登网质押编号" v-model="formData.pledgeNo" maxlength="50"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <h-button type="assist" @click="onCancel">取消</h-button>
            <h-button type="primary" @click="onEnter">提交质押信息</h-button>
        </span>
    </el-dialog>

</template>

<script>
import { postPledgeSave } from '@/views/crm/paymentOrder/api'
export default {
    name: 'uploadMortgageInfo',
    props: ['isOpen', 'id'],
    data () {
        return {
            formData: {
                pledgeNo: ''
            }
        }
    },
    computed: {
        formRules () {
            let rules = {
                pledgeNo: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            var Reg = /^[A-Za-z0-9]+$/
                            if (value && !(Reg.test(value))) {
                                return callback(new Error('只能为数字或字母'))
                            }
                            if (!value) {
                                return callback(new Error('请输入中登网质押编号'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            }
            return rules
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
                        purchaseOrderId: this.id
                    }
                    await postPledgeSave(params)
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

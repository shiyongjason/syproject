<template>
    <div>
        <el-dialog :title="`添加${contractType==1?'平台':''}签署方`" :visible.sync="tract_visible" width="35%" :before-close="handleClose">
            <el-form :model="signerTempForm" :rules="signerTempFormrules" ref="signerTempR" label-width="140px" class="demo-signerTempForm" v-if="contractType==2">
                <el-form-item label="签署方名称：" prop="signerName">
                    <el-input v-model="signerTempForm.signerName" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="签署方类型：" prop="signerType">
                    <el-radio-group v-model="signerTempForm.signerType">
                        <el-radio label="1">企业</el-radio>
                        <el-radio label="2">个人</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="请选择合同企业：" prop="paramGroupId">
                    <el-select v-model="signerTempForm.paramGroup" value-key='id' placeholder="请选择合同企业">
                        <el-option v-for="item in singerOps" :key="item.paramKey" :label="item.paramName" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经办人：">
                    经办人由发起人指定
                </el-form-item>
                <el-form-item label="签署要求：" prop="_signerDemand">
                    <template v-if="signerTempForm.signerType==1">
                        <el-checkbox-group v-model="signerTempForm._signerDemand">
                            <el-checkbox label="1" name="type">企业章</el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <template v-else>
                        <el-checkbox-group v-model="signerTempForm._signerDemand">
                            <el-checkbox label="3" name="type">手绘章</el-checkbox>
                            <el-checkbox label="4" name="type">模板章</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </el-form>
            <el-form :model="signerTempForm" :rules="signerTempFormrules" ref="signerTempS" label-width="140px" class="demo-signerTempForm" v-if="contractType==1">
                <el-form-item label="签署方名称：" prop="">
                    平台
                </el-form-item>
                <el-form-item label="签署方类型：" prop="">
                    企业
                </el-form-item>
                <el-form-item label="平台企业：" prop="paramGroupId">
                    <el-select v-model="signerTempForm.paramGroup" value-key='id' placeholder="请选择平台企业">
                        <el-option v-for="item in caOptions" :key="item.id" :label="item.companyName" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签署要求：" prop="_signerDemand">
                    <el-checkbox-group v-model="signerTempForm._signerDemand">
                        <el-checkbox label="1" name="type">企业章</el-checkbox>
                        <el-checkbox label="2" name="type">法定代表人章</el-checkbox>
                        <el-checkbox label="3" name="type">手绘章</el-checkbox>
                        <el-checkbox label="4" name="type">模板章</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="tract_visible = false">取 消</el-button>
                <el-button type="primary" @click="onSaveSinger">确定保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { deepCopy } from '@/utils/utils'
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            tract_visible: false,
            contractType: '',
            singerOps: [],
            caOptions: [],
            singer_busArr: [],
            singer_perArr: [],
            singer_platArr: [],
            signerTempForm: {
                signerName: '',
                signerType: '1',
                paramGroupId: '',
                paramGroup: {},
                signerDemand: '',
                _signerDemand: []
            },
            copy_signerTempForm: {
                signerName: '',
                signerType: '1',
                paramGroupId: '',
                paramGroup: {},
                signerDemand: '',
                _signerDemand: []
            },
            signerTempFormrules: {
                signerName: [
                    { required: true, message: '签署方名称', trigger: 'blur' }
                ],
                signerType: [
                    { required: true, message: '签署方类型', trigger: 'change' }
                ],
                paramGroupId: [
                    { required: true, message: '选择合同企业', trigger: 'change' }
                ],
                agent: [
                    { required: true, message: '经办人', trigger: 'blur' }
                ],
                _signerDemand: [
                    { type: 'array', required: true, message: '请至少选择一个签署要求', trigger: 'change' }
                ]

            },
            rules: {}

        }
    },
    watch: {
        'signerTempForm.paramGroup' (value) {
            console.log(value)
            if (value) {
                this.$nextTick(() => {
                    if (this.contractType == 2) {
                        this.$refs.signerTempR.clearValidate('paramGroupId')
                    } else {
                        this.$refs.signerTempS.clearValidate('paramGroupId')
                    }
                })
            }
        }
    },
    computed: {
        ...mapGetters({
            caPage: 'contractTemp/caPage'
        })
    },
    methods: {
        ...mapActions({
            findCApage: 'contractTemp/findCApage'
        }),
        onShowDialog (val, arr, form) {
            // 类型
            this.signerTempForm = deepCopy(this.copy_signerTempForm)
            this.$nextTick(() => {
                if (val == 2) {
                    this.$refs.signerTempR.resetFields()
                } else {
                    this.$refs.signerTempS.resetFields()
                    this.onFindCApage()
                }
            })
            this.tract_visible = true
            this.contractType = val
            this.singerOps = arr
            if (form) {
                this.signerTempForm = { ...form }
            }
        },
        handleClose () {

        },
        async onFindCApage () {
            await this.findCApage({ pageNumber: 0, pageSize: -1, orgType: 1 })
            this.caOptions = this.caPage.records
        },
        onSaveSinger () {
            if (this.contractType == 2) {
                this.signerTempForm.signerDemand = this.signerTempForm._signerDemand
                this.signerTempForm.signerDemand = this.signerTempForm.signerDemand.toString()
                this.signerTempForm.paramGroupId = this.signerTempForm.paramGroup.groupId
                let objParam = {
                    type: 2, // 签署方==2
                    signerType: this.signerTempForm.signerType, // 签署方类型：1企业，2个人
                    signerName: this.signerTempForm.signerName,
                    paramGroupId: this.signerTempForm.paramGroup.groupId,
                    paramGroupName: this.signerTempForm.paramGroup.groupName,
                    agent: '发起人指定',
                    signerDemand: this.signerTempForm.signerDemand
                }
                this.$refs.signerTempR.validate(valid => {
                    if (valid) {
                        try {
                            this.tract_visible = false
                            if (this.signerTempForm.signerType == 1) {
                                this.singer_busArr.push(objParam)
                                this.$emit('backEvent', this.singer_busArr, 1)
                            } else {
                                this.singer_perArr.push(objParam)
                                this.$emit('backEvent', this.singer_perArr, 2)
                            }
                        } catch (error) {

                        }
                    } else {

                    }
                })
            } else {
                this.signerTempForm.signerDemand = this.signerTempForm._signerDemand
                this.signerTempForm.signerDemand = this.signerTempForm.signerDemand.toString()
                this.signerTempForm.paramGroupId = this.signerTempForm.paramGroup.groupId
                let objParam = {
                    type: 1, // 平台==1
                    signerType: 1, // 签署方类型：1企业
                    signerName: '平台方',
                    paramGroupId: this.signerTempForm.paramGroup.id,
                    paramGroupName: this.signerTempForm.paramGroup.companyName,
                    // agent: '发起人指定',
                    signerDemand: this.signerTempForm.signerDemand
                }
                this.singer_platArr.push(objParam)
                console.log(111, objParam)
                this.$emit('backEvent', this.singer_platArr, 3)
            }
            this.tract_visible = false
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
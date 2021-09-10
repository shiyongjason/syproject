<template>
    <div class="sign-dialog">
        <el-dialog v-if="tract_visible" :title="`${isEdit?'编辑':'添加'}${contractType==1?'平台':''}签署方`" :visible.sync="tract_visible" width="35%" :before-close="handleClose" :close-on-click-modal=false>
            <el-form :model="signerTempForm" :rules="signerTempFormrules" ref="signerTempR" label-width="140px" class="demo-signerTempForm" v-if="contractType==2">
                <el-form-item label="签署方名称：" prop="signerName">
                    <el-input v-model="signerTempForm.signerName" placeholder="请输入" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="签署方类型：" prop="signerType">
                    <el-radio-group v-model="signerTempForm.signerType" :disabled=isEdit @change="changeRadio">
                        <el-radio :label=1>企业</el-radio>
                        <el-radio :label=2>个人</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="signerTempForm.signerType == '2' ? '请选择合同个人：' : '请选择合同企业：'" prop="paramId">
                    <el-select v-model="signerTempForm.paramId" :placeholder="signerTempForm.signerType == '2' ? '请选择合同个人' : '请选择合同企业'" @change="changeId">
                        <el-option v-for="item in singerOps" :key="item.id" :label="item.groupName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经办人：" v-if="signerTempForm.signerType==1">
                    经办人由发起人指定
                </el-form-item>
                <el-form-item label="客户签署区：" prop="signatureParam">
                    <el-select v-model="signerTempForm.signatureParam" placeholder="请选择客户签署区" multiple>
                        <el-option v-for="item in customSignOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                        <template slot="empty">
                            <div class="select-empty">
                                <p>无剩余可选签署区</p>
                                <p>请新增签署区或取消已有签署区的关联关系</p>
                            </div>
                        </template>
                    </el-select>
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
                    平台方
                </el-form-item>
                <el-form-item label="签署方类型：" prop="">
                    企业
                </el-form-item>
                <el-form-item label="签署方企业来源：" prop="platformSignSource">
                    <el-radio-group v-model="signerTempForm.platformSignSource" @change="onChangeRadio">
                        <el-radio :label=1>指定企业</el-radio>
                        <el-radio :label=2>合同企业</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="签署方企业名称：" prop="caId" v-if="signerTempForm.platformSignSource==1" class="plat_signer">
                    <el-select v-model="signerTempForm.caId" placeholder="请选择签署方企业名称" @change="changeCa">
                        <el-option v-for="item in caOptions" :key="item.id" :label="item.companyName" :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <el-autocomplete class="inline-input" v-model="insertVal" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" @blur="autocompleteBlur">
                        <template slot-scope="{ item }">
                            <span>{{item.companyName}}</span>
                        </template>
                    </el-autocomplete> -->

                    <!-- <HAutocomplete ref="HAutocomplete" :placeholder="'请选择'" :maxlength=60 @back-event="backFindCA" :selectObj="paramCA" :selectArr="restaurants" v-if="restaurants" :remove-value='removeValue' :isSettimeout=false>
                    </HAutocomplete> -->
                </el-form-item>
                <el-form-item label='请选择合同企业' v-if="signerTempForm.platformSignSource==2" prop="platformSigner" >
                    <el-select v-model="signerTempForm.platformSigner" placeholder="请选择合同企业" @change="changeId">
                        <el-option v-for="item in contractSingnOps" :key="item.id" :label="item.groupName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签署要求：" prop="_signerDemand">
                    <el-checkbox-group v-model="signerTempForm._signerDemand">
                        <el-checkbox label="1" name="type">企业章</el-checkbox>
                        <!-- <el-checkbox label="2" name="type">法定代表人章</el-checkbox> -->
                        <!-- <el-checkbox label="2" name="type">手绘章</el-checkbox>
                        <el-checkbox label="3" name="type">模板章</el-checkbox> -->
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSaveSinger">确定保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { deepCopy } from '@/utils/utils'
import { mapGetters, mapActions } from 'vuex'
// import HAutocomplete from '@/components/autoComplete/HAutocomplete'
export default {
    // components: { HAutocomplete },
    props: {
        customSignAll: {
            type: Array,
            default: () => { }
        },
        customSignEx: {
            type: Array,
            default: () => { }
        }
    },
    data () {
        return {
            restaurants: [],
            insertVal: '',
            tract_visible: false,
            contractType: '',
            singerOps: [],
            contractSingnOps: [],
            caOptions: [],
            singer_busArr: [],
            singer_perArr: [],
            singer_platArr: [],
            signerTempForm: {
                signerName: '',
                signerType: 1,
                paramId: '',
                platformSignSource: 1,
                caId: '',
                platformSigner: '',
                createTime: '',
                createBy: '',
                agent: '',
                id: '',
                paramGroupName: '',
                // paramGroup: {},
                templateVersionId: '',
                signerDemand: '',
                _signerDemand: [],
                type: '',
                signatureParam: []
            },
            copy_signerTempForm: {
                signerName: '',
                signerType: 1,
                paramId: '',
                platformSignSource: 1,
                caId: '',
                platformSigner: '',
                createTime: '',
                createBy: '',
                agent: '',
                id: '',
                paramGroupName: '',
                // paramGroup: {},
                templateVersionId: '',
                signerDemand: '',
                _signerDemand: [],
                type: '',
                signatureParam: []
            },
            vaild_form: {},
            signerTempFormrules: {
                signerName: [
                    { required: true, message: '请输入签署方名称', trigger: 'blur' }
                ],
                signerType: [
                    { required: true, message: '请选择签署方类型', trigger: 'change' }
                ],
                signatureParam: [
                    { required: true, message: '请选择客户签署区', trigger: 'change' }
                ],
                paramId: [
                    {
                        required: true,
                        validator: (r, v, callback) => {
                            if (!v) {
                                if (this.signerTempForm.signerType == 1) {
                                    return callback(new Error('请选择合同企业'))
                                } else if (this.signerTempForm.signerType == 2) {
                                    return callback(new Error('请选择合同个人'))
                                }
                            }
                            return callback()
                        }
                    }
                ],
                platformSignSource: [
                    { required: true, message: '请选择签署方企业来源', trigger: 'change' }
                ],
                caId: [
                    {
                        required: true, message: '请选择签署方企业名称', trigger: 'change'
                    }
                ],
                platformSigner: [
                    {
                        required: true, message: '请选择合同企业', trigger: 'change'
                    }
                ],
                agent: [
                    { required: true, message: '经办人', trigger: 'blur' }
                ],
                _signerDemand: [
                    { type: 'array', required: true, message: '请至少选择一个签署要求', trigger: 'change' }
                ]

            },
            rules: {},
            isEdit: false,
            contart_arr: [],
            paramCA: {
                selectName: '',
                selectCode: ''
            },
            removeValue: false,
            // 记录弹出层弹出的时候默认值，以防止调整signatureParam选项的时候，下拉选项的值不对
            signatureParam: [],
            caOrgQueryRequest: {}
        }
    },
    computed: {
        ...mapGetters({
            caPage: 'contractTemp/caPage',
            contratList: 'contractTemp/contratList'
        }),
        customSignOptions () {
            const result = this.customSignAll.filter(item => {
                return !this.customSignEx.includes(item) || (this.signatureParam && this.signatureParam.includes(item))
            }).map(item => ({
                value: item,
                label: item.substring(0, item.indexOf('_'))
            }))
            return result
        }
    },
    methods: {
        ...mapActions({
            findCApage: 'contractTemp/findCApage',
            getContratList: 'contractTemp/getContratList'
        }),
        backFindCA (val) {
            this.signerTempForm.caId = val.value.id
            this.signerTempForm.paramGroupName = val.value.companyName
        },
        async onShowDialog (val, arr, form) {
            await this.onFindCApage()
            this.tract_visible = true
            // 类型
            this.signerTempForm = deepCopy(this.copy_signerTempForm)

            // this.onFindCApage()
            this.contractType = val
            this.contart_arr = arr
            this.isEdit = false
            if (form) {
                // 复制一份 做取消校验
                this.isEdit = true
                this.signerTempForm = { ...this.signerTempForm, ...form }
                this.signerTempForm._signerDemand = this.signerTempForm.signerDemand.split(',')
                this.vaild_form = deepCopy({ ...this.signerTempForm, ...form })
                // 校验字段是否被删除
                if (this.signerTempForm.paramId) {
                    const isHasID = this.contart_arr.filter(val => val.id == this.signerTempForm.paramId).length > 0
                    if (!isHasID) {
                        this.signerTempForm.paramId = ''
                    }
                }
                // 如果是企业类型 回显
                this.singerOps = this.contart_arr.filter(val => val.signerType == this.signerTempForm.signerType)
            } else {
                this.vaild_form = deepCopy(this.copy_signerTempForm)
                this.signerTempForm._signerDemand = []
                // // 如果是企业类型 默认 下拉里面 singerType==1
                this.singerOps = this.contart_arr && this.contart_arr.filter(val => val.signerType == 1)
            }
            this.signatureParam = this.signerTempForm.signatureParam ? this.signerTempForm.signatureParam.slice() : []
            this.$nextTick(async () => {
                if (val == 2) {
                    this.$refs.signerTempR.clearValidate()
                } else {
                    // await this.$refs.HAutocomplete.clearInput()
                    this.$refs.signerTempS.clearValidate()
                    if (val == 1) {
                        // 搜索下拉 回显数据
                        this.paramCA = {
                            selectCode: this.signerTempForm.caId,
                            selectName: this.signerTempForm.paramGroupName
                        }
                    }
                }
            })
        },
        handleClose () {
            if (JSON.stringify(this.vaild_form) != JSON.stringify(this.signerTempForm)) {
                this.$confirm('取消则不会保存当前修改', '提示', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '我再想想',
                    type: 'warning'
                }).then(() => {
                    this.tract_visible = false
                }).catch(() => {

                })
            } else {
                this.tract_visible = false
            }
        },
        async onFindCApage () {
            this.caOrgQueryRequest.orgType = 1
            await this.getContratList(this.caOrgQueryRequest)
            this.caOptions = this.contratList
        },
        changeRadio (val) {
            // 获取签署方
            this.singerOps = this.contart_arr.filter(item => {
                return item.signerType == val
            })
            // 默认个人 选中手绘章
            if (val == 2) {
                this.signerTempForm._signerDemand = ['3']
            } else {
                this.signerTempForm._signerDemand = []
            }
            this.signerTempForm.paramId = ''
            this.$refs.signerTempR.clearValidate('paramId')
        },
        onChangeRadio (val) {
            // 获取平台方签署合同企业类型
            console.log('this.contart_arr', this.contart_arr)
            this.contractSingnOps = this.contart_arr.filter(item => {
                return (item.selectCode == 'hosjoy_company_name' || item.paramKey == 'hosjoy_company_name')
            })
            if (val == 1) {
                this.signerTempForm.caId = ''
                this.signerTempForm.paramGroupName = ''
                // this.$refs.signerTempS.clearValidate('caId')
            } else {
                this.signerTempForm.platformSigner = ''
                // this.$refs.signerTempS.clearValidate('platformSigner')
            }
        },
        changeId (val) {
            this.signerTempForm.paramGroupName = this.singerOps.filter(item => item.id == val)[0].groupName
            this.signerTempForm.platformSigner = this.signerTempForm.paramGroupName
            // var aa = []
            // aa = this.singerOps.filter(item => item.id == val)
        },
        changeCa (val) {
            this.signerTempForm.paramGroupName = this.caOptions.filter(item => item.id == val)[0].companyName
        },
        onSaveSinger () {
            this.singer_busArr = []
            this.singer_perArr = []
            if (this.contractType == 2) {
                this.signerTempForm.signerDemand = [...this.signerTempForm._signerDemand]
                this.signerTempForm.signerDemand = this.signerTempForm.signerDemand.toString()
                // this.signerTempForm.paramGroupId = this.signerTempForm.paramGroup.groupId
                let objParam = {
                    type: 2, // 签署方==2
                    signerType: this.signerTempForm.signerType, // 签署方类型：1企业，2个人
                    signerName: this.signerTempForm.signerName,
                    paramId: this.signerTempForm.paramId,
                    paramGroupName: this.signerTempForm.paramGroupName,
                    agent: '发起人指定',
                    signerDemand: this.signerTempForm.signerDemand,
                    signatureParam: this.signerTempForm.signatureParam
                }
                this.$refs.signerTempR.validate(valid => {
                    if (valid) {
                        try {
                            if (this.signerTempForm.signerType == 1) {
                                this.singer_busArr.push(objParam)
                                this.$emit('backEvent', this.singer_busArr, 1)
                                this.tract_visible = false
                            } else {
                                this.singer_perArr.push(objParam)
                                this.$emit('backEvent', this.singer_perArr, 2)
                                this.tract_visible = false
                            }
                        } catch (error) {

                        }
                    }
                })
            } else {
                this.singer_platArr = []
                this.signerTempForm.signerDemand = [...this.signerTempForm._signerDemand]
                this.signerTempForm.signerDemand = this.signerTempForm.signerDemand.toString()
                // this.signerTempForm.paramGroupId = this.signerTempForm.paramGroup.groupId
                let objParam = {
                    type: 1, // 平台==1
                    signerType: 1, // 签署方类型：1企业
                    signerName: '平台方',
                    caId: this.signerTempForm.caId,
                    caOrgId: this.signerTempForm.caId,
                    paramGroupName: this.signerTempForm.paramGroupName,
                    platformSigner: this.signerTempForm.platformSigner,
                    platformSignSource: this.signerTempForm.platformSignSource,
                    // agent: '发起人指定',
                    signerDemand: this.signerTempForm.signerDemand
                }
                this.$refs.signerTempS.validate(valid => {
                    if (valid) {
                        try {
                            this.singer_platArr.push(objParam)
                            this.$emit('backEvent', this.singer_platArr, 3)
                            this.tract_visible = false
                        } catch (error) {

                        }
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.select-empty {
    padding: 10px;
    text-align: center;
    color: #999;
    font-size: 14px;
}
// /deep/ .el-dialog .el-input {
//     width: 280px;
// }
/deep/ .el-select .el-input {
    margin-left: 0;
}
 .plat_signer {
  /deep/   .el-input {
        width: 260px;
    }
}
</style>

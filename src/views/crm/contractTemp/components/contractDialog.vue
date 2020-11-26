<template>
    <div class="sign-dialog">
        <el-dialog :title="`${isEdit?'编辑':'添加'}${contractType==1?'平台':''}签署方`" :visible.sync="tract_visible" width="35%" :before-close="handleClose" :close-on-click-modal=false>
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
                    <el-select v-model="signerTempForm.paramId"  :placeholder="signerTempForm.signerType == '2' ? '请选择合同个人' : '请选择合同企业'" @change="changeId">
                        <el-option v-for="item in singerOps" :key="item.id" :label="item.groupName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经办人：" v-if="signerTempForm.signerType==1">
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
                <el-form-item label="平台企业：" prop="caId">
                    <!-- <el-select v-model="signerTempForm.caId" placeholder="请选择平台企业" @change="changeCa">
                        <el-option v-for="item in caOptions" :key="item.id" :label="item.companyName" :value="item.id">
                        </el-option>
                    </el-select> -->
                    <el-autocomplete class="inline-input" v-model="insertVal" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" @blur="autocompleteBlur">
                        <template slot-scope="{ item }">
                            <span>{{item.companyName}}</span>
                        </template>
                    </el-autocomplete>
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
export default {
    data () {
        return {
            restaurants: [],
            insertVal: '',
            tract_visible: false,
            contractType: '',
            singerOps: [],
            caOptions: [],
            singer_busArr: [],
            singer_perArr: [],
            singer_platArr: [],
            signerTempForm: {
                signerName: '',
                signerType: 1,
                paramId: '',
                caId: '',
                createTime: '',
                createBy: '',
                agent: '',
                id: '',
                paramGroupName: '',
                // paramGroup: {},
                templateVersionId: '',
                signerDemand: '',
                _signerDemand: [],
                type: ''
            },
            copy_signerTempForm: {
                signerName: '',
                signerType: 1,
                paramId: '',
                caId: '',
                createTime: '',
                createBy: '',
                agent: '',
                id: '',
                paramGroupName: '',
                // paramGroup: {},
                templateVersionId: '',
                signerDemand: '',
                _signerDemand: [],
                type: ''
            },
            vaild_form: {},
            signerTempFormrules: {
                signerName: [
                    { required: true, message: '请输入签署方名称', trigger: 'blur' }
                ],
                signerType: [
                    { required: true, message: '请选择签署方类型', trigger: 'change' }
                ],
                paramId: [
                    { required: true },
                    {
                        validator: (r, v, callback) => {
                            if (true) {
                                return callback(new Error('必填一项'))
                            }
                            return callback(new Error('必填一项'))
                        }
                    }
                ],
                caId: [
                    { required: true, message: '请选择平台企业', trigger: 'change' }
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
            contart_arr: []

        }
    },
    watch: {
        // 'signerTempForm.paramGroup' (value) {
        //     console.log(value)
        //     if (value) {
        //         this.$nextTick(() => {
        //             if (this.contractType == 2) {
        //                 this.$refs.signerTempR.clearValidate('paramGroupId')
        //             } else {
        //                 this.$refs.signerTempS.clearValidate('paramGroupId')
        //             }
        //         })
        //     }
        // }

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
        autocompleteBlur () {
            if (!this.insertVal.id) {
                let res = this.restaurants.filter(item => item.companyName == this.insertVal)
                console.log('res', res)
                this.signerTempForm.caId = res.id
            }
        },
        querySearch (queryString, cb) {
            let restaurants = this.restaurants
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            }
        },
        handleSelect (item) {
            this.signerTempForm.caId = item.id
            this.signerTempForm.paramGroupName = item.companyName
        },
        async onShowDialog (val, arr, form) {
            await this.onFindCApage()

            this.tract_visible = true
            console.log('编辑的form', val, arr, form)
            // 类型
            this.signerTempForm = deepCopy(this.copy_signerTempForm)

            this.$nextTick(() => {
                if (val == 2) {
                    this.$refs.signerTempR.clearValidate()
                } else {
                    this.$refs.signerTempS.clearValidate()
                }
            })

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
                // 如果是企业类型 默认 下拉里面 singerType==1
                this.singerOps = this.contart_arr.filter(val => val.signerType == this.signerTempForm.signerType)
            } else {
                this.vaild_form = deepCopy(this.copy_signerTempForm)
                // // 如果是企业类型 默认 下拉里面 singerType==1
                this.singerOps = this.contart_arr && this.contart_arr.filter(val => val.signerType == 1)
            }
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
            await this.findCApage({ pageNumber: 0, pageSize: -1, orgType: 1 })
            this.caOptions = this.caPage.records
            this.restaurants = JSON.parse(JSON.stringify(this.caOptions))
            this.restaurants.map(item => {
                item.value = item.companyName
            })
        },
        changeRadio (val) {
            this.singerOps = this.contart_arr.filter(item => {
                return item.signerType == val
            })
            // 默认个人 选中手绘章
            if (val == 2) {
                this.signerTempForm._signerDemand = ['3']
            }
            this.signerTempForm.paramId = ''
        },
        changeId (val) {
            this.signerTempForm.paramGroupName = this.singerOps.filter(item => item.id == val)[0].groupName
            // var aa = []
            // aa = this.singerOps.filter(item => item.id == val)
            console.log(val, this.signerTempForm.paramGroupName)
        },
        changeCa (val) {
            this.signerTempForm.paramGroupName = this.caOptions.filter(item => item.id == val)[0].companyName
        },
        onSaveSinger () {
            this.singer_busArr = []
            this.singer_perArr = []
            if (this.contractType == 2) {
                console.log('+++', this.signerTempForm._signerDemand)
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
                    signerDemand: this.signerTempForm.signerDemand
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
                    } else {

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
                    paramGroupName: this.signerTempForm.paramGroupName,
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
                    } else {

                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
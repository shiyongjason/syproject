<template>
    <div v-if="otherForm">
        <el-form :model="otherForm" :rules="baseRules" ref="otherForm" label-width="150px" class="demo-baseForm">
            <el-form-item label="员工数：" prop="staffNum">
                <el-input v-model.trim="otherForm.staffNum" placeholder="请输入员工数" v-isNum:0="otherForm.staffNum" maxlength="10" class=""></el-input>
            </el-form-item>
            <el-form-item label="销售员工数：" prop="salesmanNum">
                <el-input v-model.trim="otherForm.salesmanNum" v-isNum:0="otherForm.salesmanNum" placeholder="请输入销售员工数" maxlength="10" class=""></el-input>
            </el-form-item>
            <el-form-item label="施工队数：" prop="constructionTeamNum">
                <el-input v-model.trim="otherForm.constructionTeamNum" v-isNum:0="otherForm.constructionTeamNum" placeholder="请输入施工队数" maxlength="10" class=""></el-input>
            </el-form-item>
            <el-form-item label="监理数：" prop="supervisorNum">
                <el-input v-model.trim="otherForm.supervisorNum" v-isNum:0="otherForm.supervisorNum" placeholder="请输入监理数" maxlength="10" class=""></el-input>
            </el-form-item>
            <el-form-item label="门店数：" prop="storeNum">
                <el-input v-model.trim="otherForm.storeNum" v-isNum:0="otherForm.storeNum" placeholder="请输入门店数" maxlength="10" class=""></el-input>
            </el-form-item>
            <el-form-item label="门店类型：" prop="storeType">
                <el-input v-model.trim="otherForm.storeType"  placeholder="请输入门店类型" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="互联网工具需求：" prop="isInternetTools">
                <el-radio-group v-model.trim="otherForm.isInternetTools">
                    <el-radio :label=1>是</el-radio>
                    <el-radio :label=0>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="门店改造需求：" prop="isStoreRenovation">
                <el-radio-group v-model.trim="otherForm.isStoreRenovation">
                    <el-radio :label=1>是</el-radio>
                    <el-radio :label=0>否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
       <el-button style="margin-top: 12px;" @click="onSaveother" v-if="type=='edit'" :loading="loading">{{loading?'提交中':'保存'}}</el-button>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { updateDevelopother } from '../../api'
export default {
    name: 'otherForm',
    props: {
        otherForm: {
            type: Object,
            default: () => { }
        }
    },
    data () {
        return {
            type: this.$route.query.type,
            loading: false,
            baseRules: {
                staffNum: [
                    { required: true, message: '请输入员工数', trigger: 'blur' }
                ],
                salesmanNum: [
                    { required: true, message: '请输入销售员工数', trigger: 'blur' }
                ],
                constructionTeamNum: [
                    { required: true, message: '请输入施工队数', trigger: 'blur' }
                ],
                supervisorNum: [
                    { required: true, message: '请输入监理数', trigger: 'blur' }
                ],
                storeNum: [
                    { required: true, message: '请输入门店数', trigger: 'blur' }
                ],
                storeType: [
                    { required: true, message: '请输入门店类型', trigger: 'blur' }
                ],
                isInternetTools: [
                    { required: true, message: '请选择互联网工具需求', trigger: 'change' }
                ],
                isStoreRenovation: [
                    { required: true, message: '请选择门店改造需求', trigger: 'change' }
                ]
            },
            systemArr: [],
            companyArr: [],
            proviceList: [],
            companyTypeList: [],
            mainSystemList: [],
            radio: '',
            imageUrl: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            devDepList: state => state.devDepList
        }),
        ...mapGetters({
        })
    },
    mounted () {
        // this.otherForm.companyCode = this.userInfo.oldDeptCode
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        async onFinddevlist () {
            await this.getDevdeplist({ organizationType: 1 })
            this.companyData = this.devDepList.data
        },
        onSaveotherFrom () {
            this.$refs.otherForm.validate((valid) => {
                if (valid) {
                    this.$emit('backnext')
                }
            })
        },
        onSaveother () {
            this.loading = true
            this.$refs.otherForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await updateDevelopother(this.otherForm)
                        this.$message.success('平台公司更新成功！')
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/developonline/developlist')
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.deveInput {
    width: 50%;
}
.demo-baseForm {
    width: 90%;
    margin: 10px auto;
}
.line {
    text-align: center;
}
</style>

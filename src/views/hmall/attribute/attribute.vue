<template>
    <div class="attribute">
        <div class="page-body">
            <div class="page-body-cont">
                <div class="page-header">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>属性管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="page-wrap flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">属性编码：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    type="text"
                                    maxlength="50"
                                    v-model="queryParams.parameterCode"
                                    placeholder="请输入属性编码">
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">属性名称：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    type="text"
                                    maxlength="50"
                                    v-model="queryParams.parameterName"
                                    placeholder="请输入属性名称">
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">属性类型：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.type" style="width: 100%">
                                    <el-option
                                        v-for="item in attrTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">属性状态：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.status" style="width: 100%">
                                    <el-option
                                        v-for="item in attrStatusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">维护人：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    type="text"
                                    maxlength="50"
                                    v-model="queryParams.updateBy"
                                    placeholder="请输入维护人姓名">
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-cont">
                                <el-button type="primary" class="ml20" @click="onQuery()">
                                    搜索
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <AttributeTable
                    :tableData="tableData"
                    :paginationData="paginationData"
                    @updateStatus="onQuery"
                    @updateAttribute="updateAttributeChange"
                    @openMark="openMark"
                    @onSizeChange="onSizeChange"
                    @onCurrentChange="onCurrentChange">
                </AttributeTable>
            </div>
        </div>
        <el-dialog
            title="属性编辑"
            :visible.sync="dialogAttributeEdit"
            :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth" >
                <el-form-item label="属性编号" v-if="this.status === 'modify'">
                    {{form.parameterCode}}
                </el-form-item>
                <el-form-item prop="categoryList" label="归属类目">
                    <el-checkbox-group v-model="form.categoryList">
                        <el-checkbox
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.id">
                            {{item.categoryName}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="属性名称" prop="parameterName">
                    <el-input
                        v-model="form.parameterName"
                        placeholder="请输入属性名称"
                    maxlength="25"
                        style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="属性类型">
                    <el-select v-model="form.type" style="width: 300px">
                        <el-option label="输入框" :value="1"></el-option>
                        <el-option label="下拉框" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="form.type === 2">
                    <el-form-item
                        v-for="(item, index) in form.values"
                        :label="'选项' + (index+1)"
                        :key="index"
                        :prop="`values[${index}].value`">
                        <el-input v-model="item.value" style="width: 200px" maxlength="25"></el-input>
                        <span
                            @click.prevent="removeformValues(index)"
                            class="ml10 el-icon-remove-outline form-add-remove"
                            v-if="form.values.length > 1"></span>
                        <span
                            @click.prevent="addformValues(item)"
                            class="ml10 el-icon-circle-plus-outline form-add-remove"
                            v-if="form.values.length < 10 && index + 1 === form.values.length"></span>
                    </el-form-item>
                </template>
                <el-form-item label="单位" v-if="form.type ===1">
                    <el-input
                        v-model="form.unit"
                        placeholder="输入参数项，例如 P、KW等"
                        maxlength="10"
                        style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="isRequired" label="是否必填">
                    <el-radio-group v-model="form.isRequired">
                        <el-radio :label="1">必填</el-radio>
                        <el-radio :label="0">非必填</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAttributeEdit = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" :loading="isSaving">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import AttributeTable from './components/attributeTable'
import { mapState } from 'vuex'
import { findAttributeList, createAttribute, findCategoryList, updateAttribute, findAttributeDetails } from './api/index'
import { ATTRIBUTE_TYPE, ATTRIBUTE_STATUS } from './const'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'attribute',
    components: {
        AttributeTable
    },
    data () {
        return {
            queryParams: {
                type: '',
                status: ''
            },
            dialogAttributeEdit: false,
            status: 'add',
            form: {
                parameterCode: '',
                categoryList: [],
                parameterName: '',
                type: 1,
                values: [{ value: '' }],
                unit: '',
                isRequired: 0 // 默认值为非必填
            },
            tempForm: {},
            formLabelWidth: '150px',
            baseRules: {
                categoryList: [
                    { type: 'array', required: true, trigger: 'change', message: '归属类目不能为空' }
                ],
                parameterName: [
                    { required: true, whitespace: true, message: '属性名称不能为空', trigger: 'blur' }
                ],
                isRequired: [
                    { required: true, message: '是否必填不能为空', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '属性类型不能为空', trigger: 'change' }
                ]
            },
            tableData: [],
            modifyId: 0,
            paginationData: {},
            categoryList: [], // 一级类目列表
            attrTypeOptions: ATTRIBUTE_TYPE,
            attrStatusOptions: ATTRIBUTE_STATUS,
            isSaving: false
        }
    },
    computed: {
        rules () {
            let asyncRule = {}
            if (this.form.type === 2) {
                this.form.values.forEach((item, index) => {
                    asyncRule[`values[${index}].value`] = [
                        { required: true, message: '此项为必填项！', trigger: 'blur' }
                    ]
                })
            }
            return Object.assign(this.baseRules, asyncRule)
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    watch: {
        'form.type' (val) {
            val === 1 ? this.form.values = [{ value: '' }] : this.form.unit = ''
        }
    },
    methods: {
        submitForm (formName) {
            if (this.isSaving) {
                return
            }
            this.isSaving = true
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        let temp = this.form.values.map(item => item.value)
                        let flag = [...new Set(temp)].length === this.form.values.length
                        if (!flag) {
                            this.$message({
                                type: 'error',
                                message: '下拉选项值不能重复'
                            })
                            this.isSaving = false
                            return
                        }
                        try {
                            await this.saveAttribute()
                            this.isSaving = false
                        } catch (e) {
                            this.isSaving = false
                        }
                    } catch (e) {
                        this.isSaving = false
                    }
                } else {
                    this.isSaving = false
                }
            })
        },
        async saveAttribute () {
            let { ...params } = this.form
            if (params.type === 1) {
                delete params.values
            } else if (params.type === 2) {
                params.values = params.values.map(item => item.value)
            }
            params.operator = this.userInfo.name
            if (this.status === 'add') {
                await createAttribute(params)
            } else if (this.status === 'modify') {
                await updateAttribute(this.modifyId, params)
            }
            this.dialogAttributeEdit = false
            this.onQuery()
            this.$message({
                message: this.status === 'add' ? '属性添加成功！' : '属性修改成功！',
                type: 'success'
            })
        },
        async findAttributeDetails () {
            const { data } = await findAttributeDetails(this.modifyId)
            this.form = {
                parameterCode: data.parameterCode,
                parameterName: data.parameterName,
                categoryList: data.categoryList.map(item => item.id),
                type: data.type,
                values: data.values ? data.values.map(item => ({ value: item })) : [{ value: '' }],
                unit: data.unit,
                isRequired: data.isRequired
            }
            this.status = 'modify'
            this.dialogAttributeEdit = true
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        async onQuery () {
            const { ...params } = this.queryParams
            const { data } = await findAttributeList(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.onQuery()
        },
        openMark (status) {
            this.isSaving = false
            this.form = deepCopy(this.tempForm)
            this.status = status
            this.dialogAttributeEdit = true
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        async findCategoryList () {
            const { data } = await findCategoryList()
            this.categoryList = data
            // this.categoryList.forEach((value) => {
            //     this.form.categoryList.push(value.id)
            // })
        },
        removeformValues (index) {
            this.form.values.splice(index, 1)
        },
        addformValues () {
            this.form.values.push({
                value: ''
            })
        },
        updateAttributeChange (col) {
            this.modifyId = col.id
            this.findAttributeDetails()
            this.isSaving = false
        }
    },
    async mounted () {
        this.onQuery()
        await this.findCategoryList()
        this.tempForm = deepCopy(this.form)
    }
}
</script>

<style scoped>
.form-add-remove{
    font-size: 22px;
    color: #ff9c31;
    cursor: pointer;
    line-height: 40px;
    vertical-align: top;
}
    .flex-wrap-row{
        max-width: 1350px;
    }
</style>

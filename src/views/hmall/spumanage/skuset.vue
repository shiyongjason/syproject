<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">属性编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.parameterCode" placeholder="请输入属性编码">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">属性类别名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.parameterName" placeholder="请输入属性名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">属性类型：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.type">
                        <el-option v-for="item in attrTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">维护人：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.updateBy" placeholder="请输入维护人姓名">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20">
                        搜索
                    </el-button>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="openMark()">
                    新增属性
                </el-button>
                <el-button type="primary" class="ml20" @click="updateAttributeMultiStatus(1)">批量生效</el-button>
                <el-button type="primary" class="ml20" @click="updateAttributeMultiStatus(2)">批量失效</el-button>
            </div>
        </div>
        <!-- <AttributeTable :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateAttribute="updateAttributeChange" @openMark="openMark" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
            </AttributeTable> -->
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange"  :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="action" slot-scope="scope">
                    <el-button @click="modify(scope.row)" class="orangeBtn">修改</el-button>
                    <!--:class="scope.row.status === 2 ? '' : 'status-on'"-->
                    <el-button class="orangeBtn" @click="updateAttributeStatus(scope.row.data)" v-text="scope.data.row.status === 2 ? '生效' : '失效'">
                    </el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { findAttributeList, createAttribute, updateAttribute, findAttributeDetails } from './api/index'
import { ATTRIBUTE_TYPE } from '../store/const'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'skuset',
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
            tableLabel: [{ label: '属性编码', prop: 'parameterCode' },
                { label: '属性名称', prop: 'parameterName', width: '150' },
                { label: '属性类型', prop: 'type' },
                { label: '单位', prop: 'unit' },
                { label: '是否必填', prop: 'isRequired' },
                { label: '状态', prop: 'status' },
                { label: '维护人', prop: 'updateBy' },
                { label: '维护时间', prop: 'updateTime', width: '200' }
            ],
            rowKey: '',
            paginationData: {},
            multiSelection: [],
            attrTypeOptions: ATTRIBUTE_TYPE

        }
    },
    computed: {
        // rules () {
        //     let asyncRule = {}
        //     if (this.form.type === 2) {
        //         this.form.values.forEach((item, index) => {
        //             asyncRule[`values[${index}].value`] = [
        //                 { required: true, message: '此项为必填项！', trigger: 'blur' }
        //             ]
        //         })
        //     }
        //     return Object.assign(this.baseRules, asyncRule)
        // },
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
            params.operator = this.userInfo.employeeName
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
        },
        async searchList () {
            const { ...params } = this.queryParams
            const { data } = await findAttributeList(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        handleSizeChange (val) {
            this.queryParams.size = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
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
        updateAttributeMultiStatus (status) {
            let multiSelection = this.multiSelection && this.multiSelection.map(val => val.id)
            console.log(multiSelection)
        }
    },
    async mounted () {
        this.searchList()
        this.tempForm = deepCopy(this.form)
    }
}
</script>

<style scoped>
.form-add-remove {
    font-size: 22px;
    color: #ff9c31;
    cursor: pointer;
    line-height: 40px;
    vertical-align: top;
}
.flex-wrap-row {
    max-width: 1350px;
}
</style>

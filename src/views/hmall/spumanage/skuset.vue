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
                        查询
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
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey"
                :isShowIndex='true'>
                <template slot="updateTime" slot-scope="scope">
                    {{scope.data.row.updateTime|formatDate}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onEditSpu(scope.data.row)">修改</el-button>
                    <el-button :type="scope.data.row.status ==1?'primary':''" size="mini" plain @click="onChangeSpu(scope.data.row)" v-text="scope.data.row.status === 1 ? '失效' : '生效'">
                    </el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="新建属性" :visible.sync="dialogAttributeEdit" :close-on-click-modal="false">
            <div class="cate-cont">
                <div class="cont-box">
                    <p v-for="(item,index) in categoryFirst" :key="item.id" :class="curIndex==index ? 'active' : ''" @click="onSelect(index,item,1)">
                        {{ item.categoryName }}
                    </p>
                </div>
                <div class="cont-box">
                     <p v-for="(item,index) in categorySecond" :key="item.id" :class="senIndex==index ? 'active' : ''" @click="onSelect(index,item,2)">
                        {{ item.categoryName+'-'+index }}
                    </p>
                </div>
                <div class="cont-box">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                        @change="handleCheckAllChange" class="check-all" v-if="categoryThird.length > 0">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedCates" @change="onHandleCates">
                        <el-checkbox v-for="(item,index) in categoryThird"
                            :key="index" :label="`${item.id}_${item.categoryName}`">{{item.categoryName}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="cont-box">
                    <div v-for="item in checkedCateObj" :key="item.id" class="selected-cate">
                        {{item.categoryName}}<i class="el-icon-close ml5" @click="onRemoveSelectedCate(item)"></i>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { findAttributeList, createAttribute, updateAttribute, findAttributeDetails, findCategoryByParent } from './api/index'
import { ATTRIBUTE_SET } from '../store/const'
export default {
    name: 'skuset',
    data () {
        return {
            curIndex: -1,
            senIndex: -1,
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
                { label: '属性类别名称', prop: 'parameterName', width: '150' },
                { label: '所属一级类目', prop: 'type' },
                { label: '所属二级类目', prop: 'type' },
                { label: '所属三级类目', prop: 'type' },
                { label: '状态', prop: 'status' },
                { label: '维护人', prop: 'updateBy' },
                { label: '维护时间', prop: 'updateTime', width: '200' }
            ],
            rowKey: '',
            paginationData: {},
            multiSelection: [],
            attrTypeOptions: ATTRIBUTE_SET,
            categoryFirst: [],
            categorySecond: [],
            categoryThird: [],
            copyCategoryThird: [],
            radio: '',
            isIndeterminate: false,
            checkedCates: [],
            checkAll: false
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
        checkedCateObj () {
            return this.checkedCates.map(item => {
                const pos = item.indexOf('_')
                return {
                    categoryName: item.slice(pos + 1),
                    id: item.slice(0, pos)
                }
            })
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
        async onSelect (index, item, val) {
            const { data } = await findCategoryByParent({
                parentId: item.id
            })
            if (val == 1) {
                this.curIndex = index
                this.senIndex = -1
                this.categoryThird = []
                this.categorySecond = data
            } else {
                this.senIndex = index
                this.categoryThird = data
                this.copyCategoryThird = JSON.parse(JSON.stringify(data))
                this._handleCheckAllStatus()
            }
        },
        onRemoveSelectedCate (param) {
            const pos = this.checkedCates.indexOf(param.id + '_' + param.categoryName)
            this.checkedCates.splice(pos, 1)
        },
        handleCheckAllChange (val) {
            const all = this.copyCategoryThird.map(item => item.id + '_' + item.categoryName)
            if (val) {
                this.checkedCates = this.checkedCates.concat(all)
            } else {
                this.checkedCates = this.checkedCates.filter(item => !all.includes(item))
            }
            this.isIndeterminate = false
        },
        onHandleCates () {
            this._handleCheckAllStatus()
        },
        _handleCheckAllStatus () {
            const notChecked = this.categoryThird.filter(item => this.checkedCates.filter(obj => obj === item.id + '_' + item.categoryName) <= 0)
            this.checkAll = notChecked.length == 0
            this.isIndeterminate = notChecked.length < this.categoryThird.length && !this.checkAll
        },
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
            this.dialogAttributeEdit = true
        },
        updateAttributeMultiStatus (status) {
            let multiSelection = this.multiSelection && this.multiSelection.map(val => val.id)
            console.log(multiSelection)
        },
        onShowNext (val, arr, item) {
            item.isOn = !val
        }
    },
    async mounted () {
        this.searchList()
        const { data } = await findCategoryByParent({
            parentId: 0
        })
        data && data.forEach((value) => {
            value.isOn = false
        })
        this.categoryFirst = data
    }
}
</script>

<style lang="scss" scoped>
.check-all {
    padding: 5px;
}
.selected-cate {
    display: inline-block;
    padding: 5px;
    border: 1px solid #ffcab5;
    margin: 5px;
    background-color: #fff2ec;
    border-radius: 3px;
}
.cate-cont {
    display: flex;
    padding: 20px 0;
    .cont-box {
        height: 350px;
        overflow-y: scroll;
        flex: 1;
        justify-content: space-around;
        border: 1px solid #cccccc;
        margin: 0 2px;

        p {
            padding: 5px;
            cursor: pointer;
        }
        .active {
            background: #ff7a45;
            color: #fff;
        }
        /deep/.el-radio-group {
            display: flex;
            flex-direction: column;
            .el-radio {
                padding: 5px;
            }
        }
        /deep/.el-checkbox-group {
            display: flex;
            flex-direction: column;
            .el-checkbox {
                padding: 5px;
            }
        }
    }
}
::-webkit-scrollbar {
    width: 8px;
    background: transparent;
}
</style>

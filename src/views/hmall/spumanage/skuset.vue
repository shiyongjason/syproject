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
                <div class="query-col-title">属性状态：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.status">
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
                    <el-button type="primary" class="ml20" @click="searchList()">
                        查询
                    </el-button>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="openMark()">
                    新增属性
                </el-button>
                <el-button type="primary" class="ml20" @click="onUpdateAttr(1)">批量生效</el-button>
                <el-button type="primary" class="ml20" @click="onUpdateAttr(2)">批量失效</el-button>
                <!-- <el-button type="primary" class="ml20" @click="onExport()">导出</el-button> -->
            </div>
        </div>
        <!-- <AttributeTable :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateAttribute="updateAttributeChange" @openMark="openMark" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
            </AttributeTable> -->
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status==2?'red':''">{{scope.data.row.status==1?'生效':'失效'}}</span>
                </template>
                <template slot="updateTime" slot-scope="scope">
                    {{scope.data.row.updateTime|formatDate}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onEditSpu(scope.data.row)">修改</el-button>
                    <el-button :type="scope.data.row.status ==2?'primary':''" size="mini" plain @click="onChangeSpu(scope.data.row)" v-text="scope.data.row.status === 1 ? '失效' : '生效'">
                    </el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog :title="markTitle" :visible.sync="dialogAttributeEdit" :close-on-click-modal="false">
            <el-form :model="formData" ref="baseForm" :rules="baseRules" label-width="120px">
                <div class="cate-cont">
                    <div class="cont-box">
                        <p v-for="(item,index) in categoryFirst" :key="item.id" :class="curIndex==index ? 'active' : ''" @click="onSelect(index,item,1)">
                            {{ item.categoryName}}
                        </p>
                    </div>
                    <div class="cont-box">
                        <p v-for="(item,index) in categorySecond" :key="item.id" :class="senIndex==index ? 'active' : ''" @click="onSelect(index,item,2)">
                            {{ item.categoryName}}
                        </p>
                    </div>
                    <div class="cont-box">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="check-all" v-if="categoryThird.length > 0">全选</el-checkbox>
                        <el-checkbox-group v-model="checkedCates" @change="onHandleCates">
                            <el-checkbox v-for="(item,index) in categoryThird" :key="index" :label="`${item.id}_${item.categoryName}`">{{item.categoryName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="cont-box">
                        <div v-for="item in checkedCateObj" :key="item.id" class="selected-cate">
                            {{item.categoryName}}<i class="el-icon-close ml5" @click="onRemoveSelectedCate(item)"></i>
                        </div>
                    </div>
                </div>
                <el-form-item label="属性名称：" prop="parameterName">
                    <el-input v-model="formData.parameterName" maxlength="6"></el-input>
                </el-form-item>
                <el-form-item v-for="(item, index) in formData.values" :label="'属性值' + (index+1)+'：'" :key="index" :rules="{required: true, message: '属性值不能为空', trigger: 'blur'}" :prop="'values.'+index+'.value'">
                    <!-- <el-input v-model="item.value" style="width: 200px" maxlength="25" :disabled="operate=='modify'&&index < valueLength"></el-input> -->
                    <el-input v-model="item.value" style="width: 200px" maxlength="25"></el-input>
                    <span @click.prevent="removeformValues(index)" class="ml10 el-icon-remove-outline form-add-remove" v-if="formData.values.length > 1 && item.hasDelete"></span>
                    <span @click.prevent="addformValues(item)" class="ml10 el-icon-circle-plus-outline form-add-remove" v-if="index + 1 === formData.values.length && index < 9"></span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAttributeEdit = false">取 消</el-button>
                <el-button type="primary" @click="submitForm()" :loading="isSaving">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { findAttributeList, createAttribute, updateAttribute, findAttributeDetails, findCategoryByParent, updateAttributeStatus } from './api/index'
import { ATTRIBUTE_SET } from '../store/const'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'skuset',
    data () {
        return {
            isSaving: false,
            curIndex: -1,
            senIndex: -1,
            queryParams: {
                type: '',
                status: '',
                parameterType: 1
            },
            dialogAttributeEdit: false,
            formData: {
                parameterCode: '',
                categoryList: [],
                parameterName: '',
                type: 1,
                values: [{ value: '' }],
                unit: '',
                isRequired: 0, // 默认值为非必填
                parameterType: 1 // 销售属性默认1
            },
            tempObj: {},
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
            tableLabel: [
                { label: '属性编码', prop: 'parameterCode' },
                { label: '属性类别名称', prop: 'parameterName', width: '150' },
                { label: '属性值', prop: 'parameterValueStr', width: '350' },
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
            isIndeterminate: false,
            checkedCates: [],
            checkAll: false,
            operate: '',
            markTitle: '新增属性',
            valueLength: 0,
            valueData: '',
            modifyId: ''
        }
    },
    computed: {
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
        valueData (val) {

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
            this._handleCheckAllStatus()
        },
        handleCheckAllChange (val) {
            const all = this.copyCategoryThird.map(item => item.id + '_' + item.categoryName)
            if (val) {
                this.checkedCates = this.checkedCates.concat(all.filter(item => !this.checkedCates.includes(item)))
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
        submitForm () {
            this.formData.categoryList = this.checkedCateObj && this.checkedCateObj.map(val => val.id)
            if (this.isSaving) {
                return
            }
            this.isSaving = true
            if (this.formData.categoryList.length < 1) {
                this.$message({
                    type: 'error',
                    message: '归属类目不能为空'
                })
                this.isSaving = false
                return
            }
            this.$refs['baseForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        let temp = this.formData.values.map(item => item.value)
                        let flag = [...new Set(temp)].length === this.formData.values.length
                        if (!flag) {
                            this.$message({
                                type: 'error',
                                message: '属性值不能重复'
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
            let { ...params } = this.formData
            params.operator = this.userInfo.employeeName
            params.parameterValues = params.values
            if (this.operate === 'add') {
                console.log(params)
                await createAttribute(params)
            } else if (this.operate === 'modify') {
                console.log(params)
                await updateAttribute(this.modifyId, params)
            }
            this.dialogAttributeEdit = false
            this.searchList()
            this.$message({
                message: this.status === 'add' ? '属性添加成功！' : '属性修改成功！',
                type: 'success'
            })
        },
        async onEditSpu (val) {
            this.markTitle = '修改属性'
            this.senIndex = -1
            this.curIndex = -1
            this.isIndeterminate = false
            this.checkedCates = []
            this.categorySecond = []
            this.categoryThird = []
            this.formData.values = []
            const { data } = await findAttributeDetails(val.id)
            data.values.map(item => {
                if (data.notDeletedValues.indexOf(item.id) !== -1) {
                    item.hasDelete = false
                } else {
                    item.hasDelete = true
                }
            })
            console.log(data)
            this.formData = {
                parameterCode: data.parameterCode,
                parameterName: data.parameterName,
                categoryList: data.categoryList.map(item => item.id),
                type: data.type,
                values: data.values,
                unit: data.unit,
                isRequired: data.isRequired
            }
            console.log(this.formData)
            // TODO 禁用和三级类目
            this.valueData = data.values
            this.valueLength = data.values && data.values.length
            this.checkedCates = data.categoryList && data.categoryList.map(item => item.id + '_' + item.categoryName)
            this.operate = 'modify'
            this.modifyId = val.id
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
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        openMark () {
            this.operate = 'add'
            this.markTitle = '新增属性'
            this.formData = deepCopy(this.tempObj)
            this.senIndex = -1
            this.curIndex = -1
            this.isIndeterminate = false
            this.checkedCates = []
            this.categorySecond = []
            this.categoryThird = []
            this.dialogAttributeEdit = true
            this.$nextTick(() => {
                this.$refs['baseForm'].clearValidate()
            })
        },
        async onUpdateAttr (status) {
            let multiSelection = this.multiSelection && this.multiSelection.map(val => val.id)
            if (multiSelection.length < 1) {
                this.$message({
                    message: '请先选择属性！',
                    type: 'warning'
                })
                return
            }
            const params = {
                parameterIds: multiSelection,
                status: status,
                updateBy: this.userInfo.employeeName
            }
            await updateAttributeStatus(params)
            this.$message({
                message: params.status === 2 ? '属性已失效！' : '属性已生效！',
                type: 'success'
            })
            this.searchList()
        },
        async onChangeSpu (val) {
            const params = {
                parameterIds: [val.id],
                status: val.status === 1 ? 2 : 1,
                updateBy: this.userInfo.employeeName
            }
            await updateAttributeStatus(params)
            this.$message({
                message: params.status === 2 ? '属性已失效！' : '属性已生效！',
                type: 'success'
            })
            this.searchList()
        },
        removeformValues (index) {
            if (index < this.valueLength) {
                this.valueLength = this.valueLength - 1
            }
            this.formData.values.splice(index, 1)
        },
        addformValues () {
            this.formData.values.push({
                value: '',
                hasDelete: true
            })
        }
    },
    async mounted () {
        this.searchList()
        const { data } = await findCategoryByParent({
            parentId: 0
        })
        this.categoryFirst = data
        this.tempObj = deepCopy(this.formData)
        console.log(this.tempObj)
    }
}
</script>

<style lang="scss" scoped>
.check-all {
    padding: 5px;
}
.selected-cate {
    display: inline-block;
    padding: 3px;
    border: 1px solid #ffcab5;
    margin: 5px;
    background-color: #fff2ec;
    border-radius: 3px;
    font-size: 12px;
}
/deep/.el-dialog__body {
    padding: 10px 10px 40px 10px;
    height: 500px;
    overflow-y: scroll;
}
.cate-cont {
    display: flex;
    padding-bottom: 10px;
    .cont-box {
        height: 250px;
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
.form-add-remove {
    color: #ff7a45;
    font-size: 20px;
}
</style>

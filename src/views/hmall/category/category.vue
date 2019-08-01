<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="page-header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>类目管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="flex-wrap-row pt20" style="background-color: #fff">
                <div class="flex-wrap-box">
                    <div class="flex-wrap-cont">
                        <el-button type="primary" class="ml20" @click="onShowAdd('child')" v-if="current.level !== 3">
                            添加子类目
                        </el-button>
                        <el-button class="ml20 disabeld" v-else>添加子类目</el-button>
                        <el-button type="primary" class="ml20" @click="onShowAdd('brother')">
                            添加同类目
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="page-box base-table">
                <tree-table
                    ref="treeTable"
                    :data="data"
                    :columns="columns"
                    :selectable="false"
                    :expand-type="false"
                    :row-style="tableRowStyle"
                    children-prop="categoryList"
                    @cell-click="onCellSelected"
                    @expand-cell-click="onExpandCell"
                    @tree-icon-click="onExpandCell">
                    <template slot="operations" slot-scope="scope">
                        <span class="action mr10" @click="onShowEdit(scope.row)">修改</span>
                        <span class="action mr10" @click="onMove(scope.row, -1)" v-if="!scope.row.isFirst">上移</span>
                        <span class="action mr10 disabled" v-if="scope.row.isFirst">上移</span>
                        <span class="action mr10" @click="onMove(scope.row, 1)" v-if="!scope.row.isLast">下移</span>
                        <span class="action mr10 disabled" v-if="scope.row.isLast">下移</span>
                        <span class="action mr10" @click="onShowParams(scope.row)" v-if="scope.row.level === 2">设置参数</span>
                        <span class="action mr10" @click="onShowBrands(scope.row)" v-if="scope.row.level === 2">关联品牌</span>
                    </template>
                </tree-table>
            </div>
        </div>
        <el-dialog title="类目编辑" :visible.sync="editVisible">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="150px">
                <div class="edit-form-item">
                    <span class="mr20">
                        <label class="item-label">类目编号：</label>{{ this.form.categoryCode ? this.form.categoryCode : '--' }}
                    </span>
                    <span><label class="item-label">类目层级：</label>{{ this.form.level }}</span>
                </div>
                <div class="edit-form-item">
                    <span><label class="item-label">父类目：</label>{{ this.form.parentName ? this.form.parentName : '--'  }}</span>
                </div>
                <el-form-item label="类目名称" prop="categoryName" v-if="editVisible">
                    <el-input
                        class="form-input"
                        v-model="form.categoryName"
                        placeholder="请输入类目名称"
                        maxlength="25"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editVisible = false">取消</el-button>
                    <el-button type="primary" @click="onEditCategory">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="设置参数" :visible.sync="paramsVisible" width="960px">
            <div class="mb10">类目名称：{{ this.current.categoryName }}</div>
            <el-transfer
                v-model="selectedParams"
                :data="paramsList"
                :titles="paramsTitle"
                :props="{'key': 'parameterId', 'label': 'parameterName','isRequired': 'isRequired'}" class="settingParams">
                <div slot-scope="{ option }">
                    {{option.parameterName}}
                    <div @click.stop.prevent="onIsRequired(option.parameterId)" style="float: right;width: 80px" v-if="selectedParams.indexOf(option.parameterId)>-1">
                        <label class="el-checkbox el-transfer-panel__item">
                           <span class="el-checkbox__input" :class="option.isRequired ? 'is-checked' : ''">
                                <span class="el-checkbox__inner"></span><span style="vertical-align: text-top;margin-left: 8px">必填</span>
                           </span>
                        </label>
                    </div>
                </div>
                <span>必填</span>
            </el-transfer>
            <div class="mt10">
                <el-button @click="paramsVisible = false">取消</el-button>
                <el-button type="primary" @click="onLinkParams">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="关联品牌" :visible.sync="brandsVisible" :before-close="brandClose">
            <div class="mb10">类目名称：{{ this.current.categoryName }}</div>
            <el-transfer
                v-model="selectedBrands"
                :data="brandsList"
                :titles="brandsTitle"
                filterable
                filter-placeholder="请输入品牌名称"
                :props="{'key': 'brandId', 'label': 'brandName'}" ref="brandRef"></el-transfer>
            <div class="mt10">
                <el-button @click="brandsVisible = false">取消</el-button>
                <el-button type="primary" @click="onLinkBrands">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    findAllCategory, updateCategory, createCategory,
    moveCategory, linkParams, linkBrands, findLinkParams, findLinkBrands } from './api/index.js'
// import moment from 'moment'
import { mapState } from 'vuex'

export default {
    name: 'category-list',
    data () {
        return {
            data: [],
            brandsTitle: ['未添加品牌', '已添加品牌'],
            paramsTitle: ['未选参数', '已选参数'],
            selectedBrands: [],
            selectedParams: [],
            brandsList: [],
            paramsList: [],
            columns: [
                {
                    title: '类目名称',
                    key: 'categoryName',
                    width: '400px'
                },
                {
                    title: '类目编码',
                    key: 'categoryCode',
                    align: 'center',
                    headerAlign: 'center',
                    minWidth: '50px'
                },
                {
                    title: '维护人',
                    key: 'updateBy',
                    align: 'center',
                    headerAlign: 'center'
                },
                {
                    title: '维护时间',
                    key: 'updateTime',
                    align: 'center',
                    headerAlign: 'center',
                    minWidth: '200px'
                },
                {
                    title: '操作',
                    headerAlign: 'center',
                    minWidth: '200px',
                    type: 'template',
                    template: 'operations'
                }
            ],
            // 当前选中的类目，所有的操作都基于这个数据
            current: {},
            isEdit: false,
            editVisible: false,
            paramsVisible: false,
            brandsVisible: false,
            rules: {
                categoryName: [
                    { required: true, whitespace: true, message: '此项为必填项', trigger: 'blur' }
                ]
            },
            form: {
                id: '',
                level: 1,
                parentCode: '',
                parentName: '',
                categoryName: ''
            },
            expandCell: [],
            isSaving: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onIsRequired (id) {
            this.paramsList.forEach((value, index) => {
                if (value.parameterId === id) {
                    value.isRequired = !value.isRequired
                }
            })
        },
        brandClose () {
            this.$refs.brandRef.clearQuery('left')
            this.$refs.brandRef.clearQuery('right')
            this.brandsVisible = false
        },
        onCellSelected (row, rowIndex, column, columnIndex, $event) {
            this.current = row
        },
        onExpandCell (row, rowIndex, $event) {
            if (row._isFold) {
                const index = this.expandCell.indexOf(row.id)
                this.expandCell.splice(index, 1)
            } else {
                this.expandCell.push(row.id)
            }
        },
        onEditCategory () {
            if (this.isSaving) {
                return
            }
            this.isSaving = true
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    if (this.isEdit) {
                        this.form.updateBy = this.userInfo.name
                        await updateCategory(this.form)
                    } else {
                        this.form.createBy = this.userInfo.name
                        await createCategory(this.form)
                    }
                    this.$message({
                        message: this.isEdit ? '类目修改成功' : '类目添加成功',
                        type: 'success'
                    })
                    this.editVisible = false
                    this.refresh()
                    this.isSaving = false
                } else {
                    this.isSaving = false
                }
            })
        },
        onShowAdd (type) {
            // 添加同级类目或者子类目
            this.editVisible = true
            this.isEdit = false
            // 判断level是否存在是处理没有选中任何类目的情况下，做新增操作
            this.form = {
                parentName: type === 'child' ? this.current.categoryName : this.current.pcategoryName,
                parentId: type === 'child' ? this.current.id : this.current.parentId,
                level: this.current.level ? (type === 'child' ? this.current.level * 1 + 1 : this.current.level * 1) : 1,
                categoryName: '',
                categoryCode: '',
                id: ''
            }
            this.isSaving = false
        },
        onShowEdit (row) {
            this.current = row
            this.editVisible = true
            this.isEdit = true
            this.form = {
                parentName: this.current.pcategoryName,
                parentId: this.current.parentId,
                level: this.current.level * 1,
                categoryName: this.current.categoryName,
                categoryCode: this.current.categoryCode,
                id: this.current.id
            }
            this.isSaving = false
        },
        async onMove (row, direction) {
            await moveCategory({
                id: row.id,
                moveValue: direction,
                updateBy: this.userInfo.name
            })
            this.$message({
                message: '类目移动成功',
                type: 'success'
            })
            this.refresh()
        },
        async onShowParams (row) {
            this.current = row
            this.paramsVisible = true
            const { data: paramsList } = await findLinkParams({
                categoryId: this.current.id,
                isSetupthe: 0
            })
            const { data: selectedParams } = await findLinkParams({
                categoryId: this.current.id,
                isSetupthe: 1
            })
            this.paramsList = selectedParams.concat(paramsList)
            this.selectedParams = selectedParams.map(item => item.parameterId)
        },
        async onShowBrands (row) {
            this.current = row
            this.brandsVisible = true
            const { data: brandsList } = await findLinkBrands({
                categoryId: this.current.id,
                isRelation: 0
            })
            const { data: selectedBrands } = await findLinkBrands({
                categoryId: this.current.id,
                isRelation: 1
            })
            this.brandsList = selectedBrands.concat(brandsList)
            this.brandsList = this.brandsList.map(item => {
                if (item.brandNameEn) {
                    item.brandName = item.brandName + item.brandNameEn
                }
                return item
            })
            this.selectedBrands = selectedBrands.map(item => item.brandId)
        },
        async onLinkParams () {
            let tempParams = this.selectedParams.map(value => {
                let temp = null
                this.paramsList.forEach(value1 => {
                    if (value1.parameterId === value) {
                        value1.isRequired ? temp = 1 : temp = 0
                    }
                })
                return {
                    parameterId: value,
                    isRequired: temp
                }
            })
            await linkParams({
                categoryId: this.current.id,
                parameterIdList: [],
                parameterIsRequired: tempParams
            })
            this.$message({
                message: '设置参数成功！',
                type: 'success'
            })
            this.paramsVisible = false
        },
        async onLinkBrands () {
            await linkBrands({
                categoryId: this.current.id,
                brandIdList: this.selectedBrands
            })
            this.$message({
                message: '关联品牌成功！',
                type: 'success'
            })
            this.brandsVisible = false
        },
        tableRowStyle (row, rowIndex) {
            return this.current.id === row.id ? {
                'background-color': '#bec9ef'
            } : {}
        },
        resolveData (data, parentIsFold = true) {
            // 设置数组第一个值和最后一个值标志，主要用于判断上移和下移是否可用
            return data.map((item, index) => {
                item.isFirst = index === 0
                item.isLast = index === data.length - 1
                item.updateTime = this.$filter.formatterTime(item.updateTime)
                if (this.expandCell.includes(item.id)) {
                    item._isFold = false
                    item._isHide = false
                }
                if (!parentIsFold) {
                    item._isHide = false
                }
                if (item.categoryList && item.categoryList.length > 0) {
                    this.resolveData(item.categoryList, item._isFold)
                }
                return item
            })
        },
        async refresh () {
            const { data } = await findAllCategory()
            this.data = this.resolveData(data)
        }
    },
    mounted () {
        this.refresh()
    }
}
</script>

<style lang="scss" scoped>
    .action {
        padding: 2px 5px;
        background-color: #ff9933;
        border-radius: 5px;
    }
    .disabled {
        background-color: #ccc;
    }
    .edit-form-item {
        line-height: 40px;
        .item-label {
            display: inline-block;
            width: 150px;
            text-align: right;
        }
    }
    .form-input {
        width: 200px;
    }
    .tr-selected {
        background-color: #ff9933;
    }
    /deep/ .zk-table {
        font-size: 14px;
    }
    /deep/ .el-transfer__button.is-disabled {
        border: 1px solid #dcdfe6;
        background-color: #f5f7fa !important;
        color: #c0c4cc;
    }
</style>
<style>
    .settingParams .el-transfer-panel{
        width: 380px;
    }
    .settingParams .el-checkbox{
        margin-right: 0;
    }
</style>

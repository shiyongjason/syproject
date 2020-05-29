<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
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
        <div class="page-body-cont">
            <tree-table
                ref="treeTable"
                :data="data"
                :columns="columns"
                :selectable="false"
                :expand-type="false"
                :row-style="tableRowStyle"
                children-prop="subCategoryList"
                @cell-click="onCellSelected"
                @expand-cell-click="onExpandCell"
                @tree-icon-click="onExpandCell"
                >
                <template slot="sort" slot-scope="scope">
                    <el-input maxlength="10" placeholder="请输入内容" v-model.number="scope.row.sort" @change="inputChange(scope.row.sort)" @focus="inputFocus(scope.row)"></el-input>
                </template>
                <template slot="imgUrl" slot-scope="scope">
                    <img :src="scope.row.imgUrl" class="img-table" v-if="scope.row.level === 3">
                </template>
                <template slot="operations" slot-scope="scope">
                    <span class="action mr10" @click="onShowEdit(scope.row)">修改</span>
                    <span class="action mr10" @click="onShowParams(scope.row)" v-if="scope.row.level === 2">设置参数</span>
                </template>
            </tree-table>
        </div>
        <el-dialog title="类目编辑" :visible.sync="editVisible">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="150px">
                <div class="edit-form-item">
                    <span class="mr20">
                        <label class="item-label">类目编号：</label>{{ this.form.code ? this.form.code : '--' }}
                    </span>
                    <span><label class="item-label">类目层级：</label>{{ this.form.level }}</span>
                </div>
                <div class="edit-form-item">
                    <span><label class="item-label">父类目：</label>{{ this.form.parentName ? this.form.parentName : '--'  }}</span>
                </div>
                <el-form-item label="类目名称" prop="name" v-if="editVisible">
                    <el-input
                        class="form-input"
                        v-model="form.name"
                        placeholder="请输入类目名称"
                        maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="imgUrl" label="类目logo：" v-if="form.level === 3">
                    <!--imgUrl-->
                    <SingleUpload
                        :upload="uploadInfo"
                        :imageUrl="imageUrl"
                        ref="uploadImg"
                        @back-event="readUrl"/>
                    <div class="upload-tips">
                        尺寸300x300,2m以内，支持jpg、jpeg、png
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editVisible = false">取消</el-button>
                    <el-button type="primary" @click="onEditCategory">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-drawer
            class="page-body-drawer"
            title="参数详情"
            :visible.sync="setVisible"
            :before-close="closeDialog"
            direction="rtl"
            size='900px'>
            <setParameters
                ref="setting"
                :categoryId="current.id"
            />
        </el-drawer>
    </div>
</template>

<script>
import {
    updateCategory, createCategory
} from './api/index.js'
import { mapState, mapActions } from 'vuex'
import { interfaceUrl } from '@/api/config'
import setParameters from './component/setParameters'

export default {
    name: 'category-list',
    components: {
        setParameters
    },
    data () {
        return {
            data: [],
            columns: [
                {
                    title: '类目名称',
                    key: 'name',
                    width: '300px'
                },
                {
                    title: '类目编码',
                    key: 'code',
                    align: 'center',
                    headerAlign: 'center',
                    minWidth: '80px'
                },
                {
                    title: '排序',
                    headerAlign: 'center',
                    minWidth: '100px',
                    type: 'template',
                    template: 'sort'
                },
                {
                    title: '图片',
                    headerAlign: 'center',
                    minWidth: '100px',
                    type: 'template',
                    template: 'imgUrl'
                },
                {
                    title: '维护人',
                    key: 'operator',
                    align: 'center',
                    headerAlign: 'center'
                },
                {
                    title: '维护时间',
                    key: 'lastModifyTime',
                    align: 'center',
                    headerAlign: 'center',
                    minWidth: '160px'
                },
                {
                    title: '操作',
                    headerAlign: 'center',
                    minWidth: '150px',
                    type: 'template',
                    template: 'operations'
                }
            ],
            // 当前选中的类目，所有的操作都基于这个数据
            current: {
                id: 0
            },
            isEdit: false,
            editVisible: false,
            rules: {
                name: [
                    { required: true, whitespace: true, message: '此项为必填项', trigger: 'blur' }
                ],
                imgUrl: [
                    { required: true, message: '请上传类目logo' }
                ]
            },
            form: {
                id: '',
                level: 1,
                parentCode: '',
                parentName: '',
                name: '',
                imgUrl: ''
            },
            expandCell: [],
            isSaving: false,

            setVisible: false,
            attributeForm: {
                name: '',
                type: '',
                required: ''
            },
            attributeFormRules: {
                name: [
                    { required: true, message: '审核结果不能为空！' }
                ],
                type: [
                    { required: true, message: '审核结果不能为空！' }
                ],
                required: [
                    { required: true, message: '审核结果不能为空！' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState('category', {
            categoriesTree: 'categoriesTree'
        }),
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
        imageUrl () {
            return this.form.imgUrl
        }
    },
    methods: {
        ...mapActions('category', [
            'findAllCategory'
        ]),

        onCellSelected (row, rowIndex, column, columnIndex, $event) {
            this.current = row
        },

        // 展开的样式，用于刷新试图后不重置
        onExpandCell (row, rowIndex, $event) {
            if (row._isFold) {
                const index = this.expandCell.indexOf(row.id)
                this.expandCell.splice(index, 1)
            } else {
                this.expandCell.push(row.id)
            }
        },

        // 表格行样式
        tableRowStyle (row, rowIndex) {
            return this.current.id === row.id ? {
                'background-color': '#bec9ef'
            } : {}
        },

        onShowParams (row) {
            this.current = row
            this.setVisible = true
            this.$nextTick(() => {
                this.$refs['setting'].findSpecificationsAsync()
            })
        },

        // 关闭参数前清空列表，防止下次进入缓存
        closeDialog () {
            this.$refs['setting'].initTable()
            this.setVisible = false
        },

        // 输入框获取焦点就设置选中行，防止bug
        inputFocus (row) {
            this.current = row
        },

        // 输入框排序接口
        async inputChange (value) {
            this.$forceUpdate()
            await updateCategory({
                id: this.current.id,
                name: this.current.name,
                parentId: this.form.parentId,
                sort: value,
                operator: this.userInfo.employeeName,
                imgUrl: this.form.imgUrl
            })
            this.refresh()
        },

        // 上传的回调
        readUrl (val) {
            this.form.imgUrl = val.imageUrl
        },

        // 新增和编辑类目
        onEditCategory () {
            if (this.isSaving) {
                return
            }
            this.isSaving = true
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    if (this.isEdit) {
                        await updateCategory({
                            id: this.form.id,
                            name: this.form.name,
                            parentId: this.form.parentId,
                            sort: this.form.sort,
                            operator: this.userInfo.employeeName,
                            imgUrl: this.form.imgUrl
                        })
                    } else {
                        await createCategory({
                            name: this.form.name,
                            parentId: this.form.parentId || 0,
                            operator: this.userInfo.employeeName,
                            imgUrl: this.form.imgUrl
                        })
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
                parentName: type === 'child' ? this.current.name : this.current.pcategoryName || '',
                parentId: type === 'child' ? this.current.id : this.current.parentId || '',
                level: this.current.level ? (type === 'child' ? this.current.level * 1 + 1 : this.current.level * 1) : 1,
                name: '',
                code: '',
                id: '',
                imgUrl: ''
            }
            this.isSaving = false
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        onShowEdit (row) {
            this.current = row
            this.editVisible = true
            this.isEdit = true
            this.form = {
                parentName: this.current.pcategoryName,
                parentId: this.current.parentId,
                level: this.current.level * 1,
                name: this.current.name,
                code: this.current.code,
                id: this.current.id,
                sort: this.current.sort,
                imgUrl: this.current.imgUrl || ''
            }
            this.isSaving = false
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },

        // 递归处理数据
        resolveData (data, parentIsFold = true, pcategoryName = '') {
            return data.map((item, index, arr) => {
                item.lastModifyTime = this.$root.$options.filters.formatterTime(item.lastModifyTime)
                item.pcategoryName = pcategoryName

                // 下面两个判断用于保持展开样式的
                if (this.expandCell.includes(item.id)) {
                    item._isFold = false
                    item._isHide = false
                }
                if (!parentIsFold) {
                    item._isHide = false
                }

                if (item.subCategoryList && item.subCategoryList.length > 0) {
                    this.resolveData(item.subCategoryList, item._isFold, item.name)
                }
                return item
            })
        },
        async refresh () {
            await this.findAllCategory()
            this.data = this.resolveData(this.categoriesTree)
        }
    },
    mounted () {
        this.refresh()
    }
}
</script>

<style lang="scss" scoped>
    .action {
        padding: 4px 6px;
        background-color: #ff9933;
        border-radius: 5px;
        color: #ffffff;
        font-size: 12px;
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
    .center-btn {
        text-align: center;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    span.action{
        cursor: pointer;
    }
    .img-table {
        width: 80px;
        height: 80px;
    }
</style>
<style>
    .settingParams .el-transfer-panel{
        width: 380px;
    }
    .settingParams .el-checkbox{
        margin-right: 0;
        display: block;
    }
</style>

<template>
    <div class="category">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onAdd">添加子类目</el-button>
                        <el-button type="primary" class="ml20" @click="onUpdate">编辑类目</el-button>
                        <el-button type="primary" class="ml20" @click="onDelete">删除类目</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont content">
                <div class="tree">
                    <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText" class="tree-search">
                    </el-input>
                    <el-tree
                        class="filter-tree"
                        :data="doneServiceCategoryTree"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        @node-click="onTreeClick"
                        ref="tree">
                    </el-tree>
                </div>
                <div class="edit" v-if="editOpenStatus === 1">
                    <div class="main">
                        <div class="sub-title">
                            {{editTitle.join(' -> ')}}
                        </div>
                        <el-form ref="form" :model="form"
                                 :rules="rules" class="form" label-position="right" label-width="120px" :inline="true">
                            <el-form-item label="父类目">
                                <el-input v-model="form.parentName" type="text" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="当前类目层级">
                                <el-select disabled v-model="form.depth">
                                    <el-option :value="1" label="服务资源"></el-option>
                                    <el-option :value="2" label="一级类目"></el-option>
                                    <el-option :value="3" label="二级类目"></el-option>
                                    <el-option :value="4" label="三级类目"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="name" label="当前类目名称">
                                <el-input :disabled="editStatus > 2" v-model="form.name" type="text" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="父类目编号" v-if="editStatus === 2">
                                <el-input disabled v-model="form.parentId"></el-input>
                            </el-form-item>
                            <el-form-item label="当前类目编号" v-if="editStatus === 2">
                                <el-input disabled v-model="form.id"></el-input>
                            </el-form-item>
                            <el-form-item label="维护人" v-if="editStatus === 2">
                                <el-input disabled v-model="form.updateBy"></el-input>
                            </el-form-item>
                            <el-form-item label="维护时间" v-if="editStatus === 2">
                                <el-date-picker
                                    v-model="form.updateTime"
                                    type="datetime"
                                    placeholder="" disabled>
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="btn-group">
                        <el-button  v-if="editStatus === 1"
                                    type="primary" class="ml20" @click="onAddSave">保存</el-button>
                        <el-button v-if="editStatus === 2"
                            type="primary" class="ml20" @click="onUpdateSave">保存</el-button>
                        <el-button v-if="editStatus === 3"
                            type="primary" class="ml20" @click="onDeleteSave">确认删除</el-button>
                        <el-button type="primary" class="ml20" @click="onCancel">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import {
    createServiceResourcesCategory,
    updateServiceResourcesCategory,
    deleteServiceResourcesCategory } from '../api'

export default {
    name: 'category',
    data () {
        return {
            editStatus: 1, // 1:新增 2:修改 3:删除
            editOpenStatus: 2, // 1:打开 2:关闭
            changeFormDataStatus: 1, // 点击是否切换form表单数据 1:切换 2:不切换
            isSelectFlag: false, // 是否选中tree
            tempSelectTree: {},
            filterText: '',
            form: {
                name: ''
            },
            rules: {
                name: [
                    { required: true, message: '当前类目名称不能为空', trigger: 'blur' }
                ]
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tempDepth: []
        }
    },
    computed: {
        ...mapGetters('serviceManagement', ['doneServiceCategoryTree', 'resetServiceCategoryTree']),
        ...mapState({
            userInfo: state => state.userInfo
        }),
        editTitle () {
            let temp = []
            function makeData (arr, targetVal) {
                arr.forEach(value => {
                    if (value.id === targetVal) {
                        temp.push(value.label)
                    }
                    if (value.children && value.children.length > 0) {
                        makeData(value.children, targetVal)
                    }
                })
            }
            this.tempDepth.forEach(val => {
                makeData(this.resetServiceCategoryTree, val)
            })

            // temp.shift()
            return temp
        }
    },
    watch: {
        filterText (val) {
            this.$refs.tree.filter(val)
        }
    },
    methods: {
        filterNode (value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        reWriteData (data) {
            this.$set(this.form, 'id', data.id)
            this.$set(this.form, 'parentId', data.parentId)
            this.$set(this.form, 'parentName', data.parentName)
            this.$set(this.form, 'depth', data.depth)
            this.$set(this.form, 'updateBy', data.updateBy)
            this.$set(this.form, 'updateTime', data.updateTime)
            this.$set(this.form, 'name', data.label)
            this.$set(this.form, 'children', data.children)
            this.tempDepth = data.path.split(',')
        },
        onTreeClick (data) {
            this.isSelectFlag = true
            this.tempSelectTree = data
            if (this.changeFormDataStatus === 1) {
                this.reWriteData(data)
            }
        },
        isSelect () {
            return this.isSelectFlag
        },
        onAdd () {
            if (this.tempSelectTree.depth > 3) {
                this.$message({
                    type: 'warn',
                    message: '当前类目不可添加子类目'
                })
                return
            }
            if (this.isSelect()) {
                if (this.changeFormDataStatus === 2) {
                    this.reWriteData(this.tempSelectTree)
                }
                this.$set(this.form, 'name', '')
                this.changeFormDataStatus = 2
                this.editOpenStatus = 1
                this.editStatus = 1
            } else {
                this.$message({
                    type: 'warn',
                    message: '请先选择类目'
                })
            }
        },
        onUpdate () {
            if (this.isSelect()) {
                if (this.changeFormDataStatus === 2) {
                    this.reWriteData(this.tempSelectTree)
                }
                this.changeFormDataStatus = 2
                this.editOpenStatus = 1
                this.editStatus = 2
            } else {
                this.$message({
                    type: 'warn',
                    message: '请先选择类目'
                })
            }
        },
        onDelete () {
            if (this.isSelect()) {
                if (this.changeFormDataStatus === 2) {
                    this.reWriteData(this.tempSelectTree)
                }
                this.changeFormDataStatus = 2
                this.editOpenStatus = 1
                this.editStatus = 3
            } else {
                this.$message({
                    type: 'warn',
                    message: '请先选择类目'
                })
            }
        },
        onAddSave () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    const params = {
                        createBy: this.userInfo.employeeName,
                        name: this.form.name,
                        parentId: this.form.id
                    }
                    await this.createServiceResourcesCategory(params)
                    this.findServiceResourcesCategory()
                    this.isSelectFlag = false
                    this.changeFormDataStatus = 1
                    this.editOpenStatus = 2
                }
            })
        },
        onUpdateSave () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    const param = { ...this.form }
                    param.updateBy = this.userInfo.employeeName
                    await this.updateServiceResourcesCategory(param.id, param)
                    this.findServiceResourcesCategory()
                    this.isSelectFlag = false
                    this.changeFormDataStatus = 1
                    this.editOpenStatus = 2
                }
            })
        },
        async onDeleteSave () {
            if (this.form.children && this.form.children.length > 0) {
                this.$message({
                    type: 'warn',
                    message: '不能越级删除类目'
                })
            } else {
                await this.deleteServiceResourcesCategory(this.form.id)
                this.findServiceResourcesCategory()
                this.isSelectFlag = false
                this.changeFormDataStatus = 1
                this.editOpenStatus = 2
            }
        },
        onCancel () {
            this.changeFormDataStatus = 1
            this.editOpenStatus = 2
        },
        async createServiceResourcesCategory (params) {
            await createServiceResourcesCategory(params)
        },
        async updateServiceResourcesCategory (id, params) {
            await updateServiceResourcesCategory(id, params)
        },
        async deleteServiceResourcesCategory (id) {
            await deleteServiceResourcesCategory(id)
        },
        ...mapActions('serviceManagement', ['findServiceResourcesCategory'])
    },
    mounted () {
        this.findServiceResourcesCategory()
    }
}
</script>

<style scoped>
    .content {
        display: flex;
    }

    .tree {
        width: 380px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        padding: 20px;
    }

    .edit {
        margin-left: 50px;
        display: flex;
        flex-direction: column;
    }

    .tree-search {
        margin-bottom: 20px;
    }

    .form {
        max-width: 720px;
        margin: 20px auto;
    }

    .btn-group {
        text-align: center;
    }
    /*.el-tree-node:focus>.el-tree-node__content #F5F7FA*/
    /deep/.is-current>.el-tree-node__content {
        background: #F5F7FA;
    }
</style>

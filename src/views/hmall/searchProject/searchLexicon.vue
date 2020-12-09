<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                <div class="query-col__lable">词名称：</div>
                <div class="query-col__input">
                    <el-input
                        type="text"
                        maxlength="50"
                        v-model="queryParams.keyword"
                        placeholder="请输入搜索词名称"
                    >
                    </el-input>
                </div>
                </div>
                <div class="query-cont__col">
                <h-button type="primary" @click="onQuery">查询</h-button>
                <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="button-cont">
                <h-button type="create" @click="onAddOrEdit('add')">新增</h-button>
                <h-button @click="onRefresh">批量刷新</h-button>
            </div>
            <h-table
                :tableLabel="tableLabel"
                :tableData="tableData"
                :pagination="pagination"
                :tableAttrs="{ ...tableAttrs, isIndex: true }"
                :multiSelection="multiSelection"
                @onSizeChange="onSizeChange"
                @onCurrentChange="onCurrentChange"
            >
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onAddOrEdit('edit', scope.data.row)">编辑</h-button>
                    <h-button table @click="onDelete(scope.data.row)">删除</h-button>
                </template>
            </h-table>
        </div>
        <el-dialog
            :title="dialogInfo.title"
            :visible.sync="dialogVisible"
            :before-close="closeDialog"
            append-to-body
            width="500px"
        >
            <el-form
                ref="form"
                :model="form"
                :rules="formRules"
                label-width="150px">
                <el-form-item label=" 词名称：" prop="keyword" class="mb-5">
                     <el-input type="input" v-model.trim="form.keyword" maxlength="20"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <h-button @click="closeDialog">取消</h-button>
                <h-button type="primary" @click="onSave">保存</h-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'searchLexicon',
    data () {
        return {
            tableAttrs: {
                'min-width': 200,
                isMultiple: false
            },
            multiSelection: [],
            queryParams: {
                dictType: 0,
                keyword: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            tableLabel: [
                { label: '词名称', prop: 'keyword' }
            ],
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },

            dialogVisible: false,
            form: {
                keyword: ''
            },
            formRules: {
                keyword: [
                    { required: true, whitespace: true, message: '词名称不能为空！' }
                ]
            },
            dialogInfo: {
                type: 'add',
                title: '新增搜索词'
            }
        }
    },
    computed: {
        ...mapState('searchProject', {
            customDictData: 'customDictData'
        })
    },
    mounted () {
        this.init()
    },
    methods: {
        ...mapActions('searchProject', ['findCustomDictList', 'postCustomDict', 'putCustomDict', 'deleteCustomDict', 'refreshCustomDict']),
        init () {
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getTableList()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getTableList()
        },
        onSeeInfo ({ searchId }) {},
        onSizeChange (value) {
            this.queryParams.pageSize = value
            this.getTableList()
        },
        onCurrentChange (value) {
            this.queryParams.pageNumber = value.pageNumber
            this.getTableList()
        },
        async getTableList () {
            await this.findCustomDictList(this.queryParams)
            this.tableData = this.customDictData.records
            this.pagination = {
                pageNumber: this.customDictData.current,
                pageSize: this.customDictData.size,
                total: this.customDictData.total
            }
            console.log(this.pagination)
        },

        async onRefresh () {
            await this.refreshCustomDict()
            this.$message.success(`刷新成功`)
        },

        onAddOrEdit (type, item) {
            if (type === 'add') {
                this.form = {
                    keyword: ''
                }
            } else {
                this.dialogInfo.type = 'edit'
                this.dialogInfo.title = '修改搜索词'
                this.form = {
                    ...item
                }
            }
            this.dialogVisible = true
        },

        closeDialog () {
            this.dialogVisible = false
            this.form = {
                keyword: ''
            }
            // 这边存在一个问题，直接删除不出现lexiconForm会报错
            try {
                this.$refs['form'].resetFields()
            } catch (error) {

            }
        },

        onSave () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    if (this.form.id) {
                        await this.putCustomDict({
                            keyword: this.form.keyword,
                            customDictId: this.form.id
                        })
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                    } else {
                        await this.postCustomDict({
                            dicType: 0,
                            keyword: this.form.keyword
                        })
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        })
                    }
                    this.closeDialog()
                    this.init()
                }
            })
        },

        async onDelete (item) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.deleteCustomDict({
                    customDictId: item.id
                })
                this.init()
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                })
            }).catch(() => { })
        }
    }
}
</script>
<style lang="scss" scoped>
.form-add-remove {
    font-size: 22px;
    color: #ff9c31;
    cursor: pointer;
    line-height: 40px;
    vertical-align: top;
}
.center-btn {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
}
.isCombobox-box {
    height: 240px;
    padding: 20px 0;
    overflow-y: scroll;
    border: 1px solid rgb(247, 229, 229);
}
</style>

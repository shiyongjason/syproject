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
            :title="lexiconInfo.title"
            :visible.sync="attributeVisible"
            :before-close="closeDialog"
            append-to-body
            width="500px"
        >
            <el-form
                ref="lexiconFormRef"
                :model="lexiconForm"
                :rules="lexiconFormRules"
                label-width="150px">
                <el-form-item label=" 词名称：" prop="keyword" class="mb-5">
                     <el-input type="input" v-model.trim="lexiconForm.keyword" maxlength="20"></el-input>
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
import { TERMINAL_TYPE } from './const/index'
export default {
    name: 'searchLexicon',
    data () {
        return {
            tableAttrs: {
                'min-width': 200,
                isMultiple: false
            },
            multiSelection: [],
            drawer: false,
            queryParams: {
                dictType: 0,
                keyword: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            terminalOption: TERMINAL_TYPE,
            tableLabel: [
                { label: '词名称', prop: 'keyword' }
            ],
            tableData: [],
            pagination: {},

            attributeVisible: false,
            lexiconForm: {
                keyword: ''
            },
            lexiconFormRules: {
                keyword: [
                    { required: true, whitespace: true, message: '词名称不能为空！' }
                ]
            },
            lexiconInfo: {
                type: 'add',
                title: '新增搜索词'
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.userInfo.principal
        }),
        ...mapState('searchProject', {
            customDictData: 'customDictData'
        })
    },
    mounted () {
        this.init()
    },
    methods: {
        ...mapActions('searchProject', ['findCustomDictList', 'postCustomDict', 'putCustomDict', 'deleteCustomDict']),
        init () {
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getSearchWordList()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getSearchWordList()
        },
        onSeeInfo ({ searchId }) {},
        onSizeChange (value) {
            this.queryParams.pageSize = value
            this.getSearchWordList()
        },
        onCurrentChange (value) {
            this.queryParams.pageNumber = value.pageNumber
            this.getSearchWordList()
        },
        async getSearchWordList () {
            await this.findCustomDictList(this.queryParams)
            this.tableData = this.customDictData.records
            this.pagination = {
                pageNumber: this.customDictData.current,
                pageSize: this.customDictData.size,
                total: this.customDictData.total
            }
        },

        onAddOrEdit (type, item) {
            if (type === 'add') {
                this.lexiconForm = {
                    keyword: ''
                }
            } else {
                this.lexiconInfo.type = 'edit'
                this.lexiconInfo.title = '编辑搜索词'
                this.lexiconForm = {
                    ...item
                }
            }
            this.attributeVisible = true
        },

        closeDialog () {
            this.lexiconForm = {
                keyword: ''
            }
            // 这边存在一个问题，直接删除不出现lexiconForm会报错
            try {
                this.$refs['lexiconFormRef'].resetFields()
            } catch (error) {

            }
            this.attributeVisible = false
        },

        onSave () {
            this.$refs.lexiconFormRef.validate(async (valid) => {
                if (valid) {
                    if (this.lexiconForm.id) {
                        await this.putCustomDict({
                            keyword: this.lexiconForm.keyword,
                            customDictId: this.lexiconForm.id
                        })
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                    } else {
                        await this.postCustomDict({
                            dicType: 0,
                            keyword: this.lexiconForm.keyword
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

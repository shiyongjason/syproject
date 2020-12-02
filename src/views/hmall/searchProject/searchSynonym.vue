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
                    v-model="queryParams.name"
                    placeholder="请输入SPU编码"
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
                <h-button @click="onAddOrEdit('add')">新增</h-button>
            </div>
            <h-table
                :tableLabel="tableLabel"
                :tableData="tableData"
                :pagination="pagination"
                :tableAttrs="{ ...tableAttrs, isIndex: true }"
                @onSizeChange="onSizeChange"
                @onCurrentChange="onCurrentChange"
            >
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onAddOrEdit('edit', scope.data.row)">查看详情</h-button>
                    <h-button table @click="onDelete(scope.data.row)">删除</h-button>
                </template>
            </h-table>
        </div>
        <el-dialog
            :title="attributeInfo.title"
            :visible.sync="attributeVisible"
            :before-close="closeDialog"
            append-to-body
            width="500px"
        >
            <el-form
                ref="attributeForm"
                :model="attributeForm"
                :rules="attributeFormRules"
                label-width="150px">
                <el-form-item label=" 词名称：" prop="name" class="mb-5">
                     <el-input type="input" v-model.trim="attributeForm.k" maxlength="20"></el-input>
                </el-form-item>

                <!-- 根据不同的选择出现不同的操作， -->
                <div class="isCombobox-box">
                    <el-form-item
                        v-for="(item, index) in attributeForm.options"
                        :label="' = 同义词' + (index+1) + '：'"
                        :key="index"
                        :prop="`options[${index}].option`"
                        :rules="attributeFormRules.option"
                    >
                        <el-input v-model="item.option" style="width: 200px" maxlength="20"></el-input>

                        <span
                            class="ml10 el-icon-remove-outline form-add-remove"
                            v-if="index > 0"
                            @click="removeOption(item)"
                        ></span>
                        <span
                            class="ml10 el-icon-circle-plus-outline form-add-remove"
                            v-if="attributeForm.options.length < 10 && index + 1 === attributeForm.options.length"
                            @click="addOption(item)"
                        ></span>
                    </el-form-item>
                </div>
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
import { deepCopy } from '@/utils/utils'
export default {
    name: 'searchSynonym',
    data () {
        return {
            tableAttrs: {
                'min-width': 200
            },
            drawer: false,
            queryParams: {
                name: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            terminalOption: TERMINAL_TYPE,
            tableLabel: [
                { label: '会员名称', prop: 'memberName' },
                { label: '会员账号', prop: 'account' },
                { label: '搜索词', prop: 'searchWord' }
            ],
            tableData: [],
            pagination: {},

            attributeVisible: false,
            attributeForm: {
                name: '',
                options: [
                    {
                        option: ''
                    }
                ]
            },
            attributeFormRules: {
                name: [
                    { required: true, whitespace: true, message: '参数名称不能为空！' }
                ],
                option: [
                    { required: true, whitespace: true, message: '此项为必填项！' }
                ]
            },
            attributeInfo: {
                type: 'add',
                title: '参数新增'
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.userInfo.principal
        }),
        ...mapState('searchProject', {
            searchWordData: 'searchWordData'
        })
    },
    mounted () {
        this.init()
    },
    methods: {
        ...mapActions('searchProject', ['findSearchWordList']),
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
            await this.findSearchWordList(this.queryParams)
            this.tableData = this.searchWordData.records
            this.pagination = {
                pageNumber: this.searchWordData.current,
                pageSize: this.searchWordData.size,
                total: this.searchWordData.total
            }
        },

        onAddOrEdit (type, item) {
            if (type === 'add') {
                this.attributeForm = {
                    name: '',
                    options: [
                        {
                            option: ''
                        }
                    ]
                }
            } else {
                this.attributeInfo.type = 'edit'
                this.attributeInfo.title = '参数编辑'
                // this.attributeForm = deepCopy(item)
                this.attributeForm = {
                    name: '',
                    options: [
                        {
                            option: ''
                        }
                    ]
                }
            }
            this.attributeVisible = true
        },

        // 添加下拉框选项
        addOption (item) {
            this.attributeForm.options.push({
                option: ''
            })
        },

        // 删除下拉框选项
        removeOption (item) {
            const index = this.attributeForm.options.indexOf(item)
            this.attributeForm.options.splice(index, 1)
        },
        closeDialog () {
            this.attributeForm = {
                name: '',
                options: [
                    {
                        option: ''
                    }
                ]
            }
            // 这边存在一个问题，直接删除不出现attributeForm会报错
            try {
                this.$refs['attributeForm'].resetFields()
            } catch (error) {

            }
            this.attributeVisible = false
        },

        onSave () {

        },
        async onDelete (item) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // await deleteoneticketveto(id)
                // this.getoneticketveto()
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success',
                    onClose: () => {

                    }
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

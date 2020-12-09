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
                <el-form-item label=" 同义词1：" prop="keyword" class="mb-5">
                    <el-input type="input" v-model.trim="form.keyword" style="width: 200px" maxlength="20" ></el-input>
                    <span
                        class="ml10 el-icon-circle-plus-outline form-add-remove"
                        v-show="form.options.length < 9"
                        @click="addOption"
                    ></span>
                </el-form-item>

                <!-- 根据不同的选择出现不同的操作， -->
                <div class="isCombobox-box">
                    <el-form-item
                        v-for="(item, index) in form.options"
                        :label="' = 同义词' + (index + 2) + '：'"
                        :key="item.key"
                        :prop="`options[${index}].option`"
                        :rules="formRules.option"
                    >
                        <el-input v-model="item.option" style="width: 200px" maxlength="20"></el-input>
                        <span
                            v-if="form.options.length > 1"
                            class="ml10 el-icon-remove-outline form-add-remove"
                            @click="removeOption(item)"
                        ></span>
                        <span
                            class="ml10 el-icon-circle-plus-outline form-add-remove"
                            v-if="form.options.length < 9 && index + 1 === form.options.length"
                            @click="addOption"
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
export default {
    name: 'searchSynonym',
    data () {
        return {
            tableAttrs: {
                'min-width': 200
            },
            multiSelection: [],
            queryParams: {
                dictType: 1,
                keyword: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            tableLabel: [
                { label: '同义词名称', prop: 'keyword' }
            ],
            tableData: [],
            pagination: {},

            dialogVisible: false,
            form: {
                keyword: '',
                options: [
                    {
                        option: '',
                        key: Math.random() + Math.random()
                    }
                ]
            },
            formRules: {
                keyword: [
                    { required: true, whitespace: true, message: '参数名称不能为空！' }
                ],
                option: [
                    { required: true, whitespace: true, message: '此项为必填项！' }
                ]
            },
            dialogInfo: {
                type: 'add',
                title: '新增搜索同义词'
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
            this.tableData = this.customDictData.records.map((item) => {
                return {
                    id: item.id,
                    keyword: item.keyword.split(',').join('=')
                }
            })
            this.pagination = {
                pageNumber: this.customDictData.current,
                pageSize: this.customDictData.size,
                total: this.customDictData.total
            }
        },

        async onRefresh () {
            await this.refreshCustomDict()
            this.$message.success(`刷新成功`)
        },

        onAddOrEdit (type, item) {
            if (type === 'add') {
                this.form = {
                    keyword: '',
                    options: [
                        {
                            option: '',
                            key: Math.random() + Math.random()
                        }
                    ]
                }
            } else {
                this.dialogInfo.type = 'edit'
                this.dialogInfo.title = '修改搜索同义词'

                // 这边注意要处理一个同义词数据，展示和form的数据结构不同
                const keywordList = item.keyword.split('=')
                this.form = {
                    id: item.id,
                    keyword: keywordList[0],
                    options: keywordList.filter((item1, index1) => index1 !== 0).map((item2, index2) => { return { option: item2, key: index2 + Math.random() + Math.random() } }) // 循环的key值保证唯一性
                }
            }
            this.dialogVisible = true
        },

        // 添加下拉框选项
        addOption () {
            this.form.options.push({
                option: '',
                key: Math.random() + Math.random() // 用作循环的key值
            })
        },

        // 删除下拉框选项
        removeOption (item) {
            const index = this.form.options.indexOf(item)
            this.form.options.splice(index, 1)
        },

        closeDialog () {
            this.dialogVisible = false
            this.form = {
                keyword: '',
                options: [
                    {
                        option: '',
                        key: Math.random() + Math.random()
                    }
                ]
            }
            // 这边存在一个问题，直接删除不出现attributeForm会报错
            // try {
            this.$refs['form'].resetFields()
            // } catch (error) {

            // }
        },

        onSave () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    let keyword = this.form.keyword
                    this.form.options.forEach((item) => {
                        keyword += ',' + item.option
                    })
                    console.log(keyword)
                    if (this.form.id) {
                        await this.putCustomDict({
                            keyword,
                            customDictId: this.form.id
                        })
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                    } else {
                        await this.postCustomDict({
                            dicType: 1,
                            keyword
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

<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>会员标签</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onAddTag()">+ 新增会员标签</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantTaglist" :isShowIndex='true' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="tagDetailBos" slot-scope="scope">
                    <div class="tag-container">
                        <el-tag class="tag" v-for="item in scope.data.row.tagDetailBos" :key="item">{{item}}</el-tag>
                    </div>
                </template>

                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDeleteAct(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="标签编辑" :modal-append-to-body=false :append-to-body=false :close-on-click-modal='false' :visible.sync="detailDialogVisible" width="50%">
            <div class='dialogLayout'>
                <el-form label-position="right" :rules="rules" ref="form" label-width="100px" :model="form">
                    <el-form-item label="标签类别" prop="tagCategory">
                        <el-input v-model="form.tagCategory" width='150'></el-input>
                    </el-form-item>
                    <el-form-item label="标签名称" prop="tagDetailBos">
                        <el-tag :key="tag" v-for="(tag,index) in form.tagDetailBos" closable :disable-transitions="false" @close="onRemoveName(index)">{{tag}}</el-tag>
                        <el-input class="input-new-tag" v-if="inputTagVisible" v-model="inputTagValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" />
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="onCancle">取 消</el-button>
                    <el-button type="primary" @click="onSure">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { addCloudMerchantTag, deleteCloudMerchantTag, modifyCloudMerchantTag } from '../api'
import { deepCopy } from '../../../utils/utils'

export default {
    name: 'merchantMemberTag',
    data () {
        return {
            tableLabel: [
                { label: '创建时间', prop: 'createTime' },
                { label: '创建人', prop: 'creator' },
                { label: '标签类别', prop: 'tagCategory' },
                { label: '标签名称', prop: 'tagDetailBos', width: '600px' }
            ],
            detailDialogVisible: false,
            form: {
                tagCategory: '',
                tagDetailBos: []
            },
            rules: {
                tagCategory: [
                    { required: true, message: '请输入标签类型', trigger: 'blur' }
                ],
                tagDetailBos: [{ required: true, message: '标签不能为空', trigger: 'blur' }]
            },
            loading: true,
            inputTagVisible: false,
            inputTagValue: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantTaglist: 'cloudMerchantTaglist'
        })
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findCloudMerchantTaglist: 'findCloudMerchantTaglist'
        }),
        async onQuery () {
            await this.findCloudMerchantTaglist()
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onAddTag () {
            this.form = { tagCategory: '', tagDetailBos: [] }
            if (this.$refs.form) {
                this.$refs.form.clearValidate()
            }
            this.detailDialogVisible = true
        },
        handleClose (tag) {
            this.form.tagDetailBos.splice(this.form.tagDetailBos.indexOf(tag), 1)
        },

        showInput () {
            this.inputTagVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        handleInputConfirm () {
            if (this.inputTagValue) {
                this.form.tagDetailBos.push(this.inputTagValue)
            }
            this.inputTagVisible = false
            this.inputTagValue = ''
        },
        onRemoveName (index) {
            if (this.form.id) {
                this.$confirm('删除后，已添加到客户信息的标签也会一起删除，请确认是否继续删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.form.tagDetailBos.splice(index, 1)
                })
            } else {
                this.form.tagDetailBos.splice(index, 1)
            }
        },
        onCancle () {
            if (this.$refs.form) {
                this.$refs.form.clearValidate()
            }
            this.detailDialogVisible = false
        },
        onSure () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.form, operator: this.userInfo.employeeName }
                    console.log(params)
                    if (params.id) {
                        await modifyCloudMerchantTag(params)
                    } else {
                        await addCloudMerchantTag(params)
                    }
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                    this.detailDialogVisible = false
                    this.onSearch()
                } else {
                    return false
                }
            })
        },
        onEdit (val) {
            this.form = deepCopy(val)
            if (this.$refs.form) {
                this.$refs.form.clearValidate()
            }
            this.detailDialogVisible = true
        },
        async onDeleteAct (val) {
            this.$confirm('删除后，已添加到客户信息的标签也会一起删除，请确认是否继续删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteCloudMerchantTag({ id: val.id, operator: this.userInfo.employeeName })
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                })
                this.onQuery()
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .spanflex {
        font-size: 16px;
        padding-bottom: 10px;
    }
    .dialogLayout {
        padding: 20px 24px;
    }
    .colred {
        color: #ff7a45;
        cursor: pointer;
    }

    .tag-container {
        display: flex;
        flex-direction: row;
        flex-wrap:  wrap;
        justify-content: flex-start;
    }

    .el-tag.tag {
        margin: 5px;
    }

    /deep/.el-dialog__body {
        padding-top: 10px;
    }

    .edit-tags {
        display: flex;
        flex-direction: row;
        flex-wrap:  wrap;
    }

    .edit-tags-row {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
    }

    .el-tag {
        margin-right: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 32px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 120px;
        margin-left: 10px;
        vertical-align: bottom;
    }

</style>

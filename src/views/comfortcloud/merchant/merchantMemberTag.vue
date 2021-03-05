<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>会员标签</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onAddTag()">+ 新建会员标签</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="title" slot-scope="scope">
                    <p @click="onShowHome(scope.data.row)" class="colred">{{scope.data.row.title}}</p>
                </template>
                <template slot="effectived" slot-scope="scope">
                    <span :class="scope.data.row.effectived==='1'?'colred':''">{{scope.data.row.effectived==='1'?'已生效':'未生效'}}</span>
                </template>
                <template slot="showedTemp" slot-scope="scope">
                    <!--                    scope.data.row.showed -->
                    <el-switch
                        v-model="scope.data.row.showedTemp"
                        @change="updateCloudActive(scope.data.row)"
                        active-color="#13ce66">
                    </el-switch>
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
                    <el-form-item label="标签类别" prop="category">
                        <el-input v-model="form.category" width='150'></el-input>
                    </el-form-item>
                    <el-form-item label="标签名称" prop="names">
                        <el-button type="primary" @click="onAddTagName">新增标签</el-button>
                    </el-form-item>

                    <div class="query-cont-row" v-for="(item,index) in form.names" :key="index">
                        <el-form-item label="" :prop="'names.' + index + '.value'" :rules="rules.value">
                            <el-input v-model="item.value" width='150'></el-input>
                        </el-form-item>
                        <el-button style="align-self: flex-start;margin-left: 20px;" type="primary" @click="()=> { onRemoveName(index) }">删除</el-button>
                    </div>
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

export default {
    name: 'merchantMemberTag',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '创建时间', prop: 'title' },
                { label: '创建人', prop: 'createTime' },
                { label: '标签类别', prop: 'effectiveTime' },
                { label: '标签名称', prop: 'effectived' }
            ],
            detailDialogVisible: false,
            form: {
                category: '',
                names: []
            },
            rules: {
                category: [
                    { required: true, message: '请输入标签类型', trigger: 'blur' }
                ],
                names: [{ required: true, message: '标签不能为空', trigger: 'change' }],
                value: [{ required: true, message: '标签不能为空', trigger: 'change' }]
            },
            loading: true
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudTaglist: 'cloudTaglist'
        })
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findcloudTagList: 'findcloudTagList'
        }),
        async onQuery () {
            this.tableData = []
            await this.findcloudTagList(this.searchParams)

            this.tableData = this.cloudTaglist.records
            this.pagination = {
                pageNumber: this.cloudTaglist.current,
                pageSize: this.cloudTaglist.size,
                total: this.cloudTaglist.total
            }
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
            this.form = { category: '', names: [] }
            if (this.$refs.form) {
                this.$refs.form.clearValidate()
            }
            this.detailDialogVisible = true
        },
        onAddTagName () {
            this.form.names.push({ value: '' })
        },
        onRemoveName (index) {
            this.form.names.splice(index, 1)
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
                    console.log(this.form)
                    // const params = {
                    //     status: false,
                    //     versionAddress: '-',
                    //     ...this.dueForm
                    // }
                    // console.log(params)
                    // if (params.id) {
                    //     params.status = false
                    //     params.updateUid = this.userInfo.jobNumber
                    //     await editAppVersionDetail(params)
                    // } else {
                    //     params.createUid = this.userInfo.jobNumber
                    //     await addAppVersion(params)
                    // }
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
            this.form = val
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
                // await deleteTag(val.id)
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
    /deep/.el-dialog__body {
        padding-top: 10px;
    }
</style>

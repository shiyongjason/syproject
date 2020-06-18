<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <div>知识库管理
                <el-popover
                    placement="right"
                    title=""
                    width="200"
                    trigger="hover"
                    content="知识库维护的问题同步在舒适云APP端-我的-帮助中心展示">
                    <i slot="reference" class="el-icon-question"></i>
                </el-popover>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">问题标题：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.question" placeholder="请输入问题标题" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch()">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onAddcloud()" :disabled="isMultipled">新建知识</el-button>
                    <el-button type="primary" class="ml20" @click="onExport()" :disabled="isMultipled || isCatalog">批量导入</el-button>
                    <el-button type="primary" class="ml20" @click="batchOpt()">{{isMultipled?"取消批量操作":"批量操作"}}</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="left">
                <div class="title">
                    <span>目录</span>
                </div>
                <el-tree
                        :data="klCatalogueList"
                        :props="defaultProps"
                        @node-click="handleNodeClick"
                        :highlight-current="true"
                        :default-expand-all="true"
                ></el-tree>
            </div>
            <div class="right">
                <basicTable
                        :tableLabel="tableLabel"
                        :tableData="tableData"
                        :isShowIndex='true'
                        :isMultiple="isMultipled"
                        :pagination="pagination"
                        @onCurrentChange='onCurrentChange'
                        @onSizeChange='onSizeChange'
                        @update:multiSelection='multiSelection'
                        :isAction="true"
                        ref="basicTableCom"
                >
                    <template slot="action" slot-scope="scope">
                        <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                        <el-button class="orangeBtn" @click="onDeleteAct(scope.data.row)">删除</el-button>
                    </template>
                </basicTable>
                <div class="delOpt" v-show="isMultipled">
                    <span>已经选中{{ids.length}}条</span>
                    <el-button type="primary" class="ml20" @click="onAllDel()" :disabled="!(ids.length>0)">批量删除</el-button>
                </div>
            </div>
        </div>
        <!--<H5Preview :activeUrl="H5Preview" :loading="loading"  @hideLoading="loading =false" @clearUrl="H5Preview = ''"/>-->
        <el-dialog title="上传问题列表" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload
                    class="upload-fault"
                    ref="upload"
                    :file-list="fileList"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary"  slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.批量导入的知识库仅支持文字描述，不支持图片和视频等格式</p>
                <p slot="tip" class="el-upload__tip">3.请按照知识库模板内容导入问题和答案，否则可能会出现导入异常</p>
            </el-upload>
            <el-button type="primary" @click="onDownload" class="download-template">下载导入知识库模板</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { editActdetail, delQuestion, downloadQuestionTemp } from '../api'
import { clearCache, newCache } from '@/utils/index'
import { iotUrl } from '@/api/config'
// import H5Preview from '../../../components/h5Preview'
export default {
    name: 'cloudlist',
    components: {
        // H5Preview
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                question: '',
                questionId: '',
                type: ''
            },
            visible: false,
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '目录', prop: 'questionDescription' },
                { label: '问题标题', prop: 'question' },
                { label: '创建时间', prop: 'createTime' }
            ],
            H5Preview: '',
            loading: false,
            checked: false,
            defaultProps: {
                children: 'respdeviceBOList',
                label (data, node) {
                    return data.questionDescription || data.deviceName
                }
            },
            isMultipled: false,
            isCatalog: true,
            ids: [],
            fileList: [],
            uploadShow: false,
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/api/helpCenter/import`,
                limit: 1,
                autoUpload: false,
                headers: { // todo I'm need a config file
                    refreshToken: sessionStorage.getItem('refreshToken'),
                    token: `Bearer ` + sessionStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                },
                data: {
                    operateUserName: '',
                    questionId: '',
                    type: ''
                }
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters(['cloudActicitylist', 'klCatalogueList', 'klQuestionList']),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        // this.tableData = [{ productN: '123' }]
        this.onSearch()
        this.initCatalogueData()
    },
    beforeRouteEnter (to, from, next) {
        newCache('cloudlist')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'cloudActedit') {
            clearCache('cloudlist')
        }
        next()
    },
    activated () {
        this.onQuery()
    },
    methods: {
        ...mapActions(['findcloudActList', 'getCatalogueListAct', 'getQuestionListAct']),
        initCatalogueData () {
            this.getCatalogueListAct()
        },
        async onQuery () {
            this.tableData = []
            this.ids = []
            await this.getQuestionListAct(this.searchParams)
            this.tableData = this.klQuestionList.records
            this.pagination = {
                pageNumber: this.klQuestionList.current,
                pageSize: this.klQuestionList.size,
                total: this.klQuestionList.total
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
        async onDeleteAct (val) {
            // console.log(val)
            // this.ids.push(val.id)
            this.$confirm('删除问题后将无法恢复，请确认是否继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await delQuestion(val.id)
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                })
                this.onQuery()
            })
        },
        onAddcloud (val) {
            this.$router.push({ path: '/comfortcloud/knowledgeEdit', query: {} })
        },
        onEdit (val) {
            this.$router.push({ path: '/comfortcloud/knowledgeEdit', query: { id: val.id } })
        },
        onShowHome (val) {
            this.H5Preview = iotUrl + '/iot/actionDetail?articleId=' + val.id
        },
        onExport () {
            this.uploadShow = true
        },
        onAllDel () {
            this.$confirm('该问题已在APP端显示，是否确认批量删除已选中的问题？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await delQuestion(this.ids.join(','))
                this.ids = []
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                })
                this.onQuery()
            })
        },
        batchOpt () {
            this.isMultipled = !this.isMultipled
            this.$refs.basicTableCom.$children[0].clearSelection()
            this.ids = []
        },
        multiSelection (val) {
            if (val.length > 0) {
                let _ids = val.map(item => item.id)
                this.ids = _ids
            }
        },
        handleNodeClick (data) {
            const { respdeviceBOList = '', type = '' } = data
            if (respdeviceBOList) {
                if (respdeviceBOList.length > 0) {
                    const { questionId } = data
                    this.queryParams = {
                        ...this.queryParams,
                        questionId,
                        type: ''
                    }
                    this.onSearch()
                } else {
                    const { questionId } = data
                    this.queryParams = {
                        ...this.queryParams,
                        question: '',
                        pageNumber: 1,
                        questionId,
                        type: ''
                    }
                    this.onSearch()
                }
            } else if (type) {
                this.queryParams = {
                    ...this.queryParams,
                    question: '',
                    questionId: '',
                    pageNumber: 1,
                    type
                }
                this.onSearch()
            }
            this.isCatalog = false
        },

        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                this.uploadData.data.questionId = this.queryParams.questionId
                this.uploadData.data.type = this.queryParams.type
                try {
                    await this.$refs.upload.submit()
                } catch (e) {}
            } else {
                this.$message.error('请选择上传的文件')
                this.loading = false
            }
        },
        onDownload () {
            downloadQuestionTemp()
        },
        beforeAvatarUpload (file) {
            const isLt10M = file.size / (1024 * 1024 * 10) < 1
            // const isCsv = file.type === 'application/vnd.ms-excel'
            const isCsv = file.name.lastIndexOf('.') > 0 ? ['.xlsx', '.xls'].indexOf(file.name.slice(file.name.lastIndexOf('.'), file.name.length)) > -1 : false
            if (!isCsv) {
                // this.$message.error('上传文件只能是 excel 格式!')
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件只能是 excel 格式!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            if (!isLt10M) {
                // this.$message.error('上传文件大小不能超过 10MB!')
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件大小不能超过 10MB!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            return isCsv && isLt10M
        },
        uploadError () {
            this.$refs.upload.clearFiles()
            this.$message.error('文件上传失败，请重试！')
            this.loading = false
        },
        uploadSuccess (response) {
            this.$refs.upload.clearFiles()
            this.loading = false
            // console.log(1112233,response)
            if (response.code === 200) {
                const { failCount, successCount } = response.data
                if (failCount > 0) {
                    this.$message.error(`成功导入${successCount}条，失败${failCount}条`)
                } else {
                    this.$message.success(`成功导入${successCount}条，失败${failCount}条`)
                }
                this.uploadShow = false
                this.onQuery()
            } else {
                this.$message.error(response.message)
            }
        },
        onCloseDialog () {
            if (this.hasFile()) {
                this.$confirm('是否确定取消选中的文件', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.upload.clearFiles()
                    this.uploadShow = false
                    this.$message({
                        type: 'success',
                        message: '已取消选中的文件!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            } else {
                this.$refs.upload.clearFiles()
                this.uploadShow = false
            }
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        async updateCloudActive (row) {
            const params = { ...row }
            params.showedTemp ? params.showed = 0 : params.showed = 1
            try {
                await editActdetail(params)
                this.onQuery()
                this.$message.success('操作成功')
            } catch (e) {
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .page-body-cont{
        display: flex;
        justify-content:flex-start;
        .left{
            width: 300px;
            border:1px solid #EBEEF5;
            margin-right: 10px;
            .title{
                height: 40px;
                padding: 4px 10px;
                border-bottom: 1px solid #EBEEF5;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #f2f2f4;
            }
        }
        .right{
            flex: 1;
            .delOpt{
                background: #f2f2f4;
                padding: 10px;
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
        &:first-child {
            font-size: 16px;
        }
        &:last-child {
            text-align: left;
        }
    }
}
.upload-fault {
    margin-bottom: 10px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
/deep/.el-dialog__body {
    padding-top: 10px;
}
/deep/.el-button.is-disabled{
    font-size: 14px;
    font-weight: 500;
}
/deep/.el-tree {
    height: 600px;
    overflow: auto;
}
/deep/.el-tree-node__label{
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

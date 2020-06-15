<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">问题标题：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.title" placeholder="请输入问题标题" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch()">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onAddcloud()" :disabled="isMultipled">新建知识</el-button>
                    <el-button type="primary" class="ml20" @click="onExport()" :disabled="isMultipled">批量导入</el-button>
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
                        :data="treeData"
                        :props="defaultProps"
                        @node-click="handleNodeClick"
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
                <div class="delOpt" v-show="isMultipled">
                    <span>已经选中{{multipleSelection.length}}条</span>
                    <el-button type="primary" class="ml20" @click="onAllDel()" :disabled="!(multipleSelection.length>0)">批量删除</el-button>
                </div>
            </div>
        </div>
        <!--<H5Preview :activeUrl="H5Preview" :loading="loading"  @hideLoading="loading =false" @clearUrl="H5Preview = ''"/>-->
        <el-dialog title="上传故障库" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload
                    class="upload-fault"
                    ref="upload"
                    :file-list="fileList"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary"  slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照故障库模板内容导入故障数据，否则可能会出现导入异常</p>
            </el-upload>
            <el-button type="primary" @click="onDownload" class="download-template">下载故障模板库</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { deleteActivity, editActdetail } from '../api'
import { clearCache, newCache } from '@/utils/index'
import { iotUrl } from '@/api/config'
import H5Preview from '../../../components/h5Preview'
export default {
    name: 'cloudlist',
    components: {
        H5Preview
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                title: '',
                deleted: 1,
                source: 1
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '目录', prop: 'title' },
                { label: '问题标题', prop: 'title' },
                { label: '创建时间', prop: 'createTime' }
            ],
            H5Preview: '',
            loading: false,
            treeData:[{
                label: '一级 1',
                children: [{
                    label: '二级 1-1'
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                }, {
                    label: '二级 2-2',
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1'
                }, {
                    label: '二级 3-2'
                }]
            }],
            checked:false,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            isMultipled:false,
            multipleSelection:[],
            fileList: [],
            uploadShow:false,
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/api/device/breakdown/import`,
                limit: 1,
                autoUpload: false,
                headers: { // todo I'm need a config file
                    refreshToken: sessionStorage.getItem('refreshToken'),
                    token: `Bearer ` + sessionStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                },
                data: {
                    operateUserName: ''
                }
            },
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudActicitylist: 'cloudActicitylist'
        }),
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
        ...mapActions({
            findcloudActList: 'findcloudActList'
        }),

        async onQuery () {
            this.tableData = []
            await this.findcloudActList(this.searchParams)
            this.cloudActicitylist.records.forEach(value => {
                value.showedTemp = value.showed === 0
            })
            this.tableData = this.cloudActicitylist.records
            this.pagination = {
                pageNumber: this.cloudActicitylist.current,
                pageSize: this.cloudActicitylist.size,
                total: this.cloudActicitylist.total
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
            if (val.effectived == 1) {
                this.$confirm('该活动还在生效中，删除后客户端无法查询，是否继续删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await deleteActivity(val.id)
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    })
                    this.onQuery()
                })
            } else {
                this.$confirm('该活动还未生效，是否继续删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await deleteActivity(val.id)
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    })
                    this.onQuery()
                })
            }
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
        onExport(){
            this.uploadShow = true
        },
        onAllDel(){

        },
        batchOpt(){
            this.isMultipled = !this.isMultipled
            this.$refs.basicTableCom.$children[0].clearSelection()
            // console.log(this.$refs.basicTableCom.$children[0].clearSelection())
        },
        multiSelection(val){
            console.log(val)
            this.multipleSelection = val
        },
        handleNodeClick(data){
            console.log(data)
        },

        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                try {
                    await this.$refs.upload.submit()
                } catch (e) {}
            } else {
                this.$message.error('请选择上传的文件')
                this.loading = false
            }
        },
        onDownload () {
            // downloadEquipmentErrorList()
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
            if (response.code === 200) {
                this.$message.success('文件上传成功')
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
            width: 200px;
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
            text-align: right;
        }
    }
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
</style>

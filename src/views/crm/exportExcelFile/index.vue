<template>
    <div class="B2b export-excel-file-test">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">表英文名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.tableNameEn" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="getExcelTableTableList({...queryParams, pageNumber: 1})">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">请选择数据源：</div>
                    <div class="query-col__input">
                        <el-select clearable v-model="uploadParams.tableNameEn" placeholder="请选择表名称上传">
                            <el-option v-for="item in nameList" :key="item.tableNameEn" :label="item.tableNameCh" :value="item.tableNameEn"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button size="small" type="default" @click="downloadFile">下载EXCEL模板</el-button>
                    <el-upload ref="elUpload" v-model="fileList" :multiple='false' :name="'file'" :data='uploadParams' :showFileList='false' :action='action' :limit='limit' :on-exceed="onExceed" :on-remove="handleRemove"
                               :on-success="handleSuccess" :on-change="handleCheckedSize" :before-upload="beforeAvatarUpload" :on-progress="uploadProcess" :accept="accept" :on-error='handleError'>
                        <el-button size="small" type="primary">excel导入</el-button>
                    </el-upload>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="fileTableList" :tableLabel="tableLabel" :pagination="fileTablePagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false" :isShowIndex='true'>
                <template slot="applyAmount" slot-scope="scope">
                    <span class="colblue">{{ scope.data.row.applyAmount | fundMoneyHasTail }}</span>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config.js'
import { getExcelLabelList, getExcelTableTableList } from './api/index'
import { ossDownload } from '@/utils/utils'
export default {
    name: 'exportExcelFileTest',
    data () {
        return {
            accept: '.xls,.xlsx',
            fileSize: 100,
            limit: 9999,
            nameList: [],
            fileList: [],
            uploadParams: {
                createBy: JSON.parse(sessionStorage.getItem('userInfo') || {}).employeeName,
                tableNameEn: ''
            },
            fileTableList: [],
            tableLabel: [
                { label: '表英文名称', prop: 'tableNameEn' },
                { label: '表中文名称', prop: 'tableNameCh' },
                { label: '文件名', prop: 'fileName' },
                { label: '操作人', prop: 'createBy' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' }
            ],
            fileTablePagination: {
                amount: 0,
                total: 0,
                pageSize: 10,
                pageNumber: 1
            },
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                tableNameEn: ''
            }
        }
    },
    computed: {
        action () {
            return interfaceUrl + 'common/excel/import'
        }
    },
    methods: {
        handleError (err) {
            let errMessage = (JSON.parse(err.message)).message || ''
            this.$message.error(`上传失败：` + errMessage)
            this.progressFlag = false
            this.loading = false
        },
        uploadProcess (event, file, fileList) {
            this.loading = true
            this.progressFlag = true
            this.uploadPercent = Math.floor(event.percent)
        },
        handleSuccess (response, file, fileList) {
            this.$message.success(`导入成功`)
            this.progressFlag = false
            this.loading = false
            this.getExcelTableTableList({ ...this.queryParams, pageNumber: 1 })
        },
        doRemove () {
            this.fileList.splice(this.index, 1)
            this.$set(this, 'fileList', this.fileList)
            this.deleteVisible = false
        },
        remove (index) {
            this.deleteVisible = true
            this.index = index
        },
        handleRemove (file, fileList) {
            if (file.response && file.response.data) {
                let index = this.fileList.indexOf(file.response.data.accessUrl)
                this.doRemove(index)
            }
        },
        onExceed (files, fileList) {
            this.$message.error(`最大允许上传个数：${this.limit}`)
        },
        handleCheckedSize (files, fileList) {
            this.isBeyond = true
            // 判断是否符合要求
            if (files.size / (1024 * 1024) < this.fileSize) {
                this.isBeyond = false
            } else {
                this.isBeyond = true
            }
        },
        getFileType (file) {
            let startIndex = file.lastIndexOf('.')
            if (startIndex != -1) {
                return file.substring(startIndex + 1, file.length).toLowerCase()
            } else {
                return ''
            }
        },
        beforeAvatarUpload (file) {
            let arr = this.accept.split(',')
            let flag = false
            arr.map(item => {
                if (item === `.${this.getFileType(file.name)}`) flag = true
            })
            if (!flag) {
                this.$message.error(`上传错误，暂不支持该文件格式上传`)
                return false
            }
            if (this.isBeyond) {
                this.$message.error(`上传错误，文件不要超过${this.fileSize}M`)
                return false
            }
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getExcelTableTableList(this.queryParams)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getExcelTableTableList(this.queryParams)
        },
        async getExcelTableTableList (params) {
            const { data } = await getExcelTableTableList(params)
            this.fileTableList = data.records
            this.fileTablePagination = {
                total: data.total,
                pageSize: data.size,
                pageNumber: data.current
            }
        },
        onReset () {
            this.queryParams = {
                pageNumber: 1,
                pageSize: 10,
                tableNameEn: ''
            }
            this.getExcelTableTableList(this.queryParams)
        },
        downloadFile () {
            if (this.uploadParams.tableNameEn) {
                this.nameList.forEach(value => {
                    if (value.tableNameEn === this.uploadParams.tableNameEn) {
                        ossDownload(value.templateExcelUrl, value.templateExcelExcel || '未知.xlsx')
                    }
                })
            } else {
                this.$message.error('请先选择数据源')
            }
        }
    },
    async mounted () {
        const { data } = await getExcelLabelList()
        this.nameList = data
        this.getExcelTableTableList(this.queryParams)
    }
}
</script>

<style scoped>

</style>

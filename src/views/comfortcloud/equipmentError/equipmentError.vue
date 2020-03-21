<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>设备故障</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">品类：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.type">
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item.dataValue" :value="item.dataKey" v-for="item in cloudEquipmentErrorDict" :key="item.dataKey"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">品牌：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.brand" maxlength="20" placeholder="输入品牌名称"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">故障代码：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.errorCode" maxlength="20" placeholder="输入故障代码"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onOpenModel">导入新故障库</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="上传代码库" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-button type="primary" @click="onImport">选择本地文件</el-button>
            <p>1.仅支持csv格式文件（大小在10M以内）</p>
            <p>2.请按照故障库模板内容导入故障数据，否则可能会出现导入异常</p>
            <el-button type="primary" class="ml20" @click="onDownload">下载故障模板库</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport">保存</el-button>
            </span>
        </el-dialog>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="cloudEquipmentErrorList" :pagination="cloudEquipmentErrorPagination"
                        @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'
                        @onSortChange="onSortChange"
                        :isAction="true" :actionMinWidth='80'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'equipmentError',
    data () {
        return {
            queryParams: {
                queryId: '',
                queryPhone: ''
            },
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '来源', prop: 'source' },
                { label: '品类', prop: 'categoryName' },
                { label: '品牌', prop: 'brandName' },
                { label: '故障代码', prop: 'code' },
                { label: '故障内容', prop: 'content' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', sortable: true }
            ],
            uploadShow: false
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        ...mapGetters({
            cloudEquipmentErrorList: 'cloudEquipmentErrorList',
            cloudEquipmentErrorPagination: 'cloudEquipmentErrorPagination',
            cloudEquipmentErrorDict: 'cloudEquipmentErrorDict'
        })
    },
    methods: {
        ...mapActions({
            findCloudEquipmentErrorList: 'findCloudEquipmentErrorList',
            findCloudEquipmentErrorDict: 'findCloudEquipmentErrorDict'
        }),
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onQuery () {
            //
        },
        onImport () {

        },
        onDownload () {
            location.href = iotUrl + '/download?queryId=10&queryPhone=1'
        },
        onOpenModel () {

        },
        onCloseDialog () {
            console.log(1)
        },
        onSortChange (val) {
            if (val.prop === 'registrationTime') {
                this.queryParams.createTime = val.order === 'descending' ? 'desc' : 'asc'
                this.queryParams.authenticationTime = ''
            } else {
                this.queryParams.authenticationTime = val.order === 'descending' ? 'desc' : 'asc'
                this.queryParams.createTime = ''
            }

            this.onQuery()
        }
    },
    mounted () {
        this.findCloudEquipmentErrorList()
        this.findCloudEquipmentErrorDict()
    }
}
</script>

<style scoped>
    .spanflex {
        font-size: 16px;
        padding-bottom: 10px;
    }
</style>

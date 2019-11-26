<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">产品：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.produet" clearable>
                        <el-option v-for="(item,index) in produetType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">平台：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.statusId" clearable>
                        <el-option v-for="(item,index) in statusIdType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createTime" type="date" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择时间" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <!-- 按钮权限 -->
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onNewVersion">新建版本</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
            </basicTable>
        </div>
        <el-dialog title="新建版本" :visible.sync="resultDialogVisible" :close-on-click-modal='false' width="30%" center>
            <el-form ref="dueform" :model="dueForm" label-width="80px">
                <el-form-item label="上传apk：" label-width='100px'>
                    <div>
                        <el-upload class="upload-demo" v-bind="uploadInfo" :on-remove="handleRemove" :before-upload='befUpload' :on-exceed='onExceed'>
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="产品：" label-width='100px'>
                    <el-input v-model="dueForm.produce" placeholder="请上传apk" maxlength="25" disabled></el-input>
                </el-form-item>
                <el-form-item label="版本号:" label-width='100px'>
                    <el-input v-model="dueForm.versionName" placeholder="请上传apk" maxlength="25" disabled></el-input>
                </el-form-item>
                <el-form-item label="平台:" label-width='100px'>
                    <el-select v-model="dueForm.statusId" clearable>
                        <el-option v-for="(item,index) in statusIdType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否强制更新:" label-width='100px'>
                    <el-switch v-model="dueForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="版本更新描述:" label-width='100px'>
                    <el-input type="textarea" placeholder="请输入内容" v-model="dueForm.textarea" maxlength="50">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resultDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
const AppInfoParser = require('app-info-parser')
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'enterpriseCA',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
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
                    let beginDateVal = this.queryParams.createTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime() - 3600 * 1000 * 24
                        )
                    }
                }
            }
        },
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    reservedName: true
                },
                accept: '.apk',
                name: 'multiFile',
                limit: 1
            }
        }
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                statusId: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '产品', prop: 'customerName' },
                { label: '平台', prop: 'customerName' },
                { label: '版本号', prop: 'customerName' },
                { label: '版本状态', prop: 'customerName' },
                { label: '强制更新', prop: 'customerName' },
                { label: '更新描述', prop: 'customerName' },
                { label: '下载地址', prop: 'customerName' },
                { label: '创建者', prop: 'customerName' },
                { label: '更新时间', prop: 'customerName' },
                { label: '操作', prop: 'customerName' }
            ],
            statusIdType: [
                { value: '', label: '全部' },
                { value: 'ios', label: '苹果' },
                { value: 'android', label: '安卓' }
            ],
            produetType: [
                { value: '', label: '全部' },
                { value: 'dfx', label: '单分享' },
                { value: 'iot', label: 'IOT' }
            ],
            resultDialogVisible: false,
            dueForm: {
                statusId: ''
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            console.log(this.searchParams)
            // const { data } = await getRateList(this.searchParams)
            // this.tableData = data.records
            // this.pagination = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     total: data.total
            // }
            // this.tableData.map(i => {
            //     if (i.statusId == '000') i.statusId = '生效'
            //     if (i.statusId == '001') i.statusId = '待生效'
            //     if (i.statusId == '002') i.statusId = '失效'
            //     if (i.dailyInterestRate != null) {
            //         i.dailyInterestRate = i.dailyInterestRate.toFixed(4) + '%'
            //     }
            // })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'produet', '')
            this.$set(this.queryParams, 'statusId', '')
            this.$set(this.queryParams, 'createTime', '')
            this.$set(this.queryParams, 'endTime', '')
            this.onSearch()
        },
        onNewVersion () {
            this.resultDialogVisible = true
        },
        async onSure () {
            // const params = {
            //     reqCustomerDailyImports: this.multiSelect
            // }
            // await rateStatus(params)
            this.resultDialogVisible = false
            // this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        handleRemove () {
            console.log(1)
        },
        onExceed () {
            this.$message.error(`请删除apk后重新上传`)
        },
        befUpload (file) {
            console.log(file)
            const parser = new AppInfoParser(file)
            parser.parse().then(async result => {
                console.log('app info ----> ', result)
                this.$set(this.dueForm, 'produce', result.application.label[0])
                this.$set(this.dueForm, 'versionName', result.versionName)
            }).catch(err => {
                console.log('err ----> ', err)
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.add-tags-dialog {
    padding-top: 20px;
}
/deep/ .el-dialog__body {
    min-height: 0 !important;
}
/deep/ .el-textarea__inner {
    height: 100px;
}
</style>

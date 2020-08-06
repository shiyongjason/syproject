<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>出库管理</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.brandName" maxlength="20" placeholder="输入手机号"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createStartTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.createEndTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onQuery(queryParams)">查询</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="cloudEquipmentErrorList" :pagination="cloudEquipmentErrorPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' @onSortChange="onSortChange">
            </basicTable>
        </div>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'equipmentError',
    data () {
        return {
            queryParams: {
                createStartTime: '',
                createEndTime: '',
                createTimeSortType: '',
                categoryId: '',
                code: '',
                brandName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '呼叫时间', prop: 'source' },
                { label: '昵称', prop: 'categoryName' },
                { label: '手机号', prop: 'brandName' },
                { label: '号码归属地', prop: 'code' },
                { label: '注册时间', prop: 'content' },
                { label: '平台', prop: 'as' },
                { label: '注册时间', prop: 's' },
                { label: '家庭', prop: 'sadas' }
            ],
            uploadShow: false,
            fileList: [],
            faultEdit: false,
            faultCodeEdit: {
                code: '',
                content: '',
                id: '',
                operateUserName: ''
            },
            rules: {
                code: [
                    { required: true, message: '请输入故障代码', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入故障内容', trigger: 'blur' }
                ]
            },
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
            loading: false,
            isCode: true
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createEndTime
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
                    let beginDateVal = this.queryParams.createStartTime
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
            cloudEquipmentErrorPagination: 'cloudEquipmentErrorPagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            onQuery: 'findCloudEquipmentErrorList'
        }),
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery(this.queryParams)
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.onQuery(this.queryParams)
            }
        }
    },
    mounted () {
        this.onQuery(this.queryParams)
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.upload-fault {
    margin-top: 30px;
    margin-bottom: 20px;
}
.download-template {
    margin-bottom: 30px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
.fault-code-edit {
    /deep/.el-dialog__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        min-height: 100px;
    }
}
</style>

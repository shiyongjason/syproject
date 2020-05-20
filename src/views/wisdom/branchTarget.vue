<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat" placeholder="请输入分部名称" :selectObj="branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">目标年份：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.date" type="year" format="yyyy" :clearable="false" :editable="false" placeholder="选择年">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onQuery({...queryParams, pageNumber: 1})">
                        搜索
                    </el-button>
                    <a :href="exportHref" v-if="hosAuthCheck(exportAuth)" class="ml20 download">导出</a>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-upload class="upload-demo" v-loading='uploadLoading' :show-file-list="false" :action="baseUrl + 'rms/subsectiontarget/import'" :data="{createUser: userInfo.employeeName ,subsectionCode: userInfo.oldDeptCode}" :on-success="isSuccess" :on-error="isError" auto-upload :on-progress="uploadProcess">
                            <el-button v-if="hosAuthCheck(importAuth)" type="primary" style="margin-left:0">
                                批量导入
                            </el-button>
                        </el-upload>
                        <a class="ml20 blue isLink" v-if="hosAuthCheck(downTemplateAuth)" @click="downloadXlsx">
                            下载分部目标模板
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <branchTable ref="baseTable" :tableData="tableData" :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></branchTable>
        </div>
    </div>
</template>

<script>
import { findBrandTargetTable } from './api/index'
import { mapState } from 'vuex'
import { interfaceUrl } from '@/api/config'
import branchTable from './components/branch.vue'
import { departmentAuth } from '@/mixins/userAuth'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { AUTH_WIXDOM_BRANCH_TARGET_EXPORT, AUTH_WIXDOM_BRANCH_TARGET_BULK_IMPORT, AUTH_WIXDOM_BRANCH_TARGET_DOWN_TEMPLATE } from '@/utils/auth_const'
export default {
    name: 'branchTarget',
    mixins: [departmentAuth],
    data: function () {
        return {
            uploadLoading: false,
            exportAuth: AUTH_WIXDOM_BRANCH_TARGET_EXPORT,
            importAuth: AUTH_WIXDOM_BRANCH_TARGET_BULK_IMPORT,
            downTemplateAuth: AUTH_WIXDOM_BRANCH_TARGET_DOWN_TEMPLATE,
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                subsectionCode: '',
                date: new Date()
            },
            queryParamsTemp: {
            },
            activityName: {},
            subsectionCodeList: [],
            file: [],
            paginationData: {},
            tableData: [],
            baseUrl: interfaceUrl,
            branchObj: {
                selectCode: '',
                selectName: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            branchList: state => state.branchList
        }),
        exportHref () {
            let url = interfaceUrl + 'rms/subsectiontarget/export?'
            for (var key in this.queryParamsTemp) {
                if (this.queryParamsTemp[key]) {
                    url += (key + '=' + this.queryParamsTemp[key] + '&')
                }
            }
            return url
        }
    },
    components: {
        branchTable,
        HAutocomplete
    },
    methods: {
        uploadProcess (event, file, fileList) {
            this.uploadLoading = true
        },
        isSuccess (response) {
            if (response.code !== 200) {
                this.$message({
                    message: '批量导入失败，' + response.message,
                    type: 'error'
                })
            } else {
                this.$message({
                    message: '批量导入成功！',
                    type: 'success'
                })
                this.onQuery(this.queryParamsTemp)
            }
            this.uploadLoading = false
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + response.message,
                type: 'error'
            })
            this.uploadLoading = false
        },
        downloadXlsx () {
            location.href = '/excelTemplate/分部目标导入模板.xlsx'
        },
        onQuery (params) {
            this.queryParamsTemp = Object.assign({}, params)
            this.queryParamsTemp.date = this.$root.$options.filters.formatDate(params.date, 'YYYY')
            this.findBrandTargetTable(params)
        },
        async findBrandTargetTable (parentParams) {
            const params = Object.assign({}, parentParams)
            params.date = this.$root.$options.filters.formatDate(params.date, 'YYYY')
            if (!params.subsectionCode) {
                params.subsectionCode = this.userInfo.oldDeptCode ? this.userInfo.oldDeptCode : ''
                this.queryParamsTemp.subsectionCode = this.userInfo.oldDeptCode ? this.userInfo.oldDeptCode : ''
            }
            const { data } = await findBrandTargetTable(params)
            this.tableData = data.data.list
            this.paginationData = {
                total: data.data.total,
                pageSize: data.data.pageSize,
                pageNumber: data.data.pageNum
            }
        },
        onSizeChange (val) {
            this.queryParamsTemp.pageSize = val
            this.onQuery(this.queryParamsTemp)
        },
        onCurrentChange (val) {
            this.queryParamsTemp.pageNumber = val.pageNumber
            this.onQuery(this.queryParamsTemp)
        },
        async backPlat (val) {
            this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
        }
    },
    mounted () {
        this.onQuery(this.queryParams)
        this.newBossAuth(['F'])
    }
}
</script>

<style scoped>
    .download {
        text-decoration: none;
        color: #ffffff;
        background: #f88825;
        line-height: 38px;
        border-radius: 4px;
        padding: 0 12px;
    }
</style>

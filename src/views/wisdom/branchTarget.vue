<template>
    <div class="page-body amount">
        <div v-show="toggle" class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">所属区域：</div>
                    <!-- <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat" placeholder="请输入分部名称" :selectObj="branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div> -->

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
                        查询
                    </el-button>
                    <el-button type="default" class="ml20" @click="onReset">
                        重置
                    </el-button>
                    <el-button type="default" v-if="hosAuthCheck(exportAuth)" class="ml20" @click="exportHref">
                        导出
                    </el-button>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-upload class="upload-demo" v-loading='uploadLoading' :show-file-list="false" :action="baseUrl + 'rms/api/subsection/target/import'" :data="{createUser: userInfo.employeeName}" :headers='headersData' :on-success="isSuccess" :on-error="isError" auto-upload :on-progress="uploadProcess">
                            <el-button v-if="hosAuthCheck(importAuth)" type="default" style="margin-left:0">
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
        <searchBarOpenAndClose :status="toggle" @toggle="toggle = !toggle"></searchBarOpenAndClose>
        <div class="page-body-cont amount" ref="hosTable">
            <branchTable :computedHeight="computedHeight" ref="baseTable" :tableData="tableData" :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></branchTable>
        </div>
    </div>
</template>

<script>
import { findBrandTargetTable, exportBranchTarget } from './api/index'
import { mapState } from 'vuex'
import { interfaceUrl } from '@/api/config'
import branchTable from './components/branch.vue'
import { departmentAuth } from '@/mixins/userAuth'
import { getOldTableTop } from '@/utils/getTableTop'
// import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import RegionCascader from './components/regionCascader.vue'

import { AUTH_WIXDOM_BRANCH_TARGET_EXPORT, AUTH_WIXDOM_BRANCH_TARGET_BULK_IMPORT, AUTH_WIXDOM_BRANCH_TARGET_DOWN_TEMPLATE } from '@/utils/auth_const'
export default {
    name: 'branchTarget',
    mixins: [departmentAuth, getOldTableTop],
    data: function () {
        return {
            uploadLoading: false,
            exportAuth: AUTH_WIXDOM_BRANCH_TARGET_EXPORT,
            importAuth: AUTH_WIXDOM_BRANCH_TARGET_BULK_IMPORT,
            downTemplateAuth: AUTH_WIXDOM_BRANCH_TARGET_DOWN_TEMPLATE,
            headersData: {
                'refreshToken': localStorage.getItem('refreshToken'),
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
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
            },
            toggle: true
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            branchList: state => state.branchList
        })
    },
    components: {
        branchTable,
        HAutocomplete
    },
    methods: {
        exportHref () {
            exportBranchTarget(this.queryParamsTemp)
        },
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
        backPlat (val) {
            this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
        },
        onReset () {
            this.queryParams = { ...this.queryParamsReset }
            this.branchObj = {
                selectCode: '',
                selectName: ''
            }
            this.newBossAuth(['F'])
            this.onQuery(this.queryParams)
        }
    },
    mounted () {
        this.queryParamsReset = JSON.parse(JSON.stringify(this.queryParams))
        this.onQuery(this.queryParams)
        this.newBossAuth(['F'])
        this.countHeight()
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

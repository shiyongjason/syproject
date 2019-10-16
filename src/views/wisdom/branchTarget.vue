<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" clearable placeholder="全部">
                            <el-option v-for="item in subsectionCodeList" :key="item.subsectionCode" :label="item.subsectionName" :value="item.subsectionCode">
                            </el-option>
                        </el-select>
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
                    <el-button type="primary" class="ml20" @click="onQuery()">
                        搜索
                    </el-button>
                    <a :href="exportHref" class="ml20 download">导出</a>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-upload class="upload-demo" :show-file-list="false" :action="baseUrl + 'ims/subsectiontarget/import'" :data="{createUser: userInfo.name ,subsectionCode: userInfo.companyCode}" :on-success="isSuccess" auto-upload>
                            <el-button type="primary" class="ml20">
                                批量导入
                            </el-button>
                        </el-upload>
                        <a class="ml20 blue isLink" @click="downloadXlsx">
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
import { findBrandTargetTable, findBranchListNew } from './api/index'
import { mapState } from 'vuex'
import { interfaceUrl } from '@/api/config'
import branchTable from './components/branch.vue'
export default {
    name: 'branchTarget',
    data: function () {
        return {
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
            baseUrl: interfaceUrl
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        exportHref () {
            let url = interfaceUrl + 'ims/subsectiontarget/export?'
            for (var key in this.queryParamsTemp) {
                if (this.queryParamsTemp[key]) {
                    url += (key + '=' + this.queryParamsTemp[key] + '&')
                }
            }
            return url
        }
    },
    components: {
        branchTable
    },
    methods: {
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
                this.onQuery()
            }
        },
        downloadXlsx () {
            location.href = '/excelTemplate/分部目标导入模板.xlsx'
        },
        onQuery () {
            this.queryParamsTemp = Object.assign({}, this.queryParams)
            this.queryParamsTemp.date = this.$root.$options.filters.formatDate(this.queryParamsTemp.date, 'YYYY')
            this.findBrandTargetTable()
        },
        async findBrandTargetTable () {
            const params = Object.assign({}, this.queryParams)
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
        async findBranchListNew () {
            const param = {
                subsectionCode: this.userInfo.oldDeptCode ? this.userInfo.oldDeptCode : ''
            }
            const { data } = await findBranchListNew(param)
            if (data.data) {
                this.subsectionCodeList = data.data
            }
        },
        onSizeChange (val) {
            console.log(val)
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        }
    },
    mounted () {
        this.findBranchListNew()
        this.onQuery()
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

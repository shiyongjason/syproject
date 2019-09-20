<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col" v-if="userInfo.oldDeptCode==='top'">
                    <div class="query-cont-title">分部：</div>
                    <div class="query-cont-input">
                        <el-select v-model="searchParams.subsectionCode" placeholder="选择" :clearable=true>
                            <el-option v-for="item in branchList" :key="item.subsectionCode" :label="item.subsectionName" :value="item.subsectionCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">公司简称：</div>
                    <div class="flex-wrap-cont">
                        <HAutocomplete ref="HAutocomplete" :selectArr="companyList" v-if="companyList" @back-event="backFindmiscode" :placeholder="'选择公司简称'" />
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">所在城市：</div>
                    <div class="flex-wrap-cont">
                        <HAutocomplete :placeholder="'选择城市'" @back-event="backFindcitycode" :selectArr="cityList" v-if="cityList" />
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">上线时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker v-model="searchParams.onlineTime" :editable="false" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">增量/存量：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="searchParams.incremental" placeholder="请选择选择" :clearable=true>
                            <el-option v-for="item in incrementalList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">目标年份：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker type="year" :editable=false :clearable=false placeholder="选择年份" format="yyyy" value-format="yyyy" v-model="searchParams.targetDate">
                        </el-date-picker>
                    </div>
                       <el-button type="primary" @click="onFindTableList()">搜索
                    </el-button>
                    <el-button type="primary" @click="onExport()">导出
                    </el-button>
                </div>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :action="interfaceUrl + 'ims/companyTarget/import'" :data="{createUser: userInfo.name,subsectionCode: userInfo.companyCode}" :on-success="isSuccess" auto-upload>
                    <el-button type="primary" class="ml20">
                        批量导入
                    </el-button>
                </el-upload>
                <a class="ml20 blue isLink" @click="downloadXlsx">
                    下载平台目标模板
                </a>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <el-table :data="tableData" style="width: 100%" border :header-cell-style="{color:'#606266'}">
                    <el-table-column prop="companyShortName" align="center" label="公司简称">
                    </el-table-column>
                    <el-table-column prop="misCode" label="公司编码" align="center">
                    </el-table-column>
                    <el-table-column prop="subsectionName" label="分部" align="center">
                    </el-table-column>
                    <el-table-column prop="cityName" label="所在城市" align="center">
                    </el-table-column>
                    <el-table-column prop="onlineTime" label="上线时间" align="center">
                    </el-table-column>
                    <el-table-column label="增量/存量" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.onlineTime">{{scope.row.incremental == 1?'增量':'存量'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="targetDate" label="目标年份" align="center">
                    </el-table-column>
                    <el-table-column prop="performanceTarget" label="履约目标/万" align="center">
                    </el-table-column>
                    <!-- <el-table-column
                            prop="minimumTarget"
                            label="保底目标/万"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="balanceTarget"
                            label="平衡目标/万"
                        >
                        </el-table-column> -->
                    <el-table-column prop="sprintTarget" label="冲刺目标/万" align="center">
                    </el-table-column>
                    <el-table-column prop="updateUser" label="最近操作人" align="center">
                    </el-table-column>
                    <el-table-column label="最近操作时间" align="center">
                        <template slot-scope="scope">
                            {{scope.row.updateTime | formatDate('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page clearfix" style="text-align: center">
                    <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.totalElements">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { findSubsectionList, findTableList, getCompany, getCityList } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            incrementalList: [{ key: '', value: '全部' }, { key: 1, value: '增量' }, { key: 0, value: '存量' }],
            searchParams: {
                subsectionCode: '',
                misCode: '',
                onlineTime: '',
                incremental: '',
                targetDate: `${(new Date()).getFullYear()}`,
                cityCode: '',
                pageNumber: 1,
                pageSize: 10
            },
            branchList: [],
            companyData: {
                url: interfaceUrl + 'ims/companyTarget/queryCompanyShortName',
                otherParams: {
                    keys: 'companyShortName',
                    keyName: 'companyShortName',
                    keyValue: 'misCode'
                },
                params: {
                    companyCode: ''
                }
            },
            cityData: {
                url: interfaceUrl + 'ims/companyTarget/queryCity',
                otherParams: {
                    keys: 'cityName',
                    keyName: 'cityName',
                    keyValue: 'cityCode'
                },
                params: {
                    companyCode: ''
                }
            },
            tableData: [],
            paginationData: {},
            interfaceUrl: interfaceUrl,
            companyList: [],
            cityList: []
        }
    },
    components: {
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {
        if (this.userInfo.oldDeptCode !== 'top') {
            this.searchParams.subsectionCode = this.userInfo.oldDeptCode
        }
        this.companyData.params.companyCode = this.userInfo.oldDeptCode
        this.cityData.params.companyCode = this.userInfo.oldDeptCode
        this.onFindBranchList(this.userInfo.oldDeptCode)
        this.onFindTableList()
        this.getCompanyList()
        this.getCityList()
    },
    watch: {
        // 'searchParams.subsectionCode' (newV, oldV) {
        //     this.cityData.params.subsectionCode = newV
        // }
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
                this.onFindTableList()
            }
        },
        changeCellStyle ({ row, rowIndex, columnIndex }) {
            // 第八列添加 red 类
            if (columnIndex === 8) {
                return 'red'
            }
        },
        async onFindTableList () {
            const { data } = await findTableList(this.searchParams)
            this.tableData = data.data.list
            this.tableData && this.tableData.map(value => {
                value.balanceTarget = (value.balanceTarget).toFixed(2)
                value.minimumTarget = (value.minimumTarget).toFixed(2)
                value.performanceTarget = (value.performanceTarget).toFixed(2)
                value.sprintTarget = (value.sprintTarget).toFixed(2)
                return value
            })
            this.paginationData = {
                pageNumber: data.data.pageNum,
                totalElements: data.data.total
            }
        },
        async onFindBranchList (value) {
            const { data } = await findSubsectionList({ companyCode: value })
            this.branchList = data.data
        },
        backFindmiscode (val) {
            this.searchParams.misCode = val.value.misCode
        },
        backFindcitycode (val) {
            console.log(val)
            this.searchParams.cityCode = val.value.cityCode
        },
        handleSizeChange (val) {
            this.searchParams.pageSize = val
            this.onFindTableList()
        },
        handleCurrentChange (val) {
            this.searchParams.pageNumber = val
            this.onFindTableList()
        },
        onExport () {
            var url = ''
            // delete this.searchParams.pageNumber
            // delete this.searchParams.pageSize
            for (var key in this.searchParams) {
                url += (key + '=' + (this.searchParams[key] ? this.searchParams[key] : '') + '&')
            }
            location.href = interfaceUrl + 'ims/companyTarget/export?' + url
        },
        downloadXlsx () {
            location.href = '/excelTemplate/平台目标导入模板.xlsx'
        },
        async  getCompanyList () {
            const { data } = await getCompany()
            this.companyList = data.data
            this.companyList && this.companyList.map(item => {
                item.value = item.companyShortName
                item.selectCode = item.misCode
            })
        },
        async  getCityList () {
            const { data } = await getCityList()
            this.cityList = data.data
            this.cityList && this.cityList.map(item => {
                item.value = item.cityName
                item.selectCode = item.cityCode
            })
        }
    }
}
</script>
<style lang="scss" >
.red {
    color: red !important;
}
.download {
    text-decoration: none;
    color: #ffffff;
    background: #f88825;
    line-height: 38px;
    border-radius: 4px;
    padding: 0 12px;
}
</style>

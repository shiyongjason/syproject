<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">项目名称/编号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectNo" placeholder="请输入项目名称/编号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">项目提交时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经销商：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入项目名称/编号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">甲方名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.firstPartName" placeholder="请输入甲方名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">更新时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minUpdateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxUpdateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">项目类别：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.type">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">合作进度：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.progress">
                            <el-option label="全部" value="">
                            </el-option>
                           <el-option v-for="item in processList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey"
                :isShowIndex='true'>
                  <template slot="type" slot-scope="scope">
                   {{scope.data.row.type&&typeList[scope.data.row.type-1]['value']}}
                </template>
                  <template slot="progress" slot-scope="scope">
                   {{scope.data.row.type&&processList[scope.data.row.progress-1]['value']}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onLookproject(scope.data.row.id)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
        <projectDrawer :drawer=drawer @backEvent='restDrawer' ref="drawercom"></projectDrawer>
        <!-- <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable> -->
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import projectDrawer from './components/projectDrawer'
import { TYPE_LIST, PROCESS_LIST } from '../const'
export default {
    name: 'projectlist',
    data () {
        return {
            categoryIdArr: [],
            productSource: [],
            brandList: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                firstPartName: '',
                maxCreateTime: '',
                maxUpdateTime: '',
                minCreateTime: '',
                minUpdateTime: '',
                progress: '',
                projectName: '',
                projectNo: '',
                type: '',
                originType: ''
            },
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            middleStatus: 0, // 0无文件 1有文件已提交 2有文件未提交
            tableLabel: [
                { label: '项目名称', prop: 'projectName' },
                { label: '项目编号', prop: 'projectNo' },
                { label: '借款总额', prop: 'predictLoanAmount' },
                { label: '经销商', prop: 'upstreamSupplierName' },
                { label: '甲方名', prop: 'firstPartName' },
                { label: '项目类别', prop: 'type', width: '120' },
                { label: '合作进度', prop: 'progress', width: '120' },
                { label: '项目提交时间', prop: 'createTime', width: '180' },
                { label: '更新时间', prop: 'updateTime', width: '180' }
            ],
            rowKey: '',
            multiSelection: [],
            drawer: false,
            typeList: TYPE_LIST,
            processList: PROCESS_LIST
        }
    },
    components: {
        projectDrawer
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxCreateTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minCreateTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        pickerOptionsMax () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxUpdateTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsMin () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minUpdateTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapGetters('crmmanage', {
            projectData: 'projectData'
        })
    },
    async mounted () {
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
    },

    methods: {
        ...mapActions('crmmanage', {
            findProjetpage: 'findProjetpage'
        }),
        onRest () {
            this.categoryIdArr = []
            this.queryParams = deepCopy(this.copyParams)
            this.removeValue = true
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val
        },
        async  searchList () {
            const { ...params } = this.queryParams
            await this.findProjetpage(params)
            this.tableData = this.projectData.records
            this.paginationInfo = {
                pageNumber: this.projectData.current,
                pageSize: this.projectData.size,
                total: this.projectData.total
            }
        },
        onLookproject (val) {
            this.drawer = true
            this.$refs.drawercom.onFindProjectDetail(val)
        },
        restDrawer () {
            this.drawer = false
            this.searchList()
        }
    }
}
</script>
<style lang="scss" scoped>
.colred {
    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
</style>
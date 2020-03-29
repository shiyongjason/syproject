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
                        <el-date-picker v-model="queryParams.minCreateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxCreateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
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
                        <el-date-picker v-model="queryParams.minUpdateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxUpdateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">项目类别：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.type">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option label="禁用" value="2">
                            </el-option>
                            <el-option label="启用" value="1">
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
                            <el-option label="禁用" value="2">
                            </el-option>
                            <el-option label="启用" value="1">
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
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.brandNameEn}}
                </template>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status==1?'colred':'colgry'">{{scope.data.row.status==1?'启用':'禁用'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onEditSpu(scope.data.row)">编辑</el-button>
                    <el-button :type="scope.data.row.status ==1?'primary':''" size="mini" plain @click="onChangeSpu(scope.data.row)" v-text="scope.data.row.status === 1 ? '禁用' : '启用'">
                    </el-button>
                </template>
            </basicTable>
        </div>
        <!-- <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable> -->
    </div>
</template>
<script>
// import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { clearCache, newCache } from '@/utils/index'
export default {
    name: 'spumange',
    data () {
        return {
            categoryIdArr: [],
            productSource: [],
            brandList: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            middleStatus: 0, // 0无文件 1有文件已提交 2有文件未提交
            tableLabel: [
                { label: '项目名称', prop: 'projectName' },
                { label: '项目编号', prop: 'projectNo' },
                { label: '借款总额', prop: 'predictLoanAmount', width: '200' },
                { label: '经销商', prop: 'upstreamSupplierName' },
                { label: '甲方名', prop: 'firstPartName', width: '200' },
                { label: '项目类', prop: 'type' },
                { label: '合作进度', prop: 'merchantName' },
                { label: '项目提交时间', prop: 'createTime' },
                { label: '更新时间', prop: 'updateTime', width: '200' }
            ],
            rowKey: '',
            multiSelection: [],
            removeValue: false
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapGetters('crmmanage', {
            projectDat: state => state.projectData
        })
    },
    beforeRouteEnter (to, from, next) {
        newCache('spumange')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'spudetail') {
            clearCache('spumange')
        }
        next()
    },
    async mounted () {
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
    },
    activated () {
        this.searchList()
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
            // this.removeValue = false
            const { ...params } = this.queryParams
            await this.findProjetpage(params)
            // this.tableData = data.records
            // this.paginationInfo = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     total: data.total
            // }
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
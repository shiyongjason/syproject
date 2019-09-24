<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">SPU编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" placeholder="请输入SPU编码" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品品牌：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.brandId" placeholder="请输入商品品牌" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品完整度：</div>
                    <div class="query-col-input">
                         <el-select v-model="queryParams.integrity">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option label="完整" value="1">
                            </el-option>
                            <el-option label="不完整" value="2">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.status">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option label="上架" value="1">
                            </el-option>
                            <el-option label="下架" value="2">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品来源：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.source">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option :key="item.sourceCode" :label="item.sourceName" :value="item.sourceCode" v-for="item in productSource">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品类目：</div>
                    <div class="query-col-input">
                        <el-cascader :options="categoryList" v-model="queryParams.categoryId" :props="{ checkStrictly: true }" clearable @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuName" placeholder="请输入商品名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品型号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.specification" placeholder="请输入商品型号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">维护时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">维护人：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.operator" placeholder="请输入维护人姓名">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="gotoProductAdd">
                        新建商品SPU
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onChangeStatus(1)">批量禁用</el-button>
                    <el-button type="primary" class="ml20" @click="onChangeStatus(2)">批量启用</el-button>
                    <el-button type="primary" class="ml20" @click="onExport()">
                        导出
                    </el-button>
                    <el-button type="primary" class="ml20" @click="dialogFormVisible = true">
                        导入
                    </el-button>
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
import { findProducts, findProductSource } from './api/index'
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            productSource: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                spuCode: '',
                spuName: '',
                specification: '',
                categoryId: '',
                brandId: '',
                integrity: '',
                status: '',
                source: '',
                startTime: '',
                endTime: '',
                operator: ''
            },
            tableData: [],
            paginationInfo: {},
            middleStatus: 0, // 0无文件 1有文件已提交 2有文件未提交
            tableLabel: [{ label: '品牌', prop: 'brandName' },
                { label: '商品名称', prop: 'spuName', width: '200' },
                { label: '完整度', prop: 'integrity', width: '200' },
                { label: '来源', prop: 'merchantName' },
                { label: '状态', prop: 'status' }
            ],
            rowKey: '',
            multiSelection: []
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
        ...mapState({
            userInfo: state => state.userInfo,
            userInfo2: state => state.hmall.userInfo,
            categoryList: state => state.hmall.categoryList
        })

    },
    async mounted () {
        const { data } = await findProductSource()
        this.productSource = data
        this.findCategoryList()
        this.searchList()
    },
    methods: {
        ...mapActions({
            findCategoryList: 'findCategoryList'
        }),
        handleSizeChange (val) {
            this.queryParams.size = val
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
            if (params.startTime) {
                params.startTime = this.$root.$options.filters.formatterTime(params.startTime)
            }
            if (params.endTime) {
                params.endTime = this.$root.$options.filters.formatterTime(params.endTime)
            }
            if (params.categoryId) params.categoryId = params.categoryId[params.categoryId.length - 1]
            const { data } = await findProducts(params)
            this.tableData = data.records
            this.paginationInfo = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onChangeStatus (val) {
            console.log(this.multiSelection)
        },
        gotoProductAdd () {
            this.$router.push({ path: '/hmall/spudetail', query: { type: 'add' } })
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
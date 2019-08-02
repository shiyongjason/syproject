<template>
    <div class="shop-manager">
        <div class="page-body">
            <div class="page-body-cont">
                <div class="page-header">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>商品库管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="page-wrap flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">商品编码：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    v-model="queryParams.productCode"
                                    placeholder="请输入商品编码"
                                    maxlength="50"></el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">商品名称：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    v-model="queryParams.productName"
                                    placeholder="请输入商品名称"
                                    maxlength="50"></el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">商品品牌：</div>
                            <div class="flex-wrap-cont">
                                <el-input
                                    v-model="queryParams.brandName"
                                    placeholder="请输入商品品牌"
                                    maxlength="50"></el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">商品状态：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.status" style="width: 100%">
                                    <el-option
                                        label="全部"
                                        value="">
                                    </el-option>
                                    <el-option
                                        label="上架"
                                        value="1">
                                    </el-option>
                                    <el-option
                                        label="下架"
                                        value="2">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">商品来源：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.sourceCode" style="width: 100%">
                                    <el-option
                                        label="全部"
                                        value="">
                                    </el-option>
                                    <el-option :key="item.sourceCode" :label="item.sourceName" :value="item.sourceCode" v-for="item in productSource">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">商品类目：</div>
                            <div class="flex-wrap-cont">
                                <el-cascader
                                    :options="productCategoryList"
                                    v-model="queryParams.categoryId"
                                    :change-on-select="true"
                                    @change="productCategoryChange"
                                    style="width: 100%"></el-cascader>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">维护时间：</div>
                            <div class="flex-wrap-cont">
                                <el-date-picker
                                    v-model="queryParams.startDate"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="开始日期"
                                    :picker-options="pickerOptionsStart"
                                >
                                </el-date-picker>
                                <span class="ml10 mr10">-</span>
                                <el-date-picker
                                    v-model="queryParams.endDate"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="结束日期"
                                    :picker-options="pickerOptionsEnd"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">维护人：</div>
                            <div class="flex-wrap-cont">
                                <el-input type="text" maxlength="50" v-model="queryParams.updateBy" placeholder="请输入维护人姓名">
                                </el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-cont">
                                <el-button type="primary" class="ml20" @click="onQuery()">
                                    搜索
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <shopManagerTable
                    ref="shopManagerTable"
                    :tableData="tableData"
                    :paginationData="paginationData"
                    @updateStatus="onQuery"
                    @updateBrand="updateBrandChange"
                    @onSizeChange="onSizeChange"
                    @onCurrentChange="onCurrentChange"></shopManagerTable>
            </div>
        </div>
    </div>
</template>

<script>
import shopManagerTable from './components/shopManagerTable'
import { findProducts, findProductSource, findProductCategory } from './api/index'
// import { findCategoryByParent } from '@/views/hmall/category/api/index'
export default {
    name: 'shopManager',
    components: {
        shopManagerTable
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endDate
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startDate
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                status: '',
                startDate: '',
                endDate: '',
                categoryId: [],
                sourceCode: ''
            },
            tableData: [],
            paginationData: {},
            productSource: [],
            productCategoryList: []
        }
    },
    methods: {
        async onQuery () {
            const { ...params } = this.queryParams
            if (params.startDate) {
                params.startDate = this.$root.$options.filters.formatterTime(params.startDate)
            }
            if (params.endDate) {
                params.endDate = this.$root.$options.filters.formatterTime(params.endDate)
            }
            if (params.categoryId) params.categoryId = params.categoryId[params.categoryId.length - 1]
            const { data } = await findProducts(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.onQuery()
        },
        updateBrandChange (col) {
            this.modifyId = col.id
            this.form = this.tempForm
            this.findBrandDetails()
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val
        }
    },
    async mounted () {
        this.onQuery()
        const { data } = await findProductSource()
        this.productSource = data
        const { data: productCategory } = await findProductCategory()
        let productCategoryTemp = []
        productCategoryTemp = productCategory.map((value) => {
            let obj = {
                value: value.id,
                label: value.categoryName,
                children: value.categoryList ? value.categoryList.map(value1 => {
                    let obj1 = {
                        value: value1.id,
                        label: value1.categoryName,
                        children: value1.categoryList ? value1.categoryList.map(value2 => {
                            let obj2 = {
                                value: value2.id,
                                label: value2.categoryName
                            }
                            return obj2
                        }) : null
                    }
                    return obj1
                }) : null
            }
            return obj
        })
        productCategoryTemp.splice(0, 0, {
            value: '',
            label: '全部'
        })
        this.productCategoryList = productCategoryTemp
    }
}
</script>

<style scoped>
    .status-on{
        color: #999999;
    }
    .flex-wrap-row{
        max-width: 1350px;
    }
</style>

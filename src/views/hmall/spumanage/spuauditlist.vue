<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">SPU编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.productCode" placeholder="请输入商品编码" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">商品品牌：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.brandName" placeholder="请输入商品品牌" maxlength="50"></el-input>
                    </div>
                </div>
                       <div class="query-cont-col">
                    <div class="query-col-title">商品型号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.productName" placeholder="请输入商品型号" maxlength="50"></el-input>
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
                        <el-select v-model="queryParams.sourceCode">
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
                        <el-cascader :options="categoryList" v-model="queryParams.categoryId" :change-on-select="true" @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.productName" placeholder="请输入商品名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            搜索
                        </el-button>
                    </div>
                </div>

            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onChangeStatus(1)">批量审核</el-button>
                    <el-button type="primary" class="ml20" @click="onExport()">
                        导出
                    </el-button>

                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.brandNameEn}}
                </template>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status==1?'colred':'colgry'">{{scope.data.row.status==1?'上架':'下架'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onGoodsMain(scope.data.row.id,scope.data.row.checkStatus)">编辑</el-button>

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
            dialogFormVisible: false,
            innerVisible: false,
            file: '',
            errMsg: [],
            queryParams: {
                productCode: '',
                productName: '',
                updateBy: '',
                brandName: '',
                pageNumber: 1,
                status: '',
                startDate: '',
                endDate: '',
                categoryId: [],
                sourceCode: ''
            },
            tableData: [],
            paginationInfo: {},
            tableLabel: [{ label: '商品编码spu', prop: 'productCode' },
                { label: '商品名称', prop: 'productName', width: '150' },
                { label: '品牌', prop: 'brandName', width: '200' },
                { label: '商品类目', prop: 'categoryName', width: '200' },
                { label: '商品来源', prop: 'sourceName' },
                { label: '商品状态', prop: 'status' },
                { label: '维护人', prop: 'updateBy' },
                { label: '维护时间', prop: 'updateTime', width: '200' }
            ],
            rowKey: ''
        }
    },
    computed: {
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
            if (params.startDate) {
                params.startDate = this.$root.$options.filters.formatterTime(params.startDate)
            }
            if (params.endDate) {
                params.endDate = this.$root.$options.filters.formatterTime(params.endDate)
            }
            if (params.categoryId) params.categoryId = params.categoryId[params.categoryId.length - 1]
            const { data } = await findProducts(params)
            this.tableData = data.records
            this.paginationInfo = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
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
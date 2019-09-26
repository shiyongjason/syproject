<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">SPU编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" placeholder="请输入商品编码" maxlength="50"></el-input>
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
                        <el-input v-model="queryParams.specification" placeholder="请输入商品型号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.auditStatus">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option label="待审核" value="0">
                            </el-option>
                            <el-option label="通过" value="1">
                            </el-option>
                             <el-option label="未通过" value="2">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- <div class="query-cont-col">
                    <div class="query-col-title">商品来源：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.source">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option :key="item.sourceCode" :label="item.sourceName" :value="item.sourceCode" clearable v-for="item in productSource">
                            </el-option>
                        </el-select>
                    </div>
                </div> -->
                <div class="query-cont-col">
                    <div class="query-col-title">商品类目：</div>
                    <div class="query-col-input">
                        <el-cascader :options="categoryList" v-model="categoryIdArr"  @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuName" placeholder="请输入商品名称" maxlength="50"></el-input>
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
                    <el-button type="primary" class="ml20" @click="onChangeStatus(1)">批量审核</el-button>
                    <el-button type="primary" class="ml20" @click="onExport()">
                        导出
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync='multiSelection'
            :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}
                </template>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.auditStatus==0?'colgry':scope.data.row.auditStatus==1?'':'colred'">{{scope.data.row.auditStatus==0?'待审核':scope.data.row.auditStatus==1?'通过':'未通过'}}</span>
                </template>
                 <template slot="action" slot-scope="scope">
                     <el-button type="success" size="mini" plain @click="onAuditSpu(scope.data.row)" v-if="scope.data.row.auditStatus==0">审核</el-button>
                </template>
            </basicTable>
        </div>
        <!-- <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable> -->
    </div>
</template>
<script>
import { findProducts } from './api/index'
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
                auditStatus: '',
                source: 1
            },
            tableData: [],
            paginationInfo: {},
            tableLabel: [{ label: '商品编码spu', prop: 'spuCode' },
                { label: '商品名称', prop: 'spuName', width: '150' },
                { label: '品牌', prop: 'brandName', width: '200' },
                { label: '型号', prop: 'specification', width: '200' },
                { label: '来源', prop: 'merchantName' },
                { label: '状态', prop: 'status' }
            ],
            rowKey: '',
            multiSelection: [],
            categoryIdArr: []
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
        // const { data } = await findProductSource()
        // this.productSource = data
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
            if (params.categoryId) params.categoryId = params.categoryId[params.categoryId.length - 1]
            const { data } = await findProducts(params)
            this.tableData = data.records
            this.paginationInfo = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onExport () {
            // window.location = B2bUrl + 'product/api/boss/products/export?status=' + this.queryParams.status +
            //     '&startDate=' + this.queryParams.startDate +
            //     '&endDate=' + this.queryParams.endDate +
            //     '&categoryId=' + this.queryParams.categoryId +
            //     '&sourceCode=' + this.queryParams.sourceCode +
            //     '&productName=' + this.queryParams.productName +
            //     '&productCode=' + this.queryParams.productCode +
            //     '&updateBy=' + this.queryParams.updateBy +
            //     '&brandName=' + this.queryParams.brandName
        },
        onChangeStatus (val) {
            console.log(this.multiSelection)
        },
        onAuditSpu (val) {
            this.$router.push({ path: '/hmall/spudetail', query: { type: 'audit', spuCode: val.spuCode, auditStatus: val.status } })
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
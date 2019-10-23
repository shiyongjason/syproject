<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">商家名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入商家名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">商品类目：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.categoryId" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <template v-for="(item, index) in category">
                                <el-option :label='item.categoryName' :value='item.id' :key="index"></el-option>
                            </template>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品品牌：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入商品品牌">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.spuName" placeholder="请输入商品名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">集市状态：</div>
                    <div class="query-col-input">
                         <el-select v-model="queryParams.onMarket" style="width: 100%">
                        <el-option :label='item.name' :value='item.value' :key="index" v-for="(item, index) in statusArr"></el-option>
                         </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                        <!-- <el-button type="primary" class="ml20">导出</el-button> -->
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :isPagination='true' :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                    <template slot='skuRebateBoList' slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                            <div slot="content">
                                <span v-if="scope.data.row.skuRebateBoList.length>0">
                                    <p v-for="(item,index) in scope.data.row.skuRebateBoList" :key="index">
                                        <i v-if="item.type==1" style="font-style:normal">直接返利{{item.discount}}%</i>
                                        <i v-if="item.type==2" style="font-style:normal">满{{item.reachValue}}元返{{item.discount}}%</i>
                                        <i v-if="item.type==3" style="font-style:normal">满{{item.reachValue}}件返{{item.discount}}%</i>
                                    </p>
                                </span>
                                <span v-else>-</span>
                            </div>
                            <span>返利详情</span>
                        </el-tooltip>
                    </template>
                    <template slot='commission' slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                            <div slot="content">
                                <span v-if="scope.data.row.commissionBoList.length>0">
                                    <p v-for="(item,index) in scope.data.row.commissionBoList" :key="index">
                                        <i style="font-style:normal">{{item.skuName}}佣金{{item.commission}}%</i>
                                    </p>
                                </span>
                                <span v-else>-</span>
                            </div>
                            <span>{{scope.data.row.commission}}%</span>
                        </el-tooltip>
                    </template>
                    <template slot='onMarket' slot-scope="scope">
                        {{scope.data.row.onMarket==1?'上架':'下架'}}
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { findBazaarList, findCategory } from './api/index'
export default {
    name: 'marketStore',
    data () {
        return {
            statusArr: [{ name: '全部', value: '' }, { name: '上架', value: 1 }, { name: '下架', value: 2 }],
            tableLabel: [
                { label: '商品编码', prop: 'spuCode' },
                { label: '商品名称', prop: 'spuFullName' },
                { label: '品牌', prop: 'brandName' },
                { label: '商品类目', prop: 'categoryNames' },
                { label: '商家名称', prop: 'merchantName' },
                { label: '建议零售价', prop: 'retailPrice' },
                { label: '销售价格', prop: 'sellPrice', event: true },
                { label: '返利', prop: 'skuRebateBoList' },
                { label: '佣金', prop: 'commission' },
                { label: '商品库存', prop: 'inventory', colorLeave: { bound: 0, notReach: 'red', reach: '' } },
                { label: '集市状态', prop: 'onMarket' }
            ],
            tableData: [],
            searchParams: {},
            queryParams: {
                merchantName: '',
                spuName: '',
                source: '',
                brandName: '',
                categoryId: '',
                onMarket: ''
            },
            paginationData: {
                pageNumber: 1,
                pageSize: 10
                // total: 100
            },
            category: []
        }
    },
    methods: {
        onQuery () {
            const { ...params } = { ...this.queryParams }
            this.searchParams = params
            this.search()
        },
        onReset () {
            this.$set(this.queryParams, 'merchantName', '')
            this.$set(this.queryParams, 'spuName', '')
            this.$set(this.queryParams, 'brandName', '')
            this.$set(this.queryParams, 'source', '')
            this.$set(this.queryParams, 'categoryId', '')
            this.$set(this.paginationData, 'pageNumber', 1)
            this.$set(this.paginationData, 'pageSize', 10)
            this.onQuery()
        },
        async search () {
            const searchParams = {
                ...this.searchParams,
                ...this.paginationData
            }
            if (searchParams.pageSize == 0) searchParams.pageSize = 10
            const { data } = await findBazaarList(searchParams)
            this.paginationData.pageNumber = data.current
            this.paginationData.pageSize = data.size
            this.paginationData.total = data.total
            data.records.map(item => {
                item.spuFullName = item.brandName + ' ' + item.spuName
            })
            this.tableData = data.records
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            const { ...page } = val
            this.paginationData = page
            this.search()
        },
        async findCategory () {
            const { data } = await findCategory()
            this.category = data
        }
    },
    mounted () {
        this.onQuery()
        this.findCategory()
    }
}
</script>

<style scoped>
</style>
<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">SKU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.skuCode" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.skuName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品归属商家：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.goodsType">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="item in productTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery()">查询</h-button>
                    <h-button @click="onReset()">重置</h-button>
                </div>
            </div>
            <div class="button-cont">
                <h-button type="create" @click="onCreateWarehouse">批量添加</h-button>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :actionMinWidth="160" :isMultiple="false" :isAction="true" :isShowIndex='true'>
                <template slot="goodsType" slot-scope="scope">
                    {{arrayToMap(productTypeOptions).get(scope.data.row.goodsType)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onEditWarehouse(scope.data.row)">编辑</h-button>
                    <h-button table @click="onDelWarehouse(scope.data.row)">删除</h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { PRODUCT_TYPE } from '../const'
import { clearCache, newCache } from '@/utils/index'
export default {
    name: 'warehouseProduct',
    data () {
        return {
            queryParams: {
                skuCode: '',
                skuName: '',
                merchantName: '',
                goodsType: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            tableLabel: [
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'skuName' },
                { label: '归属商家名称', prop: 'merchantName' },
                { label: '商品类型', prop: 'goodsType' },
                { label: '市区单件运费价格', prop: 'cityPrice', formatters: 'moneyShow' },
                { label: '县区单件运费价格', prop: 'countryPrice', formatters: 'moneyShow' },
                { label: '添加时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '添加人', prop: 'createBy' },
                { label: '最后维护人', prop: 'updateBy' }
            ],
            tableData: [],
            pagination: {},
            productTypeOptions: PRODUCT_TYPE
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            warehouserProductData: state => state.hmall.warehouseManage.warehouserProductData
        })
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getWarahouseProductList()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getWarahouseProductList()
        },
        onCreateWarehouse () {
            clearCache('createWarehouse')
            this.$router.push({ path: '/b2b/warehouse/createWarehouse' })
        },
        onEditWarehouse ({ id }) {
            clearCache('createWarehouse')
            this.$router.push({ path: '/b2b/warehouse/createWarehouse', query: { id: id } })
        },
        onDelWarehouse ({ id }) {
            this.$confirm('删除后该商品不再收取线上运费，确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await this.deleteWarahouseProduct({ id: id })
                await this.getWarahouseProductList()
            }).catch(() => { })
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getWarahouseProductList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getWarahouseProductList()
        },
        ...mapActions({
            findWarahouseProductList: 'warehouseManage/findWarahouseProductList',
            deleteWarahouseProduct: 'warehouseManage/deleteWarahouseProduct'
        }),
        async getWarahouseProductList () {
            await this.findWarahouseProductList(this.queryParams)
            this.tableData = this.warehouserProductData.records
            this.pagination = {
                pageNumber: this.warehouserProductData.current,
                pageSize: this.warehouserProductData.size,
                total: this.warehouserProductData.total
            }
        }
    },
    mounted () {
        this.init()
    },
    activated () {
        this.getWarahouseProductList()
    }
}
</script>

<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">归属商家：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantName" placeholder="请输入" maxlength="50" disabled></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">SKU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.skuCode" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品类目：</div>
                    <div class="query-col__input">
                        <el-cascader v-model="queryParams.categoryId" :options="categoryOptions" :props="{value: 'id', label: 'name', children: 'subCategoryList', emitPath: false}" :change-on-select="true" clearable></el-cascader>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品品牌：</div>
                    <div class="query-col__input">
                        <el-autocomplete v-model="queryParams.brandName" value-key="name" :fetch-suggestions="querySearchAsync" @select="handleSelect" @blur="handleBlur" :debounce="500" :maxlength="30"></el-autocomplete>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                    <h-button @click="onBack">返回</h-button>
                </div>
            </div>
            <div class="button-cont">
                <h-button type="create" @click="onAddProduct">添加</h-button>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :selectable="selectable" :isMultiple="true"></basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { clearCache } from '@/utils/index'
import { PRODUCT_TYPE } from '../const'
export default {
    name: 'addWarehouseProducts',
    data () {
        return {
            queryParams: {
                merchantName: '',
                merchantCode: '',
                skuCode: '',
                categoryId: '',
                brandName: '',
                brandId: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            tableLabel: [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'skuName' }
            ],
            tableData: [],
            pagination: {},
            multiSelection: [],
            productTypeOptions: PRODUCT_TYPE
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            freightProductData: state => state.hmall.warehouseManage.freightProductData,
            selectWarehouseProduct: state => state.hmall.warehouseManage.selectWarehouseProduct,
            existSpuBrands: state => state.hmall.warehouseManage.existSpuBrands,
            existSpuCategories: state => state.hmall.warehouseManage.existSpuCategories
        }),
        categoryOptions () {
            const categoryOptions = this.existSpuCategories.slice()
            return categoryOptions
        }
    },
    methods: {
        init () {
            this.findExistSpuBrands()
            this.findExistSpuCategories()
            this.queryParams.merchantName = this.$route.query.merchantName
            this.queryParams.merchantCode = this.$route.query.merchantCode
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getFreightProductList()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getFreightProductList()
        },
        onBack () {
            this.$router.push({ path: '/b2b/warehouse/createWarehouse', query: { merchantName: this.$route.query.merchantName, merchantCode: this.$route.query.merchantCode } })
            this.setNewTags((this.$route.fullPath).split('?')[0])
        },
        onAddProduct () {
            if (this.multiSelection.length <= 0) {
                this.$message.warning('请选择商品！')
            } else {
                const selectWarehouseProduct = this.selectWarehouseProduct.concat(this.multiSelection)
                this.setSelectWarehouseProduct(selectWarehouseProduct)
                this.$message.success('商品添加成功')
                this.getFreightProductList()
            }
        },
        selectable (row) {
            return !(this.selectWarehouseProduct.filter(item => item.skuId == row.skuId).length || row.exist)
        },
        // 品牌搜索建议处理
        async querySearchAsync (queryString, cb) {
            const data = !queryString ? this.existSpuBrands : this.existSpuBrands.filter(item => item.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
            cb(data)
        },
        handleSelect (item) {
            this.queryParams.brandName = item.name
            this.queryParams.brandId = item.id
        },
        handleBlur () {
            const data = this.existSpuBrands.filter(item => item.name.toLowerCase() == this.queryParams.brandName.toLowerCase())
            if (!(data.length > 0 && data[0].id === this.queryParams.brandId)) {
                this.queryParams.brandName = ''
                this.queryParams.brandId = ''
            }
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getFreightProductList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getFreightProductList()
        },
        ...mapMutations({
            setSelectWarehouseProduct: 'warehouseManage/SET_SELECT_WAREHOUSE_PRODUCT'
        }),
        ...mapActions({
            setNewTags: 'setNewTags',
            findFreightProductList: 'warehouseManage/findFreightProductList',
            findExistSpuCategories: 'warehouseManage/findExistSpuCategories',
            findExistSpuBrands: 'warehouseManage/findExistSpuBrands'
        }),
        async getFreightProductList () {
            await this.findFreightProductList(this.queryParams)
            this.tableData = this.freightProductData.records
            this.pagination = {
                pageNumber: this.freightProductData.current,
                pageSize: this.freightProductData.size,
                total: this.freightProductData.total
            }
        }
    },
    mounted () {
        this.init()
    },
    beforeRouteLeave (to, from, next) {
        if (!(to.name == 'createWarehouse')) {
            clearCache('createWarehouse')
            this.setSelectWarehouseProduct([])
        }
        next()
    }
}
</script>

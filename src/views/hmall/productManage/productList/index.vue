<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane v-for="item in productStatus" :key="item.value" :label="item.label" :name="item.value"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.name" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                    </div>
                </div>
                <template v-if="showAllConditions">
                    <div class="query-cont__col">
                        <div class="query-col__lable">SPU编码：</div>
                        <div class="query-col__input">
                            <el-input v-model="queryParams.spuCode" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                        </div>
                    </div>
                    <div class="query-cont__col" v-if="productType == 'SKU'">
                        <div class="query-col__lable">SKU编码：</div>
                        <div class="query-col__input">
                            <el-input v-model="queryParams.skuCode" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                        </div>
                    </div>
                    <div class="query-cont__col">
                        <div class="query-col__lable">商品品牌：</div>
                        <div class="query-col__input">
                            <el-autocomplete v-model="queryParams.brandName" value-key="name" :fetch-suggestions="querySearchAsyncBrand" @select="handleSelectBrand" @blur="handleBlurBrand" :debounce="500" :maxlength="30" placeholder="请输入"></el-autocomplete>
                        </div>
                    </div>
                    <div class="query-cont__col">
                        <div class="query-col__lable">商品型号：</div>
                        <div class="query-col__input">
                            <el-input v-model="queryParams.model" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                        </div>
                    </div>
                    <div class="query-cont__col">
                        <div class="query-col__lable">商品类目：</div>
                        <div class="query-col__input">
                            <el-cascader v-model="queryParams.categoryId" :options="categoryOption" :props="props" :change-on-select="true" clearable placeholder="请选择商品类目"></el-cascader>
                        </div>
                    </div>
                </template>
                <div class="query-cont__col">
                    <h-button type='primary' @click="onQuery">查询</h-button>
                    <h-button @click="onReset" v-if="showAllConditions">重置</h-button>
                    <h-button @click="onExport" v-if="showAllConditions">导出</h-button>
                    <span class="more-condition" @click="showAllConditions = false" v-if="showAllConditions">收起<i class="el-icon-arrow-up"></i></span>
                    <span class="more-condition" @click="showAllConditions = true" v-else>高级搜索<i class="el-icon-arrow-down"></i></span>
                </div>
            </div>
            <div class="button-cont">
                <template v-if="productType == 'SPU'">
                    <h-button type='create' @click="onCreateProduct">新建商品</h-button>
                    <h-button @click="onBatchEffective()" v-if="tabName == 'EFFICACY'">批量生效</h-button>
                    <h-button @click="onBatchEfficacy()" v-if="tabName == 'EFFECTIVE'">批量失效</h-button>
                    <h-button @click="onBatchDelete()" v-if="tabName == 'AUDIT' || tabName == 'REJECT'">批量删除</h-button>
                    <h-button type='assist' @click="onTabProductType('SKU')" class="margin-left__auto">切换SKU</h-button>
                </template>
                <template v-else-if="productType == 'SKU'">
                    <h-button type='assist' @click="onTabProductType('SPU')" class="margin-left__auto">切换SPU</h-button>
                </template>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" :multiSelection.sync="multiSelection" :actionMinWidth="200" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isShowCollapse="true" :isMultiple="true" :isAction="true">
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onEditProduct(scope.data.row)">编辑</h-button>
                    <template v-if="productType == 'SPU'">
                        <h-button table @click="onEffective(scope.data.row)" v-if="tabName == 'EFFICACY'">生效</h-button>
                        <h-button table @click="onEfficacy(scope.data.row)" v-if="tabName == 'EFFECTIVE'">失效</h-button>
                        <h-button table @click="onDelete(scope.data.row)" v-if="tabName == 'AUDIT' || tabName == 'REJECT'">删除</h-button>
                    </template>
                    <template v-else-if="productType == 'SKU'">
                        <h-button table @click="onEffectiveSku(scope.data.row)" v-if="tabName == 'EFFICACY'">生效</h-button>
                        <h-button table @click="onEfficacySku(scope.data.row)" v-if="tabName == 'EFFECTIVE'">失效</h-button>
                        <h-button table @click="onDeleteSku(scope.data.row)" v-if="tabName == 'AUDIT' || tabName == 'REJECT'">删除</h-button>
                    </template>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { B2bUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
import { clearCache, newCache } from '@/utils/index'
import { PRODUCT_STATUS } from '../const/index'
import { batchOperator } from '../../utils/index'
export default {
    name: 'productList',
    data () {
        return {
            productStatus: PRODUCT_STATUS,
            showAllConditions: false,
            tabName: 'EFFECTIVE',
            productType: 'SPU',
            queryParams: {
                name: '',
                spuCode: '',
                skuCode: '',
                brandName: '',
                brandId: '',
                model: '',
                categoryId: '',
                auditStatus: '',
                enabled: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            multiSelection: [],
            props: {
                emitPath: false,
                value: 'id',
                label: 'name',
                children: 'subCategoryList'
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo.principal,
            brandData: state => state.hmall.productManage.brandData,
            productSpuData: state => state.hmall.productManage.productSpuData,
            productSkuData: state => state.hmall.productManage.productSkuData
        }),
        ...mapGetters({
            categoryOption: 'productManage/categoryOption'
        }),
        tableLabel () {
            return this.productType == 'SPU' ? [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: '商品名称', prop: 'name' },
                { label: '品牌', prop: 'brandName' },
                { label: '型号', prop: 'model' },
                { label: '商品类目', prop: 'category' }
            ] : [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'name' },
                { label: '品牌', prop: 'brandName' },
                { label: '型号', prop: 'model' },
                { label: '商品类目', prop: 'category' },
                { label: '规格', prop: 'optionValues' }
            ]
        },
        tableData () {
            return this.productType == 'SPU' ? this.productSpuData.records : this.productSkuData.records
        },
        pagination () {
            return this.productType == 'SPU' ? {
                pageNumber: this.productSpuData.current,
                pageSize: this.productSpuData.size,
                total: this.productSpuData.total
            } : {
                pageNumber: this.productSkuData.current,
                pageSize: this.productSkuData.size,
                total: this.productSkuData.total
            }
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.getBrandOptions()
            this.getCategoryOptions()
            this.onQuery()
        },
        // 回车搜索
        onQueryEnter (e) {
            const keyCode = document.all ? event.keyCode : e.which
            if (keyCode === 13) {
                this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
            }
        },
        // 搜索操作
        onQuery () {
            this.queryParams.pageNumber = 1
            this.tabParams(this.tabName)
            this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
        },
        // 重置操作
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.onQuery()
        },
        onTab (value) {
            this.queryParams = { ...this.resetParams }
            this.onQuery()
        },
        // SPU or SKU 切换
        onTabProductType (productType) {
            this.queryParams = { ...this.resetParams }
            this.tabParams(this.tabName)
            if (productType == 'SPU') {
                this.getProductSpuList()
                this.productType = productType
            } else if (productType == 'SKU') {
                console.log(this.queryParams)
                this.getProductSkuList()
                this.productType = productType
            }
        },
        // 品牌搜索建议处理
        async querySearchAsyncBrand (queryString, cb) {
            const data = !queryString ? this.brandData : this.brandData.filter(item => item.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
            cb(data)
        },
        handleSelectBrand (item) {
            this.queryParams.brandName = item.name
            this.queryParams.brandId = item.id
        },
        handleBlurBrand () {
            const data = this.brandData.filter(item => item.name.toLowerCase() == this.queryParams.brandName.toLowerCase())
            if (!(data.length > 0 && data[0].id === this.queryParams.brandId)) {
                this.queryParams.brandName = ''
                this.queryParams.brandId = ''
            }
        },
        // 跳转到新增商品页面
        onCreateProduct () {
            this.$router.push('/b2b/product/createProduct')
        },
        // 跳转到修改商品页面
        onEditProduct (row) {
            if (this.productType == 'SPU') {
                if (this.tabName == 'AUDIT' || this.tabName == 'REJECT') {
                    this.$router.push({ path: '/b2b/product/createProduct', query: { id: row.id, show: 'show' } })
                } else {
                    this.$router.push({ path: '/b2b/product/createProduct', query: { id: row.id } })
                }
            } else if (this.productType == 'SKU') {
                this.$router.push({ path: '/b2b/product/createProduct', query: { id: row.mainSpuId } })
            }
        },
        // 批量生效
        async onBatchEffective () {
            const multiSelection = this.multiSelection.map(item => item.id)
            if (multiSelection.length < 1) {
                this.$message.warning('请选择！')
                return false
            } else {
                try {
                    await this.batchEffective(multiSelection)
                    this.$message.success('生效成功！')
                    this.getProductSpuList()
                } catch (error) {
                    this.getProductSpuList()
                }
            }
        },
        // 生效spu
        async onEffective (row) {
            try {
                await this.effective({ id: row.id })
                this.$message.success('生效成功！')
                this.getProductSpuList()
            } catch (error) {
                this.getProductSpuList()
            }
        },
        // 生效sku
        async onEffectiveSku (row) {
            await this.effectiveSKU({ id: row.id })
            this.$message.success('生效成功！')
            this.getProductSkuList()
        },
        // 批量失效
        async onBatchEfficacy () {
            const multiSelection = this.multiSelection.map(item => item.id)
            if (multiSelection.length < 1) {
                this.$message.warning('请选择！')
                return false
            } else {
                try {
                    await this.batchEfficacy(multiSelection)
                    this.$message.success('失效成功！')
                    this.getProductSpuList()
                } catch (error) {
                    this.getProductSpuList()
                }
            }
        },
        // 失效spu
        async onEfficacy (row) {
            try {
                await this.efficacy({ id: row.id })
                this.$message.success('失效成功！')
                this.getProductSpuList()
            } catch (error) {
                this.getProductSpuList()
            }
        },
        // 失效sku
        async onEfficacySku (row) {
            await this.efficacySKU({ id: row.id })
            this.$message.success('失效成功！')
            this.getProductSkuList()
        },
        // 批量删除
        onBatchDelete () {
            const multiSelection = this.multiSelection.map(item => item.id)
            if (multiSelection.length < 1) {
                this.$message.warning('请选择！')
                return false
            } else {
                this.$confirm('是否删除商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async () => {
                    try {
                        await this.batchDelete(multiSelection)
                        this.$message.success('商品删除成功！')
                        this.getProductSpuList()
                    } catch (error) {
                        this.getProductSpuList()
                    }
                }).catch(() => { })
            }
        },
        // 删除spu
        onDelete (row) {
            this.$confirm('是否删除商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                try {
                    await this.delete({ id: row.id })
                    this.$message.success('商品删除成功！')
                    this.getProductSpuList()
                } catch (error) {
                    this.getProductSpuList()
                }
            }).catch(() => { })
        },
        // 删除sku
        onDeleteSku (row) {
            this.$confirm('是否删除商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await this.deleteSKU({ id: row.id })
                this.$message.success('商品删除成功！')
                this.getProductSkuList()
            }).catch(() => { })
        },
        // 翻页操作
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无商品可导出！')
            } else {
                if (this.productType == 'SPU') {
                    let url = ''
                    for (let key in this.queryParams) {
                        url += (key + '=' + (this.queryParams[key] == null ? '' : this.queryParams[key]) + '&')
                    }
                    location.href = B2bUrl + 'product/boss/main-spu/export?access_token=' + localStorage.getItem('tokenB2b') + '&' + url
                } else {
                    let url = ''
                    for (let key in this.queryParams) {
                        url += (key + '=' + (this.queryParams[key] == null ? '' : this.queryParams[key]) + '&')
                    }
                    location.href = B2bUrl + 'product/boss/main-sku/export?access_token=' + localStorage.getItem('tokenB2b') + '&' + url
                }
            }
        },
        tabParams (tabName) {
            if (tabName == 'EFFECTIVE') {
                this.queryParams.auditStatus = 1
                this.queryParams.enabled = true
            } else if (tabName == 'EFFICACY') {
                this.queryParams.auditStatus = 1
                this.queryParams.enabled = false
            } else if (tabName == 'AUDIT') {
                this.queryParams.auditStatus = 0
            } else if (tabName == 'REJECT') {
                this.queryParams.auditStatus = 2
            }
        },
        ...mapActions({
            getBrandOptions: 'productManage/findBrandOptions',
            findCategoryOptions: 'productManage/findCategoryOptions',
            findProductSpuList: 'productManage/findProductSpuList',
            findProductSkuList: 'productManage/findProductSkuList',
            effective: 'productManage/effective',
            efficacy: 'productManage/efficacy',
            batchEffective: 'productManage/batchEffective',
            batchEfficacy: 'productManage/batchEfficacy',
            delete: 'productManage/delete',
            batchDelete: 'productManage/batchDelete',
            effectiveSKU: 'productManage/effectiveSKU',
            efficacySKU: 'productManage/efficacySKU',
            deleteSKU: 'productManage/deleteSKU'
        }),
        async getCategoryOptions () {
            await this.findCategoryOptions()
        },
        async getProductSpuList () {
            await this.findProductSpuList(this.queryParams)
        },
        async getProductSkuList () {
            await this.findProductSkuList(this.queryParams)
        }
    },
    mounted () {
        this.init()
    },
    activated () {
        this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
    },
    beforeRouteEnter (to, from, next) {
        newCache('productList')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (!(to.name == 'createProduct')) {
            clearCache('productList')
        }
        next()
    }
}
</script>
<style lang="scss" scoped>
// 处理input type = number的上下箭头
/deep/input::-webkit-outer-spin-button,
/deep/input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
/deep/input[type="number"] {
    -moz-appearance: textfield;
}
.more-condition {
    margin-left: 10px;
    font-size: 14px;
    color: #999;
    cursor: pointer;
}

.button-cont {
    display: flex;
}

.margin-left__auto {
    margin-left: auto;
}
.isHot {
    display: inline-block;
    position: absolute;
    top: -6px;
    right: 0px;
    font-size: 8px;
    color: $redColor !important;
    width: 30px;
}
.h-button.orangeBtn {
    width: 68px;
    padding: 5px 0;
}
.upload-cont {
    display: inline-block;
    margin-left: 10px;
    width: 68px;
}
.isGrayColor {
    cursor: default !important;
}
.icon {
    margin-left: 5px;
    font-size: 18px;
    color: $hosjoyColor;
    cursor: pointer;
}
.affix-info-list {
    padding: 20px 0;
}
.affix-list-item {
    padding: 5px;

    .list-item-left {
        float: left;
        width: 90%;
    }

    .list-item-right {
        float: right;
    }

    .list-item-icon {
        float: left;
        width: 40px;
        height: 40px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .list-item-name {
        margin-left: 10px;
        float: left;
        width: calc(100% - 60px);
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .list-item-delete {
        float: right;
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;

        &:hover {
            color: $hosjoyColor;
        }
    }

    .list-item-download {
        float: right;
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;

        &:hover {
            color: $hosjoyColor;
        }
    }

    &:hover {
        background: #f2f2f4;
    }
}
</style>

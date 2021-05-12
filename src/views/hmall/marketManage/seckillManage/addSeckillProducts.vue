<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__input">
                        <el-select v-model="productType">
                            <el-option label="SPU编号" value="SPU"></el-option>
                            <el-option label="SKU编号" value="SkU"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__input">
                        <el-input v-model="productCode" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                    <h-button @click="onBack">返回</h-button>
                </div>
            </div>
            <div class="button-cont">
                <h-button type="create" @click="onAddProduct">添加(已添加{{selectSeckillProduct.length}}个)</h-button>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :selectable="selectable" :multiSelection.sync="multiSelection" :isMultiple="true">
                <template class-name="sku" slot="skuName" slot-scope="scope">
                    <div class="sku-img"><img :src="scope.data.row.pictureUrl" alt="" /></div>
                    <div class="sku-name">{{scope.data.row.skuName}}</div>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { clearCache } from '@/utils/index'
export default {
    name: 'addSeckillProducts',
    data () {
        return {
            productType: 'SPU',
            productCode: '',
            queryParams: {
                skuCode: '',
                spuCode: '',
                saleAreaList: [],
                pageSize: 10,
                pageNumber: 1
            },
            resetParams: {},
            tableLabel: [
                { label: '商品', prop: 'skuName', width: '250' },
                { label: 'SPU编码', prop: 'spuCode' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '品牌', prop: 'brandName' },
                { label: '所属商家', prop: 'merchantName' },
                { label: '建议零售价', prop: 'retailPrice', formatters: 'moneyShow' },
                { label: '销售价', prop: 'sellPrice', formatters: 'moneyShow' },
                { label: '库存', prop: 'availableStock' }
            ],
            tableData: [],
            pagination: {},
            multiSelection: []
        }
    },
    computed: {
        ...mapState({
            seckillSaleAreaList: state => state.hmall.marketManage.seckillSaleAreaList,
            selectSeckillProduct: state => state.hmall.marketManage.selectSeckillProduct,
            seckillSkuData: state => state.hmall.marketManage.seckillSkuData
        }),
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
        }
    },
    methods: {
        init () {
            this.queryParams.saleAreaList = this.seckillSaleAreaList
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.onChangeType(this.productType)
            this.getSeckillSkuList()
        },
        onReset () {
            this.productCode = ''
            this.queryParams = { ...this.resetParams }
            this.getSeckillSkuList()
        },
        onBack () {
            if (this.$route.query.id) {
                if (this.$route.query.type) {
                    this.$router.push({ path: '/b2b/market/createSeckill', query: { id: this.$route.query.id, type: this.$route.query.type } })
                } else {
                    this.$router.push({ path: '/b2b/market/createSeckill', query: { id: this.$route.query.id } })
                }
            } else {
                this.$router.push({ path: '/b2b/market/createSeckill' })
            }
            this.setNewTags((this.$route.fullPath).split('?')[0])
        },
        onChangeType (value) {
            this.queryParams = { ...this.resetParams }
            if (value == 'SPU') {
                this.queryParams.spuCode = this.productCode
            } else {
                this.queryParams.skuCode = this.productCode
            }
        },
        onAddProduct () {
            if (this.multiSelection.length <= 0) {
                this.$message.warning('请选择商品！')
            } else {
                const selectSeckillProduct = this.selectSeckillProduct.concat(this.multiSelection.map(item => ({ skuId: item.skuId })))
                this.setSelectSeckillProduct(selectSeckillProduct)
                this.$message.success('商品添加成功')
                this.getSeckillSkuList()
            }
        },
        selectable (row) {
            return !this.selectSeckillProduct.filter(item => item.skuId == row.skuId).length
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getSeckillSkuList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getSeckillSkuList()
        },
        ...mapMutations({
            setSelectSeckillProduct: 'marketManage/SET_SELECT_SECKILL_PRODUCT'
        }),
        ...mapActions({
            setNewTags: 'setNewTags',
            findSeckillSkuList: 'marketManage/findSeckillSkuList'
        }),
        async getSeckillSkuList () {
            await this.findSeckillSkuList(this.queryParams)
            this.tableData = this.seckillSkuData.records
            this.pagination = {
                pageNumber: this.seckillSkuData.current,
                pageSize: this.seckillSkuData.size,
                total: this.seckillSkuData.total
            }
        }
    },
    async mounted () {
        this.init()
    },
    beforeRouteLeave (to, from, next) {
        if (!(to.name == 'createSeckill' || to.name == 'editPresale')) {
            clearCache('createSeckill')
            this.setSelectSeckillProduct([])
        }
        next()
    }
}
</script>
<style lang="scss" scoped>
.sku {
    &-img {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px;

        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 100%;
        }
    }

    &-name {
        margin-left: 10px;
        display: inline-block;
        width: calc(100% - 50px);
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.el-notification__group {
    /deep/ .el-notification__content {
        margin: 0 !important;
    }
}
</style>

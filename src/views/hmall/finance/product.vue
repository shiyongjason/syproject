<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">SPU编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">SKU编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.skuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">子订单编号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.childOrderNo" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单来源：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.sourceMerchantName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品所属：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.merchantName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.productName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品数量：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.quantity" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品类目：</div>
                    <div class="query-col-input">
                        <el-cascader v-model="categoryId" :options="categoryOptions" :change-on-select="true" @change="productCategoryChange" style="width: 100%"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单渠道：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.source">
                            <el-option v-for="item in orderChannelOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">支付时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startPayTime" type="date" format="yyyy-MM-dd" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endPayTime" type="date" format="yyyy-MM-dd" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.orderProductStatus">
                            <el-option v-for="item in productStatusOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="onQuery()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <button type="button" class="el-button ml20 el-button--primary" @click="onExport"><span>导出</span></button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false"  @onSortChange="onSortChange"
                :isShowIndex='true'>
                <template slot="source" slot-scope="scope">
                    {{ orderChannelMap.get(scope.data.row.source) }}
                </template>
                <template slot="childOrderStatus" slot-scope="scope">
                    {{ orderStatusMap.get(scope.data.row.childOrderStatus) }}
                </template>
                <template slot="orderProductStatus" slot-scope="scope">
                    {{ productStatusMap.get(scope.data.row.orderProductStatus) }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { ORDER_STATUS_OPTIONS, ORDER_CHANNERL_OPTIONS, SELF_SUPPORT_OPTIONS, ORDER_STATUS_MAP, ORDER_CHANNERL_MAP, PRODUCT_STATUS_OPTIONS, PRODUCT_STATUS_MAP } from './const'
import { PAY_METHOD_OPTIONS } from '@/utils/const'
import { findAllCategory } from './api/index'
import { mapActions, mapGetters } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    data () {
        return {
            orderStatusOptions: ORDER_STATUS_OPTIONS,
            paymethodOptions: PAY_METHOD_OPTIONS,
            orderChannelOptions: ORDER_CHANNERL_OPTIONS,
            selfSupportOptions: SELF_SUPPORT_OPTIONS,
            orderStatusMap: ORDER_STATUS_MAP,
            orderChannelMap: ORDER_CHANNERL_MAP,
            productStatusOptions: PRODUCT_STATUS_OPTIONS,
            productStatusMap: PRODUCT_STATUS_MAP,
            initParams: {},
            queryParams: {
                spuCode: '',
                skuCode: '',
                childOrderNo: '',
                sourceMerchantName: '',
                merchantName: '',
                productName: '',
                quantity: '',
                categoryId: '',
                childOrderStatus: '',
                source: '',
                startPayTime: '',
                endPayTime: '',
                orderProductStatus: ''
            },
            categoryId: [],
            categoryOptions: []
        }
    },
    computed: {
        ...mapGetters('finance', {
            productsInfo: 'productsInfo'
        }),
        tableData () {
            return this.productsInfo.records
        },
        paginationInfo () {
            return {
                pageNumber: this.productsInfo.current,
                pageSize: this.productsInfo.size,
                total: this.productsInfo.total
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endPayTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startPayTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        tableLabel () {
            return [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '子订单编号', prop: 'childOrderNo' },
                { label: '订单来源', prop: 'sourceMerchantName' },
                { label: '商品所属', prop: 'merchantName' },
                { label: '商品单价（元）', prop: 'price', sortable: true, formatters: 'moneyShow' },
                { label: '商品名称', prop: 'productName' },
                { label: '商品数量', prop: 'quantity' },
                { label: '折扣金额（元）', prop: 'discountAmount', formatters: 'moneyShow' },
                { label: '返利金额（元）', prop: 'rebateAmount', formatters: 'moneyShow' },
                { label: '佣金金额（元）', prop: 'commissionAmount', formatters: 'moneyShow' },
                { label: '商品类目', prop: 'category' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '订单状态', prop: 'childOrderStatus' },
                { label: '商品状态', prop: 'orderProductStatus' },
                { label: '订单渠道', prop: 'source' }
            ]
        }
    },
    mounted () {
        this.initParams = { ...this.queryParams }
        this.findProductCategoryAsync()
        this.findProductsInfo()
    },
    methods: {
        ...mapActions('finance', {
            findProductsInfo: 'findProductsInfo'
        }),
        onQuery () {
            this.findProductsInfo(this.queryParams)
        },
        onReset () {
            this.categoryId = []
            this.queryParams = { ...this.initParams }
            this.findProductsInfo()
        },
        onExport () {
            let url = ''
            for (let key in this.queryParams) {
                url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
            }
            url += 'access_token=' + sessionStorage.getItem('token')
            location.href = B2bUrl + 'order/api/boss/orders/finance-products/export?' + url
        },
        async findProductCategoryAsync () {
            const { data } = await findAllCategory()
            const productCategory = data
            let productCategoryTemp = []
            // 用递归函数从写，后面提
            productCategoryTemp = productCategory.map((value) => {
                return {
                    value: value.id,
                    label: value.name,
                    children: value.subCategoryList ? value.subCategoryList.map(value1 => {
                        return {
                            value: value1.id,
                            label: value1.name,
                            children: value1.subCategoryList ? value1.subCategoryList.map(value2 => {
                                return {
                                    value: value2.id,
                                    label: value2.name
                                }
                            }) : null
                        }
                    }) : null
                }
            })
            productCategoryTemp.splice(0, 0, {
                value: '',
                label: '全部'
            })
            this.categoryOptions = productCategoryTemp
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val[val.length - 1]
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findProductsInfo(this.queryParams)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findProductsInfo(this.queryParams)
        },
        onSortChange (val) {
            if (val.prop === 'price') {
                this.queryParams['sort.property'] = 'price'
                this.queryParams['sort.direction'] = val.order === 'descending' ? 'DESC' : 'ASC'
            }
            this.findProductsInfo(this.queryParams)
        }
    }
}
</script>
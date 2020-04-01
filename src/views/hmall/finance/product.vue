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
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">子订单编号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单来源：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品所属：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品数量：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品类目：</div>
                    <div class="query-col-input">
                        <el-cascader v-model="queryParams.categoryId" :options="categoryOptions" :change-on-select="true" @change="productCategoryChange" style="width: 100%"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.integrity">
                            <el-option v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单渠道：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.integrity">
                            <el-option v-for="item in orderChannelOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">支付时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.orderTimeStart" type="date" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.orderTimeEnd" type="date" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- :multiSelection.sync="multiSelection" -->
            <!-- ::rowKey="rowKey" -->
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false"
                :isShowIndex='true'>
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.brandNameEn}}
                </template>
                <template slot="childOrderStatus" slot-scope="scope">
                    {{ orderStatusMap.get(scope.data.row.childOrderStatus) }}
                </template>
                <!-- <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onEditSpu(scope.data.row)">编辑</el-button>
                    <el-button :type="scope.data.row.status ==1?'primary':''" size="mini" plain @click="onChangeSpu(scope.data.row)" v-text="scope.data.row.status === 1 ? '禁用' : '启用'">
                    </el-button>
                </template> -->
            </basicTable>
        </div>
    </div>
</template>

<script>
import { ORDER_STATUS_OPTIONS, ORDER_CHANNERL_OPTIONS, SELF_SUPPORT_OPTIONS, ORDER_STATUS_MAP } from './const'
import { PAY_METHOD_OPTIONS } from '@/utils/const'
import { findProductCategory } from '../shopManager/api/index'
export default {
    data () {
        return {
            orderStatusOptions: ORDER_STATUS_OPTIONS,
            paymethodOptions: PAY_METHOD_OPTIONS,
            orderChannelOptions: ORDER_CHANNERL_OPTIONS,
            selfSupportOptions: SELF_SUPPORT_OPTIONS,
            orderStatusMap: ORDER_STATUS_MAP,
            queryParams: {},
            categoryOptions: [],
            tableData: [],
            paginationInfo: {
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.orderTimeEnd
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.orderTimeStart
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
                { label: '商品所属', prop: 'branchName' },
                { label: '商品单价（元）', prop: 'branchName', sortable: true },
                { label: '商品名称', prop: 'productName' },
                { label: '商品数量', prop: 'productName' },
                { label: '折扣金额（元）', prop: 'productName' },
                { label: '返利金额（元）', prop: 'productName' },
                { label: '佣金金额（元）', prop: 'productName' },
                { label: '商品类目', prop: 'category' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '订单状态', prop: 'childOrderStatus' },
                { label: '订单渠道', prop: 'source' }
            ]
        }
    },
    mounted () {
        this.findProductCategoryAsync()
    },
    methods: {
        async findProductCategoryAsync () {
            const { data: productCategory } = await findProductCategory()
            let productCategoryTemp = []
            // 用递归函数从写，后面提
            productCategoryTemp = productCategory.map((value) => {
                return {
                    value: value.id,
                    label: value.categoryName,
                    children: value.categoryList ? value.categoryList.map(value1 => {
                        return {
                            value: value1.id,
                            label: value1.categoryName,
                            children: value1.categoryList ? value1.categoryList.map(value2 => {
                                return {
                                    value: value2.id,
                                    label: value2.categoryName
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
            this.queryParams.categoryId = val
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
        },
        onSortChange (val) {
            if (val.prop === 'createTime') {
                this.queryParams.registerTimeOrderBy = val.order === 'descending' ? 'desc' : 'asc'
            }
            this.onFindAccountList()
        }
    }
}
</script>
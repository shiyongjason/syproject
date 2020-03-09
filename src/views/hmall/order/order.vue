<template>
    <div class="order">
        <div class="page-body">
            <div class="page-body-cont">
                <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                    <el-tab-pane label="订单记录" name="first">
                        <div class="page-body-cont query-cont">
                            <div class="query-cont-col">
                                <div class="query-col-title">订单编号：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParams.orderNo" maxlength="50" placeholder="请输入订单编号"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">平台公司名称：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParams.merchantName" maxlength="50" placeholder="请输入平台公司名称"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">会员店名称：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParams.memberName" maxlength="50" placeholder="请输入会员店名称"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">订单状态：</div>
                                <div class="query-col-input">
                                    <el-select v-model="queryParams.orderStatus" :clearable=true>
                                        <!--10:待支付，20:待发货，30:待收货，40:已完成，50:已关闭-->
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="待支付" :value="10"></el-option>
                                        <el-option label="待发货" :value="20"></el-option>
                                        <el-option label="待收货" :value="30"></el-option>
                                        <el-option label="已完成" :value="40"></el-option>
                                        <el-option label="已关闭" :value="50"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">分部名称：</div>
                                <div class="query-col-input">
                                    <el-select v-model="queryParams.branchCode" placeholder="全部" :clearable=true @change="branchHandler">
                                        <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in brandsList" :key="item.organizationCode"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">活动编号：</div>
                                <div class="query-col-input">
                                    <el-input placeholder="请输入活动编号" v-model="queryParams.activityCode"></el-input>
                                </div>
                            </div>
                            <!-- 1.7V 删除 -->
                            <!--<div class="query-cont-col">-->
                            <!--<div class="query-col-title">同步至MIS状态：</div>-->
                            <!--<div class="query-col-input">-->
                            <!--<el-select-->
                            <!--v-model="queryParams.misStatus"-->
                            <!--placeholder="全部"-->
                            <!--:clearable=true-->
                            <!--&gt;-->
                            <!--&lt;!&ndash;MIS同步状态 0未同步 1同步成功 2同步失败&ndash;&gt;-->
                            <!--<el-option label="未同步" :value="0"></el-option>-->
                            <!--<el-option label="同步成功" :value="1"></el-option>-->
                            <!--<el-option label="同步失败" :value="2"></el-option>-->
                            <!--</el-select>-->
                            <!--</div>-->
                            <!--</div>-->
                            <div class="query-cont-col">
                                <div class="query-col-title">下单时间：</div>
                                <div class="query-col-input">
                                    <el-date-picker v-model="queryParams.orderTimeStart" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                                    </el-date-picker>
                                    <span class="ml10 mr10">-</span>
                                    <el-date-picker v-model="queryParams.orderTimeEnd" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                                    </el-date-picker>
                                </div>
                            </div>
                            <!--<div class="query-cont-col">-->
                            <!--<div class="query-col-title">同步mis时间：</div>-->
                            <!--<div class="query-col-input">-->
                            <!--<el-date-picker-->
                            <!--v-model="queryParams.misTimeStart"-->
                            <!--type="datetime"-->
                            <!--format="yyyy-MM-dd HH:mm:ss"-->
                            <!--placeholder="开始日期"-->
                            <!--:picker-options="pickerMisStart"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                            <!--<span class="ml10 mr10">-</span>-->
                            <!--<el-date-picker-->
                            <!--v-model="queryParams.misTimeEnd"-->
                            <!--type="datetime"-->
                            <!--format="yyyy-MM-dd HH:mm:ss"-->
                            <!--placeholder="结束日期"-->
                            <!--:picker-options="pickerMisEnd"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                            <!--</div>-->
                            <!--</div>-->
                            <div class="query-cont-col">
                                <div class="query-col-title">
                                    优惠券类型：
                                </div>
                                <div class="query-cont-input">
                                    <el-select v-model="queryParams.couponType">
                                        <el-option v-for="item in couponList" :key="item.value" :label="item.name" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">
                                    优惠券编号：
                                </div>
                                <div class="query-cont-input">
                                    <el-input placeholder="请输入优惠券编号" v-model="queryParams.couponCode"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">
                                    订单类型：
                                </div>
                                <div class="query-cont-input">
                                    <el-select v-model="queryParams.orderType">
                                        <el-option v-for="item in orderList" :key="item.value" :label="item.name" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">
                                    订单来源：
                                </div>
                                <div class="query-cont-input">
                                    <el-select v-model="queryParams.orderType">
                                        <el-option v-for="item in orderList" :key="item.value" :label="item.name" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">
                                    <el-button type="primary" class="ml20" @click="onQueryOrder">
                                        搜索
                                    </el-button>
                                    <el-button type="primary" class="ml20" @click="exportTabOrder">
                                        导出
                                    </el-button>
                                </div>
                            </div>
                        </div>
                        <div class="page-box page-table">
                            <orderTable :tableData="orderData" :paginationData="paginationOrderData" @onQuery="onQueryOrder" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></orderTable>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="收款记录" name="second">
                        <div class="page-body-cont query-cont">
                            <div class="query-cont-col">
                                <div class="query-col-title">支付流水号：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParamsReceivables.paymentNo" maxlength="50" placeholder="请输入支付流水号"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">平台公司名称：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParamsReceivables.merchantName" maxlength="50" placeholder="请输入平台公司名称"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">会员店名称：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParamsReceivables.memberName" maxlength="50" placeholder="请输入会员店名称"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">订单编号：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParamsReceivables.orderNo" maxlength="50" placeholder="请输入订单编号"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">支付方式：</div>
                                <div class="query-col-input">
                                    <el-select v-model="queryParamsReceivables.paymentMethod" placeholder="全部" :clearable=true>
                                        <!--1账期支付，2线下支付，3钱包支付-->
                                        <el-option label="全部" :value="''"></el-option>
                                        <el-option label="网银支付" :value="30"></el-option>
                                        <el-option label="快捷支付" :value="20"></el-option>
                                        <el-option label="微信支付" :value="40"></el-option>
                                        <el-option label="微信支付（小程序）" :value="42"></el-option>
                                        <el-option label="支付宝支付" :value="50"></el-option>
                                        <el-option label="账期支付" :value="1"></el-option>
                                        <el-option label="公司转账" :value="2"></el-option>
                                        <el-option label="余额支付" :value="10"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">支付时间：</div>
                                <div class="query-col-input">
                                    <el-date-picker v-model="queryParamsReceivables.paymentTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerReceivablesStart">
                                    </el-date-picker>
                                    <span class="ml10 mr10">-</span>
                                    <el-date-picker v-model="queryParamsReceivables.paymentTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerReceivablesEnd">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">
                                    <el-button type="primary" class="ml20" @click="onQueryReceivables">
                                        搜索
                                    </el-button>
                                    <el-button type="primary" class="ml20" @click="exportTabReceivables">
                                        导出
                                    </el-button>
                                </div>
                            </div>
                        </div>
                        <div class="page-box page-table">
                            <receivablesTable :tableData="receivablesData" :paginationData="paginationReceivablesData" @onQuery="onQueryReceivables" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></receivablesTable>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="商品统计" name="third">
                        <div class="page-body-cont query-cont">
                            <div class="query-cont-col">
                                <div class="query-col-title">SPU编码：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParamsProductTotal.spuCode" maxlength="50" placeholder="请输入商品SPU"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">SKU编码：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParamsProductTotal.skuCode" maxlength="50" placeholder="请输入商品SkU">
                                    </el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">分部：</div>
                                <div class="query-col-input">
                                    <el-select v-model="queryParamsProductTotal.branchCode" placeholder="全部" :clearable="true" @change="branchProductHandler">
                                        <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in brandsList" :key="item.organizationCode"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">平台公司：</div>
                                <div class="query-col-input">
                                    <el-input type="text" v-model="queryParamsProductTotal.merchantName" maxlength="50" placeholder="请输入平台公司"></el-input>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">订单状态：</div>
                                <div class="query-col-input">
                                    <el-select v-model="queryParamsProductTotal.orderStatus" :clearable=true>
                                        <!--10:待支付，20:待发货，30:待收货，40:已完成，50:已关闭-->
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="待支付" :value="10"></el-option>
                                        <el-option label="待发货" :value="20"></el-option>
                                        <el-option label="待收货" :value="30"></el-option>
                                        <el-option label="已完成" :value="40"></el-option>
                                        <el-option label="已关闭" :value="50"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">商品类目：</div>
                                <div class="query-col-input">
                                    <el-cascader v-model="queryParamsProductTotal.categoryId" :options="categoryOptions" :change-on-select="true" @change="productCategoryChange" style="width: 100%"></el-cascader>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">下单时间：</div>
                                <div class="query-col-input">
                                    <el-date-picker v-model="queryParamsProductTotal.orderTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerProductTotalStart">
                                    </el-date-picker>
                                    <span class="ml10 mr10">-</span>
                                    <el-date-picker v-model="queryParamsProductTotal.orderTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerProductTotalEnd">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">城市：</div>
                                <div class="query-col-title">
                                    <el-cascader placeholder="试试搜索： 南京" :options="options" v-model="optarr" :clearable=true :collapse-tags=true :show-all-levels="true" @change="cityChange" :props="{ multiple: true ,value:'cityId',label:'name',children:'cities'}" filterable>
                                    </el-cascader>
                                </div>
                            </div>
                            <div class="query-cont-col">
                                <el-checkbox v-model="queryParamsProductTotal.isShareGoods">只看共享商品</el-checkbox>
                            </div>
                            <div class="query-cont-col">
                                <div class="query-col-title">
                                    <el-button type="primary" class="ml20" @click="onQueryProductTotal()">
                                        搜索
                                    </el-button>
                                    <el-button type="primary" class="ml20" @click="exportTabTotal">
                                        导出
                                    </el-button>
                                </div>
                            </div>
                        </div>
                        <div class="page-box page-table">
                            <productTotalTable :tableData="productTotalData" :paginationData="paginationProductTotalData" @onQuery="onQueryProductTotal" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></productTotalTable>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import orderTable from './components/orderTable'
import receivablesTable from './components/receivablesTable'
import productTotalTable from './components/productTotalTable'
import { ORDER_TYPE, COUPON_TYPE } from './const.js'
import { mapState } from 'vuex'
import {
    findBrandsList, findOrderList,
    findReceivablesList, exportTotalList, exportTabReceivables,
    exportTabOrder, getChiness, orderPage
} from './api/index'
import { findProductCategory } from '../shopManager/api/index'

export default {
    name: 'order',
    components: {
        orderTable,
        receivablesTable,
        productTotalTable
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
        pickerMisStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.misTimeEnd
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        pickerMisEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.misTimeStart
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerReceivablesStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParamsReceivables.paymentTimeEnd
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerReceivablesEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParamsReceivables.paymentTimeStart
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerProductTotalStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParamsProductTotal.orderTimeEnd
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerProductTotalEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParamsProductTotal.orderTimeStart
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            couponList: COUPON_TYPE,
            orderList: ORDER_TYPE,
            activeName: '',
            queryParams: {
                activityCode: '',
                branchCode: '',
                branchName: '',
                couponType: '',
                couponCode: '',
                orderType: '',
                memberName: '',
                merchantName: '',
                misStatus: '',
                orderNo: '',
                orderStatus: '',
                orderTimeEnd: '',
                orderTimeStart: '',
                // misTimeStart: '',
                // misTimeEnd: '',
                current: 1,
                size: 10
            },
            queryParamsReceivables: {
                memberName: '',
                merchantName: '',
                orderNo: '',
                paymentMethod: '',
                paymentNo: '',
                paymentTimeEnd: '',
                paymentTimeStart: '',
                current: 1,
                size: 10
            },
            queryParamsProductTotal: {
                pageNumber: 1,
                pageSize: 10,
                branchCode: '',
                branchName: '',
                categoryId: [],
                memberName: '',
                merchantName: '',
                misStatus: '',
                orderStatus: '',
                orderTimeEnd: '',
                orderTimeStart: '',
                productCode: '',
                spuCode: '',
                skuCode: '',
                isShareGoods: false,
                areaIds: ''
            },
            orderData: [],
            receivablesData: [],
            productTotalData: [],
            depArr: [],
            paginationOrderData: {},
            paginationReceivablesData: {},
            paginationProductTotalData: {},
            brandsList: [],
            categoryOptions: [],
            options: [],
            optarr: ''
        }
    },
    methods: {
        async getArea () {
            const { data } = await getChiness()
            this.options = data
            this.options && this.options.map(val => {
                val.cityId = val.provinceId
            })
        },
        cityChange (val) {
            const cityarr = []
            val && val.map(item => {
                cityarr.push(item[1])
            })
            this.queryParamsProductTotal.areaIds = cityarr.join(',')
        },
        exportTab () {

        },
        branchHandler (model) {
            if (!model) {
                this.queryParams.branchName = ''
                return
            }
            try {
                this.brandsList.forEach(value => {
                    if (value.organizationCode === model) {
                        this.queryParams.branchName = value.organizationName
                        throw new Error('迭代结束')
                    }
                })
            } catch (e) { }
        },
        branchProductHandler (model) {
            if (!model) {
                this.queryParamsProductTotal.branchName = ''
                return
            }
            try {
                this.brandsList.forEach(value => {
                    if (value.organizationCode === model) {
                        this.queryParamsProductTotal.branchName = value.organizationName
                        throw new Error('迭代结束')
                    }
                })
            } catch (e) { }
        },
        handleClick () {
            localStorage.setItem('hMallOrderStatus', this.activeName)
        },
        async onQueryOrder () {
            const { ...params } = this.queryParams
            if (params.orderTimeEnd) params.orderTimeEnd = this.$root.$options.filters.formatDate(params.orderTimeEnd, 'YYYY-MM-DD HH:mm:ss')
            if (params.orderTimeStart) params.orderTimeStart = this.$root.$options.filters.formatDate(params.orderTimeStart, 'YYYY-MM-DD HH:mm:ss')
            if (params.orderStatus == 6) {
                params.orderStatus = 3
                params.orderType = 1
                params.isParentOrder = 1
                params.isSplit = 0
            }
            const { data } = await findOrderList(params)
            this.orderData = data.records
            this.paginationOrderData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
            this.orderData = this.orderData && this.orderData.map(item => {
                if (item.isSplit == 1) {
                    item.hasChildren = true
                }
                return item
            })
        },
        async onQueryReceivables () {
            const { ...params } = this.queryParamsReceivables
            const { data } = await findReceivablesList(params)
            this.receivablesData = data.records
            this.paginationReceivablesData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        async onQueryProductTotal () {
            const { ...params } = this.queryParamsProductTotal
            if (params.categoryId.length > 0) params.categoryId = params.categoryId[params.categoryId.length - 1]
            const { data } = await orderPage(params)
            this.productTotalData = data.records
            this.paginationProductTotalData = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        exportTabTotal () {
            const { ...params } = this.queryParamsProductTotal
            params.access_token = '' || sessionStorage.getItem('token')
            if (params.categoryId.length > 0) {
                params.categoryId = params.categoryId[params.categoryId.length - 1]
            } else {
                delete params.categoryId
            }

            location.href = exportTotalList(params)
        },
        exportTabOrder () {
            const { ...params } = this.queryParams
            if (params.orderTimeEnd) params.orderTimeEnd = this.$root.$options.filters.formatDate(params.orderTimeEnd, 'YYYY-MM-DD')
            if (params.orderTimeStart) params.orderTimeStart = this.$root.$options.filters.formatDate(params.orderTimeStart, 'YYYY-MM-DD')
            if (params.orderStatus == 6) {
                params.orderStatus = 3
                params.orderType = 1
                params.isParentOrder = 1
                params.isSplit = 0
            }
            params.access_token = '' || sessionStorage.getItem('token')
            location.href = exportTabOrder(params)
        },
        exportTabReceivables () {
            const { ...params } = this.queryParamsReceivables
            params.access_token = '' || sessionStorage.getItem('token')
            location.href = exportTabReceivables(params)
        },
        onSizeChange (val, source) {
            if (source === 'order') {
                this.queryParams.size = val
                this.onQueryOrder()
            } else if (source === 'receivables') {
                this.queryParamsReceivables.size = val
                this.onQueryReceivables()
            } else if (source === 'productTotal') {
                this.queryParamsProductTotal.pageSize = val
                this.onQueryProductTotal()
            }
        },
        onCurrentChange (val, source) {
            if (source === 'order') {
                this.queryParams.current = val
                this.onQueryOrder()
            } else if (source === 'receivables') {
                this.queryParamsReceivables.current = val
                this.onQueryReceivables()
            } else if (source === 'productTotal') {
                this.queryParamsProductTotal.pageNumber = val
                this.onQueryProductTotal()
            }
        },
        productCategoryChange (val) {
            this.queryParamsProductTotal.categoryId = val
        }
    },
    async mounted () {
        const { data } = await findBrandsList()
        this.brandsList = data
        let haveStorage = localStorage.getItem('hMallOrderStatus')
        if (!haveStorage || haveStorage === 'first') {
            this.activeName = 'first'
        } else if (haveStorage === 'second') {
            this.activeName = 'second'
        } else if (haveStorage === 'third') {
            this.activeName = 'third'
        }
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
        this.getArea()
    },
    watch: {
        activeName (val) {
            if (val === 'first') {
                this.onQueryOrder()
            } else if (val === 'second') {
                this.onQueryReceivables()
            } else if (val === 'third') {
                this.onQueryProductTotal()
            }
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ .el-table__expand-icon {
    position: absolute;
    top: 14px;
    right: 1px;
}
.flex-wrap-row {
    max-width: 1350px;
}
.order {
    padding: 20px;
    background: #ffffff;
}
</style>

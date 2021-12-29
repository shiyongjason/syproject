<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">SKU编码：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.skuCode" placeholder="请输入SKU编码">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">订单编号：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.childOrderNo" placeholder="请输入订单编号">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品类目：</div>
                    <div class="query-col__input">
                        <el-cascader :options="categoryOptions" :props="{ checkStrictly: true }" v-model="categoryIdArr" clearable @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品SKU名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.skuName" placeholder="请输入商品SKU名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">会员店：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.memberName" placeholder="请输入会员店">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">会员归属：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.keyManName" placeholder="请输入会员归属">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__lable">所属品牌：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入所属品牌">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">订单状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待支付" value="10"></el-option>
                            <el-option label="待发货" value="20"></el-option>
                            <el-option label="待收货" value="30"></el-option>
                            <el-option label="已完成" value="40"></el-option>
                            <el-option label="已关闭" value="50"></el-option>
                            <el-option label="退款中" value="60"></el-option>
                            <el-option label="已退款" value="70"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">订单渠道：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.source">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="app" value="1"></el-option>
                            <el-option label="微信小程序" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">支付方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.payWay">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="账期支付" value="1"></el-option>
                            <el-option label="公司转账" value="2"></el-option>
                            <el-option label="余额支付" value="10"></el-option>
                            <el-option label="快捷支付" value="20"></el-option>
                            <el-option label="快捷支付(信用卡)" value="21"></el-option>
                            <el-option label="快捷支付(借记卡)" value="22"></el-option>
                            <el-option label="网银支付" value="30"></el-option>
                            <el-option label="微信支付" value="40"></el-option>
                            <el-option label="微信支付(小程序)" value="42"></el-option>
                            <el-option label="支付宝支付" value="50"></el-option>
                            <el-option label="组合支付" value="5"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">所属商家：</div>
                    <div class="query-col__input">
                        <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入所属商家">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">下单时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endCreateTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startCreateTime')" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">支付时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startPayTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endPayTime')">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endPayTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startPayTime')" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.orderType">
                            <el-option v-for="item in orderType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">原订单单号：</div>
                    <div class="query-col-input">
                        <el-input v-model.trim="queryParams.originalOrderNo" placeholder="请输入" maxlength="20"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onSearch">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                    <h-button @click="onExport">导出</h-button>
                </div>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
            </basicTable>
        </div>
    </div>
</template>
<script>
import { transactionInfoTableLabel, CHILD_ORDER_TYPE } from './const'
import { downloadTransactionInfoList } from './api'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'transactionInfo',
    data () {
        return {
            categoryIdArr: [],
            queryParams: {
                skuCode: '',
                childOrderNo: '',
                categoryId: '',
                skuName: '',
                memberName: '',
                keyManName: '',
                brandName: '',
                childOrderStatus: '',
                originalOrderNo: '',
                orderType: 0,
                source: '',
                payWay: '',
                merchantName: '',
                startCreateTime: '',
                endCreateTime: '',
                startPayTime: '',
                endPayTime: ''
            },
            searchParams: {},
            tableLabel: transactionInfoTableLabel,
            orderType: CHILD_ORDER_TYPE
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            tableData: state => state.hmall.dataBoard.transactionInfoData,
            paginationData: state => state.hmall.dataBoard.transactionPaginationData
        }),
        ...mapGetters('category', {
            categoryOptions: 'categoryOptions'
        })
    },
    methods: {
        pickerOptionsStart (end) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams[end])
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd (start) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams[start])
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapActions('category', [
            'findAllCategory'
        ]),
        ...mapActions('dataBoard', [
            'findTransactionInfo'
        ]),
        productCategoryChange (val) {
            this.queryParams.categoryId = val[val.length - 1]
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.findTransactionInfo(this.searchParams)
        },
        onReset () {
            this.categoryIdArr = []
            this.queryParams = {
                skuCode: '',
                childOrderNo: '',
                categoryId: '',
                skuName: '',
                memberName: '',
                keyManName: '',
                brandName: '',
                childOrderStatus: '',
                originalOrderNo: '',
                orderType: 0,
                source: '',
                payWay: '',
                merchantName: '',
                startCreateTime: '',
                endCreateTime: '',
                startPayTime: '',
                endPayTime: ''
            }
            this.onSearch()
        },
        onExport () {
            downloadTransactionInfoList(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        }
    },
    mounted () {
        this.onSearch()
        this.findAllCategory()
    }
}
</script>
<style lang="scss" scoped>
</style>

<template>
    <div class="error-table">
        <table>
            <thead>
                <tr class="th">
                    <th rowspan="2" class="order-type">外部订单号 <span class="red">*</span></th>
                    <th rowspan="2" class="order-type">订单来源 <span class="red">*</span></th>
                    <th rowspan="2" class="name-type">客户姓名 <span class="red">*</span></th>
                    <th rowspan="2" class="phone-type">客户电话 <span class="red">*</span></th>
                    <th rowspan="2" class="address-type">地址 <span class="red">*</span></th>
                    <th rowspan="2" class="money-type">订单原始金额 <span class="red">*</span></th>
                    <th rowspan="2" class="money-type">订单实付金额 <span class="red">*</span></th>
                    <th rowspan="2" class="address-type">订单日期 <span class="red">*</span></th>
                    <th rowspan="2" class="remark-type">备注(买家)</th>
                    <th rowspan="2" class="remark-type">备注(卖家)</th>
                    <th colspan="4" class="product-type">订单商品信息</th>
                    <th rowspan="2" class="money-type">错误信息</th>
                </tr>
                <tr>
                    <th style="width: 100px"> 商品MDM编码 <span class="red">*</span></th>
                    <th style="width: 100px"> 商品名称 <span class="red">*</span></th>
                    <th> 商品单价 <span class="red">*</span></th>
                    <th> 商品数量 <span class="red">*</span></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="editData.length>0">
                    <template v-for="(item,idx) in editData">
                        <tr v-for="(subItem,index) in item.orderGoodsList" :key="index+ '' + idx">
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input v-model="item.orderNo" type="text" class="self-ipt" placeholder="外部订单号" maxlength="30"/>
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input v-model="item.source" type="text" class="self-ipt" placeholder="订单来源" maxlength="20"/>
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input v-model="item.customerName" type="text" class="self-ipt" placeholder="客户姓名" maxlength="10"/>
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input v-model="item.customerPhone" type="text" class="self-ipt" placeholder="客户电话" maxlength="11"/>
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input v-model="item.customerAddress" type="text" class="self-ipt" placeholder="地址" maxlength="50"/>
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input  v-model="item.originalAmount" type="text" class="self-ipt" placeholder="订单原始金额" maxlength="50"/>
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input  v-model="item.currentAmount" type="text" class="self-ipt" placeholder="订单实付金额" maxlength="50"/>
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <el-date-picker
                                    v-model="item.orderTime"
                                    class="self-ipt-short"
                                    type="datetime"
                                    :clearable="false"
                                    placeholder="订单日期">
                                </el-date-picker>
                                <!--<input v-model="item.orderTime" type="text" class="self-ipt" placeholder="订单日期" maxlength="20"/>-->
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input v-model="item.buyerRemark" type="text" class="self-ipt" placeholder="备注（买家）" maxlength="100"/>
                            </td>
                            <td v-if="index === 0" :rowspan="item.orderGoodsList.length">
                                <input v-model="item.sellerRemark" type="text" class="self-ipt" placeholder="备注（卖家）" maxlength="100"/>
                            </td>
                            <td>
                                <input v-model="subItem.goodsCode" type="text" class="self-ipt" placeholder="商品MDM编码" maxlength="20"/>
                            </td>
                            <td>
                                <input v-model="subItem.goodsName" type="text" class="self-ipt" placeholder="商品名称" maxlength="20"/>
                            </td>
                            <td>
                                <input v-model="subItem.price" type="text" class="self-ipt" placeholder="单价" maxlength="20"/>
                            </td>
                            <td>
                                <input v-model="subItem.num" type="text" class="self-ipt" placeholder="数量" maxlength="20"/>
                            </td>
                            <td  v-if="index === 0" :rowspan="item.orderGoodsList.length">{{item.errorMsg}}</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import { createChannelOrderList } from '../api/index'

export default {
    name: 'ImportOrderError',
    props: ['errorData'],
    computed: {
        editData () {
            // this.errorData.forEach(value => {
            //     value.orderTime = this.$root.$options.filters.formatterTime(value.orderTime, 'YYYY-MM-DD HH:mm:ss')
            // })
            return this.errorData
        }
    },
    methods: {
        async createChannelOrderList () {
            this.editData.forEach(value => {
                value.orderTime = this.$root.$options.filters.formatterTime(value.orderTime, 'YYYY-MM-DD HH:mm:ss').replace(/-/g, '/')
            })
            const { data } = await createChannelOrderList(this.editData)
            if (data.length > 0) {
                this.$emit('saveBackReportEdit', data)
            } else {
                this.$emit('search')
            }
        }
    }
}
</script>

<style scoped>
    .error-table {
        padding: 12px 0;
        max-height: 550px;
        overflow: hidden;
        overflow-y: scroll;
    }
    .order-type {
        width: 100px;
    }

    table {
        text-align: center;
        font-size: 13px;
        border-collapse: collapse;
        border: 1px solid #e5e5e5;
        table-layout: fixed;
    }
    th {
        text-align: center;
        border: 1px solid #e5e5e5;
        padding: 5px;
        box-sizing: border-box;
        background: #e5e5e5;
    }

    .name-type {
        width: 70px;
    }

    .phone-type {
        width: 80px;
    }

    .address-type {
        width: 140px;
    }

    .money-type {
        width: 60px;
    }

    .remark-type {
        width: 90px;
    }

    .product-type {
        width: 280px;
    }
    td {
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid #e5e5e5;
    }

    .self-ipt {
        width: 100%;
        font-size: 12px;
        box-sizing: border-box;
        padding: 4px 3px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
        outline: none;
    }
    .self-ipt-short {
        width: 100%;
    }
</style>

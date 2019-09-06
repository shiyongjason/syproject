<template>
    <div class="page-body-cont">
        <el-tabs v-model="activeName" type="card" @tab-click="onChangeTab">
            <el-tab-pane label="全部" name=""></el-tab-pane>
            <el-tab-pane label="待发货" name="1"></el-tab-pane>
            <el-tab-pane label="已发货" name="2"></el-tab-pane>
            <el-tab-pane label="已完成" name="3"></el-tab-pane>
            <el-tab-pane label="退款中" name="4"></el-tab-pane>
        </el-tabs>
        <div class="list">
            <div class="list-head">
                <ul>
                    <li>商品</li>
                    <li>单价(元) / 数量</li>
                    <li>买家 / 收货人</li>
                    <li>配送方式</li>
                    <li>实付金额(元)</li>
                    <li>订单状态</li>
                    <li>操作</li>
                </ul>
            </div>
            <div class="list-table">
                <div class="content" v-for="(item,index) in tableData" :key="index">
                    <div class="head-info">
                        <span style="padding-left:10px">订单号：{{item.orderNo}}</span>
                        <span class="more">
                            外部订单号订单号：{{item.channelOrderNo}}
                        </span>
                        <span>下单时间：{{formatTime(item.payTime)}}</span>
                        <span class="remark">
                            <font @click="onShowRemark(item, index)">备注</font>
                            <div class="remark-box" v-if="curIndex===index">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>备注信息</span>
                                        <el-button class="bhover" @click="onClose" style="float: right; padding: 3px 0" type="text">关闭</el-button>
                                    </div>
                                    <div class="text item">
                                        <el-input type="textarea" placeholder="请输入内容" v-model="remark" maxlength="256" show-word-limit rows='4'>
                                        </el-input>
                                    </div>
                                    <div class="sub">
                                        <el-button type="primary" size="mini" @click="onRemark(item)">确定</el-button>
                                    </div>
                                </el-card>
                            </div>
                        </span>
                    </div>
                    <div class="table">
                        <ul>
                            <li :class="item.orderGoodsList.length>1?'nopadding':''">
                                <div class="goods" v-for="(jtem,jndex) in item.orderGoodsList" :key="jndex">
                                    <img style="width: 80px; height: 80px" :src="jtem.goodsImg" />
                                    <div class="name">
                                        <font>{{item.shopName}}</font>
                                        <p>{{jtem.goodsName}}</p>
                                    </div>
                                    <div class="priceandnums">
                                        <p>{{jtem.goodsPrice}}</p>
                                        <p>{{jtem.goodsNum}}件</p>
                                    </div>
                                </div>
                            </li>
                            <li>{{item.userName}}</li>
                            <li>无需配送</li>
                            <li>{{parseToMoney(item.payAmount)}}</li>
                            <li>{{orderStatus(item.status)}}</li>
                            <li><el-button type="primary" size='mini' @click="onLink(item)">预约信息</el-button></li>
                        </ul>
                        <div class="bzo" v-if="item.buyerRemark">买家备注：{{item.buyerRemark}}</div>
                        <div class="bzt" v-if="item.sellerRemark">卖家备注：{{item.sellerRemark}}</div>
                        <div class="bzt" v-if="item.remark">备注：{{item.remark}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { updateOrderRemark } from '../api/index'
export default {
    name: 'orderTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            curIndex: null,
            activeName: '0',
            remark: ''
        }
    },
    methods: {
        onLink (item) {
            this.$router.push({ path: '/serviceManagement/reservation', query: { channelOrderNo: item.channelOrderNo } })
        },
        parseToMoney (money) {
            if (money) {
                const res = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                return res
            }
            return ''
        },
        orderStatus (val) {
            return val === 1 ? '待发货' : val === 2 ? '已发货' : val === 3 ? '已完成' : '待评价'
        },
        formatTime (time, type) {
            let dateType = 'YYYY-MM-DD HH:mm:ss'
            type && (dateType = type)
            return moment(time).format(dateType)
        },
        onShowRemark (item, index) {
            this.remark = item.remark
            this.curIndex = index
        },
        onClose () {
            this.curIndex = null
        },
        async onRemark (item) {
            await updateOrderRemark({
                id: item.id,
                remark: this.remark
            })
            item.remark = this.remark
            this.curIndex = null
        },
        onChangeTab () {
            this.$emit('search-event', { status: this.activeName })
        }
    },
    mounted () {}
}
</script>

<style lang='scss' scoped>
/deep/.el-tabs__header{ margin-bottom: 0}
.list-head{ overflow: hidden; background: #ccc; padding: 15px 10px;}
.list-head ul{ display: flex}
.list-head ul li{ flex:1; font-size: 14px; color: #000;text-align: center;}
.list-head ul li:nth-child(1){ flex:0 0 260px;}
.list-head ul li:nth-child(2){ flex:0 0 168px;}
.list-head ul li:nth-child(3){ flex:1;}
.list-table{ width: 100%; border-top:1px solid #ccc;margin-top: 10px; background: #fff;box-sizing: border-box;}
.remark{color: #0033FF !important; position: relative; cursor: pointer;display: block;float: right; margin-right: 55px !important;}
.appointbtn{ float:right;margin-top: -4px;}
.remark-box{ position:absolute;width: 398px;top:25px;z-index: 999;right: 0;}
.btnmore{ color: #0033FF;border:none;background:none; margin: 0;padding:0}
.head-info span{color:#B4B4B4; margin-right: 60px;font-size: 14px;}
.head-info{ padding:15px 0;border: 1px solid #DCDFE6;}
.head-info span:nth-child(1){margin-right: 20px;}
.content{ background: #fff;box-shadow:0px 3px 12px 3px rgba(45,108,238,0.08); margin-top: 10px }
.table ul{ display: flex;}
// .table ul:last-child{border-bottom:1px solid #DCDFE6;border-right:1px solid #DCDFE6;}
.table ul li{ flex:1; font-size: 14px; color: #000; border-left:1px solid #DCDFE6;text-align: center;box-sizing: border-box; padding: 10px;border-bottom:1px solid #DCDFE6; position: relative;}
.table ul li:last-child{border-right:1px solid #DCDFE6;}
.table ul li:nth-child(1){ flex:0 0 430px;  text-align: left;line-height: normal; }
.table ul li .goods{  text-align: left;display: flex;line-height: normal;}
.table ul .nopadding{padding:0}
.table ul .nopadding .goods{padding:10px}
.table ul .nopadding .goods:nth-child(1){border-bottom:1px solid #DCDFE6}
.table ul li:not(:first-child){ display: flex; align-items: center;justify-content: center;}
.name{ margin-left: 15px}
.name font{color: #0033FF; margin-top: 10px;display: block;}
.name p{color:#6B6B6B; margin-top: 30px}
.priceandnums{ position: absolute; right:20px}
.priceandnums p:nth-child(1){margin-top: 10px;display: block; text-align: right}
.priceandnums p:nth-child(2){color:#6B6B6B; margin-top: 30px; text-align: right}
.bzo{ background: #fdeeee;color:#FF0000; line-height: 38px; padding-left: 10px;border:1px solid #DCDFE6; border-top:none }
.bzt{ background: #fffaeb;color:#FF9900; line-height: 38px; padding-left: 10px;border:1px solid #DCDFE6; border-top:none }
.sub{ text-align: right; margin-top: 10px}
.bhover:hover{background: none;color: #FF7A45;border:1px solid #fff}
</style>
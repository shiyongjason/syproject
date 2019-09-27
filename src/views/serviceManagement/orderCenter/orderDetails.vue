<template>
    <div class="order-details page-body">
        <div class="page-body-cont query-cont">
            <div class="order-info">
                <p>
                    <span>订单号：</span>
                    {{query.orderNo ? query.orderNo : '-'}}
                </p>
                <p>
                    <span>外部订单号：</span>
                    {{query.channelOrderNo ? query.channelOrderNo : '-'}}
                </p>
                <p>
                    <span>下单时间：</span>
                    {{details.payTime | formatDate}}
                </p>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="order-status">
                <div class="left">
                    <div class="is-status" v-if="details.status == 1 ||  details.status ==5">
                        <p class="title">买家已付款</p>
                        <p class="title">等待商家发货</p>
                        <p class="tips">
                            买家已付款，请尽快发货，否则买家有权申请退款
                        </p>
                    </div>
                    <div class="is-status" v-if="details.status == 2">
                        <p class="title">商家已发货</p>
                        <p class="title">等待交易成功</p>
                        <p class="tips">
                            买家如在7天内没有申请退款，交易将自动完成
                        </p>
                    </div>
                    <div class="is-status" v-if="details.status == 3 ">
                        <p class="title">交易完成</p>
                        <p class="tips">
                            交易已成功，如果买家提出售后要求，请积极与买家协商，做好售后
                            服务
                        </p>
                    </div>
                    <div class="is-status" v-if="details.status == 4">
                        <p class="title">交易关闭</p>
                        <p class="tips">
                            订单已全额退款，交易自动关闭
                        </p>
                        <p class="tips">
                            订单退款金额：{{details.payment}}元
                        </p>
                    </div>
                    <p class="remark">
                        <span>备注</span>
                        <el-rate v-model="details.star" disabled="disabled"></el-rate>
                    </p>
                </div>
                <div class="right" v-if="!(details.status == 4)">
                    <el-steps :active="stepNum">
                        <el-step title="买家下单" :description="details.created | formatDate"></el-step>
                        <el-step title="买家付款" :description="details.payTime | formatDate"></el-step>
                        <el-step title="商家发货" :description="details.consignTime | formatDate"></el-step>
                        <el-step title="交易完成" :description="details.successTime | formatDate"></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="pay-message">
                <div>
                    <p class="item sub-title">
                        付款信息
                    </p>
                    <p class="item">
                        实付金额： {{details.payment}}
                    </p>
                    <p class="item">
                        付款时间： {{details.payTime | formatDate}}
                    </p>
                </div>
                <div>
                    <p class="item sub-title">
                        买家信息
                    </p>
                    <p class="item">
                        买家： {{details.buyerName}}
                    </p>
                    <p class="item">
                        买家留言： {{details.buyerRemark ? details.buyerRemark : '-'}}
                    </p>
                </div>
                <div>
                    <p class="item sub-title">
                        收货人信息
                    </p>
                    <p class="item">
                        收货人： {{details.receiverName}}
                    </p>
                    <p class="item">
                        手机号： {{details.receiverTel}}
                    </p>
                    <p class="item">
                        收货地址： {{details.deliveryAddress}}
                    </p>
                </div>
            </div>
            <div class="product-message">
                <table>
                    <tr>
                        <th>商品信息</th>
                        <th>单价（元）</th>
                        <th>数量</th>
                        <th>小计（元）</th>
                        <th>发货状态</th>
                    </tr>
                    <tr v-for="(item,index) in details.respOrderGoodsYouZanList" :key="item.goodsName + index">
                        <td>
                            <div class="info">
                                <p>
                                    <img :src="item.goodsImg" alt="头像" width="100px" class="face">
                                </p>
                                <p>
                                    <span class="name">{{item.goodsName}}</span>
                                    <span class="grade" v-if="JSON.parse(item.skuPropertiesName).name"> 会员： {{JSON.parse(item.skuPropertiesName).name}}</span>
                                </p>
                            </div>
                        </td>
                        <td>
                            {{item.goodsPrice}}
                        </td>
                        <td>{{item.goodsNum}}</td>
                        <td>
                            {{item.totalFee}}
                        </td>
                        <td>
                            <template v-if="item.expressStatusList.indexOf(0)> -1">待发货</template>
                            <template v-if="item.expressStatusList.indexOf(1)> -1">已发货</template>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5" class="foot">
                            订单金额： <span>{{details.payment}}</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="btn-group">
                <el-button type="primary" @click="goBack">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { findYouZanOrderDetails } from './api/index'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'orderDetails',
    computed: {
        stepNum () {
            if (this.query.status - 0 + 1 === 4) {
                return 0
            }
            return this.query.status - 0 + 1
        },
        ...mapState({
            tagsList: state => state.layout.tagsList
        })
    },
    data () {
        return {
            query: {},
            details: {}
        }
    },
    methods: {
        goBack () {
            history.go(-1)
            this.closeTags()
        },
        async findYouZanOrderDetails (params) {
            const { data } = await findYouZanOrderDetails(params)
            this.details = data
        },
        ...mapMutations({
            tagUpdate: 'TAG_UPDATE'
        }),
        closeTags () {
            this.tagsList.some((item, index) => {
                if (item.path === (this.$route.fullPath).split('?')[0]) {
                    this.tagsList.splice(index, 1)
                    return true
                }
            })
            this.tagUpdate(this.tagsList)
        }
    },
    mounted () {
        this.query = this.$route.query
        this.findYouZanOrderDetails(this.query.channelOrderNo)
    }
}
</script>

<style scoped lang="scss">
.order-info{
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #666666;
    max-width: 1200px;
    font-size: 14px;
}
    .order-status{
        display: flex;
        margin-bottom: 20px;
        max-width: 1000px;
        justify-content: space-between;
        .left {
            line-height: 30px;
            .title {
                font-weight: bold;
                font-size: 16px;
            }
            .tips{
                font-size: 14px;
                color: #333333;
                span{
                    color: red;
                }
            }
            .remark{
                color: #333333;
            }
        }
        .right {
            width: 55%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    .pay-message {
        display: flex;
        margin-bottom: 20px;
        max-width: 1000px;
        justify-content: space-between;
        line-height: 30px;
        div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
    .product-message {
        max-width: 1000px;
        th:first-child,td:first-child{
            width: 30%;
        }
        th,td{
            width: 17.5%;
            text-align: center;
            padding: 12px 10px;
            line-height: 16px;
        }
        th{
            color: #333333;
        }
        td{
            color: #666666;
        }
        tr:last-child td{
            width: 100%;
        }

        .info {
            width: 300px;
            display: flex;
            p:last-child {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                text-align: left;
            }
        }
        .foot{
            text-align: right;
            width: 100%;
            span {
                color: red;
            }
        }
    }
    .btn-group{
        max-width: 1000px;
        text-align: center;
    }
    .is-status {
        padding: 12px 0;
    }
    .face {
        margin-right: 10px;
    }
    /deep/.el-step__title.is-process{
        color: #999999;
    }
    /deep/.el-step__description.is-process{
        color: #999999;
    }
    /deep/.el-step__head.is-finish .el-step__icon.is-text{
        background: #FF7A45;
        color: #ffffff;
    }
    /deep/.el-step__head.is-process .el-step__icon.is-text{
        background: #ffffff;
        color: #FF7A45;
    }
    /deep/.el-step__head.is-process .el-step__icon-inner{
        color:  #FF7A45;
    }
</style>

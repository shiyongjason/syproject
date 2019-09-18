<template>
    <div class="order-details page-body">
        <div class="page-body-cont query-cont">
            <div class="order-info">
                <p>
                    <span>订单号：</span>
                    E2019dajkfjkdasjkfdkhjasdjkafj
                </p>
                <p>
                    <span>外部订单号：</span>
                    E2019dajkfjkdasjkfdkhjasdjkafj
                </p>
                <p>
                    <span>下单时间：</span>
                    E2019dajkfjkdasjkfdkhjasdjkafj
                </p>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="order-status">
                <div class="left">
                    <p class="title">商家已发货，等待</p>
                    <p class="title">交易成功</p>
                    <p class="tips">
                        买家如在<span>7天内</span>没有申请退款，交易将自动完成。
                    </p>
                    <p class="remark">
                        <span>备注</span>
                    </p>
                </div>
                <div class="right">
                    <el-steps :active="2">
                        <el-step title="买家下单" :description="new Date() | formatDate"></el-step>
                        <el-step title="买家付款" :description="new Date() | formatDate"></el-step>
                        <el-step title="商家发货" :description="new Date() | formatDate"></el-step>
                        <el-step title="交易完成" :description="new Date() | formatDate"></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="pay-message">
                <div>
                    <p class="item sub-title">
                        付款信息
                    </p>
                    <p class="item">
                        实付金额： 199.00
                    </p>
                    <p class="item">
                        付款时间： 2019-08-29 10：11：56
                    </p>
                </div>
                <div>
                    <p class="item sub-title">
                        买家信息
                    </p>
                    <p class="item">
                        买家： 199.00
                    </p>
                    <p class="item">
                        买家留言： ---
                    </p>
                </div>
                <div>
                    <p class="item sub-title">
                        收货人信息
                    </p>
                    <p class="item">
                        收货人： 徐生亮
                    </p>
                    <p class="item">
                        手机号： 13505152221
                    </p>
                    <p class="item">
                        收货地址： 南京市玄武区
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
                    <tr>
                        <td>
                            <div class="info">
                                <p>
                                    <img src="../../../assets/images/home_bg@2x.png" alt="头像" width="100px">
                                </p>
                                <p>
                                    <span class="name">程工管家number-one</span>
                                    <span class="grade">最强王者</span>
                                </p>
                            </div>
                        </td>
                        <td>
                            199.00
                        </td>
                        <td>1件</td>
                        <td>
                            199.00
                        </td>
                        <td>以发货</td>
                    </tr>
                    <tr>
                        <td colspan="5" class="foot">
                            订单金额： <span>199.00</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="btn-group">
                <el-button type="primary" @click="history.go(-1)">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderDetails'
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
</style>

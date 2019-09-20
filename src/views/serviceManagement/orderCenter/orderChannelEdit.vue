<template>
    <div class="order-channel-edit page-body">
        <div class="page-body-cont">
            <div class="title">渠道订单详情</div>
            <table>
                <tr>
                    <td>顾客姓名</td>
                    <td>{{details.channelUserName}}</td>
                </tr>
                <tr>
                    <td>电话</td>
                    <td>{{details.mobile}}</td>
                </tr>
                <tr>
                    <td>地址</td>
                    <td>{{details.address}}</td>
                </tr>
                <tr>
                    <td>商品名称</td>
                    <td>{{details.goodsName}}</td>
                </tr>
                <tr>
                    <td>数量</td>
                    <td>{{details.goodsNum}}</td>
                </tr>
                <tr>
                    <td>可用次数</td>
                    <td>{{details.goodsNum}}</td>
                </tr>
                <tr>
                    <td>金额</td>
                    <td>{{details.payAmount}}</td>
                </tr>
                <tr>
                    <td>订单日期</td>
                    <td>{{details.payTime | formatDate}}</td>
                </tr>
                <tr>
                    <td>备注</td>
                    <td>{{details.sellerRemark}}</td>
                </tr>
                <tr>
                    <td>订单号</td>
                    <td>{{details.id}}</td>
                </tr>
                <tr>
                    <td>订单来源</td>
                    <td>
                        <template v-if="details.source === 1">有赞</template>
                        <template v-if="details.source === 2">孩子王</template>
                        <template v-if="details.source === 3">考拉买菜</template>
                    </td>
                </tr>
                <tr>
                    <td>复购订单</td>
                    <td>{{details.isRepurchaseOrder ? '是' : '否'}}</td>
                </tr>
                <tr>
                    <td>订单状态</td>
                    <td>
                        <template v-if="details.status === 1">待发货</template>
                        <template v-if="details.status === 2">已发货</template>
                        <template v-if="details.status === 3">已完成</template>
                        <template v-if="details.status === 4">已退款</template>
                        <template v-if="details.status === 5">已下单</template>
                        <template v-if="details.status === 6">已收货</template>
                        <template v-if="details.status === 7">已预约</template>
                        <template v-if="details.status === 7">已派工</template>
                    </td>
                </tr>
                <tr>
                    <td>服务类型</td>
                    <td>
                        <template v-if="details.status === 1">实物商品</template>
                        <template v-if="details.status === 2">管家服务</template>
                        <template v-if="details.status === 3">甲醛检测</template>
                        <template v-if="details.status === 4">螨虫检测</template>
                        <template v-if="details.status === 5">第三方服务</template>
                    </td>
                </tr>
                <tr>
                    <td>线下服务管家</td>
                    <td>{{details.offlineHousekeeper}}</td>
                </tr>
                <tr>
                    <td>是否添加微信</td>
                    <td>{{details.isAddWechat}}</td>
                </tr>
                <tr>
                    <td>线上管家</td>
                    <td>{{details.onlineHousekeeper}}</td>
                </tr>
                <tr>
                    <td>服务评价</td>
                    <td>{{details.content}}</td>
                </tr>
                <tr>
                    <td>是否转化</td>
                    <td>{{details.isConversion ? '是' : '否'}}</td>
                </tr>
                <tr>
                    <td>转化订单号</td>
                    <td>{{details.conversionOrderNo}}</td>
                </tr>
                <tr>
                    <td>创建人</td>
                    <td>{{details.createBy}}</td>
                </tr>
                <tr>
                    <td>创建时间</td>
                    <td>{{details.createTime | formatDate}}</td>
                </tr>
                <tr>
                    <td>修改人</td>
                    <td>{{details.updateBy}}</td>
                </tr>
                <tr>
                    <td>修改时间</td>
                    <td>{{details.updateTime | formatDate}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderChannelEdit',
    data () {
        return {
            details: {}
        }
    }
}
</script>

<style scoped>
    .title{
        padding: 12px 0 18px 0;
        font-weight: bold;
        font-size: 16px;
    }
    table{
        border-collapse: collapse;
    }
    td{
        width: 200px;
        border: 1px solid #999999;
        padding: 8px 12px;
    }
</style>

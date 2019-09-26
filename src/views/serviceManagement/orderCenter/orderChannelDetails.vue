<template>
    <div class="order-channel-detail page-body">
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
                    <td>{{isNullAddSymbol(details.sellerRemark)}}</td>
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
                        <template v-if="details.status === 8">已派工</template>
                    </td>
                </tr>
                <tr>
                    <td>服务类型</td>
                    <td>
                        <template v-if="details.serviceType === 1">实物商品</template>
                        <template v-if="details.serviceType === 2">管家服务</template>
                        <template v-if="details.serviceType === 3">甲醛检测</template>
                        <template v-if="details.serviceType === 4">螨虫检测</template>
                        <template v-if="details.serviceType === 5">第三方服务</template>
                    </td>
                </tr>
                <tr>
                    <td>线下服务管家</td>
                    <td>{{isNullAddSymbol(details.offlineHousekeeper)}}</td>
                </tr>
                <tr>
                    <td>是否添加微信</td>
                    <td>{{isNullAddSymbol(details.isAddWechat)}}</td>
                </tr>
                <tr>
                    <td>线上管家</td>
                    <td>{{isNullAddSymbol(details.onlineHousekeeper)}}</td>
                </tr>
                <tr>
                    <td>服务评价</td>
                    <td>{{isNullAddSymbol(details.content)}}</td>
                </tr>
                <tr>
                    <td>是否转化</td>
                    <td>{{details.isConversion ? '是' : '否'}}</td>
                </tr>
                <tr>
                    <td>转化订单号</td>
                    <td>{{isNullAddSymbol(details.conversionOrderNo)}}</td>
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
            <div class="btn-group">
                <el-button type="primary" @click="goBack">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { findChannelOrderDetails } from './api/index'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'orderChannelDetails',
    computed: {
        ...mapState({
            tagsList: state => state.layout.tagsList
        })
    },
    data () {
        return {
            details: {},
            channelId: ''
        }
    },
    mounted () {
        const temp = this.$route.query.id
        if (temp) {
            this.channelId = temp
        }
        this.findChannelOrderDetails()
    },
    methods: {
        goBack () {
            history.go(-1)
            this.closeTags()
        },
        async findChannelOrderDetails () {
            const { data } = await findChannelOrderDetails(this.channelId)
            this.details = data
        },
        isNullAddSymbol (val) {
            return val || '-'
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
    .btn-group{
        padding: 20px 12px;
        max-width: 800px;
        text-align: center;
    }
</style>

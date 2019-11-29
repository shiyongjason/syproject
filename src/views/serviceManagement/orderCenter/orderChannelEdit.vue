<template>
    <div class="order-channel-edit page-body">
        <div class="page-body-cont query-cont">
            <div class="title">详情页面</div>
            <div class="query-cont-col">
                <div class="query-col-title">订单来源：</div>
                <div class="query-col-input">
                    <template v-if="details.source === '1'">有赞</template>
                    <template v-if="details.source === '2'">孩子王</template>
                    <template v-if="details.source === '3'">考拉买菜</template>
                    <template v-if="details.source === '4'">大众点评</template>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">订单商品金额：</div>
                <div class="flex-wrap-cont">
                    {{details.orderAmount}}元
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">订单日期：</div>
                <div class="flex-wrap-cont">
                    {{details.orderTime  | formatDate('YYYY-MM-DD HH:mm:ss')}}
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">备注（买家）：</div>
                <div class="flex-wrap-cont">
                    {{details.buyerRemark}}
                </div>
            </div>
            <br/>
            <div class="query-cont-col">
                <div class="query-col-title">备注（卖家）：</div>
                <div class="query-col-input">
                    {{details.sellerRemark}}
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">客户姓名：</div>
                <div class="query-col-input">
                    {{details.customerName}}
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">客户电话：</div>
                <div class="flex-wrap-cont">
                    {{details.customerPhone}}
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">地址：</div>
                <div class="flex-wrap-cont">
                    {{details.customerAddress}}
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <table>
                <tr>
                    <th>商品MDM编码</th>
                    <th>商品名称</th>
                    <th>商品单价</th>
                    <th>商品数量</th>
                </tr>
                <tr v-for="item in details.orderGoodsList" :key="item.goodsCode">
                    <td><input v-model="item.goodsCode" class="goods-mdm" type="text" placeholder="商品MDM编码"></td>
                    <td>{{item.goodsName}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.num}}</td>
                </tr>
            </table>
            <div class="btn-group">
                <el-button type="primary" @click="updateChannelOrderDetails">保存</el-button>
                <el-button type="primary" @click="goBack">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { findChannelOrderDetails, updateChannelOrderDetails } from './api/index'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'orderChannelEdit',
    computed: {
        ...mapState({
            tagsList: state => state.layout.tagsList
        })
    },
    data () {
        return {
            details: {}
        }
    },
    methods: {
        goBack () {
            history.go(-1)
            this.closeTags()
        },
        async findChannelOrderDetails () {
            const { data } = await findChannelOrderDetails(this.channelId)
            for (let key in data) {
                if (data[key] === null) {
                    data[key] = ''
                }
            }
            this.details = data
        },
        async updateChannelOrderDetails () {
            for (let i = 0; i < this.details.orderGoodsList.length; i++) {
                if (this.details.orderGoodsList[i].goodsCode.length < 1) {
                    this.$message({
                        type: 'error',
                        message: '表格第' + (i + 1) + '行MDM编码不能为空！'
                    })
                    return
                }
            }
            await updateChannelOrderDetails(this.channelId, this.details)
            this.$alert('更新成功，跳转到上一页', '提示', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                    this.closeTags()
                    this.goBack()
                }
            })
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
        const temp = this.$route.query.id
        if (temp) {
            this.channelId = temp
        }
        this.findChannelOrderDetails()
    }
}
</script>

<style scoped lang="scss">
    .title {
        padding: 12px 0 18px 0;
        font-weight: bold;
        font-size: 16px;
    }
    .query-cont-col {
        width: 220px;
    }
    .flex-wrap-title{
        white-space:nowrap;
    }
    table {
        border-collapse: collapse;
    }

    th {
        font-size: 12px;
        color: #000000;
        background: #f2f2f4;
        text-align: center;
        padding: 8px 12px;
        font-weight: 400;
        border: 1px solid #EBEEF5;
    }

    td {
        width: 200px;
        border: 1px solid #EBEEF5;
        padding: 8px 12px;
        font-size: 12px;
        text-align: center;
    }

    .btn-group {
        padding: 20px 12px;
        max-width: 800px;
        text-align: center;
    }
    .goods-mdm {
        line-height: 100%;
        text-align: center;
        width: 100%;
        outline: none;
        padding: 5px 0;
    }
</style>

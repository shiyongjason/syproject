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
                    <td>
                        <el-input v-model="details.address" placeholder="请输入地址"></el-input>
                    </td>
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
                    <td>
                        <el-input v-model="details.goodsNum" placeholder="请输入地址"></el-input>
                    </td>
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
                    <td>
                        <el-input v-model="details.sellerRemark" placeholder="请输入备注"></el-input>
                    </td>
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
                    <td>
                        <el-select v-model="details.isRepurchaseOrder" placeholder="请选择">
                            <el-option label="空" value=""></el-option>
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>订单状态</td>
                    <td>
                        <el-select v-model="details.status" placeholder="请选择">
                            <el-option label="待发货" :value="1"></el-option>
                            <el-option label="已发货" :value="2"></el-option>
                            <el-option label="已完成" :value="3"></el-option>
                            <el-option label="已退款" :value="4"></el-option>
                            <el-option label="已下单" :value="5"></el-option>
                            <el-option label="已收货" :value="6"></el-option>
                            <el-option label="已预约" :value="7"></el-option>
                            <el-option label="已派工" :value="8"></el-option>
                        </el-select>
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
                    <td>
                        <el-select v-model="details.offlineHousekeeper" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="陈晓健" value="陈晓健"></el-option>
                            <el-option label="董志祺" value="董志祺"></el-option>
                            <el-option label="顾莹" value="顾莹"></el-option>
                            <el-option label="李大东" value="李大东"></el-option>
                            <el-option label="施超" value="施超"></el-option>
                            <el-option label="王力博" value="王力博"></el-option>
                            <el-option label="薛晓军" value="薛晓军"></el-option>
                            <el-option label="张星" value="张星"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>是否添加微信</td>
                    <td>
                        <el-select v-model="details.isAddWechat" placeholder="请选择">
                            <el-option label="空" value=""></el-option>
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>线上管家</td>
                    <td>
                        <el-select v-model="details.onlineHousekeeper" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="胡锐" value="胡锐"></el-option>
                            <el-option label="项钰" value="项钰"></el-option>
                            <el-option label="小助手" value="小助手"></el-option>
                            <el-option label="张可" value="张可"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>服务评价</td>
                    <td>
                        <el-select v-model="details.isAddWechat" placeholder="请选择">
                            <el-option label="空" value=""></el-option>
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                        {{details.content}}
                    </td>
                </tr>
                <tr>
                    <td>是否转化</td>
                    <td>{{details.isConversion ? '是' : '否'}}</td>
                </tr>
                <tr>
                    <td>转化订单号</td>
                    <td>
                        <el-input v-model="details.conversionOrderNo" placeholder="请输入地址" maxlength="50"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>创建人</td>
                    <td>
                        <el-input v-model="details.createBy" placeholder="请输入创建人" maxlength="50"></el-input>
                    </td>
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
                <el-button type="primary" @click="updateChannelOrderDetails">保存</el-button>
                <el-button type="primary" @click="goBack">返回</el-button>
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
            // 只有一个校验 就未用el-form 校验
            if (this.details.address.length < 1) {
                this.$message({
                    type: 'error',
                    message: '地址不能为空！'
                })
                return
            }
            await updateChannelOrderDetails(this.channelId, this.details)
            this.$alert('更新成功，跳转到上一页', '提示', {
                confirmButtonText: '确定',
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
        button {
            margin-left: 20px;
        }
    }
</style>

<template>
    <div class="page-body-cont">
        <el-tabs v-model="activeName" type="card" @tab-click="onChangeTab">
            <el-tab-pane label="全部" name=""></el-tab-pane>
            <el-tab-pane label="待发货" name="1"></el-tab-pane>
            <el-tab-pane label="已发货" name="2"></el-tab-pane>
            <el-tab-pane label="待预约" name="5"></el-tab-pane>
            <el-tab-pane label="已完成" name="3"></el-tab-pane>
            <el-tab-pane label="退款中" name="4"></el-tab-pane>
        </el-tabs>
        <div class="list">
            <div class="list-head">
                <ul>
                    <li>商品</li>
                    <li>单价(元) / 数量</li>
                    <li>渠道名称</li>
                    <li>买家 / 收货人</li>
                    <li>配送方式</li>
                    <li>实付金额(元)</li>
                    <li>订单状态</li>
                    <li>操作</li>
                </ul>
            </div>
            <div class="empty" v-if="tableData.length < 1">
                暂无数据
            </div>
            <div class="list-table">
                <div class="content" v-for="(item,index) in tableData" :key="index">
                    <div class="head-info">
                        <span style="padding-left:10px">订单号：{{item.orderNo}}</span>
                        <span class="more">
                            外部订单号：{{item.channelOrderNo}}
                        </span>
                        <span>下单时间：{{formatTime(item.payTime)}}</span>
                        <span>创建时间：{{formatTime(item.createTime)}}</span>
                        <span>mis关联id：{{item.id}}</span>
                        <span class="remark">
                            <font @click="onShowRemark(item, index)">备注</font>
                            <font v-if="hosAuthCheck(youZanDetailsAuth) || hosAuthCheck(channelDetailsAuth)" @click="onShowDetail(item, index)" style="margin-left: 20px">详情</font>
                            <font @click="openMisError(item.syncErrMsg)" v-if="item.syncStatus === 1" style="margin-left: 20px">失败原因</font>
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
                                        <!-- <font>{{item.shopName}}</font> -->
                                        <p>{{jtem.goodsName}}</p>
                                    </div>
                                    <div class="priceandnums">
                                        <p>{{jtem.goodsPrice}}</p>
                                        <p>{{jtem.goodsNum}}件</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span v-for="iItem in channelType" :key="iItem.code">
                                    <template v-if="item.source === iItem.code">{{iItem.name}}</template>
                                </span>
                            </li>
                            <li>
                                {{item.userName ? item.userName : '-'}}
                                <br>
                                {{item.receiverName ? item.receiverName : '-'}}
                            </li>
                            <li>无需配送</li>
                            <li>{{parseToMoney(item.currentAmount)}}</li>
                            <li>{{orderStatus(item.status)}}</li>
                            <li>
                                <div v-if="item.status !== 4">
                                    <div class="one-line">
                                        <el-button type="primary" size='mini' @click="onLink(item)">工单信息</el-button>
                                    </div>
                                    <div v-if="item.source !== 1 && hosAuthCheck(channelEditAuth)" class="one-line">
                                        <el-button type="primary" size='mini' @click="onEdit(item)">编辑</el-button>
                                    </div>
                                    <div class="one-line">
                                        <el-button type="primary" size='mini' @click="addOrder(item)">新增工单</el-button>
                                    </div>
                                    <div v-if="item.syncStatus === 1" class="one-line">
                                        <el-button type="primary" size='mini' @click="openMisDialog(item)">同步失败</el-button>
                                    </div>
                                    <div class="one-line">
                                        <el-button type="primary" size='mini' @click="goUserPower(item)">查看权益</el-button>
                                    </div>
                                    <div v-if="item.source !== 1" class="one-line">
                                        <el-button type="primary" size='mini' @click="closeOrder(item.channelOrderNo)">取消订单</el-button>
                                    </div>
                                </div>
                                <div v-else> - </div>
                            </li>
                        </ul>
                        <div class="bzo" v-if="item.buyerRemark">买家备注：{{item.buyerRemark}}</div>
                        <div class="bzt" v-if="item.sellerRemark">卖家备注：{{item.sellerRemark}}</div>
                        <div class="bzt" v-if="item.remark">备注：{{item.remark}}</div>
                    </div>
                </div>
            </div>
        </div>
        <workOrder ref='workOrder' :isNormal="true" @clickHandle='clickHandle' :title='title' :form='form' :houseKeeperData='houseKeeperData' :dialog='dialog' @onDialog='dialog = false' />
    </div>
</template>

<script>
import moment from 'moment'
import { AUTH_SERVICE_YOUZAN_DETAILS, AUTH_SERVICE_CHANNEL_DETAILS, AUTH_SERVICE_CHANNEL_EDIT } from '@/utils/auth_const'
import { updateOrderRemark, findServiceManagementList, updateMisSync, updateMisSyncManual, updateOrderStatus, createWorkOrder } from '../api/index'
import { getAggregate } from '../../userPower/api/index'
import { mapState } from 'vuex'
import workOrder from '../../components/workOrder'
export default {
    name: 'orderTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        channelType: {
            type: Array,
            required: false,
            default () {
                return []
            }
        }
    },
    components: {
        workOrder
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            curIndex: null,
            activeName: '0',
            remark: '',
            youZanDetailsAuth: AUTH_SERVICE_YOUZAN_DETAILS,
            channelDetailsAuth: AUTH_SERVICE_CHANNEL_DETAILS,
            channelEditAuth: AUTH_SERVICE_CHANNEL_EDIT,
            dialog: false,
            form: {
                reserveBeginTime: '',
                reserveEndTime: '',
                AloneData: '',
                AloneDataTimeStart: '',
                AloneDataTimeEnd: ''
            },
            orderFormRules: {},
            orderForm: {
                phone: ''
            },
            houseKeeperData: [],
            title: '新增工单'
        }
    },
    methods: {
        goUserPower (row) {
            this.$router.push({
                path: '/serviceManagement/userPower',
                query: {
                    mobile: row.receiverMobile ? row.receiverMobile : '',
                    source: row.source ? row.source : '',
                    orderNo: row.orderNo ? row.orderNo : ''
                }
            })
        },
        async closeOrder (channelOrderNo) {
            await updateOrderStatus(channelOrderNo)
            this.$message.success('取消成功')
            this.$emit('search')
        },
        async findServiceManagementList () {
            const { data } = await findServiceManagementList({ pageSize: 1000, pageNumber: 1, role: 1 }) // 管家人少，查出所有管家
            this.houseKeeperData = data.records
        },
        async addOrder (row) {
            const params = {
                mobile: row.receiverMobile,
                channelType: row.source
            }
            const { data } = await getAggregate(params)
            this.findServiceManagementList()
            this.form = {
                channelType: row.source,
                orderId: row.id,
                orderNo: row.orderNo,
                customerName: row.receiverName,
                customerMobile: row.receiverMobile,
                customerAddress: row.receiverAddress,
                status: 2,
                buyerRemark: row.buyerRemark,
                sellerRemark: row.sellerRemark,
                AloneData: '',
                AloneDataTimeStart: '',
                AloneDataTimeEnd: '',
                reserveMode: 2,
                serviceResourceArr: data
            }
            this.dialog = true
            this.$refs.workOrder.clearValidate()
        },
        onLink (item) {
            this.$router.push({ path: '/serviceManagement/workOrder', query: { orderNo: item.orderNo } })
        },
        onEdit (item) {
            this.$router.push({ path: '/serviceManagement/orderChannelEdit', query: { id: item.id } })
        },
        parseToMoney (money) {
            return money ? money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
        },
        orderStatus (val) {
            let temp = ''
            switch (val) {
                case 1:
                    temp = '待发货'
                    break
                case 2:
                    temp = '已发货'
                    break
                case 3:
                    temp = '已完成'
                    break
                case 4:
                    temp = '已退款'
                    break
                case 5:
                    temp = '已下单'
                    break
                case 6:
                    temp = '已收货'
                    break
                case 7:
                    temp = '已预约'
                    break
                case 8:
                    temp = '已派工'
                    break
                default:
            }
            // return val === 1 ? '待发货' : val === 2 ? '已发货' : val === 3 ? '已完成' : '待评价'
            return temp
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
        onShowDetail (item) {
            if (item.source === 1) {
                this.$router.push({
                    path: '/serviceManagement/orderDetails',
                    query: {
                        orderNo: item.orderId,
                        channelOrderNo: item.channelOrderNo,
                        status: item.status
                    }
                })
            } else {
                this.$router.push({
                    path: '/serviceManagement/orderChannelDetails',
                    query: { id: item.id }
                })
            }
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
            this.$emit('search-event', { status: this.activeName < 1 ? '' : this.activeName })
        },
        async updateMisSync (orderId) {
            const { data } = await updateMisSync(orderId)
            return data
        },
        async updateMisSyncManual (params) {
            await updateMisSyncManual(params)
        },
        openMisError (syncErrMsg) {
            this.$confirm(syncErrMsg, '同步mis系统失败原因', {
                showConfirmButton: false,
                closeOnClickModal: false,
                cancelButtonText: '关闭'
            })
        },
        openMisDialog (row) {
            this.$confirm('原因：' + row.syncErrMsg, '同步mis系统失败', {
                closeOnClickModal: false,
                distinguishCancelAndClose: true,
                confirmButtonText: '重新同步',
                cancelButtonText: '关闭问题'
            }).then(async () => {
                try {
                    const data = await this.updateMisSync(row.id)
                    if (data) {
                        this.$message({
                            type: 'success',
                            message: '同步数据成功!'
                        })
                        this.$emit('search')
                    } else {
                        this.$message({
                            type: 'error',
                            message: '同步数据失败!'
                        })
                        this.$emit('search')
                    }
                } catch (e) { }
            }).catch(async (action) => {
                if (action === 'cancel') {
                    await this.updateMisSyncManual(row.id)
                    this.$message({
                        type: 'success',
                        message: '关闭成功!'
                    })
                    this.$emit('search')
                }
            })
        },
        async clickHandle (form) {
            form.createBy = this.userInfo.employeeName
            await createWorkOrder(form)
            this.$refs.workOrder.onCloseDialog()
        }
    },
    mounted () { }
}
</script>

<style lang='scss' scoped>
/deep/.el-tabs__header {
    margin-bottom: 0;
}
.list-head {
    overflow: hidden;
    background: #ccc;
    padding: 15px 10px;
}
.list-head ul {
    display: flex;
}
.list-head ul li {
    flex: 1;
    font-size: 14px;
    color: #000;
    text-align: center;
}
.list-head ul li:nth-child(1) {
    flex: 0 0 260px;
}
.list-head ul li:nth-child(2) {
    flex: 0 0 168px;
}
.list-head ul li:nth-child(3) {
    flex: 1;
}
.list-table {
    width: 100%;
    border-top: 1px solid #ccc;
    margin-top: 10px;
    background: #fff;
    box-sizing: border-box;
}
.remark {
    color: #0033ff !important;
    position: relative;
    cursor: pointer;
    display: block;
    float: right;
    margin-right: 55px !important;
}
.appointbtn {
    float: right;
    margin-top: -4px;
}
.remark-box {
    position: absolute;
    width: 398px;
    top: 25px;
    z-index: 999;
    right: 0;
}
.btnmore {
    color: #0033ff;
    border: none;
    background: none;
    margin: 0;
    padding: 0;
}
.head-info span {
    color: #b4b4b4;
    margin-right: 60px;
    font-size: 14px;
}
.head-info {
    padding: 15px 0;
    border: 1px solid #dcdfe6;
}
.head-info span:nth-child(1) {
    margin-right: 20px;
}
.content {
    background: #fff;
    box-shadow: 0 3px 12px 3px rgba(45, 108, 238, 0.08);
    margin-top: 10px;
}
.table ul {
    display: flex;
}
// .table ul:last-child{border-bottom:1px solid #DCDFE6;border-right:1px solid #DCDFE6;}
.table ul li {
    flex: 1;
    font-size: 14px;
    color: #000;
    border-left: 1px solid #dcdfe6;
    text-align: center;
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px solid #dcdfe6;
    position: relative;
}
.table ul li:last-child {
    border-right: 1px solid #dcdfe6;
    display: flex;
    flex-direction: column;
    .one-line {
        margin-bottom: 14px;
    }
}
.table ul li:nth-child(1) {
    flex: 0 0 430px;
    text-align: left;
    line-height: normal;
}
.table ul li .goods {
    text-align: left;
    display: flex;
    line-height: normal;
}
.table ul .nopadding {
    padding: 0;
}
.table ul .nopadding .goods {
    padding: 10px;
}
.table ul .nopadding .goods:nth-child(1) {
    border-bottom: 1px solid #dcdfe6;
}
.table ul li:not(:first-child) {
    display: flex;
    align-items: center;
    justify-content: center;
}
.name {
    margin-left: 15px;
}
.name font {
    color: #0033ff;
    margin-top: 10px;
    display: block;
}
.name p {
    color: #6b6b6b;
    margin-top: 30px;
}
.priceandnums {
    position: absolute;
    right: 20px;
}
.priceandnums p:nth-child(1) {
    margin-top: 10px;
    display: block;
    text-align: right;
}
.priceandnums p:nth-child(2) {
    color: #6b6b6b;
    margin-top: 30px;
    text-align: right;
}
.bzo {
    background: #fdeeee;
    color: #ff0000;
    line-height: 38px;
    padding-left: 10px;
    border: 1px solid #dcdfe6;
    border-top: none;
}
.bzt {
    background: #fffaeb;
    color: #ff9900;
    line-height: 38px;
    padding-left: 10px;
    border: 1px solid #dcdfe6;
    border-top: none;
}
.sub {
    text-align: right;
    margin-top: 10px;
}
.bhover:hover {
    background: none;
    color: #ff7a45;
    border: 1px solid #fff;
}
.empty {
    text-align: center;
    padding: 12px;
}
.edit-work-order {
    overflow: hidden;
}
.mis-dialog {
    text-align: center;
}
</style>

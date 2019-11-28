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
                        <span class="remark">
                            <font @click="onShowRemark(item, index)">备注</font>
                            <font v-if="hosAuthCheck(youZanDetailsAuth) || hosAuthCheck(channelDetailsAuth)" @click="onShowDetail(item, index)" style="margin-left: 20px">详情</font>
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
                                <template v-if="item.source === 1">有赞商城</template>
                                <template v-if="item.source === 2">孩子王</template>
                                <template v-if="item.source === 3">考拉买菜</template>
                                <template v-if="item.source === 4">大众点评</template>
                            </li>
                            <li>{{item.userName ? item.userName : '-'}}<br>{{item.receiverName ? item.receiverName : '-'}}</li>
                            <li>无需配送</li>
                            <li>{{parseToMoney(item.payAmount)}}</li>
                            <li>{{orderStatus(item.status)}}</li>
                            <li>
                                <el-button v-if="item.status !== 4" type="primary" size='mini' @click="onLink(item)">工单信息</el-button>
                                <el-button v-if="item.source !== 1 && hosAuthCheck(channelEditAuth)" type="primary" size='mini' @click="onEdit(item)">编辑</el-button>
                                <el-button v-if="item.status !== 4" type="primary" size='mini' @click="addOrder(item)">新增工单</el-button>
                            </li>
                        </ul>
                        <div class="bzo" v-if="item.buyerRemark">买家备注：{{item.buyerRemark}}</div>
                        <div class="bzt" v-if="item.sellerRemark">卖家备注：{{item.sellerRemark}}</div>
                        <div class="bzt" v-if="item.remark">备注：{{item.remark}}</div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="新增工单" :visible.sync="dialog" class="edit-work-order" width="1100px" :close-on-click-modal="false">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="100px" class="edit-work-order-form">
                <el-form-item label="渠道名称">
                    <el-select disabled v-model="form.channelType">
                        <el-option :label="item.name" :value="item.code" v-for="item in channelType" :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input type="text" v-model="form.orderNo" disabled maxlength="25"></el-input>
                </el-form-item>
                <el-form-item prop="customerName" label="姓名">
                    <el-input type="text" v-model="form.customerName" placeholder="请输入姓名" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item prop="customerMobile" label="手机号">
                    <el-input type="text" v-model="form.customerMobile" placeholder="请输入手机号" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item prop="houseKeeperId" label="线下管家">
                    <el-select v-model="form.houseKeeperId" >
                        <el-option :label="item.name" :value="item.userId" v-for="item in houseKeeperData" :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="houseKeeperMobile"  label="管家电话">
                    <el-input type="text" v-model="form.houseKeeperMobile" placeholder="请输入管家电话" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item prop="customerAddress" label="地址">
                    <el-input v-model="form.customerAddress" placeholder="请输入地址" maxlength="50" ></el-input>
                </el-form-item>
                <el-form-item prop="reserveMode" label="预约方式">
                    <el-select v-model="form.reserveMode">
                        <el-option label="公众号预约" :value="1"></el-option>
                        <el-option label="电话预约" :value="2"></el-option>
                        <el-option label="管家预约" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="goodsName" label="服务项目">
                    <el-input type="text" v-model="form.goodsName" placeholder="请输入服务项目" maxlength="20"  ></el-input>
                </el-form-item>
                <el-form-item label="服务商">
                    <el-input type="text" v-model="form.serviceProvider" placeholder="请输入服务商" maxlength="20"  ></el-input>
                </el-form-item>
                <el-form-item prop="type" label="服务状态">
                    <el-select v-model="form.status"  >
                        <el-option label="已预约（待确认）" :value="1"></el-option>
                        <el-option label="已预约（已确认）" :value="2"></el-option>
                        <el-option label="已完成" :value="3"></el-option>
                        <el-option label="取消" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工程师">
                    <el-input type="text" v-model="form.engineer" placeholder="请输入工程师" maxlength="10"  ></el-input>
                </el-form-item>
                <el-form-item label="工程师电话">
                    <el-input type="text" v-model="form.engineerMobile" placeholder="请输入工程师电话" maxlength="11"  ></el-input>
                </el-form-item>
                <el-form-item prop="serviceNum" label="服务数量">
                    <el-input type="text" v-model="form.serviceNum" placeholder="请输入服务数量" maxlength="5" ></el-input>
                </el-form-item>
                <el-form-item label="买家备注">
                    <el-input type="text" disabled v-model="form.buyerRemark" placeholder=""  ></el-input>
                </el-form-item>
                <el-form-item label="卖家备注">
                    <el-input type="text" disabled v-model="form.sellerRemark" placeholder=""></el-input>
                </el-form-item>
                <div>
                    <el-form-item prop="AloneData" label="服务时间">
                        <el-date-picker v-model="form.AloneData" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                        placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="AloneDataTimeStart" class="alone-select">
                        <el-time-select placeholder="起始时间" v-model="form.AloneDataTimeStart" :picker-options="{
                                      start: '08:30',
                                      step: '00:15',
                                      end: '18:30'
                                    }">
                        </el-time-select>
                    </el-form-item>
                    <el-form-item prop="AloneDataTimeEnd" class="alone-select">
                        <el-time-select placeholder="结束时间" v-model="form.AloneDataTimeEnd" :picker-options="{
                                  start: '08:30',
                                  step: '00:15',
                                  end: '18:30',
                                  minTime: form.AloneDataTimeStart
                                }">
                        </el-time-select>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary" @click="onSaveOrder" :loading="isSaving">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import { AUTH_SERVICE_YOUZAN_DETAILS, AUTH_SERVICE_CHANNEL_DETAILS, AUTH_SERVICE_CHANNEL_EDIT } from '@/utils/auth_const'
import { updateOrderRemark, createWorkOrder, findServiceManagementList } from '../api/index'
import { mapState } from 'vuex'
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
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    watch: {
        'form.houseKeeperId' (val) {
            let mobile = ''
            this.houseKeeperData.map(value => {
                if (value.userId === val) {
                    mobile = value.mobile
                    this.$set(this.form, 'houseKeeperMobile', mobile)
                    this.$set(this.form, 'houseKeeper', value.name)
                    return false
                }
            })
        }
    },
    data () {
        const checkMobile = (rule, value, callback) => {
            const Reg = /^1\d{10}$/
            if (!value) {
                if (rule.field === 'customerMobile') {
                    callback(new Error('请输入手机号码'))
                } else {
                    callback(new Error('请输入管家电话'))
                }
            } else if (Reg.test(value) === false) {
                callback(new Error('手机号码格式不正确'))
            } else {
                callback()
            }
        }
        const validServiceNum = (rule, value, callback) => {
            // const Reg = /\d{5}/
            const N = /^\+?[0-9]\d*$/
            if (!value) {
                callback(new Error('请填写服务数量'))
            } else if (!N.test(value)) {
                callback(new Error('服务数量格式不正确'))
            } else {
                callback()
            }
        }
        return {
            curIndex: null,
            activeName: '0',
            remark: '',
            youZanDetailsAuth: AUTH_SERVICE_YOUZAN_DETAILS,
            channelDetailsAuth: AUTH_SERVICE_CHANNEL_DETAILS,
            channelEditAuth: AUTH_SERVICE_CHANNEL_EDIT,
            dialog: false,
            orderFormRules: {},
            orderForm: {
                phone: ''
            },
            form: {
                reserveBeginTime: '',
                reserveEndTime: '',
                AloneData: '',
                AloneDataTimeStart: '',
                AloneDataTimeEnd: ''
            },
            rules: {
                customerName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                customerMobile: [
                    { required: true, validator: checkMobile, trigger: 'blur' }
                ],
                houseKeeperId: [
                    { required: true, message: '管家不能为空', trigger: 'change' }
                ],
                houseKeeperMobile: [
                    { required: true, validator: checkMobile, trigger: 'change' }
                ],
                customerAddress: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
                reserveMode: [
                    { required: true, message: '预约方式不能为空', trigger: 'blur' }
                ],
                goodsName: [
                    { required: true, message: '服务项目不能为空', trigger: 'blur' }
                ],
                serviceNum: [
                    { required: true, validator: validServiceNum, trigger: 'blur' }
                ],
                AloneData: [
                    { required: true, message: '服务日期不能为空', trigger: 'blur' }
                ],
                AloneDataTimeStart: [
                    { required: true, message: '开始时间不能为空', trigger: 'blur' }
                ],
                AloneDataTimeEnd: [
                    { required: true, message: '结束时间不能为空', trigger: 'blur' }
                ]
            },
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() < Date.now() - 60 * 60 * 24 * 1000
                }
            },
            isSaving: false,
            houseKeeperData: []
        }
    },
    methods: {
        async findServiceManagementList () {
            const { data } = await findServiceManagementList({ pageSize: 1000, pageNumber: 1, role: 1 }) // 管家人少，查出所有管家
            this.houseKeeperData = data.records
        },
        onSaveOrder () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try {
                        this.isSaving = true
                        this.form.createBy = this.userInfo.employeeName
                        this.form.reserveBeginTime = this.form.AloneData + ' ' + this.form.AloneDataTimeStart
                        this.form.reserveEndTime = this.form.AloneData + ' ' + this.form.AloneDataTimeEnd
                        this.houseKeeperData.forEach(value => {
                            if (value.id === this.form.houseKeeperId) {
                                this.form.houseKeeper = value.name
                            }
                        })
                        await createWorkOrder(this.form)
                        this.isSaving = false
                        this.dialog = false
                    } catch (e) {
                        this.isSaving = false
                    }
                } else {
                    this.isSaving = false
                }
            })
        },
        addOrder (row) {
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
                reserveMode: 2
            }
            this.dialog = true
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        onLink (item) {
            this.$router.push({ path: '/serviceManagement/workOrder', query: { orderNo: item.orderNo } })
        },
        onEdit (item) {
            this.$router.push({ path: '/serviceManagement/orderChannelEdit', query: { id: item.id } })
        },
        parseToMoney (money) {
            if (money) {
                const res = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                return res
            }
            return ''
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
    .empty{
        text-align: center;
        padding: 12px;
    }
.edit-work-order {
    overflow: hidden;
}
</style>

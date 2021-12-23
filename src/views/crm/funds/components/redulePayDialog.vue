<template>
    <div>
        <el-dialog :title="title" :visible.sync="isOpen" :close-on-click-modal=false width="670px" :before-close="()=> $emit('onClose')">
            <template v-if="repaymentType==3">
                <div class="remain_head">
                    <div>总金额：<b>123123</b></div>
                    <div>已支付金额：<b>123123</b></div>
                    <div>待支付金额：<b>123123</b></div>
                    <div>支付待确认金额：<b>123123</b></div>
                    <div>应支付日期：<b>123123</b></div>
                </div>
                <div class="remain_manual">
                    <h-button type="primary" @click="handleReceived(2,item)">认领流水</h-button>点击可读取当前经销商的入账流水
                </div>
                <div class="remain_wrap" v-for="(item) in dialogDetail&&dialogDetail.fundDetailResponseList" :key="item.id">
                    <div class="remian_wrap-top">
                        <el-row>
                            <el-col :span="12">
                                本次支付金额（元）：12313
                            </el-col>
                            <el-col :span="12">
                                支付时间：123123
                            </el-col>
                            <el-col :span="12" class="mt10">
                                支付成功时间：12323
                            </el-col>
                            <el-col class="mt10" :span="12">
                                操作人：123123123
                            </el-col>
                        </el-row>
                        <el-row class="mt10">
                            支付凭证：
                            <div class="remian_voucher">
                                <!-- <span class="img-box" :key="i.id" v-for="(i) in item.attachDocResponseList">
                                <imageAddToken :file-url="i.fileUrl" />
                            </span> -->
                            </div>
                        </el-row>
                        <el-row class="mt10">
                            <p style="color:#9999">是否确认收到经销商<span style="color:red">{{companyName}}</span>支付的<span style="color:red">{{item.paymentAmount|moneyFormat}}</span>元服务费</p>
                            <strong style="color:red">你可以选择以下方式确认这笔入账👇：</strong>
                        </el-row>
                        <div class="mt10">
                            <h-button type="assist" @click="handleOffine(item)">线下确认</h-button>
                            <h-button @click="handleReceived(2,item)">并未收到</h-button>
                            <h-button type="primary" @click="handleReceived(2,item)">认领流水</h-button>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="remain_wrap" v-for="(item) in dialogDetail&&dialogDetail.fundDetailResponseList" :key="item.id">
                    <div class="remian_wrap-top">
                        <el-row>
                            <el-col :span="12">
                                本次支付金额（元）：{{item.paymentAmount|moneyFormat}}
                            </el-col>
                            <el-col :span="12">
                                支付时间：{{moment(item.createTime).format('yyyy-MM-DD HH:mm:ss')}}
                            </el-col>
                            <el-col :span="12" class="mt10">
                                支付成功时间：{{item.paymentConfirmTime | momentFormat}}
                            </el-col>
                            <el-col class="mt10" :span="12">
                                操作人：{{item.createBy}} ({{item.createPhone||'-'}})
                            </el-col>
                        </el-row>
                        <el-row class="mt10">
                            支付凭证：
                            <div class="remian_voucher">
                                <span class="img-box" :key="i.id" v-for="(i) in item.attachDocResponseList">
                                    <imageAddToken :file-url="i.fileUrl" />
                                </span>
                            </div>
                        </el-row>
                        <el-row class="mt10" v-if="!lookBoolean">
                            <p style="color:#9999">是否确认收到经销商<span style="color:red">{{companyName}}</span>支付的<span style="color:red">{{item.paymentAmount|moneyFormat}}</span>元{{repaymentType==3?'服务费':'贷款'}}？</p>
                        </el-row>
                    </div>
                    <div class="remian_wrap-bot" v-if="!lookBoolean && repaymentType!==3">
                        <span class="mr10"><i class="el-icon-warning" style="color:#E6A23C"></i> 确认到账后，将释放掉经销商 <span>{{item.paymentAmount|moneyFormat}}</span> 元的可用额度</span>
                    </div>
                    <div class="mt10" v-if="!lookBoolean">
                        <h-button type="assist" @click="handleReceived(1,item)">确认收到</h-button>
                        <h-button @click="handleReceived(2,item)">并未收到</h-button>
                    </div>
                </div>
                <p class="remain_mes" v-if="dialogDetail.fundDetailResponseList.length==0">暂无数据</p>
                <span slot="footer" class="dialog-footer" v-if="lookBoolean">
                    <span>剩余货款支付进度：{{dialogDetail.paidAmount | moneyFormat}}/{{dialogDetail.paymentAmount | moneyFormat}}</span>
                    <el-button @click="()=> $emit('onClose')">取 消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog title="再次确认" :visible.sync="offineVisible" :close-on-click-modal=false width="670px" :before-close="()=> $emit('onClose')">
            <p style="color:red">是否确认使用线下方式确认，如果确认则后面不可再关联流水。</p>
            <div class="remain_title">请确认收款账户信息：</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>
<script>
import {
    findRemainPayDetail,
    findRemainPayConfirm,
    updateRemainPayConfirm
} from '../api'
import { mapState } from 'vuex'
import imageAddToken from '@/components/imageAddToken'
import moment from 'moment'
import FiltUtil from '@/utils/filters'
export default {
    name: 'redulePayDialog',
    components: {
        imageAddToken
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }

    },
    data () {
        return {
            offineVisible: false,
            dialogDetail: { fundDetailResponseList: [] },
            title: '',
            companyName: '',
            repaymentType: 0,
            lookBoolean: false,
            ruleForm: {},
            rules: {
                name: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        moment,
        async handleReceived (val, item) {
            const params = {
                fundDetailId: item.id,
                updateBy: JSON.parse(sessionStorage.getItem('userInfo')).employeeName,
                updatePhone: JSON.parse(sessionStorage.getItem('userInfo')).phoneNumber,
                confirmType: val
            }
            await updateRemainPayConfirm(params)
            this.$emit('onClose')
        },
        async getFundsTicket (val, bol) {
            const { data } = await findRemainPayDetail(val.id)
            this.dialogDetail = data
            this.lookBoolean = true
            this.repaymentType = bol // 来源服务费tab
            this.title = '查看凭证'
        },
        async findRemainConfirm (val, bol) {
            const { data } = await findRemainPayConfirm(val.id)
            this.dialogDetail = data
            this.companyName = val.companyName
            this.lookBoolean = false
            this.repaymentType = bol // 来源服务费tab
            // 针对服务费进行了处理
            if (bol == 3) {
                this.title = `服务费支付确认`
            } else {
                this.title = `支付确认 | 剩余货款支付进度:${FiltUtil.moneyFormat(data.paidAmount)}/${FiltUtil.moneyFormat(data.paymentAmount)}`
            }
        },
        handleOffine () {
            this.offineVisible = true
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-dialog__body {
    max-height: 450px;
    overflow-y: scroll;
}
.remain_head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    div {
        margin-bottom: 10px;
        b {
            color: #ff7a45;
        }
    }
}
.remain_wrap {
    border: 1px solid #e5e5ee;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 3px #e5e5e5;
}
.remian_voucher {
    display: flex;
}
.remain_mes {
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-box {
    width: 60px;
    height: 60px;
    border: 1px solid #e5e5e5;
    margin: 10px 0 0 10px;
    display: block;
    box-shadow: 1px 1px 2px #e5e5e5;
    overflow: hidden;
    img {
        width: 60px;
        height: 60px;
    }
}
</style>

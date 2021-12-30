<template>
    <el-dialog :title="title" :visible.sync="isOpen" :close-on-click-modal=false width="670px" :before-close="()=> $emit('onClose')">
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
            <span>{{ repaymentType == 3 ? '服务费' : '剩余货款' }}支付进度：{{dialogDetail.paidAmount | moneyFormat}}/{{dialogDetail.paymentAmount | moneyFormat}}</span>
            <el-button @click="()=> $emit('onClose')">取 消</el-button>
        </span>
    </el-dialog>
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
            dialogDetail: { fundDetailResponseList: [] },
            title: '',
            companyName: '',
            repaymentType: 0,
            lookBoolean: false
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
                this.title = `支付确认 | 服务费支付进度:${FiltUtil.moneyFormat(data.paidAmount)}/${FiltUtil.moneyFormat(data.paymentAmount)}`
            } else {
                this.title = `支付确认 | 剩余货款支付进度:${FiltUtil.moneyFormat(data.paidAmount)}/${FiltUtil.moneyFormat(data.paymentAmount)}`
            }
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-dialog__body {
    max-height: 450px;
    overflow-y: scroll;
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

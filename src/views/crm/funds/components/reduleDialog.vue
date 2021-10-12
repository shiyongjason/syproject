<template>
    <el-dialog :title="title" :visible.sync="isOpen" :close-on-click-modal=false width="650px" :before-close="()=> $emit('onClose')">

          <div class="info-content" v-if="this.status === FundsDict.repaymentTypeArrays.list[2].key">
            <div class="row-filed">
                <div class="row-filed-flex">
                    <p class="tips">
                        <template v-if="this.status === FundsDict.repaymentTypeArrays.list[0].key">首付款</template>
                        <template v-if="this.status === FundsDict.repaymentTypeArrays.list[1].key">服务费</template>
                        <template v-if="this.status === FundsDict.repaymentTypeArrays.list[2].key">剩余货款</template>
                        金额(元)：{{dialogDetail.paymentAmount | fundMoneyHasTail}}
                    </p>
                    <p >
                        支付时间：{{moment(FundsDict.paidTime).format('YY-MM-DD HH:mm:ss')}}
                    </p>
                </div>
                  <div class="use-box"  v-if="this.status === FundsDict.repaymentTypeArrays.list[2].key">
                   <div class="span-filed" >
                       <p class="coll-filed">支付金额：qqqq</p>
                       <p class="coll-filed">支付时间：fsdf </p>
                   </div>
                    <div class="span-filed">
                       <p class="coll-filed">支付成功时间：sssss</p>
                       <p class="coll-filed"><span>操作人：111111111111111111111111111111111</span>

                       </p>
                   </div>
                  <div class="span-filed">支付凭证：</div>
                  <p class="content span-filed">
                    <span class="img-box" :key="item.fileUrl" v-for="item in dialogDetail.attachDocList">
                        <imageAddToken :file-url="item.fileUrl" />
                    </span>
                  </p>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer" >
            <h-button type="assist" @click="onReceived">确认收到</h-button>
            <h-button type="primary" @click="onUnReceived">并未收到</h-button>
        </span>
    </el-dialog>
</template>

<script>
import FundsDict from '../fundsDict'
import {
    getFundsTicket,
    updateFinalPay, updateFinalUnPay,
    updateFirstPay,
    updateFirstUnPay,
    updateServicePay,
    updateServiceUnPay
} from '../api'
import { mapState } from 'vuex'
import imageAddToken from '@/components/imageAddToken'
import moment from 'moment'
export default {
    name: 'reduleDialog',
    components: {
        imageAddToken
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        detail: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            required: true
        }

    },
    data () {
        return {
            moment,
            dialogDetail: {},
            FundsDict
        }
    },
    computed: {
        title () {
            let title = '支付确认'
            return title
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        async onReceived () {
            const params = {
                // paymentOrderId: this.detail.orderId,
                fundId: this.detail.id
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[0].key) {
                await updateFirstPay(params)
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[1].key) {
                await updateServicePay(params)
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[2].key) {
                await updateFinalPay(params)
            }
            this.$emit('onClose')
        },
        async onUnReceived () {
            const params = {
                paymentOrderId: this.detail.orderId,
                fundId: this.detail.id
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[0].key) {
                await updateFirstUnPay(params)
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[1].key) {
                await updateServiceUnPay(params)
            }
            if (this.status === FundsDict.repaymentTypeArrays.list[2].key) {
                await updateFinalUnPay(params)
            }
            this.$emit('onClose')
        },
        async getFundsTicket () {
            const { data } = await getFundsTicket(this.detail.id)
            this.dialogDetail = data
        },
        goDetail (url) {
            window.open(url)
        }
    },
    watch: {
        isOpen (value) {
            if (value) {
                this.getFundsTicket()
            }
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-dialog__body {
    min-height: 150px;
}
.info-content {
    display: flex;
    flex-direction: column;
    .img-box {
        margin: 10px 10px 0 0;
    }
}
.tips {
    color: #8d8d8d;
    margin-right: 20px;
}
.img-info {
    width: 80px;
    height: 80px;
    cursor: pointer;
    margin-right: 10px;
}
.row-filed {
    &-flex {
        display: flex;
        flex-direction: row;
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        span {
            display: flex;
            width: 80px;
            height: 80px;
            margin-bottom: 12px;
            margin-right: 12px;
            cursor: pointer;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
        }
        img {
            display: block;
            margin: auto;
            max-height: 78px;
            max-width: 78px;
        }
    }
    .label {
        flex: 0 0 100px;
        margin-top: 20px;
    }
}

.use-box {
    display: flex;
    background-color: #f2f2f4;
    flex-direction: column;
    border-radius: 5px;
    font-size: 12px;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .span-filed {
        display: flex;
        padding: 5px;
        justify-content: space-between;
        .coll-filed {
            display: flex;
            padding-right: 15px;
            font-size: 12px;
            color: #333333;
            font-weight: 400;
            cursor: default;
            line-height: 15px;
            box-sizing: border-box;
        }
    }
    img {
        display: block;
        margin: auto;
        max-height: 32px;
        max-width: 32px;
    }
}
</style>

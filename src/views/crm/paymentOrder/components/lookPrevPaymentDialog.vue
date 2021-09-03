<template>
    <el-dialog :close-on-click-modal=false title="查看上游支付明细" :visible.sync="isOpen" width="600px" :before-close="()=> onClose()">
        <div class="info-content">
            <div class="tab-pane">
                <div class="row">
                    <p>
                        <span>应向上游支付：</span>
                        <span class="orange-main">{{ prevPaymentDetail.totalAmount | fundMoneyHasTail }}元</span>
                    </p>
                    <p>
                        <span>上游支付方式：</span>
                        <span class="orange-main">{{ prevPaymentDetail.supplierPaymentType | attributeComputed(PaymentOrderDict.supplierPaymentType.list) }}</span>
                    </p>
                </div>
                <div class="row">
                    <p>
                        <span>已向上游支付：</span>
                        <span class="orange-main">{{ prevPaymentDetail.paidAmount  | fundMoneyHasTail }}元</span>
                    </p>
                    <p>
                        <span>上游货款方式：</span>
                        <span class="orange-main">{{ prevPaymentDetail.supplierPaymentMethod  | attributeComputed(PaymentOrderDict.supplierPaymentMethod.list)  }}</span>
                    </p>
                </div>
            </div>
            <ul>
                <li :key="item.id + '' + index" v-for="(item,index) in prevPaymentDetail.supplierDetails">
                    <p class="head">
                        <span class="icon">{{index + 1}}</span>
                        <span class="label">本次上游支付：</span>
                        <span class="orange-main">{{ item.payAmount | fundMoneyHasTail }}元</span>
                        <span class="info">{{ item.createTime | formatDate('YYYY-MM-DD HH:mm:ss') }} {{ item.createBy }}（{{ item.createPhone||'-' }}）</span>
                    </p>
                    <!-- <p style="margin-top:10px">
                        <span class="label">
                            支付银行：
                        </span>
                        {{ item.paymentBank||'-' }}
                    </p> -->
                    <div class="body info-img-group">
                        <span class="label">
                            支付凭证：
                        </span>
                        <p class="content">
                            <downloadFileAddToken v-for="subItem in item.payVouchers" :key="subItem.fileUrl" :file-name="subItem.fileName" :file-url="subItem.fileUrl" :a-link-words="subItem.fileName" isType='main' isPreview></downloadFileAddToken>
                        </p>
                        <p v-if="item.payVouchers&&item.payVouchers.length==0">
                            -
                        </p>
                    </div>
                    <p>
                        <span class="label">
                            支付日期：
                        </span>
                        {{ item.payDate }}
                    </p>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>

<script>
import { getPrevPayMoreDetail } from '@/views/crm/paymentOrder/api'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'
import imageAddToken from '@/components/imageAddToken'
import downloadFileAddToken from '@/components/downloadFileAddToken'

export default {
    name: 'lookPrevPaymentDialog',
    components: {
        downloadFileAddToken
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        params: {
            type: Object
        }
    },
    data () {
        return {
            prevPaymentDetail: {},
            PaymentOrderDict
        }
    },
    watch: {
        isOpen (val) {
            if (val) {
                this.getPrevPayMoreDetail()
            }
        }
    },
    methods: {
        onClose () {
            this.$emit('onClose')
        },
        async getPrevPayMoreDetail () {
            const { data } = await getPrevPayMoreDetail(this.params.paymentOrderId)
            this.prevPaymentDetail = data
        },
        goDetail (url) {
            window.open(url)
        }
    }
}
</script>

<style scoped lang="scss">
.tab-pane {
    border-bottom: 2px solid #e5e5ea;
    .row {
        display: flex;
        p {
            flex: 0 0 50%;
            line-height: 25px;
            padding: 5px 0;
        }
    }
}
ul {
    padding: 20px 0;
}
li {
    margin-bottom: 10px;
}
.body {
    display: flex;
    padding: 10px 0;
    img {
        cursor: pointer;
    }
}
.info-img-group {
    display: flex;
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
        a {
            display: block;
            width: 100%;
        }
    }
    .label {
        flex: 0 0 100px;
    }
}
.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #e5e5e5;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    color: #ffffff;
    margin-right: 10px;
}
.orange-main {
    color: #ff7a45;
}
.info {
    float: right;
}
.info-img {
    width: 80px;
    height: 80px;
    cursor: pointer;
}
/deep/ .el-dialog__body {
    max-height: 480px;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>

<template>
    <el-dialog :close-on-click-modal=false title="查看收货明细" :visible.sync="isOpen" width="600px" :before-close="()=> $emit('onClose')">
        <div class="info-content look-receipt-detail">
            <div class="tab-pane">
                <p>
                    <span>应到货金额总计：</span>
                    <span class="orange-main">{{ receiptDetail.totalAmount | fundMoneyHasTail }}元</span>
                </p>
                <p>
                    <span>已到货金额总计：</span>
                    <span class="orange-main">{{ receiptDetail.goodsAmount  | fundMoneyHasTail }}元</span>
                </p>
            </div>
            <ul>
                <li :key="item.id" v-for="(item,index) in receiptDetail.respGoodsDetailList">
                    <p>
                        <span class="icon">{{ index + 1 }}</span>
                        <span class="label">本次到货金额：</span>
                        <span class="orange-main">{{ item.goodsAmount | fundMoneyHasTail }}元</span>
                        <span class="info">{{
                                item.createTime | momentFormat
                            }} {{ item.createBy }}（{{ item.createPhone }}）</span>
                    </p>
                    <div class="info-img-group">
                        <span class="label">
                            到货验收单：
                        </span>
                        <div class="content">
                            <div :key="subItem.fileUrl" v-for="subItem in item.goodsVouchers.filter(value => ['.png', '.jpg', '.jpeg'].indexOf(value.fileUrl.toLowerCase().slice(value.fileUrl.lastIndexOf('.'))) > -1)">
                                <span class="img-box">
                                    <imageAddToken :file-url="subItem.fileUrl" />
                                </span>
                            </div>
                            <div class="file-group" :key="subItem.fileUrl" v-for="subItem in item.goodsVouchers.filter(value => ['.png', '.jpg', '.jpeg'].indexOf(value.fileUrl.toLowerCase().slice(value.fileUrl.lastIndexOf('.'))) === -1)">
                                <p v-if="['.png', '.jpg', '.jpeg'].indexOf(subItem.fileUrl.toLowerCase().slice(subItem.fileUrl.lastIndexOf('.'))) === -1">
                                    <i class="el-icon-document upload-list-icon"></i> <downloadFileAddToken  :file-name="subItem.fileName"
                                                          :file-url="subItem.fileUrl"
                                                          :a-link-words="subItem.fileName"
                                                          is-type="main"/>
                                </p>
                            </div>
                        </div>
                    </div>
                    <p>
                        <span class="label">
                            收货备注：
                        </span>
                        {{ item.goodsRemark || '-' }}
                    </p>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>
<script>
import { getConfirmReceiptMoreDetail } from '@/views/crm/paymentOrder/api'
import imageAddToken from '@/components/imageAddToken'
import downloadFileAddToken from '@/components/downloadFileAddToken'

export default {
    name: 'lookReceiptDetail',
    components: {
        imageAddToken,
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
            receiptDetail: {}
        }
    },
    watch: {
        async isOpen (val) {
            if (val) {
                const { data } = await getConfirmReceiptMoreDetail(this.params.paymentOrderId)
                this.receiptDetail = data
            }
        }
    },
    methods: {
        goDetail (url) {
            window.open(url)
        }
    }
}
</script>

<style scoped lang="scss">
.tab-pane {
    padding-bottom: 20px;
    border-bottom: 2px solid #e5e5ea;

    p {
        line-height: 25px;
        padding: 5px 0;
    }
}

ul {
    padding: 20px 0;
}

li {
    margin-bottom: 10px;

    p {
        padding: 5px 0;
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
    }

    .label {
        flex: 0 0 100px;
    }
}

.info-img {
    width: 80px;
    height: 80px;
    cursor: pointer;
    margin-right: 10px;
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
.upload-list-icon {
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
.file-group {
    display: flex;
    width: 100%;
}
</style>

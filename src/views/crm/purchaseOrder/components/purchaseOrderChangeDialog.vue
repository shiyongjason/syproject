<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="800px" :before-close="()=> $emit('backEvent')">
        <div class="info-content">
            <div class="row-filed">
                <div class="col-filed left" v-if="dialogStatus.enter.status === openStatus">
                    <div class="info-title">采购单信息</div>
                    <ul class="purchase-order-info">
                        <li>
                            <span class="label">采购单金额：</span>
                            <span>12,000,000元</span>
                        </li>
                        <li>
                            <span class="label">采购明细表：</span>
                            <img src="" alt="">
                        </li>
                        <li>
                            <span class="label">采购批次：</span>
                            <span>一次性采购</span>
                        </li>
                        <li>
                            <span class="label">经销商预付款比例： </span>
                            <span>50%</span>
                        </li>
                        <li>
                            <span class="label">剩余货款支付周期： </span>
                            <span>6月</span>
                        </li>
                        <li>
                            <span class="label">最迟发货日期：</span>
                            <span>2020年11月25日</span>
                        </li>
                        <li>
                            <span class="label">收货地址：</span>
                            <span>江苏省南京市中山东路311-2号五星控股大厦江苏省南京市中山东路311-2号五星控股大厦</span>
                        </li>
                        <li>
                            <span class="label">监管账户户名： </span>
                            <span>重庆新日日顺家电有限公司宁波大榭分公司</span>
                        </li>
                        <li>
                            <span class="label">监管账户银行账号：</span>
                            <span>6227778888888888888</span>
                        </li>
                        <li>
                            <span class="label">监管账户开户行： </span>
                            <span>中国银行(江宁科学园支行)</span>
                        </li>
                        <li>
                            <span class="label">收款账户户名：</span>
                            <span>好享家舒适智能家居股份有限公司</span>
                        </li>
                        <li>
                            <span class="label">收款账户银行账号： </span>
                            <span>6227778888888888888</span>
                        </li>
                        <li>
                            <span class="label">收款账户开户行：</span>
                            <span>中国银行(江宁科学园支行)</span>
                        </li>
                    </ul>
                </div>
                <div class="col-filed left" v-if="dialogStatus.enter.status !== openStatus">
                    <div class="info-title">变更的内容</div>
                    <table>
                        <tr>
                            <th>变更字段</th>
                            <th>变更前</th>
                            <th>变更后</th>
                        </tr>
                        <tr>
                            <td>采购单金额</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>采购批次</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>采购明细表</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>银行账号</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="col-filed project-info">
                    <div class="info-title">项目信息</div>
                    <p>
                        项目： 佳源玖龙湾商业体空调
                    </p>
                    <p>
                        经销商： 扬州优创智能环境科技有限公司
                    </p>
                    <template v-if="dialogStatus.enter.status === openStatus">
                        <div class="info-title">相关合同</div>
                        <table>
                            <tr>
                                <th>合同</th>
                                <th>合同类型</th>
                            </tr>
                            <tr>
                                <td>合同</td>
                                <td>合同</td>
                            </tr>
                        </table>
                    </template>
                    <!--采购单变更和查看变更 变更合同模板一样-->
                    <template v-if="dialogStatus.enter.status !== openStatus">
                        <div class="info-title">变更的合同</div>
                        <table>
                            <tr>
                                <th>新合同</th>
                                <th>变更类型</th>
                                <th>合同类型</th>
                                <th>原合同</th>
                            </tr>
                            <tr>
                                <td>合同</td>
                                <td>合同</td>
                                <td>合同</td>
                                <td>合同</td>
                            </tr>
                        </table>
                    </template>
                </div>
            </div>
            <div class="row-filed result">
                <div class="col-filed">
                    <div class="info-title">变更结果</div>
                    <!--采购单变更和采购单确认变更 变更结果模板一样-->
                    <template v-if="dialogStatus.watch.status !== openStatus">
                        <p>
                            变更结果：
                            <el-radio-group v-model="resultRadioGroup">
                                <el-radio :label="3">确认变更</el-radio>
                                <el-radio :label="6">驳回</el-radio>
                            </el-radio-group>
                        </p>
                        <p>
                            免息方式：
                            <el-radio-group v-model="InterestFreeRadioGroup">
                                <el-radio :label="3">无</el-radio>
                                <el-radio :label="6">1个月</el-radio>
                                <el-radio :label="9">2个月</el-radio>
                                <el-radio :label="9">3个月</el-radio>
                                <el-radio :label="9">4个月</el-radio>
                                <el-radio :label="9">5个月</el-radio>
                                <el-radio :label="9">6个月</el-radio>
                            </el-radio-group>
                        </p>
                    </template>
                    <template v-if="dialogStatus.watch.status === openStatus">
                        <p>变更结果：已驳回</p>
                        <p>驳回原因：这里显示驳回的原因</p>
                    </template>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer" v-if="dialogStatus.watch.status !== openStatus">
                <h-button @click="$emit('backEvent')">取消</h-button>
                <h-button type="primary" @click="onSave">确定</h-button>
            </span>
    </el-dialog>
</template>

<script>
import PurchaseOrderDialogStatus from '../dialogStatus'
import { updateStatusOkPurchaseOrder } from '@/views/crm/purchaseOrder/api'

export default {
    name: 'purchaseOrderChangeDialog',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        openStatus: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            resultRadioGroup: [],
            InterestFreeRadioGroup: [],
            dialogStatus: PurchaseOrderDialogStatus
        }
    },
    computed: {
        title () {
            let title = ''
            if (this.openStatus === PurchaseOrderDialogStatus.enter.status) {
                title = PurchaseOrderDialogStatus.enter.title
            }
            if (this.openStatus === PurchaseOrderDialogStatus.changeEnter.status) {
                title = PurchaseOrderDialogStatus.changeEnter.title
            }
            if (this.openStatus === PurchaseOrderDialogStatus.watch.status) {
                title = PurchaseOrderDialogStatus.watch.title
            }
            return title
        }
    },
    methods: {
        onSave () {

        },
        async updateStatusOkPurchaseOrder () {
            await updateStatusOkPurchaseOrder()
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__body {
    max-height: 500px;
    padding: 0 20px 20px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.info-content {
    .row-filed {
        display: flex;

        .col-filed.left {
            width: 60%;
            box-sizing: content-box;
            padding-right: 20px;
        }
        .info-title {
            font-size: 14px;
            font-weight: 600;
            color: #FF7A45;
            padding: 12px 0;
        }
    }

    .purchase-order-info {
        line-height: 20px;

        li {
            padding: 6px 0;
            display: flex;
            .label {
                flex: 0 0 140px;
                text-align: right;
                padding-right: 10px;
                box-sizing: border-box;
            }
            span:last-child{
                padding-right: 10px;
                text-align: justify;
            }
        }
    }
    .result {
        p{
            line-height: 30px;
            padding: 5px 0;
        }
        /deep/.el-radio ::after {
            transition: none!important;
        }
    }
    .project-info {
        width: 40%;
        p{
            line-height: 18px;
            padding: 5px 0;
        }
    }
    table{
        border-collapse: collapse;
        width: 100%;
        text-align: center;
        th{
            border: 1px solid #EBEEF5;
            background: #f2f2f4;
            padding: 5px;
        }
        td{
            border: 1px solid #EBEEF5;
            padding: 5px;
        }
    }
}
</style>

<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="row-filed">
                <div class="col-filed">
                    <div class="info-title">上游支付申请信息</div>
                    <p>
                        <span class="label">申请支付金额：</span>
                        12,000,000元
                    </p>
                    <p>
                        <span class="label">上游供应商：</span>
                        重庆新日日顺家电有限公司
                    </p>
                    <p>
                        <span class="label">采购明细表：</span>
                        <img src="" alt="">
                    </p>
                    <p>
                        <span>最迟发货日期：</span>
                        2020年11月25日
                    </p>
                    <p>
                        <span>收货地址：</span>
                        江苏省南京市中山东路311-2号五星控股大厦江苏省南京市中山东路311-2号五星控股大厦
                    </p>
                    <div class="info-title">审核信息</div>
                    <p>
                        <span>审核结果：</span>
                        <el-radio-group v-model="reviewResultRadioGroup">
                            <el-radio :label="3">通过</el-radio>
                            <el-radio :label="6">不通过</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>应收账款质押：</span>
                        <el-radio-group v-model="reviewResultRadioGroup">
                            <el-radio :label="3">已质押</el-radio>
                            <el-radio :label="6">放款前质押</el-radio>
                            <el-radio :label="6">其他</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>上游支付方式：</span>
                        <el-radio-group v-model="reviewResultRadioGroup">
                            <el-radio :label="3">银行转帐</el-radio>
                            <el-radio :label="6">银行承兑</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>上游货款方式：</span>
                        <el-radio-group v-model="reviewResultRadioGroup">
                            <el-radio :label="3">先款后货</el-radio>
                            <el-radio :label="6">先货后款</el-radio>
                        </el-radio-group>
                    </p>
                    <p>
                        <span>经销商首付款：</span>
                        200,000元 <img src="" alt="">
                    </p>
                    <p>
                        <span>剩余货款：</span>
                        200,000元
                    </p>
                    <p>
                        <span>预计服务费总额：</span>
                        10,000元
                    </p>
                    <p>
                        <span>预计每期服务费：</span>
                        10,000元
                    </p>
                </div>
                <div class="col-filed">
                    <div class="info-title">项目信息</div>
                    <p>
                        <span>项目：</span>
                        佳源玖龙湾商业体空调
                    </p>
                    <p>
                        <span>经销商：</span>
                        扬州优创智能环境科技有限公司
                    </p>
                    <p>
                        <span>所属分部：</span>
                        南京分部
                    </p>
                    <p>
                        <span>执行费率：</span>
                        6%
                    </p>
                    <p>
                        <span>银行承兑：</span>
                        6%
                    </p>
                    <p>
                        <span>银行转帐：</span>
                        6%
                    </p>
                    <div class="info-title">采购单信息</div>
                    <p>
                        <span>采购单金额：</span>
                        12,000,000元
                    </p>
                    <p>
                        <span>采购明细表：</span>
                        <img src="" alt="">
                    </p>
                    <p>
                        <span>采购批次：</span>
                        一次性采购
                    </p>
                    <p>
                        <span>最迟发货日期：</span>
                        2020年11月25日
                    </p>
                    <p>
                        <span>收货地址：</span>
                        江苏省南京市中山东路311-2号五星控股大厦江苏省南京市中山东路311-2号五星控股大厦
                    </p>
                    <p>
                        <span>经销商预付款比例：</span>
                        50%
                    </p>
                    <p>
                        <span>剩余货款支付周期：</span>
                        6月
                    </p>
                    <p>
                        <span>免息方式：</span>
                        无
                    </p>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <p class="tips">
                审核通过后，将会给经销商发送《订单及服务费确认函》
            </p>
            <div class="btn-group">
                <h-button type="cancel" @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onReceived">确认审核</h-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'reviewPaymentOrder',
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
            reviewResultRadioGroup: []
        }
    },
    methods: {
        onCancel () {

        },
        onReceived () {

        }
    }
}
</script>

<style scoped lang="scss">
.info-content{
}
</style>

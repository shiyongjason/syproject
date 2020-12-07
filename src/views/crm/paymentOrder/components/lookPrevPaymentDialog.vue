<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="tab-pane">
                <div>
                    <p>
                        <span>应向上游支付：</span>
                        <span class="orange-main">12,000,000元</span>
                    </p>
                    <p>
                        <span>上游支付形式：</span>
                        <span class="orange-main">银行转帐</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span>已向上游支付：</span>
                        <span class="orange-main">12,000,000元</span>
                    </p>
                    <p>
                        <span>上游货款方式：</span>
                        <span class="orange-main">银行转帐</span>
                    </p>
                </div>
            </div>
            <ul>
                <li>
                    <p>
                        <span class="icon">1</span>
                        <span class="label">本次上游支付：</span>
                        <span class="orange-main">12,000,000元</span>
                        <span class="info">2020.11.19 15:00:00 赵娟（15195954045）</span>
                    </p>
                    <p>
                        <span class="label">
                            支付凭证：
                        </span>
                        <img src="" alt="">
                    </p>
                    <p>
                        <span class="label">
                            支付日期：
                        </span>
                        2020.11.18
                    </p>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'lookPrevPaymentDialog',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        openStatus: {
            type: Number,
            default: 1
        }
    }
}
</script>

<style scoped>

</style>

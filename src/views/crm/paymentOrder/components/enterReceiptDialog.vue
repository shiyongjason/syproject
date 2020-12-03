<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="row-filed">
                <span class="label">支付凭证：</span>
                <img src="" alt="">
            </div>
            <p class="tips">是否确认收到经销商***支付的***元服务费？</p>
        </div>
        <span slot="footer" class="dialog-footer" v-if="dialogStatus.seePayEnter.status !== openStatus">
                <h-button type="assist" @click="onReceived">确认收到</h-button>
                <h-button type="primary" @click="onUnReceived">并未收到</h-button>
            </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'enterReceiptDialog',
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

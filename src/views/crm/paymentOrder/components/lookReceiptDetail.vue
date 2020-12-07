<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="500px" :before-close="()=> $emit('onClose')">
        <div class="info-content">
            <div class="tab-pane">
                <p>
                    <span>应到货金额总计：</span>
                    <span class="orange-main">12,000,000元</span>
                </p>
                <p>
                    <span>已到货金额总计：</span>
                    <span class="orange-main">12,000,000元</span>
                </p>
            </div>
            <ul>
                <li>
                    <p>
                        <span class="icon">1</span>
                        <span class="label">本次到货金额：</span>
                        <span class="orange-main">12,000,000元</span>
                        <span class="info">2020.11.19 15:00:00 赵娟（15195954045）</span>
                    </p>
                    <p>
                        <span class="label">
                            到货验收单：
                        </span>
                        <img src="" alt="">
                    </p>
                    <p>
                        <span class="label">
                            收货备注：
                        </span>
                        这里是收货备注，这里是收货备注，这里是收货备注，这里是收货备注，这里是收货备注
                    </p>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'lookReceiptDetail',
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

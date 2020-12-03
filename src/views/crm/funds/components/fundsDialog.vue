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
import DialogStatus from '../dialogStatus'

export default {
    name: 'fundsDialog',
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
            dialogStatus: DialogStatus
        }
    },
    computed: {
        title () {
            let title = ''
            if (this.openStatus === DialogStatus.firstPayEnter.status) {
                title = DialogStatus.firstPayEnter.title
            }
            if (this.openStatus === DialogStatus.servicePayEnter.status) {
                title = DialogStatus.servicePayEnter.title
            }
            if (this.openStatus === DialogStatus.seePayEnter.status) {
                title = DialogStatus.seePayEnter.title
            }
            if (this.openStatus === DialogStatus.endPayEnter.status) {
                title = DialogStatus.endPayEnter.title
            }
            return title
        }
    },
    methods: {
        onReceived () {
            this.$emit('onClose')
        },
        onUnReceived () {
            this.$emit('onClose')
        }
    },
    mounted () {
        // console.log(DialogStatus.firstPayEnter)
    }
}
</script>

<style scoped lang="scss">
/deep/.el-dialog__body{
    min-height: 150px;
}
.info-content{
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.tips {
    color: #8d8d8d;
}
</style>

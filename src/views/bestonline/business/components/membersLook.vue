<template>
    <el-collapse-item name="7">
        <template slot="title">
            <p class="title-p">门店/会员店</p>
        </template>
        <el-form-item label="自营门店数量：" placeholder="自营门店数量">
            {{form.selfStoresNum}}
        </el-form-item>
        <el-form-item label="会员店数量：" placeholder="会员店数量">
            {{form.memberShopNum}}
        </el-form-item>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {

        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        })
    }
}
</script>

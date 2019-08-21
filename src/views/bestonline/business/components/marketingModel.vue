<template>
    <el-collapse-item name="4">
        <template slot="title">
            <p class="title-p">营销模式</p>
        </template>
        <el-form-item label="宣传推广渠道：" prop="checkedWays">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="onCheckAll">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.publicityPromotionChannels" @change="onCheckChannel">
                <el-checkbox v-for="item in channelList" :label="item.code" :key="item.code">{{item.value}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="异业合作渠道：">
            <el-input v-model="form.interIndustryCooperation"></el-input>
        </el-form-item>
    </el-collapse-item>
</template>

<script>
import { findChannels } from '@/views/bestonline/api/index.js'
import { mapState } from 'vuex'
export default {
    name: 'marketing_model',
    data () {
        return {
            channelOptions: [],
            isIndeterminate: true,
            channelList: [],
            channelCodes: [],
            checkAll: false
        }
    },
    watch: {
        form (form) {
            let publicityPromotionChannels = form.publicityPromotionChannels
            if (!publicityPromotionChannels) {
                publicityPromotionChannels = []
            }
            this.form.publicityPromotionChannels = publicityPromotionChannels
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        })
    },
    methods: {
        async findChannels () {
            const { data } = await findChannels()
            this.channelList = data
            this.channelCodes = data.map(item => item.code)
        },
        onCheckAll (val) {
            this.form.publicityPromotionChannels = val ? this.channelCodes : []
            this.isIndeterminate = false
        },
        onCheckChannel (val) {
            let checkedLen = val.length
            this.checkAll = checkedLen === this.channelCodes.length
            this.isIndeterminate = checkedLen > 0 && checkedLen < this.channelCodes.length
        }
    },
    mounted () {
        this.findChannels()
    }
}
</script>

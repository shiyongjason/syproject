<template>
    <div class="page-body">
        <div class="page-body-cont">
            <span>>>区域人员申报</span>
            <div class="title">
                <span>本次可申报：<i>{{fundDetail.fundplanMain.applyMonth.substring(0, 4)}}</i>年<i>{{fundDetail.fundplanMain.applyMonth.substring(4, 6)}}</i>月的预计销售及资金用款计划</span>
            </div>
            <baseInfo :fundDetail='fundDetail' />
        </div>
        <div class="page-body-cont">
            <districtEmployee ref="districtEmployee" :fundDetail='fundDetail' :required='true' />
        </div>
        <div class="page-body-cont center">
            <el-button name="hosjoy-color" @click="onApply">提 交</el-button>
            <el-button name="hosjoy-color" @click="onBack">取 消</el-button>
        </div>
    </div>
</template>

<script>
import baseInfo from '../components/declare/baseInfo'
import districtEmployee from '../components/declare/districtEmployee'
import { getFundDetail, applyFundplan } from '../api/index'
import { mapActions } from 'vuex'

export default {
    name: 'planTotal',
    components: { baseInfo, districtEmployee },
    data () {
        return {
            fundDetail: {
                fundplanMain: {
                    applyMonth: 'XXXXXX'
                }, // 基本信息
                fundplanSale: {}, // 销售信息
                regionManagerFundPlanApprove: null, // 大区总
                subRegionFundPlanApply: {}, // 区域人员
                subsectionFinanceFundPlanApprove: null, // 分财
                subsectionManagerFundPlanApprove: null, // 分总
                respResult: null
            }
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        async getFundDetail () {
            const { data } = await getFundDetail(this.$route.query.id)
            data.subRegionFundPlanApply = {}
            this.fundDetail = data
        },
        onApply () {
            this.$refs['districtEmployee'].$refs['form'].validate(async (valid) => {
                if (valid) {
                    await applyFundplan(this.fundDetail)
                    this.$message({ message: '申报成功', type: 'success' })
                    this.onBack()
                } else {
                    return false
                }
            })
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/fundsPlan/planToDeclare')
        }
    },
    mounted () {
        this.getFundDetail()
    }
}
</script>

<style lang='scss' scoped>
.title {
    font-weight: 700;
    text-align: center;
    font-size: 20px;
    i {
        font-style: normal;
        color: #ff0000;
    }
}
.center {
    text-align: center;
}
</style>

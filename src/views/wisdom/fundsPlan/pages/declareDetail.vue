<template>
    <div class="page-body declareDetail">
        <div class="page-body-cont">
            <span>>>{{fundDetail.fundplanMain.planId}}-{{approveRole[approveRoleNode].nextNode}}</span>
            <div class="title">
                <span><i>{{applyMonth[0]}}</i>年<i>{{applyMonth[1]}}</i>月的预计销售及资金用款计划</span>
            </div>
            <baseInfo :fundDetail='fundDetail' />
        </div>
        <div class="page-body-cont">
            <districtEmployee :fundDetail='fundDetail' :disabled='true' />
        </div>
        <div class="page-body-cont" v-if="approveRoleNode > 0">
            <branchFinancial :fundDetail='fundDetail' :disabled='true' />
        </div>
        <div class="page-body-cont" v-if="approveRoleNode > 1">
            <branchManager :fundDetail='fundDetail' :disabled='true' />
        </div>
        <div class="page-body-cont" v-if="approveRoleNode > 2">
            <regionalManager :fundDetail='fundDetail' :disabled='true' />
        </div>
        <div class="page-body-cont center">
            <el-button name="hosjoy-color" @click="onBack">返 回</el-button>
        </div>
    </div>
</template>

<script>
import baseInfo from '../components/declare/baseInfo'
import districtEmployee from '../components/declare/districtEmployee'
import branchFinancial from '../components/declare/branchFinancial'
import branchManager from '../components/declare/branchManager'
import regionalManager from '../components/declare/regionalManager'
import { getFundDetail } from '../api/index'
import { approveRole } from '../const'
import { mapActions } from 'vuex'
export default {
    name: 'declareDetail',
    components: { baseInfo, districtEmployee, branchFinancial, branchManager, regionalManager },
    data () {
        return {
            fundDetail: {
                fundplanMain: {}, // 基本信息
                fundplanSale: {}, // 销售信息
                regionManagerFundPlanApprove: {},
                subRegionFundPlanApply: {},
                subsectionFinanceFundPlanApprove: {},
                subsectionManagerFundPlanApprove: {},
                respResult: {}
            },
            approveRoleNode: 0,
            approveRole: approveRole
        }
    },
    computed: {
        applyMonth () {
            if (!this.fundDetail.fundplanMain.applyMonth) {
                return ['XXXX', 'XX']
            }
            return [this.fundDetail.fundplanMain.applyMonth.substring(0, 4), this.fundDetail.fundplanMain.applyMonth.substring(4, 6)]
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        async getFundDetail () {
            const { data } = await getFundDetail(this.$route.query.id)
            this.fundDetail = data
            this.approveRoleNode = this.observeApproval().index
        },
        observeApproval () {
            return approveRole.find((item, index) => {
                return item.key === this.fundDetail.fundplanMain.approveRole
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
.declareDetail {
    .title {
        font-weight: 700;
        text-align: center;
        font-size: 20px;
        padding-top: 10px;
        i {
            font-style: normal;
            color: #ff0000;
        }
    }
    .center {
        text-align: center;
    }
    .fixedAuth {
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        position: fixed;
        bottom: 80px;
        left: 210px;
        right: 10px;
        z-index: 99;
    }
    .fixed {
        position: fixed;
        bottom: 0;
        left: 210px;
        right: 10px;
    }
}
</style>

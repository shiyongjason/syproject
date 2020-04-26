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
            <districtEmployee :fundDetail='fundDetail' :disabled='true' :required='false' />
        </div>
        <div class="page-body-cont" :class="{'fixedAuth':approveRoleNode === 0 && !isBottom}" v-if="approveRoleNode >= 0">
            <branchFinancial ref="branchFinancial" :fundDetail='fundDetail' :disabled='approveRoleNode > 0' :required='!(approveRoleNode > 0)' />
        </div>
        <div class="page-body-cont" :class="{'fixedAuth':approveRoleNode === 1 && !isBottom}" v-if="approveRoleNode >= 1">
            <branchManager ref="branchManager" :fundDetail='fundDetail' :disabled='approveRoleNode > 1' />
        </div>
        <div class="page-body-cont" :class="{'fixedAuth':approveRoleNode === 2 && !isBottom}" v-if="approveRoleNode >= 2">
            <regionalManager ref="regionalManager" :fundDetail='fundDetail' :disabled='approveRoleNode == 3' />
        </div>
        <div v-show="!isBottom" class="page-body-cont" style="height: 396px"></div>
        <div style="height: 50px"></div>
        <div class="page-body-cont center fixed">
            <el-button name="hosjoy-color" @click="onApprove(approveRole[approveRoleNode].ref)" :disabled='approveRoleNode == 3'>提 交</el-button>
            <el-button name="hosjoy-color" @click="onBack">取 消</el-button>
        </div>
    </div>
</template>

<script>
import baseInfo from '../components/declare/baseInfo'
import districtEmployee from '../components/declare/districtEmployee'
import branchFinancial from '../components/declare/branchFinancial'
import branchManager from '../components/declare/branchManager'
import regionalManager from '../components/declare/regionalManager'
import { getFundDetail, approveFundplan } from '../api/index'
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
            isBottom: false,
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
        onReset () {
            this.params = { ...this.paramsTemp }
        },
        listenerFunction (e) {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        handleScroll (e) {
            let scrollTop = document.getElementsByTagName('main')[0].scrollTop
            let clientHeight = document.getElementsByTagName('main')[0].clientHeight
            let scrollHeight = document.getElementsByTagName('main')[0].scrollHeight
            if (scrollTop + clientHeight > scrollHeight - 200) {
                this.isBottom = true
            }
            if (scrollTop + clientHeight <= scrollHeight - 200) {
                this.isBottom = false
            }
        },
        async getFundDetail () {
            const { data } = await getFundDetail(this.$route.query.id)
            this.fundDetail = data
            this.approveRoleNode = this.observeApproval().index
            this.handleData()
        },
        handleData () {
            if (this.approveRoleNode === 0) {
                this.fundDetail.subsectionFinanceFundPlanApprove = {}
            } else if (this.approveRoleNode === 1) {
                this.fundDetail.subsectionManagerFundPlanApprove = {}
            } else if (this.approveRoleNode === 2) {
                this.fundDetail.regionManagerFundPlanApprove = {}
            }
        },
        observeApproval () {
            return approveRole.find((item, index) => {
                return item.key === this.fundDetail.fundplanMain.approveRole
            })
        },
        async onApprove (name) {
            this.$refs[name].$refs['form'].validate(async (valid) => {
                if (valid) {
                    await approveFundplan(this.fundDetail)
                    this.$message({ message: '审批成功', type: 'success' })
                    this.onBack()
                } else {
                    return false
                }
            })
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/fundsPlan/approvalList')
        }
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll, true)
    },
    mounted () {
        this.listenerFunction()
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

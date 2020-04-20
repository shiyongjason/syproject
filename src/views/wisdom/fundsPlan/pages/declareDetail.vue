<template>
    <div class="page-body declareDetail">
        <div class="page-body-cont">
            <span>>>ZJJH20200222001—分部总经理审批 待办</span>
            <div class="title">
                <span>本次可申报：<i>{{fundDetail.fundplanMain.applyMonth}}</i>月的预计销售及资金用款计划</span>
            </div>
            <baseInfo :fundDetail='fundDetail' />
        </div>
        <div class="page-body-cont">
            <districtEmployee />
        </div>
        <div class="page-body-cont">
            <branchFinancial />
        </div>
        <div class="page-body-cont">
            <branchManager />
        </div>
        <div class="page-body-cont" :class="shy">
            <regionalManager />
        </div>
        <div v-show="!isBottom" class="page-body-cont" style="height: 396px"></div>
        <div style="height: 50px"></div>
        <div class="page-body-cont center fixed">
            <el-button name="hosjoy-color">提 交</el-button>
            <el-button name="hosjoy-color">取 消</el-button>
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
export default {
    name: 'declareDetail',
    components: { baseInfo, districtEmployee, branchFinancial, branchManager, regionalManager },
    data () {
        return {
            fundDetail: {
                fundplanMain: {}, // 基本信息
                fundplanSale: {}, // 销售信息
                regionManagerFundplanApprove: null,
                subRegionFundplanApply: null,
                subsectionFinanceFundplanApprove: null,
                subsectionManagerFundplanApprove: null,
                respResult: null
            },
            isBottom: false
        }
    },
    computed: {
        shy: {
            get: function () {
                if (!this.isBottom) {
                    return 'fixedAuth'
                }
                return ''
            }
        }
    },
    methods: {
        backPlat (value) {
            console.log(value)
        },
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
            console.log(scrollTop, scrollHeight)
            if (scrollTop + clientHeight > scrollHeight - 200) {
                this.isBottom = true
            }
            if (scrollTop + clientHeight <= scrollHeight - 200) {
                this.isBottom = false
            }
        },
        async getFundDetail () {
            const { data } = await getFundDetail(this.$route.query.id)
            console.log(data)
            this.fundDetail = data
        }
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

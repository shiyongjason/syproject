<template>
    <div class="preliminaryreview">
        <div class="preliminaryreview-col" style="margin-top:0">
            <h2 class="preliminaryreview-title">经销商</h2>
            <p>{{tabPreliminaryReview.companyName||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">所属分部</h2>
            <p>{{tabPreliminaryReview.deptName||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">工程项目名称</h2>
            <p>{{tabPreliminaryReview.projectName||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">项目地址</h2>
            <p>{{tabPreliminaryReview.address||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">甲方名称</h2>
            <p>{{tabPreliminaryReview.firstPartName||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">项目类别</h2>
            <p>{{tabPreliminaryReview.type&&typeList[tabPreliminaryReview.type-1]['value']||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">工程项目进度</h2>
            <p>{{tabPreliminaryReview.status?onFiterStates('coopreation',tabPreliminaryReview.status)[0].value:'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">项目合同总额</h2>
            <p><b v-if="tabPreliminaryReview.contractAmount">¥</b>{{formatMoney(tabPreliminaryReview.contractAmount)||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">设备总额</h2>
            <p><b v-if="tabPreliminaryReview.deviceAmount">¥</b>{{formatMoney(tabPreliminaryReview.deviceAmount)||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">设备品类</h2>
            <p>{{tabPreliminaryReview.deviceCategory?onFiterStates('deviceCategoryList',tabPreliminaryReview.deviceCategory)[0].value:'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">设备品牌</h2>
            <p>{{tabPreliminaryReview.deviceBrand||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">上游供应商类型</h2>
            <p>{{tabPreliminaryReview.upstreamSupplierType?onFiterStates('upstreamSupplierType',tabPreliminaryReview.upstreamSupplierType)[0].value:'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">上游供应商名称</h2>
            <p>{{tabPreliminaryReview.upstreamSupplierName||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">上游接受付款方式</h2>
            <p>{{tabPreliminaryReview.upstreamPayType?onFiterStates('upstreamPayType',tabPreliminaryReview.upstreamPayType)[0].value:'-'}}</p>
            <p v-if="tabPreliminaryReview.upstreamPayType">承兑描述：</p>
            <p v-if="tabPreliminaryReview.upstreamPayType">{{tabPreliminaryReview.payAcceptanceRemark}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">上游接受付款周期</h2>
            <p>{{tabPreliminaryReview.upstreamPromiseMonth?`${tabPreliminaryReview.upstreamPromiseMonth}个月`:'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">预估赊销金额</h2>
            <p><b v-if="tabPreliminaryReview.predictLoanAmount">¥</b>{{formatMoney(tabPreliminaryReview.predictLoanAmount)||'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">预估赊销周期</h2>
            <p>{{tabPreliminaryReview.loanMonth?`${tabPreliminaryReview.loanMonth}个月`:'-'}}</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">工程项目回款方式</h2>
            <p class="preliminaryreview-p">
                <span>预付款比例</span>
                {{tabPreliminaryReview.advancePaymentProportion?`${tabPreliminaryReview.advancePaymentProportion}%`:'-'}}
            </p>
            <p class="preliminaryreview-p">
                <span>货到付款比例</span>
                {{tabPreliminaryReview.deliveryPaymentProportion?`${tabPreliminaryReview.deliveryPaymentProportion}%`:'-'}}
            </p>
            <p class="preliminaryreview-p">
                <span>安装进度款比例</span>
                {{tabPreliminaryReview.installProgressPaymentProportion?`${tabPreliminaryReview.installProgressPaymentProportion}%`:'-'}}
            </p>
            <p class="preliminaryreview-p">
                <span>验收款比例</span>
                {{tabPreliminaryReview.acceptancePaymentProportion?`${tabPreliminaryReview.acceptancePaymentProportion}%`:'-'}}
            </p>
            <p class="preliminaryreview-p">
                <span>交付款比例</span>
                {{tabPreliminaryReview.realPaymentProportion?`${tabPreliminaryReview.realPaymentProportion}%`:'-'}}
            </p>
            <p class="preliminaryreview-p">
                <span>审计结算款比例</span>
                {{tabPreliminaryReview.auditCalculationPaymentProportion?`${tabPreliminaryReview.auditCalculationPaymentProportion}%`:'-'}}
            </p>
            <p class="preliminaryreview-p">
                <span>其他</span>
                {{tabPreliminaryReview.payOtherText||'-'}}
            </p>
        </div>
        <div class="preliminaryreview-annex">
            <h2 class="preliminaryreview-title">附件</h2>
            <div class="preliminaryreview-annex-annexs" v-if="srcList&&srcList.length>0">
                <template v-for="(item,index) in srcList">
                    <el-image :key="index" style="width: 80px; height: 80px;margin-right:8px" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" :preview-src-list="srcList" />
                </template>
            </div>
            <div v-else>-</div>
        </div>
    </div>
</template>

<script>
import { TYPE_LIST, COOPERATION_PROGRESS_LIST, DEVICE_LIST, UPSTREAMSUPPLIERTYPE, UPSTREAMPAYTYPE } from '../../const'
import utils from '@/utils/filters'
console.log('utils: ', utils)

export default {
    name: 'tabPreliminaryReview',
    props: ['tabPreliminaryReview'],
    data () {
        return {
            upstreamPayType: UPSTREAMPAYTYPE,
            upstreamSupplierType: UPSTREAMSUPPLIERTYPE,
            deviceCategoryList: DEVICE_LIST,
            typeList: TYPE_LIST,
            coopreation: COOPERATION_PROGRESS_LIST
        }
    },
    computed: {
        srcList () {
            return this.tabPreliminaryReview.attachmentUrl ? JSON.parse(this.tabPreliminaryReview.attachmentUrl) : []
        }
    },
    methods: {
        onFiterStates (data, val) {
            return this[data].filter((v) => {
                return v.key == val
            })
        },
        formatMoney (val) {
            return utils.money(val)
        }
    },
    mounted () {
    }
}
</script>

<style scoped lang='scss'>
.preliminaryreview {
    &-annex {
        margin-top: 20px;
        margin-bottom: 30px;
        &-annexs {
            margin-top: 10px;
        }
    }
    &-col {
        margin-top: 20px;
        h2 {
            color: #333;
        }
        p {
            color: #333;
            font-size: 14px;
            b {
                font-size: 18px;
                margin-right: 6px;
            }
            span {
                display: inline-block;
                width: 200px;
            }
        }
    }
    &-title {
        font-size: 15px;
        margin-bottom: 6px;
    }
    &-p {
        margin-top: 10px;
    }
}
</style>
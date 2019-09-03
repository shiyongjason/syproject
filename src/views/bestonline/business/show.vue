<template>
    <div class="jd-manage">
        <p v-if="form.updateTime">已提交 {{form.updateTime}} {{ form.updateUser}} </p>
        <el-collapse v-model="activeName" accordion>
            <el-form :model="form" ref="form" label-width="160px">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title-p">商业尽调评估及KPI</p>
                    </template>
                    <!--start-->
                    <p class="small-title">1、商业尽调评估</p>
                    <table class="item-wrapper">
                        <thead>
                            <tr>
                                <td class="assessmentRow">评估项</td>
                                <td class="assessmentRow">合作目标</td>
                                <td class="assessmentRow">结论</td>
                                <td class="assessmentRow">备注</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in form.dueBusinessAssessmentCreateFormList" :key=index>
                                <td>{{item.assessmentItem}}</td>
                                <td>{{item.cooperationIntention}}
                                    <i v-if="index === 1">w</i>
                                </td>
                                <td>
                                    {{item.state == 0?'是':'否'}}
                                </td>
                                <td :rowspan="form.dueBusinessAssessmentCreateFormList.length" v-if="index == 0">
                                    {{item.remark }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="small-title ">2、KPI(必填)</p>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="批发:零售:工程占比：" :prop="(form.wholesaleShare==''||form.wholesaleShare==null)?'wholesaleShare':(form.retailShare==''||form.retailShare==null)?'retailShare':'projectShare'">
                                {{form.wholesaleShare?form.wholesaleShare:'-'}}<span class="KPISymbol">:</span>
                                {{form.retailShare?form.retailShare:'-'}}<span class="KPISymbol">:</span>
                                {{form.projectShare?form.projectShare:'-'}}
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="上年销售业绩：" prop="salesPerformanceLastYear">
                                {{form.salesPerformanceLastYear}}万
                            </el-form-item>
                        </div>
                    </div>
                    <p class="small-title ">3、分析报告(必填)</p>
                    <el-form-item label="风险揭示：" prop="riskDisclosure" label-width="100px">
                        {{form.riskDisclosure}}
                    </el-form-item>
                    <el-form-item label="分析描述：" prop="analysisDescription" label-width="100px">
                        {{form.analysisDescription}}
                    </el-form-item>
                    <!--end-->
                </el-collapse-item>
                <!-- 业务模式 -->
                <BusinessMode />
                <!-- 销售业绩(含税)（万元） -->
                <SalesPerformance />
                <!-- 营销模式 -->
                <MarketingModel />
                <!-- 上游-供应商结构 -->
                <Supplier />
                <!-- 下游-客户结构 -->
                <Customer />
                <!-- 门店/会员店 -->
                <Members />
                <!-- 竞争对手 -->
                <Competitor />
                <!-- 新合资公司规划 -->
                <Plan />
            </el-form>
        </el-collapse>

    </div>
</template>
<script>

import { DOWN_OPTIONS } from './const'
import BusinessMode from './components/businessModeLook.vue'
import MarketingModel from './components/marketingModelLook.vue'
import Supplier from './components/supplierLook.vue'
import Customer from './components/customerLook.vue'
import Members from './components/membersLook.vue'
import Competitor from './components/competitorLook.vue'
import Plan from './components/planLook.vue'
import SalesPerformance from './components/salesPerformanceLook.vue'
import { mapState } from 'vuex'
export default {
    components: {
        BusinessMode, MarketingModel, SalesPerformance, Supplier, Customer, Members, Competitor, Plan
    },
    data () {
        return {
            activeName: '9',
            options: DOWN_OPTIONS
        }
    },
    mounted () {
        this.nowMonth = (new Date()).getMonth()
    },
    watch: {
        form (form) {
            form.applyId = this.$route.query.applyId
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            form: state => state.dueDiligence.businessData
        })
    }

}
</script>
<style lang="scss" >
.jd-manage {
    padding: 0 15px;
    table,
    tr,
    td {
        border: 1px solid #dddddd;
        text-align: center;
        line-height: 40px;
    }
    .lengthen {
        .flex-wrap-box {
            max-width: 600px;
        }
    }
}
.jd-manage {
    textarea {
        border: 1px solid #dddddd;
    }
}
table {
    border-collapse: collapse;
}
</style>
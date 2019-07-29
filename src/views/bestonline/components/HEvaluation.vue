<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="page-header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>尽调管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:'/bestonline/review'}">现场尽调</el-breadcrumb-item>
                    <el-breadcrumb-item>尽调评估及KPI</el-breadcrumb-item>
                    <el-breadcrumb-item >{{companyName}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="jd-manage">
                <!--start-->
                <p class="small-title">1、尽调评估</p>
                <div class="table-flex  table-none">
                    <div class="table-row">
                        <div class="table-col">评估项</div>
                        <div class="table-col">可否合作</div>
                        <div class="table-col">尽调规模</div>
                        <div class="table-col">年度递增率</div>
                        <div class="table-col">股权比例</div>
                        <div class="table-col">净利润率</div>
                    </div>
                    <div class="table-row">
                        <div class="table-col">合作目标</div>
                        <div class="table-col">-</div>
                        <div class="table-col">
                            {{cooperateTarget.scale}}
                            <i>w</i>
                        </div>
                        <div class="table-col">
                            {{cooperateTarget.yearGrowthRate}}
                            <i>%</i>
                        </div>
                        <div class="table-col">
                            {{cooperateTarget.equityRatio}}
                        </div>
                        <div class="table-col">
                            {{cooperateTarget.netProfitRate}}
                            <i>%</i>
                        </div>
                    </div>
                    <div class="table-row ">
                        <div class="table-col">商业尽调</div>
                        <div class="table-col">{{dueBusiness.isCooperate | YesOrNo}}</div>
                        <div class="table-col">{{dueBusiness.scale | YesOrNo}}</div>
                        <div class="table-col">{{dueBusiness.yearGrowthRate | YesOrNo}}</div>
                        <div class="table-col">{{dueBusiness.equityRatio | YesOrNo}}</div>
                        <div class="table-col">{{dueBusiness.netProfitRate | YesOrNo}}</div>
                    </div>
                    <div class="table-row">
                        <div class="table-col">财务尽调</div>
                        <div class="table-col">{{dueFinancial.isCooperate | YesOrNo}}</div>
                        <div class="table-col">{{dueFinancial.scale | YesOrNo}}</div>
                        <div class="table-col">{{dueFinancial.yearGrowthRate | YesOrNo}}</div>
                        <div class="table-col">{{dueFinancial.equityRatio | YesOrNo}}</div>
                        <div class="table-col">{{dueFinancial.netProfitRate | YesOrNo}}</div>
                    </div>
                    <div class="table-row">
                        <div class="table-col">法务尽调</div>
                        <div class="table-col">{{dueLegal.isCooperate | YesOrNo}}</div>
                        <div class="table-col">{{dueLegal.scale | YesOrNo}}</div>
                        <div class="table-col">{{dueLegal.yearGrowthRate | YesOrNo}}</div>
                        <div class="table-col">{{dueLegal.equityRatio | YesOrNo}}</div>
                        <div class="table-col">{{dueLegal.netProfitRate | YesOrNo}}</div>
                    </div>
                    <div class="table-row">
                        <div class="table-col">组织尽调</div>
                        <div class="table-col">{{dueOrganization.isCooperate | YesOrNo}}</div>
                        <div class="table-col">{{dueOrganization.scale | YesOrNo}}</div>
                        <div class="table-col">{{dueOrganization.yearGrowthRate | YesOrNo}}</div>
                        <div class="table-col">{{dueOrganization.equityRatio | YesOrNo}}</div>
                        <div class="table-col">{{dueOrganization.netProfitRate | YesOrNo}}</div>
                    </div>

                </div>
                <div class="table-flex">
                      <div
                        class="table-row"
                        v-for="(item,value) in roleConclusionVoList"
                        :key="value"
                    >
                        <div class="table-col">{{item.createUser}}</div>
                        <div class="table-col">{{item.isCooperate | YesOrNo}}</div>
                        <div class="table-col">{{item.scale | YesOrNo}}</div>
                        <div class="table-col">{{item.yearGrowthRate | YesOrNo}}</div>
                        <div class="table-col">{{item.equityRatio | YesOrNo}}</div>
                        <div class="table-col">{{item.netProfitRate | YesOrNo}}</div>
                    </div>
                </div>
                <div class="table-flex">
                       <div class="table-row">
                        <div class="table-col" style="color:#ff8b00;font-weight:800">结论参考</div>
                        <div class="table-col">{{dueItemRecommend.isCooperate}}</div>
                        <div class="table-col">{{dueItemRecommend.scale}}</div>
                        <div class="table-col">{{dueItemRecommend.yearGrowthRate}}</div>
                        <div class="table-col">{{dueItemRecommend.equityRatio}}</div>
                        <div class="table-col">{{dueItemRecommend.netProfitRate}}</div>
                    </div>
                      <div class="table-row">
                        <div class="table-col" style="color:#ff8b00;font-weight:800">占比</div>
                        <div class="table-col">{{dueItemStatics.isCooperate}}%</div>
                        <div class="table-col">{{dueItemStatics.scale}}%</div>
                        <div class="table-col">{{dueItemStatics.yearGrowthRate}}%</div>
                        <div class="table-col">{{dueItemStatics.equityRatio}}%</div>
                        <div class="table-col">{{dueItemStatics.netProfitRate}}%</div>
                    </div>

                </div>
                <p class="small-title ">2、尽调打分</p>
                <div class="table-flex">
                    <div class="table-row">
                        <div class="table-col">一项否决项</div>
                        <div class="table-col">建议方案</div>
                    </div>
                    <div
                        class="table-row"
                        v-for="(item,value) in dueOneTicketVetoVos"
                        :key="value"
                    >
                        <div class="table-col">{{item.indicatorName}}{{item.indicatorType}}{{item.itemName}}</div>
                        <div class="table-col">{{item.proposedPlan}}</div>
                    </div>
                </div>
                <div class="table-flex">
                    <div class="table-row">
                        <div class="table-col">评估指标</div>
                        <div class="table-col">实际得分</div>
                        <div class="table-col">标准分数</div>
                        <div class="table-col">差异</div>
                    </div>

                    <div class="table-row">
                        <div class="table-col">总分</div>
                        <div class="table-col">{{actrualSocre}}</div>
                        <div class="table-col">{{standardScore}}</div>
                        <div class="table-col">{{actrualSocre - standardScore}}</div>
                    </div>
                </div>
                <div class="table-flex">
                    <div class="table-row">
                        <div class="table-col">平台等级</div>
                        <div class="table-col">辅导期</div>
                        <div class="table-col">注资方式</div>
                    </div>

                    <div class="table-row">
                        <div class="table-col">{{dueStandardScoreVo.platformLevel}}</div>
                        <div class="table-col">{{dueStandardScoreVo.coachPeriod}}</div>
                        <div class="table-col">{{dueStandardScoreVo.capitalInjectionWay}}</div>
                    </div>
                </div>
                <p class="small-title ">3、KPI</p>
                <table
                    class="table-example"
                    style="width: 98%;margin: 15px;"
                >
                    <thead>
                        <tr>
                            <td>模块</td>
                            <td>指标</td>
                            <td>结果</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowspan="3">商业尽调</td>
                            <td>销售增长健康度</td>
                            <td>{{dueBusinessBasicVo.salesGrowthHealth | YesOrNo}}</td>
                        </tr>
                        <tr>
                            <td>上游主体切换</td>
                            <td>{{dueBusinessBasicVo.upstreamBodySwitchable | judgeOther(1)}}</td>
                        </tr>
                        <tr>
                            <td>下游客户结构健康度</td>
                            <td>{{dueBusinessBasicVo.downstreamCustomersHealth | YesOrNo}}</td>
                        </tr>
                        <tr>
                            <td rowspan="3">财务尽调</td>
                            <td>资金风险</td>
                            <td>{{dueFinanceBasicVo.fundingRisks | judgeThreeLevel(2)}}</td>
                        </tr>
                        <tr>
                            <td>资金监管</td>
                            <td>{{dueFinanceBasicVo.fundSupervision | judgeOther(2)}}</td>
                        </tr>
                        <tr>
                            <td>仓库托管</td>
                            <td>{{dueFinanceBasicVo.warehouseManaged | YesOrNo}}</td>
                        </tr>
                        <tr>
                            <td rowspan="3">法务尽调</td>
                            <td>尽调公司法律风险</td>
                            <td>{{dueLegalAffairsVo.legalRisksOfCompany | judgeThreeLevel(2)}}</td>
                        </tr>
                        <tr>
                            <td>实际控制人法律风险</td>
                            <td>{{dueLegalAffairsVo.legalRisksOfController | judgeThreeLevel(2)}}</td>
                        </tr>
                        <tr>
                            <td>实际控制人配偶法律风险</td>
                            <td>{{dueLegalAffairsVo.legalRisksOfControllerMate | judgeThreeLevel(2)}}</td>
                        </tr>
                        <tr>
                            <td rowspan="3">组织尽调</td>
                            <td>实际控制人社会风评</td>
                            <td>{{dueOrganizationVo.actualControllerSocialId | judgeThreeLevel(1)}}</td>
                        </tr>
                        <tr>
                            <td>实际控制人对公司的掌控力</td>
                            <td>{{dueOrganizationVo.actualCompanyControllerId | judgeThreeLevel(3)}}</td>
                        </tr>
                        <tr>
                            <td>组织稳定性</td>
                            <td>{{dueOrganizationVo.organizationalStabilityId | judgeThreeLevel(2)}}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="small-title">4、分析报告</p>
                <div class="table-flex">
                    <div class="table-row">
                        <div class="table-col">模块</div>
                        <div class="table-col">风险揭示</div>
                        <div class="table-col">分析描述</div>
                    </div>
                    <div class="table-row">
                        <div class="table-col">商业尽调</div>
                        <div class="table-col">
                            <p>{{dueBusinessBasicVo.riskDisclosure?dueBusinessBasicVo.riskDisclosure:'-'}}</p>
                        </div>
                        <div class="table-col">
                            <p>{{dueBusinessBasicVo.analysisDescription?dueBusinessBasicVo.analysisDescription:'-'}}</p>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-col">财务尽调</div>
                        <div class="table-col">
                            <p>{{dueFinanceBasicVo.riskDisclosure?dueFinanceBasicVo.riskDisclosure:'-'}}</p>
                        </div>
                        <div class="table-col">
                            <p>{{dueFinanceBasicVo.analysisDescription?dueFinanceBasicVo.analysisDescription:'-'}}</p>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-col">法务尽调</div>
                        <div class="table-col">
                            <p>{{dueLegalAffairsVo.riskDisclosure?dueLegalAffairsVo.riskDisclosure:'-'}}</p>
                        </div>
                        <div class="table-col">
                            <p>{{dueLegalAffairsVo.analysisDescription?dueLegalAffairsVo.analysisDescription:'-'}}</p>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-col">组织尽调</div>
                        <div class="table-col">
                            <p>{{dueOrganizationVo.riskDisclosure?dueOrganizationVo.riskDisclosure:'-'}}</p>
                        </div>
                        <div class="table-col">
                            <p>{{dueOrganizationVo.analysisDescription?dueOrganizationVo.analysisDescription:'-'}}</p>
                        </div>
                    </div>
                </div>
                <!--end-->
            </div>
        </div>
    </div>
</template>
<script>
import { getAssessment, getDueapprovalconclusion } from '../api/index.js'
export default {
    data () {
        return {
            activeName: '1',
            actrualSocre: '',
            standardScore: '',
            applyId: this.$route.query.applyId,
            dueBusinessBasicVo: {}, // 商业尽调
            dueFinanceBasicVo: {}, // 财务尽调
            dueLegalAffairsVo: {}, // 法务尽调
            dueOrganizationVo: {}, // 组织尽调
            dueOneTicketVetoVos: [], // 一项否决
            cooperateTarget: {}, // 合作目标
            dueBusiness: {},
            dueFinancial: {},
            dueLegal: {},
            dueOrganization: {},
            roleConclusionVoList: [],
            dueStandardScoreVo: [],
            dueItemStatics: {}, // 审批统计占比
            dueItemRecommend: {} // 结论参考
        }
    },
    computed: {
        companyName () {
            if (this.$store.state.dueDiligence.companyName === '') {
                return localStorage.getItem('companyName')
            }
            return this.$store.state.dueDiligence.companyName
        }
    },
    mounted () {
        this.getDueapprovalconclusion()
        this.getAssessment()
    },
    filters: {
        judgeTureOrFalse (value) {
            if (value === null || value === '' || value === undefined) return '-'
            return value ? '否' : '是'
        },
        judgeThreeLevel (value, arugment) {
            if (value === null || value === '' || value === undefined) return '-'
            if (arugment === 1) return value ? value === 1 ? '良' : '差' : '优'
            if (arugment === 2) return value ? value === 1 ? '中' : '低' : '高'
            if (arugment === 3) return value ? value === 1 ? '中等掌握' : '一般掌握' : '绝对掌握'
        },
        judgeOther (value, arugment) {
            if (value === null || value === '' || value === undefined) return '-'
            if (arugment === 1) return value ? value === 1 ? '1年内切换' : value === 2 ? '1年以上切换' : '无法切换' : '签订投资合同时切换'
            if (arugment === 2) return value ? value === 1 ? '资金监管-高' : value === 2 ? '资金监管-低' : '不接受' : '资金和货物双重监管'
        }
    },
    methods: {
        async getAssessment () {
            const { data } = await getAssessment(this.applyId)
            // console.log(data)
            this.actrualSocre = data.data.actrualSocre
            this.standardScore = data.data.dueStandardScoreVo.standardScore || 0
            this.dueStandardScoreVo = data.data.dueStandardScoreVo
            this.dueBusinessBasicVo = data.data.dueBusinessBasicVo
            this.dueFinanceBasicVo = data.data.dueFinanceBasicVo
            this.dueLegalAffairsVo = data.data.dueLegalAffairsVo
            this.dueOrganizationVo = data.data.dueOrganizationVo
            this.dueOneTicketVetoVos = data.data.dueOneTicketVetoVos
        },
        async getDueapprovalconclusion () {
            const { data } = await getDueapprovalconclusion({ applyId: this.applyId })
            // console.log(data)
            this.cooperateTarget = data.data.cooperateTarget
            this.dueBusiness = data.data.dueBusiness
            this.dueFinancial = data.data.dueFinancial
            this.dueLegal = data.data.dueLegal
            this.dueOrganization = data.data.dueOrganization
            this.roleConclusionVoList = data.data.roleConclusionVoList
            if (data.data.dueItemStatics) {
                Object.keys(data.data.dueItemStatics).forEach(function (key) {
                    data.data.dueItemStatics[key] = (data.data.dueItemStatics[key] * 100).toFixed(2)
                })
            }
            this.dueItemStatics = data.data.dueItemStatics || {}
            this.dueItemRecommend = data.data.dueItemRecommend || {}
        }
    }
}
</script>
<style lang="scss" scoped>
.jd-manage {
    padding: 15px;
    background: #ffffff;
    margin-bottom: 200px;
}
.small-title {
    margin: 0;
    padding: 0;
}
table {
    border-collapse: collapse;
}
table,
tr,
td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
.table-flex {
    margin: 15px;
    display: flex;
    flex-direction: column;
    border: 1px solid #dddddd;
    border-left: none;
    line-height: 36px;
    .table-row {
        display: flex;
        flex-direction: row;
        // justify-content: space-between;
        border-bottom: 1px solid #dddddd;
        // align-items: center;
        // line-height: 36px;
        border-left: 1px solid #dddddd;
        &:first-child{

        }
        &:last-child {
            border-bottom: none;
        }
        &:not(:first-child) {
            .table-col {
                &:not(:first-child) {
                    display: flex;
                    justify-content: center;
                }
            }
        }
        .table-col {
            flex: 1;
            border-left: 1px solid #dddddd;
            text-align: center;
            // overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            word-break: break-all;
            p {

                // line-height: 24px;
                margin: 0;
                padding: 0;
            }
            &:first-child {
                border-left: none;
            }
            .el-input__inner {
                border: none;
            }
            .el-select {
                width: 100%;
            }
        }
    }
}
.table-none{
    .table-row{
        &:first-child{
           background: #ff8b00;
            color: #ffffff
        }
    }
}

.titlt-p {
    font-size: 18px;
    color: #409eff;
    font-weight: 500;
    margin: 0;
}
</style>

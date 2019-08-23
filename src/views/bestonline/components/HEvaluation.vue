<template>
    <div>
        <div>
            <div class="jd-manage">
                <!--start-->
                <p class="small-title">1、尽调评估</p>
                <table>
                    <thead>
                    <tr>
                        <td>评估项</td>
                        <td>可否合作</td>
                        <td>尽调规模</td>
                        <td style="width: 200px">年度递增率</td>
                        <td>股权比例</td>
                        <td style="width: 200px">净利润率</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>合作目标</td>
                        <td>{{cooperateTarget.isCooperate}}</td>
                        <td>{{cooperateTarget.scale}}<i>w</i></td>
                        <td>{{cooperateTarget.yearGrowthRate}}</td>
                        <td>{{cooperateTarget.equityRatio}}</td>
                        <td>{{cooperateTarget.netProfitRate}}</td>
                    </tr>
                    <tr>
                        <td>商业尽调</td>
                        <td>{{dueBusiness.isCooperate}}</td>
                        <td>{{dueBusiness.scale}}</td>
                        <td>{{dueBusiness.yearGrowthRate}}</td>
                        <td>{{dueBusiness.equityRatio}}</td>
                        <td>{{dueBusiness.netProfitRate}}</td>
                    </tr>
                    <tr>
                        <td>财务尽调</td>
                        <td>{{dueFinancial.isCooperate}}</td>
                        <td>{{dueFinancial.scale}}</td>
                        <td>{{dueFinancial.yearGrowthRate}}</td>
                        <td>{{dueFinancial.equityRatio}}</td>
                        <td>{{dueFinancial.netProfitRate}}</td>
                    </tr>
                    <tr>
                        <td>法务尽调</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueLegal.scale}}</td>
                        <td>{{dueLegal.yearGrowthRate}}</td>
                        <td>{{dueLegal.equityRatio}}</td>
                        <td>{{dueLegal.netProfitRate}}</td>
                    </tr>
                    <tr>
                        <td>组织尽调</td>
                        <td>{{dueOrganization.isCooperate}}</td>
                        <td>{{dueOrganization.scale}}</td>
                        <td>{{dueOrganization.yearGrowthRate}}</td>
                        <td>{{dueOrganization.equityRatio}}</td>
                        <td>{{dueOrganization.netProfitRate}}</td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr v-for="item in generalConclusionList" :key="item.index">
                        <td>{{item.createUser}}</td>
                        <td>{{item.isCooperate}}</td>
                        <td>{{item.scale}}</td>
                        <td>{{item.yearGrowthRate}}</td>
                        <td>{{item.equityRatio}}</td>
                        <td>{{item.netProfitRate}}</td>
                    </tr>
                    <tr v-for="item in judgesConclusionList" :key="item.index">
                        <td>{{item.createUser}}</td>
                        <td>{{item.isCooperate}}</td>
                        <td>{{item.scale}}</td>
                        <td>{{item.yearGrowthRate}}</td>
                        <td>{{item.equityRatio}}</td>
                        <td>{{item.netProfitRate}}</td>
                    </tr>
                    <tr v-for="item in caucusConclusionList" :key="item.index">
                        <td>{{item.createUser}}</td>
                        <td>{{item.isCooperate}}</td>
                        <td>{{item.scale}}</td>
                        <td>{{item.yearGrowthRate}}</td>
                        <td>{{item.equityRatio}}</td>
                        <td>{{item.netProfitRate}}</td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td>参考结论</td>
                        <td>{{dueItemRecommend.isCooperate}}</td>
                        <td>{{dueItemRecommend.scale}}</td>
                        <td>{{dueItemRecommend.yearGrowthRate}}</td>
                        <td>{{dueItemRecommend.equityRatio}}</td>
                        <td>{{dueItemRecommend.netProfitRate}}</td>
                    </tr>
                    <tr>
                        <td>占比</td>
                        <td>{{dueItemStatics.isCooperate}}<i>%</i></td>
                        <td>{{dueItemStatics.scale}}<i>%</i></td>
                        <td>{{dueItemStatics.yearGrowthRate}}<i>%</i></td>
                        <td>{{dueItemStatics.equityRatio}}<i>%</i></td>
                        <td>{{dueItemStatics.netProfitRate}}<i>%</i></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <td colspan="5">CEO审批信息</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>可否合作</td>
                        <td>尽调规模</td>
                        <td style="width: 200px">年度递增率</td>
                        <td>股权比例</td>
                        <td style="width: 200px">净利润率</td>
                    </tr>
                    <tr>
                        <td>{{ceoConclusionList.isCooperate}}</td>
                        <td>{{ceoConclusionList.scale}}</td>
                        <td>{{ceoConclusionList.yearGrowthRate}}</td>
                        <td>{{ceoConclusionList.equityRatio}}</td>
                        <td>{{ceoConclusionList.netProfitRate}}</td>
                    </tr>
                    <tr>
                        <td>审批意见</td>
                        <td colspan="4">{{ceoConclusionList.approvalOpinion}}</td>
                    </tr>
                    </tbody>
                </table>
                <p class="small-title ">2、尽调打分</p>
                <table>
                    <thead>
                    <tr>
                        <td>一项否决项</td>
                        <td>建议方案</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in dueOneTicketVetoVos" :key="item.index">
                        <td>{{item.indicatorName}}{{item.indicatorType}}{{item.itemName}}</td>
                        <td>{{item.proposedPlan}}</td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <td>评估指标</td>
                        <td>实际得分</td>
                        <td>标准分数</td>
                        <td>差异</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>总分</td>
                        <td>{{actrualSocre}}</td>
                        <td>{{standardScore}}</td>
                        <td>{{actrualSocre - standardScore}}</td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <td>平台等级</td>
                        <td>辅导期</td>
                        <td>注资方式</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{dueStandardScoreVo.platformLevel}}</td>
                        <td>{{dueStandardScoreVo.coachPeriod}}</td>
                        <td>{{dueStandardScoreVo.capitalInjectionWay}}</td>
                    </tr>
                    </tbody>
                </table>
                <p class="small-title ">3、KPI</p>
                <table>
                    <thead>
                    <tr>
                        <td>模块</td>
                        <td>指标</td>
                        <td>结果</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td rowspan="2">商业尽调</td>
                        <td>批发：零售：工程占比</td>
                        <td>{{}}</td>
                    </tr>
                    <tr>
                        <td>上年销售业业绩</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="2">财务尽调</td>
                        <td>资产负债率</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>净利率</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="5">财务尽调</td>
                        <td>尽调公司法律风险</td>
                        <td>{{dueLegalAffairsVo.legalRisksOfCompany}}</td>
                    </tr>
                    <tr>
                        <td>实际控制人法律风险</td>
                        <td>{{dueLegalAffairsVo.legalRisksOfController}}</td>
                    </tr>
                    <tr>
                        <td>实际控制人配偶法律风险</td>
                        <td>{{dueLegalAffairsVo.legalRisksOfControllerMate}}</td>
                    </tr>
                    <tr>
                        <td>个人经营性借款及担保总额</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>公司借款及担保总额</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="5">组织尽调</td>
                        <td>实际控制人社会风评</td>
                        <td>{{dueOrganizationVo.actualControllerSocialId}}</td>
                    </tr>
                    <tr>
                        <td>实际控制人对公司的掌控力</td>
                        <td>{{dueOrganizationVo.actualCompanyControllerId}}</td>
                    </tr>
                    <tr>
                        <td>组织稳定性</td>
                        <td>{{dueOrganizationVo.organizationalStabilityId}}</td>
                    </tr>
                    <tr>
                        <td>组织综合评分</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>实际控制人综合评分</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <p class="small-title">4、分析报告</p>
                <table>
                    <thead>
                    <tr>
                        <td>模块</td>
                        <td>风险揭示</td>
                        <td>分析描述</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>商业尽调</td>
                        <td>{{dueBusinessBasicVo.riskDisclosure?dueBusinessBasicVo.riskDisclosure:'-'}}</td>
                        <td>{{dueBusinessBasicVo.analysisDescription?dueBusinessBasicVo.analysisDescription:'-'}}</td>
                    </tr>
                    <tr>
                        <td>财务尽调</td>
                        <td>{{dueFinanceBasicVo.riskDisclosure?dueFinanceBasicVo.riskDisclosure:'-'}}</td>
                        <td>{{dueFinanceBasicVo.analysisDescription?dueFinanceBasicVo.analysisDescription:'-'}}</td>
                    </tr>
                    <tr>
                        <td>法务尽调</td>
                        <td>{{dueLegalAffairsVo.riskDisclosure?dueLegalAffairsVo.riskDisclosure:'-'}}</td>
                        <td>{{dueLegalAffairsVo.analysisDescription?dueLegalAffairsVo.analysisDescription:'-'}}</td>
                    </tr>
                    <tr>
                        <td>组织尽调</td>
                        <td>{{dueOrganizationVo.riskDisclosure?dueOrganizationVo.riskDisclosure:'-'}}</td>
                        <td>{{dueOrganizationVo.analysisDescription?dueOrganizationVo.analysisDescription:'-'}}</td>
                    </tr>
                    </tbody>
                </table>
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
            ceoConclusionList: [], // CEO审批信息
            dueItemStatics: {}, // 审批统计占比
            dueItemRecommend: {}, // 结论参考
            generalConclusionList: [], // 分总和大区总的审批结论
            judgesConclusionList: [], // 尽调评审委员会结论
            caucusConclusionList: []// 尽调决策委员会结论
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
        this.getAssessment()
        this.getDueapprovalconclusion()
    },
    methods: {
        async getAssessment () {
            const { data } = await getAssessment(this.applyId)
            console.log(data)
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
            console.log(data)
            console.log(data.data.ceoConclusionList)
            this.cooperateTarget = data.data.cooperateTarget
            this.dueBusiness = data.data.dueBusiness
            this.dueFinancial = data.data.dueFinancial
            this.dueLegal = data.data.dueLegal
            this.dueOrganization = data.data.dueOrganization
            this.generalConclusionList = data.data.generalConclusionList
            this.judgesConclusionList = data.data.judgesConclusionList
            this.caucusConclusionList = data.data.caucusConclusionList
            this.roleConclusionVoList = data.data.roleConclusionVoList
            this.ceoConclusionList = data.data.ceoConclusionList
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
        margin-top: 11px;
        width: 100%;
        text-align: center;

        thead{
            background: #f28a31;
        }

        tr {
            line-height: 29px;
            height: 50px;
            border: 1px solid #dddddd;

            td {
                border: 1px solid #dddddd;
            }
        }
    }
</style>

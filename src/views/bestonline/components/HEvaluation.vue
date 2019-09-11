<template>
    <div class="jd-manage">
        <!--start-->
        <p class="small-title" style="margin-top: 0">1、尽调评估</p>
        <table>
            <thead>
                <tr>
                    <td style="width: 150px">评估项</td>
                    <td style="width: 120px">可否合作</td>
                    <td>尽调规模</td>
                    <td style="width: 200px">年度递增率</td>
                    <td style="width: 120px">股权比例</td>
                    <td style="width: 200px">净利润率</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>合作目标</td>
                    <td>-</td>
                    <td>{{cooperateTarget.scale}}<i>w</i></td>
                    <td>{{cooperateTarget.yearGrowthRate}}</td>
                    <td>{{cooperateTarget.equityRatio}}</td>
                    <td>{{cooperateTarget.netProfitRate}}</td>
                </tr>
                <tr>
                    <td>商业尽调</td>
                    <td>{{dueBusiness.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{dueBusiness.scale | judgeTureOrFalse}}</td>
                    <td>{{dueBusiness.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td>{{dueBusiness.equityRatio | judgeTureOrFalse}}</td>
                    <td>{{dueBusiness.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
                <tr>
                    <td>财务尽调</td>
                    <td>{{dueFinancial.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{dueFinancial.scale | judgeTureOrFalse}}</td>
                    <td>{{dueFinancial.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td>{{dueFinancial.equityRatio | judgeTureOrFalse}}</td>
                    <td>{{dueFinancial.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
                <tr>
                    <td>法务尽调</td>
                    <td>{{dueLegal.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{dueLegal.scale | judgeTureOrFalse}}</td>
                    <td>{{dueLegal.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td>{{dueLegal.equityRatio | judgeTureOrFalse}}</td>
                    <td>{{dueLegal.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
                <tr>
                    <td>组织尽调</td>
                    <td>{{dueOrganization.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{dueOrganization.scale | judgeTureOrFalse}}</td>
                    <td>{{dueOrganization.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td>{{dueOrganization.equityRatio | judgeTureOrFalse}}</td>
                    <td>{{dueOrganization.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
            </tbody>
        </table>

        <table>
            <tbody>
                <tr v-for="item in generalConclusionList" :key="item.index">
                    <td style="width: 150px">{{item.createUser}}</td>
                    <td style="width: 120px">{{item.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{item.scale | judgeTureOrFalse}}</td>
                    <td style="width: 200px">{{item.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td style="width: 120px">{{item.equityRatio | judgeTureOrFalse}}</td>
                    <td style="width: 200px">{{item.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
                <tr v-for="item in judgesConclusionList" :key="item.index">
                    <td>{{item.createUser}}</td>
                    <td>{{item.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{item.scale | judgeTureOrFalse}}</td>
                    <td>{{item.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td>{{item.equityRatio | judgeTureOrFalse}}</td>
                    <td>{{item.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
                <tr v-for="item in caucusConclusionList" :key="item.index">
                    <td>{{item.createUser}}</td>
                    <td>{{item.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{item.scale | judgeTureOrFalse}}</td>
                    <td>{{item.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td>{{item.equityRatio | judgeTureOrFalse}}</td>
                    <td>{{item.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
            </tbody>
        </table>

        <table>
            <tbody>
                <tr>
                    <td style="width: 150px">参考结论</td>
                    <td style="width: 120px">{{dueItemRecommend.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{dueItemRecommend.scale | judgeTureOrFalse}}</td>
                    <td style="width: 200px">{{dueItemRecommend.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td style="width: 120px">{{dueItemRecommend.equityRatio | judgeTureOrFalse}}</td>
                    <td style="width: 200px">{{dueItemRecommend.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
                <tr>
                    <td>占比</td>
                    <td>{{dueItemStatics.isCooperate?dueItemStatics.isCooperate+'%':'-'}}</td>
                    <td>{{dueItemStatics.scale?dueItemStatics.scale+'%':'-'}}</td>
                    <td>{{dueItemStatics.yearGrowthRate?dueItemStatics.yearGrowthRate+'%':'-'}}</td>
                    <td>{{dueItemStatics.equityRatio?dueItemStatics.equityRatio+'%':'-'}}</td>
                    <td>{{dueItemStatics.netProfitRate?dueItemStatics.netProfitRate+'%':'-'}}</td>
                </tr>
            </tbody>
        </table>

        <!--       CEO审批信息 -->
        <table>
            <thead>
                <tr>
                    <td colspan="6">CEO审批信息</td>
                </tr>
            </thead>
            <tbody v-for="(item,index) in ceoConclusionList" :key="index">
                <tr v-if="index == 0">
                    <td>可否合作</td>
                    <td>尽调规模</td>
                    <td style="width: 200px">年度递增率</td>
                    <td>股权比例</td>
                    <td style="width: 200px">净利润率</td>
                </tr>
                <tr>
                    <td>{{item.isCooperate | judgeTureOrFalse}}</td>
                    <td>{{item.scale | judgeTureOrFalse}}</td>
                    <td>{{item.yearGrowthRate | judgeTureOrFalse}}</td>
                    <td>{{item.equityRatio | judgeTureOrFalse}}</td>
                    <td>{{item.netProfitRate | judgeTureOrFalse}}</td>
                </tr>
                <tr>
                    <td>审批意见</td>
                    <td colspan="4">{{item.approvalOpinion?item.approvalOpinion:'-'}}</td>
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
                    <td><span @click="showSocreDetial" style="color: #49b3f3;cursor: pointer">{{actrualSocre}}</span></td>
                    <td>{{standardScore}}</td>
                    <td :class="(actrualSocre - standardScore)<=0?'red':'black'">{{actrualSocre - standardScore}}</td>
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
                    <td v-if="dueBusinessBasicVo.wholesaleShare === null && dueBusinessBasicVo.retailShare === null && dueBusinessBasicVo.projectShare === null">
                        -
                    </td>
                    <td v-else>
                        {{dueBusinessBasicVo.wholesaleShare}}：{{dueBusinessBasicVo.retailShare}}：{{dueBusinessBasicVo.projectShare}}
                    </td>
                </tr>
                <tr>
                    <td>上年销售业业绩</td>
                    <td>{{(dueBusinessBasicVo.salesPerformanceLastYear === null)?'-':dueBusinessBasicVo.salesPerformanceLastYear}}</td>
                </tr>
                <tr>
                    <td rowspan="2">财务尽调</td>
                    <td>资产负债率</td>
                    <td>
                        本年度{{dueFinanceBasicVo.assetLiabilityRatio ? dueFinanceBasicVo.assetLiabilityRatio + '%' : '-'}}
                        <br>
                        上年度{{dueFinanceBasicVo.assetLiabilityRatioL ? dueFinanceBasicVo.assetLiabilityRatioL + '%' : '-'}}
                    </td>
                </tr>
                <tr>
                    <td>净利率</td>
                    <td>
                        本年度{{dueFinanceBasicVo.profitRatio === null?'-':dueFinanceBasicVo.profitRatio + '%'}}
                        <br>
                        上年度{{dueFinanceBasicVo.profitRatioL === null?'-':dueFinanceBasicVo.profitRatioL + '%'}}
                    </td>
                </tr>
                <tr>
                    <td rowspan="5">财务尽调</td>
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
                    <td>个人经营性借款及担保总额</td>
                    <td>{{dueLegalAffairsVo.personalOperatingloansTotalGuarantees === null?'-':dueLegalAffairsVo.personalOperatingloansTotalGuarantees+'万'}}</td>
                </tr>
                <tr>
                    <td>公司借款及担保总额</td>
                    <td>{{dueLegalAffairsVo.companyLoanTotalGuarantee === null?'-':dueLegalAffairsVo.companyLoanTotalGuarantee+'万'}}</td>
                </tr>
                <tr>
                    <td rowspan="5">组织尽调</td>
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
                <tr>
                    <td>组织综合评分</td>
                    <td>{{dueOrganizationVo.organizationScore=== null?'-':dueOrganizationVo.organizationScore}}</td>
                </tr>
                <tr>
                    <td>实际控制人综合评分</td>
                    <td>{{dueOrganizationVo.actualControllerScore===null?'-':dueOrganizationVo.actualControllerScore}}</td>
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
        <!--                得分详情dialog-->
        <el-dialog title="得分详情" :visible.sync="dialogTableVisible" center>
            <table>
                <thead>
                    <tr>
                        <td style="width: 240px">指标</td>
                        <td>实际值</td>
                        <td>得分</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in achieveScoreDtos" :key="item.index">
                        <td>{{item.indicatorName}}</td>
                        <td>{{item.realValue}}{{item.unit}}</td>
                        <td>{{item.score}}</td>
                    </tr>
                    <tr>
                        <td>总分</td>
                        <td colspan="2">{{totalScore}}</td>
                    </tr>
                </tbody>
            </table>
        </el-dialog>
    </div>
</template>
<script>
import { getAssessment, getDueapprovalconclusion } from '../api/index.js'

export default {
    data () {
        return {
            activeName: '1',
            dialogTableVisible: false,
            whether: ['是', '否'],
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
            achieveScoreDtos: [], // 得分详情
            totalScore: '', // 得分详情总分
            ceoConclusionList: [], // CEO审批信息
            dueItemStatics: {}, // 审批统计占比
            dueItemRecommend: {}, // 结论参考
            generalConclusionList: [], // 分总和大区总的审批结论
            judgesConclusionList: [], // 尽调评审委员会结论
            caucusConclusionList: [], // 尽调决策委员会结论
            assetLiabilityRatio: ''
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
    filters: {
        judgeTureOrFalse (value) {
            if (value === null || value === '' || value === undefined) return '-'
            return value == 0 ? '是' : value == 1 ? '否' : value == 2 ? '平' : '-'
        },
        judgeThreeLevel (value, arugment) {
            if (value === null || value === '' || value === undefined) return '-'
            if (arugment === 1) return value ? value === 1 ? '良' : '差' : '优'
            if (arugment === 2) return value ? value === 1 ? '中' : '低' : '高'
            if (arugment === 3) return value ? value === 1 ? '中等掌握' : '一般掌握' : '绝对掌握'
        }
    },
    methods: {
        showSocreDetial () {
            this.dialogTableVisible = true
        },
        async getAssessment () {
            const { data } = await getAssessment(this.applyId)
            this.actrualSocre = data.data.actrualSocre
            this.standardScore = data.data.dueStandardScoreVo.standardScore || 0
            this.dueStandardScoreVo = data.data.dueStandardScoreVo
            this.dueBusinessBasicVo = data.data.dueBusinessBasicVo
            this.dueFinanceBasicVo = data.data.dueFinanceBasicVo
            this.dueLegalAffairsVo = data.data.dueLegalAffairsVo
            this.dueOrganizationVo = data.data.dueOrganizationVo
            this.dueOneTicketVetoVos = data.data.dueOneTicketVetoVos
            this.achieveScoreDtos = data.data.achieveScoreDetail.achieveScoreDtos
            this.totalScore = data.data.achieveScoreDetail.totalScore
        },
        async getDueapprovalconclusion () {
            const { data } = await getDueapprovalconclusion({ applyId: this.applyId })
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
    padding: 0 15px;
    background: #ffffff;
    margin-bottom: 200px;

    .small-title {
        padding: 10px;
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 17px;
        line-height: 40px;
        background: #fafafa;
    }

    table {
        border-collapse: collapse;
        margin-top: 10px;
        width: 100%;
        text-align: center;

        .noborder {
            border: none;
        }

        thead {
            background: #f2f2f4;
        }

        tr {
            line-height: 29px;
            height: 50px;

            td {
                border: 1px solid #dddddd;
            }
        }
    }
}
.red {
    color: red;
}
.black {
    color: #000000;
}
</style>

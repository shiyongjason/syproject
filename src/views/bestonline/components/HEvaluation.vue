<template>
    <div class="evaluation_kpl">
        <div class="jd-manage">
            <p class="small-title">1、尽调评估</p>

            <table>
                <thead>
                    <tr>
                        <td>评估项</td>
                        <td>合作目标</td>
                        <td>商业尽调</td>
                        <td>财务尽调</td>
                        <td>法务尽调</td>
                        <td>组织尽调</td>
                        <td>分部发展</td>
                        <td>总部发展</td>
                        <td>结论参考</td>
                        <td>占比</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>可否合作</td>
                        <td>{{cooperateTarget.isCooperate}}</td>
                        <td>{{dueBusiness.isCooperate}}</td>
                        <td>{{dueFinancial.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueOrganization.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueItemRecommend.isCooperate}}</td>
                        <td>占比</td>
                    </tr>
                    <tr>
                        <td>尽调规模</td>
                        <td>{{cooperateTarget.isCooperate}}</td>
                        <td>{{dueBusiness.isCooperate}}</td>
                        <td>{{dueFinancial.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueOrganization.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueItemRecommend.isCooperate}}</td>
                        <td>占比</td>
                    </tr>
                    <tr>
                        <td>年度递增率</td>
                        <td>{{cooperateTarget.isCooperate}}</td>
                        <td>{{dueBusiness.isCooperate}}</td>
                        <td>{{dueFinancial.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueOrganization.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueItemRecommend.isCooperate}}</td>
                        <td>占比</td>
                    </tr>
                    <tr>
                        <td>股权比例</td>
                        <td>{{cooperateTarget.isCooperate}}</td>
                        <td>{{dueBusiness.isCooperate}}</td>
                        <td>{{dueFinancial.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueOrganization.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueItemRecommend.isCooperate}}</td>
                        <td>占比</td>
                    </tr>
                    <tr>
                        <td>净利润率</td>
                        <td>{{cooperateTarget.isCooperate}}</td>
                        <td>{{dueBusiness.isCooperate}}</td>
                        <td>{{dueFinancial.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueOrganization.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueLegal.isCooperate}}</td>
                        <td>{{dueItemRecommend.isCooperate}}</td>
                        <td>占比</td>
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
                        <td>签约规模</td>
                        <td>年度递增率</td>
                        <td>净利润率</td>
                        <td>股权比例</td>
                    </tr>
                    <tr>
                        <td>是</td>
                        <td>2000w</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td style="width: 100px">审批意见</td>
                        <td colspan="4" class="CEOOption">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</td>
                    </tr>
                </tbody>
            </table>

            <!-- <div class="table-flex  table-none">
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
            </div> -->

            <!-- <div class="table-flex">
                <div class="table-row" v-for="(item,value) in roleConclusionVoList" :key="value">
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
            </div> -->
            <p class="small-title ">2、尽调打分</p>
            <table>
                <thead>
                    <tr>
                        <td>一项否决项</td>
                        <td>建议方案</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>营收规模&gt;1000w</td>
                        <td>会员店</td>
                    </tr>
                    <tr>
                        <td>资产负债率&lt;70%</td>
                        <td>不合作</td>
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
                        <td style="cursor: pointer;" @click="scoreDetail">
                            <i>20</i>
                        </td>
                        <td>45</td>
                        <td>-25</td>
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
                        <td>A</td>
                        <td>2个月</td>
                        <td>50%</td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="table-flex">
                <div class="table-row">
                    <div class="table-col">一项否决项</div>
                    <div class="table-col">建议方案</div>
                </div>
                <div class="table-row" v-for="(item,value) in dueOneTicketVetoVos" :key="value">
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
            </div> -->
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
                        <td>1:1:1</td>
                    </tr>
                    <tr>
                        <td>上年销售业业绩</td>
                        <td>2000万</td>
                    </tr>
                    <tr>
                        <td rowspan="2">财务尽调</td>
                        <td>资产负债率</td>
                        <td style="line-height: normal">本年度：30%<br>上年度：20%</td>
                    </tr>
                    <tr>
                        <td>净利率</td>
                        <td style="line-height: normal">本年度：30%<br>上年度：20%</td>
                    </tr>
                    <tr>
                        <td rowspan="5">法务尽调</td>
                        <td>尽调公司法律风险</td>
                        <td>高</td>
                    </tr>
                    <tr>
                        <td>实际控制人法律风险</td>
                        <td>高</td>
                    </tr>
                    <tr>
                        <td>实际控制人配偶法律风险</td>
                        <td>高</td>
                    </tr>
                    <tr>
                        <td>个人经营性借款及担保总额</td>
                        <td>2000万</td>
                    </tr>
                    <tr>
                        <td>公司借款及担保总额</td>
                        <td>2000万</td>
                    </tr>
                    <tr>
                        <td rowspan="5">组织尽调</td>
                        <td>实际控制人社会风评</td>
                        <td>中</td>
                    </tr>
                    <tr>
                        <td>实际控制人对公司的掌控力</td>
                        <td>一般掌控</td>
                    </tr>
                    <tr>
                        <td>组织稳定性</td>
                        <td>高</td>
                    </tr>
                    <tr>
                        <td>组织综合评分</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>实际控制人综合评分</td>
                        <td>22</td>
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
                        <td>多吃洒出贵啊上次啊是</td>
                        <td>多吃洒出贵啊上次啊是</td>
                    </tr>
                    <tr>
                        <td>财务尽调</td>
                        <td>多吃洒出贵啊上次啊是</td>
                        <td>多吃洒出贵啊上次啊是</td>
                    </tr>
                    <tr>
                        <td>法务尽调</td>
                        <td>多吃洒出贵啊上次啊是</td>
                        <td>多吃洒出贵啊上次啊是</td>
                    </tr>
                    <tr>
                        <td>组织尽调</td>
                        <td>多吃洒出贵啊上次啊是</td>
                        <td>多吃洒出贵啊上次啊是</td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="table-flex">
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
            </div> -->
            <!--end-->
            <el-dialog title="得分详情" :visible.sync="dialogVisible" width='750px' center :close-on-click-modal=false>
                <table>
                    <tr>
                        <td>指标</td>
                        <td>实际值</td>
                        <td>得分</td>
                    </tr>
                    <tr>
                        <td>签约规模</td>
                        <td>2000万</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>资产负债率</td>
                        <td>20%</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>资金监管</td>
                        <td>==资金和货物双重监管</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>仓库监管</td>
                        <td>允许</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>法律风险</td>
                        <td>高</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>合资公司业务规划匹配度</td>
                        <td>高</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>合资公司下游业务的迁移计划</td>
                        <td>明确</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>总分</td>
                        <td colspan="2">33</td>
                    </tr>
                </table>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { getAssessment, getDueapprovalconclusion } from '../api/index.js'
export default {
    data () {
        return {
            dialogVisible: false,
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
        // this.getAssessment()
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
            console.log(data)
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
        },
        scoreDetail () {
            this.dialogVisible = true
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
table{
    width: 90%;
    margin: 0 auto;
    thead{
        background-color: #F59A23;
    }
    tbody{
        .CEOOption{
            line-height: normal;
            text-align: left;
            padding: 10px;
        }
        i{
            font-style: normal;
            color: blue;
        }
    }
}
</style>

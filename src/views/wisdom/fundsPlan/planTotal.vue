<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title"> 查询期间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="params.selectTime" type="month"  value-format='yyyyMM' placeholder="请选择时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <HAutocomplete :selectArr="branchList" :disabled='!this.branch' @back-event="backPlat"
                                   placeholder="请选择分部" :selectObj="selectPlatObj" :maxlength='30'
                                   :canDoBlurMethos='false'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="queryAndChangeTime(params)">
                        搜索
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onReset">
                        重置
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onExport">
                        导出汇总表
                    </el-button>
                </div>
            </div>
        </div>
        <div class="tips">
            <p><b>{{paramTargetDate.year}}</b>年<b>{{paramTargetDate.mouth}}</b>月<span class="right">单位：万元</span></p>
        </div>
        <div class="page-body-cont">
            <hosJoyTable ref="hosjoyTable" border stripe :column="columnData" :data="planTotalList" align="center"
                         :total="page.total">
                <template slot="organizationName" slot-scope="scope">
                    <a :class="scope.data.row.cellType === 1 && scope.data.row.planId ? 'light' : ''" @click="goDetail(scope.data.row.planId, scope.data.row.cellType === 1)" type="primary">{{scope.data.row.organizationName}}</a>
                </template>
            </hosJoyTable>
        </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { summarySheet } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { mapState, mapGetters, mapActions } from 'vuex'
import { downloadPlanTotalList } from './api/index'
import { clearCache, newCache } from '@/utils/index'
import moment from 'moment'

export default {
    name: 'planTotal',
    mixins: [departmentAuth],
    components: {
        hosJoyTable,
        HAutocomplete
    },
    data () {
        return {
            params: {
                selectTime: '',
                subsectionCode: ''
            },
            platComList: [],
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            },
            page: {
                total: 0
            },
            paramTargetDate: {
                year: '',
                mouth: ''
            }
        }
    },
    computed: {
        ...mapState({
            branchList: state => state.branchList
        }),
        ...mapGetters({
            planTotalList: 'fundsPlan/planTotalList',
            targetTime: 'fundsPlan/targetTime'
        }),
        columnData () {
            return summarySheet(this.paramTargetDate.year, this.paramTargetDate.mouth)
        }
    },
    methods: {
        goDetail (id, go) {
            go && id && this.$router.push({
                path: '/fundsPlan/approveDeclare',
                query: {
                    id: id,
                    source: 'planTotal'
                }
            })
        },
        async queryAndChangeTime (params) {
            if (!params.selectTime) params.selectTime = moment(this.targetTime.businessDate).format('YYYYMM')
            this.paramTargetDate = {
                year: params.selectTime.slice(0, 4),
                mouth: params.selectTime.slice(4)
            }
            try {
                await this.findPlanTotalList(params)
            } catch (e) {
                this.paramTargetDate = {
                    year: params.selectTime.slice(0, 4),
                    mouth: params.selectTime.slice(4)
                }
            }
        },
        backPlat (val) {
            this.params.subsectionCode = val.value.selectCode
        },
        onReset () {
            this.selectPlatObj = {
                selectCode: '',
                selectName: ''
            }
            this.params.subsectionCode = ''
            this.params.selectTime = this.targetTime
            this.queryAndChangeTime(this.params)
        },
        onExport () {
            const params = {
                subsectionCode: this.params.subsectionCode,
                selectTime: this.params.selectTime
            }
            downloadPlanTotalList(params)
        },
        ...mapActions({
            findPlanTotalList: 'fundsPlan/findPlanTotalList',
            findTargetTime: 'fundsPlan/findTargetTime'
        })
    },
    async mounted () {
        await this.findTargetTime()
        this.params.selectTime = this.targetTime
        await this.newBossAuth(['F'])
        this.queryAndChangeTime(this.params)
    },
    beforeRouteEnter (to, from, next) {
        newCache('planTotal')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'approveDeclare') {
            clearCache('planTotal')
        }
        next()
    }
}
</script>

<style scoped lang="scss">
    .tips {

        background: #ffffff;
        p {
            max-width: 1000px;
            margin: auto;
            line-height: 100px;
            text-align: center;

            b {
                color: red;
                padding: 0 5px;
            }
            .right{
                float: right;
            }
        }
    }
    .light {
        color: #FF7A45;
        cursor: pointer;
    }
</style>

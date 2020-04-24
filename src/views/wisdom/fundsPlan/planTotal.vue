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
                                   placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30'
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
                         :total="page.total"></hosJoyTable>
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
                subSectionCode: ''
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
            planTotalList: 'fundsPlan/planTotalList'
        }),
        columnData () {
            return summarySheet(new Date().getFullYear(), new Date().getMonth() + 1)
        }
    },
    methods: {
        async queryAndChangeTime (params) {
            this.paramTargetDate = {
                year: this.params.selectTime.slice(0, 4),
                mouth: this.params.selectTime.slice(4)
            }
            try {
                await this.findPlanTotalList(params)
            } catch (e) {
                this.paramTargetDate = {
                    year: new Date().getFullYear(),
                    mouth: new Date().getMonth() + 1
                }
            }
        },
        backPlat (val) {
            this.params.subsectionCode = val.value.selectCode
        },
        onReset () {
            this.params.selectTime = new Date().getFullYear() + '' + (new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1))
            this.selectPlatObj = {
                selectCode: '',
                selectName: ''
            }
        },
        onExport () {
            const params = {
                subsectionCode: this.params.subSectionCode,
                selectTime: this.params.selectTime
            }
            console.log(params)
            downloadPlanTotalList(params)
        },
        ...mapActions({
            findPlanTotalList: 'fundsPlan/findPlanTotalList'
        })
    },
    async mounted () {
        this.params.selectTime = this.$options.filters.formatDate(Date.now(), 'YYYYMM')
        await this.oldBossAuth()
        this.queryAndChangeTime(this.params)
        if (this.userInfo.deptType === 2) {
            this.selectPlatObj.selectCode = this.branchList[0].crmDeptCode
            this.selectPlatObj.selectName = this.branchList[0].deptName
        }
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
</style>

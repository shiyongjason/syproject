<template>
    <div class="page-body approval">
        <div>
            <el-tabs v-model="queryParams.selectType" type="card" @tab-click="handleClick">
                <el-tab-pane label="平台公司资金用信情况" name="0"></el-tab-pane>
                <el-tab-pane label="分部资金用信情况" name="1"></el-tab-pane>
            </el-tabs>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col" v-if="region">
                    <div class="query-col-title">大区：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="regionList" @back-event="backPlat($event,'D')" placeholder="请输入大区名称" :selectObj="selectAuth.regionObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" v-if="branch">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" v-if="district">
                    <div class="query-col-title">区域：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="areaList" @back-event="backPlat($event,'Q')" placeholder="请输入区域名称" :selectObj="selectAuth.areaObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">年份：</div>
                    <el-date-picker v-model="queryParams.selectTime" type="month" value-format='yyyyMM' placeholder="选择年" :editable='false' :clearable='false'>
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="btnQuery({...queryParams, pageSize:10, pageNumber: 1})">
                            搜索
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onReset">
                            重置
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onExport">
                            导出表格
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="tips">
                <p><b>{{paramTargetDate.year}}</b>年<b>{{paramTargetDate.mouth}}</b>月<span class="right">单位：万元</span></p>
            </div>
            <div class="page-body-cont">
                <hosJoyTable v-if="reRender" ref="hosjoyTable" border stripe showPagination :column="columnData" :data="planCreditList" align="center" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="planCreditPagination.total" @pagination="getList">
                    <!--                    <template slot="annualTotalEffectiveRate" slot-scope="scope">-->
                    <!--                        {{scope.data.row.annualTotalEffectiveRate * 100}}%-->
                    <!--                    </template>-->
                    <!--                    <template slot="annualTotalProfitAchieveRate" slot-scope="scope">-->
                    <!--                        {{scope.data.row.annualTotalProfitAchieveRate * 100}}%-->
                    <!--                    </template>-->
                    <!--                    <template slot="annualTotalSaleAchieveRate" slot-scope="scope">-->
                    <!--                        {{scope.data.row.annualTotalSaleAchieveRate * 100}}%-->
                    <!--                    </template>-->
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { departmentAuth } from '@/mixins/userAuth'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { mapActions, mapGetters, mapState } from 'vuex'
import { exportPlanCredit } from './api'
import { planCreditLabel } from './const'
import { PLAN_CREDIT_TABLE_COLUMN } from '../../../utils/auth_const'

export default {
    name: 'planCredit',
    components: { HAutocomplete, hosJoyTable },
    mixins: [departmentAuth],
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            areaList: state => state.areaList,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        }),
        ...mapGetters({
            targetTime: 'fundsPlan/targetTime',
            planCreditList: 'fundsPlan/planCreditList',
            planCreditPagination: 'fundsPlan/planCreditPagination',
            planCreditTotal: 'fundsPlan/planCreditTotal'
        })
    },
    data () {
        return {
            queryParams: {
                selectType: '0',
                selectTime: '0',
                regionCode: '',
                companyName: '',
                misCode: '',
                subsectionCode: '',
                pageNumber: 1,
                pageSize: 10
            },
            selectAuth: {
                regionObj: {
                    selectCode: '',
                    selectName: ''
                },
                areaObj: {
                    selectCode: '',
                    selectName: ''
                },
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
            columnData: [],
            paramTargetDate: {
                year: '',
                mouth: ''
            },
            tabSwitch: false,
            hasAuth: !this.hosAuthCheck(PLAN_CREDIT_TABLE_COLUMN),
            reRender: false
        }
    },
    methods: {
        btnQuery (params) {
            this.queryParamsTemp = { ...params }
            this.onQuery(params)
        },
        getList (val) {
            this.onQuery({ ...this.queryParamsTemp, ...val })
        },
        async onQuery (params) {
            this.paramTargetDate = {
                year: params.selectTime.slice(0, 4),
                mouth: params.selectTime.slice(4)
            }
            this.findPlanCreditList(params)
            await this.findPlanCreditTotal(params)
            const columnData = planCreditLabel(this.tabSwitch, this.hasAuth)
            columnData.forEach((value, index) => {
                if (index > 3) {
                    value.children.forEach((val) => {
                        if (this.planCreditTotal && (this.planCreditTotal[val.prop] || this.planCreditTotal[val.prop] === 0)) {
                            val.label = String(this.planCreditTotal[val.prop])
                        } else {
                            val.label = '-'
                        }
                    })
                }
            })
            this.columnData = columnData
            this.reRender = true
        },
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'D') {
                this.queryParams.subsectionCode = ''
                this.queryParams.companyName = ''
                this.selectAuth.branchObj = { ...obj }
                this.selectAuth.areaObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'F') {
                this.queryParams.companyName = ''
                this.selectAuth.areaObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'Q') {
                this.queryParams.misCode = ''
                this.selectAuth.platformObj = { ...obj }
            }
        },
        handleClick () {
            this.reRender = false
            this.tabSwitch = this.queryParams.selectType !== '0'
            this.onReset()
        },
        onReset () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.queryParams.companyName = ''
            this.queryParams.subsectionCode = ''
            this.queryParams.regionCode = ''
            this.queryParams.selectTime = this.targetTime
            this.queryParams.pageSize = 10
            this.queryParams.pageNumber = 1
            this.queryParams.subRegionCode = ''
            this.queryParams.misCode = ''
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            this.selectAuth.platformObj = { ...obj }
            this.selectAuth.areaObj = { ...obj }
            this.btnQuery(this.queryParams)
            this.newBossAuth()
        },
        onExport () {
            exportPlanCredit(this.queryParams, this.queryParams.selectType === '0' ? '平台公司资金用信情况' : '分部资金用信情况')
        },
        async backPlat (val, dis) {
            if (dis === 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                this.findAuthList({ deptType: 'Q', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                // 清空分部区域
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({
                    deptType: 'Q',
                    pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.queryParams.regionCode ? this.queryParams.regionCode : this.userInfo.pkDeptDoc
                })
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'Q') {
                this.queryParams.subRegionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                if (val.value.selectCode) {
                    this.findPlatformslist({ subregionCode: val.value.selectCode })
                } else if (this.queryParams.subsectionCode) {
                    let params = {
                        subsectionCode: this.queryParams.subsectionCode
                    }
                    this.findPlatformslist(params)
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.selectCode && this.linkage(dis)
            } else if (dis === 'P') {
                this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
            }
        },
        ...mapActions({
            findPlanCreditList: 'fundsPlan/findPlanCreditList',
            findPlanCreditTotal: 'fundsPlan/findPlanCreditTotal',
            findAuthList: 'findAuthList',
            findTargetTime: 'fundsPlan/findTargetTime'
        })
    },
    async mounted () {
        await this.findTargetTime()
        this.queryParams.selectTime = this.targetTime
        await this.btnQuery(this.queryParams)
        this.newBossAuth()
    }
}
</script>

<style scoped lang="scss">
.approval {
    background: #ffffff;
    padding: 60px 25px 30px;
    box-sizing: border-box;
}
.tips {
    background: #ffffff;
    p {
        max-width: 1000px;
        margin: auto;
        padding-top: 10px;
        line-height: 30px;
        text-align: center;

        b {
            color: red;
            padding: 0 5px;
        }
        .right {
            float: right;
        }
    }
}
</style>

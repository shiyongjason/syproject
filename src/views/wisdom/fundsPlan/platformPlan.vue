<template>
    <div class="page-body">
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
            <div class="query-cont-col">
                <div class="query-col-title"> 查询期间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.selectTime" type="month"  value-format='yyyyMM' placeholder="请选择时间">
                    </el-date-picker>
                </div>
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
                        导出汇总表
                    </el-button>
                </div>
            </div>
        </div>
        <div class="tips">
            <p><b>{{paramTargetDate.year}}</b>年<b>{{paramTargetDate.mouth}}</b>月<span class="right">单位：万元</span></p>
        </div>
        <div class="page-body-cont">
            <hosJoyTable ref="hosjoyTable" border stripe showPagination :column="columnData" :data="platformPlanList" align="center"
                         :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize"
                         :total="platformPlanPagination.total" @pagination="getList">
<!--                <template slot="organizationName" slot-scope="scope">-->
<!--                    <a :class="scope.data.row.cellType === 1 && scope.data.row.planId ? 'light' : ''" @click="goDetail(scope.data.row.planId, scope.data.row.cellType === 1)" type="primary">{{scope.data.row.organizationName}}</a>-->
<!--                </template>-->
            </hosJoyTable>
        </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { departmentAuth } from '@/mixins/userAuth'
import { mapActions, mapGetters, mapState } from 'vuex'
import { platformPlan } from './const'
import { exportPlanForm } from './api'
export default {
    name: 'platformPlan',
    mixins: [departmentAuth],
    components: {
        hosJoyTable,
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            areaList: state => state.areaList,
            platformData: state => state.platformData
        }),
        ...mapGetters({
            platformPlanList: 'fundsPlan/platformPlanList',
            platformPlanTotal: 'fundsPlan/platformPlanTotal',
            platformPlanPagination: 'fundsPlan/platformPlanPagination',
            targetTime: 'fundsPlan/targetTime'
        })
    },
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                selectTime: '',
                misCode: '',
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
            },
            selectAuth: {
                regionObj: {
                    selectCode: '',
                    selectName: ''
                },
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                areaObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
            columnData: []
        }
    },
    methods: {
        ...mapActions({
            findPlatformPlanList: 'fundsPlan/findPlatformPlanList',
            findPlatformPlanTotal: 'fundsPlan/findPlatformPlanTotal',
            findAuthList: 'findAuthList',
            findTargetTime: 'fundsPlan/findTargetTime'
        }),
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
            this.findPlatformPlanList(params)
            await this.findPlatformPlanTotal(params)
            const columnData = platformPlan(this.paramTargetDate.year, this.paramTargetDate.mouth)
            columnData.forEach((value, index) => {
                if (index > 3) {
                    value.children.forEach((val) => {
                        if (this.platformPlanTotal[val.prop]) {
                            val.children[0].label = String(this.platformPlanTotal[val.prop])
                        }
                    })
                }
            })
            this.columnData = columnData
            this.$nextTick(() => { this.$refs.hosjoyTable.doLayout() })
        },
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'D') {
                this.queryParams.subsectionCode = ''
                this.queryParams.subRegionCode = ''
                this.queryParams.misCode = ''
                this.selectAuth.branchObj = { ...obj }
                this.selectAuth.areaObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'F') {
                this.queryParams.subRegionCode = ''
                this.queryParams.misCode = ''
                this.selectAuth.areaObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'Q') {
                this.queryParams.misCode = ''
                this.selectAuth.platformObj = { ...obj }
            }
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
        onExport () {
            exportPlanForm(this.queryParams)
        },
        onReset () {
            this.queryParams = {
                selectTime: '',
                regionCode: '',
                subsectionCode: '',
                misCode: '',
                pageSize: 10,
                pageNumber: 1
            }
            this.selectAuth = {
                regionObj: {
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
                },
                areaObj: {
                    selectCode: '',
                    selectName: ''
                }
            }
            this.queryParams.selectTime = this.targetTime
            this.onQuery({ ...this.queryParams, pageSize: 10, pageNumber: 1 })
        }
    },
    async mounted () {
        // this.columnData = platformPlan(this.paramTargetDate.year, this.paramTargetDate.mouth)
        await this.findTargetTime()
        this.queryParams.selectTime = this.targetTime
        await this.btnQuery(this.queryParams)
        await this.newBossAuth()
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

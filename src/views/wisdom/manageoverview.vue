<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col" v-if="(userInfo.deptType== deptType[2])">
                <div class="query-col-title">大区：</div>
                <div class="query-col-input">
                    <el-select v-model="formData.regionCode" placeholder="选择" :clearable=true>
                        <el-option v-for="item in regionList" :key="item.crmDeptCode" :label="item.deptname" :value="item.crmDeptCode">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col" v-if="(userInfo.deptType ==  deptType[1]||userInfo.deptType ==  deptType[2])">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <el-select v-model="formData.subsectionCode" placeholder="选择" :clearable=true>
                        <el-option v-for="item in branchList" :key="item.crmDeptCode" :label="item.deptname" :value="item.crmDeptCode">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">时间：</div>
                <el-date-picker v-model="formData.startDate" :clearable=false :editable=false :picker-options="pickerOptionsStart" type="month" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择开始时间">
                </el-date-picker>
                <div class="line ml5 mr5">-</div>
                <el-date-picker v-model="formData.endDate" :editable=false :clearable=false :picker-options="pickerOptionsEnd" type="month" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择结束时间">
                </el-date-picker>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onSearchForm()">查询
                </el-button>
            </div>

        </div>
        <div class="page-box top10">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane :lazy='true' v-if="hosAuthCheck(firstAuth)" label="概览" name="first">
                    <overallchild v-if="'first' === activeName" ref="overallchild" :params="formData" />
                </el-tab-pane>
                <el-tab-pane :lazy='true' v-if="hosAuthCheck(thirdAuth)" label="销售" name="third">
                    <salechild v-if="'third' === activeName" ref="salechild" :params="formData" />
                </el-tab-pane>
                <el-tab-pane :lazy='true' v-if="hosAuthCheck(secondAuth)" label="上线" name="second">
                    <addchild v-if="'second' === activeName" ref="addchild" :params="formData" />
                </el-tab-pane>

                <el-tab-pane :lazy='true' v-if="hosAuthCheck(fourthAuth)" label="利润" name="fourth">
                    <profitchild :params="formData" />
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>
<script>
import { findBranchList, findRegionList } from './api/index.js'
import overallchild from './components/overallchild'
import addchild from './components/addchild'
import salechild from './components/salechild'
import profitchild from './components/profitchild'
import { mapState } from 'vuex'
import { DEPT_TYPE } from './store/const'
import { AUTH_MANAGE_OVERVIEW_SURVEY, AUTH_MANAGE_OVERVIEW_MARKET, AUTH_MANAGE_OVERVIEW_ONLINE, AUTH_MANAGE_OVERVIEW_PROFIT } from '@/utils/auth_const'
export default {
    data () {
        return {
            firstAuth: AUTH_MANAGE_OVERVIEW_SURVEY,
            secondAuth: AUTH_MANAGE_OVERVIEW_ONLINE,
            thirdAuth: AUTH_MANAGE_OVERVIEW_MARKET,
            fourthAuth: AUTH_MANAGE_OVERVIEW_PROFIT,
            formData: {
                endDate: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 9 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1)))}`,
                startDate: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 9 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1)))}`,
                companyCode: '',
                regionCode: '',
                subsectionCode: ''
            },
            activeName: 'first',
            branchList: [],
            regionList: [],
            deptType: DEPT_TYPE
        }
    },
    components: {
        overallchild,
        addchild,
        salechild,
        profitchild
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.formData.endDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.formData.startDate
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    watch: {
        async 'formData.regionCode' (newV, oldV) {
            if (newV) {
                this.formData.subsectionCode = this.userInfo.deptType === this.deptType[0] ? this.userInfo.oldDeptCode : ''
                this.branchList = await this.onFindBranchList(newV)
            } else {
                this.branchList = await this.onFindBranchList()

                this.formData.subsectionCode = ''
            }
        }
    },
    async mounted () {
        this.formData.companyCode = this.userInfo.oldDeptCode ? this.userInfo.oldDeptCode : ''
        console.log(this.userInfo.deptType, this.deptType)
        // 如果 当前人大区 -1  总部 0  其他 1
        if (this.userInfo.deptType === this.deptType[1]) {
            this.formData.regionCode = this.userInfo.oldDeptCode
        } else if (this.userInfo.deptType === this.deptType[0]) {
            this.formData.regionCode = this.userInfo.oldDeptCode
            this.formData.subsectionCode = this.userInfo.oldDeptCode
            // this.formData.subsectionCode = this.userInfo.companyCode
        }
        this.onFindRegionList()
        this.branchList = await this.onFindBranchList()
        // Watermark.set(this.userInfo.name)
    },
    methods: {
        async onFindRegionList () {
            const { data } = await findRegionList()
            this.regionList = data.data
        },
        async onFindBranchList (value) {
            const { data } = await findBranchList({ crmDeptCode: value })
            return data.data ? data.data : ''
        },
        onSearchForm () {
            if (this.activeName === 'first') {
                this.$refs.overallchild.backoverAll()
            } else if (this.activeName === 'second') {
                this.$refs.addchild.backadd()
            } else if (this.activeName === 'third') {
                this.$refs.salechild.backsale()
            }
        }
    }
}
</script>
<style lang="scss" >
.page-box{
    background: #ffffff;
}
.red {
    color: red !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #ff7a45;
    color: #ffffff;
}
</style>

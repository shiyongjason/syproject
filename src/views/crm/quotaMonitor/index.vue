<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">额度种类：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.quotaType" :clearable='true'>
                            <el-option :label="item.value" :value="item.key" v-for="item in quotaTypes" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">变动额度：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.minChangeAmount" maxlength="20" placeholder="请输入金额"><template slot="append">万元</template></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.maxChangeAmount" maxlength="20" placeholder="请输入金额"><template slot="append">万元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.deptCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">变动类型：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.changedType" :clearable='true'>
                            <el-option :label="item.value" :value="item.key" v-for="item in changedTypes" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">事件：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.eventType" :clearable='true'>
                            <el-option :label="item.value" :value="item.key" v-for="item in eventTypes" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">变动时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont__row mb10">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 </el-tag>
            </div>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList"
                :isActionFixed='tableData&&tableData.length>0'>

            </hosJoyTable>
        </div>
    </div>
</template>
<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { eventType, quotaType, changedType } from './const'
import { CreateElement } from 'vue'
import { findQuotaPage } from './api/index'
import { deepCopy } from '@/utils/utils'
import { State, Action, Getter } from 'vuex-class'
import { money } from '@/utils/filters'
@Component({
    name: 'quotamonitor',
    components: {
        hosJoyTable
    }
})
export default class Qutelist extends Vue {
    @State('userInfo') userInfo:Record<any, any>
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdelist:Function
    $refs!: {
        form: HTMLFormElement
    }
    eventTypes = eventType
    quotaTypes = quotaType
    changedTypes = changedType
    private queryParams:Record<string, any>={
        changedType: '',
        companyName: '',
        deptCode: '',
        eventType: '',
        maxChangeAmount: '',
        maxCreateTime: '',
        minChangeAmount: '',
        minCreateTime: '',
        pageNumber: 1,
        pageSize: 10,
        quotaType: '',
        jobNumber: '',
        authCode: ''
    }
    _queryParams = {}
    private tableLabel:tableLabelProps = [
        { label: '事件',
            prop: 'eventType',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return <span>{this.eventTypes[scope.row.eventType - 1].value}</span>
            }
        },
        { label: '描述',
            prop: 'projectNo',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => this.handleDescribe(scope.row)
        },
        { label: '额度种类',
            prop: 'quotaType',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return <span>{this.quotaTypes[scope.row.quotaType - 1].value}</span>
            }
        },
        { label: '企业名称', prop: 'companyName', width: '120px' },
        { label: '分部', prop: 'deptName' },
        { label: '变动前(万元)',
            prop: 'status',
            displayAs: 'money',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return <span>总额度:{scope.row.beforeTotalQuotaAmount}<br/>已冻结额度:{scope.row.beforeFreezeQuotaAmount}<br/>可用额度:{(scope.row.beforeTotalQuotaAmount - scope.row.beforeFreezeQuotaAmount) ? (scope.row.beforeTotalQuotaAmount - scope.row.beforeFreezeQuotaAmount).toFixed(6) : 0}</span>
            }
        },
        { label: '变动类型',
            prop: 'changedType',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return <span>{this.changedTypes[scope.row.changedType - 1].value}</span>
            }
        },
        { label: '变动额度（万元）',
            prop: 'changeAmount',
            displayAs: 'money',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return <span class={scope.row.changedType == 1 ? 'green' : scope.row.changedType == 2 ? 'red' : scope.row.changedType == 3 ? 'orange' : 'blue'}>{scope.row.changeAmount}</span>
            } },
        { label: '变动后(万元)',
            prop: 'afterTotalQuotaAmount',
            displayAs: 'money',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return <span>总额度:{scope.row.afterTotalQuotaAmount}<br/>已冻结额度:{scope.row.afterFreezeQuotaAmount}<br/>可用额度:{(scope.row.afterTotalQuotaAmount - scope.row.afterFreezeQuotaAmount) ? (scope.row.afterTotalQuotaAmount - scope.row.afterFreezeQuotaAmount).toFixed(6) : 0}</span>
            }
        },
        { label: '变动时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' }

    ]
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    private tableData = []

    get options () {
        return {
            type: 'datetime',
            valueFormat: 'yyyy-MM-ddTHH:mm:ss',
            format: 'yyyy-MM-dd HH:mm:ss',
            startTime: this.queryParams.minCreateTime,
            endTime: this.queryParams.maxCreateTime
        }
    }

    handleDescribe (val) {
        if (val.eventType == (1 || 2 || 5 || 6)) {
            return <span>操作人:{val.createBy}<br/>{val.createPhone}</span>
        } else if (val.eventType == (3 || 4)) {
            return <span>项目编号:{val.projectNo}</span>
        } else {
            return <span>支付单编号:{val.paymentOrderNo}</span>
        }
    }

    public onReset () {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }

    public async getList () {
        console.log(this.queryParams)
        const { data } = await findQuotaPage(this.queryParams)
        this.tableData = data.records
        this.page.total = data.total
    }
    async findBranchList () {
        this.findCrmdelist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
    }

    onStartChange (val): void {
        this.queryParams.minCreateTime = val
    }
    onEndChange (val): void {
        this.queryParams.maxCreateTime = val
    }

    mounted () {
        this.queryParams.jobNumber = this.userInfo.jobNumber
        this.queryParams.authCode = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
        this._queryParams = deepCopy(this.queryParams)
        this.getList()
        this.findBranchList()
        const _t = this.$minus(110, 1)
        console.log(_t.toFixed(2))
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>
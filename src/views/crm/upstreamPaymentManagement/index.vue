<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.orderNum" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.subsectionCode" :clearable='true'>
                            <el-option :label="item.crmDeptCode" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="请输入经销商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游出票方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.dealer" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="银行承兑" :value="1"></el-option>
                            <el-option label="银行转账" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游供应商：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="请输入项目名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">出票状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.dealer" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待出票" :value="1"></el-option>
                            <el-option label="部分出票" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">剩余待支付金额（元）：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="请输入金额"></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="请输入金额"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">期望出票日期：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">首付款确认时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>

                <div class="query-cont__col">
                    <h-button type="primary">
                        查询
                    </h-button>
                    <h-button>
                        重置
                    </h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 3 项</el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable localName="V3.3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="searchList"
                actionWidth='375' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template slot="action">
                    <h-button table>查看</h-button>
                </template>
            </hosJoyTable>
        </div>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件

@Component({
    name: 'UpstreamPaymentManagement',
    components: {
        hosJoyTable
    }
})
export default class UpstreamPaymentManagement extends Vue {
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:any[] = [{ orderNo: '222' }]
    queryParams = {
        dealer: '',
        orderNum: '',
        subsectionCode: '',
        createStartTime: '',
        createEndTime: '',
        pageSize: 10,
        pageNumber: 1
    }

    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function
    get options () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.createStartTime,
            endTime: this.queryParams.createEndTime
        }
    }

    tableLabel:tableLabelProps=[
        { label: '支付的编号', prop: 'orderNo' },
        { label: '所属分部', prop: 'orderNo' },
        { label: '经销商', prop: 'orderNo', width: '150' },
        { label: '上游供应商', prop: 'orderNo' },
        { label: '项目名称', prop: 'orderNo' },
        { label: '采购单金额', prop: 'orderNo', displayAs: 'money' },
        {
            label: '出票状态/出票次数',
            prop: 'orderNo',
            render: (h, scope) => this.onRenderLabel(h, scope)
        }
    ]

    onRenderLabel (h, scope) {
        console.log('scope: ', scope.row.orderNo)
        return <span>对对对{scope.row.orderNo}</span>
    }

    onStartChange (val:string) {
        this.queryParams.createStartTime = val
    }
    onEndChange (val:string) {
        this.queryParams.createEndTime = val
    }

    searchList () {

    }

    sortChange (e) {
        if (e.prop == 'createTime' && e.order == null) {}
    }

    async mounted () {
        console.log(this.userInfo)
        await this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: sessionStorage.getItem('authCode')
                ? JSON.parse(sessionStorage.getItem('authCode') || '')
                : ''
        })
    }
}
</script>

<style lang='scss' scoped>
.upstreamPaymentManagement {
    //
}
</style>
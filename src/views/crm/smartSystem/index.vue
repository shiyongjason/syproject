<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">智能化系统：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.prepaymentNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">关联的工程方案：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.subsectionCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont-row">
                <h-button type="primary" @click="onAddInfo">新增智能化系统</h-button>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='250' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="onApproval(slotProps.data.row)" v-if="slotProps.data.row.status==1">审核</h-button>
                    <h-button table @click="onLook(slotProps.data.row)">查看详情</h-button>
                    <h-button table @click="onApprovalRecord(slotProps.data.row)">审批记录</h-button>
                </template>
            </hosJoyTable>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { CreateElement } from 'vue'
import { Action, Getter, State } from 'vuex-class'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import ImageAddToken from '@/components/imageAddToken/index.vue'
import { deepCopy } from '@/utils/utils'
import './css/css.scss'

import moment from 'moment'
// 定义类型
interface Query{
    [key:string]:any
}

@Component({
    name: 'Smartsystem',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload,
        ImageAddToken
    }
})
export default class Smartsystem extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    moment = moment
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }

    private dialogVisible:boolean = false
    private comfirmVisble:boolean = false
    private examineVisble:boolean = false
    private recordVisible:boolean = false
    private _queryParams:Query = {}
    private totalMoney:number = 0
    private id:number|string = null

    queryParams:Query = {
        pageSize: 10,
        pageNumber: 1,
        prepaymentNo: '',
        projectName: '',
        distributorName: '',
        subsectionCode: '',
        status: '',
        applyUser: '',
        applyTimeStart: '',
        applyTimeEnd: ''
    }
    auditForm = {
        resource: '',
        remark: ''
    }

    page = {
        total: 0
    }
    private tableLabel:tableLabelProps = [
        { label: '智能化系统名称', prop: 'prepaymentNo' },
        { label: '关联的工程方案', prop: 'subsectionName' },
        { label: '创建时间', prop: 'distributor' },
        { label: '更新时间', prop: 'projectName', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新人', prop: 'applyAmount', displayAs: 'money' }
    ]
    private tableData = []
    @State('userInfo') userInfo: any
    get options () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-ddTHH:mm:ss',
            format: 'yyyy-MM-ddTHH:mm:ss',
            startTime: this.queryParams.applyTimeStart,
            endTime: this.queryParams.applyTimeEnd
        }
    }
    // validator: (rule, value, callback) => {
    auditRules = {
        resource: [
            { required: true, message: '请选择审核结果', trigger: 'blur' }
        ],
        remark: [
            { required: true, message: '请填写审核备注', trigger: 'blur' }
        ]
    }
    detailRules = {
        payVouchers: [
            { required: true, message: '上传上游支付凭证不能为空', trigger: 'blur' }
        ],
        payDate: [
            { required: true, message: '上游支付日期不能为空', trigger: 'blur' }
        ]
    }
    public onAddInfo (val): void {
        this.$router.push({ path: '/goodwork/systemdetail' })
    }

    public onReset (): void {
        this.queryParams = deepCopy(this._queryParams)
    }

    public async mounted () {
        this._queryParams = deepCopy(this.queryParams)
    }
}
</script>

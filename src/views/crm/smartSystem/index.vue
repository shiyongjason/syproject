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
                    <h-button type="primary" @click="onFindList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont-row mb20">
                <h-button type="primary" @click="onAddInfo">新增智能化系统</h-button>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='250' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="onAddInfo(slotProps.data.row)">编辑</h-button>
                    <h-button table @click="onMove(slotProps.data.row,'up')">上移</h-button>
                    <h-button table @click="onMove(slotProps.data.row,'down')">下移</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">删除</h-button>
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
import ImageAddToken from '@/components/imageAddToken/index.vue'
import { deepCopy } from '@/utils/utils'
import './css/css.scss'
import { getIntelligentList, deleteIntelligent, getIntelligentDown, getIntelligentUp } from './api/index'

import moment from 'moment'
// 定义类型
interface Query{
    [key:string]:any
}

@Component({
    name: 'Smartsystem',
    components: {
        hosJoyTable,
        ImageAddToken
    }
})
export default class Smartsystem extends Vue {
    moment = moment
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }

    private _queryParams:Query = {}
    queryParams:Query = {
        pageSize: 10,
        pageNumber: 1,
        prepaymentNo: '',
        projectName: '',
        distributorName: ''
    }
    page = {
        total: 0
    }
    private tableLabel:tableLabelProps = [
        { label: '智能化系统名称', prop: 'intelligentSystemName' },
        { label: '关联的工程方案', prop: 'schemeName' },
        { label: '创建时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新时间', prop: 'projectName', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新人', prop: 'updateBy' }
    ]
    private tableData = []
    @State('userInfo') userInfo: any
    auditRules = {
        resource: [
            { required: true, message: '请选择审核结果', trigger: 'blur' }
        ],
        remark: [
            { required: true, message: '请填写审核备注', trigger: 'blur' }
        ]
    }

    public onAddInfo (val): void {
        this.$router.push({ path: '/goodwork/systemdetail', query: { id: val } })
    }
    // 重置
    public onReset (): void {
        this.queryParams = deepCopy(this._queryParams)
    }
    // 查询列表
    public async onFindList () {
        const data = await getIntelligentList(this.queryParams)
    }
    // 上下移动
    public async onMove (val, type) {
        if (type == 'up') {
            await getIntelligentDown(val)
        } else {
            await getIntelligentDown(val)
        }
    }
    // 删除
    public onDelete (val) {
        this.$confirm('删除后小程序端无法查看，是否继续删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            const data = await deleteIntelligent(val)
        }).catch(() => {

        })
    }

    public async mounted () {
        this._queryParams = deepCopy(this.queryParams)
    }
}
</script>

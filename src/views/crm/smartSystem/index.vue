<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">智能化系统：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.intelligentSystemName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">关联的工程方案：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.schemeName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont-row mb20">
                <h-button type="primary" @click="onAddInfo">新增智能化系统</h-button>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe :column="tableLabel" :data="tableData" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="onAddInfo(slotProps.data.row, 'edit')" v-if="hosAuthCheck(smartedit)">编辑</h-button>
                    <h-button table @click="onMove(slotProps.data.row,'up')" v-if="slotProps.data.$index != 0&&hosAuthCheck(smartmove)">上移</h-button>
                    <h-button table @click="onMove(slotProps.data.row,'down')" v-if="(slotProps.data.$index != tableData.length-1)&&hosAuthCheck(smartmove)">下移</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)" v-if="hosAuthCheck(smartdelete)">删除</h-button>
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

import { CRM_SMART_EDIDT, CRM_SMART_MOVE, CRM_SMART_DELETE } from '@/utils/auth_const'

import moment from 'moment'
// 定义类型
interface Query {
    [key: string]: any
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
    smartedit = CRM_SMART_EDIDT
    smartmove = CRM_SMART_MOVE
    smartdelete = CRM_SMART_DELETE
    private _queryParams: Query = {}
    queryParams: Query = {
        intelligentSystemName: '',
        schemeName: ''
    }

    tableLabel = [
        { label: '智能化系统名称', prop: 'intelligentSystemName' },
        { label: '关联的工程方案', prop: 'schemeName' },
        { label: '创建时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新人', prop: 'updateBy' }
    ]
    tableData = []
    @State('userInfo') userInfo: any

    public onAddInfo (val, type): void {
        if (type == 'edit') {
            this.$router.push({ path: '/goodwork/systemdetail', query: { id: val.id } })
        } else {
            this.$router.push({ path: '/goodwork/systemdetail' })
        }
    }
    // 重置
    public onReset (): void {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }
    // 列表详情
    public async getList () {
        const { data: tableData } = await getIntelligentList(this.queryParams)
        this.tableData = tableData || []
    }
    // 上下移动
    public async onMove (val, type) {
        if (type == 'up') {
            await getIntelligentUp(val)
        } else if (type == 'down') {
            await getIntelligentDown(val)
        }
        this.getList()
    }
    // 删除
    public onDelete (val) {
        this.$confirm('删除后小程序端无法查看，是否继续删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await deleteIntelligent(val.id)
            this.$message.success(`智能化系统删除成功！`)
            this.getList()
        }).catch(() => {

        })
    }

    public async mounted () {
        this._queryParams = deepCopy(this.queryParams)
        this.getList()
    }
}
</script>

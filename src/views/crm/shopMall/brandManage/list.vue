<template>
    <div class="page-body B2b brandManage">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">品牌编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">品牌名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
            </div>
            <div class="flexlayout">
                <div class="search-btn">
                    <h-button type="primary">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <h-button type="create" class="bulkPull" @click="onOPenSureDialog">批量推荐</h-button>
            <h-button type="primary" class="bulkPull" style="margin:0 10px" @click="onOPenCancelDialog" >批量取消</h-button>
            <hosJoyTable :localName="'V3.10.*'" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' >
            </hosJoyTable>
        </div>
        <el-dialog title="批量推荐确认" :visible.sync="onSureDialog" :close-on-click-modal="false" :before-close="() => onSureDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                你确定要批量推荐这些商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onSureDialog = false">取 消</el-button>
                <el-button type="primary" @click="onHandleSure">继 续</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量取消确认" :visible.sync="onCancelDialog" :close-on-click-modal="false" :before-close="() => onCancelDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                你确定要批量取消推荐这些商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onCancelDialog = false">取 消</el-button>
                <el-button type="primary" @click="onHandleDel">继 续</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='tsx'>
import { ElForm } from 'element-ui/types/form'
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import elImageAddToken from '@/components/elImageAddToken/index.vue'
const _queryParams = {
    xxx: '',
    categoryIdArr: [],
    pageNumber: 1,
    pageSize: 10
}
@Component({
    name: 'crmshopMallbrandManage',
    components: { hosJoyTable, elImageAddToken }
})
export default class brandManage extends Vue {
    queryParams: any = JSON.parse(JSON.stringify(_queryParams))
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:any = [
        {
            name: '西门子啦啦啦啦啦西门子啦啦啦啦啦西门子啦啦啦啦啦'
        }
    ]
    onSureDialog:boolean = false
    onCancelDialog:boolean = false

    //  列表
    tableLabel: tableLabelProps = [
        { label: '品牌编码', prop: 'name' },
        {
            label: '品牌名称',
            prop: 'name',
            render: (h, scope) => {
                return (
                    <div class="rowcss">
                        <span class="selection">严选</span>
                        <font>{scope.row[scope.column.property]}</font>
                    </div>
                )
            }
        },
        { label: '品牌banner', prop: 'name' },
        { label: '品牌logo', prop: 'name' },
        { label: '品牌介绍', prop: 'name' },
        { label: '类目信息', prop: 'name' },
        {
            label: '操作',
            width: '250px',
            // slot: 'action',
            render: (h, scope) => {
                return <h-button table >取消推荐</h-button>
            }
        }
    ]

    // methods:::

    // 推荐提醒 Dialog
    onOPenSureDialog () {
        this.onSureDialog = true
    }

    // 打开取消确认 Dialog
    onOPenCancelDialog () {
        this.onCancelDialog = true
    }
    // 批量推荐确认
    onHandleSure () {
        let ref:any = this.$refs.hosjoyTable
        ref.clearSelection()
        this.onSureDialog = false
    }
    // 批量删除确认
    onHandleDel () {
        let ref:any = this.$refs.hosjoyTable
        ref.clearSelection()
        this.onCancelDialog = false
    }

    // 搜索重置
    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(_queryParams))
        this.getList()
    }

    // getList
    getList () {

    }

    mounted () {
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>
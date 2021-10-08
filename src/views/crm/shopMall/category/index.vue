
<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">品类名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.frontCategoryName" placeholder="请输入" maxlength=""></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">类目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.categoryName" maxlength="" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont__row mb20">
                <h-button type="primary" v-if="hosAuthCheck(categoryAdd)" @click="onAdd">新增品类</h-button>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='250' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table @click="onEdit(slotProps.data.row)" v-if="hosAuthCheck(categoryEdit)">编辑</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)" v-if="hosAuthCheck(categoryDelete)">删除</h-button>
                    <h-button table @click="onLook(slotProps.data.row)" v-if="hosAuthCheck(categoryLook)">查看</h-button>
                    <h-button table v-if="slotProps.data.row.sort!=1&&hosAuthCheck(categoryMove)" @click="onMove(slotProps.data.row,'up')">上移</h-button>
                    <h-button table v-if="slotProps.data.row.sort!=page.total&&hosAuthCheck(categoryMove)" @click="onMove(slotProps.data.row,'down')">下移</h-button>
                </template>
            </hosJoyTable>
        </div>
        <el-dialog title="删除确认" :visible.sync="dialogVisible" width="40%" :before-close="()=>{dialogVisible = false}">
            <p class="mb20" style="color:red">当前品类所关联的类目中，存在以下商品被使用在启用中的楼层，若仍要删除品类，请先从对应楼层中移出该商品或停用楼层</p>
            <hosJoyTable ref="hosjoyTable" align="center" :maxHeight="500"  border :column="dialogLabel" :data="dialogData">
            </hosJoyTable>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onGoJump">去管理楼层</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='tsx'>
import { CreateElement } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { getCateGoryList, moveUpCategroy, moveDownCategroy, deleteCategory, getComfirCategory } from './api/index'
import { deepCopy } from '@/utils/utils'
import { CRM_CATEGORY_ADD, CRM_CATEGORY_EDIT, CRM_CATEGORY_DETELE, CRM_CATEGORY_LOOK, CRM_CATEGORY_MOVE } from '@/utils/auth_const'
import { newCache } from '@/utils/index'
@Component({
    name: 'Categroies',
    components: {
        hosJoyTable,
        HosJoyUpload
    }
})
export default class Categroies extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    categoryAdd = CRM_CATEGORY_ADD
    categoryEdit = CRM_CATEGORY_EDIT
    categoryDelete = CRM_CATEGORY_DETELE
    categoryLook = CRM_CATEGORY_LOOK
    categoryMove = CRM_CATEGORY_MOVE
    dialogVisible:boolean = false
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    queryParams:any={
        pageNumber: 1,
        pageSize: 10,
        frontCategoryName: '',
        categoryName: ''
    }
    private _queryParams={}
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:any[] = []
    tableLabel: tableLabelProps = [
        { label: '品类名称', prop: 'frontCategoryName' },
        { label: '类目信息',
            prop: 'categoryNameAndSpuNum',
            width: '300px',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return (
                    <div>{scope.row.categoryNameAndSpuNum }</div>
                )
            } },
        { label: '创建时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新人', prop: 'updateBy' },
        { label: '品类上架数量', prop: 'onShelfSpuNum' }
    ]
    dialogData:any[] = []
    dialogLabel: tableLabelProps = [
        { label: '商品名称', prop: 'spuName' },
        { label: '类目信息', prop: 'categoryPath' },
        { label: '楼层名称', prop: 'floorName' }
    ]

    async getList () {
        const { data } = await getCateGoryList(this.queryParams)
        this.tableData = data.records
        this.page.total = data.total as number
    }

    onReset () {
        this.queryParams = deepCopy(this._queryParams)
        this.getList()
    }

    onAdd () {
        this.$router.push({ path: '/goodwork/categoryedit' })
    }

    onGoJump () {
        this.$router.push({ name: 'advmanage', params: { tabs: 'floor' } })
    }

    onEdit (val) {
        this.$router.push({ path: '/goodwork/categoryedit', query: { id: val.id } })
    }

    onLook (val) {
        this.$router.push({ path: '/goodwork/categorydetail', query: { id: val.id } })
    }

    async onDelete (val) {
        // 先校验 删除的品类
        const { data } = await getComfirCategory(val.id)
        this.dialogData = data
        if (data.length > 0) {
            this.dialogVisible = true
        } else {
            this.$confirm('确定删除该品类信息吗？', '删除确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteCategory(val.id)
                this.getList()
            }).catch(() => {

            })
        }
    }

    async onMove (val, type) {
        if (type == 'up') {
            await moveUpCategroy(val.id)
        } else {
            await moveDownCategroy(val.id)
        }
        this.getList()
    }

    mounted () {
        this.getList()
        this._queryParams = deepCopy(this.queryParams)
    }

    beforeUpdate () {
        newCache('Categroies')
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>

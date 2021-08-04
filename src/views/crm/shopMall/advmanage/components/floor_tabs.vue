
<template>
    <div class="banner-tab">
        <div class="baner-btn mb20">
            <el-button type="primary" @click="onAddFloor" v-if="hosAuthCheck(floorAdd)">新增楼层</el-button>
        </div>
        <hosJoyTable isShowIndex ref="hosjoyTable" align="center" showPagination border stripe :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="onGetFloorPage" actionWidth='250' isAction
            :isActionFixed='tableData&&tableData.length>0'>
            <template #action="slotProps">
                <h-button table @click="onLook(slotProps.data.row)" v-if="hosAuthCheck(floorLook)">查看</h-button>
                <h-button table v-if="(slotProps.data.row.status==1||slotProps.data.row.status==3)&&hosAuthCheck(floorOperate)" @click="onEnable(slotProps.data.row)">启用</h-button>
                <h-button table v-if="slotProps.data.row.status==2&&hosAuthCheck(floorOperate)" @click="onDisable(slotProps.data.row)">停用</h-button>
                <h-button table @click="onEdit(slotProps.data.row)" v-if="(slotProps.data.row.status==1||slotProps.data.row.status==3)&&hosAuthCheck(floorEdit)">编辑</h-button>
                <h-button table @click="onDelete(slotProps.data.row)" v-if="(slotProps.data.row.status==1||slotProps.data.row.status==3)&&hosAuthCheck(floorDelete)">删除</h-button>
                <h-button table @click="onMoveFloor(slotProps.data.row,1)" v-if="slotProps.data.row.sort!=1&&hosAuthCheck(floorMove)">上移</h-button>
                <h-button table @click="onMoveFloor(slotProps.data.row,2)" v-if="(slotProps.data.row.sort!=page.total)&&hosAuthCheck(floorMove)">下移</h-button>
            </template>
        </hosJoyTable>
        <el-dialog title="启用失败通知" :visible.sync="dialogVisible" width="40%" :before-close="()=>{dialogVisible = false}">
            <p class="mb20" style="color:red">当前楼层所关联的商品存在以下品牌信息不完整，您可点击品牌名称去维护品牌信息</p>
            <div class="floor_tag">
                <el-tag v-for="(item,index) in tags" :key="index" @click="onMaintain(item)">{{item.brandName}}</el-tag>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">暂不维护</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { CreateElement } from 'vue'
import { getFloorPage, onDeleteFloor, onEnableFloor, onDisableFloor, onMoveUpFloor, onMoveDownFloor, onConfirmFloor } from '../api/index'
import { RespBossShopFloorPage } from '@/interface/hbp-shop'
import { CRM_ADV_FLOOR_ADD, CRM_ADV_FLOOR_LOOK, CRM_ADV_FLOOR_OPERATE, CRM_ADV_FLOOR_EDIT, CRM_ADV_FLOOR_MOVE, CRM_ADV_FLOOR_DELETE } from '@/utils/auth_const'

@Component({
    name: 'Floortabs',
    components: {
        hosJoyTable
    }
})
export default class Floortabs extends Vue {
        $refs!: {
            form: HTMLFormElement
        }
        floorAdd = CRM_ADV_FLOOR_ADD
        floorLook = CRM_ADV_FLOOR_LOOK
        floorOperate = CRM_ADV_FLOOR_OPERATE
        floorEdit = CRM_ADV_FLOOR_EDIT
        floorMove= CRM_ADV_FLOOR_MOVE
        floorDelete = CRM_ADV_FLOOR_DELETE

        dialogVisible: boolean = false
        page = {
            sizes: [10, 20, 50, 100],
            total: 0
        }
        tags: any[]|[]=[]
        tableData: RespBossShopFloorPage[] = []
        tableLabel: tableLabelProps = [
            { label: '楼层名称', prop: 'floorName' },
            { label: '品类名称及商品数量',
                prop: 'categorySpuNumList',
                width: '350',
                render: (h: CreateElement, scope:TableRenderParam): JSX.Element => {
                    return (
                        <div>
                            {
                                scope.row.categorySpuNumList && scope.row.categorySpuNumList.length > 0
                                    ? scope.row.categorySpuNumList.map((item, index) => {
                                        return (
                                            <span>
                                                {item.frontCategoryName}({item.spuNumber})  {index < scope.row.categorySpuNumList.length - 1 ? ',' : ''}
                                            </span>
                                        )
                                    })
                                    : '-'
                            }
                        </div>
                    )
                }
            },
            { label: '创建时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
            { label: '更新时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
            { label: '楼层状态', prop: 'status', dicData: [{ value: 1, label: '草稿' }, { value: 2, label: '启用' }, { value: 3, label: '停用' }] }
        ]
        queryParams: any = {
            pageNumber: 1,
            pageSize: 10
        }
        onAddFloor () {
            // this.dialogVisible = true
            this.$router.push({ path: '/goodwork/flooredit' })
        }

        async onGetFloorPage () {
            const { data } = await getFloorPage(this.queryParams)
            this.tableData = data.records
            this.page.total = data.total as number
        }

        onDelete (val) {
            this.$confirm('确定删除当前楼层吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await onDeleteFloor(val.id)
                this.$message({
                    type: 'success',
                    message: '楼层已删除~'
                })
                this.onGetFloorPage()
                this.$emit('backEvent')
            }).catch(() => {

            })
        }

        async onEnable (val) {
            // 校验 是否需要维护
            const { data } = await onConfirmFloor(val.id)

            if (data.length > 0) {
                this.dialogVisible = true
                this.tags = data
            } else {
                this.dialogVisible = false
                this.$confirm('确定启用当前楼层吗？', '启用确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const { data } = await onEnableFloor(val.id)

                    this.$message({
                        type: 'success',
                        message: '楼层已启用~!'
                    })
                    this.onGetFloorPage()
                    this.$emit('backEvent')
                }).catch(() => {

                })
            }
        }

        onMaintain (val) {
            this.$router.push({ name: 'brandManage', params: { brandName: val.brandName } })
        }

        onDisable (val) {
            this.$confirm('确定停用当前楼层吗？停用后该楼层信息在小程序不可见', '停用确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await onDisableFloor(val.id)
                this.$message({
                    type: 'success',
                    message: '楼层已停用~!'
                })
                this.onGetFloorPage()
                this.$emit('backEvent')
            }).catch(() => {

            })
        }

        // 上下移动
        async onMoveFloor (val, type) {
            if (type == 1) {
                await onMoveUpFloor(val.id)
            } else {
                await onMoveDownFloor(val.id)
            }
            this.onGetFloorPage()
        }

        onEdit (val) {
            this.$router.push({ path: '/goodwork/flooredit', query: { id: val.id } })
        }

        onLook (val) {
            this.$router.push({ path: '/goodwork/floordetail', query: { id: val.id } })
        }
        mounted () {
            this.onGetFloorPage()
        }
}
</script>
<style lang='scss' scoped>
@import "../css.scss";
</style>

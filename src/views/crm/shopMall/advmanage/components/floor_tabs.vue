
<template>
    <div class="banner-tab">
        <div class="baner-btn mb20">
            <el-button type="primary" @click="onAddFloor">新增楼层</el-button>
        </div>
        <hosJoyTable isShowIndex ref="hosjoyTable" align="center"  showPagination border stripe :column="tableLabel" :data="tableData"
        :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="onGetFloorPage" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0'>
            <template #action="slotProps">
                    <h-button table @click="onLook(slotProps.data.row)">查看</h-button>
                    <h-button table v-if="slotProps.data.row.status==1||slotProps.data.row.status==3" @click="onEnable(slotProps.data.row)">启用</h-button>
                    <h-button table v-if="slotProps.data.row.status!=3" @click="onDisable(slotProps.data.row)">停用</h-button>
                    <h-button table @click="onEdit(slotProps.data.row)">编辑</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">删除</h-button>
                    <h-button table @click="onMoveFloor(slotProps.data.row,1)" v-if="slotProps.data.row.$index==0">上移</h-button>
                    <h-button table @click="onMoveFloor(slotProps.data.row,2)"  v-if="slotProps.data.row.$index==tableData.length-1">下移</h-button>
            </template>
        </hosJoyTable>

    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { CreateElement } from 'vue'
import { getFloorPage, onDeleteFloor, onEnableFloor, onDisableFloor, onMoveUpFloor, onMoveDownFloor } from '../api/index'
import { RespBossShopFloorPage } from '@/interface/hbp-shop'

@Component({
    name: 'Floortabs',
    components: {
        hosJoyTable
    }
})
export default class Floortabs extends Vue {
        // @Prop({ default: '' }) readonly data!:RespLoanHandoverInfo
        @Prop({ default: '' }) readonly userInfo!:any
        @Prop({ default: '' }) readonly paymentOrderId!:any
        $refs!: {
            form: HTMLFormElement
        }

        page = {
            sizes: [10, 20, 50, 100],
            total: 0
        }

        tableData:RespBossShopFloorPage[] | [] = []

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
                                    ? scope.row.categorySpuNumList.map(item => {
                                        return (
                                            <span>
                                                {item.frontCategoryName}({item.spuNumber})
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
        queryParams:any = {
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
                    message: '删除成功!'
                })
            }).catch(() => {

            })
            this.onGetFloorPage()
        }

        onEnable () {
            // 校验

        }

        onDisable (val) {
            this.$confirm('确定停用当前楼层吗？停用后该楼层信息在小程序不可见', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await onDisableFloor(val.id)
                this.$message({
                    type: 'success',
                    message: '楼层已停用~!'
                })
            }).catch(() => {

            })
            this.onGetFloorPage()
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
// @import "./css.scss";
</style>

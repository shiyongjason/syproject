<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">楼层信息</div>
            <div class="query-cont-row">
                <el-form :model="floorForm" :rules="rules" ref="floorForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="楼层名称：" prop="floorName">
                        <el-input v-model="floorForm.floorName"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="floor-tit">选择商品</div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品类目：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onFindList">查询</h-button>
                    <h-button>重置</h-button>
                </div>
            </div>
            <div class="mb20">
                <h-button type="primary">批量选择</h-button>
            </div>
            <hosJoyTable ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="onFindList" actionWidth='250' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table>选择</h-button>
                    <h-button table>取消选择</h-button>
                </template>
            </hosJoyTable>
            <div class="floor-tit mt20">已选择该楼层的商品</div>
            <!-- 表格操作 -->
            <hosJoyTable ref="hosjoyTable" align="center" border stripe :column="formTableLabel" :data="tableForm" isAction>
                <template #action="slotProps">
                    <h-button table>选择</h-button>
                    <h-button table>取消选择</h-button>
                </template>
            </hosJoyTable>
        </div>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import Bannertabs from './components/banner_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import Categorytabs from './components/category_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import Floortabs from './components/floor_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { getFloorDetail } from './api/index'
import filters from '@/utils/filters'
import { RespBossShopFloorDetail } from '@/interface/hbp-shop'
import moment from 'moment'

@Component({
    name: 'Flooredit',
    components: {
        Bannertabs,
        Categorytabs,
        Floortabs,
        hosJoyTable
    }
})

export default class Flooredit extends Vue {
        $refs!: {
            form: HTMLFormElement
        }
        @State('userInfo') userInfo: any
        uploadParameters = {
            updateUid: '',
            reservedName: false
        }

        private _queryParams = {}
        queryParams: any = {
            roomName: '',
            roomId: ''
        }

        floorForm:RespBossShopFloorDetail={ } as RespBossShopFloorDetail

        page = {
            sizes: [15, 25, 50, 100],
            total: 0
        }

        tableData:any[] | [] = []
        tableLabel:tableLabelProps = [
            { label: 'SPU编码', prop: 'paymentOrderNo', width: '100' },
            { label: '商品名称', prop: 'deptName', width: '130' },
            { label: '商品类目', prop: 'companyName', width: '150', resizable: true },
            { label: '品牌', prop: 'supplierCompanyName', width: '180' }
        ]

        tableForm: any[] = [

        ]
        formTableLabel: tableLabelProps = [
            { label: 'SPU编码', prop: 'spuCode' },
            { label: '商品名称', prop: 'spuName' },
            { label: '商品类目', prop: 'categoryPath' },
            { label: '品牌', prop: 'brandName' },
            {
                label: '类目关联品类',
                prop: 'frontCategoryName',
                width: '150',
                className: 'form-table-header',
                showOverflowTooltip: false,
                render: (h: CreateElement, scope: TableRenderParam) => {
                    return (
                        <div>
                            <el-select
                                class="miniSelect"
                                size="mini"
                                placeholder="请选择"
                                value={scope.row[scope.column.frontCategoryId]}
                                onInput={(val) => {
                                    scope.row[scope.column.frontCategoryId] = val
                                }}
                            >
                                <el-option key="1" value={1} label="厂商">厂商</el-option>
                                <el-option key="2" value={2} label="代理商">代理商</el-option>
                                <el-option key="3" value={3} label="经销商">经销商</el-option>
                            </el-select>
                        </div>
                    )
                }
            }
        ]
        // 校验
        get rules () {
            let rules = {
                floorName: [
                    { required: true, message: '请输入楼层名称', trigger: 'blur' }
                ]
            }
            return rules
        }

        onFindList () {

        }

        handleTabClick (tab, event): void {

        }

        async mounted () {
            if (this.$route.query.id) {
                const { data } = await getFloorDetail(this.$route.query.id)
                this.tableForm = data.respBossFloorSpuList || []
            }
        }
}
</script>

<style lang='scss' scoped>
@import "./css.scss"
</style>

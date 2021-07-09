<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">楼层信息</div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">楼层名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
            </div>
            <div class="floor-tit">选择商品</div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary">查询</h-button>
                    <h-button>重置</h-button>
                </div>
            </div>
            <div class="mb20">
                <h-button type="primary">批量选择</h-button>
            </div>
            <hosJoyTable  ref="hosjoyTable" align="center"  border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='250'
                isAction :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table>选择</h-button>
                    <h-button table>取消选择</h-button>
                </template>
            </hosJoyTable>
            <div class="floor-tit mt20">已选择该楼层的商品</div>
            <!-- 表格操作 -->
             <hosJoyTable  ref="hosjoyTable" align="center"  border stripe  :column="formTableLabel" :data="tableForm" isAction>
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

import filters from '@/utils/filters'

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

        uploadParameters = {
            updateUid: '',
            reservedName: false
        }
        activeName:string='banner'
        innerVisible:boolean = false
        brandVideoUrl:string = ''
        page = {
            sizes: [10, 20, 50, 100],
            total: 0
        }
        tableData:any[] | [] = []
        private _queryParams = {}
        queryParams: any = {
            roomName: '',
            roomId: ''

        }
        PAYMENTSTATUS: Map<number | null, string> = new Map([
            [null, '-'],
            [1, '待支付'],
            [2, '部分支付']
        ])
        @State('userInfo') userInfo: any

        tableLabel:tableLabelProps = [
            { label: 'SPU编码', prop: 'paymentOrderNo', width: '100' },
            { label: '商品名称', prop: 'deptName', width: '130' },
            { label: '商品类目', prop: 'companyName', width: '150', resizable: true },
            { label: '品牌', prop: 'supplierCompanyName', width: '180' }
        ]

        formTableLabel: tableLabelProps = [
            { label: 'SPU编码', prop: 'paymentOrderNo', width: '100' },
            { label: '商品名称', prop: 'deptName', width: '130' },
            { label: '商品类目', prop: 'companyName', width: '150', resizable: true },
            { label: '品牌', prop: 'supplierCompanyName', width: '180' },
            {
                label: '上游供应商类型',
                prop: 'upstreamSupplierType',
                width: '130',
                className: 'form-table-header',
                showOverflowTooltip: false,
                render: (h: CreateElement, scope: TableRenderParam) => {
                    return (
                        <div>
                            <el-select
                                class="miniSelect"
                                size="mini"
                                placeholder="请选择"
                                value={scope.row[scope.column.property]}
                                onInput={(val) => {
                                    scope.row[scope.column.property] = val
                                }}
                            >
                                <el-option key="1" value={1} label="厂商">厂商</el-option>
                                <el-option key="2" value={2} label="代理商">代理商</el-option>
                                <el-option key="3" value={3} label="经销商">经销商</el-option>
                            </el-select>
                            {/* <p class='required-txt'>222</p>**/}
                        </div>
                    )
                }
            }
        ];
        handleTabClick (tab, event): void {

        }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>

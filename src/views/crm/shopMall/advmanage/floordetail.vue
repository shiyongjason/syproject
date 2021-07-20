<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">楼层信息</div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">楼层名称：</div>
                    <div class="query-col__input">
                        {{floorForm.floorName}}
                    </div>
                </div>
            </div>
            <div class="floor-tit">已选择该楼层的商品</div>
            <!-- 表格操作 -->
            <hosJoyTable ref="hosjoyTable" align="center" border stripe :column="formTableLabel" :data="tableForm" :isAction=false>
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
    name: 'Floordetail',
    components: {
        Bannertabs,
        Categorytabs,
        Floortabs,
        hosJoyTable
    }
})

export default class Floordetail extends Vue {
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

    floorForm: RespBossShopFloorDetail = { } as RespBossShopFloorDetail

    page = {
        sizes: [15, 25, 50, 100],
        total: 0
    }

    tableForm: any[] = [

    ]
    formTableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'code' },
        { label: '商品名称', prop: 'name' },
        { label: '品牌', prop: 'brandName' }
    ]

    async mounted () {
        if (this.$route.query.id) {
            const { data } = await getFloorDetail(this.$route.query.id)
            this.floorForm = data
            this.tableForm = data.respBossFloorSpuList || []
        }
    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>

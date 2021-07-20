<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">品类信息</div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">品类名称：</div>
                    <div class="query-col__input">
                        {{floorForm.frontCategoryName}}
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">品类序值：</div>
                    <div class="query-col__input">
                        {{floorForm.sort}}
                    </div>
                </div>
            </div>
            <div class="floor-tit">已选择该品类的类目</div>
            <!-- 表格操作 -->
            <hosJoyTable ref="hosjoyTable" align="center" border :isShowIndex="true" stripe :column="formTableLabel" :data="tableForm" :isAction='false'>
            </hosJoyTable>

        </div>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import filters from '@/utils/filters'
import { BossFrontCategoryDetailResp } from '@/interface/hbp-shop'
import { getCateGroyDetail } from './api/index'

@Component({
    name: 'Categorydetail',
    components: {
        hosJoyTable
    }
})

export default class Categorydetail extends Vue {
        $refs!: {
            form: HTMLFormElement
        }
        floorForm: Partial<BossFrontCategoryDetailResp> = { }

        tableForm: any[] = [

        ]
        formTableLabel: tableLabelProps = [
            { label: '类目编码', prop: 'code' },
            { label: '类目信息', prop: 'categoryPath' },
            { label: '上架商品数量', prop: 'onShelfSpuNum' }
        ]

        async mounted () {
            if (this.$route.query.id) {
                const { data } = await getCateGroyDetail(this.$route.query.id)
                this.tableForm = data.bossCategorySpuDetailResponseList
                this.floorForm = { ...data }
            }
        }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>

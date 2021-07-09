
<template>
    <div class="banner-tab">
        <div class="baner-btn mb20">
            <el-button type="primary" @click="onAddFloor">新增楼层</el-button>
        </div>
        <hosJoyTable isShowIndex ref="hosjoyTable" align="center"  border stripe :column="tableLabel" :data="tableData" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0'>
            <template #action="slotProps">
                    <h-button table @click="onEditLive(slotProps.data.row)">查看</h-button>
                    <h-button table v-if="slotProps.data.row.status==1" @click="onPutHome(slotProps.data.row)">启用</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">编辑</h-button>.
                    <h-button table @click="onDelete(slotProps.data.row)">删除</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">上移</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">下移</h-button>
            </template>
        </hosJoyTable>

    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件

import { CreateElement } from 'vue'

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
        uploadParameters = {
            updateUid: '',
            reservedName: false
        }
        dialogVisible:boolean = false
        ruleForm:object={
            payVouchers: []
        }
        page = {
            sizes: [10, 20, 50, 100],
            total: 0
        }

        tableData:any[] | [] = []

        tableLabel: tableLabelProps = [
            { label: '楼层名称', prop: 'deviceBrand', width: '120' },
            { label: '品类名称及商品数量', prop: 'upstreamSupplierName', width: '200' },
            { label: '创建时间', prop: 'upstreamSupplierType', width: '150', dicData: [{ value: 1, label: '厂商' }, { value: 2, label: '代理商' }, { value: 3, label: '经销商' }] },
            { label: '更新时间', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] },
            { label: '楼层状态', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] }
        ]

        onAddFloor () {
            // this.dialogVisible = true
            this.$router.push({ path: '/goodwork/flooredit' })
        }
}
</script>
<style lang='scss' scoped>
// @import "./css.scss";
</style>

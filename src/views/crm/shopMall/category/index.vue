
<template>
  <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">品类名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">类目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.companyName" maxlength="20" placeholder="请输入经销商名称"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont__row mb20">
                <h-button type="primary" >新增品类</h-button>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center"  border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0' >
                <template #action="slotProps">
                    <h-button table >查看详情</h-button>

                </template>
            </hosJoyTable>
        </div>

    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'

import { CreateElement } from 'vue'

@Component({
    name: 'Bannertabs',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload
    }
})
export default class Bannertabs extends Vue {
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
        queryParams:object={

        }

        page = {
            sizes: [10, 20, 50, 100],
            total: 0
        }

        tableData:any[] | [] = []

        tableLabel: tableLabelProps = [
            { label: '品类名称', prop: 'deviceBrand', width: '120' },
            { label: '类目信息', prop: 'upstreamSupplierName' },
            { label: '创建时间', prop: 'upstreamSupplierType' },
            { label: '更新时间', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] },
            { label: '更新人', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] },
            { label: '品类上架数量', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] }

        ]

        getList () {

        }

        onReset () {

        }
}
</script>
<style lang='scss' scoped>
// @import "./css.scss";
</style>

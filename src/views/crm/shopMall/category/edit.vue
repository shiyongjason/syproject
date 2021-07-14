
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
                        1123
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">类名搜索：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="可输入类目名称、类目编码进行搜索" maxlength="50"></el-input>
                    </div>
                </div>

            </div>
            <!-- end search bar -->
           <tree-table ref="treeTable" :data="data" :columns="columns" :selectable="true" :expand-type="false" @checkbox-click='onClickCheckbox' children-prop="subCategoryList" >
                <template slot="operations" slot-scope="scope">
                    <h-button table @click="onShowEdit(scope.row)">修改</h-button>
                    <h-button table @click="onShowParams(scope.row)" v-if="scope.row.level === 2">设置参数</h-button>
                    <!-- <span class="action mr10" @click="onShowEdit(scope.row)">修改</span> -->
                    <!-- <span class="action mr10" @click="onShowParams(scope.row)" v-if="scope.row.level === 2">设置参数</span> -->
                </template>
            </tree-table>
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
        columns= [
            {
                title: '一级类目/二级类目/三级类目',
                key: 'name',
                width: '300px'
            },
            {
                title: '类目编码',
                key: 'code',
                width: '100px'
            },
            {
                title: '上架商品数量',
                key: 'name',
                width: '100px'
            }
        ]
        data= [{ id: 1, code: 'C000001', name: '冷暖系统', parentId: 0, path: '1', sort: 1, level: 1, imgUrl: null },
            { id: 2, code: 'C000001', name: '冷暖系统', parentId: 0, path: '1', sort: 1, level: 1, imgUrl: null }]

        getList () {

        }

        onClickCheckbox (val) {
            console.log(val)
        }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>

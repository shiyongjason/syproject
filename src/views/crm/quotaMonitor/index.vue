<template>
       <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.prepaymentNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">额度种类：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.prepaymentNo" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in []" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">变动额度：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.subsectionCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in []" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.subsectionCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in []" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">变动类型：</div>
                    <div class="query-col__input">
                       <div class="query-col__input">
                        <el-input type="text" v-isNum:2 v-model="queryParams.startNoPayAmount" maxlength="20" placeholder="请输入金额"><template slot="append">万元</template></el-input>
                        <span class="ml10 mr10">-</span>
                        <el-input type="text" v-isNum:2 v-model="queryParams.endNoPayAmount" maxlength="20" placeholder="请输入金额"><template slot="append">万元</template></el-input>
                    </div>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">事件：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.distributorName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">变动时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont__row mb10">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 </el-tag>
            </div>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList"
                :isActionFixed='tableData&&tableData.length>0'>

            </hosJoyTable>
        </div>
    </div>
</template>
<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
@Component({
    name: 'quotamonitor',
    components: {
        hosJoyTable
    }
})
export default class Advancelist extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    private queryParams:Record<string, any>={
        prepaymentNo: ''
    }
    page = {
        total: 0
    }
    private tableLabel:tableLabelProps = [
        { label: '事件', prop: 'prepaymentNo', width: '160px' },
        { label: '描述', prop: 'subsectionName' },
        { label: '额度种类', prop: 'distributor' },
        { label: '企业名称', prop: 'projectName', width: '120' },
        { label: '分部', prop: 'applyAmount', displayAs: 'money' },
        { label: '变动前(万元)', prop: 'status' },
        { label: '变动类型', prop: 'purchaseOrderNo' },
        { label: '变动额度（万元）', prop: 'applyUser' },
        { label: '变动后(万元)', prop: 'applyTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '变动时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' }

    ]
    private tableData = []

    public getList () {

    }
}
</script>

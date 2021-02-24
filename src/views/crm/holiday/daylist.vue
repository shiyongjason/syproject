<template>
    <div>
        <div class="page-body B2b">
            <div class="page-body-cont">
                <div class="query-cont__row">
                    <el-dropdown split-button type="primary" @click="handleClick">
                        新增节假日计划
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item,index) in yearArr" :key="item">黄金糕</el-dropdown-item>

                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="page-body-cont">
                <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" @pagination="searchList" actionWidth='375'
                    isAction :isActionFixed='tableData&&tableData.length>0'>

                </hosJoyTable>
            </div>
        </div>
    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'

export default {
    components: { hosJoyTable },
    data () {
        return {
            queryParams: {},
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '项目名称', prop: 'pasd', width: '150', showOverflowTooltip: true }
            ]
        }
    },
    methods: {
        searchList () { }
    }
}
</script>
<style lang="scss" scoped>
</style>
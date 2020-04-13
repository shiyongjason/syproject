<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">大区：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">区域：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">年份：</div>
                    <el-date-picker v-model="queryParams.year" type="year" placeholder="选择年">
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                    <el-button type="primary" class="ml20" @click="onSearch">重置</el-button>
                    <el-button type="primary" class="ml20" @click="onSearch">导入表格</el-button>
                    <el-button type="primary" class="ml20" @click="onSearch">导出表格</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <hosJoyTable ref="hosjoyTable" border stripe :showPagination='!!page.total' :column="column" :data="tableData" align="center" :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { tableLabel } from './const'
export default {
    name: 'commitValue',
    components: { hosJoyTable, HAutocomplete },
    data: function () {
        return {
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            },
            platComList: [], // 平台公司
            branchList: [],
            platList: [],
            queryParams: {
                misCode: '',
                companyCode: '',
                regionCode: '',
                subsectionCode: '',
                year: '',
                pageNumber: 1,
                pageSize: 10
            },
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            total: {},
            tableData: [],
            column: tableLabel
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        backPlat (val) {
            // 平台公司名称点击后事件
            if (val && val.value && val.value.companyShortName) {
                this.queryParams.companyCode = val.value.companyCode
            } else {
                this.queryParams.companyCode = ''
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            console.log(this.column)
            // this.column[1].label = 'shy'
            this.onQuery()
        },
        onQuery () {
            console.log('搜索')
        },
        getList (val) {
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            this.onQuery()
        }
    },
    async mounted () {
        this.onSearch()
    }
}
</script>

<style lang="scss" scoped>
</style>

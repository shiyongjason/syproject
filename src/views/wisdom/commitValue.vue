<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">大区：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.regionCode" clearable placeholder="全部" :disabled="regionDisabled" @change='getRegionCode'>
                            <el-option v-for="item in regionList" :key="item.deptcode" :label="item.deptname" :value="item.crmDeptCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" clearable placeholder="全部" :disabled="branchDisabled" @change='getSubsectionCode'>
                            <el-option v-for="item in branchList" :key="item.deptcode" :label="item.deptname" :value="item.crmDeptCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">区域：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.regionCode" clearable placeholder="全部" :disabled="regionDisabled" @change='getRegionCode'>
                            <el-option v-for="item in regionList" :key="item.deptcode" :label="item.deptname" :value="item.crmDeptCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete ref="HAutocomplete" :selectArr="platList" v-if="platList" @back-event="backPlat" :placeholder="'全部'" :disabled="platDisabled" :remove-value='removeValue'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" style="display:flex">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryParams.value3" type="year" placeholder="选择年"></el-date-picker>
                </div>
                <div class="query-cont-col pl20">
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                    <el-button type="primary" @click="onReset">重置</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <platformSaleTable ref="platformSaleTable" :tableData="tableData" :loading="platformLoading" :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></platformSaleTable>
            </div>
        </div>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
import { findBranchList, findRegionList, findPaltList, getPlatformSale, queryCompanyByParams, getPlatformSaleSum } from './api/index.js'
import platformSaleTable from './components/platformSaleTable.vue'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { DEPT_TYPE } from './store/const'
import { AUTH_WIXDOM_PLATFORM_SALE_EXPORT } from '@/utils/auth_const'
export default {
    name: 'platformSale',
    data: function () {
        return {
            platformLoading: true,
            removeValue: false,
            queryParams: {
                onLineStatus: 1,
                pageSize: 10,
                pageNumber: 1,
                signScaleStart: '', // 签约规模
                signScaleEnd: '',
                saleTimeStart: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 9 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1))) + '-01'}`, // 时间
                saleTimeEnd: new Date().toJSON().split('T')[0],
                onlineTimeStart: '', // 上线时间
                onlineTimeEnd: '',
                incremental: '', // 增量
                regionCode: '', // 大区编码
                subsectionCode: '', // 分部编码
                companyCode: '', // 公司编码
                value3: ''
            },
            paginationData: {
                totalElements: 0,
                pageSize: 10,
                pageNumber: 1
            },
            tableData: [],
            regionList: [], // 大区
            branchList: [], // 分部
            platList: [], // 平台公司
            subsectionCodeList: [], // 分部list
            checked: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    components: {
        platformSaleTable,
        HAutocomplete
    },
    methods: {
        onSearch () {
            console.log('search')
        },
        onReset () {
            console.log('重置')
        }
    },
    async mounted () {

    }
}
</script>

<style scoped>
.download {
    text-decoration: none;
    color: #ffffff;
    background: #f88825;
    line-height: 38px;
    border-radius: 4px;
    padding: 0 12px;
}
.flex-box-time {
    min-width: 500px;
}
</style>

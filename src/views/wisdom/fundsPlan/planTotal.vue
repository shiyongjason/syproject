<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title"> 查询期间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="params.applyMonth" type="month" placeholder="选择月">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <HAutocomplete :selectArr="branchList" :disabled='!this.branch' @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery()">
                        搜索
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onReset()">
                        重置
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <hosJoyTable ref="hosjoyTable" border stripe showPagination :column="column" :data="planTotalList" align="center" :total="page.total"></hosJoyTable>
        </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { summarySheet } from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'planTotal',
    mixins: [departmentAuth],
    components: {
        hosJoyTable,
        HAutocomplete
    },
    data () {
        return {
            params: {
                pageSize: 10,
                pageNumber: 1,
                startDate: '',
                endDate: ''
            },
            paramsTemp: {},
            platComList: [],
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            },
            page: {
                total: 0
            },
            column: summarySheet
        }
    },
    computed: {
        ...mapState({
            branchList: state => state.branchList
        }),
        ...mapGetters({
            planTotalList: 'fundsPlan/planTotalList'
        })
    },
    methods: {
        backPlat (val) {
            console.log(val)
            this.params.companyName = val.value.value
        },
        onReset () { }
    },
    async mounted () {
        this.paramsTemp = { ...this.params }
        await this.oldAuth()
        if (this.userInfo.deptType === 2) {
            this.selectPlatObj.selectCode = this.branchList[0].crmDeptCode
            this.selectPlatObj.selectName = this.branchList[0].deptName
        }
    }
}
</script>

<style scoped>
</style>

<template>
    <div class="tags-wrapper page-body amountImport">

        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">会员账号：</div>
                <div class="query-col-input">
                    <el-input v-model.trim="queryParams.memberAccount" maxlength="30" placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">商家账号：</div>
                <div class="query-col-input">
                    <el-input v-model.trim="queryParams.merchantAccount" maxlength="30" placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">满返余额：</div>
                <div class="query-col-input">
                    <el-input v-model.trim="queryParams.minBalance" maxlength="30" placeholder="请输入" class="smallBtn"></el-input> -
                    <el-input v-model.trim="queryParams.maxBalance" maxlength="30" placeholder="请输入" class="smallBtn"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">经营区域：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.provinceId" placeholder="请选择省" @change="onchange">
                        <el-option v-for="item in nestDdata" :key="item.provinceId" :value="item.provinceId" :label="item.name"></el-option>
                    </el-select>
                </div>
                <div class="query-col-input ml10">
                    <el-select v-model="queryParams.cityId" placeholder="请选择市">
                        <el-option v-for="item in cityOptions" :key="item.cityId" :value="item.cityId" :label="item.name"></el-option>
                    </el-select>
                </div>
                <div class="query-col-input ml10">
                    <el-select v-model="queryParams.countryId" placeholder="请选择区">
                        <el-option v-for="item in areaOptions" :key="item.countryId" :value="item.countryId" :label="item.name"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="provinceId" slot-scope="scope">
                    <span>{{scope.data.row.provinceName}}</span>&nbsp;&nbsp;<span>{{scope.data.row.cityName}}</span>&nbsp;&nbsp;<span>{{scope.data.row.countryName}}</span>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'memberBalance',
    data () {
        return {
            options: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                memberAccount: '',
                merchantAccount: '',
                minBalance: '',
                maxBalance: '',
                provinceId: '',
                cityId: '',
                countryId: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '会员账号', prop: 'memberAccount' },
                { label: '企业名称', prop: 'memberName' },
                { label: '经营区域', prop: 'provinceId' },
                { label: '商家名称', prop: 'merchantName' },
                { label: '满返余额(元)', prop: 'balance', formatters: 'moneyShow' }
            ]

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            fullReturnBalanceList: state => state.hmall.membershipInterests.fullReturnBalanceList
        }),
        ...mapGetters({
            nestDdata: 'nestDdata'
        }),
        cityOptions () {
            if (this.nestDdata.length) {
                const province = this.nestDdata.filter(item => item.provinceId == this.queryParams.provinceId)
                if (province.length > 0) {
                    return province[0].cities
                }
            }

            return []
        },
        areaOptions () {
            const city = this.cityOptions.filter(item => item.cityId == this.queryParams.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        }
    },
    mounted () {
        this.onSearch()
        this.getdate()
    },
    methods: {
        ...mapActions({
            fullReturnBalance: 'membershipInterests/fullReturnBalance',
            findNest: 'findNest'
        }),
        onchange () {
            this.queryParams.cityId = ''
            this.queryParams.countryId = ''
        },
        async onQuery () {
            await this.fullReturnBalance(this.searchParams)
            this.tableData = this.fullReturnBalanceList.records
            this.pagination = {
                pageNumber: this.fullReturnBalanceList.current,
                pageSize: this.fullReturnBalanceList.size,
                total: this.fullReturnBalanceList.total
            }
        },
        async getdate () {
            await this.findNest()
            console.log(this.nestDdata)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onReset () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
            this.getFindNest()
        }
    }
}
</script>

<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
        &:first-child {
            font-size: 16px;
        }
        &:last-child {
            text-align: right;
        }
    }
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
/deep/.el-dialog__body {
    padding-top: 10px;
}
</style>

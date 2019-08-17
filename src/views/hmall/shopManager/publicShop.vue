<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司名称：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.merchantName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">共享平台公司名称：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.shareMerchantName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.isEnable">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="启用" :value="1"></el-option>
                            <el-option label="停用" :value="0"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">共享类目名称：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.shareCategoryName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">维护人：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.updateBy" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">维护时间：</div>
                    <div class="query-col-input">
                        <el-date-picker
                            v-model="queryParams.startTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="开始日期"
                            :picker-options="pickerOptionsStart"
                        >
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker
                            v-model="queryParams.endTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="结束日期"
                            :picker-options="pickerOptionsEnd"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="findPublicShop">
                            搜索
                        </el-button>
                        <el-button type="primary" class="ml20" @click="reset">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <PublicShopTable
                :tableData="tableData"
                :paginationData="paginationData"
                @onQuery="findPublicShop"
                @onSizeChange="onSizeChange"
                @onCurrentChange="onCurrentChange"></PublicShopTable>
        </div>
    </div>
</template>

<script>
import PublicShopTable from './components/publicShopTable'
import { findPublicShop } from './api/index'
export default {
    name: 'publicShop',
    components: {
        PublicShopTable
    },
    data () {
        return {
            queryParams: {
                endTime: '',
                isEnable: '',
                merchantName: '',
                pageNumber: 1,
                pageSize: 10,
                shareCategoryName: '',
                shareMerchantName: '',
                startTime: '',
                updateBy: ''
            },
            tempQuery: {},
            tableData: [],
            paginationData: {}
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        reset () {
            this.queryParams = { ...this.tempQuery }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findPublicShop()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.findPublicShop()
        },
        async findPublicShop () {
            const { ...params } = this.queryParams
            const { data } = await findPublicShop(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        }
    },
    mounted () {
        this.tempQuery = { ...this.queryParams }
        this.findPublicShop()
    }
}
</script>

<style scoped>

</style>

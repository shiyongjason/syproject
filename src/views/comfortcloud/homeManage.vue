<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont spanflex">
            <span>家庭概览</span>
            <span>家庭数量：377个备份 有效家庭：200个</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号/网关号：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.product" clearable>
                        <el-option v-for="(item,index) in productType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.beginDate" type="date" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endDate" type="date" value-format='yyyy-MM-dd' placeholder="请选择时间" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='280'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'homemanage',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.endDate
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.beginDate
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        }
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                platformType: '',
                product: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '家庭名称', prop: 'productN' },
                { label: '管理员手机号', prop: 'platformTypeN', width: '120px' },
                { label: '成员数', prop: 'versionCode' },
                { label: '物联网关', prop: 'status' },
                { label: '零科米网关', prop: 'forcedN' },
                { label: '设备数', prop: 'remark' },
                { label: '房间数', prop: 'versionAddress' },
                { label: '创建时间 ', prop: 'createUid', formatters: 'dateTime' },
                { label: '地址', prop: 'updateTime', }

            ]
        }
    },
    watch: {

    },
    mounted () {
        this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // console.log(this.searchParams)
            const { data } = await getAppVersionList(this.searchParams)
            // console.log(data)
            this.tableData = data.data.list
            this.pagination = {
                pageNumber: data.data.pageNum,
                pageSize: data.data.pageSize,
                total: data.data.total
            }
            this.tableData.map(i => {
                i.productN = i.product == 1 ? '单分享' : i.product == 2 ? 'IOT' : i.product
                i.platformTypeN = i.platformType == 1 ? '安卓' : i.platformType == 2 ? '苹果' : i.platformType
                i.forcedN = i.forced ? '是' : '否'
            })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'product', '')
            this.$set(this.queryParams, 'platformType', '')
            this.$set(this.queryParams, 'beginDate', '')
            this.$set(this.queryParams, 'endDate', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onEdit (val) {
            this.$router.push({ path: '/comfortCloud/homedetail', query: {} })
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
</style>

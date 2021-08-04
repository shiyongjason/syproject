<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">对接系统：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.systemType" placeholder="请选择" :clearable=true>
                            <el-option v-for="item in SYSTEM_TYPE" :key="item[0]" :label="item[1]"
                                       :value="item[0]">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">调用接口：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.interfaceType" placeholder="请选择" :clearable=true>
                            <el-option v-for="item in INTERFACE_TYPE" :key="item[0]" :label="item[1]"
                                       :value="item[0]">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">调用时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="findApiCompensationSchemeList({ ...queryParams, pageNumber: 1 })">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <basicTable is-action :tableData="apiCompensationSchemeList" :tableLabel="tableLabel" :pagination="apiCompensationSchemePagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isShowIndex='true'>
                <template slot="systemType" slot-scope="scope">
                    <span class="colblue">{{SYSTEM_TYPE.get(scope.data.row.systemType)}}</span>
                </template>
                <template slot="interfaceType" slot-scope="scope">
                    <span class="colblue">{{INTERFACE_TYPE.get(scope.data.row.interfaceType)}}</span>
                </template>
                <template slot="createTime" slot-scope="scope">
                    <span class="colblue">{{ scope.data.row.createTime | formatDate('YYYY-MM-DD HH:mm:ss') }}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="reCall(scope.data.row)">重新调用</h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { updateApiCompensationScheme } from './api/index'
import { mapActions, mapGetters } from 'vuex'

const SYSTEM_TYPE = new Map([
    [ 1, '司库' ],
    [ 2, 'MIS' ],
    [ 3, 'OA' ]
])
const INTERFACE_TYPE = new Map([
    [ 1, '供应商创建接口' ],
    [ 2, '上游支付同步司库' ],
    [ 3, '上游支付同步OA' ]
])

export default {
    name: 'apiCompensationScheme',
    data () {
        return {
            SYSTEM_TYPE,
            INTERFACE_TYPE,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                startDate: '',
                endDate: '',
                systemType: '',
                interfaceType: ''
            },
            tableLabel: [
                { label: '支付单号', prop: 'paymentOrderNo', width: '150' },
                { label: '对接系统', prop: 'systemType' },
                { label: '调用接口', prop: 'interfaceType' },
                { label: '报错原因', prop: 'remark' },
                { label: '调用时间', prop: 'createTime' }
            ]
        }
    },
    computed: {
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-dd',
                format: 'yyyy-MM-dd',
                startTime: this.queryParams.startDate,
                endTime: this.queryParams.endDate
            }
        },
        ...mapGetters({
            apiCompensationSchemeList: 'apiCompensationSchemeStore/apiCompensationSchemeList',
            apiCompensationSchemePagination: 'apiCompensationSchemeStore/apiCompensationSchemePagination'
        })
    },
    methods: {
        onStartChange (val) {
            this.queryParams.startDate = val
        },
        onEndChange (val) {
            this.queryParams.endDate = val
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
            this.findApiCompensationSchemeList(this.queryParams)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findApiCompensationSchemeList(this.queryParams)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findApiCompensationSchemeList(this.queryParams)
        },
        ...mapActions({
            findApiCompensationSchemeList: 'apiCompensationSchemeStore/apiCompensationSchemeList'
        }),
        reCall (row) {
            updateApiCompensationScheme({ id: row.id }) // todo 后台接口没通 暂时没办法调
            this.$message.success('重新调用')
        }
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        this.findApiCompensationSchemeList(this.queryParams)
    }
}
</script>

<style scoped>

</style>

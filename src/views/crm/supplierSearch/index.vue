<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">供应商名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.supplierName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">创建时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态码：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.invalidStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="正常" :value="0"></el-option>
                            <el-option label="作废" :value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">开户行：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.supplierAccountName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.supplierAccountNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">银行联行行号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.supplierBankNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">出票状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.invoiceStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未出票" :value="0"></el-option>
                            <el-option label="出票过" :value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">转账状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.accountStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未转账" :value="0"></el-option>
                            <el-option label="转账过" :value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="findPurchaseList({ ...queryParams, pageNumber: 1 })">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <hosJoyTable v-if="supplierList" isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="supplierList" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="supplierListPagination.total" @pagination="findPurchaseList"
                actionWidth='120' isAction :isActionFixed='supplierList&&supplierList.length>0'>
                   <template #action="slotProps">
                    <h-button table v-if="slotProps.data.row.invalidStatus==0&&hosAuthCheck(SUPPLIER_NO)"  @click="onHandleOperate(slotProps.data.row)">作废</h-button>
                    <h-button table v-if="slotProps.data.row.invalidStatus==1&&hosAuthCheck(SUPPLIER_YES)" @click="onHandleOperate(slotProps.data.row)">取消作废</h-button>
                   </template>
            </hosJoyTable>
        </div>
    </div>
</template>

<script>
import { deepCopy } from '@/utils/utils'
import { newCache } from '@/utils/index'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { updateInvalidNo, updateValidNo } from './api/index'
import { SUPPLIER_YES, SUPPLIER_NO } from '@/utils/auth_const'
import * as Api from '@/views/crm/supplierSearch/api'
export default {
    name: 'supplierSearch',
    components: { hosJoyTable },
    data () {
        return {
            queryParams: {
                SUPPLIER_YES,
                SUPPLIER_NO,
                pageNumber: 1,
                pageSize: 10,
                startTime: '',
                endTime: '',
                supplierName: '',
                createBy: '',
                supplierAccountName: '',
                supplierAccountNo: '',
                supplierBankNo: '',
                invoiceStatus: '',
                accountStatus: '',
                invalidStatus: ''
            },
            tableLabel: [
                { label: '供应商编码', prop: 'supplierCode', width: '150' },
                { label: '状态码', prop: 'invalidStatus', dicData: [{ value: 0, label: '正常' }, { value: 1, label: '作废' }] },
                { label: '出票状态', prop: 'invoiceStatus', dicData: [{ value: 0, label: '未出票' }, { value: 1, label: '出票过' }] },
                { label: '转账状态', prop: 'accountStatus', dicData: [{ value: 0, label: '未转账' }, { value: 1, label: '转账过' }] },
                { label: '供应商名称', prop: 'supplierName' },
                { label: '开户行', prop: 'supplierAccountName' },
                { label: '账号', prop: 'supplierAccountNo' },
                { label: '银行联行行号', prop: 'supplierBankNo' },
                { label: '创建时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
                { label: '作废人', prop: 'invalidBy' },
                { label: '作废时间', prop: 'invalidTime', displayAs: 'YYYY-MM-DD HH:mm:ss' }

            ],
            supplierList: [],
            supplierListPagination: {}
        }
    },
    computed: {
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm:ss',
                format: 'yyyy-MM-dd HH:mm:ss',
                startTime: this.queryParams.startTime,
                endTime: this.queryParams.endTime
            }
        }
        // ...mapGetters({
        //     supplierList: 'supplierSearchStore/supplierList',
        //     supplierListPagination: 'supplierSearchStore/supplierListPagination'
        // })
    },
    methods: {
        onStartChange (val) {
            this.queryParams.startTime = val
        },
        onEndChange (val) {
            this.queryParams.endTime = val
        },
        onReset () {
            this.queryParams = deepCopy(this.queryParamsTemp)
            this.findPurchaseList(this.queryParams)
        },
        handleSizeChange (val) {
            console.log('val: ', val)
            this.queryParams.pageSize = val
            this.findPurchaseList(this.queryParams)
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findPurchaseList(this.queryParams)
        },
        onHandleOperate (val) {
            if (val.invalidStatus == 0) {
                // 正常
                this.$confirm('确认作废该笔资料！', '作废', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await updateInvalidNo(val.id)
                    this.findPurchaseList(this.queryParams)
                }).catch(() => {

                })
            } else {
                // 取消
                this.$confirm('确认取消作废该笔资料！', '取消作废', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await updateValidNo(val.id)
                    this.findPurchaseList(this.queryParams)
                }).catch(() => {

                })
            }
        },
        async  findPurchaseList () {
            const { data } = await Api.getSupplierSearchList(this.queryParams)
            this.supplierList = data.records || []
            this.supplierListPagination.total = data.total
        }
        // ...mapActions({
        //     findPurchaseList: 'supplierSearchStore/findPurchaseList'
        // })
    },
    mounted () {
        this.queryParamsTemp = deepCopy(this.queryParams)
        this.findPurchaseList(this.queryParams)
        console.log('this.queryParams: ', this.queryParams)
    },
    beforeUpdate () {
        newCache('supplierSearch')
    }
}
</script>

<style scoped lang="scss">
</style>

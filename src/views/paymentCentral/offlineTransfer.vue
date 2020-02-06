<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">单分享账户名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.accountName" placeholder="请输入单分享账户名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">白名单银行账号名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.bankCertName" placeholder="请输入白名单银行账号名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">白名单银行账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.bankCardNo" placeholder="请输入白名单银行账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.isDownload">
                            <el-option v-for="item in downState" :key="item.key" :label="item.label" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onImport()">
                            导出
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 :isShowIndex='true'>
                <template slot="isDownload" slot-scope="scope">
                    {{scope.data.row.isDownload==1?'是':'否'}}
                </template>
            </basicTable>
        </div>
        <!-- <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable> -->
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    name: 'paymentwhite',
    data () {
        return {
            queryParams: {
                accountName: '',
                bankCardNo: '',
                pageNumber: 1,
                pageSize: 10,
                bankCertName: '',
                isDownload: ''
            },
            copyParams: {},
            tableData: [],
            tableLabel: [
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '单分享账户名', prop: 'accountName', width: 150 },
                { label: '白名单发卡行', prop: 'bankName', width: 150 },
                { label: '白名单分支行', prop: 'bankBranchName', width: 150 },
                { label: '白名单银行账号户名', prop: 'bankCertName', width: 150 },
                { label: '白名单银行账号', prop: 'bankCardNo', width: 150 },
                { label: '状态', prop: 'isDownload' }
            ],
            paginationInfo: {},
            downState: [{ label: '全部', key: '' }, { label: '是', key: 1 }, { label: '否', key: 0 }]
        }
    },
    computed: {
        ...mapGetters({
            paymentWhite: 'paymentWhite'
        })
    },
    mounted () {
        this.onFindPayment()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        ...mapActions({
            findPaymentwhite: 'findPaymentwhite'
        }),
        onCopy (id) {
            this.$router.push({ path: '/hmall/createEditEvent', query: { copeId: id } })
        },
        searchList () {
            this.queryParams.pageNumber = 1
            this.onFindPayment()
        },
        onRest () {
            this.queryParams = { ...this.copyParams }
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onFindPayment()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onFindPayment()
        },
        async onFindPayment () {
            await this.findPaymentwhite(this.queryParams)
            let paymentList = this.paymentWhite.records
            this.tableData = paymentList
            console.log(this.tableData)
            this.paginationInfo = {
                total: this.paymentWhite.total,
                pageNumber: this.paymentWhite.current,
                pageSize: this.paymentWhite.size
            }
        },
        onImport () {
            var url = ''
            for (var key in this.queryParams) {
                url += (key + '=' + this.queryParams[key] + '&')
            }
            // console.log(url)
            location.href = B2bUrl + 'payment/api/accounts/offline-payment-white-list/export?'
                + url + 'access_token=' + sessionStorage.getItem('tokenB2b')
        },
    }
}
</script>
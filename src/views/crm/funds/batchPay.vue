<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="batch">
                <div class="batch_tit">批量支付账单</div>
                <div class="batch_msg mb20"><i>*</i>经销商：{{batchDetail.companyName}}</div>
                <HosjoyTable localName="V1.*" ref="hosjoyTable" align="center" isShowselection :column="tableLabel"
                @selection-change="handleSelectionChange" :data="tableData" @sort-change='onSortChange'>
                </HosjoyTable>
                <div class="batch_msg"><i>*</i>对应账单的付款凭证：</div>
                <p>（最多支持上传数量为20个文件，单个文件大小不超过20M，上传格式为JPG/JPEG/PNG等主流格式图片）</p>
                <div class="batch_files" v-for="(item,index) in docPos" :key='index'>
                    <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                    <em> <a :href="item.fileUrl" target="_blank">预览</a></em>
                    <em @click="onDelete(item,index)">删除</em>
                </div>
                <HosJoyUpload v-model="docPos" :showPreView=false :fileSize=20 :action='action' :fileNum='20' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' style="margin:10px 0 0 5px">
                    <el-button size="medium" type="primary"><i class="el-icon-upload file-icon"></i>上 传 文 件</el-button>
                </HosJoyUpload>
                <div class="batch_bot">
                    <span>应支付总额(元)：{{payTotal|moneyFormat}}</span>
                    <el-button type="primary" @click="onSubmit">确定并提交</el-button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import HosjoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { ccpBaseUrl } from '@/api/config'
import { getFundsPayBatch, payVoucherBatch } from './api/index'
export default {
    name: 'batchpay',
    components: { HosjoyTable, HosJoyUpload },
    data () {
        return {
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            fileDialog: false,
            docPos: [],
            tableLabel: [
                { label: '项目名称', prop: 'projectName' },
                { label: '账单流水号', prop: 'id' },
                { label: '账单类型', prop: 'repaymentType', dicData: [{ value: 1, label: '首付款' }, { value: 2, label: '剩余货款' }, { value: 3, label: '服务费' }] },
                { label: '金额(元)', prop: 'paymentAmount', displayAs: 'money' },
                { label: '状态', prop: 'paymentFlag', dicData: [{ value: 0, label: '待支付' }, { value: 1, label: '支付待确认' }, { value: 2, label: '已支付' }, { value: 3, label: '支付失败' }, { value: 4, label: '已取消' }] },
                { label: '应支付日期', prop: 'schedulePaymentDate', displayAs: 'YYYY-MM-DD', sortable: 'custom' }
            ],
            tableData: [],
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                companyId: '',
                'sort.property': null,
                'sort.direction': null
            },
            paginationInfo: {

            },
            batchDetail: {},
            // fundId: [],
            // paymentAmount: [],
            fundBatchList: [],
            payTotal: 0
        }
    },
    methods: {
        onDelete (item, index) {
            this.$confirm('此操作将删除该凭证, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.docPos.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                // do nothing
            })
        },
        onSortChange (val) {
            if (val) {
                this.queryParams['sort.property'] = val.prop + ''
                this.queryParams['sort.direction'] = val.order === 'ascending' ? 'ASC' : 'DESC'
            } else {
                this.queryParams['sort.property'] = null
                this.queryParams['sort.direction'] = null
            }
            this.onGetList(this.queryParams)
        },
        handleSelectionChange (row) {
            this.fundBatchList = []
            this.payTotal = 0
            row && row.map(item => {
                this.fundBatchList.push({
                    fundId: item.id,
                    paymentAmount: item.paymentAmount
                })
                this.payTotal = item.paymentAmount + this.payTotal
            })
            // 求和
            // this.payTotal = row.reduce((a, b) => a.paymentAmount + b.paymentAmount)
        },
        async onGetList () {
            this.queryParams.companyId = this.$route.query.companyId
            const { data } = await getFundsPayBatch(this.queryParams)
            this.batchDetail = data
            this.tableData = data.batchFunds
        },
        async onSubmit () {
            const params = {
                fundBatchList: this.fundBatchList,
                attachDocs: this.docPos,
                companyId: this.$route.query.companyId
            }
            if (this.fundBatchList.length == 0) {
                this.$message({
                    message: '请选择要支付的账单~',
                    type: 'warning'
                })
                return
            }
            if (this.docPos == 0) {
                this.$message({
                    message: '请至少上传一张支付凭证~',
                    type: 'warning'
                })
                return
            }
            await payVoucherBatch(params)
            this.$alert('支付凭证已上传，请待后台审核确认', '凭证上传成功', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push({ path: '/goodwork/funds' })
                }
            })
        }
    },
    mounted () {
        this.onGetList()
    }
}
</script>
<style lang="scss" scoped>
.batch {
    position: relative;
    width: 100%;
    &_tit {
        font-size: 18px;
    }
    &_msg {
        margin-top: 20px;
        i {
            color: red;
        }
    }
    p {
        color: #909399;
    }
    &_files {
        margin: 10px 0 0 0;
        display: flex;
        i {
            font-size: 18px;
            margin: 0 !important;
            color: #ff6600;
            padding-right: 5px;
        }
        span {
            width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ff6600;
        }
        em {
            display: block;
            font-style: normal;
            margin-left: 10px;
            color: #169bd5;
            cursor: pointer;
        }
    }
    &_bot {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        padding: 20px 0 ;
        border-top:1px solid #e5e5e5;
        span{
            font-size: 25px;
        }
    }
}
.file-icon {
    font-size: 18px;
    margin: 0 !important;
    line-height: 24px !important;
    color: #fff;
}
</style>
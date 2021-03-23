<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">会员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.orderId" placeholder="请输入订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.productName" placeholder="请输入商品名称"></el-input>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">下单时间： </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                    </div>
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onImportOrder">导入订单</el-button>
                    </div>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">
                已筛选 {{cloudMerchantProductOrderPagination.total}} 项；
                累计成交订单: {{cloudMerchantProductOrderTotal.totalOrderCount}}笔；
                累计销售件数: {{cloudMerchantProductOrderTotal.totalProductCount}}单；
                累计成交金额:{{cloudMerchantProductOrderTotal.totalOrderAmount}}元
            </el-tag>
            <!-- 表格使用老毕的组件 -->
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="cloudMerchantProductOrderList" :isShowIndex='false' :pagination="cloudMerchantProductOrderPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="status" slot-scope="scope">
                    {{orderStatusDesc(scope.data.row.status)}}
                </template>
                <template slot="consigneeAddress" slot-scope="scope">
                    {{addressDesc(scope.data.row)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>

            <el-dialog title="订单详情" :modal-append-to-body=false :append-to-body=false :visible.sync="detailDialogVisible" width="50%">
                <h1 style="padding-bottom: 10px">订单信息</h1>
                <p style="line-height: 25px">商品总价 ￥{{focusDetailOrder.orderProductAmount}} <br>
                    订单运费 ￥{{focusDetailOrder.freight}}<br>
                    优惠金额 -￥{{focusDetailOrder.discountAmount}}<br>
                    商品改价 -￥{{focusDetailOrder.changePrice}}<br>
                    总{{focusDetailOrder.orderProductCount}}件，实付款￥{{focusDetailOrder.payAmount}}
                </p>
                <h1 style="padding-top: 20px">商品明细</h1>
                <basicTable style="margin: 20px 0" :tableLabel="prouctDetailTableLabel" :tableData="cloudMerchantProductOrderDetail" :isShowIndex='false'>
                </basicTable>
            </el-dialog>
            <el-dialog title="导入第三方订单明细" :visible.sync="importDialogVisible" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseImprtDialog">
                <el-upload class="upload-fault" ref="upload" :file-list="fileList" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeAvatarUpload" v-bind="uploadData">
                    <el-button type="primary" slot="trigger">选择本地文件</el-button>
                    <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                    <p slot="tip" class="el-upload__tip">2.请按照设备出库模板内容导入数据，否则可能会出现导入异常</p>
                    <p slot="tip" class="el-upload__tip">3.在模版中完成内容填写后，请将表格内已输入的内容复制到新的Excel中再进行导入</p>
                </el-upload>
                <el-button class="errorBtn" v-if="errorData.failList.length > 0" @click="errorShow = true">上传失败数据</el-button>
                <div class="downloadExcel">
                    <a href="/excelTemplate/订单模板.xls" download="订单模板.xls">订单模板</a>
                </div>
<!--                <div style="color: red">{{errMessage}}</div>-->
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
<!--                <el-dialog width="1000px" title="上传结果" :visible.sync="errorShow" append-to-body>-->
<!--                    <div>-->
<!--                        <span class="uploadTips">上传数据：{{errorData.count}}条</span>-->
<!--                    </div>-->
<!--                    <div>-->
<!--                        <span class="uploadTips">上传成功：{{errorData.successCount}}条</span>-->
<!--                    </div>-->
<!--                    <div>-->
<!--                        <span class="uploadTips uploadErr">上传失败：{{errorData.failCount}}条</span>-->
<!--                    </div>-->
<!--                    <div class="basic-table">-->
<!--                        <basicTable :isShowIndex="true" :tableLabel="errTableLabel" :tableData="errorData.failList" :maxHeight='350'>-->
<!--                        </basicTable>-->
<!--                    </div>-->
<!--                </el-dialog>-->
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { iotUrl } from '@/api/config'

export default {
    name: 'merchantOrderList',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone,
                orderId: '',
                productName: '',
                startTime: '',
                endTime: ''
            },
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '订单来源', prop: 'source' },
                { label: '订单号', prop: 'orderId' },
                { label: '下单时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '订单状态', prop: 'status' },
                { label: '会员账号', prop: 'phone' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '收件人姓名', prop: 'consigneeName' },
                { label: '收件人地址', prop: 'consigneeAddress' },
                { label: '收件人手机', prop: 'consigneePhone' },
                { label: '订单实际支付金额', prop: 'payAmount', formatters: 'money' },
                { label: '订单运费', prop: 'freight' },
                { label: '订单件数', prop: 'orderProductCount' },
                { label: '支付方式', prop: 'payMethod' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '物流公司', prop: 'deliveryName' },
                { label: '快递单号', prop: 'waybillId' }
            ],
            prouctDetailTableLabel: [
                { label: '商品ID', prop: 'productId' },
                { label: '商品名称', prop: 'productName' },
                { label: '商品规格', prop: 'wxSpecification' },
                { label: '商品价格（元）', prop: 'productPrice' },
                { label: '商品数量（件）', prop: 'productCount' }
            ],
            prouctDetailTableData: [],
            detailDialogVisible: false,
            focusDetailOrder: {},
            importDialogVisible: false,
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/mall/boss/order/import`,
                limit: 1,
                autoUpload: false,
                headers: {
                    refreshToken: localStorage.getItem('refreshToken'),
                    token: `Bearer ` + localStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                },
                data: {
                    operateUserName: ''
                }
            },
            fileList: [],
            errorShow: false,
            errorData: {
                failList: []
            },
            errMessage: '',
            errTableLabel: [],
            loading: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantProductOrderList: 'cloudMerchantProductOrderList',
            cloudMerchantProductOrderPagination: 'cloudMerchantProductOrderPagination',
            cloudMerchantProductOrderDetail: 'cloudMerchantProductOrderDetail',
            cloudMerchantProductOrderTotal: 'cloudMerchantProductOrderTotal'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    activated () {
        this.onQuery()
    },
    methods: {
        ...mapActions({
            findCloudMerchantProductOrderList: 'findCloudMerchantProductOrderList',
            findCloudMerchantProductOrderDetail: 'findCloudMerchantProductOrderDetail'
        }),
        async onQuery () {
            await this.findCloudMerchantProductOrderList(this.searchParams)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        async onDetail (val) {
            this.focusDetailOrder = val
            await this.findCloudMerchantProductOrderDetail({ orderId: val.orderId })
            this.detailDialogVisible = true
        },
        orderStatusDesc (status) {
            if (status == 10) {
                return '待付款'
            } else if (status == 20) {
                return '待发货'
            } else if (status == 30) {
                return '待收货'
            } else if (status == 100) {
                return '已完成'
            } else if (status == 200) {
                return '已退货退款'
            } else if (status == 250) {
                return '已取消'
            }
            return status
        },
        addressDesc (val) {
            let address = ''
            if (val.consigneeAddress.search(val.consigneeProvinceName) === -1) {
                address += val.consigneeProvinceName
            } if (val.consigneeAddress.search(val.consigneeCityName) === -1) {
                address += val.consigneeCityName
            } if (val.consigneeAddress.search(val.consigneeCountyName) === -1) {
                address += val.consigneeCountyName
            }
            return (address += val.consigneeAddress)
        },
        onImportOrder () {
            this.importDialogVisible = true
        },
        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                try {
                    await this.$refs.upload.submit()
                } catch (e) { }
            } else {
                this.$message.error('请选择上传的文件')
                this.loading = false
            }
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        onCloseImprtDialog () {
            if (this.hasFile()) {
                this.$confirm('是否确定取消选中的文件', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.upload.clearFiles()
                    this.importDialogVisible = false
                    this.$message({
                        type: 'success',
                        message: '已取消选中的文件!'
                    })
                }).catch(() => { })
            } else {
                this.$refs.upload.clearFiles()
                this.importDialogVisible = false
            }
        },
        beforeAvatarUpload (file) {
            const isLt10M = file.size / (1024 * 1024 * 10) < 1
            const isCsv = file.name.lastIndexOf('.') > 0 ? ['.xlsx', '.xls'].indexOf(file.name.slice(file.name.lastIndexOf('.'), file.name.length)) > -1 : false
            if (!isCsv) {
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件只能是 excel 格式!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            if (!isLt10M) {
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件大小不能超过 10MB!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            return isCsv && isLt10M
        },
        uploadError (res) {
            console.log(JSON.parse(res.message).detail)
            this.$refs.upload.clearFiles()
            this.$message.error(JSON.parse(res.message).detail)
            this.loading = false
        },
        uploadSuccess () {
            this.$refs.upload.clearFiles()
            this.loading = false
            // this.errorData = response.data
            // this.errorShow = true
            this.importDialogVisible = false
            this.onQuery(this.searchParams)
            this.$message.success('上传成功')
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
    .topTitle{
        margin-right: 2rem;
        font-weight:bold;
    }
    .colred {
        color: #ff7a45;
        cursor: pointer;
    }.topColred {
         color: #ff7a45;
         cursor: pointer;
     }
    /deep/.el-dialog__body {
        padding-top: 10px;
    }
</style>

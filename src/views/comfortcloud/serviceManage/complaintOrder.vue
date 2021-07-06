<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont spanflex">
            <span>投诉工单</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">投诉工单号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入投诉工单号" v-model="queryParams.serviceNo" maxlength="50" clearable></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">投诉时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">解决状态：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.status" style="width: 100%">
                        <el-option label="处理中" value=""></el-option>
                        <el-option label="已解决" value="10"></el-option>
                        <el-option label="待处理" value="0"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">投诉产品：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入产品名称" v-model="queryParams.serviceNo" maxlength="50" clearable></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">客户手机号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入客户手机号" v-model="queryParams.serviceNo" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">经销商手机号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入经销商手机号" v-model="queryParams.serviceNo" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">经销商：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入经销商名称" v-model="queryParams.serviceNo" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="createComplaintOrder">新建投诉工单</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="serviceType" slot-scope="scope">
                    {{scope.data.row.serviceType==1?'预约维修':'清洗保养'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">详情</el-button>
                </template>
            </basicTable>
        </div>

        <el-dialog title="新增投诉工单" :visible.sync="addOrderDialogVisible" class="upload-show" width="1200px" :close-on-click-modal="false" :before-close="onCloseAddOrderDialog">
            <div class="el-dialog-div">
                <el-form :model="addOrderForm" :rules="addOrderRules" ref="addOrderForm" label-width="140px">
                    <el-form-item label-width="0">
                        <el-col :span="7">
                            <el-form-item label="客户手机号：" prop="consigneePhone">
                                <el-input v-model="addOrderForm.consigneePhone" maxlength="11" placeholder="请填写客户手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="客户姓名：" prop="consigneeName">
                                <el-input v-model="addOrderForm.consigneeName" maxlength="50" placeholder="请填写客户姓名"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="客户地址：">
                        <el-col :span="6">
                            <el-form-item label-width="0" prop="consigneeProvinceName">
                                <el-select v-model="addOrderForm.consigneeProvinceName" placeholder="请选择省" @change="onProvince" class="selectInput">
                                    <el-option label="请选择" value=""></el-option>
                                    <template v-for="item in provinceList">
                                        <el-option :key="item.provinceId" :label="item.name" :value="item.name">
                                        </el-option>
                                    </template>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="6">
                            <el-form-item label-width="0" prop="consigneeCityName">
                                <el-select v-model="addOrderForm.consigneeCityName" placeholder="请选择市" @change="onCity" class="selectInput">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option v-for="(item) in getCity" :key="item.cityId" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="6">
                            <el-form-item label-width="0" prop="consigneeCountyName">
                                <el-select v-model="addOrderForm.consigneeCountyName" placeholder="请选择区" class="selectInput">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option v-for="(item) in getCountry" :key="item.countryId" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="consigneeAddress">
                        <el-input style="width: 500px" v-model="addOrderForm.consigneeAddress" maxlength="200" :rows="1" placeholder="请输入详细地址" />
                    </el-form-item>

                    <el-form-item label="商品明细：" prop="productBOS">
                        <el-button type="primary" @click="onAddProduct">+添加商品</el-button>
                    </el-form-item>

                    <div class="query-cont-row" v-for="(productItem,index) in addOrderForm.productBOS" :key="index">
                        <el-form-item label="品类：" :prop="'productBOS.' + index + '.productCategory'" :rules="addOrderRules.productCategory">
                            <el-select v-model="productItem.productCategory" @change="()=> { selectChanged(index) }">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.categoryName" :value="item.categoryName" v-for="item in allCategorys" :key="item.categoryId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品型号：" label-width="100px" :prop="'productBOS.' + index + '.productSpecification'" :rules="addOrderRules.productSpecification">
                            <el-select v-model="productItem.productSpecification" @change="selectSpecificationIdChanged">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.specificationName" :value="item.specificationName" v-for="item in categoryTypes[index]" :key="item.specificationId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="销售金额：" label-width="100px" :prop="'productBOS.' + index + '.productAmount'" :rules="addOrderRules.productAmount">
                            <el-input style="width: 150px" v-model="productItem.productAmount" maxlength="100" :rows="1" placeholder="请输入销售金额" />
                        </el-form-item>
                        <el-form-item label="商品件数：" label-width="100px" :prop="'productBOS.' + index + '.productCount'" :rules="addOrderRules.productCount">
                            <el-input style="width: 150px" v-model="productItem.productCount" maxlength="100" :rows="1" placeholder="请输入商品件数" />
                        </el-form-item>
                        <el-button style="align-self: flex-start;margin-left: 20px;" type="primary" @click="()=> { onRemoveProduct(index) }">删除</el-button>
                    </div>
                    <el-form-item label="商品总运费：" prop="freight">
                        <el-input v-model="addOrderForm.freight" maxlength="100" :rows="1" placeholder="请输入商品总运费" />
                    </el-form-item>
                    <el-form-item label="支付方式：" prop="payMethod">
                        <el-select v-model="addOrderForm.payMethod">
                            <el-option label="选择" value=""></el-option>
                            <el-option label="支付宝转账" value="支付宝转账"></el-option>
                            <el-option label="银行转账" value="银行转账"></el-option>
                            <el-option label="微信转账" value="微信转账"></el-option>
                            <el-option label="现金支付" value="现金支付"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单总金额：" prop="payAmount">
                        <el-input v-model="addOrderForm.payAmount" maxlength="100" :rows="1" placeholder="请输入订单总金额" />
                    </el-form-item>
                    <el-form-item label="支付时间：" prop="payTime">
                        <el-date-picker v-model="addOrderForm.payTime" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="请上传支付凭证：" prop="certificate" :rules="addOrderRules.certificate" ref="payImgs">
                        <el-row :span="8">
                            <el-upload list-type="picture-card" :action="imageUploadAction" :data="imageUploadData" accept='image/jpeg, image/jpg, image/png' name='multiFile' :file-list="imgs" :multiple='true' :on-success="handleUploadImageSuccess" :limit="2" :on-exceed="uploadImageExceptMessage"
                                :before-upload="beforeImageUpload" :on-remove="handleImageRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <div class="upload-tips">上传1-2张经销商的付款截图或银行到账截图，JPEG或png均可</div>
                        </el-row>
                    </el-form-item>
                    <div style="height : 20px"></div>
                </el-form>

            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="cancelAddOrderClick">取 消</h-button>
                <h-button type="primary" @click="submitAddOrderForm" :loading="loading">确 定</h-button>
            </div>
        </el-dialog>

        <el-dialog title="服务详情" :modal-append-to-body=false :append-to-body=false :visible.sync="detailDialogVisible" width="50%">
            <div class="detailLine">
                <span>服务类型：{{detailData.serviceType===1?'预约维修':'清洗保养'}}</span><span class="centerLine">服务产品：{{detailData.product}}</span><span class="rightLine">服务时间：{{detailData.serviceTime}}</span>
            </div>
            <div class="detailLine">
                <span>客户姓名：{{detailData.customerName}}</span><span class="centerLine">客户电话：{{detailData.customerPhone}}</span>
            </div>
            <p class="detailLine">客户地址：{{detailData.customerAddress}}</p>
            <p class="detailLine">备注：{{detailData.remark==undefined?'无':detailData.remark}}</p>
            <p class="detailLine">图片：</p>
            <template v-if="detailData.picUlrs&&detailData.picUlrs.length>0">
                <div class="detailLine lastLine">
                    <el-image v-for="(src,index) in detailData.picUlrs" :key='index+"img"' :z-index='9999' fit='cover' style="width: 100px; height: 100px;marginLeft:10px" :src="src" :preview-src-list="detailData.picUlrs">
                    </el-image>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
export default {
    name: 'complaintOrder',
    data () {
        return {
            pic: {
                marginLeft: '20px',
                width: '100px',
                height: '100px'
            },
            firstPic: {
                width: '100px',
                height: '100px'
            },
            queryParams: {
                serviceNo: '',
                pageNumber: 1,
                pageSize: 10,
                operator: '',
                endTime: '',
                startTime: ''
            },
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '申请时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '服务单号', prop: 'serviceNo' },
                { label: '申请人账号', prop: 'operator', width: '120px' },
                { label: '客户姓名', prop: 'customerName' },
                { label: '客户电话', prop: 'customerPhone' },
                { label: '客户地址', prop: 'customerAddress' },
                { label: '服务类型', prop: 'serviceType' },
                { label: '服务产品', prop: 'product' }
            ],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            detailData: {},
            detailDialogVisible: false,
            addOrderDialogVisible: false
        }
    },
    methods: {
        ...mapActions({
            getServiceManageHistoryList: 'getServiceManageHistoryList'
        }),
        async onQuery () {
            await this.getServiceManageHistoryList(this.searchParams)
            this.tableData = this.serviceHistory.records
            this.pagination = {
                pageNumber: this.serviceHistory.current,
                pageSize: this.serviceHistory.size,
                total: this.serviceHistory.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        createComplaintOrder () {
            this.addOrderDialogVisible = true
        },
        onEdit (val) {
            this.detailData = val
            if (val.pictureUrl) {
                let urls = val.pictureUrl.split(',')
                this.detailData.picUlrs = urls
            } else {
                this.detailData.picUlrs = []
            }
            console.log(this.detailData)
            this.detailDialogVisible = true
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        }
    },
    mounted () {
        this.onSearch()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            serviceHistory: 'serviceManageHistoryList'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.detailLine {
    color: black;
    margin-top: 20px;
}
.lastLine {
    margin-bottom: 20px;
}
.centerLine {
    position: absolute;
    left: 33%;
}
.rightLine {
    position: absolute;
    left: 66%;
}
.picContainer {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
}
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        &:first-child {
            font-size: 16px;
        }
    }
}
</style>

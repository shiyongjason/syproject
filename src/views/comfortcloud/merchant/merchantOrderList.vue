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
                    <div class="query-col-title">订单来源： </div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.source" clearable>
                            <el-option label="全部" value="" />
                            <el-option label="微信小店" value="1" />
                            <el-option label="第三方渠道" value="2" />
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单状态： </div>
                    <div class="query-1col-input">
                        <el-select v-model="queryParams.status" clearable>
                            <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                    </div>
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onImportOrder">导入订单</el-button>
                    </div>
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onAddOrder">新增订单</el-button>
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
                    <el-button v-if="scope.data.row.source !=='微信小店'" class="orangeBtn" style="margin-top: 10px" @click="onDelete(scope.data.row)">删除</el-button>
                    <el-button v-if="hosAuthCheck(deliverOperateAuth)" class="orangeBtn" style="margin-top: 10px">发货</el-button>
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
                    <p slot="tip" class="el-upload__tip">2.请按照订单模板内容导入数据，否则可能会出现导入异常</p>
                </el-upload>
                <el-button class="errorBtn" v-if="errorData.failList.length > 0" @click="errorShow = true">上传失败数据</el-button>
                <div class="downloadExcel">
                    <a href="/excelTemplate/订单模板.xls" download="订单模板.xls">订单模板</a>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
            </el-dialog>
            <el-dialog title="新增销售订单" :visible.sync="addOrderDialogVisible" class="upload-show" width="1200px" :close-on-click-modal="false" :before-close="onCloseAddOrderDialog">
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
                                    <el-input v-model="addOrderForm.consigneeName" placeholder="请填写客户姓名"></el-input>
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
                        <el-form-item  prop="consigneeAddress">
                            <el-input style="width: 500px" v-model="addOrderForm.consigneeAddress" maxlength="200" :rows="1" placeholder="请输入详细地址"/>
                        </el-form-item>

                        <el-form-item label="商品明细：" prop="productBOS">
                            <el-button type="primary" @click="onAddProduct">+添加商品</el-button>
                        </el-form-item>

                        <div class="query-cont-row" v-for="(productItem,index) in addOrderForm.productBOS" :key="index">
                            <el-form-item label="品类：" :prop="'productBOS.' + index + '.productCategory'" :rules="addOrderRules.productCategory">
                                <el-select v-model="productItem.productCategory" @change="()=> { selectChanged(index) }" >
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
                                <el-input style="width: 150px" v-model="productItem.productAmount" maxlength="100" :rows="1" placeholder="请输入销售金额"/>
                            </el-form-item>
                            <el-form-item label="商品件数：" label-width="100px" :prop="'productBOS.' + index + '.productCount'" :rules="addOrderRules.productCount">
                                <el-input style="width: 150px" v-model="productItem.productCount" maxlength="100" :rows="1" placeholder="请输入商品件数"/>
                            </el-form-item>
                            <el-button style="align-self: flex-start;margin-left: 20px;" type="primary" @click="()=> { onRemoveProduct(index) }">删除</el-button>
                        </div>
                        <el-form-item label="商品总运费：" prop="freight">
                            <el-input v-model="addOrderForm.freight" maxlength="100" :rows="1" placeholder="请输入商品总运费"/>
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
                            <el-input v-model="addOrderForm.payAmount" maxlength="100" :rows="1" placeholder="请输入订单总金额"/>
                        </el-form-item>
                        <el-form-item label="支付时间：" prop="payTime">
                            <el-date-picker v-model="addOrderForm.payTime" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="请上传支付凭证：" prop="certificate" :rules="addOrderRules.certificate" ref="payImgs">
                            <el-row :span="8">
                                <el-upload
                                    list-type="picture-card"
                                    :action="imageUploadAction"
                                    :data="imageUploadData"
                                    accept='image/jpeg, image/jpg, image/png'
                                    name='multiFile'
                                    :file-list="imgs"
                                    :multiple='true'
                                    :on-success="handleUploadImageSuccess"
                                    :limit="2"
                                    :on-exceed="uploadImageExceptMessage"
                                    :before-upload="beforeImageUpload"
                                    :on-remove="handleImageRemove">
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
            <el-dialog title="填写发货信息" :visible.sync="deliverDialogVisible" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDeliverDialog">
                <div class="el-dialog-div">
                    <el-form :model="deliverForm" :rules="deliverRules" ref="deliverForm" label-width="140px">
                        <el-form-item label="请选择发货方式：" prop="type">
                            <el-radio-group v-model="deliverForm.type">
                                <el-radio label="按订单合并发货：订单中的商品只需维护一次发货信息"></el-radio>
                                <el-radio label="按商品分开发货：订单中部分产品发货，需按实际发货的商品维护发货信息"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="发货商品">
                            <el-checkbox :indeterminate="isDeliverIndeterminate" v-model="deliverCheckAll" @change="handleDeliverCheckAllChange">全选</el-checkbox>
                            <el-checkbox-group v-model="deliverForm.products" @change="handleDeliverCheckedChange">
                                <el-checkbox v-for="item in deliverProductOptions" :label="item.name" :key="item.name"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="单分享提货人：" prop="deliverPerson">
                            <el-input v-model="addOrderForm.deliverPerson" maxlength="100" :rows="1" placeholder="请输入单分享提货人"/>
                        </el-form-item>
                        <el-form-item label="物流公司：" prop="deliverPerson">
                            <el-input v-model="addOrderForm.deliverCompany" maxlength="100" :rows="1" placeholder="请输入物流公司"/>
                        </el-form-item>
                        <el-form-item label="快递单号：" prop="deliverPerson">
                            <el-input v-model="addOrderForm.deliverNumber" maxlength="100" :rows="1" placeholder="请输入快递单号"/>
                        </el-form-item>
                        <el-form-item label="发货凭证：" prop="images" ref="image">
                            <el-row :span="8">
                                <el-upload
                                    list-type="picture-card"
                                    :action="imageUploadAction"
                                    :data="imageUploadData"
                                    accept='image/jpeg, image/jpg, image/png'
                                    name='multiFile'
                                    :file-list="deliverImgs"
                                    :multiple='true'
                                    :on-success="handleUploadDeliverImageSuccess"
                                    :limit="2"
                                    :on-exceed="uploadImageExceptMessage"
                                    :before-upload="beforeImageUpload"
                                    :on-remove="handleImageRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <div class="upload-tips">请上传发货凭证图，最多2张，支持jpeg,png和jpg格式</div>
                            </el-row>
                        </el-form-item>
                        <div style="height : 20px"></div>
                    </el-form>

                </div>
                <div slot="footer" class="dialog-footer">
                    <h-button @click="cancelDeliverClick">取 消</h-button>
                    <h-button type="primary" @click="submitDeliverForm" :loading="loading">确 定</h-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { iotUrl, interfaceUrl } from '@/api/config'
import { AUTH_CLOUD_DELIVER_OPERATE } from '@/utils/auth_const'
import { addCloudMerchantProductOrder, deleteThirdOrder } from '../api'
import { getChiness } from '../../hmall/membership/api'

export default {
    name: 'merchantOrderList',
    data () {
        return {
            deliverOperateAuth: AUTH_CLOUD_DELIVER_OPERATE,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone,
                orderId: '',
                productName: '',
                startTime: '',
                endTime: '',
                source: '',
                status: ''
            },
            statusOptions: [
                {
                    label: '待付款',
                    value: 10
                },
                {
                    label: '待发货',
                    value: 20
                },
                {
                    label: '待收货',
                    value: 30
                },
                {
                    label: '已完成',
                    value: 100
                },
                {
                    label: '已退货退款',
                    value: 200
                },
                {
                    label: '已取消',
                    value: 250
                }
            ],
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
                    creator: ''
                }
            },
            fileList: [],
            errorShow: false,
            errorData: {
                failList: []
            },
            errMessage: '',
            errTableLabel: [],
            loading: false,
            addOrderDialogVisible: false,
            categoryTypes: [],
            allCategorys: [],
            imgs: [],
            provinceList: [],
            cityList: [],
            addOrderForm: {
                consigneeName: '',
                consigneePhone: '',
                consigneeProvinceName: '',
                consigneeCityName: '',
                consigneeCountyName: '',
                consigneeAddress: '',
                payTime: '',
                payAmount: '',
                payMethod: '',
                productBOS: [],
                freight: '',
                certificate: ''
            },
            certificateUrls: [],
            addOrderRules: {
                consigneePhone: [
                    { required: true, message: '请输入客户手机号', trigger: 'blur' }
                ],
                consigneeName: [
                    { required: true, message: '请输入客户姓名', trigger: 'blur' }
                ],
                consigneeProvinceName: [
                    { required: true, message: '请输入客户地址', trigger: 'change' }
                ],
                consigneeCityName: [
                    { required: true, message: '请输入客户地址', trigger: 'change' }
                ],
                consigneeCountyName: [
                    { required: true, message: '请输入客户地址', trigger: 'change' }
                ],
                consigneeAddress: [
                    { required: true, message: '请输入客户地址', trigger: 'blur' }
                ],
                productBOS: [
                    { required: true, message: '请添加商品', trigger: 'change' }
                ],
                productCategory: [
                    { required: true, message: '请选择商品品类', trigger: 'change' }
                ],
                productSpecification: [
                    { required: true, message: '请选择商品型号', trigger: 'change' }
                ],
                productAmount: [
                    { required: true, message: '请输入商品金额', trigger: 'blur', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ],
                productCount: [
                    { required: true, message: '请输入商品件数', trigger: 'blur', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ],
                freight: [
                    { required: true, message: '请输入商品总运费', trigger: 'blur', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ],
                payMethod: [
                    { required: true, message: '请选择支付类型', trigger: 'change' }
                ],
                payAmount: [
                    { required: true, message: '请输入订单总金额', trigger: 'blur', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ],
                payTime: [
                    { required: true, message: '请选择支付时间', trigger: 'blur' }
                ],
                certificate: [
                    { required: true, message: '请上传支付凭证', trigger: 'blur' }
                ]

            },
            deliverDialogVisible: false,
            deliverForm: {
                type: '1',
                images: [],
                image: ''
            },
            deliverRules: {},
            isDeliverIndeterminate: true,
            deliverCheckAll: false,
            deliverProductOptions: [],
            deliverImgs: []
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
            cloudMerchantProductOrderTotal: 'cloudMerchantProductOrderTotal',
            cloudMerchantShopCategoryList: 'cloudMerchantShopCategoryList',
            cloudMerchantShopCategoryTypeList: 'cloudMerchantShopCategoryTypeList' // 商品类型
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
        },
        prouctDetailTableLabel () {
            if (this.focusDetailOrder.source === '微信小店') {
                return [
                    { label: '商品ID', prop: 'productId' },
                    { label: '商品名称', prop: 'productName' },
                    { label: '商品规格', prop: 'wxSpecification' },
                    { label: '商品价格（元）', prop: 'productPrice' },
                    { label: '商品数量（件）', prop: 'productCount' }
                ]
            } else {
                return [
                    { label: '商品型号', prop: 'wxSpecification' },
                    { label: '商品价格（元）', prop: 'productPrice' },
                    { label: '商品数量（件）', prop: 'productCount' }
                ]
            }
        },
        getCity () {
            const province = this.provinceList.filter(item => item.name === this.addOrderForm.consigneeProvinceName)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        getCountry () {
            const city = this.getCity.filter(item => item.name === this.addOrderForm.consigneeCityName)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        },
        imageUploadAction () {
            return interfaceUrl + 'tms/files/upload'
        },
        imageUploadData () {
            return { updateUid: this.userInfo.employeeName }
        }
    },
    async mounted () {
        this.onSearch()
        this.getAreacode()
        await this.findCloudMerchantShopCategoryList()
        this.allCategorys = this.cloudMerchantShopCategoryList
    },
    activated () {
        this.onQuery()
    },
    methods: {
        ...mapActions({
            findCloudMerchantProductOrderList: 'findCloudMerchantProductOrderList',
            findCloudMerchantProductOrderDetail: 'findCloudMerchantProductOrderDetail',
            findCloudMerchantShopCategoryList: 'findCloudMerchantShopCategoryList',
            findCloudMerchantShopCategoryTypeList: 'findCloudMerchantShopCategoryTypeList'
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
        onDelete (val) {
            this.$confirm('请确认是否继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteThirdOrder({
                    orderId: val.orderId
                })
                this.$message.success('删除成功')
                this.onQuery(this.searchParams)
            })
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
        onAddOrder () {
            this.addOrderDialogVisible = true
        },
        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.creator = this.userInfo.employeeName
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
            this.importDialogVisible = false
            this.onQuery(this.searchParams)
            this.$message.success('上传成功')
        },
        clearAddOrderForm () {
            this.addOrderForm = {
                consigneeName: '',
                consigneePhone: '',
                provinceId: '',
                consigneeProvinceName: '',
                cityId: '',
                consigneeCityName: '',
                countryId: '',
                consigneeCountyName: '',
                consigneeAddress: '',
                payTime: '',
                payAmount: '',
                payMethod: '',
                productBOS: [],
                freight: '',
                certificate: ''
            }
            this.certificateUrls = []
            this.$refs['addOrderForm'].clearValidate()
        },
        onCloseAddOrderDialog () {
            this.clearAddOrderForm()
            this.addOrderDialogVisible = false
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        },
        onProvince (key) {
            this.addOrderForm.consigneeProvinceName = key
            this.addOrderForm.consigneeCityName = ''
            this.addOrderForm.consigneeCountyName = ''
        },
        onCity (key) {
            this.addOrderForm.consigneeCityName = key
            this.addOrderForm.consigneeCountyName = ''
        },
        onArea (key) {
            this.addOrderForm.consigneeCountyName = key
        },
        onAddProduct () {
            this.addOrderForm.productBOS.push({ productCategory: '', productSpecification: '', productAmount: '', productCount: '' })
            this.categoryTypes.push([])
            this.$refs['addOrderForm'].clearValidate(['productBOS'])
        },
        categoryIdByName (name) {
            console.log(this.allCategorys)
            let categorys = this.allCategorys.filter((item) => item.categoryName === name)
            return categorys[0].categoryId
        },
        async selectChanged (index) {
            this.addOrderForm.productBOS[index].productSpecification = ''
            this.categoryTypes.splice(index, 1, [])
            await this.findCloudMerchantShopCategoryTypeList({ categoryId: this.categoryIdByName(this.addOrderForm.productBOS[index].productCategory) })
            this.categoryTypes.splice(index, 1, this.cloudMerchantShopCategoryTypeList)
        },
        selectSpecificationIdChanged () {
            for (let i = 0; i < this.addOrderForm.productBOS.length; i++) {
                this.$refs['addOrderForm'].validateField('productBOS.' + i + '.productSpecification')
            }
        },
        onRemoveProduct (index) {
            this.addOrderForm.productBOS.splice(index, 1)
            this.categoryTypes.splice(index, 1)
        },
        handleUploadImageSuccess (response, file, fileList) {
            if (response.code === 200) {
                console.log(response.data.accessUrl)
                this.certificateUrls.push(response.data.accessUrl)
                this.addOrderForm.certificate = this.certificateUrls.join(',')
            }
        },
        uploadImageExceptMessage (files, fileList) {
            this.$message({
                type: 'warning',
                message: '最多上传2张'
            })
        },
        beforeImageUpload (file) {
            const isJPG = file.type === 'image/jpg'
            const isJPEG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            if (!(isJPG || isJPEG || isPNG)) {
                this.$message({
                    type: 'error',
                    message: '文件格式不正确'
                })
            }
            return isJPG || isJPEG || isPNG
        },
        handleImageRemove (file, fileList) {
            let index = this.certificateUrls.indexOf(file.response.data.accessUrl)
            this.certificateUrls.splice(index, 1)
            this.addOrderForm.certificate = this.certificateUrls.join(',')
        },
        cancelAddOrderClick () {
            this.clearAddOrderForm()
            this.addOrderDialogVisible = false
        },
        submitAddOrderForm () {
            this.addOrderForm.creator = this.userInfo.employeeName
            this.loading = true
            this.$refs['addOrderForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        await addCloudMerchantProductOrder(this.addOrderForm)
                        this.loading = false
                        this.clearAddOrderForm()
                        this.addOrderDialogVisible = false
                        this.onQuery()
                        this.$message({
                            message: `添加成功`,
                            type: 'success'
                        })
                    } catch (e) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        onCloseDeliverDialog () {
            this.deliverDialogVisible = false
        },
        handleDeliverCheckAllChange (val) {
            this.deliverForm.products = val ? this.deliverProductOptions : []
            this.isDeliverIndeterminate = false
        },
        handleDeliverCheckedChange (value) {
            let checkedCount = value.length
            this.deliverCheckAll = checkedCount === this.deliverProductOptions.length
            this.isDeliverIndeterminate = checkedCount > 0 && checkedCount < this.deliverProductOptions.length
        },
        handleUploadDeliverImageSuccess (response, file, fileList) {
            if (response.code === 200) {
                console.log(response.data.accessUrl)
                this.deliverForm.images.push(response.data.accessUrl)
            }

            this.addOrderForm.image = this.addOrderForm.images[0]
        },
        cancelDeliverClick () {
            this.deliverDialogVisible = false
        },
        submitDeliverForm () {

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
    .upload-tips {
        font-size: 12px;
        color: #999;
        display: flex;
        align-items: center;
        height: 100px;
        padding-left: 10px;
    }
    /deep/.el-dialog__body {
        padding-top: 10px;
    }
    /deep/.query-cont-row .el-select {
        width:150px;
    }
    /deep/.query-cont-row .el-select .el-input {
        width:150px;
    }
    .el-dialog-div {
        height: 80vh;
        overflow: auto;
    }
</style>

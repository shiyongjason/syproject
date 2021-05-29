<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">收货人手机号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-cont-col-area">
                        <el-select v-model="queryParams.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.cityId" @change="onCity" placeholder="市" :clearable=true>
                            <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.countryId" placeholder="区" :clearable=true>
                            <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">收货人姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入收货人姓名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">发货状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.role" style="width: 100%">
                            <el-option label="选择" value=""></el-option>
                            <el-option label="待发货" value=1></el-option>
                            <el-option label="已发货" value=2></el-option>
                            <el-option label="已回收" value=1></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">创建日期：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startCreateTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endCreateTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                        <el-button type="primary" class="ml20" @click="addNewMetarial">新增营销物料需求</el-button>
                    </div>
                </div>
            </div>

            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">

            </basicTable>
            <el-dialog title="新增营销物料需求" :modal-append-to-body=false :append-to-body=false :visible.sync="addDialogVisible" width="50%">
                <el-form :model="materialForm" :rules="rules" ref="materialForm" label-width="130px">
                    <el-form-item label="收货人手机号：" prop="receiverPhone">
                        <el-input v-model="materialForm.receiverPhone" maxlength="11" placeholder="请输入收货人手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人姓名：" prop="receiverName">
                        <el-input v-model="materialForm.receiverName" maxlength="50" placeholder="请输入收货人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分部：" prop="departmentId">
                        <el-select v-model="materialForm.departmentId">
                            <el-option :label="item.deptName" :value="item.crmDeptCode" v-for="item in departmentList" :key="item.crmDeptCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="address" label="收货人地址：" required>
                        <div class="city-area">
                            <el-form-item label-width="0px" prop="provinceId">
                                <el-select v-model="materialForm.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <span class="ml10 mr10">-</span>
                            <el-form-item label-width="0px" prop="cityId">
                                <el-select v-model="materialForm.cityId" @change="onCity" placeholder="市" :clearable=true>
                                    <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <span class="ml10 mr10">-</span>
                            <el-form-item label-width="0px" prop="countryId">
                                <el-select v-model="materialForm.countryId" placeholder="区" :clearable=true>
                                    <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                    </el-form-item>
                    <el-form-item label="详细地址：" prop="address">
                        <el-input v-model="materialForm.address" style='width:400px' maxlength="100" placeholder="请输入具体地址"></el-input>
                    </el-form-item>
                    <el-form-item label="物料明细：" required>
                        <el-button type="primary" @click="addMaterial">+ 添加物料</el-button>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <div v-for="(mera,index) in materialForm.details" :key="mera.materialName">
                            <el-col :span="12">
                                <el-form-item label="物料/商品名称：" :prop="'details.'+index+'.materialName'" :rules="rules.materialName">
                                    <el-autocomplete class="inline-input" placeholder="输入物料名称" v-model="mera.materialName" :trigger-on-focus="false" @select="handleSelect" :fetch-suggestions="querySuggestions">
                                    </el-autocomplete>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="物料件数：" :prop="'details.'+index+'.materialCount'" :rules="rules.materialCount">
                                    <el-input placeholder="输入件数" v-model="mera.materialCount"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="materialForm.remark" maxlength="500" :rows="3" type="textarea" placeholder="输入推荐话术，将展示在推广商品列表中，不超过500字符" />
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelDialog">取消</el-button>
                    <el-button type="primary" @click="submitForm('materialForm')">确认</el-button>
                </span>
            </el-dialog>
            <el-dialog title="填写发货信息" :modal-append-to-body=false :append-to-body=false :visible.sync="dispatchDialogVisible" width="50%">
                <el-form :model="dispatchForm">
                    <div class="form-title">请选择发货方式</div>
                    <div>该订单中含有多款商品，建议按订单合并发货</div>
                    <el-form-item label-width="0">
                        <el-radio v-model="dispatchForm.type" label="1">按订单合并发货：订单中的商品只需维护一次发货信息</el-radio>
                        <el-radio v-model="dispatchForm.type" label="2">按商品分开发货：订单中部分产品发货，需按实际发货的商品维护发货信息</el-radio>
                    </el-form-item>
                    <div>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <!--
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                             <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                            <el-checkbox label="sdsf">hhhhh</el-checkbox>
                            <el-checkbox>hhhhh</el-checkbox>
                            <el-checkbox>hhhhh</el-checkbox>
                        </el-checkbox-group>
                         -->
                    </div>
                    <el-form-item class="wlname" label="物流公司：">
                        <el-input style='width:400px' maxlength="100" placeholder="请输入具体地址"></el-input>
                    </el-form-item>
                    <el-form-item class="wlcode" label="快递单号：">
                        <el-input style='width:400px' maxlength="100" placeholder="请输入具体地址"></el-input>
                    </el-form-item>
                    <div class="form-title">发货凭证<span>(请上传发货凭证图，最多2张，支持jpeg,png和jpg格式)</span></div>
                    <!--
                    <el-form-item label-width="0" prop="productImgs" ref="productImgs">
                        <el-row :span="8">
                            <el-upload list-type="picture-card" v-bind="uploadInfo" :file-list="imgs" :multiple='true' accept=".jpg,.jpeg,.png" :on-success="handleSuccess" :limit="5" :on-exceed="pictureMessage" :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>

                        </el-row>
                    </el-form-item>
                    -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelDialog">取消</el-button>
                    <el-button type="primary" @click="onRecommendChange(1)">确认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import { clearCache, newCache } from '../../../utils'
import { addMarktingMaterial, getLikeMerchantList } from '../api'
import { getChiness } from '../../hmall/membership/api'
import { iotUrl } from '../../../api/config'

export default {
    name: 'merchantDispatchManager',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                receiverPhone: this.$route.query.receiverPhone ? this.$route.query.receiverPhone : '',
                receiverName: '',
                provinceId: '',
                cityId: '',
                countryId: '',
                startCreateTime: '',
                endCreateTime: ''
            },
            searchParams: {},
            tableData: [],
            isSaving: false,
            isIndeterminate: true,
            checkAll: false,
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            materialForm: {
                id: '',
                department: '',
                departmentId: '',
                receiverName: '',
                receiverPhone: '',
                provinceId: '',
                provinceName: '',
                cityId: '',
                cityName: '',
                countryId: '',
                countryName: '',
                address: '',
                remark: '',
                operator: '',
                details: []
            },
            dispatchForm: {
                type: ''
            },
            rules: {
                receiverName: [
                    { required: true, message: '请输入收货人名称', trigger: 'blur' }
                ],
                receiverPhone: [
                    { required: true, message: '请输入收货人手机号', trigger: 'blur' }
                ],
                departmentId: [
                    { required: true, message: '请输入收货人所在分部', trigger: 'change' }
                ],
                provinceId: [
                    { required: true, message: '选择省份', trigger: 'change' }
                ],
                cityId: [
                    { required: true, message: '选择城市', trigger: 'change' }
                ],
                countryId: [
                    { required: true, message: '选择区', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入收货人详细地址', trigger: 'blur' }
                ],
                materialName: [
                    { required: true, message: '请输入物料名称', trigger: 'blur' }
                ],
                materialCount: [
                    { required: true, message: '请输入物料件数', trigger: 'blur' }
                ]
            },
            detailsRules: {

            },
            provinceList: [],
            cityList: [],
            tableLabel: [
                { label: '需求单号', prop: 'companyName' },
                { label: '物料名称', prop: 'phone' },
                { label: '物料件数', prop: 'nickName' },
                { label: '所属分部', prop: 'saleArea' },
                { label: '收件人姓名', prop: 'brand' },
                { label: '收件人电话', prop: 'category' },
                { label: '收件人地址', prop: 'merchantType' },
                { label: '发货状态', prop: 'createTime', formatters: 'dateTime' },
                { label: '发货时间', prop: 'source' },
                { label: '发货人', prop: 'invitePhone' },
                { label: '物流公司', prop: 'inviteUuid' },
                { label: '快递单号', prop: 'inviteUserName' },
                { label: '发货凭证', prop: 'orderCount' },
                { label: '备注', prop: 'orderAmount' }
            ],
            addDialogVisible: false,
            dispatchDialogVisible: false,
            recommendData: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            departmentList: 'cloudMerchantMemberDepartmentList'
        }),
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId === this.queryParams.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        getCountry () {
            const city = this.cityList.filter(item => item.cityId === this.queryParams.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endRegisterTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startRegisterTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    watch: {
        getCity: {
            deep: true,
            handler: function (newVal) {
                this.cityList = newVal
            }
        }
    },
    mounted () {
        this.onSearch()
        this.getAreacode()
    },
    activated () {
        this.onQuery()
    },
    methods: {
        ...mapActions({
            findCloudMerchantMemberDepartmentList: 'findCloudMerchantMemberDepartmentList'
        }),
        async onQuery () {
            await this.findCloudMerchantMemberDepartmentList({
                deptType: 'F',
                pkDeptDoc: this.userInfo.pkDeptDoc,
                jobNumber: this.userInfo.jobNumber,
                authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
            })
            console.log(this.departmentList, '分部列表')
            // await this.findMerchantMembersituation(this.searchParams)
            // await this.findMerchantMemberTotalsituation(this.searchParams)
            // this.tableData = this.merchantmemberData.records
            // this.pagination = {
            //     pageNumber: this.merchantmemberData.current,
            //     pageSize: this.merchantmemberData.size,
            //     total: this.merchantmemberData.total
            // }
        },
        async querySuggestions (queryString, cb) {
            if (queryString.length > 0) {
                const mainProductList = await getLikeMerchantList({ productName: queryString })
                const options = mainProductList.data.map(item => item.productName)
                console.log(options, '处理过的数据')
                cb(options)
            }
        },
        submitForm (formName) {
            if (this.isSaving) {
                return
            }
            this.isSaving = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    try {
                        this.saveMetarial()
                        this.isSaving = false
                    } catch (e) {
                        this.isSaving = false
                    }
                } else {
                    this.isSaving = false
                }
            })
        },

        async saveMetarial () {
            let { ...params } = this.materialForm
            if (params.details.length === 0) {
                this.$message({
                    message: '请添加物料明细',
                    type: 'error'
                })
                return
            }
            params.operator = this.userInfo.employeeName
            if (params.id.length === 0) {
                params.id = null
            }
            if (params.departmentId.length > 0) {
                const dep = this.departmentList.filter(item => {
                    return item.crmDeptCode === params.departmentId
                })
                params.department = dep.length > 0 ? dep[0].deptName : ''
            }
            if (params.provinceId.length > 0) {
                const province = this.provinceList.filter(item => {
                    return item.provinceId === params.provinceId
                })
                params.provinceName = province.length > 0 ? province[0].name : ''
            }
            if (params.cityId.length > 0) {
                const city = this.getCity.filter(item => {
                    return item.cityId === params.cityId
                })
                params.cityName = city.length > 0 ? city[0].name : ''
            }
            if (params.countryId.length > 0) {
                const country = this.getCountry.filter(item => {
                    return item.countryId === params.countryId
                })
                params.countryName = country.length > 0 ? country[0].name : ''
            }
            console.log(params, '上传的数据')
            // await addMarktingMaretial()
        },
        handleSelect (item) {
            console.log(item, '数据选择')
        },
        handleCheckAllChange (val) {
            console.log(val, '全选')
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        addMarktingMaretial () {

        },
        addMaterial () {
            this.materialForm.details.push({ materialName: '', materialCount: null })
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        },
        onProvince (key) {
            this.queryParams.provinceId = key
            this.queryParams.cityId = ''
            this.queryParams.countryId = ''
        },
        onCity (key) {
            this.queryParams.cityId = key
            this.queryParams.countryId = ''
        },
        onArea (key) {
            this.queryParams.countryId = key
        },
        addNewMetarial () {
            this.addDialogVisible = true
        },
        cancelDialog () {
            this.addDialogVisible = false
            this.dispatchDialogVisible = false
        },
        clearData () {

        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        }
    }
}
</script>

<style lang='scss' scoped>
.city-area {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.form-title {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    padding-bottom: 20px;
    span {
        padding-left: 5px;
        font-size: 14px;
        font-weight: 400;
        color: #666;
    }
}

.orangeBtn {
    margin: 5px 0;
}

.query-cont-col-area {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 24px;
}

/deep/ .el-dialog__body {
    padding-top: 10px;
}

/deep/ .el-dialog .address .el-select {
    width: 164px;
}

/deep/ .el-dialog .address .el-input {
    width: 164px;
    margin: 0;
}

/deep/ .el-dialog .wlname .el-form-item__label {
    font-size: 18px;
    font-weight: 500;
    color: #333;
}

/deep/ .el-dialog .address .el-form-item {
    margin: 0;
}

/deep/ .el-dialog .wlcode .el-form-item__label {
    font-size: 18px;
    font-weight: 500;
    color: #333;
}
</style>

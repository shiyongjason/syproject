<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref='form' :model="form" :rules="rules" label-width="140px">
                <template v-if="$route.query.id">
                    <el-form-item label="SKU编码：">
                        <span>{{form.skuCode}}</span>
                    </el-form-item>
                    <el-form-item label="商品名称：">
                        <span>{{form.skuName}}</span>
                    </el-form-item>
                    <el-form-item label="归属商家：">
                        <span>{{form.merchantName}}</span>
                    </el-form-item>
                </template>
                <el-form-item label="商品类型：" prop="goodsType">
                    <el-select v-model="form.goodsType" @change="onChangeGoodsType">
                        <el-option v-for="item in productTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="!(form.goodsType == '' || form.goodsType == 4)">
                    <el-form-item label="市区运费价格：" prop="cityPrice">
                        <el-input v-model.trim="form.cityPrice" placeholder="请输入" maxlength="6">
                            <template slot="suffix">元/件</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="县区运费价格：" prop="countryPrice">
                        <el-input v-model.trim="form.countryPrice" placeholder="请输入" maxlength="6">
                            <template slot="suffix">元/件</template>
                        </el-input>
                    </el-form-item>
                </template>
                <template v-if="!$route.query.id">
                    <el-form-item label="选择商家：" prop="merchantCode">
                        <el-autocomplete v-model="form.merchantName" :fetch-suggestions="querySearchAsync" @select="handleSelect" @blur="handleBlur" :debounce="500" :maxlength="50" placeholder="请输入" :disabled="form.skuInfoList.length>0"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <h-button type="create" @click="onAddProduct" :disabled="!form.merchantCode">选择商品</h-button>
                    </el-form-item>
                    <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :isShowIndex='true'>
                        <template slot="action" slot-scope="scope">
                            <h-button table @click="onDelProduct(scope.data.$index)">移除</h-button>
                        </template>
                    </basicTable>
                </template>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont">
            <h-button @click="onCancel">取消</h-button>
            <h-button type="primary" :loading="btnLoading" @click='onSubmit'>确认</h-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { newCache, clearCache } from '@/utils/index'
import { PRODUCT_TYPE } from '../const'
export default {
    name: 'createWarehouse',
    data () {
        return {
            btnLoading: false,
            productTypeOptions: PRODUCT_TYPE,
            merchantOptions: [],
            form: {
                goodsType: '',
                cityPrice: '',
                countryPrice: '',
                merchantName: '',
                merchantCode: '',
                skuInfoList: []
            },
            rules: {
                goodsType: [
                    { required: true, message: '请选择商品类型', trigger: 'change' }
                ],
                cityPrice: [
                    { required: true, message: '请输入市区运费价格', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,2})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (value && value - 0 <= 0) {
                                return callback(new Error('仅支持输入999以内两位小数正数'))
                            }
                            if (value && value - 0 > 999 - 0) {
                                return callback(new Error('仅支持输入999以内两位小数正数'))
                            }
                            if (value && !reg.test(value)) {
                                return callback(new Error('仅支持输入999以内两位小数正数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                countryPrice: [
                    { required: true, message: '请输入县区运费价格', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,2})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (value && value - 0 <= 0) {
                                return callback(new Error('仅支持输入999以内两位小数正数'))
                            }
                            if (value && value - 0 > 999 - 0) {
                                return callback(new Error('仅支持输入999以内两位小数正数'))
                            }
                            if (value && !reg.test(value)) {
                                return callback(new Error('仅支持输入999以内两位小数正数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                merchantCode: [
                    { required: true, message: '请选择商家', trigger: 'change' }
                ]
            },
            tableLabel: [
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'skuName' }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            freightRuleInfo: state => state.hmall.warehouseManage.freightRuleInfo,
            merchantData: state => state.hmall.warehouseManage.merchantData,
            selectWarehouseProduct: state => state.hmall.warehouseManage.selectWarehouseProduct,
            warehouserProductInfo: state => state.hmall.warehouseManage.warehouserProductInfo
        }),
        tableData () {
            return this.form.skuInfoList
        }
    },
    watch: {
        selectWarehouseProduct: {
            immediate: true,
            handler (value) {
                this.form.skuInfoList = value
            }
        }
    },
    methods: {
        init () {
            this.getMerchantList()
            if (this.$route.query.id) {
                this.getWarahouseProductInfo()
            }
        },
        onChangeGoodsType (value) {
            this.getFreightRuleListByGoodsType(value)
        },
        async querySearchAsync (queryString, cb) {
            const results = queryString ? await this.merchantData.filter(this.createStateFilter(queryString)) : this.merchantData
            cb(results)
        },
        createStateFilter (queryString) {
            return (state) => {
                return state.value.indexOf(queryString) >= 0
            }
        },
        handleSelect (item) {
            this.form.merchantName = item.companyName
            this.form.merchantCode = item.companyCode
        },
        handleBlur () {
            const data = this.merchantData.filter(item => item.companyName.toLowerCase() == this.form.merchantName.toLowerCase())
            if (!(data.length > 0 && data[0].companyCode === this.form.merchantCode)) {
                this.form.merchantName = ''
                this.form.merchantCode = ''
            }
        },
        onAddProduct () {
            this.setSelectWarehouseProduct(this.form.skuInfoList)
            this.$router.push({ path: '/b2b/warehouse/addWarehouseProducts', query: { merchantName: this.form.merchantName, merchantCode: this.form.merchantCode } })
        },
        onDelProduct (index) {
            this.form.skuInfoList.splice(index, 1)
        },
        onSubmit () {
            this.btnLoading = true
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    console.log(this.form)
                    if (this.$route.query.id) {
                        try {
                            await this.updateWarahouseProduct({
                                id: this.form.id,
                                goodsType: this.form.goodsType,
                                cityPrice: this.form.goodsType == 4 ? '' : this.form.cityPrice,
                                countryPrice: this.form.goodsType == 4 ? '' : this.form.countryPrice,
                                updateBy: this.userInfo.employeeName
                            })
                            this.$message.success('仓配商品编辑成功')
                            this.$router.push({ path: '/b2b/warehouse/warehouseProductList' })
                            this.setNewTags((this.$route.fullPath).split('?')[0])
                            this.btnLoading = false
                        } catch (error) {
                            this.btnLoading = false
                        }
                    } else {
                        if (this.form.skuInfoList.length <= 0) {
                            this.$message.warning('请添加商品！')
                            this.btnLoading = false
                            return false
                        } else {
                            try {
                                await this.createWarahouseProduct({
                                    ...this.form,
                                    skuInfoList: this.form.skuInfoList.map(item => {
                                        item.cityPrice = this.form.goodsType == 4 ? '' : item.cityPrice
                                        item.countryPrice = this.form.goodsType == 4 ? '' : item.countryPrice
                                        item.merchantCode = this.form.merchantCode
                                        return item
                                    }),
                                    createBy: this.userInfo.employeeName
                                })
                                this.$message.success('仓配商品添加成功')
                                this.$router.push({ path: '/b2b/warehouse/warehouseProductList' })
                                this.setNewTags((this.$route.fullPath).split('?')[0])
                                this.btnLoading = false
                            } catch (error) {
                                this.btnLoading = false
                            }
                        }
                    }
                } else {
                    this.btnLoading = false
                }
            })
        },
        onCancel () {
            this.$router.push({ path: '/b2b/warehouse/warehouseProductList' })
            this.setNewTags((this.$route.fullPath).split('?')[0])
        },
        ...mapMutations({
            setSelectWarehouseProduct: 'warehouseManage/SET_SELECT_WAREHOUSE_PRODUCT'
        }),
        ...mapActions({
            setNewTags: 'setNewTags',
            findFreightRuleListByGoodsType: 'warehouseManage/findFreightRuleListByGoodsType',
            findMerchantList: 'warehouseManage/findMerchantList',
            findWarahouseProductInfo: 'warehouseManage/findWarahouseProductInfo',
            createWarahouseProduct: 'warehouseManage/createWarahouseProduct',
            updateWarahouseProduct: 'warehouseManage/updateWarahouseProduct'
        }),
        async getFreightRuleListByGoodsType (goodsType) {
            await this.findFreightRuleListByGoodsType({ goodsType: goodsType })
            this.freightRuleInfo.map(item => {
                if (item.regionType == 1) {
                    this.form.cityPrice = item.price
                }
                if (item.regionType == 2) {
                    this.form.countryPrice = item.price
                }
                return item
            })
        },
        async getMerchantList () {
            await this.findMerchantList()
            this.merchantOptions = this.merchantData.map(item => {
                item.value = item.companyName
                return item
            })
        },
        async getWarahouseProductInfo () {
            await this.findWarahouseProductInfo({ id: this.$route.query.id })
            this.form = this.warehouserProductInfo
        }
    },
    mounted () {
        this.init()
    },
    // beforeRouteEnter (to, from, next) {
    //     newCache('createWarehouse')
    //     next()
    // },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'addWarehouseProducts') {
            // clearCache('createWarehouse')
            this.setSelectWarehouseProduct([])
        }
        next()
    }
}
</script>

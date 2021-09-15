<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref='form' :model="form" :rules="rules" label-width="120px">
                <div class="title-cont">
                    <span class="title-cont__label">1.设置活动基本信息</span>
                </div>
                <el-form-item label="活动名称：" prop="spikeName">
                    <el-input v-model.trim="form.spikeName" placeholder="请输入活动名称" maxlength="255" clearable :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="活动时间：" prop="startTime">
                    <el-date-picker v-model="form.startTime" :clearable=false :editable=false :picker-options="pickerOptionsStart" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :disabled="disabled"></el-date-picker>
                    <el-date-picker v-model="form.endTime" :editable=false :clearable=false :picker-options="pickerOptionsEnd" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :disabled="disabled"></el-date-picker>
                    <span class="timeTips" v-if="!disabled">只能创建10分钟后开始的活动</span>
                </el-form-item>
                <el-form-item label="活动banner：" prop="image">
                    <SingleUpload :upload="uploadInfo" :imgW="104" :imgH="104" :imageUrl="form.image" @back-event="backPicUrl" />
                    <div class="banner-wrap" v-if="disabled"></div>
                    <div class="picture-prompt ml20">
                        <p>banner大小为 702px x 262px</p>
                    </div>
                    <el-input type="hidden" v-model="form.image" />
                </el-form-item>
                <div class="title-cont">
                    <span class="title-cont__label">2.设置规则和优惠</span>
                </div>
                <el-form-item label="活动区域：" prop="spikeAreaList">
                    <saleableArea
                        ref="saleableArea"
                        v-if="areaShow"
                        :areaList="seckillAreaList"
                        :disabled="form.spikeSku.length>0"
                        label="活动区域："
                        v-on:formSalesAreaList="formSalesAreaList"
                    />
                    <!-- <el-cascader class="area-cascader" v-model="seckillAreaList" :options="activityAreaData" :props="{multiple: true}" @change="onChangeArea" :disabled="form.spikeSku.length>0"></el-cascader> -->
                </el-form-item>
                <el-form-item label="优惠方式：" prop="discountType">
                    <el-radio-group v-model="form.discountType" :disabled="disabled" @change='radioChange'>
                        <el-radio :label=1>折扣</el-radio>
                        <el-radio :label=2>直降（平台补贴）</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="会员限制：" prop="memberScope">
                    <el-radio-group v-model="form.memberScope" :disabled="disabled">
                        <el-radio :label=1>所有会员</el-radio>
                        <el-radio :label=2>首单会员（第一次购买）</el-radio>
                        <el-radio :label=3>新注册会员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="title-cont">
                    <span class="title-cont__label">3.选择活动商品</span>
                </div>
                <el-form-item label="活动商品：">
                    <h-button type="create" @click="onAddProduct" :disabled="disabled||form.spikeAreaList.length==0">添加商品</h-button>
                </el-form-item>
                <hosJoyTable ref="hosjoyTable" isShowIndex border isAction :column="column" :data="form.spikeSku" align="center" actionWidth='260px'>
                    <template slot="skuName" slot-scope="scope">
                        <div class="goods">
                            <img :src="scope.data.row.pictureUrl">
                            <span class="goods-name">{{scope.data.row.skuName}}</span>
                        </div>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onRemove(scope.data.row)" :disabled="disabled">移除</h-button>
                        <h-button table @click="onOrder(scope.data.row)" :disabled="canNotOrder">刷单（{{scope.data.row.clickFarmingNum?scope.data.row.clickFarmingNum:0}}）</h-button>
                        <h-button table @click="onAddStock(scope.data.row)" :disabled="canNotOrder">增加库存</h-button>
                    </template>
                </hosJoyTable>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont">
            <div class="subfixed" v-if="!disabled || $route.query.type == 'copy'" :class="isCollapse ? 'minLeft' : 'maxLeft'">
                <h-button @click="onBack">返回</h-button>
                <h-button type="primary" @click='onSave(1)'>保存</h-button>
                <h-button type="primary" @click='onSave(2)'>活动发布</h-button>
            </div>
            <div class="subfixed" v-else :class="isCollapse ? 'minLeft' : 'maxLeft'">
                <h-button @click="onBack">返回</h-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { newCache, clearCache } from '@/utils/index'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { isNum } from '@/utils/validate/format'
import { interfaceUrl } from '@/api/config'
import Sortable from 'sortablejs'
import { saveEvent, editEvent, clickFarming } from '../api/index'
import saleableArea from '../../components/SaleableArea.vue'
import moment from 'moment'
import { DISCOUNT_TYPE_PERCENT, DISCOUNT_TYPE_PRICE, SPIKE_STATUS_PUBLISHED, SPIKE_STATUS_DRAFT } from '../const/index'

// 开始和结束时间校验方法
const timeValid = (startTime, endTime, callback) => {
    if (startTime && endTime) {
        if (startTime > endTime) {
            return callback(new Error('开始时间不能大于结束时间'))
        } else if (startTime == endTime) {
            return callback(new Error('活动结束时间不能和开始时间一样'))
        } else {
            let hours = moment.duration(moment(endTime).valueOf() - moment(startTime).valueOf()).as('hours')
            if (hours > 30 * 24) {
                return callback(new Error('活动时间最多持续三十天'))
            }
        }
        callback()
    }
    callback()
}

export default {
    name: 'createSeckill',
    components: {
        hosJoyTable,
        saleableArea
    },
    data () {
        return {
            seckillAreaList: [],
            // 限购数量填充弹层展示标识
            popoverVisible: false,
            // 优惠设置填充弹层展示标识
            otpopoverVisible: false,
            isPending: false,
            sortable: null,
            areaShow: false,
            form: {
                spikeName: '',
                startTime: '',
                endTime: '',
                image: '',
                discountType: DISCOUNT_TYPE_PERCENT, // 优惠方式 1：折扣 2：直降
                memberScope: 1, // 会员限制 1：所有会员 2：首单会员 3：新注册会员
                status: '', // 状态 1：待发布 2：已发布 3：已取消,
                spikeAreaList: [],
                spikeSku: []
            },
            rules: {
                spikeName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value && value.length < 2) {
                                callback(new Error('活动名称最少为2个字符'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                startTime: [
                    { required: true, message: '请选择活动开始时间', trigger: 'change' },
                    {
                        validator: (rule, value, callback) => {
                            timeValid(value, this.form.endTime, callback)
                        },
                        trigger: 'change'
                    }
                ],
                endTime: [
                    { required: true, message: '请选择活动结束时间', trigger: 'change' },
                    {
                        validator: (rule, value, callback) => {
                            timeValid(this.form.startTime, value, callback)
                        },
                        trigger: 'change'
                    }
                ],
                image: [
                    { required: true, message: '请选择活动图片' }
                ],
                discountType: [
                    { required: true, message: '请选择优惠方式', trigger: 'change' }
                ],
                memberScope: [
                    { required: true, message: '请选择会员限制', trigger: 'change' }
                ],
                spikeAreaList: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            },
            inventoryRemainNumRules: (item, index) => [
                { required: true, message: '库存不能小于0' },
                {
                    validator: (rule, value, callback) => {
                        let availableStock = item.availableStock || 0
                        if (this.eventInfos.status != SPIKE_STATUS_PUBLISHED) {
                            if (item.purchaseLimitNum - value > 0) {
                                return callback(new Error('限购数量不可超过库存数量'))
                            } else if (item.purchaseLimitNum) {
                                // 因为有关联性，当库存调整之后，限购数量就满足条件了，清除掉校验信息
                                this.$refs.form.clearValidate(`spikeSku[${index}].purchaseLimitNum`)
                            }
                            if (value - availableStock > 0) {
                                return callback(new Error('库存不能大于最大可售库存'))
                            }
                        }
                        callback()
                    }
                }
            ],
            purchaseLimitNumRules: (item, index) => [
                { required: true, message: '限购数量不能小于0' },
                {
                    validator: (rule, value, callback) => {
                        if (this.eventInfos.status != SPIKE_STATUS_PUBLISHED) {
                            if (value - item.inventoryRemainNum > 0) {
                                return callback(new Error('限购数量不可超过库存数量'))
                            } else if (item.inventoryRemainNum) {
                                let inventoryRemainNum = item.inventoryRemainNum || 0
                                let availableStock = item.availableStock || 0
                                if (availableStock - inventoryRemainNum > 0) {
                                    this.$refs.form.clearValidate(`spikeSku[${index}].inventoryRemainNum`)
                                }
                            }
                        }
                        callback()
                    }
                }
            ],
            discountValueRules: [
                {
                    validator: (rule, value, callback) => {
                        if (!value) {
                            return callback(new Error(this.form.discountType === DISCOUNT_TYPE_PERCENT ? '优惠折扣不可低于1折' : '直降不能小于0'))
                        }
                        if (this.form.discountType === DISCOUNT_TYPE_PRICE) {
                            const beginIndex = rule.field.indexOf('[')
                            const endIndex = rule.field.indexOf(']')
                            const index = rule.field.substring(beginIndex + 1, endIndex)
                            if (this.form.spikeSku[index].sellPrice - value <= 0) {
                                return callback(new Error('优惠最高金额不可大于等于销售价格'))
                            }
                        } else {
                            if (value > 10) {
                                return callback(new Error('最大折扣不能大于10'))
                            } else if (value < 1) {
                                return callback(new Error('优惠折扣不可低于1折'))
                            }
                        }
                        callback()
                    }
                }
            ],
            purchaseLimitNum: '',
            discountValue: '',
            tableData: [],
            column: [
                { label: '商品', prop: 'skuName', slot: 'skuName', minWidth: '330', className: 'allowDrag' },
                { label: '建议零售价', prop: 'retailPrice', formatter: this.formatterMoney, className: 'allowDrag' },
                { label: '销售价格', prop: 'sellPrice', formatter: this.formatterMoney, className: 'allowDrag' },
                {
                    label: '卖点',
                    prop: 'sellingPoint',
                    minWidth: '130',
                    render: (h, scope) => {
                        return (
                            <span>
                                <el-input style='width:80%' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'sellingPoint') }} maxLength='12' disabled={this.disabled}></el-input>
                            </span>
                        )
                    }
                },
                {
                    label: '库存',
                    minWidth: '180',
                    prop: 'inventoryRemainNum',
                    renderHeader: (h, scope) => {
                        return (
                            <span>
                                <i class='mark'>*</i>
                                <font>{scope.column.label}</font>
                            </span>
                        )
                    },
                    render: (h, scope) => {
                        return (
                            <el-form-item prop={`spikeSku[${scope.$index}].inventoryRemainNum`} label={scope.row.cityName} rules={this.inventoryRemainNumRules(scope.row, scope.$index)} label-width="40px" style="margin-top: 20px">
                                <el-input value={scope.row.inventoryRemainNum} style='width:50%' size='mini' onInput={(val) => { this.setOneCol(Number(val.replace(/[^\d]/g, '')), scope, 'inventoryRemainNum') }} disabled={this.disabled}></el-input>
                            </el-form-item>
                        )
                    }
                },
                {
                    label: '限购数量',
                    prop: 'purchaseLimitNum',
                    width: '180',
                    renderHeader: (h, scope) => {
                        return (
                            <span class='flxinput'>
                                <i class='mark'>*</i>
                                <font>{scope.column.label}</font>
                                <el-input size='mini' style='width:80%' value={this.purchaseLimitNum} onInput={(val) => { this.purchaseLimitNum = val.replace(/[^\d]/g, '') }} disabled={this.disabled}></el-input>
                                {
                                    this.disabled ? '' : (<span class='popover'>
                                        <el-popover placement="bottom" width="100" trigger="click" v-model={this.popoverVisible}>
                                            <p class='popover-p' onClick={() => { this.setAllCol('purchaseLimitNum', this.purchaseLimitNum, 1); this.popoverVisible = false }}>应用到全部</p>
                                            <p class='popover-p' onClick={() => { this.setAllCol('purchaseLimitNum', this.purchaseLimitNum, 2); this.popoverVisible = false }}>应用到未填写</p>
                                            <i class="el-icon-caret-bottom" slot="reference"></i>
                                        </el-popover>
                                    </span>)
                                }
                            </span>
                        )
                    },
                    render: (h, scope) => {
                        return (
                            <el-form-item prop={`spikeSku[${scope.$index}].purchaseLimitNum`} rules={this.purchaseLimitNumRules(scope.row, scope.$index)} label-width="0px" style="margin-top: 20px">
                                <el-input value={scope.row.purchaseLimitNum} style='width:80%' size='mini' onInput={(val) => { this.setOneCol(Number(val.replace(/[^\d]/g, '')), scope, 'purchaseLimitNum') }} disabled={this.disabled}></el-input>
                            </el-form-item>
                        )
                    }
                },
                {
                    label: '优惠设置',
                    prop: 'discountValue',
                    width: '180',
                    renderHeader: (h, scope) => {
                        return (
                            <span class='flxinput'>
                                <i class='mark'>*</i>
                                <font>{scope.column.label}</font>
                                <el-input size='mini' style='width:80%' value={this.discountValue} onInput={(val) => { this.discountValue = val }} disabled={this.disabled}></el-input>
                                {
                                    this.disabled ? '' : (<span class='popover'>
                                        <el-popover placement="bottom" width="100" trigger="click" v-model={this.otpopoverVisible}>
                                            <p class='popover-p' onClick={() => { this.setAllCol('discountValue', this.discountValue, 1); this.otpopoverVisible = false }}>应用到全部</p>
                                            <p class='popover-p' onClick={() => { this.setAllCol('discountValue', this.discountValue, 2); this.otpopoverVisible = false }}>应用到未填写</p>
                                            <i class="el-icon-caret-bottom" slot="reference"></i>
                                        </el-popover>
                                    </span>)
                                }
                            </span>
                        )
                    },
                    render: (h, scope) => {
                        return (
                            this.form.discountType === DISCOUNT_TYPE_PERCENT
                                ? <el-form-item prop={`spikeSku[${scope.$index}].discountValue`} rules={this.discountValueRules} label-width="0px" style="margin-top: 20px">
                                    <el-input value={scope.row.discountValue} style='width:110px;margin:0 10px' size='mini' onInput={(val) => { this.setOneCol(val, scope, 'discountValue') }} disabled={this.disabled}></el-input>折
                                </el-form-item>
                                : <el-form-item prop={`spikeSku[${scope.$index}].discountValue`} rules={this.discountValueRules} label-width="0px" style="margin-top: 20px">
                                    直降<el-input value={scope.row.discountValue} style='width:70px;margin:0 10px' size='mini' onInput={(val) => { this.setOneCol(val, scope, 'discountValue') }} disabled={this.disabled}></el-input>元
                                </el-form-item>
                        )
                    }
                },
                {
                    label: '促销价',
                    className: 'allowDrag',
                    prop: 'salePrice',
                    formatter: this.formatterMoney
                }
            ]
        }
    },
    computed: {
        ...mapState({
            eventProducts: state => state.eventManage.eventProducts,
            userInfo: state => state.userInfo,
            eventInfos: state => state.eventManage.eventInfos,
            isCollapse: state => state.isCollapse,
            selectSeckillProduct: state => state.hmall.marketManage.selectSeckillProduct,
            selectSkuData: state => state.hmall.marketManage.selectSkuData
        }),
        ...mapGetters({
            activityAreaData: 'marketManage/activityAreaData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.form.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() || time.getTime() <= Date.now() - 1 * 24 * 60 * 60 * 1000
                    }
                    return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = moment(this.form.startTime).format('YYYY-MM-DD')
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7 || time.getTime() <= Date.now() - 1 * 24 * 60 * 60 * 1000
                    }
                    return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        disabled () {
            // 在编辑状态下，非待发布的活动全部不可编辑，新增和复制全部可以编辑
            return !!this.$route.query.id && this.eventInfos.status != SPIKE_STATUS_DRAFT && this.$route.query.type != 'copy'
        },
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                name: 'multiFile'
            }
        },
        // 不可刷单标志
        canNotOrder () {
            // 进行中的秒杀活动才可以刷单，进行中判断条件是：状态为已发布且当前时间大于活动开始时间（活动已开始）
            let now = moment().format('YYYY-MM-DD HH:mm:ss')
            let seconds = moment.duration(moment(this.form.startTime).valueOf() - moment(now).valueOf()).as('seconds')
            return !(this.form.status == SPIKE_STATUS_PUBLISHED && seconds <= 0)
        }
    },
    watch: {
        selectSeckillProduct: {
            immediate: true,
            handler (value) {
                if (value.length > 0) {
                    this.getSelectSkuList()
                }
            }
        }
    },
    methods: {
        // ======================================== 前后端交互 =====================================================
        ...mapActions(['eventInfo', 'copy', 'setNewTags']),
        ...mapMutations({
            setSeckillSaleAreaList: 'marketManage/SET_SECKILL_SALE_AREA_LIST',
            setSelectSeckillProduct: 'marketManage/SET_SELECT_SECKILL_PRODUCT'
        }),
        ...mapActions({
            findActivityArea: 'marketManage/findActivityArea',
            findSelectSkuList: 'marketManage/findSelectSkuList',
            addStock: 'marketManage/addStock'
        }),
        // 获取活动区域
        async getActivityArea () {
            await this.findActivityArea()
        },
        async getSelectSkuList () {
            const cityIdList = this.form.spikeAreaList.map(item => item.cityId)
            const saleAreas = this.form.areas.map(item => {
                return item.cityId ? { provinceId: item.provinceId, cityId: item.cityId } : { provinceId: item.provinceId }
            })
            const skuIdList = this.selectSeckillProduct.filter(item => !this.form.spikeSku.some(i => item.skuId == i.skuId)).map(item => item.skuId)
            if (skuIdList.length > 0) {
                await this.findSelectSkuList({ cityIdList: cityIdList, skuIdList: skuIdList, saleAreas: saleAreas })
                this.setTableData(this.form.spikeSku.concat(this.selectSkuData))
            }
        },
        /**
         * 获取秒杀活动详情
         * 在列表页面点击编辑或者复制的时候，进入页面获取秒杀活动相关信息
         */
        async getEventInfo () {
            // 实在不理解为什么复制和详情要用两个接口，不都是获取活动信息吗
            // 后来去看了后端的代码，发现后端做了一些数据的处理，将一些数据置空，比如刷单次数之类的信息，单独做了一个接口
            this.$route.query.type == 'copy' ? await this.copy({ id: this.$route.query.id }) : await this.eventInfo({ id: this.$route.query.id })
            this.form = {
                ...this.eventInfos,
                spikeSku: JSON.parse(JSON.stringify(this.eventInfos.spikeSku)).map(item => {
                    item.inventoryRemainNum = this.$route.query.type == 'copy' ? item.availableStock : item.inventoryRemainNum
                    return item
                })
            }
            // 编辑或者拷贝的时候选择的商品是从数据库过来的，这个时候已经选择商品的列表是没有信息，需要添加进来
            this.setSelectSeckillProduct(Array.from(new Set(this.form.spikeSku.map(item => item.skuId))).map(item => ({ skuId: item })))
            this.seckillAreaList = this.form.spikeAreaList
            this.setTableData(this.form.spikeSku)
        },
        // ======================================== 前后端交互 =====================================================
        // 折扣或者直降选项变更的时候，折扣金额或者直降金额清空处理
        radioChange (val) {
            // 优惠设置全局数据清空
            this.discountValue = ''
            // 清空折扣金额或者直降金额
            this.form.spikeSku.forEach((item) => {
                this.$set(item, 'discountValue', '')
            })
        },
        /**
         * 键盘输入的过程中进行数字处理
         *
         * @param val 输入的字符
         * @param scope 当前行列信息
         * @param key 当前列的key值信息
         */
        setOneCol (val, scope, key = '') {
            scope.row[scope.column.property] = isNum(val, this.form.discountType === DISCOUNT_TYPE_PERCENT ? 1 : 2)
            if (key != 'sellingPoint') scope.row[scope.column.property] = isNum(val, this.form.discountType === 1 ? 1 : 2)
            else scope.row[scope.column.property] = val
            if (val && key === 'discountValue') {
                this.handleSetSalePrice(scope.row)
            }
        },
        /**
         * 设置所有列信息
         *
         * @param key 当前列的key值
         * @param val 需要填充的值
         * @param action 1：应用全部 2：应用到未填写
         */
        setAllCol (key, val, action = '') {
            this[key] = isNum(val, this.form.discountType === DISCOUNT_TYPE_PERCENT ? 1 : 2)
            this.form.spikeSku.map((item) => {
                if (action == 1 || (action == 2 && !item[key])) {
                    item[key] = this[key]
                }
                this.$refs.form.validateField(item[key])
                if (val && key === 'discountValue') {
                    this.handleSetSalePrice(item)
                }
            })
        },
        /**
         * TODO: 排序问题
         */
        setSort () {
            const el = this.$refs.hosjoyTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            this.sortable = Sortable.create(el, {
                ghostClass: 'movedom',
                handle: '.allowDrag',
                setData: dataTransfer => {
                    dataTransfer.setData('Text', '')
                },
                onEnd: evt => {
                    this.form.spikeSku.splice(evt.newIndex, 0, this.form.spikeSku.splice(evt.oldIndex, 1)[0])
                    let newArray = JSON.parse(JSON.stringify(this.form.spikeSku))
                    this.form.spikeSku = []
                    this.$nextTick(function () {
                        this.form.spikeSku = newArray
                    })
                }
            })
        },
        async init () {
            this.getActivityArea()
            // 当复制或者编辑的时候获取活动详情
            if (this.$route.query.id) {
                await this.getEventInfo()
            }
            this.areaShow = true
        },
        backPicUrl (file) {
            this.$set(this.form, 'image', file.imageUrl)
            // this.form.image = file.imageUrl
        },
        formSalesAreaList (value) {
            this.form.spikeAreaList = value
        },
        // onChangeArea (value) {
        //     this.form.spikeAreaList = this.objArrToDyadicArr(value)
        // },
        // ======================================== 按钮事件 =====================================================
        // 添加商品事件
        onAddProduct () {
            this.setSeckillSaleAreaList(this.form.spikeAreaList)
            this.setSelectSeckillProduct(this.selectSeckillProduct.filter(item => this.form.spikeSku.some(i => i.skuId == item.skuId)))
            this.$router.push({ path: '/b2b/market/addSeckillProducts', query: { id: this.$route.query.id, type: this.$route.query.type } })
        },
        /**
         * 移除添加的商品
         * TODO: 此处需要调整
         */
        onRemove (val) {
            this.form.spikeSku = this.form.spikeSku.filter(item => !(item.skuId == val.skuId && item.cityId == val.cityId))
        },
        /**
         * 刷单操作
         * @param val 点击刷新那一行的商品信息
         */
        onOrder (val) {
            // 刷单前置条件：活动已经开启，库存不为零。
            // val.productId有值说明是从后端获取的，不是新增加的商品
            if (this.form.status == SPIKE_STATUS_DRAFT || !val.productId || val.inventoryRemainNum === 0 || this.$route.query.type == 'copy') {
                this.$message.error(`刷单的前置条件该商品已经发布且库存不为零。`)
                return
            }
            this.$confirm('确认是否刷单一次?此操作不可撤销，是否继续？', '提示').then(async () => {
                await clickFarming({ productId: val.productId, updateBy: this.userInfo.employeeName })
                this.getEventInfo()
            }).catch(() => { })
        },
        async onAddStock (row) {
            if (this.form.status == SPIKE_STATUS_DRAFT || !row.productId || row.inventoryOriginNum === 0 || this.$route.query.type == 'copy') {
                this.$message.error(`增加库存的前置条件该商品已经发布且库存不为零。`)
                return
            }
            await this.addStock({ spikeId: row.spikeId, skuId: row.skuId, provinceId: row.provinceId, cityId: row.cityId, addStock: 1 })
            this.getEventInfo()
        },
        /**
         * 保存或者活动发布事件
         * @param saveType 1: 保存 2：发布
         */
        onSave (saveType) {
            if (this.isPending) return
            this.isPending = true
            // 如果是点击发布需要做额外校验
            if (saveType == 2) {
                let now = moment().format('YYYY-MM-DD HH:mm:ss')
                let consumingMinutes = moment.duration(moment(this.form.startTime).valueOf() - moment(now).valueOf()).as('minutes')
                if (consumingMinutes < 9) {
                    this.$message.error(`只能创建10分钟后开始的活动`)
                    this.isPending = false
                    return
                }
                if (consumingMinutes > 30 * 24 * 60) {
                    this.$message.error(`只能提前三十天发布`)
                    this.isPending = false
                    return
                }
            }
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    if (this.form.spikeSku.length <= 0) {
                        this.$message.error(`活动商品不能为空`)
                        this.isPending = false
                        return false
                    } else {
                        // 保存的时候商品数据处理，排序和库存信息
                        this.form.spikeSku.forEach((item, index) => {
                            item.sort = index + 1
                            this.$set(item, 'inventoryOriginNum', item.inventoryRemainNum)
                        })
                        this.form.status = saveType
                        try {
                            // 设置更新人或者添加人
                            if (this.$route.query.id && this.$route.query.type != 'copy') {
                                this.form.updateBy = this.userInfo.employeeName
                                await editEvent(this.form)
                                this.$message.success('特价活动编辑成功')
                            } else {
                                this.form.createBy = this.userInfo.employeeName
                                await saveEvent(this.form)
                                this.$message.success('特价活动创建成功')
                            }
                            this.isPending = false
                            this.setNewTags((this.$route.fullPath).split('?')[0])
                            this.$router.push({ path: '/b2b/market/seckillManage' })
                        } catch (e) {
                            this.isPending = false
                        }
                    }
                } else {
                    this.isPending = false
                }
            })
        },
        // 返回事件
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/b2b/market/seckillManage')
        },
        // ======================================== 按钮事件 =====================================================
        // ======================================== 数据处理 =====================================================
        // objArrToDyadicArr (value) {
        //     const filterResult = this.activityAreaData.filter(item => value.some(i => item.children.some(j => j.value == i[1])))
        //         .map(item => ({ label: item.label, value: item.value, children: item.children.filter(i => value.some(j => i.value == j[1])) }))
        //     const result = []
        //     filterResult.map(item => {
        //         item.children.map(sItem => {
        //             result.push({ provinceId: item.value, provinceName: item.label, cityId: sItem.value, cityName: sItem.label, areaId: 0 })
        //         })
        //     })
        //     return result
        // },
        // dyadicArrToObjArr (value) {
        //     let result = []
        //     const provinceObj = {}
        //     const cityArr = this.activityAreaData.map(item => {
        //         provinceObj[item.value] = item.children.map(cItem => [item.value, cItem.value])
        //         return item.children.map(cItem => [item.value, cItem.value])
        //     })
        //     value.forEach(item => {
        //         if (item.provinceId == '0') {
        //             result = result.concat(cityArr.flat())
        //         } else if (item.cityId == '0') {
        //             result = result.concat(provinceObj[item.provinceId])
        //         } else {
        //             result.push([item.provinceId, item.cityId])
        //         }
        //     })
        //     return result
        // },
        /**
         * 对商品数据进行处理，从添加商品页面选择数据之后实际上有些key值是不存在的，比如卖点，限购数量等信息
         * 需要添加这些key和对应的值
         */
        setTableData (data) {
            this.form.spikeSku = data
            this.form.spikeSku.forEach(item => {
                !item.purchaseLimitNum && this.$set(item, 'purchaseLimitNum', '') // 限购数量
                !item.sellingPoint && this.$set(item, 'sellingPoint', '') // 卖点信息
                !(item.inventoryRemainNum || item.inventoryRemainNum == 0) && this.$set(item, 'inventoryRemainNum', item.availableStock)
                // 为什么优惠信息这块的判断比较特别，是因为优惠信息可以为0，限购数量和库存都不可以为0
                if (!item.discountValue && item.discountValue != 0) this.$set(item, 'discountValue', '') // 优惠信息
                !item.productId && this.$set(item, 'productId', null) // 产品ID
                !item.clickFarmingNum && this.$set(item, 'clickFarmingNum', 0) // 刷单信息
                !item.sort && this.$set(item, 'sort', '') // 排序字段
            })
            this.$nextTick(() => {
                this.setSort()
            })
        },
        // 金额展示格式化
        formatterMoney (row, column) {
            if (row[column.property] == null) return '-'
            let res = row[column.property].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return res == 0 ? 0 : `¥${res}`
        },
        // 计算优惠后的销售价格
        handleSetSalePrice (item) {
            if (this.form.discountType === DISCOUNT_TYPE_PERCENT) {
                if ((item.sellPrice * (item.discountValue / 10) + '').indexOf('.') != -1) {
                    item.salePrice = (item.sellPrice * (item.discountValue / 10)).toFixed(2)
                    if ((item.salePrice + '').indexOf('.00') != -1) {
                        item.salePrice = item.salePrice.split('.')[0]
                    }
                } else {
                    item.salePrice = (item.sellPrice * (item.discountValue / 10))
                }
            } else {
                item.salePrice = (item.sellPrice - (item.discountValue ? item.discountValue : 0))
            }
            item.salePrice = Number(item.salePrice).toFixed(2)
        },
        spanMethod ({ row, column, rowIndex, columnIndex }) {

        }
        // ======================================== 数据处理 =====================================================
    },
    mounted () {
        this.init()
    },
    beforeRouteEnter (to, from, next) {
        newCache('createSeckill')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'addSeckillProducts') {
            clearCache('createSeckill')
            this.setSelectSeckillProduct([])
        }
        next()
    }
}

</script>

<style scoped lang="scss">
.forminfo h2 {
    font-size: 18px;
    margin: 20px 0 15px;
    background: #f2f2f2;
    padding: 7px 0 7px 5px;
}
/deep/.flxinput {
    display: flex;
    align-items: center;
}
/deep/.flxinput font {
    width: 90px;
}
.goods {
    display: flex;
}
.goods img {
    width: 70px;
    height: 70px;
    margin-right: 15px;
}
.subfixed {
    position: fixed;
    bottom: 6px;
    left: 0;
    right: 0;
    padding: 10px;
    text-align: center;
    z-index: 99;
}
.maxLeft {
    left: 200px;
    transition: 0.3s;
}
.pb20 {
    padding-bottom: 20px !important;
}
.goods-name {
    text-align: left;
}
/deep/.el-table .warning-row {
    background: #ffc7c7;
}
/deep/.errormsg {
    color: #f56c6c;
    font-size: 12px;
    margin-top: 2px;
}
/deep/.movedom {
    opacity: 0.8;
    color: #fff !important;
    background: #42b983 !important;
}
/deep/.error .el-input__inner {
    border: 1px solid #f56c6c;
}
/deep/.orderDialog .el-dialog {
    height: 230px;
}
/deep/.orderDialog .el-dialog__body {
    min-height: auto !important;
}
.isremind {
    margin-top: 12px;
}
.isremind font {
    color: #a6a8ab;
    font-weight: 200;
}
/deep/.mark {
    font-style: normal;
    color: #f56c6c;
    padding-right: 3px;
}
/deep/.el-popover .popover-p {
    line-height: 30px;
    color: #f56c6c;
}
.timeTips {
    color: #ff7a45;
    margin-left: 30px;
}
.picture-container {
    float: left;
}
.picture-container li {
    width: 102px;
    height: 102px;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    margin-right: 12px;
    float: left;
    margin-bottom: 12px;
    cursor: pointer;
}
.picture-container li img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    z-index: 1;
}
.picture-container li:hover .picture-delete {
    bottom: 0;
}
.picture-container li:hover .picture-setting {
    top: 0;
}
.picture-delete {
    position: absolute;
    bottom: -30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    font-size: 18px;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 30px;
    transition: all 0.2s;
    z-index: 2;
}
.picture-setting {
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    line-height: 30px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.2s;
    z-index: 2;
}
.upload-tips {
    font-size: 12px;
    color: #999;
}

.el-form-item__label,
.el-form-item__content {
    line-height: 40p;
}

.area-cascader {
    /deep/ .el-cascader__tags {
        max-height: 100px;
        overflow-y: auto;
    }
    /deep/ .el-cascader {
        max-height: 100px;
    }
    /deep/ .el-input {
        width: 600px;
    }
}

.banner-wrap {
    position: absolute;
    left: 0;
    width: 106px;
    height: 106px;
}
</style>

<template>
    <div class="page-body">
        <div class="page-body-cont pb20">
            <el-form :model="form" ref='form' :rules="rules.event" label-position='left' >
                <div class="forminfo">
                    <h2>1.设置活动基本信息</h2>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <div class="query-col-input">
                                <el-form-item prop="spikeName" label="活动名称：" style="display: flex;">
                                    <el-input style="width:466px" v-model.trim="form.spikeName" placeholder="请输入活动名称" maxlength="255" clearable></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="query-cont-row">
                            <!-- <div class="query-col-title">活动时间：</div> -->
                            <div class="query-cont-col">
                                <el-form-item label="活动时间：" prop="startTime" style="margin-bottom:0;display: flex;">
                                    <el-date-picker v-model="form.startTime" :clearable=false :editable=false :picker-options="pickerOptionsStart" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间">
                                </el-date-picker>
                                </el-form-item>
                                <div class="line ml5 mr5">-</div>
                                <el-form-item prop="endTime" style="margin-bottom:0">
                                    <el-date-picker v-model="form.endTime" :editable=false :clearable=false :picker-options="pickerOptionsEnd" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                    </div>
                </div>
                <div class="forminfo">
                    <h2>2.设置规则和优惠</h2>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <div class="query-col-title">优惠方式：</div>
                            <div class="query-col-input">
                                <el-radio v-model="form.discountType" :label=1 @change='radioChange'>折扣</el-radio>
                                <el-radio v-model="form.discountType" :label=2 @change='radioChange'>直降（平台补贴）</el-radio>
                            </div>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <div class="query-col-title">会员限制：</div>
                            <div class="query-col-input">
                                <el-radio v-model="form.memberScope" :label=1>所有会员</el-radio>
                                <el-radio v-model="form.memberScope" :label=2>首单会员（第一次购买）</el-radio>
                                <el-radio v-model="form.memberScope" :label=3>新注册会员</el-radio>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="forminfo">
                    <h2>3.选择活动商品</h2>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <div class="query-col-title">活动商品：</div>
                            <div class="query-col-input">
                                <el-button type="primary" size='small' @click="()=>{$router.push('/hmall/addProducts')}">添加商品</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-table">
                    <!-- table -->
                    <hosJoyTable ref="hosjoyTable" isShowIndex border  isAction :column="column" :data="form.spikeSku" align="center" actionWidth='180px' >
                        <template slot="skuName" slot-scope="scope">
                            <div class="goods">
                                <img :src="scope.data.row.pictureUrl">
                                <span class="goods-name">{{scope.data.row.skuName}}</span>
                            </div>
                        </template>
                        <template slot="action" slot-scope="scope">
                            <el-button type="primary" size='small' @click="onRemove(scope.data.row)">移除</el-button>
                            <el-button type="primary" size='small' @click="onOrder(scope.data.row)">刷单（{{scope.data.row.order?scope.data.row.order:0}}）</el-button>
                        </template>
                    </hosJoyTable>
                </div>
            </el-form>
        </div>
        <div class="subfixed">
            <el-button type="primary" @click='onSave(1)'>保存</el-button>
            <el-button type="primary" @click='onSave(2)'>活动发布</el-button>
        </div>
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { isNum } from '@/utils/validate/format'
import Sortable from 'sortablejs'
import { mapState, mapMutations, mapActions } from 'vuex'
import { saveEvent, editEvent, clickFarming } from './api/index'
import { clearCache, newCache } from '@/utils/index'
import moment from 'moment'

export default {
    name: 'createEditEvent',
    components: { hosJoyTable },
    data () {
        return {
            isPending: false,
            sortable: null,
            form: {
                spikeName: '',
                startTime: '',
                endTime: '',
                discountType: 1, // 优惠方式 1：折扣 2：直降
                memberScope: 1, // 会员限制 1：所有会员 2：首单会员 3：新注册会员
                spikeSku: [],
                status: ''// 状态 1：待发布 2：已发布 3：已取消
            },
            rules: {
                event: {
                    spikeName: [
                        { required: true, validator: this.validateSpikeName, trigger: 'blur' }
                    ],
                    startTime: [
                        { required: true, message: '请选择活动开始时间', trigger: 'change' }
                    ],
                    endTime: [
                        { required: true, message: '请选择活动结束时间', trigger: 'change' }
                    ]
                }
            },
            purchaseLimitNum: '',
            discount: '',
            tableData: [],
            column: [
                { label: '商品', prop: 'skuName', slot: 'skuName', minWidth: '160', className: 'allowDrag' },
                { label: '商建议零售价', prop: 'retailPrice', formatter: this.formatterMoney, className: 'allowDrag' },
                { label: '销售价格', prop: 'sellPrice', formatter: this.formatterMoney, className: 'allowDrag' },
                {
                    label: '卖点',
                    prop: 'sellingPoint',
                    minWidth: '130',
                    render: (h, scope) => {
                        return (
                            <span>
                                <el-input class={scope.row._sellingPointError ? 'error' : ''} style='width:80%' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'sellingPoint') }} maxLength='12'></el-input>
                                {scope.row._sellingPointError ? <div class='errormsg'>{scope.row.sellingPointErrorMsg}</div> : ''}
                            </span>
                        )
                    }
                },
                {
                    label: '库存',
                    minWidth: '110',
                    prop: 'inventoryNum',
                    render: (h, scope) => {
                        return (
                            <span>
                                <el-input class={scope.row._inventoryNumError ? 'error' : ''} style='width:110px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val.replace(/[^\d]/g, ''), scope, 'inventoryNum') }}></el-input>
                                {scope.row._inventoryNumError ? <div class='errormsg'>{scope.row.inventoryNumErrorMsg}</div> : ''}
                            </span>
                        )
                    }
                },
                {
                    label: '限购数量',
                    prop: 'purchaseLimitNum',
                    width: '210',
                    renderHeader: (h, scope) => {
                        return (
                            <span class='flxinput'>
                                <font>{scope.column.label}</font>
                                <el-input size='mini' value={this.purchaseLimitNum} onInput={(val) => { this.setAllCol('purchaseLimitNum', val) }} ></el-input>
                            </span>
                        )
                    },
                    render: (h, scope) => {
                        return (
                            <span>
                                <el-input class={scope.row._numError ? 'error' : ''} style='width:110px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'purchaseLimitNum') }}></el-input>
                                {scope.row._numError ? <div class='errormsg'>{scope.row.numErrorMsg}</div> : ''}
                            </span>
                        )
                    }
                },
                {
                    label: '优惠设置',
                    prop: 'discount',
                    width: '210',
                    renderHeader: (h, scope) => {
                        return (
                            <span class='flxinput'>
                                <font>{scope.column.label}</font>
                                <el-input size='mini' value={this.discount} onInput={(val) => { this.setAllCol('discount', val) }}></el-input>
                            </span>
                        )
                    },
                    render: (h, scope) => {
                        return (
                            this.form.discountType === 1
                                ? <span>
                                    <el-input class={scope.row._error ? 'error' : ''} style='width:110px;margin:0 10px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'discount') }}></el-input>折
                                    {scope.row._error ? <div class='errormsg'>{scope.row.errorMsg}</div> : ''}
                                </span>
                                : <span>
                                    直降<el-input class={scope.row._error ? 'error' : ''} style='width:110px;margin:0 10px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'discount') }}></el-input>元
                                    {scope.row._error ? <div class='errormsg'>{scope.row.errorMsg}</div> : ''}
                                </span>
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
            eventInfos: state => state.eventManage.eventInfos
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.form.endTime)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.form.startTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        ...mapMutations([ 'REMOVE_EVENT_PRODUCTS', 'ADD_EVENT_PRODUCTS', 'EMPTY_EVENT_PRODUCTS' ]),
        ...mapActions(['eventInfo']),
        radioChange (val) {
            this.discount = ''
            this.purchaseLimitNum = ''
            this.form.spikeSku.map((item) => {
                item.discount = ''
                item._error = false
                item._numError = false
                item.numErrorMsg = ''
                item.errorMsg = ''
                this.validate(item)
            })
            this.onInitDiscount()
        },
        formatterMoney (row, column) {
            if (row[column.property] == null) return '-'
            let res = row[column.property].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return res == 0 ? 0 : `¥${res}`
        },
        /** 设置某行 */
        setOneCol (val, scope, key = '') {
            if (key != 'sellingPoint') scope.row[scope.column.property] = isNum(val, this.form.discountType === 1 ? 1 : 2)
            else scope.row[scope.column.property] = val
            this.validate(scope.row, key)
            if (!scope.row._error && val && key === 'discount') {
                this.form.discountType === 1
                    ? scope.row.salePrice = (scope.row.sellPrice * (scope.row.discount / 10)).toFixed(2)
                    : scope.row.salePrice = (scope.row.sellPrice - (scope.row.discount ? scope.row.discount : 0)).toFixed(2)
            }
        },
        /** 设置所有 */
        setAllCol (key, val) {
            if (this.form.discountType === 2) {
                this[key] = isNum(val, 2)
            }
            if (this.form.discountType === 1) {
                this[key] = isNum(val, 1)
            }
            // 限购数量
            if (key === 'purchaseLimitNum') {
                this[key] = val.replace(/[^\d]/g, '')
            }
            this.form.spikeSku.map((item) => {
                item[key] = this[key]
                this.validate(item, key)
                if (!item._error && val && key === 'discount') {
                    this.form.discountType === 1
                        ? item.salePrice = (item.sellPrice * (item.discount / 10)).toFixed(2)
                        : item.salePrice = (item.sellPrice - (item.discount ? item.discount : 0)).toFixed(2)
                }
            })
        },
        /** 校验 */
        validate (item, action = '') {
            // true 需要在特定的操作才触发。
            if (action === 'submit') {
                if (!item.sellingPoint) {
                    item.sellingPointErrorMsg = '卖点不能为空'
                    this.$set(item, '_sellingPointError', true)
                }
                if (!item.inventoryNum) {
                    item.inventoryNumErrorMsg = '库存不能小于0'
                    this.$set(item, '_inventoryNumError', true)
                }
            }
            if (item.sellingPoint) {
                item.sellingPointErrorMsg = ''
                this.$set(item, '_sellingPointError', false)
            }
            if (item.inventoryNum) {
                item.inventoryNumErrorMsg = ''
                this.$set(item, '_inventoryNumError', false)
            }
            if ((action === 'submit') && (!item.purchaseLimitNum || item.purchaseLimitNum == 0)) {
                item.numErrorMsg = '限购数量不能小于0'
                this.$set(item, '_numError', true)
                // return
            }
            if (action === 'submit') {
                if (!item.discount) {
                    item.errorMsg = '优惠折扣不可低于1折'
                    this.$set(item, '_error', true)
                    return
                } else {
                    item._error = false
                    item.errorMsg = ''
                }
            }
            if (Number(item.purchaseLimitNum) > Number(item.inventoryNum)) {
                item.numErrorMsg = '限购数量不可超过库存数量'
                item._numError = true
            } else if (item.purchaseLimitNum) {
                item._numError = false
                item.numErrorMsg = ''
            }
            if (this.form.discountType === 2) {
                if (item.sellPrice - (item.discount ? item.discount : 0) <= 0) {
                    item.errorMsg = '优惠最高金额不可超过销售价格'
                    item._error = true
                } else {
                    item._error = false
                    item.errorMsg = ''
                }
            } else {
                if (item.discount && item.discount > 10) {
                    item.errorMsg = '最大折扣不能大于10'
                    this.$set(item, '_error', true)
                } else if (item.discount && item.discount < 1) {
                    item.errorMsg = '优惠折扣不可低于1折'
                    item._error = true
                } else if (item.discount) {
                    item._error = false
                    item.errorMsg = ''
                }
            }
            this.$forceUpdate()
        },
        /** 移除 */
        onRemove (val) {
            //
            this.REMOVE_EVENT_PRODUCTS(val)
            this.form.spikeSku = this.form.spikeSku.filter(item => item.id != val.id)
        },
        /** 刷单 */
        onOrder (val) {
            // 刷单前置条件：活动已经开启，库存不为零。
            this.$confirm('确认是否刷单一次?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                if (!val.id) {
                    this.$message.error(`刷单的前置条件需要活动开启`)
                    return
                }
                if (this.isPending) return
                this.isPending = true
                try {
                    await clickFarming({ sid: val.id, updateBy: this.userInfo.employeeName })
                    this.isPending = false
                    this.getEventInfo()
                } catch (error) {
                    this.isPending = false
                }
            }).catch(() => {
                this.isPending = false
            })
        },
        /** 初始化拖拽 */
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
                    this.EMPTY_EVENT_PRODUCTS()
                    this.ADD_EVENT_PRODUCTS(this.form.spikeSku)// 写入session
                }
            })
        },
        /** 保存 */
        async onSave (status) {
            console.log(this.form)
            let temp = true
            this.$refs['form'].validate((valid, errors) => {
                if (!valid) {
                    let arr = Object.values(errors)
                    for (let i = 0; i < arr.length; i++) {
                        this.$message.error(`${arr[0][0].message}`)
                        break
                    }
                    temp = false
                }
            })
            if (!temp) return false
            let flag = true
            this.form.spikeSku.some((item, index) => {
                this.validate(item, 'submit')
                item.sort = index + 1
                if (!item.inventoryOriginNum && item.inventoryOriginNum != 0) this.$set(item, 'inventoryOriginNum', item.inventoryNum)
                if (!item.inventoryRemainNum && item.inventoryRemainNum != 0) this.$set(item, 'inventoryRemainNum', item.inventoryNum)
                if (item._error || item._numError || item._inventoryNumError || item._sellingPointError) {
                    /* let msg = item.numErrorMsg ? `${item.skuName}，${item.numErrorMsg}` : `${item.skuName}，${item.errorMsg}`
                    this.$message({ message: msg,type: 'error' })
                    flag = false
                    return true// 当内部return true时跳出整个循环 */
                    flag = false
                }
            })
            if (flag) {
                if (this.isPending) return
                this.isPending = true
                try {
                    this.form.status = status

                    if (this.$route.query.eventId) {
                        this.form.updateBy = this.userInfo.employeeName
                        await editEvent(this.form)
                    } else {
                        this.form.createBy = this.userInfo.employeeName
                        await saveEvent(this.form)
                    }
                    this.isPending = false
                    this.$message.success(`提交成功！`)
                    this.$router.push('/hmall/eventMange')
                } catch (error) {
                    this.isPending = false
                }
            }
        },
        validateSpikeName (rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入活动名称'))
                return
            }
            let reg = /^[\u4e00-\u9fa5]{2,}$/
            if (value && !reg.test(value)) {
                callback(new Error('活动名称最少为2个汉字字符'))
            } else {
                callback()
            }
        },
        /** 初始化优惠设置 */
        onInitDiscount () {
            this.form.spikeSku.map((item) => {
                let temp = ''
                this.form.discountType === 1
                    ? temp = item.salePrice ? ((item.salePrice / item.sellPrice) * 10) : ''
                    : temp = item.salePrice ? (item.sellPrice - item.salePrice) : ''
                if (item.sellPrice == item.salePrice) this.$set(item, 'discount', '')
                else {
                    if ((temp + '').indexOf('.') != -1) this.$set(item, 'discount', temp.toFixed(2))
                    else this.$set(item, 'discount', temp)
                }
            })
            this.EMPTY_EVENT_PRODUCTS()
            this.ADD_EVENT_PRODUCTS(this.form.spikeSku)// 写入session
        },
        setTableData (data) {
            console.log('setTableData', data)
            this.form.spikeSku = data
            this.form.spikeSku.forEach(item => {
                if (!item.salePrice) this.$set(item, 'salePrice', item.sellPrice)
                if (!item.purchaseLimitNum) this.$set(item, 'purchaseLimitNum', '')// 限购
                this.$set(item, 'sort', '')
                this.$set(item, '_numError', false)
                this.$set(item, '_error', false)
                this.$set(item, '_sellingPointError', false)
                this.$set(item, '_inventoryNumError', false)
                this.$set(item, 'numErrorMsg', '')
                this.$set(item, 'errorMsg', '')
                this.$set(item, 'sellingPointErrorMsg', '')
                this.$set(item, 'inventoryNumErrorMsg', '')
                this.$set(item, 'sellingPoint', '')
                // if (!item.inventoryNum) {
                this.$set(item, 'inventoryNum', item.inventoryRemainNum)
                // }
            })
            this.onInitDiscount()

            this.$nextTick(() => {
                this.setSort()
            })
        },
        async getEventInfo () {
            await this.eventInfo(this.$route.query.eventId)
            this.form = this.eventInfos
            const { spikeSku } = this.eventInfos
            this.setTableData(spikeSku)
        }

    },
    async activated () {
        if (this.$route.query.eventId) {
            this.getEventInfo()
        } else {
            this.setTableData(this.eventProducts)
        }
    },
    beforeRouteEnter (to, from, next) {
        newCache('createEditEvent')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'addProducts') {
            clearCache('createEditEvent')
            this.EMPTY_EVENT_PRODUCTS()
        }
        next()
    }
}

</script>

<style scoped lang="scss">
.forminfo h2{font-size: 18px; margin:20px 0 15px;background: #f2f2f2; padding:7px 0 7px 5px}
/deep/.flxinput{ display: flex;align-items: center;}
/deep/.flxinput font{ width: 90px}
.goods{ display: flex}
.goods img{width: 70px; height: 70px; margin-right: 15px}
.subfixed{position: fixed;bottom: 3px;width: 186px;left: 50%;transform: translateX(-90px);text-align: center;z-index: 999;}
.pb20{ padding-bottom: 20px !important}
.goods-name{ text-align: left}
/deep/.el-table .warning-row {background: #ffc7c7;}
/deep/.errormsg{color:#f56c6c;font-size: 12px;margin-top: 2px}
/deep/.movedom{opacity: .8;color: #fff!important;background: #42b983!important;}
/deep/.error .el-input__inner{ border:1px solid #f56c6c }
</style>

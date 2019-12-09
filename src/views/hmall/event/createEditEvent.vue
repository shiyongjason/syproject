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
                                    <el-input style="width:466px" v-model.trim="form.spikeName" placeholder="请输入活动名称" maxlength="255" clearable :disabled='disableStatus'></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="query-cont-row">
                            <!-- <div class="query-col-title">活动时间：</div> -->
                            <div class="query-cont-col">
                                <el-form-item label="活动时间：" prop="startTime" style="margin-bottom:0;display: flex;">
                                    <el-date-picker v-model="form.startTime" :clearable=false :editable=false :picker-options="pickerOptionsStart" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :disabled='disableStatus'>
                                </el-date-picker>
                                </el-form-item>
                                <div class="line ml5 mr5">-</div>
                                <el-form-item prop="endTime" style="margin-bottom:0">
                                    <el-date-picker v-model="form.endTime" :editable=false :clearable=false :picker-options="pickerOptionsEnd" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :disabled='disableStatus'>
                                    </el-date-picker>
                                </el-form-item>
                                <div class="timeTips" v-if="!disableStatus">只能创建10分钟后开始的活动</div>
                            </div>
                    </div>
                </div>
                <div class="forminfo">
                    <h2>2.设置规则和优惠</h2>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <div class="query-col-input">
                                <el-form-item prop="discountType" label="优惠方式：" style="display: flex;">
                                    <el-radio v-model="form.discountType" :label=1 @change='radioChange' :disabled='disableStatus'>折扣</el-radio>
                                    <el-radio v-model="form.discountType" :label=2 @change='radioChange' :disabled='disableStatus'>直降（平台补贴）</el-radio>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <div class="query-col-input">
                                <el-form-item prop="memberScope" label="会员限制：" style="display: flex;">
                                <el-radio v-model="form.memberScope" :label=1 :disabled='disableStatus'>所有会员</el-radio>
                                <el-radio v-model="form.memberScope" :label=2 :disabled='disableStatus'>首单会员（第一次购买）</el-radio>
                                <el-radio v-model="form.memberScope" :label=3 :disabled='disableStatus'>新注册会员</el-radio>
                                </el-form-item>
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
                                <el-button type="primary" size='small' @click="()=>{$router.push('/hmall/addProducts')}" :disabled='disableStatus'>添加商品</el-button>
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
                            <el-button type="primary" size='small' @click="onRemove(scope.data.row)" :disabled='disableStatus'>移除</el-button>
                            <el-button type="primary" size='small' @click="onOrder(scope.data.row)">
                                刷单（{{scope.data.row.clickFarmingNum?scope.data.row.clickFarmingNum:0}}）
                            </el-button>
                        </template>
                    </hosJoyTable>
                </div>
            </el-form>
        </div>
        <div class="subfixed" v-if="!disableStatus || $route.query.copeId" :class="isCollapse ? 'minLeft' : 'maxLeft'">
            <el-button type="primary" @click='()=>{$router.go(-1)}'>返回</el-button>
            <el-button type="primary" @click='onSave(1)'>保存</el-button>
            <el-button type="primary" @click='onSave(2)'>活动发布</el-button>
        </div>
        <div class="subfixed" v-else :class="isCollapse ? 'minLeft' : 'maxLeft'">
            <el-button @click='()=>{$router.go(-1)}'>返回</el-button>
        </div>
        <el-dialog title="提示" :visible.sync="orderDialogVisible" width="450px" class="orderDialog" center :close-on-click-modal=false :close-on-press-escape=false>
        <center>
            <p>确认是否刷单一次?此操作不可撤销，是否继续？</p>
            <!-- <p class="isremind"><el-checkbox v-model="remind" @change='onrRemind'><font>不再提醒</font></el-checkbox></p> -->
        </center>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSureOrder">确 定</el-button>
        </span>
        </el-dialog>
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
            isFirst: true,
            popoverVisible: false,
            otpopoverVisible: false,
            orderRow: '',
            remind: false,
            orderDialogVisible: false,
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
                    ],
                    discountType: [
                        { required: true, message: '请选择优惠方式', trigger: 'change' }
                    ],
                    memberScope: [
                        { required: true, message: '请选择会员限制', trigger: 'change' }
                    ]
                }
            },
            purchaseLimitNum: '',
            discountValue: '',
            tableData: [],
            column: [
                { label: '商品', prop: 'skuName', slot: 'skuName', minWidth: '300', className: 'allowDrag' },
                { label: '建议零售价', prop: 'retailPrice', formatter: this.formatterMoney, className: 'allowDrag' },
                { label: '销售价格', prop: 'sellPrice', formatter: this.formatterMoney, className: 'allowDrag' },
                {
                    label: '卖点',
                    prop: 'sellingPoint',
                    minWidth: '130',
                    render: (h, scope) => {
                        return (
                            <span>
                                <el-input style='width:80%' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'sellingPoint') }} maxLength='12' disabled={this.disableStatus}></el-input>
                            </span>
                        )
                    }
                },
                {
                    label: '库存',
                    minWidth: '110',
                    prop: 'inventoryNum',
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
                            <span>
                                <el-input class={scope.row._inventoryNumError ? 'error' : ''} style='width:80%' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(Number(val.replace(/[^\d]/g, '')), scope, 'inventoryNum') }} disabled={this.disableStatus}></el-input>
                                {scope.row._inventoryNumError ? <div class='errormsg'>{scope.row.inventoryNumErrorMsg}</div> : ''}
                            </span>
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
                                <el-input size='mini' style='width:80%' value={this.purchaseLimitNum} onInput={(val) => { this.purchaseLimitNum = val.replace(/[^\d]/g, '') }} disabled={this.disableStatus}></el-input>
                                {
                                    this.disableStatus ? '' : (<span class='popover'>
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
                            <span>
                                <el-input class={scope.row._numError ? 'error' : ''} style='width:80%' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'purchaseLimitNum') }} disabled={this.disableStatus}></el-input>
                                {scope.row._numError ? <div class='errormsg'>{scope.row.numErrorMsg}</div> : ''}
                            </span>
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
                                <el-input size='mini' style='width:80%' value={this.discountValue} onInput={(val) => { this.discountValue = val }} disabled={this.disableStatus}></el-input>
                                {
                                    this.disableStatus ? '' : (<span class='popover'>
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
                            this.form.discountType === 1
                                ? <span>
                                    <el-input class={scope.row._error ? 'error' : ''} style='width:110px;margin:0 10px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'discountValue') }} disabled={this.disableStatus}></el-input>折
                                    {scope.row._error ? <div class='errormsg'>{scope.row.errorMsg}</div> : ''}
                                </span>
                                : <span>
                                    直降<el-input class={scope.row._error ? 'error' : ''} style='width:110px;margin:0 10px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope, 'discountValue') }} disabled={this.disableStatus}></el-input>元
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
            eventInfos: state => state.eventManage.eventInfos,
            isCollapse: state => state.isCollapse
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.form.endTime
                    if (endDateVal) {
                        return time.getTime() >= new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.form.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                    }
                }
            }
        },
        disableStatus () {
            // 在编辑状态下，非待发布的活动全部不可编辑，新增和复制全部可以编辑
            return this.$route.query.eventId && this.form.status != 1
        }
    },
    methods: {
        ...mapMutations([ 'REMOVE_EVENT_PRODUCTS', 'ADD_EVENT_PRODUCTS', 'EMPTY_EVENT_PRODUCTS' ]),
        ...mapActions(['eventInfo', 'copy']),
        radioChange (val) {
            this.discountValue = ''
            this.purchaseLimitNum = ''
            this.form.spikeSku.map((item) => {
                item.discountValue = ''
                item._error = false
                item._numError = false
                item.numErrorMsg = ''
                item.errorMsg = ''
            })
        },
        formatterMoney (row, column) {
            if (row[column.property] == null) return '-'
            let res = row[column.property].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return res == 0 ? 0 : `¥${res}`
        },
        /** 设置某行 */
        setOneCol (val, scope, key = '') {
            if (key === 'purchaseLimitNum') val = Number(val.replace(/[^\d]/g, ''))
            if (key != 'sellingPoint') scope.row[scope.column.property] = isNum(val, this.form.discountType === 1 ? 1 : 2)
            else scope.row[scope.column.property] = val
            this.validate(scope.row, key)
            if (!scope.row._error && val && key === 'discountValue') {
                this.handleSetSalePrice(scope.row)
            }
        },
        /** 设置所有 action(1应用全部，2应用到未填写) */
        setAllCol (key, val, action = '') {
            if (this.form.discountType === 2) {
                this[key] = isNum(val, 2)
            }
            if (this.form.discountType === 1) {
                this[key] = isNum(val, 1)
            }
            this.form.spikeSku.map((item) => {
                if (action == 1) {
                    item[key] = this[key]
                }
                if (action == 2 && !item[key]) {
                    item[key] = this[key]
                }
                this.validate(item, key)
                if (!item._error && val && key === 'discountValue') {
                    this.handleSetSalePrice(item)
                }
            })
        },
        handleSetSalePrice (item) {
            if (this.form.discountType === 1) {
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
        /** 校验 */
        validate (item, action = '') {
            // true 需要在特定的操作才触发。
            if (action === 'submit') {
                if (!item.inventoryNum) {
                    item.inventoryNumErrorMsg = '库存不能小于0'
                    this.$set(item, '_inventoryNumError', true)
                }
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
                if (!item.discountValue) {
                    if (this.form.discountType === 1) item.errorMsg = '优惠折扣不可低于1折'
                    else item.errorMsg = '直降不能小于0'
                    this.$set(item, '_error', true)
                    return
                } else {
                    item._error = false
                    item.errorMsg = ''
                }
            }
            if ((!this.form.status) && (Number(item.purchaseLimitNum) > Number(item.inventoryNum))) {
                item.numErrorMsg = '限购数量不可超过库存数量'
                item._numError = true
            } else if (item.purchaseLimitNum) {
                item._numError = false
                item.numErrorMsg = ''
            }
            if (this.form.discountType === 2) {
                if (item.sellPrice - (item.discountValue ? item.discountValue : 0) < 0) {
                    item.errorMsg = '优惠最高金额不可超过销售价格'
                    item._error = true
                } else {
                    item._error = false
                    item.errorMsg = ''
                }
            } else {
                if (item.discountValue && item.discountValue > 10) {
                    item.errorMsg = '最大折扣不能大于10'
                    this.$set(item, '_error', true)
                } else if (item.discountValue && item.discountValue < 1) {
                    item.errorMsg = '优惠折扣不可低于1折'
                    item._error = true
                } else if (item.discountValue) {
                    item._error = false
                    item.errorMsg = ''
                }
            }
            this.$forceUpdate()
        },
        /** 移除 */
        onRemove (val) {
            this.REMOVE_EVENT_PRODUCTS(val)
            this.form.spikeSku = this.form.spikeSku.filter(item => item.id != val.id)
        },
        /** 刷单 */
        onOrder (val) {
            console.log(this.form.status)
            // 刷单前置条件：活动已经开启，库存不为零。
            if (this.form.status == 1) {
                this.$message.error(`刷单的前置条件该商品已经发布且库存不为零。`)
                return
            }
            if (!val.productId || val.inventoryRemainNum === 0 || this.$route.query.copeId) {
                this.$message.error(`刷单的前置条件该商品已经发布且库存不为零。`)
                return
            }
            this.orderRow = val
            if (!this.remind) this.orderDialogVisible = true
            else this.onSureOrder()
        },
        onCancle () {
            this.orderDialogVisible = false
            this.remind = false
            sessionStorage.setItem('remind', false)
        },
        onrRemind () {
            sessionStorage.setItem('remind', this.remind)
        },
        async onSureOrder () {
            if (this.isPending) return
            this.isPending = true
            try {
                await clickFarming({ productId: this.orderRow.productId, updateBy: this.userInfo.employeeName })
                this.isPending = false
                this.getEventInfo(1)
                this.orderDialogVisible = false
            } catch (error) {
                this.isPending = false
            }
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
                        this.EMPTY_EVENT_PRODUCTS()
                        this.ADD_EVENT_PRODUCTS(this.form.spikeSku)// 写入session
                    })
                }
            })
        },
        /** 保存 */
        async onSave (status, mark = '') {
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
            if (this.form.spikeSku && this.form.spikeSku.length == 0) {
                this.$message.error(`活动商品不能为空`)
                return
            }
            let hours = moment.duration(moment(this.form.endTime).valueOf() - moment(this.form.startTime).valueOf()).as('hours')
            if (hours == 0) {
                this.$message.error(`活动结束时间不能和开始时间一样`)
                return
            }
            if (hours < 0) {
                this.$message.error(`开始时间不能大于结束时间`)
                return
            }
            //
            if (hours > 4 * 24) {
                this.$message.error(`活动时间最多持续四天`)
                return
            }
            let flag = true
            this.form.spikeSku.some((item, index) => {
                this.validate(item, 'submit')
                item.sort = index + 1
                this.$set(item, 'inventoryOriginNum', item.inventoryNum)
                this.$set(item, 'inventoryRemainNum', item.inventoryNum)
                if (item._error || item._numError || item._inventoryNumError) flag = false
            })
            if (flag) {
                // if status === 2 &&
                if (status === 2 && mark === '') {
                    let now = moment().format('YYYY-MM-DD HH:mm:ss')
                    let consumingMinutes = moment.duration(moment(this.form.startTime).valueOf() - moment(now).valueOf()).as('minutes')
                    if (consumingMinutes < 10) {
                        this.$message.error(`只能创建当前时间10分钟后的活动`)
                        return
                    }
                    if (consumingMinutes > 4 * 24 * 60) {
                        this.$message.error(`只能提前4天发布`)
                        return
                    }
                    this.$set(this.form, 'publishTime', moment().format('YYYY-MM-DD HH:mm:ss'))
                }
                if (this.isPending) return
                this.isPending = true
                try {
                    if (mark === '') this.form.status = status
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
            } else {
                // this.$message.error(`信息尚未填写完整`)
            }
        },
        validateSpikeName (rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入活动名称'))
                return
            }
            // let reg = /^[\u4e00-\u9fa5]{2,}$/
            if (value && value.length < 2) {
                callback(new Error('活动名称最少为2个字符'))
            } else {
                callback()
            }
        },
        /** 初始化优惠设置 */
        onInit () {
            this.EMPTY_EVENT_PRODUCTS()
            this.ADD_EVENT_PRODUCTS(this.form.spikeSku)// 写入session
        },
        setTableData (data) {
            this.form.spikeSku = data
            this.form.spikeSku.forEach(item => {
                !item.salePrice && this.$set(item, 'salePrice', item.sellPrice)
                !item.purchaseLimitNum && this.$set(item, 'purchaseLimitNum', '')// 限购
                !item.sort && this.$set(item, 'sort', '')
                !item._numError && this.$set(item, '_numError', false)
                !item._error && this.$set(item, '_error', false)
                !item._inventoryNumError && this.$set(item, '_inventoryNumError', false)
                !item.numErrorMsg && this.$set(item, 'numErrorMsg', '')
                !item.errorMsg && this.$set(item, 'errorMsg', '')
                !item.sellingPoint && this.$set(item, 'sellingPoint', '')
                !item.inventoryNumErrorMsg && this.$set(item, 'inventoryNumErrorMsg', '')
                !item.inventoryNum && this.$set(item, 'inventoryNum', item.inventoryRemainNum)
                !item.productId && this.$set(item, 'productId', null)
                !item.discountValue && this.$set(item, 'discountValue', '')
                !item.clickFarmingNum && this.$set(item, 'clickFarmingNum', 0)
            })
            this.onInit()// 初始化，写入session
            this.$nextTick(() => {
                this.setSort()
            })
        },
        async getEventInfo () {
            let obj = { id: this.$route.query.eventId ? this.$route.query.eventId : this.$route.query.copeId, isFirst: this.isFirst }
            await this.eventInfo(obj)
            this.form = JSON.parse(JSON.stringify(this.eventInfos))
            const { spikeSku } = this.eventInfos
            this.setTableData(spikeSku)
        },
        async onCopy () {
            let obj = { id: this.$route.query.eventId ? this.$route.query.eventId : this.$route.query.copeId, isFirst: this.isFirst }
            await this.copy(obj)
            this.form = JSON.parse(JSON.stringify(this.eventInfos))
            const { spikeSku } = this.eventInfos
            this.setTableData(spikeSku)
        }

    },
    /*  async activated () {
        if (this.$route.query.eventId) {
            this.getEventInfo()
        } else if (this.$route.query.copeId) {
            this.onCopy()
        } else {
            this.setTableData(this.eventProducts)
        }
        this.remind = JSON.parse(sessionStorage.getItem('remind')) || false
    }, */
    beforeRouteEnter (to, from, next) {
        newCache('createEditEvent')
        next(vm => {
            if (from.path == '/hmall/addProducts') {
                vm.isFirst = false
            } else {
                vm.isFirst = true
            }
            if (vm.$route.query.eventId && vm.isFirst) {
                vm.getEventInfo()
            } else if (vm.$route.query.copeId && vm.isFirst) {
                vm.onCopy()
            } else {
                vm.setTableData(vm.eventProducts)
            }
            vm.remind = JSON.parse(sessionStorage.getItem('remind')) || false
        })
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
.subfixed {
    position: fixed;
    bottom: 0;
    background: #ffffff;
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
.pb20{ padding-bottom: 20px !important}
.goods-name{ text-align: left}
/deep/.el-table .warning-row {background: #ffc7c7;}
/deep/.errormsg{color:#f56c6c;font-size: 12px;margin-top: 2px}
/deep/.movedom{opacity: .8;color: #fff!important;background: #42b983!important;}
/deep/.error .el-input__inner{ border:1px solid #f56c6c }
/deep/.orderDialog .el-dialog{ height: 230px}
/deep/.orderDialog .el-dialog__body{ min-height: auto !important}
.isremind{margin-top:12px;}
.isremind font{color:#a6a8ab;font-weight: 200;}
/deep/.mark{ font-style: normal;color: #F56C6C; padding-right: 3px}
/deep/.el-popover .popover-p{ line-height: 30px;color: #F56C6C; }
.timeTips{ color: #FF7A45; margin-left: 30px}
</style>
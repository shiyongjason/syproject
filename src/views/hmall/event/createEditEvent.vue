<template>
    <div class="page-body">
        <div class="page-body-cont pb20">
            <div class="forminfo">
                <h2>1.设置活动基本信息</h2>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">活动名称：</div>
                        <div class="query-col-input">
                            <el-input style="width:458px" v-model="form.name" placeholder="请输入活动名称" maxlength="255" clearable></el-input>
                        </div>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">活动时间：</div>
                        <el-date-picker v-model="form.startDate" :clearable=false :editable=false :picker-options="pickerOptionsStart" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" placeholder="开始时间">
                        </el-date-picker>
                        <div class="line ml5 mr5">-</div>
                        <el-date-picker v-model="form.endDate" :editable=false :clearable=false :picker-options="pickerOptionsEnd" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" placeholder="结束时间">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="forminfo">
                <h2>2.设置规则和优惠</h2>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">优惠方式：</div>
                        <div class="query-col-input">
                            <el-radio v-model="form.radio" label="1" @change='radioChange'>折扣</el-radio>
                            <el-radio v-model="form.radio" label="2" @change='radioChange'>直降（平台补贴）</el-radio>
                        </div>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">会员限制：</div>
                        <div class="query-col-input">
                            <el-radio v-model="form.radio2" label="1">所有会员</el-radio>
                            <el-radio v-model="form.radio2" label="2">首单会员（第一次购买）</el-radio>
                            <el-radio v-model="form.radio2" label="3">新注册会员</el-radio>
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
                <hosJoyTable ref="hosjoyTable" isShowIndex border  isAction :column="column" :data="tableData" align="center" actionWidth='180px' >
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
        </div>
        <div class="subfixed">
            <el-button type="primary" @click='onSave'>保存</el-button>
            <el-button type="primary">活动发布</el-button>
        </div>
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { isNum } from '@/utils/validate/format'
import Sortable from 'sortablejs'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'createEditEvent',
    components: { hosJoyTable },
    data () {
        return {
            sortable: null,
            form: {
                name: '',
                startDate: '',
                endDate: '',
                radio: '1',
                radio2: '1'
            },
            limitNum: '',
            discount: '',
            tableData: [],
            column: [
                { label: '商品', prop: 'skuName', slot: 'skuName', minWidth: '160', className: 'allowDrag' },
                { label: '商建议零售价', prop: 'retailPrice', formatter: this.formatterMoney, className: 'allowDrag' },
                { label: '销售价格', prop: 'sellPrice', formatter: this.formatterMoney, className: 'allowDrag' },
                { label: '库存', prop: 'inventoryNum', className: 'allowDrag' },
                {
                    label: '限购数量',
                    prop: 'limitNum',
                    width: '210',
                    renderHeader: (h, scope) => {
                        return (
                            <span class='flxinput'>
                                <font>{scope.column.label}</font>
                                <el-input size='mini' value={this.limitNum} onInput={(val) => { this.setAllCol('limitNum', val) }} ></el-input>
                            </span>
                        )
                    },
                    render: (h, scope) => {
                        return (
                            <span>
                                <el-input style='width:110px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope) }}></el-input>
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
                            this.form.radio === '1'
                                ? <span>
                                    <el-input style='width:110px;margin:0 10px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope) }}></el-input>折
                                    {scope.row._error ? <div class='errormsg'>{scope.row.errorMsg}</div> : ''}
                                </span>
                                : <span>
                                    直降<el-input style='width:110px;margin:0 10px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope) }}></el-input>元
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
            eventProducts: state => state.eventManage.eventProducts
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.form.endDate)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.form.startDate)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        ...mapMutations({
            removeProduct: 'REMOVE_EVENT_PRODUCTS'
        }),
        radioChange (val) {
            this.tableData.map((item) => {
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
        setOneCol (val, scope) {
            scope.row[scope.column.property] = isNum(val, this.form.radio === '1' ? 1 : 2)
            this.validate(scope.row)
            if (!scope.row._error && val) {
                this.form.radio === '1'
                    ? scope.row.salePrice = (scope.row.sellPrice * (scope.row.discount / 10)).toFixed(2)
                    : scope.row.salePrice = (scope.row.sellPrice - (scope.row.discount ? scope.row.discount : 0)).toFixed(2)
            }
        },
        /** 设置所有 */
        setAllCol (key, val) {
            if (this.form.radio === '2') {
                this[key] = isNum(val, 2)
            }
            if (this.form.radio === '1') {
                this[key] = isNum(val, 1)
            }
            // 限购数量
            if (key === 'limitNum') {
                this[key] = val.replace(/[^\d]/g, '')
            }
            this.tableData.map((item) => {
                item[key] = this[key]
                this.validate(item)
                if (!item._error && val) {
                    this.form.radio === '1'
                        ? item.salePrice = (item.sellPrice * (item.discount / 10)).toFixed(2)
                        : item.salePrice = (item.sellPrice - (item.discount ? item.discount : 0)).toFixed(2)
                }
            })
        },
        /** 校验 */
        validate (item) {
            if (item.limitNum > item.inventoryNum) {
                item.numErrorMsg = '限购数量不可超过库存数量'
                item._numError = true
            } else {
                item._numError = false
                item.numErrorMsg = ''
            }
            if (this.form.radio === '2') {
                if (item.sellPrice - (item.discount ? item.discount : 0) <= 0) {
                    item.errorMsg = '优惠最高金额不可超过销售价格'
                    item._error = true
                } else {
                    item._error = false
                    item.errorMsg = ''
                }
            } else {
                if (item.discount && Number(item.discount) > 10) {
                    item.errorMsg = '最大折扣不能大于10'
                    this.$set(item, '_error', true)
                    return
                }
                if (item.discount && Number(item.discount) < 1) {
                    item.errorMsg = '优惠最高折扣不可低于1折'
                    item._error = true
                    return
                }
                item._error = false
                item.errorMsg = ''
            }
        },
        log () {
            console.log(this.tableData)
        },
        /** 移除 */
        onRemove (val) {
            //
            this.removeProduct(val)
        },
        /** 刷单 */
        onOrder (val) {
            // 刷单前置条件：活动已经开启，库存不为零。
            this.$confirm('确认是否刷单一次?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //
            }).catch(() => {
                //
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
                    this.tableData.splice(evt.newIndex, 0, this.tableData.splice(evt.oldIndex, 1)[0])
                    // let newArray = this.tableData.slice()
                    let newArray = JSON.parse(JSON.stringify(this.tableData))
                    this.tableData = []
                    this.$nextTick(function () {
                        this.tableData = newArray
                    })
                }
            })
        },
        /** 保存 */
        onSave () {
            console.log(this.tableData)
            this.tableData.some((item) => {
                this.validate(item)
                if (item._error || item._numError) {
                    let msg = item.numErrorMsg ? `${item.skuName}，${item.numErrorMsg}` : `${item.skuName}，${item.errorMsg}`
                    this.$message({
                        message: msg,
                        type: 'error'
                    })
                    return true// 当内部return true时跳出整个循环
                }
            })
        },
        /** 初始化优惠设置 */
        onInitDiscount () {
            this.tableData.map((item) => {
                // if (item.salePrice) {
                let temp = ''
                this.form.radio === '1'
                    ? temp = item.salePrice ? ((item.salePrice / item.sellPrice) * 10) : ''
                    : temp = item.salePrice ? (item.sellPrice - item.salePrice) : ''
                this.$set(item, 'discount', temp)
                // }
            })
            console.log(this.tableData)
        },
        setTableData (data) {
            this.tableData = data
            this.tableData.forEach(item => {
                this.$set(item, 'limitNum', '')
                this.$set(item, 'salePrice', '')
                // this.$set(item, 'discount', '')
            })
            this.onInitDiscount()
            this.$nextTick(() => {
                this.setSort()
            })
            console.log('this.tableData', this.tableData)
        }

    },
    mounted () {
        this.setTableData(this.eventProducts)
        /* this.tableData = [
            { id: 1, name: '测试商美的中央空调（Midea）3匹智能直流变频 风管机一拖一 家用卡机', retailPrice: 23154234, limitNum: 8, inventoryNum: 30, sellPrice: 12000, salePrice: 9000, discount: '' },
            {
                id: 2, name: '测试商品名称2', retailPrice: 88888, limitNum: 0, inventoryNum: 10, sellPrice: 20000, order: 2, discount: ''
            },
            { id: 3, name: '测试商品名称3', retailPrice: 20000, limitNum: 1, inventoryNum: 30, sellPrice: 10000, salePrice: 9000, discount: '' },
            { id: 4, name: '测试商品名称4', retailPrice: null, limitNum: 2, inventoryNum: 30, sellPrice: 40000, discount: '' },
            { id: 5, name: '测试商品名称5', retailPrice: null, limitNum: 2, inventoryNum: 30, sellPrice: 40000, discount: '' }
        ]
        this.onInitDiscount()
        this.$nextTick(() => {
            this.setSort()
        }) */
    }
    /* beforeRouteEnter (to, from, next) {
        next(vm => {
            if (from.path === '/hmall/addProducts') {
                vm.setTableData(vm.eventProducts)
            }
        })
    } */
}

</script>

<style scoped lang="scss">
.forminfo h2{font-size: 20px; margin:20px 0 15px;}
/deep/.flxinput{ display: flex;align-items: center;}
/deep/.flxinput font{ width: 80px}
.goods{ display: flex}
.goods img{width: 70px; margin-right: 15px}
.subfixed{ position: fixed; bottom: 3px;width: 100%;text-align: center;margin-left: -100px;z-index: 999}
.pb20{ padding-bottom: 20px !important}
.goods-name{ text-align: left}
/deep/.el-table .warning-row {background: #ffc7c7;}
/deep/.errormsg{color:#f56c6c;font-size: 12px;margin-top: 2px}
/deep/.movedom{opacity: .8;color: #fff!important;background: #42b983!important;}
</style>

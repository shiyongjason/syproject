<template>
    <div class="page-body">
        <div class="page-body-cont pb20">
            <div class="forminfo">
                <h2>1.设置活动基本信息</h2>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">活动名称：</div>
                        <div class="query-col-input">
                            <el-input v-model="form.name" placeholder="请输入活动名称" maxlength="255" clearable></el-input>
                        </div>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">活动时间：</div>
                        <el-date-picker v-model="form.startDate" :clearable=false :editable=false :picker-options="pickerOptionsStart" type="month" format="yyyy-MM" value-format="yyyy-MM-dd" placeholder="开始时间">
                        </el-date-picker>
                        <div class="line ml5 mr5">-</div>
                        <el-date-picker v-model="form.endDate" :editable=false :clearable=false :picker-options="pickerOptionsEnd" type="month" format="yyyy-MM" value-format="yyyy-MM-dd" placeholder="结束时间">
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
                            <el-radio v-model="form.radio" label="1">折扣</el-radio>
                            <el-radio v-model="form.radio" label="2">直降（平台补贴）</el-radio>
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
                            <el-button type="primary" size='small' @click='log'>添加商品</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-table">
                <!-- table -->
                <hosJoyTable ref="hosjoyTable" isShowIndex border  isAction :column="column" :data="tableData" align="center" :row-class-name="tableRowClassName">
                    <template slot="name" slot-scope="scope">
                        <div class="goods">
                            <img src="@/assets/images/img_herolist.png">
                            <span class="goods-name">{{scope.data.row.name}}</span>
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
            <el-button type="primary">保存</el-button>
            <el-button type="primary">活动发布</el-button>
        </div>
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { isNum } from '@/utils/validate/format'

export default {
    name: 'createEditEvent',
    components: { hosJoyTable },
    data () {
        return {
            form: {
                name: '',
                startDate: '',
                endDate: '',
                radio: '2',
                radio2: '1'
            },
            limitNum: '',
            discount: '',
            tableData: [],
            column: [
                { label: '商品', prop: 'name', slot: 'name', minWidth: '160' },
                { label: '商建议零售价', prop: 'suggestedRetailPrice', formatter: this.formatterMoney },
                { label: '销售价格', prop: 'sellingPrice', displayAs: 'money' },
                { label: '库存', prop: 'inStock' },
                {
                    label: '限购数量',
                    prop: 'limitNum',
                    width: '210',
                    renderHeader: (h, scope) => {
                        return (
                            <span class='flxinput'>
                                <font>{scope.column.label}</font>
                                <el-input size='mini' value={this.limitNum} onInput={(val) => { this.setAllCol('limitNum', val) }} ></el-input>
                                <i class='el-icon-caret-bottom'></i>
                            </span>
                        )
                    },
                    render: (h, scope) => {
                        return (
                            <el-input style='width:110px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { scope.row[scope.column.property] = val.replace(/[^\d]/g, '') }}></el-input>
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
                                <el-input size='mini' value={this.discount} onInput={(val) => { this.setAllCol('discount', val) }} maxLength = {this.form.radio === '1' ? '2' : ''}></el-input>
                                <i class='el-icon-caret-bottom'></i>
                            </span>
                        )
                    },
                    render: (h, scope) => {
                        return (
                            this.form.radio === '2'
                                ? <span>
                                    直降<el-input style='width:110px;margin:0 10px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope) }} onBlur={() => { this.onBlur(scope) }}></el-input>元
                                </span>
                                : <span>
                                    <el-input style='width:110px;margin:0 10px' size='mini' value={scope.row[scope.column.property]} onInput={(val) => { this.setOneCol(val, scope) }}></el-input>折
                                </span>
                        )
                    }
                },
                {
                    label: '促销价',
                    render: (h, scope) => {
                        return (
                            this.form.radio === '1'
                                ? <span>¥{(scope.row.sellingPrice * (scope.row.discount / 10)).toFixed(2)}</span>
                                : <span>¥{(scope.row.sellingPrice - (scope.row.discount ? scope.row.discount : 0)).toFixed(2)}</span>
                        )
                    }
                }
            ]
        }
    },
    computed: {
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
        getList () {
            //
        },
        formatterMoney (row, column) {
            if (row[column.property] == null) return '-'
            let res = row[column.property].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return res == 0 ? 0 : `¥${res}`
        },
        setAllCol (key, val) {
            if (this.form.radio === '2') {
                this[key] = isNum(val, 2)
            } else {
                this[key] = val.replace(/[^\d]/g, '')
            }
            this.tableData.map((item) => {
                item[key] = this[key]
            })
        },
        setOneCol (val, scope) {
            if (this.form.radio === '2') {
                scope.row[scope.column.property] = isNum(val, 2)
                if (scope.row.sellingPrice - (scope.row.discount ? scope.row.discount : 0) <= 0) {
                    this.$message({
                        message: '优惠最高金额不可超过销售价格',
                        type: 'error'
                    })
                    // this.tableRowClassName(scope, scope.$index)
                    console.log(this.$refs['hosjoyTable'].$refs['hosjoyTable'].rowClassName(scope, scope.$index))
                }
            } else {
                scope.row[scope.column.property] = isNum(val, 1)
            }
        },
        onBlur (scope) {

        },
        log () {
            console.log(this.tableData)
        },
        onRemove (val) {
            //
        },
        onOrder (val) {
            //
        },
        tableRowClassName (scope, index) {
            console.log(scope)
            if (scope == index) {
                return 'warning-row'
            }
            return ''
        }
    },
    mounted () {
        this.tableData = [
            { name: '测试商美的中央空调（Midea）3匹智能直流变频 风管机一拖一 家用卡机', suggestedRetailPrice: 23154234, limitNum: 8, inStock: 30, discount: 7.5, sellingPrice: 10000.23 },
            {
                name: '测试商品名称2', suggestedRetailPrice: 88888, limitNum: 0, inStock: 10, discount: 2, sellingPrice: 20000, order: 2
            },
            { name: '测试商品名称2', suggestedRetailPrice: 0, limitNum: 1, discount: 3, sellingPrice: 30000 },
            { name: '测试商品名称2', suggestedRetailPrice: null, limitNum: 2, discount: 4, sellingPrice: 40000 }
        ]
    }
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
</style>

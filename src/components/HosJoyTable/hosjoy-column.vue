<template>
    <el-table-column
        v-if="column && !column.isHidden && !column.selfSettingHidden"
        v-bind="$attrs"
        v-on="$listeners"
        :prop="column.prop"
        :label="getLabel(column.label)"
        :type="column.type"
        :index="column.index"
        :column-key="column.columnKey"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed && data && data.length > 0"
        :render-header="column.isUseCommonRenderHeader ? renderHeader : column.renderHeader"
        :sortable="column.sortable || false"
        :sort-method="column.sortMethod"
        :sort-by="column.sortBy"
        :sort-orders="column.sortOrders"
        :resizable="column.resizable || true"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip === false ? false: true"
        :align="column.align || align || 'center'"
        :header-align="column.headerAlign || headerAlign || column.align || align || 'center'"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
        :reserve-selection="column.reserveSelection || false"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue"
    >

        <template slot="header" slot-scope="scope">
            <hosjoy-render v-if="column.renderHeader" :scope="scope" :render="column.renderHeader">
            </hosjoy-render>
            <span v-else-if='column.headerUnit!=null && !column.isTHNoTranslate'>{{ dealHeaderUnit(scope.column.label, column) }}</span>
            <span v-else-if='(column.displayAs || column.unit) && !column.isTHNoTranslate'>{{ dealHeader(scope.column.label, column) }}</span>
            <span v-else>{{ scope.column.label }}</span>
        </template>

        <template slot-scope="scope">
            <div class="hosjoyRender">
                <hosjoy-render :scope="scope" :render="column.render"></hosjoy-render>
            </div>
        </template>

        <template v-if="column.children">
            <hosjoy-column v-for="(col, index) in column.children" :key="index" :column="col">
            </hosjoy-column>
        </template>
    </el-table-column>
</template>

<script>
import HosjoyRender from './hosjoy-render'
import moment from 'moment'
function money (value) {
    // if (money) {
    //     return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // }
    // return '-'
    if (value == null) return '-'
    let money = ''
    let pointNum = ''
    let val = value.toString()
    if (val.indexOf('.') > 0) {
        money = val.split('.')[0]
        pointNum = val.split('.')[1]
        return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + pointNum
    } else {
        money = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return money
    }
}
function fundMoney (money) {
    if (money === null) return '-'
    if (money === 0) return 0
    if (money) return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return '-'
}
// 资金台账金额格式
const fundMoneyHaveSpot = function (val, int) {
    if (val) {
        let head = ''
        let foot = ''
        if (val.toString().indexOf('.') > -1) {
            head = (val.toString().slice(0, val.toString().indexOf('.'))).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            foot = val.toString().substr(val.toString().indexOf('.'), 3)
        } else {
            head = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        return `${head}${foot}`
    } else if (val === 0) {
        return val
    }
    return '-'
}
export default {
    name: 'hosjoyColumn',
    props: {
        column: Object,
        headerAlign: String,
        align: String,
        data: Array
    },
    components: {
        HosjoyRender
    },
    data () {
        return {
            functions: {
                money: money,
                fundMoney: fundMoney,
                fundMoneyHaveSpot: fundMoneyHaveSpot
            }
        }
    },
    methods: {
        renderHeader (h, { column, $index }) {
            return h('el-tooltip', {
                attrs: {
                    class: 'cell'
                },
                props: {
                    content: (function () {
                        return column.label
                    })(),
                    placement: 'top'
                },
                domProps: {
                    innerHTML: column.label
                }
            }, [h('span')])
        },
        formatter (data) {
            return (data || data === 0) ? data : (this.isBlank ? '' : '-')
        },
        setColumn () {
            if (this.column && this.column.formatter) {
                this.column.render = (h, scope) => {
                    return <div>{scope.column.formatter(scope.row, scope.column, scope.row, scope.$index)}</div>
                }
            }
            if (this.column && !this.column.render) {
                let unit = this.column.unit ? this.column.unit : '' // 添加单位unit
                this.column.render = (h, scope) => {
                    // 添加字典
                    if (this.column.dicData) {
                        return (
                            <div>
                                {this.getLabelFromDicData(scope.row[this.column.prop], this.column.dicData) ? this.getLabelFromDicData(scope.row[this.column.prop], this.column.dicData).label : '-'}
                            </div>
                        )
                    }
                    if (this.column.displayAs) {
                        return (
                            <div>
                                {this.filterMethods(this.column.displayAs, scope.row[scope.column.property]) + unit}
                            </div>
                        )
                    }
                    return (
                        <div>{scope.row[scope.column.property] || scope.row[scope.column.property] === 0 ? `${scope.row[scope.column.property]}${unit}` : '-'}</div>
                    )
                }
            }
        },
        getLabelFromDicData (key, dicData) {
            if (key == null) return ''
            const map = dicData.reduce((res, item) => {
                res[item.value] = item
                return res
            }, {})
            return map[key]
        },
        filterMethods (fncName, row) {
            if (fncName in this.functions) {
                return this.functions[fncName](row)
            } else {
                // moment   displayAs: 'YYYY-MM-DD HH:mm:ss'
                if (!row) return '-'
                return moment(row).format(fncName)
            }
        },
        getLabel (label) {
            if (Object.prototype.toString.call(label) == '[object String]') {
                return label
            }
            // fix表头添加合计label为number是类型校验报错
            if (label || label == 0) {
                return `${label}`
            }
            return label // undefined|null
        },
        dealHeader (label, childItem) {
            if (!childItem.displayAs && !childItem.unit) return label
            let res = '-'
            if (childItem.displayAs && (childItem.displayAs in this.functions)) {
                if (label || label == 0) {
                    res = this.filterMethods(childItem.displayAs, label)
                }
            } else {
                res = label
            }
            let unit = childItem.unit ? childItem.unit : '' // 添加单位unit
            return res === '-' ? res : res + unit
        },
        dealHeaderUnit (label, column) {
            if (!column.displayAs && !column.headerUnit) return label
            let res = '-'
            if (column.displayAs && (column.displayAs in this.functions)) {
                if (label || label == 0) {
                    res = this.filterMethods(column.displayAs, label)
                }
            } else {
                res = label
            }
            let headerUnit = column.headerUnit ? column.headerUnit : '' // 头部单位headerUnit区别列表单元格单位展示
            return res === '-' ? res : res + headerUnit
        }
    },
    watch: {
        column: {
            handler (val, oldval) {
                val && this.setColumn()
            },
            immediate: true
        }
    }
}
</script>

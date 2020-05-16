<template>
    <el-table-column v-if="column" v-bind="$attrs" v-on="$listeners" :prop="column.prop" :label="column.label" :type="column.type" :index="column.index" :column-key="column.columnKey" :width="column.width" :min-width="column.minWidth" :fixed="column.fixed" :render-header="column.renderHeader"
        :sortable="column.sortable || false" :sort-method="column.sortMethod" :sort-by="column.sortBy" :sort-orders="column.sortOrders" :resizable="column.resizable || true" :formatter="column.formatter" :show-overflow-tooltip="column.showOverflowTooltip || false"
        :align="column.align || align || 'center'" :header-align="column.headerAlign || headerAlign || column.align || align || 'center'" :class-name="column.className" :label-class-name="column.labelClassName" :selectable="column.selectable" :reserve-selection="column.reserveSelection || false"
        :filters="column.filters" :filter-placement="column.filterPlacement" :filter-multiple="column.filterMultiple" :filter-method="column.filterMethod" :filtered-value="column.filteredValue">

        <template slot="header" slot-scope="scope">
            <hosjoy-render v-if="column.renderHeader" :scope="scope" :render="column.renderHeader">
            </hosjoy-render>
            <span v-else>{{ scope.column.label }}</span>
        </template>

        <template slot-scope="scope">
            <hosjoy-render :scope="scope" :render="column.render">
            </hosjoy-render>
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
function money (money) {
    if (money) {
        const res = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return res
    }
    return '-'
}
function fundMoney (money) {
    if (money === null) {
        return 0
    }
    if (money === 0) {
        return 0
    }
    if (money) {
        const res = money.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return res
    }
    return '-'
    
}
export default {
    name: 'hosjoyColumn',
    props: {
        column: Object,
        headerAlign: String,
        align: String
    },
    components: {
        HosjoyRender
    },
    data () {
        return {
            functions: {
                money: money,
                fundMoney: fundMoney
            }
        }
    },
    methods: {
        formatter (data) {
            return (data || data === 0) ? data : (this.isBlank ? '' : '-')
        },
        setColumn () {
            if (this.column && this.column.formatter) {
                this.column.render = (h, scope) => {
                    return <span>{scope.column.formatter(scope.row, scope.column, scope.row, scope.$index)}</span>
                }
            }
            if (this.column && !this.column.render) {
                this.column.render = (h, scope) => {
                    // 添加字典
                    if (this.column.dicData) {
                        return (
                            <span>
                                {this.getLabelFromDicData(scope.row[this.column.prop], this.column.dicData).label}
                            </span>
                        )
                    }
                    if (this.column.displayAs) {
                        return (
                            <span>
                                {this.filterMethods(this.column.displayAs, scope.row[scope.column.property])}
                            </span>
                        )
                    }
                    return (
                        <span>{scope.row[scope.column.property] || scope.row[scope.column.property] === 0 ? scope.row[scope.column.property] : '-'}</span>
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
                // moment
                if (!row) return '-'
                return moment(row).format(fncName)
            }
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

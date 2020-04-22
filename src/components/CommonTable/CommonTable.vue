<template>
    <div class="page-table clearfix">
        <div class="collapse">
            <img src="../../../src/assets/images/typeIcon.png" alt="" class="collapse" @click="collapse = !collapse">
        </div>
        <el-collapse-transition>
            <div class="collapse-content" v-if="collapse">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="selectTh" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="(item) in defaultTh" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </el-collapse-transition>
        <!-- 列表 -->
        <el-table v-bind="tableAttr" :data="tableData" :stripe='stripe' border  :lazy="true" :max-height="maxHeight" @sort-change="handleSortChange" @selection-change="handleSelectionChange" :tree-props="{ hasChildren: 'hasChildren' }" :row-key="rowKey" :load="load" :indent="4" :row-class-name="rowClassName">
            <el-table-column v-if="isMultiple" type="selection" align="center" :selectable="selectable"></el-table-column>
            <el-table-column v-if="isShowIndex" type="index" label="序号" :index="indexMethod" align="center" width="60"></el-table-column>
            <template v-for="item in tableLabel">
                <el-table-column v-if="selectTh.indexOf(item.label)>-1" :key="item.label" :label="item.label" :prop="item.prop" :sortable="item.sortable" :align="item.align?item.align:'center'" :min-width="item.width?item.width:''" :show-overflow-tooltip="true" v-bind="item">
                    <template slot-scope="scope">
                        <slot v-if="item.formatters === 'money'" :name="item.prop" :data="scope">{{scope.row[item.prop] | money}}</slot>
                        <slot v-else-if="item.formatters === 'moneyShow'" :name="item.prop" :data="scope">{{scope.row[item.prop] | moneyShow}}</slot>
                        <slot v-else-if="item.formatters === 'dateTime'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterTime}}</slot>
                        <slot v-else-if="item.formatters === 'dateTimes'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterTimes}}</slot>
                        <slot v-else-if="item.formatters === 'date'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterDate}}</slot>
                        <slot v-else-if="item.colorLeave" :name="item.prop" :data="scope">
                            <span v-if="scope.row[item.prop] <= item.colorLeave.bound" :class="item.colorLeave.notReach">{{scope.row[item.prop]}}</span>
                            <span v-else :class="item.colorLeave.reach">{{scope.row[item.prop]}}</span>
                        </slot>
                        <slot v-else :name="item.prop" :data="scope">{{formatter(scope.row[item.prop])}}</slot>
                    </template>
                    <template v-if="selectTh.indexOf(item.label)>-1">
                        <el-table-column v-for="obj in item.tableLabel" :key="obj.label" :label="obj.label" :prop="obj.prop" :sortable="obj.sortable" :align="obj.align?obj.align:'center'" :min-width="obj.width?obj.width:''" :show-overflow-tooltip="true" v-bind="obj">
                            <template slot-scope="scope">
                                <slot v-if="obj.formatters === 'money'" :name="obj.prop" :data="scope">{{scope.row[obj.prop] | money}}</slot>
                                <slot v-else-if="obj.formatters === 'moneyShow'" :name="obj.prop" :data="scope">{{scope.row[obj.prop] | moneyShow}}</slot>
                                <slot v-else-if="obj.formatters === 'dateTime'" :name="obj.prop" :data="scope">{{scope.row[obj.prop] | formatterTime}}</slot>
                                <slot v-else-if="obj.formatters === 'dateTimes'" :name="obj.prop" :data="scope">{{scope.row[obj.prop] | formatterTimes}}</slot>
                                <slot v-else-if="obj.formatters === 'date'" :name="obj.prop" :data="scope">{{scope.row[obj.prop] | formatterDate}}</slot>
                                <slot v-else :name="obj.prop" :data="scope">{{formatter(scope.row[obj.prop])}}</slot>
                            </template>
                        </el-table-column>
                    </template>
                </el-table-column>
            </template>
            <el-table-column label="操作" v-if="isAction" align="center"  :fixed="isfiexd" :min-width="minWidth">
                <template slot-scope="scope">
                    <slot class="action" name="action" :data="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination v-if="isPagination && paginationInfo.total" :total="paginationInfo.total" :layout="paginationStyle.pageLayout" :current-page="paginationInfo.pageNumber" :page-size.sync="paginationInfo.pageSize" :page-sizes="paginationStyle.pageSizes" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            minWidth: '',
            paginationInfo: {},
            checkAll: true,
            checkedCities: [],
            isIndeterminate: true,
            collapse: false,
            selectTh: []
        }
    },
    props: {
        isMultiple: {
            type: Boolean,
            default: false
        },
        isAction: {
            type: Boolean,
            default: false
        },
        isPagination: {
            type: Boolean,
            default: true
        },
        isShowIndex: {
            type: Boolean,
            default: false
        },
        stripe: {
            type: Boolean,
            default: true
        },
        isBlank: {
            type: Boolean,
            default: false,
            desc: '当数据为空的时候是否空白显示，false的时候默认显示为-'
        },
        tableData: {
            type: Array,
            default: () => ([])
        },
        tableLabel: {
            type: Array,
            default: () => ([])
        },
        pagination: {
            type: Object,
            default: () => {
                return {
                    total: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        },
        multiSelection: {
            type: Array,
            default: () => ([])
        },
        actionMinWidth: {
            type: Number,
            default: 100
        },
        selectable: {
            type: Function,
            default: () => true
        },
        tableAttr: {
            type: Object,
            default: () => ({})
        },
        rowKey: {
            type: String,
            default: ''
        },
        treeProps: {
            type: Object,
            default: () => ({ children: 'children', hasChildren: 'hasChildren' })
        },
        load: {
            type: Function,
            default: () => true
        },
        maxHeight: {
            type: Number,
            default: 1000
        },
        rowClassName: {
            type: Function,
            default: () => ''
        },
        isfiexd: {
            type: String,
            default: 'right'
        }
    },
    computed: {
        tableAttrInfo () {
            return Object.assign({}, this.tableAttr)
        },
        paginationStyle () {
            const paginationStyle = Object.assign({
                pageLayout: 'total, sizes, prev, pager, next, jumper',
                pageSizes: [10, 20, 30, 40, 50]
            })
            return paginationStyle
        },
        defaultTh () {
            const arr = []
            this.tableLabel.map(item => {
                arr.push(item.label)
            })
            return arr
        }
    },
    watch: {
        pagination: {
            handler (val) {
                this.paginationInfo = val
            },
            immediate: true
        },
        tableLabel: {
            handler (val) {
                this.selectTh = []
                this.tableLabel.map(item => {
                    item.choosed = (item.choosed === undefined ? true : item.choosed)
                    if (item.choosed) {
                        this.selectTh.push(item.label)
                    }
                })
            },
            deep: true,
            immediate: true
        },
        actionMinWidth: {
            handler (val) {
                this.minWidth = val
            }
        }
    },
    methods: {
        initWidth () {
            if (this.actionMinWidth) {
                this.minWidth = this.actionMinWidth
            }
        },
        handleSelectionChange (val) {
            this.$emit('update:multiSelection', val)
        },
        handleCurrentChange (val) {
            this.paginationInfo.pageNumber = val
            this.$emit('onCurrentChange', this.paginationInfo)
        },
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleSortChange (val) {
            this.$emit('onSortChange', val)
        },
        indexMethod (index) {
            if (this.isPagination) {
                return this.paginationInfo.pageSize * (this.paginationInfo.pageNumber - 1) + index + 1
            } else {
                return index + 1
            }
        },
        formatter (data) {
            return (data || data === 0) ? data : (this.isBlank ? '' : '-')
        },
        renderHeader (h, { column }) {
            const result = this.tableLabel.filter(item => item.icon && item.label == column.label)
            if (result.length > 0) {
                return (
                    <div>
                        <span>{column.label}</span>
                        <el-tooltip placement="right" content={result[0].content}>
                            <i class={result[0].icon}></i>
                        </el-tooltip>
                    </div>
                )
            }
            return column.label
        },
        handleCheckAllChange (val) {
            this.selectTh = val ? this.defaultTh : []
            this.isIndeterminate = false
            this.$emit('field-change', this.selectTh)
        },
        handleCheckedCitiesChange (value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.defaultTh.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectTh.length
            this.$emit('field-change', this.selectTh)
        }

    },
    mounted () {
        this.initWidth()
    }
}
</script>

<style lang="scss" scoped>
.page-table {
    position: relative;
}
.el-pagination {
    margin: 20px auto;
    float: right;
    text-align: center;
}
/deep/ .el-pagination__editor.el-input {
    width: 50px !important;
}
/deep/ .el-table th {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    background: rgba(242, 242, 244, 1);
}
// 暂无数据
/deep/ .el-table__empty-block {
    min-height: 49px;
}
/deep/ .el-table__empty-text {
    line-height: 49px;
}
/deep/ .el-table td {
    font-size: 12px;
    &:last-child {
        .cell span:not(:first-child) {
            margin-left: 20px;
        }
    }
}
.action {
    cursor: pointer;
}
.collapse {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 2px;
    z-index: 1;
    cursor: pointer;
}
.collapse-content {
    position: absolute;
    width: 180px;
    top: 35px;
    right: 10px;
    background: #ffffff;
    z-index: 2;
    padding: 10px 18px;
    box-sizing: border-box;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
    float: left;
    width: 100%;
}
/deep/ td {
    padding: 12px 0;
}
/deep/ .is-group th {
    text-align: center;
}
/deep/ .el-table__row td {
    // text-align: right;
}
/deep/ .el-table_1_column_1 {
    text-align: center !important;
}
</style>

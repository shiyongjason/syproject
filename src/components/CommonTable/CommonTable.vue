<template>
    <div class="page-table clearfix">
        <!--TODO 这里面有些过滤器考虑下封装进来-->
        <!-- 列表 -->
        <el-table v-bind="tableAttr" :data="tableData" border stripe :lazy="true" @sort-change="handleSortChange" @selection-change="handleSelectionChange" :tree-props="{ hasChildren: 'hasChildren' }" :row-key="rowKey" :load="load" :indent="4">
            <el-table-column v-if="isMultiple" type="selection" align="center" :selectable="selectable"></el-table-column>
            <el-table-column v-if="isShowIndex" type="index" label="序号" :index="indexMethod" align="center" width="60"></el-table-column>
            <el-table-column v-for="item in tableLabel" :key="item.label" :label="item.label" :prop="item.prop" :sortable="item.sortable" :align="item.align?item.align:'center'" :min-width="item.width?item.width:''" :show-overflow-tooltip="true" :render-header="renderHeader" v-bind="item">
                <template slot-scope="scope">
                    <slot v-if="item.formatter === 'money'" :name="item.prop" :data="scope">{{scope.row[item.prop] | money}}</slot>
                    <slot v-else-if="item.formatter === 'dateTime'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterTime}}</slot>
                    <slot v-else-if="item.formatter === 'dateTimes'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterTimes}}</slot>
                    <slot v-else-if="item.formatter === 'date'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterDate}}</slot>
                    <!--
                        表格内颜色等级层次
                        colorLeave: {
                            bound: 0, // 达标界限
                            notReach: 'red', 不达标颜色
                            reach: 'green' 达标颜色
                        }
                    -->
                    <slot v-else-if="item.colorLeave" :name="item.prop" :data="scope">
                        <span v-if="scope.row[item.prop] <= item.colorLeave.bound" :class="item.colorLeave.notReach">{{scope.row[item.prop]}}</span>
                        <span v-else :class="item.colorLeave.reach">{{scope.row[item.prop]}}</span>
                    </slot>
                    <!--
                        点击事件
                        shy是集市商品库的价格阶梯 固定字段
                    -->
                    <slot v-else-if="item.event" :name="item.prop" :data="scope">
                        <el-popover placement="right" width="300" trigger="click" v-if="scope.row.shy">
                            <el-table :data="scope.row.shy">
                                <el-table-column width="150" property="numberCase" label="商品件数" align="center"></el-table-column>
                                <el-table-column width="150" property="discount" label="价格折扣" align="center"></el-table-column>
                            </el-table>
                            <div class="isOrangeColor" slot="reference">{{scope.row.price}}</div>
                            <!-- <el-button slot="reference">{{scope.row.price}}</el-button> -->
                        </el-popover>
                        <div v-else>{{scope.row.price}}</div>
                    </slot>

                    <slot v-else :name="item.prop" :data="scope">{{formatter(scope.row[item.prop])}}</slot>
                </template>
            </el-table-column>

            <el-table-column label="操作" v-if="isAction" align="center" :min-width="minWidth">
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
            paginationInfo: {}
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
        }
    },
    watch: {
        pagination: {
            handler (val) {
                this.paginationInfo = val
            },
            immediate: true
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
        }
    },
    mounted () {
        this.initWidth()
    }
}
</script>

<style lang="scss" scoped>
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
</style>
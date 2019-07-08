<template>
    <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationData.pageNum"
            :page-sizes="paginationDataOther.pageSizes"
            :page-size="paginationDataOther.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationData.totalElements">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'HPagination',
    props: {
        paginationData: {
            type: Object,
            required: true,
            default () {
                return {
                    pageNum: 1,
                    totalElements: 0
                }
            }
        },
        paginationDataOther: {
            type: Object,
            required: false,
            default () {
                return {
                    pageSizes: [10, 20, 50, 100],
                    pageSize: 10
                }
            }
        }
    },
    data () {
        return {
            total: 400
        }
    },
    methods: {
        handleSizeChange (value) {
            this.$emit('onSizeChange', value)
        },
        handleCurrentChange (value) {
            this.$emit('onCurrentChange', value)
        }
    }
}
</script>

<style scoped>
.pagination {
    text-align: right;
    padding: 15px 0;
}
</style>

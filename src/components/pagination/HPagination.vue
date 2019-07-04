<template>
    <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'HPagination',
    data () {
        return {
            total: 400
        }
    },
    methods: {
        handleSizeChange (value) {
            console.log(value)
        },
        handleCurrentChange (value) {
            console.log(value)
        },
        currentPage4 (value) {
            console.log(value)
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

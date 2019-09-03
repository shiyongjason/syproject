export const pagination = {
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNum: 1
            },
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            tableMaxHeight: 520
        }
    },
    methods: {
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getData()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNum = val
            this.getData()
        }
    }
}
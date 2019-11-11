export const pagination = {
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
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
            this.getList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.getList()
        }
    }
}
<template>
  <div class="customerTable">
      <basicTable :tableData='tableData' :tableLabel="tableLabel" :pagination="paginationInfo" :isAction='true'>
          <template #action='{row,index}'>
            <el-button type="primary">修改</el-button>
          </template>
      </basicTable>
  </div>
</template>

<script>
export default {
    name: 'customerTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        tableLabel: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        paginationData: {
            type: Object,
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    data () {
        return {

        }
    },
    computed: {
        paginationInfo () {
            return {
                pageNumber: this.paginationData.pageNumber,
                pageSize: this.paginationData.pageSize,
                total: this.paginationData.totalElements
            }
        }
    },
    methods: {
        handleSizeChange (val) {
            // this.loading = true
            this.$emit('onSizeChange', val, 'order')
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val.pageNumber, 'order')
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchParams.pageNumber = val.pageNumber
            this.getOrderList()
        },
        load (tree, treeNode, resolve) {
            console.log('load')
        }
    },
    mounted () {

    }
}
</script>

<style scoped></style>
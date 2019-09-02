<template>
  <div class="customerManagement">
    <searchForm v-model="searchForm"/>
    <customerTable />
  </div>
</template>

<script>
import searchForm from './components/searchForm'
import customerTable from './components/customerTable'

export default {
    name: 'customer',
    components: {
        searchForm, customerTable
    },
    data () {
        return {
            searchForm: {
                a: '',
                b: '',
                c: '',
                d: '',
                startDate: '',
                endDate: ''
            }
        }
    },
    methods: {

    },
    mounted () {
        console.log('customerManagement')
    }
}
</script>

<style lang='scss' scoped>
.customerManagement{ padding: 36px 10px 20px 10px}
</style>
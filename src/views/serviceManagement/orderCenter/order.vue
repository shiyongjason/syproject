<template>
  <div class="order">
      <searchForm />
  </div>
</template>

<script>
import searchForm from './components/searchForm'

export default {
    name: 'order',
    components: {
        searchForm
    },
    data () {
        return {

        }
    },
    methods: {

    },
    mounted () {

    }
}
</script>

<style scoped>
.order {
    padding: 36px 10px 20px 10px;
}
.el-col {
    margin-bottom: 20px
}
</style>
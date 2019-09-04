<template>
    <div class="attribute">
        <div class="page-body">
            123


        </div>
    </div>
</template>

<script>
import { findReportDetail } from '../api/index'
export default {
    name: 'customerReportDetail',
    data () {
        return {
            id: '',
            action: ''
        }
    },
    methods: {
        async findReportDetail (id) {
            const {data} = await findReportDetail(id)
            console.log(data)
        }
    },
    async mounted () {
        this.id = this.$route.query.id
        this.action = this.$route.query.action
        this.findReportDetail(this.id)
    }
}
</script>

<style scoped>
.form-add-remove {
    font-size: 22px;
    color: #ff9c31;
    cursor: pointer;
    line-height: 40px;
    vertical-align: top;
}
.flex-wrap-row {
    max-width: 1350px;
}
</style>

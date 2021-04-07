<template>
    <el-autocomplete class="inline-input" v-model="inputModelComputed" :fetch-suggestions='querySearch' placeholder="请输入内容" :trigger-on-focus="false" @blur='onBlur' :maxlength='50'>
        <template slot-scope="{ item }">
            <div class="name" @mousedown="onMousedown(item)">{{ item.value }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
export default {
    props: ['value'],
    computed: {
        inputModelComputed: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        onBlur (val) {
            console.log('val: ', val)
            this.$emit('onBlur')
        },
        onMousedown (val) {
            this.$emit('onMousedown', val.value)
        },
        querySearch (queryString, callback) {
            let restaurants = [
                { 'value': '@hosjoy.com' },
                { 'value': '@qq.com' },
                { 'value': '@126.com' },
                { 'value': '@163.com' },
                { 'value': '@sohu.com' }
            ]
            let results = JSON.parse(JSON.stringify(restaurants))
            for (let item in results) {
                results[item].value = queryString.split('@')[0] + '' + restaurants[item].value
            }
            callback(results)
        }
    }
}
</script>
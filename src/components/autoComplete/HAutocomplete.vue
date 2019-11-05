<template>
    <el-autocomplete ref="autocomplete" v-model="selectItem.selectName" :fetch-suggestions="querySearchAsync" :placeholder="placeholder" :validate-event="true" @select="handleSelect" @blur="blurInput" @focus="focusInput" :disabled="disabled" :maxlength='maxlength'></el-autocomplete>
</template>
<script>
export default {
    name: 'HAutocomplete',
    props: {
        canDoBlurMethos: {// 可保留手输值
            type: Boolean,
            default: true
        },
        selectObj: {
            type: Object,
            default: () => {
                return {
                    selectCode: '',
                    selectName: ''
                }
            }
        },
        selectArr: {
            type: Array,
            default: () => {
            }
        },
        placeholder: {
            type: String,
            default: '请输入内容'
        },
        disabled: {
            type: Boolean
        },
        removeValue: { // 清空input中的数据
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: 15
        }
    },
    data () {
        return {
            selectCode: ''
        }
    },
    computed: {
        selectArray () {
            return this.selectArr
        },
        selectItem () {
            return this.selectObj
        }
    },
    watch: {
        removeValue: {
            handler () {
                this.clearInput()
            },
            deep: true

        },
        selectItem: {
            handler (newName, oldName) {
                if (!newName.selectName) this.$emit('clearInput', newName.fields) // 監聽selectItem變化，清空父組件input
            },
            deep: true
        }
    },
    methods: {
        focusInput () {
            this.$refs.autocomplete.suggestions = []
        },
        clearInput () {
            this.selectObj.selectCode = ''
            this.selectObj.selectName = ''
        },
        querySearchAsync (queryString, callback) {
            var selectList = this.selectArray
            var results = queryString ? selectList.filter(this.createStateFilter(queryString)) : selectList
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                callback(results)
            }, 1000)
        },
        createStateFilter (queryString) {
            return (state) => {
                return (state.value && state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            }
        },
        handleSelect (item) {
            this.selectItem.selectName = item.value
            this.selectItem.selectCode = item.selectCode
            this.$emit('back-event', {
                value: item
            })
        },
        blurInput (item) {
            if (!this.canDoBlurMethos) {
                this.$emit('back-event', {
                    value: { value: this.selectItem.selectName }
                })
                return false
            }
            const results = this.selectArray && this.selectArray.filter(item => {
                return (item.value === this.selectItem.selectName)
            })
            if (!(results.length > 0 && this.selectItem.selectCode)) {
                this.selectItem.selectName = ''
                this.$emit('back-event', {
                    value: ''
                })
            }
        }
    }
}
</script>

<style lang="scss">
</style>

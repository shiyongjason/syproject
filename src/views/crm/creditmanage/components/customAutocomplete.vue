<template>
    <div class="custom-autocomplete" @click.stop>
        <el-input ref="input" type="text" v-model="input" v-bind="$attrs" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur">
            <template slot="prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </template>
            <template slot="append" v-if="$slots.append">
                <slot name="append"></slot>
            </template>
            <template slot="prefix" v-if="$slots.prefix">
                <slot name="prefix"></slot>
            </template>
            <template slot="suffix" v-if="$slots.suffix">
                <slot name="suffix"></slot>
            </template>
        </el-input>
        <transition name="el-zoom-in-top">
            <div v-show="showPopper" class="el-autocomplete-suggestion el-popper" :style="{ width: dropdownWidth }">
                <el-scrollbar tag="ul" wrap-class="el-autocomplete-suggestion__wrap" view-class="el-autocomplete-suggestion__list">
                    <li style="text-align:center;" v-if="loading"><i class="el-icon-loading"></i></li>
                    <template v-else>
                        <li v-for="(item, index) in filterOption" :key="item.id+index">
                            <slot :data="item"></slot>
                        </li>
                    </template>
                </el-scrollbar>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        suggestions: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        suggestions (o) {
            this.filterOption = o
        }
    },
    data () {
        return {
            showPopper: false,
            dropdownWidth: '',
            loading: false,
            input: '',
            filterOption: []
        }
    },
    methods: {
        getInput () {
            return this.$refs.input?.getInput()
        },
        handleInput (value) {
            this.querySearchAsync(value)
            this.$emit('input', value)
        },
        handleChange (value) {
            this.$emit('change', value)
        },
        handleFocus (event) {
            this.querySearchAsync('')
            this.$emit('focus', event)
        },
        handleBlur (event) {
            this.$emit('blur', event)
        },
        querySearchAsync (queryString) {
            this.showPopper = true
            this.loading = true
            var selectList = JSON.parse(JSON.stringify(this.suggestions))
            var results = queryString ? selectList.filter(this.createStateFilter(queryString)) : selectList
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                if (results && results.length > 0) {
                    this.filterOption = results
                } else {
                    this.filterOption = []
                    this.showPopper = false
                }
                this.loading = false
            }, 1000)
        },
        createStateFilter (queryString) {
            return (state) => {
                return (state.value && state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            }
        },
        bodyClose () {
            this.input = ''
            this.showPopper = false
        }
    },
    mounted () {
        this.$nextTick(() => {
            let $input = this.getInput()
            if ($input) {
                this.dropdownWidth = $input.offsetWidth + 'px'
            }
        })
        window.addEventListener('resize', () => {
            let $input = this.getInput()
            if ($input) {
                this.dropdownWidth = $input.offsetWidth + 'px'
            }
        })
        // 点击空白处关闭弹窗
        document.addEventListener('click', this.bodyClose)
    },
    beforeDestroy () {
        document.removeEventListener('click', this.bodyClose)
    }
}
</script>

<style lang="scss" scoped>
.el-autocomplete-suggestion {
    position: fixed;
}
</style>
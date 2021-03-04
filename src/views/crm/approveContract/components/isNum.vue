<template>
    <div>
        <!-- 元 -->
        <el-input v-if="innerHtml.indexOf('元') != -1" :value="money(value)" v-bind="$attrs" @input="(val)=>{onInput(val,calculationRules)}" @blur="onBlur">
            <template slot="append" v-if="innerHtml">{{innerHtml}}</template>
        </el-input>
        <!-- %.. -->
        <!-- <el-input v-else  :value="money(value)" v-inputMAX="100"  v-bind="$attrs" @input="onInput" @blur="onBlur"> -->
        <el-input v-else  :value="money(value)" v-bind="$attrs" @input="(val)=>{onInput(val,calculationRules)}" @blur="onBlur">

            <template slot="append" v-if="innerHtml">{{innerHtml}}</template>
        </el-input>
    </div>
</template>

<script>
export default {
    props: ['value', 'innerHtml', 'format', 'paramKey', 'decimal', 'calculationRules'],
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
        onBlur () {
            if (this.value && this.value.charAt(this.value.length - 1) == '.') {
                this.$emit('input', this.value.split('.')[0])
            }
        },
        money (value) {
            if (value == null) return ''
            let money = ''
            let pointNum = ''
            let val = value.toString()
            if (val.indexOf('.') > 0) {
                money = val.split('.')[0]
                pointNum = val.split('.')[1]
                console.log('money value: ', money.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + pointNum)
                return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + pointNum
            } else {
                money = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                console.log('money value: ', money)
                return money
            }
        },
        onInput (val, max) {
            console.log('max: ', max)
            let num = this.isNum(val, this.decimal)
            if (num && num.length > 0 && num == '.') {
                num = ''
            }
            if (!num) {
                this.$emit('input', '')
                return
            }
            num = num.toString()
            num = num.replace(/,/gi, '')
            console.log('num: ', num)
            if (max) {
                if (Number(num) > max) {
                    if (this.innerHtml.indexOf('元') != -1) {
                        this.$message({
                            message: `最大不能超过${this.money(max)}${this.innerHtml}`,
                            type: 'error'
                        })
                        return
                    } else {
                        this.$message({
                            message: `最大不能超过${max}${this.innerHtml}`,
                            type: 'error'
                        })
                        return
                    }
                }
            }
            this.$emit('input', num)
        },
        numValidate (str, float, regular, regular2, limit = '') {
            if (!str) return
            str = str.toString()
            if (str.length > 1 && str.charAt(0) === '0' && str.charAt(1) !== '.' && !limit) {
                return ''
            }
            if (float == 0 && str.indexOf('.') > -1) {
                return str.split('.')[0]
            }
            const i = str.indexOf('.')
            let arr
            if (i !== -1) {
                str = str.replace(regular2, '')
                arr = str.split('.')
                str = arr[0]
            }
            const reg = regular
            let newStr = str.replace(reg, '')
            newStr = float === 0 ? str.slice(0, str.length) : newStr
            const newStrFlot = arr && arr[1].replace(reg, '')

            return float !== 0 && i !== -1 ? newStr + '.' + newStrFlot.slice(0, float) : newStr
        },
        isNum (str, float = 1000000000) {
            const regular = /[^0-9]*/g
            const regular2 = /[^\d^\\.]+/g
            return this.numValidate(str, float, regular, regular2)
        }
    }
}
</script>
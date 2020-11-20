<template>
    <div>
        <!-- 3位数正整数 v-isPositiveInt maxlength="3"-->
        <el-input v-if="paramKey==='pay_period_supplier'" v-model.trim="inputModelComputed" v-isPositiveInt maxlength="3" v-bind="$attrs">
            <template slot="append" v-if="innerHtml">{{innerHtml}}</template>
        </el-input>
        <el-input v-if='innerHtml&&innerHtml!="元"' v-model.trim="inputModelComputed" v-isNum:2 v-bind="$attrs" @blur="onBlur">
            <template slot="append" v-if="innerHtml">{{innerHtml}}</template>
        </el-input>
        <el-input v-if='innerHtml=="元"' :value="money(value)"  v-bind="$attrs" @input="onInput" @blur="onBlur">
            <template slot="append" >元</template>
        </el-input>
        <!-- 只能数字,账号 -->
        <el-input v-if='!innerHtml' v-model.trim="inputModelComputed" v-isAllNum:0 v-bind="$attrs"></el-input>
    </div>

</template>

<script>
export default {
    props: ['value', 'innerHtml', 'format', 'paramKey'],
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
                return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + pointNum
            } else {
                money = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                console.log(money)
                return money
            }
        },
        onInput (val) {
            let num = this.isNum(val, 2)
            if (num && num.length > 0 && num == '.') {
                num = ''
            }
            if (!num) {
                this.$emit('input', '')
                return
            }
            num = num.toString()
            num = num.replace(/,/gi, '')
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
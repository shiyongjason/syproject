<template>
    <div>
        <div class="flex-fee-table">
            <font v-if="className=='purch_service_fee_form'">服务费预计 (元)：</font>
            <el-input :value="money(value)" v-bind="$attrs" @input="(val)=>{onInput(val,calculationRules)}" @blur="onBlur">
            </el-input>
            <!-- <h-button type="primary" @click="()=>emitServiceFee()" style="margin-left:10px">生成表格</h-button> -->
        </div>
        <p class="servicefee">注意：服务费总额修改后，每期服务费金额将重新计算。</p>
    </div>
</template>
<script lang='ts'>
import { useDebounce } from '@/decorator'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
    name: 'serviceFeeToTable'
})
export default class ServiceFeeToTable extends Vue {
    @Prop({ default: '' }) readonly value!:any
    @Prop({ default: '' }) readonly className!:any
    @Prop({ default: 10000000000 }) readonly calculationRules!:any
    @Prop({ default: 2 }) readonly decimal!:any

    // @useDebounce(800)
    emitServiceFee () {
        this.$emit('onServiceFee')
    }

    onBlur () {
        if (this.value && this.value.charAt(this.value.length - 1) == '.') {
            this.$emit('inputService', this.value.split('.')[0])
        }
    }

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
            return money
        }
    }

    onInput (val, max:any = '') {
        let num = this.isNum(val, this.decimal)
        if (num && num.length > 0 && num == '.') {
            num = ''
        }
        if (!num) {
            this.$emit('inputService', '')
            return
        }
        num = num.toString()
        num = num.replace(/,/gi, '')
        if (max) {
            if (Number(num) > max) {
                this.$message({
                    message: `最大不能超过${max}`,
                    type: 'error'
                })
                return
            }
        }
        this.$emit('inputService', num)
        // 生成表格
        this.emitServiceFee()
    }
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
    }

    isNum (str, float = 1000000000) {
        const regular = /[^0-9]*/g
        const regular2 = /[^\d^\\.]+/g
        return this.numValidate(str, float, regular, regular2)
    }
}
</script>
<style scoped lang='scss'>
.flex-fee-table{
     display: flex;
}
.servicefee{
    color: #f00;
}
/deep/.flex-fee-table .el-input{
    width: 260px !important;
}
</style>
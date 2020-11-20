<template>
    <div>
        <!-- 3位数正整数 v-isPositiveInt maxlength="3"-->
        <el-input v-if="paramKey==='pay_period_supplier'" v-model.trim="inputModelComputed" v-isPositiveInt maxlength="3" v-bind="$attrs">
            <template slot="append">{{innerHtml}}</template>
        </el-input>
        <el-input v-else v-model.trim="inputModelComputed" v-isNum:[getNum] v-bind="$attrs">
            <template slot="append">{{innerHtml}}</template>
        </el-input>
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
        },
        getNum () {
            return (this.paramKey == 'supplier_account_number' || this.paramKey == 'hosjoy_account_number' || this.paramKey == 'regulatory_account_number' || this.paramKey == 'dealer_controller_postal_code' || this.paramKey == 'dealer_controller_postal_code_spouse') ? 0 : 2
        }
    }
}
</script>
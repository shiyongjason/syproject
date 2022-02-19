<template>
  <el-form-item v-bind="$attrs" :prop="prop" label="" class="agel-form-item" ref="elFormItem">
    <slot slot="label" name="label">
      <render-component v-if="label" :render="label" />
    </slot>
    <slot>
      <render-component
        v-if="component.name"
        :value="field.v"
        :render="component.name"
        v-on="component.on"
        v-bind="component.attrs"
        @input="input"
        :ref="prop||'component'"
        :is-tag="component.isTag"
       >
        <template v-for="(slot,staticName) in slots.staticSlots" v-slot:[staticName]>
          <render-component :key="staticName" :render="slot" />
        </template>
        <template v-for="(slot,scopedName) in slots.scopedSlots" v-slot:[scopedName]="slotProps">
          <render-component :key="scopedName" :render="slot" v-bind="slotProps" />
        </template>
      </render-component>
    </slot>
  </el-form-item>
</template>

<script>
import renderComponent from './render-component'
import { getPropByPath } from 'element-ui/src/utils/util'
import * as directives from '@/utils/validate/format'
export default {
    name: 'agel-form-item',
    inheritAttrs: false,
    components: {
        renderComponent
    },
    inject: ['elForm'],
    props: {
        prop: String,
        label: [String, Number, Object, Array, Function],
        vmodel: {
            type: [Boolean, String],
            default: true
        },
        component: {
            type: Object,
            required: true
        },
        defaultValue: {}
    },
    computed: {
        field () {
            return getPropByPath(this.elForm.model, this.prop, true) || {}
        },
        slots () {
            let slots = this.component.slots || {}
            let scopedSlots = {}
            let staticSlots = {}
            if (slots.constructor == Object) {
                for (const name in slots) {
                    const slot = slots[name]
                    if (slot.constructor == Function && slot.length > 0) {
                        scopedSlots[name] = slot
                    } else {
                        staticSlots[name] = slot
                    }
                }
            } else {
                staticSlots = { default: slots }
            }
            return { scopedSlots, staticSlots }
        }
    },
    watch: {
        'elForm.model': {
            immediate: true,
            handler (newv, oldv) {
                if (newv !== oldv) {
                    this.setFieldDefaultValue()
                }
            }
        }
    },
    methods: {
        input (value) {
            const vmodel = this.vmodel
            if (vmodel === false) return
            if (typeof vmodel == 'string' && typeof value === 'string') {
                if (vmodel == '.trim') {
                    value = value.trim()
                } else if (vmodel == '.number' && !isNaN(parseFloat(value))) {
                    value = parseFloat(value)
                }
            }
            //  ['v-isNum:2','v-inputMAX="100"'] ...
            if (this.component.attrs.directives) {
                for (let i = 0; i < this.component.attrs.directives.length; i++) {
                    let item = this.component.attrs.directives[i]
                    // 只能输入数字,可限制后几位 || 只能输入数字(可以负数),可限制后几位（小数）
                    if (
                        item.indexOf('isNum') != -1 ||
                         item.indexOf('isNegative') != -1 ||
                          item.indexOf('isAllNum') != -1
                    ) {
                        let fag = item.split(':')
                        let method = fag[0].split('-')[1]
                        value = directives[method](value, fag[1])
                        continue
                    }
                    // 最大值 || 只能输入正整数 || 不能输入中文
                    if (
                        item.indexOf('inputMAX') != -1 ||
                        item.indexOf('isPositiveInt') != -1 ||
                        item.indexOf('isNotInputTxt') != -1
                    ) {
                        let fag = item.split('=')
                        let method = fag[0].split('-')[1]
                        value = directives[method](value, fag[1])
                        continue
                    }
                }
            }
            this.field.o[this.field.k] = value
        },
        setFieldDefaultValue () {
            if (
                this.prop &&
                this.prop.indexOf('_aguid_') === -1 &&
                !this.field.o.hasOwnProperty(this.field.k)
            ) {
                this.$set(this.field.o, this.field.k, this.defaultValue)
            }
        }
    },
    mounted () {
        // console.log('log::::::', this.$attrs)
        // console.log('log::::::this.slots', this.slots) // {scopedSlots: {},staticSlots: {default: '查询'}}
        console.log('this.component', this.component) // attrs.. on...slots...name...isTag...
    }
}
</script>

<style>
.agel-form-item {
  margin-bottom: 18px;
}

.agel-form-item.el-form--label-top .el-form-item__label {
  padding: 0px;
}

.el-form--label-top .agel-form-item .el-form-item__label,
.el-form--label-top .agel-form-item .el-form-item__label {
  display: inline-block;
  padding: 0px 12px 0px 0px;
}

/*  对某些组件排版进行优化 */
.agel-form-item.el-form-item--mini .el-slider__runway {
  margin: 12px 0px;
}
</style>

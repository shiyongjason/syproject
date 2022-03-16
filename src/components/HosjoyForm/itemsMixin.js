import { getIncludeAttrs, getExcludeAttrs, getCustomProps, getArrItems, kebabcase, findRef, guid } from './utils'

import { agItemProps, agItemPropKeys, formItemPropKeys, inputArr, selectArr, componentDefaultValue, defaultComponentName, agComponentNames, layoutComponentNames } from './const'

export default {
    inject: {
        elForm: {
            default: null
        },
        wrapForm: {
            default: null
        }
    },
    props: {
        items: {
            type: [Array, Object],
            default: () => ([])
        },
        itemExtendKeys: {
            type: Array,
            default: () => ([])
        },
        // 关联 elForm.model 的 prop
        modelProp: String
    },
    data () {
        return {
            layoutItemKeys: []
        }
    },
    computed: {
        /** 用户配置+系统配置 */
        agItems () {
            let res = getArrItems(this.items).map(this.getAgItemAttrs).filter((v) => v.display)
            return res
        },
        isDynamic () {
            return Array.isArray(this.elForm.model[this.modelProp])
        },
        dynamicData () {
            const data = this.isDynamic ? this.elForm.model[this.modelProp] : [this.elForm.model]
            return data.map(row => {
                if (this.isDynamic && row._key_ == undefined) row._key_ = guid()
                return row
            })
        }
    },
    watch: {
        'elForm.model' (newv, oldv) {
            if (newv !== oldv) {
                this.$nextTick(this.elForm.clearValidate)
            }
        }
    },
    methods: {
        /** 用户配置属性+系统属性 vmodel display... */
        getAgItemAttrs (item) {
            const agItem = Object.assign(getCustomProps(agItemProps), item)
            agItem.display =
                typeof item.display == 'function'
                    ? item.display(this.elForm.model)
                    : agItem.display
            agItem.show =
                typeof item.show == 'function'
                    ? item.show(this.elForm.model)
                    : agItem.show
            return agItem
        },
        /** 构造 el-form-item Attributes v-bind的属性 {prop: 'num', label: '数字', required: false, defaultValue: 0, vmodel: true...} */
        getFormItemAttrs (scope) {
            const { item, rowIndex } = scope
            // formItemPropKeys：支持的 el-form-item 组件参数
            const formItem = getIncludeAttrs(formItemPropKeys, item) // 从目标对象获取指定属性
            const prop = this.getFormItemProp(item, rowIndex) // 获取form表单item的Prop  :string
            const rules = [].concat(formItem.rules || [], (this.elForm.rules || {})[prop] || [])
            const label = typeof item.label == 'string' ? item.label : ''
            if (formItem.required && rules.length === 0) {
                formItem.required = undefined
                formItem.rules = [
                    {
                        required: true,
                        message: label + '必填',
                        trigger: inputArr.includes(this.getName(item)) ? 'blur' : 'change'
                    }
                ]
            }
            formItem.prop = prop
            formItem.defaultValue = this.getDefaultValue(item) // 默认值
            formItem.vmodel = item.vmodel
            return formItem
        },
        /** 按模式处理 attrs.. on...slots... render-component  v-bind="component.attrs"· */
        getComponentAttrs (scope) {
            const { item, row } = scope
            const component = { name: '', isTag: false, attrs: {}, slots: item.slots, on: item.on }
            // 视图查看模式
            if (item.viewModel || (row._view_ && item.viewModel !== false)) {
                component.name = ({ value = '' }) => item.viewFormat ? item.viewFormat({ value, ...scope }) : String(value)
                return component
            }
            // 插槽模式
            if (item.slot) {
                const scopedSlots = this.wrapForm ? this.wrapForm.$scopedSlots : this.$scopedSlots // 访问作用域插槽
                component.name = item.slot === true ? (scopedSlots[item.prop] || '') : item.slot
                component.attrs = typeof component.name === 'function' ? scope : {}
                return component
            }
            // 组件模式
            const invalidKeys = [].concat(
                agItemPropKeys,
                formItemPropKeys,
                this.layoutItemKeys,
                this.itemExtendKeys
            )
            component.name = this.getName(item, false)
            component.isTag = typeof component.name === 'string'
            // 合并属性 render-component  v-bind="component.attrs"
            component.attrs = Object.assign(
                this.getComponentConfig(item),
                getExcludeAttrs(invalidKeys, item),
                item.$component || {}
            )
            component.attrs.disabled =
                typeof item.disabled == 'function'
                    ? item.disabled(scope.row)
                    : item.disabled
            component.attrs.placeholder = this.getPlaceholder(item)
            // 当布局组件作为单组件使用时
            if (layoutComponentNames.includes(component.name)) {
                component.attrs.modelProp = item.prop
            }
            // attrs.. on...slots...
            return component
        },
        getLayoutItemAttrs (item) {
            return getIncludeAttrs(this.layoutItemKeys, item)
        },
        /** 获取form表单item的Prop */
        getFormItemProp (item, rowIndex) {
            let res = [this.modelProp, this.isDynamic ? String(rowIndex) : '']
                .concat(item.prop.split('.'))
                .filter((v) => v)
                .join('.')
            return res
        },
        getPlaceholder (item) {
            if (item.placeholder) return item.placeholder
            let name = this.getName(item)
            let label = typeof item.label == 'string' ? item.label : ''
            if (inputArr.includes(name)) {
                return '请输入' + label
            }
            if (selectArr.includes(name)) {
                return '请选择' + label
            }
        },
        getName (item, deep = true) {
            let value = item.component || defaultComponentName
            if (deep && typeof value === 'object' && typeof value.render === 'function' && value.name) {
                value = value.name
            }
            if (typeof value === 'string') {
                value = kebabcase(value)
                // if (agComponentNames.includes('ag' + value)) value = 'ag' + value
            }
            return value
        },
        getRequiredAsteriskClass (item, rowIndex) {
            if (this.elForm.hideRequiredAsterisk) return ''
            const prop = this.getFormItemProp(item, rowIndex)
            const rules = [].concat(item.rules || [], (this.elForm.rules || {})[prop] || [])
            return item.required || rules.some((v) => v.required) ? 'agel-required-label' : ''
        },
        getDefaultValue (item) {
            const componentConfig = this.getComponentConfig(item)
            if (componentConfig.hasOwnProperty('defaultValue')) return componentConfig.defaultValue
            const name = this.getName(item)
            let value
            componentDefaultValue.every(v => {
                if (v.keys.includes(name)) {
                    value = typeof v.value === 'function' ? v.value() : v.value
                }
                return value === undefined
            })
            if (name == 'agel-checkbox' && item.options) value = ''
            return value
        },
        getComponentConfig (item) {
            const agConfig = this.$agelFormConfig || {}
            const componentConfigFun = agConfig[item.component] || agConfig[this.getName(item)]
            return typeof componentConfigFun == 'function' ? componentConfigFun(item) : {}
        },
        /** 暴露出去的功能函数,获取指定组件的 vue 实例 */
        getRef (prop) {
            return findRef(this, prop)
        },
        /** 暴露出去的功能函数,获取指定 item 对象 */
        getItem (prop, deep) {
            if (deep) return this.agItems.find((v) => v.prop == prop)
            if (Array.isArray(this.items)) {
                return this.items.find((v) => v.prop == prop)
            } else {
                return this.items[prop]
            }
        }
    }
}
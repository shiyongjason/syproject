import { getIncludeAttrs, extend, findRef } from './utils'
import agelFormInline from './hosjoy-form-inline.vue'
import { formPropKeys, gridPropKeys, tablePropKeys, descriptionsPropkeys } from './const'

const layoutPropMap = {
    inline: [],
    grid: gridPropKeys,
    descriptions: descriptionsPropkeys,
    tableditor: tablePropKeys
}

const hosjoyForm = {
    name: 'hosjoy-form',
    inheritAttrs: false,
    components: {
        agelFormInline
    },
    props: {
        value: {
            required: true,
            type: Object,
            default: () => ({})
        },
        attach: {
            type: Object,
            default: () => ({})
        },
        itemExtendKeys: {
            type: Array,
            default: () => ([])
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function (newv, oldv) {
                if (newv === oldv) return
                // 给父组件绑的form添加属性及方法
                extend(this.value, {
                    layout: 'inline',
                    items: [],
                    data: {},
                    getRef: this.getRef,
                    getItem: this.getItem,
                    validate: this.validate,
                    resetFields: this.resetFields,
                    clearValidate: this.clearValidate
                }, this.$set)
            }
        },
        attach: {
            deep: true,
            immediate: true,
            handler: function () {
                extend(this.value, this.attach, this.$set, true)
            }
        }
    },
    methods: {
        /** 暴露出去的功能函数,获取指定组件的 vue 实例 */
        getRef (prop = 'elForm') {
            return findRef(this, prop)
        },
        /** 暴露出去的功能函数,获取指定 item 对象 */
        getItem (prop, deep) {
            return this.$refs.agLayout.getItem(prop, deep)
        },
        /**  暴露出去的功能函数,表单验证 */
        validate (callback, erroCallback) {
            this.$refs.elForm.validate((is, errInfo) => {
                if (is) {
                    callback && callback(this.value.data)
                } else {
                    erroCallback && erroCallback(errInfo)
                }
            })
        },
        /**  暴露出去的功能函数,表单重置 */
        resetFields () {
            this.$refs.elForm.resetFields()
        },
        /**  暴露出去的功能函数,清空验证 */
        clearValidate (props) {
            this.$refs.elForm.clearValidate(props)
        }
    },
    provide () {
        return {
            wrapForm: this
        }
    },
    render (h) {
        const option = this.value
        const { on, layout, items, data } = option
        const config = (this.$agelFormConfig || {})['form'] || {}
        const FormWithLayoutOption = Object.assign({}, config, option)
        const layoutName = 'agel-form-' + layout
        const layoutProps = {
            items: items,
            value: data,
            itemExtendKeys: this.itemExtendKeys,
            ...getIncludeAttrs(layoutPropMap[layout], FormWithLayoutOption)
        }
        const formProps = getIncludeAttrs(formPropKeys, FormWithLayoutOption)
        formProps.model = option.data
        formProps['label-width'] = formProps['label-width'] || 'auto'

        if (Array.isArray(option.data)) {
            formProps.model = { dynamicData: option.data }
            layoutProps.modelProp = 'dynamicData'
        }
        return h('el-form', { class: 'agel-form', attrs: formProps, on: on, ref: 'elForm' }, [
            h(layoutName, {
                attrs: layoutProps,
                scopedSlots: this.$scopedSlots,
                on: on,
                ref: 'agLayout'
            })
        ])
    }
}

// 核心组件
const componentsList = [
    hosjoyForm
]
hosjoyForm.install = function (vue, opts = {}) {
    vue.prototype.$hosjoyFormConfig = opts
    componentsList.forEach(component => {
        vue.component(component.name, component)
    })
}
export default hosjoyForm
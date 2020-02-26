import { isNum, isNotInputTxt, isNegative } from './format'
/*
    自定义指令中传递的三个参数:el: 指令所绑定的元素，可以用来直接操作DOM。binding:  一个对象，包含指令的很多信息。vnode: Vue编译生成的虚拟节点。
    自定义指令有五个生命周期（也叫钩子函数），分别是 bind,inserted,update,componentUpdated,unbind
    bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
    inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
    update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
    componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
    unbind:只调用一次，指令与元素解绑时调用。
 */
export default {
    install (Vue) {
        /**
         * @description 只能输入数字,可限制后几位（小数）
         * @param 0 1 2...
         * @example  <el-input v-model="form.a" v-isNum:2="form.a"></el-input>
         *
         */
        Vue.directive('isNum', {
            bind (el, binding, vnode) {
                const element = el.getElementsByTagName('input')[0]
                element.addEventListener('keyup', () => {
                    element.value = isNum(element.value, binding.arg)
                    if (isNaN(element.value)) element.value = ''
                    vnode.data.model && vnode.data.model.callback(element.value)
                })
            }
        })
        /**
         * @description 只能输入数字(可以负数),可限制后几位（小数）
         * @param 0 1 2...
         * @example  <el-input v-model="form.a" v-isNegative:2="form.a"></el-input>
         *
         */
        Vue.directive('isNegative', {
            bind (el, binding, vnode) {
                const element = el.getElementsByTagName('input')[0]
                element.addEventListener('keyup', () => {
                    element.value = isNegative(element.value, binding.arg)
                    if (element.value == 'undefined') element.value = ''
                    if (element.value == '-.' || element.value == '--' || element.value == '.-') element.value = '-'
                    vnode.data.model && vnode.data.model.callback(element.value)
                })
            }
        })
        /**
         * @description 不能输入中文
         * @example  <el-input v-model="form.n" v-isTel="form.n"></el-input>
         *
         */
        Vue.directive('isNotInputTxt', {
            bind (el, binding, vnode) {
                const element = el.getElementsByTagName('input')[0]
                element.addEventListener('keyup', () => {
                    element.value = isNotInputTxt(element.value, binding.arg)
                    if (isNaN(element.value)) element.value = ''
                    vnode.data.model.callback(element.value)
                })
            }
        })
    }
}

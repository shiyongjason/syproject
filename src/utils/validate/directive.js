import { isNum, isNotInputTxt, isNegative, isPositiveInt, inputMAX, isAllNum } from './format'
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
        * @example  <el-input v-model="form.a" v-isAllNum: 0></el-input> 只允许输入数字 01231423432
        */
        Vue.directive('isAllNum', {
            bind (el, binding, vnode) {
                const element = el.getElementsByTagName('input')[0]
                element.addEventListener('keyup', () => {
                    element.value = isAllNum(element.value, binding.arg)
                    if (isNaN(element.value)) element.value = ''
                    vnode.data.model && vnode.data.model.callback(element.value)
                })
            }
        })

        /**
         * @description 只能输入数字,可限制后几位（小数）
         * @param 0 1 2...
         * @example  <el-input v-model="form.a" v-isNum:2="form.a"></el-input> 允许输入2位小数
         * @example  <el-input v-model="form.a" v-isNum="form.a"></el-input> 只允许输入数字,小数位不限制
         * @example  <el-input v-model="form.a" v-isNum:0="form.a"></el-input> 只允许输入数字
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
         * @example  <el-input v-model="form.a" v-isNegative:2="form.a"></el-input> 允许输入2位小数
         * @example  <el-input v-model="form.a" v-isNegative="form.a"></el-input> 只允许输入数字,小数位不限制
         * @example  <el-input v-model="form.a" v-isNegative:0="form.a"></el-input> 只允许输入数字
         */
        Vue.directive('isNegative', {
            bind (el, binding, vnode) {
                const element = el.getElementsByTagName('input')[0]
                element.addEventListener('keyup', () => {
                    element.value = isNegative(element.value, binding.arg)
                    if (element.value.indexOf('-') > -1 && element.value.indexOf('-') != 0) element.value = element.value.substring(0, element.value.indexOf('-'))
                    if (element.value == 'undefined') element.value = ''
                    if (element.value == '-.' || element.value == '--' || element.value == '.-') element.value = '-'
                    if (element.value.indexOf('-') > -1) {
                        let arr = element.value.split('-')
                        if (arr.length > 2) element.value = ''
                    }
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
        /**
         * @description 只能输入正整数
         * @example  <el-input v-model="form.a" v-isPositiveInt="form.a"></el-input> 只允许输入正整数
         */
        Vue.directive('isPositiveInt', {
            bind (el, binding, vnode) {
                const element = el.getElementsByTagName('input')[0]
                element.addEventListener('keyup', () => {
                    element.value = isPositiveInt(element.value, binding.arg)
                    if (isNaN(element.value)) element.value = ''
                    vnode.data.model && vnode.data.model.callback(element.value)
                })
            }
        })
        /**
         * @description 限制输入最大值
         * @param number 输入最大值
         * @example  <el-input v-model="form.a" v-inputMAX="100"></el-input>
         * @example  v-isNum:0 v-inputMAX='100'  0到100，0位小数，可结合使用。
         */
        Vue.directive('inputMAX', {
            bind (el, binding, vnode) {
                const element = el.getElementsByTagName('input')[0]
                element.addEventListener('keyup', () => {
                    element.value = inputMAX(element.value, binding.value)
                    console.log('🚀 --- element.addEventListener ---  element.value', element.value)
                    if (isNaN(element.value)) element.value = ''
                    vnode.data.model && vnode.data.model.callback(element.value)
                })
            }
        })

        Vue.directive('watermark', (el, binding) => {
            function addWaterMarker (str, parentNode) {
                let can = document.createElement('canvas')
                can.width = 150
                can.height = 70

                let cans = can.getContext('2d')
                cans.rotate(-20 * Math.PI / 180)
                cans.font = '20px Vedana'
                cans.fillStyle = 'rgba(200, 200, 200, .3)'
                cans.textAlign = 'left'
                cans.textBaseline = 'Middle'
                cans.fillText(str, 0, can.height)

                let div = document.createElement('div')
                div.id = 'watermark-dom'
                div.style.pointerEvents = 'none'
                div.style.top = '100px'
                div.style.left = '20px'
                div.style.position = 'fixed'
                div.style.zIndex = '1990'
                // div.style.transform = 'rotate(-15deg)'
                div.style.width = document.documentElement.clientWidth - 50 + 'px'
                div.style.height = document.documentElement.clientHeight - 100 + 'px'
                div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
                parentNode.appendChild(div)
            }
            if (!document.getElementById('watermark-dom')) {
                addWaterMarker(binding.value, el)
            }
        })

        Vue.directive('drag', {
            bind: function (el) {
                let oDiv = el
                function run (e) {
                    let disX = e.clientX - oDiv.offsetLeft
                    let disY = e.clientY - oDiv.offsetTop
                    function mousemoveRun (e) {
                        let left = e.clientX - disX
                        let top = e.clientY - disY
                        oDiv.style.left = left + 'px'
                        oDiv.style.top = top + 'px'
                        e.stopPropagation()
                        e.preventDefault()
                    }
                    function mouseupRun (e) {
                        document.removeEventListener('mousemove', mousemoveRun, false)
                        document.removeEventListener('mouseup', mouseupRun, false)
                    }
                    document.addEventListener('mousemove', mousemoveRun, false)
                    document.addEventListener('mouseup', mouseupRun, false)
                    e.stopPropagation()
                    e.preventDefault()
                }
                oDiv.addEventListener('mousedown', run, false)
            }
        })
    }
}

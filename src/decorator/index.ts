/**
 * @Description 获取事件执行耗时
 */
export function measure (target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = async function () {
        const start = Date.now()
        let ret = await oldValue.apply(this, arguments)
        console.log(`${name}执行耗时 ${Date.now() - start}ms`)
        return ret
    }
    return descriptor
}
/**
 * @Description 防止多次提交的装饰器
 * errorCb 别写成箭头函数
 */
export function handleSubmit (errorCb?: Function) {
    let isPending = false
    return function (target, name, descriptor) {
        const oldValue = descriptor.value
        descriptor.value = async function (...args: any[]) {
            // console.log('args: ', ...args)
            if (isPending) return
            isPending = true
            try {
                await oldValue.call(this, ...args)
                isPending = false
            } catch (error) {
                console.error(error)
                errorCb && errorCb.call(this, error, ...args)
                isPending = false
            }
        }
        return descriptor
    }
}
/**
 * @Description 表单验证，跳到错误位置
 * @param beforeFunc 校验前的处理函数，别写成箭头函数
 * @param errorCb 校验失败的回调函数，别写成箭头函数
 */
export function validateForm (elFormName: string, beforeFunc?: Function, errorCb?: Function) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value
        descriptor.value = async function (...args) {
            beforeFunc && beforeFunc.call(this)
            let r = this.$refs[elFormName].rules
            this.$refs[elFormName].validate(async (value, r) => {
                if (value) {
                    await oldValue.call(this, ...args)
                } else {
                    this.$nextTick(() => {
                        const dom = document.querySelector('.is-error')
                        dom!.scrollIntoView()
                        errorCb && errorCb.call(this, ...args)
                    })
                }
            })
        }
        return descriptor
    }
}

/**
 * @Description 防抖
 * @param wait 等待时间
 */
export function useDebounce (wait: number = 200) {
    let timeOut
    return function (target, name, descriptor) {
        const oldValue = descriptor.value
        descriptor.value = function () {
            try {
                if (timeOut) clearTimeout(timeOut)
                timeOut = setTimeout(() => {
                    oldValue.apply(this, arguments)
                }, wait)
            } catch (error) {
                console.error('error: ', error)
            }
        }
        return descriptor
    }
}
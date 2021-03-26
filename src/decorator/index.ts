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
 */
export function handleSubmit (errorCb?: Function) {
    let isPending = false
    return function (target, name, descriptor) {
        const oldValue = descriptor.value
        descriptor.value = async function (...args: any[]) {
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

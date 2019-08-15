export const PHONE = (rule, value, callback) => {
    const Reg = /^1(3|4|5|7|8)\d{9}$/
    if (!(Reg.test(value))) {
        return callback(new Error('手机号码格式不正确'))
    }
    return callback()
}
export const Phone = (rule, value, callback) => {
    const Reg = /^1(3|4|5|7|8)\d{9}$/
    if (!(Reg.test(value))) {
        return callback(new Error('手机号码格式不正确'))
    }
    return callback()
}
export const IsChinese = (rule, value, callback) => {
    const Reg = /[\u4E00-\u9FA5]/g
    if ((Reg.test(value))) {
        return callback(new Error('仅支持英文、数字和符号'))
    }
    // 必须要加
    return callback()
}
export const IsEnglish = (rule, value, callback) => {
    const Reg = /[^A-Za-z\\B]/g
    if (Reg.test(value)) {
        return callback(new Error('仅支持英文'))
    }
    return callback()
}

export const IsPositiveInteger = (rule, value, callback) => {
    const Reg = /^[1-9]\d*$/
    if (!Reg.test(value)) {
        return callback(new Error(rule.message))
    }
    return callback()
}

/* 校验输入正负数， 保留2位小数 传来的需要是string类型 */
export function plusOrMinus (values) {
    let newValue
    if (!(/[^0-9.-]/g.test(values))) {
        // eslint-disable-next-line
        newValue = values.replace(/[^\-\d.]/g, '').replace(/\b(0+){2,}/g, '0').replace(/\-{2,}/g, '-').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        if (newValue.toString().indexOf('.') > 0 && Number(newValue.toString().split('.')[1].length) > 2) {
            newValue = parseInt(parseFloat(newValue) * 100) / 100
        }
        if ((newValue.toString().split('-').length - 1) > 1) {
            newValue = parseFloat(newValue) || ''
        }
        if ((newValue.toString().split('-').length) > 1 && newValue.toString().split('-')[0].length > 0) {
            newValue = parseFloat(newValue) || ''
        }
        if (newValue.toString().length > 1 && (newValue.toString().charAt(0) === '0' || (newValue.toString().length > 2 && newValue.toString().charAt(0) === '-' && newValue.toString().charAt(1) === '0' && newValue.toString().charAt(2) !== '.')) && newValue.toString().indexOf('.') < 1) {
            newValue = parseFloat(newValue) || ''
        }
        // // 判断整数位最多为9位
        // if (newValue.toString().indexOf('.') > 0 && Number(newValue.toString().split('.')[0].length) > 25) {
        //     newValue = newValue.toString().substring(0, 9) + '.' + newValue.toString().split('.')[1]
        // } else if (newValue.toString().indexOf('.') < 0 && Number(newValue.toString().split('.')[0].length) > 9) {
        //     newValue = newValue.toString().substring(0, 9)
        // }
    } else {
        newValue = values.replace(/[^0-9.-]/g, '')
    }
    return newValue
}

/* 小数保留2位 */
export const decimals = function (val) {
    var dot = val.indexOf('.')
    if (dot === 0) return ''
    if (dot > 0) {
        return val.slice(0, dot + 3)
    } else {
        return val
    }
}
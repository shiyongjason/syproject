import * as regular from './regular'

export const PHONE = (rule, value, callback) => {
    if (!(regular.phoneRegular.test(value))) {
        return callback(new Error('手机号码格式不正确'))
    }
    return callback()
}
export const Phone = (rule, value, callback) => {
    if (!(regular.phoneRegular.test(value))) {
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

/**
 * 正整数校验规则
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const IsPositiveInteger = (rule, value, callback) => {
    const Reg = /^[1-9]\d*$/
    if (value && !Reg.test(value)) {
        return callback(new Error(rule.message))
    }
    return callback()
}

/**
 * 整数校验规则（包含0，可以为0）
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const IsInteger = (rule, value, callback) => {
    const Reg = /^[1-9]\d*$/
    if (value && value != 0 && !Reg.test(value)) {
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
    return values == '' ? '' : newValue
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
export const address = (rule, value, callback) => {
    const Reg = /^[\u4e00-\u9fa5\-#a-zA-Z0-9]+$/
    if (value && !(Reg.test(value))) {
        return callback(new Error('仓库地址只能输入中文，英文，数字和特殊字符-，#'))
    }
    callback()
}

export const Money = (rule, value, callback) => {
    var Reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    if (value && !(Reg.test(value))) {
        return callback(new Error('金额格式为小数点前十三位，小数点后两位'))
    }
    callback()
}

export const MoneyMinus = (rule, value, callback) => {
    var Reg = /(^-?[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^-?[0-9]\.[0-9]([0-9])?$)/
    if (value && !(Reg.test(value))) {
        return callback(new Error('金额格式为小数点前十三位，小数点后两位'))
    }
    callback()
}

export const MoneyOrConnector = (rule, value, callback) => {
    var Reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)|(^(-){1}$)/
    if (value && !(Reg.test(value))) {
        return callback(new Error('金额格式为正数，小数点前十三位，小数点后两位'))
    }
    callback()
}

export const MoneyOrConnectorMinus = (rule, value, callback) => {
    var Reg = /(^-?[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^-?[0-9]\.[0-9]([0-9])?$)|(^(-){1}$)/
    if (value && !(Reg.test(value))) {
        return callback(new Error('金额格式为小数点前十三位，小数点后两位'))
    }
    callback()
}

export const Password = (rule, value, callback) => {
    var Reg = /^[A-Za-z0-9]+$/
    if (value && !(Reg.test(value))) {
        return callback(new Error('密码只能为数字或字母'))
    }
    callback()
}

// 两位小数的正实数
export const IsFixedTwoNumber = (rule, value, callback) => {
    var Reg = /^[0-9]+(.[0-9]{1,2})?$/
    if (value && !Reg.test(value)) {
        return callback(new Error('可以输入有两位小数的正实数'))
    }
    return callback()
}
export const twoNumber = (rule, value, callback) => {
    var Reg = /(^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$)/
    if (value && !Reg.test(value)) {
        return callback(new Error('可以输入有两位小数或整数'))
    }
    return callback()
}
// 正整数
export const IsPositiveNumber = (rule, value, callback) => {
    var Reg = /^\+?[1-9][0-9]*$/
    if (value && !Reg.test(value)) {
        return callback(new Error('只能输入正整数'))
    }
    return callback()
}

export const checkIdCard = (rule, value, callback) => {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!value) {
        return callback(new Error('请输入身份证号'))
    } else if (value && reg.test(value) === false) {
        return callback(new Error('身份证输入不合法'))
    } else {
        return callback()
    }
}

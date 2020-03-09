function numValidate (str, float, regular, regular2) {
    if (!str) return
    str = str.toString()
    // 如果第一位是0，第二位不是点  01 02...
    if (str.length > 1 && str.charAt(0) === '0' && str.charAt(1) !== '.') {
        return ''
    }
    // float == 0仅允许输入非负整数
    if (float == 0 && str.indexOf('.') > -1) {
        return str.split('.')[0]
    }
    const i = str.indexOf('.')
    let arr
    if (i !== -1) {
        str = str.replace(regular2, '')
        arr = str.split('.')
        str = arr[0]
    }
    const reg = regular
    let newStr = str.replace(reg, '')
    newStr = float === 0 ? str.slice(0, str.length) : newStr
    const newStrFlot = arr && arr[1].replace(reg, '')

    return float !== 0 && i !== -1 ? newStr + '.' + newStrFlot.slice(0, float) : newStr
}
function isNum (str, float = 1000000000) {
    const regular = /[^0-9]*/g
    const regular2 = /[^\d^\\.]+/g
    return numValidate(str, float, regular, regular2)
}
function isNegative (str, float = 1000000000) {
    const regular = /[^\-?\d.]/g
    const regular2 = /[^\d^\\.\\-]+/g
    return numValidate(str, float, regular, regular2)
}

function isNotInputTxt (str) {
    return str.replace(/[^\d^]+/g, '')
}
// 正整数
function isPositiveInt (str) {
    const regular = /[^0-9]*/g
    if (!str) return
    if (str == 0) {
        return ''
    }
    str = str.toString()
    // 仅允许输入整数
    if (str.indexOf('.') > -1) {
        return str.split('.')[0]
    }
    return str.replace(regular, '')
}

export {
    isNum,
    isNegative,
    isNotInputTxt,
    isPositiveInt
}
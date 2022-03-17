
import moment from 'moment'

/**
 * 金额格式化
 * 此方法只用于针对input的value进行格式化，展示型的请用moneyFormat
 *
 * @param {*} value
 */
const money = function (value) {
    if (value == null) return '-'
    let money = ''
    let pointNum = ''
    let val = value.toString()
    if (val.indexOf('.') > 0) {
        money = val.split('.')[0]
        pointNum = val.split('.')[1]
        return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + pointNum
    } else {
        money = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return money
    }
}

/**
 * 金额格式化（只用于显示使用，编辑的时候进行的格式化使用money）
 *
 * 目前这个方案有两个问题
 * 1. 小数点后数字超过3位，小数点后面的数字也会加上千分位，这个问题我看了多个数字处理方案都没有考虑小数点后超过3位的情况，暂时先不做处理
 * 2. hasPad = false的时候，decimalPlaces失效了，也就是hasPad = false的时候，没有办法处理最大保留多少位小数的情况
 * 第二个问题主要是为了兼容以前的数据，如果decimalPlaces不失效，我们要看以前的需求到底哪些保留3位，哪些是2位，这个工作量比较大，容易遗漏
 * 如果后期有这种需求，我们可以在后面加参数的方式进行兼容处理，以防止对其他页面产生影响
 *
 * @param {*} val 要格式化的原始数据
 * @param {Integer} decimalPlaces 正整数，保留小数位
 * @param {boolean} hasPad 小数不满足位数时，是否使用0进行补充，默认true，且hasPad = false时，decimalPlaces无效
 */
const moneyFormat = function (val, decimalPlaces = 2, hasPad = true) {
    if (val) {
        // 针对可能的非数字输入做了一点兼容性处理
        if (isNaN(val * 1)) {
            return '-'
        }
        // val参数可能是字符串，字符串不能调用toFixed，所以之前做了转数字的处理
        val = hasPad ? (val * 1).toFixed(decimalPlaces).toString() : val.toString()
        return money(val)
    } else if (val === 0) {
        // 这里防止decimalPlaces传递成字符串，做了兼容处理
        return hasPad ? '0.'.padEnd(decimalPlaces - 0 + 2, 0) : 0
    } else {
        return '-'
    }
}

/**
 * 日期格式化。利用moment进行日期格式化
 *
 * @param {*} value 要格式化的数据
 * @param {*} type 格式化类型，就是转化为什么格式，比如：YYYY-MM-DD，默认值：YYYY-MM-DD HH:mm:ss
 */
const momentFormat = function (value = new Date(), type = 'YYYY-MM-DD HH:mm:ss') {
    if (value) {
        return moment(value).format(type)
    } else {
        return '-'
    }
}

const formatDateDuration = function (time) {
    if (!time) return '-'
    let tempTime = ''
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    if (days > 0) {
        tempTime += (days + ' 天 ')
    }
    if (hours > 0) {
        tempTime += (hours + ' 时')
    }
    return tempTime
}

function isNotBlank (value) {
    return value || '-'
}

const percentageShow = function (value) {
    if (value) {
        let str = Number(value).toFixed(2)
        str += '%'
        return str
    }
    return '--'
}
const percenShow = function (value) {
    let str = Number(value)
    if (value) {
        str += '%'
        return str
    }
    return '-'
}
const attributeComputed = function (key, list) {
    if (key === null) return '-'
    let value = ''
    list.forEach(val => {
        if (val.key === key) {
            value = val.value
        }
    })
    return value || '-'
}

// 小数位不会千分位
const numericalMoney = function (value) {
    // if (money) {
    //     return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // }
    // return '-'
    if (value == null) return '-'
    let money = ''
    let pointNum = ''
    let val = value.toString()
    if (val.indexOf('.') > 0) {
        money = val.split('.')[0]
        pointNum = val.split('.')[1]
        return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + pointNum
    } else {
        money = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return money
    }
}
export default {
    formatDateDuration,
    money,
    isNotBlank,
    moneyFormat,
    momentFormat,
    percentageShow,
    percenShow,
    attributeComputed,
    numericalMoney
}

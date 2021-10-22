
import moment from 'moment'

// 金额格式化
const money = function (value, int) {
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
 * 金额格式化
 * TODO：这个方法小数点后超过4位会有格式化问题
 *
 * @param {*} val 要格式化的原始数据
 * @param {Integer} decimalPlaces 正整数，保留小数位
 * @param {boolean} hasPad 小数不满足位数时，是否使用0进行补充，默认true，且hasPad = false时，decimalPlaces无效
 */
const moneyFormat = function (val, decimalPlaces = 2, hasPad = true) {
    if (val) {
        // 针对可能的非数字输入做了一点兼容性处理
        val = val * 1
        if (isNaN(val)) {
            return '-'
        }
        val = hasPad ? val.toFixed(decimalPlaces).toString() : val.toString()
        return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else if (val == 0) {
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

export default {
    formatDateDuration,
    money,
    isNotBlank,
    moneyFormat,
    momentFormat,
    percentageShow,
    percenShow,
    attributeComputed
}

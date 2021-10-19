
import moment from 'moment'

// new Data()过后的时间转YYYY-MM-DD HH:mm
const formatterTimes = function (time) {
    const data = new Date(time)
    const year = data.getFullYear()
    const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
    const date = (data.getDate()) < 10 ? '0' + (data.getDate()) : data.getDate()
    const hour = (data.getHours()) < 10 ? '0' + (data.getHours()) : data.getHours()
    const minute = (data.getMinutes()) < 10 ? '0' + (data.getMinutes()) : data.getMinutes()
    return time ? (year + '-' + month + '-' + date + ' ' + hour + ':' + minute) : '-'
}
// new Data()过后的时间转YYYY-MM-DD
const formatterDate = function (time) {
    const data = new Date(time)
    const year = data.getFullYear()
    const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
    const date = (data.getDate()) < 10 ? '0' + (data.getDate()) : data.getDate()

    return time ? (year + '-' + month + '-' + date) : '-'
}

// 金额格式化
const money = function (value, int) {
    // if (val) {
    //     const res = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //     return res
    // }
    // if (val == 0) {
    //     return 0
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
// 资金台账金额格式
const fundMoney = function (val, int) {
    if (val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else if (val === 0) {
        return val
    } else {
        return '-'
    }
}
// 资金台账金额格式 11.11
const fundMoneyHasTail = function (val, int) {
    if (val) {
        const _val = Number(val).toFixed(2)
        return (_val + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else if (val === 0) {
        return Number(val).toFixed(2)
    } else {
        return '-'
    }
}
// 资金台账金额格式
const fundMoneyHaveSpot = function (val, int) {
    if (val) {
        let head = ''
        let foot = ''
        if (val.toString().indexOf('.') > -1) {
            head = (val.toString().slice(0, val.toString().indexOf('.'))).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            foot = val.toString().substr(val.toString().indexOf('.'), 3)
        } else {
            head = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        return `${head}${foot}`
    } else if (val === 0) {
        return val
    }
    return '-'
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

// 用于金额显示，千分位格式，保留两位小数，0返回0.00
const moneyShow = function (val) {
    if (val) {
        return val.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else if (val == 0) {
        return '0.00'
    } else {
        return '-'
    }
}

// *
//  * @name formatTime 时间格式化工具，二次封装moment
//  *
//  * @param {date} [value=new Date()] 时间格式参数
//  * @param {string} [type='YYYY-MM-DD HH:mm'] 格式化类型
//  *

const momentFormat = function (value = new Date(), type = 'YYYY-MM-DD HH:mm:ss') {
    if (value) {
        return moment(value).format(type)
    } else {
        return '-'
    }
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
    formatterTimes,
    formatterDate,
    formatDateDuration,
    money,
    isNotBlank,
    fundMoneyHasTail,
    fundMoney,
    moneyShow,
    fundMoneyHaveSpot,
    momentFormat,
    percentageShow,
    percenShow,
    attributeComputed
}

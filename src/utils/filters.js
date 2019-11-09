// new Data()过后的时间转YYYY-MM-DD HH:mm
const formatterTime = function (time) {
    const data = new Date(time)
    const year = data.getFullYear()
    const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
    const date = (data.getDate()) < 10 ? '0' + (data.getDate()) : data.getDate()
    const hour = (data.getHours()) < 10 ? '0' + (data.getHours()) : data.getHours()
    const minute = (data.getMinutes()) < 10 ? '0' + (data.getMinutes()) : data.getMinutes()
    const second = (data.getSeconds()) < 10 ? '0' + (data.getSeconds()) : data.getSeconds()
    return time ? (year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second) : '-'
}

// new Data()过后的时间转YYYY-MM-DD HH:mm
const formatterDate = function (time) {
    const data = new Date(time)
    const year = data.getFullYear()
    const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
    const date = (data.getDate()) < 10 ? '0' + (data.getDate()) : data.getDate()

    return time ? (year + '-' + month + '-' + date) : '-'
}

// 金额格式化
const money = function (val, int) {
    if (val) {
        const res = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return res
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

export default {
    formatterTime,
    formatterDate,
    formatDateDuration,
    money
}

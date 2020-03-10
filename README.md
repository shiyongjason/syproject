# BOSS

// 更新 tag 导航 通用方法
  this.setNewTags((this.$route.fullPath).split('?')[0])

//
pickerOptionsStart () {
    return {
        disabledDate: time => {
            let endDateVal = this.form.endTime
            if (endDateVal) {
                return time.getTime() > new Date(endDateVal).getTime() || time.getTime() <= Date.now() - 1 * 24 * 60 * 60 * 1000
            }
            return time.getTime() <= Date.now() - 8.64e7
        }
    }
},
pickerOptionsEnd () {
    return {
        disabledDate: time => {
            let beginDateVal = this.form.startTime
            if (beginDateVal) {
                return time.getTime() <= new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            }
            return time.getTime() <= Date.now() - 8.64e7
        }
    }
},

// momentjs
moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间

moment().subtract(10, "days").format("YYYY-MM-DD"); //当前时间的前10天时间

moment().subtract(1, "years").format("YYYY-MM-DD"); //当前时间的前1年时间

moment().subtract(3, "months").format("YYYY-MM-DD"); //当前时间的前3个月时间

moment().subtract(1, "weeks").format("YYYY-MM-DD"); //当前时间的前一个星期时间
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
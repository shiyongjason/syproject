# BOSS

// 更新 tag 导航 通用方法
  this.setNewTags((this.$route.fullPath).split('?')[0])

//
pickerOptionsStart () {
        return {
            disabledDate: (time) => {
                let beginDateVal = this.formData.endTime
                if (beginDateVal) {
                    return time.getTime() > new Date(beginDateVal).getTime() - 8.64e7
                }
            }
        }
    },
    pickerOptionsEnd () {
        return {
            disabledDate: (time) => {
                let beginDateVal = this.formData.startTime
                if (beginDateVal) {
                    return time.getTime() < new Date(beginDateVal).getTime()
                }
            }
        }
    }
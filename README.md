# BOSS
//项目架构




*** Boss 规范  ***

//  代码规范 参考 [http://devfrontend.hosjoy.com/specification/frontEnd]

*** Vuex 规范  ***

1. 一级菜单文件 是内部的大的业务线
2. 二级菜单文件 是每条业务功能的子功能
3. 所有的vuex  store 跟着二级走  标记命名空间，在外层 store  index.js 引入 module 

## example：

### 好智慧业务/ 资金台账

|-wisdom- |-- fundsData
                |   |-- const.js     // 所有的二级业务功能用到的变量的定义
                |   |-- Ledger.vue
                |   |-- api           // 所有的二级业务功能用到的请求
                |   |   |-- index.js
                |   |-- components    // 公用组件
                |   |   |-- complexTable.vue
                |   |   |-- newFlowdialog.vue
                |   |-- store          // 所有的vuex store 跟着 2级目录功能走
                |       |-- const.js   // 常量方法
                |       |-- index.js   // state getters mutations acitons
        


*** 常用方法  ***

### 更新 tag 导航 通用方法

 `` this.setNewTags((this.$route.fullPath).split('?')[0])``

`
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
`
// momentjs
moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间

moment().subtract(10, "days").format("YYYY-MM-DD"); //当前时间的前10天时间

moment().subtract(1, "years").format("YYYY-MM-DD"); //当前时间的前1年时间

moment().subtract(3, "months").format("YYYY-MM-DD"); //当前时间的前3个月时间

moment().subtract(1, "weeks").format("YYYY-MM-DD"); //当前时间的前一个星期时间
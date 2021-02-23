<template>
<div class="page-body">
    <div class="page-body-cont">
        <div class="selection-area">
            <el-radio-group v-model="tab" style="margin-bottom: 20px;">
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
            </el-radio-group>
        </div>
        <div v-if="tab === 'year'">
            <div class="title">{{currYear}}年</div>
            <ul class="calendar_wrapper">
                <li v-for="item in months" :key="item" class="month-wrapper" @dblclick="onShowMonth(item)">
                    <div class="month-title">{{cnMonths[item - 1]}}月</div>
                    <div class="month-content">
                        <div class="date-title-wrapper">
                            <div v-for="obj in cnWeeks" :key="obj" class="date-title">{{obj}}</div>
                        </div>
                        <div v-for="(arr, index) in allDate(item)" :key="index" class="date-content-wrapper">
                            <div v-for="obj in arr" :key="obj.day" :class="{'date-content': true, 'disabled':  obj.disabled}">
                                {{obj.day}}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="tab === 'month'">
            <div class="title">{{currYear}}年{{currMonth}}月</div>
            <div class="month-content">
                <div class="date-title-wrapper">
                    <div v-for="obj in cnWeeks" :key="obj" class="month-date-title">周{{obj}}</div>
                </div>
                <div v-for="(arr, index) in allDate(currMonth)" :key="index" class="month-date-content-wrapper">
                    <div v-for="obj in arr" :key="obj.day" :class="{'month-date-content': true, 'disabled':  obj.disabled}">
                        {{obj.day}}日
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            currYear: new Date().getFullYear(),
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            cnMonths: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            cnWeeks: ['日', '一', '二', '三', '四', '五', '六'],
            tab: 'year',
            currMonth: new Date().getMonth() + 1
        }
    },
    methods: {
        allDate (month) {
            let result = []
            let days = []
            // 获取当前月份有多少天
            const dayNum = new Date(this.currYear, month, 0).getDate()
            // 获取当前月份第一天是周几
            const firstDay = new Date(this.currYear, month - 1, 1).getDay()
            if (firstDay !== 0) {
                // 获取上个月有多少天
                const preMonthDayNum = new Date(this.currYear, month - 1, 0).getDate()
                // 上个月日期
                for (let i = 0; i < firstDay; i++) {
                    days.push({
                        day: preMonthDayNum - firstDay + 1 + i,
                        disabled: true
                    })
                }
            }
            // 当前月日期
            for (let i = 0; i < dayNum; i++) {
                days.push({
                    day: i + 1,
                    disabled: (firstDay + i + 1) % 7 == 0 || (firstDay + i) % 7 == 0
                })
            }
            // 下个月日期
            for (let i = 0; i < 42 - dayNum - firstDay; i++) {
                days.push({
                    day: i + 1,
                    disabled: true
                })
            }
            for (let i = 0; i < 6; i++) {
                result.push(days.slice(i * 7, (i + 1) * 7))
            }
            return result
        },
        onShowMonth (month) {
            this.tab = 'month'
            this.currMonth = month
        }
    }
}
</script>
<style lang="scss" scoped>
.selection-area {
    display: flex;
    justify-content: center;
}
.title {
    font-size: 36px;
}
.calendar_wrapper {
    display: flex;
    flex-wrap: wrap;
    min-width: 1040px;
}
.month-wrapper {
    width: 24%;
}
.month-title {
    margin-top: 40px;
    margin-bottom: 10px;
    color: #d45755;
    font-size: 20px;
}
.date-title-wrapper {
    display: flex;
}
.date-title {
    width: 40px;
    text-align: center;
}
.date-content-wrapper {
    display: flex;
}
.date-content {
    margin-top: 10px;
    width: 40px;
    text-align: center;
}
.disabled {
    color: #ccc;
}
.month-date-title {
    margin-top: 40px;
    padding-right: 10px;
    padding-bottom: 10px;
    width: 14%;
    text-align: right;
    border-bottom: 1px solid #ccc;
}
.month-date-content-wrapper {
    display: flex;
    border-right: 1px solid #ccc;
}
.month-date-content {
    padding-top: 10px;
    padding-right: 10px;
    height: 100px;
    width: 14%;
    text-align: right;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
</style>
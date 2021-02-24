<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="selection-area">
                <el-radio-group v-model="tab" style="margin-bottom: 20px;">
                    <el-radio-button label="month">月</el-radio-button>
                    <el-radio-button label="year">年</el-radio-button>
                </el-radio-group>
            </div>
            <div class="selection-color">
                <div class="selection-color_black"><b></b>工作日</div>
                <div class="selection-color_red"><b></b>非工作日</div>
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
                                <div v-for="obj in arr" :key="obj.day" :class="{'date-content': true, 'disabled':  obj.disabled, 'isWorking':obj.isWorking}">
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
                        <div v-for="obj in arr" :key="obj.day" :disabled=obj.disabled :class="{'month-date-content': true, 'disabled':  obj.disabled,'isWorking':obj.isWorking}" @click="onClickSet(obj)">
                            {{obj.day}}日
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog title="设置" :visible.sync="dialogVisible" width="20%" :before-close="handleClose" :close-on-click-modal=false>
                <p class="work-box">{{currYear}}年{{currMonth}}月{{currDay}}日是否是工作日</p>
                <p class="work-box">
                    <el-switch v-model="workvalue" active-text="非工作日" inactive-text="工作日"></el-switch>
                </p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onCloseSet">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { getYearHoliday } from './api/index'
export default {
    data () {
        return {
            dialogVisible: false,
            workvalue: false,
            currYear: new Date().getFullYear(),
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            cnMonths: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            cnWeeks: ['日', '一', '二', '三', '四', '五', '六'],
            tab: 'year',
            currMonth: new Date().getMonth() + 1,
            currDay: '',
            currWork: [4, 8, 10, 25, 30],
            detalHoliday: ''
        }
    },
    methods: {
        handleClose () {
            this.dialogVisible = false
        },
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
                    isWorking: this.isWorking(month, i)
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
        },
        isWorking (month, day) {
            // console.log('当前天',month,this.detalHoliday[`${this.currYear}-${month}`])
            // let _holiday = ["2021-12-04", "2021-12-05", "2021-12-11", "2021-12-12", "2021-12-18", "2021-12-19", "2021-12-25", "2021-12-26"]
            let _holiday = this.detalHoliday[`${this.currYear}-${month}`] || []
            const arr = _holiday.map(item => {
                item = parseInt(item.split('-')[2])
                return item
            })
            return arr.indexOf(day + 1) > -1
        },
        async onDealHoliday () {
            const { data } = await getYearHoliday()
            this.detalHoliday = data
            console.log(Object.keys(data))
            // for(let i in data){
            //     console.log('==',data[i])
            //     for(let n=0;n<data[i].length;n++){

            //         console.log('====',data[i][n])
            //     }
            // }
        },
        onClickSet (obj) {
            console.log(obj)
            this._curObj = obj
            this.currDay = obj.day
            this.workvalue = obj.isWorking
            this.dialogVisible = true
        },
        onCloseSet () {
            let _week = this.allDate(this.currMonth)
            _week.map(item => {
                item.map(jtem => {
                    if (jtem.day == this.currDay && jtem.hasOwnProperty("isWorking")) {
                        jtem.isWorking = this.workvalue
                        console.log(jtem.day)
                        this.$set(_week[0], 2, this.workvalue)
                    }
                })
            })
            this.dialogVisible = false
            this.$forceUpdate()
            console.log(this.workvalue, this.allDate(this.currMonth), this.currYear, this.currMonth, this.currDay)
        }
    },
    mounted () {
        this.onDealHoliday()
    },
    created () {

    }

}
</script>
<style lang="scss" scoped>
.selection-area {
    display: flex;
    justify-content: center;
}
.selection-color {
    display: flex;
    justify-content: center;
    &_black {
        color: #333;
        display: flex;
        align-items: center;
        margin-right: 30px;
        b {
            width: 10px;
            height: 10px;
            display: block;
            background: #333;
        }
    }
    &_red {
        color: #d45755;
        display: flex;
        align-items: center;
        b {
            width: 10px;
            height: 10px;
            display: block;
            background: #d45755;
        }
    }
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
    pointer-events: none;
}
.isWorking {
    color: #d45755;
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
.work-box {
    margin-bottom: 10px;
    &:nth-of-type(1) {
        font-size: 16px;
    }
}
</style>
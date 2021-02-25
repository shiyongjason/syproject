<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="update-area">
                <!-- <i>年份：</i>{{2021}}   <i>维护版本：</i>v1.0.1    <i>维护人：</i>{{鲁肃}}   <i>维护时间：</i>2021-02-05 10:42:58}} -->
            </div>
            <div class="selection-area">
                <el-radio-group v-model="tab" style="margin-bottom: 20px;" @change="onChange">
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
                    <!-- <li v-for="item in months" :key="item" class="month-wrapper" @dblclick="onShowMonth(item)">
                        <div class="month-title">{{cnMonths[item - 1]}}月</div> -->
                    <!-- <div class="month-content">
                            <div class="date-title-wrapper">
                                <div v-for="obj in cnWeeks" :key="obj" class="date-title">{{obj}}</div>
                            </div>
                            <div v-for="(arr, index) in newYearMonth" :key="index" class="date-content-wrapper">
                                <div v-for="obj in arr" :key="obj.day" :class="{'date-content': true, 'disabled':  obj.disabled, 'isWorking':obj.isWorking}">
                                    {{obj.day}}
                                </div>
                            </div>
                        </div> -->
                    <!-- </li> -->
                    <li v-for="(item,index) in newYearMonth" :key="index" class="month-wrapper" @dblclick="onShowMonth(item,index)">
                        <div class="month-title">{{cnMonths[index]}}月</div>
                        <div class="month-content">
                            <div class="date-title-wrapper">
                                <div v-for="(obj,oindex) in cnWeeks" :key="oindex" class="date-title">{{obj}}</div>
                            </div>
                            <div v-for="(arr, aindex) in item" :key="aindex" class="date-content-wrapper">
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
                    <div v-for="(arr, index) in newMonthWeek" :key="index" class="month-date-content-wrapper">
                        <div v-for="obj in arr" :key="obj.day" :disabled=obj.disabled :class="{'month-date-content': true, 'disabled':  obj.disabled,'isWorking':obj.isWorking}" @click="onClickSet(obj)">
                            {{obj.day}}日
                            <p v-if="obj.isWorking" style="text-align:left;background:#f5ece6;padding-left:10px">非工作日</p>
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
import { getYearHoliday, setHoliday } from './api/index'
export default {
    name: 'fullcalendar',
    data () {
        return {
            dialogVisible: false,
            workvalue: false,
            currYear: this.$route.query.year,
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            cnMonths: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            cnWeeks: ['日', '一', '二', '三', '四', '五', '六'],
            tab: 'year',
            currMonth: new Date().getMonth(),
            currDay: '',
            currWork: [4, 8, 10, 25, 30],
            detalHoliday: {},
            newYearMonth: [],
            newMonthWeek: []
        }
    },
    methods: {
        handleClose () {
            this.dialogVisible = false
        },
        onChange (val) {
            if (val == 'month') {
                this.newMonthWeek = this.allDate(this.currMonth || 1)
            }
            console.log(this.newMonthWeek)
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
        onShowMonth (val, index) {
            console.log(val)
            this.tab = 'month'
            this.currMonth = index + 1
            //
            this.newMonthWeek = this.allDate(this.currMonth)
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
            this.newYearMonth = []
            const { data } = await getYearHoliday(this.currYear)
            this.detalHoliday = data
            for (var obj in this.detalHoliday) {
                // this.newYearMonth=[...this.allDate(obj && obj.split('-')[1])]
                this.newYearMonth.push(this.allDate(obj && obj.split('-')[1]))
            }
        },
        onClickSet (obj) {
            if (this.$route.query.type == 'edit') {
                this._curObj = obj
                this.currDay = obj.day
                this.workvalue = obj.isWorking
                this.dialogVisible = true
            }
        },
        async onCloseSet () {
            // 点击获取最新的月视图数据
            let _week = this.newMonthWeek
            _week.map(item => {
                item.map(jtem => {
                    if (jtem.day == this.currDay && jtem.hasOwnProperty('isWorking')) {
                        this.$set(jtem, 'isWorking', this.workvalue)
                        console.log('===', jtem, jtem.day)
                        // this.$set(_week[0], 2, { day: this.currDay, isWorking: true})
                    }
                })
            })
            this.dialogVisible = false
            this.newMonthWeek = _week
            await setHoliday({
                date: this.currYear + '-' + (this.currMonth < 10 ? '0' + this.currMonth : this.currMonth) + '-' + (this.currDay < 10 ? '0' + this.currDay : this.currDay),
                isHoliday: this.workvalue
            })
            this.$message({
                message: '当前日期设置完成',
                type: 'success'
            })
            this.onDealHoliday()
            console.log(this.workvalue, _week, this.currYear, this.currMonth, this.currDay)
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
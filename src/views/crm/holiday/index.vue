<template>
<div class="page-body">
      <div class="page-body-cont">
    <div class="fullCalendarCont">
        <el-date-picker size="small" style="width: 144px;" v-model="selectDate" type="date" placeholder="选择时间" @change="changeDate">
        </el-date-picker>
        <full-calendar :config="config" :events="events" ref="calendar"></full-calendar>
    </div>
      </div>
    </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import "fullcalendar/dist/fullcalendar.css";
export default {
    components: { FullCalendar },
    data () {
        return {
            selectDate: '',//日期选择器选中的月份
            events: [{
                id: 1,
                title: '出差',
                start: '2021-02-20', // 事件开始时间
                end: '2021-02-22',   // 事件结束时间
            },
            {
                id: 2,
                title: '出差2',
                start: '2021-02-20', // 事件开始时间
                end: '2021-02-22',   // 事件结束时间
            },],
            config: {
                firstDay: '0',//以周日为每周的第一天
                buttonText: {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '日'
                },
               header: {
                      left: 'hide',
                      center: 'title',
                      right: 'hide,hide,hide'
                    },
                theme: false,//是否允许使用jquery的ui主题
                height: 'auto',
                slotLabelFormat: 'H:mm', // axisFormat 'H(:mm)'
                //slotLabelInterval:1,
                views: {
                    month: {
                        titleFormat: 'YYYY年MMM'
                    },
                    day: {
                        titleFormat: 'YYYY年MMMDD日 dddd'
                    }
                },
                monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                dayNamesShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                slotDuration: '00:30:00',
                minTime: '00:00',
                maxTime: '24:00',
                locale: "zh-cn",
                editable: true, //是否允许修改事件
                selectable: false,//是否允许用户单击或者拖拽日历中的天和时间隙
                eventLimit: false, // 限制一天中显示的事件数，默认false
                allDaySlot: false, //是否显示allDay
                displayEventEnd: false,//是否显示结束时间
                allDayText: '全天',
                navLinks: false, //允许天/周名称是否可点击
                defaultView: "month", //显示默认视图
                eventClick: this.eventClick, //点击事件
                dayClick: this.dayClick, //点击日程表上面某一天
                eventRender: this.eventRender

            }
        }
    },
    methods: {
        changeDate () {
            this.$refs.calendar.fireMethod('gotoDate', this.selectDate)
        },
        // 点击事件
        eventClick (event, jsEvent, pos) {
            alert('eventClick', event, jsEvent, pos)
        },
        // 点击当天
        dayClick (day, jsEvent) {
            alert('dayClick', day, jsEvent)
        },
        eventRender: function (event, element) {
            element.find('.fc-title').attr('title', event.title)
        }
    }
}
</script>
<style lang="scss" scoped>
.fullCalendarCont{
    width: 90%;
    background: #fff;
    margin: 0 auto;
}
</style>
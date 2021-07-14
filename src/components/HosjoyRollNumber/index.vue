<template>
    <div class="content">
        <div class="box" :style="fontColorSize" v-html="dom"></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            dom: ''
        }
    },
    watch: {
        rollNumber: function (newnum, oldnum) {
            this.number(this.rollNumber)
        }
    },
    props: {
        rollNumber: { // 滚动的数字
            type: String,
            default: ''
        },
        fontSpacing: { // 数字间距 >8
            type: Number,
            default: 1
        },
        rollingSpeed: { // 滚动速度
            type: Number,
            default: 1.5
        },
        fontColorSize: { // 字体大小以及颜色
            type: String,
            default: ''
        }
    },
    created () {
        this.number(this.rollNumber)
    },
    methods: {
        number (digit) {
            let numArr = []
            for (var i = 0; i < digit.length; i++) {
                numArr.push(digit[i])
            }
            var str = ''
            var numlength = numArr.length
            var numLabel = ''
            for (let i = 0; i <= 9; i++) {
                numLabel += ` <span class="num">${i}</span>`
            }
            for (let i = 0; i < numlength; i++) {
                if (parseInt(numArr[i]) >= 0) {
                    str += '<div  class="digit-container"  data-show=' + numArr[i] + '> ' + numLabel + '</div>'
                } else {
                    str += '<div ><span>' + numArr[i] + '</span></div>'
                }
            }
            this.dom = str
            this.$nextTick(() => {
                let obj = document.getElementsByClassName('digit-container')
                let numDom = document.getElementsByClassName('num')[0]
                for (let i in obj) {
                    if (typeof obj[i] == 'object') {
                        obj[i].style.transition = `all ${this.rollingSpeed}s`
                        obj[i].style.marginTop = -(Number(obj[i].dataset.show) * numDom.offsetHeight) + 'px'
                        obj[i].style.width = numDom.offsetWidth + this.fontSpacing + 'px'
                    }
                }
            })
        }
    }

}
</script>

<style scoped>
    .content {
        display: flex;
        justify-content: center;
    }

    .box {
        overflow: hidden;
        display: flex;
        height: 30px;
    }

    span {
        display: block;
    }
</style>
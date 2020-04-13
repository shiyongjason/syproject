<template>
    <div class="page-body">
        <div class="page-body-cont center">
            <div class="pad10 f20">
                <h3>资金计划申报</h3>
            </div>
            <div class="pad10 f20">
                <h3>XXXX公司，你好！</h3>
            </div>
            <div class="pad10">
                <span>本次申报的为：<i>XXXX</i>年<i>X</i>月的资金计划</span>
            </div>
            <div class="pad10">
                <el-button type="primary">点击进入申报页面</el-button>
            </div>
            <a href="#">查看前期资金计划申报情况</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'fundPlanHome',
    data () {
        return {
        }
    },
    mounted () { },
    methods: {

    }
}
</script>

<style lang='scss' scoped>
.center {
    text-align: center;
}
.pad10 {
    padding: 10px 0;
}
.f20{
    font-size: 20px;
}
i {
    font-style: normal;
    color: #ff0000;
}
</style>

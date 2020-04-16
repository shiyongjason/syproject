<template>
    <div class="page-body">
        <div class="page-body-cont">
            <span>>>区域人员申报</span>
            <div class="title">
                <span>本次可申报：<i>2020</i>年<i>X</i>月的预计销售及资金用款计划</span>
            </div>
            <baseInfo />
        </div>
        <div class="page-body-cont">
            <districtEmployee />
        </div>
        <div class="page-body-cont center">
            <el-button name="hosjoy-color">提 交</el-button>
            <el-button name="hosjoy-color">取 消</el-button>
        </div>
    </div>
</template>

<script>
import baseInfo from '../components/declare/baseInfo'
import districtEmployee from '../components/declare/districtEmployee'

export default {
    name: 'planTotal',
    components: { baseInfo, districtEmployee },
    data () {
        return {}
    },
    methods: {

    },
    mounted () {

    }
}
</script>

<style lang='scss' scoped>
.title {
    font-weight: 700;
    text-align: center;
    font-size: 20px;
    i {
        font-style: normal;
        color: #ff0000;
    }
}
.center {
    text-align: center;
}
</style>

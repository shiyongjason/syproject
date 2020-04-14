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
        </div>
    </div>
</template>

<script>
import baseInfo from '../components/baseInfo'
export default {
    name: 'planTotal',
    components: { baseInfo },
    data () {
        return {

        }
    },
    methods: {
        backPlat (value) {
            console.log(value)
        },
        onReset () {
            this.params = { ...this.paramsTemp }
        }
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
</style>

<template>
    <div class="jd-manage">
        <p v-if="form.updateTime">已提交 {{form.updateTime}} {{ form.updateUser}} </p>
        <p class="title-p">合作目标</p>
        <div>
            <p>尽调规模：{{ form.scale }}万</p>
            <table class="custom-table">
                <thead>
                    <tr>
                        <td>年份</td>
                        <td>年度递增率</td>
                        <td>净利润率</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in form.yearRateTabelContents" :key="index">
                        <td>{{item.year}}</td>
                        <td>{{item.yearGrowthRate}}%</td>
                        <td>{{item.netProfitRate}}%</td>
                    </tr>
                </tbody>
            </table>
            <p>股权比例（合作方:好享家）：{{ form.equityRatio }}</p>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.cotargetData
        })
    },
    methods: {
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped>
p {
    margin: 10px;
    color: #666260;
}
.jd-manage {
    padding: 0 15px;
    h3 {
        margin: 0;
        line-height: 40px;
        border-bottom: 1px solid #dcdfe6;
    }
}
.custom-table {
    width: 50%;
}
</style>

<template>
    <div class="jd-manage">
        <p class="title-p">合作目标</p>
        <p>已提交 {{updateTime}} {{updateUser}} </p>
        <div>
            <p>尽调规模：{{ form.scale }}万</p>
            <!-- <table class="tableStyle" :tableLabel="tableLabel" :tableData="yearRateTabelContents">
                <template slot="yearGrowthRate" slot-scope="scope">
                    {{ scope.data.row.yearGrowthRate }}%
                </template>
                <template slot="netProfitRate" slot-scope="scope">
                    {{ scope.data.row.netProfitRate }}%
                </template>
            </table> -->
            <table class="tableStyle">
                 <thead>
                     <tr>
                         <td>年份</td>
                         <td><span class="red-word">*</span>年度递增率</td>
                         <td><span class="red-word">*</span>净利润率</td>
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
            <p>股权比例：{{ form.equityRatio }}</p>
        </div>
    </div>
</template>
<script>
// import { getDueLegal } from '../api/index.js'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            // scale: '',
            // yearRateTabelContents: [],
            // equityRatio: '',
            // updateUser: '',
            // updateTime: '',
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.cotargetData
        })
    },
    methods: {
        // ...mapActions([
        //     'findCotargetData'
        // ])
        // async getDueLegal () {
        //     const { data } = await getDueLegal(this.$route.query.applyId)
        //     console.log(data.data)
        //     this.updateUser = data.data.updateUser
        //     this.updateTime = data.data.updateTime
        //     this.equityRatio = data.data.equityRatio
        //     this.scale = data.data.scale
        //     this.yearRateTabelContents = data.data.yearRateTabelContents
        // }
    },
    mounted () {
        // this.getDueLegal()
        // this.findCotargetData({ applyId: this.$route.query.applyId })
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
    .title-p {
        color: #fda015;
    }
    .tableStyle {
        width: 40%;
    }
}

</style>

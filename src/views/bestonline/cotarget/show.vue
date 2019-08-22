<template>
    <div class="jd-manage">
        <p class="title-p">合作目标</p>
        <p>已提交 {{updateTime}} {{updateUser}} </p>
        <div>
            <p>尽调规模：{{ scale }}万</p>
            <basicTable :tableLabel="tableLabel" :tableData="yearRateTabelContents">
                <template slot="yearGrowthRate" slot-scope="scope">
                    {{ scope.data.row.yearGrowthRate }}%
                </template>
                <template slot="netProfitRate" slot-scope="scope">
                    {{ scope.data.row.netProfitRate }}%
                </template>
            </basicTable>
            <p>股权比例：{{ equityRatio }}</p>
        </div>
    </div>
</template>
<script>
import { getDueLegal } from '../api/index.js'
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            scale: '',
            yearRateTabelContents: '',
            equityRatio: '',
            updateUser: '',
            updateTime: '',
            tableLabel: [
                { label: '年份', prop: 'year', width: '50px' },
                { label: '年度递增率', prop: 'yearGrowthRate' },
                { label: '净利润率', prop: 'netProfitRate' }
            ]
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.cotargetData
        })
    },
    methods: {
        ...mapActions([
            'findCotargetData'
        ]),
        async getDueLegal () {
            const { data } = await getDueLegal(this.$route.query.applyId)
            this.updateUser = data.data.updateUser
            this.updateTime = data.data.updateTime
            this.equityRatio = data.data.equityRatio
            this.scale = data.data.scale
            this.yearRateTabelContents = data.data.yearRateTabelContents
        }
    },
    mounted () {
        this.getDueLegal()
        this.findCotargetData({ applyId: this.$route.query.applyId })
    }
}
</script>

<style lang="scss" scoped>
p {
    margin: 10px;
    color: #606266;
}
.jd-manage {
    padding: 0 15px;
    h3 {
        margin: 0;
        line-height: 40px;
        border-bottom: 1px solid #dcdfe6;
    }
    .title-p {
        color: #409eff;
    }
}
</style>

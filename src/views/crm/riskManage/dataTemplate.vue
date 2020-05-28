<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="page-risk">
                <div class="page-risk_title">
                    材料清单配置：
                    <div class="page-risk_btn">
                        好橙工项目材料清单 <el-button size="mini" type="primary" @click="onEdittemp(1)">编辑</el-button>
                    </div>
                </div>
                <div class="page-risk_title">
                    信审清单配置：
                    <div class="page-risk_btn">
                        好橙工信审材料清单 <el-button size="mini" type="primary" @click="onEdittemp(2)">编辑</el-button>
                    </div>
                </div>
                <div class="page-risk_title">
                    终审清单配置：
                    <div class="page-risk_btn">
                        好橙工终审材料清单 <el-button size="mini" type="primary" @click="onEdittemp(3)">编辑</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dataTemp',
    data () {
        return {

        }
    },
    mounted () {

    },
    methods: {
        onEdittemp (val) {
            this.$router.push({ path: '/goodwork/tempdetail', query: { bizType: val } })
        }
    }
}
</script>
<style lang="scss" scoped>
.page-risk {
    .page-risk_title {
        font-size: 20px;
        padding: 20px;
        .page-risk_btn {
            font-size: 15px;
            margin: 20px;
        }
    }
}
</style>
<template>
    <div class="collect-wrap">
        <el-form :model="colForm" :rules="rules" ref="colForm" label-width="10px" class="demo-ruleForm">
            <div>
                <div class="collect-title">经销商</div>
                <el-form-item label="" prop="type">
                    <div class="collect-box">
                        <el-checkbox label="" name="type" size="medium"></el-checkbox>
                        <div class="collect-boxtxt">
                            <h3>三证正副本</h3>
                            <p>备注：原则上工商局打印（工商章）</p>
                            <p>规定格式：复印件</p>
                        </div>
                    </div>
                    <div class="collect-box">
                        <el-checkbox label="" name="type" size="medium"></el-checkbox>
                        <div class="collect-boxtxt">
                            <h3>三证正副本</h3>
                            <p>备注：原则上工商局打印（工商章）</p>
                            <p>规定格式：复印件</p>
                        </div>
                    </div>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        // colForm: {
        //     type: Object,
        //     default: () => {}
        // }
    },
    data () {
        return {
            colForm: {}
        }
    }
}
</script>
<style lang="scss" scoped>
.collect-wrap {
    padding: 0 10px 100px 10px;
}
.collect-title {
    font-size: 20px;
    color: #333333;
    border-bottom: 1px solid #e5e5e5;
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
</style>
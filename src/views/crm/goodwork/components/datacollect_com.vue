<template>
    <div class="collect-wrap">
        <el-form :model="colForm" :rules="colFormrules" ref="colForm" label-width="10px" class="demo-ruleForm">
            <el-button size="small" type="primary">打回记录</el-button>
            <div class="collect-wrapbox">
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
        <el-dialog title="打回记录" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
            <div class="project-record"  >
                <el-timeline>
                    <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in dialogRecord" :key=item.id>
                        <el-card>
                           123
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-dialog>
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
            colForm: {},
            colFormrules: [],
            dialogVisible: false,
            dialogRecord: []
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
    margin-top: 10px;
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
.collect-wrapbox {
    margin-left: 20px;
}
</style>
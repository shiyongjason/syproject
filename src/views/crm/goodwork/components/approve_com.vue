<template>
    <div class="collect-wrap">
        <el-form :model="colForm" :rules="rules" ref="colForm" class="demo-ruleForm">
            <div class="collect-result">
                <el-form-item label="立项结果:" prop="resource" label-width="100px">
                    <el-radio-group v-model="colForm.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="说明：" prop="desc" label-width="100px">
                    <el-input type="textarea" v-model="colForm.desc"></el-input>
                </el-form-item>
            </div>
            <div>
                <div class="collect-title">立项材料</div>
                <el-form-item label="" prop="type" label-width="30px">
                    <div class="collect-box">
                        <el-checkbox label="" name="type" size="medium"></el-checkbox>
                        <div class="collect-boxtxt">
                            <h3>三证正副本</h3>
                            <p>备注：原则上工商局打印（工商章）</p>
                            <p>规定格式：复印件</p>
                        </div>
                    </div>
                     <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
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
    padding: 10px 0 ;
    font-weight: bold;;
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
</style>
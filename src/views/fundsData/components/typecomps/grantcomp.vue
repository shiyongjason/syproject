<template>
    <div>
        <div class="dialogtitle">借款信息：</div>
        {{flowform}}
        <div class="query-cont-row">
            <div class="query-cont-col">
                <el-form-item label="开票金额：" prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入开票金额"><template slot="append">元</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="供货商名称：" prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入供货商名"></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="借款金额：" prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入借款金额"><template slot="append">元</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="年利率：" prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入年利率"><template slot="append">%</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="借款期限： " prop="name">
                    <el-radio v-model.trim="radio" label="月"></el-radio>
                    <el-radio v-model.trim="radio" label="天"></el-radio>
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入借款期限"><template slot="append">{{radio?'月':'天'}}</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="开票日期：" prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入年利率"><template slot="append">%</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="借款日期：" prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入年利率"><template slot="append">%</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="到期日：" prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入借款期限"></el-input>
                </el-form-item>
            </div>
        </div>
        <div class="dialogtitle">还款信息：</div>
        <div class="query-cont-col">
            <el-form-item label="还款方式：" prop="name">
                <el-radio v-model.trim="radio" label="1">334</el-radio>
                <el-radio v-model.trim="radio" label="0">一次性还款</el-radio>
            </el-form-item>
        </div>
    </div>
</template>
<script>
export default {
    name: 'flowform',
    props: {
        flowform: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {

        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.flowform.loanEndTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime() || time.getTime() <= Date.now() - 1 * 24 * 60 * 60 * 1000
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.flowform.loanStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
    }
}
</script>
<style scoped>
</style>
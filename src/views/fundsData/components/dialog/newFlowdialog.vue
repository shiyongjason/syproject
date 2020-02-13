<template>
    <!-- 新增流贷弹窗 -->
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账编号：" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云系统编号：" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="借款单位：" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                      <div class="query-cont-col">
                        <el-form-item label="金云系统编号：" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'newLedger',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            rules: [],
            ruleForm: {
                name: ''
            }
        }
    },
    methods: {
        onSure () {
            // 操作
            this.onCancle()
        },
        onCancle () {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="sass" scoped>

</style>


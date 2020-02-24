<template>
    <!-- 新增分授信弹窗 -->
    <div class="flowbody page-body">
        <div class="page-body-cont query-cont">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="dialogtitle">基础信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账编号：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请输入台账编号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云系统编号：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="如有请输入，无请忽略"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款单位：" prop="name">
                            <el-input v-model.trim="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="MIS编码：" prop="name">
                            <el-input v-model.trim="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="分部：" prop="name">
                            <el-input v-model.trim="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="dialogtitle">借款信息：</div>
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
                <!-- <h3>逾期</h3>
                <div class="query-cont-row">
                    <el-form-item label="阶梯式计息：" prop="name">
                        <el-radio v-model.trim="radio" label="1">否</el-radio>
                        <el-radio v-model.trim="radio" label="1">是</el-radio>
                    </el-form-item>
                </div> -->
                <div class="smalltitle">第一次还款：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="约定还款日期：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请选择约定还款日期"></el-input>
                        </el-form-item>
                    </div>
                     <div class="query-cont-col">
                        <el-form-item label="还款金额：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请输入还款金额"><template slot="append">元</template></el-input>
                        </el-form-item>
                    </div>
                </div>
               <div class="smalltitle">第二次还款：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="约定还款日期：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请选择约定还款日期"></el-input>
                        </el-form-item>
                    </div>
                     <div class="query-cont-col">
                        <el-form-item label="还款金额：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请输入还款金额"><template slot="append">元</template></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="smalltitle">第三次还款：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="约定还款日期：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请选择约定还款日期"></el-input>
                        </el-form-item>
                    </div>
                     <div class="query-cont-col">
                        <el-form-item label="还款金额：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请输入还款金额"><template slot="append">元</template></el-input>
                        </el-form-item>
                    </div>
                </div>
                <h3>逾期信息</h3>
                <div class="query-cont-row">
                    <el-form-item label="阶梯式计息：" prop="name">
                        <el-radio v-model.trim="radio" label="1">否</el-radio>
                        <el-radio v-model.trim="radio" label="1">是</el-radio>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                        <el-form-item label="逾期利率：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请输入逾期利息"><template slot="append">%</template></el-input>
                        </el-form-item>
                    </div>
                <div class="dialogtitle">档案信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账档案编号：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请输入台账档案编号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云档案编号：" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请输入金云档案编号"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="dialogtitle">备注：</div>
                <div class="query-cont-row">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                    </el-input>
                </div>
                <div class="flow-bottom">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
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

<style lang="scss" scoped>
h3 {
    font-size: 14px;
}
.dialogtitle {
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    line-height: 30px;
}
.flowbody {
    .query-cont-col {
        margin-bottom: 10px;
    }
}
.smalltitle {
    color: #f00;
    line-height: 30px;
}
.flow-bottom {
    margin: 20px auto;
}
</style>

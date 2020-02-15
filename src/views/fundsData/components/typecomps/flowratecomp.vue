<template>
    <div>
        {{flowrateform}}
        <h3>逾期</h3>
        <div class="query-cont-row">
            <el-form-item label="阶梯式计息：" prop="isStepOverInterest">
                <el-radio v-model.trim="flowrateform.isStepOverInterest" label=0>否</el-radio>
                <el-radio v-model.trim="flowrateform.isStepOverInterest" label=1>是</el-radio>
            </el-form-item>
        </div>
        <div class="smalltitle">逾期第一阶段利息：</div>
        <div class="query-cont-row">
            <div class="query-cont-col">
                <el-form-item label="第一阶段时长：" prop="name">
                    <el-input v-model.trim="flowrateform.name" placeholder="请输入逾期时长"><template slot="append">月</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="该阶段逾期利率：" prop="name">
                    <el-input v-model.trim="flowrateform.name" placeholder="请输入逾期利息"><template slot="append">%</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-minus">删除</el-button>
            </div>
        </div>
        <div>
            <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-plus">下阶段利息</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'flowrateform',
    props: {
        flowrateform: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {

        }
    }
}
</script>
<template>
    <el-collapse-item name="4">
        <template slot="title">
            <p class="title-p">合作动机及风险评估</p>
        </template>
        <p class="small-title">合作初衷</p>
        <div class="item-wrapper">
            <el-form-item label="合作初衷：" label-width="100px" prop="cooperationIntention">
                <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入内容" v-model="form.cooperationIntention" maxlength="250"></el-input>
            </el-form-item>
        </div>
        <p class="small-title">合作风险</p>
        <div class="item-wrapper">
            <el-form-item label="合作风险：" label-width="100px" prop="cooperationRisk" :rules="{ required: true ,message: '分析描述不能为空', trigger: 'blur' }">
                <el-rate v-model="form.cooperationRisk" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
            </el-form-item>
            <el-form-item label="企业优势：" label-width="100px" prop="companyAdvantage">
                <el-input type="textarea" style="width:600px" maxlength="250" rows="4" placeholder="请输入内容" v-model="form.companyAdvantage"></el-input>
            </el-form-item>
            <el-form-item label="企业短板：" label-width="100px" prop="companyShortBoard">
                <el-input type="textarea" style="width:600px" maxlength="250" rows="4" placeholder="请输入内容" v-model="form.companyShortBoard"></el-input>
            </el-form-item>
        </div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            form: state => state.dueDiligence.organizationData
        })
    }
}
</script>

<style lang="scss" scoped>
.title-p {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
}
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
.item-wrapper {
    margin: 20px 0 20px;
    .el-input {
        width: 100%;
    }
}
.organization-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.red-span {
    color: red;
}
/deep/ .el-rate {
    height: 40px;
    line-height: 50px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>

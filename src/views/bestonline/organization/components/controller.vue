<template>
    <el-collapse-item name="2">
        <template slot="title">
            <p class="title-p">实际控制人评估(必填)</p>
        </template>
        <p class="small-title">个人简介</p>
        <div class="item-wrapper">
            <el-form-item label="概况：" label-width="150px" prop="actualControllerOverview">
                <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入内容" v-model="form.actualControllerOverview" maxlength="250"></el-input>
            </el-form-item>
            <el-form-item label="底线和禁区：" label-width="150px" prop="actualControllerBaseline">
                <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入内容" v-model="form.actualControllerBaseline" maxlength="250"></el-input>
            </el-form-item>
            <el-form-item label="个人风格和喜好：" label-width="150px" prop="actualControllerHobby">
                <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入内容" v-model="form.actualControllerHobby" maxlength="250"></el-input>
            </el-form-item>
        </div>
        <p class="small-title">综合评估</p>
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td width="180">评估维度</td>
                    <td width="500">描述</td>
                    <td width="80">评分</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.dueOrganizationControllerAssessmentCreateFormList" :key="index">
                    <td :colspan="index !== 0 && index !== 4 && index !== 9 && index !== 12 && index !== 15 ? 1 : 3">
                        <span class="red-span" v-if="index !== 0 && index !== 4 && index !== 9 && index !== 12 && index !== 15">*</span>
                        {{item.assessmentDimension}}
                    </td>
                    <td v-if="index !== 0 && index !== 4 && index !== 9 && index !== 12 && index !== 15">
                        <el-input v-model="item.description" placeholder="请输入内容" maxlength="250"></el-input>
                    </td>
                    <td v-if="index !== 0 && index !== 4 && index !== 9 && index !== 12 && index !== 15">
                        <el-input v-model="item.score" placeholder="满分40" maxlength="2"></el-input>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td><span class="red-span">*</span>综合评分（自动计算）</td>
                    <td>-</td>
                    <td>{{ actualControllerScore }}</td>
                </tr>
            </tfoot>
        </table>
        <div ref="radarChart2" style="width:600px;height:550px;"></div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
const weightMap = new Map([
    ['年龄', 0.2],
    ['健康', 0.3],
    ['认知能力', 0.25],
    ['金钱观', 0.2],
    ['诚信度', 0.2],
    ['家庭观', 0.05],
    ['社会贡献', 0.05],
    ['压力分析', 0.25],
    ['投机心理', 0.25],
    ['商业分析', 0.25],
    ['好享家', 0.25],
    ['社会职务', 0.125],
    ['人脉关系', 0.125]
])
export default {
    name: 'organization_controller',
    computed: {
        actualControllerScore () {
            const controllerAssement = this.form.dueOrganizationControllerAssessmentCreateFormList
            if (!controllerAssement || controllerAssement.length == 0) {
                return ''
            }
            let total = 0
            controllerAssement.forEach(item => {
                if (weightMap.get(item.assessmentDimension)) {
                    total += item.score * weightMap.get(item.assessmentDimension)
                }
            })
            return isNaN(total) ? '' : total
        },
        ...mapState({
            form: state => {
                // TODO: 稍后处理
                let organizationData = state.dueDiligence.organizationData
                // let assessments = organizationData.dueOrganizationControllerAssessmentCreateFormList
                // assessments.map(item => {

                // })
                return organizationData
            }
        })
    },
    watch: {
        actualControllerScore (val) {
            this.form.actualControllerScore = val
        }
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
    /deep/ .el-input {
        width: 100%;
    }
    /deep/ .el-input__inner {
        border: none;
    }
}
.red-span {
    color: red;
}
table {
    border-collapse: collapse;
}
table,
tr,
td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-form .el-input {
    width: 100%;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>

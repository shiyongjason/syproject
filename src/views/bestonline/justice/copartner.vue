<template>
<el-collapse-item name="2">
    <template slot="title">
        <p class="titlt-p">合伙人信息</p>
    </template>
    <template v-if="copartnerInfoList && copartnerInfoList.length > 0">
        <div v-for="(item, index) in copartnerInfoList" :key="index">
            <p class="small-title">{{ copartnerTitles[item.type] }}</p>
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item
                    label="姓名："
                    :rules="item.type == 0 ? {required: true,message: '姓名不能为空',trigger: 'blur'} : {}"
                    :prop="'copartnerInfoList.'+ index + '.name'">
                    <el-input
                        :placeholder="copartnerTitles[item.type]"
                        maxlength="25"
                        v-model="item.name">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="联系方式"
                    :rules="item.type == 0 ? {required: true,message: '联系方式不能为空',trigger: 'blur'} : {}"
                    :prop="'copartnerInfoList.'+ index + '.tel'">
                    <el-input
                        placeholder="联系方式"
                        maxlength="25"
                        v-model="item.tel">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="性别："
                    :rules="item.type == 0 ? {required: true,message: '性别不能为空',trigger: 'change'} : {}"
                    :prop="'copartnerInfoList.'+ index + '.sex'">
                    <el-select v-model="item.sex">
                        <el-option label="男" :value="0"></el-option>
                        <el-option label="女" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="婚姻："
                    :rules="item.type == 0 ? {required: true,message: '婚姻不能为空',trigger: 'change'} : {}"
                    :prop="'copartnerInfoList.'+ index + '.marriage'">
                    <el-select v-model="item.marriage">
                        <el-option v-for="item in marriageOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="身份证号："
                    :rules="item.type == 0 ? {required: true,message: '身份证号不能为空',trigger: 'blur'} : {}"
                    :prop="'copartnerInfoList.'+ index + '.idNumber'">
                    <el-input
                        placeholder="身份证号"
                        maxlength="25"
                        v-model="item.idNumber">
                    </el-input>
                </el-form-item>
                <el-form-item label="学历：">
                    <el-select v-model="item.education">
                        <el-option v-for="item in educationOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="持股比例：" v-if="item.type != 2">
                    <el-input
                        placeholder="持股比例"
                        maxlength="25"
                        v-model="item.shareholdingRatio">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否在外兼职：">
                    <el-select v-model="item.partTimeJob">
                        <el-option label="是" :value="0"></el-option>
                        <el-option label="否" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="行业身份：">
                    <el-input
                        placeholder="行业身份"
                        maxlength="25"
                        v-model="item.industryStatus">
                    </el-input>
                </el-form-item>
                <el-form-item label="个人经营能力：" v-if="item.type == 0 || item.type == 5">
                    <el-input
                        placeholder="个人经营能力"
                        maxlength="25"
                        v-model="item.managementAbility">
                    </el-input>
                </el-form-item>
                <el-form-item label="行业口碑：" v-if="item.type == 0">
                    <el-input
                        placeholder="行业口碑"
                        maxlength="25"
                        v-model="item.industryReputation">
                    </el-input>
                </el-form-item>
                <el-form-item label="社会资源：">
                    <el-input
                        placeholder="社会资源"
                        maxlength="25"
                        v-model="item.socialResources"  >
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </template>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { MARRIAGE_OPTIONS, EDUCATION_OPTIONS } from '../const'

export default {
    name: 'justice_kpi',
    data () {
        return {
            marriageOptions: MARRIAGE_OPTIONS,
            educationOptions: EDUCATION_OPTIONS,
            copartnerTitles: ['实际控制人', '法人', '拟选签约人', '大股东1', '大股东2', '实际控制人配偶信息']
        }
    },
    computed: {
        ...mapState({
            justiceData: state => state.dueDiligence.justiceData
        }),
        copartnerInfoList () {
            let copartnerInfoList = this.justiceData.copartnerInfoList
            if (copartnerInfoList) {
                copartnerInfoList = copartnerInfoList.sort((itemA, itemB) => itemA.type - itemB.type)
                return copartnerInfoList
            }
            return []
        }
    }
}
</script>

<style lang="scss" scoped>
.legal-form {
    flex-direction: row;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
}
.legal-form .el-form-item {
    display: inline-block;
}
</style>

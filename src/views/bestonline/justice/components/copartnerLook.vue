<template>
    <el-collapse-item name="2">
        <template slot="title">
            <p class="title-p">合伙人信息</p>
        </template>
        <template v-if="copartnerInfoList && copartnerInfoList.length > 0">
            <div v-for="(item, index) in copartnerInfoList" :key="index">
                <p class="small-title">{{ copartnerTitles[item.type] }}</p>
                <div class="item-wrapper legal-form">
                    <el-form-item label="姓名：" label-width="120px">
                        <p>{{item.name}}</p>
                    </el-form-item>
                    <el-form-item label="联系方式" label-width="120px">
                        <p>{{item.tel}}</p>
                    </el-form-item>
                    <el-form-item label="性别：" label-width="120px">
                        <p>{{item.sex==0?'男':item.sex==1?'女':''}}</p>
                    </el-form-item>
                    <el-form-item label="婚姻：" label-width="120px">
                        <p v-if="item.marriage == 0">已婚</p>
                        <p v-if="item.marriage == 1">未婚</p>
                        <p v-if="item.marriage == 2">离异</p>
                        <p v-if="item.marriage == 3">丧偶</p>
                    </el-form-item>
                    <el-form-item label="身份证号：" label-width="120px">
                        <p>{{item.idNumber}}</p>
                    </el-form-item>
                    <el-form-item label="学历：" label-width="120px">
                        <p>{{item.education?educationOptions[item.education].label:''}}</p>
                    </el-form-item>
                    <el-form-item label="持股比例：" label-width="120px" v-if="item.type != 2">
                        <p>{{item.shareholdingRatio}}</p>
                    </el-form-item>
                    <el-form-item label="是否在外兼职：" label-width="120px">
                        <p>{{item.partTimeJob==0?'是':item.partTimeJob==1?'否':''}}</p>
                    </el-form-item>
                    <el-form-item label="行业身份：" label-width="120px">
                        <p>{{item.industryStatus}}</p>
                    </el-form-item>
                    <el-form-item label="个人经营能力：" label-width="120px" v-if="item.type == 0 || item.type == 5">
                        <p>{{item.managementAbility}}</p>
                    </el-form-item>
                    <el-form-item label="行业口碑：" label-width="120px" v-if="item.type == 0">
                        <p>{{item.industryReputation}}</p>
                    </el-form-item>
                    <el-form-item label="社会资源：" label-width="120px">
                        <p>{{item.socialResources}}</p>
                    </el-form-item>
                </div>
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
            // 做排序，根据type顺序排序
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
}
.legal-form {
    flex-direction: row;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
}
.legal-form .el-form-item {
    display: inline-block;
    margin-bottom: 0;

    P{
        display: inline-block;
        width: 200px;
    }
}
.small-title {
    margin-bottom: 20px;
}
</style>

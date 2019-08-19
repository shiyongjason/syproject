<template>
<el-collapse-item name="9">
    <template slot="title">
        <p class="title-p">新合资公司规划</p>
    </template>
    <el-form-item label="业务类别：" prop="dueBusinessFuturePlanCreateForm.serviceCategory">
        <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.serviceCategory">
            <el-checkbox v-for="item in mainCommercialData" :key="item.key" :label='item.value'>{{item.value}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="经营品类：" prop="dueBusinessFuturePlanCreateForm.businessCategory">
                <el-checkbox-group v-model="businessCategory">
                  <el-checkbox v-for="item in maincategory" :key="item.key" :label='item.value'>{{item.value}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="" prop="dueBusinessFuturePlanCreateForm.manageCategory" label-width=0>
                <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.manageCategory" placeholder="如选择其他，请对其他进行说明" row=1 style="width: 250px;"></el-input>
            </el-form-item>
        </div>
    </div>
    <el-form-item label="经营品牌：" prop="dueBusinessFuturePlanCreateForm.brandManagement">
        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.brandManagement" placeholder="请输入品牌信息" row=1 style="width: 80%;"></el-input>
    </el-form-item>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="经营区域：" prop="dueBusinessFuturePlanCreateForm.businessProvince">
                <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessProvince" placeholder="请选择省">
                </el-select>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item prop="dueBusinessFuturePlanCreateForm.businessCity">
                <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessCity" placeholder="请选择市">
                </el-select>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item prop="dueBusinessFuturePlanCreateForm.businessArea">
                <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessArea" placeholder="请选择区">
                </el-select>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="年销售规模：" prop="dueBusinessFuturePlanCreateForm.annualSalesScale">
                <el-input v-model="form.dueBusinessFuturePlanCreateForm.annualSalesScale" placeholder="请输入规模">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="净利润率：" prop="dueBusinessFuturePlanCreateForm.netProfitRate">
                <el-input v-model="form.dueBusinessFuturePlanCreateForm.netProfitRate" placeholder="请输入净利润">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <el-form-item label="下游切换渠道和客户：" prop="dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers" label-width="170px">
        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers" placeholder="请输入" row=1 style="width: 80%;"></el-input>
    </el-form-item>
    <el-form-item label="市场推广渠道及计划：" prop="dueBusinessFuturePlanCreateForm.marketingChannelsPlans" label-width="170px">
        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.marketingChannelsPlans" placeholder="请输入" row=1 style="width: 80%;"></el-input>
    </el-form-item>
    <el-form-item label="资金用款需求：" prop="dueBusinessFuturePlanCreateForm.fundingRequirements">
        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.fundingRequirements" placeholder="请输入" row=1 style="width: 80%;"></el-input>
    </el-form-item>
    <el-form-item label="其他规划和需求：">
        <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.otherPlansNeeds" placeholder="请输入" row=1 style="width: 80%;"></el-input>
    </el-form-item>
</el-collapse-item>
</template>

<script>
import { MAIN_COMMERCIAL_OPTIONS, MAIN_CATEGORY_OPTIONS } from '../const'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            mainCommercialData: MAIN_COMMERCIAL_OPTIONS,
            maincategory: MAIN_CATEGORY_OPTIONS

        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        }),
        businessCategory () {
            let businessCategory = this.form.dueBusinessFuturePlanCreateForm.businessCategory
            if (!businessCategory) {
                businessCategory = []
            }
            return this.form.dueBusinessFuturePlanCreateForm.businessCategory
        }
    }
}
</script>

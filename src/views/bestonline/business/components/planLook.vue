<template>
    <el-collapse-item name="9">
        <template slot="title">
            <p class="title-p">新合资公司规划</p>
        </template>
        <el-form-item label="业务类别：" label-width="170px">
            <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.serviceCategory" label-width="170px" disabled>
                <el-checkbox v-for="item in mainCommercialData" :key="item.key" :label='item.key'>{{item.value}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="经营品类：" label-width="170px">
                    <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.businessCategory" disabled>
                        <el-checkbox v-for="item in maincategory" :key="item.key" :label='item.key'>{{item.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div class="form-cont-col" v-if="form.dueBusinessFuturePlanCreateForm.otherPlansNeeds">
                <el-form-item label="" label-width=0>
                    {{form.dueBusinessFuturePlanCreateForm.otherPlansNeeds}}
                </el-form-item>
            </div>
        </div>
        <el-form-item label="经营品牌：" prop="dueBusinessFuturePlanCreateForm.brandManagement" label-width="170px">
            {{form.dueBusinessFuturePlanCreateForm.brandManagement}}
        </el-form-item>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="经营区域：" prop="dueBusinessFuturePlanCreateForm.businessProvince" label-width="170px">
                    {{ proveName}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item prop="dueBusinessFuturePlanCreateForm.businessCity" label-width="170px">
                    {{ cityName}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item prop="dueBusinessFuturePlanCreateForm.businessArea" label-width="170px">
                    {{ areaName}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="年销售规模：" prop="dueBusinessFuturePlanCreateForm.annualSalesScale" label-width="170px">
                    {{form.dueBusinessFuturePlanCreateForm.annualSalesScale}}万
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="净利润率：" prop="dueBusinessFuturePlanCreateForm.netProfitRate" label-width="170px">
                    {{form.dueBusinessFuturePlanCreateForm.netProfitRate}}%
                </el-form-item>
            </div>
        </div>
        <el-form-item label="下游切换渠道和客户：" prop="dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers" label-width="170px">
            {{form.dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers}}
        </el-form-item>
        <el-form-item label="市场推广渠道及计划：" prop="dueBusinessFuturePlanCreateForm.marketingChannelsPlans" label-width="170px">
            {{form.dueBusinessFuturePlanCreateForm.marketingChannelsPlans}}
        </el-form-item>
        <el-form-item label="资金用款需求：" prop="dueBusinessFuturePlanCreateForm.fundingRequirements" label-width="170px">
            {{form.dueBusinessFuturePlanCreateForm.fundingRequirements}}
        </el-form-item>
        <el-form-item label="其他规划和需求：" label-width="170px">
            {{form.dueBusinessFuturePlanCreateForm.otherPlansNeeds}}
        </el-form-item>
    </el-collapse-item>
</template>

<script>
import { MAIN_COMMERCIAL_OPTIONS, MAIN_CATEGORY_OPTIONS } from '../const'
import { getChiness } from '../../api/index'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            mainCommercialData: MAIN_COMMERCIAL_OPTIONS,
            maincategory: MAIN_CATEGORY_OPTIONS,
            provelist: [],
            citylist: [],
            arealist: [],
            businessProvince: '',
            businessCity: '',
            businessArea: '',
            proveName: '',
            cityName: '',
            areaName: ''
        }
    },
    watch: {
        async   form (form) {
            if (form.dueBusinessFuturePlanCreateForm.businessProvince) {
                const { data } = await this.getChiness(form.dueBusinessFuturePlanCreateForm.businessProvince)
                this.proveName = data.citys.cityName
            }
            if (form.dueBusinessFuturePlanCreateForm.businessCity) {
                const { data: dataA } = await this.getChiness(form.dueBusinessFuturePlanCreateForm.businessCity)
                this.cityName = dataA.citys.cityName
            }
            if (form.dueBusinessFuturePlanCreateForm.businessArea) {
                const { data: dataB } = await this.getChiness(form.dueBusinessFuturePlanCreateForm.businessArea)
                this.areaName = dataB.citys.cityName
            }

            let serviceCategory = form.dueBusinessFuturePlanCreateForm.serviceCategory
            if (!serviceCategory) {
                serviceCategory = ''
            } else {
                serviceCategory = serviceCategory.split(',')
            }
            form.dueBusinessFuturePlanCreateForm.serviceCategory = serviceCategory.map(item => item && parseInt(item))
            let businessCategory = form.dueBusinessFuturePlanCreateForm.businessCategory
            if (!businessCategory) {
                businessCategory = ''
            } else {
                businessCategory = businessCategory.split(',')
            }
            form.dueBusinessFuturePlanCreateForm.businessCategory = businessCategory.map(item => item && parseInt(item))
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        })

    },
    created () {

    },
    async  mounted () {

    },
    methods: {
        async  getChiness (value) {
            const { data } = await getChiness({ id: value })
            return data
        }
    }
}
</script>

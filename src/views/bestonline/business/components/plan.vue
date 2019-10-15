<template>
    <el-collapse-item name="9">
        <template slot="title">
            <p class="title-p">新合资公司规划</p>
        </template>
        <el-form-item label="业务类别：" prop="dueBusinessFuturePlanCreateForm.webServiceCategory">
            <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.webServiceCategory" label-width="170px">
                <el-checkbox v-for="item in mainCommercialData" :key="item.key" :label='item.key'>{{item.value}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="经营品类：" prop="dueBusinessFuturePlanCreateForm.webBusinessCategory" label-width="170px">
                    <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.webBusinessCategory" @change="onChange">
                        <el-checkbox v-for="(item,index) in maincategory" :key="index" :label='item.key'>{{item.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div class="form-cont-col" v-if="maxShow==7||form.dueBusinessFuturePlanCreateForm.businessCategoryOther">
                <el-form-item label="" prop="dueBusinessFuturePlanCreateForm.businessCategoryOther" label-width=0>
                    <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.businessCategoryOther" placeholder="如选择其他，请对其他进行说明" row=1 style="width: 250px;"></el-input>
                </el-form-item>
            </div>
        </div>
        <el-form-item label="经营品牌：" prop="dueBusinessFuturePlanCreateForm.brandManagement" label-width="170px">
            <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.brandManagement" placeholder="请输入品牌信息" row=1 style="width: 80%;"></el-input>
        </el-form-item>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="经营区域：" prop="dueBusinessFuturePlanCreateForm.businessProvince" label-width="170px">
                    <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessProvince" placeholder="请选择省" @change="onchangeP(form.dueBusinessFuturePlanCreateForm.businessProvince)">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="(item) in provelist" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item prop="dueBusinessFuturePlanCreateForm.businessCity" label-width="170px">
                    <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessCity" @change="onchangeC(form.dueBusinessFuturePlanCreateForm.businessCity)" placeholder="请选择市">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in citylist" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item prop="dueBusinessFuturePlanCreateForm.businessArea" label-width="170px">
                    <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessArea" placeholder="请选择区" @change="onchangeA(form.dueBusinessFuturePlanCreateForm.businessArea)">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in arealist" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="年销售规模：" prop="dueBusinessFuturePlanCreateForm.annualSalesScale" label-width="170px">
                    <el-input v-model="form.dueBusinessFuturePlanCreateForm.annualSalesScale" placeholder="请输入规模">
                        <template slot="suffix">万</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="净利润率：" prop="dueBusinessFuturePlanCreateForm.netProfitRate" label-width="170px">
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
        <el-form-item label="资金用款需求：" prop="dueBusinessFuturePlanCreateForm.fundingRequirements" label-width="170px">
            <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.fundingRequirements" placeholder="请输入" row=1 style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="其他规划和需求：" label-width="170px">
            <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.otherPlansNeeds" placeholder="请输入" row=1 style="width: 80%;"></el-input>
        </el-form-item>
    </el-collapse-item>
</template>

<script>
import { MAIN_COMMERCIAL_OPTIONS_COPY, MAIN_CATEGORY_OPTIONS_COPY } from '../const'
import { getAreacode } from '../../api/index'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            mainCommercialData: MAIN_COMMERCIAL_OPTIONS_COPY,
            maincategory: MAIN_CATEGORY_OPTIONS_COPY,
            provelist: [],
            businessProvince: '',
            businessCity: '',
            businessArea: '',
            maxShow: ''
        }
    },
    watch: {
        form (form) {
            let webServiceCategory = form.dueBusinessFuturePlanCreateForm.webServiceCategory
            if (!webServiceCategory) {
                webServiceCategory = []
            } else {
                webServiceCategory = webServiceCategory.split(',')
            }
            form.dueBusinessFuturePlanCreateForm.webServiceCategory = webServiceCategory.map(item => item && parseInt(item))
            let webBusinessCategory = form.dueBusinessFuturePlanCreateForm.webBusinessCategory
            if (!webBusinessCategory) {
                webBusinessCategory = []
            } else {
                webBusinessCategory = webBusinessCategory.split(',')
            }
            form.dueBusinessFuturePlanCreateForm.webBusinessCategory = webBusinessCategory.map(item => item && parseInt(item))
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        }),
        'form.dueBusinessFuturePlanCreateForm.webServiceCategory' () {
            return []
        },
        citylist () {
            const province = this.provelist.filter(item => item.key == this.form.dueBusinessFuturePlanCreateForm.businessProvince)
            if (province.length > 0) {
                return province[0].cityList
            }
            return []
        },
        arealist () {
            const city = this.citylist.filter(item => item.key == this.form.dueBusinessFuturePlanCreateForm.businessCity)
            if (city.length > 0) {
                return city[0].areaList
            }
            return []
        }
    },
    async  mounted () {
        const { data } = await getAreacode()
        this.provelist = data.data.dictpro
    },
    methods: {
        async  getAreacode () {
            const { data } = await getAreacode()
            return data.data
        },
        async onchangeP (val) {
            this.form.dueBusinessFuturePlanCreateForm.businessCity = ''
            this.form.dueBusinessFuturePlanCreateForm.businessArea = ''
        },
        async onchangeC (val) {
            this.form.dueBusinessFuturePlanCreateForm.businessArea = ''
        },
        async onchangeA (val) {

        },
        onChange (val) {
            this.maxShow = val && val.sort().reverse()[0]
        }
    }
}
</script>

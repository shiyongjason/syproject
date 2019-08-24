<template>
    <el-collapse-item name="9">
        <template slot="title">
            <p class="title-p">新合资公司规划</p>
        </template>
        <el-form-item label="业务类别：" prop="dueBusinessFuturePlanCreateForm.serviceCategory" label-width="170px">
            <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.serviceCategory" >
                <el-checkbox v-for="item in mainCommercialData" :key="item.key" :label='item.key'>{{item.value}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="经营品类：" prop="dueBusinessFuturePlanCreateForm.businessCategory" label-width="170px">
                    <el-checkbox-group v-model="form.dueBusinessFuturePlanCreateForm.businessCategory" @change="onChange">
                        <el-checkbox v-for="item in maincategory" :key="item.key" :label='item.key'>{{item.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div class="form-cont-col" v-if="maxShow==7">
                <el-form-item label="" prop="dueBusinessFuturePlanCreateForm.manageCategory" label-width=0>
                    <el-input type="textarea" v-model="form.dueBusinessFuturePlanCreateForm.manageCategory" placeholder="如选择其他，请对其他进行说明" row=1 style="width: 250px;"></el-input>
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
                        <el-option v-for="(item) in provelist" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item prop="dueBusinessFuturePlanCreateForm.businessCity" label-width="170px">
                    <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessCity" @change="onchangeC(form.dueBusinessFuturePlanCreateForm.businessCity)" placeholder="请选择市">
                        <el-option v-for="item in citylist" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item prop="dueBusinessFuturePlanCreateForm.businessArea" label-width="170px">
                    <el-select v-model="form.dueBusinessFuturePlanCreateForm.businessArea" placeholder="请选择区" @change="onchangeA(form.dueBusinessFuturePlanCreateForm.businessArea)">
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
import { MAIN_COMMERCIAL_OPTIONS, MAIN_CATEGORY_OPTIONS } from '../const'
import { getAreacode } from '../../api/index'
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
            maxShow: ''
        }
    },
    watch: {
        form (form) {
            let serviceCategory = form.dueBusinessFuturePlanCreateForm.serviceCategory
            if (!serviceCategory) {
                serviceCategory = []
            } else {
                serviceCategory = serviceCategory.split(',')
            }

            form.dueBusinessFuturePlanCreateForm.serviceCategory = serviceCategory.map(item => item && parseInt(item))

            let businessCategory = form.dueBusinessFuturePlanCreateForm.businessCategory
            if (!businessCategory) {
                console.log(1)
                businessCategory = []
            } else {
                businessCategory = businessCategory.split(',')
            }
            form.dueBusinessFuturePlanCreateForm.businessCategory = businessCategory.map(item => item && parseInt(item))
        },
        'form.dueBusinessFuturePlanCreateForm.businessProvince': {
            handler (val) {
                if (val) {
                    let list = this.provelist.filter(item => item.key == val)[0].cityList
                    let selectObj = [{ value: '请选择', key: '' }]
                    this.citylist = selectObj.concat(list)
                } else {
                    this.citylist = []
                    this.arealist = []
                }
            },
            deep: true
        },
        'form.dueBusinessFuturePlanCreateForm.businessCity': {
            handler (val) {
                if (val) {
                    let list = this.citylist.filter(item => item.key == val)[0].areaList
                    let selectObj = [{ value: '请选择', key: '' }]
                    this.arealist = selectObj.concat(list)
                } else {
                    this.arealist = []
                }
            },
            deep: true
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        })
    },
    async  mounted () {
        const { data } = await getAreacode()
        let selectObj = [{ value: '请选择', key: '' }]
        this.provelist = selectObj.concat(data.data.dictpro)
    },
    methods: {
        async  getAreacode () {
            const { data } = await getAreacode()
            return data.data
        },
        async onchangeP (val) {
            this.form.dueBusinessFuturePlanCreateForm.businessCity = ''
        },
        async onchangeC (val) {
            this.form.dueBusinessFuturePlanCreateForm.businessArea = ''
        },
        async onchangeA (val) {

        },
        onChange (val) {
            console.log(val)
            this.maxShow = val && val.sort().reverse()[0]
        }
    }
}
</script>

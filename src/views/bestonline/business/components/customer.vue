<template>
    <el-collapse-item name="6">
        <template slot="title">
            <p class="title-p">下游-客户结构</p>
        </template>
        <!--start-->
        <table class="custom-table">
            <thead>
                <tr>
                    <td>客户</td>
                    <td>品类</td>
                    <td>品牌</td>
                    <td>销售金额（万元）</td>
                    <td>销售占比</td>
                    <td>协议期开始(非必填)</td>
                    <td>协议期结束(非必填)</td>
                    <td width="15%">协议规模（万元）(非必填)</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in dueBusinessCustomerCreateFormList" :key=index>
                    <td>
                        <el-form-item :prop="`dueBusinessCustomerCreateFormList[${index}].customerName`" :rules="rules.customerName" label-width="0">
                            <el-input v-model="item.customerName" placeholder="客户" maxlength="25"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item :prop="`dueBusinessCustomerCreateFormList[${index}].categoryId`" :rules="rules.categoryId" label-width="0">
                            <el-select v-model="item.categoryId" placeholder="请选择">
                                <el-option v-for="item in mainCategoryData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item :prop="`dueBusinessCustomerCreateFormList[${index}].brandName`" :rules="rules.brandName" label-width="0">
                            <el-input v-model="item.brandName" placeholder="品牌" maxlength="25"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item :prop="`dueBusinessCustomerCreateFormList[${index}].salesFee`" :rules="rules.salesFee" label-width="0">
                            <el-input v-model="item.salesFee" placeholder="金额" maxlength="25">
                                <template slot="suffix">万</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item :prop="`dueBusinessCustomerCreateFormList[${index}].salesProportion`" :rules="rules.salesProportion" label-width="0">
                            <el-input v-model="item.salesProportion" placeholder="占比" maxlength="25">
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0">
                            <el-date-picker type="date" placeholder="选择日期" :editable="false" value-format="yyyy-MM-dd" v-model="item.agreementStartDate"></el-date-picker>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0">
                            <el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="item.agreementEndDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0">
                            <el-input v-model="item.agreementScale" placeholder="规模" maxlength="25" >
                                <template slot="suffix">万</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="addCustomer"></i>
                    <i class="el-icon-remove-outline pointer" v-else @click="deleteCustomer(index)"></i>
                </tr>
            </tbody>
        </table>
        <el-form-item label="是否健康:" prop="customersHealth" label-width="80px">
            <el-select v-model="form.customersHealth" placeholder="请选择">
                <el-option v-for="item in customersHealthData" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
        </el-form-item>
        <span>（不健康：超30%的业务聚焦在1个客户上）</span>
        <!--end-->
    </el-collapse-item>
</template>
<script>
import { mapState } from 'vuex'
import { MAIN_CATEGORY_OPTIONS, SELECT_OPTIONS } from '../const'
export default {
    data () {
        return {
            customersHealthData: SELECT_OPTIONS,
            mainCategoryData: MAIN_CATEGORY_OPTIONS,
            defaultComstur: {
                agreementEndDate: '',
                agreementScale: '',
                agreementStartDate: '',
                brandName: '',
                categoryId: '',
                customerName: '',
                dueBusinessId: '',
                salesFee: '',
                salesProportion: ''
            },
            rules: {
            }
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        }),
        dueBusinessCustomerCreateFormList () {
            let businessCustomerCreateFormList = this.form.dueBusinessCustomerCreateFormList
            if (!businessCustomerCreateFormList) {
                businessCustomerCreateFormList = []
            }
            if (businessCustomerCreateFormList.length == 0) {
                let defaultObj = JSON.parse(JSON.stringify(this.defaultComstur))
                businessCustomerCreateFormList.push(defaultObj)
            }
            businessCustomerCreateFormList && businessCustomerCreateFormList.map(item => parseInt(item.brandName))
            return this.form.dueBusinessCustomerCreateFormList
        }
    },
    methods: {
        addCustomer () {
            const tempObj = JSON.parse(JSON.stringify(this.defaultComstur))
            this.form.dueBusinessCustomerCreateFormList.push(tempObj)
        },
        deleteCustomer (index) {
            this.form.dueBusinessCustomerCreateFormList.splice(index, 1)
        }
    }
}
</script>

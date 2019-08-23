<template>
    <el-collapse-item name="6">
        <template slot="title">
            <p class="title-p">下游-客户结构</p>
        </template>
        <!--start-->
        <table class="custom-table">
            <thead>
                <tr>
                    <td><span class="red-word">*</span>客户</td>
                    <td><span class="red-word">*</span>品类</td>
                    <td><span class="red-word">*</span>品牌</td>
                    <td><span class="red-word">*</span>销售金额（万元）</td>
                    <td><span class="red-word">*</span>销售占比</td>
                    <td>协议期开始(非必填)</td>
                    <td>协议期结束(非必填)</td>
                    <td width="15%">协议规模（万元）(非必填)</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in businessSupplierCreateFormList" :key=index>
                    <td>
                        <el-input v-model="item.customerName" placeholder="客户" maxlength="25"></el-input>
                    </td>
                    <td>
                        <el-select v-model="item.categoryId" placeholder="请选择">
                            <el-option v-for="item in mainCategoryData" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </td>
                    <td>{{item.brandName}}</td>
                    <td>{{item.salesFee}}万</td>
                    <td>{{item.salesProportion}}%</td>
                    <td>
                        <el-date-picker type="date" placeholder="选择日期" :editable="false" value-format="yyyy-MM-dd" v-model="item.agreementStartDate"></el-date-picker>
                    </td>
                    <td>
                        <el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="item.agreementEndDate" value-format="yyyy-MM-dd"></el-date-picker>
                    </td>
                    <td>{{item.agreementScale}}万</td>
                </tr>
            </tbody>
        </table>
        <el-form-item label="是否健康:" prop="customersHealth" label-width="80px">
            {{item.customersHealth==1?'否':item.customersHealth==0?'是':''}}
        </el-form-item>
        <span>（不健康：超30%的业务聚焦在1个客户上）</span>
        <!--end-->
    </el-collapse-item>
</template>
<script>
import { mapState } from 'vuex'
import { DOWN_OPTIONS, MAIN_CATEGORY_OPTIONS } from '../const'
export default {
    data () {
        return {
            customersHealthData: DOWN_OPTIONS,
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
            }
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        }),
        businessSupplierCreateFormList () {
            let businessCustomerCreateFormList = this.form.dueBusinessCustomerCreateFormList
            if (!businessCustomerCreateFormList) {
                businessCustomerCreateFormList = []
            }
            if (businessCustomerCreateFormList.length == 0) {
                let defaultObj = JSON.parse(JSON.stringify(this.defaultComstur))
                businessCustomerCreateFormList.push(defaultObj)
            }
            businessCustomerCreateFormList && businessCustomerCreateFormList.map(item => parseInt(item.brandName))
            return businessCustomerCreateFormList
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

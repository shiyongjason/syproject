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
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in businessSupplierCreateFormList" :key=index>
                    <td>
                       {{item.customerName}}
                    </td>
                    <td>
                        {{item.categoryId?mainCategoryData[item.categoryId].value:''}}
                    </td>
                    <td>{{item.brandName}}</td>
                    <td>{{item.salesFee?item.salesFee+'万':''}}</td>
                    <td>{{item.salesProportion?item.salesProportion:''}}</td>
                    <td>{{item.agreementStartDate}}</td>
                    <td>{{item.agreementEndDate}}</td>
                    <td>{{item.agreementScale?item.agreementScale+'万':''}}</td>
                </tr>
            </tbody>
        </table>
        <el-form-item label="是否健康:" prop="customersHealth" label-width="80px">
            {{form.customersHealth==1?'否':form.customersHealth==0?'是':''}}
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

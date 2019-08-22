<template>
<el-collapse-item name="6">
    <template slot="title">
        <p class="title-p">下游-客户结构</p>
    </template>
    <!--start-->
    <div class="flex-wrap-col supplier supplierSymbol">
        <div class="table-flex">
            <div class="table-row">
                <div class="table-col"><span class="red-word">*</span>客户</div>
                <div class="table-col"><span class="red-word">*</span>品类</div>
                <div class="table-col"><span class="red-word">*</span>品牌</div>
                <div class="table-col"><span class="red-word">*</span>销售金额（万元）</div>
                <div class="table-col"><span class="red-word">*</span>销售占比</div>
                <div class="table-col">协议期开始(非必填)</div>
                <div class="table-col">协议期结束(非必填)</div>
                <div class="table-col">协议规模（万元）(非必填)</div>
            </div>
            <div class="table-row " v-for="(item,index) in businessSupplierCreateFormList" :key=index>
                <div class="table-col">
                    <el-input v-model="item.customerName" placeholder="客户" maxlength="25">
                    </el-input>
                </div>
                <div class="table-col">
                    <el-select v-model="item.categoryId" placeholder="请选择" >
                        <el-option v-for="item in mainCategoryData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div class="table-col">
                   {{item.brandName}}
                </div>
                <div class="table-col">
                   {{item.salesFee}}万
                </div>
                <div class="table-col">
                   {{item.salesProportion}}%
                </div>
                <div class="table-col">
                    <el-date-picker type="date" placeholder="选择日期" :editable="false" value-format="yyyy-MM-dd" v-model="item.agreementStartDate" >
                    </el-date-picker>
                </div>
                <div class="table-col">
                    <el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="item.agreementEndDate"  value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="table-col">
                   {{item.agreementScale}}万
                </div>
            </div>
        </div>
    </div>
    <el-form-item label="是否健康:" prop="customersHealth" label-width="80px">
        <el-select v-model="form.customersHealth" placeholder="请选择" >
            <el-option v-for="item in customersHealthData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
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

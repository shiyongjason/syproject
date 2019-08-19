<template>
<el-collapse-item name="5">
    <template slot="title">
        <p class="title-p">上游-供应商结构</p>
    </template>
    <div class="supplier" v-for="(item, index) in dueBusinessSupplierCreateFormList" :key=index>
        <i class="el-icon-circle-plus-outline pointer" v-if="index == 0" @click="onAddSupplier"></i>
        <i class="el-icon-remove-outline pointer" @click="onRemoveSupplier(index)" v-else></i>
        <el-form-item label="供应商名称：" :prop="`dueBusinessSupplierCreateFormList[${index}].supplierName`" :rules="rules.supplierName">
            <el-input v-model="item.supplierName" style="width: 90%;" placeholder="供应商名称" maxlength="25"></el-input>
        </el-form-item>
        <el-form-item label="品牌:">
            <el-input type="textarea" v-model="item.brand" style="width: 90%;"></el-input>
        </el-form-item>
        <div class="form-cont-row mb20">
            <div class="form-cont-col ">
                <el-form-item label="采购金额：" :prop="`dueBusinessSupplierCreateFormList[${index}].purchaseAmount`" :rules="rules.purchaseAmount">
                    <el-input v-model="item.purchaseAmount" placeholder="采购金额"><template slot="suffix">万</template></el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col ">
                <el-form-item label="占比：" :prop="`dueBusinessSupplierCreateFormList[${index}].proportion`" :rules="rules.proportion">
                    <el-input v-model="item.proportion" placeholder="占比"><template slot="suffix">%</template></el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col ">
                <el-form-item label="是否提供合同：" :prop="`dueBusinessSupplierCreateFormList[${index}].isProvideContract`" :rules="rules.isProvideContract">
                    <el-select v-model="item.isProvideContract" placeholder="请选择">
                        <el-option v-for="item in isProvideContractOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="合同开始时间：">
                    <el-date-picker type="date" placeholder="选择日期" v-model="item.contractStartDate" :editable="false" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="合同结束时间：">
                    <el-date-picker type="date" placeholder="选择日期" v-model="item.contractEndDate" :editable="false" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="合同规模：">
                    <el-input v-model="item.contractScale" placeholder="请输入合同规模" maxlength="25"><template slot="suffix">万</template></el-input>
                </el-form-item>
            </div>
        </div>
    </div>
</el-collapse-item>
</template>

<script>
import { ISPROVIDE_CONTRACT } from '../../const.js'
import { mapState } from 'vuex'
export default {
    name: 'business_supplier',
    data () {
        return {
            isProvideContractOptions: ISPROVIDE_CONTRACT,
            defaultSupplier: {
                supplierName: '',
                brand: '',
                purchaseAmount: '',
                proportion: '',
                isProvideContract: '',
                contractStartDate: '',
                contractEndDate: '',
                contractScale: ''
            },
            rules: {
                supplierName: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' }
                ],
                isProvideContract: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                purchaseAmount: [
                    { required: true, message: '请输入采购金额', trigger: 'blur' }
                ],
                proportion: [
                    { required: true, message: '请输入占比', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        }),
        dueBusinessSupplierCreateFormList () {
            let businessSupplierCreateFormList = this.form.dueBusinessSupplierCreateFormList
            if (!businessSupplierCreateFormList) {
                businessSupplierCreateFormList = []
            }
            if (businessSupplierCreateFormList.length == 0) {
                let defaultObj = JSON.parse(JSON.stringify(this.defaultSupplier))
                businessSupplierCreateFormList.push(defaultObj)
            }
            return this.form.dueBusinessSupplierCreateFormList
        }
    },
    mounted () {
        console.log(this.form.dueBusinessSupplierCreateFormList)
    },
    methods: {
        onAddSupplier () {
            const tempObj = JSON.parse(JSON.stringify(this.defaultSupplier))
            this.form.dueBusinessSupplierCreateFormList.push(tempObj)
        },
        onRemoveSupplier (index) {
            this.form.dueBusinessSupplierCreateFormList.splice(index, 1)
        }
    }
}
</script>
